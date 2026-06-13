import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const db = new PrismaClient();
const PROGRESS_FILE = "/tmp/lesson-img-progress.json";

function stripImages(content: string): string {
  return content.split("\n")
    .filter(line => !line.trim().match(/^!\[[^\]]*\]\([^)]+\)$/))
    .join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

async function main() {
  // Fix lessons with wrong Lesson-1-theme prompts that aren't actually Lesson 1
  const wrong = await db.courseLesson.findMany({
    where: { 
      AND: [
        { content: { contains: "Breathtaking cosmic creation" } },
        { NOT: { title: { equals: "Lesson 1 — God's Plan for Man" } } }
      ]
    },
    select: { id: true, title: true }
  });

  const progress: string[] = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
  const removeIds: string[] = [];

  for (const l of wrong) {
    console.log(`  ❌  Cleaning wrong Lesson 1 prompts from: ${l.title}`);
    const full = await db.courseLesson.findUnique({ where: { id: l.id }, select: { content: true } });
    await db.courseLesson.update({ where: { id: l.id }, data: { content: stripImages(full!.content!) } });
    removeIds.push(l.id);
  }

  // Also fix Lesson-4-theme (divine throne room) in wrong lessons
  const wrong4 = await db.courseLesson.findMany({
    where: {
      AND: [
        { content: { contains: "Majestic divine throne room" } },
        { NOT: { title: { equals: "Lesson 4 — The Truth About God" } } },
        { NOT: { title: { equals: "Lesson 40 — Daniel's Seventieth Week and the Tribulation" } } }
      ]
    },
    select: { id: true, title: true }
  });
  for (const l of wrong4) {
    console.log(`  ❌  Cleaning wrong Lesson 4 prompts from: ${l.title}`);
    const full = await db.courseLesson.findUnique({ where: { id: l.id }, select: { content: true } });
    await db.courseLesson.update({ where: { id: l.id }, data: { content: stripImages(full!.content!) } });
    removeIds.push(l.id);
  }

  if (removeIds.length > 0) {
    const updated = progress.filter(id => !removeIds.includes(id));
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(updated, null, 2));
    console.log(`Progress: ${progress.length} → ${updated.length} (removed ${removeIds.length})`);
  } else {
    console.log("No wrong lessons found.");
  }
  await db.$disconnect();
}
main().catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
