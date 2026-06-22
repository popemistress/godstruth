import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();

  // Get all users with their completed lesson counts (excluding SUPPLEMENT and IMAGE)
  const allProgress = await db.lessonProgress.findMany({
    where: { completedAt: { not: null } },
    include: {
      lesson: { select: { type: true } },
      user: { select: { id: true, name: true } },
    },
  });

  // Filter to countable lesson types
  const countable = allProgress.filter(
    (lp) => lp.lesson.type !== "SUPPLEMENT" && lp.lesson.type !== "IMAGE"
  );

  // Aggregate by user
  const userMap = new Map<string, { name: string | null; lessons: number }>();
  for (const lp of countable) {
    const existing = userMap.get(lp.userId);
    if (existing) {
      existing.lessons++;
    } else {
      userMap.set(lp.userId, { name: lp.user.name, lessons: 1 });
    }
  }

  // Sort by lessons descending
  const sorted = Array.from(userMap.entries()).sort((a, b) => b[1].lessons - a[1].lessons);

  // Count completed courses per user
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

  // Build top 20
  const top20 = sorted.slice(0, 20).map(([userId, data], idx) => ({
    rank: idx + 1,
    displayName: (data.name ?? "Anonymous").split(" ")[0],
    lessonsCompleted: data.lessons,
    coursesCompleted: getCoursesCompleted(userId),
    isCurrentUser: session?.user?.id === userId,
  }));

  // Current user rank (if authenticated and outside top 20)
  let currentUserRank: { rank: number; displayName: string; lessonsCompleted: number; coursesCompleted: number; isCurrentUser: true } | null = null;
  if (session?.user?.id) {
    const currentUserIdx = sorted.findIndex(([uid]) => uid === session.user?.id);
    if (currentUserIdx >= 20) {
      const [, data] = sorted[currentUserIdx];
      currentUserRank = {
        rank: currentUserIdx + 1,
        displayName: (data.name ?? "Anonymous").split(" ")[0],
        lessonsCompleted: data.lessons,
        coursesCompleted: getCoursesCompleted(session.user.id),
        isCurrentUser: true,
      };
    }
  }

  return NextResponse.json({ top20, currentUserRank });
}
