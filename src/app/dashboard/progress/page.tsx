"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2, Circle, Play, FileText, BookOpen, Clock,
  TrendingUp, Calendar,
} from "lucide-react";

interface LessonProgressItem {
  id: string;
  lessonId: string;
  startedAt: string | null;
  completedAt: string | null;
  timeSpentSeconds: number;
  lesson: {
    id: string;
    title: string;
    type: string;
    chapter: {
      content: {
        title: string;
        slug: string;
      };
    };
  };
}

export default function ProgressPage() {
  const [progress, setProgress] = useState<LessonProgressItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/progress/lesson");
        if (res.ok) {
          const data = await res.json();
          setProgress(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const completed = progress.filter((p) => p.completedAt);
  const totalTime = progress.reduce((acc, p) => acc + p.timeSpentSeconds, 0);
  const totalHours = Math.floor(totalTime / 3600);
  const totalMinutes = Math.floor((totalTime % 3600) / 60);

  const byMonth = completed.reduce((acc, p) => {
    const date = new Date(p.completedAt!);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-12 text-gray-400">Loading progress...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Your Progress</h1>
      <p className="text-sm text-gray-500 mb-8">
        A timeline of everything you&apos;ve accomplished.
      </p>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <span className="text-sm text-gray-500">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{completed.length}</p>
          <p className="text-xs text-gray-400">lessons finished</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Clock className="h-4 w-4 text-blue-500" />
            </div>
            <span className="text-sm text-gray-500">Time Spent</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {totalHours > 0 ? `${totalHours}h ${totalMinutes}m` : `${totalMinutes}m`}
          </p>
          <p className="text-xs text-gray-400">total learning time</p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-amber-500" />
            </div>
            <span className="text-sm text-gray-500">In Progress</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {progress.filter((p) => p.startedAt && !p.completedAt).length}
          </p>
          <p className="text-xs text-gray-400">lessons started</p>
        </div>
      </div>

      {/* Activity by Month */}
      {Object.keys(byMonth).length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 mb-8">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            Monthly Activity
          </h2>
          <div className="flex items-end gap-3 h-32">
            {Object.entries(byMonth)
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([month, count]) => {
                const max = Math.max(...Object.values(byMonth));
                const height = max > 0 ? (count / max) * 100 : 0;
                return (
                  <div key={month} className="flex flex-col items-center gap-1.5 flex-1">
                    <div className="text-xs font-semibold text-gray-600">{count}</div>
                    <div
                      className="w-full max-w-[40px] bg-emerald-500 rounded-t-md transition-all"
                      style={{ height: `${Math.max(height, 4)}%` }}
                    />
                    <div className="text-[10px] text-gray-400">
                      {new Date(month + "-01").toLocaleDateString(undefined, { month: "short" })}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {/* Timeline */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Activity</h2>
        {progress.length === 0 ? (
          <div className="text-center py-8 text-gray-400 text-sm">
            No activity yet. Start a course to see your progress here.
          </div>
        ) : (
          <div className="space-y-0">
            {progress.map((item, index) => {
              const isCompleted = !!item.completedAt;
              const date = new Date(item.completedAt || item.startedAt || item.id);

              return (
                <div key={item.id} className="relative pl-6 pb-6 last:pb-0">
                  {/* Timeline line */}
                  {index < progress.length - 1 && (
                    <div className="absolute left-[9px] top-5 bottom-0 w-px bg-gray-200" />
                  )}
                  {/* Dot */}
                  <div className={`absolute left-0 top-1 w-5 h-5 rounded-full flex items-center justify-center ${
                    isCompleted ? "bg-emerald-500" : "bg-amber-400"
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="h-3 w-3 text-white" />
                    ) : (
                      <Circle className="h-3 w-3 text-white" />
                    )}
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {item.lesson.title}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {item.lesson.chapter.content.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-400">
                          {item.lesson.type === "VIDEO" ? (
                            <Play className="h-3 w-3" />
                          ) : (
                            <FileText className="h-3 w-3" />
                          )}
                          {item.lesson.type}
                        </span>
                        {item.timeSpentSeconds > 0 && (
                          <span className="text-[10px] text-gray-400">
                            {Math.floor(item.timeSpentSeconds / 60)}m spent
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
