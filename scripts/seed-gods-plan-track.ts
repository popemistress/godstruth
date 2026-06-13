/**
 * seed-gods-plan-track.ts
 *
 * Creates a guided 21-day learning track for "God's Universal Plan for Creation"
 * with daily lessons, Scripture reading, short quizzes, prayer prompts,
 * and weekly mentor check-ins.
 *
 * Usage: pnpm tsx --env-file=.env.local scripts/seed-gods-plan-track.ts
 */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const DAYS = [
  {
    dayNumber: 1,
    title: "The Blueprint of God",
    scriptureReading: "Genesis 1:1-31",
    prayerPrompt: "Lord, open my eyes to see Your complete blueprint from eternity past to eternity future. Help me understand that nothing in Scripture is accidental.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 2,
    title: "Biblical Inspiration",
    scriptureReading: "2 Timothy 3:16-17; 2 Peter 1:20-21",
    prayerPrompt: "Father, I thank You that Your Word is breathed out by You. Give me confidence that every page is trustworthy and true.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 3,
    title: "How to Rightly Divide the Word",
    scriptureReading: "2 Timothy 2:15",
    prayerPrompt: "Teach me, Lord, to handle Your Word with care — to discern law from grace, prophecy from fulfillment, and Israel from the Church.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 4,
    title: "The Nature of God: Omniscience",
    scriptureReading: "Psalm 139:1-6; Isaiah 46:9-10",
    prayerPrompt: "You know all things, Lord. Nothing surprises You. Help me rest in Your sovereign knowledge over every detail of my life.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 5,
    title: "The Nature of God: Omnipotence & Omnipresence",
    scriptureReading: "Jeremiah 32:17; Psalm 139:7-12",
    prayerPrompt: "There is nowhere I can go from Your presence, and nothing too hard for You. I worship You as the all-powerful, ever-present God.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 6,
    title: "Original Creation & Lucifer's Fall",
    scriptureReading: "Ezekiel 28:12-19; Isaiah 14:12-15",
    prayerPrompt: "Guard my heart from the pride that brought Lucifer down. Teach me humility before Your throne.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 7,
    title: "Weekly Check-in #1",
    scriptureReading: "Psalm 19:1-14",
    prayerPrompt: "Review this week: What has the Holy Spirit revealed to you about God's nature and creation? Where do you need clarity?",
    hasQuiz: false,
    hasMentorCheckin: true,
  },
  {
    dayNumber: 8,
    title: "The Dispensation of Innocence",
    scriptureReading: "Genesis 2:4-25",
    prayerPrompt: "Thank You for the paradise You created. Even though Adam fell, You already had a plan of redemption through Christ.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 9,
    title: "The Dispensation of Conscience",
    scriptureReading: "Genesis 3:1-24; 4:1-16",
    prayerPrompt: "Lord, my conscience accuses me, but Your blood cleanses me. Thank You for grace that goes beyond conscience.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 10,
    title: "The Dispensation of Human Government",
    scriptureReading: "Genesis 8:15-9:17",
    prayerPrompt: "You established government for order. Help me honor authority while keeping my ultimate allegiance to You alone.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 11,
    title: "The Dispensation of Promise",
    scriptureReading: "Genesis 12:1-7; 15:1-6",
    prayerPrompt: "Like Abraham, I believe Your promises even when I cannot see how. Increase my faith, Lord.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 12,
    title: "The Dispensation of Law",
    scriptureReading: "Exodus 19:1-8; 20:1-17",
    prayerPrompt: "The law shows me my need for a Savior. Thank You, Jesus, for fulfilling what I could never keep.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 13,
    title: "Divine Healing & Divine Health",
    scriptureReading: "Exodus 15:26; Psalm 103:1-3",
    prayerPrompt: "You are Jehovah-Rapha, the Lord who heals. I receive Your healing power for my body, soul, and spirit.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 14,
    title: "Weekly Check-in #2",
    scriptureReading: "Psalm 119:9-16",
    prayerPrompt: "Reflect on the dispensations. Which one spoke most to your current season? Share one insight with your mentor.",
    hasQuiz: false,
    hasMentorCheckin: true,
  },
  {
    dayNumber: 15,
    title: "The Dispensation of Grace",
    scriptureReading: "John 1:14-17; Ephesians 2:8-9",
    prayerPrompt: "Grace upon grace! I am saved by grace through faith. Let me never boast — only glory in Your unmerited favor.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 16,
    title: "The New Birth",
    scriptureReading: "John 3:1-16; 2 Corinthians 5:17",
    prayerPrompt: "Thank You for making me a new creation. Old things have passed away; behold, all things have become new.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 17,
    title: "The Person and Work of Jesus Christ",
    scriptureReading: "Colossians 1:15-23; Hebrews 1:1-4",
    prayerPrompt: "Jesus, You are the image of the invisible God, the firstborn over all creation. I worship You as Creator and Redeemer.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 18,
    title: "The Holy Spirit: Person & Offices",
    scriptureReading: "John 14:15-26; Acts 1:8; 2:1-4",
    prayerPrompt: "Holy Spirit, I welcome You. Teach me, guide me, empower me, and fill me to overflowing for Your purposes.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 19,
    title: "Faith: Its Laws & Application",
    scriptureReading: "Hebrews 11:1-6; Romans 10:17",
    prayerPrompt: "Faith comes by hearing Your Word. Speak to me today, Lord, and let my faith arise to claim every promise.",
    hasQuiz: false,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 20,
    title: "The Rapture & End-Time Events",
    scriptureReading: "1 Thessalonians 4:13-18; Revelation 19:11-16",
    prayerPrompt: "Even so, come, Lord Jesus! Keep me ready, watching, and working until that glorious day.",
    hasQuiz: true,
    hasMentorCheckin: false,
  },
  {
    dayNumber: 21,
    title: "The New Heaven & New Earth",
    scriptureReading: "Revelation 21:1-7; 22:1-5",
    prayerPrompt: "What a glorious future awaits! No more tears, no more pain, face to face with You forever. I long for that day.",
    hasQuiz: false,
    hasMentorCheckin: true,
  },
];

async function main() {
  const course = await db.content.findUnique({
    where: { slug: "gods-universal-plan-for-creation" },
  });

  if (!course) {
    console.error("Course 'gods-universal-plan-for-creation' not found. Seed the course first.");
    process.exit(1);
  }

  const existing = await db.courseTrack.findUnique({
    where: { slug: "gods-plan-21-day-track" },
  });

  if (existing) {
    console.log("Track already exists. Deleting old days and recreating...");
    await db.trackDay.deleteMany({ where: { trackId: existing.id } });
    await db.courseTrack.delete({ where: { id: existing.id } });
  }

  const track = await db.courseTrack.create({
    data: {
      title: "God's Universal Plan for Creation — 21-Day Guided Journey",
      slug: "gods-plan-21-day-track",
      description:
        "A 21-day guided learning path through God's complete blueprint — from eternity past, through the dispensations, to the eternal state. Each day includes a lesson, Scripture reading, a prayer prompt, and periodic quizzes to reinforce understanding. Weekly mentor check-ins help you process and apply what you're learning.",
      courseId: course.id,
      published: true,
      featured: true,
      order: 1,
      days: {
        create: DAYS.map((d) => ({
          dayNumber: d.dayNumber,
          title: d.title,
          scriptureReading: d.scriptureReading,
          prayerPrompt: d.prayerPrompt,
          hasQuiz: d.hasQuiz,
          hasMentorCheckin: d.hasMentorCheckin,
        })),
      },
    },
    include: { days: true },
  });

  console.log(`Created track: ${track.title} with ${track.days.length} days`);

  // Create sample quizzes for quiz days
  const quizDays = track.days.filter((d) => d.hasQuiz);
  for (const day of quizDays) {
    await db.quiz.create({
      data: {
        title: `Day ${day.dayNumber} Quiz — ${day.title}`,
        trackDayId: day.id,
        questions: {
          create: [
            {
              question: `What is the key theme of Day ${day.dayNumber}: ${day.title}?`,
              type: "MULTIPLE_CHOICE",
              options: ["God's sovereignty", "Human achievement", "Random chance", "Political strategy"],
              correctAnswer: "0",
              order: 1,
            },
            {
              question: "Which Scripture was the daily reading for this day?",
              type: "MULTIPLE_CHOICE",
              options: [
                day.scriptureReading || "Genesis 1:1",
                "John 3:16",
                "Psalm 23",
                "Romans 8:28",
              ],
              correctAnswer: "0",
              order: 2,
            },
          ],
        },
      },
    });
  }

  console.log(`Created ${quizDays.length} quizzes`);
  console.log("Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
