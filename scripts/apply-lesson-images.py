#!/usr/bin/env python3
"""
apply-lesson-images.py
───────────────────────
Reads scripts/lesson-images-ut.json (UploadThing URLs)
Updates CourseLesson records:
  - coverUrl  ← lesson hero image URL
  - content   ← appends section image markdown markers (cycled after every 3rd section)

Run after: node scripts/upload-lesson-images.mjs
"""

import json, pathlib, re, psycopg2, sys

# ── Config ────────────────────────────────────────────────────────────────────
UT_FILE   = pathlib.Path("scripts/lesson-images-ut.json")
ENV_FILE  = pathlib.Path(".env.local")
COURSE_SLUG = "gods-universal-plan-for-creation"

if not UT_FILE.exists():
    print("ERROR: lesson-images-ut.json not found. Run upload-lesson-images.mjs first.")
    sys.exit(1)

image_data = json.loads(UT_FILE.read_text())
section_urls = [u for u in image_data.get("section_images", []) if u]
hero_urls    = image_data.get("hero_images", {})

print(f"Section images available: {len(section_urls)}")
print(f"Hero images available:    {len(hero_urls)}")

# ── DB connection ─────────────────────────────────────────────────────────────
env_text = ENV_FILE.read_text()
db_url = None
for line in env_text.splitlines():
    if line.startswith("DATABASE_URL="):
        db_url = re.sub(r'\?.*', '', line.split("=", 1)[1].strip().strip('"').strip("'"))
        break

if not db_url:
    print("ERROR: DATABASE_URL not found in .env.local")
    sys.exit(1)

conn = psycopg2.connect(db_url)
cur  = conn.cursor()

# ── Get course ID ─────────────────────────────────────────────────────────────
cur.execute('SELECT id FROM "Content" WHERE slug = %s LIMIT 1', (COURSE_SLUG,))
row = cur.fetchone()
if not row:
    print(f"ERROR: Course '{COURSE_SLUG}' not found")
    conn.close()
    sys.exit(1)
course_id = row[0]
print(f"Course ID: {course_id}\n")

# ── Get all READING lessons in order ─────────────────────────────────────────
cur.execute("""
    SELECT cl.id, cl.title, cl.type, cl.content
    FROM "CourseLesson" cl
    JOIN "CourseChapter" cc ON cc.id = cl."chapterId"
    WHERE cc."contentId" = %s AND cl.type = 'READING'
    ORDER BY cc."order", cl."order"
""", (course_id,))
reading_lessons = cur.fetchall()
print(f"Found {len(reading_lessons)} READING lessons")

# ── Get all SUPPLEMENT lessons in order ───────────────────────────────────────
cur.execute("""
    SELECT cl.id, cl.title, cl.type, cl.content
    FROM "CourseLesson" cl
    JOIN "CourseChapter" cc ON cc.id = cl."chapterId"
    WHERE cc."contentId" = %s AND cl.type = 'SUPPLEMENT'
    ORDER BY cc."order", cl."order"
""", (course_id,))
supplement_lessons = cur.fetchall()
print(f"Found {len(supplement_lessons)} SUPPLEMENT lessons\n")

# ── Build section image markdown block ────────────────────────────────────────
# These get appended to lesson content. The LessonContent.tsx extractImages()
# function collects them and redistributes after every 3rd section heading.
if section_urls:
    section_md_lines = [f"![Biblical scene {i+1}]({url})" for i, url in enumerate(section_urls)]
    section_md_block = "\n\n" + "\n".join(section_md_lines)
else:
    section_md_block = ""

MARKER = "Biblical scene 1"  # presence check to avoid duplicate appends

# ── Update READING lessons ────────────────────────────────────────────────────
print("── Updating READING lessons ───────────────────────────")
hero_applied = 0
section_applied = 0

for idx, (lesson_id, title, ltype, content) in enumerate(reading_lessons):
    lesson_num = str(idx + 1)
    hero_url = hero_urls.get(lesson_num)
    content = content or ""

    already_has_sections = MARKER in content
    new_content = content if already_has_sections else content + section_md_block

    if hero_url:
        cur.execute(
            'UPDATE "CourseLesson" SET "coverUrl" = %s, content = %s WHERE id = %s',
            (hero_url, new_content, lesson_id)
        )
        hero_applied += 1
        section_applied += (0 if already_has_sections else 1)
        print(f"  L{lesson_num:>2}: hero ✓ + sections {'SKIP' if already_has_sections else '✓'}")
    elif not already_has_sections and section_md_block:
        cur.execute(
            'UPDATE "CourseLesson" SET content = %s WHERE id = %s',
            (new_content, lesson_id)
        )
        section_applied += 1
        print(f"  L{lesson_num:>2}: no hero, sections ✓")
    else:
        print(f"  L{lesson_num:>2}: SKIP (no changes)")

# ── Update SUPPLEMENT lessons (section images only) ───────────────────────────
print("\n── Updating SUPPLEMENT lessons ────────────────────────")
supp_applied = 0
for (lesson_id, title, ltype, content) in supplement_lessons:
    content = content or ""
    if MARKER in content:
        print(f"  SKIP: {title[:50]}")
        continue
    new_content = content + section_md_block
    cur.execute(
        'UPDATE "CourseLesson" SET content = %s WHERE id = %s',
        (new_content, lesson_id)
    )
    supp_applied += 1
    print(f"  ✓ {title[:50]}")

conn.commit()
conn.close()

print(f"""
────────────────────────────────────────────────────
  Hero images applied:      {hero_applied} / {len(reading_lessons)} lessons
  Section images appended:  {section_applied} READING + {supp_applied} SUPPLEMENT
────────────────────────────────────────────────────
Next: bash scripts/push-db-to-prod.sh
""")
