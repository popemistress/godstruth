/**
 * add-quiz-lessons.ts — Insert 1 QUIZ lesson at the end of each chapter
 * for both the Angels and Demons courses.
 *
 * 5 questions per quiz, markdown format with answers below each question.
 */

import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

interface QuizSpec {
  chapterId: string;
  order: number;
  title: string;
  content: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// ANGELS QUIZZES
// ─────────────────────────────────────────────────────────────────────────────

const angelsQuizzes: QuizSpec[] = [
  {
    chapterId: "cmq6612ug0001geo0aum7jawk",
    order: 6,
    title: "Quiz — Part I: The Nature and Origin of Angels",
    content: `## Quiz — Part I: The Nature and Origin of Angels

*Review your understanding of the first four lessons and their supplements. Read each question, form your answer, then check the explanation below.*

---

### Question 1

**What does it mean to say that angels are "pure spirits"? What does this tell us about how they relate to the material world?**

<details>
<summary>See Answer</summary>

Angels have no physical body and no material component. They are intellect and will without matter. This means they do not occupy physical space as bodies do, do not experience physical hunger or fatigue, and do not perceive the world through senses. When they interact with the material world — appearing to humans, speaking, acting — they do so by producing effects in matter while remaining themselves incorporeal. This also means each angel is its own species: without matter to individuate them, two angels cannot be "the same kind" of thing in the way two humans can.

</details>

---

### Question 2

**Scripture presents the "Angel of the Lord" appearing in many contexts in the Old Testament. What are two different interpretations the Church tradition holds about who this figure is?**

<details>
<summary>See Answer</summary>

One tradition, especially prevalent in the patristic period, reads many "Angel of the Lord" appearances as pre-Incarnate appearances of the Second Person of the Trinity — Christ before the Incarnation. Evidence includes the divine speech in the first person, worship being accepted, and the figures being identified with God Himself (e.g., the burning bush). A second tradition treats the Angel of the Lord as a very high-ranking angelic being who speaks with divine authority because he fully represents and carries God's word. Both readings are within the range of orthodox interpretation; neither is defined doctrine.

</details>

---

### Question 3

**Explain the concept of "infused knowledge" in angels. How does this differ from how human beings acquire knowledge?**

<details>
<summary>See Answer</summary>

Human beings acquire knowledge by a process that moves from sense experience → abstraction → understanding → judgment. We learn by gathering data from the physical world and building up our understanding over time. Angels have no senses and no developmental process. Their knowledge was infused — given directly — at the moment of their creation. They know the natures of things, the structure of creation, and (by God's gift) supernatural truths not by discovering them but because they were given this knowledge instantaneously and completely. Their understanding does not grow or change by experience in the way ours does.

</details>

---

### Question 4

**St. Thomas Aquinas teaches that the angels were created and confirmed in grace in a single moment. What does "confirmed in grace" mean, and why does it matter?**

<details>
<summary>See Answer</summary>

"Confirmed in grace" means that the faithful angels, having made their definitive choice for God, cannot now sin or fall. Their will is now permanently ordered toward God. This is not a limitation but a perfection — they have achieved the full freedom that comes from complete union with the Good. It matters because it means the angels who serve us now are absolutely reliable. Their love is not contingent on mood or temptation. The guardian angel at your side has been serving without failure for the entire span of your life, and will continue to do so.

</details>

---

### Question 5

**Looking across the biblical survey of angelic appearances (Lesson 4), identify the five consistent "movements" of angelic Scripture. Give one biblical example for any two of them.**

<details>
<summary>See Answer</summary>

The five movements are: (1) **Worship first** — before any mission, angels praise God. Example: Job 38:7, the morning stars/sons of God shouting for joy at creation. (2) **Guard the sacred** — Example: Genesis 3:24, the Cherubim placed at the east of Eden. (3) **Announce the new** — Example: Luke 1:26-38, Gabriel's Annunciation to Mary. (4) **Minister to the vulnerable** — Example: 1 Kings 19:5-7, the angel feeding the exhausted Elijah. (5) **Interpret the mysterious** — Example: Daniel 8:16, Gabriel explaining the vision of the ram and goat to Daniel.

</details>`,
  },

  {
    chapterId: "cmq6612v0000fgeo0goukqfcs",
    order: 6,
    title: "Quiz — Part II: The First Hierarchy",
    content: `## Quiz — Part II: The First Hierarchy: Before the Throne of God

*Five questions covering Lessons 5–8 and Supplement 4. Form your answer before reading each explanation.*

---

### Question 1

**What does the triple "Holy, holy, holy" cry of the Seraphim (Isaiah 6:3) signify, and why is it placed at the center of Christian liturgy?**

<details>
<summary>See Answer</summary>

The triple repetition (*hagios, hagios, hagios* in Greek; *qadosh, qadosh, qadosh* in Hebrew) is the Hebrew superlative — it means "the most holy, utterly and completely holy, beyond all comparison." The cry declares that God is wholly unlike everything else that exists: not merely a better version of created goodness but categorically different, transcendent, the source of all being. It is placed at the center of the Eucharistic prayer (*Sanctus*) because the Mass is understood as an earthly participation in the heavenly liturgy already ongoing before the throne. When the congregation sings the Sanctus, they are joining a choir that has not stopped since the first moment of creation.

</details>

---

### Question 2

**The Cherubim are consistently associated with guardianship of the divine presence. Give three biblical locations where Cherubim stand guard and identify what each guards.**

<details>
<summary>See Answer</summary>

(1) **The east gate of Eden** (Genesis 3:24) — guarding the way to the Tree of Life after the Fall. (2) **The Ark of the Covenant** (Exodus 25:22) — two golden Cherubim atop the mercy seat, flanking the earthly throne of God; the meeting place of heaven and earth. (3) **The heavenly throne-chariot** (*merkabah*, Ezekiel 1) — the four living creatures who bear the divine chariot-throne through the cosmos. (Bonus: Revelation 4–5 — the living creatures around the heavenly throne, leading the eternal worship of the Lamb.)

</details>

---

### Question 3

**What does the name "Thrones" reveal about the defining quality of this angelic choir? How does their function differ from the Seraphim and Cherubim?**

<details>
<summary>See Answer</summary>

The name *thronoi* (throne, seat of authority) reveals that the Thrones' defining quality is the stable, judicial, immoveable authority of God. A throne in the ancient world declared: *this will not change.* The Seraphim embody burning love — their identity is pure desire for God and ceaseless adoration. The Cherubim embody fullness of knowledge and guardianship. The Thrones embody *stability and sovereignty* — they contemplate the whole of God's providential plan as a unified, unfailing judicial act. While the Seraphim burn and the Cherubim guard, the Thrones *hold* — they are the living expression of the fact that God's sovereignty has never, not for one moment, wavered.

</details>

---

### Question 4

**Describe the vision of the Living Creatures in Revelation 4–5 and explain how it relates to Ezekiel's chariot-throne vision (Ezekiel 1).**

<details>
<summary>See Answer</summary>

In Revelation 4, John sees four living creatures (*zoa*) placed "in the midst of the throne and around the throne," each with four faces (lion, ox, man, eagle), six wings, and eyes within and around. They cry "Holy, holy, holy, is the Lord God Almighty" without ceasing. This vision directly echoes Ezekiel 1, where four living creatures with the same four faces bear the divine chariot-throne, also called the *merkabah*. John's vision appears to synthesize the Seraphim of Isaiah 6 (six wings, ceaseless triple-holy) with the Cherubim of Ezekiel (four faces, bearing the throne). Theologians generally read the Revelation living creatures as a composite image of the first hierarchy's angelic worship, representing all the throne-room angelic beings in a single overwhelming vision.

</details>

---

### Question 5

**Lesson 7 opens with the Sennacherib incident (Isaiah 37:36). In your own words, explain what theological point this historical event illustrates about the Thrones and angelic power.**

<details>
<summary>See Answer</summary>

The angel who struck down 185,000 Assyrian soldiers in a single night demonstrates, in a concrete historical event, what the theological doctrine of the Thrones describes in the abstract: the authority of God is not passive, abstract, or distant. It is active, precise, and overwhelming in its application. Sennacherib mocked the throne of God; the Thrones embody the reality that such mockery cannot stand. The event also shows that angelic authority is not self-directed — the angel acted in response to Hezekiah's prayer, within God's specific will. The Thrones do not exercise authority for themselves; they manifest God's sovereign judgment in history at the moment God commands it.

</details>`,
  },

  {
    chapterId: "cmq6612ve000tgeo0b9n1d4af",
    order: 4,
    title: "Quiz — Part III: The Second Hierarchy",
    content: `## Quiz — Part III: The Second Hierarchy: Governing Creation

*Five questions covering Lessons 9–10 and Supplements 5–6. Think through each answer before reading.*

---

### Question 1

**Describe the specific function of the Dominations within the angelic hierarchy. How do they relate to the first hierarchy above them and the Virtues below them?**

<details>
<summary>See Answer</summary>

The Dominations are the executive layer of God's governance of creation. They receive the light of the first hierarchy — the burning love, profound wisdom, and stable authority of the Seraphim, Cherubim, and Thrones — and translate it into the orders that direct the lower choirs. They do not themselves go and act in the physical world directly; they direct. They set in motion. They distribute the blueprint of divine providence to the Virtues who implement it. The Dominations are served; they do not serve in the way the lower choirs serve. Their dignity consists in real authority: they have been given governance over all the choirs below them within the proper order.

</details>

---

### Question 2

**What is the difference between "ordinary" and "extraordinary" work of the Virtues? How does this understanding reframe what a miracle is?**

<details>
<summary>See Answer</summary>

The Virtues' *ordinary* work is the consistent sustaining of physical law — every rotation of the earth, every heartbeat, every law of chemistry and physics operating as expected. Their *extraordinary* work is miracles: special operations of the same power directed by God to override the ordinary course of nature for a specific divine purpose. This reframes miracles entirely: a miracle is not a "break" in the laws of nature, as if God or angels had to smash through their own creation. It is the same power that sustains natural law, used in an extraordinary way, to make God's presence and purpose unmistakably visible at a particular moment. The Virtues do not experience miracles as contradiction; they experience them as one more act of obedience.

</details>

---

### Question 3

**Romans 8:38-39 lists "powers" as one of the potential separators from the love of God — and then immediately dismisses the threat. What is the theological significance of this?**

<details>
<summary>See Answer</summary>

St. Paul names the Powers — real angelic beings with real authority in the cosmic order — and then places them subordinate to one thing: the love of God in Christ Jesus. This is not a small claim. It is the entire ordering of the cosmos placed under one supreme fact. The Powers maintain the structure of creation; they are genuine authorities. But they cannot undo what God has done in Christ. The love of God for the redeemed outranks every cosmic power, visible or invisible. For the believer, this means that no force in the structure of the universe — however vast, however ancient — stands between you and God. The cosmos is ordered, and the one supreme fact of that order is your redemption.

</details>

---

### Question 4

**Explain the difference between what the Principalities govern and what guardian angels govern. Why does this distinction matter for understanding God's economy of care?**

<details>
<summary>See Answer</summary>

The Principalities govern *collective human organization* — nations, peoples, civilizations, and ecclesial structures. Their domain is the group, the centuries-long arc of a civilization or religious movement. Guardian angels, by contrast, govern *individuals* — one person, specifically, for the whole of their life. The distinction matters because it shows God's care operating at every scale simultaneously. The macro (civilizations, history, the Church as a whole) is administered by Principalities; the micro (you, your name, your specific life) is administered by a guardian angel. God is not choosing between governance-at-scale and governance-of-persons. He does both, through a hierarchy designed for exactly that purpose.

</details>

---

### Question 5

**What does Daniel 10 reveal about the Principalities and the spiritual dimension of political history?**

<details>
<summary>See Answer</summary>

In Daniel 10, Gabriel explains to Daniel that his prayer was delayed for twenty-one days because "the prince of the kingdom of Persia" withstood him — and that Michael had to come and help break through. This reveals that the rise and fall of empires, the political structures of nations, have a corresponding spiritual dimension: angelic (or demonic) Principalities governing the spiritual direction of those nations. The "prince of Persia" is apparently a demonic Principality governing that empire. Gabriel — an archangel of the highest distinction — was opposed for three weeks and needed Michael's intervention. This is a window into political history that the secular historian does not see: behind the armies and economies and diplomacy, there is a warfare at the level of the Principalities, within the sovereign plan of God.

</details>`,
  },

  {
    chapterId: "cmq6612vm0013geo0kqjj27k2",
    order: 6,
    title: "Quiz — Part IV: The Third Hierarchy",
    content: `## Quiz — Part IV: The Third Hierarchy: Ministers of Salvation

*Five questions covering Lessons 11–14 and Supplements 7–8.*

---

### Question 1

**What are the three archangels named in Scripture? Give each one's name, the meaning of that name, and the specific mission for which they appear in the Bible.**

<details>
<summary>See Answer</summary>

**Michael** — "Who is like God?" (a rhetorical challenge, not a question). Appears in Daniel 10 and 12 as the great prince protecting God's covenant people; in Jude 9 disputing with the devil over Moses' body; in Revelation 12 leading the heavenly army against the dragon. His mission: warfare and protection of the elect.

**Gabriel** — "God is my strength" or "Man of God." Appears in Daniel 8 and 9 to explain prophetic visions; in Luke 1 to announce the birth of John to Zechariah and the Incarnation to Mary. His mission: announcement and explanation of God's plans at decisive moments.

**Raphael** — "God heals." Appears in Tobit as the companion and healer who accompanies Tobias on his journey, drives away the demon Asmodeus, and heals Tobit's blindness. His mission: healing, guidance, and the companionship of those in need.

</details>

---

### Question 2

**The prayer of Saint Michael ends: "By the power of God, thrust into hell Satan and all evil spirits who wander through the world seeking the ruin of souls." What theological picture of Michael does this prayer presuppose, and where in Scripture does this picture come from?**

<details>
<summary>See Answer</summary>

The prayer presupposes Michael as the appointed warrior-Principality of God's covenant people, whose specific commission includes direct opposition to Satan and the demonic host. The picture comes from: (1) Daniel 10 and 12, where Michael fights the demonic princes governing nations and is named "the great prince who has charge of your people"; (2) Jude 9, where Michael disputes with the devil over Moses' body — even in dispute, invoking God's authority rather than his own; (3) Revelation 12:7-9, where Michael and his angels fight the dragon in heaven and cast him to the earth. The prayer is not invented piety; it is a direct petition to the being whose scriptural commission is precisely what the prayer describes.

</details>

---

### Question 3

**The Annunciation (Luke 1:26-38) is Gabriel's central appearance in the New Testament. What does the scene reveal about how God uses angelic messengers? What is Mary's role, and why does it matter?**

<details>
<summary>See Answer</summary>

The scene reveals that God entrusts the announcement of the most important event in history — the Incarnation of the Son of God — to a created messenger. Gabriel does not simply transmit a divine fiat; he asks Mary's consent: "How will this be?" She questions, he explains, and she then gives her *fiat*: "Let it be to me according to your word." Her role matters because the Incarnation required the free cooperation of a human being. God did not override Mary's freedom. He sent Gabriel to ask, explain, and receive her yes. The whole history of redemption turns on that free human response. Gabriel's mission is not complete until Mary speaks.

</details>

---

### Question 4

**How does the Book of Tobit (Raphael's story) serve as a model for the ministry of guardian angels, even though the guardian angel theology is technically separate from archangel theology?**

<details>
<summary>See Answer</summary>

Raphael's ministry to Tobias in the Book of Tobit is a concrete, narrative picture of the four things guardian angels do for the individuals assigned to them: (1) **Accompaniment** — Raphael walks with Tobias through the entire journey, present at every step. (2) **Guidance** — he knows where to go, what fish organs to use, how to approach Raguel's household. (3) **Protection** — he binds the demon Asmodeus who had killed Sarah's previous husbands. (4) **Healing** — he instructs Tobias in how to heal his father's blindness. Each of these is a specific form of the ministry the tradition ascribes to guardian angels for every human being. The archangel's mission to Tobias is an *emblematic* version of what angels do for individuals, even though Raphael's scale and nature exceed a typical guardian.

</details>

---

### Question 5

**What does it mean that "the number of angels equals the number of species, and the number of species equals the number of individual angels"? Why did St. Thomas teach this, and what does it imply about your guardian angel?**

<details>
<summary>See Answer</summary>

St. Thomas reasoned that in the material world, a species is a kind (e.g., *human*), and individuals of a species are distinguished by matter — this human, not that one. Angels have no matter. Therefore there is nothing to distinguish two angels of the "same kind" — so each angel *is* its own kind. No two angels are the same species; there are as many species as there are individual angels. The tradition places the number of angels as extraordinarily large — "ten thousand times ten thousand" (Daniel 7:10). What this implies about your guardian angel: the being at your side is not a generic representative of "the angel type." It is a unique species of created intelligence — a being unlike any other that exists — assigned to you specifically. Your angel is, in the most literal theological sense, one of a kind.

</details>`,
  },

  {
    chapterId: "cmq6612vy001hgeo0djva1vnw",
    order: 7,
    title: "Quiz — Part V: Angels in the Life of the Believer",
    content: `## Quiz — Part V: Angels in the Life of the Believer

*Final course quiz — five questions covering Lessons 15–18 and all final supplements. This is the capstone of the Angels course.*

---

### Question 1

**The Church teaches that every human being, without exception, has a guardian angel. On what scriptural basis does she teach this? Give at least two texts.**

<details>
<summary>See Answer</summary>

(1) **Matthew 18:10** — "See that you do not despise one of these little ones. For I tell you that in heaven their angels always see the face of my Father who is in heaven." Jesus explicitly attributes personal angels to "the little ones" — and by extension, to all who belong to the Kingdom. (2) **Psalm 91:11-12** — "For he will command his angels concerning you to guard you in all your ways; they will lift you up in their hands, so that you will not strike your foot against a stone." (3) **Hebrews 1:14** — "Are they not all ministering spirits sent out to serve for the sake of those who are to inherit salvation?" The angels are described as servants sent to serve the heirs of salvation — the entire people of God.

</details>

---

### Question 2

**How does Hebrews 12:22-23 understand what happens when Christians gather for worship? What does this say about the relationship between earthly liturgy and the angels?**

<details>
<summary>See Answer</summary>

Hebrews 12:22-23 describes Christian worship as a present, real entry into the heavenly Jerusalem: "You have come to Mount Zion and to the city of the living God, the heavenly Jerusalem, and to innumerable angels in festal gathering, and to the assembly of the firstborn who are enrolled in heaven, and to God, the judge of all." This means Christian worship is not a human gathering that angels observe. It is a human gathering that joins what the angels are already doing. Every time the Church worships — in a cathedral or a house church — she is present in the heavenly throne room, surrounded by the angels in their eternal *festal gathering*. You have never gone to church alone.

</details>

---

### Question 3

**Revelation 8:3-4 describes an angel offering the prayers of all the saints before God's throne. What is the theological significance of this image for Christian prayer?**

<details>
<summary>See Answer</summary>

The image declares that human prayers do not dissipate into silence when they are spoken. They are gathered — *all* of them, from the first human prayer to the last before the end — and carried before the throne of God by a personal being acting in loving obedience. This means no prayer is lost. The prayer you offered in your car this morning, the prayer you murmured half-asleep last night, the prayer you offered in childhood with your eyes closed tight — all of it gathered, offered, presented before God from the hand of an angel. Prayer is not a monologue thrown into the void. It is a word spoken to a God who has appointed a messenger to carry it directly to His throne.

</details>

---

### Question 4

**The Angels course included Lesson 4's note about the "shadow side of the story" — the fallen angels. How should awareness of the demonic dimension of the angelic world shape how we relate to the holy angels?**

<details>
<summary>See Answer</summary>

Awareness of the fallen angels should intensify, not complicate, relationship with the holy angels in three ways: (1) **Gratitude** — the angels who remain faithful have chosen to remain so; their love for God and for us is not the result of incapacity to fall but of the perfection of their free choice. This makes their loyalty more, not less, meaningful. (2) **Realism** — the world is not a neutral space; there is an ongoing spiritual conflict in which both the faithful angels and the fallen ones are active. The guardian angel who accompanies you is accompanying you through a field with active opposition. (3) **Intercession** — the Church prays to Michael specifically because the warfare is real. Devotion to the holy angels is not pietistic decoration; it is participation in an actual covenant of protection in the context of actual spiritual conflict.

</details>

---

### Question 5

**This course began with the claim: "Right now, as you read this, a being of pure intelligence that has existed since before the first star was formed is present with you." After eighteen lessons, give the fullest description you can of who that being is.**

<details>
<summary>See Answer</summary>

A complete answer would include: The being is a pure spirit, created instantaneously by God before or at the moment of creation, confirmed in grace and therefore incapable of sin. It belongs to the ninth and final choir of a nine-choir hierarchy, the Angels, who are closest to human beings and most directly involved in individual human lives. It is its own species — there is no other angel of its exact kind in existence. Its knowledge was infused at the moment of its creation: it knows the structure of creation, the nature of souls, the spiritual realities you cannot perceive, and the specific shape of your life. It has accompanied you from before your birth and will be present with you at the moment of your death. Its number you do not know, its face you have not seen, and its name you may learn when you see it. It worships God without ceasing and serves you without complaint. It has never failed its commission and never will. It is standing beside you right now.

</details>`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// DEMONS QUIZZES
// ─────────────────────────────────────────────────────────────────────────────

const demonsQuizzes: QuizSpec[] = [
  {
    chapterId: "cmq696d960002jz7bcjbkhn1c",
    order: 3,
    title: "Quiz — Part I: The Origin and Nature of Evil Spirits",
    content: `## Quiz — Part I: The Origin and Nature of Evil Spirits

*Three lessons. Five questions. Form your answer before reading each explanation.*

---

### Question 1

**What is the biblical evidence that demons are fallen angels, not a separate created order of evil beings?**

<details>
<summary>See Answer</summary>

The key texts are: (1) **Jude 1:6** — "the angels who did not stay within their own position of authority, but left their proper dwelling." These are clearly fallen beings from a previously higher state, not originally evil creatures. (2) **2 Peter 2:4** — "God did not spare angels when they sinned, but cast them into hell." Again, angels who sinned — not a separate created order of evil. (3) **Revelation 12:7-9** — the dragon "and his angels" are cast to earth; the dragon is identified as "that ancient serpent, who is called the devil and Satan." (4) **Isaiah 14 and Ezekiel 28** — the prophetic descriptions of the "Day Star" fallen from heaven, though addressed to historical kings, have traditionally been read as describing the cosmic fall of a great angelic being. Demons are not a third category between God and angels — they are the same angels who, in the same moment of choice that confirmed the faithful, made the opposite choice.

</details>

---

### Question 2

**The Seven Sons of Sceva scene (Acts 19) opens Lesson 1. What specific lessons about the nature of demonic authority does this incident teach?**

<details>
<summary>See Answer</summary>

The seven sons attempt to use the name of Jesus as a formula: "I adjure you by the Jesus whom Paul proclaims." The demon's reply — "Jesus I know, and Paul I recognize, but who are you?" — and the resulting attack reveals several things: (1) **Demonic authority responds to relationship, not formula.** The name of Jesus carries authority only for those who stand in covenant relationship with Jesus. It is not a magical word whose power is automatic. (2) **Demons know who has authority over them.** The demon recognizes Jesus and recognizes Paul — men in real relationship with the one whose name carries authority. It does not recognize the sons of Sceva, and their use of the name is effectively fraudulent. (3) **Overconfidence in spiritual warfare is dangerous.** The sons approached with confidence based on a technique rather than a relationship, and they paid for it physically.

</details>

---

### Question 3

**Describe Lucifer's fall as presented in Scripture. What was the nature of his sin, and what was the consequence?**

<details>
<summary>See Answer</summary>

The sin of Lucifer — the highest of the angelic beings — was pride: specifically, the refusal to occupy his position as a creature before the Creator. Isaiah 14:13-14 (read typologically as the fallen one's inner voice): "I will ascend to heaven; above the stars of God I will set my throne... I will make myself like the Most High." The sin was not rebellion against an unjust tyrant; it was the refusal of the creature to receive its being as gift, the insistence on self-sufficiency. The consequence was immediate and permanent: "I saw Satan fall like lightning from heaven" ([Luke 10:18](data-scripture="Luke 10:18")). The fall of Satan drew a portion of the angelic host with him — "his angels" (Revelation 12:9). Because angelic choices are made with complete knowledge and are instantaneous and definitive, there is no repentance, no second chance, and no restoration.

</details>

---

### Question 4

**Why can there be no repentance for fallen angels, while humans who sin can repent? What is the theological distinction?**

<details>
<summary>See Answer</summary>

The distinction lies in the nature of angelic and human intellect and will. Humans make choices with imperfect knowledge, over time, under the pressure of bodily drives and limited understanding. Our choices can be revisited because they were made under conditions of incompleteness. Angels make choices with complete knowledge, in a single act that is total and definitive. An angel's sin is not an impulse followed by regret — it is a complete, fully-informed, fully-deliberate rejection of God made with the entirety of its being. There is no part of the angelic will that was confused, mistaken, or under external pressure. The choice is, in a strict sense, *perfect* — which means it cannot be undone by a further choice made from a position of greater knowledge. They already had all the knowledge. This is why Jude 6 speaks of them being "kept in eternal chains under gloomy darkness for the judgment of the great day."

</details>

---

### Question 5

**The Angels course ended with a bridge to the Demons course. How does understanding the faithful angels sharpen your understanding of what the fallen angels are?**

<details>
<summary>See Answer</summary>

The fallen angels are not alien monsters of a different nature. They are the same kind of being as the Seraphim, Cherubim, and Thrones — pure intelligences of extraordinary power, beauty, and capacity. What they are is a measure of what they *were* and what they refused to remain. A fallen Seraphim is not a diminished creature; it is a creature whose capacity for burning love has been permanently redirected into burning hatred. A fallen Throne's capacity for stability has become intransigence and domination. Understanding what the holy angels are — their intelligence, their loyalty, their extraordinary power exercised in love — makes the demonic reality more sobering, not less. The being you are told to resist is not a cartoon villain. It is a being of immense intelligence and power, permanently fixed in the direction of your destruction.

</details>`,
  },

  {
    chapterId: "cmq696d9a000ajz7bsrv8dtfe",
    order: 6,
    title: "Quiz — Part II: Satan and the Kingdom of Darkness",
    content: `## Quiz — Part II: Satan and the Kingdom of Darkness

*Covers Lessons 3–6 and Supplement 3. Five questions.*

---

### Question 1

**Satan is given many names and titles in Scripture. Identify four of them, give the meaning of each, and explain what each reveals about his character or activity.**

<details>
<summary>See Answer</summary>

(1) **Satan** (Hebrew *śāṭān*) — "adversary" or "accuser." His role as the legal opponent of humanity, accusing the saints before God (Revelation 12:10, Job 1–2). (2) **Devil** (Greek *diabolos*) — "slanderer" or "one who throws across." The emphasis is on slander — the distortion of truth to destroy. (3) **The Serpent** — associated with cunning and deception, specifically the Eden account. His primary weapon is the lie. (4) **Lucifer / Day Star** — the being of brilliance he was before the fall, used to describe the height of the fall's starting point. What fell was not a mediocre creature but the most radiant. (5) **Prince of This World** (John 12:31) — his dominion over the fallen order of things in the present age, before his final defeat. (6) **Prince of the Power of the Air** (Ephesians 2:2) — governing the spiritual atmosphere of the fallen world.

</details>

---

### Question 2

**What does Supplement 2 reveal about the nature of Satan's deception strategy in the Garden of Eden (Genesis 3:1-7)? What technique does he use?**

<details>
<summary>See Answer</summary>

Satan's technique in the Garden consists of three moves: (1) **Questioning the word of God** — "Did God actually say...?" He does not immediately deny; he introduces uncertainty. He makes the command sound arbitrary and perhaps misremembered. (2) **Directly contradicting God** — "You will not surely die." Having established uncertainty, he then offers a flat denial of God's stated consequence. (3) **Inverting the motive** — "God knows that when you eat of it your eyes will be opened, and you will be like God." He reframes God's prohibition as jealousy, implying that obedience is submission to an insecure tyrant rather than love for a good Father. This three-step pattern — doubt, denial, inversion — is recognizable throughout Scripture and in spiritual experience.

</details>

---

### Question 3

**Lesson 5 deals with demonic possession and oppression. What is the key distinction between these two states? Can a true believer be "possessed"?**

<details>
<summary>See Answer</summary>

**Oppression** is external demonic pressure — influence, harassment, attack from outside the person. It can affect believers and non-believers alike. **Possession** (or what the New Testament calls being "demonized") involves a demon inhabiting and controlling a person from within to varying degrees. The Gadarene demoniac is the extreme case — full control of the body. On the question of whether a true believer can be possessed: the majority historic position is that a person genuinely indwelt by the Holy Spirit cannot be simultaneously fully inhabited by a demon — "What fellowship has light with darkness?" (2 Corinthians 6:14). However, most serious practitioners of deliverance ministry acknowledge that believers can be severely oppressed, and debate exists about whether partial or area-specific demonization is possible in believers living in serious unrepentant sin. The theological point to hold: the normal state of a Spirit-indwelt believer is one of spiritual authority, not vulnerability to possession.

</details>

---

### Question 4

**Lesson 6 introduces the "spirits of bondage" theme, including the bent woman of Luke 13. What does Jesus' statement "Satan bound her for eighteen years" teach us about the relationship between demonic activity and physical affliction?**

<details>
<summary>See Answer</summary>

The statement — *"ought not this woman, a daughter of Abraham whom Satan bound for eighteen years, be loosed from this bond on the Sabbath day?"* — directly attributes her physical condition to Satanic bondage. This establishes that demonic activity can produce physical symptoms, not only spiritual or psychological ones. It also establishes that healing and deliverance can overlap: Jesus does not cast out a demon in this scene — he speaks a word of release ("Woman, you are freed from your disability") and lays hands on her — yet identifies the source as Satan. The lesson is not that all physical illness is demonic (the Bible carefully distinguishes cases), but that the category of spiritually-rooted physical affliction is real and Jesus treated it as such.

</details>

---

### Question 5

**Supplement 3 walks through Mark 5:1-20 (the Gadarene demoniac) phrase by phrase. What five principles of deliverance ministry does this case study establish?**

<details>
<summary>See Answer</summary>

The five principles drawn from Mark 5: (1) **Demonic presence manifests in observable ways** — the man's behavior (chains broken, self-harm, haunting tombs) is not random madness but the signature of an inhabiting presence. (2) **Demons recognize and fear Christ** — "What have you to do with me, Jesus, Son of the Most High God?" The demons identify Jesus precisely and immediately. (3) **Authority requires naming** — "What is your name?" Jesus asks. The name "Legion" (Roman military unit of 6,000) reveals the scale and organized nature of the occupation. (4) **Deliverance is complete and immediate** — the man is found "clothed and in his right mind." There is no gradual recovery; the restoration is immediate. (5) **Restored persons become witnesses** — Jesus tells the man, "Go home to your friends and tell them how much the Lord has done for you." Deliverance is not the end of the story; it is the beginning of a new one.

</details>`,
  },

  {
    chapterId: "cmq696d9h000ojz7btpp463hz",
    order: 6,
    title: "Quiz — Part III: Deception and Doctrines of Devils",
    content: `## Quiz — Part III: Deception and Doctrines of Devils

*Covers Lessons 7–10 and Supplements 4–5. Five questions.*

---

### Question 1

**1 Timothy 4:1 warns of "doctrines of devils" appearing in the last days. Lesson 7 uses the Arius controversy as a case study. What does this historical example teach about how false doctrine enters the Church?**

<details>
<summary>See Answer</summary>

Arius, a brilliant and learned Alexandrian priest, taught that the Son of God was a created being — the highest creature, but a creature nonetheless. The doctrine was attractive precisely because it seemed to solve a philosophical problem (how can God be one if the Son is also God?) and was championed by an intelligent, articulate teacher. The Council of Nicaea (AD 325) rejected it definitively, formulating the *homoousios* — the Son is "of the same substance" as the Father. The lessons for doctrinal discernment: (1) False doctrine often addresses a real question. Arius asked a real philosophical question; his answer was wrong. (2) False doctrine is attractive and internally coherent — it is rarely obviously absurd. (3) The test is not intellectual sophistication but conformity to the apostolic deposit. (4) Satan's strategy is to undermine not ethics first but the identity of Christ — because everything else follows from that.

</details>

---

### Question 2

**Lesson 8 covers divination and the occult. What is the theological problem with divination — not just the danger, but the underlying spiritual issue?**

<details>
<summary>See Answer</summary>

The underlying issue is not primarily danger (though danger is real) but **sovereignty**. Divination is the attempt to acquire knowledge of hidden or future things through means other than God's revealed will. The theological problem is twofold: (1) **It bypasses God's own channels.** God has revealed Himself through Scripture, the Church, prophecy, and prayer. Seeking knowledge through occult means is a statement that God's channels are inadequate and that other sources must be consulted. (2) **It opens a door to demonic deception.** The demonic host has information humans do not — not omniscience, but centuries of observing human patterns, knowledge of the physical world, and the capacity to simulate spiritual experiences. Divination creates a receptor for exactly this kind of counterfeit revelation. The person seeking hidden knowledge via occult means is not finding truth — they are exposing themselves to the most skilled deceivers in existence.

</details>

---

### Question 3

**Lesson 9 warns about "seducing spirits" in the Church. What distinguishes seducing spirits from other forms of demonic activity, and why are they particularly dangerous?**

<details>
<summary>See Answer</summary>

Seducing spirits are distinguished by their target — they operate *within* religious contexts, not outside them. They do not attack from outside the Church with obvious opposition; they infiltrate, simulate, and corrupt from within. Their tools are the nearly-true: a theology that is 90% sound with a critical deviation at the center; a worship experience that is emotionally powerful but spiritually unrooted; a teacher whose personal holiness is genuine but whose doctrine contains a fatal flaw. This makes them particularly dangerous because: (1) The standard defenses (reject obviously evil things) do not apply — the seduction presents as good. (2) Communities can adopt the influence while believing they have rejected deception. (3) The damage is subtle and slow — churches drift over years, not overnight. The antidote is not suspicion but rootedness: deep immersion in Scripture, the historic faith, and tested spiritual direction.

</details>

---

### Question 4

**Lesson 10 opens with the Daniel 10 scene — Gabriel delayed 21 days by the Prince of Persia. What are the implications for how Christians should pray for their nations?**

<details>
<summary>See Answer</summary>

The implications are several: (1) **Prayer for nations has a spiritual dimension.** When Daniel fasted and prayed, something happened in the spiritual realm — an angelic messenger was sent, and a demonic Principality attempted to prevent the answer from arriving. Prayer for nations is not merely asking God to change human hearts; it is engaging in a conflict that has a heavenly dimension. (2) **Persistence matters.** Daniel prayed for twenty-one days. The answer was sent on day one, but the spiritual battle continued for three weeks. The classic passage on "praying and not losing heart" (Luke 18:1) has a very literal application here. (3) **Michael is available for intercession.** The tradition of invoking Michael when praying for nations is not superstition; it is an engagement of the angel specifically commissioned to fight the demonic princes who seek to govern nations toward destruction.

</details>

---

### Question 5

**Supplement 5 presents a self-assessment of discernment scenarios. Identify two warning signs that a spiritual experience or teaching may be demonically influenced rather than divinely sourced.**

<details>
<summary>See Answer</summary>

From the supplement and the lesson material, two strong warning signs are: (1) **The experience or teaching diminishes or contradicts the identity of Jesus Christ.** 1 John 4:2-3 gives this as the test: "Every spirit that confesses that Jesus Christ has come in the flesh is from God, and every spirit that does not confess Jesus is not from God." Any spiritual experience that leads away from Christ, qualifies His divinity, or redirects devotion from Him to another entity — however compelling — fails the primary test. (2) **The teaching elevates the self at the expense of God's sovereignty.** Seducing spirits consistently appeal to human pride — the desire to have special knowledge, hidden access, elevated spiritual status. Teachings that promise insider knowledge of the spiritual realm without reference to Christ, submission, or accountability; or that encourage spiritual practices that bypass the community of the Church, carry the signature of the deceiver's original strategy: "You will be like God."

</details>`,
  },

  {
    chapterId: "cmq696d9m0012jz7bmubn63rn",
    order: 6,
    title: "Quiz — Part IV: Spiritual Warfare",
    content: `## Quiz — Part IV: Spiritual Warfare

*Covers Lessons 11–14 and Supplements 6–7. Five questions.*

---

### Question 1

**Lesson 11 opens with two Ephesus scenes — the seven sons of Sceva (Acts 19:13-16) and the new believers burning their magic books (Acts 19:18-20). What contrasting principles does this contrast teach about authority in spiritual warfare?**

<details>
<summary>See Answer</summary>

The contrast teaches: (1) **Authority flows from relationship, not technique.** The sons of Sceva use the name of Jesus as a formula — the name of someone else's God. The believers burning their books are in actual covenant relationship with Christ, having repented and received the Spirit. The demon recognizes the difference immediately. (2) **Radical renunciation is required for real authority.** The Ephesian believers burn 50,000 drachmas' worth of magic books — a fortune. They do not merely stop practicing; they destroy the means. Partial commitment produces partial authority. (3) **The Word of God advances when spiritual ground is cleared.** Immediately after: "So the word of the Lord continued to increase and prevail mightily." The act of corporate renunciation created conditions for the gospel's power. Spiritual authority and spiritual cleansing are connected.

</details>

---

### Question 2

**Walk through each piece of the armor of God (Ephesians 6:10-18) and identify what each one does in practice — not just what it symbolizes.**

<details>
<summary>See Answer</summary>

(1) **Belt of Truth** — holds everything else together; without truth as the foundation of your life and thinking, the other pieces don't stay in place. Practice: commitment to biblical truth, self-honesty, rejection of deception. (2) **Breastplate of Righteousness** — guards the vital organs: the heart, the conscience. Righteousness is both Christ's imputed righteousness (covering) and practiced righteousness (discipline). Without it, the heart is exposed to accusation. (3) **Shoes of the Gospel of Peace** — readiness to advance, not merely to defend. The soldier with good footwear can move; without it, he is static. Readiness to share the gospel, to move when God calls. (4) **Shield of Faith** — mobile protection against "flaming darts": accusations, doubts, fearful thoughts. Faith deflects what otherwise lodges and burns. (5) **Helmet of Salvation** — guards the mind: the assurance of salvation protects against the lies that attack identity and standing before God. (6) **Sword of the Spirit** — the only offensive weapon: the spoken, memorized, applied Word of God. Jesus modeled this against Satan in the wilderness.

</details>

---

### Question 3

**Lesson 13 establishes deliverance ministry on the model of Jesus' exorcisms in the Gospels. What three elements are consistently present in Jesus' deliverance ministry that should mark any authentic deliverance practice today?**

<details>
<summary>See Answer</summary>

(1) **Authority, not ritual.** Jesus does not perform lengthy rituals or use formulas borrowed from other traditions. He speaks with authority — "Come out of him" — and the demons obey. The mark of his exorcisms is economy and authority. The crowds' reaction: "With authority he commands even the unclean spirits" (Mark 1:27). (2) **Discernment of the specific case.** Jesus asks the demon's name (Mark 5), asks how long it has afflicted the boy (Mark 9), asks questions that reveal the nature of the bondage before addressing it. Authentic deliverance attends to the particular person, not a template. (3) **Restoration of the person.** Deliverance is not the end; it is the beginning of restored life. The Gadarene is found "clothed and in his right mind." The boy with seizures — Jesus "took him by the hand and lifted him up, and he arose." The goal is the restoration of the human being to their full humanity, not merely the removal of the demonic.

</details>

---

### Question 4

**The Matthew 12:29 "Strong Man" parable is the theological center of Lesson 14. Explain the parable and its application to spiritual warfare.**

<details>
<summary>See Answer</summary>

Jesus says: "How can someone enter a strong man's house and plunder his goods, unless he first binds the strong man? Then indeed he may plunder his house." The parable is offered in response to the accusation that Jesus casts out demons by Beelzebul. His reply is that you cannot plunder Satan's kingdom by being a part of it — to take back what Satan holds, you must be *stronger* than Satan, and you must *bind* him first. The application to spiritual warfare: (1) The work of deliverance and evangelism is a direct plundering of territory the enemy believes is his. (2) Christ's authority over Satan is the prerequisite for any deliverance — the "binding" is accomplished in Christ's death and resurrection. (3) Believers exercise this authority derivatively — "in the name of Jesus Christ" — not in their own strength. The strong man has already been bound by the Stronger One; the believer acts in that victory, not in advance of it.

</details>

---

### Question 5

**Supplement 7 annotates Ephesians 6:10-18 phrase by phrase. What does the phrase "the whole armor of God" (*panoplia tou theou*) suggest about the nature of spiritual protection?**

<details>
<summary>See Answer</summary>

*Panoplia* is the Greek word for the full equipment of a heavily-armed Roman soldier — nothing left out. The phrase carries two implications: (1) **Completeness is required.** The instruction is not "wear as much armor as you find convenient" but "take up the *whole* armor." A Roman soldier missing his shield or his helmet was compromised; the gaps were exploited. A believer who is strong in truth and righteousness but neglects faith or the word of God has gaps that demonic strategy will find. (2) **It is God's armor, not the believer's.** The phrase is "of God" — *theou*. The believer does not manufacture the armor from their own resources. They *put on* what God has already provided. This prevents both self-reliance (the armor is not my achievement) and despair (the armor is not my responsibility to create). The believer's role is to receive it, put it on, and stand in it.

</details>`,
  },

  {
    chapterId: "cmq696d9t001gjz7b8ga1dyjj",
    order: 3,
    title: "Quiz — Part V: Living in Victory",
    content: `## Quiz — Part V: Living in Victory

*Final course quiz — Lessons 15–16 and Supplement 8. Capstone of the Demons course.*

---

### Question 1

**Lesson 15 opens with Revelation 20:1-3 — the angel binding Satan and casting him into the abyss for a thousand years. What does this passage establish about the ultimate trajectory of the cosmic conflict?**

<details>
<summary>See Answer</summary>

The passage establishes several things: (1) **Satan's defeat is certain and complete.** The binding is enacted by a *single* angel with a great chain — not an army, not a struggle, not a close contest. The same being whose rebellion required archangelic warfare to oppose in Revelation 12 is bound by one unnamed messenger. The asymmetry declares: Satan's power, while real and dangerous in the present age, is finite and ultimately trivial before divine authority. (2) **The defeat is specific and historical, not merely spiritual.** Satan is bound, sealed, confined — these are the language of enacted judicial sentence, not mere theological metaphor. (3) **The end is already decided.** Revelation 20:10 concludes: "the devil who had deceived them was thrown into the lake of fire... and they will be tormented day and night forever and ever." The conflict is not uncertain. The believer in spiritual warfare does not fight toward an unknown outcome — they fight from a position of established, final, irreversible victory.

</details>

---

### Question 2

**Lesson 16 frames daily spiritual warfare as a practice of "the mind of Christ." What does this phrase (from 1 Corinthians 2:16) mean in the context of spiritual warfare?**

<details>
<summary>See Answer</summary>

"We have the mind of Christ" means the believer, by the Spirit, has access to the thoughts, judgments, and perspectives of Christ — not omniscience, but orientation. In the context of spiritual warfare: (1) **The mind of Christ sees the battlefield accurately.** The believer who thinks with Christ knows what is real, what is deception, what is from God and what is not. This is the antidote to the seducing spirits and doctrines of devils in Part III — not cleverness, but the mind that is renewed by knowing Christ. (2) **The mind of Christ is saturated with Scripture.** When Jesus was tempted, He answered three times with "It is written." The mind of Christ does not improvise under spiritual attack — it reaches for what God has already said. (3) **The mind of Christ is at peace in the midst of conflict.** Philippians 4:7 — "the peace of God, which surpasses all understanding, will guard your hearts and your minds in Christ Jesus." The warfare is real, but the warring mind is guarded. Anxiety is the enemy's weapon; the mind of Christ refuses it.

</details>

---

### Question 3

**Supplement 8 presents a "Synthesis Letter" format — the student writes to their future self. What are the five theological principles the supplement identifies as the foundation of the believer's position in spiritual warfare?**

<details>
<summary>See Answer</summary>

The five principles from Supplement 8 are: (1) **The war is already won.** Christ's death and resurrection is the decisive victory; everything that follows is the outworking of that victory, not the determination of it. (2) **Authority is delegated, not inherent.** The believer has no authority in their own name or by their own spiritual development. All authority is "in the name of Jesus Christ" — derived, dependent, real but not self-generated. (3) **The battlefield is the mind.** 2 Corinthians 10:4-5 — "demolishing strongholds... taking every thought captive to obey Christ." The primary theater of spiritual warfare is the interior life, not the external world. (4) **Engagement requires community.** The armor of Ephesians 6 is described in second-person plural in the Greek — *you all* stand firm together. Isolated believers are more vulnerable; the Church is the warrior community. (5) **Suffering is not defeat.** Paul wrote Ephesians 6 from prison. The armor is not protection from difficulty but equipment for faithful endurance through it.

</details>

---

### Question 4

**The Demons course Lesson 16 includes a "What's Next" bridge pointing back to the Angels course. Having now completed both perspectives — the faithful and the fallen — what is the most important single truth you would carry into daily life?**

<details>
<summary>See Answer</summary>

*This question has no single correct answer.* A well-formed answer might include: the two courses together establish that the spiritual realm is real, populated by personal beings of immense intelligence and power, some of whom are actively for you and one of whom (your guardian angel) is assigned specifically to your protection — while others are actively opposed to you and to God's purposes for your life. The most practically important truth is perhaps this: **you are not alone in either direction**. You are not alone in the spiritual warfare — the faithful angels, Michael, your guardian, the whole hierarchy of the holy host is engaged in the same reality you inhabit. And you are not unguarded — the demonic opposition, real as it is, operates under the sovereign permission and final authority of the God who has already defeated it. Neither the beauty of the angelic world nor the danger of the demonic world should be the primary object of your attention. Both point to the One whose name makes the demons flee and whose love sends the angels to serve.

</details>

---

### Question 5

**Looking back across the entire Demons course: what is the single greatest protection against demonic influence in a believer's life, and where does Scripture ground this protection?**

<details>
<summary>See Answer</summary>

The single greatest protection is **abiding in Christ** — the sustained, living, covenant union with Jesus described in John 15: "Abide in me, and I in you... I am the vine, you are the branches." Every other protection flows from this: the armor of God is effective because the believer is in Christ; the name of Jesus carries authority because the believer knows and is known by Jesus; the word of God is the sword of the Spirit because the Spirit abides in the believer. Scripture grounds this in multiple places: "He who is in you is greater than he who is in the world" (1 John 4:4) — the indwelling of the Spirit is the basis of all protection. "Submit yourselves therefore to God. Resist the devil, and he will flee from you" (James 4:7) — the sequence matters: submission to God *first*, then resistance. "No one born of God makes a practice of sinning... the evil one does not touch him" (1 John 5:18) — the one born of God, practicing the new life, is protected in a fundamental way from demonic corruption. The protection is not a technique; it is a relationship.

</details>`,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const allQuizzes = [...angelsQuizzes, ...demonsQuizzes];
  console.log(`Inserting ${allQuizzes.length} quiz lessons...\n`);

  for (const q of allQuizzes) {
    const created = await db.courseLesson.create({
      data: {
        chapterId: q.chapterId,
        order: q.order,
        title: q.title,
        type: "QUIZ",
        content: q.content,
      },
    });
    console.log(`  ✓ ${q.title} (${created.id})`);
  }

  console.log("\nDone.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
