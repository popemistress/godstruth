"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Play, FileText, HelpCircle, ClipboardList, CheckCircle2, Circle, ImageIcon, BookMarked } from "lucide-react";
import { cn } from "@/lib/utils";
import type { CourseChapter, CourseLesson } from "@prisma/client";

/** Strip leading "Lesson N — " or "Supplement N — " prefixes for display. */
function stripLeadingLabel(title: string): string {
  return title
    .replace(/^Lesson\s+\d+\s*[—\-–]\s*/i, "")
    .replace(/^Supplement\s+\d+\s*[—\-–]\s*/i, "");
}

type LessonType = "VIDEO" | "READING" | "QUIZ" | "ASSIGNMENT" | "IMAGE" | "SUPPLEMENT";

const LESSON_ICONS: Record<LessonType, React.ComponentType<{ className?: string }>> = {
  VIDEO: Play,
  READING: FileText,
  QUIZ: HelpCircle,
  ASSIGNMENT: ClipboardList,
  IMAGE: ImageIcon,
  SUPPLEMENT: BookMarked,
};

const LESSON_LABELS: Record<LessonType, string> = {
  VIDEO: "Video",
  READING: "Reading",
  QUIZ: "Quiz",
  ASSIGNMENT: "Assignment",
  IMAGE: "Overview Chart",
  SUPPLEMENT: "Supplement",
};

function formatDur(seconds: number) {
  const m = Math.floor(seconds / 60);
  if (m >= 60) return `${Math.floor(m / 60)}h ${m % 60}m`;
  return `${m} min`;
}

interface ChapterWithLessons extends CourseChapter {
  lessons: CourseLesson[];
}

interface ChapterListProps {
  chapters: ChapterWithLessons[];
  courseSlug: string;
  completedLessonIds?: string[];
}

export function ChapterList({ chapters, courseSlug, completedLessonIds = [] }: ChapterListProps) {
  const [openChapters, setOpenChapters] = useState<Set<string>>(new Set());

  // Merge server-side completions with any stored in localStorage
  const [localCompleted, setLocalCompleted] = useState<string[]>([]);
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("completed-lessons") ?? "[]") as string[];
      setLocalCompleted(stored);
    } catch { /* ignore */ }

    const handler = () => {
      try {
        const stored = JSON.parse(localStorage.getItem("completed-lessons") ?? "[]") as string[];
        setLocalCompleted(stored);
      } catch { /* ignore */ }
    };
    window.addEventListener("lesson-completed", handler);
    return () => window.removeEventListener("lesson-completed", handler);
  }, []);

  const allCompleted = new Set([...completedLessonIds, ...localCompleted]);

  function toggle(id: string) {
    setOpenChapters((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="space-y-2" id="content">
      {chapters.map((chapter, idx) => {
        const isOpen = openChapters.has(chapter.id);
        const completedCount = chapter.lessons.filter((l) =>
          allCompleted.has(l.id)
        ).length;
        const allDone = completedCount === chapter.lessons.length && chapter.lessons.length > 0;

        return (
          <div
            key={chapter.id}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
          >
            {/* Chapter header */}
            <button
              onClick={() => toggle(chapter.id)}
              className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-gray-50 transition-colors"
            >
              {/* Number badge */}
              <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center justify-center border border-emerald-200">
                {String(idx + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-gray-900 leading-tight">{chapter.title}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  {chapter.lessons.filter(l => l.type !== "SUPPLEMENT" && l.type !== "IMAGE").length} lessons
                  {" · "}
                  {chapter.lessons.filter(l => l.type === "SUPPLEMENT").length} supplements
                  {completedCount > 0 && ` · ${completedCount}/${chapter.lessons.length} done`}
                </p>
              </div>

              {allDone && (
                <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
              )}

              <ChevronDown
                className={cn(
                  "h-4 w-4 text-gray-400 flex-shrink-0 transition-transform duration-200",
                  isOpen && "rotate-180"
                )}
              />
            </button>

            {/* Lessons */}
            {isOpen && chapter.lessons.length > 0 && (
              <div className="border-t border-gray-100">
                {chapter.lessons.map((lesson, lessonIdx) => {
                  const LessonIcon = LESSON_ICONS[lesson.type as LessonType] ?? Play;
                  const isComplete = allCompleted.has(lesson.id);
                  const label = LESSON_LABELS[lesson.type as LessonType] ?? lesson.type;
                  const isOverviewImage = lesson.type === "IMAGE";
                  const isSupplement = lesson.type === "SUPPLEMENT";

                  return (
                    <Link
                      key={lesson.id}
                      href={`/courses/${courseSlug}/lessons/${lesson.id}`}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 transition-colors border-b border-gray-50 last:border-0 group",
                        isOverviewImage  ? "bg-amber-50 hover:bg-amber-100" :
                        isSupplement     ? "bg-violet-50/50 hover:bg-violet-100/60" :
                        "hover:bg-gray-50"
                      )}
                    >
                      {/* Completion circle */}
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Circle className={cn(
                          "h-4 w-4 flex-shrink-0",
                          isSupplement ? "text-violet-300 group-hover:text-violet-400" : "text-gray-300 group-hover:text-gray-400"
                        )} />
                      )}

                      {/* Type icon */}
                      <span className={cn(
                        "flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center",
                        isOverviewImage ? "bg-amber-200" :
                        isSupplement    ? "bg-violet-200" :
                        "bg-gray-100 group-hover:bg-emerald-50"
                      )}>
                        <LessonIcon className={cn(
                          "h-3 w-3",
                          isOverviewImage ? "text-amber-700" :
                          isSupplement    ? "text-violet-700" :
                          "text-gray-500 group-hover:text-emerald-600"
                        )} />
                      </span>

                      <div className="flex-1 min-w-0">
                        <p className={cn(
                          "text-sm leading-tight truncate transition-colors",
                          isComplete      ? "text-gray-400 line-through" :
                          isOverviewImage ? "text-amber-800 font-medium" :
                          isSupplement    ? "text-violet-800 font-medium group-hover:text-violet-900" :
                          "text-gray-700 group-hover:text-emerald-700"
                        )}>
                          {stripLeadingLabel(lesson.title)}
                        </p>
                        <p className={cn(
                          "text-[10px] mt-0.5",
                          isOverviewImage ? "text-amber-600" :
                          isSupplement    ? "text-violet-500" :
                          "text-gray-400"
                        )}>{label}</p>
                      </div>

                      {lesson.duration && (
                        <span className="text-[10px] text-gray-400 flex-shrink-0">
                          {formatDur(lesson.duration)}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
