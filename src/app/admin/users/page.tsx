import { db } from "@/lib/db";
import { updateUserRole } from "@/app/admin/_actions";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const metadata = { title: "Users" };

const ROLES = ["USER", "ADMIN"];

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { subscription: { select: { plan: true, status: true } } },
  });

  return (
    <div>
      <h2 className="text-xl font-bold text-neutral-80 mb-6">Users</h2>

      <div className="bg-white rounded-xl border border-neutral-20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-20 bg-neutral-10">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-neutral-45">User</th>
              <th className="text-left px-4 py-3 font-medium text-neutral-45">Plan</th>
              <th className="text-left px-4 py-3 font-medium text-neutral-45">Role</th>
              <th className="text-left px-4 py-3 font-medium text-neutral-45">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-10">
            {users.map((user) => {
              const plan = user.subscription?.plan ?? "FREE";
              return (
                <tr key={user.id} className="hover:bg-neutral-10/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image ?? ""} />
                        <AvatarFallback>{user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-neutral-80">{user.name ?? "—"}</p>
                        <p className="text-xs text-neutral-45">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={plan === "FREE" ? "secondary" : "premium"}>{plan}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <form action={updateUserRole} className="flex items-center gap-2">
                      <input type="hidden" name="userId" value={user.id} />
                      <select
                        name="role"
                        defaultValue={user.role}
                        onChange={(e) => (e.target.form as HTMLFormElement).requestSubmit()}
                        className="text-xs border border-neutral-30 rounded-md px-2 py-1 bg-white focus:outline-none"
                      >
                        {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                      </select>
                    </form>
                  </td>
                  <td className="px-4 py-3 text-xs text-neutral-45">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
