"use client";

import { useState, useEffect } from "react";
import {
  BookMarked,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  Check,
  Filter,
  RefreshCw,
} from "lucide-react";
import { trackMemoryVerseMastered } from "@/lib/xapi-client";

interface Verse {
  id: string;
  reference: string;
  text: string;
  translation: string;
  topic: string | null;
  difficulty: string;
}

const DIFFICULTY_COLORS: Record<string, string> = {
  EASY:   "bg-emerald-100 text-emerald-700",
  MEDIUM: "bg-amber-100 text-amber-700",
  HARD:   "bg-rose-100 text-rose-700",
};

const LS_MASTERED = "memory-verse-mastered";

export default function MemoryVersesPage() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [mastered, setMastered] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [topicFilter, setTopicFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [showMastered, setShowMastered] = useState(false);

  useEffect(() => {
    fetch("/api/memory-verses")
      .then((r) => r.json())
      .then((data) => {
        setVerses(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    try {
      const stored = localStorage.getItem(LS_MASTERED);
      if (stored) setMastered(new Set(JSON.parse(stored)));
    } catch {}
  }, []);

  function toggleMastered(id: string) {
    setMastered((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        // Track mastery via xAPI
        const verse = verses.find((v) => v.id === id);
        if (verse) {
          trackMemoryVerseMastered({ reference: verse.reference, text: verse.text }).catch(() => { /* ignore */ });
          // Award gamification points
          fetch("/api/gamification/award", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "points", pointType: "VERSE_MASTERED", label: `Mastered: ${verse.reference}` }),
          }).catch(() => {});
          // Update scripture streak
          fetch("/api/gamification/checkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "SCRIPTURE" }),
          }).catch(() => {});
        }
      }
      localStorage.setItem(LS_MASTERED, JSON.stringify([...next]));
      return next;
    });
  }

  // All topics
  const allTopics = [
    "All",
    ...Array.from(new Set(verses.map((v) => v.topic).filter(Boolean) as string[])).sort(),
  ];

  // Filter
  const filtered = verses.filter((v) => {
    if (topicFilter !== "All" && v.topic !== topicFilter) return false;
    if (difficultyFilter !== "All" && v.difficulty !== difficultyFilter) return false;
    if (!showMastered && mastered.has(v.id)) return false;
    return true;
  });

  const current = filtered[currentIdx];

  function prev() {
    setCurrentIdx((i) => Math.max(0, i - 1));
    setRevealed(false);
  }
  function next() {
    setCurrentIdx((i) => Math.min(filtered.length - 1, i + 1));
    setRevealed(false);
  }
  function shuffle() {
    const idx = Math.floor(Math.random() * filtered.length);
    setCurrentIdx(idx);
    setRevealed(false);
  }

  // Reset idx when filters change
  useEffect(() => {
    setCurrentIdx(0);
    setRevealed(false);
  }, [topicFilter, difficultyFilter, showMastered]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50/50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-violet-700 to-indigo-700 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <BookMarked className="h-3.5 w-3.5" />
            Scripture Memorization
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3">Memory Verses</h1>
          <p className="text-violet-100 text-lg max-w-xl mx-auto">
            Hide the reference, recall the verse, then reveal to check yourself.
            Mark verses as mastered to track your progress.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {loading ? (
          <div className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
        ) : verses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <BookMarked className="h-14 w-14 text-gray-200 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              No memory verses yet
            </h3>
            <p className="text-sm text-gray-500">
              Memory verses will appear here once they are added.
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-white rounded-xl border border-gray-200 p-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-violet-600">{verses.length}</p>
                <p className="text-xs text-gray-500 mt-0.5">Total Verses</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-emerald-600">{mastered.size}</p>
                <p className="text-xs text-gray-500 mt-0.5">Mastered</p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-3 text-center shadow-sm">
                <p className="text-2xl font-bold text-amber-600">
                  {verses.length - mastered.size}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">Remaining</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6 items-center">
              <Filter className="h-3.5 w-3.5 text-gray-400" />
              <select
                value={topicFilter}
                onChange={(e) => setTopicFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                {allTopics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="text-xs border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-violet-400"
              >
                {["All", "EASY", "MEDIUM", "HARD"].map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <button
                onClick={() => setShowMastered((v) => !v)}
                className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${
                  showMastered
                    ? "bg-emerald-100 border-emerald-300 text-emerald-700"
                    : "bg-white border-gray-200 text-gray-500"
                }`}
              >
                {showMastered ? "Hiding Mastered" : "Show Mastered"}
              </button>
              <button
                onClick={shuffle}
                className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-violet-600"
              >
                <RefreshCw className="h-3.5 w-3.5" /> Shuffle
              </button>
            </div>

            {/* Flashcard */}
            {filtered.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
                <Check className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-800 mb-1">
                  All done!
                </h3>
                <p className="text-sm text-gray-500">
                  You&apos;ve mastered all verses in this set.
                </p>
              </div>
            ) : (
              <>
                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>
                      {currentIdx + 1} of {filtered.length}
                    </span>
                    {current && (
                      <span className={`font-medium px-1.5 rounded ${DIFFICULTY_COLORS[current.difficulty] ?? "bg-gray-100 text-gray-600"}`}>
                        {current.difficulty}
                      </span>
                    )}
                  </div>
                  <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-violet-500 rounded-full transition-all"
                      style={{
                        width: `${((currentIdx + 1) / filtered.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {current && (
                  <div className="bg-white rounded-2xl border border-gray-200 shadow-md overflow-hidden">
                    {/* Card header */}
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-5 text-white">
                      <p className="text-xs font-semibold text-violet-200 mb-1">
                        {current.topic ?? "Scripture"}
                      </p>
                      {revealed ? (
                        <h2 className="font-serif text-xl font-bold">
                          {current.reference}
                        </h2>
                      ) : (
                        <div className="h-7 bg-white/20 rounded-lg w-40 animate-pulse" />
                      )}
                    </div>

                    {/* Verse text */}
                    <div className="p-6">
                      <p className="font-serif text-gray-800 text-base leading-relaxed">
                        {current.text}
                      </p>
                      {revealed && (
                        <p className="text-xs text-gray-400 mt-3">
                          — {current.reference} ({current.translation})
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="px-6 pb-6 flex flex-wrap gap-3">
                      {!revealed ? (
                        <button
                          onClick={() => setRevealed(true)}
                          className="flex items-center gap-2 bg-violet-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-violet-700 transition-colors"
                        >
                          <Eye className="h-4 w-4" /> Reveal Reference
                        </button>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              toggleMastered(current.id);
                              next();
                            }}
                            className={`flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors ${
                              mastered.has(current.id)
                                ? "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                : "bg-emerald-600 text-white hover:bg-emerald-700"
                            }`}
                          >
                            <Check className="h-4 w-4" />
                            {mastered.has(current.id) ? "Unmark Mastered" : "Mastered!"}
                          </button>
                          <button
                            onClick={() => setRevealed(false)}
                            className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-gray-200 transition-colors"
                          >
                            <EyeOff className="h-4 w-4" /> Hide
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={prev}
                    disabled={currentIdx === 0}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </button>
                  <button
                    onClick={next}
                    disabled={currentIdx === filtered.length - 1}
                    className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
