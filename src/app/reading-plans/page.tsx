"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  BookOpen,
  ArrowRight,
  Clock,
  Users,
  Flame,
} from "lucide-react";
import Link from "next/link";

interface Plan {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  duration: number;
  coverImage: string | null;
  featured: boolean;
  days: { dayNumber: number; passages: string[] }[];
  _count: { progress: number };
}

const THEME_COLORS = [
  "from-emerald-500 to-teal-600",
  "from-blue-500 to-indigo-600",
  "from-amber-500 to-orange-600",
  "from-purple-500 to-violet-600",
  "from-rose-500 to-pink-600",
];

const PLAN_ICONS = [BookOpen, Flame, CalendarDays, Clock, Users];

export default function ReadingPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reading-plans")
      .then((r) => r.json())
      .then((data) => {
        setPlans(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const featured = plans.find((p) => p.featured) ?? plans[0];
  const rest = plans.filter((p) => p.id !== featured?.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/60 to-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-700 to-teal-700 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full mb-4">
            <CalendarDays className="h-3.5 w-3.5" />
            Structured Bible Reading
          </div>
          <h1 className="font-serif text-4xl font-bold mb-3">Reading Plans</h1>
          <p className="text-emerald-100 text-lg max-w-xl mx-auto">
            Follow a guided daily schedule through Scripture. Build the habit
            of daily Bible reading one passage at a time.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {loading ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-48 bg-gray-100 rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <BookOpen className="h-14 w-14 text-gray-200 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-800 text-lg mb-2">
              Reading plans coming soon
            </h3>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Check back soon for curated daily reading schedules through
              Scripture.
            </p>
          </div>
        ) : (
          <>
            {/* Featured plan */}
            {featured && (
              <div className="mb-8">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3">
                  Featured Plan
                </p>
                <div className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100">
                  <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="font-serif text-2xl font-bold mb-1">
                          {featured.title}
                        </h2>
                        <p className="text-emerald-100 text-sm max-w-md">
                          {featured.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 bg-white/20 rounded-xl p-3">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays className="h-4 w-4 text-emerald-500" />
                        {featured.duration} days
                      </span>
                      <span className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4 text-emerald-500" />
                        {featured.days?.length ?? 0} passages
                      </span>
                      {featured._count?.progress > 0 && (
                        <span className="flex items-center gap-1.5">
                          <Users className="h-4 w-4 text-emerald-500" />
                          {featured._count.progress} reading
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/reading-plans/${featured.slug}`}
                      className="flex items-center gap-1.5 bg-emerald-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-emerald-700 transition-colors"
                    >
                      Start Plan <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* All plans grid */}
            {rest.length > 0 && (
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
                  All Plans
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {rest.map((plan, idx) => {
                    const gradient = THEME_COLORS[idx % THEME_COLORS.length];
                    const Icon = PLAN_ICONS[(idx + 1) % PLAN_ICONS.length];
                    return (
                      <div
                        key={plan.id}
                        className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className={`bg-gradient-to-r ${gradient} h-2`} />
                        <div className="p-5">
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center`}
                            >
                              <Icon className="h-5 w-5 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 leading-tight mb-1">
                                {plan.title}
                              </h3>
                              <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                                {plan.description}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-3 text-xs text-gray-400">
                              <span className="flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" />{" "}
                                {plan.duration} days
                              </span>
                            </div>
                            <Link
                              href={`/reading-plans/${plan.slug}`}
                              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                            >
                              Start <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100 p-6 text-center">
          <BookOpen className="h-10 w-10 text-emerald-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-800 mb-1">
            Read the Bible in the Workspace
          </h3>
          <p className="text-sm text-gray-500 mb-4">
            Use our full-featured Bible Study Workspace to read, highlight,
            and take notes.
          </p>
          <Link
            href="/bible/workspace"
            className="inline-flex items-center gap-1.5 bg-emerald-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-colors"
          >
            Open Workspace <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
