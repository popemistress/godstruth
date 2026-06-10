#!/usr/bin/env python3
"""
apply-lesson-images-v2.py
──────────────────────────
Reads UploadThing URLs from lesson-images-v2-ut.json and inserts image markdown
DIRECTLY BEFORE the first section heading and every 3rd heading after that.

Images use empty alt ![](url) so no captions render.
Each lesson uses a different offset in the 25-image pool so opening images
differ across lessons.
"""

import json, pathlib, re, psycopg2, sys

UT_FILE     = pathlib.Path("scripts/lesson-images-v2-ut.json")
ENV_FILE    = pathlib.Path(".env.local")
COURSE_SLUG = "gods-universal-plan-for-creation"

if not UT_FILE.exists():
    print("ERROR: lesson-images-v2-ut.json not found. Run upload script first.")
    sys.exit(1)

ut_data = json.loads(UT_FILE.read_text())
pool = sorted(ut_data["images"], key=lambda x: x["index"])
urls = [img["utUrl"] for img in pool]
print(f"Image pool: {len(urls)} images")
if not urls:
    print("No images available."); sys.exit(1)

# ── DB ────────────────────────────────────────────────────────────────────────
env_text = ENV_FILE.read_text()
db_url = None
for line in env_text.splitlines():
    if line.startswith("DATABASE_URL="):
        db_url = re.sub(r'\?.*', '', line.split("=", 1)[1].strip().strip('"').strip("'"))
        break

conn = psycopg2.connect(db_url)
cur  = conn.cursor()

cur.execute('SELECT id FROM "Content" WHERE slug = %s LIMIT 1', (COURSE_SLUG,))
row = cur.fetchone()
if not row:
    print(f"ERROR: Course '{COURSE_SLUG}' not found"); conn.close(); sys.exit(1)
course_id = row[0]
print(f"Course: {course_id}\n")

cur.execute("""
    SELECT cl.id, cl.title, cl.content
    FROM "CourseLesson" cl
    JOIN "CourseChapter" cc ON cc.id = cl."chapterId"
    WHERE cc."contentId" = %s AND cl.type = 'READING'
    ORDER BY cc."order", cl."order"
""", (course_id,))
reading = cur.fetchall()

cur.execute("""
    SELECT cl.id, cl.title, cl.content
    FROM "CourseLesson" cl
    JOIN "CourseChapter" cc ON cc.id = cl."chapterId"
    WHERE cc."contentId" = %s AND cl.type = 'SUPPLEMENT'
    ORDER BY cc."order", cl."order"
""", (course_id,))
supplements = cur.fetchall()

print(f"READING lessons: {len(reading)}")
print(f"SUPPLEMENT lessons: {len(supplements)}\n")

N = len(urls)

# Removes all previously inserted section images (any style)
OLD_IMAGE_RE = re.compile(
    r'\n*!\[(?:gt-section-image[^\]]*|Biblical scene \d+|)\]\(https?://[^\)]+\)',
    re.IGNORECASE
)

# Matches any markdown heading line (H1-H4)
HEADING_RE = re.compile(r'^(#{1,4} .+)$', re.MULTILINE)


def clean_existing(content: str) -> str:
    return OLD_IMAGE_RE.sub('', content).strip()


def insert_images(content: str, lesson_offset: int) -> str:
    """Insert ![](url) before heading[0], heading[3], heading[6], ..."""
    headings = list(HEADING_RE.finditer(content))
    if not headings:
        return content

    rotated = urls[lesson_offset % N:] + urls[:lesson_offset % N]
    targets = [(hi, headings[hi]) for hi in range(len(headings)) if hi % 3 == 0]
    insertions = [
        (m.start(), rotated[slot % N])
        for slot, (_, m) in enumerate(targets)
    ]

    result = content
    for pos, url in sorted(insertions, key=lambda x: -x[0]):
        result = result[:pos] + f"![]({url})\n\n" + result[pos:]
    return result


def process(lesson_id, title, content, lesson_index, label):
    content = content or ""
    content = clean_existing(content)
    new_content = insert_images(content, lesson_index)
    cur.execute('UPDATE "CourseLesson" SET content = %s WHERE id = %s', (new_content, lesson_id))
    imgs = len(re.findall(r'!\[\]\(https?://', new_content))
    print(f"  {label}  offset={lesson_index % N}  imgs={imgs}  {title[:45]}")


print("── READING lessons ────────────────────────────────────")
for idx, (lesson_id, title, content) in enumerate(reading):
    process(lesson_id, title, content, idx, f"L{idx+1:02d} ✓")

print(f"\n── SUPPLEMENT lessons ─────────────────────────────────")
for idx, (lesson_id, title, content) in enumerate(supplements):
    process(lesson_id, title, content, len(reading) + idx, f"S{idx+1:02d} ✓")

conn.commit()
conn.close()

total = len(reading) + len(supplements)
print(f"""
────────────────────────────────────────────────────
  Updated {total} lessons — images inserted directly
  before heading[0], [3], [6], [9], ... per lesson.
  Empty alt text = no captions rendered.
────────────────────────────────────────────────────
Next: bash scripts/push-db-to-prod.sh
""")
