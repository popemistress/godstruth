/**
 * regenerate-course-images.ts
 *
 * 1. Removes ALL existing images from all course lessons (DB + UploadThing + public/)
 * 2. Generates 1 Recraft v4.1 image per READING/SUPPLEMENT lesson
 * 3. Compresses with sharp, uploads to UploadThing
 * 4. Inserts image markdown right above the first header in each lesson
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
if (!RECRAFT_KEY) { console.error("RECRAFT_API_KEY not set"); process.exit(1); }

const PROGRESS_FILE = "/tmp/regenerate-images-progress.json";
const DELAY_MS = 4000;
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

function loadProgress(): Set<string> {
  try { if (fs.existsSync(PROGRESS_FILE)) return new Set(JSON.parse(fs.readFileSync(PROGRESS_FILE, "utf8")) as string[]); } catch {}
  return new Set();
}
function saveProgress(done: Set<string>): void { fs.writeFileSync(PROGRESS_FILE, JSON.stringify([...done], null, 2)); }

function stripImages(content: string): string {
  return content.split("\n").filter((l) => !l.trim().match(/^!\[[^\]]*\]\([^)]+\)$/)).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

function extractUploadThingKeys(content: string | null, coverUrl: string | null): string[] {
  const keys: string[] = [];
  const pattern = /https:\/\/[a-z0-9]+\.ufs\.sh\/f\/([a-zA-Z0-9]+)/g;
  let m: RegExpExecArray | null;
  if (content) { while ((m = pattern.exec(content)) !== null) keys.push(m[1]); }
  if (coverUrl) { while ((m = pattern.exec(coverUrl)) !== null) keys.push(m[1]); }
  return [...new Set(keys)];
}

const S = "photorealistic, highly detailed, cinematic lighting, 8K quality";

const GUPFC_PROMPTS: Record<number, string> = {
  1: `Breathtaking cosmic creation, divine light bursting through primordial darkness, galaxies forming, ${S}`,
  2: `Ancient illuminated manuscript showing sacred scriptures, candle glow revealing divine words, ${S}`,
  3: `Ancient Dead Sea Scrolls being carefully unrolled and studied by scholars, dramatic discovery lighting, ${S}`,
  4: `Majestic divine throne room with overwhelming holy light, angels in worship, heaven's magnificent architecture, ${S}`,
  5: `Pre-creation void, eternity before time, divine presence hovering over primordial darkness, ${S}`,
  6: `Spiritual battle in heavenly realms, angels of light confronting fallen powers, epic cosmic warfare, ${S}`,
  7: `Magnificent angelic beings serving before God's throne, thousands of angels, divine celestial scene, ${S}`,
  8: `Earth in void and chaos, dark waters covering the deep, Spirit of God hovering, pre-creation moment, ${S}`,
  9: `Pristine Garden of Eden in golden morning light, crystal river, fruit trees, perfect biblical paradise, ${S}`,
  10: `God's abundant provision raining from heaven, overflowing harvest, divine supply for every need, ${S}`,
  11: `Noah receiving divine warning, earnest prophet in wicked pre-flood world, urgent message, ${S}`,
  12: `Adam and Eve expelled from Eden, cherubim with flaming sword, divine judgment, garden gates closing, ${S}`,
  13: `Tower of Babel at peak construction, divine confusion descending, workers suddenly unable to communicate, ${S}`,
  14: `Jesus healing the paralyzed man, compassionate touch, crowd watching in amazement, divine miracle, ${S}`,
  15: `Abraham looking at starry sky, God promising descendants as numerous as stars, divine covenant, ${S}`,
  16: `Devoted believer in earnest prayer at dawn, divine light breaking through in answer, promised result, ${S}`,
  17: `Moses receiving Ten Commandments on Sinai, lightning and thunder, divine fire and smoke, mountain shaking, ${S}`,
  18: `High Priest of Israel in full ceremonial robes, approaching the Holy of Holies, sacred service, ${S}`,
  19: `Pentecost, 120 disciples in upper room, flames of fire descending on each, divine empowerment, ${S}`,
  20: `Early Christians gathering in homes, breaking bread, sharing faith, New Testament community of love, ${S}`,
  21: `The Incarnation, divine Word becoming flesh, holy birth at Bethlehem, angels announcing to shepherds, ${S}`,
  22: `Believer speaking with spiritual authority in Jesus's name, divine power flowing through faithful servant, ${S}`,
  23: `The fall in Eden, forbidden fruit consumed, awareness of nakedness, divine presence departing in sorrow, ${S}`,
  24: `Jesus on the cross bearing the world's sin and sickness, divine sacrifice complete, redemption purchased, ${S}`,
  25: `Dove descending at Jesus's baptism, Holy Spirit resting on the Son, divine Trinity revealed, ${S}`,
  26: `Spiritual gifts operating in church community, healing prophecy tongues wisdom, Spirit-filled ministry, ${S}`,
  27: `Three intertwined rivers from one divine source, Trinity in symbolic unity, three in one, ${S}`,
  28: `Abraham on Moriah with Isaac, faith at ultimate test, angel providing ram, divine supply appearing, ${S}`,
  29: `Peter preaching at Pentecost, 3000 souls responding, founding of the NT church, divine establishment, ${S}`,
  30: `Upper room at Pentecost, 120 in prayer, Holy Spirit descending with fire, speaking in tongues beginning, ${S}`,
  31: `Sower scattering seed on different soils, parable of the kingdom, diverse harvest results, ${S}`,
  32: `Blood covenant ceremony, animals divided, two parties walking between them, binding ancient agreement, ${S}`,
  33: `The cross of Calvary at sunset, redemption completed, divine sacrifice accepted, salvation provided, ${S}`,
  34: `Gold being refined in blazing fire, dross removed, pure gold emerging, divine sanctification process, ${S}`,
  35: `Child held secure in the Father's mighty hand, none can pluck them out, eternal security of believer, ${S}`,
  36: `Rainbow after the flood, Noahic covenant, divine promise sealed in natural beauty, ${S}`,
  37: `Paradise with faithful souls at rest, peaceful heavenly waiting place, Lazarus in Abraham's bosom, ${S}`,
  38: `Great White Throne judgment, books opened, all humanity before God, divine righteousness executed, ${S}`,
  39: `Daniel in the lion's den, angel shutting lions' mouths, divine protection of the faithful, ${S}`,
  40: `Prophetic timeline of Daniel's seventy weeks on ancient parchment, divine precision of prophecy, ${S}`,
  41: `John on Patmos receiving divine vision, Christ in blazing glory, seven golden lampstands, ${S}`,
  42: `First resurrection, saints rising gloriously, transformed bodies, triumphant resurrection morning, ${S}`,
  43: `Rapture of the church, believers caught up through clouds to meet the Lord in the air, divine gathering, ${S}`,
  44: `Olivet Discourse, Jesus teaching on the Mount of Olives with Jerusalem and temple visible below, ${S}`,
  45: `Woman clothed with the sun, crown of twelve stars, moon at feet, Revelation 12, divine prophetic vision, ${S}`,
  46: `Beast rising from the sea with seven heads and ten horns, nations transferring their authority, Antichrist, ${S}`,
  47: `Mystery Babylon the great sitting on many waters, drunk with the blood of saints, harlot system revealed, ${S}`,
  48: `Ten kings giving authority to the beast, final world confederation, antichrist's end-time coalition, ${S}`,
  49: `Marriage Supper of the Lamb, glorious heavenly celebration, bride adorned in white, divine feast, ${S}`,
  50: `Christ reigning in Jerusalem for 1000 years, nations coming to worship, millennial peace established, ${S}`,
  51: `New Heaven and New Earth, old creation passing away in fire, divine renewal of all things, ${S}`,
  52: `The Bride of Christ adorned for her husband, white garments, radiant glory, ready for eternal union, ${S}`,
};

const SUPPLEMENT_PROMPTS: Record<number, string> = {
  1: `Sacred Bible study with ancient manuscripts and divine light, golden candlelight on open scripture, ${S}`,
  2: `Scholar interpreting ancient biblical texts in a candlelit library, cross-references in Hebrew and Greek, ${S}`,
  3: `Invisible spiritual realm revealed, angels and demons in conflict, light and shadow warfare, ${S}`,
  4: `Magnificent angelic beings ministering before God's throne, heavenly host, celestial architecture, ${S}`,
  5: `Pristine Garden of Eden at golden hour, Adam walking with God in cool of day, innocent paradise, ${S}`,
  6: `Noah preaching righteousness to pre-flood civilization, building the ark, warning of judgment, ${S}`,
  7: `Tower of Babel under construction with divine confusion descending, languages scattering nations, ${S}`,
  8: `Abraham beneath the stars, God confirming the covenant of promise, as many as the stars, ${S}`,
  9: `Moses receiving the Law on Sinai amid fire and thunder, divine legislation for Israel, ${S}`,
  10: `Pentecost fire falling on 120 disciples, birth of the New Testament church, amazing grace, ${S}`,
  11: `Jesus transfigured on the mountain, brilliant divine glory revealed, Moses and Elijah present, ${S}`,
  12: `The cross at Calvary bearing all sin and sickness, divine exchange, stripes for healing, ${S}`,
  13: `The Holy Spirit as mighty wind and fire, divine breath filling the room, living presence, ${S}`,
  14: `The Trinity revealed at Christ's baptism, Father's voice, Spirit as dove, Son in water, ${S}`,
  15: `New Testament church expanding across nations, disciples baptizing believers, growing mission, ${S}`,
  16: `The Kingdom of Heaven depicted as a great treasure discovered in a field, joy of the finder, ${S}`,
  17: `The new birth, person emerging transformed from waters, clothed in righteousness, new creation, ${S}`,
  18: `Believer sealed by the Holy Spirit, secure in God's hand, nothing can separate, eternal security, ${S}`,
  19: `The righteous departed resting in paradise, souls at peace, Lazarus in Abraham's bosom, ${S}`,
  20: `Daniel in ancient Babylon interpreting prophetic visions, divine revelation of world empires, ${S}`,
  21: `John on Patmos receiving the Revelation, Christ appearing in blazing glory, writing the vision, ${S}`,
  22: `The Rapture, believers caught up in clouds to meet the Lord, transformation in an instant, ${S}`,
  23: `Revelation's symbolic beasts interpreted, angelic explanation, divine prophetic imagery, ${S}`,
  24: `Mystery Babylon revealed and judged, angel announcing her fall, divine righteousness, ${S}`,
  25: `The Marriage Supper of the Lamb, glorious heavenly celebration, bride adorned in white, ${S}`,
  26: `The New Heaven and New Earth appearing, all things made new, former things passed away, ${S}`,
};

const ANGELS_PROMPTS: Record<string, string> = {
  "what are angels": `Heavenly angelic messenger appearing in divine light, biblical scene, celestial being with radiant wings, ${S}`,
  "angels know": `Angel with illuminated scroll of divine knowledge, celestial library, infused wisdom, ${S}`,
  "creation and nature": `Angels being created by divine light from heaven, pure spirits emerging, celestial birth, ${S}`,
  "angels in sacred scripture": `Ancient Bible open with angelic visions depicted on pages, divine revelation, ${S}`,
  "seraphim": `Seraphim with six wings surrounding God's throne, burning with divine love, heavenly worship, ${S}`,
  "cherubim": `Cherubim guarding the entrance to paradise, four-winged celestial guardians, divine presence, ${S}`,
  "thrones": `Majestic throne of God with angelic beings surrounding it, divine authority and justice, ${S}`,
  "living creatures": `Four living creatures before God's throne, eyes covered with wings, eternal worship, ${S}`,
  "dominations": `Angelic beings governing the cosmos, celestial order and divine administration, ${S}`,
  "virtues": `Angels of miracles and signs, divine wonders in the heavens, celestial powers, ${S}`,
  "powers": `Warrior angels battling dark forces, defenders of the cosmic order, ${S}`,
  "principalities": `Angels guiding nations and territories, celestial governance over kingdoms, ${S}`,
  "archangels": `Chief archangels Michael, Gabriel, and Raphael in glorious array, heavenly leaders, ${S}`,
  "michael": `Archangel Michael with sword and shield, triumphant over evil dragon, defender of faith, ${S}`,
  "gabriel": `Archangel Gabriel announcing to Mary, lily in hand, divine messenger of incarnation, ${S}`,
  "raphael": `Archangel Raphael as healer and guide, traveling companion with staff, divine physician, ${S}`,
  "guardian angels": `Guardian angel protecting a child on a dangerous path, divine watchfulness and care, ${S}`,
  "devotion to the holy angels": `Believer praying with angels surrounding in reverence, lit candles, sacred devotion, ${S}`,
  "old testament": `Angelic encounters in ancient Israel, angels appearing to prophets and patriarchs, ${S}`,
  "new testament": `Angels at the resurrection and ascension, heavenly messengers in the early church, ${S}`,
};

const DEMONS_CORE_PROMPTS: Record<string, string> = {
  "what are demons": `Ancient biblical scene of exorcism, seven Jewish exorcists confronting demonic power, dramatic lighting, ${S}`,
  "lucifer's fall": `Lucifer cast from heaven like lightning through cosmic darkness, once-radiant angel falling, ${S}`,
  "satan: the great deceiver": `The serpent in the Garden of Eden speaking to Eve, subtle deception beneath the Tree of Knowledge, ${S}`,
  "fallen angels and their ranks": `Hierarchy of dark angelic beings descending in ranks, corrupted powers, cosmic darkness, ${S}`,
  "demonic possession": `The Gadarene demoniac among ancient tombs, Jesus approaching with authority, ${S}`,
  "spirits of infirmity": `Woman bent double for eighteen years in synagogue, Jesus reaching to heal, golden light breaking through, ${S}`,
  "doctrines of devils": `False teacher in ornate robes preaching, subtle serpentine shadows in the basilica, warning scene, ${S}`,
  "divination, witchcraft": `The Witch of Endor summoning a spirit before King Saul, dark cave with single flame, ${S}`,
  "seducing spirits": `Congregation in early church listening to minister, barely visible serpentine forms in the air, ${S}`,
  "demonic influence on nations": `Angel Gabriel withstood by dark Prince of Persia above ancient map, cosmic spiritual battle, ${S}`,
  "believer's authority": `Believer standing upright radiating light in Jesus's name, demons recoiling into shadows, ${S}`,
  "armor of god": `Roman soldier in full armor of God, each piece glowing with spiritual significance, Ephesians 6, ${S}`,
  "deliverance and exorcism": `Jesus casting out demon in Capernaum synagogue, calm authority, possessed man convulsing, ${S}`,
  "taking away the devil's armor": `Strong man bound, weapons scattered, stronger figure standing at threshold, spiritual victory, ${S}`,
  "final battle": `Angel with great chain binding the dragon, casting into bottomless pit, Revelation 20, ${S}`,
  "daily warfare": `Believer kneeling in morning prayer, armor of God subtly illuminated, new day breaking, ${S}`,
  "the watchers and the nephilim": `Fallen watchers descending to earth, ancient pre-flood world, Genesis 6, cosmic tragedy, ${S}`,
  "strongmen of deception": `Dark spiritual forces of lying spirit, familiar spirit, perverse spirit, biblical warning scene, ${S}`,
  "strongmen of the heart": `Spiritual strongholds of jealousy, whoredom, pride depicted as dark chains around a heart, ${S}`,
  "strongmen of affliction": `Heavy spirits of heaviness, fear, bondage pressing down on a person, divine light breaking through, ${S}`,
  "strongmen of the body": `Demonic spirits of infirmity and the antichrist spirit, end-time spiritual battle, ${S}`,
};

const DEMONS_CULTURAL_PROMPTS: Record<string, string> = {
  "halloween": `Halloween night scene with jack-o'-lanterns and dark autumn atmosphere, cautionary mood about hidden spiritual danger, ${S}`,
  "occult entertainment": `Dark movie theater screen showing occult symbols, warning about spiritual deception in media, ${S}`,
  "music industry": `Recording studio with hidden occult symbols and dark spiritual influences, cautionary realistic scene, ${S}`,
  "celebrity and political idolatry": `Crowd worshipping celebrity figure on stage, golden idolatry in modern form, warning scene, ${S}`,
  "horoscopes and astrology": `Ancient astrological chart with zodiac symbols, warning about occult divination practices, ${S}`,
  "fortune-telling apps": `Smartphone screen showing fortune-telling app, modern digital divination, cautionary scene, ${S}`,
  "yoga": `Person in yoga pose with hidden spiritual energy channels, warning about Eastern spiritual practices, ${S}`,
  "crystals and crystal healing": `Healing crystals arranged in pattern with ethereal energy, New Age spiritual practice scene, ${S}`,
  "law of attraction": `Vision board with desires manifesting, New Age manifestation practice, cautionary realistic scene, ${S}`,
  "transcendental meditation": `Person in deep meditation with altered consciousness, Eastern mystical practice, warning scene, ${S}`,
  "feng shui": `Room arranged according to feng shui principles with energy flow lines, Eastern occult practice, ${S}`,
  "reiki and energy healing": `Hands hovering over body with energy transfer, Reiki healing session, spiritual practice scene, ${S}`,
  "chakras and kundalini": `Person with seven chakra energy centers glowing, Kundalini serpent energy rising, ${S}`,
  "enneagram": `Enneagram personality diagram with nine types, spiritual typing system, modern psychological occult, ${S}`,
  "hypnosis and past-life regression": `Person in hypnotic trance reliving past life, hypnotist guiding, altered consciousness, ${S}`,
  "smudging and burning sage": `Hands burning sage bundle with smoke cleansing a room, indigenous spiritual ritual, ${S}`,
  "new age movement": `Eclectic spiritual altar with crystals, candles, and universal symbols, New Age syncretism, ${S}`,
  "spirit guides": `Person communicating with invisible spirit guide, ethereal being in corner, channeling scene, ${S}`,
  "contemplative prayer movement": `Person in centering prayer with empty mind, contemplative spiritual practice, warning scene, ${S}`,
  "labyrinth walking": `Person walking a stone labyrinth in contemplation, mystical journey ritual, ${S}`,
  "paranormal investigation": `Ghost hunters with equipment in dark haunted house, paranormal investigation, ${S}`,
  "psychedelics and plant medicine": `Person experiencing psychedelic vision with Ayahuasca, altered state, spiritual deception, ${S}`,
  "astral projection": `Person's spirit leaving body during sleep, astral realm exploration, out-of-body experience, ${S}`,
  "tarot cards": `Tarot cards spread on dark table with crystal ball, fortune telling practice, occult divination, ${S}`,
  "psychics": `Psychic reading with crystal ball and tarot cards, psychic medium channeling spirits, ${S}`,
  "ouija boards": `Ouija board with planchette moving, dark séance atmosphere, spirit communication warning, ${S}`,
  "the occult": `Dark occult altar with pentagram, candles, and ancient grimoire, hidden occult practices, ${S}`,
  "witchcraft": `Modern witch casting spells in candlelit room, Wiccan altar, occult magical practice, ${S}`,
  "wicca": `Wiccan altar with pentacle, candles, and natural elements, neo-pagan witchcraft ritual, ${S}`,
  "santeria": `Santeria ritual with candles, dolls, and offerings, Afro-Caribbean spiritual practice, ${S}`,
  "tattoos with occult symbols": `Person receiving tattoo with occult and pagan symbols, dark spiritual marking, ${S}`,
  "fetish objects and idols": `Home with hidden idol objects and fetish items on shelves, spiritual bondage through objects, ${S}`,
  "freemasonry": `Masonic lodge interior with ritual symbols and checkerboard floor, secret society meeting, ${S}`,
  "curses": `Dark words and symbols emanating spiritual oppression, generational curse breaking, ${S}`,
  "generational curses": `Family tree with dark chains connecting generations, inherited spiritual bondage being broken, ${S}`,
  "false gospels": `False preacher with distorted cross, counterfeit Christianity, wolves in sheep's clothing, ${S}`,
  "adultery": `Broken marriage covenant, spiritual consequences of infidelity, broken heart and torn fabric, ${S}`,
  "pornography": `Person trapped in dark room with screens, addiction and spiritual bondage, breaking free, ${S}`,
  "self-harm and cutting": `Person with scars reaching for hope, self-harm as spiritual oppression, healing light approaching, ${S}`,
  "eating disorders": `Person looking in mirror with distorted reflection, eating disorder as spiritual battle, healing hope, ${S}`,
  "aliens and ufos": `UFO hovering over rural landscape, alien abduction deception, spiritual entities masquerading, ${S}`,
  "burning man": `Massive desert festival with towering effigy, pagan ritual atmosphere, spiritual deception in festival culture, ${S}`,
  "transhumanism and brain chips": `Person with neural implant chip, transhumanist future, merging man with machine, warning, ${S}`,
  "ai spiritual deception": `AI hologram presenting itself as spiritual guide, artificial intelligence deception, end-times technology, ${S}`,
  "legal ground": `Legal documents with spiritual seal, enemy's legal rights in spiritual realm, courtroom of heaven, ${S}`,
  "complete freedom prayer": `Person on knees in prayer breaking chains, complete freedom and deliverance, divine light, ${S}`,
  "why i wrote": `Author at desk with Bible and notes, writing with divine inspiration and spiritual urgency, ${S}`,
};

function getGupfcPrompt(title: string): string {
  const lm = title.match(/^Lesson\s+(\d+)/i);
  const sm = title.match(/^Supplement\s+(\d+)/i);
  if (sm) { const n = parseInt(sm[1], 10); return SUPPLEMENT_PROMPTS[n] || `Sacred biblical study, divine light on ancient scripture, ${S}`; }
  if (lm) { const n = parseInt(lm[1], 10); return GUPFC_PROMPTS[n] || `Majestic biblical scene with divine light and ancient scrolls, ${S}`; }
  return `Majestic biblical scene with divine light and ancient scrolls, ${S}`;
}

function getAngelsPrompt(title: string): string {
  const t = title.toLowerCase();
  for (const [k, p] of Object.entries(ANGELS_PROMPTS)) if (t.includes(k)) return p;
  const clean = title.replace(/^Lesson\s+\d+\s*[-—]\s*/, "").replace(/^Supplement\s+\d+\s*[-—]\s*(For\s+Lessons?\s+[\d\s&]+\s*[-—]\s*)?/, "").replace(/:\s*A\s+\w+\s+(Study|Guide|Introduction|Overview)$/, "");
  return `Angelic and heavenly scene depicting ${clean}, biblical theology, divine light, ${S}`;
}

function getDemonsPrompt(title: string): string {
  const t = title.toLowerCase();
  for (const [k, p] of Object.entries(DEMONS_CORE_PROMPTS)) if (t.includes(k)) return p;
  for (const [k, p] of Object.entries(DEMONS_CULTURAL_PROMPTS)) if (t.includes(k)) return p;
  const clean = title.replace(/^Lesson\s+\d+\s*[-—]\s*/, "").replace(/^Supplement\s+\d+\s*[-—]\s*(For\s+Lessons?\s+[\d\s&]+\s*[-—]\s*)?/, "").replace(/:\s*A\s+\w+\s+(View|Study|Guide|Introduction|Overview)$/, "");
  return `Spiritual warfare scene depicting ${clean}, biblical truth, divine authority over darkness, ${S}`;
}

function getPrompt(title: string, courseSlug: string): string {
  if (courseSlug === "gods-universal-plan-for-creation") return getGupfcPrompt(title);
  if (courseSlug === "angels") return getAngelsPrompt(title);
  if (courseSlug === "demons") return getDemonsPrompt(title);
  return `Biblical and theological scene depicting ${title}, ${S}`;
}

async function generateImage(prompt: string): Promise<string> {
  const body = JSON.stringify({ model: "recraftv4_1", prompt, size: "1024x1024", n: 1, response_format: "url" });
  const res = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST", headers: { Authorization: `Bearer ${RECRAFT_KEY}`, "Content-Type": "application/json" }, body,
  });
  if (!res.ok) { const text = await res.text(); throw new Error(`Recraft HTTP ${res.status}: ${text}`); }
  const data = await res.json();
  const url = data?.data?.[0]?.url;
  if (!url) throw new Error(`No URL in response`);
  return url;
}

async function downloadBuffer(url: string): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const get = url.startsWith("https") ? https.get : http.get;
    get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) { downloadBuffer(res.headers.location!).then(resolve).catch(reject); return; }
      const chunks: Buffer[] = []; res.on("data", (c) => chunks.push(c)); res.on("end", () => resolve(Buffer.concat(chunks))); res.on("error", reject);
    }).on("error", reject);
  });
}

async function compressAndUpload(imageUrl: string, filename: string): Promise<string> {
  const raw = await downloadBuffer(imageUrl);
  const compressed = await sharp(raw).resize({ width: 1280, withoutEnlargement: true }).jpeg({ quality: 80, progressive: true }).toBuffer();
  const blob = new Blob([compressed as unknown as BlobPart], { type: "image/jpeg" });
  const file = new File([blob], `${filename}.jpg`, { type: "image/jpeg" });
  const result = await utapi.uploadFiles(file);
  if (result.error) throw new Error(`Upload failed: ${JSON.stringify(result.error)}`);
  return result.data.ufsUrl || result.data.url;
}

function insertAboveFirstHeader(content: string, imageMarkdown: string): string {
  const lines = content.split("\n");
  let idx = -1;
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trim();
    if (lines[i].startsWith("# ") || lines[i].startsWith("## ") || lines[i].startsWith("### ") || /^[IVX]+\.\s+\S/.test(t)) { idx = i; break; }
  }
  if (idx >= 0) lines.splice(idx, 0, imageMarkdown, ""); else lines.unshift(imageMarkdown, "");
  return lines.join("\n");
}

async function cleanup() {
  console.log("=== CLEANUP PHASE ===\n");
  const lessons = await db.courseLesson.findMany({
    where: { OR: [{ content: { contains: "![" } }, { coverUrl: { not: null } }] },
    select: { id: true, title: true, content: true, coverUrl: true },
  });
  console.log(`Found ${lessons.length} lessons with images`);

  const allKeys: string[] = [];
  for (const l of lessons) allKeys.push(...extractUploadThingKeys(l.content, l.coverUrl));
  const uniqueKeys = [...new Set(allKeys)];
  console.log(`UploadThing keys to delete: ${uniqueKeys.length}`);

  const BATCH = 50;
  for (let i = 0; i < uniqueKeys.length; i += BATCH) {
    const batch = uniqueKeys.slice(i, i + BATCH);
    try { await utapi.deleteFiles(batch); console.log(`  Deleted batch ${Math.floor(i / BATCH) + 1} (${batch.length} files)`); }
    catch (e) { console.error(`  Failed to delete batch: ${(e as Error).message}`); }
  }

  let stripped = 0;
  for (const l of lessons) {
    const newContent = l.content ? stripImages(l.content) : null;
    if (newContent !== l.content || l.coverUrl) {
      await db.courseLesson.update({ where: { id: l.id }, data: { content: newContent, coverUrl: null } });
      stripped++;
    }
  }
  console.log(`Stripped images from ${stripped} lessons`);

  for (const dir of ["public/angels-lessons", "public/demons-lessons"]) {
    const p = `${process.cwd()}/${dir}`;
    if (fs.existsSync(p)) { fs.rmSync(p, { recursive: true, force: true }); console.log(`Deleted ${dir}`); }
  }
  console.log("\nCleanup complete.\n");
}

async function generate() {
  console.log("=== GENERATION PHASE ===\n");
  const lessons = await db.courseLesson.findMany({
    where: { type: { in: ["READING", "SUPPLEMENT"] }, content: { not: null } },
    orderBy: { order: "asc" },
    include: { chapter: { select: { content: { select: { slug: true, title: true } } } } },
  });
  console.log(`Found ${lessons.length} lessons to process\n`);
  const done = loadProgress();

  for (const lesson of lessons) {
    if (done.has(lesson.id)) { console.log(`  ✓ ${lesson.title}`); continue; }
    const courseSlug = lesson.chapter.content.slug;
    const prompt = getPrompt(lesson.title, courseSlug);
    console.log(`\n📖 ${lesson.title}`);
    console.log(`   Prompt: ${prompt.slice(0, 120)}...`);

    let recraftUrl: string;
    try { recraftUrl = await generateImage(prompt); console.log(`   Generated: ${recraftUrl.slice(0, 60)}...`); }
    catch (e) {
      console.error(`   ❌ Gen failed: ${(e as Error).message}`);
      await sleep(8000);
      try { recraftUrl = await generateImage(prompt); }
      catch (e2) { console.error(`   ❌ Retry failed, skip: ${(e2 as Error).message}`); continue; }
    }

    const slug = lesson.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40);
    let uploadedUrl: string;
    try { uploadedUrl = await compressAndUpload(recraftUrl, `${courseSlug}-${slug}`); console.log(`   Uploaded: ${uploadedUrl.slice(0, 60)}...`); }
    catch (e) { console.error(`   ❌ Upload failed: ${(e as Error).message}`); continue; }

    const imageMarkdown = `![${lesson.title}](${uploadedUrl})`;
    await db.courseLesson.update({
      where: { id: lesson.id },
      data: { content: insertAboveFirstHeader(lesson.content || "", imageMarkdown) },
    });
    console.log(`   💾 Saved`);
    done.add(lesson.id); saveProgress(done); await sleep(DELAY_MS);
  }
  console.log("\n✅ Done!");
}

async function main() { await cleanup(); await generate(); await db.$disconnect(); }
main().catch(async (e) => { console.error(e); await db.$disconnect(); process.exit(1); });
