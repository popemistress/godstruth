"use client";

import { useState, useEffect } from "react";
import { Highlighter, Trash2 } from "lucide-react";

interface Highlight {
  id: string;
  reference: string;
  color: string;
  createdAt: string;
}

const COLOR_MAP: Record<string, string> = {
  yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
  blue: "bg-blue-100 border-blue-300 text-blue-800",
  green: "bg-green-100 border-green-300 text-green-800",
  pink: "bg-pink-100 border-pink-300 text-pink-800",
  purple: "bg-purple-100 border-purple-300 text-purple-800",
};

export default function HighlightsPage() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHighlights();
  }, []);

  async function loadHighlights() {
    try {
      const res = await fetch("/api/highlights");
      if (res.ok) {
        const data = await res.json();
        setHighlights(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function removeHighlight(id: string) {
    try {
      await fetch(`/api/highlights?id=${id}`, { method: "DELETE" });
      loadHighlights();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Highlights</h1>
      <p className="text-sm text-gray-500 mb-6">Verses you have marked for special attention.</p>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : highlights.length === 0 ? (
        <div className="text-center py-16">
          <Highlighter className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No highlights yet</h3>
          <p className="text-sm text-gray-500">Highlight verses while reading to see them here.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {highlights.map((h) => (
            <span
              key={h.id}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${COLOR_MAP[h.color] || COLOR_MAP.yellow}`}
            >
              {h.reference}
              <button onClick={() => removeHighlight(h.id)} className="opacity-50 hover:opacity-100">
                <Trash2 className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
