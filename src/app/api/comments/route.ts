import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  courseId: z.string(),
  lessonId: z.string().optional(),
  content: z.string().min(1).max(2000),
  parentId: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const courseId = searchParams.get("courseId");
  const lessonId = searchParams.get("lessonId");

  if (!courseId) {
    return NextResponse.json({ error: "courseId required" }, { status: 400 });
  }

  const comments = await db.courseComment.findMany({
    where: {
      courseId,
      lessonId: lessonId || null,
      parentId: null,
      approved: true,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
      replies: {
        include: { user: { select: { id: true, name: true, image: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return NextResponse.json(comments);
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }

  const { courseId, lessonId, content, parentId } = parsed.data;
  const comment = await db.courseComment.create({
    data: {
      courseId,
      lessonId: lessonId || null,
      userId,
      content,
      parentId: parentId || null,
      approved: true,
    },
    include: {
      user: { select: { id: true, name: true, image: true } },
    },
  });

  return NextResponse.json(comment, { status: 201 });
}
