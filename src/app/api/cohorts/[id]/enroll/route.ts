import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

interface Params {
  params: { id: string };
}

export async function POST(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
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
    where: { userId_cohortId: { userId: session.user.id, cohortId: params.id } },
    create: {
      userId: session.user.id,
      cohortId: params.id,
    },
    update: {},
  });

  return NextResponse.json(enrollment);
}
