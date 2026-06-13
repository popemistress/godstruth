"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { GitCompare, Loader2 } from "lucide-react";

const ALL_TRANSLATIONS = [
  { code: "kjv", name: "King James Version" },
  { code: "niv", name: "New International Version" },
  { code: "esv", name: "English Standard Version" },
  { code: "nlt", name: "New Living Translation" },
  { code: "nkjv", name: "New King James Version" },
  { code: "nasb", name: "New American Standard Bible" },
  { code: "amp", name: "Amplified Bible" },
  { code: "csb", name: "Christian Standard Bible" },
];

function CompareResults() {
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref") ?? "";
  const [results, setResults] = useState<{ code: string; name: string; text: string | null }[]>([]);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useState(() => {
    if (!ref) return;
    setLoading(true);
    const codes = ALL_TRANSLATIONS.map((t) => t.code).join(",");
    fetch(`/api/bible/compare?ref=${encodeURIComponent(ref)}&translations=${codes}`)
      .then((r) => r.json())
      .then((data) => {
        setResults(data.comparisons || []);
        setDone(true);
      })
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  });

  // Trigger on mount when ref exists
  useState(() => {
    if (ref) {
      setLoading(true);
      const codes = ALL_TRANSLATIONS.map((t) => t.code).join(",");
      fetch(`/api/bible/compare?ref=${encodeURIComponent(ref)}&translations=${codes}`)
        .then((r) => r.json())
        .then((data) => {
          setResults(data.comparisons || []);
          setDone(true);
        })
        .catch(() => setResults([]))
        .finally(() => setLoading(false));
    }
  });

  if (!ref) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>Enter a verse reference to compare translations.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600 mx-auto" />
        <p className="text-sm text-gray-400 mt-2">Loading translations...</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((r) => (
        <div key={r.code} className="rounded-lg border border-gray-200 bg-white p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{r.name}</span>
            <span className="text-xs text-gray-300">{r.code.toUpperCase()}</span>
          </div>
          {r.text ? (
            <p className="text-sm text-gray-700 leading-relaxed font-serif">{r.text}</p>
          ) : (
            <p className="text-sm text-gray-400 italic">Not available in this translation</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default function ComparePage() {
  const [ref, setRef] = useState("");

  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Verse Comparison</h1>
      <p className="text-sm text-gray-500 mb-6">Compare how different translations render the same verse.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (ref.trim()) {
            window.history.pushState({}, "", `?ref=${encodeURIComponent(ref.trim())}`);
            window.dispatchEvent(new PopStateEvent("popstate"));
          }
        }}
        className="flex gap-3 mb-8"
      >
        <input
          type="text"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="e.g. John 3:16"
          className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg px-5 py-2.5 transition-colors"
        >
          <GitCompare className="h-4 w-4" />
        </button>
      </form>

      <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading...</div>}>
        <CompareResults />
      </Suspense>
    </div>
  );
}
