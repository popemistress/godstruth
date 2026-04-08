import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { stripe, PLANS } from "@/lib/stripe";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const plan = req.nextUrl.searchParams.get("plan") as "SUPPORTER" | "PARTNER" | null;
  if (!plan || !PLANS[plan]?.stripePriceId) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const [user, subscription] = await Promise.all([
    db.user.findUnique({ where: { id: session.user.id } }),
    db.subscription.findUnique({ where: { userId: session.user.id } }),
  ]);
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    client_reference_id: user.id,
    customer: subscription?.stripeCustomerId ?? undefined,
    customer_email: subscription?.stripeCustomerId ? undefined : (user.email ?? undefined),
    line_items: [{ price: PLANS[plan].stripePriceId!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings`,
  });

  return NextResponse.redirect(checkoutSession.url!);
}
