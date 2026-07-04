import sharp from "sharp";
import { readdirSync, statSync, renameSync } from "fs";
import { join, extname, basename } from "path";

const PUBLIC_DIR = join(__dirname, "../public");

function walk(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

const IMAGE_EXTS = new Set([".png", ".jpg", ".jpeg", ".webp"]);

async function compress(filePath: string) {
  const ext = extname(filePath).toLowerCase();
  if (!IMAGE_EXTS.has(ext)) return;

  const beforeBytes = statSync(filePath).size;
  const tmp = filePath + ".tmp";

  const img = sharp(filePath);
  const meta = await img.metadata();

  // Max dimension 1600px (course covers don't need more)
  const needsResize = (meta.width ?? 0) > 1600 || (meta.height ?? 0) > 1600;
  const pipeline = needsResize
    ? img.resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true })
    : img;

  if (ext === ".png") {
    await pipeline.png({ quality: 90, compressionLevel: 6 }).toFile(tmp);
  } else if (ext === ".jpg" || ext === ".jpeg") {
    await pipeline.jpeg({ quality: 88, mozjpeg: true }).toFile(tmp);
  } else if (ext === ".webp") {
    await pipeline.webp({ quality: 88, effort: 4 }).toFile(tmp);
  }

  const afterBytes = statSync(tmp).size;
  const saved = beforeBytes - afterBytes;
  const pct = ((saved / beforeBytes) * 100).toFixed(1);

  if (afterBytes < beforeBytes) {
    renameSync(tmp, filePath);
    console.log(`✅ ${basename(filePath).padEnd(40)} ${(beforeBytes/1024).toFixed(0).padStart(6)}KB → ${(afterBytes/1024).toFixed(0).padStart(6)}KB  (-${pct}%)`);
  } else {
    // Already optimal — keep original
    const { unlinkSync } = await import("fs");
    unlinkSync(tmp);
    console.log(`⏭  ${basename(filePath).padEnd(40)} ${(beforeBytes/1024).toFixed(0).padStart(6)}KB  (already optimal)`);
  }
}

async function main() {
  const files = walk(PUBLIC_DIR);
  let totalBefore = 0;
  let totalAfter = 0;

  for (const f of files) {
    const ext = extname(f).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) continue;
    totalBefore += statSync(f).size;
  }

  console.log(`\nCompressing ${files.filter(f => IMAGE_EXTS.has(extname(f).toLowerCase())).length} images in public/\n`);

  for (const f of files) {
    const ext = extname(f).toLowerCase();
    if (!IMAGE_EXTS.has(ext)) continue;
    await compress(f);
    totalAfter += statSync(f).size;
  }

  const savedMB = ((totalBefore - totalAfter) / 1024 / 1024).toFixed(1);
  const pct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  console.log(`\nTotal: ${(totalBefore/1024/1024).toFixed(1)}MB → ${(totalAfter/1024/1024).toFixed(1)}MB  saved ${savedMB}MB (${pct}%)`);
}

main().catch(console.error);
