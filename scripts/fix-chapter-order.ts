/**
 * Fixes the Demons course chapter ordering using explicit chapter IDs.
 * Target order:
 *   1 = Part I   (cmq76cga9000110b8juoxpkya) — no change
 *   2 = Part II  (cmq76cgaj000910b8olia8etv) — no change
 *   3 = Part III (cmq76cgaw000n10b8wrzhfrh1) — no change
 *   4 = Part IV  (cmq76xgtn0001hks8s3kqs5yq) — Watchers/Strongmen (was Part VI)
 *   5 = Part V   (cmq76cgb9001110b8mkvodphm) — Spiritual Warfare (was Part IV)
 *   6 = Part VI  (cmq76cgbj001f10b883ni3dl8) — Living in Victory (was Part V)
 *   7 = Part VII (cmq76xgul000jhks877ughys4) — Open Doors
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const FINAL: { id: string; order: number; title: string }[] = [
  { id: "cmq76cga9000110b8juoxpkya", order: 1, title: "Part I — The Origin and Nature of Evil Spirits" },
  { id: "cmq76cgaj000910b8olia8etv", order: 2, title: "Part II — Satan and the Kingdom of Darkness" },
  { id: "cmq76cgaw000n10b8wrzhfrh1", order: 3, title: "Part III — Deception and Doctrines of Devils" },
  { id: "cmq76xgtn0001hks8s3kqs5yq", order: 4, title: "Part IV — The Unseen Architecture: Watchers, Strongmen, and the Global Battlefield" },
  { id: "cmq76cgb9001110b8mkvodphm", order: 5, title: "Part V — Spiritual Warfare" },
  { id: "cmq76cgbj001f10b883ni3dl8", order: 6, title: "Part VI — Living in Victory" },
  { id: "cmq76xgul000jhks877ughys4", order: 7, title: "Part VII — How the Enemy Gains Access: Open Doors and Spiritual Attacks" },
];

async function main() {
  // Print current state
  const current = await db.courseChapter.findMany({
    where: { id: { in: FINAL.map((f) => f.id) } },
    select: { id: true, order: true, title: true },
    orderBy: { order: "asc" },
  });
  console.log("Current state:");
  for (const c of current) console.log(`  [${c.order}] ${c.title.slice(0, 70)} (${c.id})`);

  // Pass 1: set all to high temp values
  console.log("\nPass 1: temp orders...");
  for (let i = 0; i < FINAL.length; i++) {
    await db.courseChapter.update({ where: { id: FINAL[i].id }, data: { order: 200 + i } });
  }

  // Pass 2: set correct order + title
  console.log("Pass 2: final orders + titles...");
  for (const f of FINAL) {
    await db.courseChapter.update({ where: { id: f.id }, data: { order: f.order, title: f.title } });
    console.log(`  ✓ [${f.order}] ${f.title}`);
  }

  // Now fix lesson numbering in the moved chapters
  // Watchers chapter (cmq76xgtn0001hks8s3kqs5yq): lessons 17-21 → 11-15
  // Spiritual Warfare chapter (cmq76cgb9001110b8mkvodphm): lessons 11-14 → 16-19
  // Living in Victory chapter (cmq76cgbj001f10b883ni3dl8): lessons 15-16 → 20-21

  const renumbers = [
    // [chapter id, old num, new num]
    // Watchers → Part IV: 17→11, 18→12, 19→13, 20→14, 21→15
    { chapterId: "cmq76xgtn0001hks8s3kqs5yq", maps: [[17,11],[18,12],[19,13],[20,14],[21,15]] },
    // Spiritual Warfare → Part V: 11→16, 12→17, 13→18, 14→19
    { chapterId: "cmq76cgb9001110b8mkvodphm", maps: [[11,16],[12,17],[13,18],[14,19]] },
    // Living in Victory → Part VI: 15→20, 16→21
    { chapterId: "cmq76cgbj001f10b883ni3dl8", maps: [[15,20],[16,21]] },
  ];

  console.log("\nRenumbering lessons...");
  for (const { chapterId, maps } of renumbers) {
    const lessons = await db.courseLesson.findMany({
      where: { chapterId, type: "READING" },
      select: { id: true, title: true, content: true },
    });

    for (const [oldNum, newNum] of maps) {
      const lesson = lessons.find((l) => l.title.includes(`Lesson ${oldNum} — `));
      if (!lesson) { console.log(`  ⚠ Lesson ${oldNum} not found in chapter ${chapterId}`); continue; }

      const newTitle = lesson.title.replace(`Lesson ${oldNum} — `, `Lesson ${newNum} — `);
      const newContent = (lesson.content ?? "").replace(
        new RegExp(`## Lesson ${oldNum} — `, "g"),
        `## Lesson ${newNum} — `
      );

      await db.courseLesson.update({
        where: { id: lesson.id },
        data: { title: newTitle, content: newContent },
      });
      console.log(`  ✓ Lesson ${oldNum} → Lesson ${newNum}: ${newTitle.slice(0, 60)}`);
    }
  }

  // Final verification
  const final = await db.courseChapter.findMany({
    where: { id: { in: FINAL.map((f) => f.id) } },
    select: { order: true, title: true },
    orderBy: { order: "asc" },
  });
  console.log("\nFinal chapter order:");
  for (const c of final) console.log(`  [${c.order}] ${c.title}`);
}

main().catch(console.error).finally(() => db.$disconnect());
