"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  FileCheck2,
  Printer,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  Building,
  BookOpen,
  Beaker,
  Hospital,
  ShieldCheck,
  UserCheck,
  Send,
  Download,
  QrCode,
  Sparkles,
} from "lucide-react";
import { StudentRecord, DepartmentClearance, StudentNoDueData } from "@/data/portalData";

interface Props {
  student: StudentRecord;
  allowAdminActions?: boolean;
}

export default function StudentNoDueForm({ student, allowAdminActions = false }: Props) {
  const [noDueData, setNoDueData] = useState<StudentNoDueData>(student.noDueData);
  const [requestSent, setRequestSent] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const handleAdminClearDepartment = (depId: string) => {
    const updatedClearances = noDueData.clearances.map((c) => {
      if (c.id === depId) {
        return {
          ...c,
          status: "CLEARED" as const,
          dueAmount: 0,
          clearedDate: new Date().toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          remarks: "Verified and approved by Secretariat Admin Desk.",
        };
      }
      return c;
    });

    const allNowCleared = updatedClearances.every((c) => c.status === "CLEARED");

    setNoDueData({
      ...noDueData,
      overallStatus: allNowCleared ? "CLEARED" : "PENDING",
      clearances: updatedClearances,
      principalApproval: {
        ...noDueData.principalApproval,
        approved: allNowCleared,
        approvalDate: allNowCleared
          ? new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : undefined,
        digitalSignature: allNowCleared
          ? "Dr. S. K. Rathinam, Principal (Digitally Signed)"
          : "Pending Department Clearance",
        remarks: allNowCleared
          ? "All departmental dues cleared. Official university examination hall ticket sanctioned."
          : "Clearance withheld pending completion of remaining departmental dues.",
      },
    });
  };

  const handleRequestClearance = (dep: DepartmentClearance) => {
    setRequestSent(dep.id);
    setTimeout(() => {
      alert(`Clearance request submitted to ${dep.department} (${dep.inCharge}). Notification dispatched.`);
      setRequestSent(null);
    }, 500);
  };

  const isAllCleared = noDueData.overallStatus === "CLEARED";
  const pendingCount = noDueData.clearances.filter((c) => c.status === "PENDING").length;

  return (
    <div className="space-y-6">
      {/* Overview Status Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 transition ${
          isAllCleared
            ? "bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white border-emerald-500/30"
            : "bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 text-white border-amber-500/30"
        }`}
      >
        <div className="flex items-start gap-4">
          <div
            className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 border ${
              isAllCleared
                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
            }`}
          >
            {isAllCleared ? (
              <CheckCircle2 className="w-9 h-9" />
            ) : (
              <Clock className="w-9 h-9" />
            )}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span
                className={`px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-wider border ${
                  isAllCleared
                    ? "bg-emerald-400/20 text-emerald-300 border-emerald-400/30"
                    : "bg-amber-400/20 text-amber-300 border-amber-400/30"
                }`}
              >
                {isAllCleared ? "✓ NO DUE CLEARED & SANCTIONED" : "⚠️ CLEARANCE IN PROGRESS"}
              </span>
              <span className="text-xs text-slate-300 font-mono">
                Cert No: <strong>{noDueData.certificateNo}</strong>
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Student No Due Clearance Form
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Purpose: <strong>{noDueData.purpose}</strong> • Application Date:{" "}
              {noDueData.applicationDate}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPrintModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white text-slate-950 font-bold text-xs hover:bg-slate-100 transition shadow flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Certificate</span>
          </button>
        </div>
      </div>

      {/* Summary Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-slate-500 font-medium">Total Checkpoints</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {noDueData.clearances.length} Departments
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-slate-500 font-medium">Cleared Departments</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">
            {noDueData.clearances.filter((c) => c.status === "CLEARED").length}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-slate-500 font-medium">Pending Approvals</span>
          <div
            className={`text-2xl font-black mt-1 ${
              pendingCount > 0 ? "text-amber-600" : "text-emerald-700"
            }`}
          >
            {pendingCount}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-slate-500 font-medium">Principal Sanction</span>
          <div
            className={`text-sm font-black mt-2 inline-flex items-center gap-1 ${
              noDueData.principalApproval.approved
                ? "text-emerald-700"
                : "text-amber-700"
            }`}
          >
            {noDueData.principalApproval.approved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Executive Approved</span>
              </>
            ) : (
              <>
                <Clock className="w-4 h-4" />
                <span>Awaiting Dues Resolution</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Department Clearances Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-teal-600" />
              <span>Departmental Clearance Verification Record</span>
            </h3>
            <p className="text-xs text-slate-500">
              Mandatory clearance from all laboratories, accounts, hospital, library, and faculty mentor.
            </p>
          </div>

          <div className="text-xs text-slate-500">
            Student: <strong>{student.name} ({student.id})</strong>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100 text-[11px] font-bold text-slate-600 uppercase border-b border-slate-200">
                <th className="py-3 px-4">Department / Section</th>
                <th className="py-3 px-4">Faculty In-Charge</th>
                <th className="py-3 px-4">Clearance Status</th>
                <th className="py-3 px-4">Dues (₹)</th>
                <th className="py-3 px-4">Verification Remarks</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {noDueData.clearances.map((dep) => (
                <tr key={dep.id} className="hover:bg-slate-50 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{dep.department}</div>
                    {dep.clearedDate && (
                      <div className="text-[10px] text-slate-400">
                        Cleared on: {dep.clearedDate}
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {dep.inCharge}
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        dep.status === "CLEARED"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                      }`}
                    >
                      {dep.status === "CLEARED" ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>CLEARED</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3.5 h-3.5" />
                          <span>PENDING DUES</span>
                        </>
                      )}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold">
                    {dep.dueAmount > 0 ? (
                      <span className="text-rose-600">
                        ₹{dep.dueAmount.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-emerald-700">₹ 0 (Nil)</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600 max-w-xs leading-relaxed">
                    {dep.remarks}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {dep.status === "PENDING" ? (
                      <div className="flex items-center justify-end gap-2">
                        {allowAdminActions && (
                          <button
                            type="button"
                            onClick={() => handleAdminClearDepartment(dep.id)}
                            className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] transition shadow"
                          >
                            Mark Cleared
                          </button>
                        )}
                        <button
                          type="button"
                          disabled={requestSent === dep.id}
                          onClick={() => handleRequestClearance(dep)}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 font-semibold text-[11px] transition flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>{requestSent === dep.id ? "Sending..." : "Request Clearance"}</span>
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-emerald-700 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Principal Executive Seal Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 shadow">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Executive Institutional Sanction
            </span>
            <h4 className="text-base font-extrabold text-slate-900">
              Principal Dr. S. K. Rathinam, M.Pharm., Ph.D.
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {noDueData.principalApproval.remarks}
            </p>
          </div>
        </div>

        <div className="text-right border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6">
          <div className="font-mono text-xs font-bold text-slate-700">
            Digital Sanction ID:
          </div>
          <div
            className={`font-semibold text-xs mt-0.5 ${
              isAllCleared ? "text-emerald-700 font-bold" : "text-amber-600"
            }`}
          >
            {noDueData.principalApproval.digitalSignature}
          </div>
          {noDueData.principalApproval.approvalDate && (
            <div className="text-[10px] text-slate-400 mt-1">
              Date: {noDueData.principalApproval.approvalDate}
            </div>
          )}
        </div>
      </div>

      {/* Official Printable No Due Certificate Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl border-4 border-emerald-950 relative my-8">
            <button
              type="button"
              onClick={() => setShowPrintModal(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-slate-600 text-xl font-bold"
            >
              ✕
            </button>

            {/* Certificate Institutional Header */}
            <div className="text-center pb-6 border-b-2 border-emerald-900">
              <div className="w-16 h-16 rounded-2xl bg-white p-1 mx-auto flex items-center justify-center shadow mb-3 border border-slate-200">
                <Image
                  src="/GTN_Pharmacy_Logo.jpeg"
                  alt="GTN Pharmacy"
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-emerald-950 tracking-wide uppercase">
                GTN College of Pharmacy
              </h2>
              <p className="text-xs font-bold text-slate-700">
                Managed by G.T. Narayanaswamy Naidu Charities Trust (Est. 1964)
              </p>
              <p className="text-[11px] text-slate-500">
                G.T.N. Nagar, Karur Road, Dindigul - 624 005, Tamil Nadu
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">
                Approved by Pharmacy Council of India (PCI), New Delhi • Affiliated to The Tamil Nadu Dr. M.G.R. Medical University, Chennai
              </p>

              <div className="mt-4 inline-block px-6 py-1.5 rounded-full bg-emerald-900 text-white text-xs font-black uppercase tracking-widest">
                OFFICIAL NO DUE CLEARANCE CERTIFICATE
              </div>
            </div>

            {/* Certificate Body */}
            <div className="py-6 space-y-4 text-xs">
              <div className="flex justify-between items-center text-slate-600 font-mono text-[11px]">
                <span>Certificate No: <strong>{noDueData.certificateNo}</strong></span>
                <span>Date: <strong>{noDueData.applicationDate}</strong></span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-500">Student Full Name:</span>
                  <div className="font-bold text-slate-900 text-sm">{student.name}</div>
                </div>
                <div>
                  <span className="text-slate-500">Roll No / University Reg No:</span>
                  <div className="font-mono font-bold text-slate-900">
                    {student.id} / {student.bioData.regNo}
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Program & Year:</span>
                  <div className="font-semibold text-slate-900">
                    {student.course} ({student.year})
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Purpose of Clearance:</span>
                  <div className="font-semibold text-emerald-800">
                    {noDueData.purpose}
                  </div>
                </div>
              </div>

              {/* Department Clearances Mini Table */}
              <div>
                <h5 className="font-bold text-slate-800 text-[11px] uppercase tracking-wider mb-2">
                  Departmental Verification Clearance Checklist
                </h5>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-[11px] border-collapse">
                    <thead>
                      <tr className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                        <th className="py-2 px-3">#</th>
                        <th className="py-2 px-3">Department</th>
                        <th className="py-2 px-3">In-Charge</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-3 text-right">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {noDueData.clearances.map((dep, idx) => (
                        <tr key={dep.id}>
                          <td className="py-1.5 px-3 text-slate-400">{idx + 1}</td>
                          <td className="py-1.5 px-3 font-semibold text-slate-800">{dep.department}</td>
                          <td className="py-1.5 px-3 text-slate-600">{dep.inCharge}</td>
                          <td className="py-1.5 px-3">
                            <span
                              className={`font-bold ${
                                dep.status === "CLEARED" ? "text-emerald-700" : "text-rose-600"
                              }`}
                            >
                              {dep.status}
                            </span>
                          </td>
                          <td className="py-1.5 px-3 text-right text-slate-500">{dep.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Formal Attestation Text */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-[11px] text-emerald-950 leading-relaxed">
                This is to certify that the candidate has satisfied all institutional requirements, laboratory returns, tuition fees, and central library clearance as prescribed by the GTN College of Pharmacy regulations.
              </div>

              {/* Signatures & Seal */}
              <div className="pt-6 grid grid-cols-3 items-end text-center text-xs">
                <div>
                  <div className="font-semibold text-slate-800">Class In-Charge</div>
                  <div className="text-[10px] text-slate-400 mt-1">Signature & Date</div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full border-2 border-dashed border-emerald-800 flex items-center justify-center text-[9px] font-bold text-emerald-900 text-center uppercase p-1">
                    GTN SEAL
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">Institutional Seal</div>
                </div>

                <div>
                  <div className="font-bold text-emerald-900">Dr. S. K. Rathinam</div>
                  <div className="text-[11px] font-semibold text-slate-700">Principal</div>
                  <div className="text-[10px] text-slate-400">GTN College of Pharmacy</div>
                </div>
              </div>
            </div>

            {/* Print action footer */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-400">Official ERP Certified Copy</span>
              <button
                type="button"
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white font-bold flex items-center gap-2 transition"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
