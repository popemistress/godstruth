"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Session } from "next-auth";

interface NavbarProps {
  session: Session | null;
  announcementMessage?: string | null;
  announcementUrl?: string | null;
}

const NAV_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Knowledge", href: "/knowledge" },
  { label: "Bibles", href: "/bibles" },
];

export function Navbar({ session, announcementMessage, announcementUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {announcementMessage && (
        <div className="relative bg-brand text-white text-sm text-center py-2.5 px-10">
          {announcementUrl ? (
            <Link href={announcementUrl} className="hover:underline font-medium">{announcementMessage}</Link>
          ) : (
            <span className="font-medium">{announcementMessage}</span>
          )}
        </div>
      )}
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-20 shadow-sm">
        <nav className="container-page flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-neutral-80">
            <BookOpen className="h-6 w-6 text-brand" />
            <span className="font-serif text-lg">Gods Truth</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-neutral-10 ${
                  pathname === link.href ? "text-neutral-80" : "text-neutral-45"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="brand" size="sm" asChild>
              <Link href="/give">Give</Link>
            </Button>
            {session ? (
              <div className="flex items-center gap-2">
                {session.user.role === "ADMIN" && (
                  <Button variant="outline" size="sm" asChild>
                    <Link href="/admin">Admin</Link>
                  </Button>
                )}
                <Link href="/dashboard/profile">
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarImage src={session.user.image ?? ""} alt={session.user.name ?? ""} />
                    <AvatarFallback>{session.user.name?.[0]?.toUpperCase() ?? "U"}</AvatarFallback>
                  </Avatar>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm text-neutral-45 hover:text-neutral-80 transition-colors"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-neutral-20 bg-white py-4 px-4 flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium text-neutral-80 hover:bg-neutral-10"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <Button variant="brand" size="sm" asChild>
                <Link href="/give" onClick={() => setMobileOpen(false)}>Give</Link>
              </Button>
              {session ? (
                <button
                  onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="text-sm text-neutral-45 text-left px-3 py-2"
                >
                  Sign out
                </button>
              ) : (
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login" onClick={() => setMobileOpen(false)}>Sign in</Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
