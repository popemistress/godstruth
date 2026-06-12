"use client";

/**
 * ScriptureTooltipProvider
 *
 * Wraps lesson/supplement content, intercepts hover/click on [data-scripture]
 * chips, and shows a floating tooltip with a selectable Bible translation.
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { BookOpen, X, Loader2, AlertCircle, ChevronDown } from "lucide-react";

type TranslationCode = string;

interface TranslationOption {
  code: string;
  label: string;
  name: string;
}

const DEFAULT_TRANSLATION: TranslationOption = {
  code: "kjv",
  label: "KJV",
  name: "King James Version",
};

// ── Per-translation fetch state ───────────────────────────────────────────────

interface TranslationState {
  text:    string | null;
  loading: boolean;
  error:   string | null;
}

const empty = (): TranslationState => ({ text: null, loading: false, error: null });

// ── Tooltip state ─────────────────────────────────────────────────────────────

interface TooltipState {
  ref:          string;
  x:            number;
  y:            number;
  above:        boolean;
  active:       TranslationCode;
  translations: Record<TranslationCode, TranslationState>;
}

// ── Module-level cache: "ref:translation" → text ─────────────────────────────

const cache = new Map<string, string>();
let translationsPromise: Promise<TranslationOption[]> | null = null;

async function fetchAvailableTranslations(): Promise<TranslationOption[]> {
  translationsPromise ??= fetch("/api/scripture?translations=1", {
    signal: AbortSignal.timeout(8000),
  })
    .then(async (res) => {
      const data = await res.json() as { translations?: TranslationOption[]; error?: string };
      if (!res.ok || data.error) throw new Error(data.error ?? `HTTP ${res.status}`);
      return data.translations?.length ? data.translations : [DEFAULT_TRANSLATION];
    })
    .catch(() => [DEFAULT_TRANSLATION]);

  return translationsPromise;
}

async function fetchTranslation(ref: string, translation: TranslationCode): Promise<string> {
  const key = `${ref}:${translation}`;
  if (cache.has(key)) return cache.get(key)!;

  const res = await fetch(
    `/api/scripture?ref=${encodeURIComponent(ref)}&translation=${translation}`,
    { signal: AbortSignal.timeout(8000) }
  );

  const data = await res.json() as { text?: string; error?: string };

  if (!res.ok || data.error) throw new Error(data.error ?? `HTTP ${res.status}`);
  const text = data.text ?? "";
  cache.set(key, text);
  return text;
}

// ── Tooltip card ──────────────────────────────────────────────────────────────

const TOOLTIP_W = 360;

function Tooltip({
  state,
  onClose,
  onDismiss,
  onKeepOpen,
  onSwitchTranslation,
  translationOptions,
}: {
  state:               TooltipState;
  onClose:             () => void;   // scheduleClose — on mouseleave
  onDismiss:           () => void;   // closeTooltip  — on X click
  onKeepOpen:          () => void;   // clearClose    — on mouseenter
  onSwitchTranslation: (t: TranslationCode) => void;
  translationOptions:  TranslationOption[];
}) {
  const left = Math.min(
    Math.max(state.x - TOOLTIP_W / 2, 8),
    (typeof window !== "undefined" ? window.innerWidth : 800) - TOOLTIP_W - 8
  );

  const current = state.translations[state.active] ?? empty();
  const activeTranslation =
    translationOptions.find((translation) => translation.code === state.active) ?? DEFAULT_TRANSLATION;

  return (
    <div
      role="tooltip"
      style={{
        position:  "fixed",
        left,
        top:       state.above ? state.y : state.y + 8,
        width:     TOOLTIP_W,
        transform: state.above ? "translateY(calc(-100% - 8px))" : "translateY(0)",
        zIndex:    9999,
      }}
      className="animate-in fade-in-0 zoom-in-95 duration-150"
      onMouseEnter={onKeepOpen}
      onMouseLeave={onClose}
    >
      {/* Directional arrow */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={
          state.above
            ? { bottom: -7, borderTop: "8px solid #065f46", borderLeft: "8px solid transparent", borderRight: "8px solid transparent" }
            : { top: -7,    borderBottom: "8px solid #065f46", borderLeft: "8px solid transparent", borderRight: "8px solid transparent" }
        }
      />

      {/* Card */}
      <div className="rounded-2xl shadow-2xl shadow-emerald-900/20 border border-emerald-100 bg-white overflow-hidden">

        {/* ── Header ── */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-800 to-teal-700">
          {/* Reference */}
          <BookOpen className="h-3.5 w-3.5 text-emerald-300 flex-shrink-0" />
          <span className="text-white text-[12px] font-bold tracking-wide flex-1 truncate min-w-0">
            {state.ref}
          </span>

          {/* Translation selector */}
          <div className="relative flex-shrink-0">
            {current.loading && (
              <Loader2 className="pointer-events-none absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 animate-spin text-emerald-800" />
            )}
            <select
              value={state.active}
              onPointerDown={(event) => {
                event.stopPropagation();
                onKeepOpen();
              }}
              onMouseDown={(event) => {
                event.stopPropagation();
                onKeepOpen();
              }}
              onFocus={onKeepOpen}
              onChange={(event) => {
                onKeepOpen();
                onSwitchTranslation(event.target.value);
                window.setTimeout(onKeepOpen, 0);
              }}
              onClick={(event) => {
                event.stopPropagation();
                onKeepOpen();
              }}
              className={[
                "h-7 max-w-[132px] appearance-none rounded-full border border-white/20 bg-white",
                "py-1 pl-6 pr-7 text-[11px] font-bold leading-none text-emerald-900 shadow-sm",
                "outline-none transition-colors hover:bg-emerald-50 focus:ring-2 focus:ring-white/60",
                current.loading ? "" : "pl-2.5",
              ].join(" ")}
              aria-label="Bible translation"
            >
              {translationOptions.map((translation) => (
                <option key={translation.code} value={translation.code}>
                  {translation.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2 text-emerald-800" />
          </div>

          {/* Close */}
          <button
            onClick={(e) => { e.stopPropagation(); onDismiss(); }}
            className="text-emerald-300 hover:text-white transition-colors ml-0.5 flex-shrink-0"
            aria-label="Close"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-4 py-4 min-h-[64px] transition-all duration-200">
          {current.loading && (
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Loader2 className="h-4 w-4 animate-spin flex-shrink-0" />
              <span>Loading {activeTranslation.label}...</span>
            </div>
          )}

          {current.error && !current.loading && (
            <div className="flex items-start gap-2 text-red-500">
              <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <p className="text-xs leading-relaxed">{current.error}</p>
            </div>
          )}

          {current.text && !current.loading && (
            <blockquote className="text-gray-800 text-[13px] leading-relaxed italic">
              &ldquo;{current.text}&rdquo;
            </blockquote>
          )}
        </div>

        {/* ── Footer: translation label ── */}
        <div className="px-4 pb-3 -mt-1">
          <p className="text-[10px] text-gray-400">
            {activeTranslation.name}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Provider ──────────────────────────────────────────────────────────────────

export function ScriptureTooltipProvider({ children }: { children: React.ReactNode }) {
  const [tooltip,   setTooltip]   = useState<TooltipState | null>(null);
  const [translationOptions, setTranslationOptions] = useState<TranslationOption[]>([DEFAULT_TRANSLATION]);
  const closeTimer                 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef               = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    fetchAvailableTranslations().then((translations) => {
      if (mounted) setTranslationOptions(translations);
    });
    return () => { mounted = false; };
  }, []);

  const clearClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  const closeTooltip = useCallback(() => {
    clearClose();
    setTooltip(null);
  }, [clearClose]);

  const scheduleClose = useCallback((delay = 300) => {
    clearClose();
    closeTimer.current = setTimeout(closeTooltip, delay);
  }, [clearClose, closeTooltip]);

  // Load a translation into the tooltip state
  const loadTranslation = useCallback(async (ref: string, t: TranslationCode) => {
    setTooltip(prev => {
      if (!prev || prev.ref !== ref) return prev;
      return {
        ...prev,
        active: t,
        translations: {
          ...prev.translations,
          [t]: { text: null, loading: true, error: null },
        },
      };
    });

    try {
      const text = await fetchTranslation(ref, t);
      setTooltip(prev => {
        if (!prev || prev.ref !== ref) return prev;
        return {
          ...prev,
          translations: {
            ...prev.translations,
            [t]: { text, loading: false, error: null },
          },
        };
      });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setTooltip(prev => {
        if (!prev || prev.ref !== ref) return prev;
        return {
          ...prev,
          translations: {
            ...prev.translations,
            [t]: { text: null, loading: false, error: msg },
          },
        };
      });
    }
  }, []);

  // Open tooltip anchored to chip element, start loading KJV immediately
  const openTooltip = useCallback(async (el: HTMLElement) => {
    const ref = el.dataset.scripture?.trim();
    if (!ref) return;

    const rect  = el.getBoundingClientRect();
    const midX  = rect.left + rect.width / 2;
    const above = rect.top > window.innerHeight * 0.55;
    const y     = above ? rect.top - 4 : rect.bottom + 4;

    setTooltip({
      ref, x: midX, y, above,
      active: DEFAULT_TRANSLATION.code,
      translations: {
        [DEFAULT_TRANSLATION.code]: { text: null, loading: true, error: null },
      },
    });

    try {
      const text = await fetchTranslation(ref, DEFAULT_TRANSLATION.code);
      setTooltip(prev =>
        prev?.ref === ref
          ? {
              ...prev,
              translations: {
                ...prev.translations,
                [DEFAULT_TRANSLATION.code]: { text, loading: false, error: null },
              },
            }
          : prev
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setTooltip(prev =>
        prev?.ref === ref
          ? {
              ...prev,
              translations: {
                ...prev.translations,
                [DEFAULT_TRANSLATION.code]: { text: null, loading: false, error: msg },
              },
            }
          : prev
      );
    }
  }, []);

  // Switch active translation and fetch it if it has not been loaded yet.
  const switchTranslation = useCallback((t: TranslationCode) => {
    setTooltip(prev => {
      if (!prev) return prev;
      // Already active and loaded — just switch display
      if (prev.active === t && prev.translations[t]?.text) return prev;
      return { ...prev, active: t };
    });
    setTooltip(prev => {
      if (!prev) return prev;
      // If not yet fetched, kick off fetch
      const translation = prev.translations[t];
      if (!translation?.text && !translation?.loading && !translation?.error) {
        loadTranslation(prev.ref, t);
      }
      return { ...prev, active: t };
    });
  }, [loadTranslation]);

  // Event delegation on content container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hoverTimers: ReturnType<typeof setTimeout>[] = [];

    function chipOf(t: EventTarget | null) {
      return (t instanceof Element)
        ? (t.closest("[data-scripture]") as HTMLElement | null)
        : null;
    }

    function onMouseOver(e: MouseEvent) {
      const chip = chipOf(e.target);
      if (!chip) return;
      clearClose();
      hoverTimers.forEach(clearTimeout);
      hoverTimers.length = 0;
      hoverTimers.push(setTimeout(() => openTooltip(chip), 220));
    }

    function onMouseOut(e: MouseEvent) {
      if (!chipOf(e.target)) return;
      scheduleClose();
    }

    function onClick(e: MouseEvent) {
      const chip = chipOf(e.target);
      if (!chip) return;
      e.stopPropagation();
      clearClose();
      hoverTimers.forEach(clearTimeout);
      hoverTimers.length = 0;
      openTooltip(chip);
    }

    container.addEventListener("mouseover", onMouseOver);
    container.addEventListener("mouseout",  onMouseOut);
    container.addEventListener("click",     onClick);

    return () => {
      container.removeEventListener("mouseover", onMouseOver);
      container.removeEventListener("mouseout",  onMouseOut);
      container.removeEventListener("click",     onClick);
      hoverTimers.forEach(clearTimeout);
    };
  }, [clearClose, scheduleClose, openTooltip]);

  // Close on Escape / outside click
  useEffect(() => {
    if (!tooltip) return;
    function onKey(e: KeyboardEvent)  { if (e.key === "Escape") closeTooltip(); }
    function onDown(e: MouseEvent)    {
      const t = e.target as Element;
      if (!t?.closest("[data-scripture]") && !t?.closest("[role='tooltip']")) closeTooltip();
    }
    document.addEventListener("keydown",   onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown",   onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [tooltip, closeTooltip]);

  return (
    <div ref={containerRef}>
      {children}
      {tooltip && typeof document !== "undefined" &&
        createPortal(
          <Tooltip
            state={tooltip}
            onClose={scheduleClose}
            onDismiss={closeTooltip}
            onKeepOpen={clearClose}
            onSwitchTranslation={switchTranslation}
            translationOptions={translationOptions}
          />,
          document.body
        )
      }
    </div>
  );
}
