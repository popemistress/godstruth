import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";

interface Params {
  params: { slug: string };
}

export async function POST(_req: Request, { params }: Params) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plan = await db.readingPlan.findUnique({ where: { slug: params.slug } });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  const enrollment = await db.userReadingProgress.upsert({
    where: { userId_planId: { userId, planId: plan.id } },
    create: { userId, planId: plan.id, currentDay: 1 },
    update: {},
  });

  return NextResponse.json(enrollment);
}
