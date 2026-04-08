import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { AdminSidebar } from "@/components/admin/Sidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user || session.user.role !== "ADMIN") redirect("/");

  return (
    <div className="flex min-h-screen bg-neutral-10">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        <header className="h-16 bg-white border-b border-neutral-20 flex items-center px-6">
          <h1 className="text-sm font-semibold text-neutral-80">Admin Panel</h1>
        </header>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
