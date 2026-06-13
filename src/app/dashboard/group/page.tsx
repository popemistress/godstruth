"use client";

import { Church, Users, Crown, Shield } from "lucide-react";

export default function GroupPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">My Group</h1>
      <p className="text-sm text-gray-500 mb-8">Your church or ministry learning community.</p>

      <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
        <Church className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="font-semibold text-gray-900 mb-2">No group membership</h3>
        <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
          Join a church or ministry group to share progress with your pastor and connect with fellow believers.
        </p>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> Shared dashboards</span>
          <span className="flex items-center gap-1"><Crown className="h-3.5 w-3.5" /> Leader reports</span>
          <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5" /> Accountability</span>
        </div>
      </div>
    </div>
  );
}
