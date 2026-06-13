"use client";

import { Mic, Headphones, Play, Volume2 } from "lucide-react";

const EDITIONS = [
  { name: "KJV Audio Bible", reader: "Alexander Scourby", status: "Available" },
  { name: "ESV Audio Bible", reader: "David Cochran Heath", status: "Coming Soon" },
  { name: "NIV Audio Bible", reader: "George W. Sarris", status: "Coming Soon" },
  { name: "Dramatized KJV", reader: "Full cast production", status: "Coming Soon" },
];

export default function AudioBiblePage() {
  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Audio Bible</h1>
      <p className="text-sm text-gray-500 mb-8">Listen to Scripture while you commute, exercise, or rest.</p>

      <div className="space-y-3">
        {EDITIONS.map((e) => (
          <div key={e.name} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <Headphones className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{e.name}</h3>
                  <p className="text-xs text-gray-500">{e.reader}</p>
                </div>
              </div>
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${e.status === "Available" ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-400"}`}>
                {e.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 text-center">
        <Mic className="h-10 w-10 text-gray-300 mx-auto mb-3" />
        <h3 className="font-semibold text-gray-900 mb-1">More Audio Editions Coming</h3>
        <p className="text-sm text-gray-500">We are working to bring multiple audio translations and dramatized versions.</p>
      </div>
    </div>
  );
}
