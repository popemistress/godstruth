import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const check = [
    ["Lesson 19", "Pentecost"],
    ["Lesson 37", "Paradise with faithful"],
    ["Lesson 38", "Great White Throne"],
    ["Lesson 9", "Garden of Eden"],
    ["Lesson 6", "Spiritual battle"],
  ];
  for (const [search, expected] of check) {
    const l = await db.courseLesson.findFirst({ where: { title: { startsWith: search } }, select: { title: true, content: true } });
    if (!l) { console.log(search + ': NOT FOUND'); continue; }
    const captions = (l.content?.match(/!\[([^\]]*)\]/g)||[]).map((m:string)=>m.slice(2,-1));
    const ok = captions.some(c => c.toLowerCase().includes(expected.toLowerCase()));
    console.log(`${ok ? '✅' : '❌'} ${l.title}: [${captions[0]?.slice(0,50)}...]`);
  }
  await db.$disconnect();
}
main();
