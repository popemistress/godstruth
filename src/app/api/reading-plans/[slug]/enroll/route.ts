import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

interface Params {
  params: { slug: string };
}

export async function POST(_req: Request, { params }: Params) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plan = await db.readingPlan.findUnique({ where: { slug: params.slug } });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  const enrollment = await db.userReadingProgress.upsert({
    where: { userId_planId: { userId: session.user.id, planId: plan.id } },
    create: { userId: session.user.id, planId: plan.id, currentDay: 1 },
    update: {},
  });

  return NextResponse.json(enrollment);
}
