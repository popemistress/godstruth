"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap, BookOpen, Clock, ChevronRight,
  Maximize2, X, ZoomIn, ZoomOut,
} from "lucide-react";
import type { Content, CourseChapter } from "@prisma/client";

interface CourseCardProps {
  course: Content & {
    chapters: (CourseChapter & { lessons: { id: string }[] })[];
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const chapterCount = course.chapters.length;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [scale, setScale] = useState(1);

  // Lock scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = "hidden";
      setScale(1);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [lightboxOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setLightboxOpen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ── Card ── */}
      <div className="group rounded-xl overflow-hidden border border-gray-200 bg-white hover:border-emerald-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-sm flex flex-col">

        {/* Thumbnail — click to expand fullscreen */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden flex-shrink-0">
          {course.thumbnail ? (
            <>
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Expand overlay — only visible on hover, stops propagation so it doesn't follow the card link */}
              <button
                onClick={() => setLightboxOpen(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/30 transition-colors duration-200 cursor-zoom-in"
                aria-label="View image fullscreen"
              >
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 bg-white/90 text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                  <Maximize2 className="h-3.5 w-3.5" /> View Fullscreen
                </span>
              </button>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-100">
              <GraduationCap className="h-12 w-12 text-emerald-200" />
            </div>
          )}

          {course.premium && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md pointer-events-none">
              Premium
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5 flex flex-col flex-1">
          {/* Badge row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <GraduationCap className="h-3 w-3" />
              Course
            </span>
            {chapterCount > 0 && (
              <span className="text-[10px] text-gray-400 font-medium">
                {chapterCount} parts · {totalLessons} lessons
              </span>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 mb-2">
            {course.title}
          </h3>

          {course.description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
              {course.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {course.duration ? (
                <>
                  <Clock className="h-3 w-3" />
                  <span>
                    {Math.floor(course.duration / 3600) > 0
                      ? `${Math.floor(course.duration / 3600)}h ${Math.floor((course.duration % 3600) / 60)}m`
                      : `${Math.floor(course.duration / 60)}m`}
                  </span>
                </>
              ) : (
                <>
                  <BookOpen className="h-3 w-3" />
                  <span>Self-paced</span>
                </>
              )}
            </div>
            <Link
              href={`/courses/${course.slug}`}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:gap-2 transition-all hover:text-emerald-700"
            >
              Begin <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Fullscreen Lightbox ── */}
      <AnimatePresence>
        {lightboxOpen && course.thumbnail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] bg-black/95 flex flex-col"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Controls bar */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between px-6 py-4 flex-shrink-0"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-white/70 text-sm font-medium truncate max-w-xs">{course.title}</p>
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
                  onClick={() => setLightboxOpen(false)}
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
              onClick={() => setLightboxOpen(false)}
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
                  src={course.thumbnail}
                  alt={course.title}
                  width={1920}
                  height={1080}
                  className="rounded-lg shadow-2xl max-w-none"
                  style={{ width: "min(1920px, 100vw - 32px)", height: "auto" }}
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
              Click outside to close · Esc to exit
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
