"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Film, Users, Settings, BookOpen } from "lucide-react";

const LINKS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Content", href: "/admin/content", icon: Film },
  { label: "Users", href: "/admin/users", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-60 shrink-0 border-r border-neutral-20 bg-white flex flex-col min-h-screen">
      <div className="h-16 flex items-center px-5 border-b border-neutral-20">
        <Link href="/" className="flex items-center gap-2 font-bold text-neutral-80">
          <BookOpen className="h-5 w-5 text-brand" />
          <span className="font-serif text-base">Gods Truth</span>
        </Link>
      </div>
      <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
        {LINKS.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || (href !== "/admin" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                active ? "bg-neutral-10 text-neutral-80" : "text-neutral-45 hover:bg-neutral-10 hover:text-neutral-80"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-neutral-20">
        <Link href="/" className="text-xs text-neutral-45 hover:text-neutral-80 transition-colors">
          ← Back to site
        </Link>
      </div>
    </aside>
  );
}
