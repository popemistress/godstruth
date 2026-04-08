"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";

interface BibleActionsProps {
  slug: string;
  fileUrl: string;
  filename: string | null;
}

export function BibleActions({ slug }: BibleActionsProps) {
  return (
    <div className="mt-4">
      <Link
        href={`/bibles/${slug}/read`}
        className="w-full flex items-center justify-center gap-2 bg-neutral-80 text-white rounded-lg px-4 py-3 text-sm font-medium hover:bg-neutral-70 transition-colors"
      >
        <BookOpen className="h-4 w-4" />
        View Bible
      </Link>
    </div>
  );
}
