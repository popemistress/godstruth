import fs from "fs";
import path from "path";

const RECRAFT_API_KEY = process.env.RECRAFT_API_KEY!;
const OUT_DIR = path.join(process.cwd(), "public", "demons-lessons");

const images = [
  {
    file: "l22-ancient-occult-wicca.png",
    prompt:
      "Dark ancient stone altar in a forest clearing at night, pentagram carved in stone surrounded by candles and smoke, shadowy robed figure standing before it, moonlight through trees, foreboding atmosphere, spiritual danger, forbidden ancient knowledge",
  },
  {
    file: "l23-divination-digital-oracles.png",
    prompt:
      "Tarot cards and crystal ball on a table transforming into glowing smartphone screens and digital apps, mystical eye symbols appearing on screens, shadowy hands reaching from phone toward viewer, ancient divination meets modern technology, spiritual deception",
  },
  {
    file: "l24-witchcraft-manifesting.png",
    prompt:
      "Person surrounded by floating vision boards and manifestation affirmations, dark shadowy spirits lurking behind the images, cauldron in background, witchcraft symbols hidden within modern self-help aesthetics, serpent whispering from shadow, spiritual deception in plain sight",
  },
  {
    file: "l25-body-gateway-altered-states.png",
    prompt:
      "Human silhouette in yoga pose with serpentine energy coiling up the spine glowing with dark light, ayahuasca vine wrapped around the figure, shadowy entities emerging from altered consciousness, the body as a spiritual doorway, warning of demonic invasion",
  },
  {
    file: "l26-modern-counterfeits.png",
    prompt:
      "Church sanctuary with New Age elements hidden in plain sight: labyrinth on the floor, reiki symbols on the altar, crystals on the windowsill, enneagram diagram on the wall, candles and sage smoke, spiritual deception within Christianity, wolves in sheep's clothing",
  },
  {
    file: "l27-sexual-sin-covenant.png",
    prompt:
      "Broken marriage covenant, shattered glass showing a couple reflected in fragments, dark spiritual chains binding the pieces, silhouette of demon lurking behind the broken relationship, soul ties represented as visible glowing threads, covenant violation and spiritual consequence",
  },
  {
    file: "l28-blood-oaths-generational.png",
    prompt:
      "Masonic lodge interior seen from above, altar with compass and square, hooded figures in ritual, genealogy family tree with dark shadows spreading down through generations, blood covenant ceremony, ancient oaths binding bloodlines, generational curse visualization",
  },
  {
    file: "l29-last-days-deception.png",
    prompt:
      "Global city skyline with massive holographic alien craft hovering overhead, crowd looking up in wonder, Antichrist symbol glowing on skyscrapers, AI robots and brain chip technology visible in foreground, Halloween and false church elements merged, last days strong delusion, mark of the beast infrastructure",
  },
  {
    file: "s11-legal-ground.png",
    prompt:
      "Heavenly courtroom scene with ancient scales of justice, blood-covered gavel shattering chains, divine legal documents with demonic claims being canceled by a crimson cross, Jesus as the advocate standing before the Father, spiritual warfare as legal battle, Colossians 2:15",
  },
  {
    file: "s12-freedom-prayer.png",
    prompt:
      "Person kneeling in prayer bathed in golden light, dark spiritual chains shattering and dissolving around them, demonic figures fleeing in all directions, blood of Jesus represented as crimson light washing over the figure, complete spiritual freedom, victory in Christ, radiant deliverance",
  },
];

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateImage(prompt: string, outFile: string) {
  const res = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RECRAFT_API_KEY}`,
    },
    body: JSON.stringify({
      prompt,
      style: "digital_illustration",
      substyle: "engraving_color",
      width: 1365,
      height: 768,
      n: 1,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Recraft API error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as { data: { url: string }[] };
  const url = data.data[0].url;

  const imgRes = await fetch(url);
  if (!imgRes.ok) throw new Error(`Failed to download image: ${imgRes.status}`);

  const buf = Buffer.from(await imgRes.arrayBuffer());
  fs.writeFileSync(outFile, buf);
}

async function main() {
  if (!RECRAFT_API_KEY) {
    console.error("RECRAFT_API_KEY not set");
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  console.log(`Generating ${images.length} images for Part VII...\n`);

  for (const img of images) {
    const outFile = path.join(OUT_DIR, img.file);
    if (fs.existsSync(outFile)) {
      console.log(`  ⊙ ${img.file} (already exists, skipping)`);
      continue;
    }
    try {
      await generateImage(img.prompt, outFile);
      console.log(`  ✓ ${img.file}`);
    } catch (err) {
      console.error(`  ✗ ${img.file}: ${err}`);
      await sleep(5000);
      continue;
    }
    await sleep(3000);
  }

  console.log("\nDone.");
}

main().catch(console.error);
