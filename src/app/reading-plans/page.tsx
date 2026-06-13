"use client";

import { useState, useEffect } from "react";
import { CalendarDays, BookOpen, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

interface Plan {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  duration: number;
  coverImage: string | null;
  days: { dayNumber: number; passages: string[] }[];
  _count: { progress: number };
}

export default function ReadingPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reading-plans")
      .then((r) => r.json())
      .then((data) => { setPlans(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="container-page py-10 max-w-4xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Reading Plans</h1>
      <p className="text-sm text-gray-500 mb-8">Follow a structured daily reading schedule through Scripture.</p>

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading...</div>
      ) : plans.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No reading plans yet</h3>
          <p className="text-sm text-gray-500">Check back soon for curated reading schedules.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {plans.map((plan) => (
            <div key={plan.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{plan.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">{plan.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {plan.duration} days</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {plan.days?.length ?? 0} passages</span>
                  </div>
                </div>
                <Link href={`/reading-plans/${plan.slug}`} className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1 flex-shrink-0">
                  Start <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
