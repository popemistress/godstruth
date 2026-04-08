import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { ArrowLeft, BookOpen, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BibleActions } from "@/components/bibles/BibleActions";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const bibles = await db.bibleEdition.findMany({ select: { slug: true } });
  return bibles.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const bible = await db.bibleEdition.findUnique({ where: { slug: params.slug } });
  if (!bible) return {};
  return {
    title: `${bible.title} | Gods Truth Bible Library`,
    description: bible.description,
  };
}

function CanonRatingBar({ rating }: { rating: number }) {
  const pct = (rating / 10) * 100;
  const color =
    rating >= 9 ? "bg-green-500" : rating >= 7 ? "bg-yellow-400" : rating >= 5 ? "bg-orange-400" : "bg-red-500";
  const label =
    rating >= 9.5 ? "Exceptional" : rating >= 8.5 ? "Very High" : rating >= 7 ? "High" : rating >= 5 ? "Moderate" : "Low";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-neutral-80">Canon Proximity</span>
        <span className="font-bold text-neutral-80">{rating.toFixed(1)} / 10 — {label}</span>
      </div>
      <div className="h-3 bg-neutral-20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function TranslationBadge({ translation }: { translation: string }) {
  return (
    <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
      {translation}
    </span>
  );
}

export default async function BibleDetailPage({ params }: PageProps) {
  const bible = await db.bibleEdition.findUnique({ where: { slug: params.slug } });
  if (!bible) notFound();

  return (
    <div className="container-page py-10">
      {/* Back */}
      <Link
        href="/bibles"
        className="inline-flex items-center gap-1.5 text-sm text-neutral-45 hover:text-neutral-80 transition-colors mb-8"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Bible Library
      </Link>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Left: Cover card */}
        <div className="lg:col-span-1">
          <div
            className="rounded-2xl overflow-hidden shadow-xl aspect-[3/4] relative flex flex-col items-center justify-center p-8"
            style={{
              background: `linear-gradient(160deg, ${bible.gradientFrom} 0%, ${bible.gradientTo} 100%)`,
            }}
          >
            {bible.coverUrl ? (
              <Image
                src={bible.coverUrl}
                alt={bible.title}
                fill
                className="object-cover"
              />
            ) : (
              <>
                {/* Decorative spine line */}
                <div
                  className="absolute left-6 top-0 bottom-0 w-0.5 opacity-20"
                  style={{ background: bible.accentColor }}
                />
                <TranslationBadge translation={bible.translation} />
                <div
                  className="text-center mt-6"
                  style={{ color: bible.accentColor }}
                >
                  <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-80" />
                </div>
                <h2 className="text-white text-center font-serif text-xl font-bold leading-tight px-2">
                  {bible.title}
                </h2>
                {bible.publisher && (
                  <p className="text-white/50 text-xs text-center mt-3">{bible.publisher}</p>
                )}
                {bible.publishedYear && (
                  <p className="text-white/40 text-xs text-center mt-1">
                    First published {bible.publishedYear}
                  </p>
                )}
              </>
            )}
          </div>

          {/* Quick details card */}
          <div className="card mt-4 p-5 space-y-3 text-sm">
            {bible.translation !== "OTHER" && (
              <div className="flex justify-between">
                <span className="text-neutral-45">Translation</span>
                <span className="font-semibold text-neutral-80">{bible.translation}</span>
              </div>
            )}
            {bible.publisher && (
              <div className="flex justify-between">
                <span className="text-neutral-45">Publisher</span>
                <span className="font-semibold text-neutral-80 text-right max-w-[60%]">{bible.publisher}</span>
              </div>
            )}
            {bible.publishedYear && (
              <div className="flex justify-between">
                <span className="text-neutral-45">First Published</span>
                <span className="font-semibold text-neutral-80">{bible.publishedYear}</span>
              </div>
            )}
            <div className="pt-2">
              <CanonRatingBar rating={bible.canonRating} />
            </div>
          </div>

          {/* View / Download */}
          {bible.fileUrl && (
            <BibleActions
              slug={bible.slug}
              fileUrl={bible.fileUrl}
              filename={bible.filename}
            />
          )}
        </div>

        {/* Right: Content */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <Badge variant="brand">{bible.translation}</Badge>
              {bible.featured && (
                <Badge variant="premium" className="flex items-center gap-1">
                  <Star className="h-3 w-3" /> Featured
                </Badge>
              )}
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-80 mb-4">
              {bible.title}
            </h1>
            <p className="text-neutral-60 text-lg leading-relaxed">{bible.description}</p>
          </div>

          {/* History */}
          <div>
            <h2 className="font-serif text-xl font-bold text-neutral-80 mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-brand" />
              History & Background
            </h2>
            <div className="bg-neutral-05 border border-neutral-20 rounded-xl p-6">
              <p className="text-neutral-60 leading-relaxed whitespace-pre-line">{bible.history}</p>
            </div>
          </div>

          {/* Canon Rating */}
          <div>
            <h2 className="font-serif text-xl font-bold text-neutral-80 mb-3">
              Canon Proximity Rating
            </h2>
            <div className="bg-neutral-05 border border-neutral-20 rounded-xl p-6 space-y-4">
              <CanonRatingBar rating={bible.canonRating} />
              <p className="text-neutral-60 text-sm leading-relaxed">{bible.canonNotes}</p>
              <div className="border-t border-neutral-20 pt-4">
                <h4 className="text-xs font-semibold text-neutral-45 uppercase tracking-wider mb-2">
                  Rating Scale
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-neutral-45">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    <span>9–10: Formally equivalent, 66 books</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span>7–8: Dynamic equiv., 66 books</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-orange-400" />
                    <span>5–6: Includes Apocrypha</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-red-500" />
                    <span>1–4: Major departures / additions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
