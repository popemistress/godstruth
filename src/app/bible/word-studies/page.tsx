"use client";

import { useState } from "react";
import { Languages, BookOpen, Search, ChevronDown, ChevronUp } from "lucide-react";

const WORDS = [
  { word: "Love",        category: "Character of God", hebrew: "אהבה (ahavah)",           greek: "ἀγάπη (agapē)",             strongs: "H160 / G26",  meaning: "Unconditional, sacrificial love — the highest form of love in Scripture.", verse: "John 3:16", etymology: "Ahavah (Heb.) derives from root meaning 'to give.' Agape (Grk.) was adopted by NT writers to express divine self-giving love distinct from eros or philia." },
  { word: "Peace",       category: "Character of God", hebrew: "שָׁלוֹם (shalom)",        greek: "εἰρήνη (eirēnē)",           strongs: "H7965 / G1515", meaning: "Wholeness, completeness, well-being — not merely the absence of conflict but total flourishing under God.", verse: "Philippians 4:7", etymology: "Shalom relates to completeness and soundness. Eirene in secular Greek meant cessation of war, but the NT deepens it to mean restored relationship with God." },
  { word: "Grace",       category: "Salvation",        hebrew: "חֵן (chen)",               greek: "χάρις (charis)",             strongs: "H2580 / G5485", meaning: "Unmerited favor freely bestowed — the gift of God that forms the foundation of salvation.", verse: "Ephesians 2:8", etymology: "Chen means to bend or stoop — condescension of the higher to the lower. Charis shares root with chairo (rejoice), suggesting grace brings joy." },
  { word: "Faith",       category: "Salvation",        hebrew: "אֱמוּנָה (emunah)",       greek: "πίστις (pistis)",            strongs: "H530 / G4102",  meaning: "Active trust and reliance on God — faithfulness as much as belief, a commitment of the whole person.", verse: "Hebrews 11:1", etymology: "Emunah comes from 'aman (to be firm, reliable). Pistis in Greek philosophical thought meant persuasion; in the NT it becomes trust in God's promises." },
  { word: "Mercy",       category: "Character of God", hebrew: "חֶסֶד (chesed)",          greek: "ἔλεος (eleos)",              strongs: "H2617 / G1656", meaning: "Covenant lovingkindness — God's steadfast loyal love that refuses to abandon His people.", verse: "Lamentations 3:22", etymology: "Chesed is one of the richest OT words, often translated 'steadfast love' or 'mercy.' It implies relationship and obligation within covenant." },
  { word: "Word",        category: "Revelation",       hebrew: "דָּבַר (davar)",           greek: "λόγος (logos)",              strongs: "H1697 / G3056", meaning: "God's spoken word — creative, authoritative, and living. Jesus is identified as the Logos in John 1.", verse: "John 1:1", etymology: "Davar covers 'word,' 'thing,' 'matter' — showing how Hebrew thought connects speech with reality. Logos in Greek philosophy was the rational principle of the cosmos." },
  { word: "Spirit",      category: "Trinity",          hebrew: "רוּחַ (ruach)",            greek: "πνεῦμα (pneuma)",           strongs: "H7307 / G4151", meaning: "Breath, wind, spirit — the animating divine presence. Used for the Spirit of God, human spirit, and breath of life.", verse: "Genesis 1:2", etymology: "Ruach appears in Gen 1:2 hovering over waters. Pneuma similarly means breath or wind. Both languages point to the invisible, vital, animating power of God." },
  { word: "Glory",       category: "Character of God", hebrew: "כָּבוֹד (kavod)",         greek: "δόξα (doxa)",                strongs: "H3519 / G1391", meaning: "Weighty, radiant honor — the manifest splendor and presence of God revealed to creation.", verse: "Exodus 33:18", etymology: "Kavod literally means 'weight' — honor was a weighty, substantial thing. Doxa originally meant 'opinion' but in LXX took on the meaning of God's manifest presence." },
  { word: "Righteous",   category: "Ethics",           hebrew: "צֶדֶק (tsedek)",          greek: "δικαιοσύνη (dikaiosynē)",   strongs: "H6664 / G1343", meaning: "Conformity to God's standard — the state of being in right relationship with God and others.", verse: "Romans 3:22", etymology: "Tsedek involves conformity to a norm or standard set by God. Dikaiosyne in legal contexts meant 'justice'; in Paul's letters it means the right standing God grants." },
  { word: "Holy",        category: "Character of God", hebrew: "קָדוֹשׁ (kadosh)",       greek: "ἅγιος (hagios)",             strongs: "H6918 / G40",   meaning: "Set apart, consecrated — utterly distinct from all that is common, profane, or sinful.", verse: "Isaiah 6:3", etymology: "Kadosh comes from a root meaning 'to cut' or 'separate.' Hagios similarly means set apart from common use. Holiness is primarily about distinction, then moral purity." },
  { word: "Covenant",    category: "Theology",         hebrew: "בְּרִית (berit)",         greek: "διαθήκη (diathēkē)",        strongs: "H1285 / G1242", meaning: "A solemn binding agreement — God's unbreakable commitment to His people through blood and promise.", verse: "Jeremiah 31:31", etymology: "Berit may relate to 'cutting' because covenants were sealed by slaughtering animals (Gen 15). Diatheke in Greek was a legal will, emphasizing God's sovereign initiative." },
  { word: "Salvation",   category: "Salvation",        hebrew: "יְשׁוּעָה (yeshuah)",   greek: "σωτηρία (sōtēria)",         strongs: "H3444 / G4991", meaning: "Deliverance, rescue, preservation — the full work of God in saving humanity from sin and death.", verse: "Romans 1:16", etymology: "Yeshuah is the name Joshua and Jesus — 'the LORD saves.' Soteria in Greek culture meant rescue from danger; in NT it encompasses eternal deliverance." },
  { word: "Repentance",  category: "Salvation",        hebrew: "נָחַם (nacham)",          greek: "μετάνοια (metanoia)",       strongs: "H5162 / G3341", meaning: "A complete change of mind, heart, and direction — turning away from sin and toward God.", verse: "Acts 3:19", etymology: "Nacham (Heb.) emphasizes emotional sorrow and change of feeling. Metanoia (Grk.) = meta (change) + nous (mind) — the most thorough possible reorientation of one's whole perspective." },
  { word: "Atonement",   category: "Salvation",        hebrew: "כִּפֻּר (kippur)",        greek: "ἱλασμός (hilasmos)",        strongs: "H3725 / G2434", meaning: "Covering and propitiation — the satisfaction of divine justice through sacrificial substitution.", verse: "1 John 2:2", etymology: "Kippur (related to Yom Kippur) means covering. Hilasmos carries the idea of appeasing wrath — a controversial but vital Pauline concept of propitiation." },
  { word: "Redeem",      category: "Salvation",        hebrew: "גָּאַל (gaal)",           greek: "λυτρόω (lytroo)",           strongs: "H1350 / G3084", meaning: "To buy back or rescue — the kinsman-redeemer who pays the price to restore and set free.", verse: "Galatians 3:13", etymology: "Gaal is the role of the go'el (kinsman-redeemer) as in the story of Boaz. Lytroo derives from lytron (ransom price), emphasizing the cost of liberation." },
  { word: "Truth",       category: "Character of God", hebrew: "אֱמֶת (emet)",           greek: "ἀλήθεια (alētheia)",        strongs: "H571 / G225",   meaning: "Reliability, steadfastness, and reality — that which corresponds fully to what is real and trustworthy.", verse: "John 14:6", etymology: "Emet shares root with 'amen' — absolute reliability. Aletheia in Greek philosophy meant 'un-hiddenness' (a-letheia), the unveiling of reality." },
  { word: "Worship",     category: "Practice",         hebrew: "שָׁחָה (shachah)",       greek: "προσκυνέω (proskyneō)",     strongs: "H7812 / G4352", meaning: "To bow down, prostrate oneself — the posture of full honor, reverence, and submission to God.", verse: "John 4:24", etymology: "Shachah means to bow low or prostrate. Proskyneo = pros (toward) + kyneo (kiss) — originally the act of throwing a kiss of homage to royalty." },
  { word: "Kingdom",     category: "Eschatology",      hebrew: "מַלְכוּת (malkuth)",     greek: "βασιλεία (basileia)",       strongs: "H4438 / G932",  meaning: "The reign and rule of God — both present reality inaugurated by Jesus and the future consummation of all things.", verse: "Matthew 6:10", etymology: "Malkuth comes from melek (king). Basileia in Greek meant a king's territory; in NT Jesus redefines it as a dynamic reign breaking into history." },
  { word: "Sanctify",    category: "Ethics",           hebrew: "קָדַשׁ (qadash)",        greek: "ἁγιάζω (hagiazō)",          strongs: "H6942 / G37",   meaning: "To make holy, set apart for God — the ongoing process of transformation into Christlikeness.", verse: "1 Thessalonians 5:23", etymology: "Qadash shares root with kadosh (holy). Hagiazo is the verb form of hagios — to make or treat as holy. Sanctification is both crisis and process." },
  { word: "Eternal",     category: "Eschatology",      hebrew: "עוֹלָם (olam)",          greek: "αἰώνιος (aiōnios)",         strongs: "H5769 / G166",  meaning: "Everlasting, age-enduring — the life and qualities that belong to the age to come, beginning now.", verse: "John 17:3", etymology: "Olam means 'the hidden time' — past or future beyond view. Aionios derives from aion (age/era), suggesting not mere duration but a quality of life belonging to God's own realm." },
  { word: "Wisdom",      category: "Ethics",           hebrew: "חָכְמָה (chokmah)",      greek: "σοφία (sophia)",             strongs: "H2451 / G4678", meaning: "Skillful living aligned with God's design — divine insight into how to live in accordance with God's order.", verse: "Proverbs 9:10", etymology: "Chokmah was used of craftsmen (Exod 35) — wisdom as skill applied to life. Sophia in Greek was the highest form of knowledge; in the NT it is personified as Christ." },
  { word: "Abide",       category: "Discipleship",     hebrew: "שָׁכַן (shakan)",        greek: "μένω (menō)",               strongs: "H7931 / G3306", meaning: "To dwell, remain, continue — a sustained, vital union with Christ that bears fruit.", verse: "John 15:4", etymology: "Shakan gives us 'Shekinah' (God's dwelling presence). Meno appears 40 times in John's Gospel — to remain, stay, dwell — the signature word of union with Christ." },
  { word: "Intercede",   category: "Prayer",           hebrew: "פָּגַע (paga)",           greek: "ἐντυγχάνω (entynchanō)",   strongs: "H6293 / G1793", meaning: "To stand in the gap and plead on another's behalf — the work of the priest, prophet, and Christ.", verse: "Romans 8:34", etymology: "Paga means 'to encounter' or 'strike' — to meet someone with a request. Entynchanoo = en + tynchano (to hit a mark) — to hit the mark in approaching God for another." },
  { word: "Humble",      category: "Ethics",           hebrew: "עָנָו (anav)",           greek: "ταπεινός (tapeinos)",        strongs: "H6035 / G5011", meaning: "Lowly and meek — not self-deprecation but radical dependence on God and service to others.", verse: "Matthew 11:29", etymology: "Anav refers to the poor and afflicted who trust God alone (Ps 37:11). Tapeinos meant 'low-lying' in Greek; Jesus transforms it into the greatest virtue." },
  { word: "Praise",      category: "Worship",          hebrew: "הָלַל (halal)",          greek: "αἰνέω (aineō)",             strongs: "H1984 / G134",  meaning: "To boast in, shine forth, and celebrate — exuberant, vocal, public declaration of who God is.", verse: "Psalm 150:6", etymology: "Halal gives us 'Hallelujah' (Praise the LORD). It means to shine or boast — praise is boldly and publicly attributing greatness to God. Aineo in Greek = to sing praise." },
];

const CATEGORIES = [
  "All",
  ...Array.from(new Set(WORDS.map((w) => w.category))).sort(),
];

const HEBREW_ALPHABET = [
  "א", "ב", "ג", "ד", "ה", "ו", "ז", "ח", "ט", "י",
  "כ", "ל", "מ", "נ", "ס", "ע", "פ", "צ", "ק", "ר", "ש", "ת",
];

const GREEK_ALPHABET = [
  "α", "β", "γ", "δ", "ε", "ζ", "η", "θ", "ι", "κ",
  "λ", "μ", "ν", "ξ", "ο", "π", "ρ", "σ", "τ", "υ", "φ", "χ", "ψ", "ω",
];

export default function WordStudiesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = WORDS.filter((w) => {
    if (category !== "All" && w.category !== category) return false;
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      w.word.toLowerCase().includes(q) ||
      w.hebrew.toLowerCase().includes(q) ||
      w.greek.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      w.etymology.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/40 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Languages className="h-3.5 w-3.5" />
            Hebrew &amp; Greek Lexicon
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3">
            Original-Language Word Studies
          </h1>
          <p className="text-blue-100 text-lg max-w-xl mx-auto">
            Explore the depth of Hebrew and Greek words behind the English
            text. Uncover the richness that translation cannot always convey.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search words, Hebrew, Greek, or meaning…"
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            />
          </div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <p className="text-xs text-gray-400 mb-4">
          Showing {filtered.length} of {WORDS.length} words
        </p>

        {/* Word list */}
        <div className="space-y-3 mb-12">
          {filtered.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <Search className="h-10 w-10 text-gray-200 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No words match your search.</p>
            </div>
          ) : (
            filtered.map((w) => {
              const isOpen = expanded === w.word;
              return (
                <div
                  key={w.word}
                  className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setExpanded(isOpen ? null : w.word)}
                    className="w-full text-left p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className="font-bold text-gray-900">{w.word}</span>
                          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                            {w.category}
                          </span>
                          <span className="text-xs text-gray-400">{w.strongs}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                            <BookOpen className="h-3 w-3" />
                            {w.hebrew}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                            <Languages className="h-3 w-3" />
                            {w.greek}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {w.meaning}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-gray-400">
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 space-y-3 border-t border-gray-100 pt-3">
                      <div className="rounded-lg bg-blue-50 p-3">
                        <p className="text-xs font-bold text-blue-700 mb-1">
                          Etymology &amp; Deeper Meaning
                        </p>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {w.etymology}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <BookOpen className="h-3.5 w-3.5 text-emerald-500" />
                        Key verse:{" "}
                        <span className="font-semibold text-emerald-600">
                          {w.verse}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Alphabet reference */}
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-amber-700 text-sm mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4" /> Hebrew Alphabet (Aleph-Bet)
            </h3>
            <div className="flex flex-wrap gap-2">
              {HEBREW_ALPHABET.map((l) => (
                <span
                  key={l}
                  className="text-xl font-bold text-amber-800 bg-amber-50 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-amber-100 transition-colors cursor-default"
                >
                  {l}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              22 letters, all consonants — read right to left.
            </p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h3 className="font-semibold text-blue-700 text-sm mb-3 flex items-center gap-2">
              <Languages className="h-4 w-4" /> Greek Alphabet
            </h3>
            <div className="flex flex-wrap gap-2">
              {GREEK_ALPHABET.map((l) => (
                <span
                  key={l}
                  className="text-xl font-bold text-blue-800 bg-blue-50 w-9 h-9 rounded-lg flex items-center justify-center hover:bg-blue-100 transition-colors cursor-default"
                >
                  {l}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-3">
              24 letters — the language of the New Testament.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
