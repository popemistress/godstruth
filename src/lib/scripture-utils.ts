/**
 * Shared scripture reference utilities.
 * Used by LessonContent (chip rendering) and ScriptureTooltip (fetching).
 */

// ── Book abbreviation → full name ─────────────────────────────────────────────

export const BOOK_MAP: Record<string, string> = {
  // Old Testament
  "genesis": "Genesis",  "gen": "Genesis",       "gen.": "Genesis",
  "exodus": "Exodus",    "ex": "Exodus",         "ex.": "Exodus",        "exod": "Exodus",    "exod.": "Exodus",
  "leviticus": "Leviticus","lev": "Leviticus",     "lev.": "Leviticus",
  "numbers": "Numbers",  "num": "Numbers",       "num.": "Numbers",
  "deuteronomy": "Deuteronomy","deut": "Deuteronomy",  "deut.": "Deuteronomy", "dt": "Deuteronomy", "dt.": "Deuteronomy",
  "joshua": "Joshua",    "josh": "Joshua",       "josh.": "Joshua",
  "judges": "Judges",    "judg": "Judges",       "judg.": "Judges",      "jdg": "Judges",
  "ruth": "Ruth",        "ru": "Ruth",
  "1 samuel": "1 Samuel","1 sam": "1 Samuel",    "1 sam.": "1 Samuel",   "1sam": "1 Samuel",
  "2 samuel": "2 Samuel","2 sam": "2 Samuel",    "2 sam.": "2 Samuel",   "2sam": "2 Samuel",
  "1 kings": "1 Kings",  "1 kgs": "1 Kings",     "1 kgs.": "1 Kings",    "1 ki": "1 Kings",   "1 ki.": "1 Kings",
  "2 kings": "2 Kings",  "2 kgs": "2 Kings",     "2 kgs.": "2 Kings",    "2 ki": "2 Kings",   "2 ki.": "2 Kings",
  "1 chr": "1 Chronicles","1 chr.": "1 Chronicles","1chr": "1 Chronicles","1 chron": "1 Chronicles","1 chron.": "1 Chronicles","1chron": "1 Chronicles",
  "2 chr": "2 Chronicles","2 chr.": "2 Chronicles","2chr": "2 Chronicles","2 chron": "2 Chronicles","2 chron.": "2 Chronicles","2chron": "2 Chronicles",
  "ezra": "Ezra",        "ezr": "Ezra",
  "nehemiah": "Nehemiah","neh": "Nehemiah",      "neh.": "Nehemiah",
  "esther": "Esther",    "esth": "Esther",       "esth.": "Esther",      "est": "Esther",
  "job": "Job",
  "psalms": "Psalms",    "ps": "Psalms",         "ps.": "Psalms",        "psa": "Psalms",     "psa.": "Psalms",    "psalm": "Psalms",
  "proverbs": "Proverbs","prov": "Proverbs",     "prov.": "Proverbs",    "pr": "Proverbs",
  "ecclesiastes": "Ecclesiastes","eccl": "Ecclesiastes", "eccl.": "Ecclesiastes","ecc": "Ecclesiastes",
  "song of solomon": "Song of Solomon","song": "Song of Solomon","sos": "Song of Solomon","ss": "Song of Solomon","cant": "Song of Solomon","canticles": "Song of Solomon",
  "isaiah": "Isaiah",    "isa": "Isaiah",        "isa.": "Isaiah",       "is": "Isaiah",      "is.": "Isaiah",
  "jeremiah": "Jeremiah","jer": "Jeremiah",      "jer.": "Jeremiah",
  "lamentations": "Lamentations","lam": "Lamentations",  "lam.": "Lamentations",
  "ezekiel": "Ezekiel",  "ezek": "Ezekiel",      "ezek.": "Ezekiel",     "ez": "Ezekiel",
  "daniel": "Daniel",    "dan": "Daniel",        "dan.": "Daniel",
  "hosea": "Hosea",      "hos": "Hosea",         "hos.": "Hosea",
  "joel": "Joel",
  "amos": "Amos",
  "obadiah": "Obadiah",  "obad": "Obadiah",      "obad.": "Obadiah",
  "jonah": "Jonah",      "jon": "Jonah",         "jon.": "Jonah",
  "micah": "Micah",      "mic": "Micah",         "mic.": "Micah",
  "nahum": "Nahum",      "nah": "Nahum",         "nah.": "Nahum",
  "habakkuk": "Habakkuk","hab": "Habakkuk",      "hab.": "Habakkuk",
  "zephaniah": "Zephaniah","zeph": "Zephaniah",    "zeph.": "Zephaniah",
  "haggai": "Haggai",    "hag": "Haggai",        "hag.": "Haggai",
  "zechariah": "Zechariah","zech": "Zechariah",    "zech.": "Zechariah",
  "malachi": "Malachi",  "mal": "Malachi",       "mal.": "Malachi",
  // New Testament
  "matthew": "Matthew",  "mt": "Matthew",        "mt.": "Matthew",       "matt": "Matthew",   "matt.": "Matthew",
  "mark": "Mark",        "mk": "Mark",           "mk.": "Mark",          "mar": "Mark",       "mar.": "Mark",
  "luke": "Luke",        "lk": "Luke",           "lk.": "Luke",          "luk": "Luke",
  "john": "John",        "jn": "John",           "jn.": "John",          "jhn": "John",
  "acts": "Acts",
  "romans": "Romans",    "rom": "Romans",        "rom.": "Romans",
  "1 corinthians": "1 Corinthians","1 cor": "1 Corinthians","1 cor.": "1 Corinthians","1cor": "1 Corinthians",
  "2 corinthians": "2 Corinthians","2 cor": "2 Corinthians","2 cor.": "2 Corinthians","2cor": "2 Corinthians",
  "galatians": "Galatians","gal": "Galatians",     "gal.": "Galatians",
  "ephesians": "Ephesians","eph": "Ephesians",     "eph.": "Ephesians",
  "philippians": "Philippians","phil": "Philippians",  "phil.": "Philippians",
  "colossians": "Colossians","col": "Colossians",    "col.": "Colossians",
  "1 thessalonians": "1 Thessalonians","1 thess": "1 Thessalonians","1 thess.": "1 Thessalonians","1thess": "1 Thessalonians",
  "2 thessalonians": "2 Thessalonians","2 thess": "2 Thessalonians","2 thess.": "2 Thessalonians","2thess": "2 Thessalonians",
  "1 timothy": "1 Timothy","1 tim": "1 Timothy",   "1 tim.": "1 Timothy",  "1tim": "1 Timothy",
  "2 timothy": "2 Timothy","2 tim": "2 Timothy",   "2 tim.": "2 Timothy",  "2tim": "2 Timothy",
  "titus": "Titus",      "tit": "Titus",         "tit.": "Titus",
  "philemon": "Philemon","phile": "Philemon",    "phile.": "Philemon",   "phm": "Philemon",   "phlm": "Philemon",
  "hebrews": "Hebrews",  "heb": "Hebrews",       "heb.": "Hebrews",
  "james": "James",      "jas": "James",         "jas.": "James",
  "1 peter": "1 Peter",  "1 pet": "1 Peter",     "1 pet.": "1 Peter",    "1pet": "1 Peter",
  "2 peter": "2 Peter",  "2 pet": "2 Peter",     "2 pet.": "2 Peter",    "2pet": "2 Peter",
  "1 john": "1 John",    "1 jn": "1 John",       "1 jn.": "1 John",      "1jn": "1 John",
  "2 john": "2 John",    "2 jn": "2 John",       "2 jn.": "2 John",      "2jn": "2 John",
  "3 john": "3 John",    "3 jn": "3 John",       "3 jn.": "3 John",      "3jn": "3 John",
  "jude": "Jude",
  "revelation": "Revelation","rev": "Revelation",    "rev.": "Revelation",
  // Deuterocanonical
  "tobit": "Tobit",       "tob.": "Tobit",
};

const VERSE_SPEC_SOURCE =
  String.raw`\d+:\d+(?:[–\-]\d+:\d+|[–\-]\d+)?(?:(?:,\s*\d+(?:[–\-]\d+)?)+)?`;

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const BOOK_ALIAS_SOURCE = Object.keys(BOOK_MAP)
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp)
  .join("|");

const BOOK_WITH_VERSES_RE = new RegExp(
  String.raw`^(${BOOK_ALIAS_SOURCE})\s+(${VERSE_SPEC_SOURCE})`,
  "i"
);

export const INLINE_SCRIPTURE_RE = new RegExp(
  String.raw`\b(${BOOK_ALIAS_SOURCE})\s+(${VERSE_SPEC_SOURCE})`,
  "gi"
);

function normalizeVerseRef(verseRef: string): string {
  return verseRef.replace(/–/g, "-").trim();
}

function bookFromAlias(alias: string): string | null {
  return BOOK_MAP[alias.toLowerCase().trim()] ?? null;
}

/** A single parsed scripture reference with display label and normalized lookup key. */
export interface ScriptureRef {
  /** Human-readable label shown on the chip, e.g. "John 3:16" */
  display: string;
  /** Normalised reference used for API lookup, e.g. "John 3:16-18" */
  ref: string;
}

/**
 * Parse a raw parenthetical interior like:
 *   "Mt. 7:7-11; 18:19-20; 17:20; Mk. 11:22-24; Jn. 14:12-15; 15:7"
 * into individual ScriptureRef entries, carrying the book forward when a
 * semicolon-separated segment has only chapter:verse (no book abbreviation).
 *
 * Returns [] if nothing parseable is found.
 */
export function parseScriptureList(raw: string): ScriptureRef[] {
  // Convert prose separators into semicolons so the book-switch logic works:
  // ". See also Mt. 9:15"  →  "; Mt. 9:15"
  // ". Compare this passage with Dan. 7:8"  →  "; Dan. 7:8"
  const preprocessed = raw
    .replace(/\.\s+(?:See also|Compare[\s\w]*?with)\s+/gi, "; ")
    .replace(/\.\s+(?=(?:\d\s+)?[A-Z][a-z]{1,5}\.?\s+\d)/g, "; ");

  const parts = preprocessed.split(";").map((s) => s.trim()).filter(Boolean);
  const results: ScriptureRef[] = [];
  let currentBook = "";

  for (const part of parts) {
    // Try: optional-number + book-abbrev + chapter:verse[-end]
    // e.g. "1 Jn. 3:16-18", "Song of Solomon 2:1", or "Mt. 7:7"
    const withBook = part.match(BOOK_WITH_VERSES_RE);
    if (withBook) {
      const book = bookFromAlias(withBook[1]);
      if (book) {
        currentBook = book;
        const verseRef = normalizeVerseRef(withBook[2]);
        const display  = `${book} ${verseRef}`;
        results.push({ display, ref: display });
        continue;
      }
    }

    // Try: book + whole-chapter only (e.g. "Ps. 91", "Lev. 26") — update currentBook but no chip
    const bookChapterOnly = part.match(/^((?:\d\s+)?[A-Za-z]+\.?)\s+(\d+)\s*$/);
    if (bookChapterOnly) {
      const abbrev = bookChapterOnly[1].toLowerCase().trim();
      const book   = BOOK_MAP[abbrev];
      if (book) {
        currentBook = book;
        continue;
      }
    }

    // Try: book + chapter range (e.g. "Rom. 1-2") — update currentBook but no chip
    const bookChapterRange = part.match(/^((?:\d\s+)?[A-Za-z]+\.?)\s+\d+-\d+\s*$/);
    if (bookChapterRange) {
      const abbrev = bookChapterRange[1].toLowerCase().trim();
      const book   = BOOK_MAP[abbrev];
      if (book) {
        currentBook = book;
        continue;
      }
    }

    // Try: bare chapter:verse[-end] — inherit currentBook
    // e.g. "18:19-20" or "15:7"
    const bareVerse = part.match(/^(\d+:\d+(?:[–\-]\d+:\d+|[–\-]\d+)?(?:(?:,\s*\d+(?:[–\-]\d+)?)+)?)/);
    if (bareVerse && currentBook) {
      const verseRef = normalizeVerseRef(bareVerse[1]);
      const display  = `${currentBook} ${verseRef}`;
      results.push({ display, ref: display });
      continue;
    }

    // If it has a digit:digit pattern but we couldn't classify it, skip.
  }

  return results;
}
