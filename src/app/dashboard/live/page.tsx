"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Video, Clock, ArrowRight } from "lucide-react";

interface LiveSession {
  id: string;
  title: string;
  scheduledAt: string;
  duration: number;
  meetingUrl: string | null;
  _count: { registrations: number };
}

export default function LiveSessionsPage() {
  const [sessions, setSessions] = useState<LiveSession[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/live-sessions");
        if (res.ok) {
          const data = await res.json();
          setSessions(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Live Sessions</h1>
      <p className="text-sm text-gray-500 mb-8">Register for upcoming live classes and webinars.</p>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading...</div>
      ) : sessions.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <Video className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="font-semibold text-gray-900 mb-2">No upcoming sessions</h3>
          <p className="text-sm text-gray-500">Check back soon for live teaching events.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sessions.map((s) => (
            <div key={s.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{s.title}</h3>
                  <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" /> {new Date(s.scheduledAt).toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {s.duration} min</span>
                  </div>
                </div>
                <button className="text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                  Register <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
