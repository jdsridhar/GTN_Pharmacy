import PharmacyDepartmentTemplate from "@/components/PharmacyDepartmentTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bachelor of Pharmacy (B.Pharm) | GTN College of Pharmacy",
  description:
    "Explore Bachelor of Pharmacy (B.Pharm) 4-Year undergraduate degree programme at GTN College of Pharmacy, Dindigul. Approved by PCI New Delhi and affiliated with The Tamil Nadu Dr. M.G.R. Medical University.",
};

export default function BPharmPage() {
  return <PharmacyDepartmentTemplate program="bpharm" />;
}
