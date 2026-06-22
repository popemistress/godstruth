import { NextRequest, NextResponse } from "next/server";
import { getCurrentDbUser } from "@/lib/clerk-user";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  courseId: z.string(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  maxStudents: z.number().int().min(1).max(500).default(50),
});

export async function GET() {
  const user = await getCurrentDbUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cohorts = await db.cohort.findMany({
    where: { published: true },
    include: {
      course: { select: { id: true, title: true, slug: true, thumbnail: true } },
      instructor: { select: { id: true, name: true, image: true } },
      _count: { select: { enrollments: true } },
    },
    orderBy: { startDate: "asc" },
  });

  return NextResponse.json(cohorts);
}

export async function POST(req: NextRequest) {
  const user = await getCurrentDbUser();
  if (!user || (user.role !== "ADMIN" && user.role !== "INSTRUCTOR")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }

  const { title, description, courseId, startDate, endDate, maxStudents } = parsed.data;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const cohort = await db.cohort.create({
    data: {
      title,
      slug: `${slug}-${Date.now().toString(36)}`,
      description: description || "",
      courseId,
      instructorId: user.id,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      maxStudents,
      published: true,
    },
  });

  return NextResponse.json(cohort, { status: 201 });
}
