/**
 * lesson-parser.ts — pure server-safe markdown → HTML converter for lesson content.
 * No React, no DOM. Safe to import in server components.
 * Called by LessonPage (server) so the client never has to run this on navigation.
 */

import { INLINE_SCRIPTURE_RE, parseScriptureList, BOOK_MAP } from "@/lib/scripture-utils";

// ─── String utilities ─────────────────────────────────────────────────────────

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escAttr(str: string) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function normalizeMarkdown(md: string): string {
  return md
    .replace(/\r\n?/g, "\n")
    .replace(/ /g, " ")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeInlineText(text: string): string {
  return text
    .replace(/ /g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .replace(/([([{])\s+/g, "$1")
    .replace(/\s+([)\]}])/g, "$1")
    .replace(/\bortime\b/gi, "or time")
    .trim();
}

function titleCaseHeading(raw: string): string {
  const smallWords = new Set([
    "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
    "nor", "of", "on", "or", "the", "to", "with",
  ]);
  const text = normalizeInlineText(raw);
  const words = text.split(" ");
  return words
    .map((word, index) => {
      const lower = word.toLowerCase();
      const isEdge = index === 0 || index === words.length - 1;
      if (!isEdge && smallWords.has(lower)) return lower;
      if (/^[IVX]+\.?$/i.test(word) || (/^[A-Z0-9]{2,}$/.test(word) && !smallWords.has(lower))) {
        return word;
      }
      return lower.replace(/(^|[-—–]|[^A-Za-z0-9])([a-z])/g, (_, sep, c) => `${sep}${c.toUpperCase()}`);
    })
    .join(" ");
}

function isStandaloneSubheading(text: string): boolean {
  if (text.length < 12 || text.length > 90) return false;
  if (/[.!?:;]$/.test(text)) return false;
  if (/[()]/.test(text)) return false;
  if (/^(and|but|or|for|then|thus|therefore|because|if|when|while)\b/i.test(text)) return false;
  const words = text.split(/\s+/);
  if (words.length < 3 || words.length > 12) return false;
  return /^[A-Z0-9]/.test(text) && words.some((word) => /^[A-Z]/.test(word));
}

const CHIP_CLASS =
  "scripture-chip inline-flex items-center text-emerald-700 bg-emerald-50 " +
  "border border-emerald-200 px-1.5 py-0.5 rounded-md text-[11px] font-semibold " +
  "not-italic mx-0.5 whitespace-nowrap leading-none cursor-pointer " +
  "hover:bg-emerald-100 hover:border-emerald-400 hover:text-emerald-900 " +
  "transition-colors duration-150 select-none";

function scriptureChips(text: string): string {
  // Pass 0: strip legacy markdown-style scripture links
  let result = text.replace(
    /\[\s*([^\]]+?)\s*\]\(data-scripture\s*=\s*"\s*([^"]+?)\s*"\s*\)/g,
    (_, display, ref) => {
      const cleanRef = ref.trim();
      const cleanDisplay = display.trim();
      return `<cite data-scripture="${escAttr(cleanRef)}" class="${CHIP_CLASS}">${escHtml(cleanDisplay)}</cite>`;
    }
  );

  // Pass 1: parenthetical groups "(Mt. 7:7-11; 18:19-20)"
  result = result.replace(
    /\(([^)]{3,120}?\d+:\d+[^)]{0,100}?)\)/g,
    (_, inner) => {
      const refs = parseScriptureList(inner);
      if (refs.length === 0) return `(${inner})`;
      return refs
        .map(
          ({ display, ref }) =>
            `<cite data-scripture="${escAttr(ref)}" class="${CHIP_CLASS}">${escHtml(display)}</cite>`
        )
        .join("");
    }
  );

  // Pass 2: inline refs outside parens
  const TAG_RE = /(<[^>]+>)/g;
  const segments = result.split(TAG_RE);
  let citeDepth = 0;
  result = segments
    .map((seg, i) => {
      if (i % 2 === 1) {
        if (/^<cite\b/i.test(seg)) citeDepth++;
        else if (/^<\/cite>/i.test(seg)) citeDepth = Math.max(0, citeDepth - 1);
        return seg;
      }
      if (citeDepth > 0) return seg;
      return seg.replace(
        INLINE_SCRIPTURE_RE,
        (match, bookPart, versePart) => {
          const book = BOOK_MAP[bookPart.toLowerCase().trim()];
          if (!book) return match;
          const verseRef = versePart.replace(/–/g, "-").trim();
          const display = `${book} ${verseRef}`;
          return `<cite data-scripture="${escAttr(display)}" class="${CHIP_CLASS}">${escHtml(display)}</cite>`;
        }
      );
    })
    .join("");

  return result;
}

function inline(raw: string): string {
  const escaped = escHtml(normalizeInlineText(raw));
  const bolded = escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[13px] font-mono">$1</code>'
    );
  return scriptureChips(bolded);
}

function extractCapsLabel(text: string): { label: string; rest: string } | null {
  const match = text.match(/^([A-Z][A-Z\s\-&']{2,}[A-Z])\.\s*(.*)/s);
  if (!match) return null;
  const candidate = match[1];
  if (/[a-z]/.test(candidate)) return null;
  return { label: candidate, rest: match[2] ?? "" };
}

function extractAlphaSubItem(text: string): { letter: string; rest: string } | null {
  const match = text.match(/^([A-Z])\.\s+(.*)/s);
  if (!match) return null;
  return { letter: match[1], rest: match[2] ?? "" };
}

function extractParenSubItem(text: string): { num: string; rest: string } | null {
  const match = text.match(/^\((\d+)\)\s+(.*)/s);
  if (!match) return null;
  return { num: match[1], rest: match[2] ?? "" };
}

function extractRomanHeading(text: string): { rn: string; title: string } | null {
  const match = text.match(/^([IVX]{1,6})\.\s+(.*)/i);
  if (!match) return null;
  const rn = match[1].toUpperCase();
  const validRoman = /^(I|II|III|IV|V|VI|VII|VIII|IX|X|XI|XII)$/;
  if (!validRoman.test(rn)) return null;
  return { rn, title: match[2] ?? "" };
}

function capsLabelHtml(label: string): string {
  return `<span class="inline text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded mr-2 leading-relaxed">${escHtml(label)}</span>`;
}

function alphaBadgeHtml(letter: string): string {
  return `<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-black mr-2 flex-shrink-0 align-middle">${letter}</span>`;
}

function parenNumHtml(num: string): string {
  return `<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-black mr-2 flex-shrink-0 align-middle">${num}</span>`;
}

const IMAGE_RE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

function figureHtml(alt: string, src: string): string {
  const a = escHtml(alt);
  const s = escAttr(src);
  return `
    <figure class="my-6 -mx-2 sm:-mx-6 lesson-lightbox-trigger cursor-zoom-in group" data-lightbox-src="${s}">
      <img src="${s}" alt="${a}" loading="lazy" decoding="async"
        class="w-full rounded-xl shadow-md object-cover max-h-[247px] border-4 border-amber-400 group-hover:border-amber-500 transition-colors duration-200 pointer-events-none" />
    </figure>`;
}

function imageLine(alt: string, src: string): string {
  return `![${alt}](${src})`;
}

function isImagePlacementHeading(line: string): boolean {
  const trimmed = line.trim();
  if (/^##\s+Questions on (Lesson|Supplement)/i.test(trimmed)) return false;
  return (
    /^#{1,3}\s+/.test(trimmed) ||
    !!extractRomanHeading(trimmed) ||
    isStandaloneSubheading(trimmed)
  );
}

function placeLessonImages(lines: string[]): string[] {
  const images: { alt: string; src: string }[] = [];
  const textLines: string[] = [];

  for (const line of lines) {
    const match = line.trim().match(IMAGE_RE);
    if (match) {
      images.push({ alt: match[1], src: match[2] });
    } else {
      textLines.push(line);
    }
  }

  if (images.length === 0) return textLines;

  const topImage = imageLine(images[0].alt, images[0].src);
  return [topImage, "", ...textLines];
}

function stripLeadingHeaders(md: string): string {
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === "" || /^[-*_]{3,}$/.test(line)) { i++; continue; }
    if (/^\d+\.\s+[A-Z][A-Z\s\-&'''':,–]+$/.test(line)) { i++; continue; }
    if (/^LESSON\s+[A-Z-]+$/i.test(line)) { i++; continue; }
    if (/^Supplement\s+[A-Za-z-]+$/i.test(line)) { i++; continue; }
    if (/^For Lessons?\s+/i.test(line)) { i++; continue; }
    if (/^PART\s+[IVX]+\s*:/i.test(line)) { i++; continue; }
    if (/^\(LESSONS?\s+\d+[–\-]\d+\)/i.test(line)) { i++; continue; }
    if (/^[A-Z][A-Z\s\-&'''':,–?()/]+$/.test(line) && !/^[IVX]{1,6}\.\s/.test(line)) { i++; continue; }
    break;
  }
  return lines.slice(i).join("\n");
}

export function parseMarkdown(md: string): string {
  const stripped = stripLeadingHeaders(md);
  const rawLines = normalizeMarkdown(stripped).split("\n");
  const lines = placeLessonImages(rawLines);
  const html: string[] = [];
  let i = 0;

  function prevLineIsImage(lineIdx: number): boolean {
    for (let j = lineIdx - 1; j >= 0; j--) {
      const l = lines[j].trim();
      if (l === "") continue;
      return IMAGE_RE.test(l);
    }
    return false;
  }

  while (i < lines.length) {
    const line = lines[i];

    // ── Lesson image  ![alt](url) ────────────────────────────────────────────
    if (IMAGE_RE.test(line.trim())) {
      const m = line.trim().match(IMAGE_RE)!;
      html.push(figureHtml(m[1], m[2]));
      i++;
      continue;
    }

    // ── H1 ──────────────────────────────────────────────────────────────────
    if (line.startsWith("# ")) {
      const hadImage = prevLineIsImage(i);
      const text = inline(line.slice(2));
      html.push(`
        <div class="${hadImage ? "mt-3" : ""} mb-8 pb-6 border-b-2 border-emerald-100">
          <h1 class="font-serif text-3xl font-bold text-gray-900 leading-tight">${text}</h1>
        </div>`);
      i++;
      continue;
    }

    // ── H2 — Questions redirect ──────────────────────────────────────────────
    if (line.startsWith("## ") && /^Questions on (Lesson|Supplement)/i.test(line.slice(3).trim())) {
      const syntheticLine = line.slice(3).trim();
      lines[i] = syntheticLine;
      continue;
    }
    // ── H2 ──────────────────────────────────────────────────────────────────
    if (line.startsWith("## ")) {
      const hadImage = prevLineIsImage(i);
      const raw = line.slice(3);
      const rnMatch = raw.match(/^([IVXivx]+)\.\s*(.*)/i);
      if (rnMatch) {
        const rn = rnMatch[1].toUpperCase();
        const title = inline(titleCaseHeading(rnMatch[2]));
        html.push(`
          <div class="flex items-start gap-4 ${hadImage ? "mt-3" : "mt-12"} mb-6">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-500/30">
              <span class="text-white text-xs font-black tracking-tight">${escHtml(rn)}</span>
            </div>
            <div class="flex-1 pt-1.5">
              <h2 class="font-serif text-xl font-bold text-gray-900 leading-snug">${title}</h2>
              <div class="mt-2 h-0.5 bg-gradient-to-r from-emerald-200 to-transparent rounded-full"></div>
            </div>
          </div>`);
      } else {
        const title = inline(raw);
        html.push(`
          <div class="${hadImage ? "mt-3" : "mt-10"} mb-5">
            <h2 class="font-serif text-xl font-bold text-gray-900 pb-2 border-b-2 border-emerald-100">${title}</h2>
          </div>`);
      }
      i++;
      continue;
    }

    // ── H3 ──────────────────────────────────────────────────────────────────
    if (line.startsWith("### ")) {
      const hadImage = prevLineIsImage(i);
      const text = inline(line.slice(4));
      html.push(`
        <h3 class="font-semibold text-base text-gray-800 ${hadImage ? "mt-3" : "mt-7"} mb-3 flex items-center gap-2">
          <span class="w-1 h-4 bg-emerald-400 rounded-full flex-shrink-0 inline-block"></span>
          ${text}
        </h3>`);
      i++;
      continue;
    }

    // ── HR ──────────────────────────────────────────────────────────────────
    if (/^---+$/.test(line.trim())) {
      html.push(`
        <div class="flex items-center gap-4 my-10">
          <div class="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-gray-200"></div>
          <div class="flex gap-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-300"></span>
          </div>
          <div class="flex-1 h-px bg-gradient-to-l from-transparent via-gray-200 to-gray-200"></div>
        </div>`);
      i++;
      continue;
    }

    // ── Blockquote ───────────────────────────────────────────────────────────
    if (line.startsWith("> ")) {
      const bqLines: string[] = [];
      while (i < lines.length && lines[i].startsWith("> ")) {
        bqLines.push(inline(lines[i].slice(2)));
        i++;
      }
      const isShort = bqLines.join(" ").length < 200;
      html.push(`
        <blockquote class="relative my-6 pl-5 pr-4 py-4 border-l-4 border-amber-400 bg-gradient-to-r from-amber-50 to-orange-50/30 rounded-r-xl overflow-hidden">
          <div class="absolute top-0 left-0 w-1 h-full bg-amber-400 rounded-l"></div>
          <p class="italic text-gray-800 ${isShort ? "text-base" : "text-sm"} leading-relaxed font-medium">${bqLines.join("<br/>")}</p>
        </blockquote>`);
      continue;
    }

    // ── Table ────────────────────────────────────────────────────────────────
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        const cells = lines[i]
          .trim()
          .split("|")
          .filter((_, ci, arr) => ci > 0 && ci < arr.length - 1)
          .map((c) => c.trim());
        rows.push(cells);
        i++;
      }
      const headerRow = rows[0];
      const dataRows = rows.slice(2);
      const thead = `<thead><tr class="bg-gradient-to-r from-emerald-600 to-emerald-700">${headerRow
        .map((c) => `<th class="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">${inline(c)}</th>`)
        .join("")}</tr></thead>`;
      const tbody = `<tbody class="divide-y divide-gray-100">${dataRows
        .map((r, ri) =>
          `<tr class="${ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-emerald-50/50 transition-colors">${r
            .map((c) => `<td class="px-4 py-3 text-sm text-gray-700 leading-relaxed">${inline(c)}</td>`)
            .join("")}</tr>`
        )
        .join("")}</tbody>`;
      html.push(`
        <div class="overflow-x-auto my-6 rounded-xl border border-gray-200 shadow-sm">
          <table class="w-full text-sm">${thead}${tbody}</table>
        </div>`);
      continue;
    }

    // ── Unordered list ───────────────────────────────────────────────────────
    if (line.match(/^(\s*)[-*] /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^(\s*)[-*] /)) {
        const indent = lines[i].match(/^(\s*)/)?.[1]?.length ?? 0;
        const text = lines[i].replace(/^\s*[-*] /, "");
        const ml = indent >= 3 ? "ml-5" : "";
        listItems.push(
          `<li class="flex items-start gap-3 ${ml}">
            <span class="mt-2 w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0"></span>
            <span class="text-gray-800 text-[15px] leading-relaxed">${inline(text)}</span>
          </li>`
        );
        i++;
      }
      html.push(`<ul class="space-y-2 my-5 pl-1">${listItems.join("")}</ul>`);
      continue;
    }

    // ── Ordered list ─────────────────────────────────────────────────────────
    if (line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        const itemMatch = lines[i].match(/^(\d+)\.\s+(.*)/s);
        const itemNum = itemMatch?.[1] ?? "";
        const text = itemMatch?.[2] ?? lines[i].replace(/^\d+\. /, "");
        const caps = extractCapsLabel(text);
        if (caps) {
          const bodyHtml = inline(caps.rest);
          listItems.push(`
            <li class="rounded-xl border border-gray-300 bg-gray-100 p-4 space-y-2">
              <div class="flex items-start gap-2">
                <span class="flex-shrink-0 min-w-6 h-6 px-1.5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center mt-0.5">${itemNum}</span>
                <div class="flex-1 min-w-0">${capsLabelHtml(caps.label)}</div>
              </div>
              ${bodyHtml ? `<p class="text-gray-700 text-[15px] leading-relaxed pl-8">${bodyHtml}</p>` : ""}
            </li>`);
        } else {
          listItems.push(`
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 min-w-6 h-6 px-1.5 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold flex items-center justify-center mt-0.5">${itemNum}</span>
              <span class="text-gray-800 text-[15px] leading-relaxed flex-1">${inline(text)}</span>
            </li>`);
        }
        i++;
        while (i < lines.length && lines[i].match(/^\s{3,}[-*] /)) {
          const subText = lines[i].replace(/^\s+[-*] /, "");
          listItems.push(`
            <li class="flex items-start gap-2.5 ml-9">
              <span class="mt-2 w-1 h-1 rounded-full bg-gray-400 flex-shrink-0"></span>
              <span class="text-gray-700 text-[14px] leading-relaxed">${inline(subText)}</span>
            </li>`);
          i++;
        }
      }
      html.push(`<ol class="space-y-3 my-6">${listItems.join("")}</ol>`);
      continue;
    }

    // ── Questions section ────────────────────────────────────────────────────
    if (/^Questions on (Lesson|Supplement)/i.test(line.trim())) {
      const heading = line.trim();
      i++;
      const questions: { text: string; answer: string }[] = [];
      while (i < lines.length) {
        const l = lines[i];
        if (l.match(/^[-*] /)) {
          const text = l.replace(/^[-*] /, "").trim();
          let answer = "";
          let j = i + 1;
          while (j < lines.length && lines[j].trim() === "") j++;
          if (j < lines.length && lines[j].startsWith("ANSWER: ")) {
            answer = lines[j].slice(8).trim();
            i = j + 1;
          } else {
            i++;
          }
          questions.push({ text, answer });
        } else if (l.trim() === "" || l.startsWith("ANSWER: ")) {
          i++;
        } else {
          break;
        }
      }
      const questionItems = questions
        .map(
          ({ text: q }, qi) => `
        <details data-qi="${qi}" class="group rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
          <summary class="flex items-start gap-3 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors duration-150">
            <span class="flex-shrink-0 w-7 h-7 rounded-full bg-gray-200 text-gray-700 text-[12px] font-black flex items-center justify-center mt-0.5 group-open:bg-gray-700 group-open:text-white transition-colors duration-200">${qi + 1}</span>
            <span class="text-gray-800 text-[15px] leading-relaxed flex-1 font-medium pt-0.5">${inline(q)}</span>
            <svg class="w-4 h-4 text-gray-400 ml-2 mt-1.5 flex-shrink-0 transition-transform duration-200 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg>
          </summary>
          <div class="px-5 pb-4 pt-3 bg-gray-50 border-t border-gray-200">
            <div class="q-saved hidden flex gap-3">
              <div class="flex-shrink-0 w-0.5 bg-gradient-to-b from-gray-600 to-gray-300 rounded-full mt-1 self-stretch"></div>
              <p class="q-saved-text text-gray-700 text-[14px] leading-relaxed flex-1"></p>
            </div>
            <div class="q-form flex flex-col gap-3">
              <textarea
                class="q-textarea w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-[14px] text-gray-800 leading-relaxed placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none transition-colors"
                rows="3"
                placeholder="Write your answer here…"
              ></textarea>
              <div class="flex justify-end">
                <button
                  type="button"
                  class="q-submit inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 active:bg-gray-900 text-white text-[13px] font-semibold px-4 py-2 rounded-lg transition-colors duration-150 cursor-pointer"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                  Submit Answer
                </button>
              </div>
            </div>
          </div>
        </details>`
        )
        .join("");
      html.push(`
        <div class="questions-block mt-14 mb-8 rounded-2xl overflow-hidden border border-gray-300 shadow-lg">
          <div class="bg-gradient-to-br from-gray-800 to-gray-900 px-6 py-5">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div class="flex-1">
                <p class="text-gray-400 text-[11px] font-bold uppercase tracking-[0.18em] mb-1">Study Questions</p>
                <h3 class="text-white font-bold text-lg leading-tight">${escHtml(heading)}</h3>
              </div>
              <div class="text-right hidden sm:block">
                <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white font-black text-base">${questions.length}</span>
                <p class="text-gray-400 text-[10px] mt-0.5">questions</p>
              </div>
            </div>
            <p class="mt-4 text-gray-400 text-[13px] leading-relaxed border-t border-white/10 pt-3">Expand each question to enter the answer. These questions reinforce the key truths from this lesson.</p>
          </div>
          <div class="bg-white px-4 py-5 space-y-3">
            ${questionItems}
          </div>
        </div>`);
      continue;
    }

    // ── Empty line ────────────────────────────────────────────────────────────
    if (line.trim() === "") {
      i++;
      continue;
    }

    // ── Paragraph — with special sub-item detection ──────────────────────────
    const paraLines: { text: string; lineIdx: number }[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].startsWith("#") &&
      !lines[i].startsWith(">") &&
      !lines[i].startsWith("---") &&
      !lines[i].startsWith("|") &&
      !lines[i].match(/^\d+\. /) &&
      !lines[i].match(/^[-*] /)
    ) {
      paraLines.push({ text: lines[i], lineIdx: i });
      i++;
    }

    if (paraLines.length === 0) continue;

    for (const { text: para, lineIdx: paraLineIdx } of paraLines) {
      const trimmed = para.trim();
      if (!trimmed) continue;

      if (/^(Lesson|Supplement)\s+[\w-]+$/i.test(trimmed)) {
        html.push(`
          <p class="mt-8 mb-2 text-[11px] font-black uppercase tracking-[0.22em] text-emerald-700">
            ${escHtml(normalizeInlineText(trimmed))}
          </p>`);
        continue;
      }

      if (/^For Lessons?\b/i.test(trimmed)) {
        html.push(`
          <p class="mt-1 mb-6 text-sm font-semibold text-gray-500 leading-relaxed">
            ${inline(trimmed)}
          </p>`);
        continue;
      }

      const romanHeading = extractRomanHeading(trimmed);
      if (romanHeading) {
        const hadImageRn = prevLineIsImage(paraLineIdx);
        html.push(`
          <div class="flex items-start gap-4 ${hadImageRn ? "mt-3" : "mt-12"} mb-6">
            <div class="flex-shrink-0 w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-500/30">
              <span class="text-white text-xs font-black tracking-tight">${escHtml(romanHeading.rn)}</span>
            </div>
            <div class="flex-1 pt-1.5">
              <h2 class="font-serif text-xl font-bold text-gray-900 leading-snug">${inline(titleCaseHeading(romanHeading.title))}</h2>
              <div class="mt-2 h-0.5 bg-gradient-to-r from-emerald-200 to-transparent rounded-full"></div>
            </div>
          </div>`);
        continue;
      }

      const parenSub = extractParenSubItem(trimmed);
      if (parenSub) {
        const caps2 = extractCapsLabel(parenSub.rest);
        if (caps2) {
          html.push(`
            <div class="flex items-start gap-2 my-3 pl-2 rounded-lg border-l-4 border-gray-400 bg-gray-100 px-3 py-2.5">
              ${parenNumHtml(parenSub.num)}
              <div class="flex-1 space-y-1">
                ${capsLabelHtml(caps2.label)}
                ${caps2.rest ? `<p class="text-gray-700 text-[14px] leading-relaxed">${inline(caps2.rest)}</p>` : ""}
              </div>
            </div>`);
          continue;
        }
        html.push(`
          <div class="flex items-start gap-2 my-2.5 pl-2">
            ${parenNumHtml(parenSub.num)}
            <p class="text-gray-800 text-[15px] leading-relaxed flex-1">${inline(parenSub.rest)}</p>
          </div>`);
        continue;
      }

      const alphaSub = extractAlphaSubItem(trimmed);
      if (alphaSub) {
        html.push(`
          <div class="flex items-start gap-3 my-3 ml-2 rounded-xl border border-emerald-300 bg-emerald-100 px-4 py-3">
            ${alphaBadgeHtml(alphaSub.letter)}
            <p class="text-gray-800 text-[15px] leading-relaxed flex-1">${inline(alphaSub.rest)}</p>
          </div>`);
        continue;
      }

      if (/^PART\s+(I{1,3}V?|VI{0,3}|IV|IX|V)\s+/i.test(trimmed)) {
        html.push(`
          <div class="my-2 flex items-start gap-3 rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3 text-emerald-900">
            <span class="shrink-0 text-[11px] font-black uppercase tracking-[0.18em] text-emerald-700">${escHtml(trimmed.match(/^PART\s+\S+/i)?.[0] ?? "Part")}</span>
            <span class="text-sm font-semibold leading-snug">${escHtml(normalizeInlineText(trimmed.replace(/^PART\s+\S+\s*/i, "")))}</span>
          </div>`);
        continue;
      }

      if (trimmed.length < 120 && /^[A-Z][A-Z\s\-&':,0-9–]{6,}$/.test(trimmed)) {
        html.push(`
          <p class="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mt-7 mb-2">
            ${escHtml(trimmed)}
          </p>`);
        continue;
      }

      if (isStandaloneSubheading(trimmed)) {
        html.push(`
          <h3 class="font-serif text-lg font-bold text-gray-900 mt-9 mb-3 leading-snug">
            ${inline(trimmed)}
          </h3>`);
        continue;
      }

      const rendered = inline(trimmed);
      html.push(
        `<p class="text-gray-800 text-[15px] sm:text-base leading-[1.85] my-5">${rendered}</p>`
      );
    }
  }

  return html.join("\n");
}
