import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ScormViewer } from "@/components/scorm/ScormViewer";

interface Props {
  params: Promise<{ packageId: string }>;
}

export default async function ScormPage({ params }: Props) {
  const { packageId } = await params;

  const pkg = await db.scormPackage.findUnique({ where: { id: packageId } });
  if (!pkg || !pkg.published) notFound();

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <div className="bg-gray-800 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
        <h1 className="text-white font-semibold text-sm">{pkg.title}</h1>
        <span className="text-xs text-gray-400">SCORM {pkg.version}</span>
      </div>
      <div className="flex-1">
        <ScormViewer packageId={pkg.id} entryPoint={pkg.entryPoint ?? "index.html"} />
      </div>
    </div>
  );
}
