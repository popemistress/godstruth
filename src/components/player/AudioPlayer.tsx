"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from "lucide-react";
import { formatDuration } from "@/lib/utils";

interface AudioPlayerProps {
  url: string;
  title?: string;
  onProgress?: (seconds: number) => void;
}

export function AudioPlayer({ url, title, onProgress }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); } else { a.play(); }
    setPlaying(!playing);
  }

  function skip(seconds: number) {
    const a = audioRef.current;
    if (!a) return;
    a.currentTime = Math.max(0, Math.min(a.currentTime + seconds, duration));
  }

  return (
    <div className="bg-neutral-10 rounded-xl p-4 border border-neutral-20">
      <audio
        ref={audioRef}
        src={url}
        onTimeUpdate={() => {
          const a = audioRef.current;
          if (!a) return;
          setCurrentTime(a.currentTime);
          if (onProgress && Math.floor(a.currentTime) % 10 === 0) {
            onProgress(Math.floor(a.currentTime));
          }
        }}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
      />

      {title && <p className="text-sm font-semibold text-neutral-80 mb-3 line-clamp-1">{title}</p>}

      {/* Progress */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs text-neutral-45 w-10 text-right">{formatDuration(Math.floor(currentTime))}</span>
        <input
          type="range"
          min={0}
          max={duration || 1}
          value={currentTime}
          onChange={(e) => { if (audioRef.current) audioRef.current.currentTime = Number(e.target.value); }}
          className="flex-1 h-1.5 accent-brand cursor-pointer"
        />
        <span className="text-xs text-neutral-45 w-10">{formatDuration(Math.floor(duration))}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <button onClick={() => skip(-15)} className="text-neutral-45 hover:text-neutral-80 transition-colors">
          <SkipBack className="h-5 w-5" />
        </button>
        <button
          onClick={togglePlay}
          className="bg-neutral-80 text-white rounded-full p-3 hover:bg-brand transition-colors"
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>
        <button onClick={() => skip(30)} className="text-neutral-45 hover:text-neutral-80 transition-colors">
          <SkipForward className="h-5 w-5" />
        </button>
        <button
          onClick={() => { setMuted(!muted); if (audioRef.current) audioRef.current.muted = !muted; }}
          className="text-neutral-45 hover:text-neutral-80 transition-colors ml-2"
        >
          {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
