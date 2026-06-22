import { getCurrentDbUser } from "@/lib/clerk-user";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, settings] = await Promise.all([
    getCurrentDbUser(),
    db.siteSettings.findFirst(),
  ]);

  if (!user) redirect("/sign-in");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        announcementMessage={settings?.announcementBar ?? undefined}
        announcementUrl={settings?.announcementUrl ?? undefined}
      />
      <div className="flex flex-1">
        <DashboardSidebar role={user.role} />
        <main className="flex-1 bg-gray-50 p-6 md:p-10 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
