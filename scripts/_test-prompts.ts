// Quick test of getPrompts for all affected lessons
const titles = [
  "Lesson 10 — God's Plan for the Needs of Man",
  "Lesson 11 — The Dispensation of Conscience",
  "Lesson 19 — The Dispensation of Grace",
  "Lesson 37 — Where Are the Dead?",
  "Lesson 38 — The Seven Judgments of Scripture",
  "Lesson 39 — The Book of Daniel",
  "Lesson 43 — The Rapture of the Church",
  "Lesson 45 — Sun-Clothed Woman, Manchild, Dragon, Beast, and False Prophet",
];

// Paste the getPrompts function inline for testing
const S = "photorealistic, highly detailed, cinematic lighting, 8K quality";

function getPrompts(title: string): string[] {
  const t = title.toLowerCase();
  const lessonNum = (() => {
    const m = title.match(/^Lesson\s+(\d+)\b/);
    return m ? parseInt(m[1], 10) : 0;
  })();
  if (t.includes("plan for the needs") || lessonNum === 10)
    return ["God's abundant provision…"];
  if (t.includes("conscience") || lessonNum === 11)
    return ["Noah receiving divine warning…"];
  if (t.includes("dispensation of grace") || lessonNum === 19)
    return ["Pentecost scene…"];
  if (t.includes("where are the dead") || lessonNum === 37)
    return ["Paradise with faithful souls…"];
  if (t.includes("seven judgments") || lessonNum === 38)
    return ["Great White Throne judgment…"];
  if (t.includes("book of daniel") || lessonNum === 39)
    return ["Daniel in the lion's den…"];
  if (t.includes("rapture") || lessonNum === 43)
    return ["Rapture of the church…"];
  if (t.includes("sun-clothed woman") || t.includes("manchild") || lessonNum === 45)
    return ["Woman clothed with the sun…"];
  return ["generic fallback"];
}

for (const title of titles) {
  const prompts = getPrompts(title);
  console.log(`${title} → ${prompts[0]}`);
}
