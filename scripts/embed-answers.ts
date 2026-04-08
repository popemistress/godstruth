/**
 * Reads generated answers from lesson-answers-progress.json and embeds them
 * into each lesson's content in the DB, directly after each question line.
 *
 * Uses positional matching: the Nth answer is paired with the Nth question,
 * so exact-text matching is not required.
 *
 * Run: node_modules/.bin/tsx scripts/embed-answers.ts
 */

import { PrismaClient } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();

type QA = { question: string; answer: string };
type Progress = Record<string, { title: string; qa: QA[] }>;

function embedAnswers(content: string, qa: QA[]): string {
  // Find the questions section
  const qIdx = content.indexOf("Questions on");
  if (qIdx === -1) return content;

  const before = content.slice(0, qIdx);
  const section = content.slice(qIdx);
  const lines = section.split("\n");

  // Build a positional list of question line indices
  const questionLineIndices: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].match(/^- /)) {
      questionLineIndices.push(i);
    }
  }

  // For each question line, insert ANSWER if not already present
  // Process in reverse order so line indices stay valid
  const resultLines = [...lines];
  for (let qi = questionLineIndices.length - 1; qi >= 0; qi--) {
    const lineIdx = questionLineIndices[qi];
    const answer = qa[qi]?.answer?.trim();
    if (!answer) continue;

    // Check if the next non-blank line is already an ANSWER:
    let nextIdx = lineIdx + 1;
    while (nextIdx < resultLines.length && resultLines[nextIdx].trim() === "") {
      nextIdx++;
    }
    if (resultLines[nextIdx]?.startsWith("ANSWER: ")) {
      // Already has an answer — update it in case it changed
      resultLines[nextIdx] = `ANSWER: ${answer}`;
    } else {
      // Insert the answer immediately after the question line
      resultLines.splice(lineIdx + 1, 0, `ANSWER: ${answer}`);
    }
  }

  return before + resultLines.join("\n");
}

async function main() {
  if (!fs.existsSync("scripts/lesson-answers-progress.json")) {
    console.error("No progress file found. Run generate-lesson-answers.ts first.");
    process.exit(1);
  }

  const progress: Progress = JSON.parse(
    fs.readFileSync("scripts/lesson-answers-progress.json", "utf-8")
  );

  const entries = Object.entries(progress);
  console.log(`Embedding answers for ${entries.length} lessons...\n`);

  let updated = 0;

  for (const [lessonId, { title, qa }] of entries) {
    const lesson = await db.courseLesson.findUnique({ where: { id: lessonId } });
    if (!lesson?.content) {
      console.log(`  ⚠️  Not found: ${title}`);
      continue;
    }

    const newContent = embedAnswers(lesson.content, qa);
    if (newContent === lesson.content) {
      console.log(`  — No changes: ${title}`);
      continue;
    }

    await db.courseLesson.update({
      where: { id: lessonId },
      data: { content: newContent },
    });
    updated++;
    console.log(`  ✅  ${title}`);
  }

  console.log(`\nDone. Updated ${updated} lessons.`);
  await db.$disconnect();
}

main();
