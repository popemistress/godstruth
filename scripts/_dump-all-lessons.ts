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
            select: { id: true, title: true, type: true, order: true, content: true, coverUrl: true }
          }
        }
      }
    }
  });
  for (const course of courses) {
    console.log(`\nCOURSE: ${course.slug} — ${course.title}`);
    for (const ch of course.chapters) {
      console.log(`  CHAPTER: ${ch.title} (id: ${ch.id})`);
      for (const lesson of ch.lessons) {
        console.log(`    LESSON id=${lesson.id} order=${lesson.order} type=${lesson.type} title="${lesson.title}"`);
        console.log(`      coverUrl=${lesson.coverUrl ?? "null"}`);
        console.log(`      contentLength=${lesson.content?.length ?? 0}`);
        console.log(`      contentPreview=${lesson.content?.slice(0,80).replace(/\n/g,'↵') ?? "null"}`);
      }
    }
  }
}
main().finally(() => db.$disconnect());
