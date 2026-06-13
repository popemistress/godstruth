#!/usr/bin/env node
/**
 * apply-lesson-images.js
 * ──────────────────────
 * 1. Reads lesson-images.json (Recraft-generated URLs)
 * 2. Uploads each image to UploadThing via UTApi.uploadFilesFromUrl()
 * 3. Updates CourseLesson records in PostgreSQL:
 *    - coverUrl  ← hero image URL (one per lesson)
 *    - content   ← appends section image ![alt](url) markers at end
 *
 * Run: node scripts/apply-lesson-images.js
 */

const fs = require("fs");
const path = require("path");
const { UTApi } = require("uploadthing/server");
const { Client } = require("pg");

// ── Load env ──────────────────────────────────────────────────────────────────
const envText = fs.readFileSync(".env.local", "utf8");
const env = {};
for (const line of envText.splitlines ? envText.split("\n") : envText.split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
}

const UPLOADTHING_TOKEN = env.UPLOADTHING_TOKEN;
const DATABASE_URL = env.DATABASE_URL?.replace(/\?.*/, "");

if (!UPLOADTHING_TOKEN) { console.error("UPLOADTHING_TOKEN missing"); process.exit(1); }
if (!DATABASE_URL) { console.error("DATABASE_URL missing"); process.exit(1); }

// ── Load image data ───────────────────────────────────────────────────────────
const imageData = JSON.parse(fs.readFileSync("scripts/lesson-images.json", "utf8"));
const { section_images: sectionImages, hero_images: heroImages } = imageData;

const UPLOAD_PROGRESS = "scripts/lesson-images-upload-progress.json";
let uploadProgress = fs.existsSync(UPLOAD_PROGRESS)
  ? JSON.parse(fs.readFileSync(UPLOAD_PROGRESS, "utf8"))
  : { section_images: [], hero_images: {} };

function saveUploadProgress() {
  fs.writeFileSync(UPLOAD_PROGRESS, JSON.stringify(uploadProgress, null, 2));
}

// ── Upload helper ─────────────────────────────────────────────────────────────
const utapi = new UTApi({ token: UPLOADTHING_TOKEN });

async function uploadUrl(url, name) {
  try {
    const res = await utapi.uploadFilesFromUrl({ url, name });
    if (res.error) throw new Error(res.error.message);
    return res.data?.ufsUrl || res.data?.url || null;
  } catch (err) {
    console.error(`    Upload error for ${name}: ${err.message}`);
    return null;
  }
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  console.log("\n╔══════════════════════════════════════════════════════╗");
  console.log("║   Gods Truth — Upload Lesson Images to UploadThing  ║");
  console.log("╚══════════════════════════════════════════════════════╝\n");

  // Step 1: Upload section images
  console.log("── SECTION IMAGES ─────────────────────────────────────");
  for (let i = 0; i < sectionImages.length; i++) {
    if (uploadProgress.section_images[i]) {
      console.log(`  [${i + 1}/${sectionImages.length}] SKIP (already uploaded)`);
      continue;
    }
    process.stdout.write(`  [${i + 1}/${sectionImages.length}] Uploading section image ${i + 1}...`);
    const utUrl = await uploadUrl(sectionImages[i], `section-image-${i + 1}.jpg`);
    if (utUrl) {
      uploadProgress.section_images[i] = utUrl;
      saveUploadProgress();
      console.log(` ✓`);
    } else {
      console.log(` ✗ FAILED`);
    }
  }

  // Step 2: Upload hero images
  console.log("\n── HERO IMAGES ────────────────────────────────────────");
  for (const [num, recraftUrl] of Object.entries(heroImages)) {
    if (uploadProgress.hero_images[num]) {
      console.log(`  [L${num.padStart(2)}] SKIP`);
      continue;
    }
    process.stdout.write(`  [L${num.padStart(2, " ")}] Uploading hero...`);
    const utUrl = await uploadUrl(recraftUrl, `lesson-${num}-hero.jpg`);
    if (utUrl) {
      uploadProgress.hero_images[num] = utUrl;
      saveUploadProgress();
      console.log(` ✓`);
    } else {
      console.log(` ✗ FAILED`);
    }
  }

  const sectionDone = uploadProgress.section_images.filter(Boolean).length;
  const heroDone = Object.keys(uploadProgress.hero_images).length;
  console.log(`\n  Section images uploaded: ${sectionDone}/${sectionImages.length}`);
  console.log(`  Hero images uploaded:    ${heroDone}/${Object.keys(heroImages).length}\n`);

  if (sectionDone === 0 && heroDone === 0) {
    console.error("No images uploaded. Aborting DB update.");
    process.exit(1);
  }

  // Step 3: Apply to database
  console.log("── APPLYING TO DATABASE ───────────────────────────────");
  const db = new Client({ connectionString: DATABASE_URL });
  await db.connect();

  // Get the course content ID for gods-universal-plan-for-creation
  const { rows: courseRows } = await db.query(
    `SELECT id FROM "Content" WHERE slug = $1 LIMIT 1`,
    ["gods-universal-plan-for-creation"]
  );
  if (!courseRows.length) {
    console.error("Course not found in DB");
    await db.end();
    process.exit(1);
  }
  const courseId = courseRows[0].id;
  console.log(`  Course ID: ${courseId}`);

  // Get all READING lessons ordered by order field
  const { rows: lessons } = await db.query(
    `SELECT cl.id, cl.title, cl.type, cl."order", cl.content
     FROM "CourseLesson" cl
     JOIN "CourseChapter" cc ON cc.id = cl."chapterId"
     WHERE cc."contentId" = $1 AND cl.type = 'READING'
     ORDER BY cc."order", cl."order"`,
    [courseId]
  );
  console.log(`  Found ${lessons.length} READING lessons`);

  // Build section image markdown block to append to each lesson's content
  const utSectionImages = uploadProgress.section_images.filter(Boolean);
  const sectionImageMarkdown = utSectionImages.length > 0
    ? "\n\n" + utSectionImages.map((url, i) => `![Biblical scene ${i + 1}](${url})`).join("\n")
    : "";

  let heroUpdated = 0;
  let sectionUpdated = 0;

  for (let idx = 0; idx < lessons.length; idx++) {
    const lesson = lessons[idx];
    const lessonNum = String(idx + 1);
    const heroUrl = uploadProgress.hero_images[lessonNum];
    const currentContent = lesson.content || "";

    // Only append section images if not already present
    const alreadyHasSectionImages = currentContent.includes("Biblical scene 1");
    const newContent = alreadyHasSectionImages
      ? currentContent
      : currentContent + sectionImageMarkdown;

    if (heroUrl) {
      await db.query(
        `UPDATE "CourseLesson" SET "coverUrl" = $1, content = $2 WHERE id = $3`,
        [heroUrl, newContent, lesson.id]
      );
      heroUpdated++;
    } else if (!alreadyHasSectionImages && sectionImageMarkdown) {
      await db.query(
        `UPDATE "CourseLesson" SET content = $1 WHERE id = $2`,
        [newContent, lesson.id]
      );
    }
    sectionUpdated++;

    if ((idx + 1) % 10 === 0) console.log(`  ... ${idx + 1}/${lessons.length} processed`);
  }

  // Also update SUPPLEMENT lessons with section images
  const { rows: supplements } = await db.query(
    `SELECT cl.id, cl.content
     FROM "CourseLesson" cl
     JOIN "CourseChapter" cc ON cc.id = cl."chapterId"
     WHERE cc."contentId" = $1 AND cl.type = 'SUPPLEMENT'
     ORDER BY cc."order", cl."order"`,
    [courseId]
  );
  console.log(`  Found ${supplements.length} SUPPLEMENT lessons`);

  for (const supp of supplements) {
    const currentContent = supp.content || "";
    if (currentContent.includes("Biblical scene 1")) continue;
    const newContent = currentContent + sectionImageMarkdown;
    await db.query(
      `UPDATE "CourseLesson" SET content = $1 WHERE id = $2`,
      [newContent, supp.id]
    );
  }

  await db.end();

  console.log(`\n  Hero images applied:    ${heroUpdated}`);
  console.log(`  Section images appended: ${sectionUpdated} READING + ${supplements.length} SUPPLEMENT lessons`);
  console.log("\n✓ Done! Run push-db-to-prod.sh to sync to production.\n");
})();
