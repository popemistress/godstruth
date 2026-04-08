/**
 * Generates answers for every study question in every lesson/supplement.
 * Uses the lesson content as the source of truth.
 * Saves progress after each lesson so it can be resumed if interrupted.
 *
 * Run: ANTHROPIC_API_KEY=sk-ant-... node_modules/.bin/tsx scripts/generate-lesson-answers.ts
 */

import { PrismaClient } from "@prisma/client";
import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";

const db = new PrismaClient();
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const PROGRESS_FILE = "scripts/lesson-answers-progress.json";

type QA = { question: string; answer: string };
type Progress = Record<string, { title: string; qa: QA[] }>;

function loadProgress(): Progress {
  try {
    return JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf-8"));
  } catch {
    return {};
  }
}

function extractQuestions(content: string): string[] {
  const idx = content.indexOf("Questions on");
  if (idx === -1) return [];
  const section = content.slice(idx);
  const matches = section.match(/^- (.+)$/gm) ?? [];
  // Strip any existing ANSWER lines that may already be in the content
  return matches.map((m) => m.replace(/^- /, "").trim()).filter(Boolean);
}

async function generateAnswers(
  title: string,
  content: string,
  questions: string[]
): Promise<QA[]> {
  const prompt = `You are a biblical studies teacher working through the course "${title}".

Using ONLY the information provided in the lesson content below, write a clear and concise answer (2–5 sentences) for each study question. Base your answers directly on what the lesson teaches. Where the lesson cites scripture references, include the same references in your answer. Do not invent or import information that is not in the lesson.

LESSON: ${title}

--- LESSON CONTENT (use this as your only source) ---
${content.slice(0, 9000)}
--- END CONTENT ---

STUDY QUESTIONS:
${questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}

Return ONLY a valid JSON array — no markdown, no explanation:
[{"question": "exact question text", "answer": "your answer here"}, ...]`;

  const response = await client.messages.create({
    model: "claude-opus-4-6",
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const text = (response.content[0] as { text: string }).text;
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("No JSON array found in response");
  return JSON.parse(jsonMatch[0]) as QA[];
}

async function main() {
  const progress = loadProgress();

  const lessons = await db.courseLesson.findMany({
    where: { content: { contains: "Questions on" } },
    orderBy: { order: "asc" },
  });

  console.log(`Found ${lessons.length} lessons/supplements with question sections.\n`);

  let done = 0;
  let skipped = 0;

  for (const lesson of lessons) {
    if (progress[lesson.id]) {
      skipped++;
      continue;
    }

    const questions = extractQuestions(lesson.content ?? "");
    if (questions.length === 0) {
      skipped++;
      continue;
    }

    process.stdout.write(`[${done + skipped + 1}/${lessons.length}] ${lesson.title} (${questions.length} questions)... `);

    try {
      const qa = await generateAnswers(lesson.title, lesson.content ?? "", questions);
      progress[lesson.id] = { title: lesson.title, qa };
      fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
      console.log(`✅ ${qa.length} answers`);
      done++;
    } catch (e) {
      console.log(`❌ Error: ${(e as Error).message}`);
    }

    // Small pause between requests
    await new Promise((r) => setTimeout(r, 800));
  }

  console.log(`\nDone. Generated answers for ${done} lessons (${skipped} skipped/already done).`);
  console.log(`Progress saved to: ${PROGRESS_FILE}`);
  console.log(`\nNext step: node_modules/.bin/tsx scripts/embed-answers.ts`);
  await db.$disconnect();
}

main();
