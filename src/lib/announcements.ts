"use client";

import { useState, useEffect } from "react";
import { Announcement, initialAnnouncements } from "@/data/portalData";

const STORAGE_KEY = "gtn_announcements_v1";
const EVENT_KEY = "gtn_announcement_broadcast";

export function getStoredAnnouncements(): Announcement[] {
  if (typeof window === "undefined") {
    return initialAnnouncements;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialAnnouncements));
      return initialAnnouncements;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initialAnnouncements;
  }
}

export function broadcastAnnouncement(
  newAnnouncement: Omit<Announcement, "id" | "date">
): Announcement {
  const announcements = getStoredAnnouncements();
  const created: Announcement = {
    ...newAnnouncement,
    id: `ANN-${Date.now()}`,
    date: new Date().toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
  };

  const updated = [created, ...announcements];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_KEY, { detail: created }));
  } catch (e) {
    console.error("Failed to store announcement", e);
  }
  return created;
}

export function deleteAnnouncement(id: string): void {
  const announcements = getStoredAnnouncements();
  const updated = announcements.filter((a) => a.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent(EVENT_KEY));
  } catch (e) {
    console.error("Failed to delete announcement", e);
  }
}

export function useAnnouncements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);

  useEffect(() => {
    setAnnouncements(getStoredAnnouncements());

    const handleUpdate = () => {
      setAnnouncements(getStoredAnnouncements());
    };

    window.addEventListener(EVENT_KEY, handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener(EVENT_KEY, handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  return {
    announcements,
    postAnnouncement: broadcastAnnouncement,
    removeAnnouncement: deleteAnnouncement,
  };
}
