import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="bg-tan-05 overflow-hidden">
      <div className="container-page py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div>
          <p className="text-brand-accessible text-sm font-semibold uppercase tracking-widest mb-4">
            Gods Truth
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-80 leading-tight mb-6">
            Understand the Bible like never before
          </h1>
          <p className="text-neutral-45 text-lg leading-relaxed mb-8 max-w-md">
            Free videos, study guides, podcasts, and courses to help you explore the story of the Bible — from Genesis to Revelation.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="default" size="lg" asChild>
              <Link href="/knowledge">Start Exploring</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/register">Create Free Account</Link>
            </Button>
          </div>
        </div>

        {/* Image collage */}
        <div className="relative h-80 md:h-auto">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              {/* Stack of image cards */}
              <div className="absolute top-4 left-4 w-48 h-32 rounded-xl bg-brand/20 border border-brand/30 rotate-[-6deg]" />
              <div className="absolute top-0 right-0 w-48 h-32 rounded-xl bg-tan-20 border border-tan-20 rotate-[4deg]" />
              <div className="relative w-52 h-36 rounded-xl bg-neutral-80 mx-auto shadow-md flex items-center justify-center">
                <span className="font-serif text-white text-lg font-bold text-center px-4 leading-snug">
                  In the beginning<br />
                  <span className="text-brand text-sm font-normal">Genesis 1:1</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
