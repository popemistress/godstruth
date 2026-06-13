"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users, BookOpen, CalendarDays, ClipboardList, TrendingUp,
  GraduationCap, ArrowRight,
} from "lucide-react";

interface DashboardStats {
  totalStudents: number;
  activeCohorts: number;
  upcomingSessions: number;
  pendingSubmissions: number;
}

export default function InstructorDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(false);
    }
    load();
  }, []);

  const statCards = [
    { label: "Total Students", value: stats?.totalStudents ?? 0, icon: Users, color: "bg-blue-50 text-blue-600" },
    { label: "Active Cohorts", value: stats?.activeCohorts ?? 0, icon: GraduationCap, color: "bg-emerald-50 text-emerald-600" },
    { label: "Upcoming Sessions", value: stats?.upcomingSessions ?? 0, icon: CalendarDays, color: "bg-violet-50 text-violet-600" },
    { label: "Pending Submissions", value: stats?.pendingSubmissions ?? 0, icon: ClipboardList, color: "bg-amber-50 text-amber-600" },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Instructor Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your courses, students, and sessions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center mb-3`}>
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gray-400" />
            Quick Actions
          </h2>
          <div className="space-y-2">
            {[
              { label: "Create a new cohort", href: "#", desc: "Set up a new class with start/end dates" },
              { label: "Schedule live session", href: "#", desc: "Add a live teaching session to a cohort" },
              { label: "Create homework assignment", href: "#", desc: "Assign work with due dates and grading" },
              { label: "Review submissions", href: "#", desc: "Grade and provide feedback on student work" },
            ].map((action) => (
              <Link
                key={action.label}
                href={action.href}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900 group-hover:text-emerald-700">{action.label}</p>
                  <p className="text-xs text-gray-500">{action.desc}</p>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-300 group-hover:text-emerald-500" />
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-gray-400" />
            Student Engagement
          </h2>
          <div className="text-center py-8 text-gray-400 text-sm">
            <p>Analytics coming soon.</p>
            <p className="text-xs mt-1">Track completion rates, time spent, and quiz scores.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
