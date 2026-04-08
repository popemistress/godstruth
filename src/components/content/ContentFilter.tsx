"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const TYPES = [
  { label: "All", value: "" },
  { label: "Videos", value: "VIDEO" },
  { label: "Books", value: "BOOK" },
  { label: "Podcast", value: "PODCAST" },
  { label: "Courses", value: "COURSE" },
];

export function ContentFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentType = searchParams.get("type") ?? "";
  const currentSearch = searchParams.get("search") ?? "";

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      params.delete("page");
      router.push(`/knowledge?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Type tabs */}
      <div className="flex items-center gap-1 bg-neutral-10 rounded-full p-1 flex-wrap">
        {TYPES.map(({ label, value }) => (
          <Button
            key={value}
            variant="ghost"
            size="sm"
            onClick={() => updateParam("type", value)}
            className={`rounded-full text-xs px-3 py-1.5 h-auto ${
              currentType === value
                ? "bg-white text-neutral-80 shadow-sm"
                : "text-neutral-45 hover:text-neutral-80"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Search */}
      <div className="relative flex-1 min-w-[200px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-45" />
        <Input
          defaultValue={currentSearch}
          placeholder="Search…"
          className="pl-9"
          onChange={(e) => {
            const val = e.target.value;
            const timeout = setTimeout(() => updateParam("search", val), 400);
            return () => clearTimeout(timeout);
          }}
        />
      </div>
    </div>
  );
}
