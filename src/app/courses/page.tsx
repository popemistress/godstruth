import { db } from "@/lib/db";
import { GraduationCap, Search } from "lucide-react";
import { CourseCard } from "@/components/courses/CourseCard";

interface PageProps {
  searchParams: { search?: string };
}

export const revalidate = 60;

export default async function CoursesPage({ searchParams }: PageProps) {
  const search = searchParams.search ?? "";

  const courses = await db.content.findMany({
    where: {
      type: "COURSE",
      published: true,
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: {
      chapters: {
        orderBy: { order: "asc" },
        include: {
          lessons: { select: { id: true }, orderBy: { order: "asc" } },
        },
      },
    },
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
  });

  const totalLessons = courses.reduce(
    (acc, c) => acc + c.chapters.reduce((a, ch) => a + ch.lessons.length, 0),
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Header */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container-page py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">Learning Library</p>
            </div>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Bible Courses
          </h1>
          <p className="text-gray-500 max-w-xl leading-relaxed mb-8">
            Structured, in-depth courses designed to help you understand God&apos;s Word — from creation
            to the new heavens and earth. Study at your own pace.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-8 mb-8">
            {[
              { label: "Courses", value: courses.length },
              {
                label: "Parts",
                value: courses.reduce((a, c) => a + c.chapters.length, 0),
              },
              { label: "Lessons", value: totalLessons },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </div>
            ))}
          </div>

          {/* Search */}
          <form method="GET" className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              name="search"
              defaultValue={search}
              placeholder="Search courses…"
              className="w-full bg-white border border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/30 transition-colors shadow-sm"
            />
          </form>
        </div>
      </section>

      {/* Course grid */}
      <section className="container-page py-10">
        {courses.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <GraduationCap className="h-12 w-12 text-gray-200 mb-4" />
            <p className="text-gray-400 text-sm">
              {search ? `No courses found for "${search}"` : "No courses published yet."}
            </p>
          </div>
        ) : (
          <>
            {search && (
              <p className="text-sm text-gray-400 mb-6">
                {courses.length} result{courses.length !== 1 ? "s" : ""} for &ldquo;{search}&rdquo;
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
