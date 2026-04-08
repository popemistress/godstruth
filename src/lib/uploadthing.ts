import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/lib/auth";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

async function requireAuth() {
  const session = await auth();
  if (!session?.user) throw new UploadThingError("Unauthorized");
  return session.user;
}

async function requireAdmin() {
  const user = await requireAuth();
  if (user.role !== "ADMIN") throw new UploadThingError("Admin only");
  return user;
}

export const ourFileRouter = {
  // Admin: upload video content
  videoUploader: f({ video: { maxFileSize: "4GB", maxFileCount: 1 } })
    .middleware(() => requireAdmin())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Video uploaded by:", metadata.id, "url:", file.url);
      return { uploadedBy: metadata.id, url: file.url };
    }),

  // Admin: upload PDF / ebook
  documentUploader: f({ pdf: { maxFileSize: "64MB", maxFileCount: 1 } })
    .middleware(() => requireAdmin())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Document uploaded:", file.url);
      return { uploadedBy: metadata.id, url: file.url };
    }),

  // Admin: upload thumbnail / cover image
  imageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(() => requireAdmin())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Image uploaded:", file.url);
      return { uploadedBy: metadata.id, url: file.url };
    }),

  // Admin: upload audio (podcast)
  audioUploader: f({ audio: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(() => requireAdmin())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Audio uploaded:", file.url);
      return { uploadedBy: metadata.id, url: file.url };
    }),

  // Admin: upload Bible PDF
  bibleUploader: f({ pdf: { maxFileSize: "512MB", maxFileCount: 1 } })
    .middleware(() => requireAdmin())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Bible PDF uploaded:", file.url);
      return { uploadedBy: metadata.id, url: file.url };
    }),

  // Admin: upload Bible cover image
  bibleCoverUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(() => requireAdmin())
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Bible cover uploaded:", file.url);
      return { uploadedBy: metadata.id, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
