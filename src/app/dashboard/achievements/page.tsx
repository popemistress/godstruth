import { redirect } from "next/navigation";
import Link from "next/link";
import { getCurrentUserId } from "@/lib/clerk-user";
import { getUserGamificationSummary } from "@/lib/gamification";
import { AchievementsClient } from "./AchievementsClient";
import { Trophy, Flame, Award, BookOpen, Users } from "lucide-react";

export const metadata = { title: "Achievements — Gods Truth" };

export default async function AchievementsPage() {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/sign-in");

  const summary = await getUserGamificationSummary(userId);
  const readingStreak = summary.streaks.find((s) => s.type === "READING");

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="bg-gradient-to-br from-amber-600 to-yellow-500 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="h-7 w-7" />
          <h1 className="text-3xl font-serif font-bold">Your Achievements</h1>
        </div>
        <p className="text-amber-100 text-base italic">
          &ldquo;Well done, good and faithful servant&rdquo; — Matthew 25:23
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-amber-600">{summary.points.toLocaleString()}</div>
          <div className="text-xs text-gray-500 mt-1 font-medium flex items-center justify-center gap-1">
            <Award className="h-3.5 w-3.5" /> Total Points
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-emerald-600">{summary.badges.length}</div>
          <div className="text-xs text-gray-500 mt-1 font-medium flex items-center justify-center gap-1">
            <Trophy className="h-3.5 w-3.5" /> Badges Earned
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-orange-500">{readingStreak?.longest ?? 0}</div>
          <div className="text-xs text-gray-500 mt-1 font-medium flex items-center justify-center gap-1">
            <Flame className="h-3.5 w-3.5" /> Longest Streak
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 text-center shadow-sm">
          <div className="text-3xl font-bold text-teal-600">{summary.completedLessons}</div>
          <div className="text-xs text-gray-500 mt-1 font-medium flex items-center justify-center gap-1">
            <BookOpen className="h-3.5 w-3.5" /> Lessons Done
          </div>
        </div>
      </div>

      {/* Client-side interactive section */}
      <AchievementsClient
        badges={summary.badges}
        streaks={summary.streaks}
        recentPoints={summary.recentPoints}
        completedCourses={summary.completedCourses}
      />

      {/* Leaderboard link */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-gray-800">Community Learning Board</h3>
          <p className="text-sm text-gray-500">See how your study compares to other learners — lessons only, never spiritual status.</p>
        </div>
        <Link
          href="/dashboard/achievements/leaderboard"
          className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors whitespace-nowrap"
        >
          <Users className="h-4 w-4" /> View Board
        </Link>
      </div>
    </div>
  );
}
