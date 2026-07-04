/**
 * Generate cover images for all lessons missing a coverUrl.
 *
 * Flow per lesson:
 *   1. Build a cinematic prompt from course/chapter/lesson context
 *   2. Call Recraft V4 API → get image URL
 *   3. Download image buffer
 *   4. Compress with sharp (JPEG q82, max 1600px wide)
 *   5. Upload to UploadThing via UTApi
 *   6. Save URL to db.courseLesson.coverUrl
 *
 * Progress is saved to scripts/lesson-image-progress.json so the script
 * can be safely interrupted and resumed.
 *
 * Usage:
 *   export $(grep -v '^#' .env.local | xargs)
 *   pnpm exec tsx scripts/generate-lesson-images-recraft.ts
 *
 * Optional env overrides:
 *   COURSE_SLUG=holy-spirit   — process only one course
 *   DRY_RUN=1                 — print prompts without generating
 */

import { PrismaClient } from "@prisma/client";
import { UTApi, UTFile } from "uploadthing/server";
import sharp from "sharp";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const db = new PrismaClient();
const utapi = new UTApi();

const RECRAFT_API_KEY = process.env.RECRAFT_API_KEY!;
const RECRAFT_URL = "https://external.api.recraft.ai/v1/images/generations";
const MODEL = "recraftv4";
const SIZE = "1536x768"; // 2:1 wide — best landscape for lesson headers
const DELAY_MS = 1500; // be kind to the API
const DRY_RUN = process.env.DRY_RUN === "1";
const ONLY_COURSE = process.env.COURSE_SLUG ?? null;

const PROGRESS_FILE = join(__dirname, "lesson-image-progress.json");

function loadProgress(): Set<string> {
  if (existsSync(PROGRESS_FILE)) {
    const data = JSON.parse(readFileSync(PROGRESS_FILE, "utf-8")) as string[];
    return new Set(data);
  }
  return new Set();
}

function saveProgress(done: Set<string>) {
  writeFileSync(PROGRESS_FILE, JSON.stringify([...done], null, 2));
}

// ─── Prompt builder ────────────────────────────────────────────────────────────

const COURSE_CONTEXT: Record<string, string> = {
  "gods-universal-plan-for-creation":
    "biblical cosmic history, God's sovereign plan, creation, ancient civilisations, scripture, light and glory",
  "god-the-father":
    "the Heavenly Father, divine love, fatherhood, warmth, radiant holy light, intimacy with God",
  "jesus":
    "Jesus Christ, the Savior, New Testament scene, ancient Judea, disciples, miracles, grace and truth",
  "holy-spirit":
    "the Holy Spirit, fire and wind, Pentecost, spiritual presence, dove, radiant golden light",
  "angels":
    "angels, heavenly messengers, divine beings, wings of light, celestial glory, biblical encounter",
  "satan":
    "spiritual warfare, the adversary, darkness vs light, spiritual battle, chains, temptation, biblical truth",
  "demons":
    "spiritual warfare, demonic forces, darkness overcome by light, biblical deliverance, spiritual battle",
  "hell":
    "the biblical doctrine of hell, eternal consequence, warning, fire and separation, the gravity of sin",
};

function cleanTitle(title: string): string {
  // Remove "Lesson X —", "Module X:", "Supplement X —" prefixes
  return title
    .replace(/^(Lesson|Supplement|Module|Quiz|Assignment)\s+[\w.-]+\s*[—\-–:]\s*/i, "")
    .trim();
}

function buildPrompt(
  courseSlug: string,
  chapterTitle: string,
  lessonTitle: string,
  contentSnippet: string
): string {
  const ctx = COURSE_CONTEXT[courseSlug] ?? "Christian theology, biblical study, spiritual truth";
  const clean = cleanTitle(lessonTitle);

  // Derive a scene description from the title/content
  const scene = contentSnippet
    ? contentSnippet.replace(/#+\s*/g, "").replace(/\*+/g, "").slice(0, 120).trim()
    : clean;

  return (
    `Cinematic photorealistic wide-angle photograph for a Christian course lesson titled "${clean}". ` +
    `Context: ${ctx}. ` +
    `Scene: ${scene}. ` +
    `Style: dramatic natural lighting, high production quality, spiritually evocative atmosphere, ` +
    `rich warm tones, ultra-detailed, no text, no people's faces in close-up, no UI elements.`
  );
}

// ─── Recraft API call ──────────────────────────────────────────────────────────

async function generateImage(prompt: string): Promise<Buffer> {
  const res = await fetch(RECRAFT_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RECRAFT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt, model: MODEL, n: 1, size: SIZE }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Recraft API error ${res.status}: ${err}`);
  }

  const json = (await res.json()) as { data: { url: string }[] };
  const imageUrl = json.data?.[0]?.url;
  if (!imageUrl) throw new Error("No image URL in Recraft response");

  // Download the image
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error(`Failed to download image from ${imageUrl}`);
  return Buffer.from(await imgRes.arrayBuffer());
}

// ─── Compress with sharp ───────────────────────────────────────────────────────

async function compressImage(buffer: Buffer): Promise<Buffer> {
  return sharp(buffer)
    .resize({ width: 1536, withoutEnlargement: true })
    .jpeg({ quality: 88, mozjpeg: true })
    .toBuffer();
}

// ─── Upload to UploadThing ─────────────────────────────────────────────────────

async function uploadToUT(buffer: Buffer, filename: string): Promise<string> {
  const file = new UTFile([buffer], filename, { type: "image/jpeg" });
  const result = await utapi.uploadFiles(file);
  if (result.error) throw new Error(`UploadThing error: ${result.error.message}`);
  return result.data.ufsUrl ?? result.data.url;
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!RECRAFT_API_KEY) throw new Error("RECRAFT_API_KEY is not set");

  const done = loadProgress();
  console.log(`\n🎨 Recraft V4 Lesson Image Generator`);
  console.log(`   Already processed: ${done.size} lessons\n`);

  // Fetch all courses with lessons missing coverUrl
  const courses = await db.content.findMany({
    where: {
      type: "COURSE",
      ...(ONLY_COURSE ? { slug: ONLY_COURSE } : {}),
    },
    orderBy: { order: "asc" },
    select: {
      slug: true,
      title: true,
      chapters: {
        orderBy: { order: "asc" },
        select: {
          title: true,
          lessons: {
            where: {
              coverUrl: null,
              type: { notIn: ["SUPPLEMENT", "IMAGE"] },
            },
            orderBy: { order: "asc" },
            select: {
              id: true,
              title: true,
              content: true,
              type: true,
            },
          },
        },
      },
    },
  });

  const allLessons: {
    id: string;
    title: string;
    content: string | null;
    courseSlug: string;
    chapterTitle: string;
  }[] = [];

  for (const course of courses) {
    for (const chapter of course.chapters) {
      for (const lesson of chapter.lessons) {
        if (!done.has(lesson.id)) {
          allLessons.push({
            id: lesson.id,
            title: lesson.title,
            content: lesson.content,
            courseSlug: course.slug,
            chapterTitle: chapter.title,
          });
        }
      }
    }
  }

  console.log(`Lessons to process: ${allLessons.length}\n`);
  if (allLessons.length === 0) {
    console.log("✅ All lessons already have images!");
    return;
  }

  let success = 0;
  let errors = 0;

  for (let i = 0; i < allLessons.length; i++) {
    const lesson = allLessons[i];
    const prefix = `[${i + 1}/${allLessons.length}] ${lesson.courseSlug}`;
    const contentSnippet = (lesson.content ?? "").slice(0, 150);
    const prompt = buildPrompt(
      lesson.courseSlug,
      lesson.chapterTitle,
      lesson.title,
      contentSnippet
    );

    const shortTitle = cleanTitle(lesson.title).slice(0, 50);
    console.log(`${prefix} — ${shortTitle}`);

    if (DRY_RUN) {
      console.log(`   PROMPT: ${prompt.slice(0, 120)}...\n`);
      continue;
    }

    try {
      // 1. Generate
      process.stdout.write("   generating...");
      const rawBuffer = await generateImage(prompt);
      process.stdout.write(" compressing...");

      // 2. Compress
      const compressed = await compressImage(rawBuffer);
      const kb = (compressed.length / 1024).toFixed(0);
      process.stdout.write(` uploading (${kb}KB)...`);

      // 3. Upload
      const filename = `lesson-${lesson.id}.jpg`;
      const url = await uploadToUT(compressed, filename);

      // 4. Save to DB
      await db.courseLesson.update({
        where: { id: lesson.id },
        data: { coverUrl: url },
      });

      done.add(lesson.id);
      saveProgress(done);
      success++;
      console.log(` ✅`);

      // Rate limit
      if (i < allLessons.length - 1) await new Promise((r) => setTimeout(r, DELAY_MS));
    } catch (err) {
      errors++;
      console.log(` ❌ ${(err as Error).message}`);
      // Continue — don't add to done so it retries next run
    }
  }

  console.log(`\n─────────────────────────────────────────`);
  console.log(`✅ Success: ${success}   ❌ Errors: ${errors}`);
  console.log(`Run again to retry any failures.`);
}

main().catch(console.error).finally(() => db.$disconnect());
