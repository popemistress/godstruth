import { db } from "@/lib/db";
import { StatsCard } from "@/components/admin/StatsCard";
import { Users, Film, CreditCard, Eye } from "lucide-react";

export const metadata = { title: "Admin Dashboard" };

export default async function AdminDashboard() {
  const [totalUsers, totalContent, publishedContent, activeSubs] = await Promise.all([
    db.user.count(),
    db.content.count(),
    db.content.count({ where: { published: true } }),
    db.subscription.count({ where: { status: "ACTIVE" } }),
  ]);

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-80 mb-6">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Total Users" value={totalUsers} icon={Users} />
        <StatsCard label="Total Content" value={totalContent} icon={Film} sub={`${publishedContent} published`} />
        <StatsCard label="Active Subscriptions" value={activeSubs} icon={CreditCard} />
        <StatsCard label="Published" value={publishedContent} icon={Eye} />
      </div>

      <div className="bg-white rounded-xl border border-neutral-20 p-6">
        <h3 className="font-semibold text-neutral-80 mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/admin/content/new" className="btn-primary text-sm px-4 py-2 rounded-full inline-flex items-center gap-2">
            + Add Content
          </a>
          <a href="/admin/users" className="btn-secondary text-sm px-4 py-2 rounded-full inline-flex items-center gap-2">
            Manage Users
          </a>
          <a href="/admin/settings" className="btn-secondary text-sm px-4 py-2 rounded-full inline-flex items-center gap-2">
            Site Settings
          </a>
        </div>
      </div>
    </div>
  );
}
