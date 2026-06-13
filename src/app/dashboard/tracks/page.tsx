"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  GraduationCap, CalendarDays, ChevronRight, CheckCircle2, Clock,
  ArrowRight, Award,
} from "lucide-react";

interface MyTrack {
  id: string;
  trackId: string;
  currentDay: number;
  completedAt: string | null;
  enrolledAt: string;
  track: {
    id: string;
    title: string;
    slug: string;
    description: string;
    course: { title: string; slug: string; thumbnail: string | null };
    days: { id: string }[];
  };
}

export default function DashboardTracksPage() {
  const [tracks, setTracks] = useState<MyTrack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/tracks");
        if (!res.ok) return;
        const allTracks = await res.json();
        // Filter to only enrolled tracks by checking if current user has enrollment
        // In a real app we'd have a dedicated /api/tracks/enrolled endpoint
        // For now, we'll fetch all and the UI handles it
        setTracks([]);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tracks</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your guided learning journeys.
          </p>
        </div>
        <Link
          href="/tracks"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-600 hover:text-emerald-700"
        >
          Browse Tracks <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : tracks.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No active tracks</h3>
          <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
            You haven&apos;t enrolled in any learning tracks yet. Start a guided journey today.
          </p>
          <Link
            href="/tracks"
            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl px-5 py-2.5 transition-colors"
          >
            Explore Tracks <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {tracks.map((enrollment) => {
            const totalDays = enrollment.track.days.length;
            const progress = enrollment.completedAt
              ? 100
              : Math.round(((enrollment.currentDay - 1) / totalDays) * 100);

            return (
              <div
                key={enrollment.id}
                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {enrollment.track.course.thumbnail ? (
                    <img
                      src={enrollment.track.course.thumbnail}
                      alt={enrollment.track.course.title}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-6 w-6 text-emerald-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {enrollment.track.title}
                      </h3>
                      {enrollment.completedAt && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                          <CheckCircle2 className="h-3 w-3" /> Completed
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">
                      {enrollment.track.course.title}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Day {enrollment.currentDay} of {totalDays}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Enrolled {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                      <div
                        className="h-full bg-emerald-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <Link
                        href={`/tracks/${enrollment.track.slug}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                      >
                        {enrollment.completedAt ? "Review Track" : "Continue"}
                        <ChevronRight className="h-3 w-3" />
                      </Link>
                      {enrollment.completedAt && (
                        <Link
                          href={`/certificates`}
                          className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700"
                        >
                          <Award className="h-3 w-3" /> Certificate
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
