"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";

export default function FooterSwitcher() {
  const pathname = usePathname();
  if (
    pathname.startsWith("/login") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/student")
  ) {
    return null;
  }
  return <Footer />;
}
