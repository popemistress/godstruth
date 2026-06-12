import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

/**
 * GET /api/scripture?ref=John+3:16&translation=kjv
 * GET /api/scripture?translations=1
 *
 * Translations are served from local data/*_bible.json files — no external APIs.
 */

type BibleData = Record<string, Record<string, Record<string, string>>>;

interface TranslationInfo {
  code: string;
  label: string;
  name: string;
  filename: string;
}

const TRANSLATION_NAMES: Record<string, string> = {
  akjv: "American King James Version",
  amp: "Amplified Bible",
  asv: "American Standard Version",
  brg: "BRG Bible",
  csb: "Christian Standard Bible",
  ehv: "Evangelical Heritage Version",
  esv: "English Standard Version",
  esvuk: "English Standard Version Anglicised",
  gnv: "Geneva Bible",
  gw: "GOD'S WORD Translation",
  isv: "International Standard Version",
  jub: "Jubilee Bible",
  kj21: "21st Century King James Version",
  kjv: "King James Version",
  leb: "Lexham English Bible",
  lsb: "Legacy Standard Bible",
  mev: "Modern English Version",
  nasb: "New American Standard Bible",
  nasb1995: "New American Standard Bible 1995",
  net: "New English Translation",
  niv: "New International Version",
  nivuk: "New International Version UK",
  nkjv: "New King James Version",
  nlt: "New Living Translation",
  nlv: "New Life Version",
  nog: "Names of God Bible",
  nrsv: "New Revised Standard Version",
  nrsvue: "New Revised Standard Version Updated Edition",
  rsv: "Revised Standard Version",
  web: "World English Bible",
  ylt: "Young's Literal Translation",
};

const PREFERRED_ORDER = [
  "kjv",
  "nkjv",
  "akjv",
  "kj21",
  "niv",
  "nlt",
  "esv",
  "csb",
  "nasb",
  "nasb1995",
  "amp",
  "net",
  "web",
];

let translationCache: TranslationInfo[] | null = null;
const bibleCache = new Map<string, BibleData>();

function dataDir() {
  return path.join(process.cwd(), "data");
}

function titleFromCode(code: string): string {
  return code
    .replace(/(\d+)/g, " $1")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function listTranslations(): TranslationInfo[] {
  if (translationCache) return translationCache;

  const dir = dataDir();
  if (!fs.existsSync(dir)) return [];

  const order = new Map(PREFERRED_ORDER.map((code, index) => [code, index]));
  translationCache = fs
    .readdirSync(dir)
    .filter((filename) => filename.endsWith("_bible.json"))
    .map((filename) => {
      const rawCode = filename.replace(/_bible\.json$/, "");
      const code = rawCode.toLowerCase();
      const label = rawCode.toUpperCase();

      return {
        code,
        label,
        name: TRANSLATION_NAMES[code] ?? titleFromCode(rawCode),
        filename,
      };
    })
    .sort((a, b) => {
      const aOrder = order.get(a.code) ?? 999;
      const bOrder = order.get(b.code) ?? 999;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.label.localeCompare(b.label);
    });

  return translationCache;
}

function loadBible(translation: TranslationInfo): BibleData {
  const cached = bibleCache.get(translation.code);
  if (cached) return cached;

  const file = path.join(dataDir(), translation.filename);
  const data = JSON.parse(fs.readFileSync(file, "utf8")) as BibleData;
  bibleCache.set(translation.code, data);
  return data;
}

function getVerse(data: BibleData, bookName: string, chapter: number, verse: number): string | null {
  return data[bookName]?.[String(chapter)]?.[String(verse)] ?? null;
}

/**
 * Look up one or more verses from a local verse map.
 * Handles: single verse, same-chapter range (3:16-18), cross-chapter range
 * (3:16–4:5), comma-separated verses/ranges (3:16-18, 22, 25-27).
 */
function lookup(ref: string, data: BibleData): string | null {
  const normalized = ref
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bOf\b/g, "of"); // Book names keep lowercase "of" (e.g., "Song of Solomon")

  // Extract "Book Name Ch" prefix and verse spec after the first colon
  const prefixMatch = normalized.match(/^(.+?\s+)(\d+):(.+)$/);
  if (!prefixMatch) return null;

  const bookName   = prefixMatch[1].trim();
  const chapterStr = prefixMatch[2];
  const verseSpec  = prefixMatch[3];
  const chapterNum = parseInt(chapterStr, 10);

  // Cross-chapter range: "startV–endCh:endV" e.g. "3–2:25" means ch:3 through ch2:v25
  const crossChapter = verseSpec.match(/^(\d+)[–\-](\d+):(\d+)$/);
  if (crossChapter) {
    const startV = parseInt(crossChapter[1], 10);
    const endCh  = parseInt(crossChapter[2], 10);
    const endV   = parseInt(crossChapter[3], 10);
    const parts: string[] = [];
    for (let ch = chapterNum; ch <= endCh; ch++) {
      const sv = ch === chapterNum ? startV : 1;
      const ev = ch === endCh      ? endV   : 200;
      for (let v = sv; v <= ev; v++) {
        const t = getVerse(data, bookName, ch, v);
        if (t) parts.push(t);
      }
    }
    if (parts.length) return parts.join(" ");
  }

  // Comma/range spec within same chapter: e.g. "4-6, 10, 12-14"
  const segments = verseSpec.split(",").map((s) => s.trim());
  const parts: string[] = [];
  for (const seg of segments) {
    const range = seg.match(/^(\d+)[–\-](\d+)$/);
    if (range) {
      const s = parseInt(range[1], 10);
      const e = parseInt(range[2], 10);
      for (let v = s; v <= e; v++) {
        const t = getVerse(data, bookName, chapterNum, v);
        if (t) parts.push(t);
      }
    } else {
      const v = parseInt(seg, 10);
      if (!isNaN(v)) {
        const t = getVerse(data, bookName, chapterNum, v);
        if (t) parts.push(t);
      }
    }
  }
  if (parts.length) return parts.join(" ").replace(/\s+/g, " ").trim();

  return null;
}

const CACHE_HEADER = { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" };

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const translations = listTranslations();

  if (searchParams.has("translations")) {
    return NextResponse.json(
      {
        translations: translations.map(({ code, label, name }) => ({ code, label, name })),
      },
      { headers: CACHE_HEADER }
    );
  }

  const ref         = searchParams.get("ref")?.trim();
  const translation = (searchParams.get("translation") ?? "kjv").toLowerCase();

  if (!ref) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 });
  }

  const selected = translations.find((item) => item.code === translation) ?? translations[0];
  if (!selected) {
    return NextResponse.json({ error: "No Bible translations are available" }, { status: 500 });
  }

  const data = loadBible(selected);
  const text = lookup(ref, data);

  if (!text) {
    return NextResponse.json(
      { error: `${selected.label}: "${ref}" not found` },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { text, translation: { code: selected.code, label: selected.label, name: selected.name } },
    { headers: CACHE_HEADER }
  );
}
