import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  currentDay: z.number().int().min(1),
  markComplete: z.boolean().optional(),
});

interface Params {
  params: { slug: string };
}

export async function POST(req: NextRequest, { params }: Params) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const track = await db.courseTrack.findUnique({
    where: { slug: params.slug },
    include: { days: true },
  });
  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { currentDay, markComplete } = parsed.data;
  const totalDays = track.days.length;
  const isComplete = markComplete || currentDay >= totalDays;

  const enrollment = await db.trackEnrollment.update({
    where: { userId_trackId: { userId, trackId: track.id } },
    data: {
      currentDay,
      completedAt: isComplete ? new Date() : null,
    },
  });

  // Auto-generate certificate on completion
  if (isComplete && !enrollment.completedAt) {
    const existing = await db.certificate.findFirst({
      where: { userId, trackId: track.id },
    });
    if (!existing) {
      await db.certificate.create({
        data: {
          userId,
          trackId: track.id,
          title: track.title,
          certificateNumber: `GT-${track.id.slice(-6).toUpperCase()}-${Date.now().toString(36).toUpperCase()}`,
        },
      });
    }
  }

  return NextResponse.json(enrollment);
}
