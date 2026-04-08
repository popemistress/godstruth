/**
 * extract-pdf-covers.ts
 *
 * For every BibleEdition row whose filename ends in .pdf and has no coverUrl:
 *  1. Locates the file in Others/ (or bibles/)
 *  2. Renders the first page to JPEG using pdftoppm (poppler)
 *  3. Resizes to 300×450 with sharp
 *  4. Uploads to UploadThing
 *  5. Saves the URL to BibleEdition.coverUrl
 *
 * Idempotent — skips rows where coverUrl is already set.
 */

import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { execSync } from "child_process";
import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";

const utapi = new UTApi();
const db    = new PrismaClient();

const SEARCH_DIRS = [
  path.join(process.cwd(), "Others"),
  path.join(process.cwd(), "Ancient"),
  path.join(process.cwd(), "bibles"),
];

function findFile(filename: string): string | null {
  for (const dir of SEARCH_DIRS) {
    const p = path.join(dir, filename);
    if (fs.existsSync(p)) return p;
  }
  return null;
}

async function extractPdfCover(pdfPath: string): Promise<Buffer | null> {
  const tmpDir    = fs.mkdtempSync(path.join(os.tmpdir(), "pdf-cover-"));
  const outPrefix = path.join(tmpDir, "page");

  try {
    // pdftoppm: render page 1 only at 150 dpi as JPEG
    execSync(
      `pdftoppm -jpeg -f 1 -l 1 -r 150 "${pdfPath}" "${outPrefix}"`,
      { stdio: "pipe" }
    );

    // pdftoppm outputs files like page-1.jpg or page-000001.jpg
    const files = fs.readdirSync(tmpDir).filter(f => f.endsWith(".jpg") || f.endsWith(".jpeg") || f.endsWith(".ppm"));
    if (files.length === 0) return null;

    const imgPath = path.join(tmpDir, files[0]);
    const imgBuf  = fs.readFileSync(imgPath);

    // Resize to 300×450 cover, JPEG 85%
    return await sharp(imgBuf)
      .resize(300, 450, { fit: "cover", position: "top" })
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch (err) {
    console.error(`  pdftoppm error: ${err instanceof Error ? err.message : String(err)}`);
    return null;
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function main() {
  const bibles = await db.bibleEdition.findMany({
    where: {
      coverUrl: null,
      filename: { endsWith: ".pdf" },
    },
    orderBy: { title: "asc" },
  });

  console.log(`📄 Found ${bibles.length} PDF bibles without cover images\n`);

  let done = 0, skipped = 0, failed = 0;

  for (const bible of bibles) {
    if (!bible.filename) { skipped++; continue; }

    const filePath = findFile(bible.filename);
    if (!filePath) {
      console.log(`⚠️  File not found locally: ${bible.filename}`);
      skipped++;
      continue;
    }

    console.log(`🖼  Extracting cover: ${bible.title}`);

    const coverBuf = await extractPdfCover(filePath);
    if (!coverBuf) {
      console.error(`  ❌ Could not extract cover`);
      failed++;
      continue;
    }

    try {
      const coverFilename = `cover-${bible.slug}.jpg`;
      const blob = new Blob([coverBuf], { type: "image/jpeg" });
      const file = new File([blob], coverFilename, { type: "image/jpeg" });

      const result = await utapi.uploadFiles(file);
      if (result.error) {
        console.error(`  ❌ Upload failed: ${result.error.message ?? JSON.stringify(result.error)}`);
        failed++;
        continue;
      }

      const coverUrl = result.data.ufsUrl ?? result.data.url;
      await db.bibleEdition.update({
        where: { id: bible.id },
        data:  { coverUrl },
      });

      console.log(`  ✅ ${bible.title}`);
      done++;
    } catch (err) {
      console.error(`  ❌ ${bible.title}: ${err instanceof Error ? err.message : String(err)}`);
      failed++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Extracted & uploaded: ${done}`);
  console.log(`   ⏭  Skipped (no file):    ${skipped}`);
  console.log(`   ❌ Failed:               ${failed}`);

  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
