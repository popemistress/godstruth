import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// Canonical course order — update this file to change ordering permanently.
// Run: pnpm exec tsx scripts/_reorder-courses.ts
const COURSE_ORDER: { slug: string; order: number }[] = [
  { slug: "gods-universal-plan-for-creation", order: 100 },
  { slug: "god-the-father",                   order: 200 },
  { slug: "jesus",                             order: 300 },
  { slug: "holy-spirit",                       order: 400 },
  { slug: "angels",                            order: 500 },
  { slug: "satan",                             order: 600 },
  { slug: "demons",                            order: 700 },
  { slug: "hell",                              order: 800 },
];

async function main() {
  for (const { slug, order } of COURSE_ORDER) {
    try {
      await db.content.update({ where: { slug }, data: { order } });
      console.log(`✅ ${slug} → order ${order}`);
    } catch {
      console.log(`⚠️  ${slug} not found — skipping`);
    }
  }
}
main().catch(console.error).finally(() => db.$disconnect());
