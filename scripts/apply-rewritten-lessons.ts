/**
 * Reads the rewritten lesson content produced by scripts/rewrite-lessons.py
 * and updates every CourseLesson in the DB with the new conversational content.
 *
 * Run AFTER rewrite-lessons.py finishes:
 *   node_modules/.bin/tsx scripts/apply-rewritten-lessons.ts
 */

import { PrismaClient } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();

type LessonEntry     = { num: number; title: string; content: string };
type SupplementEntry = { num: number; title: string; forLessons: number[]; content: string };

// Prefer the Python-script output; fall back to merging the 4 temp part files
const REWRITTEN_FILE = "scripts/lessons-rewritten.json";
const PART_FILES = [
  "/tmp/godstruth-part1-output.json",
  "/tmp/godstruth-part2-output.json",
  "/tmp/godstruth-part3-output.json",
  "/tmp/godstruth-part4-output.json",
];

const allLessons     = new Map<number, LessonEntry>();
const allSupplements = new Map<number, SupplementEntry>();

if (fs.existsSync(REWRITTEN_FILE)) {
  console.log(`Loading from ${REWRITTEN_FILE}...`);
  const data = JSON.parse(fs.readFileSync(REWRITTEN_FILE, "utf8"));
  for (const l of data.lessons as LessonEntry[])     allLessons.set(l.num, l);
  for (const s of data.supplements as SupplementEntry[]) allSupplements.set(s.num, s);
} else {
  const present = PART_FILES.filter((f) => fs.existsSync(f));
  if (present.length === 0) {
    console.error("No rewritten data found. Run scripts/rewrite-lessons.py first.");
    process.exit(1);
  }
  console.log(`Loading from ${present.length} part file(s)...`);
  for (const file of present) {
    const data = JSON.parse(fs.readFileSync(file, "utf8"));
    for (const l of data.lessons as LessonEntry[])     allLessons.set(l.num, l);
    for (const s of data.supplements as SupplementEntry[]) allSupplements.set(s.num, s);
  }
}

console.log(`Loaded ${allLessons.size} lessons, ${allSupplements.size} supplements`);

// ── Fetch all lessons from DB ─────────────────────────────────────────────────

const COURSE_SLUG = "gods-universal-plan-for-creation";

const course = await db.content.findUnique({
  where: { slug: COURSE_SLUG },
  include: {
    chapters: {
      orderBy: { order: "asc" },
      include: {
        lessons: { orderBy: { order: "asc" } },
      },
    },
  },
});

if (!course) {
  console.error("❌  Course not found:", COURSE_SLUG);
  process.exit(1);
}

// ── Update lessons ────────────────────────────────────────────────────────────

let lessonOrder = 0;   // running counter across all chapters
let updatedLessons = 0;
let updatedSupps   = 0;
let skipped        = 0;

for (const chapter of course.chapters) {
  for (const dbLesson of chapter.lessons) {

    // Supplement lessons have type "SUPPLEMENT"
    if (dbLesson.type === "SUPPLEMENT") {
      // Extract supplement number from title e.g. "Supplement 3 — For Lessons 5 & 6"
      const match = dbLesson.title.match(/supplement\s+(\d+)/i);
      const suppNum = match ? parseInt(match[1], 10) : null;
      const rewrittenSupp = suppNum ? allSupplements.get(suppNum) : undefined;

      if (rewrittenSupp) {
        await db.courseLesson.update({
          where: { id: dbLesson.id },
          data:  { content: rewrittenSupp.content },
        });
        updatedSupps++;
        console.log(`  ✅  S${suppNum} ${dbLesson.title}`);
      } else {
        skipped++;
        console.log(`  ⚠️   No rewrite for supplement: "${dbLesson.title}"`);
      }
      continue;
    }

    // IMAGE overview lesson — skip
    if (dbLesson.type === "IMAGE") {
      console.log(`  ⏭️   Skipping IMAGE: ${dbLesson.title}`);
      continue;
    }

    // Regular lesson — match by order position (1-indexed across all chapters)
    lessonOrder++;
    const rewritten = allLessons.get(lessonOrder);
    if (!rewritten) {
      skipped++;
      console.log(`  ⚠️   No rewrite for lesson order ${lessonOrder}: "${dbLesson.title}"`);
      continue;
    }

    await db.courseLesson.update({
      where: { id: dbLesson.id },
      data:  { content: rewritten.content },
    });
    updatedLessons++;
    console.log(`  ✅  L${lessonOrder} ${rewritten.title}`);
  }
}

await db.$disconnect();

console.log(`\nDone. Updated ${updatedLessons} lessons + ${updatedSupps} supplements. Skipped: ${skipped}`);
