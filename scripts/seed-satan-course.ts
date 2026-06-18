/**
 * seed-satan-course.ts
 *
 * Reads /home/pope/sites/godstruth/satan.md and seeds the database with the
 * "Satan: The Study of the Adversary" course.
 *
 * Run with:
 *   pnpm tsx --env-file=.env.local scripts/seed-satan-course.ts
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const db = new PrismaClient();

const SATAN_MD_PATH = resolve("/home/pope/sites/godstruth/satan.md");

interface ParsedLesson {
  type: "READING" | "SUPPLEMENT" | "IMAGE" | "QUIZ";
  title: string;
  order: number;
  content: string;
  duration: number;
  mediaUrl?: string;
}

interface ParsedChapter {
  title: string;
  order: number;
  lessons: ParsedLesson[];
}

function parseSatanMarkdown(md: string): { title: string; description: string; chapters: ParsedChapter[] } {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");

  let courseTitle = "Satan: The Study of the Adversary";
  let courseDescription =
    "A biblical, balanced, and practical study of Satan: his person, origin, strategies, defeat at the cross, and the believer's authority in Christ.";

  const chapters: ParsedChapter[] = [];
  let currentChapter: ParsedChapter | null = null;
  let currentLesson: ParsedLesson | null = null;
  let buffer: string[] = [];

  function flushLesson() {
    if (currentLesson && currentChapter) {
      currentLesson.content = buffer.join("\n").trim();
      currentChapter.lessons.push(currentLesson);
    }
    currentLesson = null;
    buffer = [];
  }

  function flushChapter() {
    flushLesson();
    if (currentChapter) {
      chapters.push(currentChapter);
    }
    currentChapter = null;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Course title
    const courseTitleMatch = line.match(/^#\s+(.+)$/);
    if (courseTitleMatch && !currentChapter) {
      courseTitle = courseTitleMatch[1].trim();
      continue;
    }

    // Chapter heading: ## Part I — Title
    const chapterMatch = line.match(/^##\s+Part\s+(\S+)\s*[—\-–]\s*(.+)$/);
    if (chapterMatch) {
      flushChapter();
      currentChapter = {
        title: chapterMatch[2].trim(),
        order: chapters.length + 1,
        lessons: [],
      };
      continue;
    }

    // Lesson/Supplement heading: ### Lesson N — Title or ### Supplement N — Title
    // Also supports ### Overview Chart — Title as an IMAGE lesson.
    const lessonMatch = line.match(/^###\s+(Lesson|Supplement)\s+(\d+)\s*[—\-–]\s*(.+)$/);
    const overviewMatch = line.match(/^###\s+(Overview\s+Chart)\s*[—\-–]\s*(.+)$/i);
    const welcomeMatch = line.match(/^###\s+(Course\s+Welcome)\s*[—\-–]\s*(.+)$/i);
    const appendixMatch = line.match(/^###\s+(Appendix)\s*[—\-–]\s*(.+)$/i);
    if (currentChapter && (lessonMatch || overviewMatch || welcomeMatch || appendixMatch)) {
      flushLesson();

      if (overviewMatch) {
        const title = overviewMatch[2].trim();
        currentLesson = {
          type: "IMAGE",
          title: `Overview Chart — ${title}`,
          order: currentChapter.lessons.length + 1,
          content: "",
          duration: 0,
          mediaUrl: "/satan.png",
        };
      } else if (welcomeMatch) {
        const title = welcomeMatch[2].trim();
        currentLesson = {
          type: "READING",
          title: `Course Welcome — ${title}`,
          order: currentChapter.lessons.length + 1,
          content: "",
          duration: 600,
        };
      } else if (appendixMatch) {
        const title = appendixMatch[2].trim();
        currentLesson = {
          type: "READING",
          title: `Appendix — ${title}`,
          order: currentChapter.lessons.length + 1,
          content: "",
          duration: 1800,
        };
      } else if (lessonMatch) {
        const kind = lessonMatch[1].trim();
        const title = lessonMatch[3].trim();

        if (kind === "Supplement") {
          currentLesson = {
            type: "SUPPLEMENT",
            title: `${kind} ${lessonMatch[2]} — ${title}`,
            order: currentChapter.lessons.length + 1,
            content: "",
            duration: 300,
          };
        } else {
          currentLesson = {
            type: "READING",
            title: `${kind} ${lessonMatch[2]} — ${title}`,
            order: currentChapter.lessons.length + 1,
            content: "",
            duration: 1800,
          };
        }
      }
      continue;
    }

    // Section divider — do not absorb into the previous lesson's content.
    if (/^##\s+Supplements\s*$/.test(line)) {
      continue;
    }

    // Horizontal rule — skip if it is just a visual divider
    if (/^---+\s*$/.test(line)) {
      continue;
    }

    buffer.push(line);
  }

  flushChapter();

  // Build a richer description from the first part's introduction if available.
  const firstChapter = chapters[0];
  if (firstChapter) {
    const introLesson = firstChapter.lessons.find((l) => l.title.includes("Satan Is Real"));
    if (introLesson && introLesson.content.length > 100) {
      const firstPara = introLesson.content.split("\n\n")[0] ?? "";
      if (firstPara.length > 80 && firstPara.length < 300) {
        courseDescription = firstPara.replace(/^##?\s+\d+\.\s*/, "").trim();
      }
    }
  }

  return { title: courseTitle, description: courseDescription, chapters };
}

async function main() {
  const md = readFileSync(SATAN_MD_PATH, "utf-8");
  const { title, description, chapters } = parseSatanMarkdown(md);

  console.log(`Parsed ${chapters.length} parts with ${chapters.reduce((a, c) => a + c.lessons.length, 0)} lessons`);

  // Clean up any existing satan course
  const existing = await db.content.findUnique({ where: { slug: "satan" } });
  if (existing) {
    console.log("Removing existing satan course...");
    await db.content.delete({ where: { id: existing.id } });
  }

  // Create the course Content row
  const course = await db.content.create({
    data: {
      type: "COURSE",
      title,
      slug: "satan",
      description,
      published: true,
      featured: true,
      premium: false,
      order: 400,
      thumbnail: "/satan-cover.png",
    },
  });

  console.log(`Created course: ${course.title} (${course.id})`);

  for (const chapter of chapters) {
    const createdChapter = await db.courseChapter.create({
      data: {
        contentId: course.id,
        title: chapter.title,
        order: chapter.order,
      },
    });

    console.log(`  Part ${chapter.order}: ${chapter.title}`);

    for (const lesson of chapter.lessons) {
      await db.courseLesson.create({
        data: {
          chapterId: createdChapter.id,
          title: lesson.title,
          type: lesson.type,
          order: lesson.order,
          duration: lesson.duration,
          content: lesson.content,
          published: true,
          mediaUrl: lesson.type === "IMAGE" ? lesson.mediaUrl ?? null : null,
        },
      });
    }

    console.log(`    Created ${chapter.lessons.length} lessons`);
  }

  console.log("\n✅ Satan course seeded successfully.");
  console.log(`Visit: /courses/${course.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
