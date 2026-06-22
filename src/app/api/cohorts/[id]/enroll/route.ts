import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";

interface Params {
  params: { id: string };
}

export async function POST(_req: Request, { params }: Params) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cohort = await db.cohort.findUnique({
    where: { id: params.id },
    include: { _count: { select: { enrollments: true } } },
  });

  if (!cohort) {
    return NextResponse.json({ error: "Cohort not found" }, { status: 404 });
  }

  if (cohort._count.enrollments >= cohort.maxStudents) {
    return NextResponse.json({ error: "Cohort is full" }, { status: 400 });
  }

  const enrollment = await db.cohortEnrollment.upsert({
    where: { userId_cohortId: { userId, cohortId: params.id } },
    create: {
      userId,
      cohortId: params.id,
    },
    update: {},
  });

  return NextResponse.json(enrollment);
}
