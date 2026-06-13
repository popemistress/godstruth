import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  cohortId: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  scheduledAt: z.string().datetime(),
  duration: z.number().int().min(15).max(240).default(60),
  meetingUrl: z.string().url().optional(),
  maxAttendees: z.number().int().min(1).max(500).default(100),
});

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const cohortId = searchParams.get("cohortId");

  const where = cohortId ? { cohortId } : {};
  const sessions = await db.liveSession.findMany({
    where,
    include: {
      cohort: { select: { id: true, title: true, slug: true } },
      _count: { select: { registrations: true } },
    },
    orderBy: { scheduledAt: "asc" },
  });

  return NextResponse.json(sessions);
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
  const session_ = await db.liveSession.create({
    data: {
      cohortId: data.cohortId,
      title: data.title,
      description: data.description || "",
      scheduledAt: new Date(data.scheduledAt),
      duration: data.duration,
      meetingUrl: data.meetingUrl || null,
      maxAttendees: data.maxAttendees,
    },
  });

  return NextResponse.json(session_, { status: 201 });
}
