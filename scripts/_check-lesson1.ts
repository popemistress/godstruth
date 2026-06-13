import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();
async function main() {
  const lesson = await db.courseLesson.findUnique({
    where:{id:"cmq6612uj0003geo043mie4yb"},
    select:{title:true, content:true}
  });
  if (lesson) {
    console.log("Title:", lesson.title);
    console.log("Content preview:", lesson.content?.slice(0,200));
  } else {
    console.log("Lesson not found");
  }
}
main().finally(() => db.$disconnect());
