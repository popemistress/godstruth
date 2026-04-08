#!/usr/bin/env python3
"""
Extract all ESV verse text from ESV.epub → data/esv-verses.json
"""
import zipfile, json, re, pathlib
from bs4 import BeautifulSoup, NavigableString, Tag
import warnings; warnings.filterwarnings("ignore")

EPUB   = "ESV.epub"
OUTPUT = pathlib.Path("data/esv-verses.json")
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

SKIP_CLASSES = {'crossref','verse-num','chapter-num','book-name','footnote'}

def node_text(node) -> str:
    if isinstance(node, NavigableString):
        return str(node)
    if isinstance(node, Tag):
        cls = set(node.get('class') or [])
        if cls & SKIP_CLASSES: return ''
        if node.name == 'a' and '[†]' in node.get_text(): return ''
        return ''.join(node_text(c) for c in node.children)
    return ''

def clean(t: str) -> str:
    t = re.sub(r'\[†\]', '', t)
    t = re.sub(r'\s+', ' ', t.replace('\xa0', ' '))
    return t.strip()

def parse_vid(vid: str, book_num: int) -> tuple[int,int,int] | None:
    if not (vid and len(vid)==9 and vid[0]=='v' and vid[1:].isdigit()):
        return None
    b = int(vid[1:3])
    if b != book_num: return None
    return b, int(vid[3:6]), int(vid[6:9])

def extract_file(html_bytes: bytes, book_num: int) -> dict[str,str]:
    soup = BeautifulSoup(html_bytes.decode('utf-8','ignore'), 'lxml')
    book_name = BOOK_NAMES.get(book_num, '')
    if not book_name: return {}

    verses: dict[str,str] = {}
    cur_chapter = 0
    cur_verse   = 0
    cur_parts: list[str] = []

    def make_key(ch, v):
        return f"{book_name} {ch}:{v}" if ch and v else None

    def flush():
        if cur_chapter and cur_verse and cur_parts:
            text = clean(''.join(cur_parts))
            if text:
                k = make_key(cur_chapter, cur_verse)
                if k:
                    if k in verses: verses[k] += ' ' + text
                    else:           verses[k]  = text
        cur_parts.clear()

    for p in soup.find_all('p'):
        p_cls = set(p.get('class') or [])
        if 'heading' in p_cls:
            # Heading may carry the verse ID — remember chapter/verse but don't add text
            vid = p.get('id','')
            parsed = parse_vid(vid, book_num)
            if parsed:
                flush()
                cur_chapter, cur_verse = parsed[1], parsed[2]
            continue

        for child in p.children:
            if isinstance(child, Tag):
                cls = set(child.get('class') or [])

                # ── chapter-num span: update chapter, start verse 1 ──────────
                if 'chapter-num' in cls:
                    flush()
                    try:
                        cur_chapter = int(child.get_text().strip())
                        cur_verse   = 1   # verse 1 follows chapter number
                    except ValueError:
                        pass
                    continue

                # ── verse-num span: boundary ─────────────────────────────────
                if 'verse-num' in cls:
                    flush()
                    # Try span ID first
                    vid = child.get('id','')
                    parsed = parse_vid(vid, book_num)
                    if parsed:
                        cur_chapter, cur_verse = parsed[1], parsed[2]
                    else:
                        # Use span text + current chapter
                        try:
                            cur_verse = int(child.get_text().strip())
                        except ValueError:
                            pass
                    continue

                # ── anything else: accumulate text ───────────────────────────
                cur_parts.append(node_text(child))

            elif isinstance(child, NavigableString):
                cur_parts.append(str(child))

        # Flush at end of paragraph (don't reset verse — next p continues same verse)
        # unless it's a standalone verse p
        flush()

    return verses

# ── Run ─────────────────────────────────────────────────────────────────────
print(f"Opening {EPUB}...")
all_verses: dict[str,str] = {}

with zipfile.ZipFile(EPUB) as z:
    text_files = sorted([
        n for n in z.namelist()
        if re.match(r'OEBPS/Text/b\d+\.\d+\.[^.]+\.text\.xhtml$', n)
    ])
    print(f"Processing {len(text_files)} files...")
    for i, fname in enumerate(text_files):
        m = re.match(r'OEBPS/Text/b(\d+)\.', fname)
        if not m: continue
        book_num = int(m.group(1))
        if book_num not in BOOK_NAMES: continue
        verses = extract_file(z.read(fname), book_num)
        all_verses.update(verses)
        if (i+1) % 20 == 0:
            print(f"  {i+1}/{len(text_files)}: {len(all_verses):,} verses")

print(f"\nTotal: {len(all_verses):,} verses")
for ref in ["John 3:16","Genesis 1:1","Revelation 22:21","Psalms 23:1","Ephesians 2:8","Romans 8:28","Matthew 5:3"]:
    v = all_verses.get(ref,'MISSING')
    print(f"  {ref}: {v[:90]}")

OUTPUT.write_text(json.dumps(all_verses, ensure_ascii=False))
print(f"\nWritten {OUTPUT} ({OUTPUT.stat().st_size/1024/1024:.1f} MB)")
