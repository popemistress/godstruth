/**
 * upload-ancient-bibles.ts
 *
 * Uploads all files from the Ancient/ folder to UploadThing and creates
 * BibleEdition rows with translation="ANCIENT". Does NOT delete existing entries.
 */

import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const utapi = new UTApi();
const db = new PrismaClient();
const ANCIENT_DIR = path.join(process.cwd(), "Ancient");

const ANCIENT_PROFILE = {
  publisher: "Various (Historical)",
  publishedYear: 1000,
  history: "These ancient manuscripts and early printed editions represent the foundational textual tradition of the Bible. From the great Greek codices — Sinaiticus, Vaticanus, Alexandrinus — to the Hebrew Masoretic text, the Latin Vulgate, and the Septuagint, these documents form the bedrock upon which all modern Bible translations rest. They are the raw materials of biblical scholarship, preserved across centuries through the dedication of scribes, monks, and scholars who understood their eternal value.",
  canonRating: 9.5,
  canonNotes: "These ancient manuscripts represent the earliest surviving witnesses to the biblical text and are the primary sources for all modern critical editions of the Old and New Testaments.",
  gradientFrom: "#2A1E0A",
  gradientTo: "#150F05",
  accentColor: "#C9A84C",
};

// Per-file metadata overrides based on filename keywords
interface Override {
  title?: string;
  publishedYear?: number;
  description?: string;
  canonRating?: number;
}

function getOverride(filename: string): Override {
  const f = filename.toUpperCase();

  if (f.includes("SCRIVENER") || f.includes("TEXTUS_RECEPTUS_1894"))
    return { title: "Scrivener Greek New Testament — Textus Receptus (1894)", publishedYear: 1894, canonRating: 9,
      description: "F.H.A. Scrivener's 1894 edition of the Greek New Testament, prepared for Cambridge University Press to represent the exact Greek text underlying the King James Version of 1611. Scrivener worked backward from the KJV translation to reconstruct the Greek text used by its translators, producing the definitive scholarly edition of the Textus Receptus for KJV study." };

  if (f.includes("STEPHANUS") || f.includes("EDITIO REGIA") || (f.includes("TEXTUS RECEPTUS") && f.includes("1550")))
    return { title: "Textus Receptus — Editio Regia, Stephanus (1550)", publishedYear: 1550, canonRating: 9,
      description: "Robert Estienne's (Stephanus) 1550 Editio Regia is one of the most influential printed Greek New Testaments ever produced. Published in Paris with royal privilege, it established the 'Received Text' (Textus Receptus) tradition that would become the basis for Protestant Reformation-era translations, including Tyndale, the Geneva Bible, and ultimately the King James Version. Stephanus also introduced the modern verse-division system still used in all Bibles today." };

  if (f.includes("BYZANTINE"))
    return { title: "The Byzantine New Testament in the Original Greek", publishedYear: 2005, canonRating: 9,
      description: "The Byzantine Greek New Testament represents the majority text tradition — the text form found in the overwhelming majority of surviving Greek manuscripts (over 80%). Edited by Maurice Robinson and William Pierpont, this critical edition reconstructs the Byzantine text with full apparatus. It stands as an alternative to the eclectic critical text (NA28/UBS5) and is used by scholars who prioritize the numerical weight of the manuscript tradition over the age of individual witnesses." };

  if (f.includes("CODEX SINAITICUS") && f.includes("NEW"))
    return { title: "Codex Sinaiticus — New Testament", publishedYear: 350, canonRating: 10,
      description: "The Codex Sinaiticus (c. 330–360 AD) is the oldest complete manuscript of the Christian New Testament in Greek. Discovered at Saint Catherine's Monastery on Mount Sinai, it remains one of the most important witnesses to the text of the New Testament and the Greek Old Testament (Septuagint)." };

  if (f.includes("CODEX SINAITICUS") && f.includes("OLD"))
    return { title: "Codex Sinaiticus — Old Testament", publishedYear: 350, canonRating: 10,
      description: "The Old Testament portion of the Codex Sinaiticus (c. 330–360 AD), containing the Septuagint (LXX) — the Greek translation of the Hebrew Scriptures. One of the two oldest and most complete manuscripts of the entire Christian Bible." };

  if (f.includes("CODEX VATICANUS"))
    return { title: "Codex Vaticanus", publishedYear: 325, canonRating: 10,
      description: "The Codex Vaticanus (c. 300–325 AD), housed in the Vatican Library, is one of the oldest and most complete manuscripts of the Greek Bible. Along with the Codex Sinaiticus, it forms the cornerstone of modern New Testament textual criticism and the critical Greek text (NA28/UBS5)." };

  if (f.includes("CODEX ALEXANDRINUS"))
    return { title: "Codex Alexandrinus — Greek New Testament (1860)", publishedYear: 450, canonRating: 10,
      description: "The Codex Alexandrinus (c. 400–440 AD) is a 5th-century Greek manuscript of the complete Christian Bible, one of the three primary uncial codices alongside Sinaiticus and Vaticanus. This 1860 facsimile edition preserves the Greek text of the New Testament as recorded in this ancient manuscript." };

  if (f.includes("CODEX EPHRAEMI"))
    return { title: "Codex Ephraemi Rescriptus", publishedYear: 450, canonRating: 9,
      description: "The Codex Ephraemi Rescriptus (c. 5th century AD) is a Greek palimpsest manuscript — the original biblical text was partially overwritten in the 12th century with a Greek translation of the sermons of Ephrem the Syrian. It contains portions of both the Old and New Testaments and is one of the four great uncial codices." };

  if (f.includes("CODEX CRITICUS") || f.includes("HEBMSS") || f.includes("HEBR"))
    return { title: "Codex Criticus — Hebrew Bible (Hamilton, 1821)", publishedYear: 1821, canonRating: 10,
      description: "A critical edition of the Hebrew Bible published by Hamilton in 1821, drawing on manuscript collections from Kennicott, De Rossi, and other ancient versions. This scholarly edition established a standard text for the Old Testament based on careful comparison of Hebrew manuscripts and ancient witnesses." };

  if (f.includes("LENINGRAD") || f.includes("LENINGRAD_CODEX"))
    return { title: "Leningrad Codex — Hebrew Bible (1008 AD)", publishedYear: 1008, canonRating: 10,
      description: "The Leningrad Codex (1008–1009 AD) is the oldest complete manuscript of the Hebrew Bible in existence, following the Masoretic tradition. It serves as the primary textual basis for most modern critical editions of the Old Testament, including the Biblia Hebraica Stuttgartensia (BHS) and Biblia Hebraica Quinta (BHQ)." };

  if (f.includes("MASORETIC") || f.includes("MASORET"))
    return { title: "Masoretic Hebrew Bible (1894)", publishedYear: 1894, canonRating: 10,
      description: "A printed critical edition of the Masoretic Text — the authoritative Hebrew text of the Tanakh preserved by the Masoretes, a group of Jewish scholars (500–1000 AD) who standardized the vowel pointing, cantillation marks, and marginal notes. This is the textual foundation for the Old Testament in all Protestant Bible translations." };

  if (f.includes("GINSBURG") || f.includes("TANAKH"))
    return { title: "Ginsburg Tanakh (1926)", publishedYear: 1926, canonRating: 10,
      description: "The Ginsburg Hebrew Bible (1926), edited by Christian David Ginsburg, is one of the great scholarly critical editions of the Hebrew Masoretic Text. Ginsburg devoted his life to collating thousands of Hebrew manuscripts and Masoretic notes, producing an edition of unparalleled textual precision." };

  if (f.includes("LATIN VULGATE") || f.includes("BIBLIA SACRA"))
    return { title: "Latin Vulgate — Biblia Sacra (1685)", publishedYear: 1685, canonRating: 7,
      description: "The Latin Vulgate, translated primarily by St. Jerome (c. 382–405 AD), was the standard Bible of the Western Church for over a millennium. This 1685 edition of the Biblia Sacra preserves Jerome's Latin translation alongside deuterocanonical books accepted by the Catholic Church. It directly influenced the Douay-Rheims English translation." };

  if (f.includes("SEPTUAGINT") || f.includes("LXX"))
    return { title: "The Septuagint — Old Testament (LXX)", publishedYear: -250, canonRating: 9,
      description: "The Septuagint (LXX), the Greek translation of the Hebrew Scriptures made in Alexandria (c. 250–100 BC), was the Bible of the early Church and the New Testament authors. It is quoted extensively in the New Testament and is the primary Old Testament text used in Eastern Orthodox churches to this day." };

  if (f.includes("TISCHENDORF"))
    return { title: "Tischendorf Septuagint (1856)", publishedYear: 1856, canonRating: 9,
      description: "The critical edition of the Septuagint published by Constantin von Tischendorf in 1856. Tischendorf was the biblical scholar who discovered the Codex Sinaiticus at Saint Catherine's Monastery in 1844 — this edition reflects his landmark contributions to Greek Old Testament scholarship." };

  if (f.includes("TARGUM") || f.includes("ONKELOS"))
    return { title: "Torah with Targum Onkelos — Colour Manuscript", publishedYear: 200, canonRating: 9,
      description: "The Torah with Targum Onkelos presents the five books of Moses alongside Onkelos's authoritative Aramaic translation (Targum), written c. 110–135 AD. The Targum of Onkelos was the official Aramaic translation of the Torah used in Babylonian Jewish communities for liturgy and study, second only to the Hebrew text in authority." };

  if (f.includes("ERASMUS"))
    return { title: "Erasmus — Greek-Latin New Testament (1539)", publishedYear: 1539, canonRating: 10,
      description: "Erasmus's Greek-Latin New Testament, first published in 1516, was the first printed critical Greek New Testament and the foundation of the Textus Receptus. This 1539 edition represents one of the later revised printings. It directly influenced Luther's German New Testament, Tyndale's English translation, and ultimately the King James Version." };

  if (f.includes("1540") && f.includes("GREAT"))
    return { title: "The Great Bible (1540)", publishedYear: 1540, canonRating: 9,
      description: "The Great Bible (1539–1541) was the first authorized English Bible, commissioned by Henry VIII and translated by Miles Coverdale. It was ordered to be placed in every church in England. This 1540 edition is one of the earliest mass-produced English Bibles, a milestone in making Scripture available in the vernacular." };

  if (f.includes("BISHOP") || f.includes("BISHOPS"))
    return { title: "The Bishop's Bible (1568)", publishedYear: 1568, canonRating: 9,
      description: "The Bishop's Bible (1568) was commissioned by the Church of England as a revision of the Great Bible, intended to be used in church services. Produced by a committee of bishops, it was the official English Bible of the Anglican Church until superseded by the King James Version in 1611 and was the primary source text used by the KJV translators." };

  if (f.includes("GENEVA") && f.includes("1560"))
    return { title: "The Geneva Bible (1560)", publishedYear: 1560, canonRating: 9,
      description: "The Geneva Bible (1560), produced by Protestant reformers in Geneva, was the first English Bible with numbered verses and the primary Bible of the Puritans, Pilgrims, and Shakespeare. It preceded the KJV by 51 years and was the most widely read English Bible of the Reformation era, famous for its extensive study notes." };

  if (f.includes("COVERDALE"))
    return { title: "Coverdale Bible (1553)", publishedYear: 1553, canonRating: 9,
      description: "The Coverdale Bible (1535) was the first complete printed English Bible, translated by Miles Coverdale from German and Latin sources rather than directly from Hebrew and Greek. This 1553 edition represents one of the later printings of this landmark translation that opened the era of English Bible translation." };

  if (f.includes("1775") || (f.includes("HOLY BIBLE") && f.includes("1775")))
    return { title: "The Holy Bible (1775)", publishedYear: 1775, canonRating: 10,
      description: "A King James Version printing from 1775, representing the tradition of KJV publication in the era of the American Revolution. Early American printings of the Bible are significant historical documents reflecting the role of Scripture in the founding of the nation." };

  return {};
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

function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase();
  if (ext === ".pdf")  return "application/pdf";
  if (ext === ".epub") return "application/epub+zip";
  if (ext === ".mobi") return "application/x-mobipocket-ebook";
  return "application/octet-stream";
}

async function main() {
  const allFiles = fs.readdirSync(ANCIENT_DIR)
    .filter(f => /\.(epub|pdf|mobi)$/i.test(f))
    .sort();

  console.log(`📜 Found ${allFiles.length} files in Ancient/\n`);

  const existingBibles = await db.bibleEdition.findMany({ select: { slug: true } });
  const usedSlugs = new Set(existingBibles.map((b) => b.slug));

  let uploaded = 0, skipped = 0, failed = 0;

  for (const filename of allFiles) {
    const filePath  = path.join(ANCIENT_DIR, filename);
    const override  = getOverride(filename);
    const baseTitle = override.title ?? cleanTitle(filename);
    const sizeMB    = (fs.statSync(filePath).size / 1024 / 1024).toFixed(1);
    const mimeType  = getMimeType(filename);

    let slug = toSlug(baseTitle);
    if (usedSlugs.has(slug)) slug = `${slug}-ancient`;
    if (usedSlugs.has(slug)) slug = `${slug}-${Date.now().toString(36)}`;
    usedSlugs.add(slug);

    const existing = await db.bibleEdition.findUnique({ where: { slug } });
    if (existing?.fileUrl) {
      console.log(`⏭  Skipping (already uploaded): ${baseTitle}`);
      skipped++;
      continue;
    }

    console.log(`⬆️  Uploading: ${baseTitle} (${sizeMB} MB) [${path.extname(filename).slice(1).toUpperCase()}]`);

    try {
      const buf  = fs.readFileSync(filePath);
      const blob = new Blob([buf], { type: mimeType });
      const file = new File([blob], filename, { type: mimeType });

      const result = await utapi.uploadFiles(file);

      if (result.error) {
        console.error(`❌ ${baseTitle}: ${result.error.message ?? JSON.stringify(result.error)}`);
        failed++;
        continue;
      }

      const fileUrl = result.data.ufsUrl ?? result.data.url;

      await db.bibleEdition.upsert({
        where:  { slug },
        update: { fileUrl },
        create: {
          title:         baseTitle,
          slug,
          translation:   "ANCIENT",
          publisher:     ANCIENT_PROFILE.publisher,
          publishedYear: override.publishedYear ?? ANCIENT_PROFILE.publishedYear,
          description:   override.description ?? `An ancient manuscript or early printed edition — one of the foundational textual witnesses of the biblical text preserved across the centuries.`,
          history:       ANCIENT_PROFILE.history,
          canonRating:   override.canonRating ?? ANCIENT_PROFILE.canonRating,
          canonNotes:    ANCIENT_PROFILE.canonNotes,
          gradientFrom:  ANCIENT_PROFILE.gradientFrom,
          gradientTo:    ANCIENT_PROFILE.gradientTo,
          accentColor:   ANCIENT_PROFILE.accentColor,
          featured:      true,
          filename,
          fileUrl,
        },
      });

      console.log(`✅ ${baseTitle}`);
      uploaded++;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`❌ ${baseTitle}: ${msg}`);
      failed++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Uploaded:  ${uploaded}`);
  console.log(`   ⏭  Skipped:   ${skipped}`);
  console.log(`   ❌ Failed:    ${failed}`);

  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
