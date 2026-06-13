/**
 * Final cleanup: remove wrong images from Lesson 13, and remove ALL lessons
 * that are in the progress file but have zero images (so they get re-processed).
 */
import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const db = new PrismaClient();
const PROGRESS_FILE = "/tmp/lesson-img-progress.json";

function stripImages(content: string): string {
  return content
    .split("\n")
    .filter(line => !line.trim().match(/^!\[[^\]]*\]\([^)]+\)$/))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

async function main() {
  const progress: string[] = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));

  // Find all lessons in progress that have no images OR wrong prompts
  const toRemove: string[] = [];
  for (const id of progress) {
    const l = await db.courseLesson.findUnique({
      where: { id },
      select: { id: true, title: true, content: true }
    });
    if (!l) continue;
    
    const hasImages = l.content?.includes("![") ?? false;
    
    if (!hasImages) {
      // In progress but no images — cleanup script removed images but forgot to remove from progress
      console.log(`  🔄  Remove from progress (no images): ${l.title}`);
      toRemove.push(id);
    } else {
      // Spot-check for wrong prompts (Lesson 1/3/4 generic phrases in wrong lessons)
      const isLesson1Theme = l.content!.includes("Breathtaking cosmic creation") && 
        !l.title.includes("Lesson 1") && !l.title.includes("Supplement 1");
      const isLesson4Theme = l.content!.includes("Majestic divine throne room") && 
        !l.title.includes("Lesson 4") && !l.title.includes("Supplement 2") && 
        !l.title.includes("Lesson 27"); // Trinity might use throne imagery
      const isLesson3Theme = l.content!.includes("Ancient Dead Sea Scrolls being carefully") && 
        !l.title.includes("Lesson 3") && !l.title.includes("Supplement 2");
      
      if (isLesson1Theme || isLesson4Theme || isLesson3Theme) {
        console.log(`  ❌  Wrong prompts, cleaning: ${l.title}`);
        await db.courseLesson.update({ where: { id }, data: { content: stripImages(l.content!) } });
        toRemove.push(id);
      }
    }
  }

  const updated = progress.filter(id => !toRemove.includes(id));
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(updated, null, 2));
  console.log(`\nProgress: ${progress.length} → ${updated.length} (removed ${toRemove.length})`);
  await db.$disconnect();
}
main().catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
