"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, BookMarked } from "lucide-react";

const SLIDES = Array.from({ length: 12 }, (_, i) =>
  `/slideshow/Journey_of_the_Text_page_${String(i + 1).padStart(4, "0")}-ezremove.png`
);

export function SlideshowModal() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const total = SLIDES.length;

  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total]);

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, prev, next]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* Trigger link */}
      <div className="flex justify-center">
        <button
          onClick={() => { setIndex(0); setOpen(true); }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-80 border-b-2 border-neutral-80 pb-0.5 hover:text-brand hover:border-brand transition-colors"
        >
          <BookMarked className="h-4 w-4" />
          Visual Historical Account
        </button>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          {/* Panel — 75vw × 85vh */}
          <div
            className="relative bg-neutral-95 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ width: "75vw", maxWidth: "1200px", height: "85vh" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-80 shrink-0">
              <span className="text-sm font-semibold text-neutral-20 tracking-wide">
                Journey of the Text &nbsp;·&nbsp; {index + 1} / {total}
              </span>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Close"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>

            {/* Image */}
            <div className="relative flex-1 overflow-hidden">
              <Image
                key={index}
                src={SLIDES[index]}
                alt={`Journey of the Text – slide ${index + 1}`}
                fill
                className="object-contain"
                sizes="75vw"
                priority
              />
            </div>

            {/* Nav bar */}
            <div className="flex items-center justify-center gap-6 px-5 py-4 border-t border-neutral-80 shrink-0">
              <button
                onClick={prev}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="h-5 w-5 text-white" />
              </button>

              {/* Dot strip */}
              <div className="flex items-center gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Slide ${i + 1}`}
                    className={`rounded-full transition-all ${
                      i === index
                        ? "h-2.5 w-2.5 bg-white"
                        : "h-1.5 w-1.5 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
