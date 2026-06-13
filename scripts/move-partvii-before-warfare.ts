import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Current:  IV(Watchers,4) → V(Warfare,5) → VI(Victory,6) → VII(OpenDoors,7)
// Target:   IV(Watchers,4) → V(OpenDoors,5) → VI(Warfare,6) → VII(Victory,7)

const CHAPTERS = [
  { id: "cmq76xgul000jhks877ughys4", order: 5, title: "Part V — How the Enemy Gains Access: Open Doors and Spiritual Attacks" },
  { id: "cmq76cgb9001110b8mkvodphm", order: 6, title: "Part VI — Spiritual Warfare" },
  { id: "cmq76cgbj001f10b883ni3dl8", order: 7, title: "Part VII — Living in Victory" },
];

async function main() {
  // Pass 1: temp orders
  for (let i = 0; i < CHAPTERS.length; i++) {
    await db.courseChapter.update({ where: { id: CHAPTERS[i].id }, data: { order: 200 + i } });
  }
  // Pass 2: final
  for (const c of CHAPTERS) {
    await db.courseChapter.update({ where: { id: c.id }, data: { order: c.order, title: c.title } });
    console.log(`✓ [${c.order}] ${c.title}`);
  }
}

main().catch(console.error).finally(() => db.$disconnect());
