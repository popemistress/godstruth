import { PrismaClient } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();
const CHAPTER_ID = fs.readFileSync("/tmp/partvii-chapter-id.txt", "utf8").trim();

const lessons = [
  // ── INTRO: Instructor Testimony (order 0) ──────────────────────────────
  {
    order: 0,
    type: "READING" as const,
    title: "Why I Wrote This Part of the Course",
    content: `## Why I Wrote This Part of the Course

I am not writing this section as a researcher. I am writing it as someone who needed it.

There was a period in my life — late teens into my early twenties — when I was genuinely curious about the spiritual world, and the church I grew up in had no language for it. Nobody sat me down and explained that the curiosity was legitimate, that the spiritual world was real, and that the doorways I was opening were documented in Scripture by a God who had specifically prohibited them. Nobody explained the difference between encountering the living God and encountering the entities that masquerade as Him. So I did what curious people do when they have no guide: I explored.

I read the books. I experimented with the practices. I had experiences that I could not dismiss — experiences that felt genuinely spiritual, genuinely illuminating, genuinely larger than my ordinary life. That was the most dangerous part. The experiences were real. They were just coming from the wrong source.

It took years before I understood what I had been in contact with. It took longer before I understood why certain patterns in my life — patterns of oppression, of specific fears, of a persistent sense that something was wrong that I could not name — were downstream of those years of exploration. And it took serious, specific, Spirit-directed prayer before those patterns broke.

I wrote the 44 lessons in this Part of the course because I have been to enough of these places to know what they feel like from the inside. I wrote them because I have watched people I love spend years in bondage to systems they entered innocently and could not find their way out of. I wrote them because the church I grew up in — well-meaning, genuinely loving — did not give me the information that could have protected me, and I do not want that to be your story.

---

## What Part VII Covers and Why the Order Matters

The 44 lessons in this Part are organized into seven progressive waves. They move from the accidental to the deliberate, from the cultural to the covenantal, from the individual to the systemic. They escalate for a reason.

**The progression is designed so that by the time you reach the most serious material, you have the theological framework to understand what you're looking at.**

Here is the map:

| Wave | Theme | Lessons |
|------|-------|---------|
| **Wave 1** | Cultural Entry Points | Halloween, Occult Entertainment, Music Industry, Celebrity/Political Idolatry, Astrology, Digital Divination |
| **Wave 2** | The Wellness Trojan Horse | Yoga, Crystals, Law of Attraction, TM/Mindfulness, Feng Shui, Reiki, Chakras, The Enneagram, Hypnosis, Smudging |
| **Wave 3** | Spiritual Seeking Gone Wrong | New Age, Spirit Guides, Contemplative Prayer, Labyrinths, Paranormal Investigation, Psychedelics, Astral Projection |
| **Wave 4** | Active Occult Practice | Tarot, Psychics, Ouija, The Occult, Witchcraft, Wicca, Santería, Occult Tattoos, Idols in the Home |
| **Wave 5** | Covenant Traps | Freemasonry, Curses, Generational Curses, False Gospels |
| **Wave 6** | Personal Bondages | Adultery, Pornography, Self-Harm, Eating Disorders |
| **Wave 7** | End-Times Systemic Deceptions | Aliens/UFOs, Burning Man, Transhumanism, AI Spiritual Deception |

Each wave ends with a short checkpoint quiz. Between Wave 7 and the Final Quiz, you will find two supplements: the theological framework that explains why all of these attacks work (Legal Ground), and the complete prayer guide for closing every door this course has identified.

---

## How to Use This Part of the Course

Work through the lessons in order. The sequence is intentional. Do not skip waves because the topic seems irrelevant to you personally — the lesson may be the key to understanding someone you love, or to recognizing something in your family history you have not yet named.

At the end of each lesson, there is a Community Discussion question. Engage with it honestly. The discussion prompts are designed to be specific enough to generate real conversation and safe enough to share in community. The enemy's primary tool in these areas is secrecy. Community is the antidote.

At each checkpoint quiz, if you miss a question, return to the relevant lesson before continuing.

The Freedom Prayer Guide in Supplement 12 is designed to be used as many times as needed. Once through the sequence for a comprehensive pass — then returned to for specific areas as the Holy Spirit surfaces them.

---

## One Thing Before You Begin

The God who prohibited these practices prohibited them for the same reason a loving father tells his children not to play in traffic. Not because He is controlling. Because He can see what you cannot, and He has been watching these entities operate since before the world was made.

[Deuteronomy 18:12](data-scripture="Deuteronomy 18:12"): *"For all that do these things are an abomination unto the LORD."* The severity of that language is not moral condemnation for its own sake. It is the measured response of a God who knows exactly what these practices invite and exactly what they cost.

He also wrote [Isaiah 61:1](data-scripture="Isaiah 61:1"): *"The Spirit of the Lord GOD is upon me... to proclaim liberty to the captives, and the opening of the prison to them that are bound."*

Both verses are true. Both are relevant to Part VII. The first explains why the door should not have been opened. The second is why you are taking this course.

> **Community Discussion:** *What is the experience or practice that brought you to Part VII specifically? What were you hoping to find — and what do you expect this section to cost you?*`,
  },

  // ── WAVE 1 CHECKPOINT QUIZ (order 7) ───────────────────────────────────
  {
    order: 7,
    type: "QUIZ" as const,
    title: "Wave 1 Checkpoint: Cultural Entry Points",
    content: `## Wave 1 Checkpoint: Cultural Entry Points

Before moving into Wave 2, confirm your understanding of the six cultural entry points. Three questions — return to any lesson where your answer is uncertain.

---

**1. According to this course, what distinguishes horoscopes and astrology from innocent entertainment?**

A) Astrology is only spiritually dangerous when practiced by professionals
B) Any engagement — even "just for fun" — constitutes a divination transaction with the familiar spirits that staff the system, regardless of the user's intent
C) Horoscopes are harmless because planetary bodies are part of God's creation
D) The danger is purely psychological: people make worse decisions when they follow astrology

---

**2. The course argues that Halloween's spiritual danger lies not in costumes or candy but in:**

A) Its commercial exploitation of death imagery
B) Its historical roots as a Celtic agricultural festival
C) Its function as a recognized occult high holy day — a covenant by participation, knowingly or not, with the spiritual system that consecrated it
D) The glorification of violence in modern Halloween decorations

---

**3. Celebrity and political idolatry are identified as spiritual attacks rather than mere cultural habits because:**

A) Celebrities and politicians are statistically more likely to be involved in the occult
B) The emotional and devotional architecture of fan culture and political tribalism mirrors the structure of worship — loyalty, sacrifice of relationships, identity formation — directed at a creature rather than the Creator
C) Admiring successful people violates the biblical command to avoid comparison
D) Social media platforms are designed by people with occult affiliations

---

**Answer Key**

1. **B** — Every divination engagement is a transaction regardless of intent. [Deuteronomy 18:12](data-scripture="Deuteronomy 18:12") has no exception for casual use.
2. **C** — Halloween functions as covenant by participation. Ignorance does not revoke the spiritual transaction.
3. **B** — [1 John 5:21](data-scripture="1 John 5:21") and [Exodus 20:5](data-scripture="Exodus 20:5"): idolatry is structural, not merely aesthetic.

---

*If you missed any answer, return to that lesson before continuing. Wave 2 begins with what everyone called exercise.*`,
  },

  // ── WAVE 2 CHECKPOINT QUIZ (order 18) ──────────────────────────────────
  {
    order: 18,
    type: "QUIZ" as const,
    title: "Wave 2 Checkpoint: The Wellness Trojan Horse",
    content: `## Wave 2 Checkpoint: The Wellness Trojan Horse

Ten wellness practices examined. Three questions before Wave 3.

---

**1. The course's core argument about yoga, Reiki, TM, and chakra work is that they share a common spiritual mechanism. What is it?**

A) They all originated in Asia and therefore reflect spiritual systems incompatible with Western monotheism
B) They all invoke or manipulate spiritual forces from systems outside Jesus Christ — regardless of the user's intent, the fitness studio branding, or the therapeutic framing
C) They are all ineffective — their perceived benefits are entirely psychosomatic
D) They are only dangerous when practiced in group settings

---

**2. What does this course identify as the specific spiritual danger of the Enneagram?**

A) The Enneagram creates pride by overemphasizing personality differences
B) The nine-type system is mathematically based on numerology and therefore occultic
C) The Enneagram's origins in Gurdjieff's occultic channeled material and its adoption of a fixed, pre-conversion identity framework conflict with the new creation theology of 2 Corinthians 5:17
D) Churches that use the Enneagram inevitably drift toward liberalism

---

**3. The Law of Attraction and Transcendental Meditation are theologically opposed in method but united in destination. What destination do they share?**

A) Buddhist philosophy as their theological source
B) The replacement of God as the source of provision and guidance with either the self (manifestation) or the emptied mind (TM) — both of which create an open channel for demonic spiritual influence
C) The promotion of materialism and self-interest at the expense of community
D) Debt and financial instability through misapplied prosperity thinking

---

**Answer Key**

1. **B** — The spiritual mechanism is the same regardless of marketing. The entities invoked do not change because the studio uses soft lighting.
2. **C** — [2 Corinthians 5:17](data-scripture="2 Corinthians 5:17"): the new creation in Christ cannot be adequately mapped to a pre-conversion personality type.
3. **B** — [Matthew 12:43-45](data-scripture="Matthew 12:43-45"): the swept and empty house is not safe. Both methods empty the self of the right occupant.

---

*Wave 3 opens with the theological framework that explains where all ten of these practices were pointing.*`,
  },

  // ── WAVE 3 CHECKPOINT QUIZ (order 26) ──────────────────────────────────
  {
    order: 26,
    type: "QUIZ" as const,
    title: "Wave 3 Checkpoint: Spiritual Seeking Gone Wrong",
    content: `## Wave 3 Checkpoint: Spiritual Seeking Gone Wrong

Seven forms of sincere spiritual seeking that arrived at the wrong destination. Three questions.

---

**1. The course describes spirit guides as fallen angels presenting in an appealing form. What Scripture does it cite as the primary proof text?**

A) [Ephesians 6:12](data-scripture="Ephesians 6:12") — spiritual wickedness in high places
B) [2 Corinthians 11:14](data-scripture="2 Corinthians 11:14") — Satan himself is transformed into an angel of light
C) [1 Peter 5:8](data-scripture="1 Peter 5:8") — the devil as a roaring lion
D) [Revelation 12:9](data-scripture="Revelation 12:9") — the great dragon cast out

---

**2. The course identifies a specific theological problem with the Contemplative Prayer Movement. What is it?**

A) It was developed by Catholics rather than Protestants
B) Silent prayer is inherently less effective than spoken prayer
C) Centering prayer techniques produce the same emptied-mind state as Transcendental Meditation — a state of cognitive passivity that [Matthew 12:43-45](data-scripture="Matthew 12:43-45") warns creates a spiritual vacancy, and the movement's theological framework draws from sources outside Scripture
D) Prayer without words violates [Romans 8:26](data-scripture="Romans 8:26") which requires verbal groaning

---

**3. What does this course identify as the specific spiritual danger of psychedelic plant medicine, beyond the legal and health risks?**

A) Psychedelics cause permanent brain damage that impairs the ability to experience genuine spiritual encounters
B) Psychedelics are addictive and therefore lead to a lifestyle incompatible with Christian discipleship
C) Psychedelics forcibly open spiritual doors through chemical means — producing real encounters with demonic entities that the person did not consent to and cannot control, and creating lasting spiritual access points that persist after the substance wears off
D) The shamanic contexts in which plant medicine is used are culturally appropriative

---

**Answer Key**

1. **B** — [2 Corinthians 11:14](data-scripture="2 Corinthians 11:14"): the beauty and wisdom of the encounter is not evidence of its source.
2. **C** — Method matters. The theological problem is the technique, not the silence itself.
3. **C** — The door opened chemically does not close when the chemistry ends. [1 Corinthians 6:19-20](data-scripture="1 Corinthians 6:19"): the body is the temple.

---

*Wave 4 drops the subtlety. What follows is explicit occult practice — the enemy named by his own names.*`,
  },

  // ── WAVE 4 CHECKPOINT QUIZ (order 36) ──────────────────────────────────
  {
    order: 36,
    type: "QUIZ" as const,
    title: "Wave 4 Checkpoint: Active Occult Practice",
    content: `## Wave 4 Checkpoint: Active Occult Practice

Nine forms of explicit occult practice. Three questions.

---

**1. According to this course, what is the theological basis for the claim that Wicca and witchcraft are not merely false religions but spiritually harmful practices?**

A) Wicca is a relatively new religion without genuine spiritual power — its practitioners are deceived but not spiritually endangered
B) [Galatians 5:19-20](data-scripture="Galatians 5:19-20") lists witchcraft (*pharmakeia*) as a work of the flesh, and [Deuteronomy 18:10-12](data-scripture="Deuteronomy 18:10-12") prohibits each Wiccan practice specifically — not because they are ineffective, but because they work, and the entities they invoke are real
C) Wicca is dangerous primarily because it leads practitioners away from community and into isolation
D) The Horned God and Triple Goddess are not spiritually real — the danger is purely theological error

---

**2. The course states that Ouija board experiences are not explained by the ideomotor effect (unconscious muscle movement). What evidence does it use to support this?**

A) Scientific studies have disproved the ideomotor hypothesis in controlled conditions
B) The board produces verifiable information that none of the participants consciously possess, and the consistent pattern of entity behavior — escalation, attachment, personality — is inconsistent with unconscious self-generated movement
C) The Catholic Church has officially declared Ouija boards demonically active
D) Ouija boards produce physical phenomena (levitation, temperature changes) that cannot be explained by muscle movement

---

**3. What specific mechanism makes occult tattoos spiritually significant, according to this course?**

A) The artistic glorification of occultic symbols influences the viewer subliminally
B) Tattoos violate [Leviticus 19:28](data-scripture="Leviticus 19:28") categorically, regardless of the symbol depicted
C) The blood involved in tattooing creates a covenant transaction, and symbols dedicated to demonic entities function as permanent spiritual declarations of allegiance — marking the body as claimed territory — regardless of whether the bearer currently believes in those entities
D) Tattoos with occult symbols attract demonic attention to the bearer from outside, like a spiritual beacon

---

**Answer Key**

1. **B** — The prohibition is because the practices work, not because they don't. The entities are real.
2. **B** — Information the participants don't consciously know, and behavioral patterns too consistent for unconscious movement.
3. **C** — Blood covenant through the tattooing process, plus the symbol as a standing spiritual declaration that persists beyond belief.

---

*Wave 5 moves from individual practice to generational binding — the traps that don't just affect one person.*`,
  },

  // ── WAVE 5 CHECKPOINT QUIZ (order 41) ──────────────────────────────────
  {
    order: 41,
    type: "QUIZ" as const,
    title: "Wave 5 Checkpoint: Covenant Traps",
    content: `## Wave 5 Checkpoint: Covenant Traps

Four systems that bind beyond the individual. Three questions.

---

**1. What is the specific mechanism by which Freemasonry creates spiritual effects in the children and grandchildren of Masons?**

A) Masons pass down occult knowledge and practices deliberately through family instruction
B) The blood oaths taken in Masonic degrees create covenantal spiritual agreements that, according to [Exodus 20:5](data-scripture="Exodus 20:5"), establish generational spiritual assignments that follow the bloodline until specifically broken in the name of Jesus Christ
C) Children of Masons are statistically more likely to become Masons themselves, creating a generational cycle of occult involvement
D) The Masonic financial network creates generational dependency that makes it difficult for descendants to leave the fraternal system

---

**2. Proverbs 26:2 is a key text in the lesson on Curses. What principle does it establish?**

A) Curses spoken by non-believers have no spiritual effect on believers
B) Curses that are deserved will land; those that are undeserved will not — establishing that sin creates vulnerability and righteousness creates protection, but not that believers are automatically immune to all curses
C) Only God has the authority to speak a genuine curse
D) Curses spoken in anger dissipate within 24 hours

---

**3. According to the False Gospels lesson, why is the prosperity gospel specifically described as capable of damning its adherents?**

A) It creates a culture of financial exploitation that destroys community trust
B) The prosperity gospel's emphasis on positive confession displaces faith in the atoning death of Christ
C) The prosperity gospel presents a Christ who guarantees health and wealth — a Christ who does not exist in Scripture — meaning the trust placed in that Christ is not placed in the Christ who saves, and the salvation being offered cannot be delivered
D) Prosperity gospel churches teach works-based salvation through the discipline of tithing

---

**Answer Key**

1. **B** — Covenant oaths create generational legal ground. [Exodus 20:5](data-scripture="Exodus 20:5") is the mechanism; [Galatians 3:13](data-scripture="Galatians 3:13") is the remedy.
2. **B** — The causeless curse cannot land — but the curse that has cause (open legal ground through sin) can.
3. **C** — A gospel that cannot save is not the gospel. [Galatians 1:8-9](data-scripture="Galatians 1:8-9"): anathema.

---

*Wave 6 turns inward. The attacks that follow do not come from outside — they work through the most intimate systems God designed.*`,
  },

  // ── WAVE 6 CHECKPOINT QUIZ (order 46) ──────────────────────────────────
  {
    order: 46,
    type: "QUIZ" as const,
    title: "Wave 6 Checkpoint: Personal Bondages",
    content: `## Wave 6 Checkpoint: Personal Bondages

Four forms of intimate personal bondage. Three questions — and these may be the hardest ones in the course to answer honestly.

---

**1. The course argues that pornography creates soul ties comparable to those created by physical sexual union. What is the theological basis for this?**

A) The neurological impact of pornography on the brain is equivalent to the neurological impact of physical intimacy
B) Scripture does not distinguish between lust in the heart and physical act — [Matthew 5:28](data-scripture="Matthew 5:28") — and the soul tie mechanism of [1 Corinthians 6:16](data-scripture="1 Corinthians 6:16") operates through the covenantal intention of sexual union, which pornography activates even without physical contact
C) Pornography use and physical adultery produce identical legal ground because both involve explicit consent to sexual sin
D) Soul ties form whenever sexual imagery is viewed, regardless of whether the viewer desires the connection

---

**2. The self-harm lesson identifies a spiritual assignment specifically at work in cutting and self-injury. What is it?**

A) The Spirit of Rejection — the entity that drives the sufferer to punish themselves for perceived inadequacy
B) The Spirit of Addiction — which drives escalation and dependency on the neurochemical response
C) The Spirit of Death — which uses the blood shed in self-harm as a covenant transaction, establishing legal claim over the body with a specific long-term assignment toward lethal completion
D) The Spirit of Control — which gives the sufferer a false sense of agency over their emotional pain

---

**3. What is the course's core argument about why eating disorders resist treatment in ways that standard addiction models do not fully explain?**

A) Eating disorders involve cognitive distortions that are uniquely resistant to behavioral intervention
B) The medical profession's materialist framework excludes the spiritual dimension — the demonic assignment operating through the disorder — which means even successful psychological treatment leaves the spiritual layer untreated and the pattern eventually returns
C) Eating disorders are rooted in childhood trauma that requires specialized trauma therapy rather than addiction treatment
D) Eating disorders involve both psychological and physical components that require simultaneous treatment, unlike most other addictions

---

**Answer Key**

1. **B** — The soul tie mechanism operates through covenantal intention. Pornography activates that mechanism.
2. **C** — The Spirit of Death. Blood is covenant currency. Self-harm spends it in the wrong direction.
3. **B** — The spiritual dimension requires spiritual treatment. Psychology addresses real layers; deliverance addresses others. Both are necessary.

---

*Wave 7 is the final wave — and the most important for the generation currently alive. What follows has never been possible before.*`,
  },

  // ── WAVE 7 CHECKPOINT QUIZ (order 51) ──────────────────────────────────
  {
    order: 51,
    type: "QUIZ" as const,
    title: "Wave 7 Checkpoint: End-Times Systemic Deceptions",
    content: `## Wave 7 Checkpoint: End-Times Systemic Deceptions

Four attacks that require 21st-century infrastructure. Three questions.

---

**1. This course interprets the UFO/UAP phenomenon through a specific biblical category. What is it?**

A) The phenomena are fabricated by human governments as a distraction from domestic policy failures
B) Extraterrestrial life is real and represents God's creation beyond Earth — the church must develop a theology of the cosmos
C) UAP phenomena are real, but the correct category is fallen angels — interdimensional entities who adapt their presentation to the dominant mythological frame of the culture they are targeting, currently presenting as extraterrestrials to a post-Christian culture that has no other category for non-human intelligence
D) UAP phenomena are natural atmospheric events misidentified due to cognitive bias

---

**2. The course identifies a specific spiritual danger in Burning Man distinct from the drug use and sexual behavior. What is it?**

A) Burning Man creates financial dependency through the ticket and travel costs required for participation
B) The festival's "radical self-expression" principle normalizes moral relativism in ways that persist after the event
C) Burning Man functions as a temporary pagan sacred space — a location dedicated to the spiritual principles of death and renewal through fire sacrifice — and the spiritual atmosphere of that space does not leave its visitors unchanged, regardless of their stated reason for attending
D) The Burning Man community functions as a cult that maintains social control over members year-round through online community norms

---

**3. What specific mechanism makes AI "pastoral" tools spiritually dangerous beyond simple doctrinal error?**

A) AI systems are directly programmed by technologists with anti-Christian worldviews
B) AI cannot understand spiritual language and therefore cannot provide useful theological guidance
C) AI pastoral tools are trained on the full corpus of human writing — including every false theology and demonic doctrine ever published — and deliver synthesis of that material in personalized, warm, contextually appropriate language, creating the emotional architecture of spiritual relationship without the Holy Spirit; while familiar spirits can influence outputs toward spiritually targeted deception for specific users
D) The data collected by AI systems creates privacy risks for users who share spiritual struggles

---

**Answer Key**

1. **C** — Fallen angels adapting their presentation. [2 Thessalonians 2:9-11](data-scripture="2 Thessalonians 2:9-11"): lying wonders.
2. **C** — The sacred space effect is real regardless of personal intent. The spiritual atmosphere of a place does not ask why you came.
3. **C** — The emotional architecture of spiritual relationship without the Spirit. [1 John 2:27](data-scripture="1 John 2:27"): the anointing teaches. Code does not.

---

*All seven waves complete. The Supplement that follows provides the theological framework for why every attack in this course worked — and the prayer guide for closing each door specifically.*`,
  },
];

async function main() {
  console.log(`Creating ${lessons.length} new lessons in chapter ${CHAPTER_ID}...\n`);
  for (const lesson of lessons) {
    const created = await db.courseLesson.create({
      data: { chapterId: CHAPTER_ID, ...lesson },
    });
    console.log(`  ✓ [${created.order}] ${created.title}`);
  }
  console.log("\nNew lessons created.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
