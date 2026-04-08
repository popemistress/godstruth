import { Suspense } from "react";
import { db } from "@/lib/db";
import type { ContentType, Prisma } from "@prisma/client";
import { ContentGrid } from "@/components/content/ContentGrid";
import { ContentFilter } from "@/components/content/ContentFilter";

interface PageProps {
  searchParams: { type?: string; search?: string; page?: string };
}

export const metadata = { title: "Knowledge" };

async function KnowledgeContent({ searchParams }: PageProps) {
  const type = searchParams.type as ContentType | undefined;
  const search = searchParams.search ?? "";
  const page = parseInt(searchParams.page ?? "1");
  const pageSize = 12;

  const where: Prisma.ContentWhereInput = {
    published: true,
    ...(type && { type }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ],
    }),
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

  return (
    <>
      <ContentGrid items={items} />
      {total > pageSize && (
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: Math.ceil(total / pageSize) }, (_, i) => i + 1).map((p) => (
            <a
              key={p}
              href={`/knowledge?${new URLSearchParams({ ...searchParams, page: String(p) }).toString()}`}
              className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                p === page
                  ? "bg-neutral-80 text-white border-neutral-80"
                  : "border-neutral-30 text-neutral-45 hover:border-neutral-60"
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default function KnowledgePage({ searchParams }: PageProps) {
  return (
    <div className="container-page py-10">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-80 mb-2">Knowledge Library</h1>
        <p className="text-neutral-45">Explore videos, books, podcasts, and courses.</p>
      </div>

      <div className="mb-8">
        <Suspense>
          <ContentFilter />
        </Suspense>
      </div>

      <Suspense fallback={
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="rounded-lg bg-neutral-10 aspect-[4/3] animate-pulse" />
          ))}
        </div>
      }>
        <KnowledgeContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
