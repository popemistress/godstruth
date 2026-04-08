"use client";

import { ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFViewerProps {
  url: string;
  title?: string;
}

export function PDFViewer({ url, title }: PDFViewerProps) {
  return (
    <div className="border border-neutral-20 rounded-xl overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-neutral-10 border-b border-neutral-20">
        <span className="text-sm font-medium text-neutral-80 line-clamp-1">{title ?? "Document"}</span>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <ExternalLink className="h-3.5 w-3.5" /> Open
            </a>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <a href={url} download className="flex items-center gap-1.5">
              <Download className="h-3.5 w-3.5" /> Download
            </a>
          </Button>
        </div>
      </div>
      <iframe
        src={`${url}#toolbar=0`}
        className="w-full h-[600px] md:h-[800px]"
        title={title ?? "PDF Viewer"}
      />
    </div>
  );
}
