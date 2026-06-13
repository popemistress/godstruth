/**
 * seed-demons-course.ts
 *
 * Creates (or re-creates) the "Demons — The Study of Evil Spirits" course
 * with 5 Parts, 12 Lessons, and 6 Supplements.
 *
 * Source: Compiled demonology texts (demo.md)
 *
 * Usage: pnpm tsx --env-file=.env.local scripts/seed-demons-course.ts
 */

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// ─── Lesson Content ────────────────────────────────────────────────────────────

const LESSONS: Record<string, string> = {

  // ── Part I ─────────────────────────────────────────────────────────────────

  "L1": `
## What Are Demons? — The Biblical View

Demons are not figments of imagination, symbols of psychological struggle, or metaphors for evil in the abstract. The Bible presents them as **real, personal, intelligent spiritual beings** who actively oppose the purposes of God and seek the destruction of human souls.

### The Nature of Demons

Scripture consistently describes demons as **unclean spirits** (Matthew 10:1), **evil spirits** (Luke 7:21), and **familiar spirits** (Leviticus 20:6). They are not merely impersonal forces but possess personality, will, intellect, and emotion. They know who Jesus is and tremble at His name (James 2:19). They speak, reason, deceive, and strategize.

Demons are **incorporeal** — they have no physical body — yet they can produce physical effects. They cause disease (Matthew 9:33), insanity (Mark 5:1-20), muteness (Matthew 9:32), and seizures (Mark 9:17-29). Their power operates in the spiritual realm but manifests visibly in the material world.

### Where Did Demons Come From?

The Bible does not explicitly state the origin of demons, but the weight of both Scripture and the theological tradition points to a single answer: **demons are fallen angels**. When Lucifer rebelled against God, he persuaded a multitude of angels to join him. These fallen spirits became the demons that now roam the earth, seeking whom they may devour (1 Peter 5:8).

> Ezekiel 28:17 — "Thine heart was lifted up because of thy beauty, thou hast corrupted thy wisdom by reason of thy brightness."

The Book of Revelation records that Satan drew **a third of the stars of heaven** with him in his fall (Revelation 12:4). This vast number — perhaps hundreds of millions — explains the ubiquity of demonic activity and the persistence of evil across every culture and age.

### Demonic Activity in the Biblical Narrative

From Genesis to Revelation, demons appear as active agents of destruction. In the Old Testament, they are associated with idol worship (Deuteronomy 32:17, Psalm 106:37). In the Gospels, they are the primary adversaries Jesus confronts in His ministry — He casts them out with a word, demonstrating His absolute authority.

> Mark 1:34 — "And he healed many that were sick of divers diseases, and cast out many devils; and suffered not the devils to speak, because they knew him."

The apostles continued this ministry. Philip preached in Samaria, and unclean spirits, crying with loud voice, came out of many (Acts 8:7). Paul cast a spirit of divination out of a young woman in Philippi (Acts 16:18). The early Church understood demons as real, present, and subject to the authority of Christ.

### The Central Truth

Demons are not equal and opposite powers to God. They are **created beings who rebelled**, and their rebellion is temporary. Their fate is sealed: the lake of fire awaits them (Revelation 20:10). Until that day, they rage against God and His people — but their defeat is certain.
`,

  "L2": `
## Lucifer's Fall — The Rebellion That Changed Everything

The origin of evil in the universe is not a mystery of metaphysics but a **recorded act of willful rebellion**. Lucifer, the highest and most beautiful of the created angels, chose pride over obedience — and in that choice, introduced evil into a world God had made perfectly good.

### Who Was Lucifer?

The prophet Ezekiel gives us the clearest portrait, though he addresses the king of Tyre, the language soars far beyond any earthly monarch:

> Ezekiel 28:12-15 — "Thou sealest up the sum, full of wisdom, and perfect in beauty. Thou hast been in Eden the garden of God... Thou wast perfect in thy ways from the day that thou wast created, till iniquity was found in thee."

Lucifer was created with extraordinary gifts: wisdom, beauty, musical ability, and a position of high honor. He was a **covering cherub** — one who stood in the immediate presence of God's glory. Yet these very gifts became the occasion of his downfall.

### The Sin of Pride

Isaiah records the fivefold "I will" of Lucifer's rebellion:

> Isaiah 14:12-14 — "I will ascend into heaven, I will exalt my throne above the stars of God... I will be like the most High."

Pride is the foundational sin of hell. Lucifer was not tempted by an outside tempter; he tempted himself. He looked at his own beauty and splendor and chose to desire the glory that belongs to God alone. This is why pride remains the root of all demonic activity: every demon, in its own way, continues to say "I will" in defiance of God's "Thou shalt."

### The Consequences of the Fall

When Lucifer rebelled, he did not merely lose his position — he was **cast down**. Jesus says:

> Luke 10:18 — "I beheld Satan as lightning fall from heaven."

His name was changed from Lucifer ("light-bearer") to Satan ("adversary"). He became the accuser of the brethren (Revelation 12:10), the deceiver of the whole world (Revelation 12:9), and the prince of the power of the air (Ephesians 2:2). The angels who followed him became demons — stripped of their holy office, condemned to wander the earth, and bound for eternal judgment.

### The Fall and Human History

Satan's fall did not end his activity. He immediately turned his hatred against God's new creation — humanity. In the Garden of Eden, he tempted Adam and Eve to the same sin that ruined him: the desire to be like God. And when humanity fell, Satan became "the god of this world" (2 Corinthians 4:4), exercising a usurped dominion over the nations until Christ's redemptive work would reclaim what was lost.
`,

  "S1": `
## Supplement 1 — For Lessons 1 & 2: The Nature and Origin of Demons

### Key Terms

**Demon** — A fallen angel who rebelled against God and now serves Satan's purposes on earth.

**Lucifer** — The original name of Satan, meaning "light-bearer"; the highest created angel who fell through pride.

**Fallen Angels** — Angels who followed Lucifer in rebellion; identified in Scripture as "devils," "unclean spirits," and "demons."

**The Prince of the Power of the Air** — One of Satan's titles (Ephesians 2:2), describing his temporary authority over the fallen world system.

---

### Scripture Memory

> James 2:19 — "Thou believest that there is one God; thou doest well: the devils also believe, and tremble."

> Ezekiel 28:15 — "Thou wast perfect in thy ways from the day that thou wast created, till iniquity was found in thee."

> 1 Peter 5:8 — "Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour."

---

### Key Distinctions

**Angel vs. Demon**

| Feature | Holy Angels | Demons (Fallen Angels) |
|---------|-------------|------------------------|
| Origin | Created holy | Fell through rebellion |
| Will | Obedient to God | Rebellious, self-willed |
| Destiny | Eternal glory | Eternal condemnation |
| Purpose | Serve God's people | Destroy God's people |
| Power | Derived from God | Usurped, temporary |

**Lucifer's Five "I Wills" (Isaiah 14:13-14)**

1. "I will ascend into heaven"
2. "I will exalt my throne above the stars of God"
3. "I will sit also upon the mount of the congregation"
4. "I will ascend above the heights of the clouds"
5. "I will be like the most High"

---

### Questions for Reflection

1. Why does the Bible present demons as personal beings rather than abstract forces? What difference does this make for how we approach spiritual warfare?

2. Lucifer's fall originated in pride over his own beauty and gifts. What does this teach us about the danger of self-admiration?

3. James says demons "believe, and tremble." Why is intellectual belief in God insufficient for salvation?

4. How does understanding that demons are defeated but dangerous change the way you face spiritual opposition?
`,

  // ── Part II ────────────────────────────────────────────────────────────────

  "L3": `
## Satan — The Great Deceiver

Satan is known by many names in Scripture, and each name reveals a different aspect of his evil character. He is the serpent, the dragon, the devil, the accuser, the tempter, and the father of lies. To understand spiritual warfare, we must understand the enemy — not so that we might fear him, but so that we might recognize his tactics and overcome him.

### The Names of Satan

**The Serpent** — In Genesis 3, Satan approaches Eve not as an enemy but as a subtle, clever creature. He does not announce his presence; he questions God's word. "Hath God said...?" This is the pattern of all deception: sowing doubt about God's character and commands.

**The Devil** — From the Greek *diabolos*, meaning "slanderer" or "accuser." Satan's primary work against believers is accusation. He reminds us of past sins, present failures, and future doubts. His goal is to drive us to despair rather than to the cross.

**The Dragon** — In Revelation 12, Satan appears as a great red dragon, symbolizing his ferocity, cruelty, and bloodthirsty nature. He seeks to devour the child born of the woman — Christ — and when he fails, he turns his rage against the woman's offspring: the Church.

**The Prince of This World** — Jesus calls Satan by this title three times in John's Gospel (John 12:31; 14:30; 16:11). Satan exercises a real, though temporary and usurped, authority over the kingdoms of this world. He offered Jesus all the kingdoms of the world in exchange for worship (Matthew 4:8-9) — a real offer of real power.

### The Methods of Satan

**Deception** — Satan is a liar and the father of lies (John 8:44). He does not usually appear in obvious evil; he counterfeits truth, twists Scripture, and mixes lies with enough truth to make them palatable.

**Temptation** — Satan tempted Jesus in the wilderness with three appeals: to the body (stones to bread), to pride (cast yourself down), and to power (all the kingdoms). These correspond to John's three categories: the lust of the flesh, the lust of the eyes, and the pride of life (1 John 2:16).

**Oppression and Affliction** — Satan bound a woman with a spirit of infirmity for eighteen years (Luke 13:16). He afflicted Job with boils, robbery, and bereavement (Job 1-2). His power to harm is real but always bounded by God's permission.

**Counterfeits** — Satan disguises himself as an angel of light (2 Corinthians 11:14). His ministers appear as ministers of righteousness. False prophets, false christs, and false gospels are his stock-in-trade.

### The Defeat of Satan

Satan's doom was sealed at the cross. Jesus declared:

> John 12:31 — "Now is the judgment of this world: now shall the prince of this world be cast out."

The resurrection broke Satan's power over death (Hebrews 2:14). The ascension seated Christ far above all principality and power (Ephesians 1:21). And at the end of the age, Satan will be bound for a thousand years, then cast into the lake of fire forever (Revelation 20).
`,

  "L4": `
## The Fallen Angels and Their Ranks

The rebellion of Lucifer was not a solitary act. He drew with him a vast host of angels — Scripture suggests a third of the heavenly host (Revelation 12:4). These fallen angels did not lose their nature when they fell; they retained their intelligence, power, and, in some sense, their hierarchical organization.

### The Continuity of Demonic Power

A fallen angel remains an angel — created with immense natural power. The difference is not in capacity but in orientation: where once they served God's purposes, now they serve Satan's. Their intellect is darkened but not destroyed. Their strength is perverted but not diminished. This is why demonology is serious business: the enemy is not a bumbling imp but a disciplined, intelligent, ancient being.

### Demonic Organization in Scripture

The Bible hints at organization among fallen angels. Jesus speaks of Satan casting out Satan (Matthew 12:26), implying that demons operate under authority. The demon possessed man in Gadara identified himself as "Legion, for we are many" (Mark 5:9) — a military term for a Roman division of 3,000-6,000 soldiers.

Paul describes the spiritual enemy in hierarchical terms:

> Ephesians 6:12 — "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world, against spiritual wickedness in high places."

**Principalities** (Greek: *archē*) — Demonic authorities that govern nations, regions, and large population groups. They are territorial spirits that exercise influence over governments, cultures, and social systems.

**Powers** (Greek: *exousia*) — Demonic powers that possess delegated authority to carry out specific functions. They operate under principalities and direct the work of lower-ranking spirits.

**Rulers of the Darkness** (Greek: *kosmokratōr*) — World-rulers who influence the course of human affairs. They are the strategic planners of demonic activity.

**Spiritual Wickedness in High Places** (Greek: *pneumatika tēs ponērias*) — The most general category: wicked spirits that operate in the heavenlies, invisible but active in affecting human life on earth.

### The Book of Enoch and the Watchers

While not canonical, the Book of Enoch preserves an ancient Jewish tradition about the fallen angels. It identifies a group of angels called **Watchers** who descended to earth, taught forbidden knowledge, and took human wives. Their offspring, the Nephilim, were giants who corrupted the earth and filled it with violence.

> Genesis 6:1-4 — "There were giants in the earth in those days; and also after that, when the sons of God came in unto the daughters of men, and they bare children to them, the same became mighty men which were of old, men of renown."

Jude confirms this tradition:

> Jude 1:6 — "And the angels which kept not their first estate, but left their own habitation, he hath reserved in everlasting chains under darkness unto the judgment of the great day."

### The Two Groups of Fallen Angels

The tradition distinguishes two categories of fallen angels:

1. **Those who roam free** — the vast majority of demons who actively tempt, oppress, and deceive humanity.

2. **Those who are bound** — a specific group of angels who committed the sin described in Genesis 6 and Jude, now held in chains until the final judgment.

This distinction explains why some demonic spirits seem more powerful and ancient than others — and why Scripture warns of a future release of even greater demonic forces in the end times.
`,

  "S2": `
## Supplement 2 — For Lessons 3 & 4: Satan and the Fallen Host

### Key Terms

**Satan** — Hebrew for "adversary" or "accuser"; the personal name of the fallen angel Lucifer after his rebellion.

**Devil** — Greek *diabolos*, meaning "slanderer"; emphasizes Satan's role as the accuser of believers.

**Principalities** — High-ranking demons with territorial authority over nations and regions.

**Powers** — Demonic beings with delegated authority to execute specific evil purposes.

**Watchers** — A term from Jewish tradition (Genesis 6, Enoch, Daniel) for angels who descended to earth and corrupted humanity.

**Nephilim** — The offspring of fallen angels and human women, described as "giants" and "mighty men."

---

### Scripture Memory

> Revelation 12:9 — "And the great dragon was cast out, that old serpent, called the Devil, and Satan, which deceiveth the whole world."

> Ephesians 6:12 — "For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world."

> 2 Corinthians 11:14 — "And no marvel; for Satan himself is transformed into an angel of light."

---

### The Names of Satan in Scripture

| Name | Meaning | Reference |
|------|---------|-----------|
| Lucifer | Light-bearer | Isaiah 14:12 |
| Satan | Adversary, accuser | Job 1:6 |
| Devil | Slanderer | Matthew 4:1 |
| Serpent | Deceiver | Genesis 3:1 |
| Dragon | Destroyer | Revelation 12:3 |
| Prince of this world | Usurped ruler | John 12:31 |
| God of this world | False deity | 2 Corinthians 4:4 |
| Prince of devils | Commander of demons | Matthew 12:24 |
| The wicked one | Evil personified | 1 John 5:18 |
| Belial | Worthlessness | 2 Corinthians 6:15 |
| Beelzebub | Lord of the flies | Matthew 12:24 |

---

### Questions for Reflection

1. Why does Scripture give Satan so many different names? What does each reveal about his methods?

2. Satan disguises himself as an angel of light. How can believers discern between genuine spiritual experiences and demonic counterfeits?

3. What does it mean that demons operate in hierarchical ranks? How does this affect the strategy of spiritual warfare?

4. The Book of Enoch describes Watchers who descended to earth. How does Jude's confirmation of this tradition help us understand the severity of certain sins?
`,

  // ── Part II continued ─────────────────────────────────────────────────────

  "L5": `
## Demonic Possession and Oppression

The Gospels record numerous encounters between Jesus and demon-possessed individuals. These accounts are not primitive superstition but accurate descriptions of a real spiritual phenomenon that continues today. Understanding the difference between possession and oppression is essential for effective ministry.

### What Is Demonic Possession?

Demonic possession occurs when a demon or demons take up residence within a human being, exerting control over the person's body, mind, or will. The possessed person is not merely influenced; they are dominated. The demon speaks through them (Mark 5:9), knows things the person could not know (Acts 16:16), and demonstrates superhuman strength (Mark 5:4).

The Gospels describe several characteristics of possession:

- **Violent behavior** — The Gadarene demoniac cut himself and broke chains (Mark 5:5)
- **Altered consciousness** — The person may not remember what the demon does through them
- **Supernatural knowledge** — Demons recognized Jesus immediately (Mark 1:24)
- **Resistance to spiritual things** — Physical convulsions when confronted with divine power (Mark 9:20)
- **Self-destructive tendencies** — Demons drive their hosts toward death and ruin

### What Is Demonic Oppression?

Oppression is external rather than internal. The demon attacks from the outside — through circumstances, relationships, physical affliction, or mental torment. Job was oppressed (Job 1-2), not possessed. The woman with the spirit of infirmity was bound by Satan (Luke 13:16), but the demon did not dwell within her personality.

Many Christians experience oppression: unexplained depression, persistent temptation, recurring nightmares, financial destruction, relational breakdown, and physical illness that resists medical treatment. These may be demonic attacks rather than merely natural conditions.

### Can a Christian Be Demon-Possessed?

The answer is **no** — with an important clarification. A true believer in Christ, indwelt by the Holy Spirit, cannot be possessed by a demon. The Spirit of God and an unclean spirit cannot coexist in the same temple.

> 1 Corinthians 6:19-20 — "What? know ye not that your body is the temple of the Holy Ghost which is in you, which ye have of God, and ye are not your own? For ye are bought with a price."

However, a Christian can be **oppressed**, **harassed**, and **influenced** by demons. Sin creates openings through which demons can attack. Unforgiveness, occult involvement, sexual immorality, substance abuse, and persistent rebellion can all give the enemy a foothold (Ephesians 4:27).

### The Believer's Protection

The believer is sealed by the Holy Spirit (Ephesians 1:13), protected by the armor of God (Ephesians 6:10-18), and covered by the blood of Christ (Revelation 12:11). These are not abstract metaphors but real spiritual realities. The Christian who walks in obedience, prayer, and faith is secure — but the Christian who neglects these disciplines becomes vulnerable.
`,

  "L6": `
## The Spirits of Infirmity and Bondage

Scripture reveals that demons specialize. Just as holy angels have assigned tasks, fallen angels appear to concentrate their attacks in specific areas of human life. Jesus encountered a "spirit of infirmity" (Luke 13:11), and Paul warned of "the spirit of fear" (2 Timothy 1:7). The Bible speaks of spirits of deception, seduction, bondage, and destruction.

### The Spirit of Infirmity

The woman in Luke 13 had been bound by a spirit of infirmity for eighteen years. She was not merely sick; she was **bound**. Jesus said, "Ought not this woman, being a daughter of Abraham, whom Satan hath bound, lo, these eighteen years, be loosed from this bond on the sabbath day?" (Luke 13:16).

This teaches us an important distinction: **not all disease is demonic**, but some disease is. When Jesus healed, He sometimes rebuked a fever (Luke 4:39), sometimes laid hands on the sick (Mark 6:5), and sometimes cast out a spirit (Mark 9:25). The method reveals the cause.

Signs that an illness may have a spiritual root include:
- Sudden onset after occult involvement or trauma
- Resistance to medical treatment
- Symptoms that worsen during prayer or worship
- A family history of the same condition across generations
- A voice or consciousness associated with the illness

### The Spirit of Bondage

Paul writes that before salvation, we were in bondage to fear:

> Romans 8:15 — "For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father."

Bondage spirits produce addiction, compulsion, and slavery. They drive people to substances, behaviors, and relationships they hate but cannot escape. The person knows the behavior is destructive but feels powerless to stop. This is the nature of spiritual bondage — it goes beyond habit or psychology into the realm of captivity.

### The Spirit of Poverty

While less explicitly named in Scripture, the Bible clearly associates Satan with economic destruction. He stole Job's wealth in a single day. He is called "the devourer" (Malachi 3:11). Jesus warned of the deceitfulness of riches, and Paul identified the love of money as the root of all evil (1 Timothy 6:10).

Many believers find themselves in patterns of financial failure that defy natural explanation: income lost at the last moment, business ventures sabotaged, opportunities closed, and an inexplicable inability to prosper despite hard work and skill. This may be the work of a spirit of poverty — a demonic assignment to keep God's people from having the resources to advance His kingdom.

### Breaking the Assignment

Every spirit has a legal right to operate until that right is revoked. For the believer, the cross revoked every claim Satan had. But **legal fact must become experiential reality** through prayer, repentance, renunciation, and the exercise of authority in Christ's name.
`,

  "S3": `
## Supplement 3 — For Lessons 5 & 6: Possession, Oppression, and Bondage

### Key Terms

**Demonic Possession** — The condition in which a demon dwells within a person and exerts control over their body, mind, or will.

**Demonic Oppression** — External demonic attack through circumstances, affliction, or harassment of a person.

**Spirit of Infirmity** — A demon that causes or intensifies physical disease and suffering.

**Spirit of Bondage** — A demonic power that produces addiction, compulsion, and slavery to destructive patterns.

**Generational Curse** — A pattern of sin or affliction passed down through family lines, often with a demonic component.

---

### Scripture Memory

> Mark 16:17 — "And these signs shall follow them that believe; In my name shall they cast out devils."

> Luke 13:16 — "And ought not this woman, being a daughter of Abraham, whom Satan hath bound, lo, these eighteen years, be loosed from this bond on the sabbath day?"

> 2 Timothy 1:7 — "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind."

---

### Demonic Manifestations: Possession vs. Oppression

| Manifestation | Possession | Oppression |
|---------------|------------|------------|
| Location | Internal (within the person) | External (attacks from outside) |
| Control | Demon controls body/voice | Demon influences circumstances |
| Awareness | Person often unaware or altered | Person fully aware |
| Can a Christian experience it? | No | Yes |
| Remedy | Exorcism / deliverance | Prayer, spiritual warfare, repentance |
| Examples | Gadarene demoniac (Mark 5) | Job's afflictions (Job 1-2) |

---

### Questions for Reflection

1. Jesus healed in different ways for different conditions. What does this teach us about diagnosing spiritual vs. natural causes?

2. A Christian cannot be possessed, but can be oppressed. What habits or sins might open a door to demonic oppression in your life?

3. How do you distinguish between a medical condition and a demonic affliction? What role should physicians play?

4. "God has not given us the spirit of fear." What fears in your life may have a spiritual root that needs to be addressed in prayer?
`,

  // ── Part III ───────────────────────────────────────────────────────────────

  "L7": `
## Doctrines of Devils in the Last Days

Paul warned Timothy that in the last days, some would depart from the faith, giving heed to **seducing spirits and doctrines of devils** (1 Timothy 4:1). This prophecy is being fulfilled before our eyes. False teaching is not merely intellectual error; it is often demonically inspired deception designed to lead people away from the truth of Christ.

### The Nature of Doctrines of Devils

A "doctrine of devils" is not a teaching about demons; it is a teaching **from** demons. It is a spiritual lie presented as theological truth. Satan's original temptation in Eden was doctrinal: "Ye shall not surely die... ye shall be as gods" (Genesis 3:4-5). He challenged God's word, God's character, and God's motives — and he did so with a theological argument.

Doctrines of devils share common characteristics:
- They deny the deity of Jesus Christ
- They undermine the authority of Scripture
- They promote human autonomy apart from God
- They promise spiritual advancement without repentance
- They mix truth with error so subtly that many are deceived

### Modern Manifestations

Doctrines of devils appear in many forms today:

**Religious Plativism** — The teaching that all religions lead to the same God. This directly contradicts Jesus' statement: "I am the way, the truth, and the life: no man cometh unto the Father, but by me" (John 14:6).

**Moral Relativism** — The idea that no absolute moral standard exists. This attacks the very nature of God, who is holy and has spoken His commandments clearly.

**New Age Spirituality** — The teaching that humanity is divine, that consciousness creates reality, and that Jesus was merely an enlightened master. These are ancient gnostic lies repackaged for modern consumption.

**Secular Humanism** — The assertion that man is the measure of all things and that God is unnecessary. This is the same lie Satan told Eve: "Ye shall be as gods."

**Critical Theories** — Worldviews that divide humanity by oppressor and oppressed, replacing the biblical categories of sin and redemption with political power structures. These are Marxist doctrines dressed in academic language — and they functionally replace the gospel with ideology.

### The Spirit Behind the Doctrine

Paul does not say "doctrines of error" or "doctrines of confusion." He says **doctrines of devils** — because demons are actively involved in originating, spreading, and enforcing these lies. A teacher of false doctrine may be sincere, but if the doctrine denies Christ, it has a demonic source.

> 1 John 4:3 — "And every spirit that confesseth not that Jesus Christ is come in the flesh is not of God: and this is that spirit of antichrist, whereof ye have heard that it should come; and even now already is it in the world."

### The Remedy: Sound Doctrine

The only antidote to demonic deception is the truth of God's Word. Believers must be grounded in Scripture, discerning in spirit, and committed to the faith once delivered to the saints (Jude 1:3).
`,

  "L8": `
## Divination, Witchcraft, and the Black Art

Scripture repeatedly condemns occult practices as abominations that open doors to demonic power. The Israelites were commanded not to suffer a witch to live (Exodus 22:18), and Saul died specifically because he consulted the witch of Endor (1 Chronicles 10:13). These practices are not harmless folklore; they are direct invitations to demonic spirits.

### Divination

Divination is the attempt to gain hidden knowledge by supernatural means apart from God. It includes:

- **Astrology** — Reading the stars for guidance (Isaiah 47:13)
- **Tarot cards and fortune-telling** — Attempting to predict the future
- **Palm reading and numerology** — Seeking personal destiny in created things
- **Divining rods and water-witching** — Using physical objects to detect hidden things

God condemned all these practices through Moses:

> Deuteronomy 18:10-12 — "There shall not be found among you any one that maketh his son or his daughter to pass through the fire, or that useth divination, or an observer of times, or an enchanter, or a witch, or a charmer, or a consulter with familiar spirits, or a wizard, or a necromancer. For all that do these things are an abomination unto the LORD."

### Witchcraft

Witchcraft is not merely Halloween costumes and fairy tales. Biblical witchcraft involves the deliberate invocation of demonic spirits to accomplish specific purposes: cursing enemies, compelling love, inflicting disease, or gaining power. It is an organized system of demon worship.

The witch of Endor did not produce Samuel by magic; she summoned a demonic spirit that impersonated Samuel (1 Samuel 28). This is the nature of necromancy: demons impersonate the dead to deceive the living.

### The Black Art (Necromancy)

Necromancy — communication with the dead — is strictly forbidden. The dead do not roam the earth as spirits; they are in Sheol or with the Lord. Any "communication" with the dead is communication with a demon. This includes:

- Séances and Ouija boards
- Channeling and mediumship
- Spirit guides and ascended masters
- Ancestor worship that seeks direct guidance from deceased relatives

### Occult Involvement and Demonic Access

Occult participation creates a legal ground for demons to operate in a person's life. Many who have been involved in astrology, witchcraft, or other occult practices find that demonic influence persists long after the practices have stopped. This is because demons claim a legal right to remain until that right is specifically renounced and broken in the name of Jesus.

> 2 Corinthians 6:17 — "Wherefore come out from among them, and be ye separate, saith the Lord, and touch not the unclean thing; and I will receive you."

Deliverance often requires the believer to repent of occult involvement, renounce every practice by name, and command any associated spirits to leave in the authority of Christ.
`,

  "S4": `
## Supplement 4 — For Lessons 7 & 8: Deception and the Occult

### Key Terms

**Doctrines of Devils** — False teachings that originate from demonic inspiration, designed to lead people away from faith in Christ.

**Divination** — The attempt to gain hidden knowledge by supernatural means apart from God.

**Necromancy** — Communication with the dead; in reality, communication with demons impersonating the dead.

**Familiar Spirit** — A demon that attaches itself to a family line, often through occult involvement.

**Legal Ground** — The right a demon claims to operate in a person's life through sin, trauma, or occult participation.

---

### Scripture Memory

> 1 Timothy 4:1 — "Now the Spirit speaketh expressly, that in the latter times some shall depart from the faith, giving heed to seducing spirits, and doctrines of devils."

> Deuteronomy 18:10-12 — "There shall not be found among you any one that useth divination, or an observer of times, or an enchanter, or a witch... For all that do these things are an abomination unto the LORD."

> 2 Corinthians 6:17 — "Wherefore come out from among them, and be ye separate, saith the Lord, and touch not the unclean thing."

---

### Modern Forms of Divination

| Practice | Biblical Status | Common Manifestations |
|----------|---------------|----------------------|
| Astrology | Forbidden | Horoscopes, zodiac signs, star charts |
| Fortune-telling | Forbidden | Tarot, palm reading, crystal balls |
| Necromancy | Forbidden | Séances, Ouija boards, channeling |
| Witchcraft | Forbidden | Spell-casting, curses, Wicca |
| New Age | Forbidden | Spirit guides, energy healing, astral projection |

---

### Questions for Reflection

1. Why does God condemn divination so strongly? What does it reveal about His character and His plan for His people?

2. Have you ever participated in occult practices, even in jest? How should you address this in prayer?

3. How can you lovingly warn others about the dangers of horoscopes, Ouija boards, and other "harmless" occult activities?

4. What does it mean that demons have a "legal ground"? How does the cross of Christ break every claim they have?
`,

  // ── Part III continued ─────────────────────────────────────────────────────

  "L9": `
## Seducing Spirits and the Church

The Holy Spirit is not the only spirit at work in the church. Paul warned the Corinthians that false apostles and deceitful workers transform themselves into apostles of Christ (2 Corinthians 11:13-15). Satan's most devastating attacks do not come from outside the church but from within — through ministers who appear godly but preach another gospel.

### The Spirit of Antichrist

John warns that many antichrists have already come:

> 1 John 2:18 — "Little children, it is the last time: and as ye have heard that antichrist shall come, even now are there many antichrists; whereby we know that it is the last time."

The spirit of antichrist does not necessarily deny God openly. It often simply ignores Christ — teaching about God, morality, and spirituality while leaving out the cross, the blood, and the necessity of personal salvation through Jesus.

### Seducing Spirits in the Modern Church

**The Prosperity Gospel** — The teaching that faith is a tool to obtain wealth and health. It turns God into a vending machine and the Christian life into a quest for personal comfort. It denies the clear teaching of Scripture that believers will suffer, be persecuted, and carry a cross.

**Progressive Christianity** — The movement that redefines sin, denies the authority of Scripture, and blesses what God condemns. It presents itself as compassionate and enlightened, but it is the spirit of antichrist dressed in progressive language.

**Hyper-Grace** — The teaching that repentance is unnecessary, that the cross covers all future sin automatically, and that believers have no obligation to obey God's commands. This transforms grace into a license for sin.

**Emphasis on Experience Over Truth** — When churches prioritize emotional encounters, visions, and prophetic words above the plain teaching of Scripture, they open the door to demonic counterfeits. Satan can produce powerful religious experiences that feel genuine but lead people away from Christ.

### Testing the Spirits

John commands believers to test the spirits:

> 1 John 4:1 — "Beloved, believe not every spirit, but try the spirits whether they are of God: because many false prophets are gone out into the world."

The test is doctrinal: Does the spirit confess that Jesus Christ has come in the flesh? Does it honor the Father and the Son? Does it submit to the authority of Scripture? Any spirit — or any teacher — that fails this test is not of God.
`,

  "L10": `
## The Demonic Influence on Nations and Culture

Daniel's prophecies reveal that spiritual warfare is not merely personal; it is **territorial and political**. The angel Gabriel was delayed for twenty-one days because the prince of Persia withstood him (Daniel 10:13). Michael, the archangel, came to assist. This is not poetic language; it is a description of real spiritual conflict over nations.

### Territorial Spirits

The Bible reveals that high-ranking demons — principalities and powers — are assigned to specific territories. These "princes" exercise influence over governments, cultures, and social systems. When a nation turns away from God, it creates a vacuum that demonic powers rush to fill.

> Psalm 106:34-37 — "They did not destroy the nations, concerning whom the LORD commanded them: but were mingled among the heathen, and learned their works. And they served their idols: which were a snare unto them. Yea, they sacrificed their sons and their daughters unto devils."

Idolatry is not merely religious error; it is the worship of demons. When a culture embraces abortion, sexual immorality, and the denial of God's existence, it is not simply making philosophical choices — it is inviting demonic rule.

### The Demonic Strategy for Nations

Satan's strategy for nations follows a predictable pattern:

1. **Remove God from public life** — Prayer is banned, Scripture is mocked, and God's laws are replaced with human opinion.

2. **Corrupt the family** — Marriage is redefined, children are indoctrinated, and parental authority is undermined.

3. **Devalue human life** — Abortion, euthanasia, and the glorification of death become normalized.

4. **Promote sexual immorality** — What God calls sin is celebrated as freedom, and what God calls holy is condemned as hate.

5. **Control information** — Truth is suppressed, lies are institutionalized, and anyone who speaks God's word is censored or persecuted.

### The Church's Response

The Church is not powerless against national demonic strongholds. When believers pray, fast, preach the gospel, and live holy lives, they push back the darkness. Every soul saved is a territory reclaimed. Every family restored is a stronghold destroyed. Every church planted is a beachhead established in enemy territory.

> 2 Chronicles 7:14 — "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land."
`,

  "S5": `
## Supplement 5 — For Lessons 9 & 10: The Church and the Nations

### Key Terms

**Spirit of Antichrist** — Any spirit or teaching that denies the deity, humanity, or saving work of Jesus Christ.

**Territorial Spirits** — High-ranking demons assigned to influence specific nations, regions, or cultural spheres.

**False Apostle** — A minister who claims apostolic authority but preaches a different gospel.

**Another Gospel** — Any message that adds to, subtracts from, or redefines the gospel of salvation by grace through faith in Christ alone.

---

### Scripture Memory

> 2 Corinthians 11:13-14 — "For such are false apostles, deceitful workers, transforming themselves into the apostles of Christ. And no marvel; for Satan himself is transformed into an angel of light."

> Daniel 10:13 — "But the prince of the kingdom of Persia withstood me one and twenty days: but, lo, Michael, one of the chief princes, came to help me."

> 2 Chronicles 7:14 — "If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land."

---

### Testing Every Spirit

| True Spirit | False Spirit |
|-------------|--------------|
| Exalts Jesus Christ | Ignores or denies Christ |
| Honors Scripture as final authority | Adds new revelations above Scripture |
| Calls for repentance and holiness | Excuses sin as grace |
| Produces humility and love | Produces pride and division |
| Points to the cross | Points to human potential |

---

### Questions for Reflection

1. How can you distinguish between genuine spiritual revival and demonic counterfeit revival in a church setting?

2. What does Daniel's vision teach us about the relationship between prayer and national spiritual warfare?

3. In what ways has your own nation opened doors to demonic influence? How can you pray strategically?

4. Why is the family so often the first target of Satan's national strategy? How can you protect your own household?
`,

  // ── Part IV ────────────────────────────────────────────────────────────────

  "L11": `
## The Believer's Authority in Christ

The single most important truth in spiritual warfare is this: **the believer in Jesus Christ possesses absolute authority over demons**. This authority is not earned, learned, or achieved; it is received by grace through faith in the finished work of Christ.

### The Source of Authority

When Jesus commissioned His disciples, He gave them authority:

> Luke 10:19 — "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you."

This authority is inherent in the Name of Jesus. When Peter healed the lame man, he declared:

> Acts 3:6 — "Silver and gold have I none; but such as I have give I thee: In the name of Jesus Christ of Nazareth rise up and walk."

The Name is not a magic formula; it is the representation of the Person. To act in the Name of Jesus is to act with His authority, His backing, and His power. Demons do not fear the Christian; they fear Christ in the Christian.

### The Believer's Position

Paul describes the believer's exalted position:

> Ephesians 2:6 — "And hath raised us up together, and made us sit together in heavenly places in Christ Jesus."

When a believer is born again, they are spiritually seated with Christ in heavenly places — far above all principality and power. The Christian is not fighting for victory; they are fighting from victory. The battle is not to gain authority but to exercise the authority already given.

### Keys to Exercising Authority

**Faith** — Authority works through faith. The disciples failed to cast out a demon because of unbelief (Matthew 17:20). When faith is present, even mustard-seed sized, mountains move.

**The Word of God** — Jesus defeated Satan's temptations with Scripture: "It is written." The Word of God is the sword of the Spirit — the only offensive weapon in the armor of God.

**The Blood of Jesus** — Revelation declares that believers overcome the accuser "by the blood of the Lamb, and by the word of their testimony" (Revelation 12:11). The blood speaks of substitution, redemption, and the legal cancellation of every claim Satan had.

**The Holy Spirit** — Authority is exercised in partnership with the Holy Spirit. It is the Spirit who gives power, direction, and confirmation. To attempt spiritual warfare without the Spirit's leading is to operate in the flesh.
`,

  "L12": `
## The Armor of God and the Name of Jesus

Paul concludes his teaching on spiritual warfare with a command to put on the whole armor of God. This is not optional equipment for super-saints; it is the standard issue for every believer who expects to stand in the day of battle.

> Ephesians 6:11-12 — "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil. For we wrestle not against flesh and blood, but against principalities, against powers, against the rulers of the darkness of this world."

### The Belt of Truth

Truth is the foundation. Satan is a liar; truth exposes his deception. The Christian who lives in honesty, integrity, and the truth of God's Word has already secured the center of the battle.

### The Breastplate of Righteousness

The breastplate protects the heart. When a believer walks in righteousness — not perfect sinlessness, but a life oriented toward God and away from sin — the enemy cannot penetrate the core of their being with guilt, shame, or accusation.

### The Shoes of the Gospel of Peace

The believer stands firm because their standing with God is secure. The gospel of peace means we are no longer enemies of God but at peace with Him through Christ. This peace allows us to stand unshaken even when everything around us shakes.

### The Shield of Faith

Faith extinguishes the fiery darts of the wicked one. Every doubt, every fear, every accusation is a flaming arrow aimed at the believer's confidence. Faith — active, trusting, obedient faith — deflects them all.

### The Helmet of Salvation

The helmet protects the mind. The believer must know they are saved, sealed, and secure. Satan's primary attack is often on the assurance of salvation: "Are you really saved? Will God really keep you?" The helmet answers: Yes, by grace, through faith, in Christ.

### The Sword of the Spirit

The Word of God is the only offensive weapon. Jesus wielded it in the wilderness. The believer must know it, speak it, and trust it. The sword is not for show; it is for battle.

### The Name of Jesus — The Secret Weapon

The armor enables us to stand; the Name of Jesus enables us to advance. Every demon must bow at the Name of Jesus (Philippians 2:10). When a believer commands a demon to leave in that Name, they are not making a request — they are executing a judgment already rendered at the cross.
`,

  "S6": `
## Supplement 6 — For Lessons 11 & 12: Authority and Armor

### Key Terms

**Authority** — The delegated power and right given to believers through their union with Christ.

**Armor of God** — The spiritual equipment described in Ephesians 6 that enables believers to stand against demonic attack.

**The Name of Jesus** — The representation of Christ's Person and authority; demons are subject to it.

**The Blood of the Lamb** — The redemptive work of Christ that cancels every legal claim of Satan.

---

### Scripture Memory

> Luke 10:19 — "Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you."

> Ephesians 6:11 — "Put on the whole armour of God, that ye may be able to stand against the wiles of the devil."

> Philippians 2:10 — "That at the name of Jesus every knee should bow, of things in heaven, and things in earth, and things under the earth."

---

### The Armor at a Glance

| Piece | Function | Scriptural Counterpart |
|-------|----------|----------------------|
| Belt of Truth | Holds everything together; exposes lies | Integrity, honesty |
| Breastplate of Righteousness | Protects the heart from accusation | Holiness, obedience |
| Shoes of the Gospel of Peace | Steady footing in battle | Assurance of salvation |
| Shield of Faith | Extinguishes attacks | Active trust in God |
| Helmet of Salvation | Guards the mind | Assurance, hope |
| Sword of the Spirit | Offensive weapon | The Word of God |

---

### Questions for Reflection

1. Why does Paul command us to "put on" the armor rather than simply possess it? What does this say about daily spiritual discipline?

2. What is the difference between authority and power? Why is authority more important in spiritual warfare?

3. How does knowing you are "seated with Christ in heavenly places" change your perspective on spiritual battles?

4. The sword of the Spirit is the only offensive weapon. How well do you know your sword? What would it look like to study Scripture specifically for warfare?
`,

  // ── Part IV continued ─────────────────────────────────────────────────────

  "L13": `
## Deliverance and Exorcism

Jesus commissioned His disciples to cast out demons as a normal part of their ministry:

> Mark 16:17 — "And these signs shall follow them that believe; In my name shall they cast out devils."

Deliverance is not a relic of the early church; it is the ongoing ministry of every believer who walks in the authority of Christ.

### The Ministry of Deliverance

Deliverance is the expulsion of a demon or demons from a person or place through the authority of Jesus Christ. It may be dramatic — with convulsions, voices, and manifestations — or it may be peaceful, with the person simply feeling free.

Jesus performed deliverance with a word (Mark 1:25), with a command (Mark 9:25), and sometimes with prayer and fasting (Matthew 17:21). The method varies, but the authority is the same.

### Preparing for Deliverance

Before attempting deliverance, the minister should ensure:

1. **The person wants to be free** — Deliverance cannot be forced on someone who desires to keep their demon.

2. **Sin is confessed and renounced** — The person must close every door they opened through repentance.

3. **The minister is spiritually prepared** — Prayer, fasting, and a clean life are essential. The demons know whether the minister is walking in authority or presumption.

4. **Aftercare is planned** — A delivered person needs discipleship, fellowship, and ongoing prayer. Deliverance without follow-up often leads to relapse.

### Practical Steps

1. **Identify the spirit** — Ask the Holy Spirit for discernment. The demon may reveal its name or function.

2. **Bind the spirit** — Command it in the Name of Jesus to be silent and to come out.

3. **Cast it out** — Do not negotiate. Do not converse. Exercise authority and command it to leave.

4. **Fill the void** — The expelled demon must be replaced with the Holy Spirit, the Word of God, and Christian fellowship. An empty house is vulnerable (Matthew 12:44).

### The Power of Prayer and Fasting

Some demons are more resistant than others. Jesus said:

> Matthew 17:21 — "Howbeit this kind goeth not out but by prayer and fasting."

Fasting weakens the flesh and strengthens the spirit. It is a declaration that the battle belongs to God, not to human will or technique.
`,

  "L14": `
## Taking Away the Devil's Armor

Jesus taught that a strong man's house cannot be plundered until the strong man is bound:

> Matthew 12:29 — "Or else how can one enter into a strong man's house, and spoil his goods, except he first bind the strong man? and then he will spoil his house."

Before a believer can walk in freedom, the enemy's hold must be broken. This lesson examines how to systematically dismantle Satan's strongholds.

### Strongholds of the Mind

Paul writes about "casting down imaginations, and every high thing that exalteth itself against the knowledge of God, and bringing into captivity every thought to the obedience of Christ" (2 Corinthians 10:5).

A stronghold is a fortress of wrong thinking — beliefs, assumptions, and thought patterns that contradict God's Word. Common strongholds include:

- **Fear** — Believing that God will not protect or provide
- **Shame** — Believing that past sin defines your identity
- **Rejection** — Believing that you are unlovable or worthless
- **Unforgiveness** — Believing that your right to anger is greater than God's command to forgive
- **Pride** — Believing that you are better than others or that you do not need God

These strongholds are not merely psychological; they are spiritual. Demons reinforce them with lies, memories, and emotions. To break the stronghold, the lie must be replaced with truth.

### Binding the Strong Man

Binding the strong man involves:

1. **Identifying the entry point** — When did this stronghold begin? What sin, trauma, or decision opened the door?

2. **Repenting and renouncing** — Confess the sin, renounce the lie, and break every agreement with the enemy.

3. **Replacing the lie with truth** — Find the Scripture that directly contradicts the stronghold. Meditate on it, speak it aloud, and believe it.

4. **Commanding the spirit to leave** — In the Name of Jesus, bind the demon and cast it out.

5. **Maintaining the victory** — Fill the space with prayer, worship, fellowship, and the Word. Do not leave the house empty.

### The Weapons of Our Warfare

Paul says our weapons are not carnal but mighty through God:

> 2 Corinthians 10:4 — "For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds."

These weapons include prayer, fasting, the Word, praise, testimony, and the blood of Jesus. Each is effective, but together they form an arsenal that no demonic stronghold can withstand.
`,

  "S7": `
## Supplement 7 — For Lessons 13 & 14: Deliverance and Strongholds

### Key Terms

**Deliverance** — The expulsion of demons from a person or place through the authority of Jesus Christ.

**Exorcism** — The formal practice of casting out demons; in the New Testament, a ministry both of Jesus and of ordinary believers.

**Stronghold** — A fortress of wrong thinking reinforced by demonic influence that contradicts God's Word.

**Binding the Strong Man** — Breaking Satan's hold on a person, family, or territory through repentance, renunciation, and spiritual authority.

---

### Scripture Memory

> Mark 16:17 — "And these signs shall follow them that believe; In my name shall they cast out devils."

> 2 Corinthians 10:4-5 — "For the weapons of our warfare are not carnal, but mighty through God to the pulling down of strong holds; casting down imaginations, and every high thing that exalteth itself against the knowledge of God."

> Matthew 12:29 — "Or else how can one enter into a strong man's house, and spoil his goods, except he first bind the strong man?"

---

### Common Strongholds and Their Biblical Counter-Truths

| Stronghold | Lie | Biblical Truth |
|------------|-----|--------------|
| Fear | God will abandon me | Hebrews 13:5 — "I will never leave thee, nor forsake thee" |
| Shame | My past defines me | 2 Corinthians 5:17 — "If any man be in Christ, he is a new creature" |
| Rejection | I am unlovable | Romans 8:38-39 — Nothing can separate us from God's love |
| Unforgiveness | They don't deserve mercy | Ephesians 4:32 — "Forgiving one another, even as God for Christ's sake hath forgiven you" |
| Poverty | God wants me poor | Psalm 35:27 — "The LORD... hath pleasure in the prosperity of his servant" |
| Sickness | God wants me sick | 1 Peter 2:24 — "By whose stripes ye were healed" |

---

### Questions for Reflection

1. What strongholds have you recognized in your own life? How did they begin?

2. Why is it essential to "fill the house" after deliverance? What happens when a stronghold is broken but not replaced with truth?

3. How does fasting specifically contribute to spiritual warfare? Have you ever fasted for a breakthrough?

4. What Scripture will you use to replace the strongest lie the enemy has told you?
`,

  // ── Part V ─────────────────────────────────────────────────────────────────

  "L15": `
## The Final Battle and Christ's Triumph

The Bible does not end with Satan in power. It ends with his complete and eternal defeat. From the first promise in Eden — "it shall bruise thy head" (Genesis 3:15) — to the final scene in Revelation, Scripture moves toward the triumph of Christ over every power of darkness.

### The Binding of Satan

Revelation 20 describes the Millennium — a thousand-year reign of Christ on earth during which Satan is bound and cast into the bottomless pit:

> Revelation 20:2-3 — "And he laid hold on the dragon, that old serpent, which is the Devil, and Satan, and bound him a thousand years, and cast him into the bottomless pit, and shut him up, and set a seal upon him, that he should deceive the nations no more."

During this time, the earth will experience unprecedented peace, justice, and prosperity. The curse will be partially lifted, and the nations will worship the Lord.

### The Final Rebellion

At the end of the Millennium, Satan is released for a brief season. He deceives the nations one final time, gathering them for battle against the camp of the saints. But fire comes down from God out of heaven and devours them. Satan is cast into the lake of fire, where the beast and the false prophet already are:

> Revelation 20:10 — "And the devil that deceived them was cast into the lake of fire and brimstone, where the beast and the false prophet are, and shall be tormented day and night for ever and ever."

This is the final end of evil. Not rehabilitation, not reconciliation, not annihilation — but **eternal, conscious punishment** for the one who introduced sin and death into God's good creation.

### The New Heaven and New Earth

After Satan's final defeat, God creates a new heaven and a new earth where righteousness dwells:

> Revelation 21:4 — "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away."

The curse is reversed. Death is destroyed. Evil is extinguished. And the people of God live forever in the presence of the Lamb who overcame.
`,

  "L16": `
## Daily Warfare and the Mind of Christ

While the final defeat of Satan is certain, the daily battle continues until Christ returns. The believer who understands demonology is not fearful but vigilant — not passive but armed. This final lesson addresses how to live in daily victory over the powers of darkness.

### Guarding the Gates

Demons gain access through specific "gates": the eye gate (what you watch), the ear gate (what you listen to), the mouth gate (what you speak), the mind gate (what you think), and the body gate (what you do). Every gate must be guarded.

> Philippians 4:8 — "Whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things."

What you allow into your mind eventually shapes your life. Pornography, violent entertainment, occult music, and gossip are not harmless indulgences; they are invitations to demons.

### The Discipline of Prayer

Prayer is the atmosphere in which demons cannot operate. When a believer is praying, the enemy is paralyzed. Paul commands us to "pray without ceasing" (1 Thessalonians 5:17) — to maintain a continuous connection with God that leaves no room for the enemy's suggestions.

Specific prayers for daily warfare include:
- **The morning offering** — Dedicating the day to God before the enemy can establish a foothold
- **The blood of Jesus** — Pleading the blood over yourself, your family, and your home
- **The armor of God** — Consciously putting on each piece before facing the day
- **Binding and loosing** — Binding the enemy's plans and loosing God's purposes

### Walking in the Spirit

The ultimate protection against demonic attack is to be filled with the Holy Spirit:

> Galatians 5:16 — "Walk in the Spirit, and ye shall not fulfil the lust of the flesh."

When the Spirit is in control, there is no vacancy for a demon. The believer who walks in love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control is invulnerable to the enemy's attacks. These are not moral achievements; they are the fruit of the Spirit's presence.

### The Final Word

You are not a victim. You are a victor. The same Spirit who raised Jesus from the dead dwells in you. The Name above every name is yours to use. The blood of the Lamb has cancelled every claim. And the Word of God is your sword.

> Romans 8:37 — "Nay, in all these things we are more than conquerors through him that loved us."

Walk in this truth. Live in this authority. And know that no demon in hell can separate you from the love of God which is in Christ Jesus our Lord.
`,

  "S8": `
## Supplement 8 — A Final Synthesis: The Theology of Spiritual Warfare

### Three Levels of Demonic Opposition

The Church's tradition identifies three levels at which demonic opposition operates in human life:

**1. Personal Temptation and Oppression**
Individual demons attack believers through temptation, accusation, and affliction. This is the most common form of spiritual warfare.

**2. Corporate and Cultural Deception**
Principalities and powers influence churches, institutions, and entire cultures with doctrines of devils, moral corruption, and social decay.

**3. Cosmic and Eschatological Conflict**
Satan's ultimate rebellion against God unfolds across history and culminates in the final battle of Revelation. This level is God's domain, but believers participate through prayer, proclamation, and holy living.

---

### Key Theological Principles

**I. All demonic power is derivative and temporary.** Demons have no authority except what God permits, and their time is short (Revelation 12:12).

**II. The believer's authority is absolute in Christ.** No demon can withstand the Name of Jesus, the blood of the Lamb, and the Word of God.

**III. Spiritual warfare requires both truth and Spirit.** Knowledge without the Spirit produces arrogance; the Spirit without truth produces fanaticism. Both are essential.

**IV. Holiness is the best defense.** A life of prayer, purity, and obedience creates an environment where demons cannot operate.

**V. The final victory is certain.** Satan's doom is sealed at the cross and executed at the end of the age. Every battle we fight is part of a war already won.

---

### Scripture Memory

> 1 John 4:4 — "Ye are of God, little children, and have overcome them: because greater is he that is in you, than he that is in the world."

> Romans 8:37-39 — "Nay, in all these things we are more than conquerors through him that loved us. For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come, nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."

> Revelation 12:11 — "And they overcame him by the blood of the Lamb, and by the word of their testimony; and they loved not their lives unto the death."

---

### Questions for Reflection

1. How has your understanding of demons and spiritual warfare changed through this course?

2. Which of the three levels of demonic opposition do you face most often in your own life?

3. What specific practice — prayer, fasting, Scripture memorization, worship — will you commit to strengthening as part of your daily warfare?

4. Write a brief prayer of authority, using the Name of Jesus, the blood of the Lamb, and the Word of God, declaring freedom over any area where you have experienced demonic attack.
`,
};

const CHAPTERS = [
  {
    title: "Part I — The Origin and Nature of Evil Spirits",
    order: 1,
    lessons: [
      { key: "L1", title: "Lesson 1 — What Are Demons? The Biblical View", order: 0 },
      { key: "L2", title: "Lesson 2 — Lucifer's Fall: The Rebellion That Changed Everything", order: 1 },
      { key: "S1", title: "Supplement 1 — For Lessons 1 & 2", order: 2, type: "SUPPLEMENT" },
    ],
  },
  {
    title: "Part II — Satan and the Kingdom of Darkness",
    order: 2,
    lessons: [
      { key: "L3", title: "Lesson 3 — Satan: The Great Deceiver", order: 0 },
      { key: "L4", title: "Lesson 4 — The Fallen Angels and Their Ranks", order: 1 },
      { key: "S2", title: "Supplement 2 — For Lessons 3 & 4", order: 2, type: "SUPPLEMENT" },
      { key: "L5", title: "Lesson 5 — Demonic Possession and Oppression", order: 3 },
      { key: "L6", title: "Lesson 6 — The Spirits of Infirmity and Bondage", order: 4 },
      { key: "S3", title: "Supplement 3 — For Lessons 5 & 6", order: 5, type: "SUPPLEMENT" },
    ],
  },
  {
    title: "Part III — Deception and Doctrines of Devils",
    order: 3,
    lessons: [
      { key: "L7", title: "Lesson 7 — Doctrines of Devils in the Last Days", order: 0 },
      { key: "L8", title: "Lesson 8 — Divination, Witchcraft, and the Black Art", order: 1 },
      { key: "S4", title: "Supplement 4 — For Lessons 7 & 8", order: 2, type: "SUPPLEMENT" },
      { key: "L9", title: "Lesson 9 — Seducing Spirits and the Church", order: 3 },
      { key: "L10", title: "Lesson 10 — The Demonic Influence on Nations and Culture", order: 4 },
      { key: "S5", title: "Supplement 5 — For Lessons 9 & 10", order: 5, type: "SUPPLEMENT" },
    ],
  },
  {
    title: "Part IV — Spiritual Warfare",
    order: 4,
    lessons: [
      { key: "L11", title: "Lesson 11 — The Believer's Authority in Christ", order: 0 },
      { key: "L12", title: "Lesson 12 — The Armor of God and the Name of Jesus", order: 1 },
      { key: "S6", title: "Supplement 6 — For Lessons 11 & 12", order: 2, type: "SUPPLEMENT" },
      { key: "L13", title: "Lesson 13 — Deliverance and Exorcism", order: 3 },
      { key: "L14", title: "Lesson 14 — Taking Away the Devil's Armor", order: 4 },
      { key: "S7", title: "Supplement 7 — For Lessons 13 & 14", order: 5, type: "SUPPLEMENT" },
    ],
  },
  {
    title: "Part V — Living in Victory",
    order: 5,
    lessons: [
      { key: "L15", title: "Lesson 15 — The Final Battle and Christ's Triumph", order: 0 },
      { key: "L16", title: "Lesson 16 — Daily Warfare and the Mind of Christ", order: 1 },
      { key: "S8", title: "Supplement 8 — A Final Synthesis", order: 2, type: "SUPPLEMENT" },
    ],
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  // Find or create the course
  let course = await db.content.findUnique({ where: { slug: "demons" } });

  if (!course) {
    course = await db.content.create({
      data: {
        type:        "COURSE",
        title:       "Demons — The Study of Evil Spirits",
        slug:        "demons",
        description: "A comprehensive study of demons, fallen angels, and spiritual warfare — their origin, nature, operations, and the believer's complete authority in Christ over every power of darkness.",
        published:   true,
        premium:     false,
        featured:    false,
        order:       3,
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

  console.log("\n✅ Done — Demons course seeded successfully.");
  console.log(`   5 Parts | 16 Lessons | 8 Supplements = 24 total sections`);
  await db.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
