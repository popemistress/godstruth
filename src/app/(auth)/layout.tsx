import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-tan-05 flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <BookOpen className="h-7 w-7 text-brand" />
        <span className="font-serif text-xl font-bold text-neutral-80">Gods Truth</span>
      </Link>
      <div className="w-full max-w-md bg-white rounded-2xl border border-neutral-20 shadow-md p-8">
        {children}
      </div>
      <p className="mt-6 text-xs text-neutral-45">
        &copy; {new Date().getFullYear()} Gods Truth
      </p>
    </div>
  );
}
