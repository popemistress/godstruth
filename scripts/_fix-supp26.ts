/**
 * Generate and insert images for Supplement 26 on production.
 * This lesson exists only on production, not locally.
 */
import { UTApi } from "uploadthing/server";
import * as https from "https";
import * as fs from "fs";
import { execSync } from "child_process";
import sharp from "sharp";

const RECRAFT_API_KEY = "LDPT16PMB1I4W48nWnmGSr2Hg3inkVFkjMTYCGidAdNTrKQ8gS8bhr8ksivqXmJZ";
const utapi = new UTApi();
const S = "masterful oil painting style, warm golden tones, epic biblical scene, highly detailed, museum quality";

const PROMPTS = [
  `The New Heaven and New Earth appearing, all things made new, former things passed away, ${S}`,
  `The Bride of Christ clothed in glory, eternally united with her Lord, divine marriage complete, ${S}`,
];

async function generateImage(prompt: string): Promise<string> {
  const res = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${RECRAFT_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, style: "realistic_image", size: "1536x1024" }),
  });
  const data = await res.json() as any;
  return data.data[0].url;
}

function downloadBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    https.get(url, (res) => {
      res.on("data", (c: Buffer) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

async function compressAndUpload(imageUrl: string, filename: string): Promise<string> {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const rawBuffer = await downloadBuffer(imageUrl);
      const compressed = await sharp(rawBuffer)
        .resize({ width: 1280, withoutEnlargement: true })
        .jpeg({ quality: 80, progressive: true })
        .toBuffer();
      const blob = new Blob([compressed], { type: "image/jpeg" });
      const file = new File([blob], `${filename}.jpg`, { type: "image/jpeg" });
      const result = await utapi.uploadFiles(file);
      if (result.error) throw new Error(`Upload failed: ${JSON.stringify(result.error)}`);
      return result.data.ufsUrl || (result.data as any).url;
    } catch (e) {
      if (attempt < 3) {
        console.log(`Retry ${attempt}...`);
        await new Promise((r) => setTimeout(r, 5000));
      } else throw e;
    }
  }
  throw new Error("unreachable");
}

function insertImages(content: string, entries: { url: string; caption: string }[]): string {
  const lines = content.split("\n");
  const blankLines: number[] = [];
  for (let i = 1; i < lines.length - 1; i++) {
    if (lines[i].trim() === "" && lines[i - 1].trim() !== "" && lines[i + 1].trim() !== "") {
      if (!/^(Questions on|Q\d+\.|A\.|---)/i.test(lines[i + 1].trim())) {
        blankLines.push(i);
      }
    }
  }
  if (blankLines.length < entries.length) return content;
  const step = Math.floor(blankLines.length / (entries.length + 1));
  const insertAt = entries.map((_, i) => blankLines[(i + 1) * step]);
  const toInsert = entries.map((e) => `\n![${e.caption}](${e.url})\n`);
  const sorted = insertAt.map((pos, i) => ({ pos, text: toInsert[i] })).sort((a, b) => b.pos - a.pos);
  for (const { pos, text } of sorted) lines.splice(pos, 0, text);
  return lines.join("\n");
}

async function main() {
  // Get prod content via psql file
  const rawContent = fs.readFileSync("/tmp/supp26-content.txt", "utf8").trim();

  const entries: { url: string; caption: string }[] = [];
  for (let i = 0; i < PROMPTS.length; i++) {
    console.log(`Generating image ${i + 1}/${PROMPTS.length}...`);
    const recraftUrl = await generateImage(PROMPTS[i]);
    console.log(`Generated: ${recraftUrl.slice(0, 60)}`);
    const uploaded = await compressAndUpload(recraftUrl, `supp26-img${i + 1}`);
    console.log(`Uploaded: ${uploaded}`);
    entries.push({ url: uploaded, caption: PROMPTS[i].split(",")[0].trim() });
    if (i < PROMPTS.length - 1) await new Promise((r) => setTimeout(r, 3500));
  }

  const newContent = insertImages(rawContent, entries);
  const imgCount = (newContent.match(/^!\[/gm) || []).length;
  console.log(`Inserted ${imgCount} images`);

  // Write SQL
  const safeContent = newContent.replace(/\$body\$/g, "\\$body\\$");
  const sql = [
    "BEGIN;",
    `UPDATE "CourseLesson"`,
    `  SET "content" = $body$${safeContent}$body$`,
    `  WHERE "title" = 'Supplement 26 — For Lessons 51 & 52';`,
    "COMMIT;",
  ].join("\n");

  fs.writeFileSync("/tmp/fix-supp26.sql", sql, "utf8");
  console.log(`SQL written (${(fs.statSync("/tmp/fix-supp26.sql").size / 1024).toFixed(1)} KB)`);

  execSync("rsync -az /tmp/fix-supp26.sql web:/tmp/fix-supp26.sql", { stdio: "inherit" });
  execSync(
    `ssh web "docker exec -i godstruth_postgres psql -U multipledevsites1 -d godstruth < /tmp/fix-supp26.sql"`,
    { stdio: "inherit" }
  );
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
