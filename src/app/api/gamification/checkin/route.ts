import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { updateStreak, checkAndAwardBadges } from "@/lib/gamification";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const type = body.type as "READING" | "SCRIPTURE" | "PRAYER" | "JOURNAL";
  const validTypes = ["READING", "SCRIPTURE", "PRAYER", "JOURNAL"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  const streak = await updateStreak(userId, type);
  const badgesFromBadgeCheck = await checkAndAwardBadges(userId);

  const allBadges = [...streak.badgesAwarded, ...badgesFromBadgeCheck];

  const points = await db.userPoints.findUnique({ where: { userId } });

  return NextResponse.json({
    streak,
    badgesAwarded: allBadges,
    points: points?.total ?? 0,
  });
}
