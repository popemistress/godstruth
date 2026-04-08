import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  contentId: z.string(),
  // progress stored as fraction (0.0–1.0); callers pass seconds, we store raw float
  progress: z.number().min(0),
  completed: z.boolean().optional(),
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

  const { contentId, progress, completed } = parsed.data;

  const result = await db.userProgress.upsert({
    where: { userId_contentId: { userId: session.user.id, contentId } },
    create: {
      userId: session.user.id,
      contentId,
      progress,
      completed: completed ?? false,
    },
    update: {
      progress,
      ...(completed !== undefined && { completed }),
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
  const contentId = searchParams.get("contentId");

  if (contentId) {
    const progress = await db.userProgress.findUnique({
      where: { userId_contentId: { userId: session.user.id, contentId } },
    });
    return NextResponse.json(progress);
  }

  const allProgress = await db.userProgress.findMany({
    where: { userId: session.user.id },
    include: { content: { select: { id: true, title: true, slug: true, type: true, thumbnail: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(allProgress);
}
