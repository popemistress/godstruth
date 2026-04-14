import { db } from "@/lib/db";
import { BibleSlider } from "@/components/bibles/BibleSlider";
import { BibleBrowse } from "@/components/bibles/BibleBrowse";
import { BibleTabs } from "@/components/bibles/BibleTabs";
import type { BibleEdition } from "@prisma/client";
import { BookOpen } from "lucide-react";

export const revalidate = 3600;

/** Interleave: insert one ANCIENT bible at every 5th position */
function interleaveAncient(all: BibleEdition[]): BibleEdition[] {
  const ancient = all.filter((b) => b.translation === "ANCIENT");
  const rest    = all.filter((b) => b.translation !== "ANCIENT");
  const result: BibleEdition[] = [];
  let ai = 0;
  for (let i = 0; i < rest.length; i++) {
    result.push(rest[i]);
    if ((i + 1) % 5 === 0 && ai < ancient.length) {
      result.push(ancient[ai++]);
    }
  }
  while (ai < ancient.length) result.push(ancient[ai++]);
  return result;
}

/** Move AMP bibles to the middle of the slider so they don't lead */
function moveAmpToMiddle(all: BibleEdition[]): BibleEdition[] {
  const amp  = all.filter((b) => b.translation === "AMP");
  const rest = all.filter((b) => b.translation !== "AMP");
  const mid  = Math.floor(rest.length / 2);
  return [...rest.slice(0, mid), ...amp, ...rest.slice(mid)];
}

export default async function BiblesPage() {
  const bibles = await db.bibleEdition.findMany({
    orderBy: [{ featured: "desc" }, { translation: "asc" }, { title: "asc" }],
  });

  const sliderBibles = moveAmpToMiddle(interleaveAncient(bibles));

  return (
    <>
      {/* Hero */}
      <section className="relative bg-neutral-80 text-white py-16 px-4">
        <div className="container-page text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm rounded-full px-4 py-1.5 mb-6">
            <BookOpen className="h-4 w-4" />
            Bible Library
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            The Word of God
          </h1>

          {/* Post-it notes — hidden on small screens to avoid overlap */}
          {/* Left post-it — halfway between left edge and center text, tilted 25deg right */}
          <div className="hidden lg:block absolute top-1/2 left-[12%] pointer-events-auto" style={{ transform: "translateY(-50%) rotate(10deg)" }}>
            <div
              className="relative px-5 py-4 w-52 text-left"
              style={{
                background: "#fef08a",
                boxShadow: "2px 4px 14px rgba(0,0,0,0.4), inset 0 -3px 0 rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-sm opacity-60"
                style={{ background: "#fde047" }}
              />
              <p className="font-serif text-xs leading-relaxed text-neutral-80 italic">
                &ldquo;All scripture is given by inspiration of God, and is profitable for doctrine,
                for reproof, for correction, for instruction in righteousness.&rdquo;
              </p>
              <p className="text-[10px] text-neutral-50 mt-2 font-medium not-italic">— 2 Timothy 3:16</p>
            </div>
          </div>

          {/* Right post-it — halfway between right edge and center text, tilted 25deg right */}
          <div className="hidden lg:block absolute top-1/2 right-[12%] pointer-events-auto" style={{ transform: "translateY(-50%) rotate(-10deg)" }}>
            <div
              className="relative px-5 py-4 w-52 text-left"
              style={{
                background: "#fef08a",
                boxShadow: "2px 4px 14px rgba(0,0,0,0.4), inset 0 -3px 0 rgba(0,0,0,0.08)",
              }}
            >
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 rounded-sm opacity-60"
                style={{ background: "#fde047" }}
              />
              <p className="font-serif text-xs leading-relaxed text-neutral-80 italic">
                &ldquo;Knowing this first, that no prophecy of the scripture is of any private
                interpretation. For the prophecy came not in old time by the will of man: but holy
                men of God spake as they were moved by the Holy Ghost.&rdquo;
              </p>
              <p className="text-[10px] text-neutral-50 mt-2 font-medium not-italic">— 2 Peter 1:20–21</p>
            </div>
          </div>

          <p className="text-white/70 max-w-2xl mx-auto text-lg leading-relaxed">
            A collection of {bibles.length} Bibles — spanning translations, study editions,
            ancient text, atlases, and more. Browse by cover art, search by title, or filter by
            translation family. Every entry includes its publication history, theological purpose,
            and a canon proximity rating measuring its fidelity to the 66-book Protestant canon.
            Listen to the full audio history of how the Bible came to be, and explore the visual
            account of the text&apos;s journey through the centuries.
          </p>
        </div>
      </section>

      {/* Slider */}
      <section className="py-12 bg-neutral-05 border-b border-neutral-20">
        <div className="container-page">
          <h2 className="font-serif text-2xl font-bold text-neutral-80 mb-8">
            Browse All Editions
          </h2>
          <BibleSlider bibles={sliderBibles} />
        </div>
      </section>

      {/* Browse All */}
      <section className="py-12 border-b border-neutral-20">
        <div className="container-page">
          <BibleBrowse bibles={bibles} />
        </div>
      </section>

      {/* Tabs: History + Verse Omissions */}
      <section className="py-12">
        <div className="container-page">
          <BibleTabs />
        </div>
      </section>
    </>
  );
}
