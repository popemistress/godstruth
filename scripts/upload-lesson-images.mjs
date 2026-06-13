#!/usr/bin/env node
/**
 * upload-lesson-images.mjs
 * ─────────────────────────
 * Reads scripts/lesson-images.json (Recraft URLs)
 * Uploads each image to UploadThing via UTApi.uploadFilesFromUrl()
 * Saves UploadThing URLs to scripts/lesson-images-ut.json
 *
 * Run: node scripts/upload-lesson-images.mjs
 * Then: python3 scripts/apply-lesson-images.py
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { UTApi } from "uploadthing/server";

// ── Load env ──────────────────────────────────────────────────────────────────
const envText = readFileSync(".env.local", "utf8");
let UPLOADTHING_TOKEN = "";
for (const line of envText.split("\n")) {
  const m = line.match(/^UPLOADTHING_TOKEN=(.+)$/);
  if (m) { UPLOADTHING_TOKEN = m[1].trim().replace(/^["']|["']$/g, ""); break; }
}
if (!UPLOADTHING_TOKEN) { console.error("UPLOADTHING_TOKEN missing from .env.local"); process.exit(1); }

// ── Load source data ──────────────────────────────────────────────────────────
const imageData = JSON.parse(readFileSync("scripts/lesson-images.json", "utf8"));
const { section_images: sectionImages = [], hero_images: heroImages = {} } = imageData;

const PROGRESS_FILE = "scripts/lesson-images-ut.json";
let progress = existsSync(PROGRESS_FILE)
  ? JSON.parse(readFileSync(PROGRESS_FILE, "utf8"))
  : { section_images: [], hero_images: {} };

function save() {
  writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

const utapi = new UTApi({ token: UPLOADTHING_TOKEN });

async function upload(url, name) {
  try {
    const res = await utapi.uploadFilesFromUrl({ url, name });
    if (Array.isArray(res)) {
      const item = res[0];
      if (item?.error) throw new Error(item.error.message);
      return item?.data?.ufsUrl || item?.data?.url || null;
    }
    if (res?.error) throw new Error(res.error.message);
    return res?.data?.ufsUrl || res?.data?.url || null;
  } catch (err) {
    console.error(`  ERROR: ${err.message}`);
    return null;
  }
}

console.log("\n╔══════════════════════════════════════════════════════╗");
console.log("║   Upload Lesson Images → UploadThing                ║");
console.log("╚══════════════════════════════════════════════════════╝\n");

// Section images
console.log(`── SECTION IMAGES (${sectionImages.length} total) ───────────────────────`);
for (let i = 0; i < sectionImages.length; i++) {
  if (progress.section_images[i]) {
    console.log(`  [${i + 1}/${sectionImages.length}] SKIP`);
    continue;
  }
  process.stdout.write(`  [${i + 1}/${sectionImages.length}] Uploading...`);
  const url = await upload(sectionImages[i], `gt-section-${i + 1}.jpg`);
  if (url) {
    progress.section_images[i] = url;
    save();
    console.log(` ✓  ${url.slice(0, 60)}…`);
  } else {
    console.log(` ✗  FAILED`);
  }
}

// Hero images
const heroEntries = Object.entries(heroImages);
console.log(`\n── HERO IMAGES (${heroEntries.length} total) ──────────────────────────`);
for (const [num, recraftUrl] of heroEntries) {
  if (progress.hero_images[num]) {
    console.log(`  [L${num.padStart(2, " ")}] SKIP`);
    continue;
  }
  process.stdout.write(`  [L${num.padStart(2, " ")}] Uploading...`);
  const url = await upload(recraftUrl, `gt-lesson-${num}-hero.jpg`);
  if (url) {
    progress.hero_images[num] = url;
    save();
    console.log(` ✓`);
  } else {
    console.log(` ✗  FAILED`);
  }
}

const sDone = progress.section_images.filter(Boolean).length;
const hDone = Object.keys(progress.hero_images).length;
console.log(`\nSection images: ${sDone}/${sectionImages.length}`);
console.log(`Hero images:    ${hDone}/${heroEntries.length}`);
console.log("\nNext: python3 scripts/apply-lesson-images.py\n");
