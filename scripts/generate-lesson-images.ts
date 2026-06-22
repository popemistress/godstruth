/**
 * generate-lesson-images.ts
 *
 * Generates AI images for all course lessons using the Recraft API,
 * compresses with sharp, uploads to UploadThing, and inserts
 * ![alt](url) markdown at natural section breaks.
 *
 * Skips lessons that already have images or the IMAGE type placeholder.
 * Saves progress to /tmp/lesson-img-progress.json so it can be resumed.
 *
 * Run:
 *   pnpm tsx --env-file=.env.local scripts/generate-lesson-images.ts
 */

import { UTApi } from "uploadthing/server";
import { PrismaClient } from "@prisma/client";
import sharp from "sharp";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";

const utapi = new UTApi();
const db = new PrismaClient();

const RECRAFT_KEY = process.env.RECRAFT_API_KEY;
if (!RECRAFT_KEY) {
  console.error("RECRAFT_API_KEY not set");
  process.exit(1);
}
const PROGRESS_FILE = "/tmp/lesson-img-progress.json";
const DELAY_BETWEEN_IMAGES_MS = 3500;
const DELAY_BETWEEN_LESSONS_MS = 2000;

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// ─── Progress persistence ─────────────────────────────────────────────────────

function loadProgress(): Set<string> {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8")) as string[];
      return new Set(data);
    }
  } catch {}
  return new Set();
}

function saveProgress(done: Set<string>): void {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify([...done], null, 2));
}

// ─── Recraft image generation ─────────────────────────────────────────────────

async function generateImage(prompt: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      prompt,
      style: "realistic_image",
      size: "1536x1024",
      n: 1,
    });

    const options = {
      hostname: "external.api.recraft.ai",
      path: "/v1/images/generations",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RECRAFT_KEY}`,
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Recraft HTTP ${res.statusCode}: ${data}`));
          return;
        }
        try {
          const json = JSON.parse(data);
          const url = json?.data?.[0]?.url;
          if (!url) reject(new Error(`No URL in response: ${data}`));
          else resolve(url);
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

// ─── HTTP download ────────────────────────────────────────────────────────────

async function downloadBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const get = url.startsWith("https") ? https.get : http.get;
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        downloadBuffer(res.headers.location!).then(resolve).catch(reject);
        return;
      }
      const chunks: Buffer[] = [];
      res.on("data", (c) => chunks.push(c));
      res.on("end", () => resolve(Buffer.concat(chunks)));
      res.on("error", reject);
    }).on("error", reject);
  });
}

// ─── Compress + upload ────────────────────────────────────────────────────────

async function compressAndUpload(
  imageUrl: string,
  filename: string
): Promise<string> {
  const rawBuffer = await downloadBuffer(imageUrl);

  // Resize to max 1280px wide, convert to JPEG at quality 80 (~200-400 KB)
  const compressed = await sharp(rawBuffer)
    .resize({ width: 1280, withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true })
    .toBuffer();

  const blob = new Blob([compressed], { type: "image/jpeg" });
  const file = new File([blob], `${filename}.jpg`, { type: "image/jpeg" });

  const result = await utapi.uploadFiles(file);
  if (result.error) throw new Error(`Upload failed: ${JSON.stringify(result.error)}`);
  return result.data.ufsUrl || result.data.url;
}

// ─── Content insertion ────────────────────────────────────────────────────────

/**
 * Find natural insertion points in lesson content and insert image markdown.
 * Images are distributed evenly through the body, before the Questions section.
 */
function insertImages(
  content: string,
  entries: { url: string; caption: string }[]
): string {
  const lines = content.split("\n");

  // Find the Questions section boundary
  const questionsIdx = lines.findIndex((l) =>
    /^Questions on (Lesson|Supplement)/i.test(l.trim())
  );
  const bodyEnd = questionsIdx > 10 ? questionsIdx : lines.length;

  // Find blank lines after paragraph blocks — good insertion spots
  const blankLineIdxs: number[] = [];
  for (let i = 1; i < bodyEnd - 1; i++) {
    if (
      lines[i].trim() === "" &&
      lines[i - 1].trim() !== "" &&
      lines[i + 1].trim() !== ""
    ) {
      blankLineIdxs.push(i);
    }
  }

  const n = entries.length;
  const insertAt: number[] = [];

  if (blankLineIdxs.length >= n) {
    // Evenly space across blank lines
    const step = Math.floor(blankLineIdxs.length / (n + 1));
    for (let j = 1; j <= n; j++) {
      const idx = blankLineIdxs[Math.min(j * step, blankLineIdxs.length - 1)];
      insertAt.push(idx);
    }
  } else {
    // Fall back to rough thirds of content
    for (let j = 1; j <= n; j++) {
      insertAt.push(Math.floor((bodyEnd * j) / (n + 1)));
    }
  }

  // Deduplicate and sort descending so splices don't shift subsequent indices
  const unique = [...new Set(insertAt)].sort((a, b) => b - a);
  for (let j = 0; j < unique.length; j++) {
    const entry = entries[unique.length - 1 - j]; // match order after reverse sort
    const imgLine = `\n![${entry.caption}](${entry.url})\n`;
    lines.splice(unique[j], 0, imgLine);
  }

  return lines.join("\n");
}

// ─── Heading / image counters ────────────────────────────────────────────────

const VALID_ROMAN = new Set([
  "I","II","III","IV","V","VI","VII","VIII","IX","X",
  "XI","XII","XIII","XIV","XV","XVI","XVII","XVIII","XIX","XX",
]);

function countHeadings(content: string): number {
  return content.split("\n").filter((line) => {
    const t = line.trim();
    if (line.startsWith("# ") || line.startsWith("## ") || line.startsWith("### ")) return true;
    const m = t.match(/^([IVX]{1,5})\.\s+\S/);
    return m && VALID_ROMAN.has(m[1].toUpperCase());
  }).length;
}

// Mirrors the slot pattern in LessonContent.tsx: hi % 9 in [0,2,5,8]
function countRequiredSlots(numHeadings: number): number {
  let count = 0;
  for (let hi = 0; hi < numHeadings; hi++) {
    if ([0, 2, 5, 8].includes(hi % 9)) count++;
  }
  return count;
}

function countExistingImages(content: string): number {
  return (content.match(/^!\[/gm) ?? []).length;
}

// ─── Prompt library ───────────────────────────────────────────────────────────

const S = "photorealistic, highly detailed, cinematic lighting, 8K quality";

function getPrompts(title: string): string[] {
  const t = title.toLowerCase();
  // Extract exact lesson/supplement number to avoid substring false-matches
  // e.g. "Lesson 37" would incorrectly satisfy t.includes("lesson 3")
  const lessonNum = (() => {
    const m = title.match(/^Lesson\s+(\d+)\b/);
    return m ? parseInt(m[1], 10) : 0;
  })();

  if (t.includes("supplement")) {
    const n = parseInt(title.match(/supplement\s*(\d+)/i)?.[1] ?? "0", 10);
    const supp: Record<number, string[]> = {
      1: [
        `Sacred Bible study with ancient manuscripts and divine light, golden candlelight on open scripture, ${S}`,
        `God's eternal blueprint displayed as an illuminated cosmic map from creation to eternity, ${S}`,
      ],
      2: [
        `Scholar interpreting ancient biblical texts in a candlelit library, cross-references in Hebrew and Greek, ${S}`,
        `Divine attributes of God represented as brilliant light splitting into omniscience omnipotence omnipresence, ${S}`,
      ],
      3: [
        `Majestic heavenly throne room with radiant divine light, angelic worship, and celestial order, ${S}`,
        `Eternal spiritual realm before creation, holy beings ministering around God's throne in reverent worship, ${S}`,
      ],
      4: [
        `Magnificent angelic beings ministering before God's throne, heavenly host, celestial architecture, ${S}`,
        `The re-creation of earth, divine light separating from darkness on the first day, Genesis 1, ${S}`,
      ],
      5: [
        `Pristine Garden of Eden at golden hour, Adam walking with God in cool of day, innocent paradise, ${S}`,
        `Divine provision overflowing, abundant harvest, God meeting every need of man, pastoral biblical scene, ${S}`,
      ],
      6: [
        `Noah preaching righteousness to pre-flood civilization, building the ark, warning of judgment, ${S}`,
        `The great flood receding, rainbow covenant in sky, earth beginning again, divine mercy, ${S}`,
      ],
      7: [
        `Tower of Babel under construction with divine confusion descending, languages scattering nations, ${S}`,
        `Jesus healing the paralyzed man at the pool, miraculous restoration, divine compassion, ${S}`,
      ],
      8: [
        `Abraham beneath the stars, God confirming the covenant of promise, as many as the stars, ${S}`,
        `Believer kneeling in persistent prayer, divine light descending in answer, faith receiving, ${S}`,
      ],
      9: [
        `Moses receiving the Law on Sinai amid fire and thunder, divine legislation for Israel, ${S}`,
        `The Tabernacle in the wilderness, sacred furniture and divine presence, priestly ministry, ${S}`,
      ],
      10: [
        `Pentecost fire falling on 120 disciples, birth of the New Testament church, amazing grace, ${S}`,
        `Early Christian church growing rapidly, believers added daily, New Testament program unfolding, ${S}`,
      ],
      11: [
        `Jesus transfigured on the mountain, brilliant divine glory revealed, Moses and Elijah present, ${S}`,
        `Believer exercising spiritual authority in Jesus's name, casting out sickness, divine power, ${S}`,
      ],
      12: [
        `The cross at Calvary bearing all sin and sickness, divine exchange, stripes for healing, ${S}`,
        `Person healed and forgiven, rising from sickbed in divine health, complete restoration, ${S}`,
      ],
      13: [
        `The Holy Spirit as mighty wind and fire, divine breath filling the room, living presence, ${S}`,
        `Nine spiritual gifts in operation, prophecy healing tongues wisdom, Spirit-filled church, ${S}`,
      ],
      14: [
        `The Trinity revealed at Christ's baptism, Father's voice, Spirit as dove, Son in water, ${S}`,
        `Mountain moved into sea by faith-filled prayer, supernatural power in God's promises, ${S}`,
      ],
      15: [
        `New Testament church expanding across nations, disciples baptizing believers, growing mission, ${S}`,
        `Holy Spirit baptism scene, believers speaking in tongues, heavenly language flowing, ${S}`,
      ],
      16: [
        `The Kingdom of Heaven depicted as a great treasure discovered in a field, joy of the finder, ${S}`,
        `Old and new covenants contrasted, stone tablets vs. heart of flesh, law and grace, ${S}`,
      ],
      17: [
        `The new birth, person emerging transformed from waters, clothed in righteousness, new creation, ${S}`,
        `Sanctification as refinement, gold being purified in divine fire, holiness emerging, ${S}`,
      ],
      18: [
        `Believer sealed by the Holy Spirit, secure in God's hand, nothing can separate, eternal security, ${S}`,
        `The rainbow and seven covenant signs of Scripture, divine promises stretching through history, ${S}`,
      ],
      19: [
        `The righteous departed resting in paradise, souls at peace, Lazarus in Abraham's bosom, ${S}`,
        `The seven divine judgments of Scripture in sequence, righteous justice of God executed, ${S}`,
      ],
      20: [
        `Daniel in ancient Babylon interpreting prophetic visions, divine revelation of world empires, ${S}`,
        `The Great Tribulation period, divine seals and trumpets, unprecedented end-time events, ${S}`,
      ],
      21: [
        `John on Patmos receiving the Revelation, Christ appearing in blazing glory, writing the vision, ${S}`,
        `The first resurrection, saints rising gloriously, death conquered, divine triumph, ${S}`,
      ],
      22: [
        `The Rapture, believers caught up in clouds to meet the Lord, transformation in an instant, ${S}`,
        `Signs of Christ's return being fulfilled, Olivet Discourse unfolding, watching and ready, ${S}`,
      ],
      23: [
        `Revelation's symbolic beasts interpreted, angelic explanation, divine prophetic imagery, ${S}`,
        `Overcomers standing victorious by the blood of the Lamb, end-time spiritual victory, ${S}`,
      ],
      24: [
        `Mystery Babylon revealed and judged, angel announcing her fall, divine righteousness, ${S}`,
        `Final world empire crumbling at Christ's return, antichrist system destroyed, divine victory, ${S}`,
      ],
      25: [
        `The Marriage Supper of the Lamb, glorious heavenly celebration, bride adorned in white, ${S}`,
        `The Millennium, Christ reigning in Jerusalem, universal peace, swords to plowshares, ${S}`,
      ],
      26: [
        `The New Heaven and New Earth appearing, all things made new, former things passed away, ${S}`,
        `The Bride of Christ clothed in glory, eternally united with her Lord, divine marriage complete, ${S}`,
      ],
    };
    if (supp[n]) return supp[n];
    return [
      `Sacred biblical study, divine light on ancient scripture, truth being revealed, ${S}`,
      `Theological meditation, illuminated manuscript, spiritual understanding dawning, ${S}`,
    ];
  }

  if (t.includes("universal plan") || (lessonNum === 1)) {
    return [
      `Breathtaking cosmic creation, divine light bursting through primordial darkness, galaxies forming, God's creative power, ${S}`,
      `Ancient illuminated manuscript showing a biblical timeline from eternity past to eternity future, candle glow, ${S}`,
      `God as divine architect surveying a perfect cosmic blueprint, heavenly temple, scrolls of creation's plan, ${S}`,
    ];
  }

  if (t.includes("interpret the bible") || lessonNum === 3) {
    return [
      `Ancient Dead Sea Scrolls being carefully unrolled and studied by scholars, dramatic discovery lighting, ${S}`,
      `Bible open with divine rays of light illuminating specific verses, multiple translations open, sacred study, ${S}`,
      `Student of scripture unlocking the meaning of ancient texts, candle-lit library, languages of Hebrew and Greek, ${S}`,
    ];
  }

  if (t.includes("truth about god") || lessonNum === 4) {
    return [
      `Majestic divine throne room with overwhelming holy light, angels in worship, heaven's magnificent architecture, ${S}`,
      `Infinite starry cosmos representing God's omniscience and omnipresence, vast divine awareness, ${S}`,
      `Divine attributes written in stone, ancient Hebrew inscriptions, mountainous holy landscape, ${S}`,
    ];
  }

  if (t.includes("original creations") || lessonNum === 5) {
    return [
      `Pre-creation void, eternity before time, divine presence hovering over primordial darkness, ${S}`,
      `Heavenly realm with angelic beings in worship, crystal sea before divine throne, golden celestial city, ${S}`,
      `Earth in its first pristine perfect state, paradise-like landscape in early creation, ${S}`,
    ];
  }

  if (t.includes("dispensation of angels") || lessonNum === 7) {
    return [
      `Magnificent angelic beings serving before God's throne, thousands of angels, divine celestial scene, ${S}`,
      `Angel appearing to a shepherd at night, brilliant divine light, ancient biblical announcement, ${S}`,
      `Seraphim with six wings surrounding the divine throne, holy and majestic heavenly worship, ${S}`,
    ];
  }

  if (t.includes("re-creation") || lessonNum === 8) {
    return [
      `Earth in void and chaos, dark waters covering the deep, Spirit of God hovering, pre-creation moment, ${S}`,
      `First day of creation, God speaking light into existence, spectacular dawn of creation, ${S}`,
      `The six days of creation in sequence, seas forming, land appearing, life emerging, divine order from chaos, ${S}`,
    ];
  }

  if (t.includes("innocence") || lessonNum === 9) {
    return [
      `Pristine Garden of Eden in golden morning light, crystal river, fruit trees, perfect biblical paradise, ${S}`,
      `Adam and Eve in harmony with God and creation, animals peacefully gathered, divine innocence, ${S}`,
      `The serpent in the garden, the forbidden tree, moment of temptation, divine warning unheeded, ${S}`,
    ];
  }

  if (t.includes("plan for the needs") || lessonNum === 10) {
    return [
      `God's abundant provision raining from heaven, overflowing harvest, divine supply for every need, ${S}`,
      `Jesus healing the sick with compassionate touch, crowd witnessing miracle, divine health restored, ${S}`,
      `Community of faith sharing abundance together, divine flourishing, every need supplied, ${S}`,
    ];
  }

  if (t.includes("conscience") || lessonNum === 11) {
    return [
      `Noah receiving divine warning, earnest prophet in wicked pre-flood world, urgent message, ${S}`,
      `Massive ark under construction, Noah and sons at work, divine blueprint, ancient craftsmen, ${S}`,
      `Great flood covering mountains, ark floating serenely, rainbow covenant emerging through clouds, ${S}`,
    ];
  }

  if (t.includes("why god") || lessonNum === 12) {
    return [
      `Adam and Eve expelled from Eden, cherubim with flaming sword, divine judgment, garden gates closing, ${S}`,
      `First murder, Cain and Abel, sin spreading into human civilization, darkness after the fall, ${S}`,
      `God's grief over human failure, divine longsuffering, mercy in the midst of deserved judgment, ${S}`,
    ];
  }

  if (t.includes("human government") || lessonNum === 13) {
    return [
      `Tower of Babel at peak construction, divine confusion descending, workers suddenly unable to communicate, ${S}`,
      `Nations dispersing from Babel across the earth, formation of civilizations, languages dividing people, ${S}`,
      `Ancient king's court with law tablets, institution of human government, divine authority delegated to man, ${S}`,
    ];
  }

  if (t.includes("divine healing") || lessonNum === 14) {
    return [
      `Jesus healing the paralyzed man, compassionate touch, crowd watching in amazement, divine miracle, ${S}`,
      `Woman with issue of blood reaching to touch Christ's garment, faith overcoming shame, immediate healing, ${S}`,
      `Lepers cleansed by Jesus, ten men healed simultaneously, divine health restoring broken bodies, ${S}`,
    ];
  }

  if (t.includes("dispensation of promise") || lessonNum === 15) {
    return [
      `Abraham looking at starry sky, God promising descendants as numerous as stars, divine covenant, ${S}`,
      `Abraham and Sarah elderly receiving promise of son, faith beyond natural ability, miracle birth announced, ${S}`,
      `The Promised Land of Canaan, lush valleys and hills, land flowing with milk and honey, covenant inheritance, ${S}`,
    ];
  }

  if (t.includes("asking and receiving") || lessonNum === 16) {
    return [
      `Devoted believer in earnest prayer at dawn, divine light breaking through in answer, promised result, ${S}`,
      `Persistent widow before the judge, parable of importunate prayer, persistence rewarded, ${S}`,
      `Heaven's abundance flowing down in response to faith-filled prayer, doors opening, promises fulfilled, ${S}`,
    ];
  }

  if (t.includes("dispensation of law") || lessonNum === 17) {
    return [
      `Moses receiving Ten Commandments on Sinai, lightning and thunder, divine fire and smoke, mountain shaking, ${S}`,
      `The elaborate Tabernacle in the wilderness, Ark of the Covenant, sacred curtains and furniture, ${S}`,
      `Israel encamped around the Tabernacle, twelve tribes in divine order, cloud of God's presence above, ${S}`,
    ];
  }

  if (t.includes("old testament church") || lessonNum === 18) {
    return [
      `High Priest of Israel in full ceremonial robes, approaching the Holy of Holies, sacred service, ${S}`,
      `Solomon's Temple in its glory, magnificent architecture, sacred courts of Israel, divine dwelling, ${S}`,
      `Great assembly of Israel before the Lord, thousands gathered for sacred feasts, covenant renewal, ${S}`,
    ];
  }

  if (t.includes("dispensation of grace") || lessonNum === 19) {
    return [
      `Pentecost, 120 disciples in upper room, flames of fire descending on each, divine empowerment, ${S}`,
      `Holy Spirit poured out on all flesh, diverse crowd receiving Spirit, grace dispensation beginning, ${S}`,
      `New birth by water and Spirit, person transformed, divine life implanted, beginning of grace era, ${S}`,
    ];
  }

  if (t.includes("nt program") || t.includes("new testament program") || lessonNum === 20) {
    return [
      `Early Christians gathering in homes, breaking bread, sharing faith, New Testament community of love, ${S}`,
      `Apostle Paul writing epistles by lamplight, divine revelation being recorded, NT doctrine foundation, ${S}`,
      `Gospel spreading from Jerusalem outward to all nations, Great Commission being fulfilled, ${S}`,
    ];
  }

  if (t.includes("truth about jesus") || lessonNum === 21) {
    return [
      `The Incarnation, divine Word becoming flesh, holy birth at Bethlehem, angels announcing to shepherds, ${S}`,
      `Transfiguration of Jesus, blinding white light, Moses and Elijah, voice from divine cloud, ${S}`,
      `Resurrection morning, empty tomb, rolled stone, brilliant angelic figures, first dawn of new creation, ${S}`,
    ];
  }

  if (t.includes("power of attorney") || lessonNum === 22) {
    return [
      `Believer speaking with spiritual authority in Jesus's name, divine power flowing through faithful servant, ${S}`,
      `Ancient royal seal granting power of attorney, delegated authority from the King of kings, ${S}`,
      `Jesus commissioning disciples with authority over all powers of the enemy, divine empowerment scene, ${S}`,
    ];
  }

  if (t.includes("doctrine of sin") || lessonNum === 23) {
    return [
      `The fall in Eden, forbidden fruit consumed, awareness of nakedness, divine presence departing in sorrow, ${S}`,
      `Sin spreading through humanity, all have fallen short, universal condition of man, darkness entering, ${S}`,
      `Animal sacrifice pointing to ultimate atonement, ancient altar, substitute for sin's penalty, ${S}`,
    ];
  }

  if (t.includes("rid of sin") || lessonNum === 24) {
    return [
      `Jesus on the cross bearing the world's sin and sickness, divine sacrifice complete, redemption purchased, ${S}`,
      `Baptism in river, sin washed away, new life emerging from waters, divine cleansing, ${S}`,
      `Person risen from sickness into divine health, healing and forgiveness received simultaneously, ${S}`,
    ];
  }

  if (t.includes("truth about the holy spirit") || lessonNum === 25) {
    return [
      `Dove descending at Jesus's baptism, Holy Spirit resting on the Son, divine Trinity revealed, ${S}`,
      `Wind and fire of Pentecost, rushing mighty wind, tongues of fire, Holy Spirit coming powerfully, ${S}`,
      `River of living water flowing from God's throne, endless supply of the Spirit, crystal divine stream, ${S}`,
    ];
  }

  if (t.includes("gifts and fruit") || lessonNum === 26) {
    return [
      `Spiritual gifts operating in church community, healing prophecy tongues wisdom, Spirit-filled ministry, ${S}`,
      `Fruit tree bearing nine types of spiritual fruit, love joy peace patience kindness goodness, ${S}`,
      `Spirit-filled believer ministering healing to sick, divine gift in operation, compassionate service, ${S}`,
    ];
  }

  if (t.includes("doctrine of the trinity") || lessonNum === 27) {
    return [
      `Three intertwined rivers from one divine source, Trinity in symbolic unity, three in one, ${S}`,
      `Christ's baptism revealing the Trinity, Father speaking from heaven, Spirit as dove, Son in Jordan, ${S}`,
      `Ancient theological diagram of the Trinity, Athanasian shield, three circles of divine unity, ${S}`,
    ];
  }

  if (t.includes("how to attain") || lessonNum === 28) {
    return [
      `Abraham on Moriah with Isaac, faith at ultimate test, angel providing ram, divine supply appearing, ${S}`,
      `Mountain cast into the sea by faith, supernatural miracle at the word of God, faith in action, ${S}`,
      `Cloud of witnesses from Hebrews 11, heroes of faith surrounding the believer, hall of faith, ${S}`,
    ];
  }

  if (t.includes("new testament church") || lessonNum === 29) {
    return [
      `Peter preaching at Pentecost, 3000 souls responding, founding of the NT church, divine establishment, ${S}`,
      `Early church in joy and fellowship, breaking bread, prayers, signs and wonders, divine community, ${S}`,
      `The body of Christ functioning together, diverse members, unified purpose, Christ as the head, ${S}`,
    ];
  }

  if (t.includes("baptism of the holy spirit") || lessonNum === 30) {
    return [
      `Upper room at Pentecost, 120 in prayer, Holy Spirit descending with fire, speaking in tongues beginning, ${S}`,
      `Paul laying hands on believers at Ephesus, Spirit falling, tongues and prophecy, divine empowerment, ${S}`,
      `River baptism in full immersion, divine empowerment given, witness empowered to go, ${S}`,
    ];
  }

  if (t.includes("kingdom of heaven") || t.includes("kingdom of god") || lessonNum === 31) {
    return [
      `Sower scattering seed on different soils, parable of the kingdom, diverse harvest results, ${S}`,
      `Pearl of great price discovered by a merchant, joy of finding the kingdom, selling all for the pearl, ${S}`,
      `Jesus teaching the Sermon on the Mount, crowds listening, kingdom principles proclaimed, ${S}`,
    ];
  }

  if (t.includes("old and new covenants") || lessonNum === 32) {
    return [
      `Blood covenant ceremony, animals divided, two parties walking between them, binding ancient agreement, ${S}`,
      `The Last Supper, Jesus instituting the new covenant in his blood, upper room, sacred meal, ${S}`,
      `Stone tablets of the law versus living heart of flesh, new covenant superiority, grace over law, ${S}`,
    ];
  }

  if (t.includes("doctrine of salvation") || lessonNum === 33) {
    return [
      `The cross of Calvary at sunset, redemption completed, divine sacrifice accepted, salvation provided, ${S}`,
      `Prodigal son returning home, father running to embrace, forgiveness and restoration, parable of grace, ${S}`,
      `Repentant sinner kneeling before God, divine forgiveness flowing, new birth beginning, transformation, ${S}`,
    ];
  }

  if (t.includes("sanctification") || lessonNum === 34) {
    return [
      `Gold being refined in blazing fire, dross removed, pure gold emerging, divine sanctification process, ${S}`,
      `Before and after transformation, sinner becoming saint, progressive holiness, divine work of grace, ${S}`,
      `White garments of righteousness, believer clothed in Christ's purity, justification complete, ${S}`,
    ];
  }

  if (t.includes("eternal security") || lessonNum === 35) {
    return [
      `Child held secure in the Father's mighty hand, none can pluck them out, eternal security of believer, ${S}`,
      `Sealed document of eternal life, Holy Spirit's seal of guarantee, divine promise unbreakable, ${S}`,
      `Good Shepherd protecting sheep, none lost from his hand, divine commitment to keep his own, ${S}`,
    ];
  }

  if (t.includes("fifteen") || t.includes("covenants of scripture") || lessonNum === 36) {
    return [
      `Rainbow after the flood, Noahic covenant, divine promise sealed in natural beauty, ${S}`,
      `Ancient illuminated scroll listing covenant promises, candle glow, sacred biblical agreements, ${S}`,
      `The new covenant in Christ's blood, communion table, bread and cup, eternal covenant of grace, ${S}`,
    ];
  }

  if (t.includes("where are the dead") || lessonNum === 37) {
    return [
      `Paradise with faithful souls at rest, peaceful heavenly waiting place, Lazarus in Abraham's bosom, ${S}`,
      `Soul of believer being received into divine peace at death, angels escorting the righteous home, ${S}`,
      `The resurrection hope, graves ready to give up their dead, dawn of resurrection day coming, ${S}`,
    ];
  }

  if (t.includes("seven judgments") || lessonNum === 38) {
    return [
      `Great White Throne judgment, books opened, all humanity before God, divine righteousness executed, ${S}`,
      `Judgment Seat of Christ, believer's works tested by fire, gold silver precious stones appearing, ${S}`,
      `Nations before the divine throne, sheep and goats separated, eternal destinies determined, ${S}`,
    ];
  }

  if (t.includes("book of daniel") || lessonNum === 39) {
    return [
      `Daniel in the lion's den, angel shutting lions' mouths, divine protection of the faithful, ${S}`,
      `Nebuchadnezzar's statue dream, gold silver bronze iron clay, Daniel interpreting world empires, ${S}`,
      `Ancient Babylon at its height, massive walls and hanging gardens, empire of gold, backdrop for prophecy, ${S}`,
    ];
  }

  if (t.includes("daniel's seventieth week") || lessonNum === 40) {
    return [
      `Prophetic timeline of Daniel's seventy weeks on ancient parchment, divine precision of prophecy, ${S}`,
      `The Great Tribulation, divine seals broken, apocalyptic events unfolding, unprecedented global crisis, ${S}`,
      `The abomination of desolation, temple in Jerusalem desecrated, Daniel's final week, ${S}`,
    ];
  }

  if (t.includes("gist of the book of revelation") || lessonNum === 41) {
    return [
      `John on Patmos receiving divine vision, Christ in blazing glory, seven golden lampstands, ${S}`,
      `Seven seals of Revelation being opened, the Lamb taking the scroll, apocalyptic events revealed, ${S}`,
      `Panoramic view of Revelation's sequence, seals trumpets vials, cosmic end-time events, ${S}`,
    ];
  }

  if (t.includes("heaven and the resurrections") || lessonNum === 42) {
    return [
      `First resurrection, saints rising gloriously, transformed bodies, triumphant resurrection morning, ${S}`,
      `Heavenly paradise with New Jerusalem in the background, saints in glorious immortal bodies, ${S}`,
      `Death conquered by Christ's resurrection, empty graves, transformation of the saints, divine triumph, ${S}`,
    ];
  }

  if (t.includes("rapture") || lessonNum === 43) {
    return [
      `Rapture of the church, believers caught up through clouds to meet the Lord in the air, divine gathering, ${S}`,
      `Shout of the Lord, trumpet call, dead in Christ rising first, living saints transformed instantly, ${S}`,
      `Heaven receiving the raptured church, divine escort of transformed saints into glory, ${S}`,
    ];
  }

  if (t.includes("matthew 24") || lessonNum === 44) {
    return [
      `Olivet Discourse, Jesus teaching on the Mount of Olives with Jerusalem and temple visible below, ${S}`,
      `Signs of the end times unfolding, wars earthquakes famines, sun and moon and stars darkened, ${S}`,
      `The Son of Man returning in clouds with great glory, all nations mourning, divine parousia, ${S}`,
    ];
  }

  if (t.includes("sun-clothed woman") || t.includes("manchild") || lessonNum === 45) {
    return [
      `Woman clothed with the sun, crown of twelve stars, moon at feet, Revelation 12, divine prophetic vision, ${S}`,
      `War in heaven, Michael and angels fighting the great dragon, dragon cast out, divine victory, ${S}`,
      `Male child caught up to God's throne, dragon thwarted, divine destiny of the manchild fulfilled, ${S}`,
    ];
  }

  if (t.includes("beasts out of") || lessonNum === 46) {
    return [
      `Beast rising from the sea with seven heads and ten horns, nations transferring their authority, Antichrist, ${S}`,
      `False prophet performing great signs, fire from heaven, image of the beast made to speak, deception, ${S}`,
      `Mark of the beast system, economic control, 666, warning to the saints to overcome, ${S}`,
    ];
  }

  if (t.includes("beast with seven heads") || lessonNum === 47) {
    return [
      `Mystery Babylon the great sitting on many waters, drunk with the blood of saints, harlot system revealed, ${S}`,
      `Seven mountains and seven kings, Revelation 17's prophetic symbols interpreted by the angel, ${S}`,
      `Angel proclaiming the fall of Babylon, merchants mourning, divine judgment on corrupt world system, ${S}`,
    ];
  }

  if (t.includes("ten horns") || lessonNum === 48) {
    return [
      `Ten kings giving authority to the beast, final world confederation, antichrist's end-time coalition, ${S}`,
      `World leaders gathered in final alignment before Christ's return, geopolitical fulfillment of prophecy, ${S}`,
      `Destruction of Babylon the great, smoke rising from fallen city, divine judgment complete, ${S}`,
    ];
  }

  if (t.includes("marriage supper") || t.includes("armageddon") || lessonNum === 49) {
    return [
      `Marriage Supper of the Lamb, glorious heavenly celebration, bride adorned in white, divine feast, ${S}`,
      `Heaven opened, white horse and rider, armies of heaven following, Christ's second advent, ${S}`,
      `Valley of Megiddo, armies gathered for Armageddon, divine intervention, Christ's decisive victory, ${S}`,
    ];
  }

  if (t.includes("divine government") || lessonNum === 50) {
    return [
      `Christ reigning in Jerusalem for 1000 years, nations coming to worship, millennial peace established, ${S}`,
      `Desert blooming, wolf and lamb together, universal harmony of the millennium, Isaiah fulfilled, ${S}`,
      `River flowing from the millennial temple, healing of the nations, abundant life under Christ's rule, ${S}`,
    ];
  }

  if (t.includes("new heaven") || t.includes("new earth") || lessonNum === 51) {
    return [
      `New Heaven and New Earth, old creation passing away in fire, divine renewal of all things, ${S}`,
      `New Jerusalem descending from heaven, city of pure gold and crystal, massively magnificent, eternal home, ${S}`,
      `River of life from God's throne, tree of life bearing monthly fruit, paradise fully restored, ${S}`,
    ];
  }

  if (t.includes("bride of christ") || lessonNum === 52) {
    return [
      `The Bride of Christ adorned for her husband, white garments, radiant glory, ready for eternal union, ${S}`,
      `The eternal marriage of Christ and his church, the most glorious union, divine love consummated, ${S}`,
      `New Jerusalem as the Bride's eternal home, magnificent city prepared, redeemed humanity with God forever, ${S}`,
    ];
  }

  // Generic fallback
  return [
    `Majestic biblical scene with divine light and ancient scrolls, sacred atmosphere, cinematic, ${S}`,
    `Ancient temple setting, divine presence manifest, worship and reverence, biblical illustration, ${S}`,
    `Biblical landscape with figures in prayer, divine connection, sacred moment, ${S}`,
  ];
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Loading lessons from DB…");

  const lessons = await db.courseLesson.findMany({
    where: { type: { not: "IMAGE" } },
    orderBy: { order: "asc" },
    select: { id: true, title: true, content: true, type: true },
  });

  const done = loadProgress();
  console.log(`${lessons.length} lessons total, ${done.size} already processed.\n`);

  for (const lesson of lessons) {
    // Skip very short content — no insertion points
    if (!lesson.content || lesson.content.length < 500) {
      console.log(`  ⏭  ${lesson.title}: too short (${lesson.content?.length ?? 0}b), skipping`);
      continue;
    }

    const numHeadings = countHeadings(lesson.content);
    const required = countRequiredSlots(numHeadings);
    const existing = countExistingImages(lesson.content);
    const deficit = Math.max(0, required - existing);

    if (deficit === 0) {
      if (!done.has(lesson.id)) {
        done.add(lesson.id);
        saveProgress(done);
      }
      console.log(`  ✓  ${lesson.title}: ${existing}/${required} images (complete)`);
      continue;
    }

    // Lesson was previously marked done but now has a deficit — process it
    done.delete(lesson.id);
    console.log(`\n📖  Processing: ${lesson.title} — ${existing}/${required} images, generating ${deficit} more`);

    const allPrompts = getPrompts(lesson.title);
    const uploadedEntries: { url: string; caption: string }[] = [];

    for (let j = 0; j < deficit; j++) {
      // Cycle through prompts starting after the ones already used
      const prompt = allPrompts[(existing + j) % allPrompts.length];
      console.log(`  🎨  Generating image ${j + 1}/${deficit} (slot ${existing + j + 1}/${required})…`);

      let recraftUrl: string;
      try {
        recraftUrl = await generateImage(prompt);
        console.log(`     Recraft URL: ${recraftUrl.slice(0, 60)}…`);
      } catch (err) {
        console.error(`     ❌ Recraft error: ${err}`);
        await sleep(8000);
        try {
          recraftUrl = await generateImage(prompt);
        } catch (err2) {
          console.error(`     ❌ Retry failed, skipping image: ${err2}`);
          await sleep(DELAY_BETWEEN_IMAGES_MS);
          continue;
        }
      }

      // Caption: first clause of prompt before first comma
      const caption = prompt.split(",")[0].trim();
      const slug = lesson.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .slice(0, 40);
      const filename = `lesson-${slug}-img${existing + j + 1}`;

      let uploadedUrl: string;
      try {
        uploadedUrl = await compressAndUpload(recraftUrl, filename);
        console.log(`     ✅ Uploaded: ${uploadedUrl}`);
        uploadedEntries.push({ url: uploadedUrl, caption });
      } catch (err) {
        console.error(`     ❌ Upload error: ${err}`);
      }

      if (j < deficit - 1) {
        await sleep(DELAY_BETWEEN_IMAGES_MS);
      }
    }

    if (uploadedEntries.length > 0) {
      const newContent = insertImages(lesson.content, uploadedEntries);
      await db.courseLesson.update({
        where: { id: lesson.id },
        data: { content: newContent },
      });
      console.log(
        `  💾  Saved ${uploadedEntries.length} images into lesson (content now ${newContent.length}b)`
      );
      if (uploadedEntries.length >= deficit) {
        done.add(lesson.id);
        saveProgress(done);
      }
    }
    await sleep(DELAY_BETWEEN_LESSONS_MS);
  }

  console.log("\n✅  All lessons processed!");
  await db.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await db.$disconnect();
  process.exit(1);
});
