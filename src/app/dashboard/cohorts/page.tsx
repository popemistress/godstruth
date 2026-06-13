"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Users, CalendarDays, ArrowRight, GraduationCap } from "lucide-react";

interface CohortItem {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  startDate: string;
  maxStudents: number;
  course: { title: string; slug: string; thumbnail: string | null };
  instructor: { name: string | null; image: string | null };
  _count: { enrollments: number };
}

export default function CohortsPage() {
  const [cohorts, setCohorts] = useState<CohortItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/cohorts");
        if (res.ok) {
          const data = await res.json();
          setCohorts(data);
        }
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
          <h1 className="text-2xl font-bold text-gray-900">Cohorts</h1>
          <p className="text-sm text-gray-500 mt-1">Join structured group learning with start dates and live sessions.</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : cohorts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No cohorts available</h3>
          <p className="text-sm text-gray-500">Check back soon for upcoming group classes.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {cohorts.map((cohort) => (
            <div key={cohort.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start gap-4">
                {cohort.course.thumbnail ? (
                  <img src={cohort.course.thumbnail} alt={cohort.course.title} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                ) : (
                  <div className="w-16 h-16 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="h-6 w-6 text-emerald-300" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900">{cohort.title}</h3>
                  <p className="text-xs text-gray-500 mb-2">{cohort.course.title}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {new Date(cohort.startDate).toLocaleDateString()}</span>
                    <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {cohort._count.enrollments}/{cohort.maxStudents}</span>
                  </div>
                </div>
                <Link href="#" className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 flex-shrink-0">
                  Join <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
