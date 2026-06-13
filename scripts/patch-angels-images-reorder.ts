import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// Inject image at top of content (before the first ## heading)
function injectImage(content: string, alt: string, path: string): string {
  const tag = `![${alt}](${path})\n\n`;
  // Already has this image — skip
  if (content.includes(path)) return content;
  // Prepend before the first ## heading
  const headingIdx = content.indexOf("## ");
  if (headingIdx === -1) return tag + content;
  return tag + content.slice(headingIdx);
}

async function main() {
  // ──────────────────────────────────────────────
  // 1. Inject missing images into lessons
  // ──────────────────────────────────────────────
  const imagePatch: Array<{ id: string; alt: string; path: string }> = [
    { id: "cmq6612uj0003geo043mie4yb", alt: "What Are Angels",            path: "/angels-lessons/l1-what-are-angels.png" },
    { id: "cmq6612un0005geo04nmedsiy", alt: "How Angels Know",             path: "/angels-lessons/l2-angels-know.png" },
    { id: "cmq6612uq0007geo0goxvka4n", alt: "Supplement 1 Nature",         path: "/angels-lessons/s1-nature-knowledge.png" },
    { id: "cmq6612us0009geo0loz4ec77", alt: "Creation of Angels",           path: "/angels-lessons/l3-creation-of-angels.png" },
    { id: "cmq6612uv000bgeo05oipwit7", alt: "Angels Across Scripture",      path: "/angels-lessons/l4-angels-scripture.png" },
    { id: "cmq6612v2000hgeo0ciixkph8", alt: "The Seraphim",                 path: "/angels-lessons/l5-seraphim.png" },
    { id: "cmq6612v4000jgeo01v2ejdwo", alt: "The Cherubim",                 path: "/angels-lessons/l6-cherubim.png" },
    { id: "cmq6612v8000ngeo03byfmsyu", alt: "The Thrones",                  path: "/angels-lessons/l7-thrones.png" },
    { id: "cmq6612va000pgeo019mep2tx", alt: "The Living Creatures",         path: "/angels-lessons/l8-living-creatures.png" },
    { id: "cmq6612vg000vgeo0scoc75ik", alt: "Dominations and Virtues",      path: "/angels-lessons/l9-dominations-virtues.png" },
    { id: "cmq6612vi000xgeo0z961cywt", alt: "Powers and Principalities",    path: "/angels-lessons/l10-powers-principalities.png" },
    { id: "cmq6612vo0015geo0yzc7gzjn", alt: "The Archangels",               path: "/angels-lessons/l11-archangels.png" },
    { id: "cmq6612vq0017geo0q1cf7q8z", alt: "Saint Michael",                path: "/angels-lessons/l12-saint-michael.png" },
    { id: "cmq6612vu001bgeo0jfsolgd6", alt: "Saint Gabriel",                path: "/angels-lessons/l13-saint-gabriel.png" },
    { id: "cmq6612vv001dgeo07rmh6kqn", alt: "Saint Raphael",                path: "/angels-lessons/l14-saint-raphael.png" },
    { id: "cmq6612w0001jgeo0budnsxei", alt: "Guardian Angels",              path: "/angels-lessons/l15-guardian-angels.png" },
    { id: "cmq6612w1001lgeo0f4yxvul5", alt: "Devotion to Holy Angels",      path: "/angels-lessons/l16-devotion-angels.png" },
    { id: "cmq6612w3001ngeo03hm72y4a", alt: "Supplement 9 Guardian",        path: "/angels-lessons/s9-guardian-devotion.png" },
    { id: "cmq6612w5001pgeo05fa4ywfe", alt: "Angels in the Old Testament",  path: "/angels-lessons/l17-angels-old-testament.png" },
    { id: "cmq6612w6001rgeo0k5pju6rj", alt: "Angels in the New Testament",  path: "/angels-lessons/l18-angels-new-testament.png" },
    { id: "cmq6612w9001vgeo0ta3pkxhu", alt: "Final Synthesis Angels",       path: "/angels-lessons/s11-final-synthesis.png" },
  ];

  console.log("Injecting images into lessons...");
  for (const { id, alt, path } of imagePatch) {
    const lesson = await db.courseLesson.findUnique({ where: { id }, select: { content: true, title: true } });
    if (!lesson) { console.log(`  ✗ NOT FOUND: ${id}`); continue; }
    if (lesson.content?.includes(path)) { console.log(`  ⊙ already has image: ${lesson.title.substring(0, 50)}`); continue; }
    const newContent = injectImage(lesson.content ?? "", alt, path);
    await db.courseLesson.update({ where: { id }, data: { content: newContent } });
    console.log(`  ✓ ${lesson.title.substring(0, 60)}`);
  }

  // ──────────────────────────────────────────────
  // 2. Reorder Part V — OT/NT before practical
  // Current:  L15(0) L16(1) S9(2) L17(3) L18(4) S10(5) S11(6) Quiz(7)
  // Proposed: L17(0) L18(1) S10(2) L15(3) L16(4) S9(5) S11(6) Quiz(7)
  // ──────────────────────────────────────────────
  console.log("\nReordering Part V lessons...");

  // Use temp high-order values to avoid unique constraint conflicts during update
  const reorder = [
    { id: "cmq6612w5001pgeo05fa4ywfe", tempOrder: 100, finalOrder: 0 }, // L17 → 0
    { id: "cmq6612w6001rgeo0k5pju6rj", tempOrder: 101, finalOrder: 1 }, // L18 → 1
    { id: "cmq6612w8001tgeo004uu8pty", tempOrder: 102, finalOrder: 2 }, // S10 → 2
    { id: "cmq6612w0001jgeo0budnsxei", tempOrder: 103, finalOrder: 3 }, // L15 → 3
    { id: "cmq6612w1001lgeo0f4yxvul5", tempOrder: 104, finalOrder: 4 }, // L16 → 4
    { id: "cmq6612w3001ngeo03hm72y4a", tempOrder: 105, finalOrder: 5 }, // S9  → 5
    // S11 (6) and Quiz (7) stay in place — no need to move
  ];

  // Pass 1: temp orders
  for (const { id, tempOrder } of reorder) {
    await db.courseLesson.update({ where: { id }, data: { order: tempOrder } });
  }
  // Pass 2: final orders
  for (const { id, finalOrder } of reorder) {
    await db.courseLesson.update({ where: { id }, data: { order: finalOrder } });
  }
  console.log("  ✓ Part V reordered: L17 → L18 → S10 → L15 → L16 → S9 → S11 → Quiz");

  console.log("\nDone.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
