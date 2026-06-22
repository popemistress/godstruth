import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { awardPoints, awardBadge, checkAndAwardBadges, POINTS } from "@/lib/gamification";

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const { type, pointType, badgeKey, label } = body as {
    type: "points" | "badge";
    pointType?: string;
    badgeKey?: string;
    label?: string;
  };

  if (type === "points") {
    if (!pointType || !(pointType in POINTS)) {
      return NextResponse.json({ error: "Invalid pointType" }, { status: 400 });
    }
    await awardPoints(userId, pointType as keyof typeof POINTS, label);
    const newBadges = await checkAndAwardBadges(userId);
    return NextResponse.json({ ok: true, badgesAwarded: newBadges });
  }

  if (type === "badge") {
    if (!badgeKey) {
      return NextResponse.json({ error: "Missing badgeKey" }, { status: 400 });
    }
    const awarded = await awardBadge(userId, badgeKey);
    return NextResponse.json({ ok: true, newly: awarded });
  }

  return NextResponse.json({ error: "Invalid type" }, { status: 400 });
}
