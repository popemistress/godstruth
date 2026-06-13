import { PrismaClient } from "@prisma/client";
import { execSync } from "child_process";
import * as fs from "fs";

const db = new PrismaClient();

async function main() {
  const lesson = await db.courseLesson.findFirst({
    where: { title: "Lesson 1 — God's Plan for Man" },
    select: { title: true, content: true },
  });

  if (!lesson?.content) {
    console.log("Lesson 1 not found locally");
    return;
  }

  const safeContent = lesson.content.replace(/\$body\$/g, "\\$body\\$");
  const sql = [
    "BEGIN;",
    `UPDATE "CourseLesson"`,
    `  SET "content" = $body$${safeContent}$body$`,
    `  WHERE "title" = 'Lesson 1 — God''s Universal Plan for Creation';`,
    "COMMIT;",
  ].join("\n");

  fs.writeFileSync("/tmp/fix-lesson1-prod.sql", sql, "utf8");
  console.log(`SQL written (${(fs.statSync("/tmp/fix-lesson1-prod.sql").size / 1024).toFixed(1)} KB)`);

  execSync("rsync -az /tmp/fix-lesson1-prod.sql web:/tmp/fix-lesson1-prod.sql", { stdio: "inherit" });
  execSync(
    `ssh web "docker exec -i godstruth_postgres psql -U multipledevsites1 -d godstruth < /tmp/fix-lesson1-prod.sql"`,
    { stdio: "inherit" }
  );
  console.log("Done");
  await db.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
