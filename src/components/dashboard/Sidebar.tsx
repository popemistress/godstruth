"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, GraduationCap, TrendingUp, Award,
  Users, MessageSquare, Settings, BookOpen, CalendarDays,
  ClipboardList, Church, BarChart3, Search, NotebookPen, Highlighter, BookMarked, Trophy,
} from "lucide-react";

const LINKS = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Tracks", href: "/dashboard/tracks", icon: GraduationCap },
  { label: "Progress", href: "/dashboard/progress", icon: TrendingUp },
  { label: "Achievements", href: "/dashboard/achievements", icon: Trophy },
  { label: "Gradebook", href: "/dashboard/gradebook", icon: BookMarked },
  { label: "Certificates", href: "/certificates", icon: Award },
  { label: "Bible Study", href: "/bible/workspace", icon: Search },
  { label: "My Notes", href: "/dashboard/notes", icon: NotebookPen },
  { label: "My Highlights", href: "/dashboard/highlights", icon: Highlighter },
  { label: "Cohorts", href: "/dashboard/cohorts", icon: Users },
  { label: "Live Sessions", href: "/dashboard/live", icon: CalendarDays },
  { label: "Homework", href: "/dashboard/homework", icon: ClipboardList },
  { label: "Discussions", href: "/dashboard/discussions", icon: MessageSquare },
  { label: "My Group", href: "/dashboard/group", icon: Church },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const INSTRUCTOR_LINKS = [
  { label: "Instructor Dashboard", href: "/instructor", icon: BarChart3 },
];

export function DashboardSidebar({ role }: { role?: string }) {
  const pathname = usePathname();
  const allLinks = role === "INSTRUCTOR" || role === "ADMIN"
    ? [...LINKS, ...INSTRUCTOR_LINKS]
    : LINKS;

  return (
    <aside className="w-64 shrink-0 border-r border-gray-200 bg-white flex flex-col min-h-screen sticky top-0">
      <div className="h-16 flex items-center px-5 border-b border-gray-200">
        <Link href="/" className="flex items-center gap-2 font-bold text-gray-900">
          <BookOpen className="h-5 w-5 text-emerald-600" />
          <span className="font-serif text-base">Gods Truth</span>
        </Link>
      </div>
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {allLinks.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-emerald-50 text-emerald-700" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-200">
        <Link href="/" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
          Back to site
        </Link>
      </div>
    </aside>
  );
}
