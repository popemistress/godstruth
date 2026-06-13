import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const courses = await db.content.findMany({
    where: { slug: { in: ["angels", "demons"] } },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
            select: { id: true, title: true, content: true, type: true, order: true }
          }
        }
      }
    }
  });
  for (const course of courses) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`COURSE: ${course.title}`);
    for (const ch of course.chapters) {
      console.log(`\nCHAPTER: ${ch.title}`);
      for (const lesson of ch.lessons) {
        console.log(`\n--- ${lesson.title} (${lesson.type}) ---`);
        console.log(lesson.content?.slice(0, 600) ?? "(no content)");
        console.log("...");
      }
    }
  }
}
main().finally(() => db.$disconnect());
