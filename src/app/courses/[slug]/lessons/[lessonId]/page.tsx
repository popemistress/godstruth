import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { LessonViewer } from "@/components/courses/LessonViewer";

interface PageProps {
  params: { slug: string; lessonId: string };
}

export async function generateMetadata({ params }: PageProps) {
  const lesson = await db.courseLesson.findUnique({ where: { id: params.lessonId } });
  if (!lesson) return {};
  return { title: `${lesson.title} | Gods Truth` };
}

export default async function LessonPage({ params }: PageProps) {
  // Parallel: nav-only query (no content) + full lesson
  const [course, lesson] = await Promise.all([
    db.content.findUnique({
      where: { slug: params.slug, type: "COURSE", published: true },
      include: {
        chapters: {
          orderBy: { order: "asc" },
          include: {
            lessons: {
              orderBy: { order: "asc" },
              where: { published: true },
              select: { id: true, title: true, type: true, order: true },
            },
          },
        },
      },
    }),
    db.courseLesson.findUnique({ where: { id: params.lessonId } }),
  ]);

  if (!course || !lesson) notFound();

  // Flat nav list
  const allLessons = course.chapters.flatMap((ch) =>
    ch.lessons.map((l) => ({ ...l, chapterTitle: ch.title }))
  );
  const currentIndex = allLessons.findIndex((l) => l.id === params.lessonId);
  if (currentIndex === -1) notFound();

  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;
  const chapter = course.chapters.find((ch) => ch.lessons.some((l) => l.id === params.lessonId))!;

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* ── Sticky top bar ── */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-page py-3">
          <div className="flex items-center justify-between gap-4">
            <nav className="flex items-center gap-1.5 text-xs text-gray-400 min-w-0">
              <Link href="/courses" className="hover:text-emerald-600 transition-colors whitespace-nowrap">Courses</Link>
              <ChevronRight className="h-3 w-3 flex-shrink-0" />
              <Link href={`/courses/${course.slug}`} className="hover:text-emerald-600 transition-colors truncate max-w-[140px] sm:max-w-xs">
                {course.title}
              </Link>
              <ChevronRight className="h-3 w-3 flex-shrink-0 text-gray-200" />
              <span className="text-gray-600 font-medium truncate max-w-[140px] sm:max-w-xs">{lesson.title}</span>
            </nav>
            <div className="flex items-center gap-2 flex-shrink-0">
              {prevLesson ? (
                <Link href={`/courses/${course.slug}/lessons/${prevLesson.id}`}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-emerald-50 border border-transparent hover:border-emerald-100">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Previous</span>
                </Link>
              ) : (
                <Link href={`/courses/${course.slug}`}
                  className="flex items-center gap-1 text-xs text-gray-500 hover:text-emerald-700 transition-colors px-2 py-1.5 rounded-lg hover:bg-emerald-50">
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Course</span>
                </Link>
              )}
              {nextLesson && (
                <Link href={`/courses/${course.slug}/lessons/${nextLesson.id}`}
                  className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition-colors shadow-sm">
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Lesson viewer (client component with animations) ── */}
      <LessonViewer
        lesson={lesson}
        chapter={chapter}
        courseSlug={course.slug}
        prevLesson={prevLesson}
        nextLesson={nextLesson}
        totalLessons={allLessons.length}
        lessonIndex={currentIndex}
      />
    </div>
  );
}
