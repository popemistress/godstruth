import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-24.acacia",
  typescript: true,
});

export const PLANS = {
  FREE: {
    name: "Free",
    description: "Access to all free content",
    price: 0,
    stripePriceId: null,
    features: ["All free videos", "Free study guides", "Podcast access"],
  },
  SUPPORTER: {
    name: "Supporter",
    description: "Support the mission + premium access",
    price: 5,
    stripePriceId: process.env.STRIPE_SUPPORTER_PRICE_ID,
    features: ["Everything in Free", "Premium courses", "Offline downloads", "Ad-free experience"],
  },
  PARTNER: {
    name: "Partner",
    description: "Full access + exclusive content",
    price: 15,
    stripePriceId: process.env.STRIPE_PARTNER_PRICE_ID,
    features: ["Everything in Supporter", "Early access to new content", "Monthly Q&A sessions", "Direct support email"],
  },
} as const;
