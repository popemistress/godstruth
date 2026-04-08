import Link from "next/link";
import Image from "next/image";
import { GraduationCap, BookOpen, Clock, ChevronRight } from "lucide-react";
import type { Content, CourseChapter } from "@prisma/client";

interface CourseCardProps {
  course: Content & {
    chapters: (CourseChapter & { lessons: { id: string }[] })[];
  };
}

export function CourseCard({ course }: CourseCardProps) {
  const totalLessons = course.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0);
  const chapterCount = course.chapters.length;

  return (
    <Link href={`/courses/${course.slug}`} className="group block">
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-white hover:border-emerald-300 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-sm">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-gray-100 overflow-hidden">
          {course.thumbnail ? (
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-emerald-50 to-gray-100">
              <GraduationCap className="h-12 w-12 text-emerald-200" />
            </div>
          )}

          {course.premium && (
            <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
              Premium
            </div>
          )}

          {course.featured && !course.premium && (
            <div className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md">
              Featured
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-5">
          {/* Badge row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <GraduationCap className="h-3 w-3" />
              Course
            </span>
            {chapterCount > 0 && (
              <span className="text-[10px] text-gray-400 font-medium">
                {chapterCount} parts · {totalLessons} lessons
              </span>
            )}
          </div>

          <h3 className="font-semibold text-gray-900 text-sm leading-snug line-clamp-2 group-hover:text-emerald-700 transition-colors mb-2">
            {course.title}
          </h3>

          {course.description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
              {course.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              {course.duration ? (
                <>
                  <Clock className="h-3 w-3" />
                  <span>
                    {Math.floor(course.duration / 3600) > 0
                      ? `${Math.floor(course.duration / 3600)}h ${Math.floor((course.duration % 3600) / 60)}m`
                      : `${Math.floor(course.duration / 60)}m`}
                  </span>
                </>
              ) : (
                <>
                  <BookOpen className="h-3 w-3" />
                  <span>Self-paced</span>
                </>
              )}
            </div>
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600 group-hover:gap-2 transition-all">
              Begin <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
