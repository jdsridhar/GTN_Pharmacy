"use client"; // This must be the very first line

import Hero from "@/components/Hero";
import { useState, ReactNode } from "react";
import { Button } from "@mui/material";
import DataTable from "@/components/Datatable";

const poshData = {
  desc: "As per the guidelines of UGC, NAAC, and the Supreme Court, the Women Anti Harassment Cell has been established by GTN College of Pharmacy to provide a healthy and congenial atmosphere to the female staff members and students. Our college, a co-educational institution, provides opportunities for both boys and girls to develop their leadership qualities. However, any unwelcome sexually motivated behavior—whether directly or by implication involving physical contact or advances, demand for sexual favors, sexually colored remarks, or other unwelcome physical, verbal, or non-verbal expressions of a sexual nature that affects their right to work in a congenial environment—is strictly observed and severely punished. This cell aims to sensitize students and staff and work diligently to prevent sexual harassment in the college. Complaints of sexual harassment shall be lodged with the Committee, and appropriate disciplinary action shall be initiated by the members per the college's rules and regulations.",
  sections: [
    {
      Heading: "Objectives",
      Desc: [
        "To prevent sexual harassment.",
        "To prevent gender discrimination.",
        "To conduct periodical programs on women’s empowerment.",
        "To provide a conducive environment and congenial atmosphere for both girl students and faculty members.",
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
      [1, "Dr. R. Palanichamy", "Principal", "Chairman"],
      [2, "Dr. K. Meenambika", "HoD / S&H", "Chairperson"],
      [3, "Dr. P. Nandhini", "HoD / CSE", "Member"],
      [4, "Ms. S. Manimala", "AP / S&H", "Member"],
      [5, "Ms. M. Dhivya", "AP / ECE", "Member"],
      [6, "Ms. A. Harini", "AP / AGRI", "Member"],
      [7, "Ms. M. Dhanalakshmi", "AP / S&H", "Member"],
      [8, "Ms. P. Sathya", "AP / CSE", "Member"],
      [9, "Mrs. S. Kanimozhi", "AP / BME", "Member"],
      [10, "Mr. G. K. Aswin Raj", "II year, IT Student", "Member"],
      [11, "Ms. S. Viji", "II year, IT Student", "Member"],
      [12, "Mr. D. Parathasarathi", "II Year, ECE Student", "Member"],
      [13, "Ms. V. Malavika", "II Year, ECE Student", "Member"],
      [14, "Mr. U. Bala", "II year, BME Student", "Member"],
      [15, "Ms. P. M. Dheeksha", "II year, AIDS Student", "Member"],
      [16, "Mr. P. Vishal", "II year, AIDS Student", "Member"],
      [17, "Ms. A. B. Rithanya", "III year, AIDS Student", "Member"],
      [18, "Mr. S. Mukilarasan", "III year, AIDS Student", "Member"],
      [19, "Mr. Anandhan", "II year, AGRI Student", "Member"],
      [20, "Ms. Dharani", "II year, AGRI Student", "Member"],
      [21, "Ms. Kanishma", "II year, BME Student", "Member"],
      [22, "Ms. Sharmili", "II year, CSE Student", "Member"],
      [23, "Mr. Aswin Raj", "II year, CSE Student", "Member"],
      [24, "Ms. A. B. Rithanya", "III year, AIDS Student", "Member"],
      [25, "Mr. S. Mukilarasan", "III year, AIDS Student", "Member"],
      [26, "Ms. Uyyala Sandhyarani", "I year, CSE Student", "Member"],
      [27, "Mr. Chevuri Ramakrishna Prasad", "I year, Cyber Student", "Member"],
      [28, "Mr. Udhayan", "II year, MECH Student", "Member"],
      [29, "Mr. Muhammed Razi", "I year, AIDS Student", "Member"],
      [30, "Ms. Fiza Noor Kolakkattil", "I year, AIDS Student", "Member"],
    ],
  },
  onlineComplaintUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdGnZI9zEy1kTn3AN_v-DVH62IDH1bA-n6wY5SvaJpASzVCeA/viewform?vc=0&c=0&w=1&flr=0",
};

export default function PoshPage() {
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
    title: poshData.committee.Heading,
    columns: poshData.committee.Table_heading.map((header) => ({
      header,
      accessorKey: createAccessorKey(header),
    })),
    data: poshData.committee.Table_data.map((row) => {
      const rowData: { [key: string]: any } = {};
      poshData.committee.Table_heading.forEach((header, index) => {
        rowData[createAccessorKey(header)] = row[index];
      });
      return rowData;
    }),
  };

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Prevention of Sexual Harassment (POSH) Cell"
        desc={poshData.desc}
        image="/assets/images/Pharmacy_courses/footer/posh.jpeg"

      />

      {/* Objectives Section */}
      <section className="bg-brand-sand py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800 mb-8">Details of the POSH Cell</h2>
          <div className="max-w-2xl mx-auto space-y-8">
            {poshData.sections.map((section, index) => (
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
              style={{background:"#b60000"}}
              size="large"
              variant="contained"
              target="_blank"
              href={poshData.onlineComplaintUrl}
            >
             CLICK HERE
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}