import { NextRequest, NextResponse } from "next/server";
import { getCurrentDbUser } from "@/lib/clerk-user";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  passages: z.array(z.string()),
  relatedTopics: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured") === "true";

  const where = { published: true, ...(featured && { featured: true }) };
  const topics = await db.topicStudy.findMany({
    where,
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(topics);
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

  const { title, description, passages, relatedTopics, featured } = parsed.data;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const topic = await db.topicStudy.create({
    data: {
      title,
      slug: `${slug}-${Date.now().toString(36)}`,
      description: description || "",
      passages,
      relatedTopics: relatedTopics || [],
      published: true,
      featured: featured ?? false,
    },
  });

  return NextResponse.json(topic, { status: 201 });
}
