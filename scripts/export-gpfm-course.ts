import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const db = new PrismaClient();

async function main() {
  const course = await db.content.findUnique({
    where: { slug: "gods-universal-plan-for-creation" },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) {
    console.error("Gods Universal Plan course not found");
    process.exit(1);
  }

  let md = `# ${course.title}\n\n`;
  md += `${course.description}\n\n`;
  md += `---\n\n`;

  for (const chapter of course.chapters) {
    md += `# ${chapter.title}\n\n`;

    for (const lesson of chapter.lessons) {
      md += `## ${lesson.title}\n\n`;
      if (lesson.content) {
        md += `${lesson.content}\n\n`;
      }
      md += `---\n\n`;
    }
  }

  const outputPath = path.resolve(process.cwd(), "gpfm.md");
  fs.writeFileSync(outputPath, md, "utf-8");
  console.log(`✅ Exported course to ${outputPath}`);
  console.log(`   ${course.chapters.length} chapters, ${course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} lessons`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
