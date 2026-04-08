"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, RotateCcw } from "lucide-react";
import { Howl } from "howler";

const SPEEDS = [1, 1.5, 2, 3] as const;
type Speed = (typeof SPEEDS)[number];

function formatTime(seconds: number) {
  if (!isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

interface BibleAudioPlayerProps {
  src: string;
  title?: string;
}

export function BibleAudioPlayer({ src, title }: BibleAudioPlayerProps) {
  const howlRef = useRef<Howl | null>(null);
  const rafRef = useRef<number | null>(null);

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState<Speed>(1);
  const [seek, setSeek] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Tick progress
  const tick = useCallback(() => {
    const h = howlRef.current;
    if (!h) return;
    const pos = h.seek() as number;
    setSeek(typeof pos === "number" ? pos : 0);
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const h = new Howl({
      src: [src],
      html5: true,
      onload: () => {
        setDuration(h.duration());
        setLoaded(true);
      },
      onplay: () => {
        setPlaying(true);
        rafRef.current = requestAnimationFrame(tick);
      },
      onpause: () => {
        setPlaying(false);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      },
      onstop: () => {
        setPlaying(false);
        setSeek(0);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      },
      onend: () => {
        setPlaying(false);
        setSeek(0);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      },
    });
    howlRef.current = h;
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      h.unload();
    };
  }, [src, tick]);

  function togglePlay() {
    const h = howlRef.current;
    if (!h || !loaded) return;
    if (h.playing()) h.pause();
    else h.play();
  }

  function toggleMute() {
    const h = howlRef.current;
    if (!h) return;
    const next = !muted;
    h.mute(next);
    setMuted(next);
  }

  function changeSpeed(s: Speed) {
    const h = howlRef.current;
    if (!h) return;
    h.rate(s);
    setSpeed(s);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const h = howlRef.current;
    if (!h || !loaded) return;
    const val = parseFloat(e.target.value);
    h.seek(val);
    setSeek(val);
  }

  function restart() {
    const h = howlRef.current;
    if (!h) return;
    h.seek(0);
    setSeek(0);
    if (!h.playing()) h.play();
  }

  const progress = duration > 0 ? (seek / duration) * 100 : 0;

  return (
    <div className="bg-white border border-neutral-20 rounded-2xl shadow-md p-6 space-y-5">
      {title && (
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-40 text-center">
          {title}
        </p>
      )}

      {/* Progress bar */}
      <div className="space-y-1.5">
        <input
          type="range"
          min={0}
          max={duration || 100}
          step={1}
          value={seek}
          onChange={handleSeek}
          disabled={!loaded}
          className="w-full h-1.5 rounded-full accent-neutral-80 cursor-pointer disabled:cursor-not-allowed disabled:opacity-40"
          style={{
            background: `linear-gradient(to right, #1a1a1a ${progress}%, #e0e0e0 ${progress}%)`,
          }}
        />
        <div className="flex justify-between text-[11px] text-neutral-40">
          <span>{formatTime(seek)}</span>
          <span>{loaded ? formatTime(duration) : "Loading…"}</span>
        </div>
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between gap-3">
        {/* Left: restart + mute */}
        <div className="flex items-center gap-2">
          <button
            onClick={restart}
            disabled={!loaded}
            className="h-8 w-8 flex items-center justify-center rounded-full border border-neutral-20 hover:border-neutral-40 transition-colors disabled:opacity-40"
            aria-label="Restart"
          >
            <RotateCcw className="h-3.5 w-3.5 text-neutral-60" />
          </button>
          <button
            onClick={toggleMute}
            disabled={!loaded}
            className="h-8 w-8 flex items-center justify-center rounded-full border border-neutral-20 hover:border-neutral-40 transition-colors disabled:opacity-40"
            aria-label={muted ? "Unmute" : "Mute"}
          >
            {muted
              ? <VolumeX className="h-3.5 w-3.5 text-neutral-60" />
              : <Volume2 className="h-3.5 w-3.5 text-neutral-60" />
            }
          </button>
        </div>

        {/* Center: play/pause */}
        <button
          onClick={togglePlay}
          disabled={!loaded}
          className="h-14 w-14 flex items-center justify-center rounded-full bg-neutral-80 text-white shadow-md hover:bg-neutral-70 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing
            ? <Pause className="h-6 w-6 fill-white" />
            : <Play className="h-6 w-6 fill-white translate-x-0.5" />
          }
        </button>

        {/* Right: speed controls */}
        <div className="flex items-center gap-1">
          {SPEEDS.map((s) => (
            <button
              key={s}
              onClick={() => changeSpeed(s)}
              disabled={!loaded}
              className={`text-xs font-semibold px-2 py-1 rounded-md border transition-colors disabled:opacity-40 ${
                speed === s
                  ? "bg-neutral-80 text-white border-neutral-80"
                  : "border-neutral-20 text-neutral-45 hover:border-neutral-40 hover:text-neutral-60"
              }`}
            >
              {s}×
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
