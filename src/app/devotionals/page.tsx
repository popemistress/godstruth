"use client";

import { useState, useEffect } from "react";
import { Heart, BookOpen, Sparkles } from "lucide-react";

interface DevotionalItem {
  id: string;
  title: string;
  slug: string;
  scripture: string;
  body: string;
  prayer: string | null;
  author: string | null;
  publishDate: string;
}

export default function DevotionalsPage() {
  const [devotionals, setDevotionals] = useState<DevotionalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/devotionals")
      .then((r) => r.json())
      .then((data) => { setDevotionals(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Devotionals</h1>
      <p className="text-sm text-gray-500 mb-8">Daily reflections on Scripture to deepen your walk with God.</p>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : devotionals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No devotionals yet</h3>
          <p className="text-sm text-gray-500">Check back soon for daily devotional content.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {devotionals.map((d) => (
            <article key={d.id} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-medium text-amber-600">{d.scripture}</span>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">{d.title}</h3>
              {d.author && <p className="text-xs text-gray-400 mb-3">by {d.author}</p>}
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{d.body}</p>
              {d.prayer && (
                <div className="rounded-lg bg-amber-50 p-4">
                  <p className="text-sm text-gray-600 italic leading-relaxed">{d.prayer}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
