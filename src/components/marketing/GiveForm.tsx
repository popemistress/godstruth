"use client";

import { FormEvent, useMemo, useRef, useState } from "react";
import { HeartHandshake, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const QUICK_AMOUNTS = ["10", "25", "50", "100", "250"];

function formatCurrencyLabel(amount: string) {
  return Number(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function GiveForm() {
  const [amount, setAmount] = useState("50");
  const [donorEmail, setDonorEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const selectedQuickAmount = useMemo(
    () => (!isCustomAmount ? QUICK_AMOUNTS.find((quickAmount) => quickAmount === amount) : undefined),
    [amount, isCustomAmount]
  );

  function selectQuickAmount(quickAmount: string) {
    setAmount(quickAmount);
    setIsCustomAmount(false);
    setError("");
  }

  function selectCustomAmount() {
    setIsCustomAmount(true);
    setAmount("");
    setError("");
    requestAnimationFrame(() => amountInputRef.current?.focus());
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/give/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, donorEmail: donorEmail.trim() || undefined }),
      });
      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Unable to start checkout.");
      }

      window.location.assign(data.url);
    } catch (checkoutError) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "Unable to start checkout. Please try again."
      );
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-5 sm:p-6">
      <div className="space-y-5">
        <div>
          <label htmlFor="donation-amount" className="block text-sm font-semibold text-neutral-80">
            Gift amount
          </label>
          <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {QUICK_AMOUNTS.map((quickAmount) => (
              <button
                key={quickAmount}
                type="button"
                onClick={() => selectQuickAmount(quickAmount)}
                className={`h-11 rounded-full border text-sm font-semibold transition-colors ${
                  selectedQuickAmount === quickAmount
                    ? "border-brand bg-cyan-surface text-neutral-80"
                    : "border-neutral-30 bg-white text-neutral-50 hover:bg-neutral-10"
                }`}
              >
                {formatCurrencyLabel(quickAmount)}
              </button>
            ))}
            <button
              type="button"
              onClick={selectCustomAmount}
              className={`h-11 rounded-full border text-sm font-semibold transition-colors ${
                isCustomAmount
                  ? "border-brand bg-cyan-surface text-neutral-80"
                  : "border-neutral-30 bg-white text-neutral-50 hover:bg-neutral-10"
              }`}
            >
              Custom
            </button>
          </div>
          <div className="relative mt-3">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-neutral-45">
              $
            </span>
            <input
              ref={amountInputRef}
              id="donation-amount"
              inputMode="decimal"
              min="1"
              step="0.01"
              value={amount}
              onChange={(event) => {
                setAmount(event.target.value);
                setIsCustomAmount(true);
              }}
              className="h-12 w-full rounded-lg border border-neutral-30 bg-white pl-8 pr-4 text-base font-semibold text-neutral-80 outline-none transition-colors placeholder:text-neutral-40 focus:border-brand"
              placeholder="Enter any amount"
              aria-describedby={error ? "give-error" : undefined}
            />
          </div>
        </div>

        <div>
          <label htmlFor="donor-email" className="block text-sm font-semibold text-neutral-80">
            Email receipt
          </label>
          <input
            id="donor-email"
            type="email"
            value={donorEmail}
            onChange={(event) => setDonorEmail(event.target.value)}
            className="mt-2 h-12 w-full rounded-lg border border-neutral-30 bg-white px-4 text-base text-neutral-80 outline-none transition-colors placeholder:text-neutral-40 focus:border-brand"
            placeholder="you@example.com"
          />
        </div>

        {error && (
          <p id="give-error" className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <Button type="submit" variant="brand" size="lg" className="h-12 w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Opening Checkout
            </>
          ) : (
            <>
              <HeartHandshake className="h-4 w-4" />
              Give Securely
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
