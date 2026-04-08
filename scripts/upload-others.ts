/**
 * upload-others.ts
 *
 * Uploads all files from the Others/ folder to UploadThing and creates
 * BibleEdition rows WITHOUT deleting existing entries.
 */

import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const utapi = new UTApi();
const db = new PrismaClient();
const OTHERS_DIR = path.join(process.cwd(), "Others");

// ─── Translation profiles (same as upload-epub-bibles.ts) ───────────────────

interface Profile {
  fullName: string;
  publisher: string;
  publishedYear: number;
  history: string;
  canonRating: number;
  canonNotes: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
}

const PROFILES: Record<string, Profile> = {
  KJV: {
    fullName: "King James Version", publisher: "Thomas Nelson / Various", publishedYear: 1611,
    history: "The King James Version was commissioned by King James I of England in 1604 and completed in 1611 by 47 scholars drawing from Hebrew, Aramaic, and Greek manuscripts. Its majestic prose established the standard for English Bible translation for over three centuries and remains the most widely distributed Bible in history.",
    canonRating: 10, canonNotes: "Strictly follows the 66-book Protestant canon with formal equivalence translation.",
    gradientFrom: "#1B2A4A", gradientTo: "#0D1525", accentColor: "#C9A84C",
  },
  NIV: {
    fullName: "New International Version", publisher: "Zondervan / Biblica", publishedYear: 1978,
    history: "The New International Version was first published in 1978 and is the world's best-selling modern Bible translation, produced by over 100 scholars using dynamic equivalence to render the originals into natural contemporary English.",
    canonRating: 9, canonNotes: "Contains all 66 books of the Protestant canon.",
    gradientFrom: "#1E3A28", gradientTo: "#0F1F15", accentColor: "#5A9E6F",
  },
  NKJV: {
    fullName: "New King James Version", publisher: "Thomas Nelson", publishedYear: 1982,
    history: "The New King James Version was published in 1982 by Thomas Nelson to update the archaic language of the 1611 KJV while preserving its literary style and using the same Textus Receptus Greek New Testament.",
    canonRating: 10, canonNotes: "Exactly 66 books using the same text tradition as the KJV.",
    gradientFrom: "#2D1B4E", gradientTo: "#180D2A", accentColor: "#9B59B6",
  },
  NASB: {
    fullName: "New American Standard Bible", publisher: "Lockman Foundation", publishedYear: 1960,
    history: "The New American Standard Bible is known as the most literally accurate English translation, produced by the Lockman Foundation and prized by scholars for in-depth word study.",
    canonRating: 10, canonNotes: "Strictly 66 books; the most literal word-for-word English translation.",
    gradientFrom: "#3D1515", gradientTo: "#1F0A0A", accentColor: "#C96B6B",
  },
  ESV: {
    fullName: "English Standard Version", publisher: "Crossway", publishedYear: 2001,
    history: "The English Standard Version was published in 2001 by Crossway, produced by more than 100 scholars emphasizing word-for-word accuracy and literary excellence.",
    canonRating: 10, canonNotes: "Strictly 66 books; highly regarded for formal equivalence.",
    gradientFrom: "#1E3A2F", gradientTo: "#0F1F18", accentColor: "#5DBB87",
  },
  HCSB: {
    fullName: "Holman Christian Standard Bible", publisher: "Holman Bible Publishers", publishedYear: 2004,
    history: "The Holman Christian Standard Bible was published in 2004 and introduced Optimal Equivalence translation. It is noted for restoring 'Yahweh' as the divine name in the Old Testament.",
    canonRating: 9, canonNotes: "Contains all 66 books; predecessor to the CSB.",
    gradientFrom: "#2B3A1E", gradientTo: "#161E0F", accentColor: "#8BB84A",
  },
  VOICE: {
    fullName: "The Voice", publisher: "Thomas Nelson / Ecclesia Bible Society", publishedYear: 2012,
    history: "The Voice Bible was published by Thomas Nelson in 2012. Its distinctive script-style format distinguishes added explanatory phrases and dialogue to make the narrative accessible.",
    canonRating: 7, canonNotes: "Contains all 66 books; dynamic equivalence with added explanatory phrases.",
    gradientFrom: "#1A2A3A", gradientTo: "#0D1520", accentColor: "#6AA8C9",
  },
  OTHER: {
    fullName: "Bible", publisher: "Various", publishedYear: 2000,
    history: "This edition presents the Scriptures as part of the rich tradition of biblical scholarship and translation.",
    canonRating: 8, canonNotes: "Canon alignment depends on the specific edition and publisher.",
    gradientFrom: "#2A2A2A", gradientTo: "#151515", accentColor: "#909090",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".pdf")  return "application/pdf";
  if (ext === ".mobi") return "application/x-mobipocket-ebook";
  if (ext === ".epub") return "application/epub+zip";
  return "application/octet-stream";
}

function detectTranslation(filename: string): string {
  const f = filename.toUpperCase();
  if (f.startsWith("NKJV") || f.includes(", NKJV"))     return "NKJV";
  if (f.startsWith("KJV") || f.includes(", KJV") || f.includes("KING JAMES")) return "KJV";
  if (f.startsWith("NIV") || f.includes(", NIV"))        return "NIV";
  if (f.startsWith("NASB") || f.includes(", NASB"))      return "NASB";
  if (f.startsWith("ESV") || f.includes(", ESV"))        return "ESV";
  if (f.includes("HOLMAN CHRISTIAN STANDARD"))           return "HCSB";
  if (f.includes("HCSB"))                                return "HCSB";
  if (f.includes("THE VOICE") || f.includes("VOICE,"))  return "VOICE";
  if (f.includes("REFORMATION STUDY BIBLE"))             return "ESV";
  return "OTHER";
}

function cleanTitle(filename: string): string {
  return filename
    .replace(/\.(epub|pdf|mobi)$/i, "")
    .replace(/ - Bible$/i, "")
    .replace(/_/g, " ")
    .trim();
}

function toSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 80);
}

function buildDescription(title: string, translationCode: string): string {
  const profile = PROFILES[translationCode] ?? PROFILES.OTHER;
  const t = title.toLowerCase();
  if (t.includes("study bible"))     return `A comprehensive study edition featuring in-depth notes, cross-references, and commentary to enrich Bible reading and personal study.`;
  if (t.includes("chronological"))   return `A chronological edition of the ${profile.fullName} that reorganizes the biblical text in the order events occurred, providing a unique narrative reading experience.`;
  if (t.includes("teen") || t.includes("extreme teen")) return `A Bible edition designed for teenagers with relevant notes and contemporary connections to help young readers engage deeply with Scripture.`;
  if (t.includes("women") || t.includes("woman"))       return `A Bible edition created specifically for women with notes and devotional content addressing the unique spiritual journey of women.`;
  if (t.includes("children") || t.includes("children's") || t.includes("kids")) return `A Bible or Bible storybook designed for children, with age-appropriate content to make Scripture accessible and engaging for young readers.`;
  if (t.includes("preacher") || t.includes("sermon"))   return `A preacher's edition providing outlined sermons, commentary, and ministry tools for pastors and teachers of God's Word.`;
  if (t.includes("commentary"))      return `A commentary combining the biblical text with detailed verse-by-verse scholarly insight.`;
  if (t.includes("atlas"))           return `A geographical reference work featuring maps, charts, and data illuminating the lands, cities, and regions of the Bible.`;
  if (t.includes("encyclopedia") || t.includes("visual encyclopedia")) return `A comprehensive visual reference work covering biblical people, places, and events with detailed illustrations and articles.`;
  if (t.includes("promise bible") || t.includes("healing")) return `A topically organized Bible highlighting God's promises for healing, wholeness, and restoration throughout Scripture.`;
  if (t.includes("action bible"))    return `A graphic-novel style presentation of over 200 Bible stories, bringing Scripture to life through dynamic illustrations.`;
  if (t.includes("evidence bible")) return `An evangelism-focused Bible with notes answering common questions about the Christian faith and equipping readers to share the gospel.`;
  if (t.includes("training center") || t.includes("billy graham")) return `A special edition Bible connected to the Billy Graham Training Center, designed to equip believers for evangelism and discipleship.`;
  if (t.includes("scofield"))       return `The Scofield Study Bible is a landmark dispensationalist study Bible with extensive notes and cross-references by C.I. Scofield.`;
  if (t.includes("blackaby"))       return `The Blackaby Study Bible features notes by Henry Blackaby guiding readers to experience God in their daily walk with Him.`;
  if (t.includes("macarthur"))      return `The MacArthur Study Bible provides verse-by-verse notes from pastor-scholar John MacArthur, one of the most comprehensive study Bibles available.`;
  if (t.includes("gaither"))        return `A special edition Bible celebrating Christian music and heritage from the Gaither Homecoming tradition.`;
  if (t.includes("lucado"))         return `A life lessons edition by Max Lucado, offering devotional notes and personal application insights alongside the biblical text.`;
  if (t.includes("french") || t.includes("fbj")) return `A French-language Bible edition providing the complete Scriptures for French-speaking readers.`;
  return `An edition presenting the complete text of Scripture in a carefully formatted presentation for personal reading, study, and devotion.`;
}

function isFeatured(filename: string): boolean {
  const f = filename.toLowerCase();
  return (
    f.includes("macarthur") ||
    f.includes("study bible") ||
    f.includes("chronological") ||
    f.includes("scofield")
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const allFiles = fs.readdirSync(OTHERS_DIR)
    .filter(f => /\.(epub|pdf|mobi)$/i.test(f))
    .sort();

  console.log(`📚 Found ${allFiles.length} files in Others/\n`);

  // Build set of slugs already in the DB to avoid collisions
  const existingBibles = await db.bibleEdition.findMany({ select: { slug: true } });
  const usedSlugs = new Set(existingBibles.map(b => b.slug));

  let uploaded = 0, skipped = 0, failed = 0;

  for (const filename of allFiles) {
    const filePath = path.join(OTHERS_DIR, filename);
    const title    = cleanTitle(filename);
    const trans    = detectTranslation(filename);
    const profile  = PROFILES[trans] ?? PROFILES.OTHER;
    const sizeMB   = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);
    const mimeType = getMimeType(filename);

    // Build unique slug
    let slug = toSlug(title);
    if (usedSlugs.has(slug)) slug = `${slug}-2`;
    if (usedSlugs.has(slug)) slug = `${slug.replace(/-2$/, "")}-${Date.now().toString(36)}`;
    usedSlugs.add(slug);

    // Skip if already uploaded
    const existing = await db.bibleEdition.findUnique({ where: { slug } });
    if (existing?.fileUrl) {
      console.log(`⏭  Skipping (already uploaded): ${title}`);
      skipped++;
      continue;
    }

    console.log(`⬆️  Uploading: ${title} (${sizeMB} MB) [${path.extname(filename).slice(1).toUpperCase()}]`);

    try {
      const buf  = fs.readFileSync(filePath);
      const blob = new Blob([buf], { type: mimeType });
      const file = new File([blob], filename, { type: mimeType });

      const result = await utapi.uploadFiles(file);

      if (result.error) {
        console.error(`❌ ${title}: ${result.error.message ?? JSON.stringify(result.error)}`);
        failed++;
        continue;
      }

      const fileUrl = result.data.ufsUrl ?? result.data.url;

      await db.bibleEdition.upsert({
        where:  { slug },
        update: { fileUrl },
        create: {
          title,
          slug,
          translation:   trans,
          publisher:     profile.publisher,
          publishedYear: profile.publishedYear,
          description:   buildDescription(title, trans),
          history:       profile.history,
          canonRating:   profile.canonRating,
          canonNotes:    profile.canonNotes,
          gradientFrom:  profile.gradientFrom,
          gradientTo:    profile.gradientTo,
          accentColor:   profile.accentColor,
          featured:      isFeatured(filename),
          filename,
          fileUrl,
        },
      });

      console.log(`✅ ${title}`);
      uploaded++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ ${title}: ${msg}`);
      failed++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Uploaded:  ${uploaded}`);
  console.log(`   ⏭  Skipped:   ${skipped}`);
  console.log(`   ❌ Failed:    ${failed}`);

  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
