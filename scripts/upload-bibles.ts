/**
 * Upload Bible PDFs from the bibles/ folder to UploadThing
 * and update the database with the resulting URLs.
 *
 * Usage:
 *   npx ts-node --project tsconfig.json scripts/upload-bibles.ts
 *
 * Prerequisites:
 *   - UPLOADTHING_TOKEN set in .env.local
 *   - DATABASE_URL set in .env.local
 *   - pnpm db:push has been run
 *   - pnpm db:seed has been run (so BibleEdition rows exist)
 */

// .env.local is loaded via --env-file flag in pnpm bibles:upload
import fs from "fs";
import path from "path";
import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";

const utapi = new UTApi();
const db = new PrismaClient();

const BIBLES_DIR = path.join(process.cwd(), "bibles");
const DELAY_MS = 500; // polite delay between uploads

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const editions = await db.bibleEdition.findMany({
    where: { filename: { not: null }, fileUrl: null },
    select: { id: true, title: true, filename: true },
  });

  if (editions.length === 0) {
    console.log("✅ All Bible editions already have fileUrls. Nothing to upload.");
    return;
  }

  console.log(`📚 Uploading ${editions.length} Bible PDFs to UploadThing...\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const edition of editions) {
    const filePath = path.join(BIBLES_DIR, edition.filename!);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found, skipping: ${edition.filename}`);
      skipped++;
      continue;
    }

    try {
      const fileBuffer = fs.readFileSync(filePath);
      const blob = new Blob([fileBuffer], { type: "application/pdf" });
      const file = new File([blob], edition.filename!, { type: "application/pdf" });

      console.log(`⬆️  Uploading: ${edition.title}`);
      const response = await utapi.uploadFiles(file);

      if (response.error) {
        console.error(`❌ Upload failed for "${edition.title}":`, response.error);
        failed++;
      } else {
        await db.bibleEdition.update({
          where: { id: edition.id },
          data: { fileUrl: response.data.ufsUrl ?? response.data.url },
        });
        console.log(`✅ Uploaded: ${edition.title}`);
        uploaded++;
      }
    } catch (err) {
      console.error(`❌ Error uploading "${edition.title}":`, err);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Uploaded: ${uploaded}`);
  console.log(`   ⚠️  Skipped:  ${skipped}`);
  console.log(`   ❌ Failed:   ${failed}`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
