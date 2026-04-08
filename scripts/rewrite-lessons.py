#!/usr/bin/env python3
"""
rewrite-lessons.py
──────────────────
Rewrites all 52 lessons + 26 supplements from lessons-epub-data.json
into a warm, conversational tone with up to 3 real-world examples per item.

Usage:
    ANTHROPIC_API_KEY=sk-ant-... python3 scripts/rewrite-lessons.py

Progress is saved after every item — safe to Ctrl-C and resume.
Final output: scripts/lessons-rewritten.json
Then apply to DB: node_modules/.bin/tsx scripts/apply-rewritten-lessons.ts
"""

import json, os, sys, time, pathlib
from anthropic import Anthropic, RateLimitError, APIStatusError

SOURCE_FILE   = pathlib.Path("scripts/lessons-epub-data.json")
PROGRESS_FILE = pathlib.Path("scripts/lessons-rewrite-progress.json")
OUTPUT_FILE   = pathlib.Path("scripts/lessons-rewritten.json")
MODEL         = "claude-opus-4-5"
MAX_TOKENS    = 8000
DELAY_BETWEEN = 5
RETRY_DELAYS  = [30, 60, 120, 300]

SYSTEM_PROMPT = """You are a gifted Bible teacher rewriting dense theological text into warm,
conversational prose for modern adult readers. Your job is to make the content feel like a
knowledgeable friend talking you through the material — clear, engaging, and accessible.

RULES (follow exactly):
1. Preserve every scripture reference exactly as written (e.g. "Jn. 3:16", "Mt. 22:29").
2. Preserve all section structure: ## headings, ### headings, blockquotes (> text),
   bullet lists (- item), numbered lists (1. item), and tables.
3. Keep all theological positions and doctrinal claims intact — do not soften, add,
   or remove any doctrine.
4. Convert formal, third-person academic prose to warm second-person ("you", "we", "let's").
5. Break up long paragraphs — keep each paragraph to 2-4 sentences max.
6. For up to 3 difficult concepts per item, add a brief real-world analogy woven naturally
   into the prose (not as a separate header). Introduce analogies with phrases like
   "Think of it like...", "It's similar to...", or "Picture it this way:".
7. Do NOT add new section headers, new scripture references, or new doctrine.
8. Return ONLY the rewritten markdown content — no preamble, no explanation."""

USER_TEMPLATE = """Rewrite the following {item_type} content in a warm, conversational tone
following the system rules. Title: "{title}"

---
{content}
---"""

if not SOURCE_FILE.exists():
    print(f"ERROR: Source file not found: {SOURCE_FILE}")
    sys.exit(1)

source      = json.loads(SOURCE_FILE.read_text())
lessons     = {l["num"]: l for l in source["lessons"]}
supplements = {s["num"]: s for s in source["supplements"]}

if PROGRESS_FILE.exists():
    progress = json.loads(PROGRESS_FILE.read_text())
    done = len(progress["lessons"]) + len(progress["supplements"])
    print(f"Resuming — {done} items already done")
else:
    progress = {"lessons": {}, "supplements": {}}

def save_progress():
    PROGRESS_FILE.write_text(json.dumps(progress, ensure_ascii=False, indent=2))

api_key = os.environ.get("ANTHROPIC_API_KEY", "")
if not api_key:
    print("ERROR: Set ANTHROPIC_API_KEY environment variable.")
    sys.exit(1)

client = Anthropic(api_key=api_key)

def call_api(item_type, title, content):
    user_msg = USER_TEMPLATE.format(item_type=item_type, title=title, content=content[:40000])
    for attempt, delay in enumerate([0] + RETRY_DELAYS):
        if delay:
            print(f"    Rate limited — waiting {delay}s (retry {attempt})...")
            time.sleep(delay)
        try:
            resp = client.messages.create(
                model=MODEL, max_tokens=MAX_TOKENS,
                system=SYSTEM_PROMPT,
                messages=[{"role": "user", "content": user_msg}],
            )
            return resp.content[0].text.strip()
        except RateLimitError:
            if attempt == len(RETRY_DELAYS): raise
        except APIStatusError as e:
            if e.status_code == 529 and attempt < len(RETRY_DELAYS): continue
            raise
    return content

total = len(lessons) + len(supplements)
done  = len(progress["lessons"]) + len(progress["supplements"])
print(f"\nRewriting {total} items  ({done} already done)\n")

for num in sorted(lessons.keys()):
    key = str(num)
    if key in progress["lessons"]:
        print(f"  SKIP L{num:02d}: already done")
        continue
    lesson = lessons[num]
    print(f"  L{num:02d}: {lesson['title'][:60]}", end="", flush=True)
    rewritten = call_api("lesson", lesson["title"], lesson["content"])
    progress["lessons"][key] = {"num": num, "title": lesson["title"], "content": rewritten}
    save_progress()
    print(f"  OK ({len(rewritten):,} chars)")
    time.sleep(DELAY_BETWEEN)

for num in sorted(supplements.keys()):
    key = str(num)
    if key in progress["supplements"]:
        print(f"  SKIP S{num:02d}: already done")
        continue
    supp = supplements[num]
    print(f"  S{num:02d}: {supp['title'][:60]}", end="", flush=True)
    rewritten = call_api("supplement", supp["title"], supp["content"])
    progress["supplements"][key] = {"num": num, "title": supp["title"], "forLessons": supp["forLessons"], "content": rewritten}
    save_progress()
    print(f"  OK ({len(rewritten):,} chars)")
    time.sleep(DELAY_BETWEEN)

output = {
    "lessons":     [progress["lessons"][str(n)]    for n in sorted(lessons.keys())],
    "supplements": [progress["supplements"][str(n)] for n in sorted(supplements.keys())],
}
OUTPUT_FILE.write_text(json.dumps(output, ensure_ascii=False, indent=2))
print(f"\nDone! Written to {OUTPUT_FILE}")
print("Next: node_modules/.bin/tsx scripts/apply-rewritten-lessons.ts")
