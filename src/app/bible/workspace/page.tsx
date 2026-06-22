import { Suspense } from "react";
import BibleWorkspace from "@/components/bible/workspace/BibleWorkspace";

export const metadata = {
  title: "Bible Study Workspace | GodsTruth",
  description:
    "Read, highlight, and study Scripture with notes, parallel translations, and word studies.",
};

export default function WorkspacePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-400">Loading workspace…</div>}>
      <BibleWorkspace />
    </Suspense>
  );
}
