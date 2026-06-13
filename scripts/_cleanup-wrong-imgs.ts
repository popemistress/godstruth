/**
 * Strips all image markdown lines from lessons that were processed with wrong prompts.
 * Also updates /tmp/lesson-img-progress.json to remove their IDs.
 */
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";

const db = new PrismaClient();
const PROGRESS_FILE = "/tmp/lesson-img-progress.json";

// These lessons got wrong prompts due to the substring bug
const WRONG_LESSON_IDS = [
  "cmpwd1v78000y1brp1n28n7rv",  // Lesson 19 — Dispensation of Grace (got universal plan prompts)
  "cmpwd1v8o001r1brpons5asqw",  // Lesson 37 — Where Are the Dead? (got bible interp prompts)
  "cmpwd1v8o001s1brp468r9696",  // Lesson 38 — Seven Judgments (got bible interp prompts)
  "cmpwd1v66000i1brpemiwovav",  // Lesson 10 — Plan for Needs (got universal plan prompts)
  "cmpwd1v8o001u1brpbn0f8qma",  // Lesson 39 — Book of Daniel (got bible interp prompts)
  "cmpwd1v66000k1brpvyd3wfin",  // Lesson 11 — Conscience (got universal plan prompts)
];

function stripImages(content: string): string {
  return content
    .split("\n")
    .filter(line => !line.trim().match(/^!\[[^\]]*\]\([^)]+\)$/))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function main() {
  for (const id of WRONG_LESSON_IDS) {
    const lesson = await db.courseLesson.findUnique({
      where: { id },
      select: { id: true, title: true, content: true }
    });
    if (!lesson) { console.log(`NOT FOUND: ${id}`); continue; }
    
    const cleaned = stripImages(lesson.content!);
    await db.courseLesson.update({
      where: { id },
      data: { content: cleaned }
    });
    console.log(`✅  Cleaned: ${lesson.title}`);
  }

  // Remove wrong IDs from progress file
  const progress: string[] = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
  const wrongSet = new Set(WRONG_LESSON_IDS);
  const updated = progress.filter(id => !wrongSet.has(id));
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(updated, null, 2));
  console.log(`\nProgress file: removed ${progress.length - updated.length} wrong IDs, ${updated.length} remain.`);

  await db.$disconnect();
}
main().catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
