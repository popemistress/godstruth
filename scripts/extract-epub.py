#!/usr/bin/env python3
"""
Extract God's Plan for Man epub → lessons-epub-data.json
Produces: { lessons: [{num, title, content}], supplements: [{num, title, forLessons, content}] }
"""

import zipfile, json, re, warnings
from bs4 import BeautifulSoup, XMLParsedAsHTMLWarning

warnings.filterwarnings("ignore", category=XMLParsedAsHTMLWarning)

EPUB = "God's Plan for Man.epub"

# ── File → content mapping ────────────────────────────────────────────────────
# Each entry: (file, type, number)
# type: "lesson" | "supplement" | "continuation" (merged into prev lesson)
FILE_MAP = [
    ("index_split_001.html", "lesson",      1),
    ("index_split_002.html", "lesson",      2),
    ("index_split_003.html", "supplement",  1),
    ("index_split_004.html", "lesson",      3),
    ("index_split_005.html", "lesson",      4),
    ("index_split_006.html", "supplement",  2),
    ("index_split_007.html", "lesson",      5),
    ("index_split_008.html", "continuation",5),   # Part I diagram content
    ("index_split_009.html", "lesson",      6),
    ("index_split_010.html", "supplement",  3),
    ("index_split_011.html", "lesson",      7),
    ("index_split_012.html", "lesson",      8),
    ("index_split_013.html", "supplement",  4),
    ("index_split_014.html", "lesson",      9),
    ("index_split_015.html", "continuation",9),   # Part II + L9 content
    ("index_split_016.html", "lesson",      10),
    ("index_split_017.html", "supplement",  5),
    ("index_split_018.html", "lesson",      11),
    ("index_split_019.html", "lesson",      12),
    ("index_split_020.html", "supplement",  6),
    ("index_split_021.html", "lesson",      13),
    ("index_split_022.html", "lesson",      14),
    ("index_split_023.html", "supplement",  7),
    ("index_split_024.html", "lesson",      15),
    ("index_split_025.html", "lesson",      16),
    ("index_split_026.html", "supplement",  8),
    ("index_split_027.html", "lesson",      17),
    ("index_split_028.html", "lesson",      18),
    ("index_split_029.html", "supplement",  9),
    ("index_split_030.html", "lesson",      19),  # Part III + L19
    ("index_split_031.html", "lesson",      20),
    ("index_split_032.html", "supplement",  10),
    ("index_split_033.html", "lesson",      21),
    ("index_split_034.html", "lesson",      22),
    ("index_split_035.html", "supplement",  11),
    ("index_split_036.html", "lesson",      23),
    ("index_split_037.html", "lesson",      24),
    ("index_split_038.html", "supplement",  12),
    ("index_split_039.html", "lesson",      25),
    ("index_split_040.html", "lesson",      26),
    ("index_split_041.html", "supplement",  13),
    ("index_split_042.html", "lesson",      27),
    ("index_split_043.html", "lesson",      28),
    ("index_split_044.html", "supplement",  14),
    ("index_split_045.html", "lesson",      29),
    ("index_split_046.html", "lesson",      30),
    ("index_split_047.html", "supplement",  15),
    ("index_split_048.html", "lesson",      31),
    ("index_split_049.html", "lesson",      32),
    ("index_split_050.html", "supplement",  16),
    ("index_split_051.html", "lesson",      33),
    ("index_split_052.html", "lesson",      34),
    ("index_split_053.html", "supplement",  17),
    ("index_split_054.html", "lesson",      35),
    ("index_split_055.html", "lesson",      36),
    ("index_split_056.html", "supplement",  18),
    ("index_split_057.html", "lesson",      37),
    ("index_split_058.html", "lesson",      38),
    ("index_split_059.html", "supplement",  19),
    ("index_split_060.html", "lesson",      39),
    ("index_split_061.html", "continuation",39),  # Daniel 110 wonders
    ("index_split_062.html", "lesson",      40),
    ("index_split_063.html", "supplement",  20),
    ("index_split_064.html", "lesson",      41),
    ("index_split_065.html", "continuation",41),  # Revelation gist
    ("index_split_066.html", "lesson",      42),
    ("index_split_067.html", "supplement",  21),
    ("index_split_068.html", "lesson",      43),
    ("index_split_069.html", "lesson",      44),
    ("index_split_070.html", "supplement",  22),
    ("index_split_071.html", "lesson",      45),
    ("index_split_072.html", "lesson",      46),
    ("index_split_073.html", "supplement",  23),
    ("index_split_074.html", "lesson",      47),
    ("index_split_075.html", "lesson",      48),
    ("index_split_076.html", "supplement",  24),
    ("index_split_077.html", "lesson",      49),
    ("index_split_078.html", "lesson",      50),
    ("index_split_079.html", "supplement",  25),
    ("index_split_080.html", "lesson",      51),
    ("index_split_081.html", "lesson",      52),
    ("index_split_082.html", "supplement",  26),  # ToC contains Supplement 26? No...
]

# Supplement 26 is for lessons 51-52 — it's in 082 (which is ToC) so we skip
# Actually looking at the file map the last supplement file should be after 081
# Let me check: supplements are every 3rd file in sequence. S26 for L51+L52 might be missing or in 082.

# ── HTML → Markdown converter ─────────────────────────────────────────────────

def html_to_markdown(html_bytes: bytes) -> tuple[str, str]:
    """Returns (title, markdown_content)."""
    soup = BeautifulSoup(html_bytes.decode("utf-8", "ignore"), "lxml")

    # Remove page header (the repeated book title at top of every page)
    for tag in soup.find_all(class_=re.compile(r"calibre\d*")):
        pass  # we'll handle via text extraction

    title = ""
    blocks: list[str] = []

    def clean(s: str) -> str:
        s = re.sub(r"\s+", " ", s).strip()
        return s

    def process_node(node):
        nonlocal title
        if node.name is None:
            return  # NavigableString — handled by parent

        tag = node.name.lower()

        if tag in ("style", "script", "head"):
            return

        text = clean(node.get_text(" "))
        if not text:
            return

        # Headings
        if tag == "h1":
            if not title:
                title = text
            else:
                blocks.append(f"# {text}")
            return

        if tag in ("h2", "h3"):
            # Skip repeated book title
            if "God's Plan for Man" in text and len(text) < 30:
                return
            level = "## " if tag == "h2" else "### "
            blocks.append(f"{level}{text}")
            return

        if tag in ("h4", "h5", "h6"):
            blocks.append(f"### {text}")
            return

        # Block elements — recurse into children producing lines
        if tag in ("div", "section", "article", "body", "html"):
            for child in node.children:
                process_node(child)
            return

        if tag == "p":
            if text:
                # Check for blockquote-style italic scripture quotes
                em = node.find("em") or node.find("i")
                if em and clean(em.get_text()) == text:
                    blocks.append(f"> {text}")
                else:
                    blocks.append(text)
            return

        if tag in ("ul", "ol"):
            for li in node.find_all("li", recursive=False):
                li_text = clean(li.get_text(" "))
                if li_text:
                    blocks.append(f"- {li_text}")
            return

        if tag == "li":
            if text:
                blocks.append(f"- {text}")
            return

        if tag in ("blockquote",):
            if text:
                for line in text.split("\n"):
                    l = line.strip()
                    if l:
                        blocks.append(f"> {l}")
            return

        if tag == "hr":
            blocks.append("---")
            return

        if tag == "table":
            rows = []
            for tr in node.find_all("tr"):
                cells = [clean(td.get_text(" ")) for td in tr.find_all(["th", "td"])]
                rows.append(cells)
            if rows:
                # Build markdown table
                header = rows[0]
                sep = ["---"] * len(header)
                blocks.append("| " + " | ".join(header) + " |")
                blocks.append("| " + " | ".join(sep) + " |")
                for row in rows[1:]:
                    # Pad row to header length
                    while len(row) < len(header):
                        row.append("")
                    blocks.append("| " + " | ".join(row[:len(header)]) + " |")
            return

        # Inline elements — handle via parent's get_text
        if tag in ("span", "em", "i", "strong", "b", "a", "cite", "sup", "sub"):
            if text:
                blocks.append(text)
            return

        # Default: recurse
        for child in node.children:
            process_node(child)

    body = soup.find("body") or soup
    for child in body.children:
        process_node(child)

    # Post-process: merge consecutive short lines that are continuations
    merged: list[str] = []
    for block in blocks:
        block = block.strip()
        if not block:
            continue
        # Skip repeated book title header
        if block == "God's Plan for Man":
            continue
        merged.append(block)

    # Deduplicate consecutive identical lines
    deduped: list[str] = []
    prev = None
    for line in merged:
        if line != prev:
            deduped.append(line)
        prev = line

    content = "\n\n".join(deduped)

    # Extract real title from first heading-like line if not found
    if not title:
        for line in deduped:
            if len(line) > 3 and len(line) < 120:
                title = line
                break

    return title, content


# ── Supplement title helpers ──────────────────────────────────────────────────
SUPP_LESSONS = {
    1: (1, 2), 2: (3, 4), 3: (5, 6), 4: (7, 8),
    5: (9, 10), 6: (11, 12), 7: (13, 14), 8: (15, 16), 9: (17, 18),
    10: (19, 20), 11: (21, 22), 12: (23, 24), 13: (25, 26), 14: (27, 28),
    15: (29, 30), 16: (31, 32), 17: (33, 34), 18: (35, 36),
    19: (37, 38), 20: (39, 40), 21: (41, 42), 22: (43, 44), 23: (45, 46),
    24: (47, 48), 25: (49, 50), 26: (51, 52),
}

# ── Main extraction ───────────────────────────────────────────────────────────
lessons: dict[int, dict] = {}
supplements: dict[int, dict] = {}

with zipfile.ZipFile(EPUB) as z:
    for (fname, ftype, num) in FILE_MAP:
        if fname not in z.namelist():
            print(f"  MISSING: {fname}")
            continue

        raw = z.read(fname)
        file_title, content = html_to_markdown(raw)

        if ftype == "lesson":
            lessons[num] = {"num": num, "title": file_title, "content": content}
            print(f"  L{num:02d}: {file_title[:70]}")

        elif ftype == "continuation":
            if num in lessons:
                lessons[num]["content"] += "\n\n---\n\n" + content
                print(f"  L{num:02d} +continuation")
            else:
                print(f"  L{num:02d} continuation but no base!")

        elif ftype == "supplement":
            pair = SUPP_LESSONS.get(num, (0, 0))
            supplements[num] = {
                "num": num,
                "title": f"Supplement {num}",
                "forLessons": list(pair),
                "content": content,
            }
            print(f"  S{num:02d}: for lessons {pair}")

# ── Clean up lesson titles ────────────────────────────────────────────────────
LESSON_TITLES = {
    1:  "God's Plan for Man",
    2:  "The Holy Scriptures",
    3:  "How to Interpret the Bible",
    4:  "The Truth About God",
    5:  "The Original Creations of God",
    6:  "Satan and the Spirit World",
    7:  "The Dispensation of Angels",
    8:  "The Story of Re-Creation",
    9:  "The Dispensation of Innocence",
    10: "God's Plan for the Needs of Man",
    11: "The Dispensation of Conscience",
    12: "Why God's Plan for the Needs of Man is Not Realized",
    13: "The Dispensation of Human Government",
    14: "Divine Healing and Divine Health",
    15: "The Dispensation of Promise",
    16: "Asking and Receiving from God",
    17: "The Dispensation of Law",
    18: "The Old Testament Church",
    19: "The Dispensation of Grace",
    20: "The New Testament Program for the Modern Church",
    21: "The Truth About Jesus Christ",
    22: "A Christian's Power of Attorney",
    23: "The Bible Doctrine of Sin",
    24: "How to Get Rid of Sin and Sickness",
    25: "The Truth About the Holy Spirit",
    26: "The Gifts and Fruit of the Holy Spirit",
    27: "The Doctrine of the Trinity",
    28: "Faith — How to Attain to All the Known Needs of Life",
    29: "The New Testament Church",
    30: "The Truth About the Baptism of the Holy Spirit",
    31: "The Kingdom of Heaven and the Kingdom of God",
    32: "The Old and New Covenants",
    33: "The Biblical Doctrine of Salvation",
    34: "The Truth About Sanctification and Justification",
    35: "The Truth About Eternal Security",
    36: "Fifteen Great Covenants of Scripture",
    37: "Where Are the Dead?",
    38: "The Seven Judgments of Scripture",
    39: "The Book of Daniel",
    40: "Daniel's Seventieth Week and the Tribulation",
    41: "A Gist of the Book of Revelation",
    42: "Heaven and the Resurrections",
    43: "The Rapture of the Church",
    44: "Exposition of Matthew 24 and 25",
    45: "Sun-Clothed Woman, Manchild, Dragon, Beast, and False Prophet",
    46: "The Beasts Out of the Sea and Earth",
    47: "The Beast with Seven Heads and Ten Horns",
    48: "The Ten Horns and the Beast Itself",
    49: "The Marriage Supper, Second Advent, and Armageddon",
    50: "The Dispensation of Divine Government",
    51: "The New Heaven and the New Earth",
    52: "The Bride of Christ",
}

for num, title in LESSON_TITLES.items():
    if num in lessons:
        lessons[num]["title"] = title

# ── Output ────────────────────────────────────────────────────────────────────
output = {
    "lessons": [lessons[n] for n in sorted(lessons.keys())],
    "supplements": [supplements[n] for n in sorted(supplements.keys())],
}

with open("scripts/lessons-epub-data.json", "w", encoding="utf-8") as f:
    json.dump(output, f, ensure_ascii=False, indent=2)

total_chars = sum(len(l["content"]) for l in output["lessons"])
total_supp  = sum(len(s["content"]) for s in output["supplements"])
print(f"\nDone. {len(output['lessons'])} lessons ({total_chars:,} chars) + {len(output['supplements'])} supplements ({total_supp:,} chars)")
print("Saved to scripts/lessons-epub-data.json")
