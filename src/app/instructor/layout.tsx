import { getCurrentDbUser } from "@/lib/clerk-user";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default async function InstructorLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentDbUser();
  if (!user || (user.role !== "INSTRUCTOR" && user.role !== "ADMIN")) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <DashboardSidebar role={user.role} />
        <main className="flex-1 bg-gray-50 p-6 md:p-10 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
}
