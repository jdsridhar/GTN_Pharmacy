import PharmacyDepartmentTemplate from "@/components/PharmacyDepartmentTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diploma in Pharmacy (D.Pharm) | GTN College of Pharmacy",
  description:
    "Explore Diploma in Pharmacy (D.Pharm) 2-Year professional diploma programme at GTN College of Pharmacy, Dindigul. Approved by PCI New Delhi and Directorate of Medical Education.",
};

export default function DPharmPage() {
  return <PharmacyDepartmentTemplate program="dpharm" />;
}
