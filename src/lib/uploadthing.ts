import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getCurrentDbUser } from "@/lib/clerk-user";
import { UploadThingError, UTApi, UTFile } from "uploadthing/server";
import sharp from "sharp";

const f = createUploadthing();
const utapi = new UTApi();

// Download an uploaded image, compress with sharp, re-upload, delete original.
// Returns the new compressed file's URL.
async function compressAndReplace(
  fileUrl: string,
  fileKey: string,
  originalName: string
): Promise<string> {
  try {
    const res = await fetch(fileUrl);
    if (!res.ok) return fileUrl; // fallback — serve original if download fails
    const raw = Buffer.from(await res.arrayBuffer());

    const compressed = await sharp(raw)
      .resize({ width: 2000, withoutEnlargement: true })
      .jpeg({ quality: 88, mozjpeg: true })
      .toBuffer();

    // Only replace if we actually saved bytes
    if (compressed.length >= raw.length) return fileUrl;

    const ext = originalName.split(".").pop() ?? "jpg";
    const newName = originalName.replace(new RegExp(`\\.${ext}$`, "i"), "-c.jpg");
    const file = new UTFile([compressed as unknown as BlobPart], newName, { type: "image/jpeg" });
    const result = await utapi.uploadFiles(file);

    if (result.error) return fileUrl; // fallback on upload error

    // Delete the original uncompressed file
    await utapi.deleteFiles([fileKey]).catch(() => {});

    const newUrl = result.data.ufsUrl ?? result.data.url;
    const savedPct = (((raw.length - compressed.length) / raw.length) * 100).toFixed(0);
    console.log(`Image compressed: ${(raw.length / 1024).toFixed(0)}KB → ${(compressed.length / 1024).toFixed(0)}KB (-${savedPct}%)`);
    return newUrl;
  } catch {
    return fileUrl; // always fall back to original on any error
  }
}

async function requireAdmin() {
  const user = await getCurrentDbUser();
  if (!user) throw new UploadThingError("Unauthorized");
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
      const url = await compressAndReplace(file.url, file.key, file.name);
      return { uploadedBy: metadata.id, url };
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
      const url = await compressAndReplace(file.url, file.key, file.name);
      return { uploadedBy: metadata.id, url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
