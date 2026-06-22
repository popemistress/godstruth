import { db } from "@/lib/db";
import { BADGE_DEFS } from "@/lib/gamification";
import { Trophy, Flame, Award, TrendingUp } from "lucide-react";

export const metadata = { title: "Gamification Overview — Admin" };

async function getAdminStats() {
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const [totalPointsThisWeek, topLearners, allBadges, activeStreaks] = await Promise.all([
    // Total point events this week
    db.pointEvent.aggregate({
      where: { createdAt: { gte: oneWeekAgo } },
      _sum: { points: true },
      _count: true,
    }),

    // Top 5 learners by lessons completed
    db.lessonProgress.findMany({
      where: { completedAt: { not: null } },
      include: {
        lesson: { select: { type: true } },
        user: { select: { id: true, name: true, email: true } },
      },
    }),

    // Badge distribution
    db.userBadge.groupBy({
      by: ["badgeKey"],
      _count: { badgeKey: true },
      orderBy: { _count: { badgeKey: "desc" } },
    }),

    // Users with active streaks (checked in within 48h)
    db.userStreak.count({
      where: {
        lastCheckin: { gte: twoDaysAgo },
        current: { gt: 0 },
      },
    }),
  ]);

  // Process top learners
  const countable = topLearners.filter(
    (lp) => lp.lesson.type !== "SUPPLEMENT" && lp.lesson.type !== "IMAGE"
  );
  const userMap = new Map<string, { name: string | null; email: string | null; lessons: number }>();
  for (const lp of countable) {
    const existing = userMap.get(lp.userId);
    if (existing) {
      existing.lessons++;
    } else {
      userMap.set(lp.userId, { name: lp.user.name, email: lp.user.email, lessons: 1 });
    }
  }
  const topFive = Array.from(userMap.values())
    .sort((a, b) => b.lessons - a.lessons)
    .slice(0, 5);

  // Badge category distribution
  const categoryTotals: Record<string, number> = {};
  for (const row of allBadges) {
    const def = BADGE_DEFS[row.badgeKey];
    if (def) {
      categoryTotals[def.category] = (categoryTotals[def.category] ?? 0) + row._count.badgeKey;
    }
  }

  const maxCategoryCount = Math.max(...Object.values(categoryTotals), 1);

  return {
    totalPointsThisWeek: totalPointsThisWeek._sum.points ?? 0,
    totalEventsThisWeek: totalPointsThisWeek._count,
    topFive,
    categoryTotals,
    maxCategoryCount,
    allBadges,
    activeStreaks,
  };
}

export default async function AdminGamificationPage() {
  const stats = await getAdminStats();

  const categoryLabels: Record<string, string> = {
    course: "Courses",
    streak: "Streaks",
    memory: "Memory",
    cert: "Certificates",
    milestone: "Milestones",
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 space-y-10">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          Gamification Overview
        </h1>
        <p className="text-sm text-gray-500 mt-1">Platform-wide engagement stats for this week</p>
      </div>

      {/* Top stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-amber-500" />
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Points This Week</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalPointsThisWeek.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{stats.totalEventsThisWeek} events</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Award className="h-4 w-4 text-emerald-500" />
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Total Badges</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {stats.allBadges.reduce((sum, b) => sum + b._count.badgeKey, 0).toLocaleString()}
          </p>
          <p className="text-xs text-gray-400 mt-1">{stats.allBadges.length} unique types</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Flame className="h-4 w-4 text-orange-500" />
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Active Streaks</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.activeStreaks}</p>
          <p className="text-xs text-gray-400 mt-1">checked in &lt;48h</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="h-4 w-4 text-teal-500" />
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Top Learners</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.topFive.length}</p>
          <p className="text-xs text-gray-400 mt-1">shown below</p>
        </div>
      </div>

      {/* Most active learners */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Most Active Learners</h2>
          <p className="text-xs text-gray-400">By lessons completed (excludes SUPPLEMENT and IMAGE types)</p>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Lessons</th>
            </tr>
          </thead>
          <tbody>
            {stats.topFive.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-400 text-sm">
                  No lesson completions recorded yet
                </td>
              </tr>
            ) : (
              stats.topFive.map((user, idx) => (
                <tr key={idx} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-500 font-medium">#{idx + 1}</td>
                  <td className="px-6 py-4 font-medium text-gray-800">{user.name ?? "Anonymous"}</td>
                  <td className="px-6 py-4 text-gray-500">{user.email ?? "—"}</td>
                  <td className="px-6 py-4 text-right font-bold text-teal-700">{user.lessons}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Badge category distribution */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="font-semibold text-gray-800 mb-5">Badge Distribution by Category</h2>
        {Object.keys(categoryLabels).length === 0 ? (
          <p className="text-sm text-gray-400">No badges earned yet.</p>
        ) : (
          <div className="space-y-3">
            {Object.entries(categoryLabels).map(([key, label]) => {
              const count = stats.categoryTotals[key] ?? 0;
              const pct = stats.maxCategoryCount > 0 ? (count / stats.maxCategoryCount) * 100 : 0;
              return (
                <div key={key}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 font-medium">{label}</span>
                    <span className="text-gray-500">{count} earned</span>
                  </div>
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* All badges breakdown */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Individual Badge Counts</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {stats.allBadges.length === 0 ? (
            <p className="px-6 py-6 text-sm text-gray-400">No badges awarded yet.</p>
          ) : (
            stats.allBadges.map((row) => {
              const def = BADGE_DEFS[row.badgeKey];
              return (
                <div key={row.badgeKey} className="px-6 py-3 flex items-center gap-3">
                  <span className="text-lg">{def?.icon ?? "🏅"}</span>
                  <span className="flex-1 text-sm text-gray-700">{def?.name ?? row.badgeKey}</span>
                  <span className="text-sm font-semibold text-gray-500">{row._count.badgeKey}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
