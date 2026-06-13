import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  lessonId: z.string(),
  completed: z.boolean().optional(),
  timeSpentSeconds: z.number().int().optional(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { lessonId, completed, timeSpentSeconds } = parsed.data;

  const result = await db.lessonProgress.upsert({
    where: { userId_lessonId: { userId: session.user.id, lessonId } },
    create: {
      userId: session.user.id,
      lessonId,
      startedAt: new Date(),
      completedAt: completed ? new Date() : null,
      timeSpentSeconds: timeSpentSeconds ?? 0,
    },
    update: {
      ...(completed && { completedAt: new Date() }),
      ...(timeSpentSeconds !== undefined && {
        timeSpentSeconds: { increment: timeSpentSeconds },
      }),
    },
  });

  return NextResponse.json(result);
}

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const lessonId = searchParams.get("lessonId");

  if (lessonId) {
    const progress = await db.lessonProgress.findUnique({
      where: { userId_lessonId: { userId: session.user.id, lessonId } },
    });
    return NextResponse.json(progress);
  }

  const allProgress = await db.lessonProgress.findMany({
    where: { userId: session.user.id },
    include: {
      lesson: {
        select: { id: true, title: true, type: true, chapter: { select: { content: { select: { title: true, slug: true } } } } },
      },
    },
    orderBy: { completedAt: "desc" },
  });

  return NextResponse.json(allProgress);
}
