"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { ContentType, Role } from "@prisma/client";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session.user;
}

export async function createContent(formData: FormData) {
  await requireAdmin();

  const title = formData.get("title") as string;
  const type = formData.get("type") as ContentType;
  const description = (formData.get("description") as string) || "";
  const mediaUrl = (formData.get("fileUrl") as string) || null;
  const thumbnail = (formData.get("thumbnailUrl") as string) || null;
  const premium = formData.get("premium") === "on";
  const published = formData.get("published") === "on";
  const duration = formData.get("durationSeconds") ? Number(formData.get("durationSeconds")) : null;

  await db.content.create({
    data: { title, slug: slugify(title), type, description, mediaUrl, thumbnail, premium, published, duration },
  });

  revalidatePath("/admin/content");
  revalidatePath("/knowledge");
  redirect("/admin/content");
}

export async function updateContent(formData: FormData) {
  await requireAdmin();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || "";
  const mediaUrl = (formData.get("fileUrl") as string) || null;
  const thumbnail = (formData.get("thumbnailUrl") as string) || null;
  const premium = formData.get("premium") === "on";
  const published = formData.get("published") === "on";
  const duration = formData.get("durationSeconds") ? Number(formData.get("durationSeconds")) : null;

  const existing = await db.content.findUnique({ where: { id } });
  if (!existing) throw new Error("Not found");

  await db.content.update({
    where: { id },
    data: {
      title,
      description,
      mediaUrl: mediaUrl ?? existing.mediaUrl,
      thumbnail: thumbnail ?? existing.thumbnail,
      premium,
      published,
      duration,
    },
  });

  revalidatePath("/admin/content");
  revalidatePath(`/knowledge/${existing.slug}`);
  redirect("/admin/content");
}

export async function deleteContent(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id") as string;
  await db.content.delete({ where: { id } });
  revalidatePath("/admin/content");
  revalidatePath("/knowledge");
}

export async function updateUserRole(formData: FormData) {
  await requireAdmin();
  const userId = formData.get("userId") as string;
  const role = formData.get("role") as Role;
  await db.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
}

export async function updateSiteSettings(formData: FormData) {
  await requireAdmin();

  const siteName = formData.get("siteName") as string;
  const tagline = formData.get("tagline") as string;
  const announcementBar = (formData.get("announcementBar") as string) || null;
  const announcementUrl = (formData.get("announcementUrl") as string) || null;
  const maintenanceMode = formData.get("maintenanceMode") === "on";

  await db.siteSettings.upsert({
    where: { id: "singleton" },
    create: { id: "singleton", siteName, tagline, announcementBar, announcementUrl, maintenanceMode },
    update: { siteName, tagline, announcementBar, announcementUrl, maintenanceMode },
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");
}
