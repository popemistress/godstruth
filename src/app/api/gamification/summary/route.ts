import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUserGamificationSummary } from "@/lib/gamification";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getUserGamificationSummary(session.user.id);
  return NextResponse.json(summary);
}
