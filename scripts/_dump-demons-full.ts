import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const course = await db.content.findUnique({
    where: { slug: "demons" },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, title: true, type: true, content: true }
          }
        }
      }
    }
  });
  for (const ch of course!.chapters) {
    for (const lesson of ch.lessons) {
      console.log(`\n${"=".repeat(70)}`);
      console.log(`ID: ${lesson.id}`);
      console.log(`TITLE: ${lesson.title}`);
      console.log(`TYPE: ${lesson.type}`);
      console.log(`CONTENT:`);
      console.log(lesson.content);
    }
  }
}
main().finally(() => db.$disconnect());
