import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

function decodeJwtPayload(token: string): Record<string, unknown> {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT");
  const payload = Buffer.from(parts[1], "base64url").toString("utf-8");
  return JSON.parse(payload) as Record<string, unknown>;
}

export async function POST(request: NextRequest) {
  let body: URLSearchParams;
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await request.text();
    body = new URLSearchParams(text);
  } else {
    const json = await request.json() as Record<string, string>;
    body = new URLSearchParams(json);
  }

  const state = body.get("state") ?? "";
  const idToken = body.get("id_token") ?? "";

  if (!state || !idToken) {
    return NextResponse.json({ error: "Missing state or id_token" }, { status: 400 });
  }

  // Look up the launch
  const launch = await db.ltiLaunch.findUnique({ where: { state } });
  if (!launch) {
    return NextResponse.json({ error: "Invalid state" }, { status: 400 });
  }
  if (launch.completed) {
    return NextResponse.json({ error: "Launch already used" }, { status: 400 });
  }
  if (new Date() > launch.expiresAt) {
    return NextResponse.json({ error: "Launch expired" }, { status: 400 });
  }

  // Decode the JWT (no signature verification for now)
  let claims: Record<string, unknown>;
  try {
    claims = decodeJwtPayload(idToken);
  } catch {
    return NextResponse.json({ error: "Invalid id_token" }, { status: 400 });
  }

  const messageType = claims["https://purl.imsglobal.org/spec/lti/claim/message_type"] as string;
  const roles = (claims["https://purl.imsglobal.org/spec/lti/claim/roles"] as string[]) ?? [];
  const resourceLink = claims["https://purl.imsglobal.org/spec/lti/claim/resource_link"] as Record<string, string> | undefined;
  const name = claims.name as string | undefined;
  const email = claims.email as string | undefined;
  const sub = claims.sub as string | undefined;

  // Mark launch as completed
  await db.ltiLaunch.update({
    where: { id: launch.id },
    data: { completed: true },
  });

  const provider = await db.ltiProvider.findUnique({ where: { id: launch.providerId } });
  const resourceUrl = resourceLink?.id ?? launch.resourceUrl ?? "/";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>LTI Launch — Gods Truth</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #f0fdf4; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
    .card { background: white; border-radius: 1rem; padding: 2rem; max-width: 500px; width: 100%; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
    h1 { color: #14532d; font-size: 1.25rem; margin: 0 0 1rem; }
    .meta { font-size: 0.875rem; color: #6b7280; margin-bottom: 0.5rem; }
    .pill { display: inline-block; background: #d1fae5; color: #065f46; font-size: 0.75rem; padding: 0.2em 0.6em; border-radius: 9999px; margin-right: 0.25rem; margin-bottom: 0.25rem; }
    a.btn { display: inline-block; margin-top: 1.5rem; background: #16a34a; color: white; padding: 0.65rem 1.5rem; border-radius: 0.5rem; text-decoration: none; font-weight: 600; font-size: 0.9rem; }
  </style>
</head>
<body>
  <div class="card">
    <h1>LTI Launch Successful</h1>
    <div class="meta"><strong>Tool:</strong> ${provider?.name ?? "Unknown"}</div>
    ${name ? `<div class="meta"><strong>User:</strong> ${name}${email ? ` (${email})` : ""}</div>` : ""}
    ${sub ? `<div class="meta"><strong>LTI Sub:</strong> ${sub}</div>` : ""}
    ${messageType ? `<div class="meta"><strong>Message Type:</strong> ${messageType}</div>` : ""}
    ${roles.length > 0 ? `<div class="meta"><strong>Roles:</strong><br>${roles.map((r) => `<span class="pill">${r.split("#").pop()}</span>`).join("")}</div>` : ""}
    ${resourceLink?.title ? `<div class="meta"><strong>Resource:</strong> ${resourceLink.title}</div>` : ""}
    <a href="${resourceUrl.startsWith("http") ? resourceUrl : "/"}" class="btn">Continue to Content</a>
  </div>
</body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });
}
