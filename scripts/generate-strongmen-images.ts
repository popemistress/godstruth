/**
 * generate-strongmen-images.ts
 * Generates 7 images for the new Part VI strongmen/watchers chapter
 * Usage: pnpm tsx --env-file=.env.local scripts/generate-strongmen-images.ts
 */

import fs from "fs";
import path from "path";
import https from "https";

const API_KEY = process.env.RECRAFT_API_KEY!;
if (!API_KEY) throw new Error("RECRAFT_API_KEY not set");

const OUT_DIR = path.join(process.cwd(), "public", "demons-lessons");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const TASKS = [
  {
    filename: "l17-watchers-nephilim.png",
    prompt:
      "Two hundred towering supernatural beings descending from the summit of Mount Hermon at night, ancient colossal figures making a covenant before descending to earth, stars above and a dark valley below, a sense of irreversible transgression, classical apocalyptic biblical illustration, engraving style, deep indigo sky and torchlight",
  },
  {
    filename: "l18-deception-strongmen.png",
    prompt:
      "The prophet Micaiah standing before King Ahab and four hundred false prophets in the throne room, a vast crowd of prophets in one accord behind the false vision, Micaiah alone and resolute, a demonic figure barely visible whispering through the crowd, ancient Near Eastern palace setting, classical biblical oil painting, Rembrandt chiaroscuro",
  },
  {
    filename: "l19-heart-strongmen.png",
    prompt:
      "King Saul raising a spear to hurl at the young David who plays a harp, jealous fury distorting Saul's face, three shadowy demonic figures visible only as shadows behind Saul representing jealousy pride and whoredom, grand palace interior, classical biblical oil painting, dramatic golden torchlight",
  },
  {
    filename: "l20-affliction-strongmen.png",
    prompt:
      "Adam and Eve cowering behind the trees of the Garden of Eden, hiding in fear from God's voice, the garden darkened at the edges, three spectral forms of affliction — grief, terror, and chains — emerging from the shadows, classical Renaissance painting, the beauty of the garden contrasted with the new darkness of fear and bondage",
  },
  {
    filename: "l21-body-antichrist.png",
    prompt:
      "A desperate father in a crowd holding his convulsing son before Jesus, the boy in the grip of a violent spirit, the disciples standing helpless in the background, Jesus calm and authoritative approaching, and in the far distance a robed figure preaching a subtle deception to a large crowd, split scene classical biblical painting, dramatic light and shadow",
  },
  {
    filename: "s9-global-demonology.png",
    prompt:
      "A circular composition showing five distinct church settings around the world — an African village church, a Latin American mission, an Asian house church, a Western cathedral, an indigenous community — all connected by threads of light and shadow representing the spiritual warfare common to all, illuminated world-map style with Byzantine manuscript ornamentation",
  },
  {
    filename: "s10-strongmen-guide.png",
    prompt:
      "An illuminated medieval manuscript page open to reveal twelve medallions arranged in three rows of four, each medallion containing a symbolic figure of a demonic spirit — a jealous figure with a spear, a lying tongue, a familiar spirit with an occult symbol, a crooked perverse form, a weeping figure, and others — richly colored with gold leaf borders, theological reference book aesthetic",
  },
];

function downloadImage(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (res) => {
        res.pipe(file);
        file.on("finish", () => { file.close(); resolve(); });
      })
      .on("error", (err) => { fs.unlink(dest, () => {}); reject(err); });
  });
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function generateImage(task: { filename: string; prompt: string }) {
  const dest = path.join(OUT_DIR, task.filename);
  if (fs.existsSync(dest)) { console.log(`  skip: ${task.filename}`); return; }

  const res = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: task.prompt, style: "digital_illustration", substyle: "engraving_color", width: 1365, height: 768, n: 1 }),
  });

  if (!res.ok) throw new Error(`Recraft ${res.status}: ${await res.text()}`);
  const data = (await res.json()) as { data: Array<{ url: string }> };
  const url = data.data[0]?.url;
  if (!url) throw new Error("No URL in response");
  await downloadImage(url, dest);
  console.log(`  ✓ ${task.filename}`);
}

async function main() {
  console.log(`Generating ${TASKS.length} images for Part VI...\n`);
  for (const task of TASKS) {
    try {
      await generateImage(task);
      await sleep(3000);
    } catch (err) {
      console.error(`  ✗ ${task.filename}: ${(err as Error).message}`);
      await sleep(5000);
    }
  }
  console.log("\nDone.");
}

main();
