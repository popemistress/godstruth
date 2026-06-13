import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
const db = new PrismaClient();
const PROGRESS_FILE = "/tmp/lesson-img-progress.json";

async function main() {
  const progress: string[] = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8"));
  const toRemove: string[] = [];
  
  for (const id of progress) {
    const l = await db.courseLesson.findUnique({ where: { id }, select: { title: true, content: true } });
    if (!l) continue;
    
    const images = (l.content?.match(/!\[([^\]]*)\]/g)||[]).map(m => m.slice(2,-1));
    if (images.length === 0) {
      console.log(`  NO IMAGES: ${l.title} → REMOVE FROM PROGRESS`);
      toRemove.push(id);
    }
  }
  
  if (toRemove.length > 0) {
    const updated = progress.filter(id => !toRemove.includes(id));
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(updated, null, 2));
    console.log(`\nRemoved ${toRemove.length}, ${updated.length} remain in progress.`);
  } else {
    console.log(`All ${progress.length} progress items have images — OK.`);
  }
  await db.$disconnect();
}
main().catch(async e => { console.error(e); await db.$disconnect(); process.exit(1); });
