import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  for (const slug of ["angels", "demons"]) {
    const content = await db.content.findFirst({ where: { slug }, select: { id: true, title: true, chapters: { select: { id: true, title: true, order: true, lessons: { select: { id: true, title: true, order: true, type: true }, orderBy: { order: "asc" } } }, orderBy: { order: "asc" } } } });
    console.log(`\n=== ${content?.title} ===`);
    for (const ch of content?.chapters ?? []) {
      console.log(`  Ch${ch.order}: ${ch.title} (${ch.id})`);
      for (const l of ch.lessons) {
        console.log(`    [${l.type}] order=${l.order} ${l.title} (${l.id})`);
      }
    }
  }
}
main().finally(() => db.$disconnect());
