"use client";

import { useState, useEffect } from "react";
import { Tag, ArrowRight, BookOpen } from "lucide-react";
import Link from "next/link";

interface Topic {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  passages: string[];
  relatedTopics: string[];
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/topics")
      .then((r) => r.json())
      .then((data) => { setTopics(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-10 max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Topic Studies</h1>
      <p className="text-sm text-gray-500 mb-8">Explore biblical themes and topics with curated passages.</p>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : topics.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Tag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No topics yet</h3>
          <p className="text-sm text-gray-500">Topic studies will appear here once they are created.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {topics.map((t) => (
            <div key={t.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-1">{t.title}</h3>
              {t.description && <p className="text-xs text-gray-500 mb-3">{t.description}</p>}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {t.passages.slice(0, 6).map((p) => (
                  <span key={p} className="text-xs bg-gray-50 text-gray-600 px-2 py-0.5 rounded border border-gray-100">{p}</span>
                ))}
                {t.passages.length > 6 && (
                  <span className="text-xs text-gray-400 px-2 py-0.5">+{t.passages.length - 6} more</span>
                )}
              </div>
              {t.relatedTopics.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {t.relatedTopics.map((rt) => (
                    <span key={rt} className="text-xs text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{rt}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
