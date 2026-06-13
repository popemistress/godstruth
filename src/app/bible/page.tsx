"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search, BookOpen, GitCompare, CalendarDays, Heart, Bookmark,
  BookMarked, Map, Clock, Languages, Mic, MessageSquare, ArrowRight,
  Highlighter, NotebookPen, Sparkles, AlignLeft,
} from "lucide-react";

const TOOLS = [
  { icon: Search, label: "Bible Search", href: "/bible/search", desc: "Search any word or phrase across Scripture", color: "bg-emerald-50 text-emerald-600" },
  { icon: BookOpen, label: "Passage Lookup", href: "/bible/lookup", desc: "Read any chapter or verse with multiple translations", color: "bg-blue-50 text-blue-600" },
  { icon: GitCompare, label: "Verse Comparison", href: "/bible/compare", desc: "Compare translations side-by-side", color: "bg-violet-50 text-violet-600" },
  { icon: CalendarDays, label: "Reading Plans", href: "/reading-plans", desc: "Structured daily reading schedules", color: "bg-amber-50 text-amber-600" },
  { icon: Heart, label: "Devotionals", href: "/devotionals", desc: "Daily reflections on Scripture", color: "bg-rose-50 text-rose-600" },
  { icon: BookMarked, label: "Memory Verses", href: "/memory-verses", desc: "Scripture memorization tools", color: "bg-cyan-50 text-cyan-600" },
  { icon: NotebookPen, label: "My Notes", href: "/dashboard/notes", desc: "Personal study notes and annotations", color: "bg-orange-50 text-orange-600" },
  { icon: Highlighter, label: "My Highlights", href: "/dashboard/highlights", desc: "Verses you have highlighted", color: "bg-yellow-50 text-yellow-600" },
  { icon: Bookmark, label: "Topics", href: "/topics", desc: "Study biblical themes and topics", color: "bg-pink-50 text-pink-600" },
  { icon: Clock, label: "Bible Timeline", href: "/bible/timeline", desc: "Visual chronology of biblical events", color: "bg-teal-50 text-teal-600" },
  { icon: Map, label: "Maps", href: "/bible/maps", desc: "Biblical geography and locations", color: "bg-indigo-50 text-indigo-600" },
  { icon: Languages, label: "Word Studies", href: "/bible/word-studies", desc: "Original Hebrew and Greek insights", color: "bg-fuchsia-50 text-fuchsia-600" },
  { icon: MessageSquare, label: "Commentary", href: "/bible/commentary", desc: "Trusted commentary on Scripture", color: "bg-slate-50 text-slate-600" },
  { icon: Mic, label: "Audio Bible", href: "/bible/audio", desc: "Listen to Scripture", color: "bg-lime-50 text-lime-600" },
];

export default function BibleHubPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="container-page py-10">
      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Bible Study Tools
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Everything you need to search, study, memorize, and apply God's Word — all in one place.
        </p>
      </div>

      {/* Quick search */}
      <div className="max-w-xl mx-auto mb-12">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (search.trim()) window.location.href = `/bible/search?q=${encodeURIComponent(search.trim())}`;
          }}
          className="relative"
        >
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search the Bible (e.g. John 3:16, love, creation)..."
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </form>
      </div>

      {/* Tools grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {TOOLS.map(({ icon: Icon, label, href, desc, color }) => (
          <Link
            key={label}
            href={href}
            className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700 transition-colors mb-1">
              {label}
            </h3>
            <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
            <ArrowRight className="h-3.5 w-3.5 text-gray-300 group-hover:text-emerald-500 mt-3 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  );
}
