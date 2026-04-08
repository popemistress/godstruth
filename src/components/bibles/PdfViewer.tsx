"use client";

import { useState, useEffect, useRef } from "react";

interface PdfViewerProps {
  fileUrl: string;
  title: string;
}

function ProgressCircle({ percent }: { percent: number }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <div className="relative h-24 w-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r={r} fill="none" stroke="#e5e5e5" strokeWidth="6" />
          <circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.4s ease" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-neutral-80">
          {percent}%
        </span>
      </div>
      <p className="text-sm text-neutral-45">Loading document…</p>
    </div>
  );
}

export function PdfViewer({ fileUrl, title }: PdfViewerProps) {
  const [loaded, setLoaded] = useState(false);
  const [percent, setPercent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Simulate progress climbing toward 95% until iframe fires onLoad
    intervalRef.current = setInterval(() => {
      setPercent((p) => {
        if (p >= 95) { clearInterval(intervalRef.current!); return 95; }
        // Fast at start, slow near end
        const step = p < 30 ? 5 : p < 60 ? 3 : p < 80 ? 2 : 1;
        return p + step;
      });
    }, 300);

    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  function handleLoad() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setPercent(100);
    setTimeout(() => setLoaded(true), 300);
  }

  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div className="absolute inset-0 bg-white z-10">
          <ProgressCircle percent={percent} />
        </div>
      )}
      <iframe
        src={`${fileUrl}#toolbar=0`}
        className="w-full h-full"
        title={title}
        onLoad={handleLoad}
      />
    </div>
  );
}
