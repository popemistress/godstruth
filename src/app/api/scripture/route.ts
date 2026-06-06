import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

/**
 * GET /api/scripture?ref=John+3:16&translation=kjv|bsb
 *
 * Both translations are served from local verse maps — no external APIs.
 * - KJV: data/kjv-verses.json  (31,102 verses — public domain)
 * - BSB: data/bsb-verses.json  (31,102 verses — Berean Standard Bible, CC BY)
 */

// Module-level caches — each loaded once per server process
let kjvCache: Record<string, string> | null = null;
let bsbCache: Record<string, string> | null = null;

function loadJson(filename: string): Record<string, string> {
  const file = path.join(process.cwd(), "data", filename);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, string>;
}

function getKjvData(): Record<string, string> {
  return (kjvCache ??= loadJson("kjv-verses.json"));
}

function getBsbData(): Record<string, string> {
  return (bsbCache ??= loadJson("bsb-verses.json"));
}

/**
 * Look up one or more verses from a local verse map.
 * Handles: single verse, same-chapter range (3:16-18), cross-chapter range
 * (3:16–4:5), comma-separated verses/ranges (3:16-18, 22, 25-27).
 */
function lookup(ref: string, data: Record<string, string>): string | null {
  const normalized = ref
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
    .replace(/\bOf\b/g, "of"); // Book names keep lowercase "of" (e.g., "Song of Solomon")

  if (data[normalized]) return data[normalized];

  // Extract "Book Name Ch" prefix and verse spec after the first colon
  const prefixMatch = normalized.match(/^(.+?\s+)(\d+):(.+)$/);
  if (!prefixMatch) return null;

  const bookName   = prefixMatch[1].trim();
  const chapterStr = prefixMatch[2];
  const verseSpec  = prefixMatch[3];
  const chapterNum = parseInt(chapterStr, 10);
  const chapPrefix = `${bookName} ${chapterStr}`;

  // Cross-chapter range: "startV–endCh:endV" e.g. "3–2:25" means ch:3 through ch2:v25
  const crossChapter = verseSpec.match(/^(\d+)[–\-](\d+):(\d+)$/);
  if (crossChapter) {
    const startV = parseInt(crossChapter[1], 10);
    const endCh  = parseInt(crossChapter[2], 10);
    const endV   = parseInt(crossChapter[3], 10);
    const parts: string[] = [];
    for (let ch = chapterNum; ch <= endCh; ch++) {
      const cp = `${bookName} ${ch}`;
      const sv = ch === chapterNum ? startV : 1;
      const ev = ch === endCh      ? endV   : 200;
      for (let v = sv; v <= ev; v++) {
        const t = data[`${cp}:${v}`];
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
        const t = data[`${chapPrefix}:${v}`];
        if (t) parts.push(t);
      }
    } else {
      const v = parseInt(seg, 10);
      if (!isNaN(v)) {
        const t = data[`${chapPrefix}:${v}`];
        if (t) parts.push(t);
      }
    }
  }
  if (parts.length) return parts.join(" ");

  return null;
}

const CACHE_HEADER = { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" };

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const ref         = searchParams.get("ref")?.trim();
  const translation = (searchParams.get("translation") ?? "kjv").toLowerCase();

  if (!ref) {
    return NextResponse.json({ error: "Missing ref" }, { status: 400 });
  }

  const data = translation === "bsb" ? getBsbData() : getKjvData();
  const text = lookup(ref, data);

  if (!text) {
    return NextResponse.json(
      { error: `${translation.toUpperCase()}: "${ref}" not found` },
      { status: 404 }
    );
  }

  return NextResponse.json({ text }, { headers: CACHE_HEADER });
}
