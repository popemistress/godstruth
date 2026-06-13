import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const createSchema = z.object({
  title: z.string().min(1),
  scripture: z.string().min(1),
  body: z.string().min(1),
  prayer: z.string().optional(),
  author: z.string().optional(),
  featured: z.boolean().optional(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const featured = searchParams.get("featured") === "true";
  const take = parseInt(searchParams.get("take") ?? "30");

  const where = { published: true, ...(featured && { featured: true }) };
  const devotionals = await db.devotional.findMany({
    where,
    orderBy: { publishDate: "desc" },
    take,
  });
  return NextResponse.json(devotionals);
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

  const { title, scripture, body: bodyText, prayer, author, featured } = parsed.data;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const devotional = await db.devotional.create({
    data: {
      title,
      slug: `${slug}-${Date.now().toString(36)}`,
      scripture,
      body: bodyText,
      prayer: prayer || null,
      author: author || null,
      published: true,
      featured: featured ?? false,
    },
  });

  return NextResponse.json(devotional, { status: 201 });
}
