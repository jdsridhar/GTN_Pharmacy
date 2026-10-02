"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  School,
  Users,
  GraduationCap,
  IndianRupee,
  CalendarCheck,
  AlertTriangle,
  Award,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Download,
  Building,
  CheckCircle2,
  XCircle,
  Clock,
  LogOut,
  ChevronRight,
  FileSpreadsheet,
  Layers,
  Sparkles,
  BookOpen,
  FileCheck2,
  Megaphone,
} from "lucide-react";
import { studentsDatabase, portalSummaryMetrics } from "@/data/portalData";
import AnnouncementsBoard from "@/components/AnnouncementsBoard";
import PostAnnouncementModal from "@/components/PostAnnouncementModal";

export default function PrincipalDashboardPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [programFilter, setProgramFilter] = useState<string>("ALL");
  const [yearFilter, setYearFilter] = useState<string>("ALL");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const filteredStudents = studentsDatabase.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.bioData.regNo.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesProgram =
      programFilter === "ALL" ||
      (programFilter === "BPHARM" && student.courseShort === "B.Pharm") ||
      (programFilter === "DPHARM" && student.courseShort === "D.Pharm");

    const matchesYear =
      yearFilter === "ALL" || student.year === yearFilter;

    const matchesStatus =
      statusFilter === "ALL" ||
      (statusFilter === "SHORTAGE" && student.attendanceData.percentage < 75) ||
      (statusFilter === "FEE_PENDING" && student.feesData.status !== "Paid") ||
      (statusFilter === "NODUE_PENDING" && student.noDueData.overallStatus === "PENDING") ||
      (statusFilter === "TOPPER" && student.cgpa >= 8.5);

    return matchesSearch && matchesProgram && matchesYear && matchesStatus;
  });

  const shortageStudents = studentsDatabase.filter(
    (s) => s.attendanceData.percentage < 75
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Portal Navigation Bar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shadow">
              <Image
                src="/GTN_Pharmacy_Logo.jpeg"
                alt="GTN Pharmacy"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm sm:text-base text-white tracking-wide">
                  GTN College of Pharmacy
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Principal Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                G.T. Narayanaswamy Naidu Charities Trust • Dindigul
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/dashboard/pa"
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center gap-1.5"
            >
              <span>PA Secretariat Desk</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </Link>

            <Link
              href={`/student/${studentsDatabase[0]?.id || "GTN24BP001"}`}
              className="text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 transition border border-amber-500/30 flex items-center gap-1.5"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Student View</span>
            </Link>

            <Link
              href="/login"
              className="text-xs px-3 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition border border-rose-800/40 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Executive Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-md border-2 border-white/30 overflow-hidden shrink-0 relative shadow-md">
                <Image
                  src="/images/about/principal.jpeg"
                  alt="Principal"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs font-semibold mb-2 border border-emerald-400/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  Academic Year 2024 - 2025
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                  Dr. S. K. Rathinam, M.Pharm., Ph.D.
                </h1>
                <p className="text-emerald-200/90 text-sm mt-0.5">
                  Principal & Research Director • GTN College of Pharmacy
                </p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-slate-300">
                  <span>Affiliation: The Tamil Nadu Dr. M.G.R. Medical University</span>
                  <span>•</span>
                  <span>PCI Approval Status: <strong className="text-emerald-300">100% Compliant</strong></span>
                  <span>•</span>
                  <span>Campus: G.T.N. Nagar, Karur Road, Dindigul</span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowAnnouncementModal(true)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-2 shadow-lg"
              >
                <Megaphone className="w-4 h-4" />
                <span>Post Announcement to All</span>
              </button>
              <button
                type="button"
                onClick={() => alert("Generating Institutional PCI Audit Summary PDF for GTN College of Pharmacy...")}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition flex items-center gap-2 shadow"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Export PCI Audit Dossier</span>
              </button>
              <Link
                href="/about#principal"
                className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition flex items-center gap-1.5 shadow border border-white/20"
              >
                <span>Principal Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* High-Level Institutional KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Total Students */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Enrolled Students
              </span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {portalSummaryMetrics.totalStudents}
              </span>
              <span className="text-xs font-semibold text-emerald-600">Full Intake</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
              <span>B.Pharm: <strong>{portalSummaryMetrics.bPharmStudents}</strong></span>
              <span>D.Pharm: <strong>{portalSummaryMetrics.dPharmStudents}</strong></span>
            </div>
          </div>

          {/* Card 2: Fee Realization */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Fee Realization Rate
              </span>
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {portalSummaryMetrics.feeCollectionRate}
              </span>
              <span className="text-xs font-semibold text-teal-600">Collected</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
              <span>Received: <strong className="text-emerald-700">{portalSummaryMetrics.totalCollected}</strong></span>
              <span className="text-rose-600">Due: {portalSummaryMetrics.totalPending}</span>
            </div>
          </div>

          {/* Card 3: Attendance Average */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Institutional Attendance
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <CalendarCheck className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {portalSummaryMetrics.avgAttendance}
              </span>
              <span className="text-xs font-semibold text-blue-600">Overall Avg</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
              <span>PCI Benchmark: <strong>≥75%</strong></span>
              <span className="text-amber-600 font-semibold">{portalSummaryMetrics.shortageCount} Shortages</span>
            </div>
          </div>

          {/* Card 4: University Exam Pass Rate */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Dr. MGR Univ. Pass Rate
              </span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-slate-900">
                {portalSummaryMetrics.universityPassRate}
              </span>
              <span className="text-xs font-semibold text-emerald-600">Distinction</span>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100 pt-2">
              <span>Faculty: <strong>{portalSummaryMetrics.totalFaculty} Ph.D./M.Pharm</strong></span>
              <span className="text-emerald-600 font-semibold">Rank Holder #1</span>
            </div>
          </div>
        </div>

        {/* PCI Attendance Compliance Alert Box (if any student < 75%) */}
        {shortageStudents.length > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-2xl p-5 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-amber-950">
                    PCI Compliance Watch: Attendance Shortage Alert (&lt; 75%)
                  </h3>
                  <span className="text-xs px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-full font-bold">
                    Action Required by Principal
                  </span>
                </div>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                  Under Pharmacy Council of India (PCI) Section 14 regulations, students with attendance strictly below 75% are ineligible for The Tamil Nadu Dr. M.G.R. Medical University examinations without formal medical condonation. The following students currently require Principal review:
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  {shortageStudents.map((std) => (
                    <Link
                      key={std.id}
                      href={`/student/${std.id}`}
                      className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-amber-300 text-xs font-medium text-slate-800 hover:border-amber-500 hover:shadow-sm transition"
                    >
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                      <span>{std.name} ({std.id})</span>
                      <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-bold text-[11px]">
                        {std.attendanceData.percentage}%
                      </span>
                      <ArrowRight className="w-3 h-3 text-slate-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Institutional Campus Circulars & Announcements Section */}
        <AnnouncementsBoard
          allowPost={true}
          userRole="principal"
          defaultPoster="Dr. S. K. Rathinam (Principal)"
        />

        {/* Students Performance & Registry Table Section */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-600" />
                <span>Student Academic & Financial Registry</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect individual student profiles, bio data, semester marks, fee receipts, and clinical postings.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-500">
                Showing <strong>{filteredStudents.length}</strong> of <strong>{studentsDatabase.length}</strong> students
              </span>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="p-4 bg-slate-50/80 border-b border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search by name, roll no, reg no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Course Filter */}
            <div>
              <select
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Programs (B.Pharm & D.Pharm)</option>
                <option value="BPHARM">Bachelor of Pharmacy (B.Pharm)</option>
                <option value="DPHARM">Diploma in Pharmacy (D.Pharm)</option>
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Batches (1st Batch Inaugural)</option>
                <option value="1st Year">1st Year (Inaugural Batch 2024)</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="ALL">All Student Statuses</option>
                <option value="SHORTAGE">⚠️ Attendance Shortage (&lt;75%)</option>
                <option value="FEE_PENDING">💰 Fee Payment Pending</option>
                <option value="NODUE_PENDING">📋 No Due Clearance Pending</option>
                <option value="TOPPER">🌟 High Distinction (CGPA ≥ 8.5)</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Program & Year</th>
                  <th className="py-3 px-4">Roll / Reg No</th>
                  <th className="py-3 px-4">CGPA</th>
                  <th className="py-3 px-4">Attendance</th>
                  <th className="py-3 px-4">Fee Status</th>
                  <th className="py-3 px-4">No Due Form</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      No student records found matching the active filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((std) => (
                    <tr
                      key={std.id}
                      className="hover:bg-emerald-50/40 transition group"
                    >
                      {/* Student info */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={std.avatar}
                            alt={std.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-emerald-700 transition">
                              {std.name}
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {std.bioData.quota}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Course */}
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">
                          {std.courseShort}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {std.year} • {std.semester}
                        </div>
                      </td>

                      {/* Roll / Reg */}
                      <td className="py-3 px-4 font-mono">
                        <div className="font-medium text-slate-800">{std.id}</div>
                        <div className="text-[10px] text-slate-400">{std.bioData.regNo}</div>
                      </td>

                      {/* CGPA */}
                      <td className="py-3 px-4">
                        <div className="inline-flex items-center gap-1 font-bold text-slate-800">
                          <span
                            className={`px-2 py-0.5 rounded text-xs ${
                              std.cgpa >= 8.5
                                ? "bg-emerald-100 text-emerald-800 font-extrabold"
                                : std.cgpa >= 7.5
                                ? "bg-blue-100 text-blue-800"
                                : "bg-slate-100 text-slate-700"
                            }`}
                          >
                            {std.cgpa.toFixed(2)}
                          </span>
                        </div>
                      </td>

                      {/* Attendance */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-bold ${
                              std.attendanceData.percentage < 75
                                ? "text-rose-600"
                                : std.attendanceData.percentage >= 90
                                ? "text-emerald-700"
                                : "text-slate-800"
                            }`}
                          >
                            {std.attendanceData.percentage}%
                          </span>
                          {std.attendanceData.percentage < 75 ? (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 text-rose-700 font-semibold">
                              Shortage
                            </span>
                          ) : (
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-700 font-semibold">
                              PCI OK
                            </span>
                          )}
                        </div>
                        <div className="w-24 bg-slate-200 h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              std.attendanceData.percentage < 75
                                ? "bg-rose-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${std.attendanceData.percentage}%` }}
                          />
                        </div>
                      </td>

                      {/* Fee Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                            std.feesData.status === "Paid"
                              ? "bg-emerald-100 text-emerald-800"
                              : std.feesData.status === "Partial"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-rose-100 text-rose-800"
                          }`}
                        >
                          {std.feesData.status === "Paid" && <CheckCircle2 className="w-3 h-3" />}
                          {std.feesData.status === "Partial" && <Clock className="w-3 h-3" />}
                          {std.feesData.status === "Pending" && <XCircle className="w-3 h-3" />}
                          {std.feesData.status}
                        </span>
                        {std.feesData.pendingAmount > 0 && (
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Due: ₹{std.feesData.pendingAmount.toLocaleString()}
                          </div>
                        )}
                      </td>

                      {/* No Due Form Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            std.noDueData.overallStatus === "CLEARED"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-amber-100 text-amber-800 border border-amber-300"
                          }`}
                        >
                          {std.noDueData.overallStatus === "CLEARED" ? (
                            <>
                              <CheckCircle2 className="w-3 h-3" />
                              <span>CLEARED</span>
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3" />
                              <span>PENDING</span>
                            </>
                          )}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/student/${std.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white font-medium text-xs transition shadow-sm"
                        >
                          <span>Full Profile</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Secondary Executive Grid: Financial Realization & University Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Institutional Financial Realization Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <IndianRupee className="w-5 h-5 text-teal-600" />
              <span>Program-wise Fee Collection Analytics</span>
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Bachelor of Pharmacy (B.Pharm) - 400 Students</span>
                  <span className="text-emerald-700 font-bold">91.4% Collected (₹ 3,92,00,000)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: "91.4%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between font-semibold text-slate-700 mb-1">
                  <span>Diploma in Pharmacy (D.Pharm) - 120 Students</span>
                  <span className="text-teal-700 font-bold">82.8% Collected (₹ 71,80,000)</span>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full rounded-full" style={{ width: "82.8%" }} />
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-slate-600 mt-4 flex items-center justify-between">
                <div>
                  <span className="font-semibold text-slate-800">Total Outstanding Balance:</span>
                  <p className="text-[11px] text-slate-500">Government post-matric scholarship disbursements pending from DME</p>
                </div>
                <span className="text-rose-600 font-extrabold text-sm">₹ 56,20,000</span>
              </div>
            </div>
          </div>

          {/* Academic Governance Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
              <Award className="w-5 h-5 text-amber-600" />
              <span>PCI & University Academic Audits</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">PCI Inspection Standing (Section 12)</div>
                  <p className="text-[11px] text-emerald-800 mt-0.5">
                    100-seat B.Pharm and 60-seat D.Pharm approved with zero non-compliances. Pharmacognosy, Sterile Formulation, and Machine Room labs fully verified.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl border border-blue-200 text-blue-950">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold">Hospital Clinical Training Affiliation</div>
                  <p className="text-[11px] text-blue-800 mt-0.5">
                    300-bed multispecialty hospital training active for pharmacy students at GTN Hospital, Dindigul.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Post Announcement Modal */}
      <PostAnnouncementModal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
        defaultPoster="Dr. S. K. Rathinam (Principal)"
      />
    </div>
  );
}
