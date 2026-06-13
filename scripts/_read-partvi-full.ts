import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const ids = [
    "cmq6ktev5000314g6pqaidojn", // L17
    "cmq6ktev7000514g6aitze463", // L18
    "cmq6kteva000914g6w7kuq73v", // L20
    "cmq6ktevb000b14g6ezlrl09a", // L21
    "cmq6ktevc000d14g6pyrb8aol", // S9
    "cmq6ktevd000f14g6bs1bw3ly", // S10
  ];
  for (const id of ids) {
    const l = await db.courseLesson.findUnique({ where: { id }, select: { id: true, title: true, content: true } });
    console.log(`\n\n===FILE:${id}===\n${l?.content}`);
  }
}
main().finally(() => db.$disconnect());
