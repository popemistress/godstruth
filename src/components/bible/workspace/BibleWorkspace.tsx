"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  StickyNote,
  Columns2,
  Search,
  Copy,
  Check,
  Highlighter,
  PenLine,
  Trash2,
  ChevronDown,
  ChevronUp,
  PanelRight,
} from "lucide-react";
import { BIBLE_BOOKS, OT_BOOKS, NT_BOOKS } from "@/lib/bible-books";

// ─── Types ──────────────────────────────────────────────────────────────────

interface Verse {
  verse: number;
  text: string;
}

interface Note {
  id: string;
  reference: string;
  content: string;
  color: string;
  createdAt: string;
}

type HighlightMap = Record<string, string>; // reference → color
type StudyTab = "notes" | "parallel" | "words";

// ─── Constants ──────────────────────────────────────────────────────────────

const HIGHLIGHT_COLORS: { key: string; bg: string; ring: string; label: string }[] = [
  { key: "yellow", bg: "bg-yellow-200", ring: "ring-yellow-400", label: "Yellow" },
  { key: "blue",   bg: "bg-blue-200",   ring: "ring-blue-400",   label: "Blue" },
  { key: "green",  bg: "bg-green-200",  ring: "ring-green-400",  label: "Green" },
  { key: "pink",   bg: "bg-pink-200",   ring: "ring-pink-400",   label: "Pink" },
  { key: "purple", bg: "bg-purple-200", ring: "ring-purple-400", label: "Purple" },
];

const HIGHLIGHT_BG: Record<string, string> = {
  yellow: "bg-yellow-100",
  blue:   "bg-blue-100",
  green:  "bg-green-100",
  pink:   "bg-pink-100",
  purple: "bg-purple-100",
};

const PARALLEL_TRANSLATIONS = ["kjv", "nkjv", "esv", "nlt", "nasb", "amp"];
const PARALLEL_LABELS: Record<string, string> = {
  kjv:  "KJV",
  nkjv: "NKJV",
  esv:  "ESV",
  nlt:  "NLT",
  nasb: "NASB",
  amp:  "AMP",
};

const WORD_STUDIES = [
  { word: "Love",        hebrew: "אהבה (ahavah)",       greek: "ἀγάπη (agapē)",       meaning: "Unconditional, sacrificial love — the highest form of love in Scripture." },
  { word: "Peace",       hebrew: "שָׁלוֹם (shalom)",    greek: "εἰρήνη (eirēnē)",     meaning: "Wholeness and completeness — not merely absence of conflict but total well-being." },
  { word: "Grace",       hebrew: "חֵן (chen)",           greek: "χάρις (charis)",       meaning: "Unmerited favor freely given by God, the foundation of salvation." },
  { word: "Faith",       hebrew: "אֱמוּנָה (emunah)",  greek: "πίστις (pistis)",      meaning: "Active trust and reliance on God — faithfulness as well as belief." },
  { word: "Mercy",       hebrew: "חֶסֶד (chesed)",      greek: "ἔλεος (eleos)",        meaning: "Lovingkindness and covenant faithfulness — God's steadfast loyal love." },
  { word: "Word",        hebrew: "דָּבַר (davar)",       greek: "λόγος (logos)",        meaning: "God's spoken word carries creative, authoritative, and living power." },
  { word: "Spirit",      hebrew: "רוּחַ (ruach)",        greek: "πνεῦμα (pneuma)",     meaning: "Breath, wind, spirit — the animating divine presence of God." },
  { word: "Glory",       hebrew: "כָּבוֹד (kavod)",     greek: "δόξα (doxa)",          meaning: "Weighty honor and radiant splendor — the manifest presence of God." },
  { word: "Righteous",   hebrew: "צֶדֶק (tsedek)",      greek: "δικαιοσύνη (dikaiosynē)", meaning: "Conformity to God's standard — justice, uprightness, covenant faithfulness." },
  { word: "Holy",        hebrew: "קָדוֹשׁ (kadosh)",    greek: "ἅγιος (hagios)",       meaning: "Set apart, consecrated — utterly distinct from all that is common or sinful." },
  { word: "Covenant",    hebrew: "בְּרִית (berit)",     greek: "διαθήκη (diathēkē)",  meaning: "A solemn binding agreement — God's unbreakable promises to His people." },
  { word: "Salvation",   hebrew: "יְשׁוּעָה (yeshuah)",greek: "σωτηρία (sōtēria)",    meaning: "Deliverance, rescue, and preservation — the full work of God in saving humanity." },
  { word: "Repentance",  hebrew: "נָחַם (nacham)",       greek: "μετάνοια (metanoia)", meaning: "A complete change of mind and direction — turning from sin toward God." },
  { word: "Atonement",   hebrew: "כִּפֻּר (kippur)",    greek: "ἱλασμός (hilasmos)",  meaning: "Covering and propitiation — the satisfaction of divine justice through sacrifice." },
  { word: "Redeem",      hebrew: "גָּאַל (gaal)",        greek: "λυτρόω (lytroo)",     meaning: "To buy back or rescue — the kinsman-redeemer who pays the price to free." },
  { word: "Truth",       hebrew: "אֱמֶת (emet)",         greek: "ἀλήθεια (alētheia)",  meaning: "Reliability, steadfastness, and reality — that which fully corresponds to what is real." },
  { word: "Worship",     hebrew: "שָׁחָה (shachah)",    greek: "προσκυνέω (proskyneō)", meaning: "To bow down, prostrate oneself — giving full honor and reverence to God." },
  { word: "Kingdom",     hebrew: "מַלְכוּת (malkuth)",  greek: "βασιλεία (basileia)", meaning: "The reign and rule of God — both present reality and future consummation." },
  { word: "Sanctify",    hebrew: "קָדַשׁ (qadash)",     greek: "ἁγιάζω (hagiazō)",   meaning: "To make holy, set apart for God's purpose — progressive transformation." },
  { word: "Eternal",     hebrew: "עוֹלָם (olam)",        greek: "αἰώνιος (aiōnios)",  meaning: "Everlasting, age-enduring — the life and qualities that belong to God's age." },
  { word: "Wisdom",      hebrew: "חָכְמָה (chokmah)",   greek: "σοφία (sophia)",       meaning: "Skillful living aligned with God's design — insight into divine order." },
  { word: "Abide",       hebrew: "שָׁכַן (shakan)",     greek: "μένω (menō)",          meaning: "To dwell, remain, continue — a sustained union and fellowship with God." },
  { word: "Intercede",   hebrew: "פָּגַע (paga)",        greek: "ἐντυγχάνω (entynchanō)", meaning: "To meet with, strike — to stand in the gap and plead on another's behalf." },
  { word: "Humble",      hebrew: "עָנָו (anav)",         greek: "ταπεινός (tapeinos)", meaning: "Lowly, meek — not self-reliant but fully dependent on God's strength." },
  { word: "Praise",      hebrew: "הָלַל (halal)",        greek: "αἰνέω (aineō)",       meaning: "To boast in, to shine forth — exuberant celebration of who God is." },
];

const LS_HIGHLIGHTS = "bible-highlights";
const LS_NOTES = "bible-notes-local";

// ─── Utility ────────────────────────────────────────────────────────────────

function verseRef(book: string, chapter: number, verse: number) {
  return `${book} ${chapter}:${verse}`;
}

function chapterRef(book: string, chapter: number) {
  return `${book} ${chapter}`;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function BookNav({
  currentBook,
  currentChapter,
  onSelect,
  mobile,
  onClose,
}: {
  currentBook: string;
  currentChapter: number;
  onSelect: (book: string, chapter: number) => void;
  mobile?: boolean;
  onClose?: () => void;
}) {
  const [expanded, setExpanded] = useState<string>(currentBook);
  const [otOpen, setOtOpen] = useState(true);
  const [ntOpen, setNtOpen] = useState(true);

  function toggle(book: string) {
    setExpanded((prev) => (prev === book ? "" : book));
  }

  function Section({
    label,
    books,
    open,
    onToggle,
  }: {
    label: string;
    books: typeof BIBLE_BOOKS;
    open: boolean;
    onToggle: () => void;
  }) {
    return (
      <div>
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-600"
        >
          {label}
          {open ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </button>
        {open &&
          books.map((b) => (
            <div key={b.name}>
              <button
                onClick={() => toggle(b.name)}
                className={`w-full flex items-center justify-between px-3 py-1.5 text-sm rounded-md transition-colors ${
                  currentBook === b.name
                    ? "text-emerald-700 font-semibold bg-emerald-50"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="truncate">{b.name}</span>
                {expanded === b.name ? (
                  <ChevronUp className="h-3 w-3 flex-shrink-0 text-gray-400" />
                ) : (
                  <ChevronDown className="h-3 w-3 flex-shrink-0 text-gray-400" />
                )}
              </button>
              {expanded === b.name && (
                <div className="ml-3 mb-1 grid grid-cols-5 gap-0.5">
                  {Array.from({ length: b.chapters }, (_, i) => i + 1).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => {
                        onSelect(b.name, ch);
                        if (mobile && onClose) onClose();
                      }}
                      className={`text-xs py-1 rounded text-center transition-colors ${
                        currentBook === b.name && currentChapter === ch
                          ? "bg-emerald-600 text-white font-bold"
                          : "text-gray-500 hover:bg-emerald-100 hover:text-emerald-700"
                      }`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {mobile && (
        <div className="flex items-center justify-between p-3 border-b">
          <span className="font-semibold text-gray-800 text-sm">Books of the Bible</span>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        <Section
          label="Old Testament"
          books={OT_BOOKS}
          open={otOpen}
          onToggle={() => setOtOpen((v) => !v)}
        />
        <Section
          label="New Testament"
          books={NT_BOOKS}
          open={ntOpen}
          onToggle={() => setNtOpen((v) => !v)}
        />
      </div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export default function BibleWorkspace() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialBook = searchParams.get("book") || "John";
  const initialChapter = parseInt(searchParams.get("chapter") || "3", 10);
  const initialTranslation = searchParams.get("translation") || "kjv";

  const [book, setBook] = useState(initialBook);
  const [chapter, setChapter] = useState(initialChapter);
  const [translation, setTranslation] = useState(initialTranslation);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedVerse, setSelectedVerse] = useState<number | null>(null);
  const [actionMenu, setActionMenu] = useState<{ verse: number; x: number; y: number } | null>(null);
  const [noteInput, setNoteInput] = useState<{ verse: number; text: string } | null>(null);

  const [highlights, setHighlights] = useState<HighlightMap>({});
  const [notes, setNotes] = useState<Note[]>([]);

  const [activeTab, setActiveTab] = useState<StudyTab>("notes");
  const [parallelData, setParallelData] = useState<Record<string, string>>({});
  const [parallelRef, setParallelRef] = useState("John 3:16");
  const [wordSearch, setWordSearch] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [studyOpen, setStudyOpen] = useState(true);
  const [translationsList, setTranslationsList] = useState<
    { code: string; label: string; name: string }[]
  >([]);
  const [refInput, setRefInput] = useState(`${initialBook} ${initialChapter}`);
  const [copied, setCopied] = useState(false);

  const readerRef = useRef<HTMLDivElement>(null);

  // ── Load translations list ────────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/scripture?translations=1")
      .then((r) => r.json())
      .then((d) => setTranslationsList(d.translations ?? []));
  }, []);

  // ── Load highlights from localStorage ────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_HIGHLIGHTS);
      if (stored) setHighlights(JSON.parse(stored));
    } catch {}
  }, []);

  // ── Load notes from localStorage ─────────────────────────────────────────
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LS_NOTES);
      if (stored) setNotes(JSON.parse(stored));
    } catch {}
  }, []);

  // ── Sync local notes with API ─────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/notes")
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setNotes(data);
          localStorage.setItem(LS_NOTES, JSON.stringify(data));
        }
      })
      .catch(() => {});
  }, []);

  // ── Sync highlights with API ──────────────────────────────────────────────
  useEffect(() => {
    fetch("/api/highlights")
      .then((r) => {
        if (!r.ok) return null;
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const map: HighlightMap = {};
          data.forEach((h: { reference: string; color: string }) => {
            map[h.reference] = h.color;
          });
          setHighlights((prev) => ({ ...map, ...prev }));
        }
      })
      .catch(() => {});
  }, []);

  // ── Fetch chapter ─────────────────────────────────────────────────────────
  useEffect(() => {
    setLoading(true);
    setActionMenu(null);
    setNoteInput(null);
    const params = new URLSearchParams({
      book,
      chapter: String(chapter),
      translation,
    });
    fetch(`/api/bible/chapter?${params}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.verses) setVerses(d.verses);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [book, chapter, translation]);

  // ── Update URL ────────────────────────────────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams({ book, chapter: String(chapter), translation });
    router.replace(`/bible/workspace?${params}`, { scroll: false });
    setRefInput(`${book} ${chapter}`);
  }, [book, chapter, translation, router]);

  // ── Navigate ──────────────────────────────────────────────────────────────
  function navigate(newBook: string, newChapter: number) {
    const bookData = BIBLE_BOOKS.find((b) => b.name === newBook);
    if (!bookData) return;
    const clampedChapter = Math.max(1, Math.min(newChapter, bookData.chapters));
    setBook(newBook);
    setChapter(clampedChapter);
    setSelectedVerse(null);
    readerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }

  function prevChapter() {
    if (chapter > 1) {
      navigate(book, chapter - 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex((b) => b.name === book);
      if (idx > 0) {
        const prev = BIBLE_BOOKS[idx - 1];
        navigate(prev.name, prev.chapters);
      }
    }
  }

  function nextChapter() {
    const bookData = BIBLE_BOOKS.find((b) => b.name === book);
    if (!bookData) return;
    if (chapter < bookData.chapters) {
      navigate(book, chapter + 1);
    } else {
      const idx = BIBLE_BOOKS.findIndex((b) => b.name === book);
      if (idx < BIBLE_BOOKS.length - 1) {
        navigate(BIBLE_BOOKS[idx + 1].name, 1);
      }
    }
  }

  // ── Parse reference input ─────────────────────────────────────────────────
  function handleRefSubmit(e: React.FormEvent) {
    e.preventDefault();
    const match = refInput.match(/^(.+?)\s+(\d+)(?::(\d+))?$/);
    if (!match) return;
    const bookName = match[1].trim();
    const ch = parseInt(match[2], 10);
    const v = match[3] ? parseInt(match[3], 10) : null;
    const found = BIBLE_BOOKS.find(
      (b) => b.name.toLowerCase() === bookName.toLowerCase()
    );
    if (found) {
      navigate(found.name, ch);
      if (v) setSelectedVerse(v);
    }
  }

  // ── Verse click ───────────────────────────────────────────────────────────
  function handleVerseClick(verseNum: number, e: React.MouseEvent) {
    e.stopPropagation();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const container = readerRef.current?.getBoundingClientRect();
    if (!container) return;
    setSelectedVerse(verseNum);
    setActionMenu({
      verse: verseNum,
      x: rect.left - container.left,
      y: rect.bottom - container.top + 4,
    });
    // load parallel
    const ref = verseRef(book, chapter, verseNum);
    setParallelRef(ref);
    loadParallel(ref);
  }

  // ── Close action menu on outside click ───────────────────────────────────
  useEffect(() => {
    function handler(e: MouseEvent) {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-action-menu]") && !target.closest("[data-verse]")) {
        setActionMenu(null);
      }
    }
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  // ── Highlight ─────────────────────────────────────────────────────────────
  function applyHighlight(verseNum: number, color: string) {
    const ref = verseRef(book, chapter, verseNum);
    const updated = { ...highlights, [ref]: color };
    setHighlights(updated);
    localStorage.setItem(LS_HIGHLIGHTS, JSON.stringify(updated));
    fetch("/api/highlights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference: ref, color }),
    }).catch(() => {});
    setActionMenu(null);
  }

  function removeHighlight(ref: string) {
    const updated = { ...highlights };
    delete updated[ref];
    setHighlights(updated);
    localStorage.setItem(LS_HIGHLIGHTS, JSON.stringify(updated));
  }

  // ── Notes ─────────────────────────────────────────────────────────────────
  function openNoteEditor(verseNum: number) {
    setNoteInput({ verse: verseNum, text: "" });
    setActionMenu(null);
    setActiveTab("notes");
    setStudyOpen(true);
  }

  async function saveNote() {
    if (!noteInput || !noteInput.text.trim()) {
      setNoteInput(null);
      return;
    }
    const ref = noteInput.verse > 0
      ? verseRef(book, chapter, noteInput.verse)
      : chapterRef(book, chapter);
    const newNote: Note = {
      id: Date.now().toString(),
      reference: ref,
      content: noteInput.text.trim(),
      color: "yellow",
      createdAt: new Date().toISOString(),
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem(LS_NOTES, JSON.stringify(updated));
    fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reference: ref, content: newNote.content, color: "yellow" }),
    })
      .then((r) => r.json())
      .then((saved) => {
        setNotes((prev) =>
          prev.map((n) => (n.id === newNote.id ? { ...n, id: saved.id } : n))
        );
      })
      .catch(() => {});
    setNoteInput(null);
  }

  function deleteNote(id: string) {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    localStorage.setItem(LS_NOTES, JSON.stringify(updated));
    fetch(`/api/notes?id=${id}`, { method: "DELETE" }).catch(() => {});
  }

  // ── Copy ──────────────────────────────────────────────────────────────────
  function copyVerse(verseNum: number) {
    const verse = verses.find((v) => v.verse === verseNum);
    if (!verse) return;
    const ref = verseRef(book, chapter, verseNum);
    navigator.clipboard.writeText(`${ref} — ${verse.text}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
    setActionMenu(null);
  }

  // ── Parallel ──────────────────────────────────────────────────────────────
  const loadParallel = useCallback(async (ref: string) => {
    const results: Record<string, string> = {};
    await Promise.allSettled(
      PARALLEL_TRANSLATIONS.map(async (t) => {
        try {
          const r = await fetch(
            `/api/scripture?ref=${encodeURIComponent(ref)}&translation=${t}`
          );
          if (r.ok) {
            const d = await r.json();
            results[t] = d.text;
          }
        } catch {}
      })
    );
    setParallelData(results);
  }, []);

  // Load default parallel on mount
  useEffect(() => {
    loadParallel("John 3:16");
  }, [loadParallel]);

  // ── Chapter-level note ────────────────────────────────────────────────────
  const chapterNotes = notes.filter(
    (n) =>
      n.reference === chapterRef(book, chapter) ||
      n.reference.startsWith(`${book} ${chapter}:`)
  );

  // ── Filtered words ────────────────────────────────────────────────────────
  const filteredWords = wordSearch
    ? WORD_STUDIES.filter(
        (w) =>
          w.word.toLowerCase().includes(wordSearch.toLowerCase()) ||
          w.hebrew.toLowerCase().includes(wordSearch.toLowerCase()) ||
          w.greek.toLowerCase().includes(wordSearch.toLowerCase()) ||
          w.meaning.toLowerCase().includes(wordSearch.toLowerCase())
      )
    : WORD_STUDIES;

  // ── Selected verse text for word study highlighting ───────────────────────
  const selectedVerseText = selectedVerse
    ? verses.find((v) => v.verse === selectedVerse)?.text?.toLowerCase() ?? ""
    : "";

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  const currentBook = BIBLE_BOOKS.find((b) => b.name === book);
  const totalChapters = currentBook?.chapters ?? 1;

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header className="flex-shrink-0 bg-white border-b border-gray-200 px-3 py-2 flex items-center gap-2 z-30">
        {/* Mobile sidebar toggle */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
          aria-label="Open book navigation"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand */}
        <span className="hidden sm:block text-sm font-bold text-emerald-700 mr-2">
          GodsTruth
        </span>

        {/* Reference input */}
        <form onSubmit={handleRefSubmit} className="flex-1 max-w-xs">
          <div className="relative">
            <BookOpen className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input
              type="text"
              value={refInput}
              onChange={(e) => setRefInput(e.target.value)}
              placeholder="John 3"
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-50"
            />
          </div>
        </form>

        {/* Translation selector */}
        <select
          value={translation}
          onChange={(e) => setTranslation(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-400 max-w-[120px]"
        >
          {translationsList.map((t) => (
            <option key={t.code} value={t.code}>
              {t.label}
            </option>
          ))}
        </select>

        {/* Study panel toggle */}
        <button
          onClick={() => setStudyOpen((v) => !v)}
          className={`ml-auto p-1.5 rounded-md transition-colors ${
            studyOpen
              ? "bg-emerald-100 text-emerald-700"
              : "text-gray-500 hover:bg-gray-100"
          }`}
          aria-label="Toggle study panel"
        >
          <PanelRight className="h-5 w-5" />
        </button>
      </header>

      {/* ── BODY ───────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden relative">

        {/* ── Mobile sidebar overlay ─────────────────────────────────────── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-72 bg-white shadow-xl z-50">
              <BookNav
                currentBook={book}
                currentChapter={chapter}
                onSelect={navigate}
                mobile
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* ── LEFT: Book navigation (desktop) ───────────────────────────── */}
        <aside className="hidden md:flex flex-col w-52 flex-shrink-0 border-r border-gray-200 bg-white overflow-hidden">
          <BookNav
            currentBook={book}
            currentChapter={chapter}
            onSelect={navigate}
          />
        </aside>

        {/* ── CENTER: Chapter reader ─────────────────────────────────────── */}
        <main
          ref={readerRef}
          className="flex-1 overflow-y-auto relative"
          onClick={() => setActionMenu(null)}
        >
          <div className="max-w-2xl mx-auto px-4 py-8">
            {/* Chapter header */}
            <div className="mb-6 text-center">
              <h2 className="font-serif text-2xl font-bold text-gray-900">
                {book}
              </h2>
              <p className="text-sm text-gray-400 mt-0.5">
                Chapter {chapter} &middot; {translation.toUpperCase()}
              </p>
            </div>

            {loading ? (
              <div className="space-y-3">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-200 rounded animate-pulse"
                    style={{ width: `${60 + Math.random() * 40}%` }}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-1 relative">
                {verses.map((v) => {
                  const ref = verseRef(book, chapter, v.verse);
                  const hlColor = highlights[ref];
                  const hasNote = notes.some((n) => n.reference === ref);
                  const isSelected = selectedVerse === v.verse;

                  return (
                    <div
                      key={v.verse}
                      data-verse={v.verse}
                      onClick={(e) => handleVerseClick(v.verse, e)}
                      className={`flex gap-2 py-1 px-2 rounded-lg cursor-pointer transition-colors group ${
                        isSelected
                          ? "bg-emerald-50 ring-1 ring-emerald-200"
                          : hlColor
                          ? HIGHLIGHT_BG[hlColor]
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <span className="flex-shrink-0 text-xs font-bold text-emerald-500 mt-1 w-5 text-right select-none">
                        {v.verse}
                      </span>
                      <p className="font-serif text-gray-800 leading-relaxed text-base flex-1">
                        {v.text}
                        {hasNote && (
                          <span className="ml-1 inline-block">
                            <PenLine className="inline h-3 w-3 text-amber-400" />
                          </span>
                        )}
                      </p>
                    </div>
                  );
                })}

                {/* Floating action menu */}
                {actionMenu && (
                  <div
                    data-action-menu
                    style={{ top: actionMenu.y, left: Math.max(0, actionMenu.x) }}
                    className="absolute z-20 bg-white rounded-xl shadow-lg border border-gray-200 p-2 min-w-[200px]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Highlight row */}
                    <div className="flex items-center gap-1.5 mb-2 pb-2 border-b border-gray-100">
                      <Highlighter className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                      {HIGHLIGHT_COLORS.map((c) => (
                        <button
                          key={c.key}
                          onClick={() => applyHighlight(actionMenu.verse, c.key)}
                          className={`w-5 h-5 rounded-full ${c.bg} ring-2 ring-transparent hover:${c.ring} transition-all`}
                          title={c.label}
                        />
                      ))}
                      {highlights[verseRef(book, chapter, actionMenu.verse)] && (
                        <button
                          onClick={() => {
                            removeHighlight(verseRef(book, chapter, actionMenu.verse));
                            setActionMenu(null);
                          }}
                          className="ml-auto text-xs text-gray-400 hover:text-red-500"
                        >
                          Clear
                        </button>
                      )}
                    </div>
                    {/* Actions */}
                    <button
                      onClick={() => openNoteEditor(actionMenu.verse)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <PenLine className="h-4 w-4 text-amber-500" /> Add Note
                    </button>
                    <button
                      onClick={() => copyVerse(actionMenu.verse)}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-emerald-500" />
                      ) : (
                        <Copy className="h-4 w-4 text-blue-500" />
                      )}
                      {copied ? "Copied!" : "Copy Verse"}
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab("parallel");
                        setStudyOpen(true);
                        setActionMenu(null);
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      <Columns2 className="h-4 w-4 text-purple-500" /> Compare
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Note input */}
            {noteInput && (
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-semibold text-amber-700 mb-2">
                  Note for {noteInput.verse > 0 ? verseRef(book, chapter, noteInput.verse) : chapterRef(book, chapter)}
                </p>
                <textarea
                  autoFocus
                  value={noteInput.text}
                  onChange={(e) => setNoteInput({ ...noteInput, text: e.target.value })}
                  placeholder="Write your study note here…"
                  className="w-full text-sm border border-amber-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white"
                  rows={3}
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={saveNote}
                    className="px-4 py-1.5 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700"
                  >
                    Save Note
                  </button>
                  <button
                    onClick={() => setNoteInput(null)}
                    className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 text-sm rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Chapter navigation */}
            <div className="mt-10 flex items-center justify-between border-t border-gray-200 pt-6">
              <button
                onClick={prevChapter}
                disabled={book === "Genesis" && chapter === 1}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                {chapter > 1 ? `Chapter ${chapter - 1}` : "Previous Book"}
              </button>
              <span className="text-xs text-gray-400">
                {chapter} / {totalChapters}
              </span>
              <button
                onClick={nextChapter}
                disabled={book === "Revelation" && chapter === 22}
                className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-emerald-700 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {chapter < totalChapters ? `Chapter ${chapter + 1}` : "Next Book"}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </main>

        {/* ── RIGHT: Study panel ─────────────────────────────────────────── */}
        {studyOpen && (
          <aside className="w-80 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 flex-shrink-0">
              {(
                [
                  { key: "notes", icon: StickyNote, label: "Notes" },
                  { key: "parallel", icon: Columns2, label: "Parallel" },
                  { key: "words", icon: Search, label: "Words" },
                ] as const
              ).map(({ key, icon: Icon, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                    activeTab === key
                      ? "border-emerald-600 text-emerald-700 bg-emerald-50"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto">

              {/* ── NOTES TAB ─────────────────────────────────────────────── */}
              {activeTab === "notes" && (
                <div className="p-4 space-y-4">
                  {/* Quick note for current chapter */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 mb-2">
                      Add note for {book} {chapter}
                    </p>
                    <button
                      onClick={() => setNoteInput({ verse: 0, text: "" })}
                      className="w-full flex items-center gap-2 text-sm text-gray-400 border border-dashed border-gray-300 rounded-lg p-3 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                    >
                      <PenLine className="h-4 w-4" />
                      Write a note for this passage…
                    </button>
                  </div>

                  {/* Chapter notes */}
                  {chapterNotes.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-xs font-semibold text-gray-500">
                        Notes ({chapterNotes.length})
                      </p>
                      {chapterNotes.map((note) => (
                        <div
                          key={note.id}
                          className="rounded-lg border border-gray-200 p-3 bg-gray-50 relative group"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-emerald-600">
                              {note.reference}
                            </span>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="opacity-0 group-hover:opacity-100 text-gray-300 hover:text-red-500 transition-opacity"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-700 leading-relaxed">
                            {note.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400">
                      <StickyNote className="h-8 w-8 mx-auto mb-2 text-gray-200" />
                      <p className="text-xs">No notes for this chapter yet.</p>
                      <p className="text-xs mt-1">Click a verse to add one.</p>
                    </div>
                  )}
                </div>
              )}

              {/* ── PARALLEL TAB ──────────────────────────────────────────── */}
              {activeTab === "parallel" && (
                <div className="p-4 space-y-3">
                  <p className="text-xs font-semibold text-gray-500">
                    Comparing:{" "}
                    <span className="text-emerald-600">{parallelRef}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Click any verse to compare it here.
                  </p>
                  {PARALLEL_TRANSLATIONS.map((t) => (
                    <div
                      key={t}
                      className="rounded-lg border border-gray-200 p-3 bg-white"
                    >
                      <p className="text-xs font-bold text-emerald-600 mb-1.5">
                        {PARALLEL_LABELS[t]}
                      </p>
                      {parallelData[t] ? (
                        <p className="text-sm text-gray-700 leading-relaxed font-serif">
                          {parallelData[t]}
                        </p>
                      ) : (
                        <div className="h-3 bg-gray-100 rounded animate-pulse w-3/4" />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* ── WORD STUDY TAB ────────────────────────────────────────── */}
              {activeTab === "words" && (
                <div className="p-4 space-y-3">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={wordSearch}
                      onChange={(e) => setWordSearch(e.target.value)}
                      placeholder="Search words…"
                      className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-gray-50"
                    />
                  </div>
                  {selectedVerse && (
                    <p className="text-xs text-gray-400">
                      Words from verse {selectedVerse} are{" "}
                      <span className="text-emerald-600 font-medium">highlighted</span>.
                    </p>
                  )}
                  {filteredWords.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">
                      No words found.
                    </p>
                  )}
                  {filteredWords.map((w) => {
                    const isInVerse =
                      selectedVerse &&
                      selectedVerseText.includes(w.word.toLowerCase());
                    return (
                      <div
                        key={w.word}
                        className={`rounded-lg border p-3 transition-colors ${
                          isInVerse
                            ? "border-emerald-300 bg-emerald-50"
                            : "border-gray-200 bg-white"
                        }`}
                      >
                        <p
                          className={`text-sm font-bold mb-1 ${
                            isInVerse ? "text-emerald-700" : "text-gray-800"
                          }`}
                        >
                          {w.word}
                        </p>
                        <div className="flex flex-wrap gap-1.5 mb-1.5">
                          <span className="text-xs text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                            {w.hebrew}
                          </span>
                          <span className="text-xs text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded font-medium">
                            {w.greek}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          {w.meaning}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
