import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const db = new PrismaClient();
const PROGRESS_FILE = "/tmp/lesson-img-progress.json";

const CHECK_TITLES = [
  "Lesson 10", "Lesson 11", "Lesson 12", "Lesson 13",
  "Lesson 19", "Lesson 37", "Lesson 38", "Lesson 39", "Lesson 40", "Lesson 41"
];

async function main() {
  const progress: string[] = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
  const progressSet = new Set(progress);

  for (const titleSearch of CHECK_TITLES) {
    const l = await db.courseLesson.findFirst({
      where: { title: { startsWith: titleSearch } },
      select: { id: true, title: true, content: true }
    });
    if (!l) continue;
    const captions = (l.content!.match(/!\[([^\]]*)\]/g) || []).map(m => m.slice(2, -1));
    const inProgress = progressSet.has(l.id);
    const hasImages = captions.length > 0;
    console.log(`${l.title}`);
    console.log(`  inProgress=${inProgress}, images=${captions.length}`);
    if (hasImages) captions.forEach(c => console.log(`    - ${c.slice(0, 80)}`));
    console.log();
  }
  await db.$disconnect();
}
main().catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
