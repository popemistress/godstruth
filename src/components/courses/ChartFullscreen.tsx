"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

interface ChartFullscreenProps {
  src: string;
  alt: string;
  /** If true renders just the trigger image inline (for lesson page). If false renders a preview card (for course page). */
  variant?: "lesson" | "course";
}

export function ChartFullscreen({ src, alt, variant = "lesson" }: ChartFullscreenProps) {
  const [open, setOpen] = useState(false);
  const [scale, setScale] = useState(1);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setScale(1);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Keyboard close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── Trigger ── */}
      {variant === "lesson" ? (
        <button
          onClick={() => setOpen(true)}
          className="group relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-md bg-white cursor-zoom-in"
          aria-label="Open chart fullscreen"
        >
          <Image
            src={src}
            alt={alt}
            width={4144}
            height={1024}
            className="w-full h-auto"
            priority
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg">
              <Maximize2 className="h-3.5 w-3.5" /> View Fullscreen
            </span>
          </div>
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="group block w-full rounded-2xl overflow-hidden border border-amber-200 bg-amber-50 hover:border-amber-400 transition-all duration-300 shadow-sm hover:shadow-md"
          aria-label="Open plan chart fullscreen"
        >
          <div className="relative h-40 overflow-hidden">
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/70 via-amber-900/20 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div className="text-left">
                <p className="text-white font-bold text-sm drop-shadow">View Before You Begin</p>
                <p className="text-amber-200 text-xs mt-0.5">God&apos;s Universal Plan — Complete Overview Chart</p>
              </div>
              <span className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shadow">
                <Maximize2 className="h-3 w-3" /> Open Chart
              </span>
            </div>
          </div>
        </button>
      )}

      {/* ── Fullscreen Lightbox ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
            onClick={() => setOpen(false)}
          >
            {/* Controls bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/70 text-sm font-medium truncate max-w-xs">{alt}</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setScale((s) => Math.max(0.5, s - 0.25))}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="h-4 w-4" />
                </button>
                <span className="text-white/50 text-xs w-12 text-center">{Math.round(scale * 100)}%</span>
                <button
                  onClick={() => setScale((s) => Math.min(3, s + 0.25))}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="w-9 h-9 rounded-lg bg-white/10 hover:bg-red-500/80 text-white flex items-center justify-center transition-colors ml-2"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            {/* Scrollable image area */}
            <div
              className="flex-1 overflow-auto flex items-start justify-center p-4"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
                onClick={(e) => e.stopPropagation()}
                className="cursor-default"
              >
                <Image
                  src={src}
                  alt={alt}
                  width={4144}
                  height={1024}
                  className="rounded-lg shadow-2xl max-w-none"
                  style={{ width: "min(4144px, 100vw - 32px)", height: "auto" }}
                  priority
                />
              </motion.div>
            </div>

            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 0.4 }}
              transition={{ delay: 0.2 }}
              className="text-center text-white text-xs pb-4 flex-shrink-0"
            >
              Click outside to close · Scroll to zoom · Esc to exit
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
