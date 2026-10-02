"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  UserCheck,
  GraduationCap,
  KeyRound,
  ArrowRight,
  School,
  Lock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { studentsDatabase } from "@/data/portalData";

type Role = "principal" | "pa" | "student";

export default function LoginPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>("principal");
  const [username, setUsername] = useState("principal@gtn.edu.in");
  const [password, setPassword] = useState("••••••••");
  const [selectedStudentId, setSelectedStudentId] = useState(studentsDatabase[0]?.id || "GTN24BP001");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleChange = (role: Role) => {
    setSelectedRole(role);
    setError("");
    if (role === "principal") {
      setUsername("dr.rathinam@gtn.edu.in");
      setPassword("principal2025");
    } else if (role === "pa") {
      setUsername("pa.secretariat@gtn.edu.in");
      setPassword("adminoffice2025");
    } else {
      setUsername(selectedStudentId);
      setPassword("student@gtn");
    }
  };

  const handleStudentSelect = (id: string) => {
    setSelectedStudentId(id);
    setUsername(id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      setLoading(false);
      if (selectedRole === "principal") {
        router.push("/dashboard/principal");
      } else if (selectedRole === "pa") {
        router.push("/dashboard/pa");
      } else {
        router.push(`/student/${selectedStudentId}`);
      }
    }, 400);
  };

  const quickLoginAs = (target: "principal" | "pa" | string) => {
    setLoading(true);
    setTimeout(() => {
      if (target === "principal") {
        router.push("/dashboard/principal");
      } else if (target === "pa") {
        router.push("/dashboard/pa");
      } else {
        router.push(`/student/${target}`);
      }
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-slate-100 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between z-10">
        <Link
          href="/"
          className="flex items-center gap-3 group bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 transition"
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden bg-white p-1 flex items-center justify-center shadow">
            <Image
              src="/GTN_Pharmacy_Logo.jpeg"
              alt="GTN Pharmacy Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <div className="text-sm font-bold text-white group-hover:text-amber-400 transition">
              GTN College of Pharmacy
            </div>
            <div className="text-[11px] text-slate-400">
              ← Return to Main Website
            </div>
          </div>
        </Link>

        <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1.5 rounded-full">
          <ShieldCheck className="w-4 h-4" />
          PCI Approved • The TN Dr. M.G.R. Medical University
        </div>
      </div>

      {/* Main Login Card */}
      <div className="max-w-4xl w-full mx-auto my-8 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Side: Institutional Context */}
        <div className="lg:col-span-5 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/15 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold mb-4 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Inaugural Academic Year 2024 - 2025
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Institutional ERP & Student Portal
            </h1>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              Unified digital campus governance for GTN College of Pharmacy (Inaugural 1st Batch B.Pharm & D.Pharm). Access
              comprehensive student records, day-wise attendance, sessional analytics, fee status, and PCI compliance reports.
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Principal Dashboard:</strong> Institutional KPIs, attendance compliance (<span className="text-amber-300">75% PCI rule</span>), university grade rosters.
                </span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong>PA Operations Desk:</strong> Add new students, daily attendance entry, and fee collection desk.
                </span>
              </div>
              <div className="flex items-start gap-3 text-xs text-slate-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Student Portal:</strong> Day-wise attendance calendar, sessional marks by semester, fees receipts, and No Due clearance form.
                </span>
              </div>
            </div>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-xs font-semibold text-amber-300 uppercase tracking-wider mb-3">
              ⚡ Quick Demo One-Click Access
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => quickLoginAs("principal")}
                className="px-2.5 py-2 text-xs bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-lg font-medium text-center transition flex flex-col items-center justify-center shadow"
              >
                <span>Principal</span>
                <span className="text-[10px] text-emerald-200">Executive</span>
              </button>
              <button
                type="button"
                onClick={() => quickLoginAs("pa")}
                className="px-2.5 py-2 text-xs bg-teal-600/80 hover:bg-teal-500 text-white rounded-lg font-medium text-center transition flex flex-col items-center justify-center shadow"
              >
                <span>PA Office</span>
                <span className="text-[10px] text-teal-200">Admin Desk</span>
              </button>
              <button
                type="button"
                onClick={() => quickLoginAs(selectedStudentId)}
                className="px-2.5 py-2 text-xs bg-amber-600/80 hover:bg-amber-500 text-white rounded-lg font-medium text-center transition flex flex-col items-center justify-center shadow"
              >
                <span>Student</span>
                <span className="text-[10px] text-amber-200">1st Batch</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="lg:col-span-7 bg-slate-900/90 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
          <div>
            {/* Logo in Login Card Header */}
            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-lg shrink-0">
                <Image
                  src="/GTN_Pharmacy_Logo.jpeg"
                  alt="GTN Pharmacy College Logo"
                  width={52}
                  height={52}
                  className="object-contain"
                />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white">
                  GTN College of Pharmacy
                </h2>
                <p className="text-xs text-amber-400 font-medium">
                  Portal Login • Inaugural 1st Batch 2024-2025
                </p>
              </div>
            </div>

            {/* Role Switcher Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-800/80 rounded-2xl border border-slate-700/60 mb-6">
              <button
                type="button"
                onClick={() => handleRoleChange("principal")}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition ${
                  selectedRole === "principal"
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <School className="w-4 h-4 shrink-0" />
                <span>Principal</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("pa")}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition ${
                  selectedRole === "pa"
                    ? "bg-teal-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <UserCheck className="w-4 h-4 shrink-0" />
                <span>PA Desk</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("student")}
                className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition ${
                  selectedRole === "student"
                    ? "bg-amber-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>Student</span>
              </button>
            </div>

            {/* Role Description Badge */}
            <div className="mb-5 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
              {selectedRole === "principal" && (
                <>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <School className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Dr. S. K. Rathinam, M.Pharm., Ph.D.
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Principal & Academic Head • GTN College of Pharmacy
                    </div>
                  </div>
                </>
              )}
              {selectedRole === "pa" && (
                <>
                  <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      Principal Assistant & Secretariat
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Academic Administration, Fees & Marks Registry
                    </div>
                  </div>
                </>
              )}
              {selectedRole === "student" && (
                <>
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-xs font-bold text-white">
                      Select Demo Student Record
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Choose any registered student to view their profile
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Student Dropdown for Demo Student selection */}
            {selectedRole === "student" && (
              <div className="mb-5">
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Select Student to Inspect:
                </label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => handleStudentSelect(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {studentsDatabase.map((std) => (
                    <option key={std.id} value={std.id}>
                      {std.id} - {std.name} ({std.courseShort} {std.year}) - Att:{" "}
                      {std.attendanceData.percentage}% | Fee: {std.feesData.status}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  {selectedRole === "student" ? "Student Roll No / ID" : "Username / Official Email"}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-3.5 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
                    placeholder="Enter ID"
                  />
                  <div className="absolute right-3 top-3 text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Portal Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl pl-3.5 pr-10 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    placeholder="Enter password"
                  />
                  <div className="absolute right-3 top-3 text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition shadow-xl ${
                  selectedRole === "principal"
                    ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white"
                    : selectedRole === "pa"
                    ? "bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-500 hover:to-teal-400 text-white"
                    : "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white"
                }`}
              >
                {loading ? (
                  <span>Authenticating credentials...</span>
                ) : (
                  <>
                    <span>Enter {selectedRole === "principal" ? "Principal Dashboard" : selectedRole === "pa" ? "PA Operations Desk" : "Student Profile"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Card Footer Links */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400">
            <span>GTN Pharmacy ERP v3.4</span>
            <div className="flex items-center gap-4">
              <Link href="/about#principal" className="hover:text-emerald-400 transition">
                Principal Profile
              </Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-emerald-400 transition">
                IT Support Desk
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Trust & Institution Footer Signature */}
      <div className="max-w-4xl w-full mx-auto text-center text-xs text-slate-400 z-10">
        <p>
          Managed by <strong>G.T. Narayanaswamy Naidu Charities Trust</strong>, Dindigul - 624 005.
        </p>
        <p className="mt-1 text-[11px] text-slate-500">
          Approved by Pharmacy Council of India (PCI), New Delhi & Affiliated to The Tamil Nadu Dr. M.G.R. Medical University, Chennai.
        </p>
      </div>
    </div>
  );
}
