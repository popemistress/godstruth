import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUserId } from "@/lib/clerk-user";

export async function POST(request: NextRequest) {
  const userId = await getCurrentUserId();

  let body: URLSearchParams;
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await request.text();
    body = new URLSearchParams(text);
  } else {
    const json = await request.json() as Record<string, string>;
    body = new URLSearchParams(json);
  }

  const iss = body.get("iss") ?? "";
  const loginHint = body.get("login_hint") ?? "";
  const targetLinkUri = body.get("target_link_uri") ?? "";
  const ltiMessageHint = body.get("lti_message_hint") ?? "";
  const clientId = body.get("client_id") ?? "";

  if (!iss || !clientId) {
    return NextResponse.json({ error: "Missing iss or client_id" }, { status: 400 });
  }

  const provider = await db.ltiProvider.findFirst({
    where: { clientId, issuer: iss, enabled: true },
  });

  if (!provider) {
    return NextResponse.json({ error: "Unknown LTI provider" }, { status: 404 });
  }

  const nonce = crypto.randomUUID();
  const state = crypto.randomUUID();
  const dbUserId = userId ?? "anonymous";

  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.ltiLaunch.create({
    data: {
      providerId: provider.id,
      userId: dbUserId,
      nonce,
      state,
      resourceUrl: targetLinkUri || null,
      expiresAt,
    },
  });

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const redirectUri = `${appUrl}/api/lti/launch`;

  const authUrl = new URL(provider.oidcUrl);
  authUrl.searchParams.set("scope", "openid");
  authUrl.searchParams.set("response_type", "id_token");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("login_hint", loginHint);
  if (ltiMessageHint) authUrl.searchParams.set("lti_message_hint", ltiMessageHint);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("response_mode", "form_post");
  authUrl.searchParams.set("nonce", nonce);
  authUrl.searchParams.set("prompt", "none");

  return NextResponse.redirect(authUrl.toString());
}
