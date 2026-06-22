"use client";

import { useState, useMemo } from "react";
import type { Grade } from "@prisma/client";

interface GradeWithUser extends Grade {
  userName: string;
  userEmail: string;
}

function fmtScore(score: number | null): string {
  if (score === null) return "—";
  return `${Math.round(score * 100)}%`;
}

export function AdminGradebookClient({ grades }: { grades: GradeWithUser[] }) {
  const [filterUser, setFilterUser] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterFrom, setFilterFrom] = useState("");
  const [filterTo, setFilterTo] = useState("");

  const activityTypes = useMemo(() => ["all", ...new Set(grades.map((g) => g.activityType))], [grades]);

  const filtered = useMemo(() => {
    return grades.filter((g) => {
      if (filterUser && !g.userEmail.includes(filterUser) && !(g.userName ?? "").toLowerCase().includes(filterUser.toLowerCase())) return false;
      if (filterType !== "all" && g.activityType !== filterType) return false;
      if (filterFrom && new Date(g.gradedAt) < new Date(filterFrom)) return false;
      if (filterTo && new Date(g.gradedAt) > new Date(filterTo)) return false;
      return true;
    });
  }, [grades, filterUser, filterType, filterFrom, filterTo]);

  function downloadCsv() {
    const headers = ["User", "Email", "Activity", "Type", "Score", "Raw", "Max", "Passed", "Completed", "Time (s)", "Source", "Date"];
    const rows = filtered.map((g) => [
      g.userName,
      g.userEmail,
      g.activityName ?? g.activityId,
      g.activityType,
      fmtScore(g.score),
      g.rawScore ?? "",
      g.maxScore ?? "",
      g.passed === null ? "" : g.passed ? "Yes" : "No",
      g.completed ? "Yes" : "No",
      g.timeSpent ?? "",
      g.source,
      new Date(g.gradedAt).toISOString().slice(0, 10),
    ].map(String).map((v) => `"${v.replace(/"/g, '""')}"`).join(","));

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gradebook-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gradebook</h1>
          <p className="text-sm text-gray-500 mt-1">{grades.length} grade records</p>
        </div>
        <button
          onClick={downloadCsv}
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Search user..."
          value={filterUser}
          onChange={(e) => setFilterUser(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm flex-1 min-w-40"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
        >
          {activityTypes.map((t) => (
            <option key={t} value={t}>{t === "all" ? "All Types" : t}</option>
          ))}
        </select>
        <input
          type="date"
          value={filterFrom}
          onChange={(e) => setFilterFrom(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          title="From date"
        />
        <input
          type="date"
          value={filterTo}
          onChange={(e) => setFilterTo(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm"
          title="To date"
        />
        <span className="self-center text-xs text-gray-500">{filtered.length} results</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              {["User", "Activity", "Type", "Score", "Passed", "Completed", "Date"].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.slice(0, 200).map((g) => (
              <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-800 text-xs">{g.userName}</div>
                  <div className="text-gray-400 text-xs truncate max-w-[140px]">{g.userEmail}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-gray-700 text-xs truncate max-w-[160px]">{g.activityName ?? g.activityId}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{g.activityType}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    {g.score !== null && (
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${(g.score ?? 0) >= 0.7 ? "bg-emerald-500" : (g.score ?? 0) >= 0.5 ? "bg-amber-500" : "bg-red-400"}`}
                          style={{ width: `${Math.round((g.score ?? 0) * 100)}%` }}
                        />
                      </div>
                    )}
                    <span className="text-xs text-gray-600">{fmtScore(g.score)}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {g.passed === true && <span className="text-xs text-emerald-700 font-semibold">Yes</span>}
                  {g.passed === false && <span className="text-xs text-red-600 font-semibold">No</span>}
                  {g.passed === null && <span className="text-xs text-gray-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  {g.completed
                    ? <span className="text-xs text-emerald-600 font-semibold">Yes</span>
                    : <span className="text-xs text-gray-400">No</span>}
                </td>
                <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">
                  {new Date(g.gradedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">No grades match your filters</div>
        )}
      </div>
    </div>
  );
}
