/**
 * lesson-pagination.ts — split lesson content into pages on the server.
 *
 * For markdown content we split on heading boundaries *before* parsing, so each
 * page is independently valid HTML. For content that is already HTML we fall
 * back to splitting at safe block-level boundaries (`</p>`, `</div>`) so no
 * page leaves unclosed tags.
 *
 * The goal: the browser never receives the entire lesson DOM at once.
 */

import { parseMarkdown, parseQuizJson } from "./lesson-parser";

export interface PaginateOptions {
  /** Minimum character count before pagination is considered. */
  minLengthForPagination?: number;
  /** Soft target for characters per page. */
  targetCharsPerPage?: number;
}

export interface PaginatedLesson {
  pages: string[];
  totalPages: number;
}

export function paginateLessonContent(
  content: string,
  options: PaginateOptions = {}
): PaginatedLesson {
  const minLength = options.minLengthForPagination ?? 5_000;
  const targetChars = options.targetCharsPerPage ?? 4_000;

  if (!content) {
    return { pages: [""], totalPages: 1 };
  }

  const trimmed = content.trim();

  // Quiz JSON — render with the dedicated quiz renderer, no pagination needed.
  if (trimmed.startsWith("{") && trimmed.includes('"questions"')) {
    return { pages: [parseQuizJson(trimmed)], totalPages: 1 };
  }

  if (trimmed.length < minLength) {
    const isHtml = trimmed.startsWith("<");
    return { pages: [isHtml ? content : parseMarkdown(content)], totalPages: 1 };
  }

  const isHtml = trimmed.startsWith("<");

  if (isHtml) {
    const pages = splitHtmlIntoPages(content, targetChars);
    return { pages, totalPages: pages.length };
  }

  const markdownPages = splitMarkdownIntoPages(content, targetChars);
  // Keep premium assessment content attached to the preceding lesson body so
  // students do not have to click to a separate page for practice assignments,
  // worksheets, and study questions.
  const mergedMarkdownPages: string[] = [];
  for (const page of markdownPages) {
    const firstLine = page.split("\n").find((l) => l.trim())?.trim() ?? "";
    const isPremiumPage =
      /^##\s+Practice\s+\&\s+Assessment/i.test(firstLine) ||
      /^##\s+Questions\s+on\s+(Lesson|Supplement)/i.test(firstLine);
    if (isPremiumPage && mergedMarkdownPages.length > 0) {
      mergedMarkdownPages[mergedMarkdownPages.length - 1] += "\n\n" + page;
    } else {
      mergedMarkdownPages.push(page);
    }
  }
  const pages = mergedMarkdownPages.map((page) => parseMarkdown(page));
  return { pages, totalPages: pages.length };
}

// ─── Markdown splitting ─────────────────────────────────────────────────────

function splitMarkdownIntoPages(md: string, targetChars: number): string[] {
  // First pass: split at level-2 headings (natural teaching sections).
  let sections = splitAtMarkdownHeading(md, "## ");

  // Second pass: break oversized sections at level-3 headings.
  sections = sections.flatMap((section) =>
    section.length > targetChars ? splitAtMarkdownHeading(section, "### ") : [section]
  );

  // Final pass: break any remaining oversized chunks at paragraph boundaries.
  sections = sections.flatMap((section) =>
    section.length > targetChars * 1.4 ? splitMarkdownByParagraphs(section, targetChars) : [section]
  );

  // Group sections into pages, keeping sections whole when possible.
  const pages: string[] = [];
  let current = "";
  for (const section of sections) {
    if (current.length && current.length + section.length > targetChars * 1.4 && current.trim()) {
      pages.push(current);
      current = section;
    } else {
      current += section;
    }
  }
  if (current.trim()) pages.push(current);

  return pages.length ? pages : [md];
}

function splitAtMarkdownHeading(md: string, prefix: string): string[] {
  const lines = md.split("\n");
  const parts: string[] = [];
  let current = "";

  for (const line of lines) {
    if (line.startsWith(prefix) && current.trim()) {
      parts.push(current);
      current = "";
    }
    current += line + "\n";
  }
  if (current.trim()) parts.push(current);

  // If the entire input had no split points, return it as a single part.
  return parts.length ? parts : [md];
}

function splitMarkdownByParagraphs(md: string, targetChars: number): string[] {
  const paragraphs = md.split(/\n{2,}/);
  const pages: string[] = [];
  let current = "";

  for (const para of paragraphs) {
    if (current.length + para.length > targetChars * 1.3 && current.trim()) {
      pages.push(current);
      current = para;
    } else {
      if (current) current += "\n\n";
      current += para;
    }
  }
  if (current.trim()) pages.push(current);

  return pages.length ? pages : [md];
}

// ─── HTML splitting ──────────────────────────────────────────────────────────

function splitHtmlIntoPages(html: string, targetChars: number): string[] {
  // Safe block-level boundaries, ordered from strongest to weakest.
  const boundaries = ["</h2>", "</h3>", "</p>", "</div>", "</blockquote>", "</li>"];
  const pages: string[] = [];
  let current = "";
  let i = 0;

  while (i < html.length) {
    // Find the nearest safe boundary at or after the target position.
    const target = i + Math.max(1, targetChars - current.length);
    const searchStart = Math.min(target, html.length);
    let bestBoundary = -1;
    let bestBoundaryEnd = -1;

    for (const boundary of boundaries) {
      const idx = html.toLowerCase().indexOf(boundary.toLowerCase(), searchStart);
      if (idx !== -1 && (bestBoundary === -1 || idx < bestBoundary)) {
        bestBoundary = idx;
        bestBoundaryEnd = idx + boundary.length;
      }
    }

    if (bestBoundary === -1) {
      // No more boundaries; append remainder to current page.
      current += html.slice(i);
      break;
    }

    // Include everything up to and including the closing tag in the current chunk.
    current += html.slice(i, bestBoundaryEnd);
    i = bestBoundaryEnd;

    // If the current chunk has reached a reasonable size, finalize the page.
    if (current.length >= targetChars * 0.75 && current.trim()) {
      pages.push(current);
      current = "";
    }
  }

  if (current.trim()) pages.push(current);

  return pages.length ? pages : [html];
}
