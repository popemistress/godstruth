"use client";

/**
 * Thin client wrapper that renders pre-parsed lesson HTML.
 * The heavy parseMarkdown work runs on the server in LessonPage and is passed
 * as contentHtml — this component only handles interactive behaviour (lightbox,
 * quiz answer persistence).
 */

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface LessonContentProps {
  contentHtml: string;
  lessonId?: string;
  className?: string;
}

function showSaved(det: HTMLElement, answer: string) {
  const form = det.querySelector<HTMLElement>(".q-form");
  const saved = det.querySelector<HTMLElement>(".q-saved");
  const savedText = det.querySelector<HTMLElement>(".q-saved-text");
  if (form) form.style.display = "none";
  if (saved) { saved.style.display = "flex"; }
  if (savedText) savedText.textContent = answer;
}

export function LessonContent({ contentHtml, lessonId, className }: LessonContentProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ns = lessonId ?? "lesson";

    // Restore any previously saved answers
    container.querySelectorAll<HTMLElement>("details[data-qi]").forEach((det) => {
      const saved = localStorage.getItem(`q-answer:${ns}:${det.dataset.qi}`);
      if (saved) showSaved(det, saved);
    });

    // Single delegated click handler for quiz options, submit buttons, and lightbox triggers
    const onClick = (e: MouseEvent) => {
      // ── Multiple-choice quiz option ──────────────────────────────────────────
      const quizOpt = (e.target as Element).closest<HTMLElement>(".quiz-option");
      if (quizOpt) {
        const questionDiv = quizOpt.closest<HTMLElement>(".quiz-question");
        if (!questionDiv) return;
        // Ignore if already answered
        const feedback = questionDiv.querySelector<HTMLElement>(".quiz-feedback");
        if (feedback && !feedback.classList.contains("hidden")) return;
        // Disable all options
        questionDiv.querySelectorAll<HTMLButtonElement>(".quiz-option").forEach((opt) => {
          opt.disabled = true;
          const letter = opt.querySelector<HTMLElement>(".quiz-option-letter");
          if (opt.dataset.correct === "true") {
            opt.classList.add("border-emerald-400", "bg-emerald-50");
            if (letter) {
              letter.classList.remove("bg-gray-100", "text-gray-600");
              letter.classList.add("bg-emerald-500", "text-white");
            }
          } else if (opt === quizOpt) {
            opt.classList.add("border-red-300", "bg-red-50");
            if (letter) {
              letter.classList.remove("bg-gray-100", "text-gray-600");
              letter.classList.add("bg-red-400", "text-white");
            }
          }
        });
        // Show feedback
        if (feedback) feedback.classList.remove("hidden");
        const isCorrect = quizOpt.dataset.correct === "true";
        questionDiv
          .querySelector<HTMLElement>(isCorrect ? ".quiz-feedback-correct" : ".quiz-feedback-wrong")
          ?.classList.remove("hidden");
        return;
      }

      const btn = (e.target as Element).closest<HTMLElement>(".q-submit");
      if (btn) {
        const det = btn.closest<HTMLElement>("details[data-qi]");
        if (!det) return;
        const textarea = det.querySelector<HTMLTextAreaElement>(".q-textarea");
        const answer = textarea?.value.trim() ?? "";
        if (!answer) return;
        localStorage.setItem(`q-answer:${ns}:${det.dataset.qi}`, answer);
        showSaved(det, answer);
        return;
      }

      const fig = (e.target as Element).closest<HTMLElement>(".lesson-lightbox-trigger");
      if (fig) {
        const src = fig.dataset.lightboxSrc;
        if (!src) return;
        overlayImg.src = src;
        overlay.style.display = "flex";
        document.body.style.overflow = "hidden";
      }
    };

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" || !(e.ctrlKey || e.metaKey)) return;
      const textarea = (e.target as Element).closest<HTMLElement>(".q-textarea");
      if (!textarea) return;
      e.preventDefault();
      const det = textarea.closest<HTMLElement>("details[data-qi]");
      if (!det) return;
      const answer = (textarea as HTMLTextAreaElement).value.trim();
      if (!answer) return;
      localStorage.setItem(`q-answer:${ns}:${det.dataset.qi}`, answer);
      showSaved(det, answer);
    };

    container.addEventListener("click", onClick);
    container.addEventListener("keydown", onKeydown);

    // ── Lightbox ──────────────────────────────────────────────────────────────
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out";
    overlay.style.display = "none";

    const overlayImg = document.createElement("img");
    overlayImg.className =
      "max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl border-2 border-amber-300 pointer-events-none";
    overlay.appendChild(overlayImg);

    const closeBtn = document.createElement("button");
    closeBtn.className =
      "absolute top-4 right-4 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 transition-colors cursor-pointer";
    closeBtn.innerHTML =
      `<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>`;
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);

    const closeLightbox = () => {
      overlay.style.display = "none";
      document.body.style.overflow = "";
    };
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeLightbox();
    });
    closeBtn.addEventListener("click", closeLightbox);

    const onKeyEsc = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    document.addEventListener("keydown", onKeyEsc);

    return () => {
      container.removeEventListener("click", onClick);
      container.removeEventListener("keydown", onKeydown);
      document.removeEventListener("keydown", onKeyEsc);
      overlay.remove();
      document.body.style.overflow = "";
    };
  }, [lessonId]);

  return (
    <div
      ref={containerRef}
      className={cn("lesson-prose mx-auto w-full max-w-[72ch] text-left", className)}
      dangerouslySetInnerHTML={{ __html: contentHtml }}
    />
  );
}
