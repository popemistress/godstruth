import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";

interface Params {
  params: { slug: string };
}

export async function POST(_req: NextRequest, { params }: Params) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const track = await db.courseTrack.findUnique({
    where: { slug: params.slug },
  });
  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  const enrollment = await db.trackEnrollment.upsert({
    where: { userId_trackId: { userId, trackId: track.id } },
    create: {
      userId,
      trackId: track.id,
      currentDay: 1,
    },
    update: {},
  });

  return NextResponse.json(enrollment);
}
