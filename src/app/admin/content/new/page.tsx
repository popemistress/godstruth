import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createContent } from "@/app/admin/_actions";

export const metadata = { title: "New Content" };

const TYPES = ["VIDEO", "BOOK", "PODCAST", "COURSE", "ARTICLE"];

export default function NewContentPage() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-bold text-neutral-80 mb-6">Add Content</h2>

      <form action={createContent} className="bg-white rounded-xl border border-neutral-20 p-6 space-y-5">
        <div>
          <Label htmlFor="title">Title *</Label>
          <Input id="title" name="title" required placeholder="e.g. Genesis Overview" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="type">Type *</Label>
          <select id="type" name="type" required className="mt-1 flex h-10 w-full rounded-md border border-neutral-30 bg-white px-3 py-2 text-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accessible">
            {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <textarea
            id="description"
            name="description"
            rows={3}
            placeholder="Brief description…"
            className="mt-1 flex w-full rounded-md border border-neutral-30 bg-white px-3 py-2 text-sm resize-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accessible"
          />
        </div>

        <div>
          <Label htmlFor="fileUrl">File URL</Label>
          <Input id="fileUrl" name="fileUrl" placeholder="https://… (UploadThing URL)" className="mt-1" />
          <p className="text-xs text-neutral-45 mt-1">Paste the URL after uploading via UploadThing.</p>
        </div>

        <div>
          <Label htmlFor="thumbnailUrl">Thumbnail URL</Label>
          <Input id="thumbnailUrl" name="thumbnailUrl" placeholder="https://…" className="mt-1" />
        </div>

        <div>
          <Label htmlFor="durationSeconds">Duration (seconds)</Label>
          <Input id="durationSeconds" name="durationSeconds" type="number" min={0} placeholder="e.g. 600" className="mt-1" />
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm text-neutral-80 cursor-pointer">
            <input type="checkbox" name="premium" className="accent-brand" />
            Premium content
          </label>
          <label className="flex items-center gap-2 text-sm text-neutral-80 cursor-pointer">
            <input type="checkbox" name="published" className="accent-brand" />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit">Create Content</Button>
          <Button variant="secondary" asChild><Link href="/admin/content">Cancel</Link></Button>
        </div>
      </form>
    </div>
  );
}
