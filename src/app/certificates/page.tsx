"use client";

import { useState, useEffect } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";

interface CertificateItem {
  id: string;
  title: string;
  certificateNumber: string;
  issuedAt: string;
  course: { title: string; slug: string; thumbnail: string | null } | null;
  track: { title: string; slug: string } | null;
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/certificates");
        if (res.ok) {
          const data = await res.json();
          setCerts(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading certificates...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b border-gray-200">
        <div className="container-page py-10 md:py-14">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full mb-6">
              <Award className="h-3.5 w-3.5" />
              Achievements
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Your Certificates
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed">
              Recognizing your dedication to learning God&apos;s Word.
            </p>
          </div>
        </div>
      </section>

      <section className="container-page py-10">
        {certs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No certificates yet. Complete a track to earn one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certs.map((cert) => (
              <div
                key={cert.id}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                    <Award className="h-7 w-7 text-amber-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-gray-900 mb-1">{cert.title}</h2>
                    <p className="text-xs text-gray-500 mb-3">
                      {cert.course?.title || cert.track?.title}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(cert.issuedAt).toLocaleDateString()}
                      </span>
                      <span className="font-mono text-[10px] bg-gray-100 px-2 py-0.5 rounded">
                        {cert.certificateNumber}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Verified by Gods Truth
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
