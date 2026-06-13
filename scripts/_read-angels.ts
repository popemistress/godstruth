import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const ids = [
    "cmq6612uv000bgeo05oipwit7", // L4
    "cmq6612v8000ngeo03byfmsyu", // L7
    "cmq6612vg000vgeo0scoc75ik", // L9
    "cmq6612vi000xgeo0z961cywt", // L10
    "cmq6612w6001rgeo0k5pju6rj", // L18
    "cmq6612vc000rgeo0gmsp7vl8", // S4
  ];
  for (const id of ids) {
    const l = await db.courseLesson.findUnique({ where: { id }, select: { id: true, title: true, content: true } });
    console.log(`\n\n=== ${l?.title} (${id}) ===\n${l?.content}`);
  }
}
main().finally(() => db.$disconnect());
