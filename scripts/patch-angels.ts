/**
 * patch-angels.ts — 7 targeted content improvements for the Angels course
 *
 * 1. L4  — Add Demons crossover paragraph (fall of angels) before the closing bridge
 * 2. L7  — Replace cultural-diagnosis opening with Sennacherib/Hezekiah scene-first opening
 * 3. L9  — Add personal register section at end
 * 4. L10 — Add personal register section at end
 * 5. L18 — Add "What's Next" bridge pointing to the Demons course
 * 6. S4  — Replace Key-Terms + table + Questions format with throne-room visual guide
 * 7. S6  — Replace extended essay with Socratic dialogue format
 */

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

// ─────────────────────────────────────────────────────────────────────────────
// PATCH 1 — L4: add Demons crossover paragraph
// ─────────────────────────────────────────────────────────────────────────────

const L4_OLD_ENDING = `*Next: We have surveyed the angels in action. Now we study them in their own order. Part II opens with the angels closest to God — the ones whose entire existence is pure worship. We begin with the choir whose name means "burning."*`;

const L4_NEW_ENDING = `### The Shadow Side of the Story

Every appearance in this lesson assumes something this lesson does not yet explain: that the angels you have read about here are the ones who *remained*. They are the faithful.

Scripture is equally clear that a portion of the angelic host did not remain faithful. The one Jesus called "the father of lies" was there at Eden — the same Eden where the Cherubim stood guard. *"He was a murderer from the beginning"* ([John 8:44](data-scripture="John 8:44")). St. Jude speaks of *"the angels who did not stay within their own position of authority, but left their proper dwelling"* ([Jude 1:6](data-scripture="Jude 1:6")). St. Peter writes of *"angels who sinned"* and were cast into chains of gloomy darkness to await judgment ([2 Peter 2:4](data-scripture="2 Peter 2:4")).

The angelic world is not uniformly glorious. The same nature that makes an angel capable of burning love makes a fallen angel capable of profound malice. The Cherubim at Eden's gate guard against a serpent who was once a being of the same order.

This course studies the faithful angels — the nine choirs in their proper glory. But to understand them fully, you must eventually study their opposites. The Demons course takes up exactly that task: the fall of Lucifer, the nature of demonic hierarchy, and the spiritual warfare that has been underway since before the first human being drew breath.

For now, hold both realities together: the angel who stands beside you in the light — and the fact that there are those who would oppose both of you in the dark.

---

*Next: We have surveyed the angels in action. Now we study them in their own order. Part II opens with the angels closest to God — the ones whose entire existence is pure worship. We begin with the choir whose name means "burning."*`;

// ─────────────────────────────────────────────────────────────────────────────
// PATCH 2 — L7: replace cultural-diagnosis opening with Sennacherib scene
// ─────────────────────────────────────────────────────────────────────────────

const L7_OLD_OPENING = `## The Thrones — Expressions of Divine Authority and Justice

### Why Stability Matters

We live in an age of instability. Institutions that seemed permanent dissolve. Certainties erode. The things we build are dismantled; the things we trust are redefined. Even the vocabulary of basic realities shifts beneath our feet.

Into this, the theology of the Thrones speaks a word that is desperately needed: **some things do not move.**`;

const L7_NEW_OPENING = `## The Thrones — Expressions of Divine Authority and Justice

### One Night in Jerusalem — 185,000 Men

The year is approximately 701 BC. The Assyrian army under Sennacherib — the most powerful military force the ancient world had yet produced — has encircled Jerusalem. The city has no realistic hope of relief. Hezekiah has received a letter from Sennacherib that mocks the God of Israel along with every other god the Assyrians have defeated. He goes to the temple, spreads the letter before the Lord, and prays.

The prophet Isaiah sends a response: *"Do not be afraid."*

That night, something happens:

> [Isaiah 37:36](data-scripture="Isaiah 37:36") "And the angel of the Lord went out and struck down 185,000 in the camp of the Assyrians. And when people arose early in the morning, behold, these were all dead bodies."

One angel. One night. One hundred and eighty-five thousand.

Sennacherib broke camp, returned to Nineveh, and was shortly thereafter assassinated by his own sons. The threat that had seemed unstoppable — the letter that mocked the throne of God — dissolved overnight.

Theology, with all its precision, can give you the categories. But sometimes you need a scene first. This is what angelic authority looks like in history: a judgment executed overnight, a siege lifted at dawn, a superpower turned aside by a single act of divine will enacted through a single created being.

This is the context for understanding the **Thrones**.

### The Stable Things`;

// ─────────────────────────────────────────────────────────────────────────────
// PATCH 3 — L9: add personal register section at end
// ─────────────────────────────────────────────────────────────────────────────

const L9_OLD_ENDING = `*Next: The second hierarchy continues. We meet the Powers — the defenders of cosmic order — and then the Principalities, who stand at the intersection of heaven and human history, governing nations, civilizations, and the Church itself.*`;

const L9_NEW_ENDING = `### What This Means for You Right Now

There is a tendency, when studying the middle hierarchy, to treat it as the purely theoretical section — the abstract mechanics of cosmic governance, interesting for the scholarly but remote from daily life.

That tendency is wrong.

The Dominations and Virtues are not remote. They are the *explanation* for the world you woke up in this morning. The gravity that held you to your bed. The heartbeat that continued while you slept. The oxygen that existed to be breathed. Every one of these is not an impersonal mechanism but an intelligent act of creatures who know what they are doing and why.

You live inside the work of the Virtues. Your entire life is surrounded by their labor.

Consider what this changes:

**How you see the ordinary.** You drive to work past trees that are budding because the Virtues are executing the will of the God who made the seasons. You eat a meal because agriculture works because the physical laws of growth and soil are sustained by personal beings in loving obedience. None of this is ordinary in the sense of mundane. It is *regular* — but regular in the way a faithful person keeps their word every single day, not in the way a machine repeats its function.

**How you pray for the miraculous.** When you ask God for something that requires a miracle, you are not asking Him to break His creation. You are asking Him to direct the Virtues — who already sustain creation — to do something extraordinary in service of a specific need. This is not foreign to them. It is exactly what they did when Moses raised his staff over the sea.

**How you face chaos.** When the structures of civilization shake — when the institutions you have trusted begin to fail — the doctrine of the Dominations and Virtues says: the governance of creation does not depend on the institutions you can see. It depends on the beings above them, and on the God above those beings.

Sit with that for a moment before moving on.

---

*Next: The second hierarchy continues. We meet the Powers — the defenders of cosmic order — and then the Principalities, who stand at the intersection of heaven and human history, governing nations, civilizations, and the Church itself.*`;

// ─────────────────────────────────────────────────────────────────────────────
// PATCH 4 — L10: add personal register section at end
// ─────────────────────────────────────────────────────────────────────────────

const L10_OLD_ENDING = `*Next: We descend from the second hierarchy into the third — and from the governance of nations, we move to something more intimate: the angels assigned to carry out the most important missions in the history of creation. We begin with the three archangels Scripture names by name.*`;

const L10_NEW_ENDING = `### A Nation, A Church, A Person

This lesson has ranged across the governance of nations and civilizations. It is worth bringing it closer.

You are part of a nation that has a Principality. Whether that Principality is faithful or demonic — whether it is one of the angels who maintained their estate or one of the fallen who seek to draw nations away from God — is something you will probably not know this side of heaven. What you know is that the nation you inhabit is not spiritually neutral, and that your prayers for it are not politically abstract. They are addressed to the God who governs nations through an angelic order that hears them.

You are part of a Church. St. Michael, *the great prince who has charge of your people* ([Daniel 12:1](data-scripture="Daniel 12:1")), has been specifically named as the Principality of God's covenant people. When the early Christians prayed the prayer of Michael, they were not invoking a symbol. They were addressing an actual being with an actual commission who has been at this work since before the Church existed.

You are a person. And here is the thing the Principalities' lesson teaches by contrast: they govern *peoples* — nations, civilizations, the Church as a whole. But you are not only a member of a people. You are a person.

For persons — for you, specifically — there is an angel assigned not to a nation or a civilization but to *you alone*. We will meet them in the third hierarchy.

---

*Next: We descend from the second hierarchy into the third — and from the governance of nations, we move to something more intimate: the angels assigned to carry out the most important missions in the history of creation. We begin with the three archangels Scripture names by name.*`;

// ─────────────────────────────────────────────────────────────────────────────
// PATCH 5 — L18: add "What's Next" bridge to Demons course
// ─────────────────────────────────────────────────────────────────────────────

const L18_OLD_ENDING = `> [Psalm 103:20-21](data-scripture="Psalm 103:20") "Bless the Lord, O you his angels, you mighty ones who do his word, obeying the voice of his word! Bless the Lord, all his hosts, his ministers, who do his will!"`;

const L18_NEW_ENDING = `> [Psalm 103:20-21](data-scripture="Psalm 103:20") "Bless the Lord, O you his angels, you mighty ones who do his word, obeying the voice of his word! Bless the Lord, all his hosts, his ministers, who do his will!"

---

### What Comes Next — The Other Half of the Story

This course has studied the angels who stood. The loyal ones. The nine choirs in their unfallen glory.

But the course cannot be the whole story, because the Bible is not the whole story without the other half.

In the opening of Scripture, a creature appears in the garden — *"more crafty than any other beast of the field"* ([Genesis 3:1](data-scripture="Genesis 3:1")) — who is not a beast at all. He is a fallen being of the angelic order, and he is already in opposition to God, to humanity, and to the creation whose governance you have just studied.

The angels you have learned about here do not operate in an unchallenged environment. The Principalities who guard nations face opposing Principalities who seek to corrupt them. The Virtues who sustain creation face a host of beings whose goal is destruction. Michael does not fight unopposed — he fights the prince of Persia, and before that, the dragon.

The **Demons course** takes up this other half. It begins where this course began — with the angelic nature — and follows it in the direction of its corruption: the fall of Lucifer, the hierarchy of fallen spirits, the nature of demonic activity in the world, and the authority given to the redeemed to stand against it.

Understanding the faithful angels prepares you to understand their opposites. Understanding the cosmic governance of the nine choirs prepares you to understand how that governance is contested. Understanding the love of the angels for God and humanity prepares you to understand the hatred that stands against both.

The relationship with the angels has just begun. Continue it — and learn what it is that they, and you, are standing against.`;

// ─────────────────────────────────────────────────────────────────────────────
// PATCH 6 — S4: replace Key Terms / table / Questions with throne room visual guide
// ─────────────────────────────────────────────────────────────────────────────

const S4_NEW_CONTENT = `![S4 Thrones Living Creatures](/angels-lessons/s4-thrones-living-creatures.png)

## Supplement 4 — For Lessons 7 & 8: The Thrones and the Living Creatures

### A Visitor's Guide to the Heavenly Throne Room

---

What follows is not a theology lecture. It is a tour.

The throne room of God appears in Scripture more often than most readers notice — and it is always the same room, seen from different vantage points. Isaiah sees it from the floor ([Isaiah 6:1-7](data-scripture="Isaiah 6:1")). Ezekiel sees it approaching ([Ezekiel 1:4-28](data-scripture="Ezekiel 1:4")). Daniel sees it in a night vision ([Daniel 7:9-10](data-scripture="Daniel 7:9")). John sees it across the threshold of the opened heaven ([Revelation 4:1-11](data-scripture="Revelation 4:1")).

Walk through it once, carefully.

---

#### What You See: The Throne Itself

> [Daniel 7:9](data-scripture="Daniel 7:9") "His throne was fiery flames; its wheels were burning fire. A stream of fire issued and came out from before him."

**What it means:** Wheeled thrones appear in ancient Near Eastern imagery as the throne-chariots of kings — moveable, active authority. God's throne is not static. It does not remain in one place. It is present everywhere His sovereign will is enacted. The fire signals judgment: this is the seat where the books are opened and history is reviewed. The *wheels* connect this vision to Ezekiel's chariot-throne (*merkabah*), where the Cherubim bear the divine chariot through the cosmos.

---

#### What You Hear: The Living Creatures

> [Revelation 4:8](data-scripture="Revelation 4:8") "Day and night they never cease to say, 'Holy, holy, holy, is the Lord God Almighty, who was and is and is to come!'"

**Who they are:** The four living creatures (*zoa*) are placed "in the midst of the throne and around the throne" — the innermost circle of the divine court. They share the Cherubim's four faces (lion, ox, man, eagle) and the Seraphim's six wings and ceaseless praise. John's vision synthesizes the earlier prophetic visions into a single overwhelming image.

**The triple holy:** The word *hagios* — holy — is the declaration that God is utterly unlike everything else that exists. The repetition of "holy, holy, holy" is not redundancy. In Hebrew idiom, repetition indicates superlative: *the most holy, beyond any comparison of holy.* The living creatures have been saying this since the first instant of their existence, and they have never found a moment when it was no longer true.

**What it means for worship:** The early church placed the *Sanctus* — "Holy, Holy, Holy, Lord God of hosts" — at the climax of the Eucharistic prayer precisely because the Mass is understood as participation in this heavenly liturgy. When the congregation sings the Sanctus, the living creatures are already singing it. The joining is real.

---

#### What You Stand On: The Thrones Beneath You

> [Colossians 1:16](data-scripture="Colossians 1:16") "Whether thrones or dominions or rulers or powers — all things were created through him and for him."

**What they are:** The Thrones are not the divine throne — they are the angelic beings who embody and contemplate God's judicial authority. Pseudo-Dionysius calls them those who *"receive the highest gift of God most purely and immaculately."* Their proximity to God is not geographic but ontological: their nature is most perfectly ordered toward the contemplation of divine sovereignty.

**What they hold:** When Daniel sees the books opened ([Daniel 7:10](data-scripture="Daniel 7:10")) — the cosmic review of all history — the Thrones are the angelic presence within which this judgment is carried out. They are the stability beneath every event in history. When empires rise and fall, the Thrones have not moved. When your world shakes, the Thrones have not shifted.

**Their practical word to you:** You are not required to be stable. But you are permitted to rest in what is.

---

#### Four Faces — Four Dimensions of Divine Reality

The four faces of the living creatures appear in Ezekiel 1, Revelation 4, and have been interpreted by the Fathers as symbols of the four Gospels (lion = Mark, ox = Luke, man = Matthew, eagle = John). They can also be read as four dimensions of the one God as He is known in creation:

| Face | Creature | What It Reveals |
|------|---------|----------------|
| **Lion** | King of wild beasts | Divine sovereignty; the untameable glory of God |
| **Ox** | Patient servant | Divine patience; the God who bears the burden of creation |
| **Man** | Rational creature | Divine wisdom; the God who speaks and is known |
| **Eagle** | Soaring, all-seeing | Divine transcendence; the God who sees all from above |

The four faces together say: God is not partial. He is not the sovereignty-God who lacks patience, or the patient-God who lacks sovereignty. The living creatures hold all four in ceaseless, combined praise.

---

#### The Sanctus — Your Part in the Throne Room

Every time the church sings the Sanctus, something real is happening. The prayer is not a remembrance of a past event. It is a present participation in an ongoing reality.

Practice it slowly:

*Holy, holy, holy Lord, God of hosts.*
*Heaven and earth are full of your glory.*

When you say "heaven and earth are full of your glory" — you are agreeing with the living creatures. You are joining a choir that has been singing since before your birth and will be singing after your death.

This is why the Thrones and the Living Creatures matter: not as museum pieces of angelology, but as the context within which all Christian worship takes place.

---

*Before moving on: read Isaiah 6:1-7 once more, slowly. This time, try to see it — not as a text but as a place. You have been given a tour. Stand in it.*`;

// ─────────────────────────────────────────────────────────────────────────────
// PATCH 7 — S6: replace extended essay with Socratic dialogue
// ─────────────────────────────────────────────────────────────────────────────

const S6_NEW_CONTENT = `![S6 Cosmic Governance](/angels-lessons/s6-cosmic-governance.png)

## Supplement 6 — For Lessons 9 & 10 (Extended): The Cosmic Governance of Angels

### A Conversation on Angels and the Cosmos

*The following is a dialogue between a student working through this course and a theology teacher answering the questions the material raises. The questions are real; the answers represent the classical Christian tradition.*

---

**Student:** I understand that the Dominations and Virtues govern the physical universe. But doesn't that just mean the universe is controlled by intermediaries? It feels like it makes God more remote, not less.

**Teacher:** That's the opposite of what the tradition intends. The Dominations and Virtues are not a buffer between you and God — they are the hands by which God is *personally present* in the physical world at every moment. The alternative to angelic governance is not a more immediate God; it's a God who governs through impersonal mechanism, through an autonomous machine called nature that runs on its own. The classical view says: no, God is not a deist watchmaker who wound up the universe and walked away. He is present, actively and personally governing every moment of creation through personal beings who enact His will as an act of love and obedience. That is *more* presence, not less.

---

**Student:** But can't God govern creation directly, without angels? Why does He need intermediaries at all?

**Teacher:** He doesn't *need* them — He *chose* them. This is an important distinction. God could sustain creation directly, by pure divine will without any creaturely mediation. He does not do so, apparently because it pleases Him to share His governance with created beings who participate in it as free, intelligent agents. This is consistent with how He governs everything else: He could have saved humanity without the Incarnation, without prophets, without the Church, without sacraments. He chose all of these as means precisely because He is a God who loves to share Himself, to bring creatures into the act of what He is doing. The angels governing creation is the same principle applied to the physical order.

---

**Student:** When the Virtues perform a miracle, are they overriding natural law? If natural law is their work, can they just suspend it whenever they want?

**Teacher:** They cannot act on their own initiative. The Virtues are not autonomous. They act only in obedience to divine command. When God wills an ordinary sunrise, the Virtues sustain the ordinary course of nature. When God wills that a dead man walk out of a tomb, He directs the Virtues to enact something beyond the ordinary — not to break their own work, but to use it in an extraordinary way in service of a specific divine purpose. A miracle is not a gap in creation; it is the same power that fills creation, used with singular intentionality. The Virtues do not experience this as contradiction. They experience it as one more act of obedience to the God they love.

---

**Student:** I find the Principalities fascinating and terrifying at the same time — the idea that nations have spiritual rulers, including demonic ones. Does that mean when an evil empire does evil things, a demon is responsible?

**Teacher:** Responsible, no. *Implicated*, yes. Demonic Principalities do not *cause* human evil — they cannot override human freedom. What they can do is cultivate, amplify, and exploit the patterns of human sin that are already present. Think of them less as puppet-masters and more as expert gardeners of corruption. They find the weeds that are already growing in the soil of a culture — pride, fear, tribalism, resentment, greed — and water them. They have centuries of experience doing this. But the humans who enact evil are still morally responsible for their choices. The demonic dimension adds a layer; it does not replace human agency.

---

**Student:** If Michael is the Principality of God's covenant people, was he fighting in World War II? Is he fighting now?

**Teacher:** The tradition would say: yes. Not in the way human soldiers fight — his engagement is at the level of the spiritual governance of peoples, the movement of history toward or away from God's plan, the protection of the Church from forces that would destroy her. When St. John Paul II attributed the fall of Soviet communism partly to the intervention of Mary — *"one hand pulled the trigger, another guided the bullet"* — this is the same mode of thinking. The spiritual dimension of history is real. Michael's assignment is not a metaphor. He has been executing it for as long as there have been people to protect. Whether that involves what looks like military history in some direct sense is something we cannot see. But the tradition affirms: when the Church endures, Michael is doing his job.

---

**Student:** This all makes me feel very small. My life is tiny next to nations and cosmic governance and nine angelic choirs.

**Teacher:** That's the right response to the second hierarchy. Now remember the third. The Dominations govern the blueprint. The Virtues govern the cosmos. The Principalities govern nations. And then — after all of that scale, after the entire machinery of creation's governance — God assigns one angel, from the lowest of the nine choirs, not to a civilization or a century but to you. One person. By name. Not because you are small, but because you are not. God's economy of care turns out to be: the larger the machinery, the more precisely it serves the singular. The whole cosmic apparatus exists, in some sense, so that you can be found.

---

*Next lesson: we enter the third hierarchy — the Archangels, the Angels, and the one assigned to you.*`;

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function patch(id: string, label: string, find: string, replace: string) {
  const lesson = await db.courseLesson.findUnique({ where: { id }, select: { content: true } });
  if (!lesson) { console.error(`  ✗ ${label}: lesson not found`); return; }
  if (!lesson.content?.includes(find)) { console.error(`  ✗ ${label}: target string not found`); return; }
  const newContent = lesson.content.replace(find, replace);
  await db.courseLesson.update({ where: { id }, data: { content: newContent } });
  console.log(`  ✓ ${label}`);
}

async function set(id: string, label: string, content: string) {
  const lesson = await db.courseLesson.findUnique({ where: { id }, select: { id: true } });
  if (!lesson) { console.error(`  ✗ ${label}: lesson not found`); return; }
  await db.courseLesson.update({ where: { id }, data: { content } });
  console.log(`  ✓ ${label}`);
}

async function main() {
  console.log("Patching Angels course — 7 targeted improvements...\n");

  await patch(
    "cmq6612uv000bgeo05oipwit7",
    "L4 — Demons crossover paragraph",
    L4_OLD_ENDING,
    L4_NEW_ENDING
  );

  await patch(
    "cmq6612v8000ngeo03byfmsyu",
    "L7 — Sennacherib scene-first opening",
    L7_OLD_OPENING,
    L7_NEW_OPENING
  );

  await patch(
    "cmq6612vg000vgeo0scoc75ik",
    "L9 — personal register section",
    L9_OLD_ENDING,
    L9_NEW_ENDING
  );

  await patch(
    "cmq6612vi000xgeo0z961cywt",
    "L10 — personal register section",
    L10_OLD_ENDING,
    L10_NEW_ENDING
  );

  await patch(
    "cmq6612w6001rgeo0k5pju6rj",
    "L18 — What's Next bridge to Demons course",
    L18_OLD_ENDING,
    L18_NEW_ENDING
  );

  await set(
    "cmq6612vc000rgeo0gmsp7vl8",
    "S4 — throne room visual guide format",
    S4_NEW_CONTENT
  );

  await set(
    "cmq6612vl0011geo0w37ggjie",
    "S6 — Socratic dialogue format",
    S6_NEW_CONTENT
  );

  console.log("\nDone.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
