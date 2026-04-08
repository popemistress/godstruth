"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BibleEdition } from "@prisma/client";
import { Search, BookOpen, Star, ChevronDown } from "lucide-react";

const PAGE_SIZE = 12;

const KNOWN_TRANSLATIONS = ["KJV", "NIV", "NIrV", "NASB", "NKJV", "ESV", "NLT", "CSB", "HCSB", "NRSV", "AMP", "MSG", "CEB", "CJB", "VOICE", "TPT", "DARBY", "TLV", "TLB", "NCV"];

function MiniCard({ bible }: { bible: BibleEdition }) {
  const hasCover = Boolean(bible.coverUrl);
  return (
    <Link href={`/bibles/${bible.slug}`} className="group block">
      <div
        className="relative rounded-xl overflow-hidden h-48 flex flex-col justify-between p-3.5 shadow group-hover:shadow-lg transition-all duration-200 group-hover:-translate-y-0.5"
        style={hasCover ? undefined : {
          background: `linear-gradient(155deg, ${bible.gradientFrom} 0%, ${bible.gradientTo} 100%)`,
        }}
      >
        {/* Spine */}
        {!hasCover && (
          <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl" style={{ background: bible.accentColor }} />
        )}

        {/* Cover image */}
        {hasCover && (
          <>
            <Image src={bible.coverUrl!} alt={bible.title} fill className="object-cover" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw" />
            {/* Dark overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/10" />
          </>
        )}

        {/* Translation badge */}
        <div className="relative">
          <span
            className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
            style={hasCover
              ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
              : { background: `${bible.accentColor}25`, color: bible.accentColor }
            }
          >
            {bible.translation}
          </span>
          {bible.featured && (
            <Star
              className="absolute top-0 right-0 h-3 w-3 fill-current opacity-70"
              style={{ color: hasCover ? "#fff" : bible.accentColor }}
            />
          )}
        </div>

        {/* Title */}
        <div className="relative">
          <h3 className="text-white font-serif font-bold text-xs leading-snug line-clamp-2">
            {bible.title}
          </h3>
          {!hasCover && bible.publisher && (
            <p className="text-white/40 text-[10px] truncate mt-0.5">{bible.publisher}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

interface BibleBrowseProps {
  bibles: BibleEdition[];
}

export function BibleBrowse({ bibles }: BibleBrowseProps) {
  const [search, setSearch]         = useState("");
  const [translation, setTranslation] = useState("All");
  const [page, setPage]             = useState(1);

  // Build translation filter list from actual data
  const translationOptions = useMemo(() => {
    const inData = new Set(bibles.map(b => b.translation));
    const known  = KNOWN_TRANSLATIONS.filter(t => inData.has(t));
    const other  = Array.from(inData).filter(t => !KNOWN_TRANSLATIONS.includes(t)).sort();
    return ["All", ...known, ...other.filter(t => t !== "OTHER"), "OTHER"];
  }, [bibles]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return bibles.filter(b => {
      const matchTrans = translation === "All" || b.translation === translation;
      const matchSearch = !q || b.title.toLowerCase().includes(q) || b.translation.toLowerCase().includes(q);
      return matchTrans && matchSearch;
    });
  }, [bibles, search, translation]);

  const visible = filtered.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < filtered.length;

  function handleFilter(t: string) {
    setTranslation(t);
    setPage(1);
  }

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  return (
    <div>
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-2xl font-bold text-neutral-80">
            All Bible Editions
          </h2>
          <span className="inline-flex items-center justify-center h-6 min-w-6 px-2 rounded-full bg-brand text-white text-xs font-bold">
            {bibles.length}
          </span>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-60 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={e => handleSearch(e.target.value)}
            placeholder="Search titles…"
            className="w-full pl-9 pr-4 py-2 text-sm rounded-full border border-neutral-40 bg-neutral-10 text-neutral-80 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand transition-colors placeholder-neutral-50"
          />
        </div>
      </div>

      {/* Translation filter pills */}
      <div className="flex flex-wrap gap-1.5 mb-5">
        {translationOptions.map(t => (
          <button
            key={t}
            onClick={() => handleFilter(t)}
            className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
              translation === t
                ? "bg-neutral-80 text-white border-neutral-80"
                : "bg-white text-neutral-45 border-neutral-20 hover:border-neutral-40 hover:text-neutral-70"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Showing count */}
      <p className="text-xs text-neutral-40 mb-5">
        Showing {Math.min(visible.length, filtered.length)} of{" "}
        {filtered.length === bibles.length
          ? `${bibles.length} editions`
          : `${filtered.length} matching (${bibles.length} total)`}
      </p>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-neutral-35">
          <BookOpen className="h-10 w-10 mb-3 opacity-30" />
          <p className="text-sm font-medium">No bibles match your search</p>
          <button onClick={() => { setSearch(""); setTranslation("All"); }} className="mt-3 text-xs underline text-neutral-40 hover:text-neutral-60">Clear filters</button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {visible.map(bible => (
              <MiniCard key={bible.id} bible={bible} />
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setPage(p => p + 1)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-neutral-20 bg-white text-sm font-medium text-neutral-60 hover:border-neutral-40 hover:text-neutral-80 transition-colors shadow-sm"
              >
                <ChevronDown className="h-4 w-4" />
                Load more ({filtered.length - visible.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
