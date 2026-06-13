"use client";

import { Languages, BookOpen, Search } from "lucide-react";

const WORDS = [
  { hebrew: "אהבה (ahavah)", greek: "ἀγάπη (agapē)", meaning: "Unconditional, sacrificial love — the highest form of love in Scripture." },
  { hebrew: "שָׁלוֹם (shalom)", greek: "εἰρήνη (eirēnē)", meaning: "Peace, wholeness, completeness — not merely absence of conflict but total well-being." },
  { hebrew: "חֶסֶד (chesed)", greek: "ἔλεος (eleos)", meaning: "Lovingkindness, covenant faithfulness, loyal love — God's steadfast mercy." },
  { hebrew: "אֱמוּנָה (emunah)", greek: "πίστις (pistis)", meaning: "Faith, faithfulness, trust — active reliance on God, not mere intellectual belief." },
  { hebrew: "דָּבַר (davar)", greek: "λόγος (logos)", meaning: "Word, matter, thing — God's spoken word carries creative and authoritative power." },
];

export default function WordStudiesPage() {
  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Original-Language Word Studies</h1>
      <p className="text-sm text-gray-500 mb-8">Explore the depth of Hebrew and Greek words behind the English text.</p>

      <div className="space-y-4">
        {WORDS.map((w) => (
          <div key={w.hebrew} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex flex-wrap gap-3 mb-3">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
                <BookOpen className="h-3 w-3" /> {w.hebrew}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                <Languages className="h-3 w-3" /> {w.greek}
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{w.meaning}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 text-center">
        <Search className="h-10 w-10 text-gray-300 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">Full Word Study Search Coming Soon</h3>
        <p className="text-sm text-gray-500">Search Strong&apos;s Concordance numbers, parse Greek verbs, and explore semantic domains.</p>
      </div>
    </div>
  );
}
