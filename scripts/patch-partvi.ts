/**
 * patch-partvi.ts — applies all 10 improvement suggestions to Part VI
 *
 * 1.  L17 — Open Nephilim section with Numbers 13 scene (grasshoppers)
 * 2.  L17 — Add Angels/Demons crossover paragraph after the three positions
 * 3.  L17 — Rewrite personal application with direct personal challenge
 * 4.  L18 — Replace thin Familiar Spirit cross-reference with cinematic treatment
 * 5.  L18 — Add specific action step to close (not just reflection questions)
 * 6.  L20 — Expand the "closed loop" section with concrete scenario
 * 7.  L21 — Add personal challenge section for the Spirit of the Antichrist
 * 8.  S9  — Add structured self-audit to closing
 * 9.  S10 — Full rewrite as scannable reference with prayer declarations
 * 10. Quiz — Add end-of-chapter quiz for Part VI
 */

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// ─── helpers ─────────────────────────────────────────────────────────────────

async function patch(id: string, label: string, find: string, replace: string) {
  const lesson = await db.courseLesson.findUnique({ where: { id }, select: { content: true } });
  if (!lesson) { console.error(`  ✗ ${label}: not found`); return; }
  if (!lesson.content?.includes(find)) {
    console.error(`  ✗ ${label}: find string not matched (first 80 chars: "${find.slice(0, 80)}")`);
    return;
  }
  await db.courseLesson.update({ where: { id }, data: { content: lesson.content.replace(find, replace) } });
  console.log(`  ✓ ${label}`);
}

async function set(id: string, label: string, content: string) {
  await db.courseLesson.update({ where: { id }, data: { content } });
  console.log(`  ✓ ${label}`);
}

// ─── PATCH 1 & 2: L17 — Nephilim section reopen + Angels crossover ───────────

const L17_NEPHILIM_OLD = `### The Nephilim — Giants in the Land

The word *Nephilim* appears in only two places in the Old Testament.

**Genesis 6:4** — in the pre-Flood world.
**Numbers 13:33** — in the report of the twelve spies, four hundred years after the Flood:

> [Numbers 13:33](data-scripture="Numbers 13:33") "We seemed to ourselves like grasshoppers, and so we seemed to them."

The Anakim — a race of great stature in Canaan — are identified as descendants of the Nephilim.`;

const L17_NEPHILIM_NEW = `### The Nephilim — Giants in the Land

Ten men walked back from Canaan — men who had crossed the Red Sea on dry ground, who had eaten manna from heaven, who had stood at Sinai when the mountain was on fire.

They came back unable to fight.

> [Numbers 13:33](data-scripture="Numbers 13:33") "We seemed to ourselves like grasshoppers, and so we seemed to them."

Something in the land had collapsed their sense of self. Not their theology — they still believed in God. Not their memory — they had seen the plagues of Egypt with their own eyes. It was the sight of the *Anakim*, described as descendants of the Nephilim, that dismantled the faith of ten of the twelve most trusted men in Israel. The two who came back with a different report were Caleb and Joshua. The rest of their generation spent forty years dying in the wilderness, waiting for a cohort with the courage they had lost.

The word *Nephilim* appears in only two places in the Old Testament: Genesis 6:4, in the pre-Flood world, and here in Numbers 13:33, four hundred years later. Whatever they were, their legacy in Israel's story was the paralysis of an entire generation.

The Anakim — a race of great stature in Canaan — are identified as descendants of the Nephilim.`;

// ─── PATCH 2: L17 — Angels course crossover ──────────────────────────────────

const L17_CROSSOVER_FIND = `**The honest conclusion:** Theological nuance is required.`;

const L17_CROSSOVER_NEW = `**The honest conclusion:** Theological nuance is required.`;

// Angels crossover is inserted AFTER the three positions section, before the Nephilim section
const L17_CROSSOVER_FULL_FIND = `**The honest conclusion:** Theological nuance is required. The Sethite reading has dominated Western Christianity for over a millennium, but the exegetical pressure of the text and the background of Jude and Peter makes the Angelic/Watcher reading the most textually grounded. The question is contested among serious scholars; neither certainty nor dismissal is warranted.

---

### The Nephilim — Giants in the Land`;

const L17_CROSSOVER_FULL_NEW = `**The honest conclusion:** Theological nuance is required. The Sethite reading has dominated Western Christianity for over a millennium, but the exegetical pressure of the text and the background of Jude and Peter makes the Angelic/Watcher reading the most textually grounded. The question is contested among serious scholars; neither certainty nor dismissal is warranted.

---

### What the Angels Course Taught You — Applied Here

If you completed the Angels course, a connection should be forming.

The nine choirs you studied — Seraphim, Cherubim, Thrones, Dominations, Virtues, Powers, Principalities, Archangels, Angels — are the beings who remained faithful. The Watchers, in the tradition that forms the background of Jude and Peter, were drawn from the same created order. They were not a lesser species. They were beings of the same intelligence, power, and capacity as the angels you studied.

This means: the Cherubim guarding Eden's gate is kin, in the created order, to the being who operated through the serpent inside it. The nature that enables the Seraphim to burn with ceaseless love before the throne of God is the same nature that enabled Lucifer, before his fall, to be the most radiant being in creation. The capacity for the highest good and the deepest evil belong to the same created nature. The difference is not capacity but choice — and the Watchers made their choice and did not return from it.

When you encounter the demonic, you are not encountering something alien. You are encountering the inverted image of what the Angels course introduced. That is what makes it both sobering and navigable: the God who governs the faithful nine choirs holds the same authority over the fallen.

---

### The Nephilim — Giants in the Land`;

// ─── PATCH 3: L17 — Rewrite personal application with direct challenge ────────

const L17_APPLICATION_OLD = `### What This Means for the Spiritual Life

This teaching is not an invitation to speculative obsession. It is background — the architecture behind what the New Testament takes for granted. Understanding it matters because it explains:

**Why deliverance looks like it does.** The compulsive seeking of a host body explains why the unclean spirits in the Gospels beg not to be sent "out of the country" or into "the abyss." They are not simply being dramatic. They are describing their condition.

**Why the Flood was what it was.** The Flood is not God's overreaction to human violence. It is a surgical response to a corruption that was ontological — the contamination of the human bloodline itself. The Flood and the Conquest are two acts of the same divine purpose.

**Why the Incarnation matters so specifically.** Christ came in genuine human flesh — fully human, not mixed or compromised — to redeem a humanity whose identity had been contested since Genesis 6. The phrase in [1 John 4:2](data-scripture="1 John 4:2") — "Jesus Christ has come in the flesh" — is the test of spirits for a reason. The battle over human flesh is ancient.`;

const L17_APPLICATION_NEW = `### What This Means for the Spiritual Life

This teaching is not an invitation to speculative obsession. It is background — the architecture behind what the New Testament takes for granted. Understanding it matters because it explains:

**Why deliverance looks like it does.** The compulsive seeking of a host body explains why the unclean spirits in the Gospels beg not to be sent "out of the country" or into "the abyss." They are not simply being dramatic. They are describing their condition.

**Why the Flood was what it was.** The Flood is not God's overreaction to human violence. It is a surgical response to a corruption that was ontological — the contamination of the human bloodline itself. The Flood and the Conquest are two acts of the same divine purpose.

**Why the Incarnation matters so specifically.** Christ came in genuine human flesh — fully human, not mixed or compromised — to redeem a humanity whose identity had been contested since Genesis 6. The phrase in [1 John 4:2](data-scripture="1 John 4:2") — "Jesus Christ has come in the flesh" — is the test of spirits for a reason. The battle over human flesh is ancient.

---

### A Personal Reckoning

Here is the question this lesson will raise for many readers — the one most worth sitting with before moving on:

*Have you ever experienced something that felt genuinely supernatural — oppressive, intrusive, beyond the range of mood or circumstance — and had no theological category for it?*

Many Western Christians have. And most of them did what Western Christianity trained them to do: they explained it as stress, depression, personality, brain chemistry, circumstance. All of which may be true and worth addressing. But the New Testament takes for granted a third dimension that Western modernity cannot measure — and what the Watcher tradition gives us is the oldest available explanation for the compulsive, embodiment-seeking, homeless quality of demonic activity.

The disembodied spirits wandering in "waterless places, seeking rest" ([Matthew 12:43](data-scripture="Matthew 12:43")) are not metaphors for psychological discomfort. They are beings for whom the search for a host is the whole of their existence.

**Before you continue:** Name one area of your life — one persistent, cyclical, resistant pattern — that has not yielded to willpower, therapy, good intention, or time. Not to diagnose it as demonic. But to hold the category open, with biblical grounding, in the way the New Testament writers did. That is the beginning of a more complete spiritual realism.`;

// ─── PATCH 4: L18 — Full cinematic Familiar Spirit section ───────────────────

const L18_FAMILIAR_OLD = `### Strongman Two — The Familiar Spirit

**Biblical basis:** [1 Samuel 28:7](data-scripture="1 Samuel 28:7") — King Saul seeks the medium at Endor who "has a familiar spirit" to contact the dead Samuel.

*Note: The Familiar Spirit was covered in depth in Lesson 8 (Divination, Witchcraft, and the Black Art). The essential framework: this spirit operates by providing counterfeit supernatural information — real, accurate-seeming data obtained through demonic channels rather than divine revelation. Its primary characteristic is familiarity — it knows things it should not know.*

The prohibition is absolute and ancient:

> [Deuteronomy 18:10-12](data-scripture="Deuteronomy 18:10") "There shall not be found among you... a medium or a necromancer or one who inquires of the dead, for whoever does these things is an abomination to the LORD."

Saul's turn to the medium at Endor is the theological collapse of his reign stated as a single action. He had expelled the mediums in his earlier years — now he consults one, because God had gone silent and he could not bear the silence.

**Key insight:** The Familiar Spirit does not offer you access to God. It offers you access to *information* as a substitute for God. People turn to it not because they are irreligious but because God feels unavailable, and something else appears to be open. The spirit thrives at the intersection of genuine spiritual hunger and the perceived absence of God.

**Modern manifestations:** Mediums, psychics, Ouija boards, tarot, past-life regression, astrology apps, channeling, and any practice that seeks hidden knowledge from a spiritual source other than God.`;

const L18_FAMILIAR_NEW = `### Strongman Two — The Familiar Spirit

**Biblical basis:** [1 Samuel 28:7](data-scripture="1 Samuel 28:7") — King Saul seeks the medium at Endor who "has a familiar spirit," seeking to contact the dead Samuel.

She is a widow somewhere outside Endor. Her husband is gone. Her children may be grown and distant. She has found, over the years, that she can access something — a channel, a presence — that tells her things she has no ordinary way of knowing. She does not understand fully what she is accessing. She calls them the dead. She charges for the service. Grief-stricken people come to her and leave with something that feels like contact, like reassurance, like the voice of someone they loved.

Into this story steps Saul — king of Israel, the man who years earlier expelled every medium and wizard from the land — disguised, at night, desperate.

God has stopped speaking. The prophet Samuel is dead. The army of the Philistines is massed for battle and Saul has nowhere left to turn. So he turns here.

> [1 Samuel 28:15](data-scripture="1 Samuel 28:15") "Then Samuel said to Saul, 'Why have you disturbed me by bringing me up?' Saul answered, 'I am in great distress, for the Philistines are warring against me, and God has turned away from me and answers me no more.'"

Whether the figure was genuinely Samuel or a demonic impersonation is debated by serious theologians — but the prohibition is not. God had not stopped being able to speak. Saul had made himself a person God could not speak to. And when the silence became unbearable, he did not repent. He found an alternative channel.

This is the Familiar Spirit's entry mechanism in every generation: **it does not compete with a living relationship with God**. It thrives in the gap left when that relationship has gone cold or been severed. People do not turn to mediums, psychics, tarot, and channeling because they are irreligious. They turn to them because they are spiritually hungry and God feels unavailable — and something else appears open.

The prohibition remains absolute:

> [Deuteronomy 18:10-12](data-scripture="Deuteronomy 18:10") "There shall not be found among you... a medium or a necromancer or one who inquires of the dead, for whoever does these things is an abomination to the LORD."

**What the Familiar Spirit offers:** Counterfeit intimacy. Real, accurate-seeming information obtained through demonic channels. The spirit is called *familiar* because it presents itself as close — as knowing the person, their history, their deceased loved ones, their hidden circumstances. It knows things it should not know. This "familiarity" is its primary seduction and its primary deception: the knowledge it offers is not the knowledge of God but a demonic simulation of divine omniscience.

Saul received accurate information from the Endor session — he was told he would die in battle the next day, and he did. Accuracy is not the test of a spirit. The test is the source.

**Modern manifestations:** Grief-driven consultation of psychic mediums, horoscopes, astrology apps used for daily guidance, Ouija boards, past-life regression, spirit-channeling, and any practice that seeks hidden knowledge from a non-divine spiritual source. The explosion of interest in these practices in the contemporary West tracks almost exactly with the decline of living, expectant prayer in the church. The gap the Familiar Spirit fills is always a gap the church left.`;

// ─── PATCH 5: L18 — Specific action step at close ────────────────────────────

const L18_CLOSE_OLD = `The entry point for all three spirits is not dramatic. It is the small, repeated choice to accept a comfortable substitute for the whole truth.

---

*Next: Three strongmen govern the chambers of the human heart`;

const L18_CLOSE_NEW = `The entry point for all three spirits is not dramatic. It is the small, repeated choice to accept a comfortable substitute for the whole truth.

---

### Before You Continue — One Specific Action

The three deception strongmen are not diagnosed by reading about them. They are diagnosed by confronting them in the specific. Do one of the following before moving to the next lesson:

**If you suspect the Lying Spirit:** Open your Bible to a passage you have been avoiding — one whose plain meaning demands something you have not been willing to do or believe. Read it once, slowly, without interpretation. Ask: what does this text actually say?

**If you suspect the Familiar Spirit:** Audit your information sources for the past month. Where have you sought guidance, prediction, or hidden knowledge — even casually (astrology apps, personality tests used as oracles, any "what does the universe say" framing)? Name them. Renounce them specifically by name in prayer.

**If you suspect the Perverse Spirit:** Find one area of your life where your interpretation of Scripture or of God has consistently bent in the direction of your preference. Name it as precisely as you can: *"I have been reading [passage] as meaning [convenient interpretation] when it likely means [harder truth]."* Write it down. Show it to someone you trust.

You do not need to do all three. One. Specific. Action. The deception strongmen dissolve in the light of precise, honest confrontation.

---

*Next: Three strongmen govern the chambers of the human heart`;

// ─── PATCH 6: L20 — Expand closed loop section ───────────────────────────────

const L20_LOOP_OLD = `**The closed loop:** The spirit of bondage and the spirit of fear are almost always found together. Bondage deepens fear (the chains feel permanent), and fear reinforces bondage (the person will not take the risk of attempting freedom). Breaking this loop requires addressing both simultaneously.

> [John 8:36](data-scripture="John 8:36") — *"If the Son sets you free, you will be free indeed."* The freedom Christ offers is not merely behavioral modification. It is ontological — the breaking of a chain that has grip at the level of the spirit.`;

const L20_LOOP_NEW = `### The Closed Loop — How These Two Spirits Trap Together

The spirit of bondage and the spirit of fear are almost never found alone. They are the two legs of a closed trap, and understanding how the trap works is the first requirement for breaking it.

Here is how the loop operates in practice:

A person falls into addiction — alcohol, pornography, gambling, it does not matter. The bondage is real: the chains hold even when the will genuinely wants to stop. Every failed attempt reinforces a deeper lie: *I cannot change. This is what I am.* The bondage produces shame, and shame produces the fear of exposure — the terror of being truly known and then truly rejected. And so the person hides. The hiding deepens the isolation. The isolation deepens the addiction. The addiction deepens the shame. The shame deepens the fear.

Round and round. Each rotation tightens both chains.

The loop has a second movement that is even more dangerous. The Israelites could not receive Moses' word of liberation — *not because they did not hear it, not because they did not believe in God* — but because the anguish of spirit and the cruel bondage had made them structurally incapable of receiving freedom as a real option. ([Exodus 6:9](data-scripture="Exodus 6:9")). They were not hard-hearted. They were exhausted. People in the advanced stages of this loop often cannot receive the gospel of freedom even when it is clearly proclaimed, warmly offered, and urgently needed. The loop itself filters it out.

**What breaking the loop actually requires:**

It cannot be broken by addressing only one leg. A person freed from the addiction who still lives in fear of exposure will return to the addiction — fear drives them back to the only comfort that has ever consistently worked. A person who has addressed the fear but not the bondage finds that the chains remain even in the absence of the emotional driver. Both must be addressed simultaneously, usually in community — because the loop was designed to keep the person isolated, and isolation is its oxygen.

> [John 8:36](data-scripture="John 8:36") — *"If the Son sets you free, you will be free indeed."* The freedom Christ offers is not behavioral modification. It is ontological — the breaking of a chain that has grip at the level of the spirit. The person who has been set free by the Son does not merely decide to be free. Something in the structure of their captivity has been dismantled.

The prayer is not "help me try harder." It is "bind the strongman — both of them — and plunder what they have held."`;

// ─── PATCH 7: L21 — Personal challenge for Spirit of Antichrist ──────────────

const L21_ANTICHRIST_CLOSE_OLD = `**Ministry response:** There is no compromise. [1 John 4:2](data-scripture="1 John 4:2"): does it confess that Jesus Christ has come in the flesh? Anything that does not pass this test is not of God, regardless of how spiritual, how moral, how compelling, or how broadly accepted it is. The confrontation with this spirit is not aggressive argument but clear, loving, unashamed proclamation: *Jesus Christ is Lord.* That confession is itself the binding of this spirit.

---

### The Twelve Together`;

const L21_ANTICHRIST_CLOSE_NEW = `**Ministry response:** There is no compromise. [1 John 4:2](data-scripture="1 John 4:2"): does it confess that Jesus Christ has come in the flesh? Anything that does not pass this test is not of God, regardless of how spiritual, how moral, how compelling, or how broadly accepted it is. The confrontation with this spirit is not aggressive argument but clear, loving, unashamed proclamation: *Jesus Christ is Lord.* That confession is itself the binding of this spirit.

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

// ─── PATCH 8: S9 — Structured self-audit at close ────────────────────────────

const S9_CLOSE_OLD = `Where does your functional belief system diverge from your stated theology? That gap is where split-level Christianity lives.`;

const S9_CLOSE_NEW = `Where does your functional belief system diverge from your stated theology? That gap is where split-level Christianity lives.

---

### A Structured Self-Audit

The following five scenarios expose the gap between formal and functional belief. For each one, answer honestly: *what would I actually do?* — not what I know I should do.

**Scenario 1 — The Unexplained Illness**
A family member has been chronically ill for two years. Every medical avenue has been pursued. Nothing has worked. A friend suggests intensive prayer and anointing with oil, following James 5:14. Your first instinct is: *(a) Yes, we should do that — it's what Scripture prescribes; (b) We can do that in addition to continuing to look for medical answers; (c) I think prayer is good for the family's morale, but I don't really expect it to change the outcome.*

If your honest answer is (c), your functional demonology is cessationist regardless of your stated theology.

**Scenario 2 — The Persistent Pattern**
Someone close to you has struggled with the same destructive pattern for ten years — addiction, compulsive behavior, relationship sabotage. They have been through counseling and genuinely want to change. Your framework for understanding why it persists is: *(a) There may be a spiritual dimension to this that prayer and possibly deliverance ministry should address; (b) This is primarily a psychological issue that requires psychological treatment; (c) I have not thought about a spiritual dimension at all.*

**Scenario 3 — The Fearful Dream**
You experience a recurring nightmare — oppressive, specific, not connected to any identifiable anxiety in waking life. It wakes you in the early hours with a sense of dread that dissipates slowly. You treat it as: *(a) Something worth praying against specifically, with authority; (b) Probably stress or something in my diet; (c) Something I have never thought to address spiritually.*

**Scenario 4 — The Regional Pattern**
You notice that your city, workplace, or family line carries a consistent spiritual pattern — the same sin, the same breakdown, generation after generation. You interpret this as: *(a) Possibly a demonic stronghold operating at a territorial or generational level; (b) Probably sociological and cultural factors; (c) Coincidence.*

**Scenario 5 — The Worship Culture**
Your church community is spiritually flat — attendance is regular but there is no evident spiritual hunger, no testimonies of God's intervention, no expectation of the supernatural. You interpret this primarily as: *(a) A spiritual problem that requires spiritual address — prayer, fasting, corporate repentance; (b) A leadership and programming problem; (c) Just the normal state of mature Christian communities.*

---

**Reading your answers:** If your honest answers cluster toward (b) and (c), you are experiencing some degree of the Western functional cessationism this supplement describes. This is not a moral failure — it is a cultural formation. The North American church shaped you to think this way. The first step is simply to name it accurately: *I have been living as though the spirit world were theoretical, even while formally believing it is real.*

That naming is the beginning of the reintegration the Nigerian pastor was describing.`;

// ─── PATCH 9: S10 — Full rewrite as scannable reference ─────────────────────

const S10_CONTENT = `![S10 Strongmen Guide](/demons-lessons/s10-strongmen-guide.png)

## Supplement 10 — The Twelve Strongmen: A Complete Reference Guide

*Designed for rapid consultation during prayer and ministry. Each entry: scripture anchor, key manifestations, how the spirit enters, and a prayer declaration. Read the full lessons for theological depth; use this guide in the moment.*

---

### How to Use This Guide

**Step 1 — Identify the pattern.** Look for what is *persistent* (months or years, not days), *cyclical* (returns after apparent resolution), and *resistant* (does not yield to ordinary effort or counsel).

**Step 2 — Name the strongman.** Match the pattern to the spirit. Naming matters — Jesus named the deaf and dumb spirit specifically ([Mark 9:25](data-scripture="Mark 9:25")), not generically. "You devil of jealousy" is more precise than "spirit of anger" because the anger is downstream of the root.

**Step 3 — Pray the declaration.** Authority is in the name of Jesus Christ, not in the formula. Speak with the settled conviction of [Philippians 2:10](data-scripture="Philippians 2:10"): at that name every knee bows.

**Step 4 — Address the entry point.** Every strongman has a door. Closing the door is as important as evicting the occupant.

---

### The Twelve

---

#### 1 — Spirit of Jealousy
**Scripture:** [Numbers 5:14](data-scripture="Numbers 5:14") · [1 Samuel 18:10-11](data-scripture="1 Samuel 18:10")
**Signs:** Suspicion · unfounded accusation · compulsive tracking of others' blessings · rage · revenge · escalating toward violence
**Entry:** Sustained comparison; the moment wound becomes watch
**The root:** A belief that God's gifts to another diminish what is available to you
**Close the door:** Deliberate, specific gratitude — naming your own inheritance before God daily
**Declaration:** *"Spirit of jealousy, I bind you in the name of Jesus Christ and command you to loose your hold. I renounce comparison as my measure."*

---

#### 2 — Lying Spirit
**Scripture:** [2 Chronicles 18:21](data-scripture="2 Chronicles 18:21") · [Jeremiah 23:16](data-scripture="Jeremiah 23:16")
**Signs:** Religious deception · prophetic flattery · comfort over truth · adultery · superstition · believing what one wants to believe
**Entry:** Religious consensus; the approval of the majority substituting for the Word of God
**The root:** Preference for a comfortable God over the actual God
**Close the door:** Commitment to the full counsel of Scripture, including its uncomfortable parts; a culture of honest confrontation
**Declaration:** *"Lying spirit, I bind you in the name of Jesus Christ. I renounce every comfortable substitute for what God has actually said."*

---

#### 3 — Familiar Spirit
**Scripture:** [1 Samuel 28:7](data-scripture="1 Samuel 28:7") · [Deuteronomy 18:10-12](data-scripture="Deuteronomy 18:10")
**Signs:** Occult consultation · astrology · tarot · mediumship · Ouija · past-life regression · seeking hidden knowledge from non-divine sources
**Entry:** Genuine spiritual hunger combined with perceived absence of God; grief that turns to counterfeit contact
**The root:** Distrust that God is enough; willingness to open a different channel
**Close the door:** Total renunciation and destruction of all associated objects; deliberate cultivation of expectant prayer
**Declaration:** *"Familiar spirit, I renounce every channel I have opened to you and close it now in the name of Jesus Christ. I have no other God."*

---

#### 4 — Perverse Spirit
**Scripture:** [Isaiah 19:14](data-scripture="Isaiah 19:14") · [Acts 13:10](data-scripture="Acts 13:10") · [1 John 4:6](data-scripture="1 John 4:6")
**Signs:** Systematic doctrinal error · twisted Scripture interpretation · sexual immorality directed at wrong objects · comprehensive moral disorientation
**Entry:** The small, repeated choice to bend truth in a preferred direction; "Did God actually say...?"
**The root:** Unwillingness to be under the authority of plain revelation
**Close the door:** Return to the plain sense of Scripture; willingness to name distortion as distortion in oneself and others
**Declaration:** *"Perverse spirit, I bind you in the name of Jesus Christ. I renounce every way I have bent the straight ways of the Lord to my convenience."*

---

#### 5 — Spirit of Heaviness
**Scripture:** [Isaiah 61:3](data-scripture="Isaiah 61:3") · [John 11:35](data-scripture="John 11:35")
**Signs:** Grief that will not lift · despair · hopelessness · self-pity · sustained gloom · gluttony as comfort-seeking
**Entry:** Unresolved grief · prolonged isolation · sustained sense of God as absent or withholding · generational patterns
**The root:** A lie about the permanence of the darkness; grief that has been permitted to define reality
**Close the door:** The deliberate offering of praise — not waiting for the feeling, but putting on the garment
**Declaration:** *"Spirit of heaviness, I put on the garment of praise in the name of Jesus Christ. I refuse the spirit that suppresses joy."*

---

#### 6 — Spirit of Whoredom
**Scripture:** [Hosea 4:12](data-scripture="Hosea 4:12") · [Ezekiel 16:39](data-scripture="Ezekiel 16:39") · [1 Corinthians 10:20](data-scripture="1 Corinthians 10:20")
**Signs:** Sexual immorality · pornography addiction · fornication · idolatry · chronic unfaithfulness to God · compulsive seeking of substitutes · ends in poverty
**Entry:** Unmet desire that turns to a substitute rather than to God; the pattern of returning
**The root:** The belief that what God provides is insufficient; the compulsion to seek elsewhere
**Close the door:** Address both the sexual and idolatrous dimension simultaneously; renounce specific substitutes by name
**Declaration:** *"Spirit of whoredom, I bind you in the name of Jesus Christ. I renounce every substitute I have sought in place of God."*

---

#### 7 — Spirit of Infirmity
**Scripture:** [Luke 13:11](data-scripture="Luke 13:11") · [Luke 13:16](data-scripture="Luke 13:16")
**Signs:** Chronic illness with unclear origin · wasting disease · prolonged physical debilitation resistant to medical intervention · bodily affliction connected to spiritual bondage
**Entry:** Not all illness is demonic — discernment required. Look for the connection between physical affliction and patterns of spiritual oppression
**The root:** Satanic bondage expressed through the body; distinguished from ordinary illness by its spiritual dimension
**Close the door:** Prayer with anointing ([James 5:14](data-scripture="James 5:14")); specific declaration of release from spiritual bondage
**Declaration:** *"Spirit of infirmity, I speak release in the name of Jesus Christ — 'Woman, you are freed from your disability' — and command you to go."*

---

#### 8 — Deaf and Dumb Spirit
**Scripture:** [Mark 9:17-25](data-scripture="Mark 9:17")
**Signs:** Muteness in prayer · inability to confess sin · compulsive lying · spiritual dullness unresponsive to the Word · self-destructive patterns · suicidal compulsion
**Entry:** Operates through blocking — the reception of truth and the expression of honest speech simultaneously shut down
**The root:** A spirit of double silencing: deaf to God, mute before others
**Close the door:** Prayer and fasting specifically ([Mark 9:29](data-scripture="Mark 9:29")); this spirit requires sustained, serious spiritual engagement
**Declaration:** *"Deaf and dumb spirit, I command you in the name of Jesus Christ: come out and never enter again. The ears open; the mouth is loosed."*

---

#### 9 — Spirit of Fear
**Scripture:** [2 Timothy 1:7](data-scripture="2 Timothy 1:7") · [Romans 8:15](data-scripture="Romans 8:15") · [1 John 4:18](data-scripture="1 John 4:18")
**Signs:** Torment · phobias · terror · timidity · inability to walk in calling · dread of abandonment · nightmares · paralysis
**Entry:** Sin creates separation; separation exposes the soul to dread. Also: sustained prayerlessness and disconnection from God
**The root:** Fear entered with the Fall ([Genesis 3:10](data-scripture="Genesis 3:10")) — the first emotional consequence of broken relationship with God
**Close the door:** Righteousness ([Isaiah 54:14](data-scripture="Isaiah 54:14")); perfect love ([1 John 4:18](data-scripture="1 John 4:18")); direct prayer; refusal to agree with the spirit's assessment
**Declaration:** *"Spirit of fear, I bind you in the name of Jesus Christ. God has not given me fear but power, love, and a sound mind — and I receive that now."*

---

#### 10 — Spirit of Pride
**Scripture:** [Proverbs 16:18](data-scripture="Proverbs 16:18") · [Isaiah 14:13-14](data-scripture="Isaiah 14:13") · [Proverbs 21:24](data-scripture="Proverbs 21:24")
**Signs:** Arrogance · contempt · uncontrolled anger · mockery · stubbornness · spiritual pride (the conviction of being the most spiritual)
**Entry:** The unexamined assumption that one's own judgment is correct; the refusal of creature status before God
**The root:** Satan's first sin — reproduced in the person who refuses to receive their existence as gift
**Close the door:** [James 4:6-7](data-scripture="James 4:6") — submission to God *first*, then resistance of the devil. Humility is not the absence of pride; it is the deliberate, sustained acknowledgment of creature status
**Declaration:** *"Spirit of pride, I bind you in the name of Jesus Christ. I submit to God. I am creature, not Creator. I receive correction."*

---

#### 11 — Spirit of Bondage
**Scripture:** [Romans 8:15](data-scripture="Romans 8:15") · [Exodus 6:9](data-scripture="Exodus 6:9") · [John 8:36](data-scripture="John 8:36")
**Signs:** Compulsive addiction (substances, pornography, gambling, behavioral) · bitterness · spiritual blindness · inability to receive the word of freedom · chains that feel like identity
**Entry:** The closed loop: bondage deepens fear, fear reinforces bondage. Advanced stages produce an inability to receive liberation even when clearly offered
**The root:** Chains that have grip at the level of the spirit, not merely the will
**Close the door:** Address both spirits simultaneously (bondage + fear); break isolation; community is essential — the loop was designed to keep the person alone
**Declaration:** *"Spirit of bondage, I bind you in the name of Jesus Christ. Whom the Son sets free is free indeed — and I receive that freedom now, completely."*

---

#### 12 — Spirit of the Antichrist
**Scripture:** [1 John 4:3](data-scripture="1 John 4:3") · [2 John 1:7](data-scripture="2 John 1:7") · [1 John 4:2](data-scripture="1 John 4:2")
**Signs:** Denial of the Incarnation · reduction of Jesus to moral teacher · religious syncretism · pluralism ("all paths lead to God") · ecumenism that makes the resurrection negotiable
**Entry:** Not through atheism but through religion; the gradual softening of Christ's specific, exclusive claims
**The root:** A spirit with a theological agenda — the systematic substitution of a convenient god for the specific God who came in flesh
**Close the door:** No compromise on [John 14:6](data-scripture="John 14:6"); the test of every spirit ([1 John 4:2](data-scripture="1 John 4:2")); clear proclamation without apology
**Declaration:** *"Spirit of the Antichrist, I bind you in the name of Jesus Christ, who has come in the flesh, who died and rose bodily, who is Lord — the only Lord. Yield."*

---

### The Master Test

Every strongman in this guide is ultimately addressed by the same authority. [1 John 3:8](data-scripture="1 John 3:8"): *"The reason the Son of God appeared was to destroy the works of the devil."*

Name the work. Bring the authority. Stand in the victory that is already settled.`;

// ─── PATCH 10: Quiz for Part VI ──────────────────────────────────────────────

const QUIZ_CONTENT = `## Quiz — Part VI: The Unseen Architecture

*Five questions covering Lessons 17–21 and Supplements 9–10. Think through each answer before reading the explanation.*

---

### Question 1

**The lesson on the Watchers and Nephilim presents three interpretive positions for Genesis 6:1-4. Name all three, give one strength and one weakness of each, and state which position the lesson recommends as most textually grounded and why.**

<details>
<summary>See Answer</summary>

**(1) Sethite Theory** (Augustine, Julius Africanus): "Sons of God" = godly line of Seth; "daughters of men" = ungodly daughters of Cain. Strength: avoids theological difficulty of supernatural-human mating. Weakness: requires *bene ha-Elohim* to mean ordinary humans against every other OT usage, and does not explain giant offspring.

**(2) Angelic/Watcher Theory** (oldest Jewish and early Christian interpretation): fallen angelic beings transgressed the divine order by taking human wives. Strength: consistent with every other OT usage of *bene ha-Elohim* (Job 1:6; 38:7); Jude 6 and 2 Peter 2:4-5 connect angelic sin directly to the Flood era. Weakness: theologically difficult; requires supernatural-human mating.

**(3) Royal/Dynastic Theory**: "Sons of God" = ancient Near Eastern kings who claimed divine status. Strength: explains the political dimension ("heroes of old, men of renown"). Weakness: cannot account for *bene ha-Elohim* as a term or the supernatural character of the offspring.

**Most textually grounded:** the Angelic/Watcher Theory — because *bene ha-Elohim* consistently refers to angelic beings in every other OT usage, and because Jude and 2 Peter most naturally presuppose this framework. The lesson is careful to note this remains theologically contested.

</details>

---

### Question 2

**The twelve strongmen framework derives from Jesus' teaching in Matthew 12:29. Explain the principle, then identify which three strongmen the lesson groups together as "strongmen of deception" and explain why each one is placed in that category.**

<details>
<summary>See Answer</summary>

**The principle (Matthew 12:29):** "How can anyone enter a strong man's house and carry off his possessions unless he first ties up the strong man?" Behind clusters of persistent, cyclical, resistant spiritual activity, there is often a governing spirit that organizes the cluster. Address the strongman before addressing the downstream manifestations.

**The three deception strongmen:**

(1) **Lying Spirit** — deceives *through people*, especially religious leaders and prophetic consensus. It replaces what God has actually said with what people want to hear. Biblical case: the 400 prophets of Ahab (2 Chronicles 18).

(2) **Familiar Spirit** — deceives *through counterfeit supernatural access*, providing real-seeming information through demonic channels as a substitute for God's guidance. Biblical case: King Saul and the medium of Endor (1 Samuel 28).

(3) **Perverse Spirit** — deceives *through the text itself*, introducing systematic distortion into Scripture interpretation and moral reasoning. Biblical case: Paul confronting Elymas (Acts 13:10). Isaiah 19:14 shows it can cause an entire nation to "err in every work."

</details>

---

### Question 3

**Lessons 19 and 20 together cover six strongmen. The lesson on affliction describes a "closed loop" between the Spirit of Fear and the Spirit of Bondage. Describe how the loop works, why it is particularly resistant to ordinary intervention, and what breaking it actually requires.**

<details>
<summary>See Answer</summary>

**How the loop works:** Bondage (addiction, compulsion, chains) produces shame; shame produces fear of exposure and rejection; fear of exposure drives the person to hide; hiding deepens isolation; isolation deepens the addiction. Each rotation tightens both chains. The loop also has a second movement: in advanced stages, the person becomes structurally unable to receive the word of freedom even when it is clearly offered — exactly as the Israelites could not hear Moses because of "anguish of spirit and cruel bondage" (Exodus 6:9). The chains don't just hold — they filter out the offer of release.

**Why it resists ordinary intervention:** Breaking one leg of the loop without the other fails. Free the person from addiction while the fear remains, and fear drives them back to the only comfort that has consistently worked. Address the fear without the bondage, and the chains remain even in the absence of the emotional driver. Additionally, the loop is designed to produce isolation — and isolation is its oxygen.

**What breaking it requires:** Both spirits addressed simultaneously, usually in community (because the loop is designed to keep the person alone). Not "help me try harder" but "bind both strongmen and dismantle the structure." The freedom is ontological, not behavioral — John 8:36.

</details>

---

### Question 4

**Supplement 9 introduces the concept of "split-level Christianity." Define the concept precisely, describe both the Majority World and Western forms of the problem, and state two of MacDonald's four criteria for sound global demonology.**

<details>
<summary>See Answer</summary>

**Split-level Christianity:** A dangerous bifurcation in which the convert holds two simultaneous belief systems that never fully integrate. Level One (official theology): Jesus is Lord, the Bible is true, the church is the body of Christ. Level Two (functional theology): when serious illness, spiritual attack, or unexplained misfortune strikes, a different operational framework takes over — whether traditional healer (Majority World form) or secular-therapeutic-only (Western form).

**Majority World form:** Converts accept the gospel for "big" events (salvation, eternal life, worship) but return to traditional practitioners for "small" events (illness, spiritual attack, crop failure). Not because they doubt Jesus, but because the Christianity they received has no practical category for addressing what they are experiencing.

**Western form:** Christians hold a formally orthodox demonology (believe in Satan and demons theoretically) while functionally living as though the spirit world were inert. They process everything through medicine, therapy, and circumstance — not because they reject Scripture but because the Enlightenment shaped them to treat empirically unverifiable claims as having limited practical standing.

**Two of MacDonald's four criteria:** (1) Biblical Centrality — Scripture is the primary and normative source; cultural experience illuminates but does not override. (2) Theological Harmony — demonological conclusions must cohere with soteriology, Christology, pneumatology, and eschatology. (Any two of the four are acceptable.)

</details>

---

### Question 5

**The Spirit of the Antichrist is identified as the twelfth and final strongman. What is its defining characteristic? Why does the lesson describe it as the "most broadly hosted" of the twelve? And what is the single test John gives for identifying it?**

<details>
<summary>See Answer</summary>

**Defining characteristic (1 John 4:3):** The systematic denial of the Incarnation — specifically, that Jesus Christ has come in the flesh. Not denial of God in general, but denial of the *particularity* of the Incarnation: that God became this specific man, Jesus of Nazareth, born of a woman, who died and rose bodily.

**Why most broadly hosted:** It does not operate through atheism (which denies the premise). It operates through *religion* — through devout, moral, spiritually serious people who acknowledge "God" or "the divine" or "spiritual reality" while denying the specific, exclusive Lordship of Jesus Christ. Religious syncretism, the reduction of Jesus to one spiritual teacher among many, pluralism that makes all religions equivalent, and ecumenism that renders the resurrection negotiable are all hosts. Because the spirit works within the category of religiosity rather than irreligiosity, its reach is vast — "many deceivers have gone out into the world" (2 John 1:7).

**The single test (1 John 4:2):** Does the spirit confess that Jesus Christ has come in the flesh? Any spirit, teaching, or movement that does not pass this test is not of God — regardless of how spiritual, moral, compelling, or broadly accepted it may be.

</details>`;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log("Applying 10 improvements to Part VI...\n");

  // ── L17 patches ────────────────────────────────────────────────────────────
  await patch("cmq6ktev5000314g6pqaidojn", "L17 — Nephilim section: Numbers 13 scene opening",
    L17_NEPHILIM_OLD, L17_NEPHILIM_NEW);

  await patch("cmq6ktev5000314g6pqaidojn", "L17 — Angels/Demons crossover after three positions",
    L17_CROSSOVER_FULL_FIND, L17_CROSSOVER_FULL_NEW);

  await patch("cmq6ktev5000314g6pqaidojn", "L17 — Personal application rewrite with direct challenge",
    L17_APPLICATION_OLD, L17_APPLICATION_NEW);

  // ── L18 patches ────────────────────────────────────────────────────────────
  await patch("cmq6ktev7000514g6aitze463", "L18 — Familiar Spirit: full cinematic treatment",
    L18_FAMILIAR_OLD, L18_FAMILIAR_NEW);

  await patch("cmq6ktev7000514g6aitze463", "L18 — Specific action step at close",
    L18_CLOSE_OLD, L18_CLOSE_NEW);

  // ── L20 patches ────────────────────────────────────────────────────────────
  await patch("cmq6kteva000914g6w7kuq73v", "L20 — Closed loop: expanded with concrete scenario",
    L20_LOOP_OLD, L20_LOOP_NEW);

  // ── L21 patches ────────────────────────────────────────────────────────────
  await patch("cmq6ktevb000b14g6ezlrl09a", "L21 — Spirit of Antichrist: personal examination",
    L21_ANTICHRIST_CLOSE_OLD, L21_ANTICHRIST_CLOSE_NEW);

  // ── S9 patches ─────────────────────────────────────────────────────────────
  await patch("cmq6ktevc000d14g6pyrb8aol", "S9 — Structured self-audit at close",
    S9_CLOSE_OLD, S9_CLOSE_NEW);

  // ── S10 full rewrite ───────────────────────────────────────────────────────
  await set("cmq6ktevd000f14g6bs1bw3ly", "S10 — Full rewrite: scannable reference with prayer declarations",
    S10_CONTENT);

  // ── Quiz for Part VI ───────────────────────────────────────────────────────
  const quiz = await db.courseLesson.create({
    data: {
      chapterId: "cmq6ktev3000114g6efnv7r93",
      order: 7,
      title: "Quiz — Part VI: The Unseen Architecture",
      type: "QUIZ",
      content: QUIZ_CONTENT,
    },
  });
  console.log(`  ✓ Quiz created (${quiz.id})`);

  console.log("\nDone. All 10 improvements applied.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
