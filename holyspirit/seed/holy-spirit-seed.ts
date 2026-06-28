// Holy Spirit: Living in the Presence and Power of God
// Complete seed data for the Gods Truth platform.
//
// This file contains original, non-copyrighted content. It was written from
// general biblical-theological knowledge and the course framework approved by
// the project owner. It does not quote or imitate any published source.
//
// UploadThing placeholders:
//   - Replace UPLOADTHING:holy-spirit-cover with the actual UploadThing image URL.
//   - Replace UPLOADTHING:module-* covers with actual module images.
//   - Replace UPLOADTHING:lesson-* covers with actual lesson header images.
//
// To use: import { seedHolySpiritCourse } from "./holy-spirit-seed" and call it
// inside prisma/seed.ts after the existing sample content is seeded.

import { PrismaClient } from "@prisma/client";

export const HOLY_SPIRIT_COURSE = {
  type: "COURSE" as const,
  title: "Holy Spirit: Living in the Presence and Power of God",
  slug: "holy-spirit",
  description:
    "A seven-module transformational journey into the person, presence, and power of the Holy Spirit. Move from doctrine to daily dependence as you learn to hear His voice, walk in His fruit, exercise His gifts, and join His mission.",
  thumbnail: "https://hm8qhte0o7.ufs.sh/f/tgGixBSSw8OsWHt8EM49Elc9Cf1yMTquZF6SO8bsvVX7eRiY",
  order: 400,
  published: true,
  featured: true,
  premium: true,
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 1 — The Spirit Who Is God
// ─────────────────────────────────────────────────────────────────────────────

export const HS_MODULE_1 = {
  title: "Module 1: The Spirit Who Is God",
  order: 1,
  lessons: [
    {
      title: "1.1 — The Forgotten Person of the Trinity",
      type: "READING",
      order: 1,
      durationSeconds: 480,
      coverUrl: null,
      memoryVerse: "John 14:16-17 — And I will ask the Father, and he will give you another advocate to help you and be with you forever — the Spirit of truth.",
      content: `## The Forgotten Person of the Trinity

If you were asked to describe God, most people would begin with the Father — Creator, sovereign, holy. Many would move quickly to the Son — Jesus, Savior, teacher, risen Lord. But the Holy Spirit often arrives last, if He arrives at all. He is the most neglected Person of the Trinity in everyday Christian life.

This neglect is not new. Throughout church history, believers have struggled to give the Spirit His proper place. Some have ignored Him. Others have treated Him as an impersonal force, a divine electricity that lights up religious meetings. Still others have made Him so strange — tongues, visions, ecstatic experiences — that ordinary believers feel He is not for them.

The truth is simpler and far more wonderful: the Holy Spirit is God, and He is a Person. He is not an *it*. He is not a ghost in the spooky sense. He is not a power to be switched on and off. He is the third Person of the Trinity, fully divine, fully personal, and fully committed to making the life of Jesus real in you.

This changes everything about your faith.

When you became a Christian, you did not merely adopt a new philosophy or join a religious community. You were brought into a living relationship with the triune God. The same Spirit who hovered over creation, who empowered the prophets, who conceived Jesus in Mary's womb, who raised Jesus from the dead, and who fell on the church at Pentecost now lives in you.

Many believers live with the Holy Spirit in their theology but not in their daily consciousness. They pray to the Father, trust in the Son, and forget the Spirit. This course is an invitation to recover the most important relationship you may have been neglecting.

### Why This Matters

Jesus said it was *to your advantage* that He go away, because then the Helper would come (John 16:7). The Spirit's presence is not a consolation prize for Jesus' absence. It is a greater provision: God Himself, closer than a brother, living within you every moment.

This module will ground you in the biblical truth that the Spirit is a divine Person. We will clear away misconceptions, strengthen your vocabulary, and prepare you to relate to the Spirit personally and confidently.

### This Week's Anchor

Before each lesson this week, pause and say quietly: *"Holy Spirit, I welcome You. Teach me who You are."* Let that small habit begin to retrain the way you think and speak about God.
`,
      actionStep:
        "For one day, catch yourself whenever you refer to the Holy Spirit as 'it' or as a force. Correct your language and your thoughts toward personal address.",
      discussionPrompt:
        "How has the Holy Spirit been presented in your faith background — as a person, a force, a mystery, or something else?",
    },
    {
      title: "1.2 — The Spirit Is God: Deity and Names",
      type: "READING",
      order: 2,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Acts 5:3-4 — Then Peter said, 'Ananias, how is it that Satan has so filled your heart that you have lied to the Holy Spirit... You have not lied just to human beings but to God.'",
      content: `## The Spirit Is God: Deity and Names

The first and most important thing to know about the Holy Spirit is that He is God. Not a junior god. Not an angel. Not a divine vapor. He shares the same eternal, uncreated nature as the Father and the Son.

Scripture proves this in several ways.

**The Spirit is called God.** When Ananias lied to the apostles about the money he had kept back, Peter said he had lied to the Holy Spirit, then added, "You have not lied to human beings but to God" (Acts 5:3-4). The Holy Spirit and God are identified as the same reality.

**The Spirit does what only God can do.** He is present everywhere (Psalm 139:7). He knows the deep things of God (1 Corinthians 2:10-11). He gives life (John 6:63; Romans 8:11). He is the source of spiritual rebirth (John 3:5-8). These are not the attributes of a creature or a force.

**The Spirit receives divine worship.** The great Trinitarian blessing at the end of 2 Corinthians 13:14 places the Holy Spirit alongside the Father and the Son as the source of grace, love, and fellowship. The Spirit is not an afterthought in Christian devotion. He is the One in whom we fellowship with God.

### Names That Reveal His Nature

The Bible gives the Spirit many names, and each one teaches us something:

- **The Spirit of God** — He is God's active presence in the world.
- **The Holy Spirit** — He is utterly pure, set apart, unlike anything created.
- **The Spirit of Christ** — He mediates the life and presence of Jesus to us.
- **The Spirit of Truth** — He leads us into reality and protects us from deception.
- **The Comforter / Helper / Advocate** — He stands beside us, helping, defending, and strengthening.
- **The Spirit of Life** — He is the giver of physical and spiritual life.
- **The Spirit of Wisdom** — He illumines our minds with divine understanding.
- **The Spirit of Grace** — He makes God's unearned favor real in our lives.
- **The Eternal Spirit** — He is not temporary or recent but exists from everlasting to everlasting.

Each name is not a different spirit. They are different windows into the same divine Person. When you call on the Helper, you are calling on God. When you welcome the Spirit of Truth, you are welcoming God. When you rely on the Spirit of Life, you are relying on God.

### A Simple Creed

This week, try saying this aloud each morning:

> "I believe in the Holy Spirit, the Lord and Giver of Life, who proceeds from the Father and the Son, who has spoken through the prophets, who makes me alive in Christ, and who will keep me until the day of resurrection."

It is old language, but it is true language. And truth, spoken regularly, becomes confidence.
`,
      actionStep:
        "Write out the nine names of the Spirit listed above. Choose the one that most describes what you need today, and pray from that name.",
      discussionPrompt:
        "Which name of the Holy Spirit is most meaningful to you right now, and why?",
    },
    {
      title: "1.3 — The Spirit Is a Person: Mind, Will, Emotion",
      type: "READING",
      order: 3,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Romans 8:27 — And he who searches our hearts knows the mind of the Spirit, because the Spirit intercedes for God's people in accordance with the will of God.",
      content: `## The Spirit Is a Person: Mind, Will, Emotion

If the Holy Spirit were merely a power, a thing, or an influence, you could not have a relationship with Him. You do not have a friendship with electricity. You do not apologize to gravity. But you can grieve the Holy Spirit. You can lie to Him. You can insult Him. You can pray to Him. You can hear Him. These are personal realities, not impersonal ones.

The Bible treats the Spirit as a Person in the full sense of the word. He thinks, chooses, feels, speaks, and acts.

### The Spirit Has a Mind

"The Spirit searches all things, even the deep things of God. For who knows a person's thoughts except their own spirit within them? In the same way no one knows the thoughts of God except the Spirit of God" (1 Corinthians 2:10-11). The Spirit knows the mind of God because He shares the divine mind. And He makes that mind available to us as we grow in wisdom.

### The Spirit Has a Will

"All these are the work of one and the same Spirit, and he distributes them to each one, just as he determines" (1 Corinthians 12:11). The Spirit decides. He chooses. He is not a tool we manipulate. He is a Person who acts according to His own perfect wisdom and love.

### The Spirit Has Emotions

"Do not grieve the Holy Spirit of God, with whom you were sealed for the day of redemption" (Ephesians 4:30). And in another place: "How much more severely do you think someone deserves to be punished who has trampled the Son of God underfoot, who has treated as an unholy thing the blood of the covenant... and who has insulted the Spirit of grace?" (Hebrews 10:29). The Spirit can be grieved. The Spirit can be insulted. These are the responses of a Person, not a force.

### The Spirit Speaks

In the book of Acts, the Spirit says, "Set apart for me Barnabas and Saul for the work to which I have called them" (Acts 13:2). The Spirit issues commands, warns, forbids, invites, and teaches. He communicates with persons because He is a Person.

### The Spirit Acts

The Spirit drove Jesus into the wilderness (Mark 1:12). The Spirit led Philip to the Ethiopian eunuch (Acts 8:29). The Spirit sent Paul and his companions on mission (Acts 16:6-7). The Spirit intercedes for us with groanings too deep for words (Romans 8:26). He is not passive. He is the most active Person in your spiritual life.

### What This Means for You

You can talk to the Spirit as you talk to a trusted friend — with honesty, respect, and expectancy. You can ask for help. You can confess when you grieve Him. You can thank Him. You can listen for His voice. The Spirit is not far away, waiting for you to perform correctly. He is already within you, eager to lead you into the fullness of life.

This week, practice speaking to the Spirit directly. Not about Him. Not through Him only. *To Him.* Say good morning. Say thank you. Say you need help. Relationship begins with address.
`,
      actionStep:
        "Write a short prayer addressed directly to the Holy Spirit as a Person. Use 'You,' not 'it.' Read it aloud each morning for the next seven days.",
      discussionPrompt:
        "What changes in your prayer life when you address the Holy Spirit as a Person rather than speaking only about Him?",
    },
    {
      title: "1.4 — The Spirit and the Father and the Son",
      type: "READING",
      order: 4,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "John 16:14-15 — He will glorify me because it is from me that he will receive what he will make known to you. All that belongs to the Father is mine.",
      content: `## The Spirit and the Father and the Son

The Holy Spirit is not a separate God, and He is not a lesser God. He is one God with the Father and the Son, co-eternal and co-equal. This is the mystery and the beauty of the Trinity: one God in three Persons, each Person fully God, each distinct in role, each united in love and purpose.

Understanding the Spirit's place in the Trinity protects us from two common errors.

The first error is **modalism**: the idea that God is one Person who appears in three different modes — sometimes as Father, sometimes as Son, sometimes as Spirit. But the Bible shows all three Persons active at the same time. At Jesus' baptism, the Son is in the water, the Father speaks from heaven, and the Spirit descends as a dove (Matthew 3:16-17). All three are present and distinct.

The second error is **subordinationism**: the idea that the Spirit is somehow less than the Father and Son. But the Spirit is called Lord (2 Corinthians 3:17). He is eternal (Hebrews 9:14). He is the Creator (Genesis 1:2; Psalm 104:30). He shares fully in the one divine nature.

### The Spirit's Distinct Role

In the Trinity, the Father is the source, the Son is the Word, and the Spirit is the bond of love who proceeds from the Father and rests upon the Son. In redemption, this same pattern appears:

- **The Father** plans and sends.
- **The Son** accomplishes and reveals.
- **The Spirit** applies and makes real.

The Father decrees salvation. The Son dies and rises to accomplish it. The Spirit regenerates, indwells, and transforms us so that salvation becomes our actual experience. You cannot have the work of the Spirit without the Son, and you cannot have the Son without the Father. The three Persons act together, never apart.

### The Spirit Glorifies the Son

One of the most important things Jesus said about the Spirit is this: "When he, the Spirit of truth, comes, he will guide you into all the truth. He will not speak on his own; he will speak only what he hears... He will glorify me because it is from me that he will receive what he will make known to you" (John 16:13-14).

The Spirit's job is not to draw attention to Himself. It is to reveal Jesus. A ministry that claims to be "Spirit-filled" but does not lead people to love, obey, and resemble Jesus is not truly of the Spirit. The closer you draw to the Spirit, the more clearly you will see the Son.

### Invitation into the Family

Here is the stunning implication: because the Spirit unites you to Christ, you are drawn into the very life of God. You are not an outsider watching the Trinity from a distance. You are adopted into the family. The Spirit of the Son cries out in you, "Abba, Father" (Galatians 4:6; Romans 8:15). You are included.

This week, let the doctrine of the Trinity become doxology. Praise the Father for choosing you, the Son for redeeming you, and the Spirit for making that redemption alive in your heart.
`,
      actionStep:
        "Pray through the Trinity each morning this week: thank the Father, worship the Son, and invite the Holy Spirit to lead you.",
      discussionPrompt:
        "How does understanding the Spirit's role in the Trinity change your view of salvation and daily life?",
    },
    {
      title: "1.5 — Misconceptions: Force, Ghost, or Influence?",
      type: "READING",
      order: 5,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "2 Corinthians 3:17 — Now the Lord is the Spirit, and where the Spirit of the Lord is, there is freedom.",
      content: `## Misconceptions: Force, Ghost, or Influence?

Language shapes devotion. The way you speak about the Holy Spirit will shape the way you relate to Him. In this lesson we will identify and correct the most common misconceptions that keep believers from a healthy, biblical relationship with the Spirit.

### Misconception 1: The Spirit Is a Force

Movies and popular culture often portray spiritual power like "the Force" in science fiction — an energy field that good and evil people can tap into. Some Christians unconsciously borrow this idea and treat the Spirit as a power source to be harnessed for healing, success, or emotional intensity.

But the Spirit is not a force. He is the living God. You cannot manipulate Him. You cannot use Him. You can only yield to Him. The language of "getting more of the Spirit" can be misleading unless we remember that the real question is whether the Spirit is getting more of us.

### Misconception 2: The Spirit Is a Spooky Ghost

The older translation "Holy Ghost" has done some damage. In modern English, a ghost is the disembodied spirit of a dead person, often frightening or strange. The Holy Spirit is not a ghost in that sense. He is not the ghost of Jesus. He is not a haunting. He is the personal, divine presence of the living God — warm, holy, and life-giving.

### Misconception 3: The Spirit Is Only an Influence

It is true that the Spirit influences us. He convicts, prompts, restrains, and empowers. But influence is something an impersonal thing can exert. The Spirit does far more than influence. He speaks. He loves. He grieves. He intercedes. He dwells. These are personal actions.

### Misconception 4: The Spirit Is Only for Super-Christians

Some believers think the Spirit's deeper work — power, gifts, guidance — is reserved for pastors, missionaries, or unusually holy people. But the Spirit was poured out on all flesh (Acts 2:17). Every believer is indwelt. Every believer can be filled. Every believer can hear and follow the Spirit. There is no two-tier Christianity in the New Testament.

### Misconception 5: The Spirit's Work Is Only Spectacular

On the other side, some people think the Spirit is only present when something dramatic happens: miracles, visions, shaking, falling, or shouting. But the Spirit also works in quiet endurance, ordinary obedience, patient love, and slow character growth. The fruit of the Spirit often grows in silence.

### A Healthy Picture

The Holy Spirit is the personal presence of God, actively at work in every believer, drawing us to Jesus, forming His character in us, gifting us for service, and sending us on mission. He is not strange; He is the most normal thing about genuine Christian life. He is not optional; He is essential.

This week, ask the Spirit to show you which misconception has shaped your thinking. Then replace it with the truth.
`,
      actionStep:
        "Identify one misconception you have held about the Spirit. Write a one-sentence biblical correction, and post it somewhere you will see it daily.",
      discussionPrompt:
        "Which misconception about the Holy Spirit is most common in your culture or church background?",
    },
    {
      title: "1.6 — Knowing the Spirit Personally",
      type: "READING",
      order: 6,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Romans 8:16 — The Spirit himself testifies with our spirit that we are God's children.",
      content: `## Knowing the Spirit Personally

Doctrine is meant to lead to devotion. It is not enough to know *about* the Holy Spirit. Jesus promised that the Spirit would be *with* us and *in* us (John 14:17). That is a relational promise. This lesson moves from correct belief to lived experience.

### The Spirit Wants to Be Known

Think about the most important relationships in your life. They grew through time, attention, honesty, and shared experience. The same is true of the Holy Spirit. He is not hiding from you. He is not playing a cosmic game of hide-and-seek. He wants to be acknowledged, trusted, and welcomed.

"If you then, though you are evil, know how to give good gifts to your children, how much more will your Father in heaven give the Holy Spirit to those who ask him!" (Luke 11:13). God delights to give the Spirit. The first step is simply to ask — and keep asking.

### Signs That You Are Growing in Relationship with the Spirit

You are growing in your relationship with the Holy Spirit when:

- You speak to Him directly and naturally.
- You notice His promptings and obey them promptly.
- You grieve when you grieve Him, and you quickly turn back.
- You depend on Him for strength you do not have on your own.
- You see Jesus more clearly because of His witness.
- You love others more freely because His love is being poured out in your heart.
- You become uncomfortable with sin that once seemed normal.

These signs are not about emotional intensity. A quiet, steady growth is often the deepest kind.

### A Daily Welcome

Try beginning each day with a simple welcome. Here is one you can adapt:

> "Good morning, Holy Spirit. Thank You for being with me and in me today. I surrender my plans, my worries, my words, and my work to You. Lead me into truth. Fill me with love. Empower me for whatever You have prepared. I want to live this day in friendship with You."

It does not need to be dramatic. It needs to be sincere. Over time, that daily address reshapes your identity. You begin to live as someone who is not alone.

### The Promise

Jesus made a sweeping promise: "Surely I am with you always, to the very end of the age" (Matthew 28:20). That promise is kept through the Spirit. Wherever you go today — your kitchen, your commute, your workplace, your hospital room — the Spirit is there. You can know Him. You can walk with Him. You can live in His presence.

This is the foundation of everything else in this course. We will talk about power, gifts, fruit, guidance, and mission. But none of those topics will make sense apart from this: the Holy Spirit is a Person, He is God, and He wants to walk with you.
`,
      actionStep:
        "Write your own personal welcome prayer to the Holy Spirit. Say it each morning for the next week, and journal one thing you notice.",
      discussionPrompt:
        "What is one practical way you can grow in personal friendship with the Holy Spirit this month?",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 2 — The Spirit of the New Creation
// ─────────────────────────────────────────────────────────────────────────────

export const HS_MODULE_2 = {
  title: "Module 2: The Spirit of the New Creation",
  order: 2,
  lessons: [
    {
      title: "2.1 — Hovering Over the Waters: The Spirit in Creation",
      type: "READING",
      order: 1,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Genesis 1:2 — Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.",
      content: `## Hovering Over the Waters: The Spirit in Creation

The Bible opens with a breathtaking scene. The earth is formless, empty, and dark. Chaos seems to rule. And yet, "the Spirit of God was hovering over the waters" (Genesis 1:2). Before there was light, life, or order, the Spirit was there — expectant, brooding, ready to bring something out of nothing.

That ancient image is not merely poetic. It is the first glimpse of the Spirit's role in the world: He is the life-giver, the order-maker, the one who turns chaos into cosmos. Every living thing that follows — light, land, vegetation, animals, and finally humans — is shaped by the Spirit's partnership with the Father's word.

When God says, "Let there be light," the Word speaks and the Spirit accomplishes. This pattern runs through the entire Bible: the Father plans, the Son speaks, and the Spirit brings it to pass.

### The Breath of Life

Later in Genesis, we read that "the Lord God formed a man from the dust of the ground and breathed into his nostrils the breath of life, and the man became a living being" (Genesis 2:7). The Hebrew word for "breath" — *ruach* — is the same word used for "spirit" and "wind." Adam's life came directly from the Spirit-breath of God.

Every human being is a spirit-breathed creature. Your existence depends, moment by moment, on the God who first gave you breath. The Holy Spirit is not a distant force. He is closer to you than your own lungs.

### The Spirit Sustains Creation

The psalmist expands the picture: "When you hide your face, they are terrified; when you take away their breath, they die and return to the dust. When you send your Spirit, they are created, and you renew the face of the ground" (Psalm 104:29-30). The Spirit is not only involved in the first creation. He is involved in the ongoing existence of every creature, every ecosystem, every season.

This has practical meaning. The beauty you see in nature, the life in your body, the order in the universe — all of it is sustained by the Spirit. When you watch a sunrise or hold a newborn, you are encountering the work of the Holy Spirit.

### A Pattern of New Creation

The opening of Genesis is more than history. It is a pattern. Wherever the Spirit hovers, new creation begins. The same Spirit who hovered over chaos at the beginning now hovers over the chaos of fallen hearts. Where He is welcomed, darkness gives way to light, death gives way to life, and disorder gives way to divine order.

This is the promise of the rest of the course. The Spirit who made the world is the same Spirit who is making you new.
`,
      actionStep:
        "Go outside and observe one aspect of creation. Write a short paragraph describing how the Spirit's sustaining power is visible in it.",
      discussionPrompt:
        "How does the Spirit's role in creation affect your understanding of nature, your body, and your daily life?",
    },
    {
      title: "2.2 — The Spirit and the Old Covenant: Judges, Prophets, and Kings",
      type: "READING",
      order: 2,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Numbers 11:17 — I will take some of the power of the Spirit that is on you and put it on them. They will share the burden of the people with you so that you will not have to carry it alone.",
      content: `## The Spirit and the Old Covenant: Judges, Prophets, and Kings

After creation, the Spirit's work in the Old Testament is selective and temporary. He comes upon specific people for specific tasks, then He may depart. This is different from the New Covenant, where the Spirit is poured out on all believers and remains forever. Understanding the difference helps us appreciate the gift we have received.

### The Spirit on Leaders

When Israel needed deliverance, the Spirit of the Lord came upon judges like Othniel, Gideon, Jephthah, and Samson. The Spirit gave them courage, strength, and unusual ability to rescue God's people (Judges 3:10; 6:34; 11:29; 14:6). The Spirit did not come because they were perfect. He came because God had a mission and chose to use weak human vessels.

This should encourage you. The Spirit's power does not wait for your perfection. It waits for your availability.

### The Spirit on Prophets

The prophets spoke because "the Spirit of the Lord" was upon them. Elijah, Elisha, Isaiah, Ezekiel, Daniel, Micah, and many others were carried along by the Spirit (2 Peter 1:21). They did not invent their messages. They were men and women who had stood in the council of the Spirit and declared what they had heard.

The same Spirit who spoke through the prophets now teaches believers the meaning of those very words. The Spirit is the author and the interpreter of Scripture.

### The Spirit on Kings

When Saul was anointed king, "the Spirit of God came powerfully upon him" (1 Samuel 10:10). The same happened to David. But Saul's tragic story shows that the Spirit could depart when a leader persistently rebelled. David, in contrast, prayed after his sin with Bathsheba, "Do not cast me from your presence or take your Holy Spirit from me" (Psalm 51:11). David knew the Spirit was precious, and he feared losing Him.

### A Promise of Something Better

The Old Testament repeatedly hints that this temporary, selective anointing would one day become universal. Joel prophesied: "I will pour out my Spirit on all people. Your sons and daughters will prophesy, your old men will dream dreams, your young men will see visions. Even on my servants, both men and women, I will pour out my Spirit in those days" (Joel 2:28-29).

That promise would explode into reality at Pentecost. For now, the lesson is this: the Spirit has always been at work, but His people once experienced Him only in glimpses. In Christ, the glimpse becomes a flood.
`,
      actionStep:
        "Read Judges 6:34 and 1 Samuel 16:13. In a journal, contrast the Spirit's temporary coming in the Old Testament with His permanent indwelling in the New Testament.",
      discussionPrompt:
        "Why is it significant that the Spirit came selectively in the Old Testament but is poured out on all believers now?",
    },
    {
      title: "2.3 — The Messiah Anointed by the Spirit",
      type: "READING",
      order: 3,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Isaiah 61:1 — The Spirit of the Sovereign Lord is on me, because the Lord has anointed me to proclaim good news to the poor.",
      content: `## The Messiah Anointed by the Spirit

Every king, priest, and prophet in Israel was anointed with oil as a sign that the Spirit had set them apart. But all of those anointings pointed forward to one greater Anointed One — the Messiah, Jesus of Nazareth. He is the Spirit-anointed King, the Spirit-filled Prophet, and the Spirit-ordained Priest.

### The Anointing of Jesus

At His baptism, "the Holy Spirit descended on him in bodily form like a dove" (Luke 3:22). A voice from heaven declared, "You are my Son, whom I love; with you I am well pleased" (Luke 3:22). In that moment, the entire Trinity is revealed together: the Father speaks, the Son is baptized, and the Spirit anoints.

This anointing was not for Jesus' personal benefit because He lacked divinity. As the eternal Son, Jesus was always one with the Father. Rather, the anointing was for His messianic mission. He received the Spirit as the representative man, the new Adam, the one who would live the perfect human life under the Spirit's power.

### The Spirit-Led Messiah

Immediately after His baptism, "Jesus, full of the Holy Spirit, left the Jordan and was led by the Spirit into the wilderness" (Luke 4:1). Jesus was not led by His own ambition. He was led by the Spirit. He defeated temptation in the power of the Spirit. He returned to Galilee "in the power of the Spirit" (Luke 4:14).

When Jesus stood in the synagogue at Nazareth, He read from Isaiah: "The Spirit of the Lord is on me, because he has anointed me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free, to proclaim the year of the Lord's favor" (Luke 4:18-19). Then He said, "Today this scripture is fulfilled in your hearing" (Luke 4:21).

### What This Means for Us

Jesus' life under the Spirit is the pattern for ours. He was anointed, led, empowered, and sustained by the Spirit. And because He is our Savior, His anointing becomes the source of ours. We do not earn the Spirit by being like Jesus. We receive the Spirit because we are *in* Jesus.

Every miracle Jesus performed, every word He spoke, every temptation He overcame, every sorrow He bore — all of it was done in the Spirit's power. And that same Spirit now works in us to make us like Him.

This week, meditate on this: the Spirit who empowered Jesus in the wilderness, in the synagogue, and at the cross is the Spirit who lives in you.
`,
      actionStep:
        "Read Luke 4:1-21 slowly. Underline every reference to the Spirit. Then write how Jesus' Spirit-empowered life becomes your pattern.",
      discussionPrompt:
        "How does seeing Jesus as the Spirit-anointed Messiah change your view of the Christian life?",
    },
    {
      title: "2.4 — The Spirit in the Life, Death, and Resurrection of Jesus",
      type: "READING",
      order: 4,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Romans 8:11 — And if the Spirit of him who raised Jesus from the dead is living in you, he who raised Christ from the dead will also give life to your mortal bodies.",
      content: `## The Spirit in the Life, Death, and Resurrection of Jesus

The Holy Spirit was not absent from the hard places of Jesus' life. He was present at the beginning, the middle, and the end. From conception to resurrection, the Spirit was the active power of God making redemption possible.

### Conceived by the Spirit

Jesus' human life began by a miracle of the Spirit. The angel told Mary, "The Holy Spirit will come on you, and the power of the Most High will overshadow you. So the holy one to be born will be called the Son of God" (Luke 1:35). The eternal Son took flesh not by human will or effort but by the creative power of the Holy Spirit.

This means that the Spirit is the author of the incarnation. He is the One who made God-with-us possible. The same Spirit who formed Adam from dust formed the Savior in a virgin's womb.

### Empowered by the Spirit

Throughout His ministry, Jesus worked in the power of the Spirit. He healed the sick, cast out demons, opened blind eyes, and raised the dead by the Spirit of God. When the Pharisees accused Him of casting out demons by Satan, Jesus replied, "But if it is by the Spirit of God that I drive out demons, then the kingdom of God has come upon you" (Matthew 12:28).

Every act of Jesus' ministry was a kingdom act, and every kingdom act was a Spirit act.

### Sustained by the Spirit

Jesus' death was not a defeat of the Spirit; it was the climax of the Spirit-empowered mission. Hebrews says that Christ "through the eternal Spirit offered himself unblemished to God" (Hebrews 9:14). The Spirit sustained Jesus' obedience even in Gethsemane and on the cross.

### Raised by the Spirit

And then came resurrection. Paul declares that "if the Spirit of him who raised Jesus from the dead is living in you, he who raised Christ from the dead will also give life to your mortal bodies because of his Spirit who lives in you" (Romans 8:11). The same power that broke the tomb is at work in you right now.

This is not a metaphor. The resurrection power of the Spirit is the power that will one day raise your body from death and is already raising your inner life from sin, despair, and bondage.

### The New Adam and the New Exodus

In Jesus, the Spirit does what Israel failed to do. Israel was led by the Spirit in the wilderness but rebelled. Jesus, led by the Spirit in the wilderness, obeyed. Israel broke the covenant. Jesus fulfilled it. Where Adam failed, Jesus succeeded. Where death reigned, resurrection now reigns.

This is why the Christian life is possible. You are not trying to be good enough to earn the Spirit. You are living from the victory the Spirit has already accomplished in Jesus.
`,
      actionStep:
        "Write a prayer of thanksgiving for the Spirit's work at each stage of Jesus' life: conception, ministry, death, and resurrection.",
      discussionPrompt:
        "How does the Spirit's role in Jesus' resurrection give you hope for your own body and life?",
    },
    {
      title: "2.5 — Pentecost: New Creation Begins",
      type: "READING",
      order: 5,
      durationSeconds: 660,
      coverUrl: null,
      memoryVerse: "Acts 2:4 — All of them were filled with the Holy Spirit and began to speak in other tongues as the Spirit enabled them.",
      content: `## Pentecost: New Creation Begins

Pentecost is the birthday of the church, but it is far more than that. It is the moment when the new creation begins in earnest. The same Spirit who hovered over the waters at creation now hovers over a gathering of frightened disciples, and a new world is born.

### Waiting in Obedience

Before Pentecost, Jesus told His disciples to wait in Jerusalem until they were "clothed with power from on high" (Luke 24:49). They obeyed. For ten days they prayed, remembered Jesus' words, and chose leadership for the community. Waiting is not passive. It is active preparation for what God has promised.

If you are in a season of waiting, learn from the disciples. Keep praying. Keep obeying. Keep gathering. The Spirit comes to prepared hearts.

### The Sound, the Fire, the Languages

When the day of Pentecost came, the disciples were all together. Suddenly "a sound like the blowing of a violent wind came from heaven and filled the whole house" (Acts 2:2). Then "they saw what seemed to be tongues of fire that separated and came to rest on each of them" (Acts 2:3). And "all of them were filled with the Holy Spirit and began to speak in other tongues as the Spirit enabled them" (Acts 2:4).

Wind, fire, and speech: three powerful symbols. Wind recalls the breath of life in Genesis. Fire recalls the burning bush and the pillar of fire that led Israel. Speech recalls the confusion of Babel being reversed — the gospel will now go to every language and nation.

### Joel's Promise Fulfilled

Peter stood and explained what was happening. He quoted Joel: "In the last days, God says, I will pour out my Spirit on all people" (Acts 2:17). The "last days" had begun. The new age had arrived. The Spirit was no longer reserved for prophets, priests, and kings. He was being poured out on men and women, young and old, slave and free.

### A New Community

At Pentecost, about three thousand people were added to the church (Acts 2:41). But the number is not the miracle. The miracle is the kind of community that formed: "They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer" (Acts 2:42). The Spirit created a people marked by devotion, generosity, worship, and joy.

This is the church the Spirit is still building: a community where Jesus is preached, the broken are healed, the poor are cared for, and the nations are reached.

### Your Pentecost

If you are in Christ, Pentecost is not merely a historical event. It is your spiritual birthday. The same Spirit who fell on the disciples has been given to you. The same power that launched the church is meant to launch your life into mission.
`,
      actionStep:
        "Read Acts 2 aloud. Mark every result of the Spirit's coming. Then write one way you want that same Spirit to reshape your community.",
      discussionPrompt:
        "What would it look like for the Pentecost reality to be fully alive in your church or small group?",
    },
    {
      title: "2.6 — The Spirit and the Church in Acts",
      type: "READING",
      order: 6,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Acts 4:31 — After they prayed, the place where they were meeting was shaken. And they were all filled with the Holy Spirit and spoke the word of God boldly.",
      content: `## The Spirit and the Church in Acts

The book of Acts is sometimes called "The Acts of the Apostles," but a better title might be "The Acts of the Holy Spirit through the Apostles." The church grows, not by human strategy alone, but by the Spirit's initiative, power, and guidance.

### The Spirit Adds to the Church

At Pentecost, "those who accepted his message were baptized, and about three thousand were added to their number that day" (Acts 2:41). The Spirit convicts, converts, and incorporates people into the body. Every genuine conversion is a Spirit event.

### The Spirit Gives Boldness

When the apostles were threatened by the religious authorities, they gathered to pray. After they prayed, "the place where they were meeting was shaken. And they were all filled with the Holy Spirit and spoke the word of God boldly" (Acts 4:31). The Spirit does not remove opposition. He fills His people with courage in the face of it.

If you feel afraid to speak about Jesus, the Spirit is the answer to your fear. Ask Him to fill you with the same boldness.

### The Spirit Breaks Barriers

The early church assumed the gospel was for Jews. The Spirit shattered that assumption. He fell on Samaritans (Acts 8), on the Ethiopian eunuch (Acts 8), on Cornelius and his Gentile household before they were even baptized (Acts 10). Peter had to admit, "God has shown me that I should not call anyone impure or unclean" (Acts 10:28). The Spirit is always ahead of our prejudices.

### The Spirit Sends on Mission

In Antioch, while the believers were worshiping and fasting, "the Holy Spirit said, 'Set apart for me Barnabas and Saul for the work to which I have called them'" (Acts 13:2). The first missionary journey was Spirit-directed. The Spirit still sends today — across the street and across the ocean.

### The Spirit Guides Through Difficulty

Paul and his companions "traveled throughout the region of Phrygia and Galatia, having been kept by the Holy Spirit from preaching the word in the province of Asia. When they came to the border of Mysia, they tried to enter Bithynia, but the Spirit of Jesus would not allow them to" (Acts 16:6-7). Sometimes the Spirit guides by closing doors as much as by opening them.

### The Pattern for Every Church

The Acts church was not perfect. It had conflict, hypocrisy, and growing pains. But it was a Spirit-directed community. It prayed, obeyed, suffered, expanded, and worshiped under the Spirit's leadership.

Your local church can be the same. It will not happen automatically. It happens when leaders and members alike seek the Spirit, obey His Word, and move with His direction.
`,
      actionStep:
        "Read Acts 4:23-31 and pray the apostles' prayer for boldness for yourself and your church.",
      discussionPrompt:
        "What barriers in your church or community might the Holy Spirit be trying to break through?",
    },
    {
      title: "2.7 — The Spirit in the Letters and the Revelation",
      type: "READING",
      order: 7,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "2 Corinthians 3:18 — And we all, who with unveiled faces contemplate the Lord's glory, are being transformed into his image with ever-increasing glory, which comes from the Lord, who is the Spirit.",
      content: `## The Spirit in the Letters and the Revelation

The letters of Paul, Peter, John, James, Jude, and the writer of Hebrews assume that the Holy Spirit is the normal environment of Christian life. The Spirit is not a side topic. He is the air the church breathes.

### The Spirit in the Letters

Paul writes constantly about the Spirit. In Romans, the Spirit brings life, adoption, witness, and hope. In 1 Corinthians, the Spirit gives gifts and builds unity. In 2 Corinthians, the Spirit transforms us into Christ's image "with ever-increasing glory" (2 Corinthians 3:18). In Galatians, the Spirit produces fruit and leads us to freedom. In Ephesians, the Spirit seals us, fills us, and empowers unity. In Philippians, we worship by the Spirit. In Colossians, the Spirit renews us.

Every major theme of the Christian life — salvation, assurance, ethics, worship, mission, hope — is Spirit-soaked.

### The Spirit and the Church's Health

The letters also warn against grieving the Spirit, quenching the Spirit, and lying to the Spirit. These warnings assume that the church can either cooperate with the Spirit or resist Him. Healthy churches are those that keep in step with the Spirit.

### The Spirit in Revelation

At the end of the Bible, the Spirit appears as "the seven spirits" before God's throne (Revelation 1:4; 3:1; 4:5; 5:6). This image does not mean there are seven Holy Spirits. It means the Spirit is perfect and complete — seven being the number of fullness. The Spirit searches, knows, speaks, and calls the churches to overcome.

The risen Jesus repeatedly says, "Whoever has ears, let them hear what the Spirit says to the churches" (Revelation 2:7, 11, 17, 29; 3:6, 13, 22). The Spirit is the voice of Christ to His people. The last word of the Bible to the church is: listen to the Spirit.

### The Story Continues

The Bible's story is not finished. The Spirit who began creation, who empowered the Messiah, who fell at Pentecost, who inspired the apostles, and who speaks to the churches is the same Spirit who will complete the story. He will raise the dead, renew all things, and present the bride to the Lamb.

And until that day, He is with you.
`,
      actionStep:
        "Choose one letter of Paul and highlight every mention of the Spirit in one chapter. Then write a one-paragraph summary of what that chapter says the Spirit does.",
      discussionPrompt:
        "How does the whole Bible's story about the Spirit give you confidence for your own spiritual journey?",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 3 — The Spirit Within
// ─────────────────────────────────────────────────────────────────────────────

export const HS_MODULE_3 = {
  title: "Module 3: The Spirit Within",
  order: 3,
  lessons: [
    {
      title: "3.1 — Born of the Spirit",
      type: "READING",
      order: 1,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "John 3:5-6 — Jesus answered, 'Very truly I tell you, no one can enter the kingdom of God unless they are born of water and the Spirit. Flesh gives birth to flesh, but the Spirit gives birth to spirit.'",
      content: `## Born of the Spirit

There is a birth that happens only once, and it changes everything. Jesus called it being "born again" — not a physical rebirth, but a spiritual one. This new birth is the work of the Holy Spirit, and it is the doorway to the kingdom of God.

### Nicodemus Comes at Night

In John 3, a respected religious leader named Nicodemus comes to Jesus in secret. He acknowledges that Jesus is a teacher sent from God because of the miracles. But Jesus cuts to the heart of the matter: "Very truly I tell you, no one can see the kingdom of God unless they are born again" (John 3:3).

Nicodemus is confused. He thinks literally. "How can someone be born when they are old?" he asks. "Surely they cannot enter a second time into their mother's womb to be born!" (John 3:4).

Jesus clarifies: "Flesh gives birth to flesh, but the Spirit gives birth to spirit" (John 3:6). The new birth is not biological. It is spiritual. It is not something you do for yourself. It is something the Spirit does in you.

### The Wind Analogy

Jesus continues with one of His most beautiful images: "The wind blows wherever it pleases. You hear its sound, but you cannot tell where it comes from or where it is going. So it is with everyone born of the Spirit" (John 3:8).

The Spirit is like wind — free, mysterious, unseen, but real. You do not control the wind. You cannot manufacture it. You can only observe its effects. In the same way, you cannot generate your own new birth. You can only respond to the Spirit who is already at work.

### What the New Birth Does

Being born of the Spirit means:

- You are made alive spiritually. Before, you were dead in sin (Ephesians 2:1). Now you are alive in Christ.
- You are given a new nature. You are no longer merely a sinner by identity. You are a saint who still sins, being renewed by the Spirit.
- You receive the indwelling Spirit as a permanent resident.
- You become able to see and enter the kingdom of God.
- You begin a lifelong process of growth that will culminate in resurrection glory.

### Assurance of the New Birth

You cannot see the moment of your new birth, but you can see its fruit. Do you love Jesus? Do you hate sin and turn from it? Do you desire the things of God? Do you love other believers? These desires are evidences that the Spirit has given you new life.

If you are unsure whether you have been born of the Spirit, do not look primarily at your feelings. Look at Christ. The one who trusts in Jesus has the Son and has life (1 John 5:12). The Spirit's first work is always to point us to Jesus.
`,
      actionStep:
        "Write the story of when you first realized you needed Christ and when you trusted Him. Describe the Spirit's work in that moment as best as you understand it.",
      discussionPrompt:
        "What is the difference between religious improvement and being born of the Spirit?",
    },
    {
      title: "3.2 — Sealed and Guaranteed: The Spirit as Down Payment",
      type: "READING",
      order: 2,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Ephesians 1:13-14 — And you also were included in Christ when you heard the message of truth, the gospel of your salvation. When you believed, you were marked in him with a seal, the promised Holy Spirit, who is a deposit guaranteeing our inheritance.",
      content: `## Sealed and Guaranteed: The Spirit as Down Payment

One of the most comforting truths in the Bible is that the Holy Spirit is God's guarantee in your life. When you believed, God did not merely forgive you and leave you wondering whether you would make it to the end. He gave you the Spirit as a seal and a down payment.

### Sealed for Ownership

In the ancient world, a seal was a mark of ownership and protection. A king might seal a document with wax and his signet ring. Once sealed, the document was secure and identified as belonging to the king. Paul says that "when you believed, you were marked in him with a seal, the promised Holy Spirit" (Ephesians 1:13).

The Spirit is God's mark upon you. You belong to Him. Your salvation is not fragile. It is sealed by the Spirit of the living God.

### Sealed for Protection

The seal also means protection. The Spirit guards what God has begun. Paul writes, "And do not grieve the Holy Spirit of God, with whom you were sealed for the day of redemption" (Ephesians 4:30). The sealing looks forward to the day when your salvation will be complete — the day of redemption. Until then, the Spirit preserves you.

This does not mean you cannot sin or wander. It means that if you are truly in Christ, the Spirit will not let you go. He will bring you back. He will convict you. He will keep you.

### The Down Payment

Paul also calls the Spirit a "deposit guaranteeing our inheritance" (Ephesians 1:14). The Greek word for deposit — *arrabōn* — refers to a partial payment that guarantees the full amount will be paid. The Spirit is the first installment of your future inheritance.

What is that inheritance? It is the resurrection body, the new heavens and new earth, eternal fellowship with God, and the fullness of joy in His presence. The Spirit is the down payment; the resurrection world is the full inheritance.

### What This Means for Insecurity

Many Christians live with nagging insecurity. "Am I really saved? Will God keep me? What if I fail too badly?" The sealing of the Spirit answers those fears. God has put His own Spirit in you as a guarantee. He will finish what He started (Philippians 1:6).

Your confidence is not in your hold on God. It is in God's hold on you. And His hold is the Holy Spirit.
`,
      actionStep:
        "Write down one fear you have about your spiritual security. Then write Ephesians 1:13-14 as a personal promise over that fear.",
      discussionPrompt:
        "How does the Spirit as 'seal and guarantee' change the way you handle doubt and insecurity?",
    },
    {
      title: "3.3 — Indwelling: The Temple of the Spirit",
      type: "READING",
      order: 3,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "1 Corinthians 6:19-20 — Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own; you were bought at a price.",
      content: `## Indwelling: The Temple of the Spirit

There is a difference between the Spirit being *with* you and the Spirit being *in* you. In the Old Testament, the Spirit came upon people for specific tasks. In the New Testament, the Spirit takes up permanent residence within every believer. Your body becomes a temple.

### From Outer Court to Inner Sanctuary

Under the old covenant, God's presence dwelt in the tabernacle and later the temple. Only the high priest could enter the Most Holy Place, and only once a year. A thick curtain separated the people from the immediate presence of God.

At Jesus' death, that curtain was torn from top to bottom (Matthew 27:51; Mark 15:38). The barrier was removed. And at Pentecost, the Spirit moved out of a building and into people. Peter declares that believers are "being built into a spiritual house to be a holy priesthood" (1 Peter 2:5). The temple is now a people.

### The Spirit in Every Believer

Paul asks the Corinthians, "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God?" (1 Corinthians 6:19). Notice the pronouns: *your* bodies, *who is in you*. The Spirit is not in the church building. He is in *you*.

This is true of every believer, regardless of how mature or gifted you feel. The moment you put your faith in Jesus, the Spirit moved in. He will never leave.

### The Dignity of Your Body

If your body is the temple of the Holy Spirit, it has dignity. Your body is not merely a machine for pleasure or productivity. It is the dwelling place of God. This has implications for how you treat your body, your sexuality, your sleep, your food, your work, and your rest.

Paul's point in 1 Corinthians 6 is specifically about sexual purity. He says, "You are not your own; you were bought at a price. Therefore honor God with your bodies" (1 Corinthians 6:20). The Spirit does not live in a body meant for selfish indulgence. He lives in a body meant for worship.

### The Comfort of His Presence

The indwelling Spirit means you are never alone. You cannot travel beyond His presence. You cannot fall beneath His gaze. In your best moments and your worst, He is there. Jesus' promise is fulfilled: "Surely I am with you always" (Matthew 28:20).

This week, practice the awareness of His presence. When you wake, when you eat, when you work, when you rest, remember: the Spirit of God is in this body, in this moment, in this ordinary life.
`,
      actionStep:
        "Set three phone reminders today with the words: 'The Spirit is in me.' Each time it appears, pause and acknowledge His presence.",
      discussionPrompt:
        "How does viewing your body as the temple of the Spirit affect your daily choices?",
    },
    {
      title: "3.4 — Filled with the Spirit: Command and Continualness",
      type: "READING",
      order: 4,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Ephesians 5:18-20 — Do not get drunk on wine, which leads to debauchery. Instead, be filled with the Spirit, speaking to one another with psalms, hymns, and songs from the Spirit. Sing and make music from your heart to the Lord, always giving thanks to God the Father for everything.",
      content: `## Filled with the Spirit: Command and Continualness

Being indwelt by the Spirit is a one-time event at conversion. Being filled with the Spirit is a repeated, ongoing experience. The Bible commands believers to "be filled with the Spirit" (Ephesians 5:18), using a present-tense verb that suggests continual action: keep on being filled.

### The Contrast with Drunkenness

Paul contrasts being filled with the Spirit with being drunk. Drunkenness controls a person from the outside, lowers inhibitions, and produces foolishness. Being filled with the Spirit means being controlled from the inside by God, with the result of joy, worship, gratitude, and mutual edification.

The image is striking. Just as wine can fill and influence a person, so the Spirit can fill and influence a person. But the effects are opposite. Wine leads to debauchery. The Spirit leads to songs, thanksgiving, and submission to one another.

### What Filling Feels Like

The filling of the Spirit is not primarily an emotional sensation, though emotions may be involved. It is a state of being under the Spirit's control. A person filled with the Spirit is:

- Responsive to God's Word
- Overflowing in worship and thanksgiving
- Submissive to others in reverence for Christ
- Courageous in witness
- Loving in action
- Wise in speech

You can be filled with the Spirit while feeling peaceful, while weeping, while singing, or while silently obeying. The common thread is yieldedness.

### How to Be Filled

Being filled is both God's work and our response. We cannot fill ourselves. We can only open ourselves. Here are the biblical conditions for being filled:

1. **Repentance.** Confess and turn from anything that grieves the Spirit.
2. **Surrender.** Yield your plans, desires, words, and body to God.
3. **Faith.** Ask expectantly, trusting that God delights to give the Spirit.
4. **Obedience.** Step out in the direction the Spirit is leading.
5. **Praise.** Fill your mouth with thanksgiving, psalms, and spiritual songs.
6. **Community.** The Spirit fills us as we gather with other believers.

### A Daily Habit

One practical way to seek the filling of the Spirit is a daily prayer of surrender:

> "Holy Spirit, I confess my sin and turn from it. I surrender my body, mind, relationships, and schedule to You. Fill me afresh today. Control my thoughts, my words, and my actions. I want to live under Your influence, not my own. In Jesus' name, amen."

Say it slowly. Mean it. Then live the day as if you have been answered — because you have.
`,
      actionStep:
        "Pray Ephesians 5:18-20 as a surrender prayer each morning this week. Note any change in your speech, gratitude, or relationships.",
      discussionPrompt:
        "What is the difference between the Spirit's permanent indwelling and His repeated filling?",
    },
    {
      title: "3.5 — Baptism in the Spirit: One Event or Many Experiences?",
      type: "READING",
      order: 5,
      durationSeconds: 660,
      coverUrl: null,
      memoryVerse: "1 Corinthians 12:13 — For we were all baptized by one Spirit so as to form one body — whether Jews or Gentiles, slave or free — and we were all given the one Spirit to drink.",
      content: `## Baptism in the Spirit: One Event or Many Experiences?

Few topics have divided Christians more than "baptism in the Holy Spirit." Different traditions teach different things. This lesson will present the main views fairly, ground them in Scripture, and help you find your place without condemning others.

### The Biblical Data

The phrase "baptism in the Holy Spirit" comes from several key passages:

- **John the Baptist's prophecy:** "I baptize you with water. But one who is more powerful than I will come... He will baptize you with the Holy Spirit and fire" (Luke 3:16).
- **Jesus' promise:** "In a few days you will be baptized with the Holy Spirit" (Acts 1:5).
- **Pentecost:** "All of them were filled with the Holy Spirit" (Acts 2:4).
- **The Samaritans:** "They had simply been baptized in the name of the Lord Jesus. Then Peter and John placed their hands on them, and they received the Holy Spirit" (Acts 8:16-17).
- **Cornelius' household:** "The Holy Spirit came on all who heard the message" (Acts 10:44).
- **Paul at Ephesus:** "When Paul placed his hands on them, the Holy Spirit came on them, and they spoke in tongues and prophesied" (Acts 19:6).
- **Paul's theology:** "For we were all baptized by one Spirit so as to form one body" (1 Corinthians 12:13).

### View 1: Baptism in the Spirit Happens at Conversion

Many Reformed and evangelical theologians argue that every believer is baptized in the Spirit at conversion. The evidence is 1 Corinthians 12:13: all believers have been baptized by the Spirit into one body. This baptism unites us to Christ and to His church.

In this view, the Spirit comes at regeneration, indwells permanently, and may be filled repeatedly. Special empowering experiences are called "fillings" or "outpourings," not a second baptism.

### View 2: Baptism in the Spirit Is a Post-Conversion Experience

Many Pentecostal and charismatic believers argue that baptism in the Spirit is a distinct experience after conversion, often accompanied by speaking in tongues or other spiritual gifts. They point to Acts, where believers who had already believed received the Spirit later.

In this view, conversion brings the indwelling Spirit, but baptism in the Spirit brings a new level of empowerment for witness and service.

### A Humble Way Forward

Both views have strengths. The first guards against a two-tier Christianity. The second keeps the church hungry for experiential empowerment. The New Testament does not present one rigid pattern for every believer. It presents a Spirit who comes at conversion, fills repeatedly, and empowers for mission.

Here is a balanced conclusion: every believer has received the Spirit and is united to Christ. Every believer can and should seek to be filled with the Spirit continually. Some believers experience a clear, decisive moment of empowerment that they call "baptism in the Spirit." Others experience a steady, growing fullness. Both are valid. Neither should look down on the other.

### The Test of Genuine Experience

Whatever language you use, the test is fruit. Does the experience lead to greater love for Jesus, greater boldness in witness, greater holiness, and greater love for the church? If so, it is of the Spirit. If it leads to pride, division, or disregard for Scripture, it is not.
`,
      actionStep:
        "Read 1 Corinthians 12:13 and Acts 1:8. Write a one-paragraph statement of what you believe about Spirit baptism, using humble language.",
      discussionPrompt:
        "How can believers hold different views on Spirit baptism while still honoring one another in the same church?",
    },
    {
      title: "3.6 — Walking in the Spirit: A Daily Rhythm",
      type: "READING",
      order: 6,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Galatians 5:16 — So I say, walk by the Spirit, and you will not gratify the desires of the flesh.",
      content: `## Walking in the Spirit: A Daily Rhythm

The Christian life is not a single event. It is a walk — a daily journey of steps, choices, and habits. Paul commands the Galatians, "Walk by the Spirit, and you will not gratify the desires of the flesh" (Galatians 5:16). Walking in the Spirit is the normal, everyday way a disciple lives.

### What "Walking" Means

Walking implies movement, direction, and ongoing effort. It is not a dramatic leap. It is a series of small decisions. To walk in the Spirit means to order your life under the Spirit's direction, moment by moment.

When you walk by the Spirit:

- You begin the day by surrendering to Him.
- You consult Him before decisions, large and small.
- You obey promptly when He convicts you.
- You return quickly when you stray.
- You depend on Him for strength you do not have.

### The Alternative: Gratifying the Flesh

"The flesh" is not your body. It is the old, self-centered nature that operates apart from God. It desires control, comfort, approval, pleasure, and autonomy. When you walk in the flesh, you gratify those desires. When you walk in the Spirit, those desires are progressively displaced by love, joy, peace, and the rest of the Spirit's fruit.

Paul's promise is not that temptation disappears. It is that the Spirit gives you a different power to respond. You are no longer enslaved to the old desires. You have a new capacity to choose God.

### A Daily Rhythm

Here is one way to structure your day around walking in the Spirit:

**Morning:** Welcome the Spirit. Surrender your day. Ask for filling.
**Throughout the day:** Pause before reacting. Ask, "Spirit, what do You want here?"
**Before decisions:** Seek wisdom. Wait for peace. Check with Scripture.
**In conflict:** Ask the Spirit to give you His fruit — love, patience, self-control.
**In temptation:** Call on the Spirit immediately. Do not negotiate with sin.
**Evening:** Review the day. Confess failures. Thank Him for help. Rest in His presence.

### When You Fail

You will not walk perfectly. No one does. The good news is that the Spirit is not waiting to punish you. He is waiting to restore you. When you sin, confess it quickly. "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness" (1 John 1:9). Then get up and walk again.

The Christian life is not about perfect performance. It is about persistent direction. Are you walking toward Jesus, by the Spirit, even when you stumble?
`,
      actionStep:
        "Create a simple 'Walking in the Spirit' daily checklist for this week. At day's end, mark where you yielded and where you resisted.",
      discussionPrompt:
        "What is one daily trigger that most often pulls you out of walking in the Spirit?",
    },
    {
      title: "3.7 — When the Spirit Seems Silent",
      type: "READING",
      order: 7,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Psalm 139:7 — Where can I go from your Spirit? Where can I flee from your presence?",
      content: `## When the Spirit Seems Silent

Every believer goes through seasons when the Spirit feels silent. Prayer seems empty. Worship feels flat. The Bible reads like dry paper. Promises that once thrilled now feel distant. These seasons are normal, but they are also disorienting.

This lesson is about what to do when the Spirit seems silent.

### He Is Still Present

The first truth to hold onto is this: the Spirit has not left. David could pray, "Do not take your Holy Spirit from me" because under the old covenant the Spirit could depart. But Jesus promised that the Spirit "will be with you forever" (John 14:16). Paul says you were "sealed" with the Spirit (Ephesians 1:13). Your feelings do not determine His presence. His promise does.

### Possible Reasons for Silence

Silence does not always mean absence. Sometimes it means:

- **Growth.** God often teaches us to walk by faith, not by feeling.
- **Refinement.** He may be weaning us from dependence on emotional experiences.
- **Sin.** Unconfessed sin can create a sense of distance. Confession restores fellowship.
- **Exhaustion.** Physical and emotional depletion can dull our spiritual senses.
- **Transition.** God may be preparing you for a new season or calling.
- **Invitation to deeper trust.** Silence can be a classroom where faith matures.

### What to Do in the Silence

1. **Keep showing up.** Read Scripture, pray, worship, and gather with believers even when it feels empty. Faithfulness in dryness is one of the deepest forms of faith.
2. **Examine your heart.** Ask the Spirit if there is sin, fear, or unbelief to confess.
3. **Rest in the gospel.** Your standing with God is not based on your spiritual sensations. It is based on Jesus.
4. **Simplify your spiritual diet.** Sometimes noise — too much content, too many voices — drowns out the Spirit's whisper.
5. **Wait with hope.** The desert does not last forever. Streams return. The Spirit is faithful.

### The Value of Dry Seasons

Dry seasons teach you that your relationship with God cannot depend on constant excitement. A mature faith trusts God in the dark as much as in the light. The Spirit's silence is not His absence. It may be His way of drawing you into a quieter, deeper dependence.

This week, if you are in a dry season, do not panic. Do not abandon your practices. Do not make drastic decisions out of spiritual numbness. Keep walking. The One who sealed you is still walking with you, even when you cannot feel Him.
`,
      actionStep:
        "If you are in a dry season, write a letter to God expressing your feelings without trying to fix them. If you are not, write a prayer for someone who is.",
      discussionPrompt:
        "How can we distinguish between a healthy dry season and a problem that needs pastoral help?",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 4 — The Spirit's Voice
// ─────────────────────────────────────────────────────────────────────────────

export const HS_MODULE_4 = {
  title: "Module 4: The Spirit's Voice",
  order: 4,
  lessons: [
    {
      title: "4.1 — The Many Ways the Spirit Speaks",
      type: "READING",
      order: 1,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "John 16:13 — But when he, the Spirit of truth, comes, he will guide you into all the truth. He will not speak on his own; he will speak only what he hears, and he will tell you what is yet to come.",
      content: `## The Many Ways the Spirit Speaks

One of the most common questions believers ask is: "How do I hear the Holy Spirit?" The question is good, but the answer is broader than most people expect. The Spirit does not speak in only one way. He is a skilled communicator who uses many channels to reach the human heart.

### Scripture: The Primary Voice

The Spirit speaks most clearly and reliably through the Bible. The same Spirit who inspired the Scriptures now illuminates them. When you read the Bible under the Spirit's guidance, ancient words become living guidance. This is why Scripture must always be the foundation of discernment.

### The Inner Witness

Romans 8:16 says, "The Spirit himself testifies with our spirit that we are God's children." The Spirit produces an inward confirmation, a deep sense that something is true, right, or from God. This is not a loud voice. It is often a quiet knowing, a settled peace, or a persistent conviction.

### Impressions and Promptings

The Spirit often nudges. He may prompt you to call someone, give something, speak a word of encouragement, or turn away from a temptation. These impressions are usually gentle, brief, and specific. They require quick obedience.

### Dreams and Visions

In the Old and New Testaments, the Spirit spoke through dreams and visions. Joel promised that in the last days, "your old men will dream dreams, your young men will see visions" (Joel 2:28). These are not the most common modes today, but they are biblical. They must always be tested against Scripture.

### Circumstances and Open Doors

The Spirit guides through providence. Closed doors and open doors are part of His language. Paul was "kept by the Holy Spirit from preaching the word in the province of Asia" (Acts 16:6). Sometimes the Spirit's guidance comes through what He prevents.

### Other Believers

The Spirit speaks through the church. Counsel from mature believers, prophetic words in community, and the wisdom of elders are all channels of the Spirit's guidance. No believer should try to hear God entirely alone.

### Creation and Conscience

The Spirit can also speak through the beauty of creation, stirring wonder and gratitude, and through conscience, warning us when we violate what we know is right.

### The Key: A Layered Approach

The Spirit rarely relies on only one channel. Usually, His guidance is confirmed through multiple layers: Scripture, inner peace, community wisdom, circumstances, and conscience. The more layers align, the more confident you can be.
`,
      actionStep:
        "List five ways the Spirit has spoken to you in the past. Identify which channels were involved.",
      discussionPrompt:
        "Which channel of the Spirit's voice do you most easily recognize, and which do you most easily miss?",
    },
    {
      title: "4.2 — Scripture as the Foundation of Guidance",
      type: "READING",
      order: 2,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Psalm 119:105 — Your word is a lamp for my feet, a light on my path.",
      content: `## Scripture as the Foundation of Guidance

The Holy Spirit will never contradict the Scripture He inspired. That may sound obvious, but it is essential. Many people claim the Spirit told them to do something that clearly violates God's Word. That is not the Spirit. It is deception, desire, or imagination.

### The Spirit Is the Author and Interpreter

Peter writes that "no prophecy of Scripture came about by the prophet's own interpretation of things. For prophecy never had its origin in the human will, but prophets, though human, spoke from God as they were carried along by the Holy Spirit" (2 Peter 1:20-21). The Spirit is the author of Scripture.

But the Spirit is also the interpreter. Paul prays that the Ephesians would receive "the Spirit of wisdom and revelation, so that you may know him better" (Ephesians 1:17). The Spirit opens our eyes to understand what we read.

### The Bible as a Lamp

Psalm 119:105 says, "Your word is a lamp for my feet, a light on my path." A lamp does not illuminate the entire landscape. It lights the next step. Scripture gives us the boundaries, principles, and commands we need for the vast majority of decisions.

If Scripture clearly commands or forbids something, you do not need a special revelation. You need obedience.

### How to Read with the Spirit

Reading Scripture with the Spirit means more than reading words on a page. It means:

- **Approaching humbly:** Come asking the Spirit to teach you.
- **Reading attentively:** Notice context, genre, and the original audience.
- **Meditating slowly:** Do not rush. Let a verse sink in.
- **Applying personally:** Ask, "What does this require of me?"
- **Responding obediently:** Do what it says.

### Scripture and Specific Decisions

Scripture does not always tell you which job to take or whom to marry. But it gives you the character, priorities, and boundaries within which any good decision must fit. A job that requires dishonesty is out. A marriage to someone who does not love Jesus is out. Within those boundaries, the Spirit gives wisdom.

### A Healthy Habit

Before asking the Spirit for guidance on a specific matter, ask Him to search you through Scripture. Often, the guidance you need has already been given in the Word.
`,
      actionStep:
        "Choose one current decision. Identify the biblical principles that must shape that decision before asking for specific guidance.",
      discussionPrompt:
        "Why is Scripture the safest and most reliable channel of the Spirit's voice?",
    },
    {
      title: "4.3 — The Inner Witness and the Peace of God",
      type: "READING",
      order: 3,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Colossians 3:15 — Let the peace of Christ rule in your hearts, since as members of one body you were called to peace. And be thankful.",
      content: `## The Inner Witness and the Peace of God

One of the most precious ministries of the Holy Spirit is the inner witness. The Spirit testifies to our spirit that we belong to God. He also gives peace — or withholds it — to guide us in decisions. This is not irrational mysticism. It is a biblical and experiential reality.

### What Is the Inner Witness?

The inner witness is the Spirit's confirmation deep within us. It is not a thought we generate. It is a sense, often beyond words, that something is true or right. Romans 8:16 says the Spirit "testifies with our spirit." The Greek word for "testify" is a legal word. The Spirit is like a witness in court, confirming the truth to us.

For believers, the inner witness commonly affirms:

- That we are God's children.
- That our sins are forgiven.
- That we are accepted in Christ.
- That a particular direction is right.
- That a particular direction is wrong.

### The Peace of God as an Umpire

Paul tells the Colossians, "Let the peace of Christ rule in your hearts" (Colossians 3:15). The word "rule" was used for an umpire in athletic games. Peace is meant to make the call. When peace is absent, pause. When peace is present, proceed.

This peace is not merely the absence of conflict. It is the settled confidence that comes from the Spirit when we are aligned with God's will. It is possible to be afraid and still have this peace. It is possible to be excited and lack it.

### Distinguishing Peace from Preference

The peace of God is not the same as comfort. Sometimes God's will is uncomfortable. Sometimes obeying God brings hardship. The peace of God does not guarantee ease. It guarantees alignment.

On the other hand, personal preference can feel like peace. We can feel "peaceful" about a decision simply because it is what we want. That is why the inner witness must be tested by Scripture, community, and the fruit that follows.

### Cultivating Sensitivity

To grow in recognizing the inner witness, you must slow down. Noise, hurry, and distraction dull the Spirit's whisper. Create space: silence, solitude, Scripture, and prayer. Over time, you will learn the difference between the Spirit's voice and your own thoughts.
`,
      actionStep:
        "For three days, spend five minutes in silence before making any significant decision. Note whether peace or unrest arises.",
      discussionPrompt:
        "How do you tell the difference between the Spirit's peace and your own desire for comfort?",
    },
    {
      title: "4.4 — Prophecy, Words, and Impressions",
      type: "READING",
      order: 4,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "1 Corinthians 14:1 — Follow the way of love and eagerly desire gifts of the Spirit, especially prophecy.",
      content: `## Prophecy, Words, and Impressions

Prophecy is one of the most misunderstood gifts of the Spirit. In the New Testament, prophecy is not primarily about predicting the future. It is about speaking God's truth into a situation for edification, encouragement, and comfort (1 Corinthians 14:3). When the Spirit gives a word to a believer, it is meant to build up the church and point people to Jesus.

### What Prophecy Is

Prophecy is the human report of a divine revelation. A person receives an impression, picture, Scripture, or sense from the Spirit and communicates it in love. It may reveal something hidden, confirm God's direction, or bring encouragement in a difficult moment.

Prophecy is not equal to Scripture. Scripture is the inspired, infallible Word of God. Prophecy is a contemporary Spirit-given message that must be tested. Prophecy can be partial, mixed with human interpretation, or simply wrong.

### Receiving Impressions

Impressions from the Spirit can come as:

- A sudden thought or phrase
- A mental picture or scene
- A strong sense about a person or situation
- A Scripture verse that seems to leap off the page
- A burden to pray, call, or visit someone

These impressions should be handled with humility. Not every thought is from God. But some are. The key is to learn the difference.

### Giving a Word

If you believe the Spirit has given you a word for someone, follow these guidelines:

1. **Test it against Scripture.** Does it align with God's Word and character?
2. **Check your motives.** Are you seeking to bless or to impress?
3. **Speak with love and humility.** Use language like, "I sense the Lord may be saying..." rather than, "Thus says the Lord."
4. **Let the receiver judge it.** The one who receives a prophecy should test it (1 Corinthians 14:29).
5. **Leave room for error.** A prophetic word is not a guarantee. It is an invitation to seek God.

### Receiving a Word

When someone gives you a word, do not swallow it blindly. Do not reject it proudly. Test it. Does it align with Scripture? Does it bear witness in your spirit? Does it produce love, peace, and obedience? Does it come through a trustworthy source?

### The Goal of Prophecy

The goal is never the prophet. The goal is the glory of Jesus and the building up of His people. "The one who prophesies edifies the church" (1 Corinthians 14:4). Every genuine prophetic ministry will make the church stronger, holier, and more devoted to Christ.
`,
      actionStep:
        "Ask two trusted believers if they have ever received a prophetic word that proved meaningful. Listen to their stories and note what made the word healthy or unhealthy.",
      discussionPrompt:
        "How can churches practice prophecy in a way that is both honoring to the Spirit and safe for everyone?",
    },
    {
      title: "4.5 — Dreams, Visions, and Circumstances",
      type: "READING",
      order: 5,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Acts 2:17 — In the last days, God says, I will pour out my Spirit on all people. Your sons and daughters will prophesy, your young men will see visions, your old men will dream dreams.",
      content: `## Dreams, Visions, and Circumstances

The Spirit does not limit Himself to spoken words or Scripture reading. He also guides through dreams, visions, and the providential arrangement of circumstances. These channels require wisdom and testing, but they are part of the biblical landscape.

### Dreams in the Bible

From Joseph in Genesis to Joseph in Matthew, from Pharaoh to Nebuchadnezzar, from Jacob to Peter, dreams are a recurring means of divine communication. Some dreams are clearly from God. Others are the product of anxiety, digestion, or the subconscious. The difference is tested by fruit, timing, and confirmation.

A dream from God usually has these qualities:

- It is vivid and memorable.
- It has a clear spiritual message.
- It aligns with Scripture.
- It is confirmed by other means.
- It leads to obedience, faith, or comfort.

### Visions in the Bible

Visions are like waking dreams. The Spirit opened the eyes of Elisha's servant to see the angelic army (2 Kings 6:17). The Spirit gave Paul a vision of a man in Macedonia calling for help (Acts 16:9). The Spirit gave John the visions recorded in Revelation. Visions can be external or internal, dramatic or subtle.

### Circumstances as Guidance

The Spirit often guides through the closing and opening of doors. Paul's missionary team tried to go into Bithynia, "but the Spirit of Jesus would not allow them to" (Acts 16:7). Sometimes the Spirit's clearest word is "not now" or "not this."

Other times, circumstances line up in remarkable ways: the right person appears at the right time, provision arrives unexpectedly, or obstacles fall away. These "coincidences" are often the fingerprints of the Spirit.

### The Danger of Over-Spiritualizing

Not every dream is prophetic. Not every open door is from God. Not every obstacle is the Spirit closing a door. Sometimes a dream is just a dream. Sometimes an opportunity is simply an opportunity. The Spirit expects us to use wisdom.

That is why the layered discernment model matters. Dreams, visions, and circumstances should be tested by Scripture, inner peace, community wisdom, and the fruit that follows.
`,
      actionStep:
        "Think of one recent 'coincidence' in your life. Write how it might be the Spirit arranging circumstances, and how you can test that possibility.",
      discussionPrompt:
        "How do we honor dreams and visions without becoming superstitious or gullible?",
    },
    {
      title: "4.6 — Testing the Spirits: Discernment Without Cynicism",
      type: "READING",
      order: 6,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "1 John 4:1 — Dear friends, do not believe every spirit, but test the spirits to see whether they are from God, because many false prophets have gone out into the world.",
      content: `## Testing the Spirits: Discernment Without Cynicism

The New Testament commands believers to test the spirits. John warns, "Do not believe every spirit, but test the spirits to see whether they are from God" (1 John 4:1). Paul tells the Thessalonians, "Do not quench the Spirit. Do not treat prophecies with contempt but test them all; hold on to what is good, reject every kind of evil" (1 Thessalonians 5:19-22).

Testing is not rejection. It is discernment. The goal is to welcome what is from God and refuse what is not.

### The Test of Christ

The most important test is the test of Christ. "Every spirit that acknowledges that Jesus Christ has come in the flesh is from God, but every spirit that does not acknowledge Jesus is not from God" (1 John 4:2-3). Any spiritual experience, teaching, or impression that diminishes Jesus, denies His humanity or deity, or redirects devotion away from Him is false.

### The Test of Scripture

Does the message align with the Bible? The Spirit will never contradict the Word He inspired. If a prophetic word, dream, or teaching contradicts Scripture, it is not from the Spirit.

### The Test of Fruit

Jesus said, "By their fruit you will recognize them" (Matthew 7:16). Does the message produce love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control? Or does it produce pride, division, fear, manipulation, or immorality?

### The Test of Community

No believer should discern alone. "The spirits of prophets are subject to the control of prophets" (1 Corinthians 14:32). Healthy churches test prophecies together. A word that cannot be shared with mature believers is suspect.

### The Test of Peace

Colossians 3:15 says to let peace rule. If a supposed leading produces chronic anxiety, unrest, or pressure, it may not be from God. The Spirit brings peace, even when He convicts or challenges.

### Discernment Without Cynicism

Some believers test everything so rigorously that they quench the Spirit. They reject genuine works of God because the packaging is unfamiliar. Others accept everything so uncritically that they fall into deception.

The healthy path is humble discernment: open to the Spirit's surprising work, but anchored to Scripture and accountable to the community. Test everything. Hold fast to what is good. Reject what is evil.
`,
      actionStep:
        "Write out the five tests listed above as a personal discernment checklist. Use it the next time you receive a spiritual impression.",
      discussionPrompt:
        "How can a church encourage spiritual gifts without tolerating deception?",
    },
    {
      title: "4.7 — A Decision-Making Framework",
      type: "READING",
      order: 7,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Proverbs 3:5-6 — Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      content: `## A Decision-Making Framework

Life is full of decisions. Some are small: what to eat, what to wear, how to spend an hour. Some are large: whom to marry, where to live, what career to pursue, whether to move overseas. The Spirit wants to guide you in all of them, but His guidance operates through a layered process.

Here is a biblical framework for decision-making.

### Layer 1: Scripture

Start with the written Word of God. Does the Bible command or forbid anything related to this decision? If so, that is your guidance. Obedience comes first.

### Layer 2: Wisdom and Counsel

Proverbs says, "Plans fail for lack of counsel, but with many advisers they succeed" (Proverbs 15:22). Seek advice from mature believers who know you and know God's Word. The Spirit often speaks through the church.

### Layer 3: Inner Witness and Peace

What does the Spirit seem to be saying in your spirit? Do you have peace about one option and unrest about another? Let peace act as an umpire, but remember that peace must be tested by Scripture and wisdom.

### Layer 4: Circumstances and Open Doors

What is actually possible? What doors are open? What doors are closed? The Spirit guides through providence. Sometimes the right decision is the one that is actually available and aligns with the other layers.

### Layer 5: Conscience and Conviction

What can you do with a clear conscience? Do not violate your conscience where Scripture has spoken, but also be willing to let your conscience be educated by the Spirit and the Word.

### Applying the Framework

For a major decision, work through each layer in writing. Ask:

- What does Scripture say?
- What do trusted advisers say?
- What is my inner peace?
- What do circumstances allow?
- What can I do with a clear conscience?

When most or all layers align, move forward with confidence. When they conflict, wait. Do not rush a decision when the layers are divided.

### Trusting God with the Outcome

Even with the best discernment, you will sometimes make decisions that do not turn out as hoped. That does not mean you failed to hear God. It means you live in a fallen world. God is able to work even through imperfect decisions. The goal is not perfect certainty. The goal is faithful obedience.
`,
      actionStep:
        "Choose one current decision and apply the five-layer framework in writing. Share it with one trusted believer.",
      discussionPrompt:
        "Which layer of the decision-making framework do you most often neglect?",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 5 — The Spirit's Fruit
// ─────────────────────────────────────────────────────────────────────────────

export const HS_MODULE_5 = {
  title: "Module 5: The Spirit's Fruit",
  order: 5,
  lessons: [
    {
      title: "5.1 — Fruit versus Gifts: The Primacy of Character",
      type: "READING",
      order: 1,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Galatians 5:22-23 — But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.",
      content: `## Fruit versus Gifts: The Primacy of Character

The Spirit does two major works in believers: He gives gifts, and He produces fruit. Both are essential. But if we must choose which is more fundamental, the Bible points to fruit. Character is the goal. Gifts are tools. A person may have remarkable gifts and yet lack the fruit — and that person is in danger.

### The Difference Between Fruit and Gifts

Gifts are abilities given by the Spirit for service. Fruit is character formed by the Spirit in the soul. Gifts are given at once. Fruit grows over time. Gifts are distributed differently to different people. Fruit should be present in every believer.

Paul warns the Corinthians, who were zealous for gifts but immature in character: "Are you not acting like mere human beings?" (1 Corinthians 3:3). Gifts without fruit produce pride, division, and spiritual infantilism.

### Why Fruit Matters More

Jesus said, "By their fruit you will recognize them" (Matthew 7:16). He did not say, "By their gifts you will recognize them." The test of a true disciple is not the display of power but the presence of love.

A Spirit-filled person is not necessarily the one who speaks in tongues or performs miracles. A Spirit-filled person is the one whose life overflows with love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.

### Fruit Is for Every Believer

Notice that Paul uses the singular: "the fruit of the Spirit is..." not "fruits are." The fruit is one cluster. Every believer is meant to display all of these qualities, just as every branch of a vine produces grapes. You cannot pick and choose which fruit to grow. The Spirit grows the whole cluster in you.

### The Root of Fruit

Fruit does not grow by willpower. It grows by abiding. "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing" (John 15:5). The Spirit produces fruit as we stay connected to Jesus.

This module is about becoming the kind of person who naturally bears the Spirit's fruit. It is the most practical, most needed, and most neglected work of the Spirit.
`,
      actionStep:
        "Read 1 Corinthians 13 and Galatians 5:22-23. Write one sentence describing how love is the summary of all the fruit.",
      discussionPrompt:
        "Why do churches often emphasize gifts more than fruit? What are the dangers?",
    },
    {
      title: "5.2 — Love, Joy, Peace: The Inward Foundation",
      type: "READING",
      order: 2,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "1 John 4:7 — Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.",
      content: `## Love, Joy, Peace: The Inward Foundation

The first three fruits — love, joy, and peace — describe the inward foundation of the Spirit-filled life. They are the qualities that fill the soul and overflow into every relationship.

### Love

Love is the first fruit because it is the greatest command and the ultimate evidence of the Spirit. "The fruit of the Spirit is love" (Galatians 5:22). This is not sentimental feeling. It is the active, willful commitment to seek another person's good.

The Spirit produces this love by pouring "God's love into our hearts" (Romans 5:5). We love because He first loved us. As we absorb His love, we become able to love others — even enemies, even family members who are difficult, even strangers.

### Joy

Joy is deeper than happiness. Happiness depends on circumstances. Joy is rooted in the unchanging reality of God's love and kingdom. The Spirit gives joy even in sorrow, persecution, and loss.

Nehemiah said, "The joy of the Lord is your strength" (Nehemiah 8:10). The Spirit's joy is not flippant. It is resilient. It enables a believer to endure hardship because the deepest reality — union with God — cannot be taken away.

### Peace

Peace is the quiet confidence that God is in control and that you belong to Him. It is the opposite of anxiety. Paul says, "The peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus" (Philippians 4:7).

The Spirit produces peace by reminding us that we are accepted, provided for, and guided. Peace does not mean the absence of trouble. It means the presence of God in the trouble.

### The Foundation of the Other Fruit

Love, joy, and peace are the foundation. A person who lacks these will struggle with patience, kindness, gentleness, and self-control. But when these three are strong, the rest follow more naturally.

This week, ask the Spirit to strengthen these three in you. Where love is cold, ask for warmth. Where joy is thin, ask for depth. Where peace is missing, ask for His presence.
`,
      actionStep:
        "Rate yourself 1-10 on love, joy, and peace. Choose the lowest one and ask the Spirit to grow it this week. Journal one small change.",
      discussionPrompt:
        "Which of these three — love, joy, or peace — do you most need the Spirit to increase right now?",
    },
    {
      title: "5.3 — Patience, Kindness, Goodness: The Relational Evidence",
      type: "READING",
      order: 3,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Ephesians 4:32 — Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.",
      content: `## Patience, Kindness, Goodness: The Relational Evidence

The next three fruits — patience, kindness, and goodness — are most visible in relationships. They reveal how the Spirit is changing the way we treat people, especially people who are difficult or undeserving.

### Patience

Patience is the ability to endure irritation, delay, or suffering without responding in anger. The Greek word implies long-suffering — the willingness to put up with people and circumstances over time.

Patience is not passive resignation. It is active restraint. It is the choice to love someone today who may not change for years. The Spirit gives this patience by reminding us how patient God has been with us.

### Kindness

Kindness is active goodwill. It is doing small and large things that make another person's life better. Kindness notices. Kindness helps. Kindness speaks gently. Kindness gives the benefit of the doubt.

The Spirit makes us kind by filling us with the same kindness God showed us in Christ. "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you" (Ephesians 4:32).

### Goodness

Goodness goes deeper than kindness. Kindness is sweet. Goodness is strong. Goodness does what is right even when it is hard. Goodness confronts sin, protects the vulnerable, and stands for justice. Goodness is kindness with a backbone.

Jesus called Himself "good" only in the sense that God alone is good (Mark 10:18). The Spirit produces in us a goodness that reflects God's moral excellence — not self-righteousness, but genuine moral courage.

### Relational Evidence

These three fruits are tested in traffic, in marriage, in parenting, at work, and in the checkout line. A person who is patient, kind, and good in ordinary moments is more convincing than a person who preaches eloquently but snaps at the waiter.

The Spirit's work is always meant to make us better neighbors, better spouses, better parents, better coworkers, better friends.
`,
      actionStep:
        "Identify one difficult person in your life. Ask the Spirit for patience, kindness, and goodness toward that person. Act on it within 48 hours.",
      discussionPrompt:
        "How can we practice 'strong goodness' without becoming harsh or self-righteous?",
    },
    {
      title: "5.4 — Faithfulness, Gentleness, Self-Control: The Public Witness",
      type: "READING",
      order: 4,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Galatians 5:23 — Gentleness and self-control. Against such things there is no law.",
      content: `## Faithfulness, Gentleness, Self-Control: The Public Witness

The final three fruits — faithfulness, gentleness, and self-control — are the public witness of the Spirit's work. They show up over time and under pressure. They are the qualities that make a believer trustworthy, approachable, and disciplined.

### Faithfulness

Faithfulness is reliability over the long haul. It is doing what you said you would do, day after day, when no one is watching. The Spirit produces faithfulness by rooting us in God's faithfulness to us.

A faithful person keeps commitments. They show up. They finish. They do not need constant novelty or recognition. They are steady. In a world of flakiness, faithfulness is a powerful testimony.

### Gentleness

Gentleness is not weakness. It is strength under control. It is the opposite of harshness, bullying, and dominance. A gentle person can be firm without being cruel. They can correct without crushing.

Jesus described Himself as "gentle and humble in heart" (Matthew 11:29). Paul instructs leaders to be "gentle" in correcting opponents (2 Timothy 2:24-25). Gentleness makes truth accessible.

### Self-Control

Self-control is the ability to master your own impulses, desires, and reactions. It is the Spirit's answer to addiction, rage, lust, gluttony, and every form of excess.

Self-control is not willpower alone. It is the Spirit-given strength to say no to destructive desires and yes to life-giving ones. It is the fruit that protects all the other fruit.

### The Public Witness

Together, these three fruits make a believer credible in the world. A faithful, gentle, self-controlled person is a safe person. People trust them. People listen to them. The gospel gains plausibility through their character.

This week, ask someone close to you which of these three fruits they see most in you and which they see least. Receive their answer with humility.
`,
      actionStep:
        "Ask a trusted friend: 'Do you see faithfulness, gentleness, and self-control in me? Which one do I need most?' Listen without defending yourself.",
      discussionPrompt:
        "Why are faithfulness, gentleness, and self-control especially powerful in a culture of outrage and impulsivity?",
    },
    {
      title: "5.5 — The Spirit and Emotional Healing",
      type: "READING",
      order: 5,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Isaiah 61:1-2 — The Spirit of the Sovereign Lord is on me... to comfort all who mourn, and provide for those who grieve in Zion — to bestow on them a crown of beauty instead of ashes, the oil of joy instead of mourning.",
      content: `## The Spirit and Emotional Healing

The Holy Spirit is not only interested in your doctrine or your service. He is interested in your wounds. Jesus announced His mission with words of healing: "The Spirit of the Lord is on me... to bind up the brokenhearted, to proclaim freedom for the captives and release from darkness for the prisoners" (Isaiah 61:1). The Spirit came to heal what life has broken.

### The Wounds We Carry

Many believers carry hidden wounds: shame from the past, grief from loss, betrayal, abuse, anxiety, depression, rejection, or fear. These wounds affect how we relate to God, ourselves, and others. We may become defensive, withdrawn, angry, or compulsive.

The Spirit does not tell us to ignore these wounds. He enters them. He is "the Father of compassion and the God of all comfort" (2 Corinthians 1:3), and He comforts us by His Spirit.

### How the Spirit Heals

The Spirit heals in many ways:

- **He reveals the truth.** He helps us see our wounds without denial or exaggeration.
- **He convicts lies.** He replaces shame with the truth of our adoption in Christ.
- **He gives comfort.** His presence itself brings peace in the storm.
- **He brings memory and release.** Sometimes He brings up a wound so it can be grieved, forgiven, and released.
- **He uses community.** He heals through safe people, counselors, pastors, and friends.
- **He restores joy.** Mourning is real, but joy returns in time.

### Healing Is Not Instant

Some wounds heal quickly. Others heal slowly, layer by layer, over years. The Spirit does not promise instant emotional relief. He promises to walk with us through the valley. Psalm 23 says, "Even though I walk through the darkest valley, I will fear no evil, for you are with me." The Spirit is the "with me" in that valley.

### The Role of Professional Help

The Spirit can work through professional counseling, therapy, and medical care. Seeking help is not a lack of faith. It is wisdom. The Spirit uses doctors, therapists, and medication just as He uses prayer and community.

### A Prayer of Healing

> "Holy Spirit, You know the wounds I carry. I bring them to You honestly. Comfort me where I mourn. Free me where I am bound. Replace lies with truth. Restore joy where there has been sorrow. Heal me at the root, not just the surface. In Jesus' name."
`,
      actionStep:
        "Write down one emotional wound you have carried. Bring it to the Spirit in prayer. If needed, make an appointment with a counselor or pastor this week.",
      discussionPrompt:
        "How does the gospel address shame differently than mere self-esteem or positive thinking?",
    },
    {
      title: "5.6 — The Spirit and Habitual Sin",
      type: "READING",
      order: 6,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Galatians 5:16 — So I say, walk by the Spirit, and you will not gratify the desires of the flesh.",
      content: `## The Spirit and Habitual Sin

One of the most hopeful promises in the New Testament is that the Spirit gives believers power over sin. Paul says, "walk by the Spirit, and you will not gratify the desires of the flesh" (Galatians 5:16). This does not mean temptation disappears. It means sin no longer has dominion.

### The Flesh and the Spirit

"The flesh" is the old, self-directed nature. It wants its own way, its own comfort, its own glory. The flesh expresses itself through sexual immorality, impurity, hatred, jealousy, selfish ambition, dissensions, envy, drunkenness, and the like (Galatians 5:19-21).

The Spirit produces the opposite: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control (Galatians 5:22-23). Where the flesh divides and destroys, the Spirit unites and builds.

### Why Willpower Fails

Trying to defeat sin by willpower alone usually fails because the flesh is strong and our motives are mixed. We may white-knuckle our way through temptation for a while, but the root desire remains. The Spirit changes the root. He gives new desires, new power, and new identity.

### The Spirit's Strategy Against Sin

The Spirit does not merely suppress sin. He displaces it. His strategy includes:

1. **Conviction.** He shows us sin without crushing us.
2. **Repentance.** He enables us to turn away from sin and toward God.
3. **Identity.** He reminds us that we are new creations, not slaves to sin.
4. **Filling.** He fills the space sin once occupied with love, worship, and purpose.
5. **Community.** He places us among believers who encourage holiness.
6. **Accountability.** He gives us the courage to confess sin and receive help.

### When Sin Becomes Habitual

Some sins become patterns: anger, lust, lying, pornography, substance abuse, greed, gossip. These patterns require more than a single prayer. They require:

- Radical honesty
- Confession to God and trusted people
- Practical boundaries
- Replacement habits
- Ongoing accountability
- Sometimes professional help
- Persistent dependence on the Spirit

### A Daily Battle

Every day is a choice between walking in the Spirit and gratifying the flesh. The good news is that the Spirit is always available. The moment you recognize temptation, you can call on Him. The moment you fall, you can confess and return. The Spirit does not give up on you.
`,
      actionStep:
        "Identify one habitual sin pattern. Write a specific plan involving confession, boundaries, accountability, and Spirit-dependent replacement.",
      discussionPrompt:
        "How does the Spirit change our relationship to sin, not just our behavior?",
    },
    {
      title: "5.7 — Walking by the Spirit versus the Flesh",
      type: "READING",
      order: 7,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Galatians 5:25 — Since we live by the Spirit, let us keep in step with the Spirit.",
      content: `## Walking by the Spirit versus the Flesh

The Christian life is a walk. Paul says we "live by the Spirit" and should "keep in step with the Spirit" (Galatians 5:25). Keeping in step means moving at the Spirit's pace, in the Spirit's direction, with the Spirit's rhythm.

### The Flesh Walks Its Own Way

To walk in the flesh is to live as if God does not matter. It is self-directed living. The flesh makes decisions based on desire, fear, pride, or comfort. It uses people, hoards resources, avoids responsibility, and resists correction.

Walking in the flesh does not mean a believer has lost salvation. It means a believer is not relying on the Spirit. The result is predictable: the works of the flesh become visible.

### The Spirit Walks with God

To walk in the Spirit is to live in constant, willing dependence on God. It is not perfection. It is direction. A person walking in the Spirit may stumble, but they get up and keep walking with God.

Walking in the Spirit means:

- Starting the day in surrender
- Choosing obedience over convenience
- Returning quickly after failure
- Seeking the Spirit's wisdom before acting
- Living with openness and honesty before God and others

### The Conflict Within

Paul describes the internal conflict: "So I say, walk by the Spirit, and you will not gratify the desires of the flesh. For the flesh desires what is contrary to the Spirit, and the Spirit what is contrary to the flesh. They are in conflict with each other, so that you are not to do whatever you want" (Galatians 5:16-17).

This conflict is normal. As long as you live in this body, the flesh will desire what is contrary to the Spirit. The question is not whether the conflict exists. The question is which direction you are walking.

### Keeping in Step

An army keeps in step. A dance partner follows the lead. A disciple keeps in step with the Spirit. This requires attention, practice, and surrender. You cannot walk at your own pace and expect to stay with the Spirit.

This week, practice keeping in step. When you are tempted to rush, ask if the Spirit is rushing. When you are tempted to retreat, ask if the Spirit is retreating. When you are tempted to speak, ask if the Spirit is speaking. Walk with Him.
`,
      actionStep:
        "Create a simple 'flesh vs. Spirit' decision card. On one side, list the desires of the flesh. On the other, list the fruit of the Spirit. Carry it for one week.",
      discussionPrompt:
        "What does 'keeping in step with the Spirit' look like in your daily schedule?",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 6 — The Spirit's Gifts
// ─────────────────────────────────────────────────────────────────────────────

export const HS_MODULE_6 = {
  title: "Module 6: The Spirit's Gifts",
  order: 6,
  lessons: [
    {
      title: "6.1 — Gifts Are for the Body, Not the Individual",
      type: "READING",
      order: 1,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "1 Corinthians 12:7 — Now to each one the manifestation of the Spirit is given for the common good.",
      content: `## Gifts Are for the Body, Not the Individual

Spiritual gifts are often discussed as personal blessings or power boosts. But the Bible presents them differently. Gifts are given "for the common good" (1 Corinthians 12:7). They are tools for building up the church, not trophies for the gifted.

### Gifts Are Given by the Spirit

Paul says, "There are different kinds of gifts, but the same Spirit distributes them" (1 Corinthians 12:4). The Spirit is the giver. We do not earn gifts by being holy enough. We do not choose them by ambition. The Spirit gives according to His wisdom.

This removes both pride and despair. You cannot boast about a gift because it was given, not achieved. And you cannot despair that you lack a particular gift because the Spirit has given you what the body needs.

### Gifts Are for Edification

The purpose of gifts is to build up the church. Paul writes, "To each one the manifestation of the Spirit is given for the common good" (1 Corinthians 12:7). "Common good" means the good of the whole body, not the good of the individual.

Every gift is meant to make the church healthier, stronger, more loving, and more effective in mission. When gifts are used for self-promotion, division, or control, they are being misused.

### The Body Metaphor

Paul compares the church to a body. The eye cannot say to the hand, "I don't need you." The head cannot say to the feet, "I don't need you" (1 Corinthians 12:21). Every part is needed. Every gift matters.

Your gift may seem small. It may be behind-the-scenes. But if the Spirit gave it, the body needs it. Faithfulness in small gifts often produces more fruit than flashiness in large ones.

### Unity in Diversity

Gifts create diversity. The Spirit gives different gifts to different people so that together the church reflects the full wisdom and power of God. Unity is not uniformity. A healthy church has many gifts working in harmony.

This week, consider your place in the body. You are not a solo Christian. You are a member of a body, and your gift is needed by others.
`,
      actionStep:
        "Write a thank-you note to someone in your church whose gift has blessed you but who may not be noticed.",
      discussionPrompt:
        "Why is the 'common good' purpose of gifts often forgotten in church life?",
    },
    {
      title: "6.2 — The Speaking Gifts: Prophecy, Tongues, Interpretation, Teaching",
      type: "READING",
      order: 2,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "1 Corinthians 14:3 — But the one who prophesies speaks to people for their strengthening, encouraging and comfort.",
      content: `## The Speaking Gifts: Prophecy, Tongues, Interpretation, Teaching

The Spirit gives some believers special ability to communicate God's truth. These "speaking gifts" include prophecy, tongues, interpretation, teaching, exhortation, wisdom, and knowledge. They are powerful tools for building up the church.

### Prophecy

We have already discussed prophecy as a channel of guidance. As a gift, prophecy is the Spirit-enabled ability to speak a message from God that strengthens, encourages, and comforts the church (1 Corinthians 14:3). It is to be eagerly desired (1 Corinthians 14:1) and carefully tested (1 Thessalonians 5:20-21).

### Tongues and Interpretation

Speaking in tongues is the Spirit-given ability to speak in a language not learned by the speaker. Sometimes it is a known human language, as on the day of Pentecost. Sometimes it is a heavenly or spiritual language, as Paul describes in 1 Corinthians 14.

Tongues is primarily a gift for personal prayer and praise. Paul says, "Anyone who speaks in a tongue does not speak to people but to God. Indeed, no one understands them; they utter mysteries by the Spirit" (1 Corinthians 14:2). When tongues is used in public worship, it must be interpreted so the church can be edified.

Interpretation is the companion gift that enables someone to explain the meaning of a tongue so the body can understand and be built up.

### Teaching and Exhortation

Teaching is the ability to explain and apply Scripture clearly. Exhortation is the ability to encourage, challenge, and motivate others toward obedience. Both are essential for the church's maturity.

A good teacher opens the Bible. A good exhorter moves the heart. The Spirit often combines these gifts in one person, but He also distributes them separately.

### Wisdom and Knowledge

The word of wisdom and the word of knowledge are Spirit-given insights into situations and truths. They enable a believer to apply God's wisdom to complex problems or to know things that could not be known naturally.

### Using Speaking Gifts Well

All speaking gifts must be used in love and order. Paul writes, "Everything should be done in a fitting and orderly way" (1 Corinthians 14:40). The goal is edification, not display.
`,
      actionStep:
        "Read 1 Corinthians 14 in one sitting. List three principles for orderly use of speaking gifts in the church.",
      discussionPrompt:
        "How can churches honor speaking gifts while maintaining order and love?",
    },
    {
      title: "6.3 — The Sign Gifts: Healing, Miracles, Faith, Discernment",
      type: "READING",
      order: 3,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "1 Corinthians 12:9-10 — To another faith by the same Spirit, to another gifts of healing by that one Spirit, to another miraculous powers, to another prophecy, to another distinguishing between spirits.",
      content: `## The Sign Gifts: Healing, Miracles, Faith, Discernment

The Spirit also gives gifts that reveal God's kingdom power in tangible ways. These are often called sign gifts because they point to the reality of God's reign: healing, miracles, faith, and discernment of spirits.

### Healing

The gift of healing is the Spirit-given ability to pray for the sick and see them recover. It is not a guarantee that every prayer will result in physical healing. God is sovereign over healing. But the gift of healing means that the Spirit works through certain believers in unusual measure to bring physical restoration.

Healing is a sign of the kingdom. Jesus healed as a preview of the resurrection world where there will be no sickness, pain, or death. When the Spirit heals today, He gives us a taste of that future.

### Miracles

Miracles are supernatural interventions that go beyond healing — provision, protection, deliverance, nature miracles, and other acts that display God's power. The gift of miracles enables a believer to be a channel for such displays.

### Faith

The gift of faith is a Spirit-given confidence that God will act in a specific situation. It is different from saving faith, which every believer has. It is a special assurance that moves mountains, starts ministries, and sustains believers through impossible circumstances.

### Discernment of Spirits

Discernment of spirits is the ability to distinguish between the Holy Spirit, human spirits, and demonic spirits. It is crucial in counseling, deliverance, prophecy, and spiritual warfare. This gift must be paired with humility, because discernment can easily become judgmentalism.

### A Balanced View

Sign gifts are real, but they are not toys. They are signs of God's kingdom and tools for serving people. They must never be used for manipulation, fame, or financial gain. The Spirit who gives these gifts also produces the fruit that keeps them holy.
`,
      actionStep:
        "Pray for someone who is sick or facing an impossible situation this week. Ask the Spirit to release the gift of faith or healing as He wills.",
      discussionPrompt:
        "How do we maintain faith for healing while also accepting God's sovereignty when healing does not come?",
    },
    {
      title: "6.4 — The Service Gifts: Administration, Giving, Mercy, Helps, Leadership",
      type: "READING",
      order: 4,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "1 Peter 4:10-11 — Each of you should use whatever gift you have received to serve others, as faithful stewards of God's grace in its various forms.",
      content: `## The Service Gifts: Administration, Giving, Mercy, Helps, Leadership

Not all gifts are dramatic. Many of the most important gifts are quiet, practical, and behind-the-scenes. The Spirit gives gifts of administration, giving, mercy, helps, leadership, and hospitality. These gifts keep the church running and the mission moving.

### Administration

Administration is the ability to organize, plan, and manage people and resources effectively. Every church, nonprofit, and mission needs administrators. Without them, vision dies in confusion.

### Giving

The gift of giving is more than writing a check. It is the Spirit-enabled ability to give generously, joyfully, and strategically. People with this gift often see needs before others do and find creative ways to meet them.

### Mercy

The gift of mercy is the ability to feel and respond to the suffering of others. Mercy-gifted believers are drawn to the hurting, the lonely, the sick, and the broken. They reflect the compassion of Jesus in practical ways.

### Helps

Helps is the gift of coming alongside others to assist in their work. It is the gift of reliable support. People with this gift make everyone around them more effective. They are the unnoticed backbone of many ministries.

### Leadership

Leadership is the Spirit-given ability to guide, inspire, and direct a group toward a shared vision. Biblical leadership is servant leadership, not domination. A Spirit-gifted leader empowers others rather than using them.

### Hospitality

Hospitality is the gift of creating welcoming spaces for strangers, newcomers, and friends. It is a ministry of inclusion. In a lonely world, hospitality is a powerful expression of the gospel.

### Every Gift Is Needed

The church cannot function with only preachers and prophets. It needs administrators, givers, mercy-bearers, helpers, leaders, and hosts. Your gift may seem ordinary, but in the Spirit's hands it is extraordinary.
`,
      actionStep:
        "Identify which service gift you most naturally express. Find one concrete way to use it this week in your church or community.",
      discussionPrompt:
        "Why are service gifts sometimes undervalued compared to speaking or sign gifts?",
    },
    {
      title: "6.5 — Discovering and Developing Your Gifts",
      type: "READING",
      order: 5,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Romans 12:6 — We have different gifts, according to the grace given to each of us. If your gift is prophesying, then prophesy in accordance with your faith.",
      content: `## Discovering and Developing Your Gifts

How do you know what gifts the Spirit has given you? Discovery is a process, not a single test. It involves desire, experience, feedback, opportunity, and growth. This lesson gives a practical pathway for finding and developing your gifts.

### Step 1: Desire

Paul says, "eagerly desire gifts of the Spirit, especially prophecy" (1 Corinthians 14:1). It is good to want gifts. Desire is often the first indicator of where the Spirit is leading you. What do you long to do for God's people?

### Step 2: Experiment

You discover gifts by trying things. Serve in different areas. Teach a small group. Visit the sick. Organize an event. Give generously. Pray for someone. As you serve, patterns emerge.

### Step 3: Receive Feedback

Ask mature believers what they see in you. "Do you see any gift developing in me?" "Where have I been helpful?" "What do I seem to do well for the church?" Other people often see our gifts more clearly than we do.

### Step 4: Look for Fruit

Where do you see results that exceed your natural ability? Where do people grow, heal, or respond when you serve? Fruit is one of the best confirmations of a gift.

### Step 5: Develop Through Practice

Gifts grow with use and training. A person with a teaching gift should study how to teach. A person with a mercy gift should learn to listen well. A person with a leadership gift should grow in character and vision. The Spirit gives the gift; we are responsible to steward it.

### Step 6: Stay Humble

Gifts are not badges of honor. They are assignments. The more gifted you are, the more accountable you are. Stay teachable. Stay connected to the body. Stay focused on Jesus.

### A Discovery Prayer

> "Holy Spirit, show me the gifts You have given me. I do not want to hide them or misuse them. Give me opportunities to serve. Use me to build up Your church. Make me faithful, not famous."
`,
      actionStep:
        "Complete the Gifts Discovery Survey worksheet. Then ask two people who know you well to review your results and add their observations.",
      discussionPrompt:
        "How can a church create safe spaces for people to experiment with gifts?",
    },
    {
      title: "6.6 — Order and Love: Using Gifts Without Chaos",
      type: "READING",
      order: 6,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "1 Corinthians 14:26 — What then shall we say, brothers and sisters? When you come together, each of you has a hymn, or a word of instruction, a revelation, a tongue or an interpretation. Let all things be done for the strengthening of the church.",
      content: `## Order and Love: Using Gifts Without Chaos

Spiritual gifts are powerful, and power can be destructive if misused. The church at Corinth had plenty of gifts but little love and little order. Paul had to correct them: "Everything should be done in a fitting and orderly way" (1 Corinthians 14:40). Order is not the enemy of the Spirit. It is the love of the Spirit in action.

### Love Is More Important Than Gifts

Paul writes the famous chapter: "If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal" (1 Corinthians 13:1). Gifts without love are noise. Love is the atmosphere in which gifts become beautiful.

A prophet who does not love becomes harsh. A teacher who does not love becomes proud. A healer who does not love becomes mercenary. A leader who does not love becomes controlling.

### Order Protects the Vulnerable

Order in the use of gifts protects the church from confusion, manipulation, and harm. Paul's guidelines for Corinth included:

- Limit the number of tongues in a meeting unless there is interpretation.
- Let prophets speak one at a time, and let others weigh what is said.
- Women and men should participate in ways appropriate to their culture and calling.
- God is not a God of disorder but of peace.

These rules were not to suppress the Spirit but to ensure that "all things be done for the strengthening of the church" (1 Corinthians 14:26).

### Submission to One Another

The key to order is mutual submission. "Submit to one another out of reverence for Christ" (Ephesians 5:21). In a healthy church, every gifted person submits their gift to the good of the body. Leaders submit to accountability. Prophets submit to testing. Teachers submit to correction. Everyone serves in love.

### When Gifts Cause Division

If a gift is causing division, it is not being used according to the Spirit. The Spirit unifies. He does not fracture. Where there is strife over gifts, there is almost always pride, fear, or misunderstanding.

### A Love Test

Before using any gift, ask:

- Does this build up the church?
- Does this point to Jesus?
- Does this show love to the people involved?
- Would I still serve if no one noticed?

If the answer is yes, proceed. If not, pause and repent.
`,
      actionStep:
        "Attend a church service or small group this week. Observe how gifts are used. Note one example of order and love, and one area that could improve.",
      discussionPrompt:
        "How do we maintain both freedom for the Spirit and protection for the vulnerable?",
    },
    {
      title: "6.7 — When Gifts Are Abused: Correction and Restoration",
      type: "READING",
      order: 7,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "1 Timothy 1:6-7 — Some have departed from these and have turned to meaningless talk. They want to be teachers of the law, but they do not know what they are talking about.",
      content: `## When Gifts Are Abused: Correction and Restoration

Gifts can be abused. History and experience show that spiritual power can be used for pride, profit, manipulation, control, and harm. The church must know how to correct abuse without throwing away the gifts themselves.

### Common Forms of Abuse

- **Using gifts for money:** Selling the Spirit's power or making healing dependent on donations.
- **Using gifts for control:** Demanding obedience to a leader's prophetic word.
- **Using gifts for pride:** Making one gift the mark of spiritual maturity.
- **Using gifts to manipulate:** Threatening divine punishment if people do not comply.
- **Neglecting gifts out of fear:** Refusing all gifts because of past abuse.
- **Exalting experience over Scripture:** Claiming the Spirit said something that contradicts the Bible.

### The Bible's Response

Jesus cleansed the temple. Paul corrected the Corinthians. John warned against false prophets. The Bible does not tolerate abuse. It confronts it, corrects it, and restores what was damaged.

When gifts are abused, the response should be:

1. **Test everything by Scripture.** No experience, gift, or leader is above the Word.
2. **Confront with love.** If someone is misusing a gift, speak to them privately first.
3. **Protect the vulnerable.** The safety of the church matters more than the freedom of the gifted.
4. **Restore, don't destroy.** The goal is correction, not permanent exclusion.
5. **Learn and adjust.** The church should have clear, loving guidelines for gifts.

### Personal Restoration

If you have been hurt by abuse of spiritual gifts, your healing matters. You do not have to accept every ministry that claims the Spirit. You can be cautious without being cynical. You can honor the Spirit while rejecting manipulation.

The Spirit who was abused by false teachers is the same Spirit who will gently restore your trust. Take time. Seek safe community. Read the Bible fresh. Let Him rebuild your confidence.

### Guarding Your Own Heart

If you have gifts, guard against the temptation to misuse them. Gifts can feed the ego. Stay accountable. Stay in the Word. Stay in love. Remember: the greatest among you is the servant of all.
`,
      actionStep:
        "Write down one boundary you need to protect yourself or others from spiritual abuse. Share it with a trusted leader or friend.",
      discussionPrompt:
        "How should a church respond when a popular teacher or prophet is found to be abusing a gift?",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// MODULE 7 — The Spirit's Mission
// ─────────────────────────────────────────────────────────────────────────────

export const HS_MODULE_7 = {
  title: "Module 7: The Spirit's Mission",
  order: 7,
  lessons: [
    {
      title: "7.1 — The Spirit and the Great Commission",
      type: "READING",
      order: 1,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Acts 1:8 — But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
      content: `## The Spirit and the Great Commission

The Holy Spirit is the engine of mission. Jesus gave the Great Commission — go and make disciples of all nations — but He did not send His followers alone. He promised power. That power is the Holy Spirit.

### Power for Witness

"You will receive power when the Holy Spirit comes on you; and you will be my witnesses" (Acts 1:8). Notice the order: power first, witness second. The Spirit does not send powerless people to do impossible work. He clothes them with ability, boldness, and words.

A witness is someone who has seen and heard something and cannot keep silent. The Spirit makes the life, death, and resurrection of Jesus so real to us that we become natural witnesses.

### From Jerusalem to the Ends of the Earth

The mission begins where you are — your Jerusalem. Then it expands to your region — your Judea and Samaria. Then it reaches the nations — the ends of the earth. The Spirit empowers every stage.

Your Jerusalem is your home, your neighborhood, your workplace, your school. Your Judea and Samaria are the next circle out: your city, your region, people different from you. The ends of the earth are the unreached peoples of the world.

### The Spirit's Strategy

The Spirit's strategy is not complicated. He fills ordinary people with extraordinary power and sends them to ordinary places with an extraordinary message. You do not need to be a theologian or a missionary to participate. You need to be filled with the Spirit and willing to speak.

### Your Part in the Mission

Every believer has a part. Some are sent across the world. Some are sent across the street. Both matter. The Spirit gives each person the words, courage, and opportunities they need.

This week, ask the Spirit to show you your part. It may be a conversation, an act of service, a financial gift, or a prayer commitment. The mission starts with openness to the Spirit's prompting.
`,
      actionStep:
        "Write your personal mission statement: 'In the power of the Spirit, I will be a witness to ______ in the place of ______.'",
      discussionPrompt:
        "What is the difference between doing evangelism in your own strength and doing it in the Spirit's power?",
    },
    {
      title: "7.2 — Bold Witness: Peter, Paul, and Ordinary Believers",
      type: "READING",
      order: 2,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Acts 4:13 — When they saw the courage of Peter and John and realized that they were unschooled, ordinary men, they were astonished and they took note that these men had been with Jesus.",
      content: `## Bold Witness: Peter, Paul, and Ordinary Believers

The book of Acts is filled with unlikely witnesses. Peter, a fisherman who had denied Jesus, became a fearless preacher. Paul, a persecutor of the church, became the most passionate missionary. Stephen, a deacon, preached until martyrdom. Philip, another deacon, led an Ethiopian official to Christ. Ordinary believers carried the gospel across the Roman world.

### The Transformation of Peter

Peter had collapsed under pressure. When Jesus was arrested, Peter denied knowing Him three times. But after Pentecost, Peter stood before the same religious leaders who had condemned Jesus and declared, "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved" (Acts 4:12).

What changed? The Spirit. The same Peter who had been afraid became bold because the Spirit had filled him.

### The Calling of Paul

Paul began as a violent opponent of Christianity. On the road to Damascus, the risen Jesus appeared to him, and he was filled with the Holy Spirit (Acts 9:17). From that moment, Paul became the most effective missionary in history. He planted churches, wrote letters, suffered imprisonment, and never stopped declaring Christ.

Paul's story proves that the Spirit can transform anyone. No past is too dark. No enemy of the gospel is beyond the Spirit's reach.

### Ordinary Believers

Acts is not only about apostles. It is about unnamed disciples who opened their homes, shared their food, prayed, gave, traveled, and spoke. The church grew because ordinary people, filled with the Spirit, did ordinary things with extraordinary love.

You are one of those ordinary believers. The Spirit can use you exactly where you are.

### Courage from the Spirit

Courage is not the absence of fear. It is doing what God asks despite fear. The Spirit gives that courage. When you face a situation that requires witness, ask the Spirit to fill you with the same boldness He gave Peter and Paul.
`,
      actionStep:
        "Identify one person you can share your faith with this week. Pray for boldness, then take one step: a text, a call, an invitation, or a conversation.",
      discussionPrompt:
        "What excuses do you use to avoid witnessing, and how does the Spirit address them?",
    },
    {
      title: "7.3 — Healing and Deliverance: Signs of the Kingdom",
      type: "READING",
      order: 3,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Matthew 12:28 — But if it is by the Spirit of God that I drive out demons, then the kingdom of God has come upon you.",
      content: `## Healing and Deliverance: Signs of the Kingdom

Jesus' ministry was marked by healing and deliverance. He opened blind eyes, cleansed lepers, raised the dead, and cast out demons. These were not random displays of power. They were signs that the kingdom of God had arrived.

The Spirit continues this ministry through the church. Believers are commissioned to heal the sick, raise the dead, cleanse those who have leprosy, and drive out demons (Matthew 10:8). These are kingdom signs — previews of the resurrection world where suffering and evil will be no more.

### Healing in Jesus' Name

Healing is not magic. It is the compassionate intervention of God. When Jesus healed, He often connected the healing to faith, to His authority, and to the kingdom. The apostles healed in the name of Jesus, by the power of the Spirit (Acts 3:6; 4:30).

Praying for the sick is an act of faith and love. It declares that God is good, that sickness is not the final word, and that the kingdom is breaking in. But healing is not guaranteed in every case. God is sovereign. Some are healed in this life. All will be healed in the resurrection.

### Deliverance from Evil Spirits

Deliverance is the ministry of freeing people from demonic oppression or possession. Jesus gave His disciples authority over evil spirits (Luke 9:1; 10:19). The church continues that ministry in His name.

Deliverance is not theater. It is not about dramatic shouting. It is about the authority of Jesus and the power of the Spirit. It must be done with humility, discernment, and care for the person being helped.

### Compassion, Not Spectacle

Jesus refused to perform miracles as entertainment. He healed because He loved. He cast out demons because He came to destroy the works of the devil (1 John 3:8). Any ministry of healing or deliverance that seeks spectacle over compassion has missed the point.

### When Healing Does Not Come

Not everyone is healed. This is a mystery and a grief. In those moments, faith does not deny the pain. Faith trusts that God is still good, that the resurrection will bring complete healing, and that the Spirit is present in the suffering.

If you are praying for healing that does not come, do not abandon faith. Keep loving. Keep trusting. Keep hoping. The Spirit is with you in the waiting.
`,
      actionStep:
        "Pray for one person who is sick or struggling with spiritual oppression this week. If appropriate, ask if you can pray with them in person.",
      discussionPrompt:
        "How do we maintain both faith for miracles and compassion when miracles do not happen?",
    },
    {
      title: "7.4 — Compassion, Justice, and the Spirit",
      type: "READING",
      order: 4,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Micah 6:8 — He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God.",
      content: `## Compassion, Justice, and the Spirit

The Holy Spirit is not only concerned with personal salvation. He is concerned with the whole world — including the poor, the oppressed, the orphan, the widow, the immigrant, and the victim. The Spirit who empowers mission also empowers compassion and justice.

### The Spirit of the Lord's Favor

When Jesus read from Isaiah in the synagogue, He highlighted the Spirit's mission: "The Spirit of the Lord is on me... He has sent me to proclaim good news to the poor. He has sent me to proclaim freedom for the prisoners and recovery of sight for the blind, to set the oppressed free" (Luke 4:18).

The gospel is good news to the poor. It is freedom for the captive. It is sight for the blind. It is justice for the oppressed. Any gospel that ignores these realities is incomplete.

### Compassion in Action

Compassion is not pity. Pity feels bad from a distance. Compassion draws near and acts. The Spirit produces compassion that moves the church toward the hurting. This looks like feeding the hungry, visiting the prisoner, housing the homeless, comforting the grieving, and defending the vulnerable.

### Justice and the Spirit

Justice means setting things right. It means confronting systems and structures that oppress people made in God's image. The Spirit gives wisdom, courage, and persistence to those who work for justice.

Justice is not separate from evangelism. It is part of the same mission. A church that preaches salvation but ignores injustice has not fully understood the Spirit's work.

### Your Place in Compassion and Justice

You cannot solve every problem in the world. But you can do something. The Spirit will show you where to start. It may be giving, volunteering, advocating, mentoring, or simply showing up for a neighbor in need.

This week, ask the Spirit to open your eyes to one person or cause He wants you to engage.
`,
      actionStep:
        "Research one local ministry that serves the poor, refugees, prisoners, or oppressed. Take one step to support it this month.",
      discussionPrompt:
        "How does compassion for the vulnerable connect to the work of the Holy Spirit?",
    },
    {
      title: "7.5 — The Spirit Across Cultures and Languages",
      type: "READING",
      order: 5,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Revelation 7:9 — After this I looked, and there before me was a great multitude that no one could count, from every nation, tribe, people and language, standing before the throne and before the Lamb.",
      content: `## The Spirit Across Cultures and Languages

Pentecost was a miracle of languages. The disciples spoke in tongues, and people from many nations heard the gospel in their own languages. The Spirit was making a statement: the gospel is for every people, every culture, and every language.

### The Reversal of Babel

At Babel, human pride led to the confusion of languages and the scattering of nations. At Pentecost, the Spirit reversed the curse for the sake of the gospel. People who could not understand each other suddenly heard the same message: the wonders of God.

This is the Spirit's pattern. He builds bridges where there were walls. He creates unity across difference. He gathers a family from every tribe and tongue.

### The Global Church

Today, the fastest-growing churches are often in the Global South — Africa, Asia, Latin America. The Spirit is moving powerfully among people who were once considered marginal. The center of Christianity is shifting, and the Spirit is leading the way.

This means that Western Christians no longer have a monopoly on the Spirit's work. We have much to learn from believers in other cultures. The global church is the family of the Spirit, and every part has something to offer.

### Cultural Humility

The Spirit does not erase culture. He redeems it. Every language can worship. Every culture can express the gospel in its own forms. Missions that demand people become like the missionaries miss the Spirit's genius.

As you engage with people from other cultures, bring humility. Listen. Learn. Let the Spirit show you how the gospel takes root in different soil.

### Your Global Connection

Even if you never travel overseas, you are connected to the global church. You can pray for persecuted believers, support missionaries, welcome immigrants, and learn from Christians around the world.

The Spirit is building one church from every nation. You are part of it.
`,
      actionStep:
        "Learn about one country or people group where the church is growing rapidly. Pray for the believers there this week.",
      discussionPrompt:
        "How can we avoid making our cultural expression of Christianity the only 'right' one?",
    },
    {
      title: "7.6 — Suffering, Perseverance, and the Spirit",
      type: "READING",
      order: 6,
      durationSeconds: 540,
      coverUrl: null,
      memoryVerse: "Romans 8:18 — I consider that our present sufferings are not worth comparing with the glory that will be revealed in us.",
      content: `## Suffering, Perseverance, and the Spirit

Mission is not easy. The same Spirit who empowers also leads believers into hardship. Jesus warned His disciples that they would be persecuted. Paul wrote that "everyone who wants to live a godly life in Christ Jesus will be persecuted" (2 Timothy 3:12). The Spirit does not remove suffering. He sustains us in it.

### The Spirit in Suffering

The Spirit helps us in our weakness. "We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans" (Romans 8:26). When we do not know what to say, the Spirit prays for us. When we do not know how to endure, the Spirit gives strength.

The Spirit also produces hope. "Hope does not put us to shame, because God's love has been poured out into our hearts through the Holy Spirit, who has been given to us" (Romans 5:5). In suffering, the Spirit reminds us that the story is not over.

### Perseverance Until the End

Jesus told His disciples, "You will be hated by everyone because of me, but the one who stands firm to the end will be saved" (Matthew 10:22). Perseverance is not a one-time decision. It is a lifelong walk in the Spirit.

The Spirit gives perseverance by:

- Reminding us of God's promises.
- Connecting us to the community of faith.
- Strengthening our inner being.
- Giving us joy that transcends circumstances.
- Anchoring our hope in the resurrection.

### The Hope of Glory

Paul declares that "our present sufferings are not worth comparing with the glory that will be revealed in us" (Romans 8:18). The Spirit is the firstfruits of that glory. He is the guarantee that one day all suffering will end and all things will be made new.

This hope is not escapism. It is fuel for endurance. Because the future is secure, we can serve faithfully today.
`,
      actionStep:
        "Write a letter of encouragement to a believer who is suffering. Include a promise from Romans 8 about the Spirit's help.",
      discussionPrompt:
        "How does the Spirit sustain believers when mission and obedience lead to suffering?",
    },
    {
      title: "7.7 — Finishing Well: A Lifetime in the Spirit",
      type: "READING",
      order: 7,
      durationSeconds: 600,
      coverUrl: null,
      memoryVerse: "Revelation 22:17 — The Spirit and the bride say, 'Come!' And let the one who hears say, 'Come!'",
      content: `## Finishing Well: A Lifetime in the Spirit

This course will end, but your life in the Spirit will not. The goal of these seven modules is not merely to give you information. It is to form a habit: a lifetime of walking, listening, yielding, loving, serving, and mission under the Holy Spirit's leading.

### The Long Walk

The Christian life is a marathon, not a sprint. There will be seasons of excitement and seasons of dryness. There will be victories and failures. The Spirit will be with you through all of it.

Finishing well means continuing to the end. It means staying faithful when no one is watching. It means keeping your love for Jesus warm over decades. It means passing on what you have received to the next generation.

### A Lifetime Rhythm

A lifetime in the Spirit is built on simple, repeated practices:

- Daily prayer and Scripture reading.
- Regular worship with the church.
- Ongoing surrender and filling.
- Active service using your gifts.
- Accountability to mature believers.
- Missional engagement with the world.
- Rest and Sabbath in His presence.

These practices are not burdens. They are the rhythm of life with God.

### Leaving a Legacy

The Spirit wants to use your whole life. He wants your final years to be as fruitful as your first. He wants you to finish with faith, hope, and love. And He wants you to pass the flame to others.

Paul's final words to Timothy are a model: "I have fought the good fight, I have finished the race, I have kept the faith" (2 Timothy 4:7). That is the Spirit-filled finish.

### The Spirit and the Bride Say Come

The Bible ends with an invitation. "The Spirit and the bride say, 'Come!'" (Revelation 22:17). The Spirit is still calling. He is calling the lost to salvation. He is calling the church to readiness. He is calling you deeper.

Your whole life can be one long "Come, Holy Spirit." And it can be one long response: "Here I am, send me."

### A Covenant for the Rest of Your Life

This week, write a simple covenant with the Holy Spirit. Commit to walking with Him, listening to Him, obeying Him, and joining His mission until the day you see Jesus face to face. Sign it. Date it. Share it with a friend. This is how finishing well begins.
`,
      actionStep:
        "Write and sign a 'Lifetime in the Spirit' covenant. Include commitments to daily surrender, weekly worship, monthly service, and ongoing mission.",
      discussionPrompt:
        "What does it mean to you to 'finish well' as a Spirit-filled believer?",
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// QUIZZES
// ─────────────────────────────────────────────────────────────────────────────

export const HOLY_SPIRIT_QUIZZES = [
  {
    title: "Module 1 Quiz: The Spirit Who Is God",
    questions: [
      {
        question: "Which biblical passage explicitly identifies lying to the Holy Spirit as lying to God?",
        type: "MULTIPLE_CHOICE",
        options: ["John 3:5-6", "Acts 5:3-4", "Romans 8:16", "Ephesians 1:13-14"],
        correctAnswer: "1",
      },
      {
        question: "The Holy Spirit is a divine Person with mind, will, and emotion.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "In the Trinity, which role does the Spirit primarily fulfill in redemption?",
        type: "MULTIPLE_CHOICE",
        options: [
          "The Father who plans",
          "The Son who accomplishes",
          "The Spirit who applies and makes real",
          "The angel who announces",
        ],
        correctAnswer: "2",
      },
      {
        question: "According to John 16:14, what is the Spirit's chief goal?",
        type: "MULTIPLE_CHOICE",
        options: [
          "To draw attention to Himself",
          "To glorify Jesus",
          "To replace Jesus",
          "To judge the world",
        ],
        correctAnswer: "1",
      },
      {
        question: "The word 'Ghost' in older Bible translations means the Holy Spirit is a haunting spirit.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "Which promise did Jesus make about the Spirit's presence with believers?",
        type: "MULTIPLE_CHOICE",
        options: [
          "He will come and go as needed",
          "He will be with you always",
          "He will only visit on special days",
          "He will leave if you sin",
        ],
        correctAnswer: "1",
      },
      {
        question: "A healthy relationship with the Holy Spirit grows through time, attention, honesty, and shared experience.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "What is the first step in knowing the Spirit personally?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Perfect moral performance",
          "Special religious training",
          "Asking God to give the Spirit",
          "Visiting a holy place",
        ],
        correctAnswer: "2",
      },
      {
        question: "The Spirit is called the 'bond of love' between the Father and the Son.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which of the following is NOT one of the Spirit's names in Scripture?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Spirit of Truth",
          "Spirit of Life",
          "Spirit of Wealth",
          "Spirit of Grace",
        ],
        correctAnswer: "2",
      },
    ],
  },
  {
    title: "Module 2 Quiz: The Spirit of the New Creation",
    questions: [
      {
        question: "In Genesis 1:2, what was the Spirit of God doing?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Judging the world",
          "Hovering over the waters",
          "Speaking from a burning bush",
          "Descending like a dove",
        ],
        correctAnswer: "1",
      },
      {
        question: "The Spirit's work in the Old Testament was selective and temporary rather than universal and permanent.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which prophet promised that God would pour out His Spirit on all people?",
        type: "MULTIPLE_CHOICE",
        options: ["Isaiah", "Jeremiah", "Joel", "Daniel"],
        correctAnswer: "2",
      },
      {
        question: "At Jesus' baptism, which three Persons of the Trinity were revealed together?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Father, Son, and Holy Spirit",
          "Father, Son, and angels",
          "Father, Moses, and Elijah",
          "Jesus, Peter, and John",
        ],
        correctAnswer: "0",
      },
      {
        question: "The resurrection of Jesus was accomplished by the power of the Holy Spirit.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "What did Peter identify as the fulfillment of Joel's prophecy?",
        type: "MULTIPLE_CHOICE",
        options: [
          "The crucifixion of Jesus",
          "The resurrection of Jesus",
          "The events at Pentecost",
          "The destruction of Jerusalem",
        ],
        correctAnswer: "2",
      },
      {
        question: "The Spirit added three thousand people to the church on the day of Pentecost.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "In Acts 4, what happened after the believers prayed for boldness?",
        type: "MULTIPLE_CHOICE",
        options: [
          "They were arrested",
          "The building was shaken and they were filled with the Spirit",
          "They received money",
          "They left Jerusalem",
        ],
        correctAnswer: "1",
      },
      {
        question: "The Spirit led Paul away from Asia and Bithynia in Acts 16 by opening new doors.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "What is the last word of the Bible to the church regarding the Spirit?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Be silent",
          "Hear what the Spirit says",
          "Seek signs",
          "Build temples",
        ],
        correctAnswer: "1",
      },
    ],
  },
  {
    title: "Module 3 Quiz: The Spirit Within",
    questions: [
      {
        question: "What did Jesus tell Nicodemus is necessary to enter the kingdom of God?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Being born of water and the Spirit",
          "Keeping the Ten Commandments",
          "Becoming a religious leader",
          "Going to Jerusalem",
        ],
        correctAnswer: "0",
      },
      {
        question: "The Spirit is given as a seal and down payment guaranteeing our inheritance.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "According to 1 Corinthians 6:19-20, what are believers' bodies?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Temples of the Holy Spirit",
          "Prisons of the soul",
          "Tools for pleasure",
          "Owned by ourselves",
        ],
        correctAnswer: "0",
      },
      {
        question: "Ephesians 5:18 commands believers to be continually filled with the Spirit.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which verse says that all believers were baptized by one Spirit into one body?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Acts 1:8",
          "Romans 8:11",
          "1 Corinthians 12:13",
          "Galatians 5:16",
        ],
        correctAnswer: "2",
      },
      {
        question: "Walking in the Spirit guarantees that we will never be tempted again.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "What does Galatians 5:16 promise about walking by the Spirit?",
        type: "MULTIPLE_CHOICE",
        options: [
          "You will receive wealth",
          "You will not gratify the desires of the flesh",
          "You will never suffer",
          "You will always feel happy",
        ],
        correctAnswer: "1",
      },
      {
        question: "The Spirit's silence always means He has left a believer.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "Which promise assures believers that the Spirit will be with them forever?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Psalm 51:11",
          "John 14:16",
          "Genesis 1:2",
          "Acts 2:4",
        ],
        correctAnswer: "1",
      },
      {
        question: "The filling of the Spirit is primarily about emotional sensation rather than yieldedness to God.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
    ],
  },
  {
    title: "Module 4 Quiz: The Spirit's Voice",
    questions: [
      {
        question: "Which channel of the Spirit's voice is described as the most reliable and foundational?",
        type: "MULTIPLE_CHOICE",
        options: ["Dreams", "Scripture", "Visions", "Coincidences"],
        correctAnswer: "1",
      },
      {
        question: "The inner witness is the Spirit's confirmation deep within a believer's spirit.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Colossians 3:15 says the peace of Christ should act like what in our hearts?",
        type: "MULTIPLE_CHOICE",
        options: ["A whisper", "A judge or umpire", "A memory", "A dream"],
        correctAnswer: "1",
      },
      {
        question: "New Testament prophecy is primarily about predicting the future.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "Which passage commands believers to test the spirits?",
        type: "MULTIPLE_CHOICE",
        options: ["1 John 4:1", "Romans 8:16", "Acts 2:17", "Ephesians 1:13"],
        correctAnswer: "0",
      },
      {
        question: "The most important test of any spiritual experience is whether it acknowledges Jesus Christ come in the flesh.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "In the five-layer decision-making framework, which layer comes first?",
        type: "MULTIPLE_CHOICE",
        options: ["Circumstances", "Inner peace", "Scripture", "Community counsel"],
        correctAnswer: "2",
      },
      {
        question: "Dreams from God usually require testing against Scripture and confirmation.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which of the following is NOT a test for spiritual impressions?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Alignment with Scripture",
          "Whether it brings fruit",
          "Community testing",
          "How much money it will bring",
        ],
        correctAnswer: "3",
      },
      {
        question: "The Spirit can speak through other believers, circumstances, and conscience.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
    ],
  },
  {
    title: "Module 5 Quiz: The Spirit's Fruit",
    questions: [
      {
        question: "How many fruits of the Spirit are listed in Galatians 5:22-23?",
        type: "MULTIPLE_CHOICE",
        options: ["Five", "Seven", "Nine", "Twelve"],
        correctAnswer: "2",
      },
      {
        question: "Fruit of the Spirit grows by willpower and self-effort.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "Which fruit is listed first in Galatians 5:22-23?",
        type: "MULTIPLE_CHOICE",
        options: ["Joy", "Peace", "Love", "Patience"],
        correctAnswer: "2",
      },
      {
        question: "Patience, kindness, and goodness are primarily visible in relationships.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which quality is described as 'strength under control'?",
        type: "MULTIPLE_CHOICE",
        options: ["Faithfulness", "Gentleness", "Self-control", "Goodness"],
        correctAnswer: "1",
      },
      {
        question: "The Spirit's healing work includes emotional and relational wounds.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which verse promises that walking by the Spirit will prevent gratifying the flesh?",
        type: "MULTIPLE_CHOICE",
        options: [
          "Romans 8:11",
          "Galatians 5:16",
          "Ephesians 5:18",
          "John 3:5",
        ],
        correctAnswer: "1",
      },
      {
        question: "Self-control is the fruit that protects all the other fruit.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The Spirit's fruit is meant to be present in every believer, not just a select few.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which of the following best summarizes all the fruit of the Spirit?",
        type: "MULTIPLE_CHOICE",
        options: ["Power", "Knowledge", "Love", "Success"],
        correctAnswer: "2",
      },
    ],
  },
  {
    title: "Module 6 Quiz: The Spirit's Gifts",
    questions: [
      {
        question: "According to 1 Corinthians 12:7, why are spiritual gifts given?",
        type: "MULTIPLE_CHOICE",
        options: [
          "To make individuals famous",
          "For the common good",
          "To replace the fruit of the Spirit",
          "To earn salvation",
        ],
        correctAnswer: "1",
      },
      {
        question: "The church is compared to a body in 1 Corinthians 12.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which gift is described as speaking to people for strengthening, encouraging, and comfort?",
        type: "MULTIPLE_CHOICE",
        options: ["Tongues", "Prophecy", "Healing", "Administration"],
        correctAnswer: "1",
      },
      {
        question: "When tongues are used in public worship, interpretation is unnecessary.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "Which of the following is a service gift?",
        type: "MULTIPLE_CHOICE",
        options: ["Miracles", "Giving", "Tongues", "Word of knowledge"],
        correctAnswer: "1",
      },
      {
        question: "Gifts should be used with love and order.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "The gift of discernment of spirits helps distinguish between the Holy Spirit, human spirits, and demonic spirits.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which chapter in the Bible says that love is more important than gifts?",
        type: "MULTIPLE_CHOICE",
        options: ["1 Corinthians 12", "1 Corinthians 13", "1 Corinthians 14", "Romans 12"],
        correctAnswer: "1",
      },
      {
        question: "A person can discover their gifts by experimenting, receiving feedback, and looking for fruit.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "When gifts cause division in the church, they are being used according to the Spirit.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
    ],
  },
  {
    title: "Module 7 Quiz: The Spirit's Mission",
    questions: [
      {
        question: "Acts 1:8 says believers will receive power to be what?",
        type: "MULTIPLE_CHOICE",
        options: ["Rich", "Witnesses", "Kings", "Silent"],
        correctAnswer: "1",
      },
      {
        question: "The Spirit empowers mission starting in Jerusalem and extending to the ends of the earth.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "What happened to Peter after Pentecost that demonstrated the Spirit's power?",
        type: "MULTIPLE_CHOICE",
        options: [
          "He became wealthy",
          "He denied Jesus again",
          "He preached boldly before the same leaders who had condemned Jesus",
          "He left Jerusalem forever",
        ],
        correctAnswer: "2",
      },
      {
        question: "Healing and deliverance are signs that the kingdom of God has come.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "Which verse connects the Spirit's mission to good news for the poor?",
        type: "MULTIPLE_CHOICE",
        options: ["Acts 1:8", "Luke 4:18", "Romans 8:18", "Revelation 22:17"],
        correctAnswer: "1",
      },
      {
        question: "The gospel is only about personal salvation and has nothing to do with justice.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "1",
      },
      {
        question: "At Pentecost, people from many nations heard the gospel in their own languages. This shows that the gospel is for:",
        type: "MULTIPLE_CHOICE",
        options: [
          "Only Jews",
          "Only religious leaders",
          "Every nation, tribe, and language",
          "Only those who speak Hebrew",
        ],
        correctAnswer: "2",
      },
      {
        question: "The Spirit intercedes for believers with wordless groans during suffering.",
        type: "TRUE_FALSE",
        options: ["True", "False"],
        correctAnswer: "0",
      },
      {
        question: "What is the goal of finishing well as a believer?",
        type: "MULTIPLE_CHOICE",
        options: [
          "To become famous",
          "To keep the faith until the end",
          "To avoid all suffering",
          "To accumulate wealth",
        ],
        correctAnswer: "1",
      },
      {
        question: "Revelation 22:17 says the Spirit and the bride say what?",
        type: "MULTIPLE_CHOICE",
        options: ["Stop", "Come", "Leave", "Hide"],
        correctAnswer: "1",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READING PLAN
// ─────────────────────────────────────────────────────────────────────────────

export const HOLY_SPIRIT_READING_PLAN = {
  title: "Holy Spirit: A 49-Day Scripture Journey",
  slug: "holy-spirit-reading-plan",
  description:
    "Read one key passage each day through the seven modules of the Holy Spirit course. Each reading is paired with a reflection prompt to help you encounter the Spirit in Scripture.",
  duration: 49,
  published: true,
  featured: true,
  days: [
    { dayNumber: 1, passages: ["John 14:16-17"], reflection: "Welcome the Holy Spirit as your divine Helper and constant companion." },
    { dayNumber: 2, passages: ["Acts 5:3-4"], reflection: "The Holy Spirit is God. Worship Him today." },
    { dayNumber: 3, passages: ["Romans 8:27"], reflection: "The Spirit has a mind and will. Ask Him to teach you." },
    { dayNumber: 4, passages: ["John 16:14-15"], reflection: "The Spirit glorifies Jesus. Let Him reveal Jesus to you." },
    { dayNumber: 5, passages: ["2 Corinthians 3:17"], reflection: "Where the Spirit of the Lord is, there is freedom." },
    { dayNumber: 6, passages: ["Romans 8:16"], reflection: "Let the Spirit testify that you are God's child." },
    { dayNumber: 7, passages: ["Genesis 1:2"], reflection: "The Spirit who hovered over creation is making you new." },
    { dayNumber: 8, passages: ["Numbers 11:17"], reflection: "The Spirit empowers ordinary people for God's mission." },
    { dayNumber: 9, passages: ["Isaiah 61:1"], reflection: "Jesus was anointed by the Spirit for good news and freedom." },
    { dayNumber: 10, passages: ["Romans 8:11"], reflection: "The same Spirit who raised Jesus will raise you." },
    { dayNumber: 11, passages: ["Acts 2:1-4"], reflection: "Pentecost is the beginning of new creation in you." },
    { dayNumber: 12, passages: ["Acts 4:31"], reflection: "Pray for boldness to speak the word of God." },
    { dayNumber: 13, passages: ["Acts 2:17-21"], reflection: "The Spirit is poured out on all who believe." },
    { dayNumber: 14, passages: ["John 3:5-6"], reflection: "Thank the Spirit for your new birth." },
    { dayNumber: 15, passages: ["Ephesians 1:13-14"], reflection: "The Spirit is God's seal and guarantee in your life." },
    { dayNumber: 16, passages: ["1 Corinthians 6:19-20"], reflection: "Your body is a temple of the Holy Spirit." },
    { dayNumber: 17, passages: ["Ephesians 5:18-20"], reflection: "Be filled with the Spirit today." },
    { dayNumber: 18, passages: ["1 Corinthians 12:13"], reflection: "You were baptized by the Spirit into one body." },
    { dayNumber: 19, passages: ["Galatians 5:16"], reflection: "Walk by the Spirit and you will not gratify the flesh." },
    { dayNumber: 20, passages: ["Psalm 139:7"], reflection: "The Spirit is with you even in silence." },
    { dayNumber: 21, passages: ["John 16:13"], reflection: "Ask the Spirit to guide you into all truth." },
    { dayNumber: 22, passages: ["Psalm 119:105"], reflection: "Let Scripture be the lamp for your path today." },
    { dayNumber: 23, passages: ["Colossians 3:15"], reflection: "Let the peace of Christ rule in your heart." },
    { dayNumber: 24, passages: ["1 Corinthians 14:1,3"], reflection: "Desire spiritual gifts, especially prophecy, for edification." },
    { dayNumber: 25, passages: ["Acts 2:17"], reflection: "The Spirit speaks through dreams and visions too." },
    { dayNumber: 26, passages: ["1 John 4:1"], reflection: "Test every spirit against the truth of Christ." },
    { dayNumber: 27, passages: ["Proverbs 3:5-6"], reflection: "Submit every decision to God and let Him direct you." },
    { dayNumber: 28, passages: ["Galatians 5:22-23"], reflection: "Ask the Spirit to grow His fruit in you." },
    { dayNumber: 29, passages: ["1 John 4:7"], reflection: "Love comes from God. Let the Spirit fill you with love today." },
    { dayNumber: 30, passages: ["Ephesians 4:32"], reflection: "Be kind, compassionate, and forgiving." },
    { dayNumber: 31, passages: ["Galatians 5:23"], reflection: "Pursue gentleness and self-control today." },
    { dayNumber: 32, passages: ["Isaiah 61:1-2"], reflection: "Bring your wounds to the Spirit, the Comforter." },
    { dayNumber: 33, passages: ["Galatians 5:16"], reflection: "Walk in the Spirit and rely on His power over sin." },
    { dayNumber: 34, passages: ["Galatians 5:25"], reflection: "Keep in step with the Spirit all day long." },
    { dayNumber: 35, passages: ["1 Corinthians 12:7"], reflection: "Your gifts are for the common good of the church." },
    { dayNumber: 36, passages: ["1 Corinthians 14:3"], reflection: "Use your words to strengthen, encourage, and comfort." },
    { dayNumber: 37, passages: ["1 Corinthians 12:9-10"], reflection: "Thank God for His power to heal and deliver." },
    { dayNumber: 38, passages: ["1 Peter 4:10-11"], reflection: "Serve others faithfully with whatever gift you have." },
    { dayNumber: 39, passages: ["Romans 12:6"], reflection: "Ask the Spirit to show you your gifts." },
    { dayNumber: 40, passages: ["1 Corinthians 14:26,40"], reflection: "Do all things in the church with love and order." },
    { dayNumber: 41, passages: ["1 Timothy 1:6-7"], reflection: "Guard against using gifts for pride or profit." },
    { dayNumber: 42, passages: ["Acts 1:8"], reflection: "Receive power to be Christ's witness today." },
    { dayNumber: 43, passages: ["Acts 4:13"], reflection: "The Spirit can make an ordinary person bold." },
    { dayNumber: 44, passages: ["Matthew 12:28"], reflection: "Signs of healing and deliverance reveal God's kingdom." },
    { dayNumber: 45, passages: ["Micah 6:8"], reflection: "Act justly, love mercy, walk humbly with God." },
    { dayNumber: 46, passages: ["Revelation 7:9"], reflection: "Pray for the gospel to reach every nation." },
    { dayNumber: 47, passages: ["Romans 8:18"], reflection: "The Spirit sustains you in present suffering." },
    { dayNumber: 48, passages: ["Revelation 22:17"], reflection: "Join the Spirit and the bride in saying, 'Come, Lord Jesus.'" },
    { dayNumber: 49, passages: ["2 Timothy 4:7"], reflection: "Commit to finishing your race of faith well." },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

const HOLY_SPIRIT_MODULES = [
  HS_MODULE_1,
  HS_MODULE_2,
  HS_MODULE_3,
  HS_MODULE_4,
  HS_MODULE_5,
  HS_MODULE_6,
  HS_MODULE_7,
];

// ─────────────────────────────────────────────────────────────────────────────
// 90-DAY GUIDED TRACK
// ─────────────────────────────────────────────────────────────────────────────

export const HOLY_SPIRIT_TRACK = {
  title: "Holy Spirit: 90-Day Formation and Mission",
  slug: "holy-spirit-90-day",
  description:
    "A guided 90-day journey through the Holy Spirit course with daily Scripture readings, prayer prompts, memory verses, mentor check-ins, and practical exercises designed to form lifelong dependence on the Spirit.",
  published: true,
  featured: true,
  order: 1,
  days: Array.from({ length: 90 }, (_, i) => {
    const day = i + 1;
    // Map days roughly: Module 1 = days 1-12, Module 2 = 13-26, Module 3 = 27-40,
    // Module 4 = 41-54, Module 5 = 55-68, Module 6 = 69-82, Module 7 = 83-90 + capstone.
    const moduleIndex =
      day <= 12 ? 0 :
      day <= 26 ? 1 :
      day <= 40 ? 2 :
      day <= 54 ? 3 :
      day <= 68 ? 4 :
      day <= 82 ? 5 :
      6;
    const module = HOLY_SPIRIT_MODULES[moduleIndex];
    const lessonIndex = Math.min(
      Math.floor(((day - [1, 13, 27, 41, 55, 69, 83][moduleIndex]) / ([12, 14, 14, 14, 14, 14, 8][moduleIndex])) * module.lessons.length),
      module.lessons.length - 1
    );
    const lesson = module.lessons[lessonIndex];
    const hasQuiz = day === 12 || day === 26 || day === 40 || day === 54 || day === 68 || day === 82 || day === 90;
    const hasMentorCheckin = day % 7 === 0;
    return {
      dayNumber: day,
      title: `Day ${day}: ${lesson.title.split(" — ").pop() || lesson.title}`,
      lessonSlug: `${module.order}.${lesson.order}`,
      scriptureReading: lesson.memoryVerse?.split(" — ")[0] || "",
      prayerPrompt: `Holy Spirit, as I study "${lesson.title}", open my heart to Your truth and power. Make this lesson alive in me today.`,
      hasQuiz,
      hasMentorCheckin,
      order: day,
    };
  }),
};

// ─────────────────────────────────────────────────────────────────────────────
// MEMORY VERSE COLLECTION
// ─────────────────────────────────────────────────────────────────────────────

export const HOLY_SPIRIT_MEMORY_COLLECTION = {
  title: "Holy Spirit Memory Verses",
  slug: "holy-spirit-memory",
  description: "Core Scripture passages for every lesson of the Holy Spirit course.",
  verses: HOLY_SPIRIT_MODULES.flatMap((m) =>
    m.lessons.map((l) => ({
      reference: l.memoryVerse.split(" — ")[0],
      text: l.memoryVerse.split(" — ")[1],
    }))
  ),
};

export async function seedHolySpiritCourse(db: PrismaClient) {
  // Upsert the course content row
  const course = await db.content.upsert({
    where: { slug: HOLY_SPIRIT_COURSE.slug },
    update: {
      title: HOLY_SPIRIT_COURSE.title,
      description: HOLY_SPIRIT_COURSE.description,
      thumbnail: HOLY_SPIRIT_COURSE.thumbnail,
      order: HOLY_SPIRIT_COURSE.order,
      published: HOLY_SPIRIT_COURSE.published,
      featured: HOLY_SPIRIT_COURSE.featured,
      premium: HOLY_SPIRIT_COURSE.premium,
    },
    create: HOLY_SPIRIT_COURSE,
  });

  console.log("✅ Holy Spirit course seeded:", course.title);

  // Seed chapters and lessons idempotently by title
  for (const module of HOLY_SPIRIT_MODULES) {
    const existingChapter = await db.courseChapter.findFirst({
      where: { contentId: course.id, title: module.title },
      select: { id: true },
    });

    const chapter = await db.courseChapter.upsert({
      where: { id: existingChapter?.id || "__new__" },
      update: { order: module.order },
      create: {
        contentId: course.id,
        title: module.title,
        order: module.order,
      },
    });

    for (const lesson of module.lessons) {
      const existingLesson = await db.courseLesson.findFirst({
        where: { chapterId: chapter.id, title: lesson.title },
        select: { id: true },
      });

      await db.courseLesson.upsert({
        where: { id: existingLesson?.id || "__new__" },
        update: {
          content: lesson.content,
          type: lesson.type,
          order: lesson.order,
          duration: lesson.durationSeconds,
          coverUrl: lesson.coverUrl,
        },
        create: {
          chapterId: chapter.id,
          title: lesson.title,
          type: lesson.type,
          order: lesson.order,
          duration: lesson.durationSeconds,
          content: lesson.content,
          coverUrl: lesson.coverUrl,
          published: true,
        },
      });
    }
  }

  console.log("✅ Holy Spirit chapters and lessons seeded");

  // Seed quizzes attached to the course (not tied to a specific lesson so they can appear as module assessments)
  for (const quiz of HOLY_SPIRIT_QUIZZES) {
    const existing = await db.quiz.findFirst({
      where: { title: quiz.title },
      select: { id: true },
    });

    const quizRecord = await db.quiz.upsert({
      where: { id: existing?.id || "__new__" },
      update: { title: quiz.title },
      create: { title: quiz.title },
    });

    // Re-create questions idempotently
    await db.quizQuestion.deleteMany({ where: { quizId: quizRecord.id } });

    await db.quiz.update({
      where: { id: quizRecord.id },
      data: {
        questions: {
          create: quiz.questions.map((q, idx) => ({
            question: q.question,
            type: q.type,
            options: q.options,
            correctAnswer: q.correctAnswer,
            order: idx,
          })),
        },
      },
    });
  }

  console.log("✅ Holy Spirit quizzes seeded");

  // Seed guided track
  const track = await db.courseTrack.upsert({
    where: { slug: HOLY_SPIRIT_TRACK.slug },
    update: {},
    create: {
      courseId: course.id,
      title: HOLY_SPIRIT_TRACK.title,
      slug: HOLY_SPIRIT_TRACK.slug,
      description: HOLY_SPIRIT_TRACK.description,
      published: HOLY_SPIRIT_TRACK.published,
      featured: HOLY_SPIRIT_TRACK.featured,
      order: HOLY_SPIRIT_TRACK.order,
    },
  });

  // Build a lookup of lesson title -> id for track day linkage
  const allLessons = await db.courseLesson.findMany({
    where: { chapter: { contentId: course.id } },
    select: { id: true, title: true },
  });
  const lessonByTitle = Object.fromEntries(allLessons.map((l) => [l.title, l.id]));

  // Clear and re-create track days to keep data in sync
  await db.trackDay.deleteMany({ where: { trackId: track.id } });

  for (const day of HOLY_SPIRIT_TRACK.days) {
    const lessonTitle = HOLY_SPIRIT_MODULES
      .flatMap((m) => m.lessons)
      .find((l) => l.title.startsWith(day.lessonSlug))?.title;

    await db.trackDay.create({
      data: {
        trackId: track.id,
        dayNumber: day.dayNumber,
        title: day.title,
        scriptureReading: day.scriptureReading,
        prayerPrompt: day.prayerPrompt,
        hasQuiz: day.hasQuiz,
        hasMentorCheckin: day.hasMentorCheckin,
        order: day.order,
        lessonId: lessonTitle ? lessonByTitle[lessonTitle] : null,
      },
    });
  }

  console.log("✅ Holy Spirit 90-day track seeded");

  // Seed memory collection and verses
  const collection = await db.memoryCollection.upsert({
    where: { slug: HOLY_SPIRIT_MEMORY_COLLECTION.slug },
    update: {},
    create: {
      title: HOLY_SPIRIT_MEMORY_COLLECTION.title,
      slug: HOLY_SPIRIT_MEMORY_COLLECTION.slug,
      description: HOLY_SPIRIT_MEMORY_COLLECTION.description,
    },
  });

  // Upsert verses and link them
  for (const v of HOLY_SPIRIT_MEMORY_COLLECTION.verses) {
    const existingVerse = await db.memoryVerse.findFirst({
      where: { reference: v.reference },
      select: { id: true },
    });

    const verse = await db.memoryVerse.upsert({
      where: { id: existingVerse?.id || "__new__" },
      update: { text: v.text, topic: "Holy Spirit", difficulty: "MEDIUM" },
      create: {
        reference: v.reference,
        text: v.text,
        translation: "NIV",
        topic: "Holy Spirit",
        difficulty: "MEDIUM",
        published: true,
      },
    });

    const existingItem = await db.memoryCollectionItem.findFirst({
      where: { collectionId: collection.id, verseId: verse.id },
      select: { id: true },
    });

    if (!existingItem) {
      await db.memoryCollectionItem.create({
        data: {
          collectionId: collection.id,
          verseId: verse.id,
        },
      });
    }
  }

  console.log("✅ Holy Spirit memory collection seeded");

  // Seed reading plan
  const readingPlan = await db.readingPlan.upsert({
    where: { slug: HOLY_SPIRIT_READING_PLAN.slug },
    update: {},
    create: {
      title: HOLY_SPIRIT_READING_PLAN.title,
      slug: HOLY_SPIRIT_READING_PLAN.slug,
      description: HOLY_SPIRIT_READING_PLAN.description,
      duration: HOLY_SPIRIT_READING_PLAN.duration,
      published: HOLY_SPIRIT_READING_PLAN.published,
      featured: HOLY_SPIRIT_READING_PLAN.featured,
    },
  });

  await db.readingPlanDay.deleteMany({ where: { planId: readingPlan.id } });

  for (const day of HOLY_SPIRIT_READING_PLAN.days) {
    await db.readingPlanDay.create({
      data: {
        planId: readingPlan.id,
        dayNumber: day.dayNumber,
        title: `Day ${day.dayNumber}`,
        passages: day.passages,
        reflection: day.reflection,
      },
    });
  }

  console.log("✅ Holy Spirit reading plan seeded");

  // Seed topic study for quick reference
  await db.topicStudy.upsert({
    where: { slug: "holy-spirit" },
    update: {},
    create: {
      title: "Holy Spirit",
      slug: "holy-spirit",
      description: "A cross-Scripture study of the person and work of the Holy Spirit.",
      passages: [
        "Genesis 1:2",
        "Joel 2:28-29",
        "Luke 4:18-19",
        "John 3:5-8",
        "John 14:16-17",
        "John 16:7-15",
        "Acts 1:8",
        "Acts 2:1-4",
        "Acts 4:31",
        "Romans 5:5",
        "Romans 8:1-17",
        "Romans 8:26-27",
        "1 Corinthians 2:10-16",
        "1 Corinthians 12-14",
        "2 Corinthians 3:17-18",
        "Galatians 5:16-25",
        "Ephesians 1:13-14",
        "Ephesians 4:30",
        "Ephesians 5:18-20",
        "1 Thessalonians 5:19-22",
        "1 John 4:1-3",
        "Revelation 22:17",
      ],
      relatedTopics: ["Trinity", "Creation", "Pentecost", "Spiritual Gifts", "Fruit of the Spirit", "Mission"],
      published: true,
      featured: true,
    },
  });

  console.log("✅ Holy Spirit topic study seeded");

  return course;
}

