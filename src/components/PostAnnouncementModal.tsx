"use client";

import React, { useState } from "react";
import {
  Megaphone,
  X,
  Send,
  AlertCircle,
  Pin,
  CheckCircle2,
  Users,
  Tag,
  ShieldAlert,
} from "lucide-react";
import { Announcement } from "@/data/portalData";
import { broadcastAnnouncement } from "@/lib/announcements";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultPoster?: string;
  onSuccess?: (announcement: Announcement) => void;
}

export default function PostAnnouncementModal({
  isOpen,
  onClose,
  defaultPoster = "Dr. S. K. Rathinam (Principal)",
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Announcement["category"]>("Academic");
  const [audience, setAudience] = useState<Announcement["audience"]>("All Students & Faculty");
  const [priority, setPriority] = useState<Announcement["priority"]>("Normal");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [postedBy, setPostedBy] = useState(defaultPoster);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setSubmitting(true);
    const created = broadcastAnnouncement({
      title: title.trim(),
      category,
      audience,
      priority,
      content: content.trim(),
      postedBy,
      pinned,
    });

    setSuccessMsg(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccessMsg(false);
      if (onSuccess) onSuccess(created);
      onClose();
      // Reset form
      setTitle("");
      setContent("");
      setPinned(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 border border-amber-500/20">
            <Megaphone className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">
              Broadcast Institutional Announcement
            </h3>
            <p className="text-xs text-slate-500">
              Post an official circular to all pharmacy students, faculty, and departments.
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Announcement Title *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Odd Semester Examination Hall Ticket & Mandatory No Due Clearance"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-slate-400" />
                <span>Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Announcement["category"])}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Academic">Academic Notice</option>
                <option value="Examinations">University Examinations</option>
                <option value="PCI Compliance">PCI Compliance Watch</option>
                <option value="Fees & Accounts">Fees & Accounts</option>
                <option value="Hospital Postings">Hospital Postings</option>
                <option value="Campus Events">Campus & Placements</option>
                <option value="Urgent">Urgent Circular</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Audience</span>
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as Announcement["audience"])}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="All Students & Faculty">All Students & Faculty</option>
                <option value="B.Pharm Students">B.Pharm Students Only</option>
                <option value="D.Pharm Students">D.Pharm Students Only</option>
                <option value="Final Year Students">Final Year Students</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1">
                <ShieldAlert className="w-3.5 h-3.5 text-slate-400" />
                <span>Priority</span>
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Announcement["priority"])}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="Normal">Normal</option>
                <option value="Important">Important</option>
                <option value="High / Urgent">High / Urgent ⚠️</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Issued By / Authority
            </label>
            <input
              type="text"
              required
              value={postedBy}
              onChange={(e) => setPostedBy(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Circular Message / Detailed Content *
            </label>
            <textarea
              required
              rows={4}
              placeholder="Enter full announcement details, instructions, deadlines, or compliance requirements..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition leading-relaxed"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700 font-medium">
              <input
                type="checkbox"
                checked={pinned}
                onChange={(e) => setPinned(e.target.checked)}
                className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-slate-300"
              />
              <span className="flex items-center gap-1">
                <Pin className="w-3.5 h-3.5 text-amber-500" />
                Pin to top of campus notice board
              </span>
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center gap-2"
              >
                {successMsg ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Broadcasting...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Announcement to All</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
