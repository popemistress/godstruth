"use client";

import { Clock, ArrowRight } from "lucide-react";

const EVENTS = [
  { period: "Creation", year: "4000 BC", events: ["Creation of the world", "Creation of Adam and Eve", "Fall of man", "Cain and Abel", "Noah's Flood"] },
  { period: "Patriarchs", year: "2000 BC", events: ["Abraham's call", "Isaac born", "Jacob and the 12 tribes", "Joseph in Egypt"] },
  { period: "Exodus", year: "1446 BC", events: ["Moses and the Exodus", "The Law at Sinai", "Wilderness wanderings", "Conquest of Canaan"] },
  { period: "Kingdom", year: "1050 BC", events: ["Saul, David, Solomon", "United Kingdom", "Temple built", "Kingdom divided"] },
  { period: "Exile", year: "586 BC", events: ["Fall of Jerusalem", "Babylonian captivity", "Return from exile", "Temple rebuilt"] },
  { period: "Silence", year: "400 BC", events: ["Intertestamental period", "Alexander the Great", "Maccabean revolt"] },
  { period: "Messiah", year: "4 BC", events: ["Birth of Jesus", "Ministry of Jesus", "Crucifixion and Resurrection", "Ascension"] },
  { period: "Church", year: "AD 30", events: ["Day of Pentecost", "Apostolic missions", "New Testament written", "Church spreads"] },
  { period: "Future", year: "TBD", events: ["Second Coming of Christ", "Millennial Kingdom", "New Heaven and New Earth"] },
];

export default function BibleTimelinePage() {
  return (
    <div className="container-page py-10 max-w-3xl mx-auto">
      <h1 className="font-serif text-2xl font-bold text-gray-900 mb-2">Bible Timeline</h1>
      <p className="text-sm text-gray-500 mb-8">A sweeping overview of the biblical story from creation to the new creation.</p>

      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-emerald-200" />
        <div className="space-y-8">
          {EVENTS.map((e) => (
            <div key={e.period} className="relative pl-12">
              <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-50" />
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-emerald-500" />
                  <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wide">{e.year}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{e.period}</h3>
                <ul className="space-y-1">
                  {e.events.map((ev) => (
                    <li key={ev} className="text-sm text-gray-600 flex items-center gap-2">
                      <ArrowRight className="h-3 w-3 text-gray-300 flex-shrink-0" /> {ev}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
