"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";

export default function CSEDepartmentRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/departments/bpharm");
  }, [router]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20 bg-slate-50">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-sm">
        <GraduationCap className="w-8 h-8" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
        Redirecting to Pharmacy Programs...
      </h1>
      <p className="text-slate-600 max-w-md mb-8">
        This page has moved to our dedicated Pharmacy program portals.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/departments/bpharm"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold text-sm hover:opacity-90 transition shadow-md"
        >
          Bachelor of Pharmacy (B.Pharm) <ArrowRight size={16} />
        </Link>
        <Link
          href="/departments/dpharm"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-300 text-slate-800 font-bold text-sm hover:bg-slate-100 transition shadow-sm"
        >
          Diploma in Pharmacy (D.Pharm) <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
