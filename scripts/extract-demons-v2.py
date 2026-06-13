#!/usr/bin/env python3
"""
Extract text from all books in Demons/ folder, remove exact duplicate paragraphs,
and write content organized by source to demons.md.
"""

import os
import re
import zipfile
import warnings
from pathlib import Path
from bs4 import BeautifulSoup, XMLParsedAsHTMLWarning

warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)

DEMONS_DIR = Path("/home/pope/sites/godstruth/Demons")
OUTPUT = Path("/home/pope/sites/godstruth/demons.md")

# ── Seen content store ──────────────────────────────────────────────────────
seen_normalized: set[str] = set()


def normalize(text: str) -> str:
    """Normalize text for exact deduplication."""
    t = re.sub(r"\s+", " ", text).strip().lower()
    # Remove trailing page numbers
    t = re.sub(r"\s+\d+\s*$", "", t)
    return t


def is_exact_duplicate(text: str) -> bool:
    """Check if this exact paragraph was seen before."""
    norm = normalize(text)
    if not norm or len(norm) < 20:
        return False  # Don't deduplicate very short lines
    if norm in seen_normalized:
        return True
    seen_normalized.add(norm)
    return False


# ── EPUB extraction ─────────────────────────────────────────────────────────

def extract_epub(path: Path) -> str:
    blocks: list[str] = []
    try:
        with zipfile.ZipFile(path) as z:
            html_files = [n for n in z.namelist() if n.endswith(('.html', '.xhtml', '.htm'))]
            html_files.sort()
            for fname in html_files:
                try:
                    raw = z.read(fname)
                    soup = BeautifulSoup(raw.decode("utf-8", "ignore"), "lxml")
                    body = soup.find("body") or soup
                    text = body.get_text(separator="\n")
                    lines = [line.strip() for line in text.splitlines() if line.strip()]
                    blocks.extend(lines)
                except Exception as e:
                    pass
    except Exception as e:
        print(f"    Error reading EPUB {path.name}: {e}")
    return "\n".join(blocks)


# ── MOBI extraction ───────────────────────────────────────────────────────────

def extract_mobi(path: Path) -> str:
    try:
        import ebooklib
        from ebooklib import epub
        book = epub.read_epub(str(path))
        blocks = []
        for item in book.get_items():
            if item.get_type() == ebooklib.ITEM_DOCUMENT:
                soup = BeautifulSoup(item.get_content(), "lxml")
                text = soup.get_text(separator="\n")
                lines = [line.strip() for line in text.splitlines() if line.strip()]
                blocks.extend(lines)
        return "\n".join(blocks)
    except Exception:
        pass

    try:
        import mobi
        tempdir, filepath = mobi.extract(str(path))
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except Exception:
        pass

    try:
        with open(path, "rb") as f:
            raw = f.read()
        text = raw.decode("utf-8", "ignore")
        readable = re.findall(r"[A-Za-z0-9\s.,;:!?'\"\-()]{40,}", text)
        return "\n".join(readable)
    except Exception as e:
        print(f"    Failed to extract MOBI {path.name}: {e}")
        return ""


# ── PDF extraction ──────────────────────────────────────────────────────────

def extract_pdf(path: Path) -> str:
    try:
        import fitz
        doc = fitz.open(str(path))
        blocks: list[str] = []
        for page in doc:
            text = page.get_text()
            lines = [line.strip() for line in text.splitlines() if line.strip()]
            blocks.extend(lines)
        doc.close()
        return "\n".join(blocks)
    except Exception as e:
        print(f"    Error reading PDF {path.name}: {e}")
        return ""


# ── Content cleaning ──────────────────────────────────────────────────────────

def clean_and_merge_lines(raw_text: str) -> list[str]:
    """
    Convert raw extracted text into proper paragraphs.
    Books often have one sentence per line or broken paragraphs.
    We merge short lines that appear to be continuations.
    """
    lines = raw_text.splitlines()
    paragraphs: list[str] = []
    current_para = ""

    for line in lines:
        line = line.strip()
        if not line:
            if current_para:
                paragraphs.append(current_para)
                current_para = ""
            continue

        # Skip obvious junk
        if re.match(r"^\s*\d+\s*$", line):
            continue
        if re.match(r"^\.{3,}$", line):
            continue
        if len(line) < 5 and not line.endswith((".", "!", "?", ":", ";")):
            continue

        # If line ends a sentence and is reasonably long, treat as paragraph end
        if line.endswith((".", "!", "?")) and len(line) > 40:
            if current_para:
                current_para += " " + line
                paragraphs.append(current_para)
                current_para = ""
            else:
                paragraphs.append(line)
        # If line is a header-like standalone line (short, capitalized)
        elif len(line) < 80 and line.isupper():
            if current_para:
                paragraphs.append(current_para)
                current_para = ""
            paragraphs.append(line)
        # If line starts a new paragraph (indented feel, or header pattern)
        elif line.startswith("CHAPTER") or line.startswith("Chapter") or line.startswith("PART") or line.startswith("Part"):
            if current_para:
                paragraphs.append(current_para)
                current_para = ""
            paragraphs.append(line)
        else:
            # Continuation of current paragraph
            if current_para:
                current_para += " " + line
            else:
                current_para = line

    if current_para:
        paragraphs.append(current_para)

    return paragraphs


# ── Main processing ───────────────────────────────────────────────────────────

def process_book(path: Path) -> list[str]:
    print(f"  Extracting: {path.name}")

    ext = path.suffix.lower()
    if ext == ".epub":
        raw_text = extract_epub(path)
    elif ext == ".mobi":
        raw_text = extract_mobi(path)
    elif ext == ".pdf":
        raw_text = extract_pdf(path)
    else:
        print(f"    Skipping unknown format: {ext}")
        return []

    paragraphs = clean_and_merge_lines(raw_text)

    unique_paras: list[str] = []
    dup_count = 0
    for para in paragraphs:
        para = para.strip()
        if not para or len(para) < 30:
            continue
        # Skip TOC-like patterns
        if re.match(r"^.*\.{5,}\s*\d+$", para):
            continue
        if is_exact_duplicate(para):
            dup_count += 1
            continue
        unique_paras.append(para)

    print(f"    → {len(unique_paras)} unique paragraphs ({dup_count} exact duplicates filtered)")
    return unique_paras


def main():
    books = sorted(DEMONS_DIR.iterdir())
    books = [b for b in books if b.is_file() and b.suffix.lower() in (".epub", ".mobi", ".pdf")]

    print(f"Found {len(books)} books in {DEMONS_DIR}\n")

    all_unique_paras: list[tuple[str, list[str]]] = []

    for book in books:
        paras = process_book(book)
        if paras:
            all_unique_paras.append((book.name, paras))

    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write("# Demons and Spiritual Warfare: Compiled Knowledge\n\n")
        f.write("> This document compiles information from multiple sources on demonology, "
                 "fallen angels, evil spirits, and spiritual warfare. Each section below represents "
                 "content extracted from its respective source, with exact duplicate paragraphs removed across all sources.\n\n")
        f.write("---\n\n")

        for book_name, paras in all_unique_paras:
            clean_name = re.sub(r"\.(epub|mobi|pdf)$", "", book_name, flags=re.I)
            f.write(f"## {clean_name}\n\n")
            for para in paras:
                f.write(f"{para}\n\n")
            f.write("---\n\n")

    total_paras = sum(len(p) for _, p in all_unique_paras)
    total_chars = sum(sum(len(p) for p in paras) for _, paras in all_unique_paras)
    print(f"\n✅ Wrote {total_paras} unique paragraphs ({total_chars:,} chars) to {OUTPUT}")


if __name__ == "__main__":
    main()
