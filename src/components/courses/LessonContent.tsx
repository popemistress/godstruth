"use client";

/**
 * Rich markdown renderer for lesson content.
 * Handles headings, blockquotes, tables, lists, inline formatting,
 * ALL-CAPS section labels, scripture reference chips, and more.
 */

import { cn } from "@/lib/utils";
import { parseScriptureList } from "@/lib/scripture-utils";
import { useEffect, useRef } from "react";

interface LessonContentProps {
  content: string;
  lessonId?: string;
  className?: string;
}

function escHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escAttr(str: string) {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

const CHIP_CLASS =
  "scripture-chip inline-flex items-center text-emerald-700 bg-emerald-50 " +
  "border border-emerald-200 px-1.5 py-0.5 rounded-md text-[11px] font-semibold " +
  "not-italic mx-0.5 whitespace-nowrap leading-none cursor-pointer " +
  "hover:bg-emerald-100 hover:border-emerald-400 hover:text-emerald-900 " +
  "transition-colors duration-150 select-none";

/**
 * Replace parenthetical scripture lists with individual per-reference chips.
 * "(Mt. 7:7-11; 18:19-20; Jn. 14:12)" becomes three separate <cite> chips,
 * each carrying only its own normalised reference in data-scripture.
 */
function scriptureChips(text: string): string {
  return text.replace(
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
}

/**
 * Apply inline markdown + scripture chips to a raw string.
 */
function inline(raw: string): string {
  const escaped = escHtml(raw);
  const bolded = escaped
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(
      /`(.+?)`/g,
      '<code class="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-[13px] font-mono">$1</code>'
    );
  return scriptureChips(bolded);
}

/**
 * Detect if a string starts with an ALL-CAPS label like:
 *   "HOW THE BIBLE WAS GIVEN TO MAN. rest…"
 *   "ITS WONDERFUL UNITY. rest…"
 * Returns { label, rest } or null.
 */
function extractCapsLabel(
  text: string
): { label: string; rest: string } | null {
  const match = text.match(/^([A-Z][A-Z\s\-&']{2,}[A-Z])\.\s*(.*)/s);
  if (!match) return null;
  // Avoid false-positives: the label must be all-uppercase letters/spaces/hyphens
  const candidate = match[1];
  if (/[a-z]/.test(candidate)) return null;
  return { label: candidate, rest: match[2] ?? "" };
}

/**
 * Detect lettered sub-items: "A. THE ANTECHAOTIC AGE—…"
 */
function extractAlphaSubItem(
  text: string
): { letter: string; rest: string } | null {
  const match = text.match(/^([A-Z])\.\s+(.*)/s);
  if (!match) return null;
  return { letter: match[1], rest: match[2] ?? "" };
}

/**
 * Detect parenthetical numbered sub-items: "(1) PAST AGES. Paul said…"
 */
function extractParenSubItem(
  text: string
): { num: string; rest: string } | null {
  const match = text.match(/^\((\d+)\)\s+(.*)/s);
  if (!match) return null;
  return { num: match[1], rest: match[2] ?? "" };
}

// ─── Badge / pill HTML helpers ────────────────────────────────────────────────

function capsLabelHtml(label: string): string {
  return `<span class="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full mr-2 align-middle flex-shrink-0">${escHtml(label)}</span>`;
}

function alphaBadgeHtml(letter: string): string {
  return `<span class="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-black mr-2 flex-shrink-0 align-middle">${letter}</span>`;
}

function parenNumHtml(num: string): string {
  return `<span class="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-gray-700 text-[10px] font-black mr-2 flex-shrink-0 align-middle">${num}</span>`;
}

// ─── Core parser ─────────────────────────────────────────────────────────────

function parseMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── H1 ──────────────────────────────────────────────────────────────────
    if (line.startsWith("# ")) {
      const text = inline(line.slice(2));
      html.push(`
        <div class="mb-8 pb-6 border-b-2 border-emerald-100">
          <h1 class="font-serif text-3xl font-bold text-gray-900 leading-tight">${text}</h1>
        </div>`);
      i++;
      continue;
    }

    // ── H2 — Roman numeral section headers ──────────────────────────────────
    if (line.startsWith("## ") && /^Questions on (Lesson|Supplement)/i.test(line.slice(3).trim())) {
      // Redirect ## Questions on... into the styled questions block handler
      const syntheticLine = line.slice(3).trim();
      lines[i] = syntheticLine; // replace so the questions handler picks it up
      continue; // re-process this line
    }
    if (line.startsWith("## ")) {
      const raw = line.slice(3);
      // Check if it starts with a roman numeral like "I.", "Ii.", "Iii.", etc.
      const rnMatch = raw.match(/^([IVXivx]+)\.\s*(.*)/i);
      if (rnMatch) {
        const rn = rnMatch[1].toUpperCase();
        const title = inline(
          rnMatch[2].replace(/^the\s+/i, "").replace(/\b\w/g, (c) => c.toUpperCase())
        );
        html.push(`
          <div class="flex items-start gap-4 mt-12 mb-6">
            <div class="flex-shrink-0 w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center shadow-sm shadow-emerald-500/30">
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
          <div class="mt-10 mb-5">
            <h2 class="font-serif text-xl font-bold text-gray-900 pb-2 border-b-2 border-emerald-100">${title}</h2>
          </div>`);
      }
      i++;
      continue;
    }

    // ── H3 ──────────────────────────────────────────────────────────────────
    if (line.startsWith("### ")) {
      const text = inline(line.slice(4));
      html.push(`
        <h3 class="font-semibold text-base text-gray-800 mt-7 mb-3 flex items-center gap-2">
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

    // ── Blockquote — scripture / KJV quotes ─────────────────────────────────
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
        .map(
          (c) =>
            `<th class="px-4 py-3 text-left text-xs font-bold text-white uppercase tracking-wider">${inline(c)}</th>`
        )
        .join("")}</tr></thead>`;
      const tbody = `<tbody class="divide-y divide-gray-100">${dataRows
        .map(
          (r, ri) =>
            `<tr class="${ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"} hover:bg-emerald-50/50 transition-colors">${r
              .map(
                (c) =>
                  `<td class="px-4 py-3 text-sm text-gray-700 leading-relaxed">${inline(c)}</td>`
              )
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
      html.push(
        `<ul class="space-y-2 my-4 pl-1">${listItems.join("")}</ul>`
      );
      continue;
    }

    // ── Ordered list ─────────────────────────────────────────────────────────
    if (line.match(/^\d+\. /)) {
      const listItems: string[] = [];
      let itemNum = 0;
      while (i < lines.length && lines[i].match(/^\d+\. /)) {
        itemNum++;
        const text = lines[i].replace(/^\d+\. /, "");
        const caps = extractCapsLabel(text);

        if (caps) {
          // Styled label + body text
          const bodyHtml = inline(caps.rest);
          listItems.push(`
            <li class="rounded-xl border border-gray-100 bg-gray-50/60 p-4 space-y-2">
              <div class="flex items-center gap-2">
                <span class="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center">${itemNum}</span>
                ${capsLabelHtml(caps.label)}
              </div>
              ${bodyHtml ? `<p class="text-gray-700 text-[15px] leading-relaxed pl-8">${bodyHtml}</p>` : ""}
            </li>`);
        } else {
          // Normal numbered item
          listItems.push(`
            <li class="flex items-start gap-3">
              <span class="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold flex items-center justify-center mt-0.5">${itemNum}</span>
              <span class="text-gray-800 text-[15px] leading-relaxed flex-1">${inline(text)}</span>
            </li>`);
        }

        i++;

        // Capture indented sub-items
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
      html.push(
        `<ol class="space-y-3 my-5">${listItems.join("")}</ol>`
      );
      continue;
    }

    // ── Questions section ────────────────────────────────────────────────────
    if (/^Questions on (Lesson|Supplement)/i.test(line.trim())) {
      const heading = line.trim();
      i++;
      // Collect all following bullet questions + their ANSWER: lines
      const questions: { text: string; answer: string }[] = [];
      while (i < lines.length) {
        const l = lines[i];
        if (l.match(/^[-*] /)) {
          const text = l.replace(/^[-*] /, "").trim();
          let answer = "";
          // Look ahead for an ANSWER: line (may be next non-blank line)
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
            <!-- saved answer (hidden until answer submitted) -->
            <div class="q-saved hidden flex gap-3">
              <div class="flex-shrink-0 w-0.5 bg-gradient-to-b from-gray-600 to-gray-300 rounded-full mt-1 self-stretch"></div>
              <p class="q-saved-text text-gray-700 text-[14px] leading-relaxed flex-1"></p>
            </div>
            <!-- answer form (hidden once answer submitted) -->
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
    const paraLines: string[] = [];
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
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length === 0) continue;

    for (const para of paraLines) {
      const trimmed = para.trim();
      if (!trimmed) continue;

      // (1) CAPS LABEL. body text
      const parenSub = extractParenSubItem(trimmed);
      if (parenSub) {
        const caps2 = extractCapsLabel(parenSub.rest);
        if (caps2) {
          html.push(`
            <div class="flex items-start gap-2 my-3 pl-2 rounded-lg border-l-2 border-gray-200 bg-gray-50/50 px-3 py-2.5">
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

      // A. / B. / C. lettered sub-items
      const alphaSub = extractAlphaSubItem(trimmed);
      if (alphaSub) {
        html.push(`
          <div class="flex items-start gap-3 my-3 ml-2 rounded-xl border border-emerald-100 bg-emerald-50/40 px-4 py-3">
            ${alphaBadgeHtml(alphaSub.letter)}
            <p class="text-gray-800 text-[15px] leading-relaxed flex-1">${inline(alphaSub.rest)}</p>
          </div>`);
        continue;
      }

      // PART I / PART II header lines (course intro)
      if (/^PART\s+(I{1,3}V?|VI{0,3}|IV|IX|V)\s+/i.test(trimmed)) {
        html.push(`
          <div class="my-1 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-800 text-sm font-semibold">
            ${escHtml(trimmed)}
          </div>`);
        continue;
      }

      // ALL CAPS standalone label (like "PART III God's Present...") or section header
      if (
        trimmed.length < 120 &&
        /^[A-Z][A-Z\s\-&':,0-9–]{6,}$/.test(trimmed)
      ) {
        html.push(`
          <p class="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mt-7 mb-2">
            ${escHtml(trimmed)}
          </p>`);
        continue;
      }

      // Normal paragraph — auto-split very long paragraphs at major sentence breaks
      const rendered = inline(trimmed);
      html.push(
        `<p class="text-gray-800 text-[15px] leading-[1.85] my-4">${rendered}</p>`
      );
    }
  }

  return html.join("\n");
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function showSaved(det: HTMLElement, answer: string) {
  const form = det.querySelector<HTMLElement>(".q-form");
  const saved = det.querySelector<HTMLElement>(".q-saved");
  const savedText = det.querySelector<HTMLElement>(".q-saved-text");
  if (form) form.style.display = "none";
  if (saved) { saved.style.display = "flex"; }
  if (savedText) savedText.textContent = answer;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function LessonContent({ content, lessonId, className }: LessonContentProps) {
  const html = parseMarkdown(content);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ns = lessonId ?? "lesson";

    // Restore any previously saved answers
    container.querySelectorAll<HTMLElement>("details[data-qi]").forEach((det) => {
      const saved = localStorage.getItem(`q-answer:${ns}:${det.dataset.qi}`);
      if (saved) showSaved(det, saved);
    });

    // Single delegated click handler for all submit buttons
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as Element).closest<HTMLElement>(".q-submit");
      if (!btn) return;
      const det = btn.closest<HTMLElement>("details[data-qi]");
      if (!det) return;
      const textarea = det.querySelector<HTMLTextAreaElement>(".q-textarea");
      const answer = textarea?.value.trim() ?? "";
      if (!answer) return;
      localStorage.setItem(`q-answer:${ns}:${det.dataset.qi}`, answer);
      showSaved(det, answer);
    };

    // Ctrl/Cmd+Enter inside a textarea submits
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || !(e.ctrlKey || e.metaKey)) return;
      const textarea = (e.target as Element).closest<HTMLElement>(".q-textarea");
      if (!textarea) return;
      e.preventDefault();
      const det = textarea.closest<HTMLElement>("details[data-qi]");
      if (!det) return;
      const answer = (textarea as HTMLTextAreaElement).value.trim();
      if (!answer) return;
      localStorage.setItem(`q-answer:${ns}:${det.dataset.qi}`, answer);
      showSaved(det, answer);
    };

    container.addEventListener("click", onClick);
    container.addEventListener("keydown", onKeydown);
    return () => {
      container.removeEventListener("click", onClick);
      container.removeEventListener("keydown", onKeydown);
    };
  }, [lessonId]);

  return (
    <div
      ref={containerRef}
      className={cn("lesson-prose max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
