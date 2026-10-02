"use client"; // This must be the very first line

import Hero from "@/components/Hero";
import { useState, ReactNode } from "react";
import { Button } from "@mui/material";
import DataTable from "@/components/Datatable";

const feedbackData = {
  desc: "The Student Grievance Cell was set up to redress academic and non-academic problems and grievances which the students undergo in the campus. The cell looks into the grievances very carefully after collecting letters/feedback related to their problems via suggestion box. Proper remedial measures or actions are made with regard to the base and nature of the problems. The committee functions with the following objectives.",
  description: [
    "To redress academic and administrative grievances and problems of the students.",
    "To make faculty members responsive and well-mannered in handling the students.",
    "To take remedial measures with impartial and holistic approach.",
  ],
  sections: [
    {
      Heading: "Objectives",
      Desc: [
        "To make faculty and students aware that they can submit complaints and that Members are available to do so",
        "To inspect the cause of grievances.",
        "To provide a forum where they may openly express their complaints while maintaining the utmost confidentiality.",
        "To ascertain that speedy appropriate actions are taken by addressing the faculty or by requesting the management depending upon the nature of grievance.",
        "To provide the students the proper counselling they need to resolve their complaints.",
      ],
    },
    {
      Heading: "Roles and Responsibilities",
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
      Heading: "Mode of Submitting the Grievance",
      Desc: [
        "An offended student may file an application to the Committee for redress of grievance.",
        " i) by email at gtntrustofficial@gmail.com or",
        "ii) by dropping the complaint at the suggestion box.",
      ],
    },
    {
      Heading: "Frequency of Grievance Redressal Committee Meetings",
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
      "Name of the Faculty/Student",
      "Designation",
      "Position",
    ],
    Table_data: [
      [1, "Dr. S. Muruganandam", "Principal", "Chairman"],
      [2, "Dr. G. M. Tamilselvan", "Vice Principal", "Member"],
      [3, "Dr. A. Babu Karuppiah", "HoD / ECE", "Member"],
      [4, "Dr. P. Nandhini", "HoD / CSE", "Member"],
      [5, "Dr. K. Meenambika", "HoD / S&H", "Member"],
      [6, "Mr. K. Mohan", "HoD / Agri", "Member"],
      [7, "Mr. Indranil Bakshi", "II year, CSE", "Student Member"],
      [8, "Ms. R. Harinisha", "III year, CSE", "Student Member"],
      [9, "Mr. G. K. Aswin Raj", "II year, IT", "Student Member"],
      [10, "Ms. S. Viji", "II year, IT", "Student Member"],
      [11, "Mr. S. Senthilnathan", "II Year, AIDS", "Student Member"],
      [12, "Ms. S. Dhanusri", "II Year, AIDS", "Student Member"],
      [13, "Mr. D. Parathasarathi", "II Year, ECE", "Student Member"],
      [14, "Ms. V. Malavika", "II Year, ECE", "Student Member"],
      [15, "Mr. C. Karupiah Sakthi", "III year, BME", "Student Member"],
      [16, "Mr. U. Bala", "II year, BME", "Student Member"],
      [17, "Mr. V. Tamillarasan", "III Year, MECH", "Student Member"],
      [18, "Mr. J. Karunya", "III Year, AGRI", "Student Member"],
      [19, "Mr. S. Kumaresh", "II Year, AGRI", "Student Member"],
    ],
  },
  onlineGrievanceUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdGnZI9zEy1kTn3AN_v-DVH62IDH1bA-n6wY5SvaJpASzVCeA/viewform?vc=0&c=0&w=1&flr=0",
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
    return null;
  };

  const activeContent = activeTab ? findItemByKey(activeTab) : null;

  const renderNavItems = (items: object, isSublevel = false): ReactNode => {
    return null;
  };

  // Function to create a valid accessorKey for DataTable
  const createAccessorKey = (header: string) => {
    return header
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  };

  // Transform committee data into DataTable-compatible format
  const transformedCommittee = {
    title: feedbackData.committee.Heading,
    columns: feedbackData.committee.Table_heading.map((header) => ({
      header,
      accessorKey: createAccessorKey(header),
    })),
    data: feedbackData.committee.Table_data.map((row) => {
      const rowData: { [key: string]: any } = {};
      feedbackData.committee.Table_heading.forEach((header, index) => {
        rowData[createAccessorKey(header)] = row[index];
      });
      return rowData;
    }),
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Students Grievance Redressal Cell"
        desc={feedbackData.desc}
        image="/assets/images/Pharmacy_courses/footer/feedback.jpg"

      />

      {/* Description Section */}
      <section className="bg-brand-sand py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-8">About the Grievance Redressal Cell</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-neutral-800 mb-4">Purpose</h3>
              <ul className="list-disc pl-6 text-lg text-neutral-600 space-y-4">
                {feedbackData.description.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives and Roles Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-8">Details of the Grievance Redressal Cell</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            {feedbackData.sections.map((section, index) => (
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

      {/* Committee Members Table */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <DataTable
              title={transformedCommittee.title}
              columns={transformedCommittee.columns}
              data={transformedCommittee.data}
            />
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-neutral-50 py-12 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4">ONLINE GRIEVANCES</h2>

          <div className="flex justify-center">
            <Button
              style={{ background: "#b60000" }}
              size="large"
              variant="contained"
              target="_blank"
              href={feedbackData.onlineGrievanceUrl}
            >
              Click Here
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}