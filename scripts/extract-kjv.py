#!/usr/bin/env python3
"""
Extract all KJV verse text from kjv.epub → data/kjv-verses.json
Verse IDs: v{BB}{CCC}{VVV} (9 chars total: v + 2-digit book + 3-digit ch + 3-digit verse)
"""
import zipfile, json, re, pathlib
from bs4 import BeautifulSoup, NavigableString, Tag
import warnings; warnings.filterwarnings("ignore")

EPUB   = "kjv.epub"
OUTPUT = pathlib.Path("data/kjv-verses.json")
OUTPUT.parent.mkdir(exist_ok=True)

BOOK_NAMES = {
  1:"Genesis",2:"Exodus",3:"Leviticus",4:"Numbers",5:"Deuteronomy",
  6:"Joshua",7:"Judges",8:"Ruth",9:"1 Samuel",10:"2 Samuel",
  11:"1 Kings",12:"2 Kings",13:"1 Chronicles",14:"2 Chronicles",
  15:"Ezra",16:"Nehemiah",17:"Esther",18:"Job",19:"Psalms",
  20:"Proverbs",21:"Ecclesiastes",22:"Song of Solomon",
  23:"Isaiah",24:"Jeremiah",25:"Lamentations",26:"Ezekiel",27:"Daniel",
  28:"Hosea",29:"Joel",30:"Amos",31:"Obadiah",32:"Jonah",33:"Micah",
  34:"Nahum",35:"Habakkuk",36:"Zephaniah",37:"Haggai",38:"Zechariah",39:"Malachi",
  40:"Matthew",41:"Mark",42:"Luke",43:"John",44:"Acts",
  45:"Romans",46:"1 Corinthians",47:"2 Corinthians",48:"Galatians",
  49:"Ephesians",50:"Philippians",51:"Colossians",
  52:"1 Thessalonians",53:"2 Thessalonians",
  54:"1 Timothy",55:"2 Timothy",56:"Titus",57:"Philemon",
  58:"Hebrews",59:"James",60:"1 Peter",61:"2 Peter",
  62:"1 John",63:"2 John",64:"3 John",65:"Jude",66:"Revelation",
}

VID_RE = re.compile(r'^v\d{8}$')   # v + 2-digit book + 3-digit ch + 3-digit verse

def parse_vid(vid: str):
    """'v43003016' → (book=43, ch=3, v=16) or None."""
    if not VID_RE.match(vid):
        return None
    return int(vid[1:3]), int(vid[3:6]), int(vid[6:9])

def extract_verse_text(p_tag: Tag, ver_span: Tag) -> str:
    """Collect text after the ver span, skipping fnref letters and idx footnote spans."""
    parts = []
    past_ver = False
    for child in p_tag.children:
        if child is ver_span:
            past_ver = True
            continue
        if not past_ver:
            continue
        if isinstance(child, NavigableString):
            parts.append(str(child))
        elif isinstance(child, Tag):
            cls = set(child.get('class') or [])
            # Skip cross-ref footnote letters and doctrinal footnote index spans
            if 'fnref' in cls or 'idx' in cls:
                continue
            parts.append(child.get_text())
    text = re.sub(r'\s+', ' ', ''.join(parts)).strip()
    return text

def extract_file(html_bytes: bytes) -> dict[str, str]:
    soup = BeautifulSoup(html_bytes.decode('utf-8', 'ignore'), 'lxml')
    verses: dict[str, str] = {}

    # Find all elements whose id matches vBBCCCVVV
    for el in soup.find_all(id=VID_RE):
        vid = el.get('id', '')
        parsed = parse_vid(vid)
        if not parsed:
            continue
        book_num, ch, v = parsed
        book_name = BOOK_NAMES.get(book_num)
        if not book_name:
            continue

        p = el.parent
        if not p or p.name != 'p':
            continue

        text = extract_verse_text(p, el)
        if text:
            verses[f"{book_name} {ch}:{v}"] = text

    return verses

# ── Run ───────────────────────────────────────────────────────────────────────
print(f"Opening {EPUB}...")
all_verses: dict[str, str] = {}

with zipfile.ZipFile(EPUB) as z:
    xhtml_files = [n for n in z.namelist() if n.endswith('.xhtml') and 'images' not in n]
    print(f"Processing {len(xhtml_files)} files...")
    for i, fname in enumerate(xhtml_files):
        verses = extract_file(z.read(fname))
        all_verses.update(verses)
        if (i + 1) % 60 == 0:
            print(f"  {i+1}/{len(xhtml_files)}: {len(all_verses):,} verses")

print(f"\nTotal: {len(all_verses):,} verses")

for ref in ["John 3:16","Genesis 1:1","Revelation 22:21","Psalms 23:1",
            "Ephesians 2:8","Romans 8:28","Matthew 5:3","1 Corinthians 13:4"]:
    print(f"  {ref}: {all_verses.get(ref,'MISSING')[:90]}")

OUTPUT.write_text(json.dumps(all_verses, ensure_ascii=False))
print(f"\nWritten {OUTPUT}  ({OUTPUT.stat().st_size/1024/1024:.1f} MB)")
