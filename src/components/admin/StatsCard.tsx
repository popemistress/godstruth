import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  sub?: string;
}

export function StatsCard({ label, value, icon: Icon, sub }: StatsCardProps) {
  return (
    <div className="bg-white rounded-xl border border-neutral-20 p-5">
      <div className="flex items-start justify-between mb-3">
        <p className="text-sm text-neutral-45 font-medium">{label}</p>
        <div className="bg-neutral-10 rounded-lg p-2">
          <Icon className="h-4 w-4 text-neutral-60" />
        </div>
      </div>
      <p className="text-2xl font-bold text-neutral-80">{value}</p>
      {sub && <p className="text-xs text-neutral-45 mt-1">{sub}</p>}
    </div>
  );
}
