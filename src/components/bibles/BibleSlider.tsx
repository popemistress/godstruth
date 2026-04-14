"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import type { BibleEdition } from "@prisma/client";
import { BookOpen, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Swiper CSS
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BibleSliderProps {
  bibles: BibleEdition[];
}

function CanonDots({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={i}
          className={`h-1.5 w-1.5 rounded-full transition-colors ${
            i < filled ? "bg-white" : "bg-white/25"
          }`}
        />
      ))}
    </div>
  );
}

function BibleCard({ bible }: { bible: BibleEdition }) {
  const hasCover = Boolean(bible.coverUrl);
  return (
    <Link href={`/bibles/${bible.slug}`} className="block group h-full">
      <div
        className="relative rounded-2xl overflow-hidden h-72 flex flex-col justify-between p-5 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:-translate-y-1"
        style={hasCover ? undefined : {
          background: `linear-gradient(155deg, ${bible.gradientFrom} 0%, ${bible.gradientTo} 100%)`,
        }}
      >
        {/* Spine accent (gradient cards only) */}
        {!hasCover && (
          <div
            className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl"
            style={{ background: bible.accentColor }}
          />
        )}

        {/* Cover image (full opacity) + dark overlay */}
        {hasCover && (
          <>
            <Image
              src={bible.coverUrl!}
              alt={bible.title}
              fill
              className="object-cover"
              sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
          </>
        )}

        {/* Top: translation badge + featured star */}
        <div className="relative flex items-start justify-between">
          <span
            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md"
            style={hasCover
              ? { background: "rgba(255,255,255,0.2)", color: "#fff" }
              : { background: `${bible.accentColor}25`, color: bible.accentColor }
            }
          >
            {bible.translation}
          </span>
          {bible.featured && (
            <Star
              className="h-4 w-4 fill-current opacity-80"
              style={{ color: hasCover ? "#fff" : bible.accentColor }}
            />
          )}
        </div>

        {/* Middle: icon (gradient cards only) */}
        {!hasCover && (
          <div className="relative flex justify-center">
            <BookOpen
              className="h-10 w-10 opacity-20 group-hover:opacity-30 transition-opacity"
              style={{ color: bible.accentColor }}
            />
          </div>
        )}

        {/* Bottom: title + meta */}
        <div className="relative space-y-2">
          <h3 className="text-white font-serif font-bold text-sm leading-snug line-clamp-2">
            {bible.title}
          </h3>
          {!hasCover && bible.publisher && (
            <p className="text-white/50 text-xs truncate">{bible.publisher}</p>
          )}
          <div className="flex items-center justify-between pt-1">
            <CanonDots rating={bible.canonRating} />
            <span className="text-white/50 text-[10px]">{bible.canonRating.toFixed(1)}/10</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function BibleSlider({ bibles }: BibleSliderProps) {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative px-0 sm:px-5">
      {/* Custom nav buttons — hidden on mobile (swipe to navigate) */}
      <button
        ref={prevRef}
        className="hidden sm:flex absolute -left-1 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-20 shadow-md hover:shadow-lg hover:border-neutral-40 transition-all"
        aria-label="Previous"
      >
        <ChevronLeft className="h-4 w-4 text-neutral-60" />
      </button>

      <button
        ref={nextRef}
        className="hidden sm:flex absolute -right-1 top-1/2 -translate-y-1/2 z-10 h-9 w-9 items-center justify-center rounded-full bg-white border border-neutral-20 shadow-md hover:shadow-lg hover:border-neutral-40 transition-all"
        aria-label="Next"
      >
        <ChevronRight className="h-4 w-4 text-neutral-60" />
      </button>

      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={16}
        slidesPerView={1.2}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // @ts-expect-error — assign refs before init
          swiper.params.navigation.prevEl = prevRef.current;
          // @ts-expect-error
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        autoplay={{ delay: 3500, disableOnInteraction: true, pauseOnMouseEnter: true }}
        pagination={{ clickable: true, dynamicBullets: true }}
        loop={bibles.length > 4}
        breakpoints={{
          400:  { slidesPerView: 2, spaceBetween: 16 },
          640:  { slidesPerView: 3, spaceBetween: 16 },
          900:  { slidesPerView: 4, spaceBetween: 20 },
          1200: { slidesPerView: 5, spaceBetween: 20 },
          1440: { slidesPerView: 6, spaceBetween: 20 },
        }}
        className="!pb-10"
      >
        {bibles.map((bible) => (
          <SwiperSlide key={bible.id}>
            <BibleCard bible={bible} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
