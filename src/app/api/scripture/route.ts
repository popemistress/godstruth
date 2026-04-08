import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

/**
 * GET /api/scripture?ref=John+3:16&translation=kjv|esv
 *
 * Both translations are served from local epub extracts — no external APIs.
 * - KJV: data/kjv-verses.json  (extracted from kjv.epub)
 * - ESV: data/esv-verses.json  (extracted from ESV.epub)
 */

// Module-level caches — each loaded once per server process
let kjvCache: Record<string, string> | null = null;
let esvCache: Record<string, string> | null = null;

function loadJson(filename: string): Record<string, string> {
  const file = path.join(process.cwd(), "data", filename);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, "utf8")) as Record<string, string>;
}

function getKjvData(): Record<string, string> {
  return (kjvCache ??= loadJson("kjv-verses.json"));
}

function getEsvData(): Record<string, string> {
  return (esvCache ??= loadJson("esv-verses.json"));
}

/**
 * Look up one or more verses from a local verse map.
 * Handles: single verse, range (3:16-18), comma list (3:16,17).
 */
function lookup(ref: string, data: Record<string, string>): string | null {
  const normalized = ref
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

  if (data[normalized]) return data[normalized];

  // Range: "Book Ch:Start-End"
  const rangeMatch = normalized.match(/^(.+?\s+\d+):(\d+)[–\-](\d+)$/);
  if (rangeMatch) {
    const prefix = rangeMatch[1];
    const start  = parseInt(rangeMatch[2], 10);
    const end    = parseInt(rangeMatch[3], 10);
    const parts  = [];
    for (let v = start; v <= end; v++) {
      const t = data[`${prefix}:${v}`];
      if (t) parts.push(t);
    }
    if (parts.length) return parts.join(" ");
  }

  // Comma list: "Book Ch:V1,V2"
  const commaMatch = normalized.match(/^(.+?\s+\d+):(\d+(?:,\s*\d+)+)$/);
  if (commaMatch) {
    const prefix = commaMatch[1];
    const parts  = commaMatch[2]
      .split(",")
      .map((n) => data[`${prefix}:${parseInt(n.trim(), 10)}`])
      .filter(Boolean) as string[];
    if (parts.length) return parts.join(" ");
  }

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

  const data = translation === "esv" ? getEsvData() : getKjvData();
  const text = lookup(ref, data);

  if (!text) {
    return NextResponse.json(
      { error: `${translation.toUpperCase()}: "${ref}" not found` },
      { status: 404 }
    );
  }

  return NextResponse.json({ text }, { headers: CACHE_HEADER });
}
