"use client";

import { Sparkles } from "lucide-react";

export function BetaBanner() {
  return (
    <div className="beta-banner relative isolate overflow-hidden border-b border-cyan-200/70">
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-white/35 blur-2xl beta-banner-glow" />
      <div className="container-page relative flex min-h-11 items-center justify-center gap-3 py-2 text-center">
        <span className="relative flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-cyan-200/80">
          <Sparkles className="h-4 w-4 text-brand-accessible beta-banner-spark" />
        </span>
        <p className="text-sm font-semibold leading-snug text-neutral-80">
          <span className="text-brand-accessible">Beta Preview:</span>{" "}
          Gods Truth is in beta, and we are working every day to complete each component of the site.
        </p>
      </div>
    </div>
  );
}
