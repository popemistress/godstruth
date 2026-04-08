import { notFound } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { db } from "@/lib/db";
import { ArrowLeft } from "lucide-react";
import { PdfViewer } from "@/components/bibles/PdfViewer";

const EpubViewer = dynamic(
  () => import("@/components/bibles/EpubViewer").then((m) => m.EpubViewer),
  { ssr: false, loading: () => (
    <div className="flex items-center justify-center h-[80vh] text-neutral-45 text-sm">
      Loading book…
    </div>
  )}
);

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps) {
  const bible = await db.bibleEdition.findUnique({ where: { slug: params.slug } });
  if (!bible) return {};
  return { title: `Read ${bible.title} | Gods Truth` };
}

export default async function BibleReadPage({ params }: PageProps) {
  const bible = await db.bibleEdition.findUnique({ where: { slug: params.slug } });
  if (!bible) notFound();
  if (!bible.fileUrl) notFound();

  const isEpub = bible.filename?.toLowerCase().endsWith(".epub") ?? true;

  return (
    <div className="flex flex-col h-screen">
      {/* Slim top bar */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-20 bg-white shrink-0">
        <Link
          href={`/bibles/${bible.slug}`}
          className="inline-flex items-center gap-1.5 text-sm text-neutral-45 hover:text-neutral-80 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
        <span className="text-neutral-20">|</span>
        <span className="text-sm font-medium text-neutral-80 line-clamp-1">{bible.title}</span>
        <span
          className="ml-auto text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded"
          style={{ background: `${bible.accentColor}25`, color: bible.accentColor }}
        >
          {bible.translation}
        </span>
      </div>

      {/* Viewer */}
      <div className="flex-1 overflow-hidden">
        {isEpub ? (
          <EpubViewer fileUrl={bible.fileUrl} title={bible.title} />
        ) : (
          <PdfViewer fileUrl={bible.fileUrl} title={bible.title} />
        )}
      </div>
    </div>
  );
}
