"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  UserCheck,
  Home,
  School,
  GraduationCap,
  IndianRupee,
  CalendarCheck,
  Search,
  Filter,
  ArrowRight,
  LogOut,
  ChevronRight,
  Printer,
  CheckCircle2,
  Receipt,
  ClipboardList,
  AlertCircle,
  ExternalLink,
  BookOpen,
  FileCheck2,
  Megaphone,
  Clock,
  UserPlus,
  ShieldCheck,
  Calendar,
  AlertTriangle,
  PlusCircle,
  Check,
  X,
} from "lucide-react";
import {
  studentsDatabase,
  StudentRecord,
  DailyAttendanceRecord,
  createStudentNoDue,
} from "@/data/portalData";
import AnnouncementsBoard from "@/components/AnnouncementsBoard";
import PostAnnouncementModal from "@/components/PostAnnouncementModal";

type ActiveTab = "ROSTER" | "ATTENDANCE_ENTRY" | "FEE_DESK" | "NODUE_DESK";

export default function PADashboardPage() {
  // Students state initialized with database or localStorage
  const [students, setStudents] = useState<StudentRecord[]>(studentsDatabase);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("ALL");
  const [activeTab, setActiveTab] = useState<ActiveTab>("ROSTER");
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);

  // Daily Attendance Desk State
  const [attendanceDate, setAttendanceDate] = useState("2026-10-01");
  const [attendanceSession, setAttendanceSession] = useState<"Full Day" | "Forenoon (FN)" | "Afternoon (AN)">("Full Day");
  const [attendanceEntries, setAttendanceEntries] = useState<
    Record<string, { status: "PRESENT" | "ABSENT" | "ON_LEAVE"; remarks: string }>
  >({});
  const [attendanceSavedMessage, setAttendanceSavedMessage] = useState("");

  // Fee modal state
  const [showFeeModal, setShowFeeModal] = useState(false);
  const [targetStudent, setTargetStudent] = useState<StudentRecord | null>(studentsDatabase[0] || null);
  const [paymentAmount, setPaymentAmount] = useState<number>(35000);
  const [paymentMode, setPaymentMode] = useState<string>("UPI");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // New Student Form State
  const [newStudentCourse, setNewStudentCourse] = useState<"B.Pharm" | "D.Pharm">("B.Pharm");
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentGender, setNewStudentGender] = useState("Female");
  const [newStudentDob, setNewStudentDob] = useState("2006-05-15");
  const [newStudentBloodGroup, setNewStudentBloodGroup] = useState("O +ve");
  const [newStudentQuota, setNewStudentQuota] = useState<"Government (DME Counseling)" | "Management Quota">("Government (DME Counseling)");
  const [newStudentCategory, setNewStudentCategory] = useState("BC");
  const [newStudentFather, setNewStudentFather] = useState("");
  const [newStudentMother, setNewStudentMother] = useState("");
  const [newStudentMobile, setNewStudentMobile] = useState("+91 ");
  const [newStudentParentMobile, setNewStudentParentMobile] = useState("+91 ");
  const [newStudentEmail, setNewStudentEmail] = useState("");
  const [newStudentAddress, setNewStudentAddress] = useState("");
  const [newStudentInitialFee, setNewStudentInitialFee] = useState<number>(65000);
  const [newStudentFeeMode, setNewStudentFeeMode] = useState<"Online / NetBanking" | "UPI" | "Demand Draft (DD)" | "Challan / Cash">("Online / NetBanking");

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("gtn_students_db");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setStudents(parsed);
          setTargetStudent(parsed[0]);
        }
      }
    } catch (e) {
      console.warn("Could not load stored students:", e);
    }
  }, []);

  // Initialize attendance entries when date or students change
  useEffect(() => {
    const initialMap: Record<string, { status: "PRESENT" | "ABSENT" | "ON_LEAVE"; remarks: string }> = {};
    students.forEach((s) => {
      const existingRecord = s.attendanceData.dailyLogs.find((d) => d.date === attendanceDate);
      if (existingRecord) {
        initialMap[s.id] = {
          status: existingRecord.status,
          remarks: existingRecord.remarks || "Biometric verified by PA",
        };
      } else {
        initialMap[s.id] = {
          status: "PRESENT",
          remarks: "Regular attendance recorded by PA",
        };
      }
    });
    setAttendanceEntries(initialMap);
  }, [attendanceDate, students]);

  // Persist updated students to localStorage
  const saveStudents = (updated: StudentRecord[]) => {
    setStudents(updated);
    try {
      localStorage.setItem("gtn_students_db", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save to localStorage:", e);
    }
  };

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.bioData.regNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse =
      selectedCourse === "ALL" || s.courseShort === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const handleRecordPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudent) return;
    setPaymentSuccess(true);

    setTimeout(() => {
      const receiptId = `RCP-2026-${Date.now().toString().slice(-4)}`;
      const receiptNo = `GTN/FEE/26/${Math.floor(1000 + Math.random() * 9000)}`;

      const newReceipt = {
        id: receiptId,
        receiptNo,
        date: "01 Oct 2026",
        amount: paymentAmount,
        mode: paymentMode as any,
        description: "Term Fee Installment & Laboratory Amenities Clearance",
        status: "Completed" as const,
      };

      const updated = students.map((s) => {
        if (s.id === targetStudent.id) {
          const newPaid = s.feesData.paidAmount + paymentAmount;
          const newPending = Math.max(0, s.feesData.totalPayable - newPaid);
          const newStatus = newPending === 0 ? ("Paid" as const) : ("Partial" as const);
          return {
            ...s,
            feesData: {
              ...s.feesData,
              paidAmount: newPaid,
              pendingAmount: newPending,
              status: newStatus,
              history: [newReceipt, ...s.feesData.history],
            },
          };
        }
        return s;
      });

      saveStudents(updated);
      setPaymentSuccess(false);
      setShowFeeModal(false);
      alert(`Receipt ${receiptNo} issued for ${targetStudent.name}! Amount: ₹${paymentAmount.toLocaleString()} via ${paymentMode}`);
    }, 800);
  };

  // Quick Attendance Actions
  const handleMarkAll = (status: "PRESENT" | "ABSENT") => {
    const updated = { ...attendanceEntries };
    filteredStudents.forEach((s) => {
      updated[s.id] = {
        status,
        remarks: status === "PRESENT" ? "Marked Present by PA Desk" : "Marked Absent by PA Desk",
      };
    });
    setAttendanceEntries(updated);
  };

  const handleSetStudentAttendance = (
    id: string,
    status: "PRESENT" | "ABSENT" | "ON_LEAVE"
  ) => {
    setAttendanceEntries((prev) => ({
      ...prev,
      [id]: {
        status,
        remarks:
          status === "PRESENT"
            ? "Biometric verified by PA"
            : status === "ABSENT"
            ? "Unexcused absence recorded by PA"
            : "Medical / approved leave recorded by PA",
      },
    }));
  };

  const handleSaveAttendance = () => {
    // Format date string
    const d = new Date(attendanceDate);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formatted = `${String(d.getDate()).padStart(2, "0")} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
    const day = dayNames[d.getDay()];

    const updated = students.map((s) => {
      const entry = attendanceEntries[s.id] || { status: "PRESENT", remarks: "Recorded by PA" };
      let logs = [...s.attendanceData.dailyLogs];
      const existingIdx = logs.findIndex((log) => log.date === attendanceDate);

      const record: DailyAttendanceRecord = {
        id: `ATT-${attendanceDate}-${s.id}`,
        date: attendanceDate,
        formattedDate: formatted,
        day,
        status: entry.status,
        session: attendanceSession,
        markedBy: "PA Secretariat Desk",
        remarks: entry.remarks,
      };

      if (existingIdx >= 0) {
        logs[existingIdx] = record;
      } else {
        logs.push(record);
      }

      // Recalculate totals
      const totalWorkingDays = logs.length;
      const presentDays = logs.filter((l) => l.status === "PRESENT").length;
      const absentDays = logs.filter((l) => l.status === "ABSENT").length;
      const leaveDays = logs.filter((l) => l.status === "ON_LEAVE").length;
      const percentage = Number(((presentDays / totalWorkingDays) * 100).toFixed(1));
      const pciEligible = percentage >= 75;

      return {
        ...s,
        attendanceData: {
          ...s.attendanceData,
          totalWorkingDays,
          presentDays,
          absentDays,
          leaveDays,
          percentage,
          pciEligible,
          dailyLogs: logs,
        },
      };
    });

    saveStudents(updated);
    setAttendanceSavedMessage(`Daily attendance for ${formatted} (${attendanceSession}) saved successfully by PA Desk!`);
    setTimeout(() => setAttendanceSavedMessage(""), 5000);
  };

  // Add New Student Handler
  const handleAddNewStudent = (e: React.FormEvent) => {
    e.preventDefault();

    const isBPharm = newStudentCourse === "B.Pharm";
    const prefix = isBPharm ? "GTN24BP" : "GTN24DP";
    const existingCount = students.filter((s) => s.courseShort === newStudentCourse).length;
    const rollSequence = String(existingCount + 1).padStart(3, "0");
    const generatedId = `${prefix}${rollSequence}`;
    const generatedReg = `${isBPharm ? "562415" : "682415"}${rollSequence}`;

    const annualFee = isBPharm ? 95000 : 65000;
    const labFee = isBPharm ? 15000 : 10000;
    const totalPayable = annualFee + labFee;
    const pendingAmount = Math.max(0, totalPayable - newStudentInitialFee);
    const feeStatus = pendingAmount === 0 ? "Paid" : ("Partial" as const);

    const initialReceipt = {
      id: `RCP-2024-${Date.now().toString().slice(-4)}`,
      receiptNo: `GTN/FEE/24/${Math.floor(1000 + Math.random() * 9000)}`,
      date: "01 Oct 2026",
      amount: newStudentInitialFee,
      mode: newStudentFeeMode,
      description: "1st Batch Inaugural Year Admission & Special Lab Fee Clearance",
      status: "Completed" as const,
    };

    // Construct day-wise logs using reference student's structure
    const baseDailyLogs: DailyAttendanceRecord[] = students[0]?.attendanceData.dailyLogs.map((log) => ({
      ...log,
      id: `ATT-${log.date}-${generatedId}`,
      status: "PRESENT",
      remarks: "Regular 1st Batch attendance verified by PA Desk",
    })) || [];

    const newStudent: StudentRecord = {
      id: generatedId,
      name: newStudentName,
      avatar: newStudentGender === "Female"
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces"
        : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
      course: isBPharm
        ? "Bachelor of Pharmacy (B.Pharm)"
        : "Diploma in Pharmacy (D.Pharm)",
      courseShort: newStudentCourse,
      year: "1st Year",
      semester: isBPharm ? "Semester I" : "Part I (Annual Pattern)",
      batch: isBPharm ? "2024 - 2028 (1st Batch)" : "2024 - 2026 (1st Batch)",
      cgpa: 8.5,
      bioData: {
        rollNo: generatedId,
        regNo: generatedReg,
        dob: newStudentDob,
        gender: newStudentGender,
        bloodGroup: newStudentBloodGroup,
        fatherName: newStudentFather || "Parent / Guardian",
        motherName: newStudentMother || "Mother",
        mobile: newStudentMobile,
        parentMobile: newStudentParentMobile,
        email: newStudentEmail || `${generatedId.toLowerCase()}@student.gtnpharmacy.ac.in`,
        address: newStudentAddress || "GTN Campus Quarters, Dindigul, Tamil Nadu",
        quota: newStudentQuota,
        admissionDate: "25 August 2024",
        category: newStudentCategory,
      },
      feesData: {
        annualTuitionFee: annualFee,
        specialLabFee: labFee,
        hostelTransportFee: 0,
        scholarshipConcession: 0,
        totalPayable,
        paidAmount: newStudentInitialFee,
        pendingAmount,
        status: feeStatus,
        history: [initialReceipt],
      },
      attendanceData: {
        totalWorkingDays: baseDailyLogs.length || 46,
        presentDays: baseDailyLogs.length || 46,
        absentDays: 0,
        leaveDays: 0,
        percentage: 100.0,
        pciEligible: true,
        dailyLogs: baseDailyLogs,
        monthlyBreakdown: [
          { month: "Aug", percentage: 100.0, present: 23, total: 23 },
          { month: "Sep", percentage: 100.0, present: 22, total: 22 },
          { month: "Oct", percentage: 100.0, present: 1, total: 1 },
        ],
      },
      sessionalMarks: isBPharm
        ? [
            { code: "BP101T", subject: "Human Anatomy and Physiology I", semester: "Semester I", sessional1Theory: 26, sessional1Practical: 13, sessional2Theory: 27, sessional2Practical: 14, assignmentScore: 9, finalInternal: 23, status: "Pass", remarks: "Good anatomical knowledge" },
            { code: "BP102T", subject: "Pharmaceutical Analysis I", semester: "Semester I", sessional1Theory: 25, sessional1Practical: 13, sessional2Theory: 26, sessional2Practical: 13, assignmentScore: 8, finalInternal: 22, status: "Pass", remarks: "Neat titration records" },
            { code: "BP103T", subject: "Pharmaceutics I", semester: "Semester I", sessional1Theory: 28, sessional1Practical: 14, sessional2Theory: 28, sessional2Practical: 14, assignmentScore: 9, finalInternal: 24, status: "Distinction", remarks: "Accurate dosage preparation" },
            { code: "BP104T", subject: "Pharmaceutical Inorganic Chemistry", semester: "Semester I", sessional1Theory: 25, sessional1Practical: 12, sessional2Theory: 26, sessional2Practical: 13, assignmentScore: 8, finalInternal: 22, status: "Pass", remarks: "Satisfactory assay work" },
          ]
        : [
            { code: "ER20-11T", subject: "Pharmaceutics", semester: "Part I (Annual Pattern)", sessional1Theory: 26, sessional1Practical: 14, sessional2Theory: 27, sessional2Practical: 14, assignmentScore: 9, finalInternal: 23, status: "Distinction", remarks: "Good practical formulations" },
            { code: "ER20-12T", subject: "Pharmaceutical Chemistry", semester: "Part I (Annual Pattern)", sessional1Theory: 25, sessional1Practical: 13, sessional2Theory: 26, sessional2Practical: 13, assignmentScore: 8, finalInternal: 22, status: "Pass", remarks: "Limit test verified" },
            { code: "ER20-13T", subject: "Pharmacognosy", semester: "Part I (Annual Pattern)", sessional1Theory: 27, sessional1Practical: 14, sessional2Theory: 27, sessional2Practical: 14, assignmentScore: 9, finalInternal: 24, status: "Distinction", remarks: "Herbarium sheets completed" },
          ],
      semesterMarks: [
        {
          semester: isBPharm ? "Semester I Evaluation" : "Part I Annual Evaluation",
          academicYear: "2024 - 2025 (Inaugural Year)",
          sgpa: 8.5,
          result: "PASS",
          subjects: [
            { code: isBPharm ? "BP101T" : "ER20-11T", subject: isBPharm ? "Anatomy & Physiology" : "Pharmaceutics", credits: 4, internal: 23, external: 62, total: 85, grade: "A+", gradePoint: 9 },
            { code: isBPharm ? "BP102T" : "ER20-12T", subject: isBPharm ? "Analysis I" : "Chemistry", credits: 4, internal: 22, external: 60, total: 82, grade: "A+", gradePoint: 9 },
          ],
        },
      ],
      otherData: {
        hospitalPostings: {
          hospital: "GTN Hospital, Dindigul",
          department: "General Dispensary",
          completedHours: 25,
          requiredHours: 50,
          status: "In Progress",
          instructorRemarks: "Initial hospital orientation completed.",
        },
        industrialTraining: {
          company: "GTN Trust Industrial Unit",
          duration: "1 Day",
          projectTitle: "Sterile area orientation",
          status: "Completed",
        },
        library: {
          booksIssued: 1,
          maxLimit: isBPharm ? 5 : 3,
          pendingDues: 0,
          status: "Clearance Granted",
        },
        extracurricular: ["Member of 1st Batch Pharmacy Association"],
        conduct: "Good",
      },
      noDueData: createStudentNoDue(generatedId, pendingAmount, 0, 100, true),
    };

    const updatedStudents = [newStudent, ...students];
    saveStudents(updatedStudents);
    setShowAddStudentModal(false);
    // Reset form
    setNewStudentName("");
    setNewStudentFather("");
    setNewStudentMother("");
    setNewStudentAddress("");
    alert(`Student ${newStudentName} registered successfully under 1st Batch ${newStudentCourse} with ID: ${generatedId}!`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            title="GTN College of Pharmacy - Return to Home"
            className="flex items-center gap-3 group transition"
          >
            <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shadow group-hover:ring-2 group-hover:ring-teal-400 transition">
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
                <span className="font-bold text-sm sm:text-base text-white tracking-wide group-hover:text-teal-400 transition">
                  GTN College of Pharmacy
                </span>
                <span className="hidden md:inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-md bg-teal-500/20 text-teal-400 border border-teal-500/30">
                  Principal Assistant (PA) Desk
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Principal&apos;s Secretariat • Inaugural 1st Batch Administration
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="text-xs px-3 py-1.5 rounded-lg bg-teal-600/20 hover:bg-teal-600/30 text-teal-300 hover:text-white transition border border-teal-500/40 flex items-center gap-1.5 font-medium shadow-sm group"
              title="Return to Main Website Homepage"
            >
              <Home className="w-3.5 h-3.5 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Go to Home</span>
            </Link>

            <Link
              href="/dashboard/principal"
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700 flex items-center gap-1.5"
            >
              <School className="w-3.5 h-3.5 text-emerald-400" />
              <span>Principal Dashboard</span>
            </Link>

            <Link
              href={`/student/${students[0]?.id || "GTN24BP001"}`}
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

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-500/20 border border-teal-500/30 p-2 shrink-0 flex items-center justify-center text-teal-300">
              <UserCheck className="w-9 h-9" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-teal-400/20 text-teal-300 text-xs font-semibold mb-2 border border-teal-400/30">
                Inaugural Year Administrative Desk
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Principal Assistant & Secretariat Operations
              </h1>
              <p className="text-teal-200/90 text-xs sm:text-sm mt-0.5">
                Daily Day-Wise Attendance Entry, Student Bio-Data Registration, Fee Receipts, and University Clearances for 1st Batch.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => setShowAddStudentModal(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 text-xs font-black transition flex items-center gap-2 shadow-lg"
            >
              <UserPlus className="w-4 h-4" />
              <span>+ Add New Student (1st Batch)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("ATTENDANCE_ENTRY")}
              className="px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Daily Attendance Desk</span>
            </button>

            <button
              type="button"
              onClick={() => setShowAnnouncementModal(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-2 shadow"
            >
              <Megaphone className="w-4 h-4" />
              <span>Post Announcement</span>
            </button>
          </div>
        </div>

        {/* Operational Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">1st Batch Students</div>
              <div className="text-xl font-bold text-slate-900 mt-0.5">{students.length} Registered</div>
              <div className="text-[11px] text-teal-600 font-medium">B.Pharm & D.Pharm (1st Year)</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Receipt className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Today&apos;s Receipts</div>
              <div className="text-xl font-bold text-slate-900 mt-0.5">₹ 2,45,000</div>
              <div className="text-[11px] text-emerald-600 font-medium">GTN Charities Trust Account</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <CalendarCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">Day-Wise Attendance</div>
              <div className="text-xl font-bold text-slate-900 mt-0.5">PA Entry Desk</div>
              <div className="text-[11px] text-blue-600 font-medium">Recorded by PA Secretariat</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <ClipboardList className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-semibold uppercase">CIE Sessional Marks</div>
              <div className="text-xl font-bold text-slate-900 mt-0.5">Sessional I & II</div>
              <div className="text-[11px] text-amber-600 font-medium">Continuous internal evaluation</div>
            </div>
          </div>
        </div>

        {/* Success Alert Banner if attendance saved */}
        {attendanceSavedMessage && (
          <div className="p-4 bg-emerald-100 border border-emerald-300 rounded-2xl text-emerald-900 text-xs font-bold flex items-center gap-2 shadow-sm animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
            <span>{attendanceSavedMessage}</span>
          </div>
        )}

        {/* Campus Circulars & Announcements Section */}
        <AnnouncementsBoard
          allowPost={true}
          userRole="pa"
          defaultPoster="PA Secretariat Office"
        />

        {/* Tab switcher */}
        <div className="flex border-b border-slate-200 gap-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab("ROSTER")}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === "ROSTER"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Student Administration Roster</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("ATTENDANCE_ENTRY")}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === "ATTENDANCE_ENTRY"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Daily Attendance Entry Desk (PA)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("FEE_DESK")}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === "FEE_DESK"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>Fee Collection Desk & Receipts</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("NODUE_DESK")}
            className={`pb-3 text-xs sm:text-sm font-bold flex items-center gap-2 border-b-2 transition whitespace-nowrap ${
              activeTab === "NODUE_DESK"
                ? "border-teal-600 text-teal-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <FileCheck2 className="w-4 h-4" />
            <span>No Due Clearance Desk</span>
          </button>
        </div>

        {/* Tab 1: Student Roster */}
        {activeTab === "ROSTER" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-0">
            <div className="p-4 bg-slate-50/80 border-b border-slate-200/60 flex flex-col sm:flex-row items-center justify-between gap-3">
              {/* Search */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search name, roll no, phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Course filter & Add student button */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Filter Course:</span>
                  <select
                    value={selectedCourse}
                    onChange={(e) => setSelectedCourse(e.target.value)}
                    className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    <option value="ALL">All 1st Batch Courses</option>
                    <option value="B.Pharm">B.Pharm (1st Batch)</option>
                    <option value="D.Pharm">D.Pharm (1st Batch)</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(true)}
                  className="px-3 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>+ Add Student</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-4">Student & Contact</th>
                    <th className="py-3 px-4">Course & Batch</th>
                    <th className="py-3 px-4">Parent Phone</th>
                    <th className="py-3 px-4">Fee Balance</th>
                    <th className="py-3 px-4">Day-Wise Attendance</th>
                    <th className="py-3 px-4 text-right">Desk Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredStudents.map((std) => (
                    <tr key={std.id} className="hover:bg-teal-50/30 transition">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={std.avatar}
                            alt={std.name}
                            className="w-9 h-9 rounded-full object-cover border border-slate-200"
                          />
                          <div>
                            <div className="font-bold text-slate-900">{std.name}</div>
                            <div className="text-[11px] text-slate-400 font-mono">
                              {std.id} • {std.bioData.mobile}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">
                          {std.courseShort} ({std.year})
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {std.batch}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-medium text-slate-700">
                          {std.bioData.fatherName}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">
                          {std.bioData.parentMobile}
                        </div>
                      </td>

                      <td className="py-3 px-4">
                        {std.feesData.pendingAmount === 0 ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                            <CheckCircle2 className="w-3 h-3" />
                            Fully Paid
                          </span>
                        ) : (
                          <div>
                            <span className="font-bold text-rose-700">
                              ₹{std.feesData.pendingAmount.toLocaleString()}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-1">due</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <span
                          className={`font-bold ${
                            std.attendanceData.percentage < 75
                              ? "text-rose-600"
                              : "text-emerald-700"
                          }`}
                        >
                          {std.attendanceData.percentage}%
                        </span>
                        <div className="text-[10px] text-slate-400">
                          {std.attendanceData.presentDays}/{std.attendanceData.totalWorkingDays} days
                        </div>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setTargetStudent(std);
                              setShowFeeModal(true);
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 font-semibold text-[11px] transition"
                          >
                            + Fee Pay
                          </button>
                          <Link
                            href={`/student/${std.id}`}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-900 text-white hover:bg-teal-700 font-semibold text-[11px] transition flex items-center gap-1"
                          >
                            <span>Dossier</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Daily Attendance Entry Desk (Requirement 1 & 2) */}
        {activeTab === "ATTENDANCE_ENTRY" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200 mb-2">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  PCI Section 14 Daily Roll Desk
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Daily Attendance Entry Desk
                </h3>
                <p className="text-xs text-slate-500">
                  Day-wise attendance roll call entry conducted by the Principal Assistant (PA) Secretariat.
                </p>
              </div>

              {/* Quick Batch Marking Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleMarkAll("PRESENT")}
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <Check className="w-4 h-4" />
                  <span>Mark All Present</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleMarkAll("ABSENT")}
                  className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow"
                >
                  <X className="w-4 h-4" />
                  <span>Mark All Absent</span>
                </button>
              </div>
            </div>

            {/* Attendance Control Bar */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Attendance Date:
                </label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Academic Course:
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="ALL">All 1st Batch Students</option>
                  <option value="B.Pharm">B.Pharm (1st Batch 2024-2028)</option>
                  <option value="D.Pharm">D.Pharm (1st Batch 2024-2026)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Daily Session:
                </label>
                <select
                  value={attendanceSession}
                  onChange={(e) => setAttendanceSession(e.target.value as any)}
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Full Day">Full Day (Forenoon + Afternoon)</option>
                  <option value="Forenoon (FN)">Forenoon Session (FN)</option>
                  <option value="Afternoon (AN)">Afternoon Session (AN)</option>
                </select>
              </div>
            </div>

            {/* Live Day Attendance Summary Bar */}
            {(() => {
              const total = filteredStudents.length;
              const presentCount = filteredStudents.filter((s) => (attendanceEntries[s.id]?.status || "PRESENT") === "PRESENT").length;
              const absentCount = filteredStudents.filter((s) => attendanceEntries[s.id]?.status === "ABSENT").length;
              const leaveCount = filteredStudents.filter((s) => attendanceEntries[s.id]?.status === "ON_LEAVE").length;
              const rate = total > 0 ? ((presentCount / total) * 100).toFixed(1) : "0";

              return (
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
                  <div className="p-3 bg-slate-100 rounded-xl border border-slate-200">
                    <span className="text-slate-500 block">Enrolled on Roll</span>
                    <span className="text-lg font-black text-slate-900">{total} Students</span>
                  </div>
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <span className="text-emerald-700 block">Present Today</span>
                    <span className="text-lg font-black text-emerald-800">{presentCount}</span>
                  </div>
                  <div className="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <span className="text-rose-700 block">Absent Today</span>
                    <span className="text-lg font-black text-rose-800">{absentCount}</span>
                  </div>
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200">
                    <span className="text-amber-700 block">On Leave</span>
                    <span className="text-lg font-black text-amber-800">{leaveCount}</span>
                  </div>
                  <div className="p-3 bg-teal-50 rounded-xl border border-teal-200">
                    <span className="text-teal-700 block">Today&apos;s Attendance Rate</span>
                    <span className="text-lg font-black text-teal-900">{rate}%</span>
                  </div>
                </div>
              );
            })()}

            {/* Attendance Marking Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                    <th className="py-3 px-4">Student Details</th>
                    <th className="py-3 px-4">Course</th>
                    <th className="py-3 px-4 text-center">Status Entry (PA Desk)</th>
                    <th className="py-3 px-4">Secretariat Remarks / Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((std) => {
                    const currentEntry = attendanceEntries[std.id] || {
                      status: "PRESENT",
                      remarks: "Biometric verified by PA",
                    };

                    return (
                      <tr key={std.id} className="hover:bg-slate-50 transition">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={std.avatar}
                              alt={std.name}
                              className="w-9 h-9 rounded-full object-cover border border-slate-200"
                            />
                            <div>
                              <div className="font-bold text-slate-900">{std.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono">
                                {std.id} • {std.bioData.quota}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {std.courseShort} (1st Year)
                        </td>

                        {/* Status Toggle Buttons */}
                        <td className="py-3 px-4">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleSetStudentAttendance(std.id, "PRESENT")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
                                currentEntry.status === "PRESENT"
                                  ? "bg-emerald-600 text-white border-emerald-700 shadow"
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700"
                              }`}
                            >
                              <Check className="w-3.5 h-3.5" />
                              <span>Present</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSetStudentAttendance(std.id, "ABSENT")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
                                currentEntry.status === "ABSENT"
                                  ? "bg-rose-600 text-white border-rose-700 shadow"
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-700"
                              }`}
                            >
                              <X className="w-3.5 h-3.5" />
                              <span>Absent</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleSetStudentAttendance(std.id, "ON_LEAVE")}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 border ${
                                currentEntry.status === "ON_LEAVE"
                                  ? "bg-amber-600 text-white border-amber-700 shadow"
                                  : "bg-white text-slate-600 border-slate-200 hover:bg-amber-50 hover:text-amber-700"
                              }`}
                            >
                              <Clock className="w-3.5 h-3.5" />
                              <span>Leave</span>
                            </button>
                          </div>
                        </td>

                        {/* Remarks Input */}
                        <td className="py-3 px-4">
                          <input
                            type="text"
                            value={currentEntry.remarks}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAttendanceEntries((prev) => ({
                                ...prev,
                                [std.id]: {
                                  ...prev[std.id],
                                  remarks: val,
                                },
                              }));
                            }}
                            className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-teal-500"
                            placeholder="Reason or notes..."
                          />
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Commit Button */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200">
              <span className="text-xs text-slate-500 font-medium">
                Entered and verified by Principal Assistant (PA) Office.
              </span>
              <button
                type="button"
                onClick={handleSaveAttendance}
                className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-extrabold transition shadow-lg flex items-center gap-2"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Save & Record Daily Attendance</span>
              </button>
            </div>
          </div>
        )}

        {/* Tab 3: Fee Desk */}
        {activeTab === "FEE_DESK" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Recent Official Fee Receipts Generated
                </h3>
                <p className="text-xs text-slate-500">
                  Official GTN Charities Trust accounts ledger transactions.
                </p>
              </div>
              <button
                type="button"
                onClick={() => alert("Printing Day Cashbook Ledger for GTN College of Pharmacy...")}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-2 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Day Ledger</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-2.5 px-3">Receipt No</th>
                    <th className="py-2.5 px-3">Student Name & Roll</th>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Amount</th>
                    <th className="py-2.5 px-3">Payment Mode</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {students.flatMap((s) =>
                    s.feesData.history.map((h) => (
                      <tr key={h.receiptNo} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-teal-800">
                          {h.receiptNo}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-800">{s.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{s.id}</div>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{h.date}</td>
                        <td className="py-2.5 px-3 font-bold text-emerald-700">
                          ₹{h.amount.toLocaleString()}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border text-slate-700 text-[10px] font-medium">
                            {h.mode}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">{h.description}</td>
                        <td className="py-2.5 px-3 text-right">
                          <Link
                            href={`/student/${s.id}?tab=fees`}
                            className="text-teal-700 hover:text-teal-900 font-semibold text-[11px] inline-flex items-center gap-1"
                          >
                            <span>Inspect</span>
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: No Due Desk */}
        {activeTab === "NODUE_DESK" && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <FileCheck2 className="w-5 h-5 text-teal-600" />
                  <span>Student No Due Clearance & Hall Ticket Approvals</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Track, verify, and sanction departmental clearances for university examinations.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">
                  Showing <strong>{filteredStudents.length}</strong> students
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3">Certificate No</th>
                    <th className="py-2.5 px-3">Course & Year</th>
                    <th className="py-2.5 px-3">Clearance Status</th>
                    <th className="py-2.5 px-3">Pending Checkpoints</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((std) => {
                    const pendingList = std.noDueData.clearances.filter((c) => c.status === "PENDING");
                    return (
                      <tr key={std.id} className="hover:bg-teal-50/20">
                        <td className="py-3 px-3">
                          <div className="font-bold text-slate-900">{std.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            {std.id} • {std.bioData.regNo}
                          </div>
                        </td>

                        <td className="py-3 px-3 font-mono font-medium text-slate-700">
                          {std.noDueData.certificateNo}
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-800">{std.courseShort}</div>
                          <div className="text-[10px] text-slate-400">{std.year}</div>
                        </td>

                        <td className="py-3 px-3">
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              std.noDueData.overallStatus === "CLEARED"
                                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                                : "bg-amber-100 text-amber-800 border border-amber-300"
                            }`}
                          >
                            {std.noDueData.overallStatus === "CLEARED" ? (
                              <>
                                <CheckCircle2 className="w-3 h-3" />
                                <span>ALL CLEARED</span>
                              </>
                            ) : (
                              <>
                                <Clock className="w-3 h-3" />
                                <span>PENDING DUES</span>
                              </>
                            )}
                          </span>
                        </td>

                        <td className="py-3 px-3">
                          {pendingList.length === 0 ? (
                            <span className="text-emerald-700 font-semibold text-[11px]">
                              0 pending (All 9 depts cleared)
                            </span>
                          ) : (
                            <div className="space-y-0.5">
                              {pendingList.map((p) => (
                                <div key={p.id} className="text-rose-600 font-medium text-[11px]">
                                  • {p.department} ({p.dueAmount > 0 ? `₹${p.dueAmount}` : "Attendance / Log"})
                                </div>
                              ))}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3 text-right">
                          <Link
                            href={`/student/${std.id}`}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-teal-700 text-white font-medium text-[11px] transition shadow-sm"
                          >
                            <span>Inspect & Sanction</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Collect Fee Modal */}
      {showFeeModal && targetStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Record Fee Payment
                  </h3>
                  <p className="text-xs text-slate-500">
                    G.T. Narayanaswamy Naidu Charities Trust Account
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowFeeModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordPayment} className="mt-4 space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
                <div className="flex justify-between font-semibold text-slate-800">
                  <span>Student:</span>
                  <span>{targetStudent.name} ({targetStudent.id})</span>
                </div>
                <div className="flex justify-between text-slate-600 mt-1">
                  <span>Course / Year:</span>
                  <span>{targetStudent.courseShort} - {targetStudent.year}</span>
                </div>
                <div className="flex justify-between text-slate-600 mt-1">
                  <span>Pending Fee Balance:</span>
                  <span className="font-bold text-rose-600">
                    ₹{targetStudent.feesData.pendingAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Payment Mode
                </label>
                <select
                  value={paymentMode}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:ring-2 focus:ring-teal-500 focus:outline-none"
                >
                  <option value="UPI">UPI (Google Pay / PhonePe / Paytm)</option>
                  <option value="Online / NetBanking">Online NetBanking / NEFT / RTGS</option>
                  <option value="Demand Draft (DD)">Demand Draft (DD) favoring GTN Trust</option>
                  <option value="Challan / Cash">Bank Challan / Cash Deposit</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowFeeModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={paymentSuccess}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-2"
                >
                  {paymentSuccess ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Generating Receipt...</span>
                    </>
                  ) : (
                    <>
                      <Receipt className="w-4 h-4" />
                      <span>Issue Receipt & Save</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Student Modal (Requirement 3) */}
      {showAddStudentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    Register New Student (1st Batch Inaugural 2024)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Enroll student into GTN College of Pharmacy Registrar database.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddStudentModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewStudent} className="mt-4 space-y-4 text-xs">
              {/* Academic Enrollment */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block text-teal-800">
                  1. Academic Enrollment (Inaugural Year 2024)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Academic Program:
                    </label>
                    <select
                      value={newStudentCourse}
                      onChange={(e) => {
                        const c = e.target.value as "B.Pharm" | "D.Pharm";
                        setNewStudentCourse(c);
                        setNewStudentInitialFee(c === "B.Pharm" ? 65000 : 45000);
                      }}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="B.Pharm">Bachelor of Pharmacy (B.Pharm) - 1st Batch</option>
                      <option value="D.Pharm">Diploma in Pharmacy (D.Pharm) - 1st Batch</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Admission Quota:
                    </label>
                    <select
                      value={newStudentQuota}
                      onChange={(e) => setNewStudentQuota(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Government (DME Counseling)">Government (DME Counseling)</option>
                      <option value="Management Quota">Management Quota</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Community / Category:
                    </label>
                    <select
                      value={newStudentCategory}
                      onChange={(e) => setNewStudentCategory(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="OC">OC (Open Competition)</option>
                      <option value="BC">BC (Backward Class)</option>
                      <option value="BCM">BCM (BC Muslim)</option>
                      <option value="MBC">MBC / DNC</option>
                      <option value="SC">SC (Scheduled Caste)</option>
                      <option value="SCA">SCA (SC Arunthathiyar)</option>
                      <option value="ST">ST (Scheduled Tribe)</option>
                    </select>
                  </div>

                  <div className="flex items-center text-slate-500 text-[11px] pt-4">
                    <span>Year: <strong>1st Year</strong> • Pattern: <strong>{newStudentCourse === "B.Pharm" ? "Semester I" : "Part I Annual"}</strong></span>
                  </div>
                </div>
              </div>

              {/* Bio-Data & Personal Details */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block text-teal-800">
                  2. Student Bio-Data
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-slate-700 font-semibold mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Karthikeyan"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Gender:
                    </label>
                    <select
                      value={newStudentGender}
                      onChange={(e) => setNewStudentGender(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Date of Birth:
                    </label>
                    <input
                      type="date"
                      value={newStudentDob}
                      onChange={(e) => setNewStudentDob(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Blood Group:
                    </label>
                    <select
                      value={newStudentBloodGroup}
                      onChange={(e) => setNewStudentBloodGroup(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="O +ve">O +ve</option>
                      <option value="A +ve">A +ve</option>
                      <option value="B +ve">B +ve</option>
                      <option value="AB +ve">AB +ve</option>
                      <option value="O -ve">O -ve</option>
                      <option value="A -ve">A -ve</option>
                      <option value="B -ve">B -ve</option>
                      <option value="AB -ve">AB -ve</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Student Phone:
                    </label>
                    <input
                      type="text"
                      placeholder="+91 98421 XXXXX"
                      value={newStudentMobile}
                      onChange={(e) => setNewStudentMobile(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Student Email:
                    </label>
                    <input
                      type="email"
                      placeholder="student@gtnpharmacy.ac.in"
                      value={newStudentEmail}
                      onChange={(e) => setNewStudentEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Parent & Address */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block text-teal-800">
                  3. Parent / Guardian & Permanent Address
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Father&apos;s Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Father's full name"
                      value={newStudentFather}
                      onChange={(e) => setNewStudentFather(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Mother&apos;s Name
                    </label>
                    <input
                      type="text"
                      placeholder="Mother's name"
                      value={newStudentMother}
                      onChange={(e) => setNewStudentMother(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Parent Contact Phone *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="+91 94432 XXXXX"
                      value={newStudentParentMobile}
                      onChange={(e) => setNewStudentParentMobile(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Permanent Address
                    </label>
                    <input
                      type="text"
                      placeholder="Door No, Street, Town, District - Pincode"
                      value={newStudentAddress}
                      onChange={(e) => setNewStudentAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>

              {/* Initial Fee Collection */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] block text-teal-800">
                  4. Initial Admission Fee Collection
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Initial Paid Amount (₹):
                    </label>
                    <input
                      type="number"
                      required
                      value={newStudentInitialFee}
                      onChange={(e) => setNewStudentInitialFee(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 font-bold"
                    />
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Total 1st Year Fee: ₹{(newStudentCourse === "B.Pharm" ? 110000 : 75000).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-semibold mb-1">
                      Payment Mode:
                    </label>
                    <select
                      value={newStudentFeeMode}
                      onChange={(e) => setNewStudentFeeMode(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Online / NetBanking">Online NetBanking / NEFT</option>
                      <option value="UPI">UPI (Google Pay / PhonePe)</option>
                      <option value="Demand Draft (DD)">Demand Draft (DD)</option>
                      <option value="Challan / Cash">Cash Challan</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddStudentModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-xs font-bold transition shadow flex items-center gap-2"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register & Create Student Record</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Post Announcement Modal */}
      <PostAnnouncementModal
        isOpen={showAnnouncementModal}
        onClose={() => setShowAnnouncementModal(false)}
        defaultPoster="PA Secretariat Office"
      />
    </div>
  );
}
