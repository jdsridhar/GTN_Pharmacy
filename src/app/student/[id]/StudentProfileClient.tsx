"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  GraduationCap,
  CreditCard,
  CalendarCheck,
  Award,
  BookOpen,
  Briefcase,
  Hospital,
  AlertTriangle,
  CheckCircle2,
  Phone,
  Mail,
  MapPin,
  School,
  UserCheck,
  LogOut,
  ChevronRight,
  Download,
  ShieldCheck,
  Printer,
  FileText,
  FileCheck2,
  Megaphone,
} from "lucide-react";
import {
  studentsDatabase,
  getStudentById,
  FeeReceipt,
} from "@/data/portalData";
import StudentNoDueForm from "@/components/StudentNoDueForm";
import AnnouncementsBoard from "@/components/AnnouncementsBoard";

type TabType =
  | "bio"
  | "fees"
  | "attendance"
  | "sessional"
  | "semester"
  | "nodue"
  | "others";

interface Props {
  studentId: string;
}

export default function StudentProfileClient({ studentId }: Props) {
  const router = useRouter();
  const student = getStudentById(studentId) || studentsDatabase[0];
  const [activeTab, setActiveTab] = useState<TabType>("bio");
  const [selectedReceipt, setSelectedReceipt] = useState<FeeReceipt | null>(null);
  const [attendanceMonthFilter, setAttendanceMonthFilter] = useState<string>("ALL");
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState<string>("ALL");
  const [selectedSemester, setSelectedSemester] = useState<string>(student?.semester || "Semester I");
  const [selectedSessional, setSelectedSessional] = useState<"ALL" | "SESSIONAL_1" | "SESSIONAL_2" | "INTERNAL_25">("ALL");

  if (!student) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-slate-100">
        <div className="bg-white p-8 rounded-2xl shadow text-center max-w-md">
          <h2 className="text-xl font-bold text-slate-800">Student Not Found</h2>
          <p className="text-sm text-slate-500 mt-2">
            The student ID &quot;{studentId}&quot; does not match any registered student records.
          </p>
          <Link
            href="/dashboard/principal"
            className="mt-4 inline-block px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-semibold"
          >
            Return to Principal Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const isAttendanceShortage = student.attendanceData.percentage < 75;

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
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Student Record Dossier
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                The Tamil Nadu Dr. M.G.R. Medical University & PCI Affiliated
              </p>
            </div>
          </div>

          {/* Quick navigation and Student Selector */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden lg:flex items-center gap-2">
              <span className="text-xs text-slate-400">Switch Record:</span>
              <select
                value={student.id}
                onChange={(e) => router.push(`/student/${e.target.value}`)}
                className="bg-slate-800 text-amber-300 border border-slate-700 rounded-lg text-xs py-1.5 px-2.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {studentsDatabase.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.id}) - {s.courseShort}
                  </option>
                ))}
              </select>
            </div>

            <Link
              href="/dashboard/principal"
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center gap-1"
            >
              <School className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Principal</span>
            </Link>

            <Link
              href="/dashboard/pa"
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center gap-1"
            >
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span className="hidden sm:inline">PA Desk</span>
            </Link>

            <Link
              href="/login"
              className="text-xs px-2.5 py-1.5 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 transition border border-rose-800/40 flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Breadcrumb & Switcher for Mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/principal" className="hover:text-emerald-700">
              Principal Dashboard
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-800 font-semibold">{student.name} ({student.id})</span>
          </div>

          <div className="flex lg:hidden items-center gap-2">
            <span>Switch Student:</span>
            <select
              value={student.id}
              onChange={(e) => router.push(`/student/${e.target.value}`)}
              className="bg-white text-slate-800 border border-slate-300 rounded-lg text-xs py-1 px-2"
            >
              {studentsDatabase.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.id})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Student Profile Hero Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <img
                  src={student.avatar}
                  alt={student.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-emerald-600 shadow-md"
                />
                <span
                  className={`absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide border shadow ${
                    isAttendanceShortage
                      ? "bg-rose-100 text-rose-800 border-rose-300"
                      : "bg-emerald-100 text-emerald-800 border-emerald-300"
                  }`}
                >
                  {isAttendanceShortage ? "Shortage" : "Active"}
                </span>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                    {student.course}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
                    {student.year} • {student.semester}
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
                    Batch: {student.batch}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {student.name}
                </h1>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-500 font-mono">
                  <span>
                    Roll No: <strong className="text-slate-800">{student.id}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Reg No: <strong className="text-slate-800">{student.bioData.regNo}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Admission: <strong className="text-slate-800">{student.bioData.quota}</strong>
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Metrics Pillar */}
            <div className="flex items-center gap-3 sm:gap-5 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
              <div className="text-center">
                <div className="text-xs text-slate-400 font-semibold uppercase">CGPA</div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">
                  {student.cgpa.toFixed(2)}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium">1st Class</div>
              </div>

              <div className="w-px h-10 bg-slate-200" />

              <div className="text-center">
                <div className="text-xs text-slate-400 font-semibold uppercase">Attendance</div>
                <div
                  className={`text-2xl font-black mt-0.5 ${
                    isAttendanceShortage ? "text-rose-600" : "text-emerald-700"
                  }`}
                >
                  {student.attendanceData.percentage}%
                </div>
                <div
                  className={`text-[10px] font-bold ${
                    isAttendanceShortage ? "text-rose-600" : "text-emerald-600"
                  }`}
                >
                  {isAttendanceShortage ? "Under 75%" : "PCI Eligible"}
                </div>
              </div>

              <div className="w-px h-10 bg-slate-200" />

              <div className="text-center">
                <div className="text-xs text-slate-400 font-semibold uppercase">Fee Balance</div>
                <div className="text-2xl font-black text-slate-900 mt-0.5">
                  {student.feesData.pendingAmount === 0 ? "₹ 0" : `₹ ${(student.feesData.pendingAmount / 1000).toFixed(0)}k`}
                </div>
                <div
                  className={`text-[10px] font-bold ${
                    student.feesData.status === "Paid"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }`}
                >
                  {student.feesData.status}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shortage Alert Warning Banner if attendance < 75% */}
        {isAttendanceShortage && (
          <div className="bg-rose-50 border-l-4 border-rose-600 rounded-2xl p-4 shadow-sm flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-rose-950">
                PCI Regulatory Notice: Attendance Below 75% Threshold
              </h4>
              <p className="text-xs text-rose-800 mt-0.5">
                Current attendance is <strong>{student.attendanceData.percentage}%</strong> ({student.attendanceData.presentDays} of {student.attendanceData.totalWorkingDays} days). Under Pharmacy Council of India (PCI) Section 14 regulations, 75% attendance is mandatory to appear for The TN Dr. M.G.R. Medical University theory and practical examinations. Submit formal medical or duty leave condonation to the Principal&apos;s Office.
              </p>
            </div>
          </div>
        )}

        {/* Campus Circulars & Announcements Section */}
        <AnnouncementsBoard
          compact={true}
          filterAudience={student.courseShort}
          userRole="student"
        />

        {/* Tab Navigation Navigation Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-1.5 shadow-sm flex flex-wrap gap-1">
          <button
            type="button"
            onClick={() => setActiveTab("bio")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "bio"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. Bio Data</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("fees")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "fees"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            <span>2. Fees Data</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("attendance")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "attendance"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <CalendarCheck className="w-3.5 h-3.5" />
            <span>3. Attendance Data</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("sessional")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "sessional"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>4. Sessional Marks</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("semester")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "semester"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>5. Semester Marks</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("nodue")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "nodue"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            <span>6. No Due Form</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("others")}
            className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              activeTab === "others"
                ? "bg-slate-900 text-white shadow"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <Hospital className="w-3.5 h-3.5" />
            <span>7. Others Data</span>
          </button>
        </div>

        {/* Tab 1: Bio Data */}
        {activeTab === "bio" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Student Bio-Data & Personal Dossier
                </h3>
                <p className="text-xs text-slate-500">
                  Verified record archived at GTN College of Pharmacy Registrar.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">
                Category: {student.bioData.category}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              {/* Personal Details */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-emerald-800">
                  Personal Information
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Full Legal Name:</span>
                    <span className="font-bold text-slate-800">{student.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Date of Birth:</span>
                    <span className="font-semibold text-slate-800">{student.bioData.dob}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gender:</span>
                    <span className="font-semibold text-slate-800">{student.bioData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Blood Group:</span>
                    <span className="font-bold text-rose-700">{student.bioData.bloodGroup}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Community / Quota:</span>
                    <span className="font-semibold text-slate-800">{student.bioData.quota}</span>
                  </div>
                </div>
              </div>

              {/* Parent & Guardian Info */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-teal-800">
                  Parent / Guardian Details
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Father&apos;s Name:</span>
                    <span className="font-bold text-slate-800">{student.bioData.fatherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Mother&apos;s Name:</span>
                    <span className="font-semibold text-slate-800">{student.bioData.motherName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Parent Mobile:</span>
                    <span className="font-mono font-bold text-slate-800">
                      {student.bioData.parentMobile}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Admission Date:</span>
                    <span className="font-semibold text-slate-800">
                      {student.bioData.admissionDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-blue-800">
                  Contact & Residence
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-500">Student Phone:</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {student.bioData.mobile}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="text-slate-500">Official Email:</span>
                    <span className="font-mono text-slate-800 truncate">
                      {student.bioData.email}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 pt-1 border-t border-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-500 block">Permanent Address:</span>
                      <span className="font-medium text-slate-800 leading-relaxed">
                        {student.bioData.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Fees Data */}
        {activeTab === "fees" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Institutional Fee Ledger & Payment Receipts
                </h3>
                <p className="text-xs text-slate-500">
                  Official fee records maintained under G.T. Narayanaswamy Naidu Charities Trust.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    student.feesData.status === "Paid"
                      ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                      : "bg-amber-100 text-amber-800 border border-amber-300"
                  }`}
                >
                  Status: {student.feesData.status}
                </span>
              </div>
            </div>

            {/* Fee Breakdown Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Annual Tuition Fee</span>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  ₹{student.feesData.annualTuitionFee.toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Special Lab & Equipment</span>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  ₹{student.feesData.specialLabFee.toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Hostel / Transport</span>
                <div className="text-lg font-bold text-slate-900 mt-1">
                  ₹{student.feesData.hostelTransportFee.toLocaleString()}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Trust Scholarship / Concession</span>
                <div className="text-lg font-bold text-emerald-700 mt-1">
                  - ₹{student.feesData.scholarshipConcession.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Totals Summary Banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-300">Total Net Payable for Academic Year:</span>
                <div className="text-2xl font-black text-amber-400">
                  ₹{student.feesData.totalPayable.toLocaleString()}
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div>
                  <span className="text-slate-400 block">Total Amount Paid:</span>
                  <span className="text-emerald-400 font-bold text-base">
                    ₹{student.feesData.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="w-px h-8 bg-slate-700" />
                <div>
                  <span className="text-slate-400 block">Outstanding Balance:</span>
                  <span className={`font-bold text-base ${student.feesData.pendingAmount > 0 ? "text-rose-400" : "text-emerald-400"}`}>
                    ₹{student.feesData.pendingAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Official Receipts History Table */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Payment Receipts History</span>
              </h4>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                      <th className="py-3 px-4">Receipt No</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Mode</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.feesData.history.map((receipt) => (
                      <tr key={receipt.id} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-mono font-bold text-teal-800">
                          {receipt.receiptNo}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{receipt.date}</td>
                        <td className="py-3 px-4 font-medium text-slate-800">{receipt.description}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border text-slate-700 text-[11px]">
                            {receipt.mode}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-extrabold text-emerald-700">
                          ₹{receipt.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            {receipt.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedReceipt(receipt)}
                            className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-semibold text-[11px] border border-teal-200 transition"
                          >
                            View Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Attendance Data */}
        {activeTab === "attendance" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Attendance & PCI Compliance Record
                </h3>
                <p className="text-xs text-slate-500">
                  Pharmacy Council of India (PCI) Section 14 statutory attendance auditing.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    student.attendanceData.pciEligible
                      ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                      : "bg-rose-100 text-rose-800 border-rose-300"
                  }`}
                >
                  {student.attendanceData.pciEligible
                    ? "✓ PCI 75% Rule Eligible"
                    : "⚠️ PCI Condonation Required"}
                </span>
              </div>
            </div>

            {/* Attendance Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Total Working Days</span>
                <div className="text-2xl font-black text-slate-900 mt-1">
                  {student.attendanceData.totalWorkingDays}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Days Attended</span>
                <div className="text-2xl font-black text-emerald-700 mt-1">
                  {student.attendanceData.presentDays}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Days Absent / On Leave</span>
                <div className="text-2xl font-black text-rose-600 mt-1">
                  {student.attendanceData.absentDays}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Cumulative Attendance</span>
                <div
                  className={`text-2xl font-black mt-1 ${
                    isAttendanceShortage ? "text-rose-600" : "text-emerald-700"
                  }`}
                >
                  {student.attendanceData.percentage}%
                </div>
              </div>
            </div>

            {/* Day-wise Attendance Register Table */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <CalendarCheck className="w-4 h-4 text-emerald-600" />
                    <span>Day-wise Daily Attendance Register</span>
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Official day-by-day attendance roll entered directly by the Principal Assistant (PA) Desk.
                  </p>
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] font-semibold">Month:</span>
                    <select
                      value={attendanceMonthFilter}
                      onChange={(e) => setAttendanceMonthFilter(e.target.value)}
                      className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="ALL">All Months</option>
                      <option value="Aug">August</option>
                      <option value="Sep">September</option>
                      <option value="Oct">October</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-xl border border-slate-200">
                    <span className="text-slate-500 text-[11px] font-semibold">Status:</span>
                    <select
                      value={attendanceStatusFilter}
                      onChange={(e) => setAttendanceStatusFilter(e.target.value)}
                      className="bg-transparent text-slate-800 font-bold focus:outline-none cursor-pointer text-xs"
                    >
                      <option value="ALL">All Records</option>
                      <option value="PRESENT">Present Only</option>
                      <option value="ABSENT">Absent Only</option>
                      <option value="ON_LEAVE">On Leave Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Day-wise Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                      <th className="py-3 px-4">Date & Day</th>
                      <th className="py-3 px-4">Session</th>
                      <th className="py-3 px-4">Attendance Status</th>
                      <th className="py-3 px-4">Entry Authority</th>
                      <th className="py-3 px-4">Secretariat Remarks / Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.attendanceData.dailyLogs
                      .filter((log) => {
                        const matchesMonth =
                          attendanceMonthFilter === "ALL" || log.formattedDate.includes(attendanceMonthFilter);
                        const matchesStatus =
                          attendanceStatusFilter === "ALL" || log.status === attendanceStatusFilter;
                        return matchesMonth && matchesStatus;
                      })
                      .map((log) => (
                        <tr key={log.id} className="hover:bg-slate-50 transition">
                          <td className="py-2.5 px-4">
                            <div className="font-bold text-slate-900">{log.formattedDate}</div>
                            <div className="text-[11px] text-slate-400 font-medium">{log.day}</div>
                          </td>
                          <td className="py-2.5 px-4 font-medium text-slate-600">
                            <span className="px-2 py-0.5 rounded bg-slate-100 border text-slate-700 text-[11px]">
                              {log.session}
                            </span>
                          </td>
                          <td className="py-2.5 px-4">
                            {log.status === "PRESENT" && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                                Present
                              </span>
                            )}
                            {log.status === "ABSENT" && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                                Absent
                              </span>
                            )}
                            {log.status === "ON_LEAVE" && (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                <UserCheck className="w-3.5 h-3.5 text-amber-600" />
                                On Leave
                              </span>
                            )}
                          </td>
                          <td className="py-2.5 px-4 text-slate-700 font-medium">
                            <span className="inline-flex items-center gap-1 text-[11px] text-teal-800 font-semibold">
                              <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                              {log.markedBy}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-slate-600 text-[11px]">
                            {log.remarks}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Monthly Trend */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3">
                Monthly Day-wise Attendance Progression
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {student.attendanceData.monthlyBreakdown.map((m) => (
                  <div key={m.month} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center text-xs">
                    <span className="text-slate-500 font-medium block">{m.month}</span>
                    <span
                      className={`text-base font-extrabold mt-1 block ${
                        m.percentage < 75 ? "text-rose-600" : "text-emerald-700"
                      }`}
                    >
                      {m.percentage}%
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {m.present}/{m.total} Days
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 text-xs text-emerald-900 leading-relaxed flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>PCI Regulatory Compliance Note:</strong> In accordance with Pharmacy Council of India guidelines, student attendance is recorded on a <strong>day-wise</strong> basis by the Principal Assistant (PA) Secretariat Office. A minimum aggregate of 75% working day attendance is required to sit for University Examinations.
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Sessional Marks */}
        {activeTab === "sessional" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 gap-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Continuous Internal Evaluation (CIE) Sessional Marks
                </h3>
                <p className="text-xs text-slate-500">
                  Select semester and sessional examination to inspect detailed theory, practical, and continuous assessment scores.
                </p>
              </div>

              {/* Semester & Sessional Selectors */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Semester Selector */}
                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200 text-xs">
                  <span className="text-slate-500 font-semibold">Semester:</span>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                  >
                    {student.courseShort === "B.Pharm" ? (
                      <option value="Semester I">Semester I (Current 1st Batch)</option>
                    ) : (
                      <option value="Part I (Annual Pattern)">Part I (Annual Pattern - 1st Batch)</option>
                    )}
                  </select>
                </div>

                {/* Sessional Selector */}
                <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200 text-xs">
                  <span className="text-amber-800 font-semibold">Evaluation:</span>
                  <select
                    value={selectedSessional}
                    onChange={(e) => setSelectedSessional(e.target.value as any)}
                    className="bg-transparent font-bold text-amber-900 focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Evaluations (Comprehensive Matrix)</option>
                    <option value="SESSIONAL_1">Sessional Examination I</option>
                    <option value="SESSIONAL_2">Sessional Examination II</option>
                    <option value="INTERNAL_25">Final PCI Internal Weightage (/25)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Quick Sessional Metrics Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Selected Evaluation</span>
                <div className="text-sm font-black text-slate-900 mt-1 truncate">
                  {selectedSessional === "ALL" && "All Sessionals"}
                  {selectedSessional === "SESSIONAL_1" && "Sessional I (Th + Pr)"}
                  {selectedSessional === "SESSIONAL_2" && "Sessional II (Th + Pr)"}
                  {selectedSessional === "INTERNAL_25" && "Final Internal (/25)"}
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Academic Batch</span>
                <div className="text-sm font-black text-emerald-700 mt-1">
                  1st Batch (Inaugural)
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Theory / Practical Standard</span>
                <div className="text-sm font-black text-slate-800 mt-1">
                  PCI 30/15 Scale
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <span className="text-slate-500 font-medium">Average Internal</span>
                <div className="text-sm font-black text-amber-700 mt-1">
                  {(
                    student.sessionalMarks.reduce((acc, m) => acc + m.finalInternal, 0) /
                    student.sessionalMarks.length
                  ).toFixed(1)}{" "}
                  / 25
                </div>
              </div>
            </div>

            {/* View: ALL Sessionals */}
            {selectedSessional === "ALL" && (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Subject Title</th>
                      <th className="py-3 px-4">Sessional I (Th/Pr)</th>
                      <th className="py-3 px-4">Sessional II (Th/Pr)</th>
                      <th className="py-3 px-4">Assignment (/10)</th>
                      <th className="py-3 px-4 text-right">Final Internal (/25)</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.sessionalMarks.map((mark) => (
                      <tr key={mark.code} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">
                          {mark.code}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {mark.subject}
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          <span className="font-semibold text-slate-900">{mark.sessional1Theory}</span>
                          <span className="text-slate-400">/30</span> •{" "}
                          <span className="font-semibold text-slate-900">{mark.sessional1Practical}</span>
                          <span className="text-slate-400">/15</span>
                        </td>
                        <td className="py-3 px-4 text-slate-700">
                          <span className="font-semibold text-slate-900">{mark.sessional2Theory}</span>
                          <span className="text-slate-400">/30</span> •{" "}
                          <span className="font-semibold text-slate-900">{mark.sessional2Practical}</span>
                          <span className="text-slate-400">/15</span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {mark.assignmentScore}/10
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="inline-block px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-900 font-black text-xs">
                            {mark.finalInternal} / 25
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              mark.status === "Distinction"
                                ? "bg-amber-100 text-amber-900"
                                : mark.status === "Pass"
                                ? "bg-emerald-100 text-emerald-900"
                                : "bg-rose-100 text-rose-900"
                            }`}
                          >
                            {mark.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* View: Sessional 1 Specifically */}
            {selectedSessional === "SESSIONAL_1" && (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                      <th className="py-3 px-4">Subject Code</th>
                      <th className="py-3 px-4">Subject Title</th>
                      <th className="py-3 px-4">Theory Score (/30)</th>
                      <th className="py-3 px-4">Practical Score (/15)</th>
                      <th className="py-3 px-4">Total (/45)</th>
                      <th className="py-3 px-4">Percentage</th>
                      <th className="py-3 px-4">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.sessionalMarks.map((mark) => {
                      const total = mark.sessional1Theory + mark.sessional1Practical;
                      const pct = ((total / 45) * 100).toFixed(1);
                      return (
                        <tr key={mark.code} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-mono font-bold text-slate-800">{mark.code}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{mark.subject}</td>
                          <td className="py-3 px-4 font-bold text-emerald-700">
                            {mark.sessional1Theory} <span className="text-slate-400 font-normal">/ 30</span>
                          </td>
                          <td className="py-3 px-4 font-bold text-teal-700">
                            {mark.sessional1Practical} <span className="text-slate-400 font-normal">/ 15</span>
                          </td>
                          <td className="py-3 px-4 font-black text-slate-900">
                            {total} <span className="text-slate-400 font-normal">/ 45</span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                              {pct}%
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-600 text-[11px]">{mark.remarks}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* View: Sessional 2 Specifically */}
            {selectedSessional === "SESSIONAL_2" && (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                      <th className="py-3 px-4">Subject Code</th>
                      <th className="py-3 px-4">Subject Title</th>
                      <th className="py-3 px-4">Theory Score (/30)</th>
                      <th className="py-3 px-4">Practical Score (/15)</th>
                      <th className="py-3 px-4">Total (/45)</th>
                      <th className="py-3 px-4">Trend vs Sessional I</th>
                      <th className="py-3 px-4">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.sessionalMarks.map((mark) => {
                      const total1 = mark.sessional1Theory + mark.sessional1Practical;
                      const total2 = mark.sessional2Theory + mark.sessional2Practical;
                      const diff = total2 - total1;
                      return (
                        <tr key={mark.code} className="hover:bg-slate-50 transition">
                          <td className="py-3 px-4 font-mono font-bold text-slate-800">{mark.code}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{mark.subject}</td>
                          <td className="py-3 px-4 font-bold text-emerald-700">
                            {mark.sessional2Theory} <span className="text-slate-400 font-normal">/ 30</span>
                          </td>
                          <td className="py-3 px-4 font-bold text-teal-700">
                            {mark.sessional2Practical} <span className="text-slate-400 font-normal">/ 15</span>
                          </td>
                          <td className="py-3 px-4 font-black text-slate-900">
                            {total2} <span className="text-slate-400 font-normal">/ 45</span>
                          </td>
                          <td className="py-3 px-4">
                            {diff >= 0 ? (
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                                +{diff} Marks (Improved)
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                                {diff} Marks
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-slate-600 text-[11px]">{mark.remarks}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* View: Final Internal Weightage (/25) */}
            {selectedSessional === "INTERNAL_25" && (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                      <th className="py-3 px-4">Subject Code</th>
                      <th className="py-3 px-4">Subject Title</th>
                      <th className="py-3 px-4">Sessional Average (Scaled to 15)</th>
                      <th className="py-3 px-4">Continuous Assessment (/10)</th>
                      <th className="py-3 px-4 text-right">Final PCI Internal (/25)</th>
                      <th className="py-3 px-4 text-center">Hall Ticket Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {student.sessionalMarks.map((mark) => (
                      <tr key={mark.code} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4 font-mono font-bold text-slate-800">{mark.code}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">{mark.subject}</td>
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {mark.finalInternal - mark.assignmentScore} / 15
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {mark.assignmentScore} / 10
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-900 font-black text-sm">
                            {mark.finalInternal} / 25
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[11px]">
                            ✓ Approved for Exam
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs text-slate-600 leading-relaxed">
              <strong>PCI Regulation Note:</strong> Internal Assessment is calculated from the average of the two sessionals plus the continuous assignment score, normalized to a maximum of 25 marks. This contributes directly towards Dr. M.G.R. Medical University degree certification for the Inaugural 2024-2025 batch.
            </div>
          </div>
        )}

        {/* Tab 5: Semester Marks */}
        {activeTab === "semester" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  The Tamil Nadu Dr. M.G.R. Medical University Examination Results
                </h3>
                <p className="text-xs text-slate-500">
                  Official university grade sheets, credits, SGPA, and cumulative CGPA.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700">
                  Cumulative CGPA:{" "}
                  <strong className="text-emerald-700 text-sm">
                    {student.cgpa.toFixed(2)}
                  </strong>
                </span>
                <button
                  type="button"
                  onClick={() => alert(`Downloading University Transcript for ${student.name} (${student.id})...`)}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Transcript</span>
                </button>
              </div>
            </div>

            {/* Render each semester */}
            <div className="space-y-6">
              {student.semesterMarks.map((sem, sIdx) => (
                <div key={sIdx} className="border border-slate-200 rounded-2xl overflow-hidden">
                  <div className="bg-slate-100/80 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200">
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{sem.semester}</h4>
                      <p className="text-[11px] text-slate-500">Academic Year: {sem.academicYear}</p>
                    </div>

                    <div className="flex items-center gap-3 text-xs">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                        {sem.result}
                      </span>
                      <span className="font-bold text-slate-800">
                        SGPA: <strong className="text-emerald-700 font-black">{sem.sgpa.toFixed(2)}</strong>
                      </span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                          <th className="py-2.5 px-4">Code</th>
                          <th className="py-2.5 px-4">Subject</th>
                          <th className="py-2.5 px-4">Credits</th>
                          <th className="py-2.5 px-4">Internal (/25)</th>
                          <th className="py-2.5 px-4">University (/75)</th>
                          <th className="py-2.5 px-4">Total (/100)</th>
                          <th className="py-2.5 px-4 text-right">Grade</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {sem.subjects.map((sub) => (
                          <tr key={sub.code} className="hover:bg-slate-50">
                            <td className="py-2.5 px-4 font-mono font-bold text-slate-800">
                              {sub.code}
                            </td>
                            <td className="py-2.5 px-4 font-medium text-slate-900">
                              {sub.subject}
                            </td>
                            <td className="py-2.5 px-4 text-slate-600">{sub.credits}</td>
                            <td className="py-2.5 px-4 text-slate-700">{sub.internal}</td>
                            <td className="py-2.5 px-4 text-slate-700">{sub.external}</td>
                            <td className="py-2.5 px-4 font-bold text-slate-900">
                              {sub.total}
                            </td>
                            <td className="py-2.5 px-4 text-right">
                              <span
                                className={`px-2 py-0.5 rounded font-extrabold text-[11px] ${
                                  sub.grade === "O"
                                    ? "bg-purple-100 text-purple-800"
                                    : sub.grade.startsWith("A")
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {sub.grade} ({sub.gradePoint})
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: No Due Form */}
        {activeTab === "nodue" && (
          <StudentNoDueForm student={student} allowAdminActions={false} />
        )}

        {/* Tab 7: Others Data */}
        {activeTab === "others" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
            <div className="pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">
                Hospital Postings, Industrial Training & Clearance
              </h3>
              <p className="text-xs text-slate-500">
                Clinical rotation at GTN Hospital, industrial internships, library clearance, and conduct.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Hospital Clinical Postings */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Hospital className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      GTN Hospital Clinical Postings
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Mandatory Clinical Training & Patient Case Studies
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-200/80 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clinical Facility:</span>
                    <span className="font-bold text-slate-800">
                      {student.otherData.hospitalPostings.hospital}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Department:</span>
                    <span className="font-semibold text-slate-800">
                      {student.otherData.hospitalPostings.department}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hours Completed:</span>
                    <span className="font-bold text-emerald-700">
                      {student.otherData.hospitalPostings.completedHours} /{" "}
                      {student.otherData.hospitalPostings.requiredHours} Hours
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (student.otherData.hospitalPostings.completedHours /
                            student.otherData.hospitalPostings.requiredHours) *
                            100
                        )}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-100">
                      {student.otherData.hospitalPostings.status}
                    </span>
                  </div>
                  <div className="pt-2 text-[11px] text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200">
                    <strong>Preceptor Remarks:</strong> {student.otherData.hospitalPostings.instructorRemarks}
                  </div>
                </div>
              </div>

              {/* Industrial Training */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Briefcase className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      Pharmaceutical Industrial Internship
                    </h4>
                    <p className="text-slate-500 text-[11px]">
                      Practical manufacturing & QC plant experience
                    </p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-slate-200/80 pt-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Organization:</span>
                    <span className="font-bold text-slate-800">
                      {student.otherData.industrialTraining.company}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-semibold text-slate-800">
                      {student.otherData.industrialTraining.duration}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Project Title:</span>
                    <span className="font-semibold text-slate-800 text-right">
                      {student.otherData.industrialTraining.projectTitle}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-100">
                      {student.otherData.industrialTraining.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Library Clearance */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-teal-600" />
                  <span>Central Library Record</span>
                </h4>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Books Borrowed:</span>
                    <span className="font-bold text-slate-800">
                      {student.otherData.library.booksIssued} / {student.otherData.library.maxLimit} Books
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Pending Dues:</span>
                    <span className="font-bold text-emerald-700">
                      ₹{student.otherData.library.pendingDues}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Clearance Status:</span>
                    <span className="font-bold text-emerald-800 px-2 py-0.5 rounded bg-emerald-100">
                      {student.otherData.library.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Conduct & Extracurricular */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Institutional Conduct & Activities</span>
                </h4>
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Disciplinary Conduct:</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                      {student.otherData.conduct}
                    </span>
                  </div>
                  <div className="pt-2">
                    <span className="text-slate-500 block mb-1">Co-curricular & Memberships:</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {student.otherData.extracurricular.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Official Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative">
            <button
              type="button"
              onClick={() => setSelectedReceipt(null)}
              className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 text-lg font-bold"
            >
              ✕
            </button>

            {/* Official Header */}
            <div className="text-center pb-4 border-b border-slate-200">
              <div className="w-12 h-12 rounded-xl bg-white p-1 mx-auto flex items-center justify-center shadow mb-2">
                <Image
                  src="/GTN_Pharmacy_Logo.jpeg"
                  alt="GTN Pharmacy"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <h3 className="font-black text-slate-900 text-base">
                GTN COLLEGE OF PHARMACY
              </h3>
              <p className="text-[11px] text-slate-500 font-semibold">
                G.T. Narayanaswamy Naidu Charities Trust
              </p>
              <p className="text-[10px] text-slate-400">
                G.T.N. Nagar, Karur Road, Dindigul - 624 005
              </p>
              <div className="mt-2 inline-block px-3 py-0.5 rounded-full bg-slate-100 text-[11px] font-bold text-slate-700">
                OFFICIAL FEE RECEIPT
              </div>
            </div>

            <div className="py-4 space-y-2.5 text-xs">
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Receipt No:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.receiptNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date of Payment:</span>
                <span className="font-medium text-slate-800">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Student Name:</span>
                <span className="font-bold text-slate-900">{student.name}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Roll No / Reg No:</span>
                <span className="text-slate-800">{student.id} / {student.bioData.regNo}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Course & Year:</span>
                <span className="text-slate-800">{student.courseShort} - {student.year}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Towards:</span>
                <span className="text-slate-800 font-medium">{selectedReceipt.description}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="text-slate-800">{selectedReceipt.mode}</span>
              </div>

              <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex justify-between items-center">
                <span className="font-bold text-emerald-900 text-xs">Amount Received:</span>
                <span className="text-lg font-black text-emerald-800">
                  ₹{selectedReceipt.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Computer Generated Voucher</span>
              <button
                type="button"
                onClick={() => alert(`Printing Official Receipt ${selectedReceipt.receiptNo}...`)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center gap-1.5 transition"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
