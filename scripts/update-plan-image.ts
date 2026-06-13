import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  const course = await db.content.findUnique({
    where: { slug: "gods-universal-plan-for-creation" },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!course) {
    console.error("Course not found");
    process.exit(1);
  }

  const firstLesson = course.chapters[0]?.lessons[0];
  if (!firstLesson) {
    console.error("No first lesson found");
    process.exit(1);
  }

  console.log("Current first lesson:", firstLesson.title, firstLesson.mediaUrl);

  const updated = await db.courseLesson.update({
    where: { id: firstLesson.id },
    data: { mediaUrl: "/gods-plan.png" },
  });

  console.log("✅ Updated mediaUrl to:", updated.mediaUrl);
  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
