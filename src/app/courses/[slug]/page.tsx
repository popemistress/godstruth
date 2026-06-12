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
  Volume2,
} from "lucide-react";
import { ChapterList } from "@/components/courses/ChapterList";
import { CourseProgressCircle } from "@/components/courses/CourseProgressCircle";
import { ChartFullscreen } from "@/components/courses/ChartFullscreen";

interface PageProps {
  params: { slug: string };
}

// What students will learn — keyed by course slug
const WHAT_YOU_LEARN_BY_SLUG: Record<string, string[]> = {
  "gods-universal-plan-for-creation": [
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
  ],
  "angels": [
    "The true nature of angels as pure spirits — intellect, will, and no material body",
    "Why each angel is its own unique species, unlike any other being in existence",
    "How God created the entire angelic hierarchy instantaneously, all at once",
    "The three moments of angelic creation: infused knowledge, the test of will, and eternal confirmation",
    "How angels know through infused knowledge — and why they cannot be in factual error",
    "The nine choirs of angels organized into three hierarchies with distinct roles",
    "The First Hierarchy — Seraphim, Cherubim, and Thrones — pure contemplation of God",
    "The Second Hierarchy — Dominations, Virtues, and Powers — governing the universe",
    "The Third Hierarchy — Principalities, Archangels, and Angels — ministering to human salvation",
    "The three named Archangels: Michael the warrior, Gabriel the announcer, Raphael the healer",
    "Why Gabriel was created for the Annunciation and Michael for the guardianship of the elect",
    "The doctrine of the Guardian Angel — one assigned to every person from conception to death",
    "What your guardian angel can and cannot do, and how to cultivate a living relationship with it",
    "Angels in the Old Testament — from Eden's Cherubim to Isaiah's Seraphim to Daniel's Archangels",
    "Angels in the New Testament — at the Annunciation, Nativity, Resurrection, and Ascension",
    "How the Mass joins the worship of the Seraphim and the prayers of every angel before the throne",
    "Common misconceptions about angels corrected by Scripture and tradition",
    "11 personal supplements: key terms, scripture memory, comparison tables, and questions for reflection",
  ],
  "demons": [
    "The biblical reality of demons — not myths, but real spiritual beings active in the world today",
    "Lucifer's fall from heaven — pride, rebellion, and the origin of evil in the created order",
    "Satan's nature, names, and methods — the serpent, the dragon, the deceiver, the accuser",
    "The fallen angels and their ranks — how rebellion did not erase their intelligence or power",
    "Demonic possession and oppression — the difference between external attack and internal control",
    "The spirits of infirmity, poverty, and bondage — how demons target specific areas of human life",
    "Doctrines of devils in the last days — deception through false teaching and seducing spirits",
    "Divination, witchcraft, necromancy, and the black art — condemned by Scripture, overcome by truth",
    "The believer's authority in Christ — the Name of Jesus and the power of the Holy Spirit",
    "The armor of God — how to take away the devil's weapons and stand in every spiritual battle",
    "Deliverance and exorcism — casting out demons by the authority of the risen Lord",
    "Spiritual warfare in the end times — the final conflict and Christ's ultimate triumph",
    "Living in daily victory over darkness — maintaining freedom through prayer, worship, and the Word",
    "8 personal supplements: scripture memory, key terms, comparison tables, and reflection questions",
  ],
};

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

  const lessonCount = course.chapters.reduce(
    (a, ch) => a + ch.lessons.filter((lesson) => lesson.type !== "SUPPLEMENT" && lesson.type !== "IMAGE").length,
    0
  );
  const supplementCount = course.chapters.reduce(
    (a, ch) => a + ch.lessons.filter((lesson) => lesson.type === "SUPPLEMENT").length,
    0
  );
  const sectionCount = course.chapters.reduce((a, ch) => a + ch.lessons.length, 0);
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
              Free Course · {lessonCount} Lesson{lessonCount === 1 ? "" : "s"}
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
                {lessonCount} lessons
              </span>
              {supplementCount > 0 && (
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-violet-500" />
                  {supplementCount} supplements
                </span>
              )}
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
                {(WHAT_YOU_LEARN_BY_SLUG[course.slug] ?? WHAT_YOU_LEARN_BY_SLUG["gods-universal-plan-for-creation"]).map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {course.slug === "angels" && (
                <>
                  <div className="my-5 border-t border-gray-200" />
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Course Overview
                    </span>
                  </div>
                  <audio
                    controls
                    className="w-full mt-3"
                    preload="metadata"
                  >
                    <source src="/angels-audio.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </>
              )}

              {course.slug === "demons" && (
                <>
                  <div className="my-5 border-t border-gray-200" />
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Course Overview
                    </span>
                  </div>
                  <audio
                    controls
                    className="w-full mt-3"
                    preload="metadata"
                  >
                    <source src="/demons-audio.mp3" type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </>
              )}
            </div>

            {/* Chapter list */}
            <div>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-xl font-bold text-gray-900">Course Content</h2>
                <span className="text-xs text-gray-400">
                  {course.chapters.length} parts · {lessonCount} lessons
                  {supplementCount > 0 && ` · ${supplementCount} supplements`}
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
                    0 of {sectionCount} sections complete
                  </p>
                  <p className="text-xs text-gray-300 mt-0.5">
                    {course.chapters.length} parts · {lessonCount} lessons total
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
                  { icon: BookOpen, label: `${course.chapters.length} Parts` },
                  { icon: Play, label: `${lessonCount} Lessons` },
                  ...(supplementCount > 0
                    ? [{ icon: BookOpen, label: `${supplementCount} Supplements` }]
                    : []),
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
