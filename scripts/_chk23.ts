import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const titles = ["Lesson 23", "Lesson 41", "Lesson 42"];
  for (const t of titles) {
    const l = await db.courseLesson.findFirst({ where: { title: { startsWith: t } }, select: { title: true, content: true } });
    if (!l) continue;
    const c = (l.content?.match(/!\[([^\]]*)\]/g)||[]).map((m:string)=>m.slice(2,-1));
    console.log(l.title + ': ' + c.length + ' images');
    c.forEach((cap:string) => console.log('  -', cap.slice(0, 80)));
  }
  await db.$disconnect();
}
main();
