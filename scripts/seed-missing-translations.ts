/**
 * seed-missing-translations.ts
 *
 * Seeds all major Bible translation families that are not yet in the database.
 * Fetches cover images from Open Library (by ISBN) or falls back to a
 * gradient card. Uploads covers to UploadThing and creates BibleEdition rows.
 *
 * Run: node_modules/.bin/tsx scripts/seed-missing-translations.ts
 */

import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const utapi = new UTApi();
const db    = new PrismaClient();

// ─── Types ───────────────────────────────────────────────────────────────────

interface BibleEntry {
  title:         string;
  slug:          string;
  translation:   string;
  publisher:     string;
  publishedYear: number;
  description:   string;
  history:       string;
  canonRating:   number;
  canonNotes:    string;
  gradientFrom:  string;
  gradientTo:    string;
  accentColor:   string;
  featured:      boolean;
  /** ISBN-13 or ISBN-10 used to pull cover from Open Library */
  isbn?:         string;
}

// ─── Cover fetching ──────────────────────────────────────────────────────────

async function fetchCoverBuffer(isbn: string): Promise<Buffer | null> {
  const urls = [
    `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`,
    `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`,
  ];
  for (const url of urls) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      // Open Library returns a 1×1 gif for missing covers — skip those
      if (buf.length < 5000) continue;
      return buf;
    } catch { /* try next */ }
  }
  return null;
}

async function uploadCover(buf: Buffer, slug: string): Promise<string | null> {
  try {
    const blob = new Blob([buf], { type: "image/jpeg" });
    const file = new File([blob], `cover-${slug}.jpg`, { type: "image/jpeg" });
    const res  = await utapi.uploadFiles(file);
    if (res.error) { console.error(`  cover upload error: ${res.error.message}`); return null; }
    return res.data.ufsUrl ?? res.data.url;
  } catch (e) {
    console.error(`  cover upload exception: ${e instanceof Error ? e.message : e}`);
    return null;
  }
}

// ─── Master entry list ───────────────────────────────────────────────────────

const ENTRIES: BibleEntry[] = [

  // ── RSV ──────────────────────────────────────────────────────────────────
  {
    title: "Revised Standard Version Bible",
    slug: "revised-standard-version",
    translation: "RSV",
    publisher: "Division of Christian Education, National Council of Churches",
    publishedYear: 1952,
    description:
      "The Revised Standard Version (RSV) is a formal-equivalence revision of the American Standard Version (1901), itself descended from the KJV. Published in 1952, it became the standard Bible of mainline Protestantism for four decades and the primary academic translation before the NRSV. Its dignified prose strikes a balance between scholarly rigor and literary quality.",
    history:
      "Commissioned in 1929 and begun in 1937 by the International Council of Religious Education, the RSV NT was released in 1946 and the complete Bible in 1952. Forty-five scholars worked under Luther Weigle. It sparked controversy in evangelical circles for rendering Isaiah 7:14 as 'young woman' rather than 'virgin.' The RSV later produced a Catholic Edition (RSV-CE, 1966), a Second Catholic Edition (RSV-2CE, 2006), and became the ancestor of both the ESV and the NRSV.",
    canonRating: 9,
    canonNotes:
      "Strictly 66 books in its Protestant edition; Catholic editions include deuterocanonical books. One of the most academically respected formal-equivalence translations of the 20th century.",
    gradientFrom: "#1C3050",
    gradientTo:   "#0E1A2E",
    accentColor:  "#7EB8D4",
    featured: true,
    isbn: "9780195283969",
  },

  // ── RSV-CE ────────────────────────────────────────────────────────────────
  {
    title: "RSV Catholic Edition Bible",
    slug: "rsv-catholic-edition",
    translation: "RSV",
    publisher: "Ignatius Press",
    publishedYear: 1966,
    description:
      "The RSV Catholic Edition (RSV-CE) is the standard RSV text approved by Rome for Catholic use, incorporating the deuterocanonical books in their traditional Catholic canonical order. It is widely used in Catholic seminaries and is the basis for the Ignatius Study Bible.",
    history:
      "Approved by the Vatican's Pontifical Biblical Commission and published in 1966 by the Catholic Biblical Association of Great Britain. Ignatius Press later produced the Second Catholic Edition (RSV-2CE, 2006), which reverses a handful of the original Catholic Edition's modifications. Both editions are widely used in Catholic and Anglican contexts.",
    canonRating: 8,
    canonNotes:
      "Includes the full Catholic canon (73 books) including deuterocanonical books (Tobit, Judith, 1–2 Maccabees, Wisdom, Sirach, Baruch, additions to Esther and Daniel). Protestant canon rating would be 9.",
    gradientFrom: "#2B1A0D",
    gradientTo:   "#160D06",
    accentColor:  "#D4A84B",
    featured: false,
    isbn: "9780898704891",
  },

  // ── RSV-2CE ───────────────────────────────────────────────────────────────
  {
    title: "Ignatius Bible — RSV Second Catholic Edition",
    slug: "rsv-second-catholic-edition",
    translation: "RSV",
    publisher: "Ignatius Press",
    publishedYear: 2006,
    description:
      "The Ignatius Bible (RSV-2CE) is the Second Catholic Edition of the Revised Standard Version, published by Ignatius Press in 2006. It reverses several of the original 1966 Catholic Edition's updates to bring the text closer to the RSV original, while retaining the full Catholic deuterocanon.",
    history:
      "Ignatius Press commissioned the revision as a more conservative Catholic edition, restoring traditional renderings such as 'virgin' in Isaiah 7:14 and 'full of grace' in Luke 1:28. The RSV-2CE is the text used in the Ignatius Study Bible and is preferred by many conservative and traditional Catholics worldwide.",
    canonRating: 8,
    canonNotes:
      "Full Catholic canon (73 books). Widely used by traditionalist Catholics and endorsed by conservative Catholic scholars.",
    gradientFrom: "#1F0E0E",
    gradientTo:   "#100707",
    accentColor:  "#C94040",
    featured: false,
    isbn: "9780898709032",
  },

  // ── ASV ───────────────────────────────────────────────────────────────────
  {
    title: "American Standard Version",
    slug: "american-standard-version",
    translation: "ASV",
    publisher: "Thomas Nelson & Sons",
    publishedYear: 1901,
    description:
      "The American Standard Version (ASV) of 1901 is the American counterpart to the British Revised Version (1885). Produced by the American scholars who participated in the RV project, it represents one of the most literal and scholarly English Bible translations of its era, notable for using 'Jehovah' throughout the Old Testament wherever the divine name appears.",
    history:
      "American scholars joined the British Revised Version project (begun 1870) but had many preferred readings rejected. They agreed not to publish separately for 14 years; in 1901 their preferences became the ASV. Regarded by many as the most accurate English Bible of the early 20th century, it became the parent text of both the RSV (1952) and NASB (1971), and the basis for the World English Bible (WEB).",
    canonRating: 9,
    canonNotes:
      "Strictly 66 Protestant books. Extremely literal formal equivalence; the parent of NASB and RSV. Considered one of the most precise English translations ever made.",
    gradientFrom: "#1A2B1A",
    gradientTo:   "#0E1A0E",
    accentColor:  "#6AAE6A",
    featured: true,
    isbn: "9781565638464",
  },

  // ── RV ────────────────────────────────────────────────────────────────────
  {
    title: "Revised Version — Holy Bible",
    slug: "revised-version-1885",
    translation: "RV",
    publisher: "Oxford University Press / Cambridge University Press",
    publishedYear: 1885,
    description:
      "The Revised Version (RV) of 1885 was the first major revision of the King James Version, commissioned by the Convocation of Canterbury in 1870. It incorporated newly discovered Greek manuscripts — particularly the Westcott-Hort critical text — and aimed to correct errors that had accumulated over the KJV's 270-year history.",
    history:
      "The NT was released in 1881 (selling over a million copies in its first week), the OT in 1885, and the Apocrypha in 1895. Scholars B.F. Westcott and F.J.A. Hort, who had spent 28 years producing their landmark Greek critical text, were instrumental contributors. The RV's American variant became the ASV (1901). Though soon superseded in popular use, it established the template for all modern scholarly revisions.",
    canonRating: 8,
    canonNotes:
      "Includes 66 Protestant books; Apocrypha edition also available. Historically essential as the first critical-text revision of the KJV.",
    gradientFrom: "#1A1A2B",
    gradientTo:   "#0E0E1A",
    accentColor:  "#8A8ACA",
    featured: false,
    isbn: "9780521091428",
  },

  // ── GNT ───────────────────────────────────────────────────────────────────
  {
    title: "Good News Translation — Good News Bible",
    slug: "good-news-translation",
    translation: "GNT",
    publisher: "American Bible Society",
    publishedYear: 1976,
    description:
      "The Good News Translation (GNT), formerly known as Today's English Version (TEV) and the Good News Bible (GNB), was published by the American Bible Society in 1976. It pioneered the 'functional equivalence' translation philosophy developed by linguist Eugene Nida, aiming to convey the original meaning in natural everyday English, especially for readers for whom English is a second language.",
    history:
      "Robert Bratcher of the American Bible Society produced an initial sample translation of Mark in the early 1960s. The New Testament, published as 'Good News for Modern Man' in 1966, sold over 35 million copies. The complete Bible appeared in 1976, with distinctive line-drawing illustrations by Swiss artist Annie Vallotton. It was renamed 'Good News Translation' in 2001. It remains widely used in global missions and literacy contexts.",
    canonRating: 7,
    canonNotes:
      "Standard 66-book Protestant canon in the primary edition; a version with deuterocanonical books (Apocrypha) is also available for Catholic and ecumenical use.",
    gradientFrom: "#2B2000",
    gradientTo:   "#1A1200",
    accentColor:  "#E8B84B",
    featured: true,
    isbn: "9781585163106",
  },

  // ── CEV ───────────────────────────────────────────────────────────────────
  {
    title: "Contemporary English Version — Holy Bible",
    slug: "contemporary-english-version",
    translation: "CEV",
    publisher: "American Bible Society",
    publishedYear: 1995,
    description:
      "The Contemporary English Version (CEV) is a dynamic-equivalence translation by the American Bible Society designed for listeners as much as readers. Written at approximately a 5th-grade reading level, it uses natural conversational English and is particularly suitable for children, new Christians, and those for whom English is a second language.",
    history:
      "Work began in 1984 under Dr. Barclay M. Newman, who studied speech patterns in radio and TV broadcasts to determine the most natural idiomatic English. The NT was released in 1991 for the 175th anniversary of the ABS; the complete Bible in 1995. The CEV was the first translation specifically designed for oral comprehension — meaning its sentences are structured to be clearly understood when read aloud, not just silently.",
    canonRating: 6,
    canonNotes:
      "Standard 66-book Protestant canon. Written for accessibility; not a word-for-word translation but faithfully represents the meaning of the original texts.",
    gradientFrom: "#002B2B",
    gradientTo:   "#001A1A",
    accentColor:  "#4ECACA",
    featured: false,
    isbn: "9781585163069",
  },

  // ── NET ───────────────────────────────────────────────────────────────────
  {
    title: "NET Bible — New English Translation (Full Notes Edition)",
    slug: "net-bible-full-notes",
    translation: "NET",
    publisher: "Biblical Studies Press / Thomas Nelson",
    publishedYear: 2005,
    description:
      "The New English Translation (NET Bible) is a pioneering translation notable for its 60,932 translator notes — more than any other Bible — making every textual and exegetical decision fully transparent to the reader. Produced by more than 25 biblical scholars and originally designed for free digital distribution, it bridges the gap between a formal scholarly translation and an accessible study Bible.",
    history:
      "Conceived at the 1995 Society of Biblical Literature meeting. The first fully digital-first Bible translation, released online in beta from 1996–2003 before the 2005 print edition. Biblical Studies Press (now part of Faithlife/Logos) published the print edition. A Second Edition followed in 2017. The NET Bible's commitment to transparency — showing users why each translation decision was made — makes it uniquely valuable for serious students of Scripture.",
    canonRating: 9,
    canonNotes:
      "Standard 66-book Protestant canon. Particularly valued for its unmatched scholarly apparatus and transparency of translation decisions.",
    gradientFrom: "#0D2B1A",
    gradientTo:   "#061A0E",
    accentColor:  "#2ECC71",
    featured: true,
    isbn: "9780718033613",
  },

  // ── NEB ───────────────────────────────────────────────────────────────────
  {
    title: "New English Bible",
    slug: "new-english-bible",
    translation: "NEB",
    publisher: "Oxford University Press / Cambridge University Press",
    publishedYear: 1970,
    description:
      "The New English Bible (NEB) was a landmark British ecumenical translation — the first major English Bible to break entirely from the KJV tradition, using completely fresh idiomatic British English rather than revising any earlier version. Its NT was released in 1961 and the complete Bible in 1970.",
    history:
      "Commissioned by the Church of Scotland in 1946 with support from all major British Protestant denominations (Church of England, Methodist, Baptist, Congregationalist, Presbyterian). C.H. Dodd served as Director. The NT alone sold over a million copies in its first week. Praised for literary quality but criticized for some idiosyncratic renderings; it was superseded by the Revised English Bible (REB) in 1989.",
    canonRating: 7,
    canonNotes:
      "Main edition contains 66 Protestant books; an edition with Apocrypha was also published. Important for its literary ambition and ecumenical sponsorship.",
    gradientFrom: "#1A1A1A",
    gradientTo:   "#0A0A0A",
    accentColor:  "#AAAAAA",
    featured: false,
    isbn: "9780521091428",
  },

  // ── REB ───────────────────────────────────────────────────────────────────
  {
    title: "Revised English Bible",
    slug: "revised-english-bible",
    translation: "REB",
    publisher: "Oxford University Press / Cambridge University Press",
    publishedYear: 1989,
    description:
      "The Revised English Bible (REB) is a thorough revision of the New English Bible (1970), published jointly by Oxford and Cambridge University Presses on September 14, 1989 — coincidentally the same day as the American NRSV. It corrects the NEB's more eccentric renderings, incorporates newer manuscript evidence including the Dead Sea Scrolls, and uses gender-inclusive language where the original texts are clearly inclusive.",
    history:
      "Commissioned by the same coalition of British churches that produced the NEB, with representatives from the Roman Catholic Church now included as full participants. Donald Coggan served as chairman of the Joint Committee. The REB's revision brought the NEB closer to the Hebrew and Greek originals in many disputed passages, while retaining the literary freshness that distinguished the NEB from the KJV tradition.",
    canonRating: 7,
    canonNotes:
      "Standard 66-book Protestant canon. An edition with the Apocrypha is also available. The leading British ecumenical translation.",
    gradientFrom: "#1A1A2E",
    gradientTo:   "#0D0D1A",
    accentColor:  "#9B9BCA",
    featured: false,
    isbn: "9780521508254",
  },

  // ── YLT ───────────────────────────────────────────────────────────────────
  {
    title: "Young's Literal Translation of the Holy Bible",
    slug: "youngs-literal-translation",
    translation: "YLT",
    publisher: "Baker Books (modern reprint; originally George Adam Young)",
    publishedYear: 1862,
    description:
      "Young's Literal Translation (YLT) by Robert Young (compiler of Young's Analytical Concordance) is the most mechanically literal English Bible translation ever produced. It uses present tense for Hebrew prophetic perfect forms, retains Hebrew names, and maintains absolute word-for-word correspondence with the original languages. Not designed for devotional reading but as an indispensable reference tool revealing the exact structure of the Hebrew and Greek.",
    history:
      "Robert Young (1822–1888), a Scottish printer and scholar self-taught in biblical languages, first published his translation in 1862, revising it in 1887 and 1898. His concurrent Young's Analytical Concordance to the Bible remains a standard reference. YLT's extreme literalness — including present-tense prophetic constructions — makes many passages syntactically unusual in English but gives specialists unmatched insight into the original-language text.",
    canonRating: 8,
    canonNotes:
      "Standard 66-book Protestant canon. The most literal English translation ever produced; essential reference for word studies.",
    gradientFrom: "#1E1A0A",
    gradientTo:   "#110F05",
    accentColor:  "#C9A84C",
    featured: true,
    isbn: "9780801068713",
  },

  // ── WEB ───────────────────────────────────────────────────────────────────
  {
    title: "World English Bible",
    slug: "world-english-bible",
    translation: "WEB",
    publisher: "eBible.org (Public Domain)",
    publishedYear: 2000,
    description:
      "The World English Bible (WEB) is a free, public-domain revision of the American Standard Version (1901), updated to remove archaic language and correct textual issues. It is entirely free of copyright restrictions, making it the most widely used public-domain modern Bible translation in apps, software, and global missions where royalty-free text is required.",
    history:
      "Michael Paul Johnson began work in 1994, originally updating the ASV. Available in multiple editions including Protestant (66 books), Catholic (with deuterocanonicals), and Eastern Orthodox editions. The WEB uses the Majority Text for the New Testament, unlike the ASV's Westcott-Hort text base. Continuously revised; major revision completed 2020. Used in thousands of Bible apps, websites, and mission translations worldwide.",
    canonRating: 6,
    canonNotes:
      "Standard 66-book Protestant canon in the primary edition. Public domain — no copyright restrictions. Good accuracy with the Majority Text base for the NT.",
    gradientFrom: "#002B1A",
    gradientTo:   "#001A0F",
    accentColor:  "#26C27A",
    featured: false,
    isbn: "9781585583157",
  },

  // ── MEV ───────────────────────────────────────────────────────────────────
  {
    title: "Modern English Version — Holy Bible",
    slug: "modern-english-version",
    translation: "MEV",
    publisher: "Charisma House / Military Bible Association",
    publishedYear: 2014,
    description:
      "The Modern English Version (MEV) is a formal-equivalence revision of the King James Version tradition, translating from the Textus Receptus (Greek) and the Ben Chayyim Masoretic Text (Hebrew) — the same source texts used by the KJV translators. It updates the KJV's archaic language to readable modern English while preserving the theological character of the traditional text.",
    history:
      "Conceived by James F. Linzey, retired U.S. Army chaplain, as a military chaplaincy Bible. A team of 47 translators from diverse denominations worked on the project. The NT was completed in 2011 and the full Bible in 2014. The MEV is particularly popular in Pentecostal and charismatic circles who prefer the traditional Textus Receptus text base but desire modern English.",
    canonRating: 6,
    canonNotes:
      "Standard 66-book Protestant canon. Uses the traditional Textus Receptus and Ben Chayyim Masoretic text — same base as the KJV. Conservative evangelical and Pentecostal market.",
    gradientFrom: "#1A0D2B",
    gradientTo:   "#0D061A",
    accentColor:  "#9B59B6",
    featured: false,
    isbn: "9781629984438",
  },

  // ── ISV ───────────────────────────────────────────────────────────────────
  {
    title: "International Standard Version Bible",
    slug: "international-standard-version",
    translation: "ISV",
    publisher: "Davidson Press / ISV Foundation",
    publishedYear: 2011,
    description:
      "The International Standard Version (ISV) uses a 'literal-idiomatic' translation philosophy, balancing formal and dynamic equivalence. It is distinguished by being the first modern translation to include an exclusive textual apparatus comparing the Dead Sea Scrolls with the Masoretic Text, particularly in the book of Isaiah.",
    history:
      "Begun in 1996 by the ISV Foundation, a California non-profit. Peter Flint, a leading Dead Sea Scrolls authority at Carleton University, contributed the Isaiah translation. The ISV was first released online before appearing in print. Its meticulous attention to Dead Sea Scrolls scholarship makes it particularly valuable for Old Testament textual criticism. A Third Edition is planned.",
    canonRating: 7,
    canonNotes:
      "Standard 66-book Protestant canon. Unique for its Dead Sea Scrolls integration in the OT and its balanced 'literal-idiomatic' translation philosophy.",
    gradientFrom: "#0D1A2B",
    gradientTo:   "#061019",
    accentColor:  "#4A90D9",
    featured: false,
    isbn: "9780979737886",
  },

  // ── EHV ───────────────────────────────────────────────────────────────────
  {
    title: "Evangelical Heritage Version — Holy Bible",
    slug: "evangelical-heritage-version",
    translation: "EHV",
    publisher: "Wartburg Project / Northwestern Publishing House",
    publishedYear: 2019,
    description:
      "The Evangelical Heritage Version (EHV) is a formal-equivalence translation produced by pastors, professors, and teachers of the Wisconsin Evangelical Lutheran Synod (WELS) and the Evangelical Lutheran Synod (ELS). It aims for accuracy to the original languages while using natural modern English, with particular sensitivity to Lutheran confessional and doctrinal distinctives.",
    history:
      "The Wartburg Project began developing the EHV to provide a confessionally Lutheran translation alternative. The New Testament and Psalms were released in 2017; the complete Bible in 2019. Northwestern Publishing House (NPH), the official publisher of WELS, released the print edition. The EHV is growing in recognition beyond Lutheran circles for its scholarly quality and readability.",
    canonRating: 7,
    canonNotes:
      "Standard 66-book Protestant canon. Strong formal equivalence; reflects Lutheran confessional interpretation in key texts.",
    gradientFrom: "#1A1A0A",
    gradientTo:   "#0D0D05",
    accentColor:  "#C8AA44",
    featured: false,
    isbn: "9780814688304",
  },

  // ── LEB ───────────────────────────────────────────────────────────────────
  {
    title: "Lexham English Bible",
    slug: "lexham-english-bible",
    translation: "LEB",
    publisher: "Logos Bible Software / Faithlife",
    publishedYear: 2012,
    description:
      "The Lexham English Bible (LEB) is an extremely literal, transparent translation developed by Logos Bible Software for use alongside original-language study tools. It prioritizes faithfulness to the grammatical structure of the original Hebrew and Greek, making it an indispensable study Bible for those using the Logos ecosystem.",
    history:
      "The NT was published in 2010 and the full Bible in 2012. Developed exclusively by Logos Bible Software scholars, the LEB was originally digital-first but print editions are now available. Its unique typographical features in the interlinear edition visually mark grammatical relationships. The LEB is designed as a companion to Logos's interlinear databases, morphology tools, and original-language resources.",
    canonRating: 7,
    canonNotes:
      "Standard 66-book Protestant canon. Maximally transparent formal-equivalence translation designed for original-language study.",
    gradientFrom: "#002040",
    gradientTo:   "#001020",
    accentColor:  "#0077CC",
    featured: false,
    isbn: "9781577996040",
  },

  // ── LSB ───────────────────────────────────────────────────────────────────
  {
    title: "Legacy Standard Bible",
    slug: "legacy-standard-bible",
    translation: "LSB",
    publisher: "Three Sixteen Publishing / Lockman Foundation",
    publishedYear: 2021,
    description:
      "The Legacy Standard Bible (LSB) is an extremely literal revision of the NASB 1995, produced by The Master's Seminary faculty under John MacArthur's commission. Its most distinctive feature is restoring 'Yahweh' throughout the Old Testament wherever the divine name (YHWH) appears — replacing the NASB's 'LORD' — and using 'slave' instead of 'servant' for the Greek doulos.",
    history:
      "John MacArthur commissioned the LSB because he and the faculty of The Master's Seminary felt the NASB 2020 update moved away from the formal equivalence and precise rendering they valued in the 1995 edition. The Lockman Foundation (owner of the NASB) partnered with Three Sixteen Publishing. The complete Bible was released in 2021. The LSB is rapidly gaining adoption in Reformed and MacArthur-influenced evangelical communities.",
    canonRating: 8,
    canonNotes:
      "Standard 66-book Protestant canon. Restoration of 'Yahweh' for YHWH is a major exegetical decision. Maximum formal equivalence — among the most literal modern translations.",
    gradientFrom: "#1A0D00",
    gradientTo:   "#0D0600",
    accentColor:  "#CC7700",
    featured: true,
    isbn: "9781735968308",
  },

  // ── NRSVue ───────────────────────────────────────────────────────────────
  {
    title: "NRSVue — New Revised Standard Version Updated Edition",
    slug: "nrsvue-updated-edition",
    translation: "NRSVue",
    publisher: "National Council of Churches / Society of Biblical Literature",
    publishedYear: 2022,
    description:
      "The New Revised Standard Version Updated Edition (NRSVue) is the most significant revision of the NRSV (1989) since its publication. Released digitally on Christmas Day 2021 and in print in 2022, it incorporates approximately 20,000 revisions reflecting advances in textual criticism, Dead Sea Scrolls scholarship, Septuagint studies, and linguistic research. It is now the standard Bible translation for most mainline Protestant seminaries and academic institutions.",
    history:
      "The revision was announced at the 2017 Society of Biblical Literature Annual Meeting. Over 50 scholars participated, led by an SBL editorial board. The NRSVue updates many renderings based on the latest manuscript evidence, corrects gender-inclusive language to be more consistent with the Greek and Hebrew, and reflects 30+ years of advances in biblical scholarship since the NRSV. Endorsed by Catholic, Protestant, and Orthodox scholars.",
    canonRating: 9,
    canonNotes:
      "Available in Protestant (66 books), Catholic (73 books), and expanded editions with Apocrypha. Now the primary academic and ecumenical translation, replacing NRSV at most seminaries.",
    gradientFrom: "#0D1F2D",
    gradientTo:   "#060F17",
    accentColor:  "#5B9EC9",
    featured: true,
    isbn: "9781619708563",
  },

  // ── GW ────────────────────────────────────────────────────────────────────
  {
    title: "God's Word Translation",
    slug: "gods-word-translation",
    translation: "GW",
    publisher: "God's Word to the Nations / Baker Publishing Group",
    publishedYear: 1995,
    description:
      "God's Word Translation (GW) uses a proprietary 'Natural Language' philosophy — a middle path between formal and dynamic equivalence — aiming for accuracy without sacrificing natural American English. Rooted in Lutheran pastor William Beck's 1963 translation 'An American Translation' (AAT), it produces clear, readable Scripture especially suited for personal devotion and evangelism.",
    history:
      "Lutheran pastor William F. Beck began the work with his 1963 NT 'An American Translation.' After his death, the God's Word to the Nations Society expanded his work into a complete Bible. Baker Publishing Group became the primary distributor in 1995. Though less widely known than NIV or NLT, the GW receives consistently high marks from translation scholars for its unusual combination of accuracy and readability.",
    canonRating: 6,
    canonNotes:
      "Standard 66-book Protestant canon. 'Natural language' philosophy produces very readable text; underused but respected for accuracy.",
    gradientFrom: "#1A2B0D",
    gradientTo:   "#0F1A07",
    accentColor:  "#6ABF40",
    featured: false,
    isbn: "9780801013768",
  },

  // ── ICB ───────────────────────────────────────────────────────────────────
  {
    title: "International Children's Bible",
    slug: "international-childrens-bible",
    translation: "ICB",
    publisher: "Thomas Nelson (originally Sweet Publishing)",
    publishedYear: 1986,
    description:
      "The International Children's Bible (ICB) is a dynamic-equivalence translation written at a 3rd-grade reading level, specifically designed for children ages 6–12. With simple vocabulary, short sentences, and clear explanations of biblical concepts, it makes Scripture genuinely accessible to young readers and was the predecessor text for the New Century Version (NCV).",
    history:
      "Originally published by Sweet Publishing in 1986 (NT 1983, full Bible 1986), the ICB was the textual basis for the New Century Version, essentially the NCV's 'younger sibling.' Thomas Nelson acquired it and continues to publish it in numerous editions designed for children. The ICB was one of the first Bibles specifically translated from original languages with children as the primary audience — not simply a simplified adult translation.",
    canonRating: 5,
    canonNotes:
      "Standard 66-book Protestant canon. Written for children; significant for youth ministry. Predecessor to the New Century Version (NCV).",
    gradientFrom: "#2B1A2B",
    gradientTo:   "#1A0F1A",
    accentColor:  "#CC80CC",
    featured: false,
    isbn: "9780718010263",
  },

  // ── JB ────────────────────────────────────────────────────────────────────
  {
    title: "The Jerusalem Bible",
    slug: "jerusalem-bible-1966",
    translation: "JB",
    publisher: "Darton, Longman & Todd / Doubleday",
    publishedYear: 1966,
    description:
      "The Jerusalem Bible (JB), published in 1966, is a landmark Catholic scholarly translation derived from the French La Bible de Jérusalem of the Dominican Biblical School in Jerusalem. Translated from original Hebrew and Greek texts (not from the French), it is famous for using 'Yahweh' in the Old Testament where most Bibles write 'LORD,' and for the notable contribution of J.R.R. Tolkien, who translated the book of Jonah.",
    history:
      "The Jerusalem Bible was derived from the French La Bible de Jérusalem (Ecole Biblique, 1956, revised 1961). Alexander Jones served as general editor of the English edition. J.R.R. Tolkien contributed the translation of Jonah. The JB was widely praised for its literary quality and scholarly footnotes. It was replaced for most Catholic use by the New Jerusalem Bible (NJB, 1985), and then the Revised New Jerusalem Bible (RNJB, 2019 — already in the database).",
    canonRating: 8,
    canonNotes:
      "Full Catholic canon (73 books) including deuterocanonicals. Approved for Catholic liturgical use. Notable for use of 'Yahweh' for the divine name.",
    gradientFrom: "#1A0A0A",
    gradientTo:   "#0D0505",
    accentColor:  "#CC4444",
    featured: true,
    isbn: "9780385017848",
  },

  // ── NJB ───────────────────────────────────────────────────────────────────
  {
    title: "New Jerusalem Bible",
    slug: "new-jerusalem-bible-1985",
    translation: "NJB",
    publisher: "Darton, Longman & Todd / Doubleday",
    publishedYear: 1985,
    description:
      "The New Jerusalem Bible (NJB) is a thorough revision of the Jerusalem Bible (1966), published in 1985. Unlike its predecessor, the NJB was translated more directly and independently from the original Hebrew and Greek, rather than leaning on the French version. It retains 'Yahweh' for the divine name, includes extensive scholarly footnotes, and uses gender-inclusive language where contextually warranted.",
    history:
      "Edited by Dom Henry Wansbrough, OSB, the NJB corrects the JB's dependence on the French by returning more directly to the original languages. It also incorporates new manuscript evidence and scholarly advances. The NJB was approved for use in the Church of England as well as by the Catholic Church. It is the most widely used Catholic Bible outside the United States and the parent text of the Revised New Jerusalem Bible (RNJB, 2019 — already in the database).",
    canonRating: 8,
    canonNotes:
      "Full Catholic canon (73 books). Approved by both Catholic and Church of England authorities. The standard Catholic Bible outside the US before the RNJB.",
    gradientFrom: "#1A0D0A",
    gradientTo:   "#0D0605",
    accentColor:  "#CC6644",
    featured: true,
    isbn: "9780385140133",
  },

  // ── DR ────────────────────────────────────────────────────────────────────
  {
    title: "Douay-Rheims Bible (Challoner Revision)",
    slug: "douay-rheims-challoner",
    translation: "DR",
    publisher: "TAN Books / Baronius Press (modern; originally English College Douai/Rheims)",
    publishedYear: 1752,
    description:
      "The Douay-Rheims Bible is the foundational English Catholic Bible, translated from the Latin Vulgate by scholars of the English College in Rheims (NT, 1582) and Douai (OT, 1609–10). The Challoner revision (1749–1752) by Bishop Richard Challoner substantially modernized the language and is the version in common use today. For over 300 years it was the standard English Bible of Roman Catholicism.",
    history:
      "Gregory Martin, a scholar at the English College in Exile, produced the primary translation from the Latin Vulgate. The NT was published at Rheims in 1582; the OT at Douai in 1609–10. Bishop Richard Challoner's extensive revision (1749–1777) is what most people mean today when they reference the 'Douay-Rheims.' Heavily influenced by the KJV in its Challoner form, the DR was the Catholic counterpart to the KJV for centuries and directly influenced the Confraternity Bible and the NAB.",
    canonRating: 9,
    canonNotes:
      "Full Catholic canon (73 books) from the Latin Vulgate. Historically essential; 300+ years the standard Catholic English Bible. Challoner revision is the widely used text.",
    gradientFrom: "#1F0A00",
    gradientTo:   "#120500",
    accentColor:  "#CC7722",
    featured: true,
    isbn: "9780895552266",
  },

  // ── MOFFATT ──────────────────────────────────────────────────────────────
  {
    title: "A New Translation of the Bible — Moffatt Bible",
    slug: "moffatt-new-translation",
    translation: "MOFFATT",
    publisher: "Hodder and Stoughton / Harper & Row",
    publishedYear: 1935,
    description:
      "James Moffatt's A New Translation of the Bible (1935) was one of the earliest and most influential modern dynamic-equivalence translations, pioneering the movement toward natural contemporary English in Bible translation. Moffatt prioritized making Scripture read as living literature, not antique text, and his bold, idiomatic rendering opened the way for all subsequent modern-language Bibles.",
    history:
      "Scottish theologian James Moffatt (1870–1944) published the NT in 1913 and the OT in 1924, with a revised complete Bible in 1935. It proved enormously popular, running through many printings. The Moffatt Bible is notable for rearranging passages based on historical-critical judgments (e.g., placing John 14 after chapters 15–16) and for openly reflecting the documentary hypothesis in the OT. It started the modern trend toward paraphrase-style vernacular Bibles.",
    canonRating: 7,
    canonNotes:
      "Standard 66-book Protestant canon. Historically essential — the first major modern dynamic-equivalence English Bible and ancestor of all subsequent vernacular translations.",
    gradientFrom: "#0D1A0D",
    gradientTo:   "#070D07",
    accentColor:  "#5CAA5C",
    featured: false,
    isbn: "9780060657796",
  },

  // ── WEYMOUTH ─────────────────────────────────────────────────────────────
  {
    title: "The New Testament in Modern Speech — Weymouth NT",
    slug: "weymouth-new-testament",
    translation: "WEYMOUTH",
    publisher: "James Clarke & Co (UK) / Baker & Taylor (US)",
    publishedYear: 1903,
    description:
      "The Weymouth New Testament (formally The New Testament in Modern Speech) is a precise, dignified NT translation by classical scholar Richard Francis Weymouth, published posthumously in 1903. Based on Weymouth's own critical Greek text ('The Resultant Greek Testament'), it aimed to give educated lay readers a precise and elegant English rendering without requiring knowledge of Greek.",
    history:
      "Richard Francis Weymouth (1822–1902), a classical scholar who compiled his own Greek NT critical text, died before publishing his translation. Ernest Hampden-Cook edited his notes for the 1903 publication. The Weymouth NT is notably clear in its rendering of Paul's letters and has been praised for its careful distinction of Greek tenses. It covers only the New Testament. Later updated by James Alexander Robertson in 1924.",
    canonRating: 6,
    canonNotes:
      "New Testament only. Notable for careful rendering of Greek verb tenses; a respected scholarly Victorian-era translation.",
    gradientFrom: "#2B2B1A",
    gradientTo:   "#1A1A0D",
    accentColor:  "#C4B44A",
    featured: false,
    isbn: "9780825441851",
  },

  // ── PHILLIPS ─────────────────────────────────────────────────────────────
  {
    title: "The New Testament in Modern English — J.B. Phillips",
    slug: "phillips-new-testament",
    translation: "PHILLIPS",
    publisher: "Macmillan / Simon & Schuster",
    publishedYear: 1958,
    description:
      "The Phillips New Testament (1958) by Anglican clergyman J.B. Phillips is one of the most beloved and readable English NT translations, praised by C.S. Lewis who called it 'like seeing a familiar picture after it has been cleaned.' Phillips believed a translator should produce in readers 'an effect equivalent to that produced by the author upon his original readers,' and his free, idiomatic rendering has introduced millions to Paul's letters.",
    history:
      "Anglican clergyman John B. Phillips (1906–1982) began translating Paul's letters during World War II to make them relevant to his youth group in wartime London. C.S. Lewis endorsed the epistles manuscript. The letters appeared in 1947 as 'Letters to Young Churches,' the Gospels in 1952, Acts in 1955, Revelation in 1957, and the complete NT in 1958. A substantially revised edition appeared in 1972. Covers only the New Testament.",
    canonRating: 7,
    canonNotes:
      "New Testament only. Dynamic-equivalence paraphrase; celebrated for literary quality and communicative power. C.S. Lewis endorsement.",
    gradientFrom: "#1A0A2B",
    gradientTo:   "#0D0517",
    accentColor:  "#8844CC",
    featured: false,
    isbn: "9780684825007",
  },

  // ── KNOX ─────────────────────────────────────────────────────────────────
  {
    title: "The Knox Bible — A Translation from the Latin Vulgate",
    slug: "knox-bible",
    translation: "KNOX",
    publisher: "Baronius Press / Cluny Media (modern; originally Burns Oates and Washbourne)",
    publishedYear: 1955,
    description:
      "The Knox Bible is Monsignor Ronald Knox's celebrated personal translation of the Bible from the Latin Vulgate, informed by the Hebrew and Greek originals. Widely regarded as one of the most elegant literary Bible translations in the English language, Knox aimed to produce Scripture 'as if an Englishman had written it' — natural, idiomatic, dignified prose.",
    history:
      "Commissioned in 1936 by the Catholic hierarchies of England and Wales, Knox (1888–1957) — also a famous crime writer and apologist — spent 13 years on the project. The NT appeared in 1945 and the OT in 1949; the one-volume complete Bible in 1955. Authorized for liturgical use in Great Britain, Ireland, and Australia throughout the 1950s. Republished in the 21st century by Baronius Press and Cluny Media for a new generation of readers.",
    canonRating: 8,
    canonNotes:
      "Full Catholic canon (73 books) from the Latin Vulgate. Considered the finest literary Catholic English Bible. Authorized for liturgical use in Britain before Vatican II.",
    gradientFrom: "#1A0A0A",
    gradientTo:   "#0D0505",
    accentColor:  "#CC5533",
    featured: true,
    isbn: "9781586179557",
  },

  // ── JPS / NJPS ───────────────────────────────────────────────────────────
  {
    title: "Tanakh — The Holy Scriptures (NJPS)",
    slug: "njps-tanakh",
    translation: "JPS",
    publisher: "Jewish Publication Society",
    publishedYear: 1985,
    description:
      "The New Jewish Publication Society Tanakh (NJPS, 1985) is the definitive modern English translation of the Hebrew Bible from a Jewish scholarly perspective. Produced by Jewish scholars for Jewish readers, it follows the traditional Jewish canonical ordering (Torah, Nevi'im, Ketuvim) and translates entirely from the Masoretic Text. It does not include the New Testament.",
    history:
      "The JPS produced an earlier English translation in 1917. The 1985 NJPS was a completely fresh translation — the Torah completed in 1962, the Prophets in 1978, the Writings in 1982, with the one-volume complete Tanakh in 1985. Edited by Harry Orlinsky, H.L. Ginsberg, and Ephraim Speiser. A Gender-Sensitive Edition was published in 2023. The NJPS is widely used in Jewish communities and by Old Testament scholars across all backgrounds.",
    canonRating: 8,
    canonNotes:
      "39-book Hebrew Bible (Tanakh/Old Testament only; no NT). The authoritative modern Jewish English Bible; essential for OT scholarship from a Jewish perspective.",
    gradientFrom: "#1A1A00",
    gradientTo:   "#0D0D00",
    accentColor:  "#CCCC44",
    featured: true,
    isbn: "9780827602526",
  },

  // ── NETS ─────────────────────────────────────────────────────────────────
  {
    title: "A New English Translation of the Septuagint (NETS)",
    slug: "nets-septuagint",
    translation: "NETS",
    publisher: "Oxford University Press",
    publishedYear: 2007,
    description:
      "The New English Translation of the Septuagint (NETS) is the definitive modern scholarly English translation of the Greek Septuagint (LXX) — the Greek translation of the Hebrew Scriptures used by the early Church and quoted extensively in the New Testament. Sponsored by the International Organization for Septuagint and Cognate Studies (IOSCS), it provides an accurate window into the Bible as the first Christians knew it.",
    history:
      "Project directed by Albert Pietersma and Benjamin G. Wright. The Psalms appeared in 2000 and the complete NETS in 2007 from Oxford University Press. Covers not just the standard LXX but also additional Greek translations traditionally included under the Septuagint title. Used by the NRSV as a base, the NETS revised it to precisely represent the Greek. Indispensable for NT background studies and early church history.",
    canonRating: 8,
    canonNotes:
      "Old Testament only (Septuagint/Greek OT). Includes deuterocanonical books as found in the LXX. Indispensable for early Christianity and OT text criticism.",
    gradientFrom: "#002020",
    gradientTo:   "#001010",
    accentColor:  "#22AAAA",
    featured: true,
    isbn: "9780195289756",
  },

  // ── NCB ───────────────────────────────────────────────────────────────────
  {
    title: "New Catholic Bible",
    slug: "new-catholic-bible",
    translation: "NCB",
    publisher: "Catholic Book Publishing Corp.",
    publishedYear: 2019,
    description:
      "The New Catholic Bible (NCB) is a dynamic-equivalence revision of the Saint Joseph Edition of the New American Bible, updated with contemporary American English and published in 2019. Designed for Catholic devotional and liturgical use, it includes the full deuterocanonical books and retains the familiar Catholic translation tradition of the NAB.",
    history:
      "Published by Catholic Book Publishing Corporation, a New Jersey–based company that has been the leading Catholic Bible publisher in the United States for decades. The NCB updates the language of the earlier Saint Joseph NAB edition to reflect modern American usage while retaining its Catholic doctrinal perspective and inclusive approach to the biblical canon.",
    canonRating: 6,
    canonNotes:
      "Full Catholic canon (73 books). Contemporary American English; primarily for Catholic devotional and liturgical market.",
    gradientFrom: "#1F0A1F",
    gradientTo:   "#120512",
    accentColor:  "#CC55CC",
    featured: false,
    isbn: "9781941243428",
  },

  // ── NABRE ─────────────────────────────────────────────────────────────────
  {
    title: "New American Bible Revised Edition (NABRE)",
    slug: "nabre-revised-edition",
    translation: "NABRE",
    publisher: "United States Conference of Catholic Bishops (USCCB)",
    publishedYear: 2011,
    description:
      "The New American Bible Revised Edition (NABRE) is the official Bible of the Catholic Church in the United States, authorized by the U.S. Conference of Catholic Bishops. A thorough revision of the NAB (1970), the NABRE updated approximately 20% of the OT text, revised the Psalms, and produced an entirely new translation of the book of Psalms. It is used in all official U.S. Catholic liturgies.",
    history:
      "The revision process began in 1994 and the NABRE was published in March 2011 — the first major revision since the 1970 NAB. Over 50 Catholic scholars and theologians contributed. The revision updated language for clarity and liturgical use, revised the Psalter to better reflect contemporary scholarship, and incorporated advances in understanding the Dead Sea Scrolls. The NT of the NAB (revised 1986) was retained without changes in the NABRE.",
    canonRating: 8,
    canonNotes:
      "Full Catholic canon (73 books). The official Catholic liturgical Bible of the United States. Thorough scholarship reflecting Dead Sea Scrolls and modern textual criticism.",
    gradientFrom: "#0A1A2B",
    gradientTo:   "#050D17",
    accentColor:  "#4488CC",
    featured: true,
    isbn: "9780195298765",
  },

  // ── LSV ───────────────────────────────────────────────────────────────────
  {
    title: "Literal Standard Version",
    slug: "literal-standard-version",
    translation: "LSV",
    publisher: "Covenant Press",
    publishedYear: 2020,
    description:
      "The Literal Standard Version (LSV) is an extremely formal-equivalence translation aiming for maximum accuracy to the original Hebrew and Greek, including use of 'Yahweh' for the divine name. Produced as a free, open-source translation, it draws on the best of YLT, ASV, and modern textual scholarship while presenting the text in readable contemporary English.",
    history:
      "The LSV was developed by Covenant Press and released in 2020 as a freely available translation. It uses the standard critical Hebrew (BHS/BHQ) and Greek texts (NA28/UBS5), restores 'Yahweh' throughout the OT, and aims to be updated regularly as scholarship advances. The LSV is designed for serious students who want maximum fidelity to the original languages without the archaic English of the YLT.",
    canonRating: 8,
    canonNotes:
      "Standard 66-book Protestant canon. Free and open-source. Restores 'Yahweh'; maximally literal with modern English.",
    gradientFrom: "#1A1A1A",
    gradientTo:   "#0D0D0D",
    accentColor:  "#FFFFFF",
    featured: false,
    isbn: "9781622457656",
  },

  // ── ERV ───────────────────────────────────────────────────────────────────
  {
    title: "Easy-to-Read Version",
    slug: "easy-to-read-version",
    translation: "ERV",
    publisher: "World Bible Translation Center / Bible League International",
    publishedYear: 1987,
    description:
      "The Easy-to-Read Version (ERV) is a dynamic-equivalence translation developed by the World Bible Translation Center for readers with limited English literacy, including those who are deaf or use English as a second language. With simple vocabulary, short sentences, and clear grammar, it makes Scripture accessible to a wide global audience.",
    history:
      "Originally published in 1987 as the 'New Life Version' (not to be confused with NLV), the ERV was developed specifically with input from specialists in English literacy education, deaf ministry, and ESL instruction. Bible League International now distributes it globally for evangelism and church planting. It is available in over 100 languages, making the ERV family one of the most widely translated Bible text frameworks in the world.",
    canonRating: 5,
    canonNotes:
      "Standard 66-book Protestant canon. Designed for limited-literacy readers, deaf community, and ESL contexts. Widely distributed globally by Bible League International.",
    gradientFrom: "#002B00",
    gradientTo:   "#001500",
    accentColor:  "#44CC44",
    featured: false,
    isbn: "9781933305592",
  },

  // ── JPS 1917 ─────────────────────────────────────────────────────────────
  {
    title: "The Holy Scriptures — JPS 1917 (Old Translation)",
    slug: "jps-1917-old-translation",
    translation: "JPS",
    publisher: "Jewish Publication Society",
    publishedYear: 1917,
    description:
      "The 1917 Jewish Publication Society translation (JPS 1917) was the first standard Jewish English Bible, produced by a committee of Jewish scholars and rabbis. It represents the Jewish community's response to the American Standard Version (1901), providing a translation specifically for Jewish use while following a more literal, KJV-influenced style.",
    history:
      "Produced under the chairmanship of Max Margolis, the JPS 1917 was a committee translation drawing on the Masoretic Text and the best Jewish scholarship of the era. It served as the standard Jewish English Bible for half a century until replaced by the NJPS (1985). The 1917 translation is also called the 'Old JPS' to distinguish it from the NJPS. Still used and referenced in traditional Orthodox Jewish communities.",
    canonRating: 7,
    canonNotes:
      "39-book Hebrew Bible (Tanakh/Old Testament only). KJV-influenced style; historically important as the first standard Jewish English Bible.",
    gradientFrom: "#1A1A00",
    gradientTo:   "#0D0D00",
    accentColor:  "#BBBB33",
    featured: false,
    isbn: "9780827600256",
  },

  // ── NASB 2020 ────────────────────────────────────────────────────────────
  {
    title: "New American Standard Bible 2020 Update",
    slug: "nasb-2020-update",
    translation: "NASB",
    publisher: "Lockman Foundation",
    publishedYear: 2020,
    description:
      "The NASB 2020 Update is a comprehensive revision of the New American Standard Bible (NASB), retaining its reputation as the most literal English translation while updating archaic language, improving consistency, and incorporating advances in Hebrew and Greek scholarship. It is the fourth major revision of the original 1971 NASB.",
    history:
      "The Lockman Foundation published the NASB in 1971, with major revisions in 1977, 1995, and 2020. The 2020 Update was completed by a team of over 25 scholars and involved reviewing every word of every verse for clarity, accuracy, and readability — while maintaining the NASB's core commitment to maximum formal equivalence. The 2020 Update replaced 'he' and 'him' with 'they' and 'them' in genuinely inclusive contexts, a change that led John MacArthur to commission the Legacy Standard Bible.",
    canonRating: 10,
    canonNotes:
      "Standard 66-book Protestant canon. Most literal major modern English translation; 2020 revision incorporates latest Greek and Hebrew scholarship.",
    gradientFrom: "#200A0A",
    gradientTo:   "#100505",
    accentColor:  "#CC5555",
    featured: true,
    isbn: "9781619700604",
  },

  // ── TNIV ─────────────────────────────────────────────────────────────────
  {
    title: "Today's New International Version — TNIV",
    slug: "tniv-todays-new-international-version",
    translation: "TNIV",
    publisher: "International Bible Society / Zondervan",
    publishedYear: 2005,
    description:
      "The Today's New International Version (TNIV) was an update of the 1984 NIV that introduced gender-inclusive language — using 'brothers and sisters' where 'brothers' referred to both men and women, and 'human beings' where 'man' meant humanity. It was discontinued in 2011 when the revised NIV incorporated most of its innovations.",
    history:
      "The TNIV NT was released in 2002 and the complete Bible in 2005. It sparked a major evangelical controversy over gender-inclusive Bible translation, with the Council on Biblical Manhood and Womanhood mounting a significant campaign against it. In 2009, Zondervan and IBS announced it would be discontinued, replaced by the NIV 2011 revision which adopted most of the TNIV's gender-inclusive changes. Historically significant as a pivotal moment in evangelical debates over translation philosophy.",
    canonRating: 5,
    canonNotes:
      "Standard 66-book Protestant canon. Discontinued in 2011; historically significant for gender-language translation debate. The NIV 2011 absorbed most of its changes.",
    gradientFrom: "#0A1A0A",
    gradientTo:   "#050D05",
    accentColor:  "#5CBB5C",
    featured: false,
    isbn: "9780310938217",
  },

  // ── AMPLIFIED CLASSIC ─────────────────────────────────────────────────────
  {
    title: "The Amplified Bible — Classic Edition (1965)",
    slug: "amplified-bible-classic-1965",
    translation: "AMP",
    publisher: "Zondervan / Lockman Foundation",
    publishedYear: 1965,
    description:
      "The Amplified Bible Classic Edition is the original 1965 version of the Amplified Bible — one of the most distinctive Bible translations in print. Using expanded bracketed phrases after words and phrases, it 'amplifies' the meaning of the original Hebrew and Greek by exposing the range of nuances embedded in key words, giving the reader insight normally available only to those who read the original languages.",
    history:
      "The Amplified Bible was produced by the Lockman Foundation and first published in 1965. The project grew out of Frances Siewert's personal study notes, which she shared with the Lockman Foundation in the 1940s. The OT appeared in 1964 and the complete Bible in 1965. A revised Classic Edition was published in 1987. The Amplified Bible was updated significantly in 2015 (the current 'Amplified Bible'), but the Classic Edition remains popular among many readers who prefer the original expanded text.",
    canonRating: 9,
    canonNotes:
      "Standard 66-book Protestant canon. The 'amplification' system exposes Greek and Hebrew nuances; uses KJV-influenced traditional text base.",
    gradientFrom: "#1A0D00",
    gradientTo:   "#0D0600",
    accentColor:  "#D4832A",
    featured: false,
    isbn: "9780310950882",
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`📚 Seeding ${ENTRIES.length} missing Bible translation entries\n`);

  const existing = await db.bibleEdition.findMany({ select: { slug: true } });
  const usedSlugs = new Set(existing.map(b => b.slug));

  let added = 0, skipped = 0, failed = 0;

  for (const entry of ENTRIES) {
    if (usedSlugs.has(entry.slug)) {
      console.log(`⏭  Already exists: ${entry.title}`);
      skipped++;
      continue;
    }

    console.log(`➕ Adding: ${entry.title}`);

    // Try to fetch a cover image
    let coverUrl: string | null = null;
    if (entry.isbn) {
      const buf = await fetchCoverBuffer(entry.isbn);
      if (buf) {
        console.log(`  🖼  Fetched cover (${(buf.length / 1024).toFixed(0)} KB) — uploading…`);
        coverUrl = await uploadCover(buf, entry.slug);
        if (coverUrl) console.log(`  ✅ Cover uploaded`);
        else console.log(`  ⚠️  Cover upload failed — using gradient`);
      } else {
        console.log(`  ⚠️  No cover found for ISBN ${entry.isbn} — using gradient`);
      }
    }

    try {
      const { isbn: _isbn, ...data } = entry;
      await db.bibleEdition.create({ data: { ...data, coverUrl } });
      console.log(`  ✅ Created: ${entry.title}`);
      added++;
      usedSlugs.add(entry.slug);
    } catch (e) {
      console.error(`  ❌ DB error: ${e instanceof Error ? e.message : e}`);
      failed++;
    }
  }

  console.log(`\n📊 Results:`);
  console.log(`   ✅ Added:   ${added}`);
  console.log(`   ⏭  Skipped: ${skipped}`);
  console.log(`   ❌ Failed:  ${failed}`);

  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
