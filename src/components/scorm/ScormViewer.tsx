"use client";

import { useEffect, useRef, useState } from "react";

interface ScormViewerProps {
  packageId: string;
  entryPoint: string;
  onComplete?: () => void;
  onScore?: (score: number) => void;
}

export function ScormViewer({ packageId, entryPoint, onComplete, onScore }: ScormViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [scormData, setScormData] = useState<Record<string, string>>({});
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    startTimeRef.current = Date.now();

    // SCORM 1.2 API
    (window as unknown as Record<string, unknown>).API = {
      LMSInitialize: (_: string) => {
        startTimeRef.current = Date.now();
        return "true";
      },
      LMSFinish: (_: string) => {
        onComplete?.();
        return "true";
      },
      LMSGetValue: (element: string) => {
        return scormData[element] ?? "";
      },
      LMSSetValue: (element: string, value: string) => {
        setScormData((prev) => ({ ...prev, [element]: value }));
        if (element === "cmi.core.lesson_status" && (value === "completed" || value === "passed")) {
          onComplete?.();
        }
        if (element === "cmi.core.score.raw") {
          onScore?.(parseFloat(value));
        }
        return "true";
      },
      LMSCommit: (_: string) => "true",
      LMSGetLastError: () => "0",
      LMSGetErrorString: (_: string) => "No Error",
      LMSGetDiagnostic: (_: string) => "",
    };

    // SCORM 2004 API
    (window as unknown as Record<string, unknown>).API_1484_11 = {
      Initialize: (window as unknown as Record<string, unknown>).API,
      Terminate: (window as unknown as Record<string, unknown>).API,
      GetValue: (element: string) => scormData[element] ?? "",
      SetValue: (element: string, value: string) => {
        setScormData((prev) => ({ ...prev, [element]: value }));
        if (element === "cmi.completion_status" && (value === "completed" || value === "passed")) {
          onComplete?.();
        }
        if (element === "cmi.score.raw") {
          onScore?.(parseFloat(value));
        }
        return "true";
      },
      Commit: (_: string) => "true",
      GetLastError: () => "0",
      GetErrorString: (_: string) => "No Error",
      GetDiagnostic: (_: string) => "",
    };

    return () => {
      delete (window as unknown as Record<string, unknown>).API;
      delete (window as unknown as Record<string, unknown>).API_1484_11;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const src = `/api/scorm/file?packageId=${encodeURIComponent(packageId)}&path=${encodeURIComponent(entryPoint)}`;

  return (
    <iframe
      ref={iframeRef}
      src={src}
      className="w-full h-full border-0"
      style={{ minHeight: "calc(100vh - 56px)" }}
      title="SCORM Content"
      allow="fullscreen"
    />
  );
}
