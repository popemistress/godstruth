"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/lib/uploadthing";

interface UploadZoneProps {
  endpoint: keyof OurFileRouter;
  onUploadComplete: (url: string) => void;
  label?: string;
}

export function UploadZone({ endpoint, onUploadComplete, label }: UploadZoneProps) {
  return (
    <div className="border-2 border-dashed border-neutral-30 rounded-xl p-6 text-center hover:border-neutral-40 transition-colors">
      {label && <p className="text-sm text-neutral-45 mb-3">{label}</p>}
      <UploadButton<OurFileRouter, typeof endpoint>
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          if (res?.[0]?.url) onUploadComplete(res[0].url);
        }}
        onUploadError={(err) => console.error("Upload error:", err)}
        appearance={{
          button: "btn-primary text-sm",
          allowedContent: "text-xs text-neutral-45",
        }}
      />
    </div>
  );
}
