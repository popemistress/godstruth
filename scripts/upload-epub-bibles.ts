/**
 * upload-epub-bibles.ts
 *
 * 1. Deletes all existing BibleEdition rows (the old PDF entries)
 * 2. Reads every .epub file from bibles/
 * 3. Uploads each to UploadThing (skips already-uploaded ones)
 * 4. Creates/updates a BibleEdition row for each
 */

import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const utapi = new UTApi();
const db    = new PrismaClient();
const BIBLES_DIR = path.join(process.cwd(), "bibles");

// ─── Translation profiles ────────────────────────────────────────────────────

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
    canonRating: 10, canonNotes: "Strictly follows the 66-book Protestant canon with formal equivalence translation. The definitive benchmark for canon alignment.",
    gradientFrom: "#1B2A4A", gradientTo: "#0D1525", accentColor: "#C9A84C",
  },
  NIV: {
    fullName: "New International Version", publisher: "Zondervan / Biblica", publishedYear: 1978,
    history: "The New International Version was initiated in 1965 and first published in 1978 by the International Bible Society (now Biblica). Over 100 scholars from multiple denominations used dynamic equivalence to render the originals into natural contemporary English. Revised in 1984 and 2011, it is the world's best-selling modern Bible translation.",
    canonRating: 9, canonNotes: "Contains all 66 books of the Protestant canon using thought-for-thought translation philosophy.",
    gradientFrom: "#1E3A28", gradientTo: "#0F1F15", accentColor: "#5A9E6F",
  },
  NIrV: {
    fullName: "New International Reader's Version", publisher: "Zondervan / Biblica", publishedYear: 1994,
    history: "The New International Reader's Version was developed in 1994 as a simplified version of the NIV for early readers and children. Translated at a third-grade reading level using shorter sentences and simpler vocabulary, it remains a trusted first Bible for young readers while maintaining the NIV's textual foundation.",
    canonRating: 8, canonNotes: "Contains all 66 books; simplified NIV translation with no doctrinal changes to the canon.",
    gradientFrom: "#1A3A5C", gradientTo: "#0D1F33", accentColor: "#5BB3E8",
  },
  NASB: {
    fullName: "New American Standard Bible", publisher: "Lockman Foundation", publishedYear: 1960,
    history: "The New American Standard Bible was first published in 1960 by the Lockman Foundation as a rigorous update to the American Standard Version of 1901. Known as the most literally accurate English translation, it was revised in 1995 and again in 2020. Scholars and pastors prize it above all others for in-depth word study.",
    canonRating: 10, canonNotes: "Strictly 66 books; considered the most literal word-for-word English translation available.",
    gradientFrom: "#3D1515", gradientTo: "#1F0A0A", accentColor: "#C96B6B",
  },
  NKJV: {
    fullName: "New King James Version", publisher: "Thomas Nelson", publishedYear: 1982,
    history: "The New King James Version was published in 1982 by Thomas Nelson, commissioned to update the archaic language of the 1611 KJV while preserving its literary style. Using the same Textus Receptus Greek New Testament and Masoretic Hebrew text as the KJV, it bridges traditional and modern readability for millions of readers.",
    canonRating: 10, canonNotes: "Exactly 66 books using the same text tradition as the KJV; strong formal equivalence.",
    gradientFrom: "#2D1B4E", gradientTo: "#180D2A", accentColor: "#9B59B6",
  },
  ESV: {
    fullName: "English Standard Version", publisher: "Crossway", publishedYear: 2001,
    history: "The English Standard Version was published in 2001 by Crossway, based on the Revised Standard Version of 1971. Produced by more than 100 scholars, the ESV emphasizes word-for-word accuracy, literary excellence, and depth of meaning. It has become the preferred translation for reformed and evangelical scholars and seminaries.",
    canonRating: 10, canonNotes: "Strictly 66 books; highly regarded for its formal equivalence and textual precision.",
    gradientFrom: "#1E3A2F", gradientTo: "#0F1F18", accentColor: "#5DBB87",
  },
  NLT: {
    fullName: "New Living Translation", publisher: "Tyndale House Publishers", publishedYear: 1996,
    history: "The New Living Translation was first published in 1996 by Tyndale House Publishers, building on the earlier Living Bible paraphrase. A team of 90 scholars rendered the original languages into natural, contemporary English using thought-for-thought equivalence. Revised in 2004 and 2015, it emphasizes clarity and immediate understanding.",
    canonRating: 8, canonNotes: "Contains all 66 books; a thought-for-thought translation prioritizing clarity and readability.",
    gradientFrom: "#5C3D1A", gradientTo: "#2E1F0D", accentColor: "#E8A44A",
  },
  CSB: {
    fullName: "Christian Standard Bible", publisher: "Holman Bible Publishers / LifeWay", publishedYear: 2017,
    history: "The Christian Standard Bible was published by Holman Bible Publishers in 2017 as a thorough revision of the Holman Christian Standard Bible. Translated by over 100 scholars using Optimal Equivalence — a balanced approach between word-for-word and thought-for-thought — the CSB has quickly gained adoption in seminaries and churches.",
    canonRating: 9, canonNotes: "Contains all 66 books; optimal equivalence translation balancing accuracy with readability.",
    gradientFrom: "#1A3A45", gradientTo: "#0D1F25", accentColor: "#4DB8CC",
  },
  HCSB: {
    fullName: "Holman Christian Standard Bible", publisher: "Holman Bible Publishers", publishedYear: 2004,
    history: "The Holman Christian Standard Bible was published in 2004 by Holman Bible Publishers. It introduced the concept of Optimal Equivalence translation and preceded the 2017 CSB revision. The HCSB is noted for restoring 'Yahweh' as the divine name in the Old Testament and remains popular for its balance of accuracy and readability.",
    canonRating: 9, canonNotes: "Contains all 66 books; predecessor to the CSB with the same optimal equivalence approach.",
    gradientFrom: "#2B3A1E", gradientTo: "#161E0F", accentColor: "#8BB84A",
  },
  NRSV: {
    fullName: "New Revised Standard Version", publisher: "National Council of Churches", publishedYear: 1989,
    history: "The New Revised Standard Version was published in 1989 by the National Council of Churches as an update to the RSV of 1952. A 30-member scholarly committee introduced gender-inclusive language and applied current textual criticism. Many NRSV editions include the Apocrypha, making it the preferred academic and ecumenical translation.",
    canonRating: 6, canonNotes: "Many NRSV editions include the Apocrypha/Deuterocanon; the 66-book core is retained but additional texts are often included.",
    gradientFrom: "#3A2D1E", gradientTo: "#1F180F", accentColor: "#C9A87A",
  },
  CEB: {
    fullName: "Common English Bible", publisher: "Common English Bible", publishedYear: 2011,
    history: "The Common English Bible was published in 2011, translated by 120 scholars from 24 faith traditions. Designed for a 7th-grade reading level with gender-accurate language, the CEB has been widely adopted in mainline Protestant denominations. An expanded edition with the Apocrypha is also available.",
    canonRating: 6, canonNotes: "Standard edition: 66 books. With Apocrypha edition adds deuterocanonical books common in Catholic/Orthodox tradition.",
    gradientFrom: "#2A1A3A", gradientTo: "#150D1F", accentColor: "#A87ACC",
  },
  AMP: {
    fullName: "Amplified Bible", publisher: "Zondervan / Lockman Foundation", publishedYear: 1965,
    history: "The Amplified Bible was first published in 1965 by Zondervan and the Lockman Foundation. It uses brackets and parentheses to expand on the meaning of words in the original Hebrew and Greek, allowing readers to understand nuances without consulting a commentary. The Bible was significantly revised in 2015 with updated language.",
    canonRating: 9, canonNotes: "Contains all 66 books with formal equivalence; expands on Greek and Hebrew word meanings within the text itself.",
    gradientFrom: "#1A2A4A", gradientTo: "#0D1525", accentColor: "#6B9ECC",
  },
  CJB: {
    fullName: "Complete Jewish Bible", publisher: "Jewish New Testament Publications", publishedYear: 1998,
    history: "The Complete Jewish Bible was translated by David H. Stern and published in 1998. It presents both the Tanakh and New Testament in a Jewish cultural context, restoring Hebrew names, terms, and idioms throughout. Designed to help Jewish and Christian readers understand the Jewishness of Scripture, it is widely used in Messianic communities.",
    canonRating: 7, canonNotes: "Contains all 66 books using Hebrew names and cultural context; different book arrangement from standard Protestant canon.",
    gradientFrom: "#1A3A45", gradientTo: "#0D1E25", accentColor: "#4DB8CC",
  },
  MSG: {
    fullName: "The Message", publisher: "NavPress", publishedYear: 2002,
    history: "The Message was written by scholar and pastor Eugene Peterson over ten years and published by NavPress beginning in 1993, with the complete Bible released in 2002. Peterson translated directly from Hebrew, Aramaic, and Greek into contemporary American vernacular, capturing the urgency and beauty of Scripture in fresh, living language.",
    canonRating: 7, canonNotes: "Contains all 66 books; a paraphrase prioritizing the spirit and tone of Scripture over literal word-for-word rendering.",
    gradientFrom: "#7B3F00", gradientTo: "#3D1F00", accentColor: "#F4A261",
  },
  VOICE: {
    fullName: "The Voice", publisher: "Thomas Nelson / Ecclesia Bible Society", publishedYear: 2012,
    history: "The Voice Bible was published by Thomas Nelson in 2012, developed by Ecclesia Bible Society with scholars and creative writers. Its distinctive script-style format distinguishes Jesus's words, added explanatory phrases (in italics), and dialogue to make the narrative accessible. It aims to recapture the living, oral quality of Scripture.",
    canonRating: 7, canonNotes: "Contains all 66 books; dynamic equivalence with added explanatory phrases clearly marked in italics.",
    gradientFrom: "#1A2A3A", gradientTo: "#0D1520", accentColor: "#6AA8C9",
  },
  TPT: {
    fullName: "The Passion Translation", publisher: "Broadstreet Publishing", publishedYear: 2017,
    history: "The Passion Translation was produced by Brian Simmons and published by Broadstreet Publishing beginning in 2014. It aims to re-introduce the passion and emotion of the original biblical writings for a devotional reading experience. While praised for its devotional quality, it has been criticized by textual scholars for extensive creative liberties.",
    canonRating: 5, canonNotes: "Contains all 66 books but takes significant interpretive liberties beyond the original text; not recommended as a primary study translation.",
    gradientFrom: "#3A1A2A", gradientTo: "#1F0D15", accentColor: "#E87AA8",
  },
  DARBY: {
    fullName: "Darby Translation", publisher: "Various", publishedYear: 1890,
    history: "The Darby Bible was produced by John Nelson Darby, founder of the Plymouth Brethren movement, over several decades and published posthumously in 1890. Highly literal and precise, Darby translated directly from the Hebrew and Greek with minimal regard for readability in favor of accuracy. It remains foundational in dispensationalist theology.",
    canonRating: 9, canonNotes: "Strictly 66 books; very literal word-for-word translation, highly regarded for its textual precision.",
    gradientFrom: "#2A2A1A", gradientTo: "#151510", accentColor: "#C9C96B",
  },
  TLV: {
    fullName: "Tree of Life Version", publisher: "Messianic Jewish Family Bible Society", publishedYear: 2014,
    history: "The Tree of Life Version was published in 2014 by the Messianic Jewish Family Bible Society. It restores the Jewishness of the Bible by using Hebrew names, terms, and cultural expressions throughout. Designed to bridge Jewish and Christian readers, it is the only modern translation produced specifically by the Messianic Jewish community.",
    canonRating: 8, canonNotes: "Contains all 66 books; unique Messianic Jewish perspective with Hebrew names and terminology restored throughout.",
    gradientFrom: "#1A3A2A", gradientTo: "#0D1F15", accentColor: "#5AC99A",
  },
  TLB: {
    fullName: "The Living Bible", publisher: "Tyndale House Publishers", publishedYear: 1971,
    history: "The Living Bible was published by Tyndale House Publishers in 1971, created by Kenneth N. Taylor to help his children understand the Bible. A paraphrase of the American Standard Version, it rendered Scripture into conversational, everyday English. It sold over 40 million copies and directly inspired the creation of the New Living Translation.",
    canonRating: 7, canonNotes: "Contains all 66 books; a paraphrase that prioritizes readability over literal accuracy.",
    gradientFrom: "#3A2A1A", gradientTo: "#1F150D", accentColor: "#C9A05A",
  },
  NCV: {
    fullName: "New Century Version", publisher: "Thomas Nelson", publishedYear: 1987,
    history: "The New Century Version was first published in 1987 by Word Publishing (now Thomas Nelson), translated at a 3rd-grade reading level from Hebrew and Greek. It was later incorporated into The Everyday Bible and various devotional editions. It remains a popular choice for children's Bibles and accessible devotional reading.",
    canonRating: 8, canonNotes: "Contains all 66 books; simplified translation designed for maximum comprehension.",
    gradientFrom: "#2A3A2A", gradientTo: "#151F15", accentColor: "#7AC97A",
  },
  GENEVA: {
    fullName: "Geneva Bible", publisher: "Various (historical)", publishedYear: 1560,
    history: "The Geneva Bible was the first English Bible to use chapter and verse divisions, produced by Protestant reformers in Geneva in 1560. It was the primary Bible of the Puritans, Pilgrims, and Shakespeare. The Geneva Bible predates the KJV by 51 years and was the most widely read English Bible of the Reformation era.",
    canonRating: 9, canonNotes: "Closely follows the 66-book Protestant canon; this historic edition reflects Reformation-era textual scholarship.",
    gradientFrom: "#2A1A10", gradientTo: "#150D08", accentColor: "#C9853A",
  },
  BEREAN: {
    fullName: "Berean Bible", publisher: "Bible Hub", publishedYear: 2016,
    history: "The Berean Bibles were published by Bible Hub beginning in 2016 and are available in two versions: the Berean Study Bible (BSB) and the Berean Literal Bible (BLB). The BSB is a formal equivalence translation optimized for clarity and depth; the BLB is an extremely literal interlinear translation for word-level study.",
    canonRating: 10, canonNotes: "Strictly 66 books; either formal or ultra-literal translation with high fidelity to the original languages.",
    gradientFrom: "#1A2A3A", gradientTo: "#0D1520", accentColor: "#7AB8E8",
  },
  OTHER: {
    fullName: "Bible Translation", publisher: "Various", publishedYear: 2000,
    history: "This edition presents the Scriptures as part of the rich tradition of biblical scholarship and translation. The Bible has been translated into thousands of languages, with each version reflecting the theological priorities and scholarship of its translators.",
    canonRating: 8, canonNotes: "Canon alignment depends on the specific translation and publisher.",
    gradientFrom: "#2A2A2A", gradientTo: "#151515", accentColor: "#909090",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function detectTranslation(filename: string): string {
  const f = filename.toUpperCase();
  if (f.startsWith("NIRV"))          return "NIrV";
  if (f.startsWith("NIV"))           return "NIV";
  if (f.startsWith("NKJV"))         return "NKJV";
  if (f.startsWith("NASB"))         return "NASB";
  if (f.startsWith("NRSV"))         return "NRSV";
  if (f.startsWith("NLT") || f.startsWith("BIBLE NLT"))  return "NLT";
  if (f.startsWith("NCV"))          return "NCV";
  if (f.startsWith("KJV") || f.startsWith("KING JAMES") || f.includes("KING JAMES")) return "KJV";
  if (f.startsWith("ESV"))          return "ESV";
  if (f.startsWith("CSB"))          return "CSB";
  if (f.startsWith("CEB") || f.includes("COMMON ENGLISH"))  return "CEB";
  if (f.startsWith("HCSB"))         return "HCSB";
  if (f.includes("AMPLIFIED") || f.includes(", AMP"))  return "AMP";
  if (f.includes("COMPLETE JEWISH") || f.includes("JEWISH BIBLE")) return "CJB";
  if (f.includes("THE MESSAGE") || f.startsWith("MESSAGE")) return "MSG";
  if (f.includes("THE VOICE") || f.startsWith("VOICE")) return "VOICE";
  if (f.includes("PASSION TRANSLATION") || f.includes("TPT")) return "TPT";
  if (f.startsWith("DARBY"))        return "DARBY";
  if (f.startsWith("TLV"))          return "TLV";
  if (f.startsWith("TLB"))          return "TLB";
  if (f.includes("LIVING BIBLE"))   return "TLB";
  if (f.includes("GENEVA BIBLE") || f.includes("TGB")) return "GENEVA";
  if (f.includes("BEREAN"))         return "BEREAN";
  if (f.includes("ORTHODOX"))       return "OTHER";
  if (f.includes("HEBREW BIBLE"))   return "OTHER";
  return "OTHER";
}

function cleanTitle(filename: string): string {
  return filename
    .replace(/\.epub$/i, "")
    .replace(/ - Bible$/i, "")
    .replace(/ - Bible\.epub$/i, "")
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

function detectPublisher(filename: string, translationCode: string): string {
  const f = filename.toLowerCase();
  const profile = PROFILES[translationCode] ?? PROFILES.OTHER;
  if (f.includes("zondervan"))      return "Zondervan";
  if (f.includes("tyndale"))        return "Tyndale House Publishers";
  if (f.includes("thomas nelson") || f.includes("nelson")) return "Thomas Nelson";
  if (f.includes("crossway"))       return "Crossway";
  if (f.includes("holman"))         return "Holman Bible Publishers";
  if (f.includes("lockman"))        return "Lockman Foundation";
  if (f.includes("lifeway"))        return "LifeWay Christian Resources";
  if (f.includes("navpress"))       return "NavPress";
  if (f.includes("broadstreet"))    return "Broadstreet Publishing";
  if (f.includes("baker"))          return "Baker Publishing Group";
  if (f.includes("moody"))          return "Moody Publishers";
  if (f.includes("ivp"))            return "InterVarsity Press";
  if (f.includes("macarthur"))      return translationCode === "NASB" ? "Thomas Nelson" : "Crossway";
  if (f.includes("stanley"))        return "Thomas Nelson";
  if (f.includes("maxwell"))        return "Thomas Nelson";
  if (f.includes("spurgeon"))       return "Holman Bible Publishers";
  return profile.publisher;
}

function buildDescription(title: string, translationCode: string): string {
  const profile = PROFILES[translationCode] ?? PROFILES.OTHER;
  const t = title.toLowerCase();
  if (t.includes("study bible"))    return `A comprehensive study edition of the ${profile.fullName} featuring in-depth notes, cross-references, commentary, and articles to enrich Bible reading and personal study.`;
  if (t.includes("devotional"))     return `A devotional edition of the ${profile.fullName} designed to guide daily personal reflection with readings, prayers, and spiritual insight woven alongside the biblical text.`;
  if (t.includes("teen") || t.includes("teens")) return `An edition of the ${profile.fullName} specifically designed for teenagers, with relevant notes, articles, and contemporary connections to help young readers engage deeply with Scripture.`;
  if (t.includes("kids") || t.includes("children") || t.includes("junior") || t.includes("beginner")) return `A Bible edition of the ${profile.fullName} designed for children, featuring age-appropriate notes, colorful features, and engaging content to make Scripture accessible for young readers.`;
  if (t.includes("women") || t.includes("woman") || t.includes("girl")) return `A Bible edition of the ${profile.fullName} created specifically for women, with notes, articles, and devotional content addressing the unique spiritual journey and experiences of women.`;
  if (t.includes("men") || t.includes("man") || t.includes("guy")) return `A Bible edition of the ${profile.fullName} created specifically for men, with notes, articles, and devotional content addressing the spiritual needs and challenges men face today.`;
  if (t.includes("leadership") || t.includes("leader")) return `A leadership-focused edition of the ${profile.fullName} with notes, articles, and insights on biblical leadership principles drawn from Scripture's greatest leaders.`;
  if (t.includes("chronological")) return `A chronological edition of the ${profile.fullName} that reorganizes the biblical text in the order events occurred, providing a unique narrative reading experience of the full sweep of Scripture.`;
  if (t.includes("one year"))       return `A one-year Bible edition of the ${profile.fullName} organized into 365 daily readings combining Old Testament, New Testament, Psalms, and Proverbs for a complete annual Bible-reading plan.`;
  if (t.includes("commentary"))     return `A commentary edition combining the text of the ${profile.fullName} with detailed verse-by-verse commentary and scholarly insight for deeper understanding of the biblical text.`;
  if (t.includes("apologetics"))    return `An apologetics edition of the ${profile.fullName} with notes and articles addressing common questions about the Christian faith, equipping readers to understand and defend their beliefs.`;
  if (t.includes("archaeological")) return `An archaeological study edition of the ${profile.fullName} with notes, photos, and articles connecting biblical events to archaeological discoveries, bringing the ancient world to life.`;
  if (t.includes("recovery") || t.includes("healing")) return `A recovery-focused edition of the ${profile.fullName} with notes and devotionals specifically designed to support spiritual healing, freedom from addiction, and life transformation.`;
  if (t.includes("adventure"))      return `An adventurous edition of the ${profile.fullName} with exciting features, notes, and activities designed to help readers discover the adventure of living out God's Word in everyday life.`;
  if (t.includes("story"))          return `A narrative edition of the ${profile.fullName} that presents the overarching biblical narrative from Creation to Revelation as one unified story of God's redemptive plan for humanity.`;
  if (t.includes("atlas"))          return `A geographical reference work featuring maps, charts, and geographical data illuminating the lands, cities, and regions of the Bible for deeper contextual understanding.`;
  if (t.includes("handbook") || t.includes("dictionary") || t.includes("concordance") || t.includes("encyclopedia")) return `A comprehensive reference work providing alphabetical articles, definitions, and explanations of biblical people, places, themes, and concepts for in-depth study.`;
  return `An edition of the ${profile.fullName} offering the complete biblical text in a carefully formatted and accessible presentation for personal reading, study, and devotion.`;
}

function isFeatured(filename: string): boolean {
  const f = filename.toLowerCase();
  return (
    f.includes("holy bible") ||
    (f.includes("study bible") && !f.includes("kids") && !f.includes("teen")) ||
    f.includes("macarthur") ||
    f.includes("life application") ||
    f.includes("zondervan study")
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // Step 1: delete all existing PDF-based BibleEdition rows
  const deleted = await db.bibleEdition.deleteMany({});
  console.log(`🗑  Deleted ${deleted.count} existing BibleEdition rows\n`);

  // Step 2: list all epub files
  const files = fs.readdirSync(BIBLES_DIR)
    .filter(f => f.toLowerCase().endsWith(".epub"))
    .sort();

  console.log(`📚 Found ${files.length} epub files to upload\n`);

  let uploaded = 0, skipped = 0, failed = 0;
  const usedSlugs = new Set<string>();

  for (const filename of files) {
    const filePath = path.join(BIBLES_DIR, filename);
    const title    = cleanTitle(filename);
    const trans    = detectTranslation(filename);
    const profile  = PROFILES[trans] ?? PROFILES.OTHER;
    const sizeMB   = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);

    // Build a unique slug
    let slug = toSlug(title);
    if (usedSlugs.has(slug)) slug = `${slug}-2`;
    if (usedSlugs.has(slug)) slug = `${slug.replace(/-2$/, "")}-${Date.now().toString(36)}`;
    usedSlugs.add(slug);

    // Skip if already in DB with a fileUrl
    const existing = await db.bibleEdition.findUnique({ where: { slug } });
    if (existing?.fileUrl) {
      console.log(`⏭  Skipping (already uploaded): ${title}`);
      skipped++;
      continue;
    }

    console.log(`⬆️  Uploading: ${title} (${sizeMB} MB)`);

    try {
      const buf  = fs.readFileSync(filePath);
      const blob = new Blob([buf], { type: "application/epub+zip" });
      const file = new File([blob], filename, { type: "application/epub+zip" });

      const result = await utapi.uploadFiles(file);

      if (result.error) {
        console.error(`❌ ${title}: ${result.error.message ?? JSON.stringify(result.error)}`);
        failed++;
        // Still create the DB row without a fileUrl so metadata is available
      }

      const fileUrl = result.data ? (result.data.ufsUrl ?? result.data.url) : undefined;

      const payload = {
        title,
        slug,
        translation:   trans === "NIrV" ? "NIrV" : trans,
        publisher:     detectPublisher(filename, trans),
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
        fileUrl:       fileUrl ?? null,
      };

      await db.bibleEdition.upsert({
        where:  { slug },
        update: { fileUrl: fileUrl ?? null },
        create: payload,
      });

      if (fileUrl) {
        console.log(`✅ ${title}`);
        uploaded++;
      }
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
