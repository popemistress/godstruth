import Link from "next/link";
import { BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-neutral-80 text-white mt-auto">
      <div className="container-page py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <BookOpen className="h-6 w-6 text-brand" />
              <span className="font-serif text-lg font-bold">Gods Truth</span>
            </Link>
            <p className="text-neutral-45 text-sm leading-relaxed">
              Resources to help people understand God&apos;s Word.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Explore</h4>
            <ul className="space-y-2 text-sm text-neutral-45">
              <li><Link href="/knowledge?type=COURSE" className="hover:text-white transition-colors">Courses</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-neutral-45">
              <li><Link href="/give" className="hover:text-white transition-colors">Give</Link></li>
              <li><Link href="/dashboard/settings" className="hover:text-white transition-colors">Membership</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Account</h4>
            <ul className="space-y-2 text-sm text-neutral-45">
              <li><Link href="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Create Account</Link></li>
              <li><Link href="/dashboard/profile" className="hover:text-white transition-colors">My Progress</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-45">
          <p>&copy; {new Date().getFullYear()} Gods Truth. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
