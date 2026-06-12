import { BookOpen, HeartHandshake, ShieldCheck } from "lucide-react";
import { GiveForm } from "@/components/marketing/GiveForm";

interface GivePageProps {
  searchParams?: {
    success?: string;
    canceled?: string;
  };
}

export default function GivePage({ searchParams }: GivePageProps) {
  const showSuccess = searchParams?.success === "1";
  const showCanceled = searchParams?.canceled === "1";

  return (
    <div className="bg-neutral-10">
      <section className="border-b border-neutral-20 bg-white">
        <div className="container-page py-12 md:py-16">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center">
            <div className="max-w-2xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-neutral-20 bg-cyan-surface px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-neutral-70">
                <HeartHandshake className="h-3.5 w-3.5 text-brand-accessible" />
                Giving
              </div>
              <h1 className="font-serif text-4xl font-bold leading-tight text-neutral-80 md:text-5xl">
                Help keep Gods Truth free and growing.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-45 md:text-lg">
                Your gift supports free Bible courses, study resources, and teaching tools for everyone who wants to grow in Scripture.
              </p>
            </div>

            <div>
              {showSuccess && (
                <div className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                  Thank you for your gift. Your support helps this work continue.
                </div>
              )}
              {showCanceled && (
                <div className="mb-4 rounded-lg border border-neutral-30 bg-white px-4 py-3 text-sm font-medium text-neutral-60">
                  Your gift was not completed.
                </div>
              )}
              <GiveForm />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-8 md:py-10">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="card p-5">
            <BookOpen className="h-5 w-5 text-brand-accessible" />
            <h2 className="mt-4 text-base font-semibold text-neutral-80">Free teaching</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-45">
              Courses and Bible study resources remain available without a paywall.
            </p>
          </div>
          <div className="card p-5">
            <HeartHandshake className="h-5 w-5 text-brand-accessible" />
            <h2 className="mt-4 text-base font-semibold text-neutral-80">Faithful support</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-45">
              Every gift helps cover hosting, tools, publishing, and continued improvements.
            </p>
          </div>
          <div className="card p-5">
            <ShieldCheck className="h-5 w-5 text-brand-accessible" />
            <h2 className="mt-4 text-base font-semibold text-neutral-80">Secure checkout</h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-45">
              Payments are processed through Stripe with encrypted checkout.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
