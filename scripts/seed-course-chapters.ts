import { PrismaClient } from "@prisma/client";
import epubData from "./lessons-epub-data.json";

const db = new PrismaClient();

const COURSE_SLUG = "gods-universal-plan-for-creation";

// ── Part / Chapter mapping ────────────────────────────────────────────────────
const PARTS = [
  { title: "Part I — Where It All Began",         order: 1, lessonRange: [1,  8]  as const },
  { title: "Part II — How God Moved Through History", order: 2, lessonRange: [9,  18] as const },
  { title: "Part III — How God Is Moving Today",   order: 3, lessonRange: [19, 36] as const },
  { title: "Part IV — Where It Is All Headed",     order: 4, lessonRange: [37, 52] as const },
];

// Build lookup maps from the epub JSON
type LessonEntry     = { num: number; title: string; content: string };
type SupplementEntry = { num: number; title: string; forLessons: number[]; content: string };

const lessonMap = new Map<number, LessonEntry>(
  (epubData.lessons as LessonEntry[]).map((l) => [l.num, l])
);

// Map each first-lesson-of-pair → supplement
const suppByFirstLesson = new Map<number, SupplementEntry>(
  (epubData.supplements as SupplementEntry[]).map((s) => [s.forLessons[0], s])
);

// ── Record type (must match Prisma schema) ────────────────────────────────────
type LessonRecord = {
  title:     string;
  type:      string;
  duration:  number | null;
  order:     number;
  mediaUrl?: string | null;
  videoUrl:  string | null;
  audioUrl:  string | null;
  content:   string | null;
  published: boolean;
};

async function main() {
  const course = await db.content.findUnique({ where: { slug: COURSE_SLUG } });
  if (!course) {
    console.error(`❌ Course "${COURSE_SLUG}" not found. Run db:seed first.`);
    process.exit(1);
  }

  // Clear existing chapters (cascades to lessons)
  await db.courseChapter.deleteMany({ where: { contentId: course.id } });
  console.log("🗑️  Cleared existing chapters\n");

  let totalLessons = 0;

  for (const part of PARTS) {
    const [start, end] = part.lessonRange;
    const records: LessonRecord[] = [];

    // Part I gets the chart overview as lesson 0
    if (part.order === 1) {
      records.push({
        title:    "Course Overview: God's Universal Plan Chart",
        type:     "IMAGE",
        duration: null,
        order:    0,
        mediaUrl: "/gods-plan.jpeg",
        videoUrl: null,
        audioUrl: null,
        content:
          "Study this chart carefully before diving into the lessons. " +
          "It provides a visual overview of God's complete plan from eternity past to eternity future — the very blueprint of the Bible.",
        published: true,
      });
    }

    // Walk lesson range in pairs, inserting supplement after each pair
    let orderIdx = part.order === 1 ? 1 : 0; // 1-based after the chart

    for (let n = start; n <= end; n += 2) {
      // Lesson N
      const la = lessonMap.get(n);
      if (la) {
        records.push({
          title:    `Lesson ${n} — ${la.title}`,
          type:     "READING",
          duration: Math.round((la.content.length / 1000) * 60),
          order:    orderIdx++,
          mediaUrl: null,
          videoUrl: n === 1 ? "https://www.youtube.com/watch?v=AXwbXcyuMgs" : null,
          audioUrl: null,
          content:  la.content,
          published: true,
        });
      } else {
        console.warn(`  ⚠️  Lesson ${n} missing`);
      }

      // Lesson N+1 (if in range)
      const nb = n + 1;
      if (nb <= end) {
        const lb = lessonMap.get(nb);
        if (lb) {
          records.push({
            title:    `Lesson ${nb} — ${lb.title}`,
            type:     "READING",
            duration: Math.round((lb.content.length / 1000) * 60),
            order:    orderIdx++,
            mediaUrl: null,
            videoUrl: null,
            audioUrl: null,
            content:  lb.content,
            published: true,
          });
        } else {
          console.warn(`  ⚠️  Lesson ${nb} missing`);
        }
      }

      // Supplement for this pair (keyed by first lesson of pair)
      const supp = suppByFirstLesson.get(n);
      if (supp) {
        const pair = supp.forLessons;
        records.push({
          title:    `Supplement ${supp.num} — For Lessons ${pair[0]} & ${pair[1]}`,
          type:     "SUPPLEMENT",
          duration: Math.round((supp.content.length / 1000) * 60),
          order:    orderIdx++,
          mediaUrl: null,
          videoUrl: null,
          audioUrl: null,
          content:  supp.content,
          published: true,
        });
      }
    }

    await db.courseChapter.create({
      data: {
        contentId: course.id,
        title:     part.title,
        order:     part.order,
        lessons:   { create: records },
      },
    });

    totalLessons += records.length;
    console.log(`  ✅ ${part.title} (${records.length} items — lessons + supplements)`);
  }

  console.log(
    `\n🎉 Seeded ${PARTS.length} parts, ${totalLessons} total items for "${course.title}"`
  );
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => db.$disconnect());
