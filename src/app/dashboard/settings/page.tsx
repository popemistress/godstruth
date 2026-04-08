import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS } from "@/lib/stripe";
import { Check } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Account Settings" };

export default async function AccountSettingsPage() {
  const session = await auth();
  if (!session?.user) return null;

  const [user, subscription] = await Promise.all([
    db.user.findUnique({ where: { id: session.user.id } }),
    db.subscription.findUnique({ where: { userId: session.user.id } }),
  ]);
  if (!user) return null;

  const currentPlan = subscription?.plan ?? "FREE";

  return (
    <div className="max-w-2xl">
      <h1 className="font-serif text-2xl font-bold text-neutral-80 mb-8">Account Settings</h1>

      {/* Current plan */}
      <section className="bg-white rounded-xl border border-neutral-20 p-6 mb-6">
        <h2 className="font-semibold text-neutral-80 mb-4">Membership</h2>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="font-medium text-neutral-80">{PLANS[currentPlan as keyof typeof PLANS]?.name ?? currentPlan}</p>
            <p className="text-sm text-neutral-45">
              {currentPlan === "FREE" ? "Free access" : `$${PLANS[currentPlan as keyof typeof PLANS]?.price}/month`}
            </p>
          </div>
          <Badge variant={currentPlan === "FREE" ? "secondary" : "premium"}>{currentPlan}</Badge>
        </div>
        {subscription?.currentPeriodEnd && (
          <p className="text-xs text-neutral-45 mb-4">
            {subscription.status === "CANCELED" ? "Expires" : "Renews"} on{" "}
            {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
          </p>
        )}
      </section>

      {/* Upgrade plans */}
      {currentPlan === "FREE" && (
        <section className="mb-6">
          <h2 className="font-semibold text-neutral-80 mb-4">Upgrade</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {(["SUPPORTER", "PARTNER"] as const).map((planKey) => {
              const plan = PLANS[planKey];
              return (
                <div key={planKey} className="bg-white rounded-xl border border-neutral-20 p-5">
                  <p className="font-semibold text-neutral-80 mb-1">{plan.name}</p>
                  <p className="text-2xl font-bold text-neutral-80 mb-3">
                    ${plan.price}<span className="text-sm font-normal text-neutral-45">/mo</span>
                  </p>
                  <ul className="space-y-1.5 mb-5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-neutral-60">
                        <Check className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <Link href={`/api/checkout?plan=${planKey}`}>Choose {plan.name}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Account info */}
      <section className="bg-white rounded-xl border border-neutral-20 p-6">
        <h2 className="font-semibold text-neutral-80 mb-4">Account</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-neutral-45">Name</span>
            <span className="text-neutral-80 font-medium">{user.name ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-45">Email</span>
            <span className="text-neutral-80 font-medium">{user.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-45">Role</span>
            <span className="text-neutral-80 font-medium">{user.role}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
