import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

function stripLeadingHeaders(md: string): string {
  const lines = md.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trim();
    if (line === "" || /^[-*_]{3,}$/.test(line)) { i++; continue; }
    if (/^\d+\.\s+[A-Z][A-Z\s\-&'''':,–]+$/.test(line)) { i++; continue; }
    if (/^LESSON\s+[A-Z-]+$/i.test(line)) { i++; continue; }
    if (/^Supplement\s+[A-Za-z-]+$/i.test(line)) { i++; continue; }
    if (/^For Lessons?\s+/i.test(line)) { i++; continue; }
    if (/^PART\s+[IVX]+\s*:/i.test(line)) { i++; continue; }
    if (/^\(LESSONS?\s+\d+[–\-]\d+\)/i.test(line)) { i++; continue; }
    if (/^[A-Z][A-Z\s\-&'''':,–?()/]+$/.test(line) && !/^[IVX]{1,6}\.\s/.test(line)) { i++; continue; }
    break;
  }
  return lines.slice(i).join("\n");
}

async function main() {
  const lessons = await db.courseLesson.findMany({
    where: { type: { not: "IMAGE" } },
    select: { id: true, title: true, content: true },
  });

  let problems = 0;
  const remaining: string[] = [];
  for (const lesson of lessons) {
    if (!lesson.content) continue;
    const stripped = stripLeadingHeaders(lesson.content);
    const firstLine = stripped.trim().split("\n")[0]?.slice(0, 90) ?? "";
    const linesStripped = lesson.content.split("\n").length - stripped.split("\n").length;
    if (stripped.trim().length < 100) {
      console.log(`❌ PROBLEM: "${lesson.title}" — almost all content stripped!`);
      problems++;
    } else if (/^[A-Z][A-Z\s\-&'''':,–?()/]*$/.test(firstLine) && !/^[IVX]{1,6}\.\s/.test(firstLine)) {
      remaining.push(`  ⚠  "${lesson.title}" — still starts all-caps: "${firstLine}"`);
    }
  }
  if (remaining.length) {
    console.log("\nRemaining all-caps first lines:");
    remaining.forEach(l => console.log(l));
  }
  if (problems === 0 && remaining.length === 0) console.log("All lessons OK ✅");
  await db.$disconnect();
}
main().catch(e => { console.error(e); process.exit(1); });
