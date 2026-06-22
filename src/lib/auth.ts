// Compatibility shim — kept during migration from NextAuth to Clerk.
// Any file that still imports from @/lib/auth will get Clerk exports.
export { auth, currentUser } from "@clerk/nextjs/server";
