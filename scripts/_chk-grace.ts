import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  for (const t of ["Lesson 19", "Lesson 37", "Lesson 38"]) {
    const l = await db.courseLesson.findFirst({ where: { title: { startsWith: t } }, select: { id: true, title: true, content: true } });
    if (!l) { console.log(t, 'NOT FOUND'); continue; }
    const imgs = (l.content?.match(/!\[([^\]]*)\]/g)||[]).map((m:string)=>m.slice(2,-1));
    console.log(`[${l.id}] ${l.title}: ${imgs.length} images`);
    imgs.forEach((c:string) => console.log('  -', c.slice(0, 70)));
  }
  await db.$disconnect();
}
main();
