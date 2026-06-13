import Link from "next/link";
import { db } from "@/lib/db";
import { GraduationCap, CalendarDays, BookOpen, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Learning Tracks | Gods Truth",
  description: "Guided learning paths with daily lessons, Scripture reading, quizzes, and prayer prompts.",
};

export default async function TracksPage() {
  const tracks = await db.courseTrack.findMany({
    where: { published: true },
    include: {
      course: { select: { title: true, slug: true, thumbnail: true } },
      days: { select: { id: true } },
      enrollments: { select: { id: true } },
    },
    orderBy: { order: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-page py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <GraduationCap className="h-3.5 w-3.5" />
              Guided Learning
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Learning Tracks
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Structured paths that guide you day by day through Scripture, lessons, quizzes,
              and prayer. Not just content — a journey.
            </p>
          </div>
        </div>
      </section>

      {/* Track Cards */}
      <section className="container-page py-10">
        {tracks.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No tracks published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tracks.map((track) => (
              <Link
                key={track.id}
                href={`/tracks/${track.slug}`}
                className="group block rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-start gap-4">
                  {track.course.thumbnail ? (
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100">
                      <img
                        src={track.course.thumbnail}
                        alt={track.course.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-20 h-20 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="h-8 w-8 text-emerald-300" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-gray-900 text-lg leading-snug mb-1 group-hover:text-emerald-700 transition-colors">
                      {track.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-3">
                      {track.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarDays className="h-3.5 w-3.5" />
                        {track.days.length} days
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3.5 w-3.5" />
                        {track.course.title}
                      </span>
                      {track.enrollments.length > 0 && (
                        <span>{track.enrollments.length} enrolled</span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-300 group-hover:text-emerald-500 transition-colors flex-shrink-0 mt-1" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
