/**
 * upload-dake.ts
 *
 * Uploads the Dake Annotated Reference Bible from the root folder,
 * extracts the first-page cover, and creates/updates the BibleEdition row.
 */

import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";
import sharp from "sharp";
import * as fs from "fs";
import * as path from "path";
import * as os from "os";
import { execSync } from "child_process";

const utapi = new UTApi();
const db = new PrismaClient();

const FILE_PATH = path.join(process.cwd(), "Dake Annotated Reference Bible- - Finis Dake.pdf");
const FILENAME  = "Dake Annotated Reference Bible- - Finis Dake.pdf";

const ENTRY = {
  title:         "Dake Annotated Reference Bible",
  slug:          "dake-annotated-reference-bible",
  translation:   "KJV",
  publisher:     "Dake Publishing",
  publishedYear: 1963,
  description:
    "The Dake Annotated Reference Bible is an extensively annotated King James Version Bible compiled by Finis Jennings Dake and first published in 1963. It contains over 35,000 commentary notes, more than 500,000 cross-references, and detailed theological outlines on every page, making it one of the most heavily annotated study Bibles ever produced. Written from a Pentecostal/charismatic perspective, the Dake Bible is particularly known for its exhaustive treatment of prophecy, eschatology, and the work of the Holy Spirit.",
  history:
    "Finis Jennings Dake (1902–1987) spent decades compiling the annotations and cross-reference system that became this reference Bible, first released by Dake Bible Sales in 1963. It remains in print and is especially valued among Pentecostal, charismatic, and Word of Faith traditions for its detail and scope. The Dake Bible uses the unaltered KJV text alongside Dake's commentary system, which is presented in a distinctive four-column format with notes running parallel to the Scripture.",
  canonRating:   10,
  canonNotes:    "Uses the full 66-book Protestant KJV canon. Dake's annotations reflect a Pentecostal theological perspective but do not alter the biblical text.",
  gradientFrom:  "#1B2A4A",
  gradientTo:    "#0D1525",
  accentColor:   "#C9A84C",
  featured:      true,
  filename:      FILENAME,
};

async function extractCover(pdfPath: string): Promise<Buffer | null> {
  const tmpDir    = fs.mkdtempSync(path.join(os.tmpdir(), "dake-cover-"));
  const outPrefix = path.join(tmpDir, "page");
  try {
    execSync(`pdftoppm -jpeg -f 1 -l 1 -r 150 "${pdfPath}" "${outPrefix}"`, { stdio: "pipe" });
    const files = fs.readdirSync(tmpDir).filter(f => f.endsWith(".jpg") || f.endsWith(".ppm"));
    if (!files.length) return null;
    const buf = fs.readFileSync(path.join(tmpDir, files[0]));
    return await sharp(buf)
      .resize(300, 450, { fit: "cover", position: "top" })
      .jpeg({ quality: 85 })
      .toBuffer();
  } catch (err) {
    console.error("  pdftoppm error:", err instanceof Error ? err.message : String(err));
    return null;
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
}

async function main() {
  if (!fs.existsSync(FILE_PATH)) {
    console.error(`❌ File not found: ${FILE_PATH}`);
    process.exit(1);
  }

  const sizeMB = (fs.statSync(FILE_PATH).size / 1024 / 1024).toFixed(1);
  console.log(`📖 Dake Annotated Reference Bible (${sizeMB} MB)\n`);

  // ── Check if already uploaded ──────────────────────────────────────────────
  const existing = await db.bibleEdition.findUnique({ where: { slug: ENTRY.slug } });
  let fileUrl = existing?.fileUrl ?? null;

  if (fileUrl) {
    console.log("⏭  PDF already uploaded — skipping file upload");
  } else {
    console.log("⬆️  Uploading PDF…");
    const buf    = fs.readFileSync(FILE_PATH);
    const blob   = new Blob([buf], { type: "application/pdf" });
    const file   = new File([blob], FILENAME, { type: "application/pdf" });
    const result = await utapi.uploadFiles(file);
    if (result.error) {
      console.error("❌ Upload failed:", result.error.message ?? JSON.stringify(result.error));
      process.exit(1);
    }
    fileUrl = result.data.ufsUrl ?? result.data.url;
    console.log("✅ PDF uploaded");
  }

  // ── Upsert DB row ──────────────────────────────────────────────────────────
  await db.bibleEdition.upsert({
    where:  { slug: ENTRY.slug },
    update: { fileUrl },
    create: { ...ENTRY, fileUrl },
  });

  // ── Extract cover ──────────────────────────────────────────────────────────
  const row = await db.bibleEdition.findUnique({ where: { slug: ENTRY.slug } });
  if (row?.coverUrl) {
    console.log("⏭  Cover already uploaded — done");
  } else {
    console.log("🖼  Extracting cover from page 1…");
    const coverBuf = await extractCover(FILE_PATH);
    if (!coverBuf) {
      console.error("❌ Could not extract cover");
    } else {
      const coverFile   = new File([new Blob([coverBuf], { type: "image/jpeg" })], `cover-${ENTRY.slug}.jpg`, { type: "image/jpeg" });
      const coverResult = await utapi.uploadFiles(coverFile);
      if (coverResult.error) {
        console.error("❌ Cover upload failed:", coverResult.error.message);
      } else {
        const coverUrl = coverResult.data.ufsUrl ?? coverResult.data.url;
        await db.bibleEdition.update({ where: { slug: ENTRY.slug }, data: { coverUrl } });
        console.log("✅ Cover uploaded");
      }
    }
  }

  console.log("\n✅ Dake Annotated Reference Bible is ready");
  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
