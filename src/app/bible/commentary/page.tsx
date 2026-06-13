"use client";

import { MessageSquare, BookOpen } from "lucide-react";

const SOURCES = [
  { name: "Matthew Henry's Commentary", desc: "Classic 18th-century commentary known for pastoral warmth and theological depth." },
  { name: "Barnes' Notes", desc: "Detailed exegetical notes with attention to original languages and historical context." },
  { name: "Clarke's Commentary", desc: "Adam Clarke's Wesleyan perspective with extensive linguistic and historical notes." },
  { name: "Pulpit Commentary", desc: "Homiletical and exegetical commentary compiled from sermons and studies." },
  { name: "Jamieson-Fausset-Brown", desc: "Concise yet thorough commentary from three Scottish Presbyterian ministers." },
];

export default function CommentaryPage() {
  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Commentary Layers</h1>
      <p className="text-sm text-gray-500 mb-8">Trusted commentary sources to illuminate Scripture.</p>

      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center mb-8">
        <BookOpen className="h-16 w-16 text-emerald-200 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">Commentary Database Coming Soon</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          We are integrating public-domain commentary to allow verse-by-verse study
          from multiple trusted sources.
        </p>
      </div>

      <div className="space-y-3">
        {SOURCES.map((s) => (
          <div key={s.name} className="rounded-lg border border-gray-200 bg-white p-4">
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="h-4 w-4 text-emerald-500" />
              <h3 className="font-semibold text-gray-900 text-sm">{s.name}</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
