"use client";

import { useState } from "react";
import { MessageSquare, BookOpen, ChevronDown, ChevronUp, Scroll } from "lucide-react";

interface Commentary {
  reference: string;
  title: string;
  text: string;
  source: string;
  category: string;
}

const COMMENTARIES: Commentary[] = [
  {
    reference: "Genesis 1:1",
    title: "In the Beginning — The Foundation of All Reality",
    category: "Creation",
    source: "Study Notes",
    text: `"In the beginning, God created the heavens and the earth." These first ten words of Scripture set the entire framework for a biblical worldview. Before anything else existed — before space, time, matter, or energy — there was God. He is not a being within the universe but the one who brought the universe into existence out of nothing (ex nihilo).

The Hebrew word for God here is "Elohim," a plural form used with a singular verb — a grammatical hint that later blossoms into the full revelation of the Trinity. The verb "bara" (created) is used in the Old Testament exclusively with God as its subject; only God creates from nothing.

This opening declaration destroys every competing cosmology. God is not distant or dormant. He is the sovereign Author who stands outside His creation and yet is intimately involved in it. For the believer, this verse is the anchor: if God made all things, then nothing in life is outside His care, knowledge, or redemptive reach.`,
  },
  {
    reference: "John 1:1-3",
    title: "The Word Was God — The Eternal Son",
    category: "Christology",
    source: "Study Notes",
    text: `John opens his Gospel with a deliberate echo of Genesis 1:1: "In the beginning." But where Genesis introduces creation, John goes behind creation to the eternal pre-existence of the Word (Logos). The Logos was not created — He was "with God" (in intimate fellowship) and He "was God" (fully divine in nature).

The Greek word "Logos" carried enormous weight. In Greek philosophy it was the rational principle holding the cosmos together. In Hebrew thought the "Word of the LORD" was the active agent of creation and revelation (Ps 33:6). John seizes both meanings and declares: that cosmic principle, that revelatory Word, is a Person — and He became flesh (v.14).

Verse 3 makes the logic inescapable: "All things were made through him, and without him was not anything made that was made." The Son of God is the agent of all creation, which is why He alone can be its Redeemer. He has rights over what He made.`,
  },
  {
    reference: "John 3:1-21",
    title: "Born Again — The Necessity of New Life",
    category: "Salvation",
    source: "Study Notes",
    text: `Nicodemus comes by night — perhaps afraid of what his Pharisee colleagues would think. He is learned, religious, and powerful, yet Jesus tells him plainly that none of his accomplishments can open the door to God's kingdom. "You must be born again" (or "born from above," Greek: anothen).

The phrase struck Nicodemus as absurd: how can a grown man re-enter his mother's womb? Jesus clarifies: He is speaking of a spiritual birth, a work of the Holy Spirit that is as invisible and sovereign as the wind. Regeneration is not self-improvement or religious effort — it is God breathing new life into a soul dead in sin (Ezek 37; Eph 2:1).

The passage climaxes in verse 16, the "gospel in miniature." God's motive is love; His provision is His only Son; the requirement is faith; the result is eternal life. The contrast is stark: life or perishing, belief or condemnation. John 3:16 is not merely an invitation — it is a declaration about the nature of God and the cost of redemption.`,
  },
  {
    reference: "Romans 8:1-39",
    title: "No Condemnation — Life in the Spirit",
    category: "Salvation",
    source: "Study Notes",
    text: `Romans 8 is the mountain peak of Paul's letter — perhaps of the entire New Testament. It opens with one of the most glorious declarations in Scripture: "There is therefore now no condemnation for those who are in Christ Jesus." The word "condemnation" (katakrima) refers to the verdict and the sentence. Both are removed — not suspended — for the believer.

Paul then unfolds the life of the Spirit: freedom from the law of sin and death (v.2), the mind set on the Spirit producing life and peace (vv.6-8), and the assurance that the Spirit Himself testifies that we are God's children (vv.15-17). The creation groans, the believer groans, and the Spirit intercedes with groanings too deep for words (vv.22-26) — a beautiful picture of solidarity in a suffering world awaiting redemption.

The chapter closes with five pairs of adversaries that cannot separate the believer from God's love: death/life, angels/rulers, present/future, height/depth, any other created thing. The argument is absolute. The love of God demonstrated in Christ is the unshakeable ground of the believer's security.`,
  },
  {
    reference: "Psalm 23",
    title: "The LORD Is My Shepherd — Perfect Provision",
    category: "Comfort",
    source: "Study Notes",
    text: `David wrote this psalm from experience — he knew what it was to shepherd sheep across rough terrain and through dangerous ravines. When he calls God his Shepherd, it is not a sentimental metaphor but a hard-won confession of trust.

The psalm moves through two landscapes. In verses 1-4, the sheep is led by the shepherd — through green pastures of rest, still waters of refreshment, paths of righteousness for His name's sake, and even the valley of the shadow of death. The shepherd does not avoid danger; He accompanies the sheep through it, rod in hand.

Verse 5 shifts the scene: the sheep becomes a guest at a table, anointed with oil, cup overflowing — the image of lavish hospitality even before enemies. The final declaration is stunning: not merely that God will protect, but that goodness and mercy shall "pursue" (Hebrew: radaph — to chase, to hunt down) the believer all the days of his life. Grace is not passive; it chases us.`,
  },
  {
    reference: "Revelation 1:1-8",
    title: "The Revelation of Jesus Christ — Alpha and Omega",
    category: "Eschatology",
    source: "Study Notes",
    text: `The book of Revelation is "the revelation of Jesus Christ" — not primarily about beasts and bowls, but about the glorified, risen, reigning King. John, exiled to Patmos for his faith, receives a vision that reorients his suffering and ours: the Lamb who was slain is now Lord of all.

The opening doxology (vv.4-6) grounds the entire book in Trinitarian praise: the Father (him who is and was and is to come), the Spirit (the seven spirits — fullness of the Spirit), and Jesus Christ — described with three titles. He is "the faithful witness" (His earthly ministry), "the firstborn of the dead" (His resurrection), and "the ruler of the kings of earth" (His present sovereignty). Every earthly power, including Rome's apparently absolute authority, is relativized.

Verse 7 is the hinge: "He is coming with the clouds." Every eye will see him, including those who pierced him. History is moving toward a personal, visible, universal return of Christ. And the self-disclosure of God in verse 8 — "I am the Alpha and the Omega" — assures us that the One who started history will also end it, and all that lies between is under His sovereign hand.`,
  },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(COMMENTARIES.map((c) => c.category))).sort(),
];

const SOURCES = [
  { name: "Matthew Henry's Commentary", desc: "Classic 18th-century commentary renowned for pastoral warmth, practical application, and theological depth. Henry was a Nonconformist minister whose verse-by-verse expositions remain widely read today." },
  { name: "Barnes' Notes on the Bible", desc: "Albert Barnes (1798–1870) wrote exhaustive notes aimed at the educated layperson, attending carefully to original languages, historical context, and parallel passages across Scripture." },
  { name: "Clarke's Commentary", desc: "Adam Clarke's monumental 8-volume work brings a Wesleyan Arminian perspective with extensive linguistic, grammatical, and historical annotation on every book of the Bible." },
  { name: "Pulpit Commentary", desc: "A 49-volume Victorian-era commentary compiled from homiletical and exegetical essays, covering every passage with exposition, application, and illustrative material." },
  { name: "Jamieson, Fausset & Brown", desc: "A one-volume concise commentary by three Scottish Presbyterian ministers, noted for its accuracy, balance, and skill in synthesizing linguistic and theological analysis." },
];

export default function CommentaryPage() {
  const [selected, setSelected] = useState<string | null>(COMMENTARIES[0].reference);
  const [category, setCategory] = useState("All");

  const filtered = COMMENTARIES.filter(
    (c) => category === "All" || c.category === category
  );

  const active = COMMENTARIES.find((c) => c.reference === selected);

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-stone-700 to-zinc-800 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Scroll className="h-3.5 w-3.5" />
            Public Domain Study Notes
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3">Commentary Layers</h1>
          <p className="text-stone-200 text-lg max-w-xl mx-auto">
            Verse-by-verse study notes and commentary on key passages of
            Scripture, drawing on trusted theological tradition.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Passage list */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="mb-3">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                {CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              {filtered.map((c) => (
                <button
                  key={c.reference}
                  onClick={() => setSelected(c.reference)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-colors ${
                    selected === c.reference
                      ? "bg-stone-700 text-white font-semibold"
                      : "bg-white border border-gray-200 text-gray-700 hover:bg-stone-50"
                  }`}
                >
                  <p className="font-semibold">{c.reference}</p>
                  <p className={`text-xs mt-0.5 ${selected === c.reference ? "text-stone-300" : "text-gray-400"}`}>
                    {c.category}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Commentary content */}
          <div className="flex-1">
            {active ? (
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gradient-to-r from-stone-700 to-zinc-700 p-6 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <BookOpen className="h-4 w-4 text-stone-300" />
                    <span className="text-xs font-semibold text-stone-300">
                      {active.reference} — {active.category}
                    </span>
                  </div>
                  <h2 className="font-serif text-xl font-bold">{active.title}</h2>
                  <p className="text-xs text-stone-400 mt-1">{active.source}</p>
                </div>
                <div className="p-6">
                  {active.text.split("\n\n").map((para, i) => (
                    <p
                      key={i}
                      className="text-gray-700 leading-[1.85] mb-4 last:mb-0 text-sm"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <MessageSquare className="h-10 w-10 text-gray-200 mx-auto mb-3" />
                <p className="text-sm text-gray-500">Select a passage to read commentary.</p>
              </div>
            )}
          </div>
        </div>

        {/* Sources */}
        <div className="mt-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Classic Commentary Sources
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {SOURCES.map((s) => (
              <div
                key={s.name}
                className="rounded-xl border border-gray-200 bg-white p-4"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <MessageSquare className="h-4 w-4 text-stone-500 flex-shrink-0" />
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {s.name}
                  </h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
