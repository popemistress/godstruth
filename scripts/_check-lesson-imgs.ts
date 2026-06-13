import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const lessons = await db.courseLesson.findMany({
    where: { content: { contains: "![" } },
    select: { title: true, content: true }
  });
  console.log("Lessons with images:", lessons.length);
  for (const l of lessons) {
    const cnt = (l.content!.match(/!\[/g) || []).length;
    console.log(` - ${l.title}: ${cnt} images`);
  }
  await db.$disconnect();
}
main();
