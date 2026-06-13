/**
 * upload-specific-bibles.ts
 *
 * Uploads specific PDF bibles from bibles/ to UploadThing and
 * creates/updates their BibleEdition rows — without touching any existing rows.
 *
 * Usage (run on the production server):
 *   pnpm tsx --env-file=.env.local scripts/upload-specific-bibles.ts
 */

import fs from "fs";
import path from "path";
import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";

const utapi = new UTApi();
const db = new PrismaClient();
const BIBLES_DIR = path.join(process.cwd(), "bibles");

const DELAY_MS = 500;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Bible definitions ────────────────────────────────────────────────────────

const BIBLES: Array<{
  filename: string;
  title: string;
  slug: string;
  translation: string;
  publisher: string;
  publishedYear: number;
  description: string;
  history: string;
  canonRating: number;
  canonNotes: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  featured: boolean;
}> = [
  {
    filename: "The Satanic Bible.pdf",
    title: "The Satanic Bible",
    slug: "the-satanic-bible",
    translation: "OTHER",
    publisher: "Avon Books",
    publishedYear: 1969,
    description:
      "Written by Anton Szandor LaVey and published in 1969 by Avon Books, The Satanic Bible is the central religious text of LaVeyan Satanism. It is a collection of essays, observations, and rituals presenting a secular, individualistic philosophy that inverts traditional Judeo-Christian morality. Included here as a comparative religious text for study and reference.",
    history:
      "Anton LaVey founded the Church of Satan in San Francisco on April 30, 1966, and wrote The Satanic Bible in 1969 as its foundational text. Drawing on Friedrich Nietzsche, Ayn Rand, and Aleister Crowley, LaVey outlined a philosophy of self-interest, carnality, and skepticism of supernatural theism. The book has sold over one million copies and remains the most widely read document in the Satanist tradition.",
    canonRating: 1,
    canonNotes:
      "Not a Bible translation. A religious text of LaVeyan Satanism included here for comparative religion and reference purposes only.",
    gradientFrom: "#2A0A0A",
    gradientTo: "#0F0303",
    accentColor: "#CC3333",
    featured: false,
  },
  {
    filename: "storyoftheapocry012726mbp.pdf",
    title: "The Story of the Apocrypha",
    slug: "the-story-of-the-apocrypha",
    translation: "OTHER",
    publisher: "Edgar J. Goodspeed",
    publishedYear: 1913,
    description:
      "A historical survey of the Apocrypha — the collection of ancient Jewish and early Christian writings that appear in Catholic and Orthodox Old Testaments but were excluded from the Protestant canon. This volume examines the content, background, and theological significance of books such as Tobit, Judith, Maccabees, Sirach, and the Wisdom of Solomon.",
    history:
      "The Apocrypha (Greek: 'hidden things') refers to a body of texts written between roughly 300 BC and AD 100 that were included in the Septuagint (Greek Old Testament) and later incorporated into the Latin Vulgate. The Council of Trent (1546) formally declared them deuterocanonical for Catholics. Protestant Reformers, following Jerome's distinction, excluded them from the canon but recognized their historical value. This book offers a readable introduction to their origins, contents, and contested status across Christian traditions.",
    canonRating: 4,
    canonNotes:
      "Covers the deuterocanonical/apocryphal books accepted by Catholic and Orthodox traditions but excluded from the 66-book Protestant canon. Included here as a historical and comparative religious reference.",
    gradientFrom: "#2A3A1A",
    gradientTo: "#151F0D",
    accentColor: "#8BBB55",
    featured: false,
  },
  {
    filename: "womansbible02stan.pdf",
    title: "The Woman's Bible (Vol. 2)",
    slug: "the-womans-bible-vol-2",
    translation: "OTHER",
    publisher: "European Publishing Company",
    publishedYear: 1898,
    description:
      "The Woman's Bible, Part II, compiled by Elizabeth Cady Stanton and the Revising Committee, examines the Epistles of Paul, Peter, John, James, and the Book of Revelation through the lens of women's rights and equality. A landmark 19th-century feminist commentary that challenged patriarchal interpretations of Scripture.",
    history:
      "Elizabeth Cady Stanton, pioneer of the American women's suffrage movement, assembled a committee of women scholars to produce The Woman's Bible. Part I appeared in 1895 and caused immediate controversy; Part II followed in 1898. Stanton argued that the traditional interpretation of Scripture had been used to subordinate women and sought to reinterpret key passages from a woman-centered perspective. The work was condemned by the National American Woman Suffrage Association but became a foundational text in feminist theology.",
    canonRating: 3,
    canonNotes:
      "Not a Bible translation. A feminist commentary on selected biblical texts by Elizabeth Cady Stanton (1898). Included as a historical and theological reference.",
    gradientFrom: "#3A1A2E",
    gradientTo: "#1F0D18",
    accentColor: "#CC6699",
    featured: false,
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📚 Processing ${BIBLES.length} bibles...\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const bible of BIBLES) {
    const filePath = path.join(BIBLES_DIR, bible.filename);

    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  File not found, skipping: ${bible.filename}`);
      skipped++;
      continue;
    }

    // Check if already uploaded
    const existing = await db.bibleEdition.findUnique({ where: { slug: bible.slug } });
    if (existing?.fileUrl) {
      console.log(`⏭  Already uploaded: ${bible.title}`);
      skipped++;
      continue;
    }

    const sizeMB = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);
    console.log(`⬆️  Uploading: ${bible.title} (${sizeMB} MB)`);

    try {
      const buf = fs.readFileSync(filePath);
      const blob = new Blob([buf], { type: "application/pdf" });
      const file = new File([blob], bible.filename, { type: "application/pdf" });

      const result = await utapi.uploadFiles(file);

      if (result.error) {
        console.error(`❌ Upload failed: ${result.error.message ?? JSON.stringify(result.error)}`);
        failed++;
        continue;
      }

      const fileUrl = result.data.ufsUrl ?? result.data.url;

      await db.bibleEdition.upsert({
        where: { slug: bible.slug },
        create: { ...bible, fileUrl },
        update: { fileUrl },
      });

      console.log(`✅ ${bible.title} → ${fileUrl}`);
      uploaded++;
    } catch (err) {
      console.error(`❌ Error: ${err instanceof Error ? err.message : String(err)}`);
      failed++;
    }

    await sleep(DELAY_MS);
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Uploaded: ${uploaded}`);
  console.log(`   ⏭  Skipped:  ${skipped}`);
  console.log(`   ❌ Failed:   ${failed}`);

  await db.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
