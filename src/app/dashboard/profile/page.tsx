import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ContentCard } from "@/components/content/ContentCard";
import type { ContentWithRelations } from "@/types";

export const metadata = { title: "My Profile" };

export default async function ProfilePage() {
  const session = await auth();
  if (!session?.user) return null;

  const progressItems = await db.userProgress.findMany({
    where: { userId: session.user.id },
    include: {
      content: {
        include: {
          tags: { include: { tag: true } },
          series: { select: { id: true, title: true, slug: true } },
          book: { select: { id: true, name: true, slug: true, testament: true } },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: 12,
  });

  const inProgress = progressItems.filter((p) => !p.completed);
  const completed = progressItems.filter((p) => p.completed);

  return (
    <div>
      {/* Profile header */}
      <div className="flex items-center gap-5 mb-10">
        <Avatar className="h-16 w-16">
          <AvatarImage src={session.user.image ?? ""} />
          <AvatarFallback className="text-xl">{session.user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-serif text-2xl font-bold text-neutral-80">{session.user.name}</h1>
          <p className="text-neutral-45 text-sm">{session.user.email}</p>
          <Badge variant="brand" className="mt-1">{session.user.role}</Badge>
        </div>
      </div>

      {/* In Progress */}
      {inProgress.length > 0 && (
        <section className="mb-10">
          <h2 className="font-semibold text-neutral-80 text-lg mb-4">Continue Watching</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {inProgress.map(({ content }) => (
              <ContentCard key={content.id} content={content as ContentWithRelations} />
            ))}
          </div>
        </section>
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <section>
          <h2 className="font-semibold text-neutral-80 text-lg mb-4">Completed</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {completed.map(({ content }) => (
              <ContentCard key={content.id} content={content as ContentWithRelations} />
            ))}
          </div>
        </section>
      )}

      {progressItems.length === 0 && (
        <div className="text-center py-20">
          <p className="text-neutral-45 text-lg mb-4">You haven&apos;t started any content yet.</p>
          <a href="/knowledge" className="btn-primary px-6 py-2.5 rounded-full text-sm inline-flex items-center">
            Explore the Library
          </a>
        </div>
      )}
    </div>
  );
}
