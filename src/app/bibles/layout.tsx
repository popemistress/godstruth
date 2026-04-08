import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Bible Library | Gods Truth",
  description:
    "Explore our comprehensive collection of Bible translations, editions, and study Bibles. Learn the history of each translation and how it compares to the universally agreed-upon biblical canon.",
};

export default async function BiblesLayout({ children }: { children: React.ReactNode }) {
  const [session, settings] = await Promise.all([
    auth(),
    db.siteSettings.findFirst(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        session={session}
        announcementMessage={settings?.announcementBar ?? undefined}
        announcementUrl={settings?.announcementUrl ?? undefined}
      />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
