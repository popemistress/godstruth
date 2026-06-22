"use client";

import { useState } from "react";
import { Headphones, Play, ExternalLink, BookOpen, Volume2, Mic } from "lucide-react";
import { BIBLE_BOOKS } from "@/lib/bible-books";

interface AudioEdition {
  name: string;
  reader: string;
  translation: string;
  source: string;
  description: string;
  baseUrl: string; // LibriVox or external
  available: boolean;
}

const AUDIO_EDITIONS: AudioEdition[] = [
  {
    name: "King James Version — Alexander Scourby",
    reader: "Alexander Scourby",
    translation: "KJV",
    source: "LibriVox",
    description: "The definitive audio KJV narration by Alexander Scourby, widely regarded as the gold standard of spoken Scripture. Available in the public domain.",
    baseUrl: "https://librivox.org/the-king-james-version-of-the-bible/",
    available: true,
  },
  {
    name: "World English Bible — Various Readers",
    reader: "Multiple volunteers",
    translation: "WEB",
    source: "LibriVox",
    description: "The World English Bible is a public domain modern translation. LibriVox has produced a complete audio recording with multiple volunteer readers.",
    baseUrl: "https://librivox.org/the-world-english-bible-new-testament/",
    available: true,
  },
  {
    name: "American Standard Version",
    reader: "Various readers",
    translation: "ASV",
    source: "LibriVox",
    description: "The 1901 American Standard Version, a careful scholarly revision of the KJV, read aloud by LibriVox volunteers and available as a public domain audio recording.",
    baseUrl: "https://librivox.org/the-holy-bible-american-standard-version/",
    available: true,
  },
  {
    name: "Bible Gateway Audio — Multiple Translations",
    reader: "Professional narrators",
    translation: "NIV / ESV / NLT / NKJV",
    source: "BibleGateway",
    description: "BibleGateway offers free audio playback for many popular translations including NIV, ESV, NLT, and NKJV, with both single-narrator and dramatized options.",
    baseUrl: "https://www.biblegateway.com/audio/mclean/kjv/John.1",
    available: true,
  },
];

// LibriVox KJV book URLs (representative set)
const LIBRIVOX_KJV_BOOKS: Record<string, string> = {
  Genesis: "https://librivox.org/search?primary_key=0&search_category=title&searchtitle=genesis+bible+kjv",
  Psalms: "https://librivox.org/search?primary_key=0&search_category=title&searchtitle=psalms+bible+kjv",
  Matthew: "https://librivox.org/search?primary_key=0&search_category=title&searchtitle=matthew+bible+kjv",
  John: "https://librivox.org/search?primary_key=0&search_category=title&searchtitle=john+bible+kjv",
  Romans: "https://librivox.org/search?primary_key=0&search_category=title&searchtitle=romans+bible+kjv",
};

function getLibriVoxUrl(book: string) {
  return (
    LIBRIVOX_KJV_BOOKS[book] ??
    `https://librivox.org/search?primary_key=0&search_category=title&searchtitle=${encodeURIComponent(book)}+bible`
  );
}

function getBibleGatewayUrl(book: string, chapter: number) {
  return `https://www.biblegateway.com/audio/mclean/kjv/${book}.${chapter}`;
}

export default function AudioBiblePage() {
  const [selectedBook, setSelectedBook] = useState("John");
  const [selectedChapter, setSelectedChapter] = useState(3);

  const bookData = BIBLE_BOOKS.find((b) => b.name === selectedBook);
  const totalChapters = bookData?.chapters ?? 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/40 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-teal-700 to-emerald-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <Headphones className="h-3.5 w-3.5" />
            Audio Scripture
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3">Audio Bible</h1>
          <p className="text-teal-100 text-lg max-w-xl mx-auto">
            Listen to Scripture while you commute, exercise, rest, or pray.
            Public domain recordings and links to professional audio narrations.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
        {/* Listen Now */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Listen Now — BibleGateway
          </p>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-5">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Book
                </label>
                <select
                  value={selectedBook}
                  onChange={(e) => {
                    setSelectedBook(e.target.value);
                    setSelectedChapter(1);
                  }}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  <optgroup label="Old Testament">
                    {BIBLE_BOOKS.filter((b) => b.testament === "OT").map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="New Testament">
                    {BIBLE_BOOKS.filter((b) => b.testament === "NT").map((b) => (
                      <option key={b.name} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </optgroup>
                </select>
              </div>
              <div className="sm:w-32">
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                  Chapter
                </label>
                <select
                  value={selectedChapter}
                  onChange={(e) => setSelectedChapter(Number(e.target.value))}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-400"
                >
                  {Array.from({ length: totalChapters }, (_, i) => i + 1).map((ch) => (
                    <option key={ch} value={ch}>
                      {ch}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getBibleGatewayUrl(selectedBook, selectedChapter)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-teal-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-teal-700 transition-colors"
              >
                <Play className="h-4 w-4" />
                Play {selectedBook} {selectedChapter} on BibleGateway
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
              <a
                href={getLibriVoxUrl(selectedBook)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <Volume2 className="h-4 w-4" />
                LibriVox KJV
                <ExternalLink className="h-3.5 w-3.5 opacity-70" />
              </a>
            </div>
            <p className="text-xs text-gray-400 mt-3">
              Opens in a new tab. BibleGateway uses the Max McLean KJV narration by default.
            </p>
          </div>
        </div>

        {/* Audio editions */}
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
            Available Audio Editions
          </p>
          <div className="space-y-3">
            {AUDIO_EDITIONS.map((ed) => (
              <div
                key={ed.name}
                className="rounded-xl border border-gray-200 bg-white shadow-sm p-5"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center">
                    <Headphones className="h-6 w-6 text-teal-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-gray-900 text-sm">{ed.name}</h3>
                      <span className="text-xs bg-teal-50 text-teal-700 font-semibold px-2 py-0.5 rounded-full">
                        {ed.translation}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                        {ed.source}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                      {ed.description}
                    </p>
                    <a
                      href={ed.baseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700"
                    >
                      <Play className="h-3.5 w-3.5" />
                      Listen on {ed.source}
                      <ExternalLink className="h-3 w-3 opacity-70" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* How to listen */}
        <div className="rounded-2xl bg-teal-50 border border-teal-100 p-6">
          <div className="flex items-center gap-2 mb-3">
            <Mic className="h-5 w-5 text-teal-600" />
            <h3 className="font-semibold text-teal-800">Tips for Listening to Scripture</h3>
          </div>
          <ul className="space-y-2 text-sm text-teal-900">
            <li className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 mt-0.5 text-teal-500 flex-shrink-0" />
              Follow along in a physical Bible or in our{" "}
              <a href="/bible/workspace" className="font-semibold underline">
                Workspace
              </a>{" "}
              while listening.
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 mt-0.5 text-teal-500 flex-shrink-0" />
              Slow listening at 0.85x speed helps retention and deeper reflection.
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 mt-0.5 text-teal-500 flex-shrink-0" />
              Try listening to an entire epistle (e.g. Galatians, Philippians) in a single sitting as its original audience would have.
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="h-4 w-4 mt-0.5 text-teal-500 flex-shrink-0" />
              Pair audio with our{" "}
              <a href="/reading-plans" className="font-semibold underline">
                Reading Plans
              </a>{" "}
              for structured daily listening.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
