/**
 * Shared scripture reference utilities.
 * Used by LessonContent (chip rendering) and ScriptureTooltip (fetching).
 */

// ── Book abbreviation → full name ─────────────────────────────────────────────

export const BOOK_MAP: Record<string, string> = {
  // Old Testament
  "gen": "Genesis",       "gen.": "Genesis",
  "ex": "Exodus",         "ex.": "Exodus",        "exod": "Exodus",    "exod.": "Exodus",
  "lev": "Leviticus",     "lev.": "Leviticus",
  "num": "Numbers",       "num.": "Numbers",
  "deut": "Deuteronomy",  "deut.": "Deuteronomy", "dt": "Deuteronomy", "dt.": "Deuteronomy",
  "josh": "Joshua",       "josh.": "Joshua",
  "judg": "Judges",       "judg.": "Judges",      "jdg": "Judges",
  "ruth": "Ruth",
  "1 sam": "1 Samuel",    "1 sam.": "1 Samuel",   "1sam": "1 Samuel",
  "2 sam": "2 Samuel",    "2 sam.": "2 Samuel",   "2sam": "2 Samuel",
  "1 kgs": "1 Kings",     "1 kgs.": "1 Kings",    "1 ki": "1 Kings",   "1 ki.": "1 Kings",  "1 kings": "1 Kings",
  "2 kgs": "2 Kings",     "2 kgs.": "2 Kings",    "2 ki": "2 Kings",   "2 ki.": "2 Kings",  "2 kings": "2 Kings",
  "1 chr": "1 Chronicles","1 chr.": "1 Chronicles","1chr": "1 Chronicles","1 chron": "1 Chronicles","1 chron.": "1 Chronicles","1chron": "1 Chronicles",
  "2 chr": "2 Chronicles","2 chr.": "2 Chronicles","2chr": "2 Chronicles","2 chron": "2 Chronicles","2 chron.": "2 Chronicles","2chron": "2 Chronicles",
  "ezra": "Ezra",
  "neh": "Nehemiah",      "neh.": "Nehemiah",
  "esth": "Esther",       "esth.": "Esther",      "est": "Esther",
  "job": "Job",
  "ps": "Psalms",         "ps.": "Psalms",        "psa": "Psalms",     "psa.": "Psalms",    "psalm": "Psalms",
  "prov": "Proverbs",     "prov.": "Proverbs",    "pr": "Proverbs",
  "eccl": "Ecclesiastes", "eccl.": "Ecclesiastes","ecc": "Ecclesiastes",
  "song": "Song of Solomon","sos": "Song of Solomon","ss": "Song of Solomon","cant": "Song of Solomon",
  "isa": "Isaiah",        "isa.": "Isaiah",
  "jer": "Jeremiah",      "jer.": "Jeremiah",
  "lam": "Lamentations",  "lam.": "Lamentations",
  "ezek": "Ezekiel",      "ezek.": "Ezekiel",     "ez": "Ezekiel",
  "dan": "Daniel",        "dan.": "Daniel",
  "hos": "Hosea",         "hos.": "Hosea",
  "joel": "Joel",
  "amos": "Amos",
  "obad": "Obadiah",      "obad.": "Obadiah",
  "jon": "Jonah",         "jon.": "Jonah",        "jonah": "Jonah",
  "mic": "Micah",         "mic.": "Micah",
  "nah": "Nahum",         "nah.": "Nahum",
  "hab": "Habakkuk",      "hab.": "Habakkuk",
  "zeph": "Zephaniah",    "zeph.": "Zephaniah",
  "hag": "Haggai",        "hag.": "Haggai",
  "zech": "Zechariah",    "zech.": "Zechariah",
  "mal": "Malachi",       "mal.": "Malachi",
  // New Testament
  "mt": "Matthew",        "mt.": "Matthew",       "matt": "Matthew",   "matt.": "Matthew",
  "mk": "Mark",           "mk.": "Mark",          "mar": "Mark",       "mar.": "Mark",
  "lk": "Luke",           "lk.": "Luke",          "luk": "Luke",
  "jn": "John",           "jn.": "John",          "jhn": "John",
  "acts": "Acts",
  "rom": "Romans",        "rom.": "Romans",
  "1 cor": "1 Corinthians","1 cor.": "1 Corinthians","1cor": "1 Corinthians",
  "2 cor": "2 Corinthians","2 cor.": "2 Corinthians","2cor": "2 Corinthians",
  "gal": "Galatians",     "gal.": "Galatians",
  "eph": "Ephesians",     "eph.": "Ephesians",
  "phil": "Philippians",  "phil.": "Philippians",
  "col": "Colossians",    "col.": "Colossians",
  "1 thess": "1 Thessalonians","1 thess.": "1 Thessalonians","1thess": "1 Thessalonians",
  "2 thess": "2 Thessalonians","2 thess.": "2 Thessalonians","2thess": "2 Thessalonians",
  "1 tim": "1 Timothy",   "1 tim.": "1 Timothy",  "1tim": "1 Timothy",
  "2 tim": "2 Timothy",   "2 tim.": "2 Timothy",  "2tim": "2 Timothy",
  "tit": "Titus",         "tit.": "Titus",
  "phile": "Philemon",    "phile.": "Philemon",   "phm": "Philemon",   "phlm": "Philemon",
  "heb": "Hebrews",       "heb.": "Hebrews",
  "jas": "James",         "jas.": "James",
  "1 pet": "1 Peter",     "1 pet.": "1 Peter",    "1pet": "1 Peter",
  "2 pet": "2 Peter",     "2 pet.": "2 Peter",    "2pet": "2 Peter",
  "1 jn": "1 John",       "1 jn.": "1 John",      "1jn": "1 John",
  "2 jn": "2 John",       "2 jn.": "2 John",      "2jn": "2 John",
  "3 jn": "3 John",       "3 jn.": "3 John",      "3jn": "3 John",
  "jude": "Jude",
  "rev": "Revelation",    "rev.": "Revelation",
};

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
  const parts = raw.split(";").map((s) => s.trim()).filter(Boolean);
  const results: ScriptureRef[] = [];
  let currentBook = "";

  for (const part of parts) {
    // Try: optional-number + book-abbrev + chapter:verse[-end]
    // e.g. "1 Jn. 3:16-18" or "Mt. 7:7"
    const withBook = part.match(
      /^((?:\d\s+)?[A-Za-z]+\.?)\s+(\d+:\d+(?:[–\-]\d+)?(?:,\s*\d+)?)/
    );
    if (withBook) {
      const abbrev = withBook[1].toLowerCase().trim();
      const book   = BOOK_MAP[abbrev];
      if (book) {
        currentBook = book;
        const verseRef = withBook[2].trim();
        const display  = `${book} ${verseRef}`;
        results.push({ display, ref: display });
        continue;
      }
    }

    // Try: bare chapter:verse[-end] — inherit currentBook
    // e.g. "18:19-20" or "15:7"
    const bareVerse = part.match(/^(\d+:\d+(?:[–\-]\d+)?(?:,\s*\d+)?)/);
    if (bareVerse && currentBook) {
      const verseRef = bareVerse[1].replace("–", "-").trim();
      const display  = `${currentBook} ${verseRef}`;
      results.push({ display, ref: display });
      continue;
    }

    // If it has a digit:digit pattern but we couldn't classify it, skip.
  }

  return results;
}
