/**
 * seed-angels-course.ts
 *
 * Creates (or re-creates) the "Angels — God's Heavenly Host" course
 * with 5 Parts, 18 Lessons, and 11 Supplements.
 *
 * Source: angels.md (The Hierarchy of Angels: A Comprehensive Study Guide)
 *
 * Usage: pnpm tsx --env-file=.env.local scripts/seed-angels-course.ts
 */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ─── Lesson Content ────────────────────────────────────────────────────────────

const LESSONS: Record<string, string> = {

  // ── Part I ─────────────────────────────────────────────────────────────────

  "L1": `
![L1 What Are Angels](/angels-lessons/l1-what-are-angels.png)

## What Are Angels?

Angels are **pure spirits** — they possess no material body, and exist as purely intellectual substances: self-subsistent forms entirely without matter.

St. Thomas Aquinas argues in the *Summa Theologiae* (I, q. 50) that there must exist purely spiritual creatures. The universe exhibits a graduated hierarchy: minerals, plants, animals, and humans, each level adding a perfection absent in the one below. It is fitting, Aquinas reasons, that there should exist creatures above the human that have intellect without the limitations of matter — beings that are intellect through and through.

### The Word "Angel"

The word *angel* comes from the Greek *angelos* (and before it the Hebrew *malakh*), both meaning **"messenger."** "Angel" therefore designates a *function or office*, not a nature. The proper name for what these beings are is *pure spirit* or *intellectual substance*. Not all angels are sent on missions; the higher choirs contemplate God without being dispatched to the world. Yet all are called angels in the broad sense.

### Two Faculties Only: Intellect and Will

Unlike humans, who additionally possess sense faculties (sight, hearing, touch, imagination, memory), angels operate solely through intellect and will. They have no hunger, no physical sensation, no bodily passions. They are pure mind and pure freedom.

**No emotions in the human sense, but genuine affective states in the will.** Angels do not feel emotions in the biochemical, embodied way humans do. Yet they possess what the tradition calls *affective movements of the will* — something analogous to love, joy, and intensity, but located entirely in the will rather than in sensory appetite. The Seraphim, for instance, are described as burning with divine love — this is a real condition of their will, not a metaphor.

### Key Attributes of Angels

**Immortal.** Every angel created by God will exist forever. Unlike material things, which dissolve because they are composed of parts that can separate, angels are simple substances — they have no parts to fall away from one another.

**Personal.** Each angel is a complete, individual person. Because angels have no matter to individuate them, each angel must constitute its own entire species. There are no two angels of the same kind. Every angel is as distinct from every other angel as a horse is distinct from a dog. This means that the number of angelic "species" is the same as the number of individual angels — an almost incomprehensible multitude.

**Incorporeal, yet able to act upon matter.** Angels can appear visibly, move physical objects, and act on the senses and imagination of human beings. When they appear in human form in Scripture (as with the three visitors to Abraham in Genesis 18, or with Raphael accompanying Tobias), this is not a body but a temporary assumption of an appearance.

**Subject to Place in a Qualified Sense.** Angels do not occupy space as bodies do — they cannot be simultaneously at two places, nor split between them. Yet they are "in" a place in the sense that their power is active there.

### Common Misconceptions About Angels

Scripture and tradition correct a number of popular errors about angels that have arisen from folklore, Renaissance art, and modern media.

**Angels do not age.** There are no "baby angels" in Scripture. The only beings with infantile depictions are *putti* — a Renaissance artistic convention with no basis in revelation. Cherubim are formidable guardians of the divine throne, not chubby infants.

**Angels do not earn their wings.** Angels do not undergo probation or development. They were created in perfection and do not grow or change in nature. The angel Gabriel who appeared to Daniel was the same unchanged Gabriel who appeared to Mary more than five hundred years later.

**Only two classes of angels have wings.** Scripture explicitly mentions wings only for seraphim (six wings, Isaiah 6:2) and cherubim (four wings, Ezekiel 1:6). When angels appear as men in Scripture, they are not described as winged.

**Angels are not deceased humans.** When human beings die, they do not become angels. The saints in heaven remain human souls, awaiting the resurrection of the body. Angels are a distinct order of being, created before humanity.

**There are no female angels in Scripture.** Every angel who appears in the Bible appears in masculine form with masculine names and clothing. The names Michael, Gabriel, and Raphael are masculine. This does not imply that angels possess biological gender — as pure spirits they do not — but that their scriptural manifestations are consistently masculine.

> Ps. 148:2-5 "Praise him, all his angels; praise him, all his hosts... for he commanded, and they were created."
`,

  "L2": `
![L2 Angels Know](/angels-lessons/l2-angels-know.png)

## How Angels Know — The Gift of Infused Knowledge

Human beings begin in a state of almost total ignorance and build knowledge painfully, through the senses, over decades. We observe particular things and gradually abstract universal concepts from them. The process is slow, indirect, and always somewhat distorted by the limitations of our senses.

Angels understand in the precisely opposite way.

### The Engraved Tablet

Their intellects are not blank slates filled in by experience; they are, in the memorable phrase of one theologian, **"engraved tablets."** All knowledge was *infused* — given immediately and completely by God at the moment of creation. An angel knows the essence and nature of every created thing not because it has observed them one by one, but because God placed that knowledge directly in its intellect.

### Five Consequences of Infused Knowledge

**I. Angels cannot be in factual error.** Their natural knowledge is not derived from fallible sensation or uncertain inference. They simply know what they know with complete clarity.

**II. Angels answer immediately.** When an angel is questioned (in the accounts of angelic apparitions), there is no pause for thinking. The answer is known — it always was. The immediacy is not quickness — it is the nature of angelic knowing.

**III. Angels understand things in their universality, not their particularity.** When a human sees "this apple," they abstract the concept "apple." An angel already possesses the species *apple* in its intellect and understands any particular apple through that universal concept. This gives angelic knowledge a kind of generality and completeness beyond human knowing.

**IV. Higher angels have fewer but more comprehensive species.** Aquinas teaches that higher angels understand more through fewer, more universal intellectual forms, while lower angels require more numerous and particular species. This is a mark of intellectual perfection: the greatest intellect grasps the most with the fewest concepts.

**V. Angels do not know all things.** Infused knowledge covers created things proportionate to an angel's nature. But no creature knows all that God knows. The highest mysteries — hidden counsels of the divine will, the free future choices of creatures — are known to angels only if God specially reveals them.

### Angels as Witnesses of Creation

The Book of Job records God asking:

> Job 38:7 "When the morning stars sang together, and all the sons of God shouted for joy."

The "sons of God" (*bene elohim*) in this context are the angels, who were present at the creation of the world and rejoiced in it. The angels were created before the material universe and witnessed its formation. They are, in a sense, the original choir of creation — the first creatures to offer praise to the Creator.

### How Angelic Knowledge Differs from Human Knowledge

| Dimension | Human Knowledge | Angelic Knowledge |
|-----------|----------------|------------------|
| Source | Senses + Reason | Directly infused by God |
| Process | Gradual, built over time | Instantaneous, complete at creation |
| Limitations | Prone to error, distorted by passion | Naturally certain within its scope |
| Universals | Abstracted from particulars | Known directly in their essence |
| God's inner life | Known only by faith and revelation | Known only by special divine gift |

### A Living Application

The perfection of angelic knowledge should inspire in us a reverence for divine wisdom — and a humility about our own. The tradition holds that angels rejoice when human beings advance in understanding of God's truth. Every time we learn a truth of Scripture with genuine conviction, we are moving, however slowly, toward the kind of knowing that the angels enjoy by gift.
`,

  "L3": `
![L3 Creation Of Angels](/angels-lessons/l3-creation-of-angels.png)

## The Creation of Angels — Instantaneous and Complete

### A Single Creative Act

A distinctive point in the classical tradition is that God did not create angels gradually or in stages. According to Pseudo-Dionysius, St. Thomas Aquinas, and the whole theological tradition descending from them, God created the **entire hierarchy of angels instantaneously, all at once**. The creation of angels was not a process but a single act.

This is theologically significant: God's creative act is not a temporal unfolding subject to development. When He created the angelic world, it came into being in its fullness — a complete hierarchy of nine choirs, comprising perhaps billions of individual persons, each endowed with its unique intellect, each knowing immediately its own nature and its place in the order of creation.

The Fourth Lateran Council (1215) affirmed that God *"from the beginning of time made at once (simul) out of nothing both orders of creatures, the spiritual and the corporeal."*

### The Three Instances of Angelic Creation

St. Thomas distinguishes three conceptual "moments" in the angelic creation. These are not three periods of time (for all occurred in the same instant), but three *aspects* of what happened:

---

**First Instance — The Act of Creation and the Infusion of Knowledge**

The moment angels were created, they were created in a state of perfect natural knowledge. They did not gradually learn who God was, who they were, or what their purpose was. All of this was given to them at once as *infused species* — intellectual content directly implanted by God into their intellects, bypassing any process of experience or reasoning.

---

**Second Instance — The Act of Will / The Test**

With this knowledge came a free choice. Every angel, with complete knowledge of God, of themselves, of their assigned task, and of the cost — including any sacrifice their task involved — was given the opportunity to accept or refuse.

This was not a test of ignorance but of **will**. They knew everything relevant; what was unknown was which way their freedom would incline.

---

**Third Instance — The Eternal State**

Those who freely chose God were immediately **confirmed in grace**. They received the Beatific Vision — direct sight of God's essence — as their reward, and their wills were fixed in this confirmation in love and joy.

---

### What Was Tested?

Part of what each angel had to accept — and what constituted the test — was whether it would consent to its specific task rather than preferring some other. An angel created for a humble task (and all tasks in God's plan are glorious) had to be willing to perform that task even though it could see, with its perfect intellect, that there were angels above it performing grander works. The test was not of intellectual knowledge but of **humble, obedient will**.

### Every Angel Has a Divinely Assigned Purpose

Every single angel was created by God for a **specific task or purpose**. This is one of the most striking insights of the angelological tradition. Unlike human beings, who have a general vocation to holiness and then must discern specific callings within that, each angel was created with a single, precise, divinely-determined mission.

This mission was revealed to the angel at the very first moment of its existence, as part of its infused knowledge. The angel knew immediately: *this is what God made me for.*

| Angel | Assigned Task | Scriptural Reference |
|-------|--------------|---------------------|
| **Gabriel** | The Annunciation to Our Lady; explaining prophetic visions to Daniel | Lk. 1:26-38 |
| **Michael** | Warrior; guardian of God's people; escorting souls at death | Dan. 12:1 |
| **Raphael** | Healing; accompaniment of travelers; restoration of sight | Tobit 12:15 |

This means that every angel in existence, including every one of the billions of guardian angels, has a precisely defined divine purpose for which it was fashioned. **There is no waste, no redundancy, no accident in the angelic creation.**
`,

  "L4": `
![L4 Angels Scripture](/angels-lessons/l4-angels-scripture.png)

## Angels Across Scripture — A Survey of Holy Appearances

From the garden of Eden to the final chapters of Revelation, angels appear throughout the biblical narrative as servants of God's purposes — announcing, guarding, worshipping, and ministering. This lesson surveys the major angelic appearances in Scripture to build a comprehensive scriptural picture of the heavenly host.

### In the Beginning — Angels at Creation and Eden

The Book of Job presents the angels as present at the foundation of the world, rejoicing as God laid the earth's cornerstone:

> Job 38:7 "When the morning stars sang together and all the sons of God shouted for joy."

After the Fall of man, God placed cherubim as guardians at the east of Eden:

> Gen. 3:24 "He drove out the man, and at the east of the garden of Eden he placed the cherubim and a flaming sword that turned every way to guard the way to the tree of life."

This is significant: the very first angelic act recorded in Scripture after creation is **guardianship** — angels set at the threshold of the sacred, protecting its holiness.

### The Patriarchal Age — Angels Among the Fathers

**The Three Visitors to Abraham** (Gen. 18:1-2). Three heavenly visitors appear to Abraham at the oaks of Mamre, and he receives them with hospitality. Two are angels; one is identified with the Lord Himself. This encounter announces the birth of Isaac.

**Jacob's Ladder** (Gen. 28:12). Jacob dreams of a ladder reaching to heaven, with angels ascending and descending — a vision of unceasing heavenly-earthly commerce, angels moving between the realms of God and man in ceaseless ministry.

**The Angel Wrestling with Jacob** (Gen. 32:24-30). At the Jabbok ford, Jacob wrestles all night with a mysterious figure identified as an angel — and is renamed Israel: "one who strives with God." Angels in Scripture are not always gentle; they can be agents of divine encounter and transformation.

### The Mosaic Era — Angels in Deliverance

**The Burning Bush** (Ex. 3:2). The Angel of the Lord appears to Moses in a burning bush — calling him to the great work of deliverance.

**The Passover and the Exodus.** The angelic host is present throughout Israel's liberation — protecting the people as a pillar of fire by night, ministering in the desert.

**The Ark of the Covenant.** In Ex. 25:18-22, God commands golden cherubim to be placed atop the Ark, their wings spread above the mercy seat: *"There I will meet with you, and from above the mercy seat, from between the two cherubim that are on the ark of the testimony, I will speak with you."* The Cherubim mark the earthly throne of the invisible God.

### The Prophetic Age — Angels in Vision

**Isaiah's Vision of the Seraphim** (Isa. 6:1-7). In the year King Uzziah died, Isaiah sees the Lord high and lifted up, with Seraphim crying "Holy, holy, holy is the Lord of hosts." One touches his lips with a live coal — purifying him for prophetic ministry.

**Ezekiel's Chariot-Throne** (Ezek. 1:4-28). In one of the most extraordinary visions in Scripture, Ezekiel sees four living creatures — the Cherubim — with four faces, four wings, burning coals, and wheels within wheels, bearing the very throne of God's glory.

**Daniel and the Archangels** (Dan. 8-12). Gabriel appears to Daniel to explain the vision of the ram and goat, and later the mystery of the seventy weeks. Michael appears as "one of the chief princes" who fights for Israel.

**The Angel in the Furnace.** When Shadrach, Meshach, and Abednego are cast into the fiery furnace, a fourth figure appears with them — "like a son of the gods" (Dan. 3:25) — an angelic or divine presence protecting the faithful in trial.

### The New Testament — Angels at Every Key Moment

**The Annunciation** (Lk. 1:26-38). Gabriel comes to Mary in Nazareth with the announcement that she will conceive and bear the Son of God. This is the most pivotal message in the history of creation — and it is delivered by an angel.

**The Birth of Christ** (Lk. 2:8-14). An angel announces the birth to the shepherds; then "a multitude of the heavenly host" appears, praising God: *"Glory to God in the highest, and on earth peace among those with whom he is pleased."*

**The Temptation and Gethsemane.** After the forty days of temptation, angels come and minister to Jesus (Mt. 4:11). In Gethsemane, an angel appears from heaven to strengthen Him (Lk. 22:43).

**The Resurrection** (Mt. 28:2-6). An angel rolls back the stone and announces: *"He is not here, for he has risen."* Angels are the first heralds of the resurrection.

**The Ascension** (Acts 1:10-11). Two angels in white appear as Jesus ascends, announcing His return.

**The Book of Revelation.** Angels pervade the Apocalypse — bearing seals, blowing trumpets, pouring bowls, surrounding the throne, singing the eternal hymn. The book closes with an angel showing John the New Jerusalem (chapter 22).

### Scripture's Unified Witness

What emerges from this survey is not a scattered collection of appearances but a **unified witness**: from creation to consummation, angels are the active servants of God's redemptive plan, present at every major turning point — creation, the patriarchs, the exodus, the prophets, the incarnation, the resurrection, and the final glory.

They are not decorative figures. They are participants — rejoicing with God at creation, announcing His interventions in history, and joining the redeemed in the eternal liturgy of heaven.
`,

  "S1": `
![S1 Nature Knowledge](/angels-lessons/s1-nature-knowledge.png)

## Supplement 1 — For Lessons 1 & 2: The Nature and Knowledge of Angels

### Key Terms

**Pure Spirit** — A being with no material component; existing as intellect and will without a body.

**Infused Knowledge** — Knowledge given directly by God to the angelic intellect at the moment of creation, without any process of learning through experience.

**Angelic Species** — Because angels have no matter to individuate them, each angel is its own unique species; no two angels share the same nature.

**Affective Movement of the Will** — The angelic equivalent of emotion: a real orientation of the will toward love, joy, or intensity — not based in the body but in the will itself.

---

### Scripture Memory

> Ps. 148:2, 5 "Praise him, all his angels; praise him, all his hosts... for he commanded, and they were created."

> Heb. 1:14 "Are they not all ministering spirits sent out to serve for the sake of those who are to inherit salvation?"

> Job 38:7 "When the morning stars sang together, and all the sons of God shouted for joy."

---

### Key Distinctions

**Angel vs. Human**

| Feature | Angels | Human Beings |
|---------|--------|-------------|
| Body | None — pure spirit | Soul united to a physical body |
| Knowledge | Infused at creation | Acquired through senses over time |
| Individuation | Each is its own species | Individuated by matter |
| Memory | The infused species remain | Builds through experience |
| Emotions | Affective movements of the will | Bodily passions + will |

**"Angel" as Office, Not Nature**

The word *angel* means *messenger* — it describes what angels *do*, not what they *are*. Their nature is *pure spirit* or *intellectual substance*. Some angels, such as the Seraphim of the first hierarchy, have no outward mission to creation at all — yet they are still "angels" in the broad sense.

---

### Questions for Reflection

1. In what ways does infused knowledge differ from the way you learn? What does this difference reveal about the gap between human and angelic nature?

2. The tradition teaches that each angel is its own unique species. What does this say about the value God places on each individual intelligence He creates?

3. St. Thomas calls the angels "engraved tablets." In what sense might a soul who has studied Scripture for decades begin to resemble this description, even imperfectly?

4. Why does it matter that angels are *not* the spirits of deceased people? What confusion does this correct in popular culture?

5. "Are they not all ministering spirits, sent out to serve for the sake of those who are to inherit salvation?" (Heb. 1:14). What does it mean for your daily life to know that you are one of "those who are to inherit salvation" — and that angels serve that inheritance?
`,

  "S2": `
![S2 Creation Purpose](/angels-lessons/s2-creation-purpose.png)

## Supplement 2 — For Lessons 3 & 4: Creation, Purpose, and Scripture

### Key Terms

**Simul** — Latin for "at the same time / all at once." The Fourth Lateran Council's word for the instantaneous creation of both spiritual and material creatures.

**The Three Instances** — St. Thomas Aquinas's analysis of the three conceptual "moments" of angelic creation: (1) creation with infused knowledge, (2) the free choice of will, (3) confirmation in grace for the faithful.

**The Beatific Vision** — Direct, unmediated sight of God's essence; the eternal reward given to the faithful angels at the moment of their confirmation, and the destiny promised to the redeemed human soul.

**The Angel of the Lord** (*malakh YHWH*) — A special figure in the Old Testament who speaks with divine authority and accepts worship; many Fathers identified these appearances as Christophanies — pre-incarnate manifestations of the Son of God.

---

### Scripture Memory

> Col. 1:16 "For by him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or rulers or powers — all things were created through him and for him."

> Lk. 1:38 "And Mary said, 'Behold, I am the servant of the Lord; let it be to me according to your word.' And the angel departed from her."

> Gen. 28:12 "And he dreamed, and behold, there was a ladder set up on the earth, and the top of it reached to heaven. And behold, the angels of God were ascending and descending on it."

---

### Angelic Appearances by Era

| Era | Key Appearance | Reference |
|-----|---------------|-----------|
| Creation | Sons of God rejoicing | Job 38:7 |
| Eden | Cherubim guarding the Tree | Gen. 3:24 |
| Patriarchs | Three visitors to Abraham | Gen. 18:1-2 |
| Moses | Burning bush / Exodus | Ex. 3:2 |
| Ark of the Covenant | Golden Cherubim on mercy seat | Ex. 25:18-22 |
| Prophets | Isaiah's seraphim vision | Isa. 6:1-7 |
| Prophets | Ezekiel's chariot-throne | Ezek. 1:4-28 |
| Daniel | Gabriel explains visions | Dan. 8:16 |
| Incarnation | Gabriel's Annunciation | Lk. 1:26-38 |
| Birth | Heavenly host to shepherds | Lk. 2:13-14 |
| Resurrection | Angel rolls back stone | Mt. 28:2-6 |
| Ascension | Two angels in white | Acts 1:10-11 |

---

### Questions for Reflection

1. The Fourth Lateran Council teaches that God created the spiritual and material realms *at the same time*. What does this say about God's creative act — is it a process or a gift?

2. Each angel was given a specific, unchangeable mission at the moment of creation. In what way does this differ from human vocation? How might it help you understand your own call from God?

3. Jacob's Ladder shows angels ascending *and* descending — moving between heaven and earth. What does this ceaseless movement say about the relationship between the heavenly and earthly realms?

4. From the burning bush to the empty tomb, angels appear at every turning point of salvation history. What does this consistent presence reveal about how God governs the world?

5. St. Paul declares that all things — "visible and invisible, whether thrones or dominions or rulers or powers" — were created *through* Christ and *for* Christ (Col. 1:16). What does it mean that even the highest angels exist for Christ?
`,

  // ── Part II ────────────────────────────────────────────────────────────────

  "L5": `
![L5 Seraphim](/angels-lessons/l5-seraphim.png)

## The Seraphim — Burning with Divine Love

### Etymology and Appearance

The Hebrew word *seraphim* (singular: *seraph*) comes from the root *saraph*, meaning "to burn." They are the **"burning ones"** or **"incandescent ones."** Their very name describes their defining characteristic: they burn with the love of God.

### Scriptural Source

The Seraphim appear explicitly in only one passage of Scripture, but it is among the most awe-inspiring in the entire Bible: Isa. 6:1-7.

The prophet, in the year of King Uzziah's death, has a vision of the Lord seated on a high and lofty throne. Around Him stand the Seraphim, each with six wings:

- Two covering the face — in humility before God's glory
- Two covering the feet — a mark of reverence
- Two for flight

They cry to one another continuously:

> Isa. 6:3 "Holy, holy, holy is the Lord of hosts; the whole earth is full of his glory."

Their voices shake the thresholds of the temple; the house fills with smoke. When Isaiah confesses that he is a man of unclean lips, one of the Seraphim takes a burning coal from the altar with tongs, touches the prophet's lips, and declares his iniquity taken away.

### Theological Character

The Seraphim are the highest of all created beings. They stand closest to God — not because God has a location, but because their participation in the divine love and their resemblance to God is the most perfect of any creature.

They are on fire with charity — a love for God so total, so consuming, that the word "burning" can hardly be called a metaphor. Their perpetual song of praise — the *Trisagion*, "Holy, holy, holy" — is not mere singing but the full deployment of their will in adoration.

Pseudo-Dionysius wrote of the Seraphim as **"wise Loves"** — meaning that their love is not blind or merely emotional but is wisdom-saturated: they love God through total knowledge of Him. They are the most perfect adorers of God among all created beings.

### The Seraphim and the Liturgy

The *Sanctus* of the Mass — **"Holy, Holy, Holy, Lord God of hosts"** — quotes the Seraphim's song directly. Every celebration of the Eucharist on earth joins this heavenly cry. Those who participate consciously in the liturgy join their voices to the Seraphim in the one eternal act of worship.

Hebrews 12:22 declares that when Christians gather for worship, they come *"to the heavenly Jerusalem, and to an innumerable company of angels."* The Seraphim are present at every Mass, and the faithful, though veiled from sight, participate in their unceasing adoration.

### What the Seraphim Teach Us

The Seraphim's defining attribute — **burning love** — is the highest perfection of the created will. All other goods in the angelic and human order find their meaning in this: total, consuming, joyful love for God.

In the spiritual life, the goal of contemplative prayer is precisely this: to be set on fire with divine love, to participate by grace in what the Seraphim possess by nature. The Seraphim are not only inhabitants of heaven — they are the *standard* toward which the transformed soul moves.
`,

  "L6": `
![L6 Cherubim](/angels-lessons/l6-cherubim.png)

## The Cherubim — Guardians of Divine Wisdom

### Etymology

The Hebrew *kerubim* (singular: *kerub*) most likely derives from a term meaning "one who intercedes" or "one who blesses." The Greek translation renders it as signifying **"fullness of knowledge"** — a rendering that has shaped their theological identity: the Cherubim are defined not by love (that is the Seraphim) but by **knowledge**.

### Scriptural Sources

**Genesis 3:24** — God places the Cherubim at the east of Eden to guard the way to the Tree of Life after the expulsion. This is the first angelic act in the entire Bible: guardianship of the sacred.

**Exodus 25:18-22** — God commands two golden Cherubim for the Ark of the Covenant, above the mercy seat, where He pledges to meet with Moses and speak with him.

> Ex. 25:22 "There I will meet with you, and from above the mercy seat, from between the two cherubim that are on the ark of the testimony, I will speak with you about all that I will give you in commandment for the people of Israel."

**1 Kings 6:23-28** — The temple of Solomon is decorated with enormous carved cherubim of olive wood, overlaid with gold.

**Ezekiel 1 and 10** — The great prophetic visions: four-faced living creatures — each with the face of a man, a lion, an ox, and an eagle — borne on wheels within wheels, covered with eyes, with the brightness of fire and of lightning. They carry the very throne of God's glory.

### Theological Character

Where the Seraphim are defined by love, the Cherubim are defined by **knowledge**. They possess the deepest intellectual contemplation of God's wisdom — they know God as the ultimate reason and cause of all things.

They contemplate not merely *that* God is holy (as the Seraphim cry) but *why* He is holy — the inner logic of divine wisdom, the relationships among divine ideas, the plan of creation from inside God's own knowing. They are protectors of the mysteries, guardians of sacred knowledge.

Their association with the Ark of the Covenant and later the tabernacle and temple is deeply significant: the Cherubim dwell wherever God's specific, localized presence is pledged. They are the **guardians of the covenant** between God and man, overseeing the meeting point between heaven and earth.

### Cherubim versus Cupids

The popular image of cherubs as chubby winged infants (*putti*) in Renaissance art has no basis in Scripture or theology. The Cherubim of tradition are formidable, blazing, multi-faced guardians of the divine throne — among the most powerful beings in creation.

### The Cherubim and the Mystery of God's Presence

The Cherubim's placement — at Eden's gate, on the Ark, in the Temple, on Ezekiel's chariot-throne — follows a single principle: **wherever God condescends to be present in a special way, the Cherubim are there.**

In the New Covenant, the presence of God dwells in the Eucharist — and tradition holds that the angels are present at every Mass, adoring that same presence, fulfilling the same office the golden Cherubim fulfilled above the mercy seat.
`,

  "S3": `
![S3 Seraphim Cherubim](/angels-lessons/s3-seraphim-cherubim.png)

## Supplement 3 — For Lessons 5 & 6: The Seraphim and Cherubim

### Key Terms

**Seraphim** (*saraph*, "to burn") — The highest choir of angels, defined by burning love for God. They stand closest to God in the order of creation.

**Cherubim** (*kerub*) — The second choir, defined by fullness of divine knowledge. They guard the sacred: Eden, the Ark, the Temple, the throne of God.

**Trisagion** — "Holy, Holy, Holy" — the hymn of the Seraphim in Isaiah 6:3, quoted in the *Sanctus* of every Mass.

**Mercy Seat** (*kapporeth*) — The cover of the Ark of the Covenant, flanked by the golden Cherubim, where God promised to meet Israel (Ex. 25:22).

**Beatific Vision** — Direct sight of God's essence; the Seraphim and Cherubim enjoy this eternally as the highest created beings.

---

### Scripture Memory

> Isa. 6:2-3 "Above him stood the seraphim. Each had six wings: with two he covered his face, and with two he covered his feet, and with two he flew. And one called to another and said: 'Holy, holy, holy is the Lord of hosts; the whole earth is full of his glory.'"

> Gen. 3:24 "He drove out the man, and at the east of the garden of Eden he placed the cherubim and a flaming sword that turned every way to guard the way to the tree of life."

> Ezek. 1:26 "And above the expanse over their heads there was the likeness of a throne... and seated above the likeness of a throne was a likeness with a human appearance."

---

### Comparison: Seraphim vs. Cherubim

| Feature | Seraphim | Cherubim |
|---------|---------|---------|
| Defining quality | Burning love | Fullness of knowledge |
| Wings (Scripture) | Six (Isaiah 6:2) | Four (Ezekiel 1:6) |
| Primary scriptural setting | Isaiah's throne vision | Ark of Covenant, Ezekiel's chariot |
| Function | Ceaseless adoration | Guardianship of sacred presence |
| Position in hierarchy | Highest (1st) | Second (2nd) |
| Liturgical echo | The *Sanctus* at Mass | The golden Ark; the Eucharist |

---

### Questions for Reflection

1. The Seraphim cover their faces before God. What does this tell us about the proper disposition of any creature in the presence of the Creator — including us in prayer?

2. Isaiah, seeing the Seraphim, cries *"Woe is me! For I am lost; for I am a man of unclean lips"* (Isa. 6:5). The vision of holiness reveals sinfulness. Have you ever had a moment in prayer when beauty or holiness made you more aware of your need for purification?

3. The Cherubim are placed wherever God's special presence is pledged — Eden, the Ark, the Temple. What does this consistent pattern reveal about the nature of holiness?

4. The Mass quotes the Seraphim's song. The tradition holds that the angels attend every Eucharist. How might this awareness change the way you participate in Sunday worship?

5. The Cherubim have four faces: man, lion, ox, and eagle. The Church tradition has long associated these four faces with the four Evangelists. What might this connection suggest about the relationship between Scripture and the angelic world?
`,

  "L7": `
![L7 Thrones](/angels-lessons/l7-thrones.png)

## The Thrones — Expressions of Divine Authority and Justice

### Etymology and Image

The Thrones take their name from the *thronos* — the seat or throne of a king. The word "throne" in the ancient world was not merely a piece of furniture but a representation of **authority, judgment, and stable power**. The Thrones are those who form, as it were, God's judgment seat — the expression of His royal authority.

### Scriptural Sources

**Colossians 1:16** — *"Whether thrones or dominions or rulers or powers — all things were created through him and for him."* St. Paul's explicit listing of the angelic thrones confirms their existence and their creation in and for Christ.

**Daniel 7:9** — The Ancient of Days is seated on a throne of fiery flames with wheels of burning fire — the chariot-throne (*merkabah*) upon which the Thrones rest.

> Dan. 7:9-10 "As I looked, thrones were placed, and the Ancient of Days took his seat; his clothing was white as snow, and the hair of his head like pure wool; his throne was fiery flames; its wheels were burning fire. A stream of fire issued and came out from before him."

### Theological Character

The Thrones represent the **stability, immovability, and majestic power of God**. A throne communicates: *here authority rests, here judgment is issued, here sovereignty is exercised.* These angels manifest God's glory in its most stable and judicial aspect.

They are intimately connected with divine justice, with God's decrees, with the ordering of all things according to His sovereign will.

Pseudo-Dionysius described the Thrones as those who *"are raised above every earthly defiling influence, and are forever separated from what is inferior."* They are sometimes depicted in medieval art as "rolling" or moving across the heavens — a reference to the wheeled throne of Ezekiel's vision — communicating the omnidirectional reach of God's authority.

### The Thrones and Divine Providence

The Thrones bear a judicial character: they contemplate God's decisions, the ordering of His providential plan, the mystery of divine justice and mercy as expressed in His governance of creation.

This places them at the heart of how the universe is actually run. The cosmos is not self-governing — it is governed by an active, personal God, whose will is enacted through an ordered hierarchy of beings. The Thrones are the highest expression of this governance at the contemplative level: they see God's providential plan whole, and their stability reflects the absolute reliability of divine justice.

### What the Thrones Teach Us About Prayer

The Thrones remind us that God is not only *Love* (Seraphim) and not only *Wisdom* (Cherubim) but also *King* — the sovereign, the judge, the one whose will stands immovable beneath all of history's changes.

This is why reverence — specifically, the reverence of one who stands before a throne — is an essential element of prayer. The model given in the Lord's Prayer is instructive: *"Our Father who art in heaven, hallowed be thy name, thy kingdom come, thy will be done."* The prayer begins by acknowledging God's heavenly throne before it makes any petition.
`,

  "L8": `
![L8 Living Creatures](/angels-lessons/l8-living-creatures.png)

## The Living Creatures and the Eternal Worship of Heaven

### A Distinct Category

A remarkable category of heavenly beings appears in the Book of Revelation, called in Greek *zoa* — **"living creatures."** These should not be simply identified with the Cherubim, though they share characteristics with both the Seraphim and the Cherubim.

### Scriptural Description

> Rev. 4:6-8 "Around the throne, on each side of the throne, are four living creatures, full of eyes in front and behind: the first living creature like a lion, the second like an ox, the third with the face of a man, and the fourth like an eagle in flight. And the four living creatures, each of them with six wings, are full of eyes all around and within, and day and night they never cease to say, 'Holy, holy, holy, is the Lord God Almighty, who was and is and is to come!'"

### Relation to the Cherubim and Seraphim

Like the Seraphim, the living creatures have **six wings** and cry "Holy, holy, holy." Like the Cherubim in Ezekiel's vision, they have **four faces** — though distributed among four individual beings rather than on each one. Their placement *"in the midst of the throne"* suggests a unique proximity to God's presence.

### Function: Leaders of Heavenly Worship

These creatures lead the heavenly worship. In Rev. 5:8-14, they fall down before the Lamb and lead the twenty-four elders and the whole heavenly host in the new song of redemption:

> Rev. 5:9 "Worthy are you to take the scroll and to open its seals, for you were slain, and by your blood you ransomed people for God from every tribe and language and people and nation."

### The Four Faces and the Four Evangelists

From the earliest centuries, the Church has read the four faces of the living creatures as symbols of the four Evangelists:

| Face | Animal | Evangelist | Characteristic |
|------|--------|-----------|---------------|
| Man | Human | Matthew | Christ's humanity and genealogy |
| Lion | Lion | Mark | Christ's power and royal authority |
| Ox | Calf | Luke | Christ's priestly sacrifice |
| Eagle | Eagle | John | Christ's divine, soaring vision |

This identification (found in St. Irenaeus, St. Jerome, and St. Gregory the Great) suggests that the heavenly worship of the living creatures is intimately connected to the proclamation of the Gospel.

### The Unceasing Worship — A Vision of Eternity

The most striking feature of the living creatures is their *perpetuity*: **"day and night they never cease"** to worship.

This is a window into eternity. In heaven, worship is not an activity among others — it is the fundamental state of being. The tradition teaches that the Beatific Vision is so overwhelmingly beautiful, so infinitely satisfying, that the will cannot but respond with the total love and praise that the living creatures embody. Heaven's worship is not duty; it is the ultimate delight.

> Rev. 4:11 "Worthy are you, our Lord and God, to receive glory and honor and power, for you created all things, and by your will they existed and were created."
`,

  "S4": `
![S4 Thrones Living Creatures](/angels-lessons/s4-thrones-living-creatures.png)

## Supplement 4 — For Lessons 7 & 8: The Thrones and the Living Creatures

### Key Terms

**Thrones** (*thronoi*) — The third choir of the first hierarchy; angels whose defining quality is the stable authority and judicial power of God.

**Living Creatures** (*zoa*) — Four angelic beings described in Revelation 4–5, placed "in the midst of the throne," with four faces, six wings, and unceasing worship.

**The Merkabah** — Hebrew for "chariot-throne"; the wheeled chariot-throne of God in Ezekiel's visions (chapters 1 and 10), associated with the Cherubim and Thrones.

**The Sanctus** — The triple-holy hymn at the heart of the Mass Preface: "Holy, Holy, Holy, Lord God of hosts," drawn from Isaiah 6:3 and echoed in Revelation 4:8.

---

### Scripture Memory

> Col. 1:16 "For by him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or rulers or powers — all things were created through him and for him."

> Rev. 4:8 "Day and night they never cease to say, 'Holy, holy, holy, is the Lord God Almighty, who was and is and is to come!'"

> Dan. 7:9 "As I looked, thrones were placed, and the Ancient of Days took his seat; his clothing was white as snow, and the hair of his head like pure wool; his throne was fiery flames; its wheels were burning fire."

---

### The First Hierarchy at a Glance

| Choir | Defining Quality | Primary Scripture | Function |
|-------|----------------|------------------|---------|
| **Seraphim** | Burning love | Isaiah 6:1-7 | Ceaseless adoration |
| **Cherubim** | Fullness of knowledge | Ezekiel 1; Genesis 3 | Guardianship of sacred presence |
| **Thrones** | Stable authority/justice | Colossians 1:16; Daniel 7:9 | Contemplating God's sovereign will |
| **Living Creatures** | All-seeing worship | Revelation 4:6-8 | Leading the heavenly liturgy |

---

### Questions for Reflection

1. The Thrones reflect God's *stability* — His authority does not waver. In a world of constant change, what comfort does the stability of God's throne offer you personally?

2. Pseudo-Dionysius says the Thrones are "raised above every earthly defiling influence." What earthly influences tend to defile your own interior life — and what would it mean to be raised above them?

3. The living creatures cry "Holy, holy, holy" without ceasing — "day and night." How often in your daily life do you consciously return to an act of adoration? What would it look like to increase this?

4. The four faces of the living creatures have been read as symbols of the four Gospels. What connection do you see between deep, sustained reading of the Gospels and worship?

5. The whole first hierarchy is wholly occupied with *God Himself*, not with governance or ministry. What does this say about the primacy of contemplation over action in the spiritual life?
`,

  // ── Part III ───────────────────────────────────────────────────────────────

  "L9": `
![L9 Dominations Virtues](/angels-lessons/l9-dominations-virtues.png)

## The Dominations and Virtues — Governing Creation

### The Second Hierarchy: An Overview

The second hierarchy — Dominations (Dominions), Virtues, and Powers — receives the divine light through the first hierarchy and exercises it in the **governance of the universe**. They are concerned not with God as He is in Himself (as the first hierarchy is) but with God as He governs creation.

---

### The Dominations (Dominions)

**Etymology.** From the Latin *dominatio* and Greek *kyriotetes* — lordship or dominion. These are the angels of sovereign authority in the government of creation.

**Position.** The Dominations sit at the top of the second hierarchy and coordinate the ministry of all angels who deal with creation. They receive from the first hierarchy:

- The burning love of the Seraphim (which fires their charity)
- The profound wisdom of the Cherubim (which illumines their governance)
- The stable authority of the Thrones (which grounds their decrees)

From these they fashion the orders that govern the lower choirs and, through them, the cosmos.

**Character.** The Dominations do not themselves execute orders — they exercise dominion, setting in motion the powers below them. Pseudo-Dionysius described them as manifesting *"Godlike Lordship"* in a holy, fitting way. They mediate God's power to creation as a channel for its proper distribution.

In a sense, the Dominations are the **"prime ministers" of heaven's government** — receiving authority from the throne and directing it outward to the rest of the celestial administration.

> Col. 1:16 "...whether thrones or dominions or rulers or powers — all things were created through him and for him."

---

### The Virtues

**Etymology.** From the Latin *virtus* (strength, virtue, power) and Greek *dynameis* (powers, forces). The Virtues are associated with power, dynamism, and the workings of divine force in the physical universe.

**Character.** The Virtues exercise raw, primary power over the physical universe — they are lords of causality, princes of cosmic order in the material realm. Where the Dominations set direction, the Virtues implement it at the level of physical law and operation.

**The Virtues and Miracles.** In traditional theology, the Virtues are associated with **miracles**: the supernatural operations that override the ordinary course of nature in service of God's plan.

When Moses parts the Red Sea, when Christ calms the storm, when water is turned to wine at Cana — the instruments of such miracles in the angelic order are the Virtues, exercising God's power over the physical world.

They are also associated with the **ongoing sustaining of the cosmos** — the preservation of the natural order, the reliability of seasons, the regularity of the heavens. Their work is not only spectacular but quotidian: every time the sun rises on schedule, the Virtues have done their work.

> Dan. 3:39 "Bless the Lord, all powers."

---

### The Scope of the Second Hierarchy

The second hierarchy governs the universe as a whole — not individual nations (that belongs to the Principalities) and not individual souls (that belongs to the guardian angels). Their concern is the cosmic order: the laws of nature, the physical universe, the broad structure of how creation operates under God's providence.

This is a reminder that the material world is not abandoned to chance or mechanism. The rising of the sun, the orderliness of seasons, the faithfulness of natural law — these are not merely impersonal forces. Behind them stands a hierarchy of personal beings, exercising the authority entrusted to them by God, ensuring that creation remains ordered toward its ultimate end in Him.
`,

  "L10": `
![L10 Powers Principalities](/angels-lessons/l10-powers-principalities.png)

## The Powers and Principalities — Defenders of Order and Guardians of Nations

### The Powers

**Etymology.** From the Greek *exousiai* — authorities, powers. This word appears frequently in St. Paul's letters in contexts of the spiritual order of creation.

**Character.** The Powers serve a dramatically important function: they defend the deep laws of physical creation and guard the integrity of the cosmic order. They are perhaps best understood as the angelic equivalent of a legal system: they **enforce the order of creation** and introduce rational souls to the higher realities they are destined for.

> Rom. 8:38-39 "For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers, nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord."

St. Paul's confidence that even "powers" cannot separate us from God's love is deeply consoling: whatever powers exist — in heaven, in the cosmic order — all are subject to the love of God, which surpasses them all.

---

### The Principalities (Princes)

**Etymology.** From the Latin *principatus* and Greek *archai* — beginnings, first principles, ruling authorities. A "principality" is a domain ruled by a prince.

**Position.** The Principalities lead the third hierarchy and stand as the bridge between the governing angels of the second hierarchy and the angels most directly involved with human affairs. Their domain is **collective human organization** — nations, peoples, civilizations, ecclesial structures.

Pseudo-Dionysius described them as manifesting *"Godlike Princeliness and authoritativeness in an Order which is holy and most fitting to the Princely Powers."* They are responsible for the spiritual structure and destiny of human communities, not individual souls (that is the work of guardian angels) but nations, churches, peoples.

**St. Michael as Prince.** Daniel 10:13 names Michael as *"one of the chief princes"* and Daniel 12:1 as *"the great prince who has charge of your people."* Michael serves as the angelic prince standing over Israel — and, in the New Covenant, over the Church.

> Dan. 12:1 "At that time shall arise Michael, the great prince who has charge of your people. And there shall be a time of trouble, such as never has been since there was a nation till that time. But at that time your people shall be delivered, everyone whose name shall be found written in the book."

**The Angelic Dimension of History.** The theology of Principalities explains why history is not merely a human story: behind every civilization, every great religious movement, every nation's rise and fall, there is an angelic dimension of governance. This does not diminish human freedom or responsibility — it places human history within its true cosmic context.

---

### Summary: The Second and Third Hierarchies

| Choir | Hierarchy | Domain | Key Scripture |
|-------|----------|--------|--------------|
| Dominations | 2nd | Direct governance of creation | Col. 1:16 |
| Virtues | 2nd | Physical universe; miracles | Dan. 3:39 |
| Powers | 2nd | Defend cosmic order | Rom. 8:38 |
| Principalities | 3rd | Nations, peoples, the Church | Dan. 12:1 |
`,

  "S5": `
![S5 Second Hierarchy](/angels-lessons/s5-second-hierarchy.png)

## Supplement 5 — For Lessons 9 & 10: The Second Hierarchy and Principalities

### Key Terms

**Dominations** (*kyriotetes*, "lordships") — The top choir of the second hierarchy; they direct the governance of all creation, channeling authority from the first hierarchy to the lower choirs.

**Virtues** (*dynameis*, "powers/forces") — Associated with physical power, the laws of nature, and miracles; they sustain the cosmic order and execute supernatural interventions.

**Powers** (*exousiai*, "authorities") — They defend the deep laws of creation and guard the integrity of the cosmic order; they introduce souls to higher realities.

**Principalities** (*archai*, "beginnings, rulers") — The top choir of the third hierarchy; guardians of nations, peoples, and ecclesial structures. St. Michael is the Principality of the Church.

---

### Scripture Memory

> Col. 1:16 "For by him all things were created, in heaven and on earth, visible and invisible, whether thrones or dominions or rulers or powers — all things were created through him and for him."

> Dan. 12:1 "At that time shall arise Michael, the great prince who has charge of your people."

> Rom. 8:38-39 "For I am sure that neither death nor life, nor angels nor rulers... nor powers... will be able to separate us from the love of God in Christ Jesus our Lord."

---

### The Nine Choirs at a Glance

| Choir | Hierarchy | Defining Focus |
|-------|----------|---------------|
| **Seraphim** | 1st | Burning love — direct adoration |
| **Cherubim** | 1st | Fullness of knowledge |
| **Thrones** | 1st | Stability of divine authority |
| **Dominations** | 2nd | Direct governance of creation |
| **Virtues** | 2nd | Cosmic order; miracles |
| **Powers** | 2nd | Defense of creation's laws |
| **Principalities** | 3rd | Nations, peoples, the Church |
| **Archangels** | 3rd | Chief heavenly missions |
| **Angels** | 3rd | Personal ministry to souls |

---

### Questions for Reflection

1. The Dominations, Virtues, and Powers govern the universe as a whole — not individual souls. What does it mean to you that God's care for creation extends even to cosmic law and natural order?

2. The Virtues are associated with miracles. The parting of the Red Sea (Ex. 14:21), the calming of the storm (Mk. 4:39), the healing of the blind (Jn. 9:6-7). How does seeing these events as involving the Virtues change the way you read them?

3. St. Michael is the Principality assigned to God's people — first Israel, then the Church. How does knowing this affect your understanding of the prayer to St. Michael?

4. Principalities govern nations and civilizations. If every nation has an angelic Principality, what does this imply about how we should pray for our own nation?

5. St. Paul declares that no "powers" can separate us from God's love (Rom. 8:38-39). Why is it important to worship God and not any angel, however exalted?
`,

  "S6": `
![S6 Cosmic Governance](/angels-lessons/s6-cosmic-governance.png)

## Supplement 6 — For Lessons 9 & 10 (Extended): The Cosmic Governance of Angels

### Theological Deepening: Angels and Natural Law

The second hierarchy's governance of the physical universe raises a profound question: what is the relationship between angelic activity and the laws of nature?

St. Thomas Aquinas teaches that angels are not the *causes* of natural law — God alone is the ultimate cause of all things. But they are the *executors* of divine providence in the material order. Just as a king governs through ministers without those ministers replacing royal authority, God governs the cosmos through the angelic hierarchy without the angels becoming autonomous causes.

This means:
- Natural law is genuinely natural — created by God, reliable, consistent.
- Natural law is also personally executed — not mechanical, but superintended by personal beings who enact it as an act of will, in loving obedience to the Creator.

**A Miracle is not a suspension of law but a different exercise of the same angelic power.** When the Virtues work an ordinary miracle (the sun rises), they do so by the ordinary activity of sustaining natural causality. When they work an extraordinary miracle (a dead man rises), they do so by a special divine command that transcends the ordinary. Both are acts of the same beings, serving the same God.

---

### Angelology and Providence: Key Truths

1. **Creation is not self-governing.** The universe does not run on autopilot. At every moment, it is sustained, governed, and directed by God through the angelic hierarchy.

2. **God's governance is personal.** The angels are personal beings — intellect and will. God's care for creation is therefore not abstract or mechanical; it is enacted by persons who love both God and creation.

3. **Miracles are signs, not breakdowns.** A miracle does not "break" natural law; it is a special exercise of the power that sustains natural law, used to make God's presence and purpose visible at a particular moment.

4. **History has an angelic dimension.** The rise and fall of civilizations, the outcome of wars, the spread or decline of faith — all involve the activity of Principalities and the higher governing choirs, operating within God's sovereign plan.

---

### Questions for Reflection

1. How does the idea that natural law is "personally executed" by the Virtues change the way you see the ordinary world — the sun rising, rain falling, seasons turning?

2. If miracles are a special exercise of the same angelic power that sustains nature, why do you think God allows them? What purpose do they serve beyond the immediate sign?

3. The second hierarchy governs the universe but does not have direct care for individual souls — that belongs to the guardian angels. What does this specialization say about God's economy of care?

4. Knowing that the Principalities govern nations, how should Christians pray differently for their nation, their church, and their community leaders?

5. St. Paul lists angelic ranks — "thrones, dominions, rulers, powers" — and immediately declares that all were created *through* Christ and *for* Christ (Col. 1:16). What does it mean for the highest governance of the cosmos to exist *for* Christ?
`,

  // ── Part IV ────────────────────────────────────────────────────────────────

  "L11": `
![L11 Archangels](/angels-lessons/l11-archangels.png)

## The Archangels — Heaven's Chief Messengers

### Etymology and Role

*Archangelos* in Greek means **"chief angel"** or **"ruling angel."** The archangels are superior messengers, entrusted with the most important divine missions. They lead the third hierarchy — the angels most directly concerned with human beings and the plan of salvation.

### How Many Archangels?

Scripture names only **three archangels** by name. Catholic tradition holds that naming angels beyond these three — even with the best intentions — should be avoided, as the Church has specifically evaluated and rejected certain lists that circulated in apocryphal literature, reflecting pastoral prudence: inventing the names and personalities of angels risks superstition and distortion of genuine devotion.

Raphael's self-identification in Tobit 12:15 — *"I am Raphael, one of the seven holy angels who present the prayers of the saints and enter into the presence of the holy God"* — points to a tradition of seven archangels. This tradition is preserved in various ancient texts. However, the Catholic Church has not canonized names beyond Michael, Gabriel, and Raphael.

### The Archangels in the Economy of Salvation

The three named Archangels are not merely names — they are **persons with missions**, each assigned to a specific task that defines their entire existence:

**Gabriel** was assigned to bring the message of the Annunciation. The entire existence of Gabriel was ordered toward that single moment in a young woman's room in Nazareth.

**Michael** was assigned to be the guardian of the elect — those chosen for salvation. His mission defines him wholly.

**Raphael** was assigned to the ministry of healing and accompaniment, of restoring what sickness has broken.

This is a profound insight: these three Archangels, who appear at pivotal moments in Scripture, were not doing so "on assignment" in an incidental way. They were created *for* these missions. The mission and the angel are inseparable.

### Archangels and the Seven Sacraments

Some devotional traditions associate the seven archangels with the seven sacraments of the New Law and the seven gifts of the Holy Spirit — a meditation on the completeness of divine providence. This is pious theology, not defined doctrine, but it expresses the conviction that nothing in God's plan is accidental or bare of personal angelic care.

> Tobit 12:15 "I am Raphael, one of the seven holy angels who present the prayers of the saints and enter into the presence of the holy God."

### The Feasts of the Archangels

**September 29 — The Feast of the Archangels** (Michaelmas): the celebration of Michael, Gabriel, and Raphael together.

**October 2 — The Feast of the Guardian Angels**: honoring the lowest choir of angels, who stand closest to each human soul.

These feasts are the Church's formal affirmation that the archangels are real persons who have been active in salvation history and who remain present and active in the life of the Church.
`,

  "L12": `
![L12 Saint Michael](/angels-lessons/l12-saint-michael.png)

## Saint Michael — Warrior and Protector of the Elect

### His Name as Battle Cry

The name *Michael* in Hebrew means **"Who is like God?"** — *Mi-cha-El?* This is not merely a name; it is a question. And in the context of the defense of heaven, it is the definitive proclamation: *no creature can claim equality with the Creator.* Michael's very name is the theological statement that defeats creaturely pride.

### Michael in Scripture

**Daniel 10:13, 21** — Gabriel, explaining his delay in reaching Daniel, says that *"Michael, one of the chief princes, came to help me."* Michael is named "one of the chief princes" — a Principality of the highest order.

**Daniel 12:1** — *"At that time shall arise Michael, the great prince who has charge of your people."* Michael is specifically identified as the guardian Principality of God's people. In the New Covenant, this means the Church.

**Jude 9** — Michael disputes over the body of Moses, saying *"The Lord rebuke you."* Even the highest archangel does not rely on his own authority but refers all judgment to God.

**Revelation 12:7-9** — *"Now war arose in heaven, Michael and his angels fighting against the dragon; and the dragon and his angels fought, but they were defeated and there was no longer any place for them in heaven."*

> Rev. 12:7-9 "Now war arose in heaven, Michael and his angels fighting against the dragon; and the dragon and his angels fought, but they were defeated and there was no longer any place for them in heaven."

### Michael's Four Traditional Roles

The Catholic tradition assigns Michael four primary roles:

**I. Warrior for God's glory.** Michael is the supreme captain of the heavenly hosts, the chief defender of God's sovereignty against all opposition.

**II. Escort of souls at death.** The tradition holds that Michael is present at the moment of death, conducting the souls of the just toward their judgment.

**III. Champion of God's people.** From Israel to the Church, Michael stands as the appointed Principality over those who belong to God. This is explicitly biblical (Daniel 12:1).

**IV. Standard-bearer of divine sovereignty.** His name — "Who is like God?" — is simultaneously the question that exposes all creaturely pride and the declaration that no being can equal the Creator.

### The Prayer to Saint Michael

In 1884, Pope Leo XIII composed the prayer to St. Michael:

*"Saint Michael the Archangel, defend us in battle. Be our protection against the wickedness and snares of the devil. May God rebuke him, we humbly pray; and do thou, O Prince of the Heavenly Host, by the power of God, cast into Hell Satan and all the evil spirits who prowl about the world seeking the ruin of souls. Amen."*

This prayer is a liturgical invocation of the Principality who, by divine appointment, holds authority over the Church.

### Michael and the Final Days

Daniel 12:1 promises that Michael *"shall arise"* at the time of the greatest tribulation — and that at that time, *"your people shall be delivered."* The tradition reads this as a promise for the Church in her most severe trials: her appointed protector will not be absent when she needs him most.

> Ps. 91:11 "For he will command his angels concerning you to guard you in all your ways."
`,

  "S7": `
![S7 Archangels Michael](/angels-lessons/s7-archangels-michael.png)

## Supplement 7 — For Lessons 11 & 12: The Archangels and Saint Michael

### Key Terms

**Archangels** (*archangeloi*, "chief angels") — The eighth choir; superior messengers entrusted with the most important missions. Scripture names three: Michael, Gabriel, Raphael.

**Michael** ("Who is like God?") — Warrior Archangel; guardian of God's people; escort of souls; champion of the Church.

**Gabriel** ("God is my strength") — Archangel of divine annunciation; messenger of the Incarnation.

**Raphael** ("God heals") — Archangel of healing and accompaniment.

**Principality** — The highest choir of the third hierarchy; guardians of nations and peoples. Michael is specifically the Principality of the Church.

---

### Scripture Memory

> Dan. 12:1 "At that time shall arise Michael, the great prince who has charge of your people."

> Rev. 12:7 "Now war arose in heaven, Michael and his angels fighting against the dragon."

> Jude 9 "But when the archangel Michael, contending with the devil, was disputing about the body of Moses, he did not presume to pronounce a blasphemous judgment, but said, 'The Lord rebuke you.'"

> Tobit 12:15 "I am Raphael, one of the seven holy angels who present the prayers of the saints and enter into the presence of the holy God."

---

### The Three Named Archangels

| Name | Meaning | Primary Mission | Key Scripture |
|------|---------|----------------|--------------|
| **Michael** | Who is like God? | Warrior; guardian of God's people | Dan. 12:1; Rev. 12:7 |
| **Gabriel** | God is my strength | Messenger of the Incarnation | Lk. 1:26-38; Dan. 8:16 |
| **Raphael** | God heals | Healing; accompaniment; guidance | Tobit 12:15 |

---

### Questions for Reflection

1. Michael's name — "Who is like God?" — is simultaneously a question and a proclamation. How does this name function as a rebuke of pride? What does it mean for your own spiritual life to ask this question honestly?

2. In Jude 9, even Michael says *"The Lord rebuke you"* rather than acting on his own authority. What does this teach about the proper use of spiritual authority?

3. Michael is described as the "great prince who has charge of your people." Do you pray to St. Michael for the protection of the Church? How does knowing he has a specific divine appointment change the nature of that prayer?

4. Gabriel brought the most important message in history — the Annunciation — to a young woman in Nazareth. What does this say about how God chooses the recipients of His most significant communications?

5. Raphael traveled with Tobias for weeks without revealing his identity. Why might an angel conceal who it is? What does this anonymity teach about how angels serve human beings?

---

### The Hebrew Element "El" in Angelic Names

The Hebrew word **El** — אֵל — is one of the oldest and most important divine terms in the biblical Hebrew world. In its simplest sense, El means “God,” “god,” “mighty one,” or “power.” Lexical sources list its semantic range as “god,” “god-like one,” “mighty one,” “God, the one true God,” and also “strength” or “power.”

In angelic names like Michael, Gabriel, and Raphael, the element **-el** functions as a **theophoric element**. A theophoric name is a name that “bears” or contains the name/title of a deity; Merriam-Webster defines “theophoric” as “derived from or bearing the name of a god.” In Hebrew biblical names, El can appear at the beginning or end of a name. When it appears at the end, as in Micha-el, Gabri-el, Rapha-el, it anchors the whole name in reference to God.

The point is not that these angels are gods. The point is that their names are **theological statements about God**.

#### El as a Hebrew Divine Word

Hebrew אֵל / ʾēl is made of two consonants: aleph א and lamed ל. The aleph originally represents a glottal stop, and the lamed gives the “l” sound. In biblical Hebrew, the written consonantal form is אל, while the vowel pointing אֵל reflects the traditional pronunciation “El.”

The word can function in a few ways:

- It can mean **God**, referring to the God of Israel.
- It can mean **a god**, when used generically.
- It can carry the idea of **might, strength, power, or majesty**, which is why it is naturally suited to divine titles.

That is why you see forms like **El Elyon** — “God Most High,” **El Shaddai** — often rendered “God Almighty,” **El Olam** — “Everlasting God,” and related forms. Britannica notes that patriarchal narratives use divine epithets such as El Shaddai, El Elyon, El Olam, El Bethel, and El Roʾi.

So when El appears inside a name, it is not decoration. It is **theological grammar**. The name is saying something about God’s nature, God’s action, or the person’s relationship to God.

#### What “Theophoric” Means in Plain Language

A theophoric name is a God-bearing name. It carries a divine title inside it.

A modern example would be names like **Nathaniel**, meaning “gift of God,” or **Daniel**, commonly understood as “God is my judge.” The person named Daniel is not God. His name confesses something about God: God judges. Nathaniel is not God. His name confesses something about God: God gives.

That same pattern works with angelic names. The angel’s name is not mainly personal branding. It is a **theological label**. It reveals mission, rank, loyalty, or divine function.

#### Michael: מִיכָאֵל / Mi-kha-el

Michael breaks down as:

- **Mi** = who?
- **kha / ka** = like, as, comparable to
- **El** = God

So **Mi-kha-el** means: **“Who is like God?”**

This is not a casual question. It is a **rhetorical challenge**. The implied answer is: No one is like God.

That makes Michael’s name a direct theological rebuke against pride, rebellion, idolatry, and satanic self-exaltation. The name itself declares the incomparability of God. This fits Michael’s biblical role. In Daniel 10:13, Michael is called “one of the chief princes,” and he comes to help in a heavenly conflict. In Daniel 12:1, he is associated with the protection of God’s people. Jude 9 calls him “the archangel.”

So Michael’s name matches his function. He is not presented as soft, decorative, or passive. He is associated with heavenly conflict, protection, and divine authority. His name announces the central truth behind his warfare: no created power rivals God.

> Michael does not defeat evil because Michael is impressive in himself. His very name points away from himself and toward God.

#### Gabriel: גַּבְרִיאֵל / Gavri-el

Gabriel is usually broken down from Hebrew elements connected to *gever* / *gabar* and **El**.

- **Gever** can mean man, strong man, warrior, or mighty one.
- **Gabar** is associated with strength, prevailing, or might.
- **El** means God.

So **Gabriel / Gavri-el** can be rendered as “God is my strength,” “man of God,” “mighty one of God,” or “hero/warrior of God.”

Gabriel’s role in Scripture fits this meaning, but in a different way from Michael. Gabriel is not mainly presented as a battle commander. He is especially presented as a **messenger and interpreter of revelation**. In Daniel 8:16, a voice commands Gabriel to make Daniel understand the vision. He comes when God’s word must be delivered with authority.

Think about the practical difference: **Michael’s name sounds like a banner raised in battle** — “Who is like God?” **Gabriel’s name sounds like divine strength entering human confusion** — “God is my strength.”

So the **-el** in Gabriel’s name marks him as one whose strength is not autonomous. His strength is derived, delegated, and directed by God.

#### Raphael: רָפָאֵל / Rafa-el

Raphael comes from the Hebrew root **רפא** / *r-p-ʾ*, meaning **to heal**, plus **El**, meaning God.

So **Rafa-el** means: **“God heals,” “God has healed,” or “healing of God.”**

Raphael’s angelic role is most clearly known from **Tobit**, which is deuterocanonical in Catholic and Orthodox Bibles. Raphael is described in Tobit 12:15 as one of the seven holy angels who present the prayers of the saints and enter before the glory of the Holy One.

So Raphael’s name is not random. It matches his function. In Tobit, Raphael is associated with healing, deliverance, guidance, and restoration. His name says the real healer is not the angel. The real healer is God.

> Raphael is not “the healer” in the ultimate sense. He is the ministering agent. His name points to the source: **God heals**.

#### Why So Many Angelic Names End in -el

The repeated **-el** ending in angelic names creates a theological pattern:

| Angel | Meaning |
|-------|---------|
| **Michael** | Who is like God? |
| **Gabriel** | God is my strength |
| **Raphael** | God heals |
| **Uriel** | God is my light / flame of God |
| **Raguel** | Friend of God |
| **Sariel** | Prince/command of God |
| **Phanuel / Peniel** | Face of God |

This pattern is especially common in later Jewish angelology. In the Hebrew Bible itself, the explicitly named angelic figures are primarily **Michael** and **Gabriel** in Daniel; **Raphael** appears in Tobit. So when people speak of the “three named archangels” — Michael, Gabriel, Raphael — that usually reflects Catholic, Orthodox, and broader historical Christian angelology.

#### The Suffix -el Does Not Mean “Angel”

This is a common mistake. The ending **-el does not mean angel. It means God.**

That means names ending in -el are not automatically angelic names. Many biblical humans carry El names:

- **Daniel** — God is my judge
- **Samuel** — heard of God / name of God
- **Israel** — struggles with God / God strives
- **Ezekiel** — God strengthens
- **Nathaniel** — gift of God
- **Ishmael** — God hears

So when Michael, Gabriel, and Raphael end in -el, the suffix is not identifying their species. It is identifying the **theological center of their names**.

#### How El Works Grammatically Inside These Names

The element El can function differently depending on the name:

- **Sometimes El is the subject:** Raphael = God heals. Here, God is the one doing the action.
- **Sometimes El is the object of comparison:** Michael = Who is like God? Here, God is the standard of comparison.
- **Sometimes El is possessive or relational:** Gabriel = man/strength/warrior of God, or God is my strength. Here, the name can be understood as either describing divine possession/service or declaring God as the source of strength.

That flexibility is normal in Hebrew names. Ancient Hebrew names often compress a whole sentence into a compact form.

#### The Theological Role of El in Angel Names

The biggest point is this: **El keeps the angel subordinate to God.**

Angels are powerful, but their names prevent angel-worship if understood correctly. Their names are not self-exalting. They are **God-exalting**.

- Michael does not mean “Michael is mighty.” It asks, **“Who is like God?”**
- Gabriel does not mean “Gabriel is independently strong.” It points to **God as strength**.
- Raphael does not mean “Raphael is the source of healing.” It says **God heals**.

That is why these names are theologically disciplined. They do not pull attention away from God. They redirect attention **back to God**.

This is especially important because Scripture repeatedly shows humans being tempted to overreact to angelic beings. Angels can be terrifying, glorious, and overwhelming. But faithful angelology never allows angels to become objects of worship. They serve. They announce. They fight. They heal. They minister. But **God alone is God**.

#### Michael, Gabriel, and Raphael as a Threefold Theological Pattern

You can summarize the three names like this:

| Angel | Theological Statement |
|-------|----------------------|
| **Michael** | God is incomparable |
| **Gabriel** | God is strength |
| **Raphael** | God heals |

Together, they form a strong theological triad:

- God is **above all rivals**.
- God **gives strength** to accomplish His will.
- God **heals** what is broken.

The “-el” ending is not a small linguistic detail. It is the **theological engine of the names**.

#### Why This Matters for Interpreting Angelology

When studying angels, people often get distracted by hierarchy charts, names, ranks, and speculative systems. The Hebrew names pull the focus back where it belongs.

The biblical and Jewish-Christian logic is not: “Look how fascinating angels are.”

The better logic is: **“Look what these servants reveal about God.”**

- Michael reveals God’s **unrivaled supremacy**.
- Gabriel reveals God’s **authoritative strength in revelation**.
- Raphael reveals God’s **healing and restoring power**.

So the **El suffix functions almost like a built-in guardrail**. It keeps the interpretation from drifting into angel-centered spirituality. Every name ends by pointing upward.

`,

  "L13": `
![L13 Saint Gabriel](/angels-lessons/l13-saint-gabriel.png)

## Saint Gabriel — Messenger of the Incarnation

### His Name

The Hebrew name *Gabriel* means **"God is my strength"** or **"strong man of God."** His name announces his character: he is the one through whom God's strength enters human history by delivering the word of God at crucial moments.

### Gabriel in Scripture

**Daniel 8 and 9.** Gabriel appears to Daniel twice in the Old Testament:

In Dan. 8:16, a voice commands: *"Gabriel, make this man understand the vision."* Gabriel explains the vision of the ram and the goat to Daniel.

In Dan. 9:20-27, while Daniel is praying, *"the man Gabriel, whom I had seen in the vision at the first, came to me in swift flight at the time of the evening sacrifice."* Gabriel explains the mystery of the seventy weeks — one of the most important prophetic passages in all of Scripture, pointing to the precise timing of the Messiah's coming.

**Luke 1:19.** When Zechariah the priest does not believe Gabriel's announcement that his elderly wife Elizabeth will bear a son, Gabriel identifies himself: *"I am Gabriel. I stand in the presence of God, and I was sent to speak to you and to bring you this good news."*

**Luke 1:26-38.** The Annunciation. Gabriel is sent to Nazareth, to a virgin named Mary. He greets her:

> Lk. 1:28 "Hail, full of grace, the Lord is with you!"

He announces that she will conceive by the Holy Spirit and bear the Son of God, whose kingdom will have no end. Mary's response — *"Behold, I am the servant of the Lord; let it be to me according to your word"* — is the hinge of all human history.

### Gabriel's Mission: The Central Message

Gabriel's scriptural appearances form a single arc: in Daniel, he prepares Israel for the Messiah by explaining the prophetic timeline; in Luke, he announces the Messiah's arrival. His entire existence as an angel was ordered toward a single purpose: **to prepare for and announce the Incarnation of the Son of God.**

The tradition holds that **Gabriel was created for the Annunciation.** One might even say that Gabriel's billions of years of existence before his mission were in some sense a preparation — and that the moment in Nazareth was the fulfillment for which he was made.

### Gabriel as Patron

Gabriel is the patron of:
- Messengers, ambassadors, and diplomats
- Postal workers and broadcasters
- Expectant mothers
- Those who communicate God's word (preachers, teachers, catechists)

### Gabriel and Prayer

The *Angelus* — the traditional Catholic prayer recited three times daily at morning, noon, and evening — commemorates Gabriel's Annunciation. It begins:

*"The Angel of the Lord declared unto Mary, and she conceived of the Holy Spirit."*

Every *Angelus* is a participation in the moment Gabriel was created for. It brings the whole day into the orbit of the Incarnation — orienting morning, noon, and evening toward the one event in which heaven and earth were united.

> Lk. 1:38 "And Mary said, 'Behold, I am the servant of the Lord; let it be to me according to your word.' And the angel departed from her."
`,

  "L14": `
![L14 Saint Raphael](/angels-lessons/l14-saint-raphael.png)

## Saint Raphael — Healer, Guide, and Companion

### His Name

The Hebrew name *Raphael* means **"God heals"** (*rapha*, to heal; *El*, God). His name is his mission: wherever Raphael appears, healing follows — of bodies, of relationships, of sight.

### Raphael in Scripture

Raphael's primary scriptural appearance is in the deuterocanonical Book of **Tobit** (accepted as canonical in Catholic and Orthodox tradition).

**The Story of Tobit.** Tobit is a devout Jew in Nineveh who has gone blind and sent his son Tobias on a long journey to recover a debt. A young man named Azariah offers to accompany Tobias and serve as his guide.

Over the weeks of the journey, Azariah:
- Instructs Tobias on how to use a miraculous fish to heal his father's blindness
- Guides him in his relationship with his wife Sarah
- Preserves him from danger
- Intercedes before God on behalf of both Tobias and Sarah

After Tobias's safe return and his father's miraculous healing, Azariah reveals himself:

> Tobit 12:15 "I am Raphael, one of the seven holy angels who present the prayers of the saints and enter into the presence of the holy God."

### Raphael's Triple Ministry

From the Book of Tobit, the tradition has identified three dimensions of Raphael's angelic ministry:

**I. Healing.** Raphael heals Tobit's blindness. He is the patron of all physical healing and medicine. His name, "God heals," is realized concretely — he does not merely announce healing but participates in it as God's instrument.

**II. Accompaniment.** Raphael traveled incognito with Tobias for weeks — a companion who served without being recognized. This is a profound image of angelic ministry: the angel walks alongside the human being in the ordinary work of life, guiding, protecting, and sustaining — often without any visible sign.

**III. Intercession.** Raphael declares that he has been presenting the prayers of Tobit and Sarah before God: *"When you prayed... I was present; and your prayer rose up to heaven"* (Tobit 12:12). This reveals that Raphael's task was not only physical accompaniment but spiritual intercession — bringing human prayers into the divine presence.

### Raphael as Patron

Raphael is patron of:
- Travelers and pilgrims
- The blind and those with eye ailments
- Medical workers and pharmacists
- Those seeking a holy spouse

### Raphael and the Guardian Angels

Raphael's manner of serving Tobias — traveling alongside him anonymously, teaching, protecting, interceding — is perhaps the clearest scriptural image of how every guardian angel serves every human being it is assigned to. Though the guardian angel does not reveal itself and does not perform visible miracles, it accompanies, teaches through inspiration, protects from dangers, and carries prayers before God.

Every Christian, in a very real sense, has their own Raphael.

> Ps. 91:11 "For he will command his angels concerning you to guard you in all your ways."
`,

  "S8": `
![S8 Gabriel Raphael](/angels-lessons/s8-gabriel-raphael.png)

## Supplement 8 — For Lessons 13 & 14: Gabriel and Raphael

### Key Terms

**Gabriel** ("God is my strength") — Archangel of Annunciation; created to deliver the message of the Incarnation; patron of messengers.

**Raphael** ("God heals") — Archangel of healing and accompaniment; patron of travelers, the blind, and medical workers; reveals himself as "one of the seven holy angels who present the prayers of the saints."

**The Angelus** — Traditional Catholic prayer recited three times daily, commemorating Gabriel's Annunciation, the Incarnation, and Mary's *fiat*.

**The Book of Tobit** — Deuterocanonical book containing Raphael's primary scriptural appearance; canonical in Catholic and Orthodox tradition.

---

### Scripture Memory

> Lk. 1:26-28 "In the sixth month the angel Gabriel was sent from God to a city of Galilee named Nazareth, to a virgin betrothed to a man whose name was Joseph, of the house of David. And the virgin's name was Mary. And he came to her and said, 'Greetings, O favored one, the Lord is with you!'"

> Dan. 9:21-22 "While I was speaking in prayer, the man Gabriel, whom I had seen in the vision at the first, came to me in swift flight... He made me understand, speaking with me and saying, 'O Daniel, I have now come out to give you insight and understanding.'"

> Tobit 12:15 "I am Raphael, one of the seven holy angels who present the prayers of the saints and enter into the presence of the holy God."

---

### Gabriel's Ministry in Scripture

| Event | Location | Content |
|-------|---------|---------|
| Vision of the Ram and Goat | Dan. 8:16 | Explains the vision of the four kingdoms |
| The Seventy Weeks | Dan. 9:21-27 | The timeline pointing to the Messiah |
| Announcement to Zechariah | Lk. 1:19 | Birth of John the Baptist foretold |
| The Annunciation | Lk. 1:26-38 | The Incarnation announced to Mary |

---

### Questions for Reflection

1. Gabriel says to Mary: *"Hail, full of grace, the Lord is with you"* (Lk. 1:28). This greeting addresses her by title ("full of grace"), not merely by name. What does this suggest about how God sees those He sends His messengers to?

2. Gabriel prepared Israel for the Messiah through Daniel, then announced the Messiah's arrival to Mary. How does this pattern of *preparation then fulfillment* appear in your own spiritual life?

3. Raphael traveled anonymously with Tobias for weeks before revealing himself. Have you ever experienced God's provision or guidance through someone who seemed "ordinary" — only later recognizing the grace at work?

4. Raphael tells Tobit and Tobias: *"I was present"* when they prayed, and their prayers *"rose up to heaven"* (Tobit 12:12). How does knowing that an angel has been carrying your prayers before God change the way you pray?

5. Mary's response to Gabriel — *"Let it be to me according to your word"* — is the defining act of receptivity in human history. What areas of your life most need that same *fiat* — that same complete surrender to God's word?
`,

  // ── Part V ─────────────────────────────────────────────────────────────────

  "L15": `
![L15 Guardian Angels](/angels-lessons/l15-guardian-angels.png)

## The Guardian Angels — God's Personal Gift to Every Soul

### The Most Personal of All Angelic Doctrines

Of all the teachings on the angels, the doctrine of the **guardian angel** is the most intimate and personally significant for every Christian. It is not a teaching about cosmic hierarchies or distant heavenly beings — it is the teaching that from the moment of your existence to the moment of your natural death, a mighty spiritual being stands assigned to you personally, by divine command.

### The Catechism

The Catechism of the Catholic Church is definitive:

> **CCC §336** — "From its beginning until death, human life is surrounded by their watchful care and intercession. Beside each believer stands an angel as protector and shepherd leading him to life. Already here on earth the Christian life shares by faith in the blessed company of angels and men united in God."

### Scriptural Foundation

**Psalm 91:11** — *"For he will command his angels concerning you to guard you in all your ways."*

**Matthew 18:10** — Jesus, speaking of the "little ones":

> Mt. 18:10 "See that you do not despise one of these little ones. For I tell you that in heaven their angels always behold the face of my Father who is in heaven."

Two truths in one sentence: the guardian angel is simultaneously with the person *and* beholding God. This is not paradoxical for an angelic being — it is the expression of their nature. The angel need not leave God's presence to serve its charge; it serves in God's presence.

**Hebrews 1:14** — *"Are they not all ministering spirits sent out to serve for the sake of those who are to inherit salvation?"*

**Acts 12:15** — The Jerusalem church, hearing that Peter has been miraculously freed from prison, assumes the person knocking at their door is "his angel" — suggesting that the idea of personal guardian angels was entirely natural to the early Christians.

### Theological Precision

**Guardian angels are uniquely assigned.** According to St. Thomas Aquinas, guardian angels are given to persons at birth (not at baptism — even non-Christians have guardian angels), are not recycled from one person to another, and are assigned one-to-one: each person has one dedicated angel.

**From conception.** The tradition holds that the guardian angel is present from the first moment of existence. The Book of Jeremiah states: *"Before I formed you in the womb I knew you"* (Jer. 1:5). St. Jerome wrote: *"The worth of souls is so great that from birth each one has an angel assigned to him for his protection."*

### What Guardian Angels Can and Cannot Do

**They can:**
- Act upon the imagination and senses — inspiring good thoughts, inclining the mind toward what is holy
- Protect from physical dangers when this aligns with God's providential plan
- Intercede for their charge before God, presenting prayers to the throne (Tobit 12:12)
- Enlighten the intellect through gentle interior promptings

**They cannot:**
- Compel the will — human free will is absolutely inviolable, even by God Himself
- Create certainty in the intellect or put beliefs directly into the mind
- Override the consequences of freely chosen sin

### The Feast of the Guardian Angels

October 2 is the Church's feast day for the Guardian Angels — established in Spain in the sixteenth century and extended to the universal Church by Pope Clement X in 1670.

The traditional prayer is among the oldest in Catholic devotion:

*"Angel of God, my guardian dear, to whom God's love commits me here; ever this day be at my side, to light and guard, to rule and guide. Amen."*
`,

  "L16": `
![L16 Devotion Angels](/angels-lessons/l16-devotion-angels.png)

## Devotion to the Holy Angels — A Living Relationship

### Why Devotion to the Angels Matters

The Catechism encourages devotion to the angels — particularly the three named Archangels and one's own Guardian Angel. This devotion is not worship (*latria*, which belongs to God alone) but *veneration* (*dulia*) — the honor proper to holy creatures.

Devotion to the angels is a response to biblical truth: the angels are real, they are present, they are active in the lives of believers, and they can be addressed in prayer — not as gods, but as powerful friends and intercessors.

### The Relationship Between Angels and Prayer

Raphael told Tobit and Tobias: *"I was present when you prayed... I was sent to test you"* (Tobit 12:12-14). Raphael was not merely observing — he was **presenting their prayers before God** throughout the period of their trials.

**Angels present our prayers.** Revelation 8:3-4 describes an angel standing at the altar with a golden censer, offering up "the prayers of all the saints" with incense before the throne:

> Rev. 8:3-4 "And another angel came and stood at the altar with a golden censer, and he was given much incense to offer with the prayers of all the saints on the golden altar before the throne, and the smoke of the incense, with the prayers of the saints, rose before God from the hand of the angel."

Our prayers, offered with simplicity and faith, are taken up by angelic beings and presented at the very throne of God.

### Practical Devotional Life with the Angels

**The Morning Offering.** The tradition recommends beginning the day by asking your guardian angel to accompany you through all the day's activities — to guard you in dangers, to prompt you toward good, to present your day's work and prayer before God.

**The Angelus** (morning, noon, and evening). This prayer commemorates the Annunciation — Gabriel's message and Mary's *fiat*. Reciting it three times daily orients the entire day toward the Incarnation.

**Conversation with your Guardian Angel.** The tradition encourages brief, informal address to your guardian angel throughout the day — the natural acknowledgment of a personal being who is genuinely present with you.

**The Feast Days.** September 29 (the Archangels) and October 2 (the Guardian Angels) are natural occasions for deeper reflection and renewed devotion.

**Attentiveness to Interior Promptings.** The tradition holds that guardian angels communicate primarily through the imagination and interior sense — gentle inclinations toward good, subtle promptings to pray. Cultivating attentiveness to these movements is a form of living relationship with one's guardian angel.

### Angels and the Liturgy

The liturgy is the most important point of contact with the angelic world in the Christian life:

- The **Preface** of every Mass: *"Therefore with Angels and Archangels, and with all the host of heaven, we praise and magnify Thy glorious Name..."*
- The **Sanctus**: the Church on earth joins the Seraphim's eternal cry.
- The **incense** at solemn Mass corresponds to the angelic offering of incense in Revelation 8.

**St. John Chrysostom taught** that the church building during the liturgy becomes a microcosm of heaven, with the angels standing alongside the faithful. This is a participation in the one eternal liturgy offered by Christ in the presence of all the angels and saints.

### Avoiding Errors

**Angels are not substitutes for God.** Devotion to angels always leads *to* God, not away from Him. Any "angel spirituality" that makes angels the focus rather than the means is a distortion.

**We do not command angels.** Ps. 103:20 says angels "obey the voice of his word" — that is, God's word. They are God's messengers, not our employees.

**Not every spiritual experience is angelic.** The Church consistently warns: *"Test the spirits"* (1 Jn. 4:1).

> Heb. 1:14 "Are they not all ministering spirits sent out to serve for the sake of those who are to inherit salvation?"
`,

  "S9": `
![S9 Guardian Devotion](/angels-lessons/s9-guardian-devotion.png)

## Supplement 9 — For Lessons 15 & 16: Guardian Angels and Devotion

### Key Terms

**Guardian Angel** — A member of the ninth (lowest) choir, assigned personally to each human being from conception to natural death, to guard, enlighten, and intercede.

**Veneration** (*dulia*) — The honor proper to holy creatures (saints and angels), distinct from *latria* (worship), which belongs to God alone.

**The Angelus** — Traditional prayer recited three times daily, commemorating the Annunciation; the most common daily devotion linking human prayer to angelic ministry.

**Intercession** — The presentation of human prayers before God; Raphael explicitly identifies this as part of his ministry (Tobit 12:12).

---

### Scripture Memory

> Mt. 18:10 "See that you do not despise one of these little ones. For I tell you that in heaven their angels always behold the face of my Father who is in heaven."

> Ps. 91:11 "For he will command his angels concerning you to guard you in all your ways."

> Rev. 8:3-4 "Another angel came and stood at the altar with a golden censer, and he was given much incense to offer with the prayers of all the saints on the golden altar before the throne."

> Heb. 1:14 "Are they not all ministering spirits sent out to serve for the sake of those who are to inherit salvation?"

---

### What Guardian Angels Can and Cannot Do

| They Can | They Cannot |
|----------|------------|
| Inspire good thoughts in the imagination | Compel the will |
| Protect from physical harm (per God's plan) | Override freely chosen sin |
| Intercede before God with our prayers | Create certainty in the intellect |
| Enlighten through interior promptings | Reveal hidden sins of others to us |
| Accompany through every moment of life | Guarantee physical safety against God's will |

---

### Questions for Reflection

1. Jesus says the angels of the "little ones" *always* behold the face of the Father (Mt. 18:10). Your guardian angel is simultaneously with you and in the direct presence of God. What does this say about how God connects heaven and earth in caring for you?

2. The guardian angel cannot compel your will. It can only inspire, prompt, and enlighten. Have you ever experienced what seemed like a gentle interior nudge toward prayer, goodness, or a particular action?

3. Raphael presented the prayers of Tobit and Tobias before God throughout their trials. How does knowing that an angel is doing this for you right now change the value you assign to even brief, imperfect prayers?

4. Rev. 8:3-4 shows an angel offering all the prayers of the saints as incense before the throne. When you pray the *Our Father* or a simple heartfelt prayer, an angel is taking that prayer and carrying it before God. How does this change how you pray?

5. The Church warns against making angels a substitute for God. How do you keep angel devotion properly ordered — honoring the creature without displacing the Creator?
`,

  "L17": `
![L17 Angels Old Testament](/angels-lessons/l17-angels-old-testament.png)

## Angels in the Old Testament — From Eden to the Prophets

### A Complete Survey

Having studied the nature of angels and the nine choirs in detail, we now examine the full sweep of angelic appearances in the Old Testament — tracing the consistent pattern of how God uses angels throughout the unfolding of His covenant with humanity.

### The Garden — Protection of the Holy

The first angelic act recorded after creation is guardianship. After the expulsion of Adam and Eve, God places Cherubim at the east of Eden to guard the Tree of Life (Gen. 3:24).

This sets the pattern: **wherever God's presence or holiness is specially located, the angels guard it.** This principle runs from Eden to the Ark of the Covenant to the Temple to the Resurrection tomb.

### The Patriarchs — Angels at the Thresholds

**Hagar.** When Hagar flees into the wilderness, the Angel of the Lord finds her by a spring and promises her a multitude of descendants (Gen. 16:7-13). God cares even for the outcast.

**Abraham.** Three heavenly visitors appear at Mamre; Abraham offers hospitality and learns of the coming birth of Isaac (Gen. 18:1-2).

**Lot.** Two angels come to Sodom, warn Lot, and physically draw him out of the city before its destruction (Gen. 19:1-15). The angels literally take him by the hand.

**The Binding of Isaac.** As Abraham raises the knife, "the angel of the Lord called to him from heaven" and stops the sacrifice, providing a ram as substitute (Gen. 22:11-12).

**Jacob.** Jacob dreams of angels ascending and descending the ladder connecting heaven and earth (Gen. 28:12). Later, he wrestles with "a man" who is an angel, and is renamed Israel (Gen. 32:24-30).

### The Exodus — Angels of Deliverance

**Moses and the Burning Bush.** The Angel of the Lord appears in a flame of fire out of a bush that burns but is not consumed (Ex. 3:2).

**The Pillar of Cloud and Fire.** Throughout the Exodus, *"the angel of God"* goes before the camp of Israel (Ex. 14:19).

**The Cherubim on the Ark.** Two golden Cherubim are commanded for the Ark of the Covenant — and from between them, God pledges to speak with Moses (Ex. 25:18-22).

### The Conquest and Monarchy

**Joshua and the Commander of the Lord's Army.** Near Jericho, Joshua encounters *"the commander of the army of the Lord"* standing with a drawn sword (Josh. 5:14) — an angelic being of supreme authority.

**Gideon.** The Angel of the Lord appears to Gideon under the oak at Ophrah and calls him to deliver Israel. The angel touches his offering with a staff and fire consumes it from the rock (Judg. 6:11-23).

**Elijah.** Twice, angels provide food and water to the exhausted prophet: *"Arise and eat, for the journey is too great for you"* (1 Kgs. 19:5-7).

### The Prophetic Age

**Isaiah's Throne Vision** (Isa. 6:1-7). The Seraphim surround the throne, crying Holy, Holy, Holy; one touches Isaiah's lips with the burning coal.

**Ezekiel's Chariot-Throne** (Ezek. 1:1-28). The four living creatures carry the divine chariot-throne; the whole vision is one of the most extraordinary in Scripture.

**Daniel and the Archangels.** Gabriel explains Daniel's visions (Dan. 8:16); Michael fights for God's people in the heavenly realm (Dan. 10:13).

**Zechariah's Visions.** Zechariah receives eight night visions, many involving interpreting angels — "the angel who talked with me" (Zech. 1:9).

### The Consistent Pattern

Looking across the Old Testament, angelic appearances follow a consistent theological logic:

1. **God sends angels at moments of covenant transition** — when something new is being established in salvation history.
2. **Angels guard and protect the holy** — from Eden's tree to the Ark to the Temple.
3. **Angels minister to the vulnerable** — Hagar, the exhausted Elijah, the abandoned Lot.
4. **Angels announce and interpret** — Gabriel's visits to Daniel prepare Israel for the Messiah.
5. **Angels worship and exalt God** — Isaiah's seraphim, Ezekiel's living creatures, the angelic hosts of heaven.
`,

  "L18": `
![L18 Angels New Testament](/angels-lessons/l18-angels-new-testament.png)

## Angels in the New Testament, the Liturgy, and the Life of the Church

### New Testament — Angels at Every Turning Point

The New Testament is dense with angelic activity — concentrated especially at the major events of salvation history.

**The Annunciation** (Lk. 1:26-38). Gabriel comes to Nazareth. The message that changes the world is delivered by an angel to a young woman.

**The Birth of John the Baptist** (Lk. 1:11-20). Gabriel appears to Zechariah in the Temple during the incense offering.

**The Nativity** (Lk. 2:8-14). An angel announces the birth to the shepherds; then *"a multitude of the heavenly host"* appears, praising God. The Incarnation is met by an angelic choir.

**The Flight to Egypt** (Mt. 2:13). An angel appears to Joseph in a dream, warning him to take Mary and Jesus to Egypt.

**The Temptation** (Mt. 4:11). After forty days, *"angels came and were ministering to him."*

**Gethsemane** (Lk. 22:43). In His agony, *"there appeared to him an angel from heaven, strengthening him."* Even the Son of God, in His human nature, received angelic ministry.

**The Resurrection** (Mt. 28:2-7). An angel rolls back the stone; his appearance is like lightning, his clothing white as snow. *"He is not here, for he has risen."*

**The Ascension** (Acts 1:10-11). Two angels in white appear: *"This Jesus, who was taken up from you into heaven, will come in the same way as you saw him go."*

**The Church in Acts.** An angel opens the prison for Peter and the apostles (Acts 5:19). An angel directs Cornelius to send for Peter, beginning the Gentile mission (Acts 10:3).

**The Book of Revelation.** Angels pervade the entire Apocalypse, and at the very end: *"I, Jesus, have sent my angel to testify to you about these things for the churches"* (Rev. 22:16).

---

### Angels and the Liturgy of the Church

St. Paul teaches that when Christians gather for worship, they are not alone:

> Heb. 12:22-23 "But you have come to Mount Zion and to the city of the living God, the heavenly Jerusalem, and to innumerable angels in festal gathering, and to the assembly of the firstborn who are enrolled in heaven."

Every Christian assembly — every Mass, every prayer service, every gathering in Christ's name — takes place in the presence of *"innumerable angels in festal gathering."*

**The Preface of the Mass** explicitly acknowledges this: *"Therefore, with all the Angels and Saints, we praise and glorify your name..."*

**The Sanctus** quotes the Seraphim of Isaiah 6 and the living creatures of Revelation 4 — meaning that the congregation at Mass is joining a hymn already being sung by the highest created beings in existence.

**The incense** at solemn Mass corresponds to the golden censer of Revelation 8:3-4, where an angel offers incense with the prayers of all the saints before the throne.

### A Living Inheritance

The doctrine of the angels is not an antiquarian curiosity. It is the Church's living inheritance from Scripture, expressing a fundamental truth: the human being is not alone. From conception to death, from private prayer to public liturgy, from the ordinary events of daily life to the great turning points of salvation history, the holy angels are present — worshipping, guarding, interceding, ministering, and leading all things toward the glory of God.

> Ps. 103:20 "Bless the Lord, O you his angels, you mighty ones who do his word, obeying the voice of his word!"
`,

  "S10": `
![S10 Scripture Worship](/angels-lessons/s10-scripture-worship.png)

## Supplement 10 — For Lessons 17 & 18: Angels in Scripture and Worship

### Key Terms

**The Angel of the Lord** (*malakh YHWH*) — A special figure in the Old Testament who speaks with divine authority and accepts worship; many Fathers identified these appearances as pre-incarnate manifestations of the Son of God.

**Christophany** — A pre-incarnate appearance of Christ; the classical patristic interpretation of many "Angel of the Lord" appearances.

**The Sanctus** — "Holy, Holy, Holy, Lord God of hosts"; the triple-holy hymn at Mass, quoting Isaiah 6:3 (Seraphim) and echoed in Revelation 4:8 (living creatures).

**Hebrews 12:22** — The declaration that every Christian gathering takes place in the presence of "innumerable angels in festal gathering."

---

### Scripture Memory

> Ps. 103:20-21 "Bless the Lord, O you his angels, you mighty ones who do his word, obeying the voice of his word! Bless the Lord, all his hosts, his ministers, who do his will!"

> Heb. 12:22-23 "But you have come to Mount Zion and to the city of the living God, the heavenly Jerusalem, and to innumerable angels in festal gathering."

> Lk. 2:13-14 "And suddenly there was with the angel a multitude of the heavenly host praising God and saying, 'Glory to God in the highest, and on earth peace among those with whom he is pleased!'"

---

### Old Testament Angelic Appearances at a Glance

| Event | Angel's Role | Reference |
|-------|-------------|-----------|
| Hagar in the wilderness | Compassion; promise | Gen. 16:7-13 |
| Three visitors to Abraham | Announce Isaac's birth | Gen. 18:1-2 |
| Lot in Sodom | Physical rescue | Gen. 19:1-15 |
| Binding of Isaac | Stop the sacrifice | Gen. 22:11-12 |
| Jacob's ladder | Vision of heaven-earth link | Gen. 28:12 |
| Burning bush | Call of Moses | Ex. 3:2 |
| Pillar of cloud/fire | Guide and protect Israel | Ex. 14:19 |
| Elijah under the broom tree | Provision and strength | 1 Kgs. 19:5-7 |
| Isaiah's vision | Purification; call | Isa. 6:1-7 |
| Daniel's visions | Explanation; protection | Dan. 8:16; Dan. 10:13 |

---

### Questions for Reflection

1. Angels appear at every major transition in salvation history. What does this consistent presence reveal about God's economy of providence?

2. St. Paul says that when Christians gather, they come to *"innumerable angels in festal gathering"* (Heb. 12:22). How does this awareness change your experience of Sunday worship?

3. The Sanctus links the earthly liturgy to the Seraphim's song in Isaiah 6 and the living creatures in Revelation 4. When you sing Holy, Holy, Holy, you are joining a hymn that has never ceased in heaven. What does this mean to you personally?

4. Angels are sent to the vulnerable throughout the Old Testament — Hagar, Elijah, Lot. In what moments of vulnerability have you trusted that God's angels were present?

5. At Gethsemane, an angel strengthened Jesus in His agony. If an angel was sent to strengthen the Son of God in human suffering, what does this say about God's attentiveness to our own moments of suffering and prayer?
`,

  "S11": `
![S11 Final Synthesis](/angels-lessons/s11-final-synthesis.png)

## Supplement 11 — A Final Synthesis: The Theology of Angelic Ministry

### Three Levels of Angelic Ministry

The Church's tradition identifies three levels at which angelic ministry operates in human life:

**1. Cosmic Governance (First and Second Hierarchies)**
The highest choirs are engaged in the governance of creation as a whole — maintaining the order of the universe, the laws of nature, the broad providential plan.

**2. Historical and Corporate Ministry (Third Hierarchy — Principalities)**
At the level of nations, civilizations, and the Church, the Principalities exercise their guardianship. History has an angelic dimension; the spread of the Gospel, the rise and fall of empires, the protection of the Church in persecution — all involve the ministry of the Principalities.

**3. Personal and Sacramental Ministry (Archangels and Angels)**
At the most personal level, the archangels carry out unique missions assigned at creation, while the lowest choir of angels serves each individual soul through guardian angel ministry.

---

### Key Theological Principles

**I. All angelic activity is derivative — it comes from God.** The angels have no power except what God gives them. They operate always within the bounds of divine providence.

**II. The angels desire our salvation.** 1 Pet. 1:12 says that the angels *"long to look"* into the things of the Gospel. The salvation of human souls is not a matter of indifference to the heavenly host — it is a source of joy: *"There will be more joy in heaven over one sinner who repents"* (Lk. 15:7).

**III. Angels are not to be worshipped.** The angel in Revelation 19:10 refuses John's worship: *"You must not do that! I am a fellow servant with you and your brothers who hold to the testimony of Jesus."* The angels worship God; they do not receive worship.

**IV. Angelic ministry is ordered toward Christ.** Gabriel announces the Incarnation; Michael protects the elect; Raphael images healing and accompaniment; angels minister to Jesus throughout His earthly life; they announce the Resurrection; they attend the Ascension. The whole angelic order is oriented toward Christ.

> Col. 2:18 "Let no one disqualify you, insisting on asceticism and worship of angels, going on in detail about visions, puffed up without reason by his sensuous mind."

St. Paul's warning is not against honoring angels — it is against any form of angel veneration that becomes a substitute for Christ. True devotion to the angels always leads to Christ; it cannot lead anywhere else, because the angels themselves exist for Christ.

---

### Questions for Reflection

1. How has your understanding of the angels changed through this course? What did you believe about angels before, and what do you believe now?

2. The angels exist on three levels: cosmic governance, corporate ministry, and personal care. Which of these levels do you find most consoling? Which most challenging to believe?

3. St. Peter says the angels *"long to look"* into the Gospel (1 Pet. 1:12). The angels, who know infinitely more than we do, are fascinated by what God did in Christ for human souls. What does this suggest about the value of every human soul?

4. The whole angelic order is oriented toward Christ. The Seraphim adore Christ; Michael protects His people; Gabriel announced His Incarnation; the guardian angels serve those He died to save. How does seeing the angels as *Christocentric* deepen your love for Christ?

5. Write a brief prayer to your guardian angel — not a formula, but a personal address in your own words, asking for its guidance, protection, and intercession for a specific need in your life today.
`,
};

// ─── Course Outline ─────────────────────────────────────────────────────────────

const CHAPTERS = [
  {
    title: "Part I — The Nature and Origin of Angels",
    order: 1,
    lessons: [
      { key: "L1", title: "Lesson 1 — What Are Angels?", order: 0 },
      { key: "L2", title: "Lesson 2 — How Angels Know: The Gift of Infused Knowledge", order: 1 },
      { key: "S1", title: "Supplement 1 — For Lessons 1 & 2", order: 2, type: "SUPPLEMENT" },
      { key: "L3", title: "Lesson 3 — The Creation of Angels: Instantaneous and Complete", order: 3 },
      { key: "L4", title: "Lesson 4 — Angels Across Scripture: A Survey of Holy Appearances", order: 4 },
      { key: "S2", title: "Supplement 2 — For Lessons 3 & 4", order: 5, type: "SUPPLEMENT" },
    ],
  },
  {
    title: "Part II — The First Hierarchy: Before the Throne of God",
    order: 2,
    lessons: [
      { key: "L5", title: "Lesson 5 — The Seraphim: Burning with Divine Love", order: 0 },
      { key: "L6", title: "Lesson 6 — The Cherubim: Guardians of Divine Wisdom", order: 1 },
      { key: "S3", title: "Supplement 3 — For Lessons 5 & 6", order: 2, type: "SUPPLEMENT" },
      { key: "L7", title: "Lesson 7 — The Thrones: Expressions of Divine Authority", order: 3 },
      { key: "L8", title: "Lesson 8 — The Living Creatures and the Eternal Worship of Heaven", order: 4 },
      { key: "S4", title: "Supplement 4 — For Lessons 7 & 8", order: 5, type: "SUPPLEMENT" },
    ],
  },
  {
    title: "Part III — The Second Hierarchy: Governing Creation",
    order: 3,
    lessons: [
      { key: "L9",  title: "Lesson 9 — The Dominations and Virtues: Governing Creation", order: 0 },
      { key: "L10", title: "Lesson 10 — The Powers and Principalities: Defenders of Order", order: 1 },
      { key: "S5",  title: "Supplement 5 — For Lessons 9 & 10", order: 2, type: "SUPPLEMENT" },
      { key: "S6",  title: "Supplement 6 — For Lessons 9 & 10 (Extended)", order: 3, type: "SUPPLEMENT" },
    ],
  },
  {
    title: "Part IV — The Third Hierarchy: Ministers of Salvation",
    order: 4,
    lessons: [
      { key: "L11", title: "Lesson 11 — The Archangels: Heaven's Chief Messengers", order: 0 },
      { key: "L12", title: "Lesson 12 — Saint Michael: Warrior and Protector of the Elect", order: 1 },
      { key: "S7",  title: "Supplement 7 — For Lessons 11 & 12", order: 2, type: "SUPPLEMENT" },
      { key: "L13", title: "Lesson 13 — Saint Gabriel: Messenger of the Incarnation", order: 3 },
      { key: "L14", title: "Lesson 14 — Saint Raphael: Healer, Guide, and Companion", order: 4 },
      { key: "S8",  title: "Supplement 8 — For Lessons 13 & 14", order: 5, type: "SUPPLEMENT" },
    ],
  },
  {
    title: "Part V — Angels in the Life of the Believer",
    order: 5,
    lessons: [
      { key: "L15", title: "Lesson 15 — The Guardian Angels: God's Personal Gift to Every Soul", order: 0 },
      { key: "L16", title: "Lesson 16 — Devotion to the Holy Angels: A Living Relationship", order: 1 },
      { key: "S9",  title: "Supplement 9 — For Lessons 15 & 16", order: 2, type: "SUPPLEMENT" },
      { key: "L17", title: "Lesson 17 — Angels in the Old Testament: From Eden to the Prophets", order: 3 },
      { key: "L18", title: "Lesson 18 — Angels in the New Testament, the Liturgy, and the Life of the Church", order: 4 },
      { key: "S10", title: "Supplement 10 — For Lessons 17 & 18", order: 5, type: "SUPPLEMENT" },
      { key: "S11", title: "Supplement 11 — A Final Synthesis: The Theology of Angelic Ministry", order: 6, type: "SUPPLEMENT" },
    ],
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Find or create the course
  let course = await db.content.findUnique({ where: { slug: "angels" } });

  if (!course) {
    course = await db.content.create({
      data: {
        type:        "COURSE",
        title:       "Angels — God's Heavenly Host",
        slug:        "angels",
        description: "A comprehensive study of the nature, hierarchy, and ministry of angels as revealed in Sacred Scripture and the theological tradition — from the Seraphim who burn before the throne of God to the guardian angel who walks beside every soul.",
        published:   true,
        premium:     false,
        featured:    false,
        order:       2,
      },
    });
    console.log(`✅ Created course: ${course.title}`);
  } else {
    console.log(`ℹ️  Course already exists: ${course.title}`);
    // Clear existing chapters (cascades to lessons)
    await db.courseChapter.deleteMany({ where: { contentId: course.id } });
    console.log("🗑️  Cleared existing chapters\n");
  }

  // Create chapters and lessons
  for (const ch of CHAPTERS) {
    const chapter = await db.courseChapter.create({
      data: {
        contentId: course.id,
        title:     ch.title,
        order:     ch.order,
      },
    });
    console.log(`  📖 ${ch.title}`);

    for (const l of ch.lessons) {
      const isSupp = l.type === "SUPPLEMENT";
      await db.courseLesson.create({
        data: {
          chapterId: chapter.id,
          title:     l.title,
          type:      isSupp ? "SUPPLEMENT" : "READING",
          order:     l.order,
          duration:  isSupp ? 600 : 900,
          content:   LESSONS[l.key] ?? "",
          published: true,
        },
      });
      console.log(`      ${isSupp ? "📋" : "📝"} ${l.title}`);
    }
  }

  console.log("\n✅ Done — Angels course seeded successfully.");
  console.log(`   5 Parts | 18 Lessons | 11 Supplements = 29 total sections`);
  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
