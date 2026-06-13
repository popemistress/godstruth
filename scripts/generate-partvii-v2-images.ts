import fs from "fs";
import path from "path";

const RECRAFT_API_KEY = process.env.RECRAFT_API_KEY!;
const OUT = path.join(process.cwd(), "public", "demons-lessons");

const images = [
  { file: "l22-new-age.png", prompt: "New Age crystal shop interior bathed in purple neon light, crystals and tarot cards on shelves, incense smoke forming shadowy serpentine shapes, hidden dark entities lurking behind the appealing aesthetic, spiritual deception through beauty" },
  { file: "l23-occult.png", prompt: "Ancient occult library with forbidden tomes, astrology charts, scrying mirrors, and ritual circles on stone floor, shadowy robed figures performing divination, candlelight revealing demonic sigils carved in walls, forbidden knowledge and spiritual danger" },
  { file: "l24-ouija.png", prompt: "Ouija board on a table in a darkened room, planchette moving on its own, ghostly hands emerging from the board, shadowy entities materializing around the table, a teenager's terrified face reflected in the board's surface, portal to demonic contact" },
  { file: "l25-santeria.png", prompt: "Santeria altar with Catholic saint statues and African orisha icons side by side, ritual candles, animal bones, blood offerings, shadowy spirit entities hovering over the altar, syncretism between Christianity and paganism, spiritual confusion and demonic contract" },
  { file: "l26-tarot.png", prompt: "Tarot card reading spread on velvet cloth, the Tower card and Death card prominent, the reader's eyes reflecting a shadowy entity behind the questioner, familiar spirits visible as shadows reading along, divination and familiar spirit economy" },
  { file: "l27-psychics.png", prompt: "Psychic medium in dim parlor with curtains and crystal ball, glowing familiar spirits visible only to viewer surrounding her client, the spirit whispering details into the medium's ear, ancient spiritual transaction disguised as helpful service" },
  { file: "l28-witchcraft.png", prompt: "Modern witch casting a spell with herbs and candles in an apartment, vision board beside her, the covenantal nature of witchcraft visible as dark threads binding her to shadowy principalities above, self-will versus divine will, spirit of control" },
  { file: "l29-spirit-guides.png", prompt: "Radiant white-robed being appearing to a meditating woman, appearing beautiful and angelic but casting a dark serpentine shadow on the wall behind it, 2 Corinthians 11:14 angel of light deception, voluntary spiritual bondage" },
  { file: "l30-crystals.png", prompt: "Crystals arranged in chakra alignment on a woman's body during healing session, each crystal emitting dark spiritual energy invisible to her but visible to viewer, Hindu chakra system activated, idol worship through beautiful objects, demonic attachment through created things" },
  { file: "l31-astrology.png", prompt: "Ancient Babylonian star chart with planetary deities labeled, modern horoscope app on phone in foreground showing the same symbols, Marduk and Ishtar as principalities behind the planets, destiny versus divine providence, the enemy's use of created order for divination" },
  { file: "l32-yoga.png", prompt: "Yoga studio with sun salutation pose, Sanskrit deity names visible on the walls, the coiled serpent kundalini energy rising up a practitioner's spine as dark fire, shadowy Hindu deities receiving the offering of each pose, spiritual transactions disguised as exercise" },
  { file: "l33-adultery.png", prompt: "Shattered wedding rings on a table, the marriage covenant represented as a torn spiritual canopy above a couple, dark demonic figures entering through the breach, soul ties as visible glowing threads connecting the adulterer to another, covenant violation and spiritual consequence" },
  { file: "l34-pornography.png", prompt: "Man alone in dark room with phone screen glow on his face, demonic figures emerging from the screen wrapping chains around him, soul tie threads connecting him to shadows representing performers, spirit of lust enthroned above the scene, pharmakeia sorcery through screens" },
  { file: "l35-freemasonry.png", prompt: "Masonic lodge interior at night, blue lodge altar with compass and square, candidate kneeling for blood oath in darkness, shadowy figures in aprons performing ritual, blood covenant with GAOTU false deity, generational curse flowing down through family tree depicted behind the altar" },
  { file: "l36-curses.png", prompt: "Poisonous words forming visible spiritual arrows in the air flying toward a person, word curses from parent to child depicted as dark chains, occult practitioner sending hexes as dark birds, Proverbs 26:2 causeless curse unable to land on blood-covered believer" },
  { file: "l37-generational-curses.png", prompt: "Family tree visualization where the same demonic shadow follows through multiple generations, addiction and mental illness repeating as dark patterns down the branches, grandfather's occult covenant creating spiritual assignments for grandchildren, Exodus 20:5 generational mechanism visible" },
  { file: "l38-psychedelics.png", prompt: "Person on ayahuasca experiencing vivid demonic entity encounter, serpentine and insectile beings surrounding them in spirit realm, the vine of the dead literal meaning depicted, medical clinic setting contrasted with occult reality underneath, chemical key opening forbidden spiritual doors" },
  { file: "l39-reiki.png", prompt: "Reiki practitioner's hands over a client with Reiki symbols glowing above the hands, Reiki spirit guides as visible demonic entities directing the energy, attunement ritual depicted as spiritual initiation, demonic transfer through therapeutic touch, familiar spirits disguised as healing energy" },
  { file: "l40-hypnosis.png", prompt: "Patient in deep hypnotic trance while therapist holds a pendulum, demonic figures entering through the open mind, past-life regression showing familiar spirits implanting false memories, the will surrendered and consciousness handed to another voice, spiritual passivity as doorway" },
  { file: "l41-chakras.png", prompt: "Human spine with seven chakra centers as dark energy vortexes, the coiled serpent at the base beginning to rise, each activated chakra releasing a specific demonic manifestation, Hindu tantric symbolism depicting Shakti and Shiva, kundalini syndrome as partial possession" },
  { file: "l42-tm-mindfulness.png", prompt: "Person in TM meditation repeating mantra, the mantra words visible as Sanskrit deity names summoning corresponding demonic principalities, the empty swept mind of Matthew 12:43-45 depicted as an open house with seven demons entering, mindfulness teaching mental passivity" },
  { file: "l43-smudging.png", prompt: "Sage smudging ritual in a home, smoke forming spirit invocation shapes, directional spirits at four compass points being called, one demonic entity departing while inviting two more in its place, false cleansing contrasted with true cleansing by the blood of Jesus" },
  { file: "l44-law-of-attraction.png", prompt: "Vision board with money and luxury surrounded by glowing manifesting affirmations, serpentine entity behind the board granting wishes in exchange for covenant, the serpent's lie ye shall be as gods, word-faith witchcraft dressed as self-help, demons sometimes granting manifestations" },
  { file: "l45-contemplative-prayer.png", prompt: "Church sanctuary with contemplative prayer circle, participants in silent meditation with empty minds, demonic spirit of deception mimicking divine peace and descending on the group, Richard Rohr books visible, centering prayer identical to TM, wolf in religious clothing" },
  { file: "l46-enneagram.png", prompt: "Enneagram nine-pointed diagram glowing with occult energy, George Gurdjieff's mystical origins visible as channeling session in background, church members studying the diagram while demonic entities direct the typing, false identity replacing new creation in Christ, occult personality map" },
  { file: "l47-labyrinth.png", prompt: "Church labyrinth at night, a lone figure walking the spiral path toward the center, pagan goddess symbols embedded in the stone path, the labyrinth as initiation rite depicted with ancient mystery religion connections, altered meditative state and false spiritual encounter" },
  { file: "l48-paranormal.png", prompt: "Ghost hunters with EMF meters in haunted building, familiar spirits impersonating deceased person visible to viewer but not investigators, investigator smiling while demon attaches to his back, home contamination depicted as spirit following investigator home, EVP recorder as technological Ouija board" },
  { file: "l49-halloween.png", prompt: "Halloween night with children trick-or-treating against backdrop of occult high holy day celebration, Samhain ritual visible behind the festive surface, demonic activity peak night depicted with spiritual realm overlay, covenant by participation even in ignorance, thinning veil between worlds" },
  { file: "l50-occult-entertainment.png", prompt: "Child watching Harry Potter with a demonic figure sitting beside them teaching the occult mechanics, D&D books and horror films creating a pipeline to deeper involvement, neural pathways being formed as mirror neurons fire during occult scenes, entertainment as normalization" },
  { file: "l51-music-industry.png", prompt: "Concert stage with artist performing, crowd of thousands with hands raised in worship posture, occult eye of Horus and Baphomet symbols in stage design, artist channeling entities during performance, spirits transferring through recordings to listeners, sold-soul contract visible" },
  { file: "l52-tattoos.png", prompt: "Person with pentagrams and occult symbols tattooed on arms, the symbols glowing with demonic attachment visible in spirit realm, blood covenant through tattooing depicted, permanent marking as spiritual declaration, demonic assignment against the body through claimed territory" },
  { file: "l53-fetish-objects.png", prompt: "Living room with Buddha statue dreamcatcher and African masks on display, each object emitting dark spiritual contamination affecting family members in the home, idols as demonic anchors, Deuteronomy 7:26 abomination in the house, beautiful objects masking spiritual danger" },
  { file: "l54-feng-shui.png", prompt: "Interior design consultation with feng shui master arranging furniture using compass and charts, the chi energy depicted as demonic force responding to ritual arrangement, spirits of mammon and prosperity being invoked, geomancy and divination disguised as interior design" },
  { file: "l55-digital-divination.png", prompt: "Smartphone screen showing astrology app and AI chatbot claiming to channel the dead, familiar spirits operating through the digital interface, the screen as spiritual portal, young person consulting app for guidance instead of prayer, technology as occult access point" },
  { file: "l56-aliens-ufos.png", prompt: "UFO hovering over rural landscape at night, apparent alien encounter with beings delivering the same lie as the serpent in Eden, demons materializing in extraterrestrial form for 21st century acceptance, 2 Thessalonians 2 great deception depicted, lying wonders for the last days" },
  { file: "l57-false-gospels.png", prompt: "Prosperity gospel preacher in golden suit on stage promising wealth, progressive pastor removing biblical text from a Bible, NAR prophet receiving new revelation, each false gospel as a door to deceiving spirits, 2 Timothy 4:3-4 itching ears doctrine of demons" },
  { file: "l58-celebrity-idolatry.png", prompt: "Person on phone surrounded by celebrity worship paraphernalia, sports team altar in one corner and political candidate shrine in another, all displacing the empty Bible on the coffee table, idol taking God's rightful place, Exodus 20:5 jealousy provoked, spiritual vacuum created" },
  { file: "l59-self-harm.png", prompt: "Teenager in bathroom with cutting wounds, spirit of death hovering above the scene as demonic shadow, the blood ritual aspect visible spiritually, temporary relief as demonic anesthetic depicted, spirit escalating toward suicidal ideation, 1 Corinthians 6:19 temple violated" },
  { file: "l60-eating-disorders.png", prompt: "Young woman looking in mirror seeing distorted reflection, spirit of death and spirit of accusation visible as two figures standing at her shoulders, demonic deception about body image and identity, ritualistic food behaviors as occult parallel, eating disorder as slow self-destruction" },
  { file: "l61-transhumanism.png", prompt: "Person receiving brain chip implant in clinical setting, Neuralink interface glowing on skull, AI neural network taking over human identity, mark of the beast infrastructure visible in background, CRISPR editing God's image in DNA, serpent's lie you shall be as gods through technology" },
  { file: "l62-burning-man.png", prompt: "Desert festival at night with massive wooden effigy burning, crowd in various states of chemical alteration surrounding the fire, ancient Baal fire festival depicted as historical parallel, mass demonic invasion through collective drug use and sexual abandonment, temporary city as pagan sacred space" },
  { file: "l63-ai-deception.png", prompt: "Glowing AI interface screen displaying spiritual advice and prophecy to a trusting user, familiar spirits operating through the algorithm visible as shadows within the machine, AI pastor replacing the Holy Spirit, 1 John 2:27 anointing versus code, the turing test as theological threat" },
  { file: "l64-astral-projection.png", prompt: "Person attempting astral projection with silver cord extending from body, shadowy demonic entities in the astral plane waiting to attack and attach, the body left vacant as demons enter, soul fragmentation depicted, out-of-body experience as entering demonic domain territory" },
  { file: "l65-wicca.png", prompt: "Wiccan ritual circle casting with Horned God and Triple Goddess altar, young woman who looks innocent and nature-loving performing spells, beautiful pagan aesthetic masking demonic system, Acts 19:19 book burning as the response, the appealing exterior hiding spiritual bondage" },
];

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function generate(prompt: string, outFile: string) {
  const res = await fetch("https://external.api.recraft.ai/v1/images/generations", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${RECRAFT_API_KEY}` },
    body: JSON.stringify({ prompt, style: "digital_illustration", substyle: "engraving_color", width: 1365, height: 768, n: 1 }),
  });
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  const { data } = (await res.json()) as { data: { url: string }[] };
  const img = await fetch(data[0].url);
  if (!img.ok) throw new Error(`Download failed: ${img.status}`);
  fs.writeFileSync(outFile, Buffer.from(await img.arrayBuffer()));
}

async function main() {
  if (!RECRAFT_API_KEY) { console.error("RECRAFT_API_KEY not set"); process.exit(1); }
  fs.mkdirSync(OUT, { recursive: true });
  console.log(`Generating ${images.length} images...\n`);
  for (const { file, prompt } of images) {
    const outFile = path.join(OUT, file);
    if (fs.existsSync(outFile)) { console.log(`  ⊙ ${file} (skip)`); continue; }
    try {
      await generate(prompt, outFile);
      console.log(`  ✓ ${file}`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${err}`);
      await sleep(5000);
      continue;
    }
    await sleep(3000);
  }
  console.log("\nDone.");
}

main().catch(console.error);
