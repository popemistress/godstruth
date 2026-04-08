"use client";

import { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw } from "lucide-react";
import { formatDuration } from "@/lib/utils";

interface VideoPlayerProps {
  url: string;
  onProgress?: (seconds: number) => void;
  initialProgress?: number;
}

export function VideoPlayer({ url, onProgress, initialProgress = 0 }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(initialProgress);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (videoRef.current && initialProgress > 0) {
      videoRef.current.currentTime = initialProgress;
    }
  }, [initialProgress]);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (playing) { v.pause(); } else { v.play(); }
    setPlaying(!playing);
  }

  function handleTimeUpdate() {
    const v = videoRef.current;
    if (!v) return;
    setCurrentTime(v.currentTime);
    if (onProgress && Math.floor(v.currentTime) % 10 === 0) {
      onProgress(Math.floor(v.currentTime));
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
  }

  return (
    <div className="relative bg-black rounded-xl overflow-hidden group">
      <video
        ref={videoRef}
        src={url}
        className="w-full aspect-video"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onEnded={() => { setPlaying(false); onProgress && onProgress(Math.floor(duration)); }}
        onClick={togglePlay}
      />

      {/* Controls overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Progress bar */}
        <input
          type="range"
          min={0}
          max={duration || 1}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 accent-brand mb-2 cursor-pointer"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className="text-white hover:text-brand transition-colors">
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={() => { if (videoRef.current) videoRef.current.currentTime = 0; }} className="text-white/70 hover:text-white transition-colors">
              <RotateCcw className="h-4 w-4" />
            </button>
            <button onClick={() => { setMuted(!muted); if (videoRef.current) videoRef.current.muted = !muted; }} className="text-white/70 hover:text-white transition-colors">
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <span className="text-white/70 text-xs">
              {formatDuration(Math.floor(currentTime))} / {formatDuration(Math.floor(duration))}
            </span>
          </div>
          <button onClick={() => videoRef.current?.requestFullscreen()} className="text-white/70 hover:text-white transition-colors">
            <Maximize className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Big play button */}
      {!playing && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="bg-black/50 hover:bg-black/70 transition-colors rounded-full p-5">
            <Play className="h-10 w-10 text-white fill-white" />
          </div>
        </button>
      )}
    </div>
  );
}
