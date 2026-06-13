import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  cohortId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  dueDate: z.string().datetime().optional(),
  maxPoints: z.number().int().min(1).max(1000).default(100),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cohortId = searchParams.get("cohortId");

  const where = cohortId ? { cohortId } : {};
  const assignments = await db.homeworkAssignment.findMany({
    where,
    include: {
      cohort: { select: { id: true, title: true, slug: true } },
      submissions: {
        where: { userId: session.user.id },
        include: { grade: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(assignments);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user || (session.user.role !== "ADMIN" && session.user.role !== "INSTRUCTOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }

  const data = parsed.data;
  const assignment = await db.homeworkAssignment.create({
    data: {
      cohortId: data.cohortId,
      title: data.title,
      description: data.description || "",
      dueDate: data.dueDate ? new Date(data.dueDate) : null,
      maxPoints: data.maxPoints,
    },
  });

  return NextResponse.json(assignment, { status: 201 });
}
