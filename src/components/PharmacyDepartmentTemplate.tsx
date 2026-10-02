"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  BookOpen,
  UserCheck,
  Star,
  X,
  FileText,
  ChevronDown,
  Info,
  Target,
  FlaskConical,
  Award,
  CheckCircle2,
  Clock,
  Building,
  GraduationCap,
} from "lucide-react";
import DataTable from "@/components/Datatable";
import pharmacy_dept_data from "@/app/departments/cse/cse-data";

// Dynamically import PDF viewer
const CustomPdfViewer = dynamic(() => import("@/components/CustomPdfViewer"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-neutral-500 pt-10">Loading Document Viewer...</p>
  ),
});

const DEPARTMENT_NAME = " Pharmacy ";

type FacultyRow = {
  employee_id: number;
  first_name?: string | null;
  middle_name?: string | null;
  last_name?: string | null;
  designation?: string | null;
  desc?: string | null;
};
type FacultyDeptJson = Record<string, FacultyRow[]>;
type FacultyCard = {
  employeeId: number;
  name: string;
  occupation: string;
  bio?: string;
};

const joinName = (
  first?: string | null,
  middle?: string | null,
  last?: string | null
) =>
  [first, middle, last].filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

const PHOTO_EXTS = ["jpeg", "jpg", "png", "webp", "JPEG", "JPG", "PNG", "WEBP"];

const buildPhotoCandidates = (employeeId: number) => [
  ...PHOTO_EXTS.map((ext) => `/assets/facultyprofile/${employeeId}.${ext}`),
  "/assets/facultyprofile/fallback.jpg",
];

function FacultyPhoto({
  employeeId,
  alt,
  className,
}: {
  employeeId: number;
  alt: string;
  className?: string;
}) {
  const candidates = useMemo(
    () => buildPhotoCandidates(employeeId),
    [employeeId]
  );
  const [idx, setIdx] = useState(0);

  return (
    <img
      src={candidates[idx]}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setIdx((i) => (i < candidates.length - 1 ? i + 1 : i))}
    />
  );
}

const Stat = ({
  value,
  label,
  Icon,
}: {
  value: string;
  label: string;
  Icon?: React.ElementType;
}) => (
  <div className="text-center flex flex-col items-center">
    {Icon && <Icon className="w-8 h-8 mb-2 text-primary" />}
    <p className="text-xl font-bold text-neutral-800">{value}</p>
    <p className="mt-1 text-sm text-neutral-600 font-semibold">{label}</p>
  </div>
);

// Achievements data generator
function getAchievementsData(program: "bpharm" | "dpharm"): Record<string, any> {
  return {
    po_peo_pso: {
      title: "PO, PEO & PSO",
      contentType: "details",
      description:
        `PCI (Pharmacy Council of India) and University defined Programme Outcomes, Educational Objectives, and Specific Outcomes for ${
          program === "bpharm" ? "Bachelor of Pharmacy (B.Pharm)" : "Diploma in Pharmacy (D.Pharm)"
        }.`,
      extraContent: (
        <div className="mt-8 space-y-8 text-neutral-800 leading-relaxed">
          {program === "bpharm" ? (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <span className="inline-block bg-[#1e2f5c] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Undergraduate Degree (4 Years / 8 Semesters)
              </span>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Bachelor of Pharmacy (B.Pharm) – Programme Outcomes
              </h3>
              <div className="space-y-3 text-base text-neutral-700">
                <p><strong>PO1 Pharmacy Knowledge:</strong> Apply knowledge of core pharmaceutical sciences including Pharmaceutics, Pharmacology, Pharmaceutical Chemistry, and Pharmacognosy to drug discovery, formulation, analysis, and therapeutics.</p>
                <p><strong>PO2 Formulation &amp; Drug Delivery:</strong> Design, formulate, and evaluate solid, liquid, semi-solid, and novel drug delivery systems adhering to IP, BP, and USP pharmacopoeial standards.</p>
                <p><strong>PO3 Modern Pharmaceutical Instrumentation:</strong> Proficiently handle advanced pharmaceutical equipment including HPLC, UV-Vis Spectrophotometers, Dissolution Test Apparatus, and Rotary Tablet Press Machines.</p>
                <p><strong>PO4 Hospital &amp; Clinical Pharmacy:</strong> Perform clinical medication reviews, patient counseling, dosage regimen adjustments, and adverse drug reaction (ADR) reporting in hospital wards.</p>
                <p><strong>PO5 Drug Regulatory Affairs &amp; Ethics:</strong> Adhere strictly to the Drugs and Cosmetics Act 1940, Pharmacy Act 1948, Schedule M (GMP) norms, and the PCI Code of Pharmaceutical Ethics.</p>
                <p><strong>PO6 Lifelong Learning &amp; Healthcare Leadership:</strong> Demonstrate continuous professional growth, research aptitude in pharmaceutical sciences, and active contribution to public healthcare delivery.</p>
              </div>

              <h4 className="text-xl font-bold text-neutral-900 mt-6 mb-3">
                Program Educational Objectives (PEOs)
              </h4>
              <div className="space-y-2 text-base text-neutral-700">
                <p><strong>PEO1:</strong> Prepare skilled pharmacy graduates for dynamic roles across pharmaceutical formulation, quality control, clinical research, hospital pharmacies, and drug regulatory bodies.</p>
                <p><strong>PEO2:</strong> Imbue sound professional ethics, empathy, and leadership in ensuring patient medication safety, community health awareness, and affordable healthcare access.</p>
                <p><strong>PEO3:</strong> Foster an entrepreneurial mindset enabling students to launch community retail pharmacies, wholesale distribution chains, and analytical testing laboratories.</p>
              </div>

              <h4 className="text-xl font-bold text-neutral-900 mt-6 mb-3">
                Program Specific Outcomes (PSOs)
              </h4>
              <div className="space-y-2 text-base text-neutral-700">
                <p><strong>PSO1:</strong> Formulate, standardize, and evaluate conventional and novel pharmaceutical dosage forms with stringent quality control compliance.</p>
                <p><strong>PSO2:</strong> Execute pharmacological screening, toxicological assays, and clinical data documentation in hospital and laboratory environments.</p>
              </div>
            </div>
          ) : (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <span className="inline-block bg-amber-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Diploma Programme (2 Years)
              </span>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">
                Diploma in Pharmacy (D.Pharm) – Programme Outcomes
              </h3>
              <div className="space-y-3 text-base text-neutral-700">
                <p><strong>PO1 Prescription Dispensing:</strong> Accurately interpret prescriptions, perform pharmaceutical calculations, and dispense essential medications with high precision.</p>
                <p><strong>PO2 Hospital Dispensary Operations:</strong> Efficiently manage hospital drug stores, inventory control, cold-chain maintenance for biologicals/vaccines, and inpatient dispensing.</p>
                <p><strong>PO3 Community Healthcare &amp; Patient Counseling:</strong> Educate patients on dosage schedules, adverse effects, lifestyle modifications, and hygiene promotion in community settings.</p>
                <p><strong>PO4 Pharmacy Law Compliance:</strong> Function responsibly within legal and ethical boundaries established by the Pharmacy Act and State Pharmacy Council.</p>
              </div>

              <h4 className="text-xl font-bold text-neutral-900 mt-6 mb-3">
                Program Educational Objectives (PEOs)
              </h4>
              <div className="space-y-2 text-base text-neutral-700">
                <p><strong>PEO1:</strong> Develop skilled registered pharmacists competent in community and hospital dispensing with utmost accuracy.</p>
                <p><strong>PEO2:</strong> Impart practical know-how of storage, handling, formulation compounding, and medical supply chain management.</p>
                <p><strong>PEO3:</strong> Inculcate professional communication skills for direct patient engagement and healthcare advisory.</p>
              </div>
            </div>
          )}
        </div>
      ),
    },

    faculty: {
      title: "Faculty",
      contentType: "table",
      description:
        "Comprehensive list of distinguished pharmacy professors, associate professors, and lecturers approved by PCI and affiliated with The Tamil Nadu Dr. M.G.R. Medical University.",
      tables: [
        {
          title: "Pharmaceutical Sciences Faculty Members",
          columns: [
            { header: "S.No", accessorKey: "sno" },
            { header: "Name of Faculty Member", accessorKey: "name" },
            { header: "Designation", accessorKey: "designation" },
            { header: "Specialization", accessorKey: "specialization" },
          ],
          data: [
            { sno: 1, name: "Dr. S. K. Rathinam", designation: "Principal & Professor", specialization: "Pharmaceutics & NDDS" },
            { sno: 2, name: "Dr. M. Soundararajan", designation: "Professor & Vice Principal", specialization: "Pharmacology & Toxicology" },
            { sno: 3, name: "Dr. P. Venkatesh", designation: "Associate Professor", specialization: "Pharmaceutical Chemistry" },
            { sno: 4, name: "Mrs. K. Meenakshi", designation: "Associate Professor", specialization: "Pharmacognosy & Phytochemistry" },
            { sno: 5, name: "Mr. R. Karthikeyan", designation: "Assistant Professor", specialization: "Pharmacy Practice & Clinical Pharmacy" },
            { sno: 6, name: "Mrs. S. Bhuvaneshwari", designation: "Assistant Professor", specialization: "Pharmaceutical Analysis" },
            { sno: 7, name: "Mr. T. Saravanan", designation: "Assistant Professor", specialization: "Pharmaceutics" },
            { sno: 8, name: "Ms. N. Deepa", designation: "Lecturer (D.Pharm)", specialization: "Hospital & Clinical Pharmacy" },
          ],
        },
      ],
      links: [
        {
          text: "Download Approved Faculty Directory (PCI Norms)",
          href: "/assets/data/sample.pdf",
        },
      ],
    },

    research_consultancy: {
      title: "Research & Publications",
      contentType: "table",
      description:
        "Faculty research publications, formulation breakthroughs, phytopharmacy investigations, and clinical study projects in indexed pharmaceutical journals.",
      tables: [
        {
          title: "Recent Pharmaceutical Research Publications",
          columns: [
            { header: "S.No", accessorKey: "sno" },
            { header: "Title of the Research Paper", accessorKey: "title" },
            { header: "Journal Name / Publisher", accessorKey: "journal" },
            { header: "Indexing", accessorKey: "indexing" },
            { header: "Year", accessorKey: "year" },
          ],
          data: [
            {
              sno: 1,
              title: "Formulation and In-vitro Characterization of Herbal Floating Tablets for Peptic Ulcer Management",
              journal: "International Journal of Pharmaceutical Sciences",
              indexing: "Scopus / UGC-CARE",
              year: "2024",
            },
            {
              sno: 2,
              title: "Phytochemical Profiling and Hepatoprotective Screening of Indigenous Medicinal Plants of Dindigul",
              journal: "Journal of Pharmacognosy and Phytochemistry",
              indexing: "Peer Reviewed",
              year: "2024",
            },
            {
              sno: 3,
              title: "RP-HPLC Method Development and Validation for Simultaneous Estimation of Anti-diabetic Fixed Dose Combinations",
              journal: "Indian Journal of Pharmaceutical Education & Research",
              indexing: "Scopus / Web of Science",
              year: "2023",
            },
            {
              sno: 4,
              title: "Synthesis, Molecular Docking and Antimicrobial Evaluation of Novel Heterocyclic Derivatives",
              journal: "European Journal of Medicinal Chemistry Reports",
              indexing: "Elsevier / ScienceDirect",
              year: "2023",
            },
            {
              sno: 5,
              title: "Clinical Evaluation of Pharmacist-Led Medication Therapy Management in Geriatric Patients",
              journal: "Journal of Clinical Pharmacy and Therapeutics",
              indexing: "PubMed / Scopus",
              year: "2023",
            },
          ],
        },
      ],
      links: [
        {
          text: "Download Research Compendium & Faculty Publications List",
          href: "/assets/data/sample.pdf",
        },
      ],
    },

    clinical_training: {
      title: "Clinical & Hospital Training",
      contentType: "table",
      description:
        "Mandatory clinical postings and hospital ward rotations in multi-specialty healthcare centers covering dispensing, patient medication therapy, and clinical monitoring.",
      tables: [
        {
          title: "Hospital Clinical Rotation Modules (B.Pharm & D.Pharm)",
          columns: [
            { header: "S.No", accessorKey: "sno" },
            { header: "Hospital Department / Specialty", accessorKey: "dept" },
            { header: "Core Training Focus", accessorKey: "focus" },
            { header: "Duration", accessorKey: "duration" },
          ],
          data: [
            {
              sno: 1,
              dept: "Inpatient & Outpatient Hospital Pharmacy",
              focus: "Prescription interpretation, billing, controlled substance storage, and patient counseling",
              duration: "4 Weeks",
            },
            {
              sno: 2,
              dept: "Emergency & Intensive Care Unit (ICU)",
              focus: "Emergency drug delivery, critical care IV infusions, and drug interaction monitoring",
              duration: "2 Weeks",
            },
            {
              sno: 3,
              dept: "General Medicine & Cardiology",
              focus: "Medication history taking, chronic disease medication therapy management, and patient compliance",
              duration: "4 Weeks",
            },
            {
              sno: 4,
              dept: "Pediatric & Neonatal Care",
              focus: "Pediatric dose calculations, antibiotic reconstitutions, and specialized oral suspensions",
              duration: "2 Weeks",
            },
            {
              sno: 5,
              dept: "Sterile Compounding & Central Supply",
              focus: "Aseptic technique, total parenteral nutrition (TPN) compounding, and biomedical waste disposal",
              duration: "2 Weeks",
            },
          ],
        },
      ],
      links: [
        {
          text: "Download Clinical Training Manual & Logbook Guidelines",
          href: "/assets/data/sample.pdf",
        },
      ],
    },

    mou: {
      title: "MOU's",
      contentType: "table",
      description:
        "Active Memoranda of Understanding with reputed multi-specialty hospitals and pharmaceutical manufacturers for clinical rotations, internships, and research.",
      tables: [
        {
          title: "Signed Healthcare & Industry Collaborations",
          columns: [
            { header: "S.No", accessorKey: "sno" },
            { header: "Collaborating Healthcare / Industry Partner", accessorKey: "partner" },
            { header: "Scope & Purpose of Collaboration", accessorKey: "scope" },
            { header: "Tenure", accessorKey: "tenure" },
          ],
          data: [
            {
              sno: 1,
              partner: "GTN Hospital & Multi-Specialty Research Centre, Dindigul",
              scope: "Clinical pharmacy postings, inpatient ward rotations, and bedside medication training",
              tenure: "2024–2029",
            },
            {
              sno: 2,
              partner: "Apex Healthcare Formulations Ltd",
              scope: "Industrial internships, tablet compression, sterile filling line training, and GMP compliance",
              tenure: "2023–2028",
            },
            {
              sno: 3,
              partner: "Apollo Pharmacy & Healthcare Chain",
              scope: "Community pharmacy dispensary training, inventory software management, and campus placements",
              tenure: "2023–2027",
            },
            {
              sno: 4,
              partner: "Bio-Analytical & Dissolution Testing Laboratories",
              scope: "Bioavailability studies, chromatographic testing (HPLC/GC), and student research internships",
              tenure: "2024–2029",
            },
            {
              sno: 5,
              partner: "MedPlus Healthcare Services",
              scope: "Retail pharmacy operations, cold-chain handling, and prescription auditing internships",
              tenure: "2023–2028",
            },
          ],
        },
      ],
      links: [
        {
          text: "Download Industry Collaboration Summary & MoU Copies",
          href: "/assets/data/sample.pdf",
        },
      ],
    },

    students_project: {
      title: "Students Project",
      contentType: "table",
      description:
        "Innovative pharmaceutical formulation, analytical development, and community health research projects conducted by graduating pharmacy scholars.",
      tables: [
        {
          title: "Recent Pharmacy Student Research Projects",
          columns: [
            { header: "S.No", accessorKey: "sno" },
            { header: "Project Title", accessorKey: "title" },
            { header: "Specialization Area", accessorKey: "area" },
            { header: "Academic Year", accessorKey: "year" },
          ],
          data: [
            {
              sno: 1,
              title: "Design and Evaluation of Herbal Mucoadhesive Buccal Patches for Oral Ulcers",
              area: "Pharmaceutics / Novel Drug Delivery",
              year: "2024–2025",
            },
            {
              sno: 2,
              title: "Phytochemical Screening and Antidiabetic Evaluation of Local Medicinal Flora of Dindigul",
              area: "Pharmacognosy & Phytochemistry",
              year: "2024–2025",
            },
            {
              sno: 3,
              title: "Simultaneous RP-HPLC Method Validation for Multi-Drug Fixed Dose Combination Tablets",
              area: "Pharmaceutical Quality Analysis",
              year: "2023–2024",
            },
            {
              sno: 4,
              title: "Survey of Self-Medication Practices and Antibiotic Stewardship in Dindigul Community",
              area: "Community Pharmacy Practice",
              year: "2023–2024",
            },
            {
              sno: 5,
              title: "Formulation and Optimization of Fast Dissolving Paracetamol Tablets Using Natural Superdisintegrants",
              area: "Industrial Pharmacy",
              year: "2023–2024",
            },
          ],
        },
      ],
      links: [
        {
          text: "Download Student Project Compendium",
          href: "/assets/data/sample.pdf",
        },
      ],
    },

    placement_details: {
      title: "Placement Details",
      contentType: "table",
      description:
        "Excellent placement record across premier hospitals, pharmaceutical formulation manufacturers, quality testing labs, and pharmacovigilance organizations.",
      tables: [
        {
          title: "Career Roles & Major Healthcare Recruiters",
          columns: [
            { header: "S.No", accessorKey: "sno" },
            { header: "Career Track / Role", accessorKey: "role" },
            { header: "Core Functional Domains", accessorKey: "domain" },
            { header: "Major Recruiters", accessorKey: "recruiters" },
          ],
          data: [
            {
              sno: 1,
              role: "Hospital Pharmacist",
              domain: "Dispensing, drug storage, clinical counseling, and inpatient ward supply",
              recruiters: "Apollo Hospitals, Meenakshi Mission, Government District Hospitals",
            },
            {
              sno: 2,
              role: "Quality Control (QC) Analyst",
              domain: "HPLC, UV analysis, dissolution testing, and raw material assay",
              recruiters: "Micro Labs, Fourrts India, Tablets India, Strides Pharma",
            },
            {
              sno: 3,
              role: "Quality Assurance (QA) Officer",
              domain: "GMP compliance, batch manufacturing records (BMR), and process validation",
              recruiters: "Sun Pharma, Cipla, Apex Healthcare, Medopharm",
            },
            {
              sno: 4,
              role: "Drug Safety / Pharmacovigilance Associate",
              domain: "Adverse drug event coding (MedDRA), narrative writing, and case processing",
              recruiters: "IQVIA, Cognizant Life Sciences, Accenture Healthcare",
            },
            {
              sno: 5,
              role: "Formulation Research Trainee",
              domain: "Pilot batch execution, stability testing, and pre-formulation studies",
              recruiters: "Apex Research Laboratories, Microlabs R&D Centre",
            },
            {
              sno: 6,
              role: "Community Pharmacy Specialist",
              domain: "Retail dispensing, prescription verification, and over-the-counter wellness",
              recruiters: "MedPlus, Apollo Pharmacy, Wellness Forever",
            },
          ],
        },
      ],
      links: [
        {
          text: "Download Placement Brochure & Recruiter Guide",
          href: "/assets/data/sample.pdf",
        },
      ],
    },

    valued_added_courses: {
      title: "Value Added Courses",
      contentType: "table",
      description:
        "Industry-aligned value-added certification courses delivered by hospital clinicians and pharmaceutical industry specialists beyond the standard PCI syllabus.",
      tables: [
        {
          title: "Specialized Pharmacy Certification Programs",
          columns: [
            { header: "S.No", accessorKey: "sno" },
            { header: "Course Title", accessorKey: "title" },
            { header: "Duration", accessorKey: "duration" },
            { header: "Training Focus & Certification Partner", accessorKey: "focus" },
          ],
          data: [
            {
              sno: 1,
              title: "Certificate in Pharmacovigilance & Drug Safety Monitoring",
              duration: "40 Hours",
              focus: "ICSR processing, MedDRA dictionary coding, and global regulatory reporting norms",
            },
            {
              sno: 2,
              title: "Hands-on Analytical Instrumentation (HPLC, UV-Vis & FTIR)",
              duration: "30 Hours",
              focus: "Practical calibration, method validation, and spectrum interpretation",
            },
            {
              sno: 3,
              title: "Good Manufacturing Practices (GMP) & Regulatory Affairs",
              duration: "35 Hours",
              focus: "Cleanroom protocol, Schedule M compliance, and documentation audits",
            },
            {
              sno: 4,
              title: "Hospital & Community Pharmacy Practice and Patient Counseling",
              duration: "30 Hours",
              focus: "Communication skills, therapeutic drug monitoring, and chronic care management",
            },
          ],
        },
      ],
      links: [
        {
          text: "Download Value Added Course Syllabus & Registration Form",
          href: "/assets/data/sample.pdf",
        },
      ],
    },

    gpat_achievements: {
      title: "GPAT & Competitive Exams",
      contentType: "table",
      description:
        "Mentorship, dedicated coaching, and competitive examination laurels achieved by GTN pharmacy scholars in GPAT, NIPER JEE, and State Drug Inspector examinations.",
      tables: [
        {
          title: "GPAT & State Examination Qualifying Highlights",
          columns: [
            { header: "S.No", accessorKey: "sno" },
            { header: "Examination", accessorKey: "exam" },
            { header: "Achievement Details", accessorKey: "achievement" },
            { header: "National Rank / Score", accessorKey: "rank" },
            { header: "Outcome / Placement", accessorKey: "outcome" },
          ],
          data: [
            {
              sno: 1,
              exam: "GPAT 2024",
              achievement: "Top Percentile Qualifier",
              rank: "AIR 142 (99.2 Percentile)",
              outcome: "Admitted into Premier M.Pharm Institute with AICTE Fellowship",
            },
            {
              sno: 2,
              exam: "NIPER JEE 2024",
              achievement: "National Merit Qualifier",
              rank: "AIR 286",
              outcome: "Selected for Post-Graduate Research at NIPER",
            },
            {
              sno: 3,
              exam: "GPAT 2023",
              achievement: "First-Attempt Qualifier",
              rank: "AIR 315",
              outcome: "Enrolled in Pharmacology Masters Program",
            },
            {
              sno: 4,
              exam: "TN MRB Pharmacist Exam 2023",
              achievement: "Government Selection",
              rank: "State Merit List",
              outcome: "Appointed as Registered Government Hospital Pharmacist",
            },
          ],
        },
      ],
      links: [
        {
          text: "Download GPAT Coaching Schedule & Study Material Details",
          href: "/assets/data/sample.pdf",
        },
      ],
    },
  };
}

export interface PharmacyDepartmentProps {
  program: "bpharm" | "dpharm";
}

export default function PharmacyDepartmentTemplate({
  program,
}: PharmacyDepartmentProps) {
  const isBPharm = program === "bpharm";

  const heroImage = isBPharm
    ? "/assets/images/engineering_courses/bpharm.png"
    : "/images/home/slide4.png";

  const programTitle = isBPharm
    ? "Bachelor of Pharmacy (B.Pharm)"
    : "Diploma in Pharmacy (D.Pharm)";

  const programSubtitle = isBPharm
    ? "4-Year Undergraduate Degree Programme in Pharmaceutical Sciences, Drug Formulation & Clinical Research"
    : "2-Year Professional Diploma Programme in Practical Pharmacy, Hospital Dispensing & Patient Counseling";

  const [activeTab, setActiveTab] = useState<string | null>("po_peo_pso");
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // Faculty State
  const [facultyCards, setFacultyCards] = useState<FacultyCard[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<FacultyCard | null>(null);

  const detailsRef = useRef<HTMLDivElement | null>(null);
  const facultyDetailsRef = useRef<HTMLDivElement | null>(null);
  const userInteracted = useRef(false);

  const achievementsData = useMemo(() => getAchievementsData(program), [program]);

  useEffect(() => {
    if (!userInteracted.current) return;
    if (activeTab && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeTab]);

  useEffect(() => {
    if (selectedFaculty && facultyDetailsRef.current) {
      facultyDetailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedFaculty]);

  // Load Faculty JSON
  useEffect(() => {
    const loadFaculty = async () => {
      try {
        const res = await fetch("/assets/data/faculty_dept.json", {
          cache: "no-store",
        });
        if (!res.ok)
          throw new Error(`Failed to load faculty_dept.json: ${res.status}`);
        const json: FacultyDeptJson = await res.json();
        const deptRows: FacultyRow[] = json[DEPARTMENT_NAME] || [];
        const mapped: FacultyCard[] = deptRows.map((r) => ({
          employeeId: r.employee_id,
          name: joinName(r.first_name, r.middle_name, r.last_name),
          occupation: r.designation || "",
          bio: r.desc || "",
        }));
        setFacultyCards(mapped);
      } catch (e) {
        console.error(e);
        setFacultyCards([]);
      }
    };
    loadFaculty();
  }, []);

  const handleItemClick = (key: string, item: any) => {
    userInteracted.current = true;
    if (item.contentType === "folder") {
      setExpandedKey((prevKey) => (prevKey === key ? null : key));
    } else {
      setActiveTab(key);
      setPdfUrl(null);
      if (key !== "faculty") setSelectedFaculty(null);
    }
  };

  const navIcons: Record<string, any> = {
    po_peo_pso: Target,
    faculty: Info,
    research_consultancy: FlaskConical,
    clinical_training: BookOpen,
    mou: FileText,
    students_project: Star,
    placement_details: UserCheck,
    valued_added_courses: BookOpen,
    gpat_achievements: Award,
  };

  const activeContent: any = activeTab ? achievementsData[activeTab] : null;

  return (
    <main className="min-h-screen">
      {/* 1) Hero Banner */}
      <Hero image={heroImage} />

      {/* 2) Program Switcher Pills & Title Bar */}
      <section className="bg-white border-b border-slate-200 py-6 sticky top-16 md:top-20 z-20 backdrop-blur-md bg-white/95 shadow-sm">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                GTN College of Pharmacy
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                PCI Approved
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 tracking-tight">
              {programTitle}
            </h1>
            <p className="text-sm text-neutral-600 font-medium mt-0.5">
              {programSubtitle}
            </p>
          </div>

          {/* Quick Route Switcher */}
          <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 shadow-inner">
            <Link
              href="/departments/bpharm"
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition flex items-center gap-1.5 ${
                isBPharm
                  ? "bg-[#1e2f5c] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              B.Pharm (4 Years)
            </Link>
            <Link
              href="/departments/dpharm"
              className={`px-4 py-2 rounded-lg text-xs md:text-sm font-bold transition flex items-center gap-1.5 ${
                !isBPharm
                  ? "bg-[#1e2f5c] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              <Building className="w-4 h-4" />
              D.Pharm (2 Years)
            </Link>
          </div>
        </div>
      </section>

      {/* 3) Stat Metrics Grid */}
      <section className="bg-neutral-50 py-12 border-b border-neutral-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center text-center max-w-5xl mx-auto">
            {isBPharm ? (
              <>
                <Stat
                  Icon={Star}
                  value="1st NBA Accredited"
                  label="Academic Years 2020-2021 to 2022-2023"
                />
                <Stat
                  Icon={BookOpen}
                  value="MGR University"
                  label="Permanent Affiliation, Chennai"
                />
                <Stat
                  Icon={UserCheck}
                  value="100 Intake"
                  label="B.Pharm Annual Intake"
                />
                <Stat
                  Icon={Clock}
                  value="4 Years"
                  label="8 Semesters Full-Time"
                />
              </>
            ) : (
              <>
                <Stat
                  Icon={CheckCircle2}
                  value="PCI Approved"
                  label="Pharmacy Council of India, New Delhi"
                />
                <Stat
                  Icon={BookOpen}
                  value="DME Recognized"
                  label="Govt. of Tamil Nadu Health Dept."
                />
                <Stat
                  Icon={UserCheck}
                  value="60 Intake"
                  label="D.Pharm Annual Intake"
                />
                <Stat
                  Icon={Clock}
                  value="2 Years"
                  label="Annual Clinical Practical System"
                />
              </>
            )}
          </div>
        </div>
      </section>

      {/* 4) Mission & Vision Section */}
      <section className="bg-white py-12 md:py-20 border-b border-neutral-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="text-center mb-10">
            <h2 className="inline-block text-3xl font-bold tracking-tight border-b-4 border-primary pb-2">
              Vision &amp; Mission of {isBPharm ? "B.Pharm" : "D.Pharm"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <div className="prose max-w-none text-neutral-800">
                <h3 className="text-2xl font-bold text-[#1e2f5c]">Department Vision</h3>
                <p className="mt-3 text-lg text-neutral-700 leading-relaxed font-medium">
                  {isBPharm
                    ? "To develop competent, ethical, and globally employable pharmacy professionals through excellence in pharmaceutical research, modern formulation technologies, and comprehensive healthcare service."
                    : "To nurture highly proficient registered pharmacists with sound practical competence in prescription dispensing, hospital store management, and frontline patient counseling."}
                </p>

                <h3 className="mt-8 text-2xl font-bold text-[#1e2f5c]">Department Mission</h3>
                <ul className="mt-3 text-base text-neutral-700 space-y-2.5 list-disc list-inside">
                  <li>To provide strong foundational and cutting-edge pharmaceutical education aligned with global healthcare standards.</li>
                  <li>To promote active student research in drug delivery, natural products, and quality analytical testing.</li>
                  <li>To inculcate unwavering ethical values, regulatory compliance, and community health responsibility in pharmacy practice.</li>
                  {isBPharm ? (
                    <li>To equip graduates for competitive milestones like GPAT, NIPER JEE, higher clinical research, and industrial careers.</li>
                  ) : (
                    <li>To provide rigorous clinical training in multi-specialty hospital dispensaries and community pharmacies.</li>
                  )}
                </ul>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl border border-slate-200">
              <Image
                src={heroImage}
                alt={programTitle}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5) Department Tabs & Academic Information */}
      <section className="bg-neutral-50 py-12 md:py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4 text-neutral-900">
            Academic &amp; Departmental Highlights
          </h2>
          <p className="text-center text-lg text-neutral-600 mb-10 max-w-3xl mx-auto">
            Explore programme outcomes, faculty profiles, research publications, hospital postings, and career placement avenues.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
            {/* Left Sidebar Menu */}
            <div className="w-full md:w-[280px] shrink-0">
              <div className="bg-[#1E2F5C] text-white rounded-2xl shadow-xl overflow-hidden p-3 space-y-1">
                {Object.keys(achievementsData).map((key) => {
                  const item = achievementsData[key as keyof typeof achievementsData];
                  const Icon = navIcons[key] || FileText;
                  const isActive = activeTab === key;

                  return (
                    <button
                      key={key}
                      onClick={() => handleItemClick(key, item)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-white text-[#1E2F5C] shadow-md font-bold"
                          : "text-slate-200 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? "text-[#1E2F5C]" : "text-amber-400"}`} />
                      <span>{item.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Content Panel */}
            <div ref={detailsRef} className="w-full animate-fade-in">
              {pdfUrl ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200">
                    <button
                      onClick={() => setPdfUrl(null)}
                      className="flex items-center gap-2 text-primary font-semibold hover:underline text-sm"
                    >
                      <ArrowLeft size={16} /> Back to Details
                    </button>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200 hover:bg-sky-100 transition"
                    >
                      Open in New Tab ↗
                    </a>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-neutral-200 min-h-[500px]">
                    <CustomPdfViewer file={pdfUrl} />
                  </div>
                </div>
              ) : activeContent ? (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-neutral-900">
                      {activeContent.title}
                    </h3>
                  </div>

                  <p className="text-neutral-600 mb-6 text-base">
                    {activeContent.description}
                  </p>

                  {/* Faculty Special Display */}
                  {activeContent.title === "Faculty" ? (
                    <div>
                      {selectedFaculty ? (
                        <div
                          ref={facultyDetailsRef}
                          className="flex flex-col md:flex-row gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-200"
                        >
                          <div className="w-full md:w-2/3">
                            <button
                              onClick={() => setSelectedFaculty(null)}
                              className="flex items-center gap-2 text-primary font-semibold hover:underline mb-4 text-sm"
                            >
                              <ArrowLeft size={16} /> Back to Faculty List
                            </button>
                            <h4 className="text-3xl font-extrabold text-neutral-900">
                              {selectedFaculty.name}
                            </h4>
                            <p className="text-lg font-bold text-primary uppercase mt-1">
                              {selectedFaculty.occupation}
                            </p>
                            <p className="mt-4 text-neutral-700 leading-relaxed text-base">
                              {selectedFaculty.bio ||
                                "Dedicated pharmacy educator and researcher contributing to student laboratory mastery, pharmaceutical quality standards, and clinical instruction at GTN College of Pharmacy."}
                            </p>
                          </div>
                          <div className="w-full md:w-1/3 flex justify-center">
                            <FacultyPhoto
                              employeeId={selectedFaculty.employeeId}
                              alt={selectedFaculty.name}
                              className="w-48 h-56 object-cover rounded-xl shadow-md border-2 border-white"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                          {facultyCards.length === 0 && (
                            <p className="text-neutral-500">
                              Loading faculty directory...
                            </p>
                          )}
                          {facultyCards.map((f, i) => (
                            <div
                              key={i}
                              className="group bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:shadow-lg transition cursor-pointer"
                              onClick={() => setSelectedFaculty(f)}
                            >
                              <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
                                <FacultyPhoto
                                  employeeId={f.employeeId}
                                  alt={f.name}
                                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                              </div>
                              <div className="p-4">
                                <p className="font-bold text-neutral-900 group-hover:text-primary transition line-clamp-1">
                                  {f.name}
                                </p>
                                <p className="text-xs text-neutral-600 font-semibold mt-1">
                                  {f.occupation}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <>
                      {/* Tables */}
                      {activeContent.contentType === "table" &&
                        activeContent.tables &&
                        activeContent.tables.length > 0 && (
                          <div className="space-y-8">
                            {activeContent.tables.map((table: any, index: number) => (
                              <DataTable
                                key={index}
                                title={table.title}
                                columns={table.columns}
                                data={table.data}
                              />
                            ))}
                          </div>
                        )}

                      {/* Download Links */}
                      {activeContent.links && activeContent.links.length > 0 && (
                        <div className="flex flex-col gap-2.5 mt-8 pt-6 border-t border-slate-200">
                          <h4 className="font-bold text-neutral-800 text-sm uppercase tracking-wide">
                            Official Downloads &amp; Regulations
                          </h4>
                          {activeContent.links.map(
                            (link: { text: string; href: string }, i: number) => (
                              <button
                                key={i}
                                onClick={() => setPdfUrl(link.href)}
                                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline text-sm text-left"
                              >
                                <FileText size={16} className="text-amber-500 shrink-0" />
                                {link.text}
                              </button>
                            )
                          )}
                        </div>
                      )}

                      {/* Extra Custom Content */}
                      {activeContent.extraContent && (
                        <div>{activeContent.extraContent}</div>
                      )}
                    </>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* 6) Contact HOD / Admissions Footer Banner */}
      <section className="bg-gradient-to-r from-[#1e2f5c] to-indigo-900 text-white py-16 text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h3 className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-2">
            Admissions &amp; Departmental Inquiries
          </h3>
          <p className="text-2xl md:text-3xl font-extrabold tracking-tight">
            Have Questions About {isBPharm ? "B.Pharm" : "D.Pharm"} Admissions?
          </p>
          <p className="mt-4 text-base text-slate-200 max-w-2xl mx-auto leading-relaxed">
            Reach out directly to our Academic Office &amp; Secretariat at GTN College of Pharmacy, Dindigul.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/admission"
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-6 py-3 text-sm font-black text-slate-950 hover:bg-amber-300 transition shadow-lg"
            >
              Apply for Admissions 2025–26
            </Link>
            <a
              href="mailto:gtntrustofficial@gmail.com"
              className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 backdrop-blur-md px-6 py-3 text-sm font-bold text-white hover:bg-white/20 transition"
            >
              Contact Department Head
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
