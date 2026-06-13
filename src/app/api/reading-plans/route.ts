import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  duration: z.number().int().min(1).max(365),
  days: z.array(z.object({
    dayNumber: z.number().int(),
    title: z.string().optional(),
    passages: z.array(z.string()),
    reflection: z.string().optional(),
  })),
});

export async function GET() {
  const plans = await db.readingPlan.findMany({
    where: { published: true },
    include: { days: { orderBy: { dayNumber: "asc" } }, _count: { select: { progress: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(plans);
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

  const { title, description, duration, days } = parsed.data;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const plan = await db.readingPlan.create({
    data: {
      title,
      slug: `${slug}-${Date.now().toString(36)}`,
      description: description || "",
      duration,
      published: true,
      days: { create: days },
    },
    include: { days: true },
  });

  return NextResponse.json(plan, { status: 201 });
}
