import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function patch(id: string, label: string, find: string, replace: string) {
  const lesson = await db.courseLesson.findUnique({ where: { id }, select: { content: true } });
  if (!lesson?.content?.includes(find)) { console.error(`  ✗ ${label}: not matched`); return; }
  await db.courseLesson.update({ where: { id }, data: { content: lesson.content.replace(find, replace) } });
  console.log(`  ✓ ${label}`);
}

// ── L21: correct citation is "1 John 4:2-3" not "1 John 4:2" ────────────────
const L21_FIND = `**Ministry response:** There is no compromise. [1 John 4:2-3](data-scripture="1 John 4:2") gives the test of every spirit: does it confess that Jesus Christ has come in the flesh? Anything that does not pass this test is not of God, regardless of how spiritual, how moral, how compelling, or how broadly accepted it is. The confrontation with this spirit is not aggressive argument but clear, loving, unashamed proclamation: *Jesus Christ is Lord.* That confession is itself the binding of this spirit.

---

### The Twelve Together`;

const L21_REPLACE = `**Ministry response:** There is no compromise. [1 John 4:2-3](data-scripture="1 John 4:2") gives the test of every spirit: does it confess that Jesus Christ has come in the flesh? Anything that does not pass this test is not of God, regardless of how spiritual, how moral, how compelling, or how broadly accepted it is. The confrontation with this spirit is not aggressive argument but clear, loving, unashamed proclamation: *Jesus Christ is Lord.* That confession is itself the binding of this spirit.

### A Personal Examination

The Spirit of the Antichrist is the most difficult strongman to recognize in yourself — because it does not feel like rebellion. It feels like open-mindedness, like intellectual honesty, like charity toward others. It says: *surely God is big enough to save people who are sincere in other traditions. Surely Jesus is not the only way. Surely the resurrection is more metaphor than event.*

These feel like generous thoughts. The Spirit of the Antichrist is the most gracious-sounding of the twelve.

Before moving on, answer these three questions as honestly as you can — not what you believe formally, but what you believe functionally, in the way you actually live:

**1.** When a thoughtful, moral, spiritually serious person in your life holds a different religious framework — do you hold in your mind the conviction that Jesus Christ is their only way to God, or do you find yourself quietly hoping there is another path for them because that path feels kinder?

**2.** When you read [John 14:6](data-scripture="John 14:6") — *"No one comes to the Father except through me"* — do you feel settled in it, or do you feel the need to qualify it, soften it, or find an interpretation that reduces its exclusivity?

**3.** Is there any aspect of the specific, historical, bodily resurrection of Jesus Christ that you have privately bracketed — treated as negotiable or metaphorical — to avoid intellectual difficulty or social friction?

These are not trick questions. They are the diagnostic questions the Spirit of the Antichrist is designed to make you avoid. The antidote is not to feel guilty for asking them. It is to answer them honestly, bring the honest answer to God, and let the confession *Jesus Christ is Lord* — spoken specifically, not generically — do its work.

---

### The Twelve Together`;

// ── S9: exact tail from the lesson ───────────────────────────────────────────
const S9_FIND = `Where does your functional belief system diverge from your stated theology? Where do you live, in practice, as though the spirit world were theoretical? That gap is where split-level Christianity lives.`;

const S9_REPLACE = `Where does your functional belief system diverge from your stated theology? Where do you live, in practice, as though the spirit world were theoretical? That gap is where split-level Christianity lives.

---

### A Structured Self-Audit

The following five scenarios expose the gap between formal and functional belief. For each one, answer honestly: *what would I actually do?* — not what I know I should do.

**Scenario 1 — The Unexplained Illness**
A family member has been chronically ill for two years. Every medical avenue has been pursued. Nothing has worked. A friend suggests intensive prayer and anointing with oil, following [James 5:14](data-scripture="James 5:14"). Your first instinct is: *(a) Yes, we should do that — it's what Scripture prescribes; (b) We can do that in addition to continuing to look for medical answers; (c) I think prayer is good for the family's morale, but I don't really expect it to change the outcome.*

If your honest answer is (c), your functional demonology is cessationist regardless of your stated theology.

**Scenario 2 — The Persistent Pattern**
Someone close to you has struggled with the same destructive pattern for ten years — addiction, compulsive behavior, relationship sabotage. They have been through counseling and genuinely want to change. Your framework for understanding why it persists is: *(a) There may be a spiritual dimension to this that prayer and possibly deliverance ministry should address; (b) This is primarily a psychological issue that requires psychological treatment; (c) I have not thought about a spiritual dimension at all.*

**Scenario 3 — The Fearful Dream**
You experience a recurring nightmare — oppressive, specific, not connected to any identifiable anxiety in waking life. It wakes you in the early hours with a sense of dread that dissipates slowly. You treat it as: *(a) Something worth praying against specifically, with authority in the name of Jesus Christ; (b) Probably stress or something I ate; (c) Something I have never thought to address spiritually.*

**Scenario 4 — The Regional Pattern**
You notice that your city, workplace, or family line carries a consistent spiritual pattern — the same sin, the same breakdown, generation after generation. You interpret this as: *(a) Possibly a demonic stronghold operating at a territorial or generational level; (b) Probably sociological and cultural factors; (c) Coincidence.*

**Scenario 5 — The Flat Worship Culture**
Your church community is spiritually flat — attendance is regular but there is no evident spiritual hunger, no testimonies of God's intervention, no expectation of the supernatural. You interpret this primarily as: *(a) A spiritual problem that requires spiritual address — prayer, fasting, corporate repentance; (b) A leadership and programming problem; (c) The normal state of mature Christian communities.*

---

**Reading your answers:** If your honest answers cluster toward (b) and (c), you are experiencing some degree of the Western functional cessationism this supplement describes. This is not a moral failure — it is a cultural formation. The church in the West shaped you to think this way.

The first step is simply to name it accurately: *I have been living as though the spirit world were theoretical, even while formally believing it is real.*

That naming is the beginning of the reintegration the Nigerian pastor was describing. The Tuesday theology you need already exists — in the same Scripture you read on Sundays. The question is whether you will let it cost you the comfort of the framework you inherited.`;

async function main() {
  console.log("Fixing 2 failed patches...\n");
  await patch("cmq6ktevb000b14g6ezlrl09a", "L21 — Spirit of Antichrist personal examination", L21_FIND, L21_REPLACE);
  await patch("cmq6ktevc000d14g6pyrb8aol", "S9 — Structured self-audit", S9_FIND, S9_REPLACE);
  console.log("\nDone.");
}
main().catch(console.error).finally(() => db.$disconnect());
