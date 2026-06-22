import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { getUserGamificationSummary } from "@/lib/gamification";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getUserGamificationSummary(userId);
  return NextResponse.json(summary);
}
