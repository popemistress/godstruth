/**
 * extract-epub-covers.ts
 *
 * For every BibleEdition row that has a local .epub file but no coverUrl:
 *  1. Opens the epub (ZIP) with JSZip
 *  2. Locates the cover image via OPF metadata
 *  3. Resizes to 300×450 JPEG with sharp
 *  4. Uploads to UploadThing
 *  5. Saves the URL to BibleEdition.coverUrl
 *
 * Idempotent — skips rows where coverUrl is already set.
 */

import JSZip from "jszip";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";

const utapi = new UTApi();
const db    = new PrismaClient();
const BIBLES_DIR = path.join(process.cwd(), "bibles");
const ANCIENT_DIR = path.join(process.cwd(), "Ancient");

// ─── XML helpers (no external parser needed) ─────────────────────────────────

function attr(xml: string, tag: string, attribute: string): string | null {
  const re = new RegExp(`<${tag}[^>]*\\s${attribute}="([^"]*)"`, "i");
  return xml.match(re)?.[1] ?? null;
}

function allAttrs(xml: string, tag: string, attribute: string): string[] {
  const re = new RegExp(`<${tag}[^>]*\\s${attribute}="([^"]*)"`, "gi");
  const results: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(xml)) !== null) results.push(m[1]);
  return results;
}

function metaContent(xml: string, name: string): string | null {
  const re = new RegExp(`<meta[^>]*name="${name}"[^>]*content="([^"]*)"`, "i");
  const m  = xml.match(re);
  if (m) return m[1];
  // alt order: content before name
  const re2 = new RegExp(`<meta[^>]*content="([^"]*)"[^>]*name="${name}"`, "i");
  return xml.match(re2)?.[1] ?? null;
}

// ─── Cover extraction ────────────────────────────────────────────────────────

async function extractCover(epubPath: string): Promise<Buffer | null> {
  const data = fs.readFileSync(epubPath);
  const zip  = await JSZip.loadAsync(data);

  // 1. Find OPF path from container.xml
  const containerXml = await zip.file("META-INF/container.xml")?.async("string");
  if (!containerXml) return null;

  const opfPath = attr(containerXml, "rootfile", "full-path");
  if (!opfPath) return null;

  const opfXml = await zip.file(opfPath)?.async("string");
  if (!opfXml) return null;

  const opfDir = opfPath.includes("/") ? opfPath.substring(0, opfPath.lastIndexOf("/") + 1) : "";

  // 2. Find cover image id from metadata
  let coverHref: string | null = null;

  const coverId = metaContent(opfXml, "cover");
  if (coverId) {
    // look up by id in manifest
    const itemRe = new RegExp(`<item[^>]*id="${coverId}"[^>]*href="([^"]*)"`, "i");
    const m = opfXml.match(itemRe);
    if (m) coverHref = m[1];
  }

  // Fallback: manifest item whose id or href contains "cover"
  if (!coverHref) {
    const hrefs = allAttrs(opfXml, "item", "href");
    const ids   = allAttrs(opfXml, "item", "id");
    // prefer id-based match
    for (let i = 0; i < ids.length; i++) {
      if (/cover/i.test(ids[i]) && /\.(jpe?g|png|gif|webp)/i.test(hrefs[i])) {
        coverHref = hrefs[i]; break;
      }
    }
    // then href-based
    if (!coverHref) {
      for (const h of hrefs) {
        if (/cover/i.test(h) && /\.(jpe?g|png|gif|webp)/i.test(h)) {
          coverHref = h; break;
        }
      }
    }
    // last resort: first image in manifest
    if (!coverHref) {
      for (const h of hrefs) {
        if (/\.(jpe?g|png|gif|webp)/i.test(h)) { coverHref = h; break; }
      }
    }
  }

  if (!coverHref) return null;

  // Resolve relative path against OPF directory
  const fullPath = opfDir + coverHref;
  const imgFile  = zip.file(fullPath) ?? zip.file(coverHref);
  if (!imgFile) return null;

  const imgBytes = await imgFile.async("nodebuffer");

  // 3. Process with sharp — resize to book-cover ratio 300×450
  try {
    return await sharp(imgBytes)
      .resize(300, 450, { fit: "cover", position: "top" })
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch {
    // If sharp fails (e.g. unsupported format), return raw bytes
    return imgBytes;
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const bibles = await db.bibleEdition.findMany({
    where: { coverUrl: null, filename: { not: null } },
    orderBy: { title: "asc" },
  });

  console.log(`🖼  Extracting covers for ${bibles.length} entries (skipping those already done)\n`);

  let done = 0, skipped = 0, failed = 0;

  for (const bible of bibles) {
    const filename = bible.filename!;
    // Handle both pdf and epub filenames — we want the epub
    const epubFilename = filename.replace(/\.pdf$/i, ".epub");
    const epubPath = path.join(BIBLES_DIR, epubFilename);

    const fileExists =
      fs.existsSync(path.join(BIBLES_DIR, epubFilename)) ||
      fs.existsSync(path.join(BIBLES_DIR, filename)) ||
      fs.existsSync(path.join(ANCIENT_DIR, epubFilename)) ||
      fs.existsSync(path.join(ANCIENT_DIR, filename));

    if (!fileExists) {
      console.log(`⚠️  File not found: ${filename}`);
      skipped++;
      continue;
    }

    const resolvedPath =
      fs.existsSync(path.join(BIBLES_DIR, epubFilename)) ? path.join(BIBLES_DIR, epubFilename) :
      fs.existsSync(path.join(ANCIENT_DIR, epubFilename)) ? path.join(ANCIENT_DIR, epubFilename) :
      fs.existsSync(path.join(ANCIENT_DIR, filename)) ? path.join(ANCIENT_DIR, filename) :
      path.join(BIBLES_DIR, filename);

    process.stdout.write(`⬆️  ${bible.title.substring(0, 60)}… `);

    try {
      const coverBuf = await extractCover(resolvedPath);
      if (!coverBuf) {
        console.log("⚠️  no cover found");
        skipped++;
        continue;
      }

      // Upload to UploadThing
      const slugName = `${bible.slug}-cover.jpg`;
      const blob = new Blob([coverBuf], { type: "image/jpeg" });
      const file = new File([blob], slugName, { type: "image/jpeg" });

      const result = await utapi.uploadFiles(file);
      if (result.error) {
        console.log(`❌ upload error: ${result.error.message}`);
        failed++;
        continue;
      }

      const coverUrl = result.data.ufsUrl ?? result.data.url;
      await db.bibleEdition.update({ where: { id: bible.id }, data: { coverUrl } });

      console.log("✅");
      done++;
    } catch (err) {
      console.log(`❌ ${err instanceof Error ? err.message : String(err)}`);
      failed++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Extracted & uploaded: ${done}`);
  console.log(`   ⚠️  Skipped (no cover):  ${skipped}`);
  console.log(`   ❌ Failed:               ${failed}`);

  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
