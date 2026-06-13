import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const course = await db.content.findFirst({ where: { slug: "demons" } });
  console.log(`Demons course contentId: ${course?.id}\n`);

  const chapters = await db.courseChapter.findMany({
    where: { contentId: course!.id },
    orderBy: { order: "asc" },
    select: { id: true, order: true, title: true, contentId: true, _count: { select: { lessons: true } } },
  });
  console.log(`Chapters linked to this contentId: ${chapters.length}`);
  for (const ch of chapters) {
    console.log(`  [${ch.order}] ${ch.title} — ${ch._count.lessons} lessons`);
  }

  // Also check Part VI and VII specifically
  const p6 = await db.courseChapter.findUnique({ where: { id: "cmq6ktev3000114g6efnv7r93" }, select: { contentId: true, title: true } });
  const p7 = await db.courseChapter.findUnique({ where: { id: "cmq73bpfw00015962u9a9hfor" }, select: { contentId: true, title: true } });
  console.log(`\nPart VI contentId: ${p6?.contentId} | expected: ${course?.id} | match: ${p6?.contentId === course?.id}`);
  console.log(`Part VII contentId: ${p7?.contentId} | expected: ${course?.id} | match: ${p7?.contentId === course?.id}`);
}

main().catch(console.error).finally(() => db.$disconnect());
