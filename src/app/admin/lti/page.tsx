import { getCurrentDbUser } from "@/lib/clerk-user";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import type { LtiProvider } from "@prisma/client";

async function createProvider(formData: FormData) {
  "use server";
  const user = await getCurrentDbUser();
  if (!user || user.role !== "ADMIN") return;

  const customParamsRaw = (formData.get("customParams") as string) ?? "";
  let customParams: Record<string, string> | null = null;
  if (customParamsRaw.trim()) {
    customParams = {};
    for (const line of customParamsRaw.split("\n")) {
      const [k, ...vs] = line.split("=");
      if (k) customParams[k.trim()] = vs.join("=").trim();
    }
  }

  await db.ltiProvider.create({
    data: {
      name: formData.get("name") as string,
      description: (formData.get("description") as string) || null,
      clientId: formData.get("clientId") as string,
      issuer: formData.get("issuer") as string,
      oidcUrl: formData.get("oidcUrl") as string,
      launchUrl: formData.get("launchUrl") as string,
      jwksUrl: formData.get("jwksUrl") as string,
      deepLinkUrl: (formData.get("deepLinkUrl") as string) || null,
      enabled: formData.get("enabled") === "on",
      customParams: customParams ?? undefined,
    },
  });
  revalidatePath("/admin/lti");
}

async function deleteProvider(formData: FormData) {
  "use server";
  const user = await getCurrentDbUser();
  if (!user || user.role !== "ADMIN") return;
  const id = formData.get("id") as string;
  await db.ltiProvider.delete({ where: { id } });
  revalidatePath("/admin/lti");
}

export default async function AdminLtiPage() {
  const user = await getCurrentDbUser();
  if (!user || user.role !== "ADMIN") redirect("/");

  const providers = await db.ltiProvider.findMany({ orderBy: { createdAt: "desc" } });
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">LTI 1.3 Tool Providers</h1>
        <p className="text-sm text-gray-500 mt-1">Manage external LTI tool integrations</p>
      </div>

      {/* Platform Config Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <h2 className="font-semibold text-blue-900 mb-3">Platform Configuration (share with tools)</h2>
        <div className="space-y-1 text-xs font-mono text-blue-800">
          <div><span className="font-semibold">Issuer:</span> {appUrl}</div>
          <div><span className="font-semibold">OIDC Login URL:</span> {appUrl}/api/lti/login</div>
          <div><span className="font-semibold">Launch URL:</span> {appUrl}/api/lti/launch</div>
          <div><span className="font-semibold">JWKS URI:</span> {appUrl}/api/lti/jwks</div>
          <div><span className="font-semibold">Platform Config JSON:</span> {appUrl}/api/lti/platform-config</div>
        </div>
      </div>

      {/* Provider list */}
      {providers.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-semibold text-gray-800">Registered Providers ({providers.length})</h2>
          {providers.map((p: LtiProvider) => (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{p.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${p.enabled ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>
                      {p.enabled ? "Enabled" : "Disabled"}
                    </span>
                  </div>
                  {p.description && <p className="text-sm text-gray-500">{p.description}</p>}
                  <div className="mt-2 space-y-0.5 text-xs text-gray-500 font-mono">
                    <div>Client ID: {p.clientId}</div>
                    <div>Issuer: {p.issuer}</div>
                    <div>OIDC URL: {p.oidcUrl}</div>
                    <div>Launch URL: {p.launchUrl}</div>
                    <div>JWKS URL: {p.jwksUrl}</div>
                    {p.deepLinkUrl && <div>Deep Link: {p.deepLinkUrl}</div>}
                  </div>
                </div>
                <form action={deleteProvider}>
                  <input type="hidden" name="id" value={p.id} />
                  <button
                    type="submit"
                    className="text-xs text-red-600 hover:text-red-800 border border-red-200 hover:border-red-400 px-3 py-1.5 rounded-lg transition-colors"
                    onClick={(e) => { if (!confirm("Delete this provider?")) e.preventDefault(); }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Register form */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="font-semibold text-gray-800 mb-4">Register New LTI Tool</h2>
        <form action={createProvider} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Tool Name *</label>
              <input name="name" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Canvas LMS" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Description</label>
              <input name="description" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm" placeholder="Optional description" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Client ID *</label>
              <input name="clientId" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" placeholder="provided by tool" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Issuer URL *</label>
              <input name="issuer" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" placeholder="https://canvas.instructure.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">OIDC Login URL *</label>
              <input name="oidcUrl" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" placeholder="https://tool.example.com/lti/login" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Launch URL *</label>
              <input name="launchUrl" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" placeholder="https://tool.example.com/lti/launch" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">JWKS URL *</label>
              <input name="jwksUrl" required className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" placeholder="https://tool.example.com/.well-known/jwks.json" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Deep Link URL</label>
              <input name="deepLinkUrl" className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" placeholder="Optional" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Custom Parameters (key=value, one per line)</label>
            <textarea name="customParams" rows={3} className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono" placeholder="course_id=123&#10;section=A" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" name="enabled" id="enabled" defaultChecked className="h-4 w-4 accent-emerald-600" />
            <label htmlFor="enabled" className="text-sm text-gray-700">Enable this provider</label>
          </div>
          <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors">
            Register Tool Provider
          </button>
        </form>
      </div>
    </div>
  );
}
