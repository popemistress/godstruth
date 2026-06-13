"use client";

import { useState } from "react";
import { Search, BookOpen, Copy, Check } from "lucide-react";
import Link from "next/link";

const TRANSLATIONS = ["kjv", "niv", "esv", "nlt", "nkjv", "nasb", "amp", "csb"];

export default function BibleLookupPage() {
  const [ref, setRef] = useState("");
  const [translation, setTranslation] = useState("kjv");
  const [result, setResult] = useState<{ text: string; reference: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function lookup() {
    if (!ref.trim()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/scripture?ref=${encodeURIComponent(ref.trim())}&translation=${translation}`);
      const data = await res.json();
      if (res.ok) {
        setResult({ text: data.text, reference: ref.trim() });
      } else {
        setError(data.error || "Not found");
        setResult(null);
      }
    } catch {
      setError("Failed to look up passage");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Passage Lookup</h1>
      <p className="text-sm text-gray-500 mb-6">Enter a verse reference like John 3:16 or Genesis 1:1-3.</p>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && lookup()}
            placeholder="e.g. John 3:16"
            className="w-full border border-gray-200 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <select
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          {TRANSLATIONS.map((t) => (
            <option key={t} value={t}>{t.toUpperCase()}</option>
          ))}
        </select>
        <button
          onClick={lookup}
          disabled={loading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg px-5 py-2.5 transition-colors disabled:opacity-50"
        >
          {loading ? "Loading..." : "Look Up"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700 mb-4">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">{result.reference} <span className="text-xs text-gray-400 font-normal">({translation.toUpperCase()})</span></h2>
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${result.reference} — ${result.text}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs text-gray-400 hover:text-emerald-600 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <p className="text-gray-700 leading-relaxed text-lg font-serif">{result.text}</p>
          <div className="mt-4 pt-4 border-t border-gray-100 flex gap-3">
            <Link
              href={`/bible/compare?ref=${encodeURIComponent(result.reference)}`}
              className="text-xs font-medium text-emerald-600 hover:text-emerald-700"
            >
              Compare translations
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
