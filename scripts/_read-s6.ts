import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const l = await db.courseLesson.findFirst({ where: { title: { contains: "Supplement 6" }, chapter: { content: { slug: "angels" } } }, select: { id: true, title: true, content: true } });
  console.log(`ID: ${l?.id}\nTITLE: ${l?.title}\n${l?.content}`);
}
main().finally(() => db.$disconnect());
