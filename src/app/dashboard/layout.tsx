import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [session, settings] = await Promise.all([
    auth(),
    db.siteSettings.findFirst(),
  ]);

  if (!session?.user) redirect("/login?callbackUrl=/dashboard/profile");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        session={session}
        announcementMessage={settings?.announcementBar ?? undefined}
        announcementUrl={settings?.announcementUrl ?? undefined}
      />
      <main className="flex-1 container-page py-10">{children}</main>
      <Footer />
    </div>
  );
}
