import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const certificates = await db.certificate.findMany({
    where: { userId: session.user.id },
    include: {
      course: { select: { title: true, slug: true, thumbnail: true } },
      track: { select: { title: true, slug: true } },
    },
    orderBy: { issuedAt: "desc" },
  });

  return NextResponse.json(certificates);
}
