"use client";

import { useState, useEffect } from "react";
import { ClipboardList, Clock, CheckCircle2 } from "lucide-react";

interface Assignment {
  id: string;
  title: string;
  description: string | null;
  dueDate: string | null;
  maxPoints: number;
  submissions: { status: string; grade: { points: number } | null }[];
}

export default function HomeworkPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/homework");
        if (res.ok) {
          const data = await res.json();
          setAssignments(data);
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
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Homework</h1>
      <p className="text-sm text-gray-500 mb-8">Assignments and submissions from your cohorts.</p>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : assignments.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <ClipboardList className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No assignments yet</h3>
          <p className="text-sm text-gray-500">Assignments will appear here when your instructor creates them.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {assignments.map((a) => {
            const submitted = a.submissions.length > 0;
            const grade = submitted ? a.submissions[0].grade : null;
            return (
              <div key={a.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{a.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                      {a.dueDate && (
                        <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Due {new Date(a.dueDate).toLocaleDateString()}</span>
                      )}
                      <span>Max {a.maxPoints} pts</span>
                    </div>
                  </div>
                  {submitted ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <CheckCircle2 className="h-3 w-3" />
                      {grade ? `${grade.points}/${a.maxPoints}` : "Submitted"}
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Not submitted</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
