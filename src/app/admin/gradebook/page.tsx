import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import type { Grade } from "@prisma/client";
import { AdminGradebookClient } from "./AdminGradebookClient";

export default async function AdminGradebookPage() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/");

  const grades = await db.grade.findMany({
    orderBy: { gradedAt: "desc" },
    take: 500,
  });

  // Get user info for the grade records
  const userIds = [...new Set(grades.map((g) => g.userId))];
  const users = await db.user.findMany({
    where: { id: { in: userIds } },
    select: { id: true, name: true, email: true },
  });
  const userMap = Object.fromEntries(users.map((u) => [u.id, u]));

  const gradesWithUser = grades.map((g: Grade) => ({
    ...g,
    userName: userMap[g.userId]?.name ?? "Unknown",
    userEmail: userMap[g.userId]?.email ?? g.userId,
  }));

  return <AdminGradebookClient grades={gradesWithUser} />;
}
