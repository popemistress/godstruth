#!/usr/bin/env python3
"""
generate-lesson-images-v2.py
─────────────────────────────
Generates 25 unique thematic biblical images using Recraft v4.1 (recraftv4_1).
Each image is:
  - Generated at 1536x1024 (16:9) with recraftv4_1
  - Downloaded and compressed with Pillow (JPEG quality 82, optimized)
  - Saved to /tmp/lesson-images-compressed/

Output manifest: scripts/lesson-images-v2.json
  { "images": [{ "index": 0, "file": "/tmp/...", "prompt_tag": "..." }, ...] }

After this runs:  node scripts/upload-lesson-images-v2.mjs
Then:             python3 scripts/apply-lesson-images-v2.py
"""

import json, pathlib, sys, time, io, urllib.request, urllib.error
from PIL import Image

COMPRESSED_DIR = pathlib.Path("/tmp/lesson-images-compressed")
COMPRESSED_DIR.mkdir(exist_ok=True)

PROGRESS_FILE = pathlib.Path("scripts/lesson-images-v2.json")

# ── Load API key ──────────────────────────────────────────────────────────────
API_KEY = None
for line in pathlib.Path(".env.local").read_text().splitlines():
    if line.startswith("RECRAFT_API_KEY="):
        API_KEY = line.split("=", 1)[1].strip().strip('"').strip("'")
        break
if not API_KEY:
    print("ERROR: RECRAFT_API_KEY not found"); sys.exit(1)

# ── 25 unique thematic prompts ────────────────────────────────────────────────
# Each prompt is crafted to be realistic, relevant, wonderful, and captivating.
# They cover the full arc of the course: creation → law → grace → eternity.
IMAGES = [
    ("creation_cosmos",
     "The birth of the universe — a breathtaking cosmic nebula of gold, violet, and deep blue forming stars and galaxies from divine light, Hubble-quality deep space photography, awe-inspiring scale, photorealistic, no text, no people"),

    ("ancient_scroll",
     "An ancient Hebrew Torah scroll made of aged parchment, hand-calligraphed in black ink, unrolled on a weathered stone surface, dramatically lit by a single oil lamp flame, close-up editorial photography, photorealistic, no text, no people"),

    ("jerusalem_stars",
     "The Milky Way blazing in full glory over the limestone rooftops and domes of ancient Jerusalem at night, city walls glowing faintly in moonlight, breathtaking astrophotography, photorealistic, no people, no text"),

    ("mountain_divine_light",
     "A dramatic mountain peak at dawn, a single shaft of brilliant golden divine light breaking through parting storm clouds and striking the summit, chiaroscuro atmosphere, sacred and awe-inspiring, photorealistic, no people, no text"),

    ("olive_grove_dawn",
     "A grove of ancient gnarled olive trees, some over a thousand years old, catching the first light of dawn through morning mist, silver-green leaves glowing, sacred Mediterranean landscape, photorealistic, no people, no text"),

    ("jordan_river_sunrise",
     "The Jordan River at sunrise — crystal-clear amber water reflecting a sky of pink and gold, papyrus reeds on the bank, an ancient stone ford in the distance, perfect stillness, wide cinematic landscape, photorealistic, no people, no text"),

    ("garden_of_eden",
     "A lush paradisaical garden at golden hour — a gentle river winding through towering ancient trees, cascading flowers of every color, warm divine light filtering through the forest canopy, the Garden of Eden in its perfection, photorealistic, no people, no text"),

    ("moses_sinai",
     "Moses descending Mount Sinai holding aloft two glowing stone tablets, lightning and storm clouds behind him, his white hair windswept, divine radiance emanating from the tablets, dramatic and powerful, cinematic, photorealistic, no text"),

    ("angel_appearing",
     "A majestic angel appearing in blinding white and gold divine light, immense wings spread wide, standing above ancient stone steps, the surrounding landscape bathed in heavenly radiance, awe-inspiring and breathtaking, photorealistic, no text, no face visible"),

    ("cross_sunrise",
     "A simple wooden cross on a barren Judean hillside at sunrise, the sky ablaze with gold and crimson, divine light radiating outward from behind the cross in every direction, triumphant and moving, photorealistic, no people, no text"),

    ("noahs_ark_rainbow",
     "Noah's Ark resting on Mount Ararat, a perfect and complete rainbow arching across the sky above it, the floodwaters receding to reveal green hillsides, golden afternoon light, photorealistic, epic scale, no text"),

    ("baptism_river",
     "A moment of baptism in a sunlit river — a figure fully immersed in clear water, light refracting through the surface in shards of gold and white, dove of peace visible in the glowing sky above, photorealistic, no text"),

    ("wheat_harvest",
     "A vast golden wheat field at harvest time, stalks bending in a gentle breeze under a brilliant blue sky with dramatic clouds, warm afternoon light, timeless and abundant, aerial-style cinematic photography, photorealistic, no people, no text"),

    ("abraham_covenant",
     "Abraham alone in the desert at night, looking up at a vast star-filled sky — thousands of stars blazing above him, a bright divine light on the distant horizon representing God's covenant, ancient robes, profound and moving, photorealistic, no text"),

    ("ancient_city_gates",
     "Massive stone gates of an ancient Middle Eastern city at dusk, torches blazing on either side, the last rays of golden sunlight striking the upper ramparts, people-less streets, cinematic depth, photorealistic, no text, no people"),

    ("tabernacle_wilderness",
     "The ancient Israelite tabernacle in the wilderness at night — its white linen walls glowing from within, the pillar of fire blazing brilliantly above its entrance, the surrounding dark desert making it shine like a beacon, photorealistic, no text, no people"),

    ("daniel_lions",
     "The prophet Daniel kneeling in prayer inside a stone lion's den, a column of divine light descending from a hole in the ceiling onto him, multiple lions resting peacefully around him, miraculous protection, photorealistic, no text"),

    ("jesus_walking_water",
     "Jesus walking on the Sea of Galilee at night, surrounded by a warm divine radiance that reflects on the dark waves around him, a distant fishing boat visible through mist, moonlight and sacred light combined, photorealistic, no text"),

    ("rapture_ascending",
     "Believers ascending upward into radiant golden clouds at dawn — figures rising from a hillside landscape toward brilliant divine light, the moment of the Rapture, cinematic and breathtaking, photorealistic, no text"),

    ("heavenly_city",
     "A breathtaking heavenly city of gold and crystal on a radiant hilltop — gleaming towers and gates of light, the surrounding landscape infinite and green, a divine golden sky, the New Jerusalem, photorealistic, no text, no people"),

    ("prophet_writing",
     "An ancient prophet writing on a scroll by the light of an oil lamp in a stone chamber, parchment and quill, the weight of divine revelation visible in the moment, warm amber light, photorealistic, no text"),

    ("holy_spirit_dove",
     "A luminous white dove descending in a shaft of divine golden light above a calm body of water at dawn, the Holy Spirit, feathers catching the light, perfect stillness, photorealistic, no text, no people"),

    ("shepherd_flock",
     "A shepherd and his flock of sheep on rolling green Judean hills at sunset, long shadows stretching across the golden landscape, the shepherd's staff raised, timeless and peaceful, photorealistic, no text"),

    ("prayer_sunrise",
     "A lone figure in ancient robes kneeling in prayer on a rocky hilltop, arms raised toward a sky ablaze with the first light of dawn, rays of golden divine light breaking through clouds above, powerful and sacred, photorealistic, no text"),

    ("salvation_gate",
     "A narrow ancient stone doorway with brilliant white light streaming through it from beyond, the surrounding stone wall in shadow, the light beyond the gate representing salvation and eternity, photorealistic, no people, no text"),
]

# ── Progress ──────────────────────────────────────────────────────────────────
if PROGRESS_FILE.exists():
    progress = json.loads(PROGRESS_FILE.read_text())
else:
    progress = {"images": []}

done_indices = {img["index"] for img in progress["images"]}

def save():
    PROGRESS_FILE.write_text(json.dumps(progress, ensure_ascii=False, indent=2))

# ── Recraft API ───────────────────────────────────────────────────────────────
def generate(prompt: str) -> tuple[str | None, int | None]:
    """Generate with Recraft v4.1 and return (url, credits)."""
    payload = json.dumps({
        "prompt": prompt,
        "model": "recraftv4_1",
        "size": "1344x768",  # 16:9 — only supported landscape size for v4.1
        "n": 1,
    }).encode()
    req = urllib.request.Request(
        "https://external.api.recraft.ai/v1/images/generations",
        data=payload,
        headers={"Authorization": f"Bearer {API_KEY}", "Content-Type": "application/json"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=90) as r:
            data = json.loads(r.read())
            return data["data"][0]["url"], data.get("credits")
    except urllib.error.HTTPError as e:
        print(f" HTTP {e.code}: {e.read().decode()[:200]}")
        return None, None
    except Exception as ex:
        print(f" Error: {ex}")
        return None, None

def download_and_compress(url: str, dest: pathlib.Path, quality: int = 82) -> bool:
    """Download image, compress with Pillow, save as optimized JPEG."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read()
        img = Image.open(io.BytesIO(raw)).convert("RGB")
        img.save(dest, format="JPEG", quality=quality, optimize=True, progressive=True)
        orig_kb = len(raw) // 1024
        comp_kb = dest.stat().st_size // 1024
        print(f" compressed {orig_kb}KB → {comp_kb}KB ({100 - (comp_kb*100//orig_kb if orig_kb else 1)}% saved)", end="")
        return True
    except Exception as ex:
        print(f" compress error: {ex}")
        return False

# ── Main ──────────────────────────────────────────────────────────────────────
print("\n╔══════════════════════════════════════════════════════╗")
print("║  Lesson Image Generator — Recraft v4.1 + Compress   ║")
print("╚══════════════════════════════════════════════════════╝\n")
print(f"Generating {len(IMAGES)} unique thematic images...\n")

for idx, (tag, prompt) in enumerate(IMAGES):
    if idx in done_indices:
        print(f"  [{idx+1:02d}/{len(IMAGES)}] SKIP {tag}")
        continue

    dest_file = COMPRESSED_DIR / f"gt-section-{idx:02d}-{tag}.jpg"
    short_prompt = prompt[:65] + "…"
    print(f"  [{idx+1:02d}/{len(IMAGES)}] {short_prompt}", end="", flush=True)

    url, credits = generate(prompt)
    if not url:
        print(" ✗ FAILED")
        break

    ok = download_and_compress(url, dest_file)
    if not ok:
        print(" ✗ compress failed")
        break

    progress["images"].append({
        "index": idx,
        "tag": tag,
        "file": str(dest_file),
        "recraft_url": url,
    })
    save()
    print(f" ✓  ({credits} credits)")
    time.sleep(0.3)

done = len(progress["images"])
print(f"\n  Complete: {done}/{len(IMAGES)} images")
print(f"  Compressed files: {COMPRESSED_DIR}")
print(f"  Manifest: {PROGRESS_FILE}")
print("\nNext: node scripts/upload-lesson-images-v2.mjs\n")
