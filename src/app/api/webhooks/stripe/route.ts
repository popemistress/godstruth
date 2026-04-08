import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import type Stripe from "stripe";
import type { Plan, SubStatus } from "@prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = sub.customer as string;
      const priceId = sub.items.data[0]?.price.id;
      const status = sub.status.toUpperCase() as SubStatus;

      const plan: Plan =
        priceId === process.env.STRIPE_PARTNER_PRICE_ID
          ? "PARTNER"
          : priceId === process.env.STRIPE_SUPPORTER_PRICE_ID
            ? "SUPPORTER"
            : "FREE";

      const periodEnd = new Date((sub as unknown as { current_period_end: number }).current_period_end * 1000);

      await db.subscription.upsert({
        where: { stripeCustomerId: customerId },
        create: {
          stripeCustomerId: customerId,
          stripePriceId: priceId ?? "",
          stripeSubscriptionId: sub.id,
          status,
          plan,
          currentPeriodEnd: periodEnd,
          user: { connect: { id: "" } }, // will be set via checkout.session.completed
        },
        update: {
          stripePriceId: priceId ?? "",
          stripeSubscriptionId: sub.id,
          status,
          plan,
          currentPeriodEnd: periodEnd,
        },
      });
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId = sub.customer as string;
      await db.subscription.updateMany({
        where: { stripeCustomerId: customerId },
        data: { status: "CANCELED", plan: "FREE" },
      });
      break;
    }

    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription" && session.customer && session.client_reference_id) {
        const customerId = session.customer as string;
        const userId = session.client_reference_id;

        // Link or create the subscription record with the correct user
        await db.subscription.upsert({
          where: { stripeCustomerId: customerId },
          create: {
            stripeCustomerId: customerId,
            stripePriceId: "",
            stripeSubscriptionId: session.subscription as string ?? "",
            status: "ACTIVE",
            plan: "FREE",
            currentPeriodEnd: new Date(),
            user: { connect: { id: userId } },
          },
          update: {
            user: { connect: { id: userId } },
          },
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true });
}
