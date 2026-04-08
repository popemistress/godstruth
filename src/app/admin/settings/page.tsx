import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateSiteSettings } from "@/app/admin/_actions";

export const metadata = { title: "Site Settings" };

export default async function AdminSettingsPage() {
  const settings = await db.siteSettings.findFirst();

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-neutral-80 mb-6">Site Settings</h2>

      <form action={updateSiteSettings} className="bg-white rounded-xl border border-neutral-20 p-6 space-y-5">
        <div>
          <Label htmlFor="siteName">Site Name</Label>
          <Input id="siteName" name="siteName" defaultValue={settings?.siteName ?? "Gods Truth"} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input id="tagline" name="tagline" defaultValue={settings?.tagline ?? "Resources to help people understand God's Word"} className="mt-1" />
        </div>
        <div>
          <Label htmlFor="announcementBar">Announcement Bar</Label>
          <Input id="announcementBar" name="announcementBar" defaultValue={settings?.announcementBar ?? ""} placeholder="Leave empty to hide" className="mt-1" />
        </div>
        <div>
          <Label htmlFor="announcementUrl">Announcement URL</Label>
          <Input id="announcementUrl" name="announcementUrl" defaultValue={settings?.announcementUrl ?? ""} placeholder="Optional link for the announcement" className="mt-1" />
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm text-neutral-80 cursor-pointer">
            <input type="checkbox" name="maintenanceMode" defaultChecked={settings?.maintenanceMode ?? false} className="accent-brand" />
            Maintenance mode
          </label>
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  );
}
