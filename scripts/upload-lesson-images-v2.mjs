#!/usr/bin/env node
/**
 * upload-lesson-images-v2.mjs
 * Upload compressed lesson images to UploadThing using UTApi.uploadFiles()
 * Reads: scripts/lesson-images-v2.json (manifest with file paths)
 * Writes: scripts/lesson-images-v2-ut.json (UploadThing URLs)
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { UTApi, UTFile } from "uploadthing/server";

const envText = readFileSync(".env.local", "utf8");
let UPLOADTHING_TOKEN = "";
for (const line of envText.split("\n")) {
  const m = line.match(/^UPLOADTHING_TOKEN=(.+)$/);
  if (m) { UPLOADTHING_TOKEN = m[1].trim().replace(/^["']|["']$/g, ""); break; }
}
if (!UPLOADTHING_TOKEN) { console.error("UPLOADTHING_TOKEN missing"); process.exit(1); }

const manifest = JSON.parse(readFileSync("scripts/lesson-images-v2.json", "utf8"));
const images = manifest.images || [];

const UT_FILE = "scripts/lesson-images-v2-ut.json";
let progress = existsSync(UT_FILE) ? JSON.parse(readFileSync(UT_FILE, "utf8")) : { images: [] };
const doneIndices = new Set(progress.images.map(img => img.index));
function save() { writeFileSync(UT_FILE, JSON.stringify(progress, null, 2)); }

const utapi = new UTApi({ token: UPLOADTHING_TOKEN });

console.log("\n╔══════════════════════════════════════════════════════╗");
console.log("║  Upload Compressed Images → UploadThing             ║");
console.log("╚══════════════════════════════════════════════════════╝\n");
console.log(`Uploading ${images.length} images...\n`);

const { readFileSync: readFile } = await import("fs");

for (const img of images) {
  if (doneIndices.has(img.index)) {
    console.log(`  [${String(img.index + 1).padStart(2, "0")}] SKIP ${img.tag}`);
    continue;
  }

  process.stdout.write(`  [${String(img.index + 1).padStart(2, "0")}] ${img.tag.padEnd(25)}...`);

  try {
    const fileBytes = readFile(img.file);
    const fileName = `gt-img-${img.index.toString().padStart(2, "0")}-${img.tag}.jpg`;
    const utFile = new UTFile([fileBytes], fileName, { type: "image/jpeg" });
    const res = await utapi.uploadFiles(utFile);

    const utUrl = res?.data?.ufsUrl || res?.data?.url || null;
    if (!utUrl) throw new Error(res?.error?.message || "no URL returned");

    progress.images.push({ index: img.index, tag: img.tag, utUrl });
    save();
    console.log(` ✓  ${utUrl.slice(0, 55)}…`);
  } catch (err) {
    console.log(` ✗  ${err.message}`);
  }
}

console.log(`\nUploaded: ${progress.images.length}/${images.length}`);
console.log("Next: python3 scripts/apply-lesson-images-v2.py\n");
