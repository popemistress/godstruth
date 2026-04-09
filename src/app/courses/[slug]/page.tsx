import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import {
  GraduationCap,
  BookOpen,
  ChevronRight,
  Clock,
  Play,
  CheckCircle2,
  Star,
  Users,
} from "lucide-react";
import { ChapterList } from "@/components/courses/ChapterList";
import { CourseProgressCircle } from "@/components/courses/CourseProgressCircle";
import { ChartFullscreen } from "@/components/courses/ChartFullscreen";

interface PageProps {
  params: { slug: string };
}

// What students will learn — all 52 lessons + 26 supplements (God's Universal Plan for Creation)
const WHAT_YOU_LEARN = [
  "God's complete blueprint — 5 ages, 7 dispensations, eternity past to eternity future",
  "Biblical inspiration, interpretation rules, and how to rightly divide the Word",
  "The nature and attributes of God: omniscience, omnipotence, omnipresence, immutability",
  "Original creation, Lucifer's fall, the Dispensation of Angels, and the re-creation of Earth",
  "All 5 historical dispensations: Innocence, Conscience, Human Government, Promise, and Law",
  "Divine healing, divine health, and deliverance from demonic sickness",
  "The laws of prayer: how to ask, receive, and persist until the full answer comes",
  "The Dispensation of Grace, the New Birth, and the NT church program",
  "The full person and work of Jesus Christ — incarnation through present heavenly ministry",
  "The doctrine of sin — its origin, nature, and God's complete provision for deliverance",
  "The Holy Spirit — His person, offices, baptism, filling, nine gifts, and nine fruits",
  "The doctrine of the Trinity answered plainly from Scripture",
  "Faith — its laws and how to apply it to healing, finances, and every area of life",
  "Salvation, justification, sanctification, and eternal security — doctrine and experience",
  "Where are the dead? — the biblical state of the departed soul and spirit",
  "The Rapture, the resurrections, and the sequence of end-time events",
  "The Millennium — Christ's 1,000-year reign and Satan's final revolt",
  "The New Heaven, New Earth, New Jerusalem, and the eternal state",
  "The Bride of Christ — her identity, calling, and eternal destiny",
  "26 personal supplements: prayer, healing, faith, and overcoming demonic opposition daily",
];

export async function generateMetadata({ params }: PageProps) {
  const course = await db.content.findUnique({ where: { slug: params.slug } });
  if (!course) return {};
  return { title: `${course.title} | Gods Truth` };
}

export default async function CourseDetailPage({ params }: PageProps) {
  const course = await db.content.findUnique({
    where: { slug: params.slug, type: "COURSE", published: true },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: { orderBy: { order: "asc" } },
        },
      },
    },
  });

  if (!course) notFound();

  const totalLessons = course.chapters.reduce((a, ch) => a + ch.lessons.length, 0);
  const totalDuration = course.chapters.reduce(
    (a, ch) => a + ch.lessons.reduce((b, l) => b + (l.duration ?? 0), 0),
    0
  );
  const totalHours = totalDuration > 0 ? Math.ceil(totalDuration / 3600) : null;

  // The first lesson is the Gods Plan.jpeg overview image
  const firstLesson = course.chapters[0]?.lessons[0];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Breadcrumb ── */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container-page py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link href="/courses" className="hover:text-emerald-600 transition-colors">
              Courses
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-700 truncate max-w-xs">{course.title}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero ── */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-page py-10 md:py-14">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <GraduationCap className="h-3.5 w-3.5" />
              Free Course · 52 Lessons
            </div>

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
              {course.title}
            </h1>

            {course.description && (
              <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-2xl">
                {course.description}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-emerald-500" />
                {course.chapters.length} parts
              </span>
              <span className="flex items-center gap-1.5">
                <Play className="h-4 w-4 text-emerald-500" />
                {totalLessons} lessons
              </span>
              {totalHours && (
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  ~{totalHours}h total
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-500" />
                <span className="text-amber-600 font-medium">Self-paced</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content: 3-col grid ── */}
      <div className="container-page py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left column: course info */}
          <div className="lg:col-span-2 space-y-8">

            {/* Gods Plan Overview Image CTA — fullscreen on click */}
            {firstLesson?.type === "IMAGE" && firstLesson.mediaUrl && (
              <ChartFullscreen
                src={firstLesson.mediaUrl}
                alt="God's Universal Plan for Creation — Complete Overview Chart"
                variant="course"
              />
            )}

            {/* What you'll learn */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-5">
                What You Will Learn
              </h2>
              <ul className="space-y-3">
                {WHAT_YOU_LEARN.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Chapter list */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-bold text-gray-900">Course Content</h2>
                <span className="text-xs text-gray-400">
                  {course.chapters.length} parts · {totalLessons} lessons
                </span>
              </div>
              <ChapterList chapters={course.chapters} courseSlug={course.slug} />
            </div>
          </div>

          {/* Right sidebar */}
          <div className="space-y-5">

            {/* Action card */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sticky top-24 shadow-sm">
              {/* Progress circle */}
              <div className="flex items-center gap-4 mb-6">
                <CourseProgressCircle percent={0} size={64} strokeWidth={5} />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Your Progress</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    0 of {totalLessons} lessons complete
                  </p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {course.chapters.length} parts · 52 lessons total
                  </p>
                </div>
              </div>

              {/* CTA — link to the plan chart (first lesson) */}
              <Link
                href={
                  firstLesson
                    ? `/courses/${course.slug}/lessons/${firstLesson.id}`
                    : `#content`
                }
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl px-4 py-3 transition-colors shadow-sm"
              >
                <Play className="h-4 w-4" />
                Begin the Course
              </Link>

              <div className="mt-4 space-y-3 pt-4 border-t border-gray-100">
                {[
                  { icon: BookOpen, label: `${course.chapters.length} Parts (I–IV)` },
                  { icon: Play, label: `${totalLessons} Lessons` },
                  { icon: Clock, label: totalHours ? `~${totalHours} hours` : "Self-paced" },
                  { icon: Users, label: "Community access" },
                  { icon: Star, label: "Free forever" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2.5 text-xs text-gray-500">
                    <Icon className="h-3.5 w-3.5 text-gray-400" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
