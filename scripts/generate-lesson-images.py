#!/usr/bin/env python3
"""
generate-lesson-images.py
─────────────────────────
Generates images for the Gods Universal Plan for Creation course using Recraft API.
Produces:
  - 6 cycling section-divider images (reused after every 3rd section in all lessons)
  - 52 lesson hero images (one per lesson, stored in CourseLesson.coverUrl)

Output: scripts/lesson-images.json
  {
    "section_images": ["url1", "url2", ...],
    "hero_images": { "1": "url", "2": "url", ... }
  }

Run:  python3 scripts/generate-lesson-images.py
Then: python3 scripts/apply-lesson-images.py
"""

import json, pathlib, re, time, sys
import urllib.request, urllib.error

API_KEY = None
OUTPUT_FILE = pathlib.Path("scripts/lesson-images.json")
PROGRESS_FILE = pathlib.Path("scripts/lesson-images-progress.json")

# ── Load API key from .env.local ──────────────────────────────────────────────
env_text = pathlib.Path(".env.local").read_text()
for line in env_text.splitlines():
    if line.startswith("RECRAFT_API_KEY="):
        API_KEY = line.split("=", 1)[1].strip().strip('"').strip("'")
        break

if not API_KEY:
    print("ERROR: RECRAFT_API_KEY not found in .env.local")
    sys.exit(1)

# ── Image prompts ─────────────────────────────────────────────────────────────

SECTION_IMAGES = [
    "Ancient Judean desert landscape at golden hour, warm light raking across layered sandstone cliffs, a solitary ancient olive tree silhouetted against a vast amber and rose sky, distant hills fading into atmospheric haze, cinematic depth of field, no people, no text",
    "Ancient Hebrew scroll made of aged parchment, partially unrolled on weathered stone, illuminated by warm candlelight from a clay oil lamp, hand-written ink letters, intricate texture detail, dramatic close-up editorial photography, shallow depth of field, no text",
    "The Milky Way arching brilliantly over the stone walls and rooftops of ancient Jerusalem at night, moonlight casting silver light on limestone, breathtaking astrophotography perspective, stars reflected faintly in a cistern below, no people, no text",
    "Ancient stone altar on a mountain peak at dawn, a dramatic beam of golden divine light descending through parting storm clouds onto the altar, chiaroscuro lighting, sacred and awe-inspiring atmosphere, no people, no text",
    "Ancient olive grove at dawn, gnarled thousand-year-old olive trees with silver-green leaves catching morning mist, soft golden rays filtering through gnarled branches, sacred and serene, Mediterranean landscape, no people, no text",
    "The Jordan River at sunrise, crystal-clear water reflecting a sky ablaze with pink and gold, reeds and papyrus along the banks, an ancient stone ford crossing in the distance, divine peace and stillness, wide cinematic landscape, no people, no text",
]

LESSON_HEROES = [
    # L01
    ("1", "God's Plan for Man",
     "A majestic ancient cosmic scroll unfurling across a star-filled universe, galaxies and nebulae visible within the aged parchment, rays of golden divine light emanating from the center where the scroll is sealed, breathtaking cosmic scale, photorealistic, cinematic, no text"),
    # L02
    ("2", "The Holy Scriptures",
     "An illuminated ancient Bible manuscript open on a stone altar inside a vaulted stone cathedral, warm golden light streaming through a tall stained glass window illuminating the hand-calligraphed pages in Latin and Hebrew, dust motes floating in sacred air, photorealistic, no text"),
    # L03
    ("3", "How to Interpret the Bible",
     "A wise elderly scholar's weathered hands carefully examining an ancient Hebrew scroll with a magnifying glass by candlelight, stacks of ancient manuscripts and clay tablets surrounding him, warm amber light, deep reverence and study, photorealistic, no text"),
    # L04
    ("4", "The Truth About God",
     "The infinite nature of God depicted as Earth seen from space, the cosmos stretching beyond with brilliant nebulae in deep blues and gold, an overwhelming divine light breaking through from beyond the visible universe, transcendent and awe-inspiring, photorealistic, no text"),
    # L05
    ("5", "The Original Creations of God",
     "The breathtaking moment of cosmic creation, a swirling nebula of gold and violet forming planets and stars from a central divine light, primordial cosmic drama, Hubble-quality deep space photography, awe-inspiring, photorealistic, no text"),
    # L06
    ("6", "Satan and the Spirit World",
     "A dramatic spiritual landscape divided between heavenly radiant light above and shadowy turbulent darkness below, an angelic figure silhouetted against blazing gold while shadows roil beneath, symbolic spiritual warfare, cinematic, photorealistic, no text"),
    # L07
    ("7", "The Dispensation of Angels",
     "Majestic angels with luminous white wings hovering in radiant golden light above ancient Jerusalem at dusk, the city glowing below, divine beings of immense grandeur and beauty, breathtaking and awe-inspiring, photorealistic, no text"),
    # L08
    ("8", "The Story of Re-Creation",
     "The primordial earth emerging from formless darkness as divine light penetrates the deep waters, rays of gold and white splitting through utter blackness over a vast ocean, the moment of re-creation, cinematic and majestic, photorealistic, no text"),
    # L09
    ("9", "The Dispensation of Innocence",
     "The Garden of Eden at golden hour, a lush paradise with a gentle river winding through flowering trees, cascading flowers and fruit trees, warm divine light filtering through an ancient forest canopy, paradisaical and serene, photorealistic, no people, no text"),
    # L10
    ("10", "God's Plan for the Needs of Man",
     "A shepherd with his flock of sheep on rolling green Judean hills at sunset, long shadows stretching across the landscape, golden light bathing the scene in warmth, the shepherd's staff raised, ancient and timeless, photorealistic, no text"),
    # L11
    ("11", "The Dispensation of Conscience",
     "A solitary robed figure kneeling in prayer on a rocky hillside at dawn, arms raised toward a sky where rays of divine light break through parting clouds above, ancient Middle Eastern landscape, powerful and sacred, photorealistic, no text"),
    # L12
    ("12", "Why God's Plan for Man Is Not Realized",
     "A broken stone altar in an ancient wilderness, scattered offerings, dark storm clouds overhead with a single narrow beam of golden light breaking through onto the cracked altar, dramatic and somber, photorealistic, no text"),
    # L13
    ("13", "The Dispensation of Human Government",
     "The Tower of Babel under construction rising against a dramatic stormy sky, thousands of ancient laborers visible on the ziggurat scaffolding, lightning illuminating the scene from behind dark clouds, cinematic and epic, photorealistic, no text"),
    # L14
    ("14", "Divine Healing and Divine Health",
     "A pair of healing hands glowing with warm divine golden light, rays emanating between the fingers, a figure being raised in the background against a bright sunrise, miraculous and tender, photorealistic, no text"),
    # L15
    ("15", "The Dispensation of Promise",
     "Abraham standing in the open desert at night, looking upward at a vast star-filled sky, the Milky Way blazing overhead, a radiant light on the horizon representing God's covenant, ancient robes, profound and moving, photorealistic, no text"),
    # L16
    ("16", "Asking and Receiving from God",
     "Hands raised in prayer toward a glowing sunrise sky, shafts of golden divine light streaming down through parting clouds onto the outstretched hands, ancient Judean landscape in background, photorealistic, no text"),
    # L17
    ("17", "The Dispensation of Law",
     "Moses descending Mount Sinai carrying glowing stone tablets, thunderclouds and dramatic lightning behind him, his white hair and beard windswept, divine radiance emanating from the tablets, epic and powerful, photorealistic, no text"),
    # L18
    ("18", "The Old Testament Church",
     "The ancient Israelite tabernacle glowing with divine light in the wilderness at night, a pillar of fire blazing above its roof illuminating the encampment below, sacred and magnificent, photorealistic, no text"),
    # L19
    ("19", "The Dispensation of Grace",
     "A wooden cross on a hillside at sunrise, the sky blazing with gold and purple, rays of divine light radiating outward from the cross in every direction, peaceful and triumphant, photorealistic, no text"),
    # L20
    ("20", "The New Testament Program for the Modern Church",
     "Early Christians gathered in an ancient Roman-era stone room lit by candles and oil lamps, diverse faces of men and women praying together, warm and intimate community, photorealistic, no text"),
    # L21
    ("21", "The Truth About Jesus Christ",
     "Jesus walking on the Sea of Galilee at night, surrounded by a divine radiant glow that reflects on the dark waves, the disciples' fishing boat visible in the background, moonlight and golden divine light, breathtaking and miraculous, photorealistic, no text"),
    # L22
    ("22", "A Christian's Power of Attorney",
     "An ancient royal scroll bearing a golden wax seal, partially unrolled to reveal an illuminated parchment with official markings, rays of divine authority and golden light surrounding it on a stone surface, powerful and authoritative, photorealistic, no text"),
    # L23
    ("23", "The Bible Doctrine of Sin",
     "A crossroads in an ancient Judean landscape, one path bathed in warm golden light leading through green hills, the other descending into shadow and darkness, a solitary figure standing at the junction, photorealistic, no text"),
    # L24
    ("24", "How to Get Rid of Sin and Sickness",
     "A figure rising from dark turbulent waters into brilliant divine light above, transformation and redemption visible in the moment of emergence, warm golden rays breaking through clouds, hopeful and powerful, photorealistic, no text"),
    # L25
    ("25", "The Truth About the Holy Spirit",
     "A radiant white dove descending from heaven through a shaft of golden light above the River Jordan at dawn, the Spirit of God represented in breathtaking photorealism, the dove's wings catching the morning light, no text"),
    # L26
    ("26", "The Gifts and Fruit of the Holy Spirit",
     "A thriving ancient olive tree heavy with golden fruit in full morning sunlight, dew on the leaves catching the light like jewels, a warm Mediterranean grove setting, abundant and beautiful, photorealistic, no text"),
    # L27
    ("27", "The Doctrine of the Trinity",
     "Three interconnected beams of divine light — gold, white, and radiant silver — meeting at a perfect nexus in an infinite heavenly space, representing Father Son and Holy Spirit as one, transcendent and beautiful, photorealistic, no text"),
    # L28
    ("28", "Faith — How to Attain All Needs of Life",
     "A robed figure walking confidently across a narrow ancient stone bridge over a deep canyon toward radiant divine light on the far side, deep faith and trust depicted, cinematic and inspiring, photorealistic, no text"),
    # L29
    ("29", "The New Testament Church",
     "Early Christians in first-century Jerusalem, a diverse community of believers gathered around a simple table in an upper room lit by oil lamps, breaking bread together in fellowship, warm and authentic, photorealistic, no text"),
    # L30
    ("30", "The Truth About the Baptism of the Holy Spirit",
     "A person emerging from baptismal waters as a luminous dove descends in golden light from above, water droplets catching the light, divine transformation and anointing, photorealistic, no text"),
    # L31
    ("31", "The Kingdom of Heaven and the Kingdom of God",
     "A breathtaking vision of a golden heavenly city on a radiant hilltop, gleaming walls and towers of light, the surrounding landscape vast and green, a divine golden sky overhead, majestic and eternal, photorealistic, no text"),
    # L32
    ("32", "The Old and New Covenants",
     "Two ancient stone tablets of the Law beside an open New Testament scroll on a stone surface, divine light illuminating both equally, representing the transition from Law to Grace, photorealistic, no text"),
    # L33
    ("33", "The Biblical Doctrine of Salvation",
     "A narrow gate of brilliant divine light opening in a dark ancient stone wall, the gate radiating warmth and life, the surrounding darkness contrasting with the hope beyond, photorealistic, no text"),
    # L34
    ("34", "The Truth About Sanctification and Justification",
     "A robed figure standing in radiant divine light, white garments glowing, arms open in surrender and peace, the light of holiness and righteousness surrounding them, ancient landscape, photorealistic, no text"),
    # L35
    ("35", "The Truth About Eternal Security",
     "An ancient city with massive impenetrable walls and eternal burning torches at its gates, a starry sky overhead, symbolizing the unshakeable security of God's promise, photorealistic, no text"),
    # L36
    ("36", "Fifteen Great Covenants of Scripture",
     "Fifteen ancient scrolls laid out in a row on a stone library table, each sealed with different colored wax seals and divine impressions, warm library candlelight, photorealistic, no text"),
    # L37
    ("37", "Where Are the Dead?",
     "A peaceful ancient cemetery on a hillside at sunrise, the golden morning light breaking through clouds and casting divine rays across the stone markers, resurrection hope in the scene, photorealistic, no text"),
    # L38
    ("38", "The Seven Judgments of Scripture",
     "A majestic divine courtroom with seven thrones arranged in a semicircle, radiant white light filling the space, ancient grandeur and solemnity, awe-inspiring and holy, photorealistic, no text"),
    # L39
    ("39", "The Book of Daniel",
     "The prophet Daniel kneeling in prayer inside a lion's den, bathed in divine light from above while multiple lions rest peacefully around him, miraculous divine protection, photorealistic, no text"),
    # L40
    ("40", "Daniel's Seventieth Week and the Tribulation",
     "A dramatic prophetic vision of ancient Jerusalem under a sky of breaking seals and dark storm clouds, divine prophecy being fulfilled, a great light on the horizon, cinematic and epic, photorealistic, no text"),
    # L41
    ("41", "A Gist of the Book of Revelation",
     "An apocalyptic vision from Revelation, the heavens open with blinding divine light, seven golden lampstands glowing below, a majestic heavenly scene of judgment and glory, cinematic and breathtaking, photorealistic, no text"),
    # L42
    ("42", "Heaven and the Resurrections",
     "The resurrection of the dead depicted as radiant figures rising in white robes from a flowering hillside into brilliant divine light above, a sea of the redeemed ascending, photorealistic, no text"),
    # L43
    ("43", "The Rapture of the Church",
     "Believers ascending upward into radiant golden clouds at dawn, a mix of modern and ancient figures rising from a hillside landscape toward divine light, the rapture, cinematic and breathtaking, photorealistic, no text"),
    # L44
    ("44", "Exposition of Matthew 24 and 25",
     "Jesus sitting on the Mount of Olives overlooking the gleaming city of Jerusalem at golden hour, his disciples gathered around him listening intently, a moment of profound prophetic teaching, photorealistic, no text"),
    # L45
    ("45", "Sun-Clothed Woman, Manchild, Dragon, Beast",
     "A prophetic Revelation vision of a radiant woman clothed in sunlight standing on the moon crowned with twelve stars, a great red dragon in the turbulent sky behind her, cosmic and dramatic, photorealistic, no text"),
    # L46
    ("46", "The Beasts Out of the Sea and Earth",
     "A dramatic storm-tossed sea at night with dark ominous symbolic beast forms rising from the churning waves under a lightning-torn sky, prophetic biblical imagery, cinematic and powerful, photorealistic, no text"),
    # L47
    ("47", "The Beast with Seven Heads and Ten Horns",
     "An ancient prophetic vision of symbolic empires represented by seven crowned heads rising from tumultuous dark waters, dramatic red and gold sky, biblical prophecy imagery, cinematic, photorealistic, no text"),
    # L48
    ("48", "The Ten Horns and the Beast Itself",
     "Ten iron thrones crowned with gold in a vast dark hall, each representing world powers, a dramatic shaft of divine light cutting through the darkness, ancient symbolic imagery of earthly kingdoms, photorealistic, no text"),
    # L49
    ("49", "The Marriage Supper, Second Advent, and Armageddon",
     "A magnificent heavenly wedding banquet table set with golden vessels and white linen, and above in the radiant sky Jesus returning on a white horse leading armies of heaven, epic cinematic double scene, photorealistic, no text"),
    # L50
    ("50", "The Dispensation of Divine Government",
     "Christ reigning from a glorious golden throne in a restored Jerusalem, the nations gathered before him in the millennium kingdom, divine government established on earth, majestic and triumphant, photorealistic, no text"),
    # L51
    ("51", "The New Heaven and the New Earth",
     "A breathtaking new creation, crystal-clear seas under a perfect sky, luminous mountains of light, the New Jerusalem descending from heaven as a radiant city of gold and crystal, eternal and glorious, photorealistic, no text"),
    # L52
    ("52", "The Bride of Christ",
     "The glorified Bride of Christ, a vast multitude of believers in white robes with golden crowns gathered in a breathtaking heavenly city, radiant divine light surrounding them, the church united with Christ for eternity, photorealistic, no text"),
]

# ── Recraft API helper ────────────────────────────────────────────────────────

def generate_image(prompt: str, style: str = "realistic_image") -> str | None:
    """Calls Recraft API and returns the image URL, or None on failure."""
    payload = json.dumps({
        "prompt": prompt,
        "style": style,
        "size": "1536x1024",
        "n": 1,
        "model": "recraftv3",
    }).encode("utf-8")

    req = urllib.request.Request(
        "https://external.api.recraft.ai/v1/images/generations",
        data=payload,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            data = json.loads(resp.read())
            credits_left = data.get("credits", "?")
            url = data["data"][0]["url"]
            return url, credits_left
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"    HTTP {e.code}: {body[:200]}")
        return None, None
    except Exception as ex:
        print(f"    Error: {ex}")
        return None, None

# ── Load progress ─────────────────────────────────────────────────────────────

if PROGRESS_FILE.exists():
    progress = json.loads(PROGRESS_FILE.read_text())
else:
    progress = {"section_images": [], "hero_images": {}}

def save_progress():
    PROGRESS_FILE.write_text(json.dumps(progress, ensure_ascii=False, indent=2))

# ── Generate section images ───────────────────────────────────────────────────

print("\n╔══════════════════════════════════════════════════════╗")
print("║  Gods Truth — Lesson Image Generator (Recraft)      ║")
print("╚══════════════════════════════════════════════════════╝\n")

print("── SECTION DIVIDER IMAGES (6 total) ──────────────────")
for i, prompt in enumerate(SECTION_IMAGES):
    if i < len(progress["section_images"]):
        print(f"  [{i+1}/6] SKIP (already done)")
        continue
    short = prompt[:60].rstrip() + "…"
    print(f"  [{i+1}/6] {short}", end="", flush=True)
    url, credits = generate_image(prompt)
    if url:
        progress["section_images"].append(url)
        save_progress()
        print(f" ✓  ({credits} credits left)")
    else:
        print(f" ✗  FAILED — stopping")
        sys.exit(1)
    time.sleep(0.5)

print(f"\n  Section images complete: {len(progress['section_images'])}/6\n")

# ── Generate lesson hero images ───────────────────────────────────────────────

print("── LESSON HERO IMAGES (52 total) ─────────────────────")
for num_str, title, prompt in LESSON_HEROES:
    if num_str in progress["hero_images"]:
        print(f"  [L{num_str:>2}] SKIP: {title[:40]}")
        continue
    print(f"  [L{num_str:>2}] {title[:45]}", end="", flush=True)
    url, credits = generate_image(prompt)
    if url:
        progress["hero_images"][num_str] = url
        save_progress()
        print(f" ✓  ({credits} credits left)")
    else:
        print(f" ✗  FAILED (out of credits or error)")
        break
    time.sleep(0.5)

hero_done = len(progress["hero_images"])
print(f"\n  Hero images complete: {hero_done}/52\n")

# ── Write final output ────────────────────────────────────────────────────────

OUTPUT_FILE.write_text(json.dumps(progress, ensure_ascii=False, indent=2))
print(f"Results written to {OUTPUT_FILE}")
print(f"\nNext step: python3 scripts/apply-lesson-images.py\n")
