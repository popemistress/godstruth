import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { awardPoints, awardBadge, checkAndAwardBadges, POINTS } from "@/lib/gamification";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;
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
