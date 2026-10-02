"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardAnnouncementsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/announcements");
  }, [router]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6 font-sans">
      <div className="text-center space-y-3">
        <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-sm font-semibold text-slate-300">
          Loading Campus Circulars & Announcements...
        </p>
      </div>
    </div>
  );
}
