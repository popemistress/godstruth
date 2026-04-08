import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateContent } from "@/app/admin/_actions";

export const metadata = { title: "Edit Content" };

const TYPES = ["VIDEO", "BOOK", "PODCAST", "COURSE", "GUIDE"];

export default async function EditContentPage({ params }: { params: { id: string } }) {
  const content = await db.content.findUnique({ where: { id: params.id } });
  if (!content) notFound();

  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-neutral-80 mb-6">Edit Content</h2>

      <form action={updateContent} className="bg-white rounded-xl border border-neutral-20 p-6 space-y-5">
        <input type="hidden" name="id" value={content.id} />

        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required defaultValue={content.title} className="mt-1" />
        </div>

        <div>
          <Label htmlFor="type">Type</Label>
          <select id="type" name="type" defaultValue={content.type} disabled
            className="mt-1 flex h-10 w-full rounded-md border border-neutral-30 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accessible opacity-60">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <p className="text-xs text-neutral-45 mt-1">Type cannot be changed after creation.</p>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <textarea id="description" name="description" rows={3} defaultValue={content.description}
            className="mt-1 flex w-full rounded-md border border-neutral-30 bg-white px-3 py-2 text-sm resize-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accessible" />
        </div>

        <div>
          <Label htmlFor="fileUrl">File URL (mediaUrl)</Label>
          <Input id="fileUrl" name="fileUrl" defaultValue={content.mediaUrl ?? ""} placeholder="https://…" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
          <Input id="thumbnailUrl" name="thumbnailUrl" defaultValue={content.thumbnail ?? ""} placeholder="https://…" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="durationSeconds">Duration (seconds)</Label>
          <Input id="durationSeconds" name="durationSeconds" type="number" defaultValue={content.duration ?? ""} className="mt-1" />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-neutral-80 cursor-pointer">
            <input type="checkbox" name="premium" defaultChecked={content.premium} className="accent-brand" />
            Premium content
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-80 cursor-pointer">
            <input type="checkbox" name="published" defaultChecked={content.published} className="accent-brand" />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Save Changes</Button>
          <Button type="button" variant="secondary" onClick={() => history.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
