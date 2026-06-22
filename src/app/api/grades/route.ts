import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/clerk-user";

export async function GET(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const activityType = searchParams.get("activityType");
  const limit = parseInt(searchParams.get("limit") ?? "50", 10);

  const where: Record<string, unknown> = { userId };
  if (activityType) where.activityType = activityType;

  const grades = await db.grade.findMany({
    where,
    orderBy: { gradedAt: "desc" },
    take: Math.min(limit, 200),
  });

  return NextResponse.json(grades);
}

export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json() as {
    activityId: string;
    activityType: string;
    activityName?: string;
    score?: number;
    rawScore?: number;
    maxScore?: number;
    passed?: boolean;
    completed?: boolean;
    timeSpent?: number;
    comment?: string;
    source?: string;
  };

  if (!body.activityId || !body.activityType) {
    return NextResponse.json({ error: "activityId and activityType are required" }, { status: 400 });
  }

  const grade = await db.grade.upsert({
    where: {
      userId_activityId: {
        userId,
        activityId: body.activityId,
      },
    },
    create: {
      userId,
      activityId: body.activityId,
      activityType: body.activityType,
      activityName: body.activityName ?? null,
      score: body.score ?? null,
      rawScore: body.rawScore ?? null,
      maxScore: body.maxScore ?? null,
      passed: body.passed ?? null,
      completed: body.completed ?? false,
      timeSpent: body.timeSpent ?? null,
      comment: body.comment ?? null,
      source: body.source ?? "internal",
    },
    update: {
      activityName: body.activityName ?? undefined,
      score: body.score ?? undefined,
      rawScore: body.rawScore ?? undefined,
      maxScore: body.maxScore ?? undefined,
      passed: body.passed ?? undefined,
      completed: body.completed ?? undefined,
      timeSpent: body.timeSpent ?? undefined,
      comment: body.comment ?? undefined,
      source: body.source ?? undefined,
      attempts: { increment: 1 },
    },
  });

  return NextResponse.json(grade);
}
