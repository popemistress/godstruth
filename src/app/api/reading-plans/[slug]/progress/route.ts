import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({ currentDay: z.number().int().min(1) });

interface Params {
  params: { slug: string };
}

export async function POST(req: NextRequest, { params }: Params) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const plan = await db.readingPlan.findUnique({ where: { slug: params.slug } });
  if (!plan) {
    return NextResponse.json({ error: "Plan not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { currentDay } = parsed.data;
  const completedAt = currentDay >= plan.duration ? new Date() : null;

  const progress = await db.userReadingProgress.upsert({
    where: { userId_planId: { userId, planId: plan.id } },
    create: { userId, planId: plan.id, currentDay, completedAt },
    update: { currentDay, completedAt },
  });

  return NextResponse.json(progress);
}
