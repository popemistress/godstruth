import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();
const VALID_ROMAN = new Set([
  "I","II","III","IV","V","VI","VII","VIII","IX","X",
  "XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX",
]);

function countHeadings(content: string): number {
  return content.split("\n").filter((line) => {
    const t = line.trim();
    if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ")) return true;
    const m = t.match(/^([IVX]{1,5})\.\s+\S/);
    return m && VALID_ROMAN.has(m[1].toUpperCase());
  }).length;
}

function countRequiredSlots(numHeadings: number): number {
  let count = 0;
  for (let hi = 0; hi < numHeadings; hi++) {
    if ([0, 2, 5, 8].includes(hi % 9)) count++;
  }
  return count;
}

function countExistingImages(content: string): number {
  return (content.match(/^!\[/gm) ?? []).length;
}

async function main() {
  const lessons = await db.courseLesson.findMany({
    where: { type: { not: "IMAGE" } },
    orderBy: { order: "asc" },
    select: { id: true, title: true, content: true },
  });

  let totalDeficit = 0;
  let needsWork = 0;
  
  for (const lesson of lessons) {
    if (!lesson.content || lesson.content.length < 500) continue;
    const numHeadings = countHeadings(lesson.content);
    const required = countRequiredSlots(numHeadings);
    const existing = countExistingImages(lesson.content);
    const deficit = Math.max(0, required - existing);
    if (deficit > 0) {
      console.log(`  NEEDS ${deficit.toString().padStart(2)} more | ${existing}/${required} | h=${numHeadings} | ${lesson.title}`);
      totalDeficit += deficit;
      needsWork++;
    }
  }
  
  console.log(`\n${lessons.length} lessons total | ${needsWork} need more images | ${totalDeficit} total images to generate`);
  await db.$disconnect();
}

main().catch(e => { console.error(e); process.exit(1); });
