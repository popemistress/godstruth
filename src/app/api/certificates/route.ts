import { NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const certificates = await db.certificate.findMany({
    where: { userId },
    include: {
      course: { select: { title: true, slug: true, thumbnail: true } },
      track: { select: { title: true, slug: true } },
    },
    orderBy: { issuedAt: "desc" },
  });

  return NextResponse.json(certificates);
}
