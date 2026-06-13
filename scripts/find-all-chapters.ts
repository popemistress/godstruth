import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  // All content of type COURSE
  const courses = await db.content.findMany({
    where: { type: "COURSE" },
    select: { id: true, slug: true, title: true, published: true },
  });
  console.log("All COURSE content records:");
  for (const c of courses) console.log(`  ${c.slug} | ${c.id} | published: ${c.published} | ${c.title}`);

  // All chapters total
  const allChapters = await db.courseChapter.findMany({
    select: { id: true, order: true, title: true, contentId: true, _count: { select: { lessons: true } } },
  });
  console.log(`\nTotal chapters in DB: ${allChapters.length}`);

  // Show any chapters whose contentId doesn't match a known course
  const courseIds = new Set(courses.map(c => c.id));
  const orphans = allChapters.filter(ch => !ch.contentId || !courseIds.has(ch.contentId));
  console.log(`Orphan chapters (no valid contentId): ${orphans.length}`);
  for (const ch of orphans) {
    console.log(`  [${ch.order}] ${ch.title.slice(0,60)} | contentId: ${ch.contentId ?? "NULL"} | lessons: ${ch._count.lessons}`);
    console.log(`       id: ${ch.id}`);
  }

  // Check the specific IDs from our work
  const checkIds = [
    "cmq696d960002jz7bcjbkhn1c",
    "cmq6ktev3000114g6efnv7r93",
    "cmq73bpfw00015962u9a9hfor",
  ];
  console.log("\nChecking specific chapter IDs:");
  for (const id of checkIds) {
    const ch = await db.courseChapter.findUnique({ where: { id }, select: { id: true, title: true, contentId: true, _count: { select: { lessons: true } } } });
    console.log(`  ${id}: ${ch ? ch.title + " | contentId: " + ch.contentId + " | lessons: " + ch._count.lessons : "NOT FOUND"}`);
  }
}

main().catch(console.error).finally(() => db.$disconnect());
