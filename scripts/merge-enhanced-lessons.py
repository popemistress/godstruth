#!/usr/bin/env python3
"""
merge-enhanced-lessons.py
─────────────────────────
Merges the 5 batch output files from the parallel enhancement agents
into a single lessons-rewritten.json, then optionally applies to the DB.

Run after all enhance-batch*.json files exist in /tmp/:
    python3 scripts/merge-enhanced-lessons.py

Then apply to DB:
    node_modules/.bin/tsx scripts/apply-rewritten-lessons.ts
"""

import json, pathlib, sys

BATCH_FILES = [
    pathlib.Path("/tmp/enhance-batch1.json"),
    pathlib.Path("/tmp/enhance-batch2.json"),
    pathlib.Path("/tmp/enhance-batch3.json"),
    pathlib.Path("/tmp/enhance-batch4.json"),
]
SUPPLEMENT_FILE = pathlib.Path("/tmp/enhance-supplements.json")
OUTPUT_FILE     = pathlib.Path("scripts/lessons-rewritten.json")

# Check all files exist
missing = [f for f in BATCH_FILES + [SUPPLEMENT_FILE] if not f.exists()]
if missing:
    print("ERROR: Missing output files:")
    for f in missing:
        print(f"  {f}")
    sys.exit(1)

all_lessons = []
for batch_file in BATCH_FILES:
    data = json.loads(batch_file.read_text())
    lessons = data.get("lessons", [])
    print(f"  {batch_file.name}: {len(lessons)} lessons")
    all_lessons.extend(lessons)

# Sort by lesson num
all_lessons.sort(key=lambda l: l["num"])

supp_data = json.loads(SUPPLEMENT_FILE.read_text())
all_supplements = supp_data.get("supplements", [])
all_supplements.sort(key=lambda s: s["num"])

print(f"\nTotal lessons:     {len(all_lessons)}")
print(f"Total supplements: {len(all_supplements)}")

# Validate
if len(all_lessons) != 52:
    print(f"WARNING: Expected 52 lessons, got {len(all_lessons)}")
if len(all_supplements) != 25:
    print(f"WARNING: Expected 25 supplements, got {len(all_supplements)}")

output = {
    "lessons":     all_lessons,
    "supplements": all_supplements,
}

OUTPUT_FILE.write_text(json.dumps(output, ensure_ascii=False, indent=2))
print(f"\nWritten to {OUTPUT_FILE}")
print("Next: node_modules/.bin/tsx scripts/apply-rewritten-lessons.ts")
