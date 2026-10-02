// src/components/HeaderSwitcher.tsx
"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import HomeHeader from "@/components/HomeHeader"; // create this if you haven't

export default function HeaderSwitcher() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/student")
  ) {
    return null;
  }
  const isHome = pathname === "/";

  return isHome ? <HomeHeader /> : <Header />;
}

