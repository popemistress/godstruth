"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BetaBanner } from "@/components/shared/BetaBanner";
import { UserButton, SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

interface NavbarProps {
  announcementMessage?: string | null;
  announcementUrl?: string | null;
}

const NAV_LINKS = [
  { label: "Courses", href: "/courses" },
  { label: "Bible Study", href: "/bible/workspace" },
  { label: "Bibles", href: "/bibles" },
];

export function Navbar({ announcementMessage, announcementUrl }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isSignedIn } = useUser();

  return (
    <>
      <BetaBanner />
      {announcementMessage && (
        <div className="relative bg-brand text-white text-sm text-center py-2.5 px-4 sm:px-10">
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
            {isSignedIn ? (
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/admin">Admin</Link>
                </Button>
                <Link href="/dashboard/profile" className="text-sm text-neutral-45 hover:text-neutral-80 transition-colors">
                  Dashboard
                </Link>
                <UserButton />
              </div>
            ) : (
              <SignInButton mode="redirect">
                <Button variant="outline" size="sm">Sign in</Button>
              </SignInButton>
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
              {isSignedIn ? (
                <div className="flex items-center gap-2 px-3 py-2">
                  <UserButton />
                  <Link
                    href="/dashboard/profile"
                    onClick={() => setMobileOpen(false)}
                    className="text-sm text-neutral-45 hover:text-neutral-80 transition-colors"
                  >
                    Dashboard
                  </Link>
                </div>
              ) : (
                <SignInButton mode="redirect">
                  <Button variant="outline" size="sm">Sign in</Button>
                </SignInButton>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
