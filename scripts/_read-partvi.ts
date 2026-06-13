import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const chapter = await db.courseChapter.findFirst({
    where: { id: "cmq6ktev3000114g6efnv7r93" },
    include: { lessons: { orderBy: { order: "asc" }, select: { title: true, type: true, content: true } } }
  });
  for (const l of chapter?.lessons ?? []) {
    console.log(`\n\n=== [${l.type}] ${l.title} ===\n`);
    console.log(l.content?.substring(0, 200) + "...");
    console.log(`[Total: ${l.content?.length} chars]`);
  }
}
main().finally(() => db.$disconnect());
