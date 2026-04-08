import Link from "next/link";
import { Play, BookOpen, Mic, GraduationCap } from "lucide-react";

const FEATURES = [
  {
    icon: Play,
    label: "Videos",
    href: "/knowledge?type=VIDEO",
    description: "Animated explainer videos on every book of the Bible and major biblical themes.",
    color: "bg-cyan-surface text-brand-accessible",
  },
  {
    icon: BookOpen,
    label: "Study Guides",
    href: "/knowledge?type=BOOK",
    description: "In-depth PDF guides and e-books to go deeper with any book of the Bible.",
    color: "bg-tan-10 text-neutral-60",
  },
  {
    icon: Mic,
    label: "Podcast",
    href: "/knowledge?type=PODCAST",
    description: "Conversations on Scripture, theology, and living out the biblical story today.",
    color: "bg-neutral-20 text-neutral-60",
  },
  {
    icon: GraduationCap,
    label: "Courses",
    href: "/knowledge?type=COURSE",
    description: "Structured multi-week courses to build a solid foundation in biblical literacy.",
    color: "bg-tan-10 text-neutral-60",
  },
];

export function FeatureColumns() {
  return (
    <section className="py-16 md:py-24">
      <div className="container-page">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-neutral-80 mb-4">
            Everything you need to study the Bible
          </h2>
          <p className="text-neutral-45 text-lg max-w-2xl mx-auto">
            Explore our growing library of resources — all free, all rooted in faithful scholarship.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map(({ icon: Icon, label, href, description, color }) => (
            <Link
              key={label}
              href={href}
              className="group rounded-xl border border-neutral-20 p-6 hover:shadow-md transition-shadow bg-white"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4 ${color}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-neutral-80 mb-2 group-hover:text-brand-accessible transition-colors">
                {label}
              </h3>
              <p className="text-sm text-neutral-45 leading-relaxed">{description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
