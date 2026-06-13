import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  reference: z.string().min(1),
  text: z.string().min(1),
  translation: z.string().default("KJV"),
  topic: z.string().optional(),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]).default("EASY"),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const topic = searchParams.get("topic");
  const difficulty = searchParams.get("difficulty");

  const where: any = { published: true };
  if (topic) where.topic = topic;
  if (difficulty) where.difficulty = difficulty;

  const verses = await db.memoryVerse.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(verses);
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

  const verse = await db.memoryVerse.create({
    data: { ...parsed.data, published: true },
  });

  return NextResponse.json(verse, { status: 201 });
}
