"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

interface AnnouncementBarProps {
  message: string;
  href?: string | null;
}

export function AnnouncementBar({ message, href }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-brand text-white text-sm text-center py-2.5 px-10">
      {href ? (
        <Link href={href} className="hover:underline font-medium">
          {message}
        </Link>
      ) : (
        <span className="font-medium">{message}</span>
      )}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-white/20 transition-colors"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
