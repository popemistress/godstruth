import { PrismaClient } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();
const CHAPTER_ID = fs.readFileSync("/tmp/partvii-chapter-id.txt", "utf8").trim();

type LessonCfg = { newOrder: number; dq?: string; bridge?: string };

// 44 individual lessons get newOrder + discussion question + new bridge
// Supplements/quiz get newOrder only
const MAP: Record<string, LessonCfg> = {
  // ── WAVE 1: Cultural Entry Points (orders 1-6) ──────────────────────────
  "Halloween": {
    newOrder: 1,
    dq: "Where did you first encounter Halloween growing up — and was the spiritual dimension ever discussed by your church or family?",
    bridge: "The veil grew thin one night a year. The next lesson examines what happens when the entertainment industry keeps it open permanently.",
  },
  "Occult Entertainment": {
    newOrder: 2,
    dq: "What was the first piece of occult-themed media that genuinely fascinated you? What do you think drew you to it?",
    bridge: "Books and films normalize the occult. The next lesson examines how music goes further — it doesn't just normalize it, it makes you worship.",
  },
  "The Music Industry": {
    newOrder: 3,
    dq: "Name an artist you have loved whose work contains occult imagery. How do you plan to approach that listening going forward?",
    bridge: "The industry makes gods of its vessels. The next lesson examines what happens when the audience starts worshipping the vessel instead of God.",
  },
  "Celebrity and Political Idolatry": {
    newOrder: 4,
    dq: "Honestly: does your emotional response to election results match your emotional response to answered prayer? Which produces more feeling?",
    bridge: "Political and celebrity idolatry gives the self a team to belong to. The next lesson examines what happens when you want the stars to tell you where the team is going.",
  },
  "Horoscopes and Astrology": {
    newOrder: 5,
    dq: "What's your sign — and when did you last check it? Has it shaped a decision without you realizing it?",
    bridge: "The newspaper horoscope became a cultural habit. The next lesson examines how that habit became an industry that fits in your pocket.",
  },
  "Fortune-Telling Apps and Digital Divination": {
    newOrder: 6,
    dq: "Which apps on your phone have a divination, spiritual guidance, or astrology function? List them specifically before moving forward.",
    bridge: "Six entry points. All of them mainstream. All of them staffed by familiar spirits. The next lesson opens Wave 2 — the practices sold as healing.",
  },

  // ── WAVE 2: The Wellness Trojan Horse (orders 8-17) ─────────────────────
  "Yoga": {
    newOrder: 8,
    dq: "Have you practiced yoga? Did anyone ever inform you of its Hindu theological framework before this lesson?",
    bridge: "Yoga invites a spirit into the body through movement and breath. The next lesson examines what happens when you bring that invitation home in a beautiful stone.",
  },
  "Crystals and Crystal Healing": {
    newOrder: 9,
    dq: "Do you own any crystals — purchased or received as gifts? What were you told about their purpose?",
    bridge: "Crystals anchor spiritual force in a physical object. The next lesson examines what happens when the self becomes the anchor.",
  },
  "The Law of Attraction": {
    newOrder: 10,
    dq: "Have you used a vision board, read The Secret, or practiced manifestation affirmations? What did you believe you were doing spiritually?",
    bridge: "The Law of Attraction fills the mind with desire and calls it faith. The next lesson examines the opposite technique — emptying the mind and calling that faith too.",
  },
  "Transcendental Meditation and Mindfulness": {
    newOrder: 11,
    dq: "Has mindfulness meditation been recommended to you by a doctor, therapist, or church leader? How did you respond?",
    bridge: "Meditation empties the mind. The next lesson examines a system that arranges the home — and invites the same forces in through the front door.",
  },
  "Feng Shui": {
    newOrder: 12,
    dq: "Has your home been arranged according to feng shui principles — even partially, even by a previous tenant? Walk through it with new eyes this week.",
    bridge: "Feng shui channels spiritual force through space. The next lesson examines what happens when a practitioner channels it directly through their hands into your body.",
  },
  "Reiki and Energy Healing": {
    newOrder: 13,
    dq: "Have you received Reiki, therapeutic touch, or any energy healing session? What did the practitioner tell you was happening?",
    bridge: "Reiki works from the outside in. The next lesson examines the system designed to work from the inside out — awakening the serpentine energy the practitioner was always trying to reach.",
  },
  "Chakras and Kundalini": {
    newOrder: 14,
    dq: "Have you done kundalini yoga, somatic breathwork, or any practice aimed at activating spiritual energy centers in the body? What did you experience?",
    bridge: "Kundalini works on the body's energy centers. The next lesson examines a system that works on something even more intimate — your understanding of your own identity.",
  },
  "The Enneagram": {
    newOrder: 15,
    dq: "Has your church used the Enneagram for spiritual formation or small groups? What was your reaction when you first encountered the information in this lesson?",
    bridge: "The Enneagram reframes identity through a personality grid. The next lesson examines what happens when someone reaches past identity altogether — into the unconscious mind.",
  },
  "Hypnosis and Past-Life Regression": {
    newOrder: 16,
    dq: "Have you undergone hypnosis — clinical or recreational? What was the stated purpose, and what did you experience?",
    bridge: "Hypnosis opens the mind to external direction. Smudging attempts to clean the space afterward. The next lesson reveals why that cleaning makes the problem worse.",
  },
  "Smudging and Burning Sage": {
    newOrder: 17,
    dq: "Have you smudged your home or allowed it to be smudged? What were you told it was accomplishing — and has any pattern of oppression continued afterward?",
    bridge: "Ten practices. All marketed as healing. All doing something else. The next lesson opens Wave 3 — what happened when people went looking for God in the wrong places.",
  },

  // ── WAVE 3: Spiritual Seeking Gone Wrong (orders 19-25) ─────────────────
  "The New Age Movement": {
    newOrder: 19,
    dq: "What New Age material have you read, listened to, or been given by someone you trusted? Name it specifically and describe what drew you to it.",
    bridge: "The New Age provides the theological framework. The next lesson examines the specific entity it assigns as personal guide for the journey.",
  },
  "Spirit Guides": {
    newOrder: 20,
    dq: "Have you ever asked a guide, an ancestor, or a spiritual entity for direction — even informally, even in what felt like prayer? Describe the encounter.",
    bridge: "Spirit guides operate in the secular seeking space. The next lesson examines how the same entity gets through the church's front door.",
  },
  "The Contemplative Prayer Movement": {
    newOrder: 21,
    dq: "Has your church offered centering prayer, silent retreat, or lectio divina as an emptying practice? Did you participate — and what did you experience?",
    bridge: "Contemplative prayer empties the mind in private. The next lesson examines a ritual that enacts the same emptying in public, in stone, in the churchyard.",
  },
  "Labyrinth Walking": {
    newOrder: 22,
    dq: "Have you walked a prayer labyrinth? What were you taught it was for — and what actually happened spiritually while you walked?",
    bridge: "The labyrinth is ancient spiritual architecture. The next lesson examines what happens when people go looking for spiritual entities in places they were never meant to be found.",
  },
  "Paranormal Investigation": {
    newOrder: 23,
    dq: "Have you watched ghost-hunting content regularly? Has that content changed your working understanding of what death and the afterlife look like?",
    bridge: "Ghost hunters seek spirit contact through technology. The next lesson examines a method that uses chemistry to open the same doors — with consequences technology cannot produce.",
  },
  "Psychedelics and Plant Medicine": {
    newOrder: 24,
    dq: "Have you used psychedelics recreationally or in a ceremonial context — including ayahuasca, psilocybin, or DMT? What entities or experiences did you encounter?",
    bridge: "Psychedelics force spiritual doors open through chemistry. Astral projection attempts to walk through those doors deliberately, without chemical assistance. The next lesson examines what waits on the other side.",
  },
  "Astral Projection": {
    newOrder: 25,
    dq: "Have you deliberately practiced out-of-body techniques — or had spontaneous experiences that felt like leaving your body? Describe what happened when you returned.",
    bridge: "Seven forms of deliberate spiritual seeking — all arriving at the same entities. The next lesson opens Wave 4: explicit occult practice, the domain where the enemy is named by name.",
  },

  // ── WAVE 4: Active Occult Practice (orders 27-35) ───────────────────────
  "Tarot Cards": {
    newOrder: 27,
    dq: "Have you had a tarot reading — professionally, casually, or online? What question were you trying to answer, and what did the reading tell you?",
    bridge: "Tarot creates a ritual framework for familiar spirit consultation. The next lesson examines the human intermediary who does the same work for a fee.",
  },
  "Psychics": {
    newOrder: 28,
    dq: "Have you paid for a psychic reading, called a hotline, or used a psychic service? What were you hoping to find out — and was the information accurate?",
    bridge: "Psychics provide professional spirit mediation. The next lesson examines what happens when amateurs attempt the same mediation with a board and a planchette.",
  },
  "Ouija Boards": {
    newOrder: 29,
    dq: "Have you used a Ouija board — at any age, at any level of seriousness? What happened, and what followed in the days or weeks after?",
    bridge: "The Ouija board is a single tool. The next lesson examines the organized system behind all the tools — the broader domain of forbidden knowledge.",
  },
  "The Occult": {
    newOrder: 30,
    dq: "What is the most explicitly occultic content — book, website, or practice — you have engaged with? Did you understand what you were engaging at the time?",
    bridge: "The occult is the repository of forbidden knowledge. Witchcraft is what you do with it.",
  },
  "Witchcraft": {
    newOrder: 31,
    dq: "Have you cast a spell, performed a ritual, or used witchcraft tools — even once, even as a teenager, even just to see if it worked?",
    bridge: "Witchcraft is the practice. Wicca is the religion — the formal theological structure that gives the practice a name, a community, and a calendar.",
  },
  "Wicca": {
    newOrder: 32,
    dq: "Have you ever identified as Wiccan, pagan, or a witch — or had a close relationship with someone who did? What was the genuine spiritual appeal?",
    bridge: "Wicca is neopagan witchcraft organized into a religion. The next lesson examines a different tradition — one that learned to hide its paganism inside the church.",
  },
  "Santería": {
    newOrder: 33,
    dq: "Have you encountered Santería, Vodou, or Afro-Caribbean religious practices? Were you ever asked to participate, receive a reading, or accept ritual objects?",
    bridge: "Santería marks the practitioner through ceremony. The next lesson examines how the body can be marked permanently — and what that marking means in the spirit realm.",
  },
  "Tattoos with Occult Symbols": {
    newOrder: 34,
    dq: "Do you have tattoos with occult symbolism received before you understood their spiritual significance? Have you ever prayed specifically over them?",
    bridge: "The body carries what is marked on it. The home carries what is placed in it. The next lesson examines the objects that anchor spiritual assignments to the spaces we live in.",
  },
  "Fetish Objects and Idols in the Home": {
    newOrder: 35,
    dq: "Walk through your home in your mind. Is there anything in it — purchased, gifted, or inherited — whose spiritual purpose you cannot confirm is benign?",
    bridge: "Nine forms of explicit occult practice documented. Before the covenant traps, a checkpoint.",
  },

  // ── WAVE 5: Covenant Traps (orders 37-40) ───────────────────────────────
  "Freemasonry": {
    newOrder: 37,
    dq: "Is there a Mason in your family history? Do you know what lodge they joined, what degree they achieved, and what oaths they took?",
    bridge: "Masonic oaths create generational spiritual assignments. The next lesson examines a more direct weapon — the words spoken over a person's life with intent to harm.",
  },
  "Curses": {
    newOrder: 38,
    dq: "What are the most destructive statements spoken over your life — by parents, partners, or authority figures? Write them down. This is the first step to breaking them.",
    bridge: "Spoken curses strike individuals. The next lesson examines the mechanism by which a single act of covenant sin becomes a multigenerational assignment.",
  },
  "Generational Curses": {
    newOrder: 39,
    dq: "Name a pattern — addiction, divorce, poverty, rage, mental illness, early death — that appears in multiple generations of your family. When did it start?",
    bridge: "Generational curses bind through bloodline covenants. The next lesson examines a more dangerous trap — one that binds through theological covenant and presents itself as the way of escape.",
  },
  "False Gospels": {
    newOrder: 40,
    dq: "Under which gospel were you saved? Measure it against 1 Corinthians 15:3-4. Does it match — or has your foundation been something other than the finished work of the cross?",
    bridge: "Four covenant traps — institutions and theologies that bind beyond the individual. Before we turn inward, a checkpoint.",
  },

  // ── WAVE 6: Personal Bondages (orders 42-45) ────────────────────────────
  "Adultery": {
    newOrder: 42,
    dq: "Has adultery — committed by you or against you — ever been addressed in prayer as a spiritual breach, not just a relational one? If not: what has that silence cost you?",
    bridge: "Adultery breaks the marriage covenant through physical union with another person. The next lesson examines the same breach through a screen — and how the spiritual consequences follow the same pattern.",
  },
  "Pornography": {
    newOrder: 43,
    dq: "How many years, if any, has pornography had consistent access to your mind? Name the soul ties that have never been specifically broken in prayer.",
    bridge: "Pornography is desire directed outward. Self-harm turns the violence inward. The next lesson examines the specific spiritual assignment that has been waiting for that turn.",
  },
  "Self-Harm and Cutting": {
    newOrder: 44,
    dq: "Have you harmed yourself — at any point in your life, in any form? Has anyone ever prayed specifically over the blood that was shed, naming it as a spiritual transaction?",
    bridge: "Self-harm sheds blood to the Spirit of Death directly. Eating disorders pursue the same destination more slowly. The next lesson names what is driving the voice.",
  },
  "Eating Disorders": {
    newOrder: 45,
    dq: "Describe the internal voice that drives disordered eating in your experience — its specific language, its timing, its specific accusations. Then ask: is that your voice, or has something been speaking to you?",
    bridge: "Four forms of intimate personal bondage. Before the final wave, a checkpoint.",
  },

  // ── WAVE 7: End-Times Systemic Deceptions (orders 47-50) ────────────────
  "Aliens and UFOs": {
    newOrder: 47,
    dq: "How would you respond theologically if the government formally confirmed extraterrestrial contact tomorrow? Do you have a framework ready — or would you be disoriented?",
    bridge: "The alien disclosure narrative is a theological frame being built at planetary scale. The next lesson examines what looks like a counterculture festival — but functions as a mass ritual rehearsal for the system those entities are preparing.",
  },
  "Burning Man and Festival Spirituality": {
    newOrder: 48,
    dq: "Have you attended Burning Man, a major music festival, or any large-scale event that functions as a temporary community organized around altered states and radical self-expression?",
    bridge: "Festival spirituality creates temporary pagan sacred spaces. The next lesson examines what happens when that sacred space is built permanently — inside the human body.",
  },
  "Transhumanism and Brain Chips": {
    newOrder: 49,
    dq: "Where is the line between medical technology and the mark of the beast, in your theological framework? Have you thought it through — or is this territory you have avoided?",
    bridge: "Transhumanism wants to upgrade the hardware. The final lesson in this wave examines the counterfeit relationship being built to replace the one God designed — from the inside.",
  },
  "AI Spiritual Deception": {
    newOrder: 50,
    dq: "Have you confessed, prayed, or sought spiritual guidance through an AI chatbot? What theological claims did it make — and how did you test them?",
    bridge: "Four end-times attacks — all requiring 21st-century infrastructure. A final wave checkpoint, then the theology that ties everything together.",
  },

  // ── Terminal Items (new orders 52-54) ────────────────────────────────────
  "Supplement 11: Legal Ground — Why the Enemy Has a Right to Be There": { newOrder: 52 },
  "Supplement 12: The Complete Freedom Prayer Guide": { newOrder: 53 },
  "Part VII Quiz: Closing the Door": { newOrder: 54 },
};

function buildNewContent(original: string, bridge: string, dq: string): string {
  // Find last ---\n\n to split off the existing bridge
  const divider = "\n\n---\n\n";
  const lastIdx = original.lastIndexOf(divider);
  const body = lastIdx !== -1 ? original.slice(0, lastIdx) : original;

  return (
    body +
    divider +
    `*${bridge}*\n\n` +
    `> **Community Discussion:** *${dq}*`
  );
}

async function main() {
  console.log("Fetching all Part VII lessons...");
  const lessons = await db.courseLesson.findMany({ where: { chapterId: CHAPTER_ID } });
  console.log(`Found ${lessons.length} lessons.\n`);

  // Pass 1: Set all to temp orders to avoid unique conflicts
  console.log("Pass 1: Setting temp orders...");
  for (const lesson of lessons) {
    const cfg = MAP[lesson.title];
    if (!cfg) {
      console.warn(`  ⚠ No mapping for: "${lesson.title}"`);
      continue;
    }
    await db.courseLesson.update({
      where: { id: lesson.id },
      data: { order: cfg.newOrder + 1000 },
    });
  }

  // Pass 2: Set final orders + update content
  console.log("Pass 2: Setting final orders + enhancing content...");
  for (const lesson of lessons) {
    const cfg = MAP[lesson.title];
    if (!cfg) continue;

    let newContent = lesson.content ?? "";
    if (cfg.bridge && cfg.dq) {
      newContent = buildNewContent(lesson.content ?? "", cfg.bridge, cfg.dq);
    }

    await db.courseLesson.update({
      where: { id: lesson.id },
      data: { order: cfg.newOrder, content: newContent },
    });
    console.log(`  ✓ [${cfg.newOrder}] ${lesson.title}`);
  }

  // Hard edit: Self-Harm — replace the "What This Means" section with harder language
  const selfHarm = lessons.find((l) => l.title === "Self-Harm and Cutting");
  if (selfHarm) {
    const hardSection = `## What This Means for You Right Now

Stop reading this as information about other people.

If you have engaged in self-harm at any point in your life — whether you are currently practicing it, whether you stopped years ago, whether it was "only a few times" — you have shed blood in a transaction with the Spirit of Death. The transaction does not expire because you stopped. It does not become spiritually irrelevant because you are now a believer. It remains an open legal account until it is specifically addressed.

Here is what you need to do:

**Name it.** Not "I struggled with self-harm." Name the specific practice, the specific tools, the approximate duration, the physical locations on your body. Vagueness protects the enemy's claim. Specificity is what revokes it.

**Repent for it as a violation of the temple.** [1 Corinthians 6:19](data-scripture="1 Corinthians 6:19"): *"Your body is the temple of the Holy Ghost."* What was done to the temple was sin — not only pain management, not only addiction, not only a phase. It was a sin with a specific spiritual consequence. Repent for it in those terms.

**Renounce the Spirit of Death by name.** Command it to leave the body, the bloodline, and every space where the cutting occurred. Plead the blood of Jesus Christ — blood shed once, for the forgiveness of all sin — over every scar, every wound, every location on your body that was violated.

**Tell someone who can pray with you.** The secrecy is part of the bondage. Breaking the secrecy — with a pastor, a counselor, a trusted elder — is part of breaking the spiritual assignment.

The question you cannot skip: *Who knows?* If the answer is no one, that is the first thing that needs to change.`;

    const updatedContent = (selfHarm.content ?? "").replace(
      /## What This Means for You Right Now[\s\S]+?(?=\n\n---)/,
      hardSection
    );
    await db.courseLesson.update({
      where: { id: selfHarm.id },
      data: { content: updatedContent },
    });
    console.log("  ✓ Hard-edited: Self-Harm and Cutting");
  }

  // Hard edit: Eating Disorders — harder diagnostic language
  const eating = lessons.find((l) => l.title === "Eating Disorders");
  if (eating) {
    const hardSection = `## What This Means for You Right Now

Do not move past this lesson without answering the question this course has been building toward since the opening lesson of Part VII: *Is what I'm calling my eating disorder entirely my own psychology — or has something been speaking to me?*

This is not a question to answer theoretically. Close your eyes and listen. You know the voice. You have heard it today — this morning, possibly this hour. It has a tone. It has a timing. It has specific targets: specific foods, specific numbers, specific parts of your body it returns to. It has a history of being there when the actual circumstances do not explain the intensity of the accusation.

That is not your inner critic. Inner critics are boring. They repeat generic anxieties. What eating disorder sufferers describe is something more organized, more targeted, more relentless — and more specifically cruel than random psychological noise.

Name what you are dealing with:

**The Spirit of Death.** It has an assignment against your body. The eating disorder is its current instrument. The destination it has been working toward — the escalation you have felt even when you wanted to stop, the threshold that keeps lowering — has a name.

**The Spirit of Accusation.** [Revelation 12:10](data-scripture="Revelation 12:10"). It runs the prosecution that tells you the body is wrong, insufficient, requiring punishment, undeserving of nourishment. That voice is a demonic entity's speech, not your own thought.

Now act:

Renounce the Spirit of Death's legal claim over your body — specifically, by name, aloud. Renounce the Spirit of Accusation and every specific accusation it has spoken over your body, naming the accusations you can remember. Plead the blood of Jesus Christ over your body's relationship with food, with weight, with hunger, with the mirror.

Then pursue medical treatment simultaneously — not as an alternative to this prayer, but because the spiritual and physiological dimensions are both real and both need to be addressed. The supernatural and the clinical are not competing for the same problem. They are addressing different layers of the same attack.

The question you cannot skip: *Have you told your doctor and your pastor the whole truth?* If the answer to either is no, that changes this week.`;

    const updatedContent = (eating.content ?? "").replace(
      /## What This Means for You Right Now[\s\S]+?(?=\n\n---)/,
      hardSection
    );
    await db.courseLesson.update({
      where: { id: eating.id },
      data: { content: updatedContent },
    });
    console.log("  ✓ Hard-edited: Eating Disorders");
  }

  // Update Supplement 12 to worksheet format
  const s12 = lessons.find((l) => l.title === "Supplement 12: The Complete Freedom Prayer Guide");
  if (s12) {
    const worksheetHeader = `![Freedom Prayer Guide](/demons-lessons/s12-freedom-prayer.png)

## Supplement 12: The Complete Freedom Prayer Guide

**How to use this supplement:** This is not a lesson to read and move past. Print it or open it on a second device. Work through it section by section, aloud, with a pen in hand. Check off each item as you address it. The Holy Spirit will surface what needs to be addressed — let Him set the pace.

**Before you begin:** Find a private space where you can pray at full voice. Ask the Holy Spirit to bring to your conscious memory everything that needs to be covered. Do not rush.

---

`;
    const s12Content = s12.content ?? "";
    // Replace the opening (up to first ---) with the worksheet header
    const firstDivider = s12Content.indexOf("\n\n---\n\n");
    const rest = firstDivider !== -1 ? s12Content.slice(firstDivider) : s12Content;

    // Add checkbox indicators throughout by replacing section headers with checkbox versions
    const worksheetContent =
      worksheetHeader +
      rest
        .replace(/\*\*Section (\d+): (.+?)\*\*/g, "### $1. $2\n- [ ] Section completed")
        .replace(
          /\*\*List:\*\* (.+?)(?=\n\n)/gs,
          (_, list) =>
            "**Work through each that applies:**\n" +
            list
              .split(" · ")
              .map((item: string) => `- [ ] ${item.trim()}`)
              .join("\n")
        )
        .replace(/\*\*Prayer:\*\*/g, "**Pray aloud:**")
        .replace(/\*\*Prayer for general practice:\*\*/g, "**Pray aloud (general):**")
        .replace(/\*\*Additional prayer.+?:\*\*/g, "**Pray aloud (specific):**");

    await db.courseLesson.update({
      where: { id: s12.id },
      data: { content: worksheetContent },
    });
    console.log("  ✓ Updated Supplement 12 to worksheet format");
  }

  console.log("\nReorder and enhancement complete.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
