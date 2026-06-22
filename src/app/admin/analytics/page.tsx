import { getCurrentDbUser } from "@/lib/clerk-user";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

interface StatsByDay { date: string; count: number }

export default async function AdminAnalyticsPage() {
  const user = await getCurrentDbUser();
  if (!user || user.role !== "ADMIN") redirect("/");

  const now = new Date();
  const fourteenDaysAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const [
    totalStatements,
    statementsToday,
    recentStatements,
    allRecent,
    gradeData,
  ] = await Promise.all([
    db.xApiStatement.count({ where: { voided: false } }),
    db.xApiStatement.count({ where: { voided: false, stored: { gte: todayStart } } }),
    db.xApiStatement.findMany({
      where: { voided: false },
      orderBy: { stored: "desc" },
      take: 20,
    }),
    db.xApiStatement.findMany({
      where: { voided: false, stored: { gte: fourteenDaysAgo } },
      select: { stored: true, verb: true, userId: true, actor: true, object: true },
    }),
    db.grade.groupBy({
      by: ["activityType"],
      _avg: { score: true },
      _count: { id: true },
    }),
  ]);

  // Statements by day
  const statsByDay: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    statsByDay[d.toISOString().slice(0, 10)] = 0;
  }
  for (const s of allRecent) {
    const day = s.stored.toISOString().slice(0, 10);
    if (day in statsByDay) statsByDay[day]++;
  }
  const statementsByDay: StatsByDay[] = Object.entries(statsByDay).map(([date, count]) => ({ date, count }));
  const maxDayCount = Math.max(...statementsByDay.map((d) => d.count), 1);

  // Active users last 7 days
  const activeUserIds = new Set(
    allRecent.filter((s) => s.stored >= sevenDaysAgo && s.userId).map((s) => s.userId)
  );

  // Verb counts
  const verbCounts: Record<string, number> = {};
  for (const s of allRecent) {
    const verb = s.verb as { display?: Record<string, string>; id?: string };
    const label = verb?.display?.["en-US"] ?? (verb?.id ?? "unknown").split("/").pop() ?? "unknown";
    verbCounts[label] = (verbCounts[label] ?? 0) + 1;
  }
  const topVerbs = Object.entries(verbCounts).sort((a, b) => b[1] - a[1]).slice(0, 8);

  // Completion rate
  const completed = allRecent.filter((s) => {
    const v = s.verb as { id?: string };
    return v?.id === "http://adlnet.gov/expapi/verbs/completed" || v?.id === "http://adlnet.gov/expapi/verbs/passed";
  }).length;
  const failed = allRecent.filter((s) => {
    const v = s.verb as { id?: string };
    return v?.id === "http://adlnet.gov/expapi/verbs/failed";
  }).length;
  const completionRate = completed + failed > 0 ? completed / (completed + failed) : 0;

  // Avg score
  const gradedWithScore = gradeData.filter((g) => g._avg.score !== null);
  const avgScore = gradedWithScore.length > 0
    ? gradedWithScore.reduce((s, g) => s + (g._avg.score ?? 0), 0) / gradedWithScore.length
    : 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Learning Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">xAPI statement volume, completion rates, and grade distribution</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Statements", value: totalStatements.toLocaleString() },
          { label: "Active Learners (7d)", value: activeUserIds.size },
          { label: "Completion Rate", value: `${Math.round(completionRate * 100)}%` },
          { label: "Avg Score", value: avgScore > 0 ? `${Math.round(avgScore * 100)}%` : "—" },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm text-center">
            <div className="text-3xl font-bold text-gray-900">{kpi.value}</div>
            <div className="text-xs text-gray-500 mt-1 font-medium">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Statement volume chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-1">Statement Volume (14 days)</h2>
          <p className="text-xs text-gray-400 mb-4">Today: {statementsToday} statements</p>
          <div className="flex items-end gap-1 h-32">
            {statementsByDay.map(({ date, count }) => {
              const pct = maxDayCount > 0 ? (count / maxDayCount) * 100 : 0;
              const isToday = date === now.toISOString().slice(0, 10);
              return (
                <div key={date} className="flex flex-col items-center gap-1 flex-1 min-w-0" title={`${date}: ${count}`}>
                  <div className="w-full flex items-end justify-center" style={{ height: "96px" }}>
                    <div
                      className={`w-full rounded-t-sm transition-all ${isToday ? "bg-emerald-500" : "bg-emerald-200"}`}
                      style={{ height: `${Math.max(pct, count > 0 ? 2 : 0)}%` }}
                    />
                  </div>
                  <span className="text-[8px] text-gray-400 rotate-45 origin-left whitespace-nowrap">{date.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top verbs */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Top Verbs (14d)</h2>
          <div className="space-y-2">
            {topVerbs.length === 0 && <p className="text-xs text-gray-400">No data yet</p>}
            {topVerbs.map(([verb, count]) => (
              <div key={verb} className="flex items-center justify-between text-sm">
                <span className="text-gray-700 capitalize truncate">{verb}</span>
                <span className="text-xs font-bold text-gray-900 ml-2 shrink-0">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grade summary */}
      {gradeData.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="font-semibold text-gray-800 mb-4">Grade Summary by Type</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-gray-200">
                <tr>
                  <th className="text-left pb-2 text-xs font-semibold text-gray-500 uppercase">Type</th>
                  <th className="text-left pb-2 text-xs font-semibold text-gray-500 uppercase">Count</th>
                  <th className="text-left pb-2 text-xs font-semibold text-gray-500 uppercase">Avg Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {gradeData.map((g) => (
                  <tr key={g.activityType}>
                    <td className="py-2 capitalize text-gray-700">{g.activityType}</td>
                    <td className="py-2 text-gray-700">{g._count.id}</td>
                    <td className="py-2">
                      {g._avg.score !== null ? (
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-emerald-500 rounded-full"
                              style={{ width: `${Math.round((g._avg.score ?? 0) * 100)}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-700">{Math.round((g._avg.score ?? 0) * 100)}%</span>
                        </div>
                      ) : <span className="text-gray-400">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent statements feed */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">Recent Statements</h2>
        {recentStatements.length === 0 ? (
          <p className="text-xs text-gray-400">No statements yet. Complete a lesson to see xAPI data here.</p>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {recentStatements.map((s) => {
              const actor = s.actor as { name?: string; mbox?: string };
              const verb = s.verb as { display?: Record<string, string>; id?: string };
              const obj = s.object as { definition?: { name?: Record<string, string> }; id?: string };
              const actorName = actor?.name ?? actor?.mbox?.replace("mailto:", "") ?? "Anonymous";
              const verbLabel = verb?.display?.["en-US"] ?? (verb?.id ?? "").split("/").pop() ?? "acted";
              const objLabel = obj?.definition?.name?.["en-US"] ?? (obj?.id ?? "").split("/").pop() ?? "something";
              return (
                <div key={s.id} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-700 truncate">
                    <span className="font-medium">{actorName}</span>{" "}
                    <span className="text-emerald-600">{verbLabel}</span>{" "}
                    <span className="text-gray-500 italic truncate max-w-[200px] inline-block align-bottom">{objLabel}</span>
                  </span>
                  <span className="text-gray-400 shrink-0 ml-2">{new Date(s.stored).toLocaleString()}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
