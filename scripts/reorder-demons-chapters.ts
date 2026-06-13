/**
 * Reorders Demons course chapters into pedagogically logical sequence:
 * Old: I → II → III → IV(Warfare) → V(Victory) → VI(Watchers) → VII
 * New: I → II → III → IV(Watchers) → V(Warfare) → VI(Victory) → VII
 *
 * Also renames chapters and renumbers lesson titles to match new positions.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const DEMONS_CONTENT_ID = "cmq696d950000jz7b64karn3t";

async function main() {
  const chapters = await db.courseChapter.findMany({
    where: { contentId: DEMONS_CONTENT_ID },
    orderBy: { order: "asc" },
    include: { lessons: { orderBy: { order: "asc" } } },
  });

  // Chapters come back sorted by order asc: [0]=I [1]=II [2]=III [3]=IV [4]=V [5]=VI [6]=VII
  const [p1, p2, p3, p4old, p5old, p6old, p7] = chapters;
  // p4old = Part IV Spiritual Warfare → becomes Part V
  // p5old = Part V Living in Victory  → becomes Part VI
  // p6old = Part VI Watchers          → becomes Part IV

  console.log("Current chapter order:");
  for (const c of chapters) console.log(`  [${c.order}] ${c.title}`);

  // ── Pass 1: set temp orders to avoid unique constraint conflicts ──────────
  console.log("\nPass 1: temp orders...");
  await db.courseChapter.update({ where: { id: p4old.id }, data: { order: 100 } });
  await db.courseChapter.update({ where: { id: p5old.id }, data: { order: 101 } });
  await db.courseChapter.update({ where: { id: p6old.id }, data: { order: 102 } });

  // ── Pass 2: set final orders + rename chapters ────────────────────────────
  console.log("Pass 2: final orders + renames...");

  // Part VI (Watchers) → Part IV
  await db.courseChapter.update({
    where: { id: p6old.id },
    data: {
      order: 4,
      title: "Part IV — The Unseen Architecture: Watchers, Strongmen, and the Global Battlefield",
    },
  });
  console.log("  ✓ Part IV (Watchers/Strongmen)");

  // Part IV (Spiritual Warfare) → Part V
  await db.courseChapter.update({
    where: { id: p4old.id },
    data: { order: 5, title: "Part V — Spiritual Warfare" },
  });
  console.log("  ✓ Part V (Spiritual Warfare)");

  // Part V (Living in Victory) → Part VI
  await db.courseChapter.update({
    where: { id: p5old.id },
    data: { order: 6, title: "Part VI — Living in Victory" },
  });
  console.log("  ✓ Part VI (Living in Victory)");

  // ── Renumber lessons in the moved chapters ───────────────────────────────
  // Old Part IV lessons were numbered 11-14 → now Part V, renumber to 16-19
  // Old Part V lessons were numbered 15-16 → now Part VI, renumber to 20-21
  // Old Part VI lessons were numbered 17-21 → now Part IV, renumber to 11-15

  const lessonRenames: { id: string; oldTitle: string; newTitle: string; oldHeading: string; newHeading: string }[] = [];

  // Old Part VI (now Part IV): lessons 17-21 → 11-15
  const newLessonNums_p4new = [11, 12, 13, 14, 15];
  const oldLessonNums_p6old = [17, 18, 19, 20, 21];
  const readingLessons_p6old = p6old.lessons.filter((l) => l.type === "READING");
  for (let i = 0; i < readingLessons_p6old.length && i < 5; i++) {
    const lesson = readingLessons_p6old[i];
    const oldNum = oldLessonNums_p6old[i];
    const newNum = newLessonNums_p4new[i];
    const oldTitle = `Lesson ${oldNum} — `;
    const newTitle = `Lesson ${newNum} — `;
    lessonRenames.push({
      id: lesson.id,
      oldTitle: lesson.title,
      newTitle: lesson.title.replace(oldTitle, newTitle),
      oldHeading: `## Lesson ${oldNum} — `,
      newHeading: `## Lesson ${newNum} — `,
    });
  }

  // Old Part IV (now Part V): lessons 11-14 → 16-19
  const newLessonNums_p5new = [16, 17, 18, 19];
  const oldLessonNums_p4old = [11, 12, 13, 14];
  const readingLessons_p4old = p4old.lessons.filter((l) => l.type === "READING");
  for (let i = 0; i < readingLessons_p4old.length && i < 4; i++) {
    const lesson = readingLessons_p4old[i];
    const oldNum = oldLessonNums_p4old[i];
    const newNum = newLessonNums_p5new[i];
    lessonRenames.push({
      id: lesson.id,
      oldTitle: lesson.title,
      newTitle: lesson.title.replace(`Lesson ${oldNum} — `, `Lesson ${newNum} — `),
      oldHeading: `## Lesson ${oldNum} — `,
      newHeading: `## Lesson ${newNum} — `,
    });
  }

  // Old Part V (now Part VI): lessons 15-16 → 20-21
  const newLessonNums_p6new = [20, 21];
  const oldLessonNums_p5old = [15, 16];
  const readingLessons_p5old = p5old.lessons.filter((l) => l.type === "READING");
  for (let i = 0; i < readingLessons_p5old.length && i < 2; i++) {
    const lesson = readingLessons_p5old[i];
    const oldNum = oldLessonNums_p5old[i];
    const newNum = newLessonNums_p6new[i];
    lessonRenames.push({
      id: lesson.id,
      oldTitle: lesson.title,
      newTitle: lesson.title.replace(`Lesson ${oldNum} — `, `Lesson ${newNum} — `),
      oldHeading: `## Lesson ${oldNum} — `,
      newHeading: `## Lesson ${newNum} — `,
    });
  }

  // Apply lesson renames
  console.log("\nRenumbering lesson titles...");
  for (const r of lessonRenames) {
    const updatedContent = (
      await db.courseLesson.findUnique({ where: { id: r.id }, select: { content: true } })
    )?.content?.replace(r.oldHeading, r.newHeading) ?? "";

    await db.courseLesson.update({
      where: { id: r.id },
      data: { title: r.newTitle, content: updatedContent },
    });
    console.log(`  ✓ "${r.oldTitle}" → "${r.newTitle}"`);
  }

  // ── Verify final order ───────────────────────────────────────────────────
  const final = await db.courseChapter.findMany({
    where: { contentId: DEMONS_CONTENT_ID },
    orderBy: { order: "asc" },
    select: { order: true, title: true },
  });
  console.log("\nFinal chapter order:");
  for (const c of final) console.log(`  [${c.order}] ${c.title}`);
}

main().catch(console.error).finally(() => db.$disconnect());
