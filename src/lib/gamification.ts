import { db } from "@/lib/db";

// ─── Point values ──────────────────────────────────────────────────────────────

export const POINTS = {
  LESSON_COMPLETE: 10,
  QUIZ_PASSED: 15,
  COURSE_COMPLETE: 100,
  VERSE_MASTERED: 20,
  READING_PLAN_DAY: 5,
  STREAK_7: 50,
  STREAK_30: 200,
  STREAK_60: 350,
  STREAK_100: 500,
} as const;

// ─── Badge definitions ─────────────────────────────────────────────────────────

export const BADGE_DEFS: Record<string, { name: string; description: string; icon: string; category: string }> = {
  // Course completion
  GPFM_COMPLETE:   { name: "God's Plan Scholar",      icon: "📖", category: "course",    description: "Completed Gods Universal Plan for Creation" },
  JESUS_COMPLETE:  { name: "Follower of the Way",     icon: "✝️",  category: "course",    description: "Completed the Jesus course" },
  ANGELS_COMPLETE: { name: "Heavenly Host Scholar",   icon: "👼", category: "course",    description: "Completed the Angels course" },
  DEMONS_COMPLETE: { name: "Spiritual Warfare Ready", icon: "🛡️",  category: "course",    description: "Completed the Demons course" },
  SATAN_COMPLETE:  { name: "Know Your Adversary",     icon: "⚔️",  category: "course",    description: "Completed the Satan course" },
  HELL_COMPLETE:   { name: "Serious Student",         icon: "🔥", category: "course",    description: "Completed the Hell course" },

  // Streak milestones
  STREAK_7:        { name: "7 Days Faithful",         icon: "🌱", category: "streak",    description: "7 consecutive days of reading" },
  STREAK_30:       { name: "30 Days Steadfast",       icon: "🌿", category: "streak",    description: "30 consecutive days of reading" },
  STREAK_60:       { name: "60 Days Devoted",         icon: "🌳", category: "streak",    description: "60 consecutive days of reading" },
  STREAK_100:      { name: "100 Days Committed",      icon: "🏔️", category: "streak",    description: "100 consecutive days of reading" },

  // Scripture memory
  MEMORY_10:       { name: "First Fruits",            icon: "🌾", category: "memory",    description: "Mastered 10 Scripture verses" },
  MEMORY_25:       { name: "Word Keeper",             icon: "📜", category: "memory",    description: "Mastered 25 Scripture verses" },
  MEMORY_50:       { name: "Scripture Treasury",      icon: "💎", category: "memory",    description: "Mastered 50 Scripture verses" },
  MEMORY_100:      { name: "Living Word",             icon: "✨", category: "memory",    description: "Mastered 100 Scripture verses" },

  // Certificate levels
  CERT_BRONZE:     { name: "Bronze Certificate",      icon: "🥉", category: "cert",      description: "Completed your first course" },
  CERT_SILVER:     { name: "Silver Certificate",      icon: "🥈", category: "cert",      description: "Completed 3 courses" },
  CERT_GOLD:       { name: "Gold Certificate",        icon: "🥇", category: "cert",      description: "Completed 5 courses" },
  CERT_PLATINUM:   { name: "Platinum Scholar",        icon: "💠", category: "cert",      description: "Completed all available courses" },

  // Completion milestones
  LESSONS_10:      { name: "Eager Learner",           icon: "📚", category: "milestone", description: "Completed 10 lessons" },
  LESSONS_50:      { name: "Diligent Student",        icon: "🎓", category: "milestone", description: "Completed 50 lessons" },
  LESSONS_100:     { name: "Devoted Scholar",         icon: "🏛️", category: "milestone", description: "Completed 100 lessons" },
};

// ─── Slug → badge key mapping ──────────────────────────────────────────────────

const COURSE_SLUG_TO_BADGE: Record<string, string> = {
  "gods-universal-plan-for-creation": "GPFM_COMPLETE",
  "jesus": "JESUS_COMPLETE",
  "angels": "ANGELS_COMPLETE",
  "demons": "DEMONS_COMPLETE",
  "satan": "SATAN_COMPLETE",
  "hell": "HELL_COMPLETE",
};

// ─── Award points ──────────────────────────────────────────────────────────────

export async function awardPoints(
  userId: string,
  type: keyof typeof POINTS,
  label?: string
): Promise<void> {
  const pts = POINTS[type];
  await Promise.all([
    db.userPoints.upsert({
      where: { userId },
      update: { total: { increment: pts } },
      create: { userId, total: pts },
    }),
    db.pointEvent.create({
      data: { userId, type, points: pts, label: label ?? null },
    }),
  ]);
}

// ─── Award badge (idempotent) ──────────────────────────────────────────────────

export async function awardBadge(userId: string, badgeKey: string): Promise<boolean> {
  try {
    await db.userBadge.create({ data: { userId, badgeKey } });
    return true;
  } catch {
    // Unique constraint violation — already earned
    return false;
  }
}

// ─── Update streak ─────────────────────────────────────────────────────────────

export async function updateStreak(
  userId: string,
  type: "READING" | "SCRIPTURE" | "PRAYER" | "JOURNAL"
): Promise<{ current: number; longest: number; totalDays: number; isNewRecord: boolean; badgesAwarded: string[] }> {
  const now = new Date();
  const badgesAwarded: string[] = [];

  const existing = await db.userStreak.findUnique({ where: { userId_type: { userId, type } } });

  let current = 1;
  let longest = existing?.longest ?? 0;
  let totalDays = (existing?.totalDays ?? 0) + 1;

  if (existing?.lastCheckin) {
    const hoursSince = (now.getTime() - existing.lastCheckin.getTime()) / 3_600_000;

    if (hoursSince <= 24) {
      // Same day — already checked in, don't double-count
      return {
        current: existing.current,
        longest: existing.longest,
        totalDays: existing.totalDays,
        isNewRecord: false,
        badgesAwarded: [],
      };
    } else if (hoursSince <= 72) {
      // Within grace period — extend streak
      current = existing.current + 1;
    } else {
      // Streak broken — reset to 1
      current = 1;
    }
  }

  const isNewRecord = current > longest;
  if (isNewRecord) longest = current;

  const updated = await db.userStreak.upsert({
    where: { userId_type: { userId, type } },
    update: { current, longest, totalDays, lastCheckin: now },
    create: { userId, type, current, longest, totalDays, lastCheckin: now },
  });

  // Award streak badges
  const streakMilestones: Array<[number, string, keyof typeof POINTS]> = [
    [7,   "STREAK_7",   "STREAK_7"],
    [30,  "STREAK_30",  "STREAK_30"],
    [60,  "STREAK_60",  "STREAK_60"],
    [100, "STREAK_100", "STREAK_100"],
  ];

  for (const [threshold, badgeKey, pointKey] of streakMilestones) {
    if (current >= threshold) {
      const newlyAwarded = await awardBadge(userId, badgeKey);
      if (newlyAwarded) {
        badgesAwarded.push(badgeKey);
        await awardPoints(userId, pointKey, `${threshold}-Day Streak Milestone`);
      }
    }
  }

  return {
    current: updated.current,
    longest: updated.longest,
    totalDays: updated.totalDays,
    isNewRecord,
    badgesAwarded,
  };
}

// ─── Check and award all badges ────────────────────────────────────────────────

export async function checkAndAwardBadges(userId: string): Promise<string[]> {
  const newBadges: string[] = [];

  // Count completed lessons (excluding SUPPLEMENT and IMAGE)
  const lessonProgress = await db.lessonProgress.findMany({
    where: { userId, completedAt: { not: null } },
    include: { lesson: { select: { type: true, chapter: { select: { content: { select: { type: true, slug: true } } } } } } },
  });

  const completedLessons = lessonProgress.filter(
    (lp) => lp.lesson.type !== "SUPPLEMENT" && lp.lesson.type !== "IMAGE"
  );
  const completedCount = completedLessons.length;

  // Lesson milestone badges
  const lessonMilestones: Array<[number, string]> = [
    [10, "LESSONS_10"],
    [50, "LESSONS_50"],
    [100, "LESSONS_100"],
  ];
  for (const [threshold, badgeKey] of lessonMilestones) {
    if (completedCount >= threshold) {
      const awarded = await awardBadge(userId, badgeKey);
      if (awarded) newBadges.push(badgeKey);
    }
  }

  // Course completion badges
  const courses = await db.content.findMany({
    where: { type: "COURSE", published: true },
    select: {
      id: true,
      slug: true,
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

  let completedCourseCount = 0;
  for (const course of courses) {
    const allLessons = course.chapters.flatMap((ch) => ch.lessons).filter(
      (l) => l.type !== "SUPPLEMENT" && l.type !== "IMAGE"
    );
    if (allLessons.length === 0) continue;

    const completedLessonIds = new Set(completedLessons.map((lp) => lp.lessonId));
    const allDone = allLessons.every((l) => completedLessonIds.has(l.id));
    if (!allDone) continue;

    completedCourseCount++;

    const badgeKey = COURSE_SLUG_TO_BADGE[course.slug];
    if (badgeKey) {
      const awarded = await awardBadge(userId, badgeKey);
      if (awarded) {
        newBadges.push(badgeKey);
        await awardPoints(userId, "COURSE_COMPLETE", `Completed course: ${course.slug}`);
      }
    }
  }

  // Certificate badges
  const certMilestones: Array<[number, string]> = [
    [1, "CERT_BRONZE"],
    [3, "CERT_SILVER"],
    [5, "CERT_GOLD"],
    [courses.length, "CERT_PLATINUM"],
  ];
  for (const [threshold, badgeKey] of certMilestones) {
    if (completedCourseCount >= threshold && threshold > 0) {
      const awarded = await awardBadge(userId, badgeKey);
      if (awarded) newBadges.push(badgeKey);
    }
  }

  // Memory verse badges — count PointEvents of type VERSE_MASTERED
  const verseCount = await db.pointEvent.count({ where: { userId, type: "VERSE_MASTERED" } });
  const memoryMilestones: Array<[number, string]> = [
    [10, "MEMORY_10"],
    [25, "MEMORY_25"],
    [50, "MEMORY_50"],
    [100, "MEMORY_100"],
  ];
  for (const [threshold, badgeKey] of memoryMilestones) {
    if (verseCount >= threshold) {
      const awarded = await awardBadge(userId, badgeKey);
      if (awarded) newBadges.push(badgeKey);
    }
  }

  return newBadges;
}

// ─── Get user gamification summary ────────────────────────────────────────────

export async function getUserGamificationSummary(userId: string): Promise<{
  points: number;
  streaks: Array<{ type: string; current: number; longest: number; totalDays: number; lastCheckin: Date | null }>;
  badges: string[];
  recentPoints: Array<{ type: string; points: number; label: string | null; createdAt: Date }>;
  completedCourses: number;
  completedLessons: number;
  masteredVerses: number;
}> {
  const [userPoints, streaks, badges, recentPoints, lessonProgress, masteredVerses] = await Promise.all([
    db.userPoints.findUnique({ where: { userId } }),
    db.userStreak.findMany({ where: { userId } }),
    db.userBadge.findMany({ where: { userId }, select: { badgeKey: true } }),
    db.pointEvent.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { type: true, points: true, label: true, createdAt: true },
    }),
    db.lessonProgress.findMany({
      where: { userId, completedAt: { not: null } },
      include: { lesson: { select: { type: true } } },
    }),
    db.pointEvent.count({ where: { userId, type: "VERSE_MASTERED" } }),
  ]);

  const completedLessons = lessonProgress.filter(
    (lp) => lp.lesson.type !== "SUPPLEMENT" && lp.lesson.type !== "IMAGE"
  ).length;

  // Count completed courses
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

  const completedLessonIds = new Set(
    lessonProgress
      .filter((lp) => lp.lesson.type !== "SUPPLEMENT" && lp.lesson.type !== "IMAGE")
      .map((lp) => lp.lessonId)
  );

  let completedCourses = 0;
  for (const course of courses) {
    const allLessons = course.chapters.flatMap((ch) => ch.lessons).filter(
      (l) => l.type !== "SUPPLEMENT" && l.type !== "IMAGE"
    );
    if (allLessons.length > 0 && allLessons.every((l) => completedLessonIds.has(l.id))) {
      completedCourses++;
    }
  }

  return {
    points: userPoints?.total ?? 0,
    streaks: streaks.map((s) => ({
      type: s.type,
      current: s.current,
      longest: s.longest,
      totalDays: s.totalDays,
      lastCheckin: s.lastCheckin,
    })),
    badges: badges.map((b) => b.badgeKey),
    recentPoints,
    completedCourses,
    completedLessons,
    masteredVerses,
  };
}
