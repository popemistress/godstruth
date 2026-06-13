import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const CACHE_HEADER = { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" };

type BibleData = Record<string, Record<string, Record<string, string>>>;

function dataDir() {
  return path.join(process.cwd(), "data");
}

function loadBible(filename: string): BibleData {
  const file = path.join(dataDir(), filename);
  return JSON.parse(fs.readFileSync(file, "utf8")) as BibleData;
}

function getVerse(data: BibleData, book: string, chapter: number, verse: number): string | null {
  return data[book]?.[String(chapter)]?.[String(verse)] ?? null;
}

function parseRef(ref: string): { book: string; chapter: number; verse: number } | null {
  const normalized = ref.replace(/\s+/g, " ").trim().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bOf\b/g, "of");
  const match = normalized.match(/^(.+?)\s+(\d+):(\d+)$/);
  if (!match) return null;
  return { book: match[1].trim(), chapter: parseInt(match[2], 10), verse: parseInt(match[3], 10) };
}

const TRANSLATION_NAMES: Record<string, string> = {
  akjv: "American King James Version", amp: "Amplified Bible", asv: "American Standard Version",
  brg: "BRG Bible", csb: "Christian Standard Bible", ehv: "Evangelical Heritage Version",
  esv: "English Standard Version", esvuk: "ESV Anglicised", gnv: "Geneva Bible",
  gw: "GOD'S WORD Translation", isv: "International Standard Version", jub: "Jubilee Bible",
  kj21: "21st Century King James Version", kjv: "King James Version", leb: "Lexham English Bible",
  lsb: "Legacy Standard Bible", mev: "Modern English Version", nasb: "New American Standard Bible",
  nasb1995: "NASB 1995", net: "New English Translation", niv: "New International Version",
  nivuk: "NIV UK", nkjv: "New King James Version", nlt: "New Living Translation",
  nog: "Names of God Bible", nrsv: "New Revised Standard Version", nrsvue: "NRSV Updated Edition",
  rsv: "Revised Standard Version", web: "World English Bible", ylt: "Young's Literal Translation",
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const ref = searchParams.get("ref")?.trim();
  const translationsParam = searchParams.get("translations")?.trim();

  if (!ref) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 });
  }

  const parsed = parseRef(ref);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid reference format. Use: Book Chapter:Verse" }, { status: 400 });
  }

  const translationCodes = translationsParam
    ? translationsParam.split(",").map((t) => t.trim().toLowerCase())
    : ["kjv", "niv", "esv", "nlt"];

  const comparisons: { code: string; name: string; text: string | null }[] = [];

  for (const code of translationCodes) {
    const filename = `${code}_bible.json`;
    const filePath = path.join(dataDir(), filename);
    if (!fs.existsSync(filePath)) continue;
    const data = loadBible(filename);
    const text = getVerse(data, parsed.book, parsed.chapter, parsed.verse);
    comparisons.push({ code, name: TRANSLATION_NAMES[code] ?? code.toUpperCase(), text });
  }

  return NextResponse.json(
    { reference: ref, parsed, comparisons },
    { headers: CACHE_HEADER }
  );
}
