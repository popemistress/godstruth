#!/usr/bin/env python3
"""
Extract text from all books in Demons/ folder, deduplicate across books,
and write unique content to demons.md.
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
seen_paragraphs: set[str] = set()


def normalize_para(text: str) -> str:
    """Normalize paragraph for deduplication comparison."""
    t = re.sub(r"\s+", " ", text).strip().lower()
    # Remove common citation patterns that vary between editions
    t = re.sub(r"\(\d+\)", "", t)
    t = re.sub(r"\[\d+\]", "", t)
    # Remove chapter/verse refs like (John 3:16)
    t = re.sub(r"\([a-z]+\s+\d+[:\d\-]+\)", "", t, flags=re.IGNORECASE)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def is_duplicate(text: str) -> bool:
    """Check if paragraph or its substantial content is already seen."""
    norm = normalize_para(text)
    if not norm or len(norm) < 20:
        return False  # Skip very short lines; not worth deduping
    if norm in seen_paragraphs:
        return True

    # Also check for near-duplicates by containment (one is contained in another)
    for seen in seen_paragraphs:
        if len(seen) > 60 and len(norm) > 60:
            if norm in seen or seen in norm:
                return True
            # If they share >85% of words in common and are similar length
            words_norm = set(norm.split())
            words_seen = set(seen.split())
            if words_norm and words_seen:
                overlap = len(words_norm & words_seen) / max(len(words_norm), len(words_seen))
                if overlap > 0.85 and abs(len(norm) - len(seen)) / max(len(norm), len(seen)) < 0.2:
                    return True

    seen_paragraphs.add(norm)
    return False


# ── EPUB extraction ─────────────────────────────────────────────────────────

def extract_epub(path: Path) -> str:
    """Extract all text from an EPUB file."""
    blocks: list[str] = []
    try:
        with zipfile.ZipFile(path) as z:
            # Find all HTML/XHTML files
            html_files = [n for n in z.namelist() if n.endswith(('.html', '.xhtml', '.htm'))]
            html_files.sort()
            for fname in html_files:
                try:
                    raw = z.read(fname)
                    soup = BeautifulSoup(raw.decode("utf-8", "ignore"), "lxml")
                    body = soup.find("body") or soup
                    text = body.get_text(separator="\n")
                    # Clean up
                    lines = [line.strip() for line in text.splitlines() if line.strip()]
                    blocks.extend(lines)
                except Exception as e:
                    print(f"    Warning in {fname}: {e}")
    except Exception as e:
        print(f"    Error reading EPUB {path.name}: {e}")
    return "\n".join(blocks)


# ── MOBI extraction ───────────────────────────────────────────────────────────

def extract_mobi(path: Path) -> str:
    """Extract text from a MOBI file."""
    # Try ebooklib first (sometimes handles mobi)
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

    # Fallback: try mobi package
    try:
        import mobi
        tempdir, filepath = mobi.extract(str(path))
        with open(filepath, "r", encoding="utf-8", errors="ignore") as f:
            return f.read()
    except Exception:
        pass

    # Last resort: try treating as a binary text extraction
    try:
        with open(path, "rb") as f:
            raw = f.read()
        # Decode what we can
        text = raw.decode("utf-8", "ignore")
        # MOBI files have binary headers; try to find text content
        # Look for readable ASCII sequences
        readable = re.findall(r"[A-Za-z0-9\s.,;:!?'\"\-()]{40,}", text)
        return "\n".join(readable)
    except Exception as e:
        print(f"    Failed to extract MOBI {path.name}: {e}")
        return ""


# ── PDF extraction ──────────────────────────────────────────────────────────

def extract_pdf(path: Path) -> str:
    """Extract text from a PDF file using PyMuPDF."""
    try:
        import fitz  # PyMuPDF
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


# ── Deduplicated content builder ──────────────────────────────────────────────

def process_book(path: Path) -> list[str]:
    """Extract and deduplicate content from a single book."""
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

    # Split into paragraphs (blank-line separated)
    paragraphs = re.split(r"\n{2,}", raw_text)

    unique_paras: list[str] = []
    dup_count = 0
    for para in paragraphs:
        para = para.strip()
        if not para or len(para) < 15:
            continue
        # Skip TOC-like lines, page numbers, headers
        if re.match(r"^\s*\d+\s*$", para):
            continue
        if re.match(r"^\s*(Table of Contents|Contents|Index|Bibliography|References)\s*$", para, re.I):
            continue
        if is_duplicate(para):
            dup_count += 1
            continue
        unique_paras.append(para)

    print(f"    → {len(unique_paras)} unique paragraphs ({dup_count} duplicates filtered)")
    return unique_paras


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    books = sorted(DEMONS_DIR.iterdir())
    books = [b for b in books if b.is_file() and b.suffix.lower() in (".epub", ".mobi", ".pdf")]

    print(f"Found {len(books)} books in {DEMONS_DIR}\n")

    all_unique_paras: list[tuple[str, list[str]]] = []  # (book_name, paragraphs)

    for book in books:
        paras = process_book(book)
        if paras:
            all_unique_paras.append((book.name, paras))

    # Write output
    with open(OUTPUT, "w", encoding="utf-8") as f:
        f.write("# Demons and Spiritual Warfare: Compiled Knowledge\n\n")
        f.write("> This document compiles information from multiple sources on demonology, "
                 "fallen angels, evil spirits, and spiritual warfare. Each section represents "
                 "non-duplicate content extracted from the respective source.\n\n")
        f.write("---\n\n")

        for book_name, paras in all_unique_paras:
            # Clean book name for heading
            clean_name = re.sub(r"\.(epub|mobi|pdf)$", "", book_name, flags=re.I)
            f.write(f"## {clean_name}\n\n")
            for para in paras:
                # Escape markdown if needed
                f.write(f"{para}\n\n")
            f.write("---\n\n")

    total_paras = sum(len(p) for _, p in all_unique_paras)
    total_chars = sum(sum(len(p) for p in paras) for _, paras in all_unique_paras)
    print(f"\n✅ Wrote {total_paras} unique paragraphs ({total_chars:,} chars) to {OUTPUT}")


if __name__ == "__main__":
    main()
