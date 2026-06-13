#!/usr/bin/env node
/**
 * delete-lesson-images.mjs
 * Deletes all previously uploaded lesson images from UploadThing.
 */
import { readFileSync } from "fs";
import { UTApi } from "uploadthing/server";

const envText = readFileSync(".env.local", "utf8");
let UPLOADTHING_TOKEN = "";
for (const line of envText.split("\n")) {
  const m = line.match(/^UPLOADTHING_TOKEN=(.+)$/);
  if (m) { UPLOADTHING_TOKEN = m[1].trim().replace(/^["']|["']$/g, ""); break; }
}

const utapi = new UTApi({ token: UPLOADTHING_TOKEN });

const data = JSON.parse(readFileSync("scripts/lesson-images-ut.json", "utf8"));
const allUrls = [
  ...(data.section_images || []),
  ...Object.values(data.hero_images || {}),
].filter(Boolean);

const keys = allUrls
  .filter(u => u.includes("/f/"))
  .map(u => u.split("/f/")[1]);

console.log(`Deleting ${keys.length} files from UploadThing...`);

// Delete in batches of 10
for (let i = 0; i < keys.length; i += 10) {
  const batch = keys.slice(i, i + 10);
  try {
    await utapi.deleteFiles(batch);
    console.log(`  Deleted batch ${Math.floor(i/10)+1}: ${batch.length} files ✓`);
  } catch (err) {
    console.error(`  Batch ${Math.floor(i/10)+1} error: ${err.message}`);
  }
}

console.log("Done.\n");
