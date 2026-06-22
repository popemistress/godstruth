import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { Grade } from "@prisma/client";

function fmtScore(score: number | null): string {
  if (score === null) return "—";
  return `${Math.round(score * 100)}%`;
}

function fmtTime(seconds: number | null): string {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  if (m < 60) return `${m}m`;
  return `${Math.floor(m / 60)}h ${m % 60}m`;
}

function ScoreBar({ score }: { score: number | null }) {
  if (score === null) return <span className="text-gray-400 text-xs">No score</span>;
  const pct = Math.round(score * 100);
  const color = pct >= 70 ? "bg-emerald-500" : pct >= 50 ? "bg-amber-500" : "bg-red-400";
  return (
    <div className="flex items-center gap-2">
      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium text-gray-700">{pct}%</span>
    </div>
  );
}

export default async function GradebookPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/dashboard/gradebook");

  const grades = await db.grade.findMany({
    where: { userId: session.user.id },
    orderBy: { gradedAt: "desc" },
  });

  const totalCompleted = grades.filter((g) => g.completed).length;
  const graded = grades.filter((g) => g.score !== null);
  const avgScore = graded.length > 0 ? graded.reduce((sum, g) => sum + (g.score ?? 0), 0) / graded.length : null;
  const totalPassed = grades.filter((g) => g.passed === true).length;
  const totalTime = grades.reduce((sum, g) => sum + (g.timeSpent ?? 0), 0);

  const byType = ["lesson", "quiz", "course", "scorm", "lti"].reduce<Record<string, Grade[]>>((acc, type) => {
    const items = grades.filter((g) => g.activityType === type);
    if (items.length > 0) acc[type] = items;
    return acc;
  }, {});

  const typeLabels: Record<string, string> = {
    lesson: "Lessons",
    quiz: "Quizzes",
    course: "Courses",
    scorm: "SCORM",
    lti: "LTI Activities",
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Gradebook</h1>
        <p className="text-sm text-gray-500 mt-1">Your learning progress and scores</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Completed", value: totalCompleted },
          { label: "Avg Score", value: avgScore !== null ? `${Math.round(avgScore * 100)}%` : "—" },
          { label: "Passed", value: totalPassed },
          { label: "Time Spent", value: fmtTime(totalTime) },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center shadow-sm">
            <div className="text-2xl font-bold text-gray-900">{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-1">{kpi.label}</div>
          </div>
        ))}
      </div>

      {grades.length === 0 && (
        <div className="bg-white border border-dashed border-gray-200 rounded-xl p-12 text-center">
          <p className="text-gray-400 font-medium">No grades yet</p>
          <p className="text-gray-300 text-sm mt-1">Complete lessons and quizzes to see your grades here</p>
        </div>
      )}

      {/* Grouped by type */}
      {Object.entries(byType).map(([type, items]) => (
        <div key={type}>
          <h2 className="font-semibold text-gray-700 mb-3">{typeLabels[type] ?? type}</h2>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Activity</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((g) => (
                  <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-800 truncate max-w-xs">{g.activityName ?? g.activityId}</div>
                      <div className="text-xs text-gray-400">{g.source}</div>
                    </td>
                    <td className="px-4 py-3">
                      <ScoreBar score={g.score} />
                    </td>
                    <td className="px-4 py-3">
                      {g.passed === true && (
                        <span className="inline-flex items-center text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">Passed</span>
                      )}
                      {g.passed === false && (
                        <span className="inline-flex items-center text-xs font-semibold text-red-600 bg-red-50 px-2 py-0.5 rounded-full">Failed</span>
                      )}
                      {g.passed === null && g.completed && (
                        <span className="inline-flex items-center text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">Done</span>
                      )}
                      {g.passed === null && !g.completed && (
                        <span className="inline-flex items-center text-xs text-gray-400">In progress</span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-gray-500 text-xs">{fmtTime(g.timeSpent)}</td>
                    <td className="px-4 py-3 hidden md:table-cell text-gray-400 text-xs">
                      {new Date(g.gradedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
