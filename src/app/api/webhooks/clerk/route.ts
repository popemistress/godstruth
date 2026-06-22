import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No webhook secret" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: { type: string; data: { id: string; email_addresses: Array<{ email_address: string }>; first_name?: string; last_name?: string } };

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as typeof evt;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { type, data } = evt;
  const clerkId = data.id;
  const email = data.email_addresses[0]?.email_address ?? "";
  const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;

  if (type === "user.created") {
    // Check if email already exists (migration from NextAuth)
    const existing = email ? await db.user.findUnique({ where: { email } }) : null;
    if (existing) {
      await db.user.update({ where: { id: existing.id }, data: { clerkId } });
    } else {
      await db.user.create({ data: { clerkId, email, name } });
    }
  }

  if (type === "user.updated") {
    await db.user.updateMany({ where: { clerkId }, data: { name } });
  }

  if (type === "user.deleted") {
    // Soft delete — just remove the clerkId link, keep data
    await db.user.updateMany({ where: { clerkId }, data: { clerkId: null } });
  }

  return NextResponse.json({ received: true });
}
