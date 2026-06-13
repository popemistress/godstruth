#!/usr/bin/env python3
"""
enhance-lessons.py
──────────────────
Second-pass enhancement of the already-conversational lessons in
lessons-rewritten.json. Applies 5 content creator improvements:

  1. Hook opening    — Replace dry intro with tension-first question/statement
  2. Story detail    — Give analogies names, places, sensory scene detail
  3. Contrast frame  — Lead major points with the wrong view, then correct it
  4. Deep scripture  — Quote one key verse fully and unpack it; trim reference lists
  5. Recap callback  — Open each lesson with a 1-2 sentence bridge from the prior lesson
  6. Transform close — End with one precise personal question from the lesson's content

Usage:
    ANTHROPIC_API_KEY=sk-ant-... python3 scripts/enhance-lessons.py

Progress is saved after every item. Safe to Ctrl-C and resume.
Output replaces: scripts/lessons-rewritten.json
Then apply:      node_modules/.bin/tsx scripts/apply-rewritten-lessons.ts
"""

import json, os, sys, time, pathlib
from anthropic import Anthropic, RateLimitError, APIStatusError

SOURCE_FILE   = pathlib.Path("scripts/lessons-rewritten.json")
PROGRESS_FILE = pathlib.Path("scripts/lessons-enhance-progress.json")
OUTPUT_FILE   = pathlib.Path("scripts/lessons-rewritten.json")
MODEL         = "claude-opus-4-8"
MAX_TOKENS    = 16000
DELAY_BETWEEN = 5
RETRY_DELAYS  = [30, 60, 120, 300]

SYSTEM_PROMPT = """You are a master Bible teacher and content strategist helping enhance 52
theological lessons for a modern online course. The lessons are already well-written in a warm,
conversational tone. Your job is to apply six specific improvements — nothing more, nothing less.

THE SIX IMPROVEMENTS:

1. HOOK OPENING
   Replace the opening paragraph(s) with a hook that creates tension, surprise, or an
   unanswered question the student immediately wants resolved. Do NOT open with structural
   overview ("In this lesson we'll cover..."), definitions, or dry context-setting.
   Good hook types: a provocative question, a common misconception stated as fact, a brief
   scene that drops the reader into a problem, or a surprising implication of the lesson's topic.

2. STORY DETAIL
   Wherever an analogy, illustration, or example exists, give it concrete human detail:
   a name, a place, a specific moment or decision. Even if the story is hypothetical, make it
   feel real. "A contractor who..." becomes "Picture Marcus, a contractor in Corinth who woke
   up one morning to find his entire blueprints had gone missing." Sensory, specific, grounded.

3. CONTRAST FRAME
   For each major doctrinal point, briefly surface the common wrong view first — the thing
   most people assume or have been taught — explain why it feels intuitive or attractive,
   and THEN deliver the biblical truth as a correction or discovery. This structure:
   "Most people believe [X] because [reason it feels true]. But look at what Scripture actually says..."

4. DEEP SCRIPTURE
   When a scripture is central to a point, quote it fully inline and spend 2-3 sentences
   unpacking what it actually means in context. Reduce large parenthetical citation lists
   (e.g., "(Mt. 3:11; 20:22; Mk. 1:8; Lk. 3:16; Jn. 1:31...)" style lists) — move them
   to a brief "See also:" line at the end of that section rather than mid-sentence. The main
   argument should flow through 1-2 key verses per section, deeply engaged.

5. RECAP CALLBACK
   Add a 1-2 sentence opening bridge (after the hook) that references the previous lesson's
   central insight and connects it to this lesson's question. Format: a brief, natural
   transition — not a formal summary. "Last time we saw that [specific insight from prior
   lesson] — and that same principle is exactly what we need as we turn to today's question."
   (Lesson 1 does not need a callback — it is the first lesson.)

6. TRANSFORMATIONAL CLOSE
   Add a closing paragraph after the last section of the lesson (before any supplement notes
   or quiz prompts) that ends with ONE direct, personal, precise question the student must
   sit with. Not generic ("apply this to your life") but derived from the specific content
   of this lesson. Example: "If providence means what we just read — that God numbers every
   hair on your head and tracks every sparrow — what is one situation you are still managing
   by yourself right now that you have never actually handed to Him?"

HARD RULES:
- Do NOT alter, soften, add, or remove any theological position or doctrinal claim.
- Preserve every existing scripture reference exactly as written.
- Preserve all markdown structure: headings, blockquotes, lists, tables.
- Do NOT add new scripture references not in the original.
- Return ONLY the enhanced markdown content — no preamble, no explanation, no meta-commentary."""

LESSON_TEMPLATE = """Enhance the following lesson content by applying the six improvements
described in your instructions.

Lesson number: {num}
Lesson title: "{title}"
Previous lesson title (for the Recap Callback): "{prev_title}"

---
{content}
---"""

SUPPLEMENT_TEMPLATE = """Enhance the following supplement content by applying improvements
1 (Hook Opening), 2 (Story Detail), 3 (Contrast Frame), 4 (Deep Scripture),
and 6 (Transformational Close). Supplements do NOT need a Recap Callback (#5).

Supplement title: "{title}"
For lessons: {for_lessons}

---
{content}
---"""

if not SOURCE_FILE.exists():
    print(f"ERROR: Source file not found: {SOURCE_FILE}")
    sys.exit(1)

source      = json.loads(SOURCE_FILE.read_text())
lessons     = {l["num"]: l for l in source["lessons"]}
supplements = {s["num"]: s for s in source["supplements"]}

# Build ordered lesson list for prev-lesson callbacks
sorted_lesson_nums = sorted(lessons.keys())
lesson_index = {num: i for i, num in enumerate(sorted_lesson_nums)}

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

def call_api(user_msg: str) -> str:
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
    return user_msg  # fallback: return original if all retries fail

total = len(lessons) + len(supplements)
done  = len(progress["lessons"]) + len(progress["supplements"])
print(f"\nEnhancing {total} items  ({done} already done)\n")

for num in sorted_lesson_nums:
    key = str(num)
    if key in progress["lessons"]:
        print(f"  SKIP L{num:02d}: already done")
        continue

    lesson = lessons[num]
    idx    = lesson_index[num]
    prev_title = "None — this is the first lesson" if idx == 0 else lessons[sorted_lesson_nums[idx - 1]]["title"]

    print(f"  L{num:02d}: {lesson['title'][:60]}", end="", flush=True)

    user_msg = LESSON_TEMPLATE.format(
        num=num,
        title=lesson["title"],
        prev_title=prev_title,
        content=lesson["content"][:45000],
    )
    enhanced = call_api(user_msg)
    progress["lessons"][key] = {"num": num, "title": lesson["title"], "content": enhanced}
    save_progress()
    print(f"  OK ({len(enhanced):,} chars)")
    time.sleep(DELAY_BETWEEN)

for num in sorted(supplements.keys()):
    key = str(num)
    if key in progress["supplements"]:
        print(f"  SKIP S{num:02d}: already done")
        continue

    supp = supplements[num]
    for_lessons_str = ", ".join(str(n) for n in supp.get("forLessons", []))

    print(f"  S{num:02d}: {supp['title'][:60]}", end="", flush=True)

    user_msg = SUPPLEMENT_TEMPLATE.format(
        title=supp["title"],
        for_lessons=for_lessons_str,
        content=supp["content"][:45000],
    )
    enhanced = call_api(user_msg)
    progress["supplements"][key] = {
        "num": num,
        "title": supp["title"],
        "forLessons": supp.get("forLessons", []),
        "content": enhanced,
    }
    save_progress()
    print(f"  OK ({len(enhanced):,} chars)")
    time.sleep(DELAY_BETWEEN)

output = {
    "lessons":     [progress["lessons"][str(n)]    for n in sorted_lesson_nums],
    "supplements": [progress["supplements"][str(n)] for n in sorted(supplements.keys())],
}
OUTPUT_FILE.write_text(json.dumps(output, ensure_ascii=False, indent=2))
print(f"\nDone! Written to {OUTPUT_FILE}")
print("Next: node_modules/.bin/tsx scripts/apply-rewritten-lessons.ts")
