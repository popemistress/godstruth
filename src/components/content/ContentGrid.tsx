import { ContentCard } from "./ContentCard";
import type { ContentWithRelations } from "@/types";

interface ContentGridProps {
  items: ContentWithRelations[];
  emptyMessage?: string;
}

export function ContentGrid({ items, emptyMessage = "No content found." }: ContentGridProps) {
  if (items.length === 0) {
    return (
      <div className="col-span-full text-center py-20 text-neutral-45">
        <p className="text-lg font-medium mb-2">{emptyMessage}</p>
        <p className="text-sm">Try adjusting your filters or search terms.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {items.map((item) => (
        <ContentCard key={item.id} content={item} />
      ))}
    </div>
  );
}
