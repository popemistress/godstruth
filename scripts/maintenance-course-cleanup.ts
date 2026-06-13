import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const COURSE_FIXES = [
  {
    slug: "gods-universal-plan-for-creation",
    order: 300,
    thumbnail: "/gods-plan.png",
  },
  {
    slug: "angels",
    order: 200,
    thumbnail: "/angels-cover.jpg",
  },
  {
    slug: "demons",
    order: 100,
    thumbnail: "/demons-cover.png",
  },
] as const;

const ANGELS_IMAGES: Record<string, string> = {
  L1: "/angels-lessons/l1-what-are-angels.png",
  L2: "/angels-lessons/l2-angels-know.png",
  L3: "/angels-lessons/l3-creation-of-angels.png",
  L4: "/angels-lessons/l4-angels-scripture.png",
  L5: "/angels-lessons/l5-seraphim.png",
  L6: "/angels-lessons/l6-cherubim.png",
  L7: "/angels-lessons/l7-thrones.png",
  L8: "/angels-lessons/l8-living-creatures.png",
  L9: "/angels-lessons/l9-dominations-virtues.png",
  L10: "/angels-lessons/l10-powers-principalities.png",
  L11: "/angels-lessons/l11-archangels.png",
  L12: "/angels-lessons/l12-saint-michael.png",
  L13: "/angels-lessons/l13-saint-gabriel.png",
  L14: "/angels-lessons/l14-saint-raphael.png",
  L15: "/angels-lessons/l15-guardian-angels.png",
  L16: "/angels-lessons/l16-devotion-angels.png",
  L17: "/angels-lessons/l17-angels-old-testament.png",
  L18: "/angels-lessons/l18-angels-new-testament.png",
  S1: "/angels-lessons/s1-nature-knowledge.png",
  S2: "/angels-lessons/s2-creation-purpose.png",
  S3: "/angels-lessons/s3-seraphim-cherubim.png",
  S4: "/angels-lessons/s4-thrones-living-creatures.png",
  S5: "/angels-lessons/s5-second-hierarchy.png",
  S6: "/angels-lessons/s6-cosmic-governance.png",
  S7: "/angels-lessons/s7-archangels-michael.png",
  S8: "/angels-lessons/s8-gabriel-raphael.png",
  S9: "/angels-lessons/s9-guardian-devotion.png",
  S10: "/angels-lessons/s10-scripture-worship.png",
  S11: "/angels-lessons/s11-final-synthesis.png",
};

const DEMONS_IMAGE_RULES: Array<[RegExp, string]> = [
  [/What Are Demons/i, "/demons-lessons/l1-what-are-demons.png"],
  [/Lucifer/i, "/demons-lessons/l2-lucifers-fall.png"],
  [/Satan: The Great Deceiver/i, "/demons-lessons/l3-satan-deceiver.png"],
  [/Fallen Angels/i, "/demons-lessons/l4-fallen-ranks.png"],
  [/Possession and Oppression/i, "/demons-lessons/l5-possession-oppression.png"],
  [/Infirmity and Bondage/i, "/demons-lessons/l6-spirits-bondage.png"],
  [/Doctrines of Devils/i, "/demons-lessons/l7-doctrines-devils.png"],
  [/Divination, Witchcraft/i, "/demons-lessons/l8-divination-occult.png"],
  [/Seducing Spirits/i, "/demons-lessons/l9-seducing-spirits.png"],
  [/Nations and Culture/i, "/demons-lessons/l10-nations-culture.png"],
  [/Believer's Authority/i, "/demons-lessons/l11-authority-christ.png"],
  [/Armor of God and the Name of Jesus/i, "/demons-lessons/l12-armor-god.png"],
  [/Deliverance and Exorcism/i, "/demons-lessons/l13-deliverance-exorcism.png"],
  [/Taking Away the Devil's Armor/i, "/demons-lessons/l14-devils-armor.png"],
  [/Final Battle/i, "/demons-lessons/l15-final-battle.png"],
  [/Daily Warfare/i, "/demons-lessons/l16-daily-warfare.png"],
  [/Supplement 1/i, "/demons-lessons/s1-nature-origin.png"],
  [/Supplement 2/i, "/demons-lessons/s2-satan-host.png"],
  [/Supplement 3/i, "/demons-lessons/s3-deliverance-cases.png"],
  [/Supplement 4/i, "/demons-lessons/s4-deception-dialogue.png"],
  [/Supplement 5/i, "/demons-lessons/s5-church-nations.png"],
  [/Supplement 6/i, "/demons-lessons/s6-authority-armor.png"],
  [/Supplement 7/i, "/demons-lessons/s7-strongholds.png"],
  [/Supplement 8/i, "/demons-lessons/s8-final-synthesis.png"],
  [/Why I Wrote/i, "/demons-cover.png"],
];

function imageForLesson(courseSlug: string, title: string): string | null {
  if (courseSlug === "gods-universal-plan-for-creation") return "/gods-plan.png";

  if (courseSlug === "angels") {
    const lesson = title.match(/^Lesson\s+(\d+)/i);
    if (lesson) return ANGELS_IMAGES[`L${lesson[1]}`] ?? "/angels-cover.jpg";

    const supplement = title.match(/^Supplement\s+(\d+)/i);
    if (supplement) return ANGELS_IMAGES[`S${supplement[1]}`] ?? "/angels-cover.jpg";

    return "/angels-cover.jpg";
  }

  if (courseSlug === "demons") {
    return DEMONS_IMAGE_RULES.find(([pattern]) => pattern.test(title))?.[1] ?? "/demons-cover.png";
  }

  return null;
}

function withTopImage(content: string, title: string, imagePath: string): string {
  if (content.includes("![")) return content;
  return `![${title}](${imagePath})\n\n${content.trim()}`;
}

async function main() {
  const deleted = await db.content.deleteMany({
    where: {
      type: "COURSE",
      OR: [
        { slug: "understanding-the-gospels" },
        { title: "Understanding the Gospels" },
      ],
    },
  });

  console.log(`Deleted Understanding the Gospels rows: ${deleted.count}`);

  for (const course of COURSE_FIXES) {
    await db.content.updateMany({
      where: { slug: course.slug, type: "COURSE" },
      data: {
        order: course.order,
        thumbnail: course.thumbnail,
        published: true,
        featured: true,
        premium: false,
      },
    });
  }

  const lessons = await db.courseLesson.findMany({
    where: {
      published: true,
      content: { not: null },
      type: { in: ["READING", "SUPPLEMENT"] },
      chapter: {
        content: {
          slug: { in: COURSE_FIXES.map((course) => course.slug) },
          type: "COURSE",
        },
      },
    },
    include: {
      chapter: {
        select: {
          content: { select: { slug: true } },
        },
      },
    },
  });

  let imagesInserted = 0;

  for (const lesson of lessons) {
    const content = lesson.content ?? "";
    if (content.includes("![")) continue;

    const imagePath = imageForLesson(lesson.chapter.content.slug, lesson.title);
    if (!imagePath) continue;

    await db.courseLesson.update({
      where: { id: lesson.id },
      data: { content: withTopImage(content, lesson.title, imagePath) },
    });
    imagesInserted++;
  }

  const courses = await db.content.findMany({
    where: { type: "COURSE", published: true },
    select: { title: true, slug: true, order: true, thumbnail: true },
    orderBy: [{ order: "desc" }, { featured: "desc" }, { createdAt: "desc" }],
  });

  console.log(`Inserted missing top lesson images: ${imagesInserted}`);
  console.table(courses);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
