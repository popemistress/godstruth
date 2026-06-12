import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const MIN_DONATION_CENTS = 100;
const MAX_DONATION_CENTS = 10000000;

function parseDonationAmount(value: unknown): number | null {
  if (typeof value !== "string") return null;

  const normalized = value.trim().replace(/^\$/, "");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;

  const cents = Math.round(Number(normalized) * 100);
  if (!Number.isSafeInteger(cents)) return null;
  if (cents < MIN_DONATION_CENTS || cents > MAX_DONATION_CENTS) return null;

  return cents;
}

function getCheckoutOrigin(req: NextRequest): string {
  const forwardedHost = req.headers.get("x-forwarded-host");
  const host = forwardedHost ?? req.headers.get("host") ?? req.nextUrl.host;
  const forwardedProto = req.headers.get("x-forwarded-proto");
  const isLocalHost = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const protocol = isLocalHost ? "http" : forwardedProto ?? req.nextUrl.protocol.replace(":", "");

  return `${protocol}://${host}`;
}

export async function POST(req: NextRequest) {
  let body: { amount?: unknown; donorEmail?: unknown };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Enter a valid donation amount." }, { status: 400 });
  }

  const amountInCents = parseDonationAmount(body.amount);
  if (!amountInCents) {
    return NextResponse.json({ error: "Enter a donation amount of at least $1.00." }, { status: 400 });
  }

  const origin = getCheckoutOrigin(req);
  const donorEmail =
    typeof body.donorEmail === "string" && body.donorEmail.includes("@")
      ? body.donorEmail.trim()
      : undefined;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card", "klarna"],
    submit_type: "donate",
    customer_email: donorEmail,
    billing_address_collection: "required",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amountInCents,
          product_data: {
            name: "Gift to Gods Truth",
            description: "A one-time gift supporting free Bible teaching and study resources.",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      purpose: "one_time_gift",
      source: "give_page",
    },
    success_url: `${origin}/give?success=1&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/give?canceled=1`,
  });

  return NextResponse.json({ url: checkoutSession.url });
}
