import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

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
      <div className="flex flex-1">
        <DashboardSidebar role={session.user.role} />
        <main className="flex-1 bg-gray-50 p-6 md:p-10 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
