import { NextResponse } from "next/server";
import { db } from "@/lib/db";

interface Params {
  params: { slug: string };
}

export async function GET(_req: Request, { params }: Params) {
  const track = await db.courseTrack.findUnique({
    where: { slug: params.slug },
    include: {
      course: {
        select: { id: true, title: true, slug: true, thumbnail: true, description: true },
      },
      days: {
        orderBy: { dayNumber: "asc" },
        include: {
          lesson: {
            select: { id: true, title: true, type: true, duration: true },
          },
        },
      },
      enrollments: {
        select: { userId: true, currentDay: true, completedAt: true },
      },
    },
  });

  if (!track) {
    return NextResponse.json({ error: "Track not found" }, { status: 404 });
  }

  return NextResponse.json(track);
}
