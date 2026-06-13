/**
 * generate-demons-images.ts
 *
 * Generates 24 lesson/supplement images for the Demons course using the
 * Recraft v3 API (digital_illustration / classicism_art sub-style).
 * Images are saved to public/demons-lessons/.
 *
 * Usage: pnpm tsx --env-file=.env.local scripts/generate-demons-images.ts
 */

import fs from "fs";
import path from "path";
import https from "https";

const API_KEY = process.env.RECRAFT_API_KEY!;
if (!API_KEY) throw new Error("RECRAFT_API_KEY not set");

const OUT_DIR = path.join(process.cwd(), "public", "demons-lessons");
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

interface ImageTask {
  filename: string;
  prompt: string;
}

const TASKS: ImageTask[] = [
  {
    filename: "l1-what-are-demons.png",
    prompt:
      "Seven Jewish exorcists fleeing in terror from a demon-possessed man who has overpowered all of them, ancient Ephesus interior with columns, torn robes, dramatic chiaroscuro lighting, classical religious painting style, reverent and serious, deep shadows and golden torchlight",
  },
  {
    filename: "l2-lucifers-fall.png",
    prompt:
      "Lucifer cast from heaven like lightning, the most radiant of angels falling through cosmic darkness trailed by a host of fallen spirits, divine light blazing from above, apocalyptic classical oil painting, awe-inspiring scale, Renaissance style",
  },
  {
    filename: "s1-nature-origin.png",
    prompt:
      "An illuminated medieval manuscript spread open showing heaven above and a dark realm below, angels on one side and fallen spirits on the other, rich gold leaf decorations, theological diagram, Byzantine manuscript style",
  },
  {
    filename: "l3-satan-deceiver.png",
    prompt:
      "The serpent coiled in the branches of the Tree of Knowledge speaking to Eve in the Garden of Eden, subtle and intelligent, no overt horror, lush garden setting with ominous undertones, classical oil painting, pre-Raphaelite style",
  },
  {
    filename: "l4-fallen-ranks.png",
    prompt:
      "A vast hierarchical array of dark angelic beings descending from a commanding figure, arranged in ranks of principalities and powers, majestic but corrupted, Byzantine mosaic influence, dark purples and deep reds, classical religious art",
  },
  {
    filename: "s2-satan-host.png",
    prompt:
      "An illuminated scroll unrolled to reveal the many faces and names of Satan — serpent, dragon, accuser, deceiver — each depicted in a medallion with Latin inscriptions, medieval manuscript illumination style, rich blues and gold",
  },
  {
    filename: "l5-possession-oppression.png",
    prompt:
      "The Gadarene demoniac among the tombs, a powerful figure breaking chains, wild-eyed, at the moment Jesus speaks to him, tombs on a hillside with a calm lake in the distance, dramatic contrast between torment and approaching peace, classical biblical painting",
  },
  {
    filename: "l6-spirits-bondage.png",
    prompt:
      "A woman bent double for eighteen years in a synagogue, stooped and unable to straighten, Jesus reaching toward her, golden light beginning to break through the shadows that bind her, classical Renaissance painting, deep compassion and spiritual authority",
  },
  {
    filename: "s3-deliverance-cases.png",
    prompt:
      "A triptych of three biblical deliverance scenes — the Gadarene demoniac, the bent woman in the synagogue, the boy with seizures — in medallion form, illuminated manuscript style, gold borders, theological study guide aesthetic",
  },
  {
    filename: "l7-doctrines-devils.png",
    prompt:
      "A teacher in ornate ecclesiastical robes preaching to a congregation, serpentine shadows and demonic whispers woven invisibly through the words leaving his lips, early church basilica setting, classical painting, warning and discernment theme",
  },
  {
    filename: "l8-divination-occult.png",
    prompt:
      "The Witch of Endor summoning a spirit before a prostrate King Saul, dark cave illuminated by a single flame, a ghostly apparition rising from the earth, biblical classical painting style, Rembrandt chiaroscuro, solemn and ominous",
  },
  {
    filename: "s4-deception-dialogue.png",
    prompt:
      "Two scholars in a candlelit scriptorium debating across a table stacked with open books and scrolls, truth and error depicted as contrasting light and shadow falling on the books, medieval scholarly setting, classical illustration",
  },
  {
    filename: "l9-seducing-spirits.png",
    prompt:
      "A congregation in an early Christian church listening to a minister, subtle serpentine forms barely visible woven through the air around the pulpit, the congregation divided between those awakening and those asleep, classical Byzantine church interior",
  },
  {
    filename: "l10-nations-culture.png",
    prompt:
      "The angel Gabriel withstood in midair by the dark Prince of Persia above a map of ancient Persia, cosmic spiritual battle above the earthly kingdoms, Michael arriving in the distance, classical allegorical painting, dramatic heavenly warfare",
  },
  {
    filename: "s5-church-nations.png",
    prompt:
      "A diagram in illuminated manuscript style showing the church at the center, surrounded by nations, with angelic and demonic influences depicted as light and shadow pressing in from all sides, medieval cartographic style with theological annotations",
  },
  {
    filename: "l11-authority-christ.png",
    prompt:
      "A believer standing upright in a dark place, radiating light in the name of Jesus Christ, demons recoiling into the shadows, triumphant but not boastful, classical biblical painting, powerful divine authority, warm golden light against deep darkness",
  },
  {
    filename: "l12-armor-god.png",
    prompt:
      "A Roman soldier in full battle armor depicted allegorically as the armor of God — belt of truth, breastplate of righteousness, shield of faith, helmet of salvation, sword of the Spirit — each piece glowing with spiritual significance, classical allegorical illustration",
  },
  {
    filename: "s6-authority-armor.png",
    prompt:
      "The full armor of God laid out piece by piece on a stone surface, each component labeled with its spiritual meaning, illuminated manuscript style with rich Byzantine ornamentation, gold leaf accents, Ephesians 6 depicted as sacred armor",
  },
  {
    filename: "l13-deliverance-exorcism.png",
    prompt:
      "Jesus casting out a demon in the synagogue at Capernaum, the possessed man convulsing and crying out, Jesus calm and authoritative with one hand raised, ancient synagogue interior, crowd watching in stunned amazement, classical biblical painting",
  },
  {
    filename: "l14-devils-armor.png",
    prompt:
      "A powerful figure bound and overcome, his weapons scattered, a stronger figure standing over the threshold of his house, allegorical classical painting depicting the strong man parable, Matthew 12, spiritual victory theme",
  },
  {
    filename: "s7-strongholds.png",
    prompt:
      "A great dark fortress with massive walls being demolished stone by stone by divine light breaking through, chains falling, gates broken open, allegorical classical painting of spiritual strongholds overcome, triumphant and hopeful",
  },
  {
    filename: "l15-final-battle.png",
    prompt:
      "An angel with a great chain binding the dragon — Satan — and casting him into the bottomless pit, Revelation 20, apocalyptic biblical illustration, divine triumph, dramatic contrast between dark chaos and overwhelming heavenly authority, classical Revelation imagery",
  },
  {
    filename: "l16-daily-warfare.png",
    prompt:
      "A believer kneeling in morning prayer, the armor of God subtly illuminated around them, a new day breaking through a window, shadows retreating from the edges of the room, warm hopeful light, classical allegorical painting, intimate and devotional",
  },
  {
    filename: "s8-final-synthesis.png",
    prompt:
      "An illuminated scroll laid open showing three concentric rings labeled Personal, Corporate, and Cosmic warfare, each ring filled with detailed symbolic imagery of spiritual conflict and divine victory, medieval theological manuscript style, rich detail",
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
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function generateImage(task: ImageTask): Promise<void> {
  const dest = path.join(OUT_DIR, task.filename);
  if (fs.existsSync(dest)) {
    console.log(`  skip (exists): ${task.filename}`);
    return;
  }

  const body = JSON.stringify({
    prompt: task.prompt,
    style: "digital_illustration",
    substyle: "engraving_color",
    width: 1365,
    height: 768,
    n: 1,
  });

  const res = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Recraft error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { data: Array<{ url: string }> };
  const imageUrl = data.data[0]?.url;
  if (!imageUrl) throw new Error("No URL in Recraft response");

  await downloadImage(imageUrl, dest);
  console.log(`  ✓ ${task.filename}`);
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log(`Generating ${TASKS.length} Demons course images...`);
  for (const task of TASKS) {
    try {
      await generateImage(task);
      await sleep(3000); // 3 s between requests to respect rate limits
    } catch (err) {
      console.error(`  ✗ ${task.filename}: ${(err as Error).message}`);
      await sleep(5000);
    }
  }
  console.log("Done.");
}

main();
