"use client";

import { useState } from "react";
import { BADGE_DEFS } from "@/lib/gamification";
import { Flame, Star, Trophy, BookOpen } from "lucide-react";

interface Streak {
  type: string;
  current: number;
  longest: number;
  totalDays: number;
  lastCheckin: Date | null;
}

interface RecentPoint {
  type: string;
  points: number;
  label: string | null;
  createdAt: Date;
}

interface AchievementsClientProps {
  badges: string[];
  streaks: Streak[];
  recentPoints: RecentPoint[];
  completedCourses: number;
}

const CATEGORIES = [
  { key: "all",       label: "All" },
  { key: "course",    label: "Courses" },
  { key: "streak",    label: "Streaks" },
  { key: "memory",    label: "Memory" },
  { key: "cert",      label: "Certificates" },
  { key: "milestone", label: "Milestones" },
] as const;

type CategoryKey = typeof CATEGORIES[number]["key"];

function formatRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - new Date(date).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return mins <= 1 ? "Just now" : `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return hrs === 1 ? "1 hour ago" : `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return new Date(date).toLocaleDateString();
}

export function AchievementsClient({ badges, streaks, recentPoints, completedCourses }: AchievementsClientProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");
  const [checkinState, setCheckinState] = useState<"idle" | "loading" | "done">("idle");
  const [checkinMessage, setCheckinMessage] = useState("");
  const [localStreaks, setLocalStreaks] = useState<Streak[]>(streaks);

  const earnedSet = new Set(badges);

  const readingStreak = localStreaks.find((s) => s.type === "READING");
  const isCheckedInToday = (() => {
    if (!readingStreak?.lastCheckin) return false;
    const last = new Date(readingStreak.lastCheckin);
    const now = new Date();
    return last.toDateString() === now.toDateString();
  })();

  async function handleCheckin() {
    setCheckinState("loading");
    try {
      const res = await fetch("/api/gamification/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "READING" }),
      });
      const data = await res.json() as { streak: { current: number; longest: number; totalDays: number }; badgesAwarded: string[] };
      setCheckinState("done");
      setCheckinMessage(`Reading streak updated! Day ${data.streak.current} 🔥`);
      setLocalStreaks((prev) => {
        const next = [...prev];
        const idx = next.findIndex((s) => s.type === "READING");
        if (idx >= 0) {
          next[idx] = { ...next[idx], ...data.streak, lastCheckin: new Date() };
        } else {
          next.push({ type: "READING", ...data.streak, lastCheckin: new Date() });
        }
        return next;
      });
    } catch {
      setCheckinState("idle");
    }
  }

  const certProgress = (() => {
    if (completedCourses === 0) return { current: "None", next: "Bronze", needed: 1, progress: 0 };
    if (completedCourses < 3) return { current: "Bronze", next: "Silver", needed: 3 - completedCourses, progress: (completedCourses / 3) * 100 };
    if (completedCourses < 5) return { current: "Silver", next: "Gold", needed: 5 - completedCourses, progress: ((completedCourses - 3) / 2) * 100 };
    return { current: "Gold", next: "Platinum", needed: 0, progress: 100 };
  })();

  const allBadgeKeys = Object.keys(BADGE_DEFS);
  const filteredBadges = activeCategory === "all"
    ? allBadgeKeys
    : allBadgeKeys.filter((k) => BADGE_DEFS[k].category === activeCategory);

  return (
    <div className="space-y-8">
      {/* Reading Streak Card */}
      <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
              <Flame className="h-5 w-5 text-orange-500" />
              Reading Streak
            </h2>
            {readingStreak && readingStreak.current > 0 ? (
              <p className="text-sm text-gray-600">
                You have completed{" "}
                <span className="font-bold text-amber-700">{readingStreak.current} days</span>{" "}
                of Scripture reading.
              </p>
            ) : (
              <p className="text-sm text-gray-600">Start your reading streak today!</p>
            )}
          </div>
          <div className="flex items-center gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-orange-600">{readingStreak?.current ?? 0}</p>
              <p className="text-xs text-gray-500">Current</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-600">{readingStreak?.longest ?? 0}</p>
              <p className="text-xs text-gray-500">Best</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-600">{readingStreak?.totalDays ?? 0}</p>
              <p className="text-xs text-gray-500">Total Days</p>
            </div>
          </div>
        </div>

        {checkinState === "done" ? (
          <div className="mt-4 flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl px-4 py-2.5 text-sm font-medium">
            <Star className="h-4 w-4" />
            {checkinMessage}
          </div>
        ) : !isCheckedInToday ? (
          <button
            onClick={handleCheckin}
            disabled={checkinState === "loading"}
            className="mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60"
          >
            {checkinState === "loading" ? "Checking in…" : "Check In Today"}
          </button>
        ) : (
          <p className="mt-4 text-sm text-emerald-600 font-medium flex items-center gap-1.5">
            <Star className="h-4 w-4" /> Already checked in today — great work!
          </p>
        )}
      </div>

      {/* Badges Section */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Badges
        </h2>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-colors ${
                activeCategory === cat.key
                  ? "bg-amber-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filteredBadges.map((key) => {
            const def = BADGE_DEFS[key];
            const earned = earnedSet.has(key);
            return (
              <div
                key={key}
                className={`rounded-xl border p-4 text-center transition-all ${
                  earned
                    ? "bg-white border-amber-200 shadow-sm"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className={`text-3xl mb-2 ${earned ? "" : "grayscale"}`}>{def.icon}</div>
                <p className={`text-xs font-semibold mb-1 ${earned ? "text-gray-800" : "text-gray-400"}`}>
                  {def.name}
                </p>
                <p className="text-xs text-gray-400 leading-tight">
                  {earned ? def.description : "Keep going to unlock"}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      {recentPoints.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-emerald-500" />
            Recent Activity
          </h2>
          <div className="space-y-2">
            {recentPoints.map((event, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3">
                <span className="text-emerald-600 font-bold text-sm w-16 shrink-0">
                  +{event.points} pts
                </span>
                <span className="text-sm text-gray-700 flex-1">{event.label ?? event.type}</span>
                <span className="text-xs text-gray-400 shrink-0">
                  {formatRelativeTime(event.createdAt)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certificate Progress */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6">
        <h2 className="font-semibold text-gray-800 mb-4">Certificate Progress</h2>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Current: <span className="font-bold text-emerald-700">{certProgress.current}</span>
          </span>
          {certProgress.needed > 0 && (
            <span className="text-sm text-gray-500">
              {certProgress.needed} more course{certProgress.needed !== 1 ? "s" : ""} to {certProgress.next}
            </span>
          )}
        </div>
        <div className="h-2.5 bg-white rounded-full overflow-hidden border border-emerald-200">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
            style={{ width: `${certProgress.progress}%` }}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {completedCourses} course{completedCourses !== 1 ? "s" : ""} completed — keep going!
        </p>
      </div>
    </div>
  );
}
