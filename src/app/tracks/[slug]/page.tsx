"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  GraduationCap, BookOpen, CalendarDays, CheckCircle2, Circle,
  Play, FileText, HelpCircle, Heart, ChevronRight, ArrowLeft,
  Lock, Unlock, Clock, Sparkles,
} from "lucide-react";

interface TrackDayData {
  id: string;
  dayNumber: number;
  title: string;
  lessonId: string | null;
  scriptureReading: string | null;
  prayerPrompt: string | null;
  hasQuiz: boolean;
  hasMentorCheckin: boolean;
  lesson: { id: string; title: string; type: string; duration: number | null } | null;
}

interface TrackData {
  id: string;
  title: string;
  slug: string;
  description: string;
  course: { id: string; title: string; slug: string; thumbnail: string | null };
  days: TrackDayData[];
  enrollments: { userId: string; currentDay: number; completedAt: string | null }[];
}

export default function TrackDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [track, setTrack] = useState<TrackData | null>(null);
  const [enrollment, setEnrollment] = useState<{ currentDay: number; completedAt: string | null } | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/tracks/${slug}`);
        if (!res.ok) throw new Error("Failed to load track");
        const data: TrackData = await res.json();
        setTrack(data);

        const enrollRes = await fetch(`/api/tracks/${slug}/enroll`, { method: "POST" });
        if (enrollRes.ok) {
          const enr = await enrollRes.json();
          setEnrollment(enr);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  async function advanceDay() {
    if (!track || !enrollment) return;
    const nextDay = Math.min(enrollment.currentDay + 1, track.days.length);
    setEnrolling(true);
    try {
      const res = await fetch(`/api/tracks/${slug}/progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentDay: nextDay, markComplete: nextDay >= track.days.length }),
      });
      if (res.ok) {
        const updated = await res.json();
        setEnrollment(updated);
      }
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading track...</div>
      </div>
    );
  }

  if (!track) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Track not found.</p>
      </div>
    );
  }

  const currentDay = enrollment?.currentDay ?? 1;
  const isComplete = enrollment?.completedAt != null;
  const progressPercent = Math.round(((currentDay - 1) / Math.max(track.days.length, 1)) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container-page py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/tracks" className="hover:text-emerald-600 transition-colors">Tracks</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-700 truncate max-w-xs">{track.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-page py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <CalendarDays className="h-3.5 w-3.5" />
              {track.days.length}-Day Guided Track
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {track.title}
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-6">
              {track.description}
            </p>

            {/* Progress bar */}
            {enrollment && (
              <div className="max-w-md">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Your Progress</span>
                  <span className="text-emerald-600 font-semibold">{progressPercent}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-1.5">
                  Day {currentDay} of {track.days.length}
                  {isComplete && " — Track completed!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container-page py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Day schedule */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-serif text-xl font-bold text-gray-900 mb-2">Daily Schedule</h2>
            {track.days.map((day) => {
              const isPast = day.dayNumber < currentDay;
              const isCurrent = day.dayNumber === currentDay && !isComplete;
              const isLocked = day.dayNumber > currentDay && !isComplete;

              return (
                <div
                  key={day.id}
                  className={`rounded-xl border p-5 transition-all ${
                    isCurrent
                      ? "border-emerald-300 bg-emerald-50/40 shadow-sm"
                      : isPast
                      ? "border-gray-200 bg-white opacity-75"
                      : "border-gray-100 bg-white"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      isPast
                        ? "bg-emerald-100 text-emerald-600"
                        : isCurrent
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}>
                      {isPast ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : isCurrent ? (
                        <Sparkles className="h-5 w-5" />
                      ) : (
                        <Lock className="h-4 w-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                          Day {day.dayNumber}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                            Today
                          </span>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{day.title}</h3>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {day.lesson && (
                          <Link
                            href={`/courses/${track.course.slug}/lessons/${day.lesson.id}`}
                            className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                              isLocked
                                ? "bg-gray-100 text-gray-400"
                                : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                            }`}
                            onClick={(e) => isLocked && e.preventDefault()}
                          >
                            {day.lesson.type === "VIDEO" ? (
                              <Play className="h-3 w-3" />
                            ) : (
                              <FileText className="h-3 w-3" />
                            )}
                            {day.lesson.title}
                          </Link>
                        )}
                        {day.scriptureReading && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-amber-50 text-amber-700">
                            <BookOpen className="h-3 w-3" />
                            {day.scriptureReading}
                          </span>
                        )}
                        {day.prayerPrompt && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-rose-50 text-rose-700">
                            <Heart className="h-3 w-3" />
                            Prayer
                          </span>
                        )}
                        {day.hasQuiz && (
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">
                            <HelpCircle className="h-3 w-3" />
                            Quiz
                          </span>
                        )}
                      </div>

                      {isCurrent && day.prayerPrompt && (
                        <div className="mt-3 p-4 rounded-lg bg-white border border-emerald-100">
                          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700 mb-1.5">
                            Prayer Prompt
                          </p>
                          <p className="text-sm text-gray-600 italic leading-relaxed">
                            {day.prayerPrompt}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Complete day CTA */}
            {!isComplete && enrollment && (
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-500">
                  Complete today&apos;s activities to unlock the next day.
                </p>
                <button
                  onClick={advanceDay}
                  disabled={enrolling}
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-semibold text-sm rounded-xl px-5 py-2.5 transition-colors shadow-sm"
                >
                  {enrolling ? "Saving..." : `Complete Day ${currentDay}`}
                  <CheckCircle2 className="h-4 w-4" />
                </button>
              </div>
            )}

            {isComplete && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                <CheckCircle2 className="h-10 w-10 text-emerald-500 mx-auto mb-3" />
                <h3 className="font-semibold text-emerald-900 mb-1">Track Completed!</h3>
                <p className="text-sm text-emerald-700 mb-4">
                  You have finished &ldquo;{track.title}&rdquo;. View your certificate in your dashboard.
                </p>
                <Link
                  href="/dashboard/tracks"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-700 hover:text-emerald-800 underline underline-offset-2"
                >
                  Go to Dashboard <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sticky top-24 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">About This Track</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2.5 text-gray-600">
                  <GraduationCap className="h-4 w-4 text-gray-400" />
                  <span>{track.course.title}</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <CalendarDays className="h-4 w-4 text-gray-400" />
                  <span>{track.days.length} days</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Daily commitment: ~15-30 min</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <Heart className="h-4 w-4 text-gray-400" />
                  <span>Includes Scripture &amp; Prayer</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-600">
                  <HelpCircle className="h-4 w-4 text-gray-400" />
                  <span>Quizzes for retention</span>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100">
                <Link
                  href={`/courses/${track.course.slug}`}
                  className="flex items-center justify-center gap-2 w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold text-sm rounded-xl px-4 py-2.5 transition-colors"
                >
                  <BookOpen className="h-4 w-4" />
                  View Full Course
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
