import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const l21 = await db.courseLesson.findUnique({ where: { id: "cmq6ktevb000b14g6ezlrl09a" }, select: { content: true } });
  const s9 = await db.courseLesson.findUnique({ where: { id: "cmq6ktevc000d14g6pyrb8aol" }, select: { content: true } });
  console.log("=== L21 antichrist section ===");
  const l21c = l21?.content ?? "";
  const idx = l21c.indexOf("Ministry response");
  console.log(l21c.slice(idx - 10, idx + 300));
  console.log("\n=== S9 tail ===");
  console.log(s9?.content?.slice(-300));
}
main().finally(() => db.$disconnect());
