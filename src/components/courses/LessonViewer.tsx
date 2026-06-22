"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  BookOpen, Play, Headphones, ChevronRight, ChevronLeft,
  ArrowLeft, Clock, Video, CheckCircle, BookMarked, ClipboardCheck,
} from "lucide-react";
import type { CourseChapter, CourseLesson } from "@prisma/client";
import { LessonContent } from "./LessonContent";
import { ChartFullscreen } from "./ChartFullscreen";
import { cn } from "@/lib/utils";
import { ScriptureTooltipProvider } from "./ScriptureTooltip";
import { trackLessonComplete } from "@/lib/xapi-client";

interface NavLesson {
  id: string;
  title: string;
  type: string;
  order: number;
  chapterTitle: string;
}

interface LessonViewerProps {
  lesson: CourseLesson;
  chapter: CourseChapter;
  courseSlug: string;
  prevLesson: NavLesson | null;
  nextLesson: NavLesson | null;
  totalLessons: number;
  lessonIndex: number;
  contentHtml: string;
  currentPage: number;
  totalPages: number;
}

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${m % 60}m` : `${m} min read`;
}

function toEmbedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}?rel=0`;
  const vimeo = url.match(/vimeo\.com\/(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return url;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

function markLessonComplete(lessonId: string) {
  try {
    const stored = JSON.parse(localStorage.getItem("completed-lessons") ?? "[]") as string[];
    if (!stored.includes(lessonId)) {
      localStorage.setItem("completed-lessons", JSON.stringify([...stored, lessonId]));
    }
    window.dispatchEvent(new Event("lesson-completed"));
  } catch { /* ignore */ }
}

export function LessonViewer({
  lesson, chapter, courseSlug, prevLesson, nextLesson, totalLessons, lessonIndex, contentHtml,
  currentPage, totalPages,
}: LessonViewerProps) {
  const router = useRouter();
  const contentPanelRef = useRef<HTMLDivElement>(null);
  const hasVideo = !!lesson.videoUrl;
  const hasPodcast = !!lesson.audioUrl;
  const hasReading = !!lesson.content;
  const isImage = lesson.type === "IMAGE";
  const isSupplement = lesson.type === "SUPPLEMENT";
  const isQuiz = lesson.type === "QUIZ";
  const isPaginated = totalPages > 1;
  const progressPct = Math.round(((lessonIndex + 1) / totalLessons) * 100);

  function goToPage(page: number) {
    const clamped = Math.max(1, Math.min(page, totalPages));
    const query = clamped <= 1 ? "" : `?page=${clamped}`;
    const url = `/courses/${courseSlug}/lessons/${lesson.id}${query}`;
    router.replace(url, { scroll: false });
    // Keep the reader at the top of the reading panel when the page changes.
    setTimeout(() => {
      contentPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  // ── Scroll-based completion ──────────────────────────────────────────────
  const sentinelRef = useRef<HTMLDivElement>(null);
  const triggeredRef = useRef(false);
  const [isCompleted, setIsCompleted] = useState(false);

  // Restore completion state from localStorage on mount / lesson change
  useEffect(() => {
    triggeredRef.current = false;
    setIsCompleted(false);
    try {
      const stored = JSON.parse(localStorage.getItem("completed-lessons") ?? "[]") as string[];
      if (stored.includes(lesson.id)) {
        setIsCompleted(true);
        triggeredRef.current = true;
      }
    } catch { /* ignore */ }
  }, [lesson.id]);

  // Scroll sentinel marks the lesson complete only when the user reaches the
  // bottom of the final page. Intermediate pages do not mark completion.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || currentPage !== totalPages) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          setIsCompleted(true);
          markLessonComplete(lesson.id);
          void trackLessonComplete({
            lessonId: lesson.id,
            lessonTitle: lesson.title,
            courseId: courseSlug,
            courseTitle: "",
            userId: "anonymous",
            userEmail: "",
            userName: "",
          });
          // Award gamification points
          fetch("/api/gamification/award", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "points", pointType: "LESSON_COMPLETE", label: `Completed: ${lesson.title}` }),
          }).catch(() => {});
          // Update reading streak
          fetch("/api/gamification/checkin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ type: "READING" }),
          }).catch(() => {});
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson.id, currentPage, totalPages]);

  return (
    <div className="container-page py-10 max-w-4xl mx-auto">
      <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-8">

        {/* ── Progress bar ── */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
            <span>{chapter.title}</span>
            <span>{lessonIndex + 1} / {totalLessons} sections</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            />
          </div>
        </motion.div>

        {/* ── Lesson header image ── */}
        {!isImage && (lesson.coverUrl ? (
          <motion.div variants={fadeUp} className="-mx-2 sm:-mx-0">
            <div className="relative w-full aspect-[16/5] rounded-2xl overflow-hidden shadow-lg border-4 border-amber-400">
              <Image
                src={lesson.coverUrl}
                alt={lesson.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
          </motion.div>
        ) : (
          <motion.div variants={fadeUp}>
            <div className={`relative w-full rounded-2xl overflow-hidden shadow-sm border-4 ${isSupplement ? "border-violet-300" : isQuiz ? "border-amber-300" : "border-emerald-300"}`}>
              <div className={`h-28 sm:h-36 ${isSupplement ? "bg-gradient-to-br from-violet-800 via-purple-700 to-violet-900" : isQuiz ? "bg-gradient-to-br from-amber-800 via-orange-700 to-amber-900" : "bg-gradient-to-br from-emerald-800 via-teal-700 to-emerald-900"} flex items-center justify-center px-8`}>
                <div className="text-center">
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.25em] mb-2">{chapter.title}</p>
                  <h2 className="text-white font-serif font-bold text-xl sm:text-2xl leading-snug max-w-xl mx-auto drop-shadow-sm">
                    {lesson.title.replace(/^(Lesson|Supplement)\s+[\w-]+\s*[—\-–]\s*/i, "")}
                  </h2>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* ── Lesson header ── */}
        <motion.div variants={fadeUp} className="space-y-3">
          {/* Type badges */}
          <div className="flex flex-wrap items-center gap-2">
            {isImage && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <CheckCircle className="h-3 w-3" /> Overview Chart
              </span>
            )}
            {hasVideo && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                <Video className="h-3 w-3" /> Video
              </span>
            )}
            {hasPodcast && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-purple-700 bg-purple-50 border border-purple-200 px-3 py-1 rounded-full">
                <Headphones className="h-3 w-3" /> Podcast
              </span>
            )}
            {isQuiz && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full">
                <ClipboardCheck className="h-3 w-3" /> Assessment
              </span>
            )}
            {hasReading && !isImage && !isSupplement && !isQuiz && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <BookOpen className="h-3 w-3" /> Reading
              </span>
            )}
            {isSupplement && (
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-violet-700 bg-violet-50 border border-violet-200 px-3 py-1 rounded-full">
                <BookMarked className="h-3 w-3" /> Supplement
              </span>
            )}
          </div>

          {lesson.duration && (
            <p className="flex items-center gap-1.5 text-sm text-gray-400">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(lesson.duration)}
            </p>
          )}
        </motion.div>

        {/* ══ IMAGE — fullscreen chart ══ */}
        {isImage && lesson.mediaUrl && (
          <motion.div variants={fadeUp} className="space-y-4">
            {lesson.content && (
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5">
                <p className="text-sm text-amber-800 leading-relaxed font-medium">{lesson.content}</p>
              </div>
            )}
            <ChartFullscreen
              src={lesson.mediaUrl}
              alt="God's Universal Plan for Creation — Complete Overview Chart"
              variant="lesson"
            />
            <p className="text-center text-xs text-gray-400">Click the chart to view fullscreen · Zoom and pan to explore</p>
            {nextLesson && (
              <motion.div variants={fadeUp} className="flex justify-center pt-4">
                <Link
                  href={`/courses/${courseSlug}/lessons/${nextLesson.id}`}
                  className="group inline-flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-7 py-3.5 rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5"
                >
                  <BookOpen className="h-4 w-4" />
                  Begin with Lesson 1
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ══ VIDEO ══ */}
        {hasVideo && (
          <motion.div variants={fadeUp}>
            <SectionDivider icon={<Video className="h-4 w-4" />} label="Watch" color="blue" />
            <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-lg aspect-video bg-black">
              <iframe
                src={toEmbedUrl(lesson.videoUrl!)}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={lesson.title}
              />
            </div>
          </motion.div>
        )}

        {/* ══ PODCAST ══ */}
        {hasPodcast && (
          <motion.div variants={fadeUp}>
            <SectionDivider icon={<Headphones className="h-4 w-4" />} label="Listen" color="purple" />
            <div className="rounded-2xl border border-purple-100 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-5 bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
                <div className="w-12 h-12 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center flex-shrink-0">
                  <Headphones className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{lesson.title}</p>
                  <p className="text-xs text-purple-500 mt-0.5">Gods Truth Podcast</p>
                </div>
              </div>
              <div className="px-6 py-5">
                <audio controls className="w-full" preload="metadata" src={lesson.audioUrl!}>
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══ READING ══ */}
        {hasReading && !isImage && !isSupplement && (
          <motion.div variants={fadeUp} ref={contentPanelRef}>
            {(hasVideo || hasPodcast) && (
              <SectionDivider icon={<BookOpen className="h-4 w-4" />} label="Read" color="emerald" />
            )}
            {isPaginated && (
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Page {currentPage} of {totalPages}
                </span>
                <PageDots current={currentPage} total={totalPages} onSelect={goToPage} />
              </div>
            )}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-600" />
              <div className="px-6 sm:px-10 md:px-14 py-10 md:py-14">
                <ScriptureTooltipProvider>
                  <LessonContent contentHtml={contentHtml} lessonId={lesson.id} />
                </ScriptureTooltipProvider>
              </div>
            </div>
            {isPaginated && (
              <PageControls
                current={currentPage}
                total={totalPages}
                onChange={goToPage}
              />
            )}
          </motion.div>
        )}

        {/* ══ SUPPLEMENT ══ */}
        {isSupplement && hasReading && (
          <motion.div variants={fadeUp} className="space-y-5" ref={contentPanelRef}>
            {/* Supplement intro card */}
            <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50/40 p-5 flex gap-4 items-start shadow-sm">
              <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-violet-100 border border-violet-200 flex items-center justify-center">
                <BookMarked className="h-5 w-5 text-violet-700" />
              </div>
              <div>
                <p className="text-sm font-semibold text-violet-900">Personal Application</p>
                <p className="text-[13px] text-violet-700 mt-0.5 leading-relaxed">
                  This supplement is a heart-to-heart companion to the preceding two lessons — addressing your immediate personal needs and practical application of the truths studied.
                </p>
              </div>
            </div>
            {isPaginated && (
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-violet-400 uppercase tracking-wider">
                  Page {currentPage} of {totalPages}
                </span>
                <PageDots current={currentPage} total={totalPages} onSelect={goToPage} />
              </div>
            )}
            {/* Content panel */}
            <div className="rounded-2xl border border-violet-100 bg-white shadow-sm overflow-hidden">
              <div className="h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-violet-600" />
              <div className="px-6 sm:px-10 md:px-14 py-10 md:py-14">
                <ScriptureTooltipProvider>
                  <LessonContent contentHtml={contentHtml} lessonId={lesson.id} />
                </ScriptureTooltipProvider>
              </div>
            </div>
            {isPaginated && (
              <PageControls current={currentPage} total={totalPages} onChange={goToPage} />
            )}
          </motion.div>
        )}

        {/* Empty state */}
        {!isImage && !isSupplement && !hasVideo && !hasPodcast && !hasReading && (
          <motion.div variants={fadeUp} className="rounded-2xl border-2 border-dashed border-gray-200 p-16 text-center">
            <BookOpen className="h-10 w-10 text-gray-200 mx-auto mb-4" />
            <p className="text-gray-400 text-sm font-medium">Lesson content coming soon</p>
            <p className="text-gray-300 text-xs mt-1">We&apos;re publishing lessons progressively</p>
          </motion.div>
        )}

        {/* ── Explore Bibles ── */}
        {courseSlug === "gods-universal-plan-for-creation" && (lesson.title === "Lesson 2 — The Holy Scriptures" || lesson.title === "Lesson 3 — How to Interpret the Bible") && (
          <motion.div variants={fadeUp} className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-100 border border-amber-200 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-amber-700" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-amber-900">Want to learn more about the Bible?</p>
                <p className="text-[13px] text-amber-700 mt-0.5 leading-relaxed">
                  Go in depth and increase your understanding on our Bibles page.
                </p>
              </div>
              <Link
                href="/bibles"
                className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-sm shadow-amber-300"
              >
                Explore Bibles <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* ── Scroll sentinel ── */}
        <div ref={sentinelRef} aria-hidden />

        {/* ── Bottom navigation ── */}
        <motion.div variants={fadeUp} className="pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
          <div>
            {prevLesson ? (
              <Link href={`/courses/${courseSlug}/lessons/${prevLesson.id}`} className="group flex items-center gap-3 text-sm">
                <div className="flex-shrink-0 w-10 h-10 rounded-full border-2 border-gray-200 group-hover:border-emerald-400 group-hover:bg-emerald-50 flex items-center justify-center transition-all">
                  <ChevronLeft className="h-4 w-4 text-gray-400 group-hover:text-emerald-600" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">Previous</p>
                  <p className="text-gray-700 font-medium text-sm leading-tight max-w-[220px] truncate group-hover:text-emerald-700 transition-colors">{prevLesson.title}</p>
                </div>
              </Link>
            ) : (
              <Link href={`/courses/${courseSlug}`} className="group flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-700 transition-colors">
                <ArrowLeft className="h-4 w-4" />
                <span className="font-medium">Back to Course</span>
              </Link>
            )}
          </div>

          <div>
            {nextLesson ? (
              <Link href={`/courses/${courseSlug}/lessons/${nextLesson.id}`} className="group flex items-center gap-3 text-sm text-right">
                <div className="hidden sm:block">
                  <p className="text-[11px] text-gray-400 uppercase tracking-wider">Up Next</p>
                  <p className="text-gray-700 font-medium text-sm leading-tight max-w-[220px] truncate group-hover:text-emerald-700 transition-colors">{nextLesson.title}</p>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 group-hover:bg-emerald-700 flex items-center justify-center transition-colors shadow-md shadow-emerald-500/30">
                  <ChevronRight className="h-4 w-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            ) : (
              <Link href={`/courses/${courseSlug}`}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-md shadow-emerald-500/25">
                Course Complete <ChevronRight className="h-4 w-4" />
              </Link>
            )}
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}

function PageDots({ current, total, onSelect }: { current: number; total: number; onSelect: (page: number) => void }) {
  return (
    <div className="flex items-center gap-1.5" aria-label="Page navigation">
      {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onSelect(page)}
          aria-label={`Go to page ${page}`}
          aria-current={page === current ? "page" : undefined}
          className={cn(
            "w-2 h-2 rounded-full transition-colors duration-200",
            page === current
              ? "bg-emerald-600"
              : "bg-gray-200 hover:bg-emerald-300"
          )}
        />
      ))}
    </div>
  );
}

function PageControls({ current, total, onChange }: { current: number; total: number; onChange: (page: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-3 mt-6">
      <button
        type="button"
        onClick={() => onChange(current - 1)}
        disabled={current <= 1}
        className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border transition-colors disabled:opacity-40 disabled:cursor-not-allowed text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50"
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </button>

      <span className="text-xs text-gray-400 font-medium">
        Page {current} of {total}
      </span>

      <button
        type="button"
        onClick={() => onChange(current + 1)}
        disabled={current >= total}
        className="inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-xl border transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function SectionDivider({
  icon, label, color,
}: {
  icon: React.ReactNode;
  label: string;
  color: "blue" | "purple" | "emerald";
}) {
  const colors = {
    blue: "text-blue-700 bg-blue-50 border-blue-200",
    purple: "text-purple-700 bg-purple-50 border-purple-200",
    emerald: "text-emerald-700 bg-emerald-50 border-emerald-200",
  };
  const line = {
    blue: "from-blue-200",
    purple: "from-purple-200",
    emerald: "from-emerald-200",
  };
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border flex-shrink-0 ${colors[color]}`}>
        {icon} {label}
      </span>
      <div className={`flex-1 h-px bg-gradient-to-r ${line[color]} to-transparent`} />
    </div>
  );
}
