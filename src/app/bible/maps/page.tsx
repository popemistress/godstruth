"use client";

import { Map, Globe, Compass } from "lucide-react";

const REGIONS = [
  { name: "The Holy Land", desc: "Israel, Judah, Jerusalem, Bethlehem, Nazareth, Galilee, Judea, Samaria." },
  { name: "Egypt", desc: "The land of the Exodus — Goshen, the Nile, Red Sea crossing." },
  { name: "Mesopotamia", desc: "Ur, Babylon, Nineveh, the Tigris and Euphrates rivers." },
  { name: "The Wilderness", desc: "Sinai Peninsula, Mount Sinai, wilderness wanderings." },
  { name: "Mediterranean", desc: "Paul's missionary journeys across Asia Minor, Greece, and Rome." },
];

export default function BibleMapsPage() {
  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Bible Maps</h1>
      <p className="text-sm text-gray-500 mb-8">Key regions and locations in the biblical narrative.</p>

      <div className="rounded-xl border border-gray-200 bg-white p-8 text-center mb-8">
        <Globe className="h-16 w-16 text-emerald-200 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">Interactive Maps Coming Soon</h3>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          We are building interactive biblical geography with zoomable regions,
          ancient city locations, and Paul&apos;s missionary journeys.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {REGIONS.map((r) => (
          <div key={r.name} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-center gap-2 mb-2">
              <Compass className="h-4 w-4 text-emerald-500" />
              <h3 className="font-semibold text-gray-900 text-sm">{r.name}</h3>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
