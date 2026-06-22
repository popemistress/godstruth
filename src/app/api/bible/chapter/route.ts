import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

type BibleData = Record<string, Record<string, Record<string, string>>>;

const bibleCache = new Map<string, BibleData>();

function dataDir() {
  return path.join(process.cwd(), "data");
}

function loadBible(translation: string): BibleData | null {
  const code = translation.toLowerCase();
  if (bibleCache.has(code)) return bibleCache.get(code)!;

  const dir = dataDir();
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const filename = files.find(
    (f) => f.toLowerCase() === `${code}_bible.json`
  );
  if (!filename) return null;

  const data = JSON.parse(
    fs.readFileSync(path.join(dir, filename), "utf8")
  ) as BibleData;
  bibleCache.set(code, data);
  return data;
}

const CACHE_HEADER = {
  "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
};

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const book = searchParams.get("book")?.trim();
  const chapterStr = searchParams.get("chapter")?.trim();
  const translation = (searchParams.get("translation") ?? "kjv").toLowerCase();

  if (!book || !chapterStr) {
    return NextResponse.json(
      { error: "Missing book or chapter" },
      { status: 400 }
    );
  }

  const chapter = parseInt(chapterStr, 10);
  if (isNaN(chapter) || chapter < 1) {
    return NextResponse.json({ error: "Invalid chapter" }, { status: 400 });
  }

  const data = loadBible(translation);
  if (!data) {
    return NextResponse.json(
      { error: `Translation "${translation}" not found` },
      { status: 404 }
    );
  }

  // Case-insensitive book lookup
  const bookKey = Object.keys(data).find(
    (k) => k.toLowerCase() === book.toLowerCase()
  );
  if (!bookKey) {
    return NextResponse.json(
      { error: `Book "${book}" not found` },
      { status: 404 }
    );
  }

  const chapterData = data[bookKey]?.[String(chapter)];
  if (!chapterData) {
    return NextResponse.json(
      { error: `${bookKey} chapter ${chapter} not found` },
      { status: 404 }
    );
  }

  const verses = Object.entries(chapterData)
    .map(([v, text]) => ({ verse: parseInt(v, 10), text }))
    .sort((a, b) => a.verse - b.verse);

  return NextResponse.json(
    { book: bookKey, chapter, translation, verses },
    { headers: CACHE_HEADER }
  );
}
