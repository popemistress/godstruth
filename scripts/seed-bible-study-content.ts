/**
 * Seed script: Bible Study Content
 * Seeds ReadingPlans, Devotionals, and MemoryVerses into the database.
 *
 * Run: export $(grep -v '^#' .env.local | xargs) && pnpm exec tsx scripts/seed-bible-study-content.ts
 */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ─── Reading Plans ────────────────────────────────────────────────────────────

const READING_PLANS = [
  {
    title: "New Testament in 30 Days",
    slug: "new-testament-30-days",
    description:
      "Read through the entire New Testament in one month with guided daily passages covering the Gospels, Acts, Epistles, and Revelation.",
    duration: 30,
    featured: true,
    published: true,
    days: [
      { dayNumber: 1,  title: "The Birth of the King",        passages: ["Matthew 1-2"] },
      { dayNumber: 2,  title: "Preparing the Way",            passages: ["Matthew 3-4"] },
      { dayNumber: 3,  title: "The Sermon on the Mount",      passages: ["Matthew 5-7"] },
      { dayNumber: 4,  title: "Miracles of the Messiah",      passages: ["Matthew 8-9"] },
      { dayNumber: 5,  title: "Mission and Opposition",       passages: ["Matthew 10-12"] },
      { dayNumber: 6,  title: "Parables of the Kingdom",      passages: ["Matthew 13-15"] },
      { dayNumber: 7,  title: "Peter's Confession & Transfiguration", passages: ["Matthew 16-18"] },
      { dayNumber: 8,  title: "The Final Week Begins",        passages: ["Matthew 19-22"] },
      { dayNumber: 9,  title: "Signs and the Upper Room",     passages: ["Matthew 23-25"] },
      { dayNumber: 10, title: "The Passion and Resurrection", passages: ["Matthew 26-28"] },
      { dayNumber: 11, title: "Mark: The Servant King",       passages: ["Mark 1-4"] },
      { dayNumber: 12, title: "Power Over All Things",        passages: ["Mark 5-8"] },
      { dayNumber: 13, title: "The Way to the Cross",         passages: ["Mark 9-12"] },
      { dayNumber: 14, title: "Death and New Life",           passages: ["Mark 13-16"] },
      { dayNumber: 15, title: "Luke: The Son of Man",         passages: ["Luke 1-3"] },
      { dayNumber: 16, title: "Ministry in Galilee",          passages: ["Luke 4-6"] },
      { dayNumber: 17, title: "Faith, Forgiveness, Parables", passages: ["Luke 7-9"] },
      { dayNumber: 18, title: "The Journey to Jerusalem",     passages: ["Luke 10-12"] },
      { dayNumber: 19, title: "Parables of Grace",            passages: ["Luke 13-16"] },
      { dayNumber: 20, title: "The King Enters Jerusalem",    passages: ["Luke 17-19"] },
      { dayNumber: 21, title: "Crucifixion and Resurrection", passages: ["Luke 20-24"] },
      { dayNumber: 22, title: "John: The Word Made Flesh",    passages: ["John 1-3"] },
      { dayNumber: 23, title: "Living Water and Bread of Life", passages: ["John 4-6"] },
      { dayNumber: 24, title: "Light of the World",           passages: ["John 7-9"] },
      { dayNumber: 25, title: "The Good Shepherd",            passages: ["John 10-12"] },
      { dayNumber: 26, title: "The Upper Room Discourse",     passages: ["John 13-15"] },
      { dayNumber: 27, title: "High Priestly Prayer & Passion", passages: ["John 16-19"] },
      { dayNumber: 28, title: "Resurrection and Commission",  passages: ["John 20-21"] },
      { dayNumber: 29, title: "Acts: The Church Is Born",     passages: ["Acts 1-4"] },
      { dayNumber: 30, title: "The Gospel Goes to the World", passages: ["Acts 5-7"] },
    ],
  },
  {
    title: "Psalms & Proverbs",
    slug: "psalms-proverbs-31-days",
    description:
      "A month of wisdom and worship — one Psalm and one chapter of Proverbs each day. Perfect for morning devotions.",
    duration: 31,
    featured: false,
    published: true,
    days: Array.from({ length: 31 }, (_, i) => ({
      dayNumber: i + 1,
      title: `Day ${i + 1}: Psalm ${[1,8,15,19,22,23,24,27,32,34,37,40,42,46,51,62,63,84,90,91,100,103,116,119,121,130,139,145,146,147,148][i] ?? i + 1} & Proverbs ${i + 1}`,
      passages: [
        `Psalm ${[1,8,15,19,22,23,24,27,32,34,37,40,42,46,51,62,63,84,90,91,100,103,116,119,121,130,139,145,146,147,148][i] ?? i + 1}`,
        `Proverbs ${i + 1}`,
      ],
    })),
  },
  {
    title: "Genesis: In the Beginning",
    slug: "genesis-in-the-beginning",
    description:
      "Walk through the first book of the Bible — creation, the fall, the flood, and the patriarchs — in ten days of foundational reading.",
    duration: 10,
    featured: false,
    published: true,
    days: [
      { dayNumber: 1,  title: "Creation and the Garden",        passages: ["Genesis 1-3"] },
      { dayNumber: 2,  title: "Cain, Abel, and the Flood",      passages: ["Genesis 4-6"] },
      { dayNumber: 3,  title: "The Ark and the Covenant",       passages: ["Genesis 7-9"] },
      { dayNumber: 4,  title: "Babel and the Call of Abram",    passages: ["Genesis 10-12"] },
      { dayNumber: 5,  title: "Abraham and the Promise",        passages: ["Genesis 13-17"] },
      { dayNumber: 6,  title: "Sodom, Laughter, and the Test",  passages: ["Genesis 18-22"] },
      { dayNumber: 7,  title: "Isaac and Jacob",                passages: ["Genesis 23-27"] },
      { dayNumber: 8,  title: "Jacob's Journey and Wrestle",    passages: ["Genesis 28-32"] },
      { dayNumber: 9,  title: "Joseph: The Dreamer",            passages: ["Genesis 33-41"] },
      { dayNumber: 10, title: "Reconciliation and Blessing",    passages: ["Genesis 42-50"] },
    ],
  },
  {
    title: "The Life of Jesus (Gospel of John)",
    slug: "gospel-of-john-21-days",
    description:
      "Read one chapter of John each day for 21 days and encounter Jesus — the Word made flesh — through the eyes of His beloved disciple.",
    duration: 21,
    featured: false,
    published: true,
    days: Array.from({ length: 21 }, (_, i) => ({
      dayNumber: i + 1,
      title: `John Chapter ${i + 1}`,
      passages: [`John ${i + 1}`],
    })),
  },
  {
    title: "Paul's Letters",
    slug: "pauls-letters-14-days",
    description:
      "Two weeks through the heart of Paul's theology — Romans, Galatians, Ephesians, Philippians, and Colossians — covering grace, freedom, and life in Christ.",
    duration: 14,
    featured: false,
    published: true,
    days: [
      { dayNumber: 1,  title: "The Gospel Defined",            passages: ["Romans 1-3"] },
      { dayNumber: 2,  title: "Justified by Faith",            passages: ["Romans 4-5"] },
      { dayNumber: 3,  title: "Dead to Sin, Alive in Christ",  passages: ["Romans 6-7"] },
      { dayNumber: 4,  title: "Life in the Spirit",            passages: ["Romans 8"] },
      { dayNumber: 5,  title: "Israel and God's Plan",         passages: ["Romans 9-11"] },
      { dayNumber: 6,  title: "The Transformed Life",          passages: ["Romans 12-16"] },
      { dayNumber: 7,  title: "Freedom in the Gospel",         passages: ["Galatians 1-3"] },
      { dayNumber: 8,  title: "Children of the Promise",       passages: ["Galatians 4-6"] },
      { dayNumber: 9,  title: "Every Spiritual Blessing",      passages: ["Ephesians 1-3"] },
      { dayNumber: 10, title: "Walk Worthy",                   passages: ["Ephesians 4-6"] },
      { dayNumber: 11, title: "To Live Is Christ",             passages: ["Philippians 1-2"] },
      { dayNumber: 12, title: "The Peace That Passes Understanding", passages: ["Philippians 3-4"] },
      { dayNumber: 13, title: "Christ: Supreme and Sufficient",passages: ["Colossians 1-2"] },
      { dayNumber: 14, title: "The New Life in Christ",        passages: ["Colossians 3-4"] },
    ],
  },
];

// ─── Devotionals ──────────────────────────────────────────────────────────────

const now = new Date();
function daysAgo(n: number): Date {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d;
}

const DEVOTIONALS = [
  {
    title: "The Shepherd Who Never Leaves",
    slug: "shepherd-who-never-leaves",
    scripture: "Psalm 23:1",
    body: `David wrote these words as a former shepherd who knew the bond between shepherd and flock. "The LORD is my shepherd; I shall not want." This is not wishful thinking — it is a declaration grounded in David's personal experience of God's faithfulness through valleys, battlefields, and dark nights of the soul.

The word "want" in the Hebrew (chaser) means to lack, to be diminished. David is saying that with the LORD as his shepherd, nothing essential will be missing. Not material wealth — David had seasons of poverty and flight. But provision for every real need: rest, restoration, direction, and companionship in the darkest places.

Today, whatever you are lacking — courage, clarity, comfort, or hope — bring it to the Shepherd. He does not merely know the path; He walks it with you. He carries the rod of protection and the staff of gentle guidance. You are not a number in His flock. You are known by name.`,
    prayer: `Lord, You are my Shepherd. Today I choose to trust that You see every need I carry. Guide me in paths of righteousness for Your name's sake, and let me not fear the valley I am walking through. I am Yours. Amen.`,
    author: "Gods Truth Editorial",
    published: true,
    featured: true,
    publishDate: daysAgo(0),
  },
  {
    title: "More Than Conquerors",
    slug: "more-than-conquerors",
    scripture: "Romans 8:37",
    body: `Paul writes from within hardship, not above it. In Romans 8:35 he lists the adversities believers actually face: tribulation, distress, persecution, famine, nakedness, danger, sword. These are not hypothetical — Paul had experienced every item on that list. And yet his conclusion is not survival but victory: "We are more than conquerors through him who loved us."

The Greek word hypernikao — "more than conquerors" — is used only here in all of Scripture. It means an overwhelming, decisive, surplus victory. Not just winning, but winning so completely that the struggle itself is turned into gain (Phil 1:12). The suffering that was meant to destroy us becomes the very arena in which God's power and love are most clearly displayed.

The source of this victory is not willpower or positive thinking: it is "through him who loved us." Christ's love is not passive. It is active, pursuing, and cruciform. In your hardest season, you are not just surviving — you are being transformed into someone who knows God's love in depths that comfort alone can never teach.`,
    prayer: `Father, I confess that today feels more like defeat than victory. But I trust Your word over my feelings. Remind me that the same love that drove Christ to the cross will not abandon me now. Make me more than a conqueror in this very trial. Amen.`,
    author: "Gods Truth Editorial",
    published: true,
    featured: false,
    publishDate: daysAgo(1),
  },
  {
    title: "When You Do Not Know the Way",
    slug: "when-you-do-not-know-the-way",
    scripture: "Proverbs 3:5-6",
    body: `"Trust in the LORD with all your heart, and do not lean on your own understanding." Solomon, the wisest man who ever lived, writes these words as a warning against the very thing he was most tempted by: his own brilliant mind. Wisdom, he learned, is not the absence of counsel — it is knowing whose counsel to anchor in first.

The command is total: trust with your whole heart, not with one part while keeping another reserved for self-reliance. Acknowledge Him in all your ways — the significant decisions and the small ones. The Hebrew word for acknowledge (yada) means to know intimately, not merely to reference. God is not a last resort to consult when our plans fail. He is the starting point.

The promise is equally total: He will make your paths straight. Not necessarily the path you planned, or the shortest path, or the most comfortable path — but the right one. Straight (Hebrew: yashar) means upright, level, and leading where it should go. Whatever crossroads you stand at today, the wisest thing you can do is pause and pray before you plan.`,
    prayer: `LORD, I acknowledge You in this decision that lies before me. I choose to trust Your judgment over my own instincts. Make the path clear as I wait on You, and grant me the patience to follow where You lead rather than where I want to go. Amen.`,
    author: "Gods Truth Editorial",
    published: true,
    featured: false,
    publishDate: daysAgo(2),
  },
  {
    title: "The Peace That Guards",
    slug: "the-peace-that-guards",
    scripture: "Philippians 4:6-7",
    body: `Paul wrote Philippians from a Roman prison, and yet the word "rejoice" appears four times in four chapters. In chapter 4 he gives the formula behind his impossible contentment: "Do not be anxious about anything, but in everything by prayer and supplication with thanksgiving let your requests be made known to God."

Notice the scope: "in everything." Not in the big prayers only, not just in crisis. Every worry, every logistical pressure, every relationship tension — bring it all to God with specificity (supplication) and gratitude (thanksgiving). Thanksgiving is not denial of the problem; it is remembering who holds the problem.

The result is stunning: "the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus." The Greek word for guard (phroureo) is a military term — the peace of God stands like a sentinel at the gate of your heart, turning away the assaults of fear and despair. You do not manufacture this peace; you receive it as you hand things over to God.`,
    prayer: `Lord, I lay down my anxiety right now. I name every worry before You: [pause and name them]. I choose gratitude over fear. Send the peace that only You can give to stand guard over my heart today. I trust You with all of it. Amen.`,
    author: "Gods Truth Editorial",
    published: true,
    featured: false,
    publishDate: daysAgo(3),
  },
  {
    title: "Strength in the Waiting",
    slug: "strength-in-the-waiting",
    scripture: "Isaiah 40:31",
    body: `Isaiah 40 opens to a people in exile — exhausted, displaced, wondering if God has forgotten them. The prophet's answer comes not with a timeline but with a theology: God does not grow weary. He is the Creator of the ends of the earth, the One who "gives power to the faint and increases the strength of him who has no might."

Then comes the condition: "they who wait for the LORD shall renew their strength." The word "wait" (qavah) means to intertwine, like strands twisted together to make a stronger cord. Waiting on God is not passive — it is active expectation, staying tethered to Him in prayer, Scripture, and trust while the circumstances have not yet changed.

The three images of renewal escalate beautifully: soar on wings like eagles (the rare, high moments of spiritual exhilaration), run and not be weary (sustained momentum), walk and not faint (the steady, ordinary faithfulness of one foot in front of the other). The last image is the greatest. God's grace is sufficient for the long, slow middle of life.`,
    prayer: `Father, I am tired of waiting. But I choose to wait on You rather than rush ahead of Your timing. Renew my strength today. Let me walk faithfully, even when I cannot soar. You are worth waiting for. Amen.`,
    author: "Gods Truth Editorial",
    published: true,
    featured: false,
    publishDate: daysAgo(4),
  },
  {
    title: "Known Before You Were Born",
    slug: "known-before-you-were-born",
    scripture: "Jeremiah 29:11",
    body: `"For I know the plans I have for you, declares the LORD, plans for welfare and not for evil, to give you a future and a hope." These words were written to people in Babylonian exile — people who had lost their homes, their temple, and seemingly their future. The promise was not immediate rescue but persistent purpose.

The word "know" (yada) in Hebrew is deeply relational — the same word used for the intimate knowledge between a husband and wife. God does not merely know about you from a distance; He knows you with the intimacy of the Creator who shaped each detail of your life. His plans are not afterthoughts.

The word translated "welfare" is shalom — not just happiness but wholeness, flourishing, the restoration of all that was broken. God's plans are not a hedge against suffering; they are a guarantee that suffering is not the final word. Whatever exile you are living through — relational, financial, medical, spiritual — you have not fallen outside God's purposeful love. He knows the end from the beginning, and the end is good.`,
    prayer: `LORD, I confess that my circumstances have made it hard to believe in Your good plans. Today I choose to anchor my hope not in what I can see but in what You have declared. You know me. You have plans for me. I trust You with my future. Amen.`,
    author: "Gods Truth Editorial",
    published: true,
    featured: false,
    publishDate: daysAgo(5),
  },
  {
    title: "The Light That Darkness Cannot Overcome",
    slug: "light-darkness-cannot-overcome",
    scripture: "John 1:5",
    body: `"The light shines in the darkness, and the darkness has not overcome it." John writes this in present tense — not "the light shone" but "the light shines." The incarnation of Christ was not a one-time historical event sealed in the past. It is an ongoing reality: the light of God continues to penetrate every shadow of human experience.

The word "overcome" (katalambano) can also be translated "comprehend" or "seize." Darkness cannot understand the light, cannot contain it, cannot put it out. Every era that has tried to extinguish the light of the Gospel — through persecution, philosophy, or apathy — has found that the light keeps shining.

This is deeply personal. Whatever darkness you are facing — grief, doubt, moral failure, addiction, depression — it cannot permanently overcome the light of Christ within you. You may feel surrounded by darkness. But the darkness is always reactive, always responding to light. You carry the light. Walk in it.`,
    prayer: `Jesus, Light of the World, shine into every dark corner of my life today. Where I have let fear or sin dim Your presence, I repent and open my heart again. The darkness will not win. You are the light that cannot be extinguished. Amen.`,
    author: "Gods Truth Editorial",
    published: true,
    featured: false,
    publishDate: daysAgo(6),
  },
];

// ─── Memory Verses ────────────────────────────────────────────────────────────

const MEMORY_VERSES = [
  {
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    translation: "KJV",
    topic: "Love",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Romans 8:28",
    text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    translation: "KJV",
    topic: "Providence",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Psalm 23:1",
    text: "The LORD is my shepherd; I shall not want.",
    translation: "KJV",
    topic: "Trust",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all things through Christ which strengtheneth me.",
    translation: "KJV",
    topic: "Strength",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Isaiah 40:31",
    text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.",
    translation: "KJV",
    topic: "Hope",
    difficulty: "MEDIUM",
    published: true,
  },
  {
    reference: "Joshua 1:9",
    text: "Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    translation: "KJV",
    topic: "Courage",
    difficulty: "MEDIUM",
    published: true,
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    translation: "KJV",
    topic: "Wisdom",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Romans 10:9",
    text: "That if thou shalt confess with thy mouth the Lord Jesus, and shalt believe in thine heart that God hath raised him from the dead, thou shalt be saved.",
    translation: "KJV",
    topic: "Salvation",
    difficulty: "MEDIUM",
    published: true,
  },
  {
    reference: "John 14:6",
    text: "Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.",
    translation: "KJV",
    topic: "Salvation",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Genesis 1:1",
    text: "In the beginning God created the heaven and the earth.",
    translation: "KJV",
    topic: "Creation",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Matthew 28:19-20",
    text: "Go ye therefore, and teach all nations, baptizing them in the name of the Father, and of the Son, and of the Holy Ghost: Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.",
    translation: "KJV",
    topic: "Mission",
    difficulty: "HARD",
    published: true,
  },
  {
    reference: "Ephesians 2:8-9",
    text: "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
    translation: "KJV",
    topic: "Salvation",
    difficulty: "MEDIUM",
    published: true,
  },
  {
    reference: "Hebrews 11:1",
    text: "Now faith is the substance of things hoped for, the evidence of things not seen.",
    translation: "KJV",
    topic: "Faith",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "1 Corinthians 13:4-7",
    text: "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.",
    translation: "KJV",
    topic: "Love",
    difficulty: "HARD",
    published: true,
  },
  {
    reference: "Romans 3:23",
    text: "For all have sinned, and come short of the glory of God.",
    translation: "KJV",
    topic: "Sin",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Romans 6:23",
    text: "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord.",
    translation: "KJV",
    topic: "Salvation",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "John 1:1",
    text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
    translation: "KJV",
    topic: "Christology",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Jeremiah 29:11",
    text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    translation: "KJV",
    topic: "Hope",
    difficulty: "MEDIUM",
    published: true,
  },
  {
    reference: "Psalm 119:105",
    text: "Thy word is a lamp unto my feet, and a light unto my path.",
    translation: "KJV",
    topic: "Scripture",
    difficulty: "EASY",
    published: true,
  },
  {
    reference: "Matthew 6:33",
    text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    translation: "KJV",
    topic: "Discipleship",
    difficulty: "EASY",
    published: true,
  },
];

// ─── Seed function ────────────────────────────────────────────────────────────

async function main() {
  console.log("Seeding Bible study content…\n");

  // ── Reading Plans ──────────────────────────────────────────────────────────
  console.log("Creating reading plans…");
  for (const plan of READING_PLANS) {
    const { days, ...planData } = plan;
    const existing = await db.readingPlan.findUnique({ where: { slug: plan.slug } });
    if (existing) {
      console.log(`  Skipping "${plan.title}" (already exists)`);
      continue;
    }
    const created = await db.readingPlan.create({ data: planData });
    await db.readingPlanDay.createMany({
      data: days.map((d) => ({
        planId: created.id,
        dayNumber: d.dayNumber,
        title: d.title,
        passages: d.passages,
      })),
    });
    console.log(`  Created "${plan.title}" (${days.length} days)`);
  }

  // ── Devotionals ────────────────────────────────────────────────────────────
  console.log("\nCreating devotionals…");
  for (const dev of DEVOTIONALS) {
    const existing = await db.devotional.findUnique({ where: { slug: dev.slug } });
    if (existing) {
      console.log(`  Skipping "${dev.title}" (already exists)`);
      continue;
    }
    await db.devotional.create({ data: dev });
    console.log(`  Created "${dev.title}"`);
  }

  // ── Memory Verses ──────────────────────────────────────────────────────────
  console.log("\nCreating memory verses…");
  for (const verse of MEMORY_VERSES) {
    const existing = await db.memoryVerse.findFirst({
      where: { reference: verse.reference, translation: verse.translation },
    });
    if (existing) {
      console.log(`  Skipping ${verse.reference} (already exists)`);
      continue;
    }
    await db.memoryVerse.create({ data: verse });
    console.log(`  Created ${verse.reference} — ${verse.topic}`);
  }

  console.log("\nDone! Bible study content seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
