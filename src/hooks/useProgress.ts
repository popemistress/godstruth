"use client";

import { useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

export function useProgress(contentId: string, duration?: number) {
  const { userId } = useAuth();

  const saveProgress = useCallback(
    async (currentSeconds: number, completed = false) => {
      if (!userId) return;
      // Convert seconds to 0.0–1.0 fraction if duration is known, otherwise store raw seconds
      const progress = duration && duration > 0 ? currentSeconds / duration : currentSeconds;
      await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contentId, progress, completed }),
      });
    },
    [contentId, duration, userId]
  );

  return { saveProgress };
}
