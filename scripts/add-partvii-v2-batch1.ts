import { PrismaClient } from "@prisma/client";
import fs from "fs";

const db = new PrismaClient();
const CHAPTER_ID = fs.readFileSync("/tmp/partvii-chapter-id.txt", "utf8").trim();

const lessons = [
  {
    order: 0,
    type: "READING" as const,
    title: "The New Age Movement",
    content: `![The New Age Movement](/demons-lessons/l22-new-age.png)

## The New Age Movement

She found it in a bookshop the year her mother died. *A Course in Miracles.* The cover said it was a spiritual self-study program. It said the voice that dictated it was Jesus. It said there was no sin, no evil, no real separation from God — only the illusion of it. Grief does something to a person's theology. She bought it. She read it every morning for two years. By the end, she had stopped believing in the cross.

---

## What It Is

The New Age Movement is not a single religion. It is a spiritual ecosystem — an open-source collection of practices and beliefs that draws from Hinduism, Buddhism, Theosophy, folk magic, and Western occultism, repackaged for secular Western consumption. Its hallmarks are self-deification ("you are divine"), relativism ("all paths lead to God"), channeled revelation (messages received from spiritual entities), meditation practices designed to empty the mind and contact higher consciousness, and energy healing.

It gained mainstream traction in the 1970s through Shirley MacLaine, exploded in the 1980s through the New Age section of every bookshop, and today operates invisibly inside wellness culture, coaching, and social media spirituality. The crystal seller, the "human design" consultant, and the life coach who tells you to "trust your higher self" are all operating within this framework.

## The Demonic Deception

The central claim of the New Age Movement is that humanity is divine, separation from God is an illusion, and the goal of spiritual practice is to realize your inherent oneness with universal consciousness.

This is the serpent's original lie — delivered in a gentler, more therapeutic format.

[Genesis 3:5](data-scripture="Genesis 3:5"): *"Ye shall be as gods."* The serpent did not offer open rebellion. He offered spiritual elevation. The New Age does the same. It does not tell people to worship Satan. It tells them they are already divine — that repentance, the cross, and a Savior are unnecessary because there is nothing to be saved from.

The "higher self" that New Age practitioners are taught to consult is not their own best wisdom. It is a familiar spirit that has positioned itself as their internal divine guide. The "channeled messages" that form the backbone of New Age scripture — *A Course in Miracles*, the Seth Material, the Abraham teachings — were received in states of trance or dissociation. They are demonic transmissions dressed as divine revelation. [1 Timothy 4:1](data-scripture="1 Timothy 4:1"): *"Now the Spirit speaketh expressly, that in the latter times some shall depart from the faith, giving heed to seducing spirits, and doctrines of devils."*

## How It Opens the Door

**Self as god removes accountability.** When you are divine, there is no sin — only "lower vibration." There is nothing to repent of. The blood of Christ becomes unnecessary. This is not a minor theological disagreement; it is the removal of the only mechanism by which human beings can be reconciled to God.

**Meditation practices invite spiritual entities.** New Age meditation — visualizing guides, opening chakras, accessing the Akashic Records — is structured spirit contact, regardless of the therapeutic language used to describe it. The entities encountered are familiar spirits, not higher selves or ascended masters.

**Channeled content transfers spiritual attachments.** Reading, listening to, or watching channeled material is not passive entertainment. The demonic entities that authored these teachings are drawn to the attention and assent they receive. Sustained engagement creates spiritual attachment.

**The denial of evil leaves people defenseless.** A worldview that calls evil an illusion and suffering a spiritual lesson has no framework for recognizing demonic attack. New Age practitioners who experience oppression interpret it as unresolved karma or a lesson to learn — and go deeper into the system that opened the door.

## What This Means for You Right Now

Here is the question that most New Age practitioners never get asked directly: *If all paths lead to God, why do the entities encountered in New Age practice consistently deliver the same message — that Jesus is one teacher among many, that the cross is unnecessary, that you are already divine?*

Every authentic encounter with the living God in Scripture produces the same response: prostration, terror, and the recognition of personal unworthiness ([Isaiah 6:5](data-scripture="Isaiah 6:5"), [Revelation 1:17](data-scripture="Revelation 1:17")). The encounters produced by New Age practice produce self-confidence, special status, and the sense that you have accessed knowledge unavailable to ordinary believers.

Those two experiences do not have the same source.

If you have engaged with New Age teaching — read channeled texts, consulted your "higher self," worked with energy guides — the first step is not complicated. Name it for what it is. [Acts 19:19](data-scripture="Acts 19:19") records that the Ephesian converts brought their magic books into a public square and burned them, valued at 50,000 pieces of silver. The act was public, costly, and complete. That is the standard.

---

*The system that tells you there is no enemy is the enemy's most effective tool. The next lesson examines one of the oldest forms of that system — the foundational framework beneath every occult practice.*`,
  },
  {
    order: 1,
    type: "READING" as const,
    title: "The Occult",
    content: `![The Occult](/demons-lessons/l23-occult.png)

## The Occult

He was twelve the first time he read about it in a library book. The word *occult* sounded exotic, ancient, powerful. The chapter on divination explained how Egyptian priests read the entrails of animals to determine the will of the gods. The chapter on necromancy described how the living could communicate with the dead. He thought it was history. He did not know it was an instruction manual.

Twenty years later he sat across from a deliverance minister who asked him when it started. He remembered the library book. He remembered thinking, even at twelve: *I want that kind of access.*

---

## What It Is

*Occult* means hidden. It covers every practice that seeks supernatural knowledge, power, or contact with spiritual beings through channels other than the God of Scripture. The complete inventory is in [Deuteronomy 18:10-12](data-scripture="Deuteronomy 18:10-12"): divination, observing times, enchanting, witchcraft, charming, consulting familiar spirits, wizardry, necromancy. God calls them *abomination* — not childish nonsense, not spiritual immaturity, but an abomination.

That word choice matters. God does not call these things an abomination because they are ineffective. He calls them an abomination because they work — but through the wrong power and toward the wrong end.

## The Demonic Deception

The occult operates on a single promise: access. Access to hidden knowledge, to power over circumstances, to contact with dimensions of reality unavailable through ordinary experience. This promise is partially fulfilled, and that partial fulfillment is the entire mechanism of the trap.

The demonic realm knows things. Familiar spirits have observed human history across millennia. They know family secrets. They can produce information that appears supernaturally accurate. They can manifest power that produces genuine, visible results. The person who seeks occult access and finds it working is not being deceived about whether it works — they are being deceived about who is doing the work and what the cost will be.

[2 Corinthians 11:14](data-scripture="2 Corinthians 11:14"): *"For Satan himself is transformed into an angel of light."* The occult does not announce itself as darkness. It announces itself as illumination. That is what the word *illuminati* — those who have received the hidden light — actually means.

## How It Opens the Door

**The initial contact establishes legal ground.** The first séance, the first tarot reading, the first spell, the first conscious attempt to contact supernatural intelligences outside of God — this is the moment of legal invitation. The entity that responds to this invitation does not leave when the session ends.

**Each level deepens the attachment.** Occult involvement almost universally follows a progression: curiosity → experimentation → dependency → servitude. The person who started with a horoscope ends up with a regular psychic. The person who started with a ouija board ends up with a ritual practice. The deepening is not accidental — it is the enemy's design.

**Occult involvement in the family line creates generational access.** When ancestors practiced divination, sorcery, or spiritism, the entities that were invited through their practice claim generational access. This explains the families where occult interest reproduces across generations with no direct transmission — the same spirits are operating down the bloodline.

## What This Means for You Right Now

The question is not whether you have fully committed to an occult system. The question is whether you have ever sought supernatural access through any channel outside of God.

Once. Curiously. As a teenager. At a party. Online. As an experiment.

That single moment of voluntary seeking is the legal moment — the invitation that the enemy treats as authorization to establish a foothold. [Ephesians 4:27](data-scripture="Ephesians 4:27"): *"neither give place to the devil."* The word is *topos* — a specific location, a legally claimed territory.

Identify the specific entry point. Name it. Repent for the act of seeking access from a source other than God. Renounce the entities that responded to that seeking. The blood of Jesus Christ is legally sufficient to revoke every claim.

---

*The occult is the category. The following lessons examine its most common specific forms — each one a different doorway into the same kingdom.*`,
  },
  {
    order: 2,
    type: "READING" as const,
    title: "Ouija Boards",
    content: `![Ouija Boards](/demons-lessons/l24-ouija.png)

## Ouija Boards

It was a sleepover. Six twelve-year-old girls in a basement. One of them had taken her older brother's board without asking. The planchette moved. It spelled the name of one girl's dead grandmother. It gave details — the name of the grandmother's cat, the town where she lived, the color of her kitchen.

The girl whose grandmother it was went home the next morning and stopped sleeping. For three months. The presence in her room at night was not her grandmother.

---

## What It Is

Parker Brothers marketed the Ouija board as a parlor game and sold it in the toy aisle. It is not a toy. It is a commercial simplification of the séance — a device designed to facilitate communication with spiritual entities through the combined attention and physical contact of multiple participants.

The name comes from the French and German words for "yes." It was patented in 1891. The ideomotor effect — the unconscious muscular movements of participants — explains some of the board's mechanical function. It does not explain why the board sometimes produces information that participants could not have known, communicates in languages they do not speak, or causes paranormal physical phenomena in the room where it is used.

## The Demonic Deception

The board's marketing as a game is the deception. The framing as entertainment removes the sense of spiritual gravity that accompanies deliberate séance work. The child or teenager who picks up a Ouija board at a party is performing the exact same spiritual act as a formal medium conducting a spirit-contact session — the invitation to non-human intelligences to communicate through a human-operated interface.

The entities that respond through Ouija boards are familiar spirits. They are not the deceased relatives they often claim to be. They have studied the deceased long enough to produce convincing details. The grandmother's cat, the kitchen color, the town — these are the details a demon that has observed a family for decades could easily provide. [Leviticus 20:27](data-scripture="Leviticus 20:27"): *"A man also or woman that hath a familiar spirit, or that is a wizard, shall surely be put to death."* The severity of the prohibition reflects the severity of what is being invited.

## How It Opens the Door

**The voluntary act of seeking is the legal invitation.** God's spiritual law does not distinguish between sincere practice and curious experimentation. The moment a person places their hands on the planchette and asks a question, they have performed a voluntary act of spirit contact. What responds to that contact has a legal claim to remain.

**Threshold effects are documented.** Many people who have used a Ouija board report a shift in spiritual atmosphere in their home or life afterward — nightmares, sensed presences, oppressive spiritual heaviness, an inability to shake the feeling of being watched. These are threshold effects: the entity that entered through the board does not confine itself to the session.

**Children are uniquely vulnerable.** The Ouija board's marketing to young people is spiritually catastrophic. Children have less developed discernment, a higher degree of spiritual openness, and a longer lifetime ahead of them for the entity that enters through a childhood session to operate. Adults who trace oppression to a childhood Ouija board session are not being dramatic.

## What This Means for You Right Now

If you have ever used a Ouija board — once, as a teenager, as a joke, at a party — you extended a spiritual invitation that you have probably never formally revoked.

Here is the specific action required: name the session aloud before God. Name when it happened, who was present, what was sought, what responded. Repent for the act of seeking spirit contact outside of God. Renounce every entity that entered through that contact. Declare the access revoked by the blood of Jesus Christ.

If a Ouija board is anywhere in your home — yours, your children's, stored in a closet — destroy it. Not the trash. Not a donation. Destroyed.

[Isaiah 8:19](data-scripture="Isaiah 8:19"): *"Should not a people seek unto their God? for the living to the dead?"*

---

*The Ouija board is direct and obvious. The next lesson examines a practice that does the same thing with far more cultural acceptance — blending Catholic imagery with African spiritism in a way that makes the spirit contact feel both sacred and legitimate.*`,
  },
  {
    order: 3,
    type: "READING" as const,
    title: "Santería",
    content: `![Santería](/demons-lessons/l25-santeria.png)

## Santería

He grew up in Miami. His grandmother kept an altar in the corner of her bedroom — seven glasses of water, candles in specific colors, a statue of Saint Barbara with a machete, cowrie shells, a small clay pot. She said Saint Barbara protected the family. She prayed the rosary every morning and lit candles for the orishas every evening. She saw no contradiction.

He was forty before he understood that the spiritual heaviness he carried — the pattern of men in his family dying young, the particular fear that lived at the base of his spine — had a name. And that his grandmother's altar, however lovingly maintained, was part of what had sustained it.

---

## What It Is

Santería emerged from the forced crossing of enslaved Yoruba people from West Africa to Cuba, Puerto Rico, and Brazil, where colonial Catholic structures demanded public Christianity. The Yoruba masked their orishas — divine intermediaries — behind Catholic saints. Shangó became Saint Barbara. Yemayá became Our Lady of Regla. Elegguá became the Holy Child of Atocha. The practice survived.

Today Santería has millions of practitioners across the Americas. Similar systems — Candomblé, Vodou, Umbanda — operate on the same foundational structure: the veneration of orishas or loa through ritual offerings, animal sacrifice, and in some cases, deliberate spiritual possession known as *montarse* — being "ridden" by the deity.

## The Demonic Deception

The deep deception of Santería is its fusion of genuine Catholic devotion with demonic entity worship. A practitioner who recites the rosary and offers rum to Elegguá in the same afternoon does not experience spiritual dissonance — they experience spiritual fullness. The two systems feel complementary because the enemy is careful to preserve the form of Christianity while replacing its content.

What enters an initiate during the *kariocha* ceremony — when an orisha is "seated" on the head through days of ritual sacrifice and ceremony — is not a benevolent Yoruba deity. It is a demon that has been accommodating the Yoruba's understanding of that entity for centuries. The possession is real. The entity that takes over the initiate's body and speaks in its voice and moves in its manner is real. It is demonic.

[1 Corinthians 10:20](data-scripture="1 Corinthians 10:20"): *"The things which the Gentiles sacrifice, they sacrifice to devils, and not to God: and I would not that ye should have fellowship with devils."*

## How It Opens the Door

**Blood covenants create binding spiritual contracts.** Animal sacrifice in Santería is a blood covenant offering. Blood covenant is the most binding form of spiritual agreement in the biblical framework. The entities that receive these offerings gain significant legal ground through the transaction.

**Generational access through family altars.** Families with a history of Santería practice carry generational demonic assignments. The orishas that were fed by a grandmother's altar for decades do not leave when she dies. They follow the bloodline, particularly targeting subsequent generations who have not formally broken the covenant.

**Catholic syncretism disarms discernment.** The presence of Catholic imagery in Santería environments makes the practice feel spiritually safe to practitioners raised with Catholic backgrounds. They identify with the saints rather than examining what is being asked of the entities behind them.

## What This Means for You Right Now

If Santería, Candomblé, Vodou, or any similar syncretic practice is in your family background — grandparents' altars, initiations that family members underwent, objects and rituals maintained for "protection" — you are dealing with generational spiritual contracts that need specific revocation.

The breaking is this: name the orishas or loa that were served in your family line. Renounce the blood covenants and offerings made on your family's behalf. Declare that the blood of Jesus Christ — the only covenant blood with genuine spiritual authority — cancels every contract. Remove and destroy every altar object, every ritual item, every object associated with the practice.

[Colossians 1:13](data-scripture="Colossians 1:13"): *"Who hath delivered us from the power of darkness, and hath translated us into the kingdom of his dear Son."* The authority that removes you from darkness is the same authority that revokes the contracts darkness holds.

---

*The orishas demanded blood and offerings. The next lesson examines a system that demands nothing physically — only your attention and your trust.*`,
  },
  {
    order: 4,
    type: "READING" as const,
    title: "Tarot Cards",
    content: `![Tarot Cards](/demons-lessons/l26-tarot.png)

## Tarot Cards

She bought the deck because the artwork was beautiful. The Rider-Waite illustrations — the High Priestess with her pillars and pomegranates, the Hermit with his lantern, the Tower struck by lightning — looked like religious art. She thought of it as a journaling tool. A way to access intuition.

The first reading she did for a friend was startlingly accurate. The friend cried. Said she felt seen. Asked when they could do it again.

Within eight months, she was reading for sixty people. Charging eighty dollars a session. Doing three readings a day. She could not stop — not because of the income, but because something in her lit up every time she touched the cards. Something that went away when she put them down. Something that increasingly felt like it was not hers.

---

## What It Is

The tarot deck emerged in 15th-century northern Italy as a card game. Its transformation into a divination tool came in the 18th century when French occultists attached Kabbalistic, astrological, and Hermetic symbolism to the 78 cards. The Major Arcana — the 22 archetypal cards — map onto the Kabbalistic Tree of Life. The four suits of the Minor Arcana correspond to the four elements and to the four Tetragrammaton letters of the divine name.

In its current form, tarot is not a neutral psychological projection tool. It is a spiritual intelligence system — a structured interface through which familiar spirits deliver information, counsel, and guidance to practitioners and their clients.

## The Demonic Deception

What makes tarot convincing is not the cards themselves. The cards are paper. What makes it convincing is the familiar spirit providing the interpretive intelligence that makes a reading feel specific, accurate, and personally resonant.

A reading that should statistically produce generic platitudes instead produces: the name of a relationship problem, the specific emotional wound, the accurate timeline of an event, the detail that only the client knows. This accuracy is not the cards — it is the familiar spirit that has been observing the client and reporting to the reader.

The danger escalates with practice. Long-term tarot use creates what practitioners call spiritual "sensitization" — an increasing attunement to the entities involved. Readers describe feeling the cards "speak to them," feeling pulled to read compulsively, losing the ability to make decisions without consulting the deck. This is familiar spirit dependency in progressive stages: consultation → compulsion → control.

[Leviticus 19:31](data-scripture="Leviticus 19:31"): *"Regard not them that have familiar spirits, neither seek after wizards, to be defiled by them: I am the LORD your God."*

## How It Opens the Door

**The first accurate reading establishes trust and deepens engagement.** The familiar spirit's goal in the first reading is not to cause harm but to produce enough accuracy to ensure the practitioner and client return. The hook is always accuracy. The bondage comes later.

**Every reading is a spirit-contact transaction.** The act of consulting the tarot is spiritually identical to visiting a medium. The mechanism differs. The transaction is the same: seeking information or guidance from familiar spirits through an occult interface.

**Spiritual sensitization creates dependency.** The "gift" that readers develop through sustained tarot practice is not psychic ability. It is an increasingly refined relationship with the familiar spirit assigned to the practice. The gift is the bondage. The reader who cannot function without the cards has been successfully captured.

## What This Means for You Right Now

Do you have tarot cards in your home? Have you had readings done — at a fair, online, by a friend, "just to see"?

Every reading done on your behalf was a familiar spirit accessing your life through an authorized channel. The authorization came from your presence, your questions, your assent.

Repent for every reading received or given. Renounce the familiar spirits involved. Destroy every deck. This is not spiritual overcaution — it is the same action that Acts 19 records new believers taking with their magic books. The cost then was 50,000 pieces of silver. The cost required of you is the willingness to let go.

---

*Tarot works because familiar spirits staff the system. The next lesson examines what happens when there is no deck — when the familiar spirit communicates through a human intermediary directly.*`,
  },
  {
    order: 5,
    type: "READING" as const,
    title: "Psychics",
    content: `![Psychics](/demons-lessons/l27-psychics.png)

## Psychics

She had been to three therapists in two years after her son died. She could not get past it. A friend mentioned a medium — someone who had connected her with her father after he passed. She said it brought closure. The grieving mother drove an hour and paid $200.

The medium said her son's name correctly. Said he was wearing the blue jacket she had buried him in. Said he wanted her to know about the argument they'd had the week before he died — the specific words, the way the door had sounded when it closed. She wept for forty minutes. She said it was the most healing experience of her life.

She did not know that her son was not there. She did not know what had come home with her.

---

## What It Is

The psychic industry generates billions annually — storefront readers, television mediums, phone services, online platforms. Behind the variety of presentation is a single spiritual mechanism: familiar spirits providing information through human intermediaries who have opened themselves, voluntarily or through ancestral access, to demonic entity communication.

[Isaiah 8:19](data-scripture="Isaiah 8:19"): *"And when they shall say unto you, Seek unto them that have familiar spirits, and unto wizards that peep, and that mutter: should not a people seek unto their God? for the living to the dead?"* This verse is 2,700 years old and describes your city's yellow pages.

## The Demonic Deception

The medium's accuracy is the entire mechanism of deception. The son's name. The blue jacket. The argument's exact words. These are the details a familiar spirit that has observed a family for years — that has been present in the room for every conversation, that knows the relationship's entire history — can provide. The medium is not channeling the dead. The dead cannot be channeled ([Hebrews 9:27](data-scripture="Hebrews 9:27")). The medium is accessing a familiar spirit's knowledge of the deceased.

The apparent communication produces real emotion — real grief processing, real sense of closure, real experience of connection. The emotional experience is genuine. The source of the information is demonic. And the familiar spirit that provided the performance does not leave when the session ends. It follows the client home.

## How It Opens the Door

**The transfer problem.** Visiting a psychic is not a passive information exchange. Familiar spirits pass between practitioners and their clients. The entity that produced accurate readings in the session has now established access to the client. This is why people who visit psychics — even once, even for bereavement — often report subsequent spiritual disturbance: nightmares, felt presences, obsessive thoughts about what was said.

**Leviticus 20:6 is an active warning.** *"And the soul that turneth after such as have familiar spirits, and after wizards, to go a whoring after them, I will even set my face against that soul."* God does not merely prohibit the practice — He describes His response to those who pursue it. The word is deliberate: pursuing familiar spirits is spiritual adultery against the God who offers His own counsel freely.

**Grief vulnerability creates a specific exposure window.** The psychic industry knows this and markets specifically to the bereaved. People in acute grief are more spiritually permeable, more desperately seeking contact, and less likely to apply discernment. The most dangerous time to visit a psychic is the time when it is most tempting.

## What This Means for You Right Now

Have you visited a psychic, medium, or spiritual reader — for any reason, at any level of seriousness?

Grief is real. The desire to know that a lost loved one is at peace is real and human and understandable. But the God who invented grief also provides the only legitimate comfort available to the bereaved. [1 Thessalonians 4:13-14](data-scripture="1 Thessalonians 4:13-14"): *"But I would not have you to be ignorant, brethren, concerning them which are asleep, that ye sorrow not, even as others which have no hope. For if we believe that Jesus died and rose again, even so them also which sleep in Jesus will God bring with him."*

The hope is in the resurrection. Not in a $200 session with a familiar spirit that knew your son's jacket color.

Repent for the visit. Renounce the familiar spirit that was accessed. Break its continued legal claim on your life. Receive the comfort that [2 Corinthians 1:3-4](data-scripture="2 Corinthians 1:3-4") promises — from the Father of mercies, not from a familiar spirit that wears the faces of the dead.

---

*Psychics sell access to the familiar spirit directly. The next lesson examines a practice that does something more aggressive — it teaches people to become the controlling force in the spiritual transaction.*`,
  },
  {
    order: 6,
    type: "READING" as const,
    title: "Witchcraft",
    content: `![Witchcraft](/demons-lessons/l28-witchcraft.png)

## Witchcraft

She was not in a coven. She was in a church. She volunteered in the nursery. She brought casseroles to grieving families. She also, without ever using the word, practiced witchcraft — because what she did consistently, in every relationship, was manipulate. She leveraged information. She withheld access. She used emotional pressure so subtly that people did what she wanted while believing it was their own idea.

Her pastor preached on [1 Samuel 15:23](data-scripture="1 Samuel 15:23") one Sunday. *"Rebellion is as the sin of witchcraft, and stubbornness is as iniquity and idolatry."* She felt something cold move through her chest and thought it was the Holy Spirit convicting her of pride.

It was the Spirit of Witchcraft recognizing itself.

---

## What It Is

Witchcraft, at its core, is the attempt to impose your will on the spiritual realm — to manipulate spiritual forces to produce desired outcomes apart from submission to God. Strip away the cauldrons and the ceremonial details, and that is the essential structure of every form of witchcraft: self-will asserting authority over divine will.

This is why [1 Samuel 15:23](data-scripture="1 Samuel 15:23") uses witchcraft to describe Saul's disobedience. Samuel is not addressing a witch. He is addressing a king who preferred his own strategic judgment to God's explicit command. The structure of that choice — self-will over God's will, personal strategy over covenant obedience — is the spiritual signature of witchcraft, regardless of whether any ritual occurred.

## The Demonic Deception

The Spirit of Witchcraft operates through a specific set of tools that are recognizable across every culture's expression of the practice:

**Control.** The need to ensure that specific outcomes occur, specific people behave in specific ways, and specific spiritual forces comply with personal decree. In the church, this manifests as manipulation, emotional leverage, and information management.

**Intimidation.** The projection of spiritual threat designed to neutralize opponents. Jezebel's message to Elijah in [1 Kings 19:2](data-scripture="1 Kings 19:2") produced such terror in the greatest prophet of his generation that he fled and asked God to let him die. This was not ordinary fear. It was a direct spiritual assault via the Spirit of Witchcraft operating through a human being.

**Counterfeit supernatural.** The Spirit of Witchcraft produces genuine signs. Pharaoh's magicians replicated the first three plagues. Simon the Sorcerer in [Acts 8](data-scripture="Acts 8:9") commanded such genuine supernatural power that Samaria called him "the great power of God." The supernaturalism was real. The source was wrong.

## How It Opens the Door

**Practicing any form of spell or intentional ritual magic** creates covenant with the demonic system that powers it. The intentions of the practitioner matter morally. They do not eliminate the spiritual consequences.

**Operating in the Spirit of Witchcraft relationally** — using emotional manipulation, guilt, and control as governing tools in relationships — opens a door to the principality that powers those behaviors. The person who has never cast a spell but has spent thirty years controlling everyone around them through emotional leverage may be just as deeply bound.

**Associating with practitioners** without renouncing their influence creates spiritual transfer. The spiritual authority a practitioner operates under does not stop at their personal boundary.

## What This Means for You Right Now

[1 Samuel 15:23](data-scripture="1 Samuel 15:23") is the most personally uncomfortable verse in this course — because it extends witchcraft's definition past ceremony into character. Ask yourself not "have I cast spells?" but rather: *Where do I consistently attempt to control outcomes that belong to God?*

The relationship you manage. The future you insist on securing. The person you manipulate into behaviors that serve your comfort. The plans you cannot release.

The antidote to witchcraft is not passivity. It is submitted authority — the [James 4:7](data-scripture="James 4:7") pattern: *"Submit yourselves therefore to God. Resist the devil, and he will flee."* Submit first. Authority flows from submission. Witchcraft is the attempt to access authority without submission, and the only power available outside God's authority is demonic.

---

*Witchcraft seeks to control the spiritual realm. The next lesson examines what happens when a person invites a spirit to control them — and calls it guidance.*`,
  },
  {
    order: 7,
    type: "READING" as const,
    title: "Spirit Guides",
    content: `![Spirit Guides](/demons-lessons/l29-spirit-guides.png)

## Spirit Guides

He was a counselor — a licensed therapist with fifteen years of practice. He had done Jungian analysis, EMDR, somatic work. During a meditation retreat, he encountered what he described as a radiant being who said it had been with him since before his birth, sent to guide his work with clients. He called it his "inner teacher." He began to feel its presence during sessions. It told him things about clients that he had not been told. His practice became remarkably effective.

He could not explain the effectiveness clinically. He did not want to examine it too closely. The results were real. The clients were healing. Why ask questions about the source?

Because what you cannot name, you cannot evict.

---

## What It Is

Spirit guides are entities presented as personal divine helpers assigned to each human being — companions who provide wisdom, warning, and direction from the spirit realm. They appear in New Age practice, shamanism, and increasingly in mainstream therapeutic settings where they are rebranded as "inner wisdom," "the higher self," or "intuition."

The encounter typically occurs during meditation, altered states, near-death experiences, or psychedelic sessions. The being presents as radiant, wise, compassionate, and intimately familiar with the person's history and needs. It offers guidance. It asks only that the person listen.

## The Demonic Deception

[2 Corinthians 11:14](data-scripture="2 Corinthians 11:14"): *"And no marvel; for Satan himself is transformed into an angel of light."*

The appearance of a spirit guide is designed to be convincing. It is warm where demons in horror films are cold. It is helpful where demons in theology are destructive. It presents itself as a known quantity — "your guide since before birth" — to establish a sense of permanent, covenantal relationship.

What it is doing, from the first moment of contact, is establishing itself as the governing authority over the person's decision-making. Over time, the relationship progresses: consultation → dependency → the guide's voice becoming more authoritative than Scripture → an inability to function without its direction. The Holy Spirit does not produce dependency. He produces freedom. [2 Corinthians 3:17](data-scripture="2 Corinthians 3:17"): *"Now the Lord is that Spirit: and where the Spirit of the Lord is, there is liberty."*

A spirit that produces dependency is not the Holy Spirit.

## How It Opens the Door

**The voluntary invitation is the legal act.** The person who seeks a spirit guide — through meditation, shamanic journey, or psychedelic ceremony — performs a voluntary act of spiritual invitation. What arrives in response to that invitation is not determined by the person's intent but by what is available and interested in the territory being offered.

**The guide assumes the Holy Spirit's role.** This is its defining feature and its most catastrophic function. It positions itself as the person's internal divine counsel — the voice of God, the wisdom of the universe, the inner teacher. Once this substitution is established, the genuine Holy Spirit is crowded out. The person has all the subjective experience of spiritual guidance, with a demonic source producing it.

**Progressive surrender expands the entity's domain.** The more a person consults the guide, the more authority it accumulates over different areas of life. This is why people who have worked with spirit guides for years often describe a quality of not knowing their own mind — a difficulty distinguishing their own thoughts from the guide's voice.

## What This Means for You Right Now

If you have a spirit guide — if there is a voice, presence, or inner entity that has guided you that is not identifiably the Holy Spirit speaking through the Word of God — you are in a relationship that needs to end.

The Holy Spirit does not require you to seek Him through altered states. He is already present in every born-again believer. He speaks through Scripture, prayer, and the community of the body of Christ. He does not present Himself as a distinct entity with a name and a personality separate from God. He does not compete with Jesus for attention.

Renounce the spirit guide by name if it has given you one. Renounce every session, every decision made on its counsel, every relationship with other entities it introduced. Command it to leave in the name of Jesus Christ. Ask the Holy Spirit — the real one — to fill every space the counterfeit occupied.

---

*The spirit guide substituted itself for the Holy Spirit. The next lesson examines objects that substitute for God's provision — beautiful things that carry demonic attachment in proportion to their spiritual dedication.*`,
  },
  {
    order: 8,
    type: "READING" as const,
    title: "Crystals and Crystal Healing",
    content: `![Crystals](/demons-lessons/l30-crystals.png)

## Crystals and Crystal Healing

She is a believer. She tithes. She prays every morning. She also has forty-three crystals on her windowsill, organized by color and chakra association. She bought them at different times, from different sellers, for different purposes. Amethyst for peace. Black tourmaline for protection. Selenite for "clearing energy." Rose quartz for love.

Her pastor preached on idolatry last month. She thought the sermon was for the people who worshipped career and money. She did not connect it to the windowsill.

She does not understand why, despite genuine faith and consistent practice, a spiritual heaviness in her home has never fully lifted.

---

## What It Is

Crystal healing is the use of mineral stones as spiritual and energetic healing tools, based on the belief that different stones carry different vibrational frequencies that interact with the body's energy systems. It is integral to New Age practice and has entered mainstream wellness culture through Instagram, boutique shops, and yoga studios.

The chakra system that crystals are used to "balance" is Hindu theology. The energy centers they are meant to align are not anatomical structures — they are components of a spiritual cosmology that belongs to a religious tradition that Scripture classifies under the prohibition of [Deuteronomy 4:19](data-scripture="Deuteronomy 4:19"). The crystals themselves are creation — beautiful, but inert. What makes them spiritually significant is not their atomic structure. It is what they have been dedicated to.

## The Demonic Deception

The deception is aesthetic. Crystals are genuinely beautiful. Selenite glows. Amethyst is purple and cathedral-shaped. Labradorite shifts color in the light like something alive. The beauty is real. The spiritual function assigned to them is demonic.

[1 Corinthians 10:20](data-scripture="1 Corinthians 10:20"): *"The things which the Gentiles sacrifice, they sacrifice to devils, and not to God."* Anything created for, dedicated to, or used within a spiritual system outside of Jesus Christ becomes a vehicle for the demonic entities that system serves. The crystal sold at a New Age shop, blessed by the seller, assigned a specific spiritual function within the chakra system, and placed in your home with intention — is an idol. Not a metaphorical idol. An actual spiritual object with a demonic attachment.

[Deuteronomy 7:26](data-scripture="Deuteronomy 7:26"): *"Neither shalt thou bring an abomination into thine house, lest thou be a cursed thing like it."* The contamination is transferable.

## How It Opens the Door

**Spiritual systems do not become neutral through ignorance.** You do not need to believe in chakras for a crystal dedicated to a chakra function to carry its spiritual attachment. The dedication was made by the seller, the manufacturer, the tradition that produced the practice. Your ignorance of the system's religious origins does not sanitize the object.

**Placement in the home creates an anchor point.** Objects with demonic attachments function as anchor points — locations within your home where the spiritual entities associated with the object have established a presence. This explains the persistent spiritual atmospheres in homes that cannot be shifted through prayer alone, until the source objects are removed.

**The combination effect amplifies.** Multiple dedicated objects create multiple anchor points. Forty-three crystals, an abundance altar, a dream catcher, a Buddha figurine for "good energy" — the cumulative spiritual effect of these objects in a home is not decorative.

## What This Means for You Right Now

Look at your home. Not at what you intended when you bought things. At what the objects were dedicated to.

The question is not: *Did I mean this as worship?* The question is: *What was this made for?*

Every crystal bought from a New Age seller, dedicated to a chakra function, or used in any energy healing context carries a spiritual assignment that was determined by the system that produced it. That assignment is not neutralized by your Christian faith, your good intentions, or the cross you hung on the wall beside it.

Remove them. Destroy them. Not the garage, not a donation where someone else receives the attachment. Destroyed. Then pray over the space — anointing oil, Scripture aloud, worship. The space that is swept needs to be filled.

---

*Crystals are dedicated to a system built on the stars and the body's supposed energy architecture. The next lesson examines the most ancient expression of that star-based system.*`,
  },
  {
    order: 9,
    type: "READING" as const,
    title: "Horoscopes and Astrology",
    content: `![Horoscopes and Astrology](/demons-lessons/l31-astrology.png)

## Horoscopes and Astrology

She checks it every morning. Not because she believes it, exactly. More like how you knock on wood — a habit without conviction. Today's horoscope says her moon is in Scorpio and she should avoid confrontational conversations. She reschedules a difficult phone call she has been dreading. She tells herself she would have rescheduled anyway.

What she does not know: the Babylonian priests who built the astrological system she is consulting were not building a psychology tool. They were studying the movements of gods. The planet she calls Saturn was Ninib. The planet she calls Venus was Ishtar. Consulting the daily horoscope is, in the spiritual architecture that built it, consulting the planetary principalities — the demonic beings that ancient cultures experienced as the gods behind the stars.

---

## What It Is

Astrology is the belief that the positions of celestial bodies at the moment of a person's birth, and at subsequent moments, determine personality, fate, and circumstance. It originated in ancient Babylon — possibly the earliest recorded systematic occult system in human history — and was developed by priests who genuinely believed they were reading the will of planetary deities.

It has never not been a religious system. Every planet in the Western astrological system carries the name of a Roman deity — which is a Roman translation of a Babylonian deity. The "spiritual meaning" of each planetary position derives from the mythological character of the deity associated with that body. Jupiter in your chart brings the favor of Marduk. Venus in your chart brings the influence of Ishtar. The modern user of a horoscope app is consulting the same spiritual framework that produced the priests who read omens for Nebuchadnezzar.

## The Demonic Deception

The contemporary presentation of astrology as a personality and self-understanding tool — "I'm a Scorpio, so I'm intense" — is the softened version of a system that was, at its origin, a direct inquiry into the will of principalities.

[Isaiah 47:13-14](data-scripture="Isaiah 47:13-14") addresses Babylon specifically: *"Thou art wearied in the multitude of thy counsels. Let now the astrologers, the stargazers, the monthly prognosticators, stand up, and save thee from these things that shall come upon thee. Behold, they shall be as stubble; the fire shall burn them."*

The Babylonian system consulted the principalities behind the planets for guidance, timing, and protection. The modern person who checks their horoscope before making a decision is performing the same spiritual act — asking the principalities represented by the planetary positions to direct their path. The fact that they don't believe in it changes the moral seriousness but not the spiritual transaction.

## How It Opens the Door

**Repeated consultation establishes a relationship with the spiritual system behind it.** The more a person structures life decisions around astrological guidance, the more deeply they engage the principalities that system serves. This is true whether or not the person holds conscious belief in those principalities.

**Submitting your decisions to astrological timing replaces God's sovereignty.** [Proverbs 3:5-6](data-scripture="Proverbs 3:5-6"): *"Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths."* The person who waits for Mercury to go direct before making decisions has replaced "acknowledge him" with "acknowledge Hermes."

**Birth chart consultations create specific spiritual assignments.** A detailed astrological reading assigns spiritual meaning and life direction based on the positions of principalities at your birth — effectively submitting your identity narrative to a demonic interpretive framework.

## What This Means for You Right Now

Delete the app. Close the tab. Cancel the email newsletter.

This is not about whether astrology is "accurate." Some of it is — familiar spirits staff the system and can make it work well enough to keep you coming back. The question is not accuracy. The question is whose counsel you are seeking.

[Isaiah 8:19](data-scripture="Isaiah 8:19"): *"Should not a people seek unto their God?"* God offers His own counsel — through Scripture, through prayer, through the Holy Spirit, through the community of believers, through providential circumstances. The person who seeks God's guidance through the planetary positions associated with Babylonian deities has not supplemented God's counsel. They have replaced it.

---

*The stars were used to read the will of principalities. The next lesson examines what happens when those principalities are invited directly into the body itself.*`,
  },
  {
    order: 10,
    type: "READING" as const,
    title: "Yoga",
    content: `![Yoga](/demons-lessons/l32-yoga.png)

## Yoga

She was not spiritual about it. She was a pediatric nurse who needed to manage stress and keep her back from seizing up. Her gym offered a Tuesday lunchtime class. The teacher was kind and the studio smelled of eucalyptus. The teacher occasionally said "set an intention" and "honor your body," but mostly it was just stretching.

Eighteen months in, she began to feel something during *Shavasana* — the final resting pose. A presence. Warm, then cold, then warm again. She mentioned it to the teacher, who told her this was spiritual awakening and gave her a book about the chakras. She did not sleep well for the next four months.

She did not connect the two things until a friend who knew something about deliverance prayed with her and asked when the nightmares started.

---

## What It Is

The word *yoga* means "union" in Sanskrit — specifically, union with Brahman, the universal divine consciousness of Hindu theology. The goal of traditional yoga is the dissolution of individual self into the divine ground of being. The postures — *asanas* — are not exercises that happen to have Hindu names. They are acts of theological devotion, designed as physical expressions of submission to specific deities.

*Surya Namaskar* — the sun salutation — is an offering to Surya, the sun deity. The 84 classical asanas each correspond to a specific deity in the Hindu pantheon. The body placed in these positions is, within the spiritual framework the system was built on, enacting worship.

Modern Western yoga teachers almost universally claim this is ancient history — that contemporary yoga is purely physical. What they are describing is their own ignorance of what the system they are transmitting was designed to do. The system does not require the practitioner's conscious participation in its spiritual function.

## The Demonic Deception

The deception is in the desacralization. By stripping yoga of its religious framing and presenting it as exercise, the Western wellness industry removed the only warning signal that might have caused discerning Christians to avoid it.

The postures are the same. The breathing techniques are the same. The *Shavasana* at the end — deliberately inducing a state of passive open receptivity in every practitioner simultaneously — is the same. The spiritual mechanics of the practice function whether the practitioner intends them to or not.

And the crown of the system — the state that classical yoga is designed to produce — is *kundalini awakening*: the activation of the serpentine energy believed to lie coiled at the base of the spine. The Sanskrit word is unambiguous. *Kundalini* means "coiled serpent." [Revelation 12:9](data-scripture="Revelation 12:9"): *"And the great dragon was cast out, that old serpent, called the Devil, and Satan."* What yoga is designed to activate in the human body, Scripture identifies as the enemy.

## How It Opens the Door

**Shavasana is the most dangerous moment in a yoga class.** The final resting pose deliberately induces a state of physical stillness and mental passivity — the exact condition that Jesus describes in [Matthew 12:43-45](data-scripture="Matthew 12:43-45") as an empty, swept house ready for occupation. Every participant in every yoga class ends their practice in precisely the state that Jesus warned about.

**Progressive practice deepens spiritual exposure.** A single class is less dangerous than a sustained practice. But even a single class that produces altered states, felt presences, or what practitioners call "spiritual experiences" has opened a door.

**Kundalini awakening is an emergency.** If you have experienced what practitioners describe as kundalini awakening — involuntary physical movements, heat moving up the spine, temporary psychic phenomena, vocalizations, intense euphoria or terror — you have experienced the activation of demonic energy in your body's nervous system. This requires specific targeted deliverance ministry, not merely prayer for peace.

## What This Means for You Right Now

This is the lesson that will generate the most resistance, because yoga is embedded in Christian women's retreat centers, Christian wellness programs, and the weekly schedules of millions of church-attending believers who have been told it is neutral.

Here is the question: would you lead your congregation in a series of poses that honor Surya, Vishnu, and Shiva, while inducing a state of physical passivity and calling it exercise? Because that is what a yoga class is, stripped of the desacralizing language.

Stop the practice. Renounce every session. Pray specifically over your spine and nervous system, pleading the blood of Jesus Christ. If you have experienced kundalini phenomena, seek deliverance prayer from an experienced minister. Replace the practice with physical exercise that does not require your body to enact another religion's worship.

---

*Yoga invited the serpent into the body through physical posture. The next lesson examines a different kind of covenant violation — the one that happens in the marriage bed.*`,
  },
  {
    order: 11,
    type: "READING" as const,
    title: "Adultery",
    content: `![Adultery](/demons-lessons/l33-adultery.png)

## Adultery

He told himself it was one mistake. That he had ended it. That his marriage was fine now — better, even, because the guilt had made him more attentive. His wife did not know. The affair partner had moved out of state. The marriage had recovered on its own.

What he did not account for: the soul tie he had formed in eighteen months of a second relationship was still active. The demonic spirit that had entered through the covenant violation was still present. His wife experienced it as a vague spiritual coldness she could not name — a sense that something was missing from intimacy, a persistent feeling of wrongness that no amount of therapy resolved. Their pastor advised more date nights. What they needed was deliverance.

---

## What It Is

Adultery is sexual union outside the marriage covenant. [Genesis 2:24](data-scripture="Genesis 2:24"): *"Therefore shall a man leave his father and his mother, and shall cleave unto his wife: and they shall be one flesh."* The marriage covenant creates a spiritual reality — a "one flesh" union that establishes a shared spiritual canopy over both spouses and, through them, their household.

When that covenant is violated, the canopy tears. [Proverbs 6:32](data-scripture="Proverbs 6:32"): *"But whoso committeth adultery with a woman lacketh understanding: he that doeth it destroyeth his own soul."* This is not metaphor about consequences. It is a description of what happens spiritually when the covenant architecture of marriage is violated.

## The Demonic Deception

The deception of adultery is almost always a package: emotional needs being met, physical desire, a narrative about the marriage being already dead before the affair began. The enemy is not subtle about this — he simply provides a convincing set of justifications for a decision that was already forming.

What the deception conceals: every sexual union outside of covenant creates a soul tie. [1 Corinthians 6:16](data-scripture="1 Corinthians 6:16"): *"Know ye not that he which is joined to an harlot is one body? for two, saith he, shall be one flesh."* The soul tie formed in adultery carries the spiritual history of the affair partner — their demonic attachments, their sin patterns, their generational curses — into the adulterer's life. The affair ends. The soul tie does not.

## How It Opens the Door

**The covenant tear creates an access point.** The marriage covenant, when intact, functions as a protective spiritual structure. Its violation is not merely moral failure — it is a structural breach that demonic forces enter through. The Spirit of Lust that facilitated the initial affair now has covenantal access to the household through the tear.

**The offended spouse carries wounds that become toeholds.** Bitterness, unforgiveness, and betrayal trauma in the innocent spouse create their own legal ground for demonic operation — not through their sin but through the unhealed wounds that the adulterer's sin produced. This is one reason why undisclosed adultery in a marriage poisons the spiritual atmosphere for everyone in the household, including children, even when no one knows why.

**The searing of conscience is progressive.** [1 Timothy 4:2](data-scripture="1 Timothy 4:2"): *"speaking lies in hypocrisy; having their conscience seared with a hot iron."* Sustained unrepented adultery progressively deadens moral sensitivity. The first affair produces crushing guilt. The fifth produces a sophisticated theology of why it cannot be helped.

## What This Means for You Right Now

If you have committed adultery — whether disclosed or not, whether the marriage survived or not — the soul ties formed in that relationship are still active unless they have been specifically addressed.

Here is the specific action: name each person with whom an adulterous relationship occurred. For each one, pray: *In the name of Jesus Christ, I break the soul tie between myself and [name]. I take back every part of my soul given in that union. I release every part of their soul that bonded to mine. I close every door that relationship opened.*

Then bring it to your spouse if you have not. This is not about destroying the marriage — it is about doing what undisclosed adultery has already done to the spiritual canopy, but this time with the materials of genuine repentance and covenant restoration.

Restoration is possible. [1 Corinthians 6:11](data-scripture="1 Corinthians 6:11"): *"Such were some of you: but ye are washed."* The past tense matters. Were. Not are.

---

*The adulterous soul tie is formed through deliberate relational choice. The next lesson examines the soul tie that forms without physical contact — through a screen, alone, in the dark.*`,
  },
];

async function main() {
  console.log(`Creating lessons in chapter ${CHAPTER_ID}...\n`);
  for (const lesson of lessons) {
    const created = await db.courseLesson.create({
      data: { chapterId: CHAPTER_ID, ...lesson },
    });
    console.log(`  ✓ [${created.order}] ${created.title}`);
  }
  console.log("\nBatch 1 done.");
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
