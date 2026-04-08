import Link from "next/link";
import Image from "next/image";
import { Play, BookOpen, Mic, GraduationCap, Lock, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/lib/utils";
import type { ContentWithRelations } from "@/types";

const TYPE_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  VIDEO: Play,
  BOOK: BookOpen,
  PODCAST: Mic,
  COURSE: GraduationCap,
  GUIDE: BookOpen,
};

const TYPE_LABELS: Record<string, string> = {
  VIDEO: "Video",
  BOOK: "Book",
  PODCAST: "Podcast",
  COURSE: "Course",
  GUIDE: "Guide",
};

interface ContentCardProps {
  content: ContentWithRelations;
}

export function ContentCard({ content }: ContentCardProps) {
  const Icon = TYPE_ICONS[content.type] ?? BookOpen;
  const typeLabel = TYPE_LABELS[content.type] ?? content.type;

  return (
    <Link href={`/knowledge/${content.slug}`} className="group block">
      <div className="card hover:shadow-md transition-shadow">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-neutral-20 overflow-hidden">
          {content.thumbnail ? (
            <Image
              src={content.thumbnail}
              alt={content.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-80">
              <Icon className="h-10 w-10 text-white/40" />
            </div>
          )}
          {content.premium && (
            <div className="absolute top-2 right-2">
              <Badge variant="premium" className="flex items-center gap-1">
                <Lock className="h-3 w-3" /> Premium
              </Badge>
            </div>
          )}
          {content.duration && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {formatDuration(content.duration)}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="brand" className="flex items-center gap-1 text-xs">
              <Icon className="h-3 w-3" /> {typeLabel}
            </Badge>
            {content.book && (
              <span className="text-xs text-neutral-45">{content.book.name}</span>
            )}
          </div>
          <h3 className="font-semibold text-neutral-80 text-sm leading-snug line-clamp-2 group-hover:text-brand-accessible transition-colors mb-1">
            {content.title}
          </h3>
          {content.description && (
            <p className="text-xs text-neutral-45 line-clamp-2 leading-relaxed">
              {content.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
