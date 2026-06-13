import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const db = new PrismaClient();
const PROGRESS_FILE = "/tmp/lesson-img-progress.json";

const WRONG_IDS = [
  "cmpwd1v8o001v1brpva8tsen9",  // Lesson 40 — Daniel's 70th Week (got Truth About God prompts)
  "cmpwd1v66000l1brpx5f3xxwo",  // Lesson 12 — Why God's Plan (got Universal Plan prompts)
];

function stripImages(content: string): string {
  return content
    .split("\n")
    .filter(line => !line.trim().match(/^!\[[^\]]*\]\([^)]+\)$/))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function main() {
  for (const id of WRONG_IDS) {
    const l = await db.courseLesson.findUnique({ where: { id }, select: { title: true, content: true } });
    if (!l) { console.log(`NOT FOUND: ${id}`); continue; }
    await db.courseLesson.update({ where: { id }, data: { content: stripImages(l.content!) } });
    console.log(`✅ Cleaned: ${l.title}`);
  }
  const progress: string[] = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
  const updated = progress.filter(id => !WRONG_IDS.includes(id));
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(updated, null, 2));
  console.log(`Progress: ${progress.length} → ${updated.length} (removed ${progress.length - updated.length})`);
  await db.$disconnect();
}
main().catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
