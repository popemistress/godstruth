// God the Father: Knowing Him, Being His Son, Living Before Him
// Complete seed data for the Gods Truth platform.
//
// This file contains original, non-copyrighted content. It was written from
// general biblical-theological knowledge and the course framework approved by
// the project owner. It does not quote or imitate any published source.
//
// UploadThing placeholders:
//   - Replace UPLOADTHING:lesson-X-Y with actual UploadThing image URLs.
//
// To use: import { seedGodTheFatherCourse } from "./GOD/god-the-father-seed"
// and call it inside prisma/seed.ts after the existing sample content is seeded.

import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { resolve } from "path";

const COURSE_MD_PATH = resolve(__dirname, "god-the-father-course.md");

export const GOD_THE_FATHER_COURSE = {
  type: "COURSE" as const,
  title: "God the Father: Knowing Him, Being His Son, Living Before Him",
  slug: "god-the-father",
  description:
    "A systematic, devotional, and transformational study of God the Father — the source, sustainer, sender, and goal of all things. Move from knowing about the Father to living before Him as His son or daughter.",
  thumbnail: "/god-the-father-cover.png",
  order: 200,
  published: true,
  featured: true,
  premium: false,
};

interface ParsedLesson {
  type: "READING" | "ASSIGNMENT";
  title: string;
  order: number;
  content: string;
  duration: number;
  coverUrl: string | null;
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

function parseMarkdown(md: string): { title: string; description: string; chapters: ParsedChapter[] } {
  const lines = md.replace(/\r\n?/g, "\n").split("\n");

  const courseTitle = "God the Father: Knowing Him, Being His Son, Living Before Him";
  const courseDescription =
    "A systematic, devotional, and transformational study of God the Father — the source, sustainer, sender, and goal of all things.";

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

    // Chapter heading: ## Part X — Title
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

    // Lesson heading: ### Lesson X — Title
    const lessonMatch = line.match(/^###\s+Lesson\s+(\d+)\s*[—\-–]\s*(.+)$/);
    if (currentChapter && lessonMatch) {
      flushLesson();
      const title = lessonMatch[2].trim();
      currentLesson = {
        type: "READING",
        title: `${lessonMatch[1]} — ${title}`,
        order: currentChapter.lessons.length + 1,
        content: "",
        duration: 900,
        coverUrl: null,
      };

      // Look ahead past blank lines for the cover image
      let peek = i + 1;
      while (peek < lines.length && lines[peek].trim() === "") {
        peek++;
      }
      const imageLine = lines[peek];
      const imageMatch = imageLine?.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (imageMatch) {
        const url = imageMatch[2].trim();
        // Store only real URLs; keep UploadThing placeholders in markdown
        // for production upload, but avoid Next.js image runtime errors.
        currentLesson.coverUrl = url;
        i = peek; // skip up to and including the image line
      }
      continue;
    }

    // Horizontal rule
    if (/^---+\s*$/.test(line)) {
      continue;
    }

    buffer.push(line);
  }

  flushChapter();

  // The final lesson of the final module is the capstone assignment
  if (chapters.length > 0) {
    const lastChapter = chapters[chapters.length - 1];
    if (lastChapter.lessons.length > 0) {
      const lastLesson = lastChapter.lessons[lastChapter.lessons.length - 1];
      lastLesson.type = "ASSIGNMENT";
      lastLesson.duration = 3600;
    }
  }

  return { title: courseTitle, description: courseDescription, chapters };
}

const moduleQuizzes = [
  {
    title: "Module 1 Quiz: Recovering God the Father",
    questions: [
      { question: "What is the 'Father problem' described in this module?", type: "MULTIPLE_CHOICE", options: ["The Father does not exist", "The Father is often acknowledged but not explored in Christian life", "The Father is more important than Jesus", "The Father rejected humanity"], correctAnswer: "1" },
      { question: "Which lie did Satan tell Eve about the Father in Genesis 3?", type: "MULTIPLE_CHOICE", options: ["That the Father was too holy to speak with her", "That the Father was withholding good from her", "That the Father wanted her to die", "That the Father was not real"], correctAnswer: "1" },
      { question: "Jesus came to reveal the Father.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Which verse says that to know the Father and Jesus is eternal life?", type: "MULTIPLE_CHOICE", options: ["John 3:16", "John 17:3", "Romans 8:15", "Matthew 6:9"], correctAnswer: "1" },
      { question: "The Father is revealed in the Old Testament as all of the following EXCEPT:", type: "MULTIPLE_CHOICE", options: ["Creator", "Covenant-maker", "High priest", "Promise-keeper"], correctAnswer: "2" },
    ],
  },
  {
    title: "Module 2 Quiz: The Father Revealed",
    questions: [
      { question: "General revelation is available to all people through creation.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Jesus is called the Father's final word because:", type: "MULTIPLE_CHOICE", options: ["He was the last prophet", "He is the personal revelation of the Father", "He wrote the Bible", "He replaced the Father"], correctAnswer: "1" },
      { question: "'No one has seen God' refers to seeing the Father in His full unveiled essence.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "The Spirit reveals the Father by all of the following EXCEPT:", type: "MULTIPLE_CHOICE", options: ["Convicting", "Regenerating", "Indwelling", "Replacing the Father"], correctAnswer: "3" },
      { question: "The Bible is the Father's book because He inspired it and speaks through it.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
  {
    title: "Module 3 Quiz: The Father in the Trinity",
    questions: [
      { question: "The Father is the whole Godhead.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "Within the Trinity, the Son is called:", type: "MULTIPLE_CHOICE", options: ["The breath of God", "The Word of God", "The force of God", "The shadow of God"], correctAnswer: "1" },
      { question: "Eternal Fatherhood means the Father became Father when Jesus was born.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "Human fatherhood reflects:", type: "MULTIPLE_CHOICE", options: ["A social invention", "The eternal fatherhood of God", "Ancient patriarchy", "Biological necessity only"], correctAnswer: "1" },
      { question: "The three Persons of the Trinity never act independently of one another.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
  {
    title: "Module 4 Quiz: The Father's Character",
    questions: [
      { question: "Which name speaks of the Father's covenant faithfulness and presence?", type: "MULTIPLE_CHOICE", options: ["Elohim", "El Shaddai", "Yahweh", "Abba"], correctAnswer: "2" },
      { question: "To say 'God is good' means God sometimes becomes good when circumstances are pleasant.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "The Father's jealousy is:", type: "MULTIPLE_CHOICE", options: ["Insecure possessiveness", "A refusal to share His people with rivals", "Anger at being ignored", "Envy of other gods"], correctAnswer: "1" },
      { question: "The Father's immutability means He never responds to prayer.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "Holiness and grace meet at:", type: "MULTIPLE_CHOICE", options: ["The temple", "The cross", "The Law", "Creation"], correctAnswer: "1" },
    ],
  },
  {
    title: "Module 5 Quiz: The Father's Sovereign Work",
    questions: [
      { question: "Creation is a fatherly act because it is free, purposeful, relational, good, and the stage of redemption.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Providence means:", type: "MULTIPLE_CHOICE", options: ["God created and left the world alone", "God actively preserves and governs all things", "Everything happens by chance", "God controls people like puppets"], correctAnswer: "1" },
      { question: "Election is the Father's choice of believers before creation.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "The Father's plan moves through which eras?", type: "MULTIPLE_CHOICE", options: ["Creation, fall, Israel, Christ, church, consummation", "Eden, Exodus, Exile, Empire, End", "Adam, Noah, Abraham, Moses, David, Jesus", "Genesis, Exodus, Leviticus, Numbers, Deuteronomy"], correctAnswer: "0" },
      { question: "'Your kingdom come' is a prayer for the Father's reign to advance.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
  {
    title: "Module 6 Quiz: The Father's Cross",
    questions: [
      { question: "The Father sent the Son primarily because:", type: "MULTIPLE_CHOICE", options: ["He needed a sacrifice", "He loved the world", "The Law forced Him", "He was angry at Jesus"], correctAnswer: "1" },
      { question: "'God is love' means love is God.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "At the cross, the Father poured out wrath on the Son because He hated Him.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "The tearing of the temple curtain at Jesus' death signifies:", type: "MULTIPLE_CHOICE", options: ["Judgment on Israel", "Access to the Father is now open", "The temple was destroyed", "God abandoned His people"], correctAnswer: "1" },
      { question: "The Father's forgiveness removes our sins 'as far as the east is from the west.'", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
  {
    title: "Module 7 Quiz: Adoption and Sonship",
    questions: [
      { question: "Adoption changes your home; justification clears your record.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "'Abba' is best described as:", type: "MULTIPLE_CHOICE", options: ["A formal title for a judge", "An intimate, childlike address for Father", "A name for the Holy Spirit", "An Old Testament priestly title"], correctAnswer: "1" },
      { question: "Believers are co-heirs with:", type: "MULTIPLE_CHOICE", options: ["Moses", "Abraham", "Christ", "The apostles"], correctAnswer: "2" },
      { question: "The Spirit testifies with our spirit that we are God's children.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "A sealed person belongs to the Father and is guaranteed an inheritance.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
  {
    title: "Module 8 Quiz: The Father's Family",
    questions: [
      { question: "The church is best described as:", type: "MULTIPLE_CHOICE", options: ["A religious organization", "The Father's household", "A political movement", "A building"], correctAnswer: "1" },
      { question: "All Christians are brothers and sisters because they share the same Father.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "The Father's discipline is meant to:", type: "MULTIPLE_CHOICE", options: ["Punish and destroy", "Train and restore", "Prove we are not saved", "Make us afraid"], correctAnswer: "1" },
      { question: "We forgive others because:", type: "MULTIPLE_CHOICE", options: ["They deserve it", "We want to feel better", "God forgave us in Christ", "It is the law"], correctAnswer: "2" },
      { question: "The Father's table is a place of provision, fellowship, inclusion, remembrance, and mission.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
  {
    title: "Module 9 Quiz: The Fatherless and the Father",
    questions: [
      { question: "Earthly fatherlessness can affect how a person views God the Father.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "God the Father is exactly like a person's earthly father.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "1" },
      { question: "Spiritual fathering includes all of the following EXCEPT:", type: "MULTIPLE_CHOICE", options: ["Being present", "Offering identity", "Controlling decisions", "Modeling character"], correctAnswer: "2" },
      { question: "The Father's mission is to:", type: "MULTIPLE_CHOICE", options: ["Punish sinners", "Bring sons and daughters home", "Build institutions", "Keep people busy"], correctAnswer: "1" },
      { question: "Healing from fatherlessness ultimately comes from encountering:", type: "MULTIPLE_CHOICE", options: ["A better earthly father", "A therapist", "The true Father in Christ", "Positive thinking"], correctAnswer: "2" },
    ],
  },
  {
    title: "Module 10 Quiz: Living Before the Father",
    questions: [
      { question: "The Lord's Prayer begins with direct address to the Father.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "True worshipers worship the Father in Spirit and in:", type: "MULTIPLE_CHOICE", options: ["Silence", "Tradition", "Truth", "Music"], correctAnswer: "2" },
      { question: "Walking in the light means living with nothing hidden before the Father.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
      { question: "Work can be an act of worship when done:", type: "MULTIPLE_CHOICE", options: ["For human masters", "For the Father's glory", "For money", "For recognition"], correctAnswer: "1" },
      { question: "The 30-Day Before-the-Father Practice is designed to move knowledge into daily fellowship.", type: "TRUE_FALSE", options: ["True", "False"], correctAnswer: "0" },
    ],
  },
];

const memoryVerses = [
  { reference: "John 17:3", text: "Now this is eternal life: that they know you, the only true God, and Jesus Christ, whom you have sent.", topic: "Knowing the Father", translation: "NIV" },
  { reference: "1 Corinthians 8:6", text: "Yet for us there is but one God, the Father, from whom all things came and for whom we live.", topic: "One Father", translation: "NIV" },
  { reference: "John 14:9", text: "Anyone who has seen me has seen the Father.", topic: "Jesus Reveals the Father", translation: "NIV" },
  { reference: "Romans 1:20", text: "For since the creation of the world God’s invisible qualities — his eternal power and divine nature — have been clearly seen, being understood from what has been made.", topic: "Creation Reveals the Father", translation: "NIV" },
  { reference: "John 1:18", text: "No one has ever seen God, but the one and only Son, who is himself God and is in closest relationship with the Father, has made him known.", topic: "The Son Makes the Father Known", translation: "NIV" },
  { reference: "Matthew 28:19", text: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.", topic: "The Trinity", translation: "NIV" },
  { reference: "John 1:1-2", text: "In the beginning was the Word, and the Word was with God, and the Word was God. He was with God in the beginning.", topic: "The Eternal Word", translation: "NIV" },
  { reference: "Ephesians 3:14-15", text: "For this reason I kneel before the Father, from whom every family in heaven and on earth derives its name.", topic: "Fatherhood Origin", translation: "NIV" },
  { reference: "Exodus 34:5-7", text: "Then the LORD came down in the cloud and stood there with him and proclaimed his name, ‘The LORD.’ And he passed in front of Moses, proclaiming, ‘The LORD, the LORD, the compassionate and gracious God, slow to anger, abounding in love and faithfulness.’", topic: "The Father's Name", translation: "NIV" },
  { reference: "Psalm 34:8", text: "Taste and see that the LORD is good; blessed is the one who takes refuge in him.", topic: "God Is Good", translation: "NIV" },
  { reference: "Psalm 103:8", text: "The LORD is compassionate and gracious, slow to anger, abounding in love.", topic: "Mercy", translation: "NIV" },
  { reference: "Malachi 3:6", text: "I the LORD do not change. So you, the descendants of Jacob, are not destroyed.", topic: "Immutability", translation: "NIV" },
  { reference: "Genesis 1:1", text: "In the beginning God created the heavens and the earth.", topic: "Creation", translation: "NIV" },
  { reference: "Romans 8:28", text: "And we know that in all things God works for the good of those who love him, who have been called according to his purpose.", topic: "Providence", translation: "NIV" },
  { reference: "Ephesians 1:4-5", text: "For he chose us in him before the creation of the world to be holy and blameless in his sight. In love he predestined us for adoption to sonship through Jesus Christ.", topic: "Election", translation: "NIV" },
  { reference: "Matthew 6:10", text: "Your kingdom come, your will be done, on earth as it is in heaven.", topic: "Kingdom", translation: "NIV" },
  { reference: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", topic: "The Father's Love", translation: "NIV" },
  { reference: "Hebrews 10:19-20", text: "Therefore, brothers and sisters, since we have confidence to enter the Most Holy Place by the blood of Jesus, by a new and living way opened for us through the curtain, that is, his body.", topic: "Access to the Father", translation: "NIV" },
  { reference: "Psalm 103:12", text: "As far as the east is from the west, so far has he removed our transgressions from us.", topic: "Forgiveness", translation: "NIV" },
  { reference: "Galatians 4:4-5", text: "But when the set time had fully come, God sent his Son, born of a woman, born under the law, to redeem those under the law, that we might receive adoption to sonship.", topic: "Adoption", translation: "NIV" },
  { reference: "Romans 8:15", text: "The Spirit you received does not make you slaves, so that you live in fear again; rather, the Spirit you received brought about your adoption to sonship. And by him we cry, ‘Abba, Father.’", topic: "Abba", translation: "NIV" },
  { reference: "Romans 8:17", text: "Now if we are children, then we are heirs — heirs of God and co-heirs with Christ.", topic: "Inheritance", translation: "NIV" },
  { reference: "Romans 8:16", text: "The Spirit himself testifies with our spirit that we are God’s children.", topic: "Witness of the Spirit", translation: "NIV" },
  { reference: "Ephesians 1:13-14", text: "When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.", topic: "Sealed", translation: "NIV" },
  { reference: "1 Timothy 3:15", text: "If I am delayed, you will know how people ought to conduct themselves in God’s household, which is the church of the living God, the pillar and foundation of the truth.", topic: "Household of God", translation: "NIV" },
  { reference: "Galatians 6:2", text: "Carry each other’s burdens, and in this way you will fulfill the law of Christ.", topic: "Brothers and Sisters", translation: "NIV" },
  { reference: "Hebrews 12:11", text: "No discipline seems pleasant at the time, but painful. Later on, however, it produces a harvest of righteousness and peace for those who have been trained by it.", topic: "Discipline", translation: "NIV" },
  { reference: "Ephesians 4:32", text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", topic: "Forgive Others", translation: "NIV" },
  { reference: "Psalm 68:5", text: "A father to the fatherless, a defender of widows, is God in his holy dwelling.", topic: "Father to the Fatherless", translation: "NIV" },
  { reference: "Matthew 7:11", text: "If you, then, though you are evil, know how to give good gifts to your children, how much more will your Father in heaven give good gifts to those who ask him!", topic: "The True Father", translation: "NIV" },
  { reference: "Luke 19:10", text: "For the Son of Man came to seek and to save the lost.", topic: "Mission", translation: "NIV" },
  { reference: "Matthew 6:9", text: "This, then, is how you should pray: ‘Our Father in heaven, hallowed be your name.’", topic: "Prayer", translation: "NIV" },
  { reference: "John 4:23", text: "Yet a time is coming and has now come when the true worshipers will worship the Father in the Spirit and in truth.", topic: "Worship", translation: "NIV" },
  { reference: "1 John 1:7", text: "But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus, his Son, purifies us from all sin.", topic: "Walk in Light", translation: "NIV" },
  { reference: "Colossians 3:23", text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.", topic: "Work", translation: "NIV" },
];

const topicStudies = [
  {
    title: "The Fatherhood of God",
    slug: "fatherhood-of-god",
    description: "The biblical truth that God is Father — the source, sustainer, and goal of all things.",
    passages: ["John 17:3", "Matthew 6:9", "1 Corinthians 8:6", "Ephesians 3:14-15"],
  },
  {
    title: "The Father and the Trinity",
    slug: "father-and-trinity",
    description: "The Father as one divine Person within the triune Godhead, distinct from yet one with the Son and Spirit.",
    passages: ["Matthew 28:19", "John 1:1-2", "John 5:19", "2 Corinthians 13:14"],
  },
  {
    title: "The Father’s Love",
    slug: "fathers-love",
    description: "The active, costly, and eternal love of the Father revealed supremely at the cross.",
    passages: ["John 3:16", "Romans 5:8", "1 John 4:9-10", "Psalm 103:8"],
  },
  {
    title: "Adoption into God’s Family",
    slug: "adoption-sonship",
    description: "The transfer from slavery to sonship through the Father’s adoptive grace in Christ.",
    passages: ["Galatians 4:4-7", "Romans 8:15-17", "Ephesians 1:4-5", "Ephesians 1:13-14"],
  },
  {
    title: "Living Before the Father",
    slug: "coram-patre",
    description: "Practical fellowship with the Father in prayer, worship, work, suffering, and daily life.",
    passages: ["Matthew 6:9-13", "John 4:23", "1 John 1:5-7", "Colossians 3:23"],
  },
];

export async function seedGodTheFatherCourse(db: PrismaClient) {
  const md = readFileSync(COURSE_MD_PATH, "utf-8");
  const { title, description, chapters } = parseMarkdown(md);

  const totalLessons = chapters.reduce((a, c) => a + c.lessons.length, 0);
  console.log(`Parsed ${chapters.length} parts with ${totalLessons} lessons`);

  // Clean up any existing course
  const existing = await db.content.findUnique({ where: { slug: GOD_THE_FATHER_COURSE.slug } });
  if (existing) {
    console.log("Removing existing god-the-father course...");
    await db.content.delete({ where: { id: existing.id } });
  }

  const course = await db.content.create({
    data: {
      type: GOD_THE_FATHER_COURSE.type,
      title,
      slug: GOD_THE_FATHER_COURSE.slug,
      description,
      published: GOD_THE_FATHER_COURSE.published,
      featured: GOD_THE_FATHER_COURSE.featured,
      premium: GOD_THE_FATHER_COURSE.premium,
      order: GOD_THE_FATHER_COURSE.order,
      thumbnail: GOD_THE_FATHER_COURSE.thumbnail,
    },
  });

  console.log(`Created course: ${course.title} (${course.id})`);

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
          coverUrl: lesson.coverUrl,
          published: true,
        },
      });

      lessonRefs.push({
        chapterOrder: chapter.order,
        lessonOrder: lesson.order,
        lessonId: createdLesson.id,
        title: lesson.title,
      });

      // Attach module quiz to the last lesson of each chapter
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

  // Create CourseTrack: 52-day guided path
  const track = await db.courseTrack.create({
    data: {
      title: "52 Days with God the Father",
      slug: "52-days-with-god-the-father",
      description:
        "A guided daily path through the God the Father course with Scripture meditation, prayer prompts, and practical steps toward living before the Father.",
      courseId: course.id,
      published: true,
      featured: true,
      order: 1,
    },
  });

  const trackDayData = lessonRefs.map((lesson, idx) => {
    const dayNumber = idx + 1;
    const hasMentorCheckin = dayNumber === 26 || dayNumber === 52;
    return {
      trackId: track.id,
      dayNumber,
      title: lesson.title,
      lessonId: lesson.lessonId,
      prayerPrompt: `Pray through the main truth of today's lesson: ${lesson.title}`,
      hasQuiz: false,
      hasMentorCheckin,
      order: idx,
    };
  });

  const chunkSize = 50;
  for (let i = 0; i < trackDayData.length; i += chunkSize) {
    const chunk = trackDayData.slice(i, i + chunkSize);
    await db.trackDay.createMany({ data: chunk });
  }

  console.log(`  Created ${trackDayData.length} track days for ${track.title}`);

  // Create MemoryCollection
  await db.memoryCollection.deleteMany({ where: { slug: "god-the-father-key-verses" } });
  const memoryCollection = await db.memoryCollection.create({
    data: {
      title: "35 Key Verses for Knowing God the Father",
      slug: "god-the-father-key-verses",
      description: "Core Scripture passages for memorization and meditation throughout the God the Father course.",
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

  // Create TopicStudy entries
  for (const topic of topicStudies) {
    await db.topicStudy.upsert({
      where: { slug: topic.slug },
      update: {
        title: topic.title,
        description: topic.description,
        passages: topic.passages,
      },
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

  console.log("\n✅ God the Father course seeded successfully.");
  console.log(`Visit: /courses/${course.slug}`);
  console.log(`Track: /courses/${course.slug}?track=${track.slug}`);
}
