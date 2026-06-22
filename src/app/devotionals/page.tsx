"use client";

import { useState, useEffect } from "react";
import { Heart, BookOpen, Sparkles, ChevronDown, ChevronUp } from "lucide-react";

interface DevotionalItem {
  id: string;
  title: string;
  slug: string;
  scripture: string;
  body: string;
  prayer: string | null;
  author: string | null;
  publishDate: string;
  featured: boolean;
}

function DevotionalCard({ d, featured }: { d: DevotionalItem; featured?: boolean }) {
  const [expanded, setExpanded] = useState(featured ?? false);
  const date = new Date(d.publishDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article
      className={`rounded-2xl border bg-white overflow-hidden shadow-sm transition-shadow hover:shadow-md ${
        featured ? "border-amber-200" : "border-gray-200"
      }`}
    >
      {featured && (
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-5 py-2 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-white" />
          <span className="text-xs font-bold text-white uppercase tracking-wide">
            Today&apos;s Devotional
          </span>
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
            <BookOpen className="h-3 w-3" />
            {d.scripture}
          </span>
          <span className="text-xs text-gray-400 ml-auto">{date}</span>
        </div>
        <h3
          className={`font-serif font-bold text-gray-900 mb-2 ${
            featured ? "text-xl" : "text-lg"
          }`}
        >
          {d.title}
        </h3>
        {d.author && (
          <p className="text-xs text-gray-400 mb-3">by {d.author}</p>
        )}
        <div
          className={`overflow-hidden transition-all duration-300 ${
            expanded ? "max-h-[1000px]" : "max-h-24"
          }`}
        >
          <p className="text-sm text-gray-700 leading-relaxed">{d.body}</p>
          {d.prayer && expanded && (
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-100 p-4">
              <p className="text-xs font-semibold text-amber-700 mb-1 flex items-center gap-1.5">
                <Heart className="h-3.5 w-3.5" /> Prayer
              </p>
              <p className="text-sm text-gray-600 italic leading-relaxed">
                {d.prayer}
              </p>
            </div>
          )}
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
        >
          {expanded ? (
            <>
              Read Less <ChevronUp className="h-3.5 w-3.5" />
            </>
          ) : (
            <>
              Read More <ChevronDown className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
    </article>
  );
}

export default function DevotionalsPage() {
  const [devotionals, setDevotionals] = useState<DevotionalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/devotionals")
      .then((r) => r.json())
      .then((data) => {
        setDevotionals(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const today = devotionals.find((d) => d.featured) ?? devotionals[0];
  const archive = devotionals.filter((d) => d.id !== today?.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Heart className="h-3.5 w-3.5" />
            Daily Reflections
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3">Devotionals</h1>
          <p className="text-amber-100 text-lg max-w-xl mx-auto">
            Daily reflections on Scripture to deepen your walk with God and
            strengthen your faith.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-52 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : devotionals.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <Heart className="h-14 w-14 text-gray-200 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              Devotionals coming soon
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Check back soon for daily devotional reflections on Scripture.
            </p>
          </div>
        ) : (
          <>
            {today && <DevotionalCard d={today} featured />}
            {archive.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
                  Recent Devotionals
                </p>
                <div className="space-y-4">
                  {archive.map((d) => (
                    <DevotionalCard key={d.id} d={d} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
