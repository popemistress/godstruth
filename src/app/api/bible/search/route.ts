import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

const CACHE_HEADER = { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" };

type BibleData = Record<string, Record<string, Record<string, string>>>;

function dataDir() {
  return path.join(process.cwd(), "data");
}

function loadBible(filename: string): BibleData {
  const file = path.join(dataDir(), filename);
  return JSON.parse(fs.readFileSync(file, "utf8")) as BibleData;
}

interface SearchResult {
  book: string;
  chapter: string;
  verse: string;
  text: string;
}

function searchBible(data: BibleData, query: string, limit: number): SearchResult[] {
  const q = query.toLowerCase();
  const results: SearchResult[] = [];
  for (const [book, chapters] of Object.entries(data)) {
    for (const [chapter, verses] of Object.entries(chapters)) {
      for (const [verseNum, text] of Object.entries(verses)) {
        if (text.toLowerCase().includes(q)) {
          results.push({ book, chapter, verse: verseNum, text });
          if (results.length >= limit) return results;
        }
      }
    }
  }
  return results;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("q")?.trim();
  const translation = (searchParams.get("translation") ?? "kjv").toLowerCase();
  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50"), 200);

  if (!query || query.length < 2) {
    return NextResponse.json({ error: "Query too short" }, { status: 400 });
  }

  const filename = `${translation}_bible.json`;
  const filePath = path.join(dataDir(), filename);
  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Translation not found" }, { status: 404 });
  }

  const data = loadBible(filename);
  const results = searchBible(data, query, limit);

  return NextResponse.json(
    { translation, query, count: results.length, results },
    { headers: CACHE_HEADER }
  );
}
