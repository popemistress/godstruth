import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  // Find all chapters and show their contentId
  const all = await db.courseChapter.findMany({
    orderBy: [{ contentId: "asc" }, { order: "asc" }],
    select: { id: true, order: true, title: true, contentId: true },
  });

  const demonsCourse = await db.content.findFirst({ where: { slug: "demons" }, select: { id: true } });
  console.log(`Demons contentId: ${demonsCourse?.id}\n`);
  console.log("All chapters:");
  for (const ch of all) {
    const marker = ch.contentId === demonsCourse?.id ? " ← DEMONS" : ch.contentId ? "" : " ← NULL/ORPHAN";
    console.log(`  [${ch.order}] ${ch.title.slice(0, 60)} | contentId: ${ch.contentId ?? "NULL"}${marker}`);
    console.log(`       id: ${ch.id}`);
  }
}

main().catch(console.error).finally(() => db.$disconnect());
