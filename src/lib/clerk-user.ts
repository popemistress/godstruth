import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

// Returns the internal DB user ID for the current Clerk session, or null.
// Lazily creates the DB User record on first call (links by clerkId, falls
// back to email match to absorb existing users migrated from NextAuth).
export async function getCurrentUserId(): Promise<string | null> {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;
  return getDbUserId(clerkId);
}

export async function getDbUserId(clerkId: string): Promise<string | null> {
  const user = await db.user.findFirst({ where: { clerkId } });
  if (user) return user.id;

  // Lazy provisioning — fetch full profile from Clerk
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  // Try to adopt existing DB user by email (NextAuth migration)
  const existing = email ? await db.user.findUnique({ where: { email } }) : null;
  if (existing) {
    await db.user.update({ where: { id: existing.id }, data: { clerkId } });
    return existing.id;
  }

  // Create new DB user
  const created = await db.user.create({
    data: { clerkId, email, name },
  });
  return created.id;
}

// Returns the full DB user (with role) — useful for admin checks.
export async function getCurrentDbUser() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await db.user.findFirst({ where: { clerkId } });
  if (user) return user;

  // Lazy provision (same logic as getDbUserId but returns the full user)
  const clerkUser = await currentUser();
  if (!clerkUser) return null;

  const email = clerkUser.emailAddresses[0]?.emailAddress ?? "";
  const name = [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") || null;

  const existing = email ? await db.user.findUnique({ where: { email } }) : null;
  if (existing) {
    return db.user.update({ where: { id: existing.id }, data: { clerkId } });
  }

  return db.user.create({ data: { clerkId, email, name } });
}
