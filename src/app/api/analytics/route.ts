import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const [
    totalStatements,
    statementsToday,
    recentStatements,
    allStatements30d,
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
      where: { voided: false, stored: { gte: thirtyDaysAgo } },
      select: { stored: true, verb: true, userId: true },
      orderBy: { stored: "asc" },
    }),
    db.grade.groupBy({
      by: ["activityType"],
      _avg: { score: true },
      _count: { id: true },
    }),
  ]);

  // Active users last 7 days
  const activeUserIds = new Set(
    allStatements30d
      .filter((s) => s.stored >= sevenDaysAgo && s.userId)
      .map((s) => s.userId)
  );
  const activeUsersWeek = activeUserIds.size;

  // Statements by day (last 14 days)
  const statsByDay: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    statsByDay[d.toISOString().slice(0, 10)] = 0;
  }
  for (const s of allStatements30d) {
    const day = s.stored.toISOString().slice(0, 10);
    if (day in statsByDay) statsByDay[day]++;
  }
  const statementsByDay = Object.entries(statsByDay).map(([date, count]) => ({ date, count }));

  // Top verbs
  const verbCounts: Record<string, { count: number; last: string }> = {};
  for (const s of allStatements30d) {
    const verb = s.verb as { id?: string; display?: Record<string, string> };
    const verbId = verb?.id ?? "unknown";
    const label = verb?.display?.["en-US"] ?? verbId.split("/").pop() ?? verbId;
    if (!verbCounts[label]) verbCounts[label] = { count: 0, last: s.stored.toISOString() };
    verbCounts[label].count++;
    if (s.stored.toISOString() > verbCounts[label].last) {
      verbCounts[label].last = s.stored.toISOString();
    }
  }
  const topVerbs = Object.entries(verbCounts)
    .map(([verb, { count, last }]) => ({ verb, count, lastUsed: last }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  // Completion rate
  const completedCount = allStatements30d.filter((s) => {
    const verb = s.verb as { id?: string };
    return verb?.id === "http://adlnet.gov/expapi/verbs/completed" ||
           verb?.id === "http://adlnet.gov/expapi/verbs/passed";
  }).length;
  const failedCount = allStatements30d.filter((s) => {
    const verb = s.verb as { id?: string };
    return verb?.id === "http://adlnet.gov/expapi/verbs/failed";
  }).length;
  const completionRate = completedCount + failedCount > 0
    ? completedCount / (completedCount + failedCount)
    : 0;

  // Avg score from grades
  const gradedWithScore = gradeData.filter((g) => g._avg.score !== null);
  const avgScore = gradedWithScore.length > 0
    ? gradedWithScore.reduce((sum, g) => sum + (g._avg.score ?? 0), 0) / gradedWithScore.length
    : 0;

  const gradesByType = gradeData.map((g) => ({
    type: g.activityType,
    avgScore: g._avg.score ?? 0,
    count: g._count.id,
  }));

  return NextResponse.json({
    totalStatements,
    statementsToday,
    activeUsersWeek,
    completionRate,
    avgScore,
    statementsByDay,
    topVerbs,
    recentStatements,
    gradesByType,
  });
}
