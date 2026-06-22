import { NextRequest, NextResponse } from "next/server";
import { getCurrentUserId } from "@/lib/clerk-user";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  reference: z.string().min(1),
  content: z.string().min(1),
  color: z.enum(["yellow", "blue", "green", "pink", "purple"]).default("yellow"),
});

export async function GET() {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const notes = await db.userNote.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body", issues: parsed.error.issues }, { status: 400 });
  }

  const note = await db.userNote.create({
    data: { userId, ...parsed.data },
  });

  return NextResponse.json(note, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const userId = await getCurrentUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  await db.userNote.deleteMany({ where: { id, userId } });
  return NextResponse.json({ success: true });
}
