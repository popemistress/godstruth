import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  courseId: z.string(),
  days: z.array(
    z.object({
      dayNumber: z.number().int().min(1),
      title: z.string().min(1),
      lessonId: z.string().optional(),
      scriptureReading: z.string().optional(),
      prayerPrompt: z.string().optional(),
      hasQuiz: z.boolean().default(false),
      hasMentorCheckin: z.boolean().default(false),
    })
  ),
});

export async function GET() {
  const tracks = await db.courseTrack.findMany({
    where: { published: true },
    include: {
      course: { select: { id: true, title: true, slug: true, thumbnail: true } },
      days: { orderBy: { dayNumber: "asc" } },
    },
    orderBy: { order: "asc" },
  });
  return NextResponse.json(tracks);
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

  const { title, description, courseId, days } = parsed.data;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const track = await db.courseTrack.create({
    data: {
      title,
      slug,
      description,
      courseId,
      published: false,
      days: {
        create: days.map((d) => ({
          dayNumber: d.dayNumber,
          title: d.title,
          lessonId: d.lessonId || null,
          scriptureReading: d.scriptureReading || null,
          prayerPrompt: d.prayerPrompt || null,
          hasQuiz: d.hasQuiz,
          hasMentorCheckin: d.hasMentorCheckin,
        })),
      },
    },
    include: { days: { orderBy: { dayNumber: "asc" } } },
  });

  return NextResponse.json(track, { status: 201 });
}
