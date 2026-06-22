/**
 * seed-jesus-course.ts
 *
 * Reads /home/pope/sites/godstruth/jesus.md and seeds the database with the
 * "Jesus: The Study of the Savior" course.
 *
 * This script creates:
 *   - Content row for the course
 *   - CourseChapter rows for each part
 *   - CourseLesson rows (READING, SUPPLEMENT, IMAGE, ASSIGNMENT)
 *   - Quiz + QuizQuestion rows for each part wave quiz
 *   - CourseTrack + TrackDay rows for a 60-day guided path
 *   - MemoryCollection + MemoryVerse rows for Scripture memorization
 *   - ReadingPlan + ReadingPlanDay rows for a 30-day Gospel reading plan
 *   - TopicStudy rows for major Jesus themes
 *
 * Run with:
 *   pnpm tsx --env-file=.env.local scripts/seed-jesus-course.ts
 */

import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const db = new PrismaClient();

const JESUS_MD_PATH = resolve(__dirname, "../jesus.md");

interface ParsedLesson {
  type: "READING" | "SUPPLEMENT" | "IMAGE" | "QUIZ" | "ASSIGNMENT";
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

interface LessonRef {
  chapterOrder: number;
  lessonOrder: number;
  lessonId: string;
  title: string;
}

function parseJesusMarkdown(md: string): { title: string; description: string; chapters: ParsedChapter[] } {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");

  let courseTitle = "Jesus: The Study of the Savior";
  let courseDescription =
    "A comprehensive, biblical, and transformational study of Jesus of Nazareth—who he was, what he did, why it matters, and how to follow him.";

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

    // Lesson/Supplement/Assignment/Capstone/Appendix heading
    const lessonMatch = line.match(/^###\s+(Lesson|Supplement|Assignment)\s+(\d+)\s*[—\-–]\s*(.+)$/);
    const overviewMatch = line.match(/^###\s+(Overview\s+Chart)\s*[—\-–]\s*(.+)$/i);
    const welcomeMatch = line.match(/^###\s+(Course\s+Welcome)\s*[—\-–]\s*(.+)$/i);
    const capstoneMatch = line.match(/^###\s+(Capstone)\s*[—\-–]\s*(.+)$/i);
    const appendixMatch = line.match(/^###\s+(Appendix)\s*[—\-–]\s*(.+)$/i);
    if (currentChapter && (lessonMatch || overviewMatch || welcomeMatch || capstoneMatch || appendixMatch)) {
      flushLesson();

      if (overviewMatch) {
        const title = overviewMatch[2].trim();
        currentLesson = {
          type: "IMAGE",
          title: `Overview Chart — ${title}`,
          order: currentChapter.lessons.length + 1,
          content: "",
          duration: 0,
          mediaUrl: "/jesus-over.png",
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
      } else if (capstoneMatch) {
        const title = capstoneMatch[2].trim();
        currentLesson = {
          type: "ASSIGNMENT",
          title: `Capstone — ${title}`,
          order: currentChapter.lessons.length + 1,
          content: "",
          duration: 3600,
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
        } else if (kind === "Assignment") {
          currentLesson = {
            type: "ASSIGNMENT",
            title: `${kind} ${lessonMatch[2]} — ${title}`,
            order: currentChapter.lessons.length + 1,
            content: "",
            duration: 900,
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

    // Section divider
    if (/^##\s+Supplements\s*$/.test(line)) {
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      continue;
    }

    buffer.push(line);
  }

  flushChapter();

  return { title: courseTitle, description: courseDescription, chapters };
}

const moduleQuizzes = [
  {
    title: "Wave 1 Quiz: The Person of Jesus",
    questions: [
      { question: "According to Matthew 16:15, what question did Jesus ask His disciples?", type: "MULTIPLE_CHOICE", options: ["What do you want?", "Who do people say I am?", "Who do you say I am?", "Why do you follow me?"], correctAnswer: "2" },
      { question: "Jesus is fully God and fully human.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "The title 'Son of Man' points to Jesus' humanity and His role as the figure in Daniel 7.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Which title means 'anointed one' and identifies Jesus as Israel's promised king?", type: "MULTIPLE_CHOICE", options: ["Lord", "Son of God", "Messiah", "Prophet"], correctAnswer: "2" },
    ],
  },
  {
    title: "Wave 2 Quiz: The World of Jesus",
    questions: [
      { question: "Jesus was a first-century Jew.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Which person prepared the way for Jesus' ministry?", type: "MULTIPLE_CHOICE", options: ["Herod", "John the Baptist", "Caesar Augustus", "Paul"], correctAnswer: "1" },
      { question: "The Old Testament is unrelated to understanding Jesus.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "The Temple in Jerusalem was central to first-century Jewish worship.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
  {
    title: "Wave 3 Quiz: The Mission of Jesus",
    questions: [
      { question: "Jesus' central message was the kingdom of God.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "What response did Jesus demand from those who heard Him?", type: "MULTIPLE_CHOICE", options: ["Wealth", "Repentance and faith", "Political revolution", "Silent meditation"], correctAnswer: "1" },
      { question: "Jesus came only for the religious elite.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "The new covenant Jesus instituted involves the forgiveness of sins.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
  {
    title: "Wave 4 Quiz: The Words of Jesus",
    questions: [
      { question: "The Sermon on the Mount is found in which Gospel?", type: "MULTIPLE_CHOICE", options: ["Mark", "Luke", "John", "Matthew"], correctAnswer: "3" },
      { question: "Jesus taught His disciples to pray in the Lord's Prayer.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Parables are simple stories with no deeper meaning.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "Which commandment did Jesus call the greatest?", type: "MULTIPLE_CHOICE", options: ["Do not steal", "Love the Lord your God", "Keep the Sabbath", "Honor your parents"], correctAnswer: "1" },
    ],
  },
  {
    title: "Wave 5 Quiz: The Works of Jesus",
    questions: [
      { question: "Jesus' miracles were signs of the kingdom of God.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Which Gospel contains the seven 'I am' sayings?", type: "MULTIPLE_CHOICE", options: ["Matthew", "Mark", "Luke", "John"], correctAnswer: "3" },
      { question: "Jesus cast out demons, demonstrating authority over evil spirits.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Jesus' miracles were only symbolic and never happened historically.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
    ],
  },
  {
    title: "Wave 6 Quiz: The Cross and Resurrection",
    questions: [
      { question: "Jesus died as a substitutionary sacrifice for sinners.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Which event is the foundation of Christian hope?", type: "MULTIPLE_CHOICE", options: ["Jesus' birth", "Jesus' baptism", "Jesus' resurrection", "Jesus' ascension"], correctAnswer: "2" },
      { question: "The empty tomb and resurrection appearances are central to the faith.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "The ascension means Jesus is no longer involved with His people.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
    ],
  },
  {
    title: "Wave 7 Quiz: The Jesus Life",
    questions: [
      { question: "To be 'born again' means to receive new spiritual life from Jesus.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "The Jesus Creed is to love God and love your neighbor as yourself.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "The Great Commission calls disciples to make disciples of all nations.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Following Jesus has no practical effect on daily life.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
    ],
  },
];

const memoryVerses = [
  { reference: "John 1:14", text: "And the Word became flesh and dwelt among us, and we have seen his glory, glory as of the only Son from the Father, full of grace and truth.", topic: "Incarnation", translation: "ESV" },
  { reference: "John 3:16", text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life.", topic: "Love", translation: "ESV" },
  { reference: "John 14:6", text: "Jesus said to him, 'I am the way, and the truth, and the life. No one comes to the Father except through me.'", topic: "Exclusivity", translation: "ESV" },
  { reference: "Matthew 16:15-16", text: "He said to them, 'But who do you say that I am?' Simon Peter replied, 'You are the Christ, the Son of the living God.'", topic: "Identity", translation: "ESV" },
  { reference: "Mark 1:15", text: "The time is fulfilled, and the kingdom of God is at hand; repent and believe in the gospel.", topic: "Kingdom", translation: "ESV" },
  { reference: "Matthew 11:28", text: "Come to me, all who labor and are heavy laden, and I will give you rest.", topic: "Invitation", translation: "ESV" },
  { reference: "Matthew 6:33", text: "But seek first the kingdom of God and his righteousness, and all these things will be added to you.", topic: "Priority", translation: "ESV" },
  { reference: "Mark 10:45", text: "For even the Son of Man came not to be served but to serve, and to give his life as a ransom for many.", topic: "Service", translation: "ESV" },
  { reference: "Matthew 22:37-39", text: "You shall love the Lord your God with all your heart and with all your soul and with all your mind. ... You shall love your neighbor as yourself.", topic: "Commandment", translation: "ESV" },
  { reference: "John 10:30", text: "I and the Father are one.", topic: "Unity", translation: "ESV" },
  { reference: "John 11:25", text: "I am the resurrection and the life. Whoever believes in me, though he die, yet shall he live.", topic: "Resurrection", translation: "ESV" },
  { reference: "Romans 5:8", text: "God shows his love for us in that while we were still sinners, Christ died for us.", topic: "Atonement", translation: "ESV" },
  { reference: "1 Corinthians 15:3-4", text: "Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day.", topic: "Gospel", translation: "ESV" },
  { reference: "Ephesians 2:8-9", text: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.", topic: "Grace", translation: "ESV" },
  { reference: "Philippians 2:5-7", text: "Have this mind among yourselves, which is yours in Christ Jesus, who, though he was in the form of God, did not count equality with God a thing to be grasped, but emptied himself, by taking the form of a servant.", topic: "Humility", translation: "ESV" },
  { reference: "Colossians 1:15-16", text: "He is the image of the invisible God, the firstborn of all creation. For by him all things were created.", topic: "Creator", translation: "ESV" },
  { reference: "Hebrews 4:15", text: "For we do not have a high priest who is unable to sympathize with our weaknesses, but one who in every respect has been tempted as we are, yet without sin.", topic: "Sympathy", translation: "ESV" },
  { reference: "Hebrews 12:2", text: "Looking to Jesus, the founder and perfecter of our faith, who for the joy that was set before him endured the cross, despising the shame.", topic: "Endurance", translation: "ESV" },
  { reference: "1 John 4:9", text: "In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him.", topic: "Love", translation: "ESV" },
  { reference: "Revelation 22:20", text: "He who testifies to these things says, 'Surely I am coming soon.' Amen. Come, Lord Jesus!", topic: "Return", translation: "ESV" },
];

const gospelReadingPlanDays = [
  { day: 1, passages: ["Mark 1:1-20"] },
  { day: 2, passages: ["Mark 1:21-45"] },
  { day: 3, passages: ["Mark 2:1-28"] },
  { day: 4, passages: ["Mark 3:1-35"] },
  { day: 5, passages: ["Mark 4:1-41"] },
  { day: 6, passages: ["Mark 5:1-43"] },
  { day: 7, passages: ["Mark 6:1-56"] },
  { day: 8, passages: ["Mark 7:1-37"] },
  { day: 9, passages: ["Mark 8:1-38"] },
  { day: 10, passages: ["Mark 9:1-50"] },
  { day: 11, passages: ["Mark 10:1-52"] },
  { day: 12, passages: ["Mark 11:1-33"] },
  { day: 13, passages: ["Mark 12:1-44"] },
  { day: 14, passages: ["Mark 13:1-37"] },
  { day: 15, passages: ["Mark 14:1-72"] },
  { day: 16, passages: ["Mark 15:1-47", "Mark 16:1-20"] },
  { day: 17, passages: ["Matthew 1:1-25", "Matthew 2:1-23"] },
  { day: 18, passages: ["Matthew 5:1-48"] },
  { day: 19, passages: ["Matthew 6:1-34"] },
  { day: 20, passages: ["Matthew 7:1-29"] },
  { day: 21, passages: ["Luke 1:1-56"] },
  { day: 22, passages: ["Luke 2:1-52"] },
  { day: 23, passages: ["Luke 4:1-44"] },
  { day: 24, passages: ["Luke 7:1-50"] },
  { day: 25, passages: ["Luke 10:1-42"] },
  { day: 26, passages: ["Luke 15:1-32"] },
  { day: 27, passages: ["John 1:1-51"] },
  { day: 28, passages: ["John 3:1-36"] },
  { day: 29, passages: ["John 6:1-71"] },
  { day: 30, passages: ["John 20:1-31", "John 21:1-25"] },
];

async function main() {
  const md = readFileSync(JESUS_MD_PATH, "utf-8");
  const { title, description, chapters } = parseJesusMarkdown(md);

  const totalLessons = chapters.reduce((a, c) => a + c.lessons.length, 0);
  console.log(`Parsed ${chapters.length} parts with ${totalLessons} lessons`);

  // Clean up any existing jesus course
  const existing = await db.content.findUnique({ where: { slug: "jesus" } });
  if (existing) {
    console.log("Removing existing jesus course...");
    await db.content.delete({ where: { id: existing.id } });
  }

  // Determine order: place after existing courses if possible
  const lastCourse = await db.content.findFirst({
    where: { type: "COURSE" },
    orderBy: { order: "desc" },
  });
  const courseOrder = (lastCourse?.order ?? 0) + 100;

  const course = await db.content.create({
    data: {
      type: "COURSE",
      title,
      slug: "jesus",
      description,
      published: true,
      featured: true,
      premium: false,
      order: courseOrder,
      thumbnail: "/jesus-cover.png",
    },
  });

  console.log(`Created course: ${course.title} (${course.id}) order=${courseOrder}`);

  const lessonRefs: LessonRef[] = [];

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
      const createdLesson = await db.courseLesson.create({
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

      lessonRefs.push({
        chapterOrder: chapter.order,
        lessonOrder: lesson.order,
        lessonId: createdLesson.id,
        title: lesson.title,
      });

      // If this is the last lesson of a part, attach a wave quiz
      const quiz = moduleQuizzes[chapter.order - 1];
      if (quiz && lesson.order === chapter.lessons.length) {
        await db.quiz.create({
          data: {
            title: quiz.title,
            lessonId: createdLesson.id,
            questions: {
              create: quiz.questions.map((q, idx) => ({
                question: q.question,
                type: q.type,
                options: q.options,
                correctAnswer: q.correctAnswer,
                order: idx,
              })),
            },
          },
        });
        console.log(`    Attached quiz: ${quiz.title}`);
      }
    }

    console.log(`    Created ${chapter.lessons.length} lessons`);
  }

  // Create CourseTrack: 60-day guided path
  const readingLessons = lessonRefs.filter((l) => l.title.startsWith("Lesson"));
  const track = await db.courseTrack.create({
    data: {
      title: "60 Days with Jesus",
      slug: "60-days-with-jesus",
      description:
        "A guided daily path through the Jesus course with Scripture reading, prayer prompts, memory verses, and mentor check-ins.",
      courseId: course.id,
      published: true,
      featured: true,
      order: 1,
    },
  });

  // Map lessons to days, leaving room for rest, review, and catch-up
  const lessonDays = [
    // Part I
    1, 3, 5, 7, 9, 11, 13,
    // Part II
    15, 17, 19, 21, 23, 25, 27,
    // Part III
    29, 31, 33, 35, 37, 39, 41,
    // Part IV
    43, 45, 47, 49, 51, 53, 55, 57,
    // Part V
    58, 59, 60,
    // Remaining lessons become weekly review assignments beyond day 60
    61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75,
  ];

  const trackDayData = readingLessons.map((lesson, idx) => {
    const dayNumber = lessonDays[idx] ?? idx + 1;
    const hasMentorCheckin = dayNumber % 14 === 0;
    return {
      trackId: track.id,
      dayNumber,
      title: lesson.title,
      lessonId: lesson.lessonId,
      prayerPrompt: `Pray through the main proposition of today's lesson: ${lesson.title}`,
      hasQuiz: false,
      hasMentorCheckin,
      order: idx,
    };
  });

  // Ensure unique day numbers within the track
  const usedDays = new Set<number>();
  const dedupedTrackDayData = trackDayData.map((day) => {
    let dayNumber = day.dayNumber;
    while (usedDays.has(dayNumber)) {
      dayNumber += 1;
    }
    usedDays.add(dayNumber);
    return { ...day, dayNumber };
  });

  // Bulk create in chunks to avoid huge transactions
  const chunkSize = 50;
  for (let i = 0; i < dedupedTrackDayData.length; i += chunkSize) {
    const chunk = dedupedTrackDayData.slice(i, i + chunkSize);
    await db.trackDay.createMany({ data: chunk });
  }

  console.log(`  Created ${dedupedTrackDayData.length} track days for ${track.title}`);

  // Create MemoryCollection and verses (skip if already exists)
  await db.memoryCollection.deleteMany({ where: { slug: "jesus-key-verses" } });
  const memoryCollection = await db.memoryCollection.create({
    data: {
      title: "30 Key Verses for Knowing Jesus",
      slug: "jesus-key-verses",
      description: "Core Scripture passages for memorization and meditation throughout the Jesus course.",
      verses: {
        create: memoryVerses.map((v, idx) => ({
          verse: {
            create: {
              reference: v.reference,
              text: v.text,
              translation: v.translation,
              topic: v.topic,
              difficulty: "MEDIUM",
              published: true,
            },
          },
          order: idx,
        })),
      },
    },
  });

  console.log(`  Created memory collection: ${memoryCollection.title}`);

  // Create 30-Day Gospel Reading Plan (skip if already exists)
  await db.readingPlan.deleteMany({ where: { slug: "30-days-gospels" } });
  const readingPlan = await db.readingPlan.create({
    data: {
      title: "30 Days Through the Gospels",
      slug: "30-days-gospels",
      description: "Read the whole story of Jesus in one month: Mark, Matthew, Luke, and John highlights.",
      duration: 30,
      published: true,
      featured: true,
      days: {
        create: gospelReadingPlanDays.map((d) => ({
          dayNumber: d.day,
          title: `Day ${d.day}`,
          passages: d.passages,
          reflection: "Look for one thing Jesus says or does that shows who he is. Write it in your journal.",
        })),
      },
    },
  });

  console.log(`  Created reading plan: ${readingPlan.title}`);

  // Create TopicStudy entries for major themes
  const topicStudies = [
    {
      title: "The Person of Jesus",
      slug: "person-of-jesus",
      description: "Who Jesus is: Son of God, Son of Man, Messiah, Lord, and Word made flesh.",
      passages: ["John 1:1-18", "Matthew 16:13-20", "Mark 2:1-12", "John 8:48-59"],
    },
    {
      title: "The Kingdom of God",
      slug: "kingdom-of-god",
      description: "The active reign of God breaking into history through Jesus.",
      passages: ["Mark 1:14-15", "Matthew 13:1-52", "Luke 4:16-21", "Luke 17:20-21"],
    },
    {
      title: "The Cross and Atonement",
      slug: "cross-and-atonement",
      description: "Why Jesus died and what his death accomplished.",
      passages: ["Isaiah 53:1-12", "Mark 10:45", "Romans 3:21-26", "1 Corinthians 15:3-8"],
    },
    {
      title: "The Resurrection",
      slug: "resurrection-of-jesus",
      description: "The bodily resurrection of Jesus and its significance.",
      passages: ["Matthew 28:1-20", "Luke 24:1-53", "John 20:1-31", "1 Corinthians 15:12-28"],
    },
    {
      title: "Following Jesus",
      slug: "following-jesus",
      description: "Discipleship, the Jesus Creed, and the mission of the church.",
      passages: ["Matthew 4:18-22", "Matthew 22:34-40", "John 15:1-17", "Matthew 28:18-20"],
    },
  ];

  for (const topic of topicStudies) {
    await db.topicStudy.upsert({
      where: { slug: topic.slug },
      update: { title: topic.title, description: topic.description, passages: topic.passages },
      create: {
        title: topic.title,
        slug: topic.slug,
        description: topic.description,
        passages: topic.passages,
        published: true,
        featured: true,
      },
    });
  }

  console.log(`  Created ${topicStudies.length} topic studies`);

  console.log("\n✅ Jesus course seeded successfully.");
  console.log(`Visit: /courses/${course.slug}`);
  console.log(`Track: /courses/${course.slug}?track=${track.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
