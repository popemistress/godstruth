import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

function checkBasicAuth(request: NextRequest): boolean {
  const xapiKey = process.env.XAPI_KEY;
  const xapiSecret = process.env.XAPI_SECRET;
  if (!xapiKey) return false; // env not set — fall through to session auth

  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Basic ")) return false;

  const b64 = authHeader.slice(6);
  const decoded = Buffer.from(b64, "base64").toString("utf-8");
  const [user, pass] = decoded.split(":");
  return user === xapiKey && pass === (xapiSecret ?? "");
}

async function resolveAuth(request: NextRequest): Promise<{ ok: boolean; userId?: string }> {
  // Try Basic auth first
  const xapiKey = process.env.XAPI_KEY;
  if (xapiKey) {
    if (checkBasicAuth(request)) return { ok: true };
    return { ok: false };
  }
  // Fall back to NextAuth session
  const session = await auth();
  if (session?.user) return { ok: true, userId: session.user.id };
  return { ok: false };
}

function extractUserId(actor: Record<string, unknown>): string | undefined {
  const mbox = actor.mbox as string | undefined;
  if (mbox?.startsWith("mailto:")) return mbox.slice(7);
  return undefined;
}

export async function POST(request: NextRequest) {
  const auth_result = await resolveAuth(request);
  if (!auth_result.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const statements = Array.isArray(body) ? body : [body];
  const ids: string[] = [];

  for (const stmt of statements) {
    if (!stmt || typeof stmt !== "object") continue;
    const s = stmt as Record<string, unknown>;

    if (!s.actor || !s.verb || !s.object) {
      return NextResponse.json({ error: "Missing required fields: actor, verb, object" }, { status: 400 });
    }

    const id = (s.id as string | undefined) ?? crypto.randomUUID();
    const actor = s.actor as Record<string, unknown>;
    const userId = auth_result.userId ?? extractUserId(actor);

    await db.xApiStatement.create({
      data: {
        id,
        userId: userId ?? null,
        actor: actor as object,
        verb: s.verb as object,
        object: s.object as object,
        result: (s.result as object | undefined) ?? undefined,
        context: (s.context as object | undefined) ?? undefined,
        version: (s.version as string | undefined) ?? "1.0.3",
        voided: false,
      },
    });
    ids.push(id);
  }

  return NextResponse.json(ids);
}

export async function GET(request: NextRequest) {
  const auth_result = await resolveAuth(request);
  if (!auth_result.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const statementId = searchParams.get("statementId");

  if (statementId) {
    const stmt = await db.xApiStatement.findUnique({ where: { id: statementId } });
    if (!stmt) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ statements: [stmt], more: "" });
  }

  // Build filters
  const where: Record<string, unknown> = { voided: false };

  const agentParam = searchParams.get("agent");
  if (agentParam) {
    try {
      const agent = JSON.parse(agentParam) as { mbox?: string; name?: string };
      if (agent.mbox) {
        where.actor = { path: ["mbox"], equals: agent.mbox };
      }
    } catch { /* ignore */ }
  }

  const verbParam = searchParams.get("verb");
  if (verbParam) {
    where.verb = { path: ["id"], equals: verbParam };
  }

  const activityParam = searchParams.get("activity");
  if (activityParam) {
    where.object = { path: ["id"], equals: activityParam };
  }

  const since = searchParams.get("since");
  const until = searchParams.get("until");
  if (since || until) {
    where.stored = {
      ...(since ? { gte: new Date(since) } : {}),
      ...(until ? { lte: new Date(until) } : {}),
    };
  }

  const limit = Math.min(parseInt(searchParams.get("limit") ?? "50", 10), 200);
  const ascending = searchParams.get("ascending") === "true";

  const statements = await db.xApiStatement.findMany({
    where,
    orderBy: { stored: ascending ? "asc" : "desc" },
    take: limit,
  });

  return NextResponse.json({ statements, more: "" });
}
