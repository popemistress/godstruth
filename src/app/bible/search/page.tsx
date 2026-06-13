"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import Link from "next/link";

interface Result {
  book: string;
  chapter: string;
  verse: string;
  text: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    if (!q) return;
    setLoading(true);
    setSearched(true);
    fetch(`/api/bible/search?q=${encodeURIComponent(q)}`)
      .then((r) => r.json())
      .then((data) => setResults(data.results || []))
      .catch(() => setResults([]))
      .finally(() => setLoading(false));
  }, [q]);

  if (!q) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>Enter a search term above to find verses across the Bible.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-600 mx-auto" />
        <p className="text-sm text-gray-400 mt-2">Searching...</p>
      </div>
    );
  }

  if (searched && results.length === 0) {
    return (
      <div className="text-center py-16 text-gray-400">
        <p>No results found for &quot;{q}&quot;</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500 mb-4">{results.length} results for &quot;{q}&quot;</p>
      {results.map((r, i) => (
        <div key={i} className="rounded-lg border border-gray-200 bg-white p-4">
          <Link
            href={`/bible/lookup?ref=${encodeURIComponent(`${r.book} ${r.chapter}:${r.verse}`)}`}
            className="text-xs font-semibold text-emerald-600 hover:underline mb-1 block"
          >
            {r.book} {r.chapter}:{r.verse}
          </Link>
          <p className="text-sm text-gray-700 leading-relaxed">{r.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function BibleSearchPage() {
  const [query, setQuery] = useState("");

  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Bible Search</h1>
      <p className="text-sm text-gray-500 mb-6">Search across the King James Version.</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) {
            window.history.pushState({}, "", `?q=${encodeURIComponent(query.trim())}`);
            window.dispatchEvent(new PopStateEvent("popstate"));
          }
        }}
        className="relative mb-8"
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a word or phrase..."
          className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </form>

      <Suspense fallback={<div className="text-center py-16 text-gray-400">Loading...</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
