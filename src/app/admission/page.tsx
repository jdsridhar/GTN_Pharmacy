
"use client"; // This must be the very first line

import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, ReactNode } from "react";
import { BookOpen, UserCheck, Star, X, FileText, ChevronDown, Check } from "lucide-react";

/* =========================
   Types (for stronger TS)
   ========================= */

type TableColumn = { header: string; accessorKey: string };
type TableBlock = { title: string; columns: TableColumn[]; data: Record<string, any>[] };

type TabBlock = {
  title: string;
  subtitle?: string;
  content?: ReactNode;
  tableData?: {
    columns: TableColumn[];
    data: Record<string, any>[];
  } | null;
  additionalContent?: ReactNode;
};

type AdmissionsDataShape = {
  courses_offered: {
    title: string;
    contentType: "table";
    description?: string;
    tables: TableBlock[];
  };
  admission_policies: {
    title: string;
    contentType: "tabs";
    description?: string;
    tabs: TabBlock[];
  };
  policy_areas: {
    title: string;
    contentType: "sections";
    description?: string;
    sections: {
      title: string;
      ulItems?: string[];
      additionalContent?: ReactNode;
    }[];
  };
  scholarships: {
    title: string;
    contentType: "accordion";
    description?: string;
    accordionItems: {
      id: string;
      title: string;
      desc: { title: string }[];
    }[];
  };
};

/* =========================
   Data
   ========================= */

const courseData = [
  { id: 1, name: "B.Pharmacy (Bachelor of Pharmacy)", seats: 100, duration: "4 Years" },
  { id: 2, name: "D.Pharmacy (Diploma in Pharmacy)", seats: 60, duration: "2 Years" },
];

const admissionDataUG = [
  {
    category: "Government Quota",
    description:
      "Admissions are carried out through the Directorate of Medical Education / State Government counseling based on merit in +2 (Physics, Chemistry, Biology/Mathematics) as per PCI and Government norms.",
    percentage: "65%",
  },
  {
    category: "Management Quota",
    description:
      "Admissions are based on merit as per guidelines issued by the State Government, PCI, and competent authorities.",
    percentage: "35%",
  },
  {
    category: "Lateral Entry (B.Pharmacy – Direct Second Year)",
    description:
      "Candidates who have completed D.Pharmacy from a PCI approved institution are eligible for lateral entry admission directly into the second year of B.Pharmacy.",
    percentage: "10%",
  },
];

const admissionPolicySections: any[] = [
  {
    title: "Admission Norms",
    content: (
      <div className="space-y-4 text-neutral-600">
        <ul className="list-disc pl-6 space-y-2">
          <li>Admissions are carried out strictly as per PCI, The Tamil Nadu Dr. M.G.R. Medical University, and State Government norms.</li>
          <li>Selection is based on academic merit and eligibility criteria.</li>
          <li>Reservation policies are followed as per Government regulations.</li>
          <li>Fee structure and scholarship schemes ensure inclusive access to pharmacy education.</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Admission Policy – B.Pharm & D.Pharm",
    subtitle: "(As per PCI & State Government Norms)",
    tableData: admissionDataUG,
  },
];

const reqs = [
  "Passport Size Photographs (2 Copies)",
  "SSLC / 10th Mark Sheet (Copy)",
  "+2 / HSC Mark Statement (Copy)",
  "Transfer Certificate",
  "Community Certificate (if applicable)",
  "D.Pharmacy Certificate & Mark Sheets (for Lateral Entry Candidates)",
];

const policySections = [
  {
    title: "Submission of Applications",
    ulItems: reqs,
    additionalContent: (
      <p className="text-neutral-600 mt-4">
        Completed application forms must be submitted to the Admissions Office on or before the last
        date mentioned in the admission notification. All admissions are provisional and subject to
        verification of original certificates by the competent authorities.
      </p>
    ),
  },
  {
    title: "Certificates Required at the Time of Admission",
    ulItems: [
      "10th & 12th Mark Statements (Original & Copies)",
      "Transfer Certificate (Original)",
      "Conduct Certificate",
      "Community Certificate (if applicable)",
      "D.Pharmacy Certificate & Mark Sheets (for Lateral Entry)",
      "Migration / Eligibility Certificate (if applicable)",
    ],
  },
];

const scholarshipAccordionItems = [
  {
    id: "collapseOne",
    title: "Scholarships Offered by Management",
    desc: [
      { title: "Merit-based Scholarships" },
      { title: "Scholarships for Sports Achievers" },
      { title: "Fee Concessions for Economically Weaker Students" },
    ],
  },
  {
    id: "collapseTwo",
    title: "Government Scholarships",
    desc: [
      { title: "SC / ST Scholarship (Tamil Nadu Government)" },
      { title: "BC / MBC Scholarship (Tamil Nadu Government)" },
      { title: "Minority Scholarship" },
      { title: "First Graduate Scholarship" },
      { title: "Central Sector Scholarship" },
    ],
  },
];

/* =========================
   Structured AdmissionsData
   ========================= */

const admissionsData: AdmissionsDataShape = {
  courses_offered: {
    title: "Courses Offered",
    contentType: "table",
    description: "List of Pharmacy courses available with seats and duration.",
    tables: [
      {
        title: "Pharmacy Courses",
        columns: [
          { header: "S.No.", accessorKey: "id" },
          { header: "Name of the course", accessorKey: "name" },
          { header: "No. of seats", accessorKey: "seats" },
          { header: "Duration", accessorKey: "duration" },
        ],
        data: courseData.map((course, index) => ({
          id: index + 1,
          name: course.name,
          seats: course.seats,
          duration: course.duration,
        })),
      },
    ],
  },
  admission_policies: {
    title: "Admission Policies",
    contentType: "tabs",
    description: "Detailed admission norms and policies for B.Pharm and D.Pharm programs.",
    tabs: admissionPolicySections.map((section) => ({
      title: section.title,
      subtitle: section.subtitle,
      content: section.content,
      tableData: section.tableData
        ? {
          columns: [
            { header: "S.No.", accessorKey: "sno" },
            { header: "Category", accessorKey: "category" },
            { header: "Description", accessorKey: "description" },
            { header: "Percentage", accessorKey: "percentage" },
          ],
          data: section.tableData.map((item: any, index: number) => ({
            sno: index + 1,
            category: item.category,
            description: item.description,
            percentage: item.percentage,
          })),
        }
        : null,
      additionalContent: section.additionalContent,
    })),
  },
  policy_areas: {
    title: "Policy Areas",
    contentType: "sections",
    description: "Submission guidelines, eligibility, and required certificates.",
    sections: policySections.map((section: any) => ({
      title: section.title,
      ulItems: section.ulItems,
      additionalContent: section.additionalContent,
    })),
  },
  scholarships: {
    title: "Scholarships",
    contentType: "accordion",
    description: "Available scholarships from management and government.",
    accordionItems: scholarshipAccordionItems,
  },
};

/* =========================
   Components & Utilities
   ========================= */

// PDF viewer (client-only)
const CustomPdfViewer = dynamic(() => import("@/components/CustomPdfViewer"), {
  ssr: false,
  loading: () => <p className="text-center text-neutral-500 pt-10">Loading Viewer...</p>,
});

const Stat = ({ value, label, Icon }: { value: string; label: string; Icon?: React.ElementType }) => (
  <div className="text-center flex flex-col items-center">
    {Icon && <Icon className="w-8 h-8 mb-2 text-primary" />}
    <p className="text-xl font-bold text-neutral-800">{value}</p>
    <p className="mt-1 text-sm text-neutral-600 font-semibold">{label}</p>
  </div>
);

/* =========================
   Page Component
   ========================= */

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // local accordion open state (by id)
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});

  const safeActiveTab = Math.min(
    Math.max(activeTab, 0),
    admissionsData.admission_policies.tabs.length - 1
  );
  const tab = admissionsData.admission_policies.tabs[safeActiveTab];

  const toggleAccordion = (id: string) =>
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      {/* HERO */}
    

      <section
        className="relative h-[60vh] md:h-[80vh] bg-cover bg-center bg-no-repeat overflow-hidden"
        style={{ backgroundImage: "url('/assets/images/banner/admissions-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="container relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Admissions Open <br /> for 2025 - 2026
          </h1>
               <p className="text-xl md:text-2xl text-neutral-200 mb-8 max-w-2xl">
  Begin your journey in Pharmaceutical Education at GTN College of Pharmacy
</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="https://gtnarayanaswamynaiducharitiestrust.org/"
              target="_blank"
              className="btn btn-primary px-8 py-3 text-lg font-semibold hover:shadow-md transition-all duration-300"
            >
              Enroll Now
            </Link>
            <Link
              href="/about"
              className="btn btn-primary px-8 py-3 text-lg font-semibold hover:shadow-md transition-all duration-300"
            >
              Learn About Scholarships
            </Link>
            
          </div>
      
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 md:py-24 bg-neutral-50">
        <div className="container px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            <Stat value="B.Pharm & D.Pharm" label="Pharmacy Programs" Icon={BookOpen} />
            <Stat value="160 Seats" label="Approved Total Intake" Icon={UserCheck} />
<Stat value="Excellent" label="Clinical & Industry Exposure" Icon={Star} />
<Stat value="Multiple" label="Scholarship Schemes" Icon={Check} />

          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-12">Admissions Information</h2>

          {/* PDF Viewer */}
          {pdfUrl ? (
            <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-12 px-4 md:px-8">
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold text-neutral-800">Document Viewer</h3>
                <button
                  onClick={() => setPdfUrl(null)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                  aria-label="Close viewer"
                >
                  <X className="w-6 h-6 text-neutral-600" />
                </button>
              </div>
              <div className="h-[80vh]">
                <CustomPdfViewer file={pdfUrl} />
              </div>
            </div>
          ) : (
            <>
              {/* Courses Offered */}
              <div className="mb-12 px-4 md:px-8">
                <h3 className="text-2xl font-bold mb-4 text-neutral-800">{admissionsData.courses_offered.title}</h3>
                {admissionsData.courses_offered.description && (
                  <p className="text-neutral-600 mb-6">{admissionsData.courses_offered.description}</p>
                )}
                {admissionsData.courses_offered.tables?.map((table, index) => (
                  <div key={index} className="mb-8 overflow-x-auto">
                    <h4 className="text-xl font-semibold mb-4">{table.title}</h4>
                    <table className="min-w-full divide-y divide-neutral-200">
                      <thead className="bg-neutral-50">
                        <tr>
                          {table.columns.map((col) => (
                            <th
                              key={col.header}
                              className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                            >
                              {col.header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-200">
                        {table.data.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {table.columns.map((col) => (
                              <td key={col.accessorKey} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                {row[col.accessorKey] ?? "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>

              {/* Admission Policies (Tabs) */}
              <div className="mb-12 px-4 md:px-8">
                <h3 className="text-2xl font-bold mb-4 text-neutral-800">{admissionsData.admission_policies.title}</h3>
                {admissionsData.admission_policies.description && (
                  <p className="text-neutral-600 mb-6">{admissionsData.admission_policies.description}</p>
                )}

                {/* Tabs */}
                <div className="flex flex-wrap gap-3 mb-6">
                  {admissionsData.admission_policies.tabs.map((t, index) => (
                    <button
                      key={t.title + index}
                      onClick={() => setActiveTab(index)}
                      className={`px-4 py-2 rounded-md border ${safeActiveTab === index
                        ? "bg-primary text-white border-primary"
                        : "bg-neutral-100 text-neutral-700 border-transparent"
                        }`}
                    >
                      {t.title}
                    </button>
                  ))}
                </div>

                {/* Active Tab Content */}
                <div className="p-6 bg-neutral-50 rounded-md">
                  {tab?.content}

                  {/* Table (render only if exists) */}
                  {tab?.tableData ? (
                    <table className="min-w-full divide-y divide-neutral-200 mt-4">
                      <thead className="bg-neutral-50">
                        <tr>
                          {tab.tableData.columns.map((col) => (
                            <th
                              key={col.header}
                              className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider"
                            >
                              {col.header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-neutral-200">
                        {tab.tableData.data.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {tab.tableData!.columns.map((col) => (
                              <td key={col.accessorKey} className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                                {row[col.accessorKey] ?? "-"}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}

                  {tab?.additionalContent}
                </div>
              </div>

              {/* Policy Areas */}
              <div className="mb-12 px-4 md:px-8">
                <h3 className="text-2xl font-bold mb-4 text-neutral-800">{admissionsData.policy_areas.title}</h3>
                {admissionsData.policy_areas.description && (
                  <p className="text-neutral-600 mb-6">{admissionsData.policy_areas.description}</p>
                )}
                {admissionsData.policy_areas.sections.map((section, index) => (
                  <div key={section.title + index} className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">{section.title}</h4>
                    {section.ulItems && (
                      <ul className="list-disc pl-6 space-y-2 text-neutral-600">
                        {section.ulItems.map((item, i) => (
                          <li key={item + i}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {section.additionalContent}
                  </div>
                ))}
              </div>

              {/* Scholarships (Accordion) */}
              <div className="mb-12 px-4 md:px-8">
                <h3 className="text-2xl font-bold mb-4 text-neutral-800">{admissionsData.scholarships.title}</h3>
                {admissionsData.scholarships.description && (
                  <p className="text-neutral-600 mb-6">{admissionsData.scholarships.description}</p>
                )}

                <div className="space-y-4">
                  {admissionsData.scholarships.accordionItems.map((item) => {
                    const open = !!openAccordions[item.id];
                    return (
                      <div key={item.id} className="border border-neutral-200 rounded-md">
                        <button
                          onClick={() => toggleAccordion(item.id)}
                          className="w-full px-6 py-4 text-left font-semibold flex justify-between items-center"
                          aria-expanded={open}
                          aria-controls={`${item.id}-content`}
                        >
                          {item.title}
                          <ChevronDown className={`w-5 h-5 transition-transform ${open ? "rotate-180" : ""}`} />
                        </button>
                        {open && (
                          <div id={`${item.id}-content`} className="px-6 py-4 bg-neutral-50 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {item.desc.map((descItem, idx) => (
                              <div key={descItem.title + idx} className="p-4 bg-white rounded-md shadow">
                                <h5 className="font-medium">{descItem.title}</h5>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Welcome / Message Section */}
      <section className="bg-brand-sand py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-sand/50 opacity-20"></div>
        <div className="container px-4 md:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="w-full md:w-1/3 flex justify-center md:justify-start">
              <Image
                src="/assets/images/admission/admission.jpg"
                alt="Admissions Head"
                width={300}
                height={400}
                className="rounded-lg shadow-xl object-cover"
              />
            </div>
            <div className="w-full md:w-2/3 text-center md:text-left">
              <h2 className="text-sm uppercase tracking-wider text-neutral-600 font-semibold mb-2">Message From The</h2>
              <h3 className="text-2xl md:text-4xl font-bold text-neutral-800 leading-tight">Admissions Office</h3>
              <p className="text-base md:text-lg text-neutral-600 mt-4 max-w-2xl leading-relaxed">
                "We are committed to providing accessible education through merit-based admissions and various scholarship programs. Join us in
                shaping your future."
              </p>
              <Link
                href="/"
                className="inline-block btn btn-primary mt-8 px-8 py-3 text-lg font-semibold hover:shadow-md transition-all duration-300"
              >
                Contact Admissions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
