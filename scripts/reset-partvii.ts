import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Delete the old Part VII chapter and all its lessons
  const old = await db.courseChapter.findFirst({
    where: { title: { contains: "Part VII" }, contentId: "cmq696d950000jz7b64karn3t" },
    include: { lessons: true },
  });

  if (old) {
    console.log(`Deleting old Part VII: ${old.lessons.length} lessons...`);
    await db.courseLesson.deleteMany({ where: { chapterId: old.id } });
    await db.courseChapter.delete({ where: { id: old.id } });
    console.log("  ✓ deleted");
  } else {
    console.log("No old Part VII found — skipping delete");
  }

  // Create fresh chapter at order 6
  const chapter = await db.courseChapter.create({
    data: {
      contentId: "cmq696d950000jz7b64karn3t",
      title: "Part VII — How the Enemy Gains Access: Open Doors and Spiritual Attacks",
      order: 6,
    },
  });

  console.log(`\nNew chapter created: ${chapter.id}`);
  console.log("Ready for lesson insertion.");

  // Write chapter ID to a temp file for the batch scripts
  const fs = await import("fs");
  fs.writeFileSync("/tmp/partvii-chapter-id.txt", chapter.id);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
