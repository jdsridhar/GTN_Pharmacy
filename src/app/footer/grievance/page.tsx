"use client"; // This must be the very first line

import Hero from "@/components/Hero";
import { useState, ReactNode } from "react";
import { ArrowLeft, BookOpen, UserCheck, Star, X, FileText, ChevronDown } from "lucide-react";
import { Button } from "@mui/material";

// Dynamically import any client-side components if needed (e.g., for PDF viewer, but not required here)
import dynamic from 'next/dynamic';

// Extracted data from content-area.jsx for Grievance Cell
const grievanceData = {
  // desc: "The Student Grievance Cell was set up in order to redress academic and non-academic problems and grievances which the students undergo in the campus. The cell looks into the grievances very carefully after collecting letters/feedback related to their problems via suggestion box. Proper remedial measures or actions are made with regard to the base and nature of the problems. The committee functions with the following objectives.",
  sections: [
    {
      Heading: " ",
      Desc: [
        "To redress academic and administrative grievances and problems of the students.",
        "To make faculty members responsive and well-mannered in handling the students.",
        "To take remedial measures with impartial and holistic approach."

      ],
    },
    {
      Heading: "Objectives",
      Desc: [
        "To make faculty and students aware that they can submit complaints and that Members are available to do so",
        "To inspect the cause of grievances.",
        "To provide a forum where they may openly express their complaints while Maintaining the utmost confidentiality.",
        "To ascertain that speedy appropriate actions are taken by addressing the faculty or by requesting the management depending upon the nature of grievance.",
        "To provide the students the proper counselling they need to resolve their complaints.",
      ],
    },
    {
      Heading: "Roles and responsibilities",
      Desc: [
        "Encouraging students to voice their complaints and difficulties openly and honestly without any fear.",
        "To examine the grievances the Student Grievance Redressal Committee has received.",
        "To carry out surveys to determine students' issues and offer appropriate solutions.",
        "To provide responsive, accountable and easily accessible system for settlement of grievances and to take measures in the college to ensure expeditious settlement of grievances of students in order to preserve a peaceful educational environment in the institution.",
        "Encouraging college students to treat one another with dignity and respect, and to use the greatest restraint and patience if a conflict arises.",
        "Advising all staff to be affectionate to the students and refrain from acting hatefully against any of them for any reason.",
      ],
    },
    {
      Heading: "Mode of submitting the Grievance",
      Desc: [
        "An offended student may file an application to the Committee for redress of grievance.",
        " i) by email at gtntrustofficial@gmail.com or",
        "ii) by dropping the complaint at the suggestion box.",
      ],
    },
    {
      Heading: "Frequency of Grievance redressal committee meet:",
      Desc: [
        "The Grievance Redressal Cell normally meets once each month to discuss complaints.",
        "However, the Grievance Redressal Cell shall convene right away and take the required procedures to redress the grievance if it becomes essential due to the immediate actions that must be taken based on the nature of the complaint.",
      ],
    },
  ],
  committee: {
    Heading: "Committee Members",
    Table_heading: [
      "S.No.",
      "Name of the faculty/Student",
      "Designation",
      "Position",
    ],
    Table_data: [
      [1, "Dr. K. Meenambika", "HoD / S&H", "Chairperson"],
      [2, "Dr. P. Nandhini", "HoD / CSE", "Member"],
      [3, "Ms. S. Manimala", "AP / S&H", "Member"],
      [4, "Ms. M. Dhivya", "AP / ECE", "Member"],
      [5, "Ms. S. Udhaya", "AP / Agri", "Member"],
      [6, "Ms. M. Dhanalakshmi", "AP / S&H", "Member"],
      [7, "Ms. P. Sathya", "AP / CSE", "Member"],
      [8, "Ms. S. Abirami", "AP / CSE", "Member"],
      [9, "Ms. S. Hariprabha", "AP / CSE", "Member"],
    ],
  },
  onlineGrievanceUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdGnZI9zEy1kTn3AN_v-DVH62IDH1bA-n6wY5SvaJpASzVCeA/viewform?vc=0&c=0&w=1&flr=0",
};

// Dynamic data for Info section (adapted minimally if needed; no PDFs here, but can extend)
const infoData = {
  // Add any additional nav items if needed, similar to CoE page
  // For now, keeping it simple as grievance content doesn't have sub-resources like regulations/results
};

export default function GrievancePage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const handleItemClick = (key: string, item: any) => {
    if (item.contentType === 'folder') {
      setExpandedKey(prevKey => (prevKey === key ? null : key));
    } else {
      setActiveTab(key);
    }
  };

  const findItemByKey = (key: string) => {
    // Implement if adding more infoData; for now, not used extensively
    return null;
  };

  const activeContent = activeTab ? findItemByKey(activeTab) : null;

  const renderNavItems = (items: object, isSublevel = false): ReactNode => {
    // Implement if adding more nav items; for now, minimal
    return null;
  };

  return (
    <>
      {/* Hero Section - Adapted for Grievance Cell */}
      <Hero
        title="Students Grievance Redressal Cell"
        desc="Addressing academic and administrative grievances to ensure a positive campus experience."
        image="/assets/images/grievance-hero.jpg"
      />

      {/* About Section - Similar to CoE About */}
      {/* <section className="bg-brand-sand py-16 md:py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-8">About Students Grievance Redressal Cell</h2>
            <p className="text-lg text-neutral-600 mb-12">{grievanceData.desc}</p>
          </div>
        </div>
      </section> */}



      {/* Functions/Sections - Similar to CoE Functions */}
      <section className="bg-brand-sand py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-8">Details of the Grievance Redressal Cell</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            <p>The Student Grievance Cell was set up in order to redress academic and non-academic problems and grievances which the students undergo in the campus. The cell looks into the grievances very carefully after collecting letters/feedback related to their problems via suggestion box. Proper remedial measures or actions are made with regard to the base and nature of the problems. The committee functions with the following objectives.
            </p>
            {grievanceData.sections.map((section, index) => (
              <div key={index}>
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">{section.Heading}</h3>
                <ul className="list-disc pl-6 text-lg text-neutral-600 space-y-4">
                  {section.Desc.map((item, subIndex) => (
                    <li key={subIndex}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Members Table - Similar to CoE Team Table */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-8 text-center">
              {grievanceData.committee.Heading}
            </h2>
            <p className="text-lg text-neutral-600 mb-8 text-center">
              List of committee members in the Students Grievance Redressal Cell.
            </p>
            <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
              <table className="min-w-full text-left border-collapse">
                <thead className="bg-neutral-100">
                  <tr>
                    {grievanceData.committee.Table_heading.map((header, index) => (
                      <th key={index} className="px-6 py-3 text-sm font-semibold text-neutral-800 border-b">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grievanceData.committee.Table_data.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-neutral-50 transition-colors">
                      {row.map((value, columnIndex) => (
                        <td key={columnIndex} className="px-6 py-3 text-sm text-neutral-700 border-b">{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section - Optional, minimal as no PDFs/links beyond button */}
      <section className="bg-neutral-50 py-12 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4">ONLINE GRIEVANCES</h2>
          <div className="flex justify-center">
            <Button
              sx={{ backgroundColor: '#b60000', '&:hover': { backgroundColor: '#b60000' } }}
              size="large"
              variant="contained"
              target="_blank"
              href={grievanceData.onlineGrievanceUrl}
            >
              Click Here
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}