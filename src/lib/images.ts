/**
 * Normalize an image URL so it is safe to pass to `next/image`.
 * Returns `null` for missing values, unresolved UploadThing placeholders,
 * or any other unrecognized format.
 */
export function normalizeImageUrl(
  url: string | null | undefined
): string | null {
  if (!url) return null;

  // Reject unresolved UploadThing placeholders. These should be replaced
  // with real UploadThing URLs before seeding, but if they leak through
  // we must not pass them to next/image.
  if (url.startsWith("UPLOADTHING:")) return null;

  // Allow absolute remote URLs and root-relative local paths.
  if (
    url.startsWith("https://") ||
    url.startsWith("http://") ||
    url.startsWith("/")
  ) {
    return url;
  }

  return null;
}
