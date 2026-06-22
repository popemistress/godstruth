import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";
import { Trophy } from "lucide-react";

export const metadata = { title: "Community Learning Board — Gods Truth" };

interface LeaderboardEntry {
  rank: number;
  displayName: string;
  lessonsCompleted: number;
  coursesCompleted: number;
  isCurrentUser: boolean;
}

async function getLeaderboard(currentUserId?: string): Promise<{
  top20: LeaderboardEntry[];
  currentUserRank: LeaderboardEntry | null;
}> {
  const allProgress = await db.lessonProgress.findMany({
    where: { completedAt: { not: null } },
    include: {
      lesson: { select: { type: true } },
      user: { select: { id: true, name: true } },
    },
  });

  const countable = allProgress.filter(
    (lp) => lp.lesson.type !== "SUPPLEMENT" && lp.lesson.type !== "IMAGE"
  );

  const userMap = new Map<string, { name: string | null; userId: string; lessons: number }>();
  for (const lp of countable) {
    const existing = userMap.get(lp.userId);
    if (existing) {
      existing.lessons++;
    } else {
      userMap.set(lp.userId, { name: lp.user.name, userId: lp.userId, lessons: 1 });
    }
  }

  const sorted = Array.from(userMap.values()).sort((a, b) => b.lessons - a.lessons);

  const courses = await db.content.findMany({
    where: { type: "COURSE", published: true },
    select: {
      chapters: {
        select: {
          lessons: {
            where: { published: true },
            select: { id: true, type: true },
          },
        },
      },
    },
  });

  function getCoursesCompleted(userId: string): number {
    const userLessonIds = new Set(
      countable.filter((lp) => lp.userId === userId).map((lp) => lp.lessonId)
    );
    let count = 0;
    for (const course of courses) {
      const allLessons = course.chapters.flatMap((ch) => ch.lessons).filter(
        (l) => l.type !== "SUPPLEMENT" && l.type !== "IMAGE"
      );
      if (allLessons.length > 0 && allLessons.every((l) => userLessonIds.has(l.id))) {
        count++;
      }
    }
    return count;
  }

  const top20: LeaderboardEntry[] = sorted.slice(0, 20).map((entry, idx) => ({
    rank: idx + 1,
    displayName: (entry.name ?? "Anonymous").split(" ")[0],
    lessonsCompleted: entry.lessons,
    coursesCompleted: getCoursesCompleted(entry.userId),
    isCurrentUser: currentUserId === entry.userId,
  }));

  let currentUserRank: LeaderboardEntry | null = null;
  if (currentUserId) {
    const idx = sorted.findIndex((e) => e.userId === currentUserId);
    if (idx >= 20) {
      const entry = sorted[idx];
      currentUserRank = {
        rank: idx + 1,
        displayName: (entry.name ?? "Anonymous").split(" ")[0],
        lessonsCompleted: entry.lessons,
        coursesCompleted: getCoursesCompleted(currentUserId),
        isCurrentUser: true,
      };
    }
  }

  return { top20, currentUserRank };
}

export default async function LeaderboardPage() {
  const currentUserId = await getCurrentUserId();
  const { top20, currentUserRank } = await getLeaderboard(currentUserId ?? undefined);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-amber-100 rounded-full mb-4">
          <Trophy className="h-7 w-7 text-amber-600" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">Community Learning Board</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Celebrating faithful study — not comparing hearts
        </p>
      </div>

      {top20.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
          <Trophy className="h-14 w-14 text-gray-200 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-700">No learners yet</h3>
          <p className="text-sm text-gray-400 mt-1">Complete lessons to appear on the board!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-12">
                  Rank
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Name
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Lessons
                </th>
                <th className="px-5 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Courses
                </th>
              </tr>
            </thead>
            <tbody>
              {top20.map((entry) => (
                <tr
                  key={entry.rank}
                  className={`border-b border-gray-100 last:border-0 transition-colors ${
                    entry.isCurrentUser ? "bg-amber-50" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-5 py-4">
                    {entry.rank <= 3 ? (
                      <span className="text-base">
                        {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                      </span>
                    ) : (
                      <span className="text-gray-400 font-medium">#{entry.rank}</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    <span className={`font-medium ${entry.isCurrentUser ? "text-amber-700" : "text-gray-800"}`}>
                      {entry.displayName}
                      {entry.isCurrentUser && (
                        <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          You
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-gray-700">
                    {entry.lessonsCompleted}
                  </td>
                  <td className="px-5 py-4 text-right font-semibold text-gray-700">
                    {entry.coursesCompleted}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {currentUserRank && (
            <>
              <div className="px-5 py-2 text-center text-xs text-gray-400 border-t border-gray-100">
                — Your rank —
              </div>
              <table className="w-full text-sm">
                <tbody>
                  <tr className="bg-amber-50 border-t border-amber-200">
                    <td className="px-5 py-4 w-12">
                      <span className="text-gray-500 font-medium">#{currentUserRank.rank}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="font-medium text-amber-700">
                        {currentUserRank.displayName}
                        <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          You
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-gray-700">
                      {currentUserRank.lessonsCompleted}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-gray-700">
                      {currentUserRank.coursesCompleted}
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      )}

      <p className="text-center text-xs text-gray-400 mt-6 max-w-sm mx-auto">
        Rankings reflect lessons studied, not spiritual status. Every learner&apos;s journey is personal.
      </p>
    </div>
  );
}
