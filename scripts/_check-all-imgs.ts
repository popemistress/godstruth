import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const lessons = await db.courseLesson.findMany({
    where: { content: { contains: "![" } },
    select: { id: true, title: true, content: true },
    orderBy: { order: "asc" }
  });
  console.log(`Lessons with images: ${lessons.length}`);
  for (const l of lessons) {
    const captions = (l.content!.match(/!\[([^\]]+)\]/g) || []).map(m => m.slice(2,-1));
    console.log(`\n${l.title} [${l.id}]`);
    captions.forEach(c => console.log(`  - ${c.slice(0, 80)}`));
  }
  await db.$disconnect();
}
main();
