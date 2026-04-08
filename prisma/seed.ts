import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";
import { BIBLE_EDITIONS } from "./bibles-data";

const db = new PrismaClient();

async function main() {
  // ── Admin user ────────────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash("GodsTruth2025!Admin", 12);

  const admin = await db.user.upsert({
    where: { email: "admin@godstruth.net" },
    update: {},
    create: {
      email: "admin@godstruth.net",
      name: "Gods Truth Admin",
      role: Role.ADMIN,
      password: adminPassword,
      emailVerified: new Date(),
    },
  });

  console.log("✅ Admin user created:", admin.email);

  // ── Site settings ─────────────────────────────────────────────────────────
  await db.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: {
      id: "singleton",
      siteName: "Gods Truth",
      tagline: "Resources to help people understand God's Word",
      announcementBar: "Explore our Holy Week and Easter resources",
      announcementUrl: "/knowledge",
    },
  });

  console.log("✅ Site settings initialized");

  // ── Bible books (sample) ──────────────────────────────────────────────────
  const books = [
    { name: "Genesis", testament: "OLD" as const, order: 1, slug: "genesis" },
    { name: "Psalms", testament: "OLD" as const, order: 19, slug: "psalms" },
    { name: "Proverbs", testament: "OLD" as const, order: 20, slug: "proverbs" },
    { name: "Isaiah", testament: "OLD" as const, order: 23, slug: "isaiah" },
    { name: "Matthew", testament: "NEW" as const, order: 40, slug: "matthew" },
    { name: "John", testament: "NEW" as const, order: 43, slug: "john" },
    { name: "Romans", testament: "NEW" as const, order: 45, slug: "romans" },
    { name: "Revelation", testament: "NEW" as const, order: 66, slug: "revelation" },
  ];

  for (const book of books) {
    await db.book.upsert({
      where: { slug: book.slug },
      update: {},
      create: book,
    });
  }

  console.log("✅ Bible books seeded");

  // ── Sample content ────────────────────────────────────────────────────────
  const sampleContent = [
    {
      type: "VIDEO" as const,
      title: "How to Read the Bible",
      slug: "how-to-read-the-bible",
      description: "Learn what the Bible is and how it was written, and gain skills to study it with more insight.",
      published: true,
      featured: true,
      premium: false,
    },
    {
      type: "VIDEO" as const,
      title: "The Story of the Bible",
      slug: "story-of-the-bible",
      description: "An overview of the grand narrative running through the entire Bible.",
      published: true,
      featured: true,
      premium: false,
    },
    {
      type: "BOOK" as const,
      title: "Genesis Study Guide",
      slug: "genesis-study-guide",
      description: "A comprehensive guide to studying the book of Genesis.",
      published: true,
      premium: false,
    },
    {
      type: "COURSE" as const,
      title: "Understanding the Gospels",
      slug: "understanding-the-gospels",
      description: "A self-paced course exploring the four Gospel accounts.",
      published: true,
      premium: true,
    },
    {
      type: "COURSE" as const,
      title: "Gods Universal Plan for Creation",
      slug: "gods-universal-plan-for-creation",
      description: "An in-depth study of God's overarching plan from creation to redemption, revealing how every part of Scripture fits together in His sovereign design.",
      published: true,
      featured: true,
      premium: false,
    },
    {
      type: "PODCAST" as const,
      title: "Exploring Genesis with Tim",
      slug: "exploring-genesis-tim",
      description: "A deep dive into the themes and stories of Genesis.",
      published: true,
      premium: false,
    },
  ];

  for (const item of sampleContent) {
    await db.content.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
  }

  console.log("✅ Sample content seeded");

  // ── Bible Editions ────────────────────────────────────────────────────────
  for (const bible of BIBLE_EDITIONS) {
    await db.bibleEdition.upsert({
      where: { slug: bible.slug },
      update: {},
      create: {
        title: bible.title,
        slug: bible.slug,
        translation: bible.translation,
        publisher: bible.publisher,
        publishedYear: bible.publishedYear,
        description: bible.description,
        history: bible.history,
        canonRating: bible.canonRating,
        canonNotes: bible.canonNotes,
        gradientFrom: bible.gradientFrom,
        gradientTo: bible.gradientTo,
        accentColor: bible.accentColor,
        featured: bible.featured,
        filename: bible.filename,
      },
    });
  }

  console.log(`✅ Bible editions seeded (${BIBLE_EDITIONS.length} entries)`);
  console.log("\n🎉 Seed complete!");
  console.log("─────────────────────────────────");
  console.log("Admin email:    admin@godstruth.net");
  console.log("Admin password: GodsTruth2025!Admin");
  console.log("─────────────────────────────────");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
