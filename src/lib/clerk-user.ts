import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// Shared provisioning logic — race-safe via try/catch on unique constraint.
async function provisionUser(clerkId: string) {
  // Fast path: already linked
  const linked = await db.user.findFirst({ where: { clerkId } });
  if (linked) return linked;

  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  // Try to adopt existing DB user by email (NextAuth / seed migration)
  if (email) {
    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      // Only update clerkId if not already claimed by another Clerk user
      if (!existing.clerkId) {
        return db.user.update({ where: { id: existing.id }, data: { clerkId } });
      }
      return existing;
    }
  }

  // Create new user — catch race condition where two parallel requests both reach here
  try {
    return await db.user.create({ data: { clerkId, email, name } });
  } catch (err: unknown) {
    // P2002 = unique constraint violation (email or clerkId race)
    if ((err as { code?: string })?.code === "P2002") {
      const recovered = email
        ? await db.user.findUnique({ where: { email } })
        : await db.user.findFirst({ where: { clerkId } });
      if (recovered && !recovered.clerkId) {
        return db.user.update({ where: { id: recovered.id }, data: { clerkId } });
      }
      return recovered;
    }
    throw err;
  }
}

// Returns the internal DB user ID for the current Clerk session, or null.
export async function getCurrentUserId(): Promise<string | null> {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  const user = await provisionUser(clerkId);
  return user?.id ?? null;
}

export async function getDbUserId(clerkId: string): Promise<string | null> {
  const user = await provisionUser(clerkId);
  return user?.id ?? null;
}

// Returns the full DB user — useful for admin checks and profile pages.
export async function getCurrentDbUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  return provisionUser(clerkId);
}

// Type helper for pages that need the full user
export type DbUser = NonNullable<Awaited<ReturnType<typeof getCurrentDbUser>>>;
