import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import type { ContentType, Prisma } from "@prisma/client";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") ?? "1");
  const pageSize = parseInt(searchParams.get("pageSize") ?? "12");
  const type = searchParams.get("type") as ContentType | null;
  const search = searchParams.get("search") ?? "";
  const premium = searchParams.get("premium");
  const bookSlug = searchParams.get("bookSlug");

  const where: Prisma.ContentWhereInput = {
    published: true,
    ...(type && { type }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
    ...(premium !== null && { premium: premium === "true" }),
    ...(bookSlug && { book: { slug: bookSlug } }),
  };

  const [items, total] = await Promise.all([
    db.content.findMany({
      where,
      include: {
        tags: { include: { tag: true } },
        series: { select: { id: true, title: true, slug: true } },
        book: { select: { id: true, name: true, slug: true, testament: true } },
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    db.content.count({ where }),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    pageSize,
    hasMore: page * pageSize < total,
  });
}
