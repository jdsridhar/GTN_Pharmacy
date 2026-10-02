"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Megaphone,
  Pin,
  Clock,
  User,
  Trash2,
  PlusCircle,
  Tag,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Search,
  Filter,
  ArrowLeft,
  Share2,
  Printer,
  Copy,
  CheckCircle2,
  Calendar,
  Building,
  School,
  UserCheck,
  GraduationCap,
  Home,
  ShieldCheck,
  FileText,
} from "lucide-react";
import { Announcement } from "@/data/portalData";
import { useAnnouncements } from "@/lib/announcements";
import PostAnnouncementModal from "@/components/PostAnnouncementModal";

const CATEGORIES = [
  "ALL",
  "Examinations",
  "PCI Compliance",
  "Fees & Accounts",
  "Hospital Postings",
  "Academic",
  "Campus Events",
];

const AUDIENCES = [
  "ALL",
  "All Students & Faculty",
  "B.Pharm Students",
  "D.Pharm Students",
];

const PRIORITIES = [
  "ALL",
  "High / Urgent",
  "Important",
  "Normal",
];

export default function AnnouncementsPage() {
  const { announcements, removeAnnouncement } = useAnnouncements();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedAudience, setSelectedAudience] = useState("ALL");
  const [selectedPriority, setSelectedPriority] = useState("ALL");
  const [onlyPinned, setOnlyPinned] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [posterRole, setPosterRole] = useState<"Principal" | "PA Desk">("Principal");

  // Filtering logic
  const filteredAnnouncements = useMemo(() => {
    return announcements.filter((item) => {
      // Search
      const searchMatch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.postedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.toLowerCase().includes(searchTerm.toLowerCase());

      // Category
      const categoryMatch =
        selectedCategory === "ALL" || item.category === selectedCategory;

      // Audience
      const audienceMatch =
        selectedAudience === "ALL" ||
        item.audience === selectedAudience ||
        item.audience === "All Students & Faculty";

      // Priority
      const priorityMatch =
        selectedPriority === "ALL" || item.priority === selectedPriority;

      // Pinned
      const pinnedMatch = !onlyPinned || item.pinned;

      return (
        searchMatch &&
        categoryMatch &&
        audienceMatch &&
        priorityMatch &&
        pinnedMatch
      );
    });
  }, [
    announcements,
    searchTerm,
    selectedCategory,
    selectedAudience,
    selectedPriority,
    onlyPinned,
  ]);

  const urgentCount = announcements.filter(
    (a) => a.priority === "High / Urgent"
  ).length;
  const pinnedCount = announcements.filter((a) => a.pinned).length;

  const handleCopy = (item: Announcement) => {
    const text = `[GTN College of Pharmacy Circular]\nTitle: ${item.title}\nCategory: ${item.category} | Audience: ${item.audience}\nIssued By: ${item.postedBy} (${item.date})\n\n${item.content}`;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-28 md:pt-36 pb-20 font-sans">
      {/* Top Breadcrumb & Portal Switcher Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-2 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link
              href="/"
              className="hover:text-emerald-700 flex items-center gap-1 font-medium transition"
            >
              <Home className="w-3.5 h-3.5 text-emerald-600" />
              <span>Home</span>
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-bold flex items-center gap-1">
              <Megaphone className="w-3.5 h-3.5 text-amber-500" />
              Official Announcements
            </span>
          </div>

          {/* Quick jump to Dashboards */}
          <div className="flex items-center flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-medium">Quick Portal Access:</span>
            <Link
              href="/dashboard/principal"
              className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 font-semibold transition flex items-center gap-1"
            >
              <School className="w-3 h-3 text-emerald-600" />
              <span>Principal Desk</span>
            </Link>
            <Link
              href="/dashboard/pa"
              className="px-2.5 py-1 rounded-lg bg-teal-50 text-teal-800 hover:bg-teal-100 border border-teal-200 font-semibold transition flex items-center gap-1"
            >
              <UserCheck className="w-3 h-3 text-teal-600" />
              <span>PA Secretariat</span>
            </Link>
            <Link
              href="/student/GTN24BP001"
              className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200 font-semibold transition flex items-center gap-1"
            >
              <GraduationCap className="w-3 h-3 text-amber-600" />
              <span>Student View</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-slate-900 via-[#1e2f5c] to-slate-900 text-white p-6 sm:p-10 shadow-xl border border-slate-800">
          {/* Subtle background pattern */}
          <div className="absolute -right-10 -bottom-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
          <div className="absolute left-1/3 -top-10 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold mb-3 border border-amber-400/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>PCI & The Tamil Nadu Dr. M.G.R. Medical University Recognized</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Institutional Circulars & Campus Announcements
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                Official regulatory directives, semester examination schedules, fee clearances, hospital clinical training rosters, and administrative orders for GTN College of Pharmacy students and faculty.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setPosterRole("Principal");
                  setIsPostModalOpen(true);
                }}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#fbd304] to-yellow-400 hover:from-yellow-400 hover:to-yellow-500 text-slate-950 font-black text-xs sm:text-sm transition shadow-lg flex items-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Broadcast Announcement</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm backdrop-blur border border-white/20 transition flex items-center gap-2"
                title="Print Official Notice Board"
              >
                <Printer className="w-4 h-4 text-amber-300" />
                <span>Print Notice Board</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-8 pt-6 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold block">
                Total Circulars
              </span>
              <span className="text-xl sm:text-2xl font-black text-white mt-1 block">
                {announcements.length}
              </span>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-rose-300 uppercase tracking-wider font-semibold block flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                Urgent Directives
              </span>
              <span className="text-xl sm:text-2xl font-black text-rose-300 mt-1 block">
                {urgentCount}
              </span>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-amber-300 uppercase tracking-wider font-semibold block flex items-center gap-1">
                <Pin className="w-3 h-3 text-amber-400" />
                Pinned Notices
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-300 mt-1 block">
                {pinnedCount}
              </span>
            </div>

            <div className="bg-white/5 rounded-2xl p-3 border border-white/10">
              <span className="text-[11px] text-emerald-300 uppercase tracking-wider font-semibold block">
                College Campus
              </span>
              <span className="text-xs sm:text-sm font-bold text-white mt-1 block">
                Dindigul, Tamil Nadu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search & Filter Toolbar Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-sm space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search circulars by keyword, title, ref no, or issuer..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
              {/* Audience Filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <span className="text-slate-500 font-semibold">Audience:</span>
                <select
                  value={selectedAudience}
                  onChange={(e) => setSelectedAudience(e.target.value)}
                  className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
                >
                  {AUDIENCES.map((aud) => (
                    <option key={aud} value={aud}>
                      {aud}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Filter */}
              <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                <span className="text-slate-500 font-semibold">Priority:</span>
                <select
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="bg-transparent font-medium text-slate-800 focus:outline-none cursor-pointer"
                >
                  {PRIORITIES.map((pri) => (
                    <option key={pri} value={pri}>
                      {pri}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pinned Only Toggle */}
              <button
                type="button"
                onClick={() => setOnlyPinned(!onlyPinned)}
                className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition ${
                  onlyPinned
                    ? "bg-amber-100 border-amber-300 text-amber-900 shadow-sm"
                    : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Pin className={`w-3.5 h-3.5 ${onlyPinned ? "text-amber-700" : "text-slate-400"}`} />
                <span>Pinned Only</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
            <span className="text-slate-400 font-bold px-1 shrink-0 uppercase tracking-wider text-[11px]">
              Categories:
            </span>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition shrink-0 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900"
                }`}
              >
                {cat === "ALL" ? "All Notices" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info Counter */}
        <div className="flex items-center justify-between px-2 text-xs text-slate-500">
          <span>
            Showing <strong>{filteredAnnouncements.length}</strong> of{" "}
            <strong>{announcements.length}</strong> official circulars
          </span>
          {(searchTerm ||
            selectedCategory !== "ALL" ||
            selectedAudience !== "ALL" ||
            selectedPriority !== "ALL" ||
            onlyPinned) && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
                setSelectedAudience("ALL");
                setSelectedPriority("ALL");
                setOnlyPinned(false);
              }}
              className="text-amber-700 hover:underline font-bold"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Announcements List */}
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
            <div className="w-14 h-14 rounded-full bg-slate-100 text-slate-400 mx-auto flex items-center justify-center">
              <Megaphone className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No circulars found matching your criteria
            </h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms, audience filters, or category selection to view published college circulars.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("ALL");
                setSelectedAudience("ALL");
                setSelectedPriority("ALL");
                setOnlyPinned(false);
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
            >
              Show All Announcements
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAnnouncements.map((item) => {
              const isExpanded = expandedId === item.id;
              const isCopied = copiedId === item.id;

              return (
                <article
                  key={item.id}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-200 shadow-sm hover:shadow-md ${
                    item.pinned
                      ? "border-amber-300 ring-1 ring-amber-200/80 bg-gradient-to-br from-amber-50/30 via-white to-white"
                      : "border-slate-200/90"
                  }`}
                >
                  {/* Top metadata row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      {item.pinned && (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
                          <Pin className="w-3 h-3 text-amber-700" />
                          Pinned Circular
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                          item.priority === "High / Urgent"
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : item.priority === "Important"
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {item.priority === "High / Urgent" && (
                          <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                        )}
                        {item.priority}
                      </span>

                      <span className="px-2.5 py-0.5 rounded-lg bg-slate-100 text-slate-700 text-[11px] font-semibold border border-slate-200/80">
                        {item.category}
                      </span>

                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-medium border border-emerald-200">
                        Audience: <strong>{item.audience}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="font-mono text-[11px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                        Ref: {item.id}
                      </span>
                      <div className="flex items-center gap-1 text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{item.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Circular Title */}
                  <h2 className="mt-3 text-base sm:text-lg font-bold text-slate-900 leading-snug tracking-tight">
                    {item.title}
                  </h2>

                  {/* Content */}
                  <div className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    <p className={!isExpanded ? "line-clamp-3" : ""}>
                      {item.content}
                    </p>
                  </div>

                  {/* Bottom details & action controls */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center font-bold text-xs shrink-0 border border-slate-200">
                        <User className="w-3.5 h-3.5 text-slate-500" />
                      </div>
                      <div>
                        <span className="text-[11px] text-slate-400 block">
                          Issuing Authority
                        </span>
                        <span className="font-bold text-slate-800">
                          {item.postedBy}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(item)}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition flex items-center gap-1.5"
                        title="Copy circular text"
                      >
                        {isCopied ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-500" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => setExpandedId(isExpanded ? null : item.id)}
                        className="px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold transition flex items-center gap-1 border border-amber-200"
                      >
                        <span>{isExpanded ? "Show Less" : "Full View"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Are you sure you want to remove circular "${item.title}"?`)) {
                            removeAnnouncement(item.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Delete circular"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </main>

      {/* Post Announcement Modal */}
      <PostAnnouncementModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        defaultPoster={
          posterRole === "Principal"
            ? "Dr. S. K. Rathinam (Principal)"
            : "PA Secretariat Office"
        }
      />
    </div>
  );
}
