"use client";

import { useState, useEffect, useRef } from "react";
import { ReactReader } from "react-reader";
type Rendition = { themes: { fontSize: (v: string) => void; override: (k: string, v: string) => void } };

interface EpubViewerProps {
  fileUrl: string;
  title: string;
}

function ProgressCircle({ percent }: { percent: number }) {
  const r = 36;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
      <div className="relative h-24 w-24">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 88 88">
          {/* Track */}
          <circle cx="44" cy="44" r={r} fill="none" stroke="#e5e5e5" strokeWidth="6" />
          {/* Progress */}
          <circle
            cx="44" cy="44" r={r}
            fill="none"
            stroke="#1a1a1a"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 0.3s ease" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-neutral-80">
          {percent}%
        </span>
      </div>
      <p className="text-sm text-neutral-45">Loading book…</p>
    </div>
  );
}

export function EpubViewer({ fileUrl, title }: EpubViewerProps) {
  const [epubData, setEpubData]   = useState<ArrayBuffer | null>(null);
  const [location, setLocation]   = useState<string | number>(0);
  const [error, setError]         = useState<string | null>(null);
  const [percent, setPercent]     = useState(0);
  const [loading, setLoading]     = useState(true);
  const renditionRef = useRef<Rendition | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setPercent(0);

    fetch(fileUrl)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const contentLength = res.headers.get("content-length");
        const total = contentLength ? parseInt(contentLength, 10) : null;
        const reader = res.body?.getReader();
        if (!reader) throw new Error("No response body");

        const chunks: Uint8Array[] = [];
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          if (value) {
            chunks.push(value);
            received += value.length;
            if (total) {
              setPercent(Math.min(99, Math.round((received / total) * 100)));
            } else {
              // No content-length — pulse up to 90% based on chunks received
              setPercent((p) => Math.min(90, p + 2));
            }
          }
        }

        setPercent(100);
        const combined = new Uint8Array(received);
        let offset = 0;
        for (const chunk of chunks) { combined.set(chunk, offset); offset += chunk.length; }
        return combined.buffer;
      })
      .then((buf) => setEpubData(buf))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [fileUrl]);

  if (loading) return <ProgressCircle percent={percent} />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-red-500 text-sm">
        Failed to load book: {error}
      </div>
    );
  }

  return (
    <div style={{ height: "80vh" }}>
      <ReactReader
        url={epubData!}
        title={title}
        location={location}
        locationChanged={(loc) => setLocation(loc)}
        getRendition={(rendition) => { renditionRef.current = rendition; }}
      />
    </div>
  );
}
