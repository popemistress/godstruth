/**
 * seed-bible-study.ts
 * Seeds sample devotionals, memory verses, topics, and a reading plan.
 * Usage: pnpm tsx --env-file=.env.local scripts/seed-bible-study.ts
 */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  // Clean existing
  await db.crossReference.deleteMany();
  await db.userMemoryProgress.deleteMany();
  await db.memoryCollectionItem.deleteMany();
  await db.memoryCollection.deleteMany();
  await db.memoryVerse.deleteMany();
  await db.userReadingProgress.deleteMany();
  await db.readingPlanDay.deleteMany();
  await db.readingPlan.deleteMany();
  await db.devotional.deleteMany();
  await db.topicStudy.deleteMany();
  await db.commentaryEntry.deleteMany();

  // Devotionals
  const devotionals = await db.devotional.createMany({
    data: [
      {
        title: "The Steadfast Love of God",
        slug: "steadfast-love",
        scripture: "Psalm 136:1",
        body: "Every morning is a reminder that God's mercy is new. His lovingkindness — the Hebrew word chesed — is not a fleeting emotion but a covenant commitment. He chooses to love us, not because we are lovely, but because He is love. Today, rest in the unshakeable reality that nothing you face can separate you from His steadfast love.",
        prayer: "Lord, thank You that Your mercy is renewed every morning. Help me to rest in Your covenant love today, no matter what I face.",
        author: "Gods Truth",
        published: true,
        featured: true,
      },
      {
        title: "The Good Shepherd",
        slug: "good-shepherd",
        scripture: "John 10:11",
        body: "Jesus does not lead from behind — He goes before us. The Good Shepherd lays down His life for the sheep. This means every valley you walk through has already been walked by Him. Every enemy you face has already been defeated by Him. You are not following a distant guide; you are following the One who gave everything to bring you home.",
        prayer: "Jesus, thank You for being my Shepherd. I trust You to lead me, protect me, and bring me safely home.",
        author: "Gods Truth",
        published: true,
        featured: true,
      },
      {
        title: "More Than Conquerors",
        slug: "more-than-conquerors",
        scripture: "Romans 8:37",
        body: "Paul does not say we will barely survive — he says we are more than conquerors through Him who loved us. The same power that raised Christ from the dead is at work in you. Not to make life easy, but to make you unstoppable. Today, walk with the confidence of a conqueror.",
        prayer: "Father, remind me today that I am more than a conqueror through Christ. Fill me with courage and faith.",
        author: "Gods Truth",
        published: true,
        featured: true,
      },
    ],
  });
  console.log(`Created ${devotionals.count} devotionals`);

  // Memory Verses
  const verses = await db.memoryVerse.createMany({
    data: [
      { reference: "John 3:16", text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.", translation: "KJV", topic: "Love", difficulty: "EASY", published: true },
      { reference: "Philippians 4:13", text: "I can do all things through Christ which strengtheneth me.", translation: "KJV", topic: "Strength", difficulty: "EASY", published: true },
      { reference: "Romans 8:28", text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", translation: "KJV", topic: "Faith", difficulty: "MEDIUM", published: true },
      { reference: "Jeremiah 29:11", text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", translation: "KJV", topic: "Hope", difficulty: "MEDIUM", published: true },
      { reference: "Psalm 23:1", text: "The LORD is my shepherd; I shall not want.", translation: "KJV", topic: "Peace", difficulty: "EASY", published: true },
      { reference: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.", translation: "KJV", topic: "Wisdom", difficulty: "HARD", published: true },
    ],
  });
  console.log(`Created ${verses.count} memory verses`);

  // Topic Studies
  const topics = await db.topicStudy.createMany({
    data: [
      {
        title: "The Love of God",
        slug: "love-of-god",
        description: "A comprehensive study on the nature, extent, and demonstration of God's love throughout Scripture.",
        passages: ["John 3:16", "Romans 5:8", "1 John 4:8", "Ephesians 2:4-5", "Psalm 136:1-26"],
        relatedTopics: ["Grace", "Mercy", "Redemption"],
        published: true,
        featured: true,
      },
      {
        title: "Faith",
        slug: "faith",
        description: "What biblical faith really means — not wishful thinking, but confident trust in God's promises.",
        passages: ["Hebrews 11:1", "Romans 10:17", "James 2:14-26", "Mark 11:22-24", "Ephesians 2:8-9"],
        relatedTopics: ["Salvation", "Trust", "Hope"],
        published: true,
        featured: true,
      },
      {
        title: "Prayer",
        slug: "prayer",
        description: "How to pray according to Scripture — the model, the power, and the purpose of prayer.",
        passages: ["Matthew 6:9-13", "Philippians 4:6-7", "James 5:16", "1 Thessalonians 5:17", "Luke 18:1-8"],
        relatedTopics: ["Fasting", "Worship", "Intercession"],
        published: true,
        featured: true,
      },
    ],
  });
  console.log(`Created ${topics.count} topic studies`);

  // Reading Plan
  const plan = await db.readingPlan.create({
    data: {
      title: "7 Days in the Psalms",
      slug: "7-days-psalms",
      description: "A week-long journey through selected Psalms that teach us to praise, lament, and trust God.",
      duration: 7,
      published: true,
      featured: true,
    },
  });

  await db.readingPlanDay.createMany({
    data: [
      { planId: plan.id, dayNumber: 1, title: "The Blessed Life", passages: ["Psalm 1"], reflection: "True blessing comes from delighting in God's law. Are you planting yourself by the streams of Scripture?" },
      { planId: plan.id, dayNumber: 2, title: "The Shepherd's Care", passages: ["Psalm 23"], reflection: "The Lord is your shepherd. He provides, protects, and pursues you with goodness." },
      { planId: plan.id, dayNumber: 3, title: "Forgiveness", passages: ["Psalm 32", "Psalm 51"], reflection: "Confession brings freedom. David's prayer models honest repentance and complete restoration." },
      { planId: plan.id, dayNumber: 4, title: "A Refuge in Trouble", passages: ["Psalm 46"], reflection: "God is our refuge and strength — a very present help in trouble. Be still and know." },
      { planId: plan.id, dayNumber: 5, title: "Praise for Creation", passages: ["Psalm 19"], reflection: "The heavens declare God's glory. His law revives the soul. His commands enlighten the eyes." },
      { planId: plan.id, dayNumber: 6, title: "The King Returns", passages: ["Psalm 24"], reflection: "Who is this King of glory? The Lord strong and mighty. Lift up your heads, you gates!" },
      { planId: plan.id, dayNumber: 7, title: "A Covenant of Praise", passages: ["Psalm 100"], reflection: "Enter His gates with thanksgiving and His courts with praise. He is good, and His mercy endures forever." },
    ],
  });
  console.log(`Created reading plan: ${plan.title} with 7 days`);

  // Cross References
  const crossRefs = await db.crossReference.createMany({
    data: [
      { sourceRef: "John 3:16", targetRef: "Romans 5:8", theme: "Love" },
      { sourceRef: "John 3:16", targetRef: "1 John 4:9-10", theme: "Love" },
      { sourceRef: "Romans 8:28", targetRef: "Genesis 50:20", theme: "Sovereignty" },
      { sourceRef: "Psalm 23:1", targetRef: "John 10:11", theme: "Shepherd" },
      { sourceRef: "Hebrews 11:1", targetRef: "Romans 10:17", theme: "Faith" },
    ],
  });
  console.log(`Created ${crossRefs.count} cross references`);

  console.log("Done!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await db.$disconnect(); });
