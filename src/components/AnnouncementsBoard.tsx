"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import { Announcement } from "@/data/portalData";
import { useAnnouncements } from "@/lib/announcements";
import PostAnnouncementModal from "./PostAnnouncementModal";

interface Props {
  allowPost?: boolean;
  userRole?: "principal" | "pa" | "student" | "public";
  defaultPoster?: string;
  filterAudience?: string;
  compact?: boolean;
}

export default function AnnouncementsBoard({
  allowPost = false,
  userRole = "public",
  defaultPoster,
  filterAudience,
  compact = false,
}: Props) {
  const { announcements, removeAnnouncement } = useAnnouncements();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = announcements.filter((item) => {
    const matchesCategory =
      selectedCategory === "ALL" || item.category === selectedCategory;

    let matchesAudience = true;
    if (filterAudience) {
      matchesAudience =
        item.audience === "All Students & Faculty" ||
        item.audience.toLowerCase().includes(filterAudience.toLowerCase());
    }

    return matchesCategory && matchesAudience;
  });

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header Bar */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center shrink-0">
            <Megaphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-white">
                Official Campus Circulars & Announcements
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {announcements.length} Active
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Direct broadcast from the Principal & Secretariat Desk
            </p>
          </div>
        </div>

        {allowPost && (
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs transition shadow flex items-center gap-2 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Post Announcement to All</span>
          </button>
        )}
      </div>

      {/* Category Pills Filter */}
      <div className="p-3 bg-slate-50 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto text-xs">
        <span className="text-slate-500 font-semibold px-2 shrink-0">Filter:</span>
        {["ALL", "Examinations", "PCI Compliance", "Fees & Accounts", "Hospital Postings", "Academic", "Campus Events"].map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 rounded-full font-medium transition shrink-0 ${
              selectedCategory === cat
                ? "bg-slate-900 text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200"
            }`}
          >
            {cat === "ALL" ? "All Announcements" : cat}
          </button>
        ))}
      </div>

      {/* Announcements List */}
      <div className="divide-y divide-slate-100 p-4 sm:p-6 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            No announcements found matching the selected category.
          </div>
        ) : (
          filtered.map((ann) => {
            const isExpanded = expandedId === ann.id;
            return (
              <div
                key={ann.id}
                className={`p-4 rounded-2xl border transition ${
                  ann.pinned
                    ? "bg-amber-50/50 border-amber-200"
                    : "bg-slate-50/60 hover:bg-slate-50 border-slate-200/80"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    {ann.pinned && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-300">
                        <Pin className="w-3 h-3 text-amber-700" />
                        Pinned
                      </span>
                    )}

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        ann.priority === "High / Urgent"
                          ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : ann.priority === "Important"
                          ? "bg-amber-100 text-amber-800 border border-amber-300"
                          : "bg-blue-100 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {ann.priority}
                    </span>

                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold">
                      {ann.category}
                    </span>

                    <span className="text-[10px] text-slate-500 font-medium">
                      Audience: <strong>{ann.audience}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{ann.date}</span>
                    {allowPost && (
                      <button
                        type="button"
                        onClick={() => removeAnnouncement(ann.id)}
                        className="ml-2 text-slate-400 hover:text-rose-600 transition p-1"
                        title="Delete announcement"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <h4 className="mt-2 text-sm sm:text-base font-bold text-slate-900 leading-snug">
                  {ann.title}
                </h4>

                <p
                  className={`mt-1.5 text-xs text-slate-600 leading-relaxed ${
                    compact && !isExpanded ? "line-clamp-2" : ""
                  }`}
                >
                  {ann.content}
                </p>

                <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Issued by: <strong>{ann.postedBy}</strong></span>
                  </div>

                  {compact && (
                    <button
                      type="button"
                      onClick={() => setExpandedId(isExpanded ? null : ann.id)}
                      className="text-amber-700 font-bold hover:underline flex items-center gap-0.5"
                    >
                      <span>{isExpanded ? "Show Less" : "Read Full Circular"}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      <PostAnnouncementModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultPoster={defaultPoster}
      />
    </div>
  );
}
