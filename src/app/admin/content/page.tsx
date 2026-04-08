import Link from "next/link";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteContent } from "@/app/admin/_actions";
import { Pencil, Trash2, Plus } from "lucide-react";

export const metadata = { title: "Manage Content" };

export default async function AdminContentPage() {
  const contents = await db.content.findMany({
    orderBy: { createdAt: "desc" },
    include: { book: { select: { name: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-neutral-80">Content</h2>
        <Button asChild>
          <Link href="/admin/content/new" className="flex items-center gap-2">
            <Plus className="h-4 w-4" /> Add Content
          </Link>
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-neutral-20 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-neutral-20 bg-neutral-10">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-neutral-45">Title</th>
              <th className="text-left px-4 py-3 font-medium text-neutral-45">Type</th>
              <th className="text-left px-4 py-3 font-medium text-neutral-45">Status</th>
              <th className="text-left px-4 py-3 font-medium text-neutral-45">Premium</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-10">
            {contents.map((c) => (
              <tr key={c.id} className="hover:bg-neutral-10/50">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-neutral-80 line-clamp-1">{c.title}</p>
                    <p className="text-xs text-neutral-45">{c.slug}</p>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="brand">{c.type}</Badge>
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${c.published ? "bg-green-100 text-green-700" : "bg-neutral-20 text-neutral-45"}`}>
                    {c.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {c.premium ? <Badge variant="premium">Premium</Badge> : <span className="text-xs text-neutral-45">Free</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <Button variant="ghost" size="icon" asChild>
                      <Link href={`/admin/content/${c.id}`}><Pencil className="h-4 w-4" /></Link>
                    </Button>
                    <form action={deleteContent}>
                      <input type="hidden" name="id" value={c.id} />
                      <Button variant="ghost" size="icon" type="submit" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {contents.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-10 text-center text-neutral-45">No content yet. <Link href="/admin/content/new" className="text-brand-accessible hover:underline">Add your first piece.</Link></td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
