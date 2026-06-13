import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  for (const id of ["cmq6612vc000rgeo0gmsp7vl8","cmq6612vl0011geo0jfq5z7ju"]) {
    const l = await db.courseLesson.findUnique({ where: { id }, select: { id: true, title: true, content: true } });
    console.log(`\nID: ${l?.id}\nTITLE: ${l?.title}\n${l?.content}`);
  }
}
main().finally(() => db.$disconnect());
