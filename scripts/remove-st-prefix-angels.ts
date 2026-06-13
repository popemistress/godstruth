import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const angels = await db.content.findFirstOrThrow({ where: { slug: "angels" }, select: { id: true } });
  const chapters = await db.courseChapter.findMany({ where: { contentId: angels.id }, select: { id: true } });
  const lessons = await db.courseLesson.findMany({
    where: { chapterId: { in: chapters.map((c) => c.id) } },
    select: { id: true, title: true, content: true },
  });

  let updated = 0;
  for (const lesson of lessons) {
    const originalTitle = lesson.title;
    const originalContent = lesson.content ?? "";

    // Remove "St. " prefix before any capitalized name
    const newTitle = originalTitle.replace(/\bSt\.\s+(?=[A-Z])/g, "");
    const newContent = originalContent.replace(/\bSt\.\s+(?=[A-Z])/g, "");

    if (newTitle !== originalTitle || newContent !== originalContent) {
      await db.courseLesson.update({
        where: { id: lesson.id },
        data: { title: newTitle, content: newContent },
      });
      console.log(`✓ ${originalTitle}`);
      updated++;
    }
  }

  console.log(`\nDone — updated ${updated} lessons.`);
}

main().catch(console.error).finally(() => db.$disconnect());
