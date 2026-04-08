import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CtaSections() {
  return (
    <div className="space-y-0">
      {/* Feeling Lost */}
      <section className="bg-tan-10 py-16 md:py-20">
        <div className="container-page grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-brand-accessible text-sm font-semibold uppercase tracking-widest mb-3">Start Here</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-80 mb-4">
              Feeling lost in the Bible?
            </h2>
            <p className="text-neutral-45 leading-relaxed mb-6">
              The Bible can feel overwhelming. Our overview videos give you the big-picture story so every passage makes sense in context.
            </p>
            <Button asChild>
              <Link href="/knowledge?type=VIDEO">Watch Overviews</Link>
            </Button>
          </div>
          <div className="rounded-2xl bg-neutral-80 h-48 flex items-center justify-center shadow-md">
            <span className="font-serif text-white text-xl font-bold opacity-80">Bible Overview Series</span>
          </div>
        </div>
      </section>

      {/* Exploring a Book */}
      <section className="bg-cyan-surface py-16 md:py-20">
        <div className="container-page grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 rounded-2xl bg-brand/20 h-48 flex items-center justify-center">
            <span className="font-serif text-brand-accessible text-xl font-bold">66 Books Explored</span>
          </div>
          <div className="order-1 md:order-2">
            <p className="text-brand-accessible text-sm font-semibold uppercase tracking-widest mb-3">Deep Dives</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-80 mb-4">
              Exploring a specific book?
            </h2>
            <p className="text-neutral-45 leading-relaxed mb-6">
              Search our library by Bible book and find videos, study guides, and courses tailored to that part of Scripture.
            </p>
            <Button variant="brand" asChild>
              <Link href="/knowledge">Browse by Book</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-neutral-80 text-white py-16 md:py-20">
        <div className="container-page text-center max-w-2xl mx-auto">
          <p className="text-brand text-sm font-semibold uppercase tracking-widest mb-3">Our Mission</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Learn our story
          </h2>
          <p className="text-neutral-40 leading-relaxed mb-8">
            Gods Truth exists to help people of all backgrounds encounter the Bible as a unified story that leads to Jesus. All of our content is free because we believe God&apos;s Word should be accessible to everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="brand" asChild>
              <Link href="/register">Join for Free</Link>
            </Button>
            <Button variant="secondary" asChild>
              <Link href="/give">Support the Mission</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
