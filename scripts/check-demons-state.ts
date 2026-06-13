import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const course = await db.content.findFirst({
    where: { slug: "demons" },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: { lessons: { orderBy: { order: "asc" }, select: { order: true, title: true, type: true } } },
      },
    },
  });

  if (!course) { console.log("No 'demons' course found"); return; }
  console.log(`Course: ${course.title} (slug: ${course.slug})\n`);

  for (const ch of course.chapters) {
    console.log(`Chapter [${ch.order}] ${ch.title} (id: ${ch.id})`);
    for (const l of ch.lessons.slice(0, 5)) {
      console.log(`  [${l.order}] ${l.type} — ${l.title}`);
    }
    if (ch.lessons.length > 5) console.log(`  ... +${ch.lessons.length - 5} more`);
  }
}

main().catch(console.error).finally(() => db.$disconnect());
