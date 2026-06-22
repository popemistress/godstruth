import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import JSZip from "jszip";

const MIME_MAP: Record<string, string> = {
  html: "text/html",
  htm:  "text/html",
  js:   "application/javascript",
  css:  "text/css",
  json: "application/json",
  xml:  "application/xml",
  png:  "image/png",
  jpg:  "image/jpeg",
  jpeg: "image/jpeg",
  gif:  "image/gif",
  svg:  "image/svg+xml",
  mp4:  "video/mp4",
  mp3:  "audio/mpeg",
  pdf:  "application/pdf",
  txt:  "text/plain",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const packageId = searchParams.get("packageId");
  const path = searchParams.get("path");

  if (!packageId || !path) {
    return NextResponse.json({ error: "packageId and path are required" }, { status: 400 });
  }

  const scormPkg = await db.scormPackage.findUnique({ where: { id: packageId } });
  if (!scormPkg) {
    return NextResponse.json({ error: "Package not found" }, { status: 404 });
  }

  // Download ZIP from UploadThing URL
  const zipRes = await fetch(scormPkg.zipUrl);
  if (!zipRes.ok) {
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 502 });
  }

  const arrayBuffer = await zipRes.arrayBuffer();
  const zip = await JSZip.loadAsync(arrayBuffer);

  const file = zip.file(path);
  if (!file) {
    return NextResponse.json({ error: `File not found in package: ${path}` }, { status: 404 });
  }

  const content = await file.async("nodebuffer");
  const ext = path.split(".").pop()?.toLowerCase() ?? "bin";
  const contentType = MIME_MAP[ext] ?? "application/octet-stream";

  return new NextResponse(content as unknown as BodyInit, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
