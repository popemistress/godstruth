import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const lessons = await db.courseLesson.findMany({
    where: { type: { not: "IMAGE" } },
    orderBy: { order: "asc" },
    select: { id: true, title: true, content: true },
    take: 10
  });
  for (const l of lessons) {
    const firstLines = l.content?.split('\n').slice(0, 5).join('\n') ?? '';
    console.log(`\n=== ${l.title}`);
    console.log(JSON.stringify(firstLines));
  }
  await db.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
