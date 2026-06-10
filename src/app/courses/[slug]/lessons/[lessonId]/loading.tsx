export default function LessonLoading() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Sticky top bar skeleton */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="container-page py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-3 bg-gray-100 rounded" />
              <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
              <div className="h-3 w-3 bg-gray-100 rounded" />
              <div className="h-3 w-40 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="flex gap-2">
              <div className="h-7 w-20 bg-gray-100 rounded-lg animate-pulse" />
              <div className="h-7 w-20 bg-emerald-100 rounded-lg animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="container-page py-10 max-w-4xl mx-auto space-y-8">
        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between">
            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-emerald-200 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Cover banner skeleton */}
        <div className="w-full h-28 sm:h-36 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl animate-pulse" />

        {/* Title area */}
        <div className="space-y-3">
          <div className="h-4 w-24 bg-emerald-100 rounded-full animate-pulse" />
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Content block skeleton */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-600" />
          <div className="px-6 sm:px-10 md:px-14 py-10 md:py-14 space-y-5">
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-100 rounded-xl animate-pulse" />
            {/* Heading */}
            <div className="h-6 w-2/3 bg-gray-200 rounded animate-pulse mt-8" />
            {/* Paragraphs */}
            {[100, 90, 95, 80, 85].map((w, i) => (
              <div key={i} className={`h-4 bg-gray-100 rounded animate-pulse`} style={{ width: `${w}%` }} />
            ))}
            {/* Image placeholder */}
            <div className="w-full h-48 bg-gray-100 rounded-xl animate-pulse mt-4" />
            {/* More paragraphs */}
            {[92, 88, 96, 75].map((w, i) => (
              <div key={i} className={`h-4 bg-gray-100 rounded animate-pulse`} style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
