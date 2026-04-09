import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const lessons = await db.courseLesson.findMany({
    where: { content: { not: null } },
    select: { id: true, title: true, type: true, content: true },
    take: 20,
  });

  for (const lesson of lessons) {
    console.log(`\n=== ${lesson.type}: ${lesson.title} ===`);
    // Find all parenthetical refs (current chip regex)
    const parenRefs = [...(lesson.content ?? "").matchAll(/\(([^)]{3,120}?\d+:\d+[^)]{0,100}?)\)/g)];
    // Find inline refs NOT in parens
    const inlineRefs = [...(lesson.content ?? "").matchAll(/\b((?:\d\s+)?[A-Za-z]+\.?)\s+(\d+:\d+(?:[–\-]\d+)?)/g)];

    console.log(`  Parenthetical refs found: ${parenRefs.length}`);
    parenRefs.slice(0, 3).forEach(m => console.log(`    PAREN: ${m[0].substring(0,60)}`));

    console.log(`  Inline patterns found: ${inlineRefs.length}`);
    inlineRefs.slice(0, 5).forEach(m => console.log(`    INLINE: ${m[0]}`));
  }
  await db.$disconnect();
}
main().catch(console.error);
