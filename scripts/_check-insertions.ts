import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const l = await db.courseLesson.findFirst({
    where: { title: { contains: "Seven Judgments" } },
    select: { title: true, content: true }
  });
  if (l) {
    // Show context around each image insertion
    const lines = l.content!.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes("![")) {
        const ctx = lines.slice(Math.max(0, i-2), i+3).join("\n");
        console.log(`--- Image at line ${i} ---\n${ctx}\n`);
      }
    }
  }
  await db.$disconnect();
}
main();
