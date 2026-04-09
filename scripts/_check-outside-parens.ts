import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const lessons = await db.courseLesson.findMany({
    where: { content: { not: null } },
    select: { id: true, title: true, type: true, content: true },
  });

  const BOOK_ABBREVS = [
    "Gen","Ex","Exod","Lev","Num","Deut","Dt","Josh","Judg","Jdg","Ruth",
    "1 Sam","2 Sam","1 Kgs","2 Kgs","1 Ki","2 Ki","1 Kings","2 Kings",
    "1 Chr","2 Chr","1 Chron","2 Chron","Ezra","Neh","Esth","Est","Job",
    "Ps","Psa","Psalm","Prov","Pr","Eccl","Ecc","Song","Isa","Jer","Lam",
    "Ezek","Ez","Dan","Hos","Joel","Amos","Obad","Jon","Jonah","Mic","Nah",
    "Hab","Zeph","Hag","Zech","Mal",
    "Mt","Mk","Lk","Jn","Jhn","Acts","Rom",
    "1 Cor","2 Cor","Gal","Eph","Phil","Col",
    "1 Thess","2 Thess","1 Tim","2 Tim","Tit","Phile","Heb","Jas",
    "1 Pet","2 Pet","1 Jn","2 Jn","3 Jn","Jude","Rev",
    // With dots
    "Gen.","Ex.","Exod.","Lev.","Num.","Deut.","Josh.","Judg.","Ps.","Psa.",
    "Prov.","Eccl.","Isa.","Jer.","Lam.","Ezek.","Dan.","Hos.","Mic.","Nah.",
    "Hab.","Zeph.","Hag.","Zech.","Mal.","Mt.","Mk.","Lk.","Jn.","Rom.",
    "Gal.","Eph.","Phil.","Col.","Heb.","Jas.","Tit.","Rev.",
    "1 Sam.","2 Sam.","1 Kgs.","2 Kgs.","1 Chr.","2 Chr.","Neh.","Esth.",
    "1 Cor.","2 Cor.","1 Thess.","2 Thess.","1 Tim.","2 Tim.","Phile.",
    "1 Pet.","2 Pet.","1 Jn.","2 Jn.","3 Jn.",
    "Deut.","Obad.","Jon.","1 Ki.","2 Ki.",
  ].map(s => s.replace(/\./g, "\\.").replace(/(\d)\s+/g, "$1\\s+")).join("|");

  const INLINE_RE = new RegExp(
    `\\b(?:${BOOK_ABBREVS})\\s+\\d+:\\d+(?:[–\\-]\\d+)?`,
    "gi"
  );

  let totalOutside = 0;
  for (const lesson of lessons) {
    const text = lesson.content ?? "";
    // Remove all parenthetical groups to find refs outside parens
    const stripped = text.replace(/\([^)]{1,300}\)/g, "");
    const outsideMatches = [...stripped.matchAll(INLINE_RE)];
    if (outsideMatches.length > 0) {
      totalOutside += outsideMatches.length;
      console.log(`\n${lesson.type}: ${lesson.title}`);
      outsideMatches.slice(0, 5).forEach(m => console.log(`  OUTSIDE PAREN: "${m[0]}"`));
      if (outsideMatches.length > 5) console.log(`  ... and ${outsideMatches.length - 5} more`);
    }
  }
  console.log(`\nTotal refs outside parentheses: ${totalOutside}`);
  await db.$disconnect();
}
main().catch(console.error);
