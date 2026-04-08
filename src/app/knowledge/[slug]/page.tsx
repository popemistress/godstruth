import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VideoPlayer } from "@/components/player/VideoPlayer";
import { AudioPlayer } from "@/components/player/AudioPlayer";
import { PDFViewer } from "@/components/player/PDFViewer";
import { Lock, Clock, BookOpen } from "lucide-react";
import { formatDuration } from "@/lib/utils";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const content = await db.content.findUnique({ where: { slug: params.slug } });
  if (!content) return { title: "Not Found" };
  return { title: content.title, description: content.description ?? undefined };
}

export default async function ContentPage({ params }: PageProps) {
  const [session, content] = await Promise.all([
    auth(),
    db.content.findUnique({
      where: { slug: params.slug },
      include: {
        tags: { include: { tag: true } },
        series: { select: { id: true, title: true, slug: true } },
        book: { select: { id: true, name: true, slug: true, testament: true } },
      },
    }),
  ]);

  if (!content || !content.published) notFound();

  // Check if premium content is locked
  let isLocked = false;
  if (content.premium) {
    if (!session?.user) {
      isLocked = true;
    } else if (session.user.role !== "ADMIN") {
      const subscription = await db.subscription.findUnique({ where: { userId: session.user.id } });
      const activePremium = subscription && ["SUPPORTER", "PARTNER"].includes(subscription.plan) && subscription.status === "ACTIVE";
      if (!activePremium) isLocked = true;
    }
  }

  let userProgress = null;
  if (session?.user) {
    userProgress = await db.userProgress.findUnique({
      where: { userId_contentId: { userId: session.user.id, contentId: content.id } },
    });
  }

  return (
    <div className="container-page py-10 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-neutral-45 mb-6">
        <Link href="/knowledge" className="hover:text-neutral-80 transition-colors">Knowledge</Link>
        <span>/</span>
        <span className="text-neutral-80">{content.title}</span>
      </nav>

      {/* Meta */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="brand">{content.type}</Badge>
        {content.premium && <Badge variant="premium" className="flex items-center gap-1"><Lock className="h-3 w-3" /> Premium</Badge>}
        {content.duration && (
          <span className="text-xs text-neutral-45 flex items-center gap-1">
            <Clock className="h-3 w-3" /> {formatDuration(content.duration)}
          </span>
        )}
        {content.book && (
          <span className="text-xs text-neutral-45 flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> {content.book.name}
          </span>
        )}
      </div>

      <h1 className="font-serif text-3xl md:text-4xl font-bold text-neutral-80 mb-3">{content.title}</h1>
      {content.description && (
        <p className="text-neutral-45 text-lg mb-8 leading-relaxed">{content.description}</p>
      )}

      {/* Player / content */}
      {isLocked ? (
        <div className="rounded-xl bg-neutral-10 border border-neutral-20 p-10 text-center">
          <Lock className="h-10 w-10 text-neutral-40 mx-auto mb-4" />
          <h2 className="font-semibold text-neutral-80 text-lg mb-2">Premium Content</h2>
          <p className="text-neutral-45 mb-6">Sign up or upgrade your membership to access this content.</p>
          <div className="flex justify-center gap-3">
            {!session ? (
              <>
                <Button asChild><Link href="/register">Create Free Account</Link></Button>
                <Button variant="secondary" asChild><Link href="/login">Sign In</Link></Button>
              </>
            ) : (
              <Button asChild><Link href="/dashboard/settings">Upgrade Membership</Link></Button>
            )}
          </div>
        </div>
      ) : (
        <>
          {content.type === "VIDEO" && content.mediaUrl && (
            <VideoPlayer
              url={content.mediaUrl}
              initialProgress={userProgress ? Math.floor(userProgress.progress) : 0}
            />
          )}
          {content.type === "PODCAST" && content.mediaUrl && (
            <AudioPlayer url={content.mediaUrl} title={content.title} />
          )}
          {(content.type === "BOOK" || content.type === "GUIDE") && content.mediaUrl && (
            <PDFViewer url={content.mediaUrl} title={content.title} />
          )}
        </>
      )}

      {/* Tags */}
      {content.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {content.tags.map(({ tag }) => (
            <Badge key={tag.id} variant="outline">{tag.name}</Badge>
          ))}
        </div>
      )}
    </div>
  );
}
