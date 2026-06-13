"use client";

import { useState, useEffect } from "react";
import { BookMarked, Eye, EyeOff, RotateCcw } from "lucide-react";

interface Verse {
  id: string;
  reference: string;
  text: string;
  translation: string;
  topic: string | null;
  difficulty: string;
}

export default function MemoryVersesPage() {
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [hidden, setHidden] = useState<Record<string, boolean>>({});

  useEffect(() => {
    fetch("/api/memory-verses")
      .then((r) => r.json())
      .then((data) => { setVerses(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function toggleHide(id: string) {
    setHidden((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  function revealAll() {
    setHidden({});
  }

  function hideAll() {
    const all: Record<string, boolean> = {};
    verses.forEach((v) => (all[v.id] = true));
    setHidden(all);
  }

  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Scripture Memorization</h1>
          <p className="text-sm text-gray-500">Hide the text and test your memory.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={revealAll} className="text-xs text-gray-500 hover:text-emerald-600 flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> Reveal</button>
          <button onClick={hideAll} className="text-xs text-gray-500 hover:text-emerald-600 flex items-center gap-1"><EyeOff className="h-3.5 w-3.5" /> Hide</button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : verses.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <BookMarked className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No memory verses yet</h3>
          <p className="text-sm text-gray-500">Verses will appear here once they are added.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {verses.map((v) => (
            <div key={v.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-emerald-600">{v.reference}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">{v.translation}</span>
                  <button onClick={() => toggleHide(v.id)} className="text-gray-400 hover:text-emerald-600">
                    {hidden[v.id] ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {hidden[v.id] ? (
                <div className="py-4 text-center">
                  <RotateCcw className="h-5 w-5 text-gray-300 mx-auto mb-2" />
                  <p className="text-xs text-gray-400">Tap the eye to reveal</p>
                </div>
              ) : (
                <p className="text-sm text-gray-700 leading-relaxed font-serif">{v.text}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
