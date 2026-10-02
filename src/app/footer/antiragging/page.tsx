"use client"; // This must be the very first line

import Hero from "@/components/Hero";
import { useState, ReactNode } from "react";
import { Button } from "@mui/material";
import DataTable from "@/components/Datatable";

const antiRaggingData = {
  desc: "The Anti-Ragging Committee at GTN College Of Pharmacy, G.T.N. Nagar, Old Karur Road, Dindigul, Tamil Nadu, is constituted to prevent and address any instances of ragging. The committee has the authority to act against ragging, which includes any conduct—whether by words spoken or written, or by an act—that has the effect of teasing, treating, or handling with rudeness any other student, indulging in rowdy or undisciplined activities that cause annoyance, hardship, or psychological harm, or raise fear or apprehension in a fresher or junior student. The committee aims to maintain a safe and respectful environment for all students.",
  tables: [
    {
      Heading: "Anti-Ragging Squad 2024 - 2025",
      Table_heading: ["Name", "Position", "Category", "Designation/Occupation", "Telephone Numbers", "Mobile Numbers", "E-mail id"],
      Table_data: [
        ["Dr. Palanichamy R", "Chairman", "Principal", "Principal", "04283-359999", "7373696999", "principal@gtnarts.org"],
        ["Dr. Sakthivel M", "Member", "HOD1", "Professor and HoD", "04283-359999", "7989762845", "sakthivelm@gtnarts.org"],
        ["Dr. Amudha J", "Member", "HOD2", "Professor and HoD", "04283-359999", "9443736459", "hod.ece@gtnarts.org"],
        ["Dr. Nandhini P", "Member", "Faculty Member", "Faculty Member", "04283-359999", "9171514514", "hod.cse@gtnarts.org"],
        ["Ms. Manimala S", "Member", "Faculty Member", "Faculty Member (Female)", "04283-359999", "9626918354", "manimala.ap@gtnarts.org"],
        ["Mr. Mohan K", "Member", "Faculty Member", "Faculty Member (Male)", "04283-359999", "9677749250", "mohank@gtnarts.org"],
        ["Rajasudharsan R", "Member", "Faculty Member", "Faculty Member (Male)", "04283-359999", "9003523312", "hod.bme@gtnarts.org"],
        ["Mr. Sathyakumar D", "Member", "Non-Teaching Faculty", "Physical Director", "04283-359999", "9688728161", "sathyakumar@gtnarts.org"],
        ["Ms. Amsavalli V", "Member", "Non-Teaching Faculty", "Lab Instructor", "04283-359999", "8525038050", "amsavalliv.ece@gtnarts.org"],
      ],
    },
    {
      Heading: "Anti-Ragging Squad 2023 - 2024",
      Table_heading: ["S. No.", "Details of faculty members / students", "Role"],
      Table_data: [
        ["1", "Dr. G.M.Tamilselvan, Principal", "Chairman"],
        ["2", "Dr. J. Amudha, HoD/ECE", "Member"],
        ["3", "Dr. K. Meenambika, HoD / S&H", "Member"],
        ["4", "Mr. K. Mohan, AP / Agri", "Member"],
        ["5", "Mr. Lingeswaran, AP/BME", "Member"],
        ["6", "Mrs. R. Devi, Inspector, Dindigul", "Member"],
        ["7", "Mr. K. Arivudainambi, Thasildar, Dindigul", "Member"],
        ["8", "Rtn. PHF K. Senthilkumar, President, Rotary Club of Dindigul", "Member"],
        ["9", "Mrs. R.Sumathi, Parent representative (M/o of R. Dharshini, IV BME)", "Member"],
        ["10", "Mr. D. Sathyakumar, Representative of Non-Teaching Staffs", "Member"],
        ["11", "Mr. Joosetha D, I Year CSE", "Member"],
        ["12", "Ms. Priyadharshini M, I Year AI&DS", "Member"],
        ["13", "Mr. Hareshwaran S, I Year ECE", "Member"],
        ["14", "Mr. Deepak S, I year BME", "Member"],
        ["15", "Ms. Jeevitha, II Year BME", "Member"],
        ["16", "Mr. Mahammed Aashik, II Year, AI&DS", "Member"],
        ["17", "Mr. Indranil Bakshi, III year, CSE", "Member"],
        ["18", "Ms. Nukala Kavya, IV year, ECE", "Member"],
      ],
    },
    {
      Heading: "Anti-Ragging Squad 2022 - 2023",
      Table_heading: ["S. No.", "Details of faculty members / students", "Role"],
      Table_data: [
        ["1", "Dr. S. Muruganandam, Principal", "Chairman"],
        ["2", "Mrs. R. Devi, Inspector, Dindigul", "Member"],
        ["3", "Mrs. S. Bhanumathi, Tahsildar, Dindigul", "Member"],
        ["4", "Rtn. S. Persia, Rotarian President", "Member"],
        ["5", "Mr. S. Vadivelu – Parent representative", "Member"],
        ["6", "Mr. Indranil Bakshi, II year, CSE", "Member"],
        ["7", "Ms. M. Sathyakala, III year, ECE", "Member"],
        ["8", "Mr. D. Sathyakumar, Representative of Non-Teaching Staffs", "Member"],
      ],
    },
    {
      Heading: "Anti-Ragging Squad 2022 - 2022",
      Table_heading: ["S. No.", "Details of faculty members / students", "Role"],
      Table_data: [
        ["1", "Dr. S. Muruganandam, Principal", "Chairman"],
        ["2", "Dr. G. M. Tamilselvan, Vice Principal", "Member"],
        ["3", "Dr. K. Meenambika, HoD / S&H", "Member"],
        ["4", "Mr. G. Lingeswaran, AP / ECE", "Member"],
        ["5", "Mr. B. Anandan, AP / CSE", "Member"],
        ["6", "Mr. R. Boopathi, HoD / Mech", "Member"],
        ["7", "Mr. K. Mohan, HoD / Agri", "Member"],
        ["8", "Mr. D. Sathyakumar, Physical Director", "Member"],
        ["9", "Security Officer", "Member"],
      ],
    },
    {
      Heading: "Anti-Ragging Committee 2024 - 2025",
      Table_heading: ["Name", "Position", "Category", "Designation/Occupation", "Telephone Numbers", "Mobile Numbers", "E-mail id"],
      Table_data: [
        ["Dr. Palanichamy R", "Chairman", "Principal", "Principal", "04283-359999", "7373696999", "principal@gtnarts.org"],
        ["Ms. Devi R", "Member", "Police Department", "Sub Inspector", "04283 – 212152", "9486316399", "devir11@gmail.com"],
        ["Mr. Arivudainambi K", "Member", "Revenue/ Taluk / Civil/ Officers", "Tahsildar", "04283 – 251277", "9445000554", "tahsildardindigul@gmail.com"],
        ["Mr. Senthil Kumar K", "Member", "Official of NGO", "President", "–", "9994422154", "senthilkumar.phf@gmail.com"],
        ["Mrs. Sumathi R", "Member", "Representatives of parents", "House Wife", "–", "9578090500", "sumathi.selvi@gmail.com"],
        ["Ms. Dharshini R", "Member", "Representatives of Students", "Student", "–", "9384228357", "shalini.rbme@gmail.com"],
        ["Ms. Amsavalli V", "Member", "Non-Teaching Faculty", "Lab Instructor", "04283-359999", "8525038050", "amsavalliv.ece@gtnarts.org"],
        ["Mr. Mohan K", "Member", "Faculty members", "Faculty Member Male", "04283-359999", "9677749250", "mohank@gtnarts.org"],
        ["Dr. Meenambika K", "Others", "Member Administration", "CAO", "04283 – 359999", "8778552343", "cao@gtnarts.org"],
        ["Dr. Senthil Ragavan VK", "Others", "Member Teaching Faculty", "Professor and Dean", "0424 – 2290287", "9150073449", "drvks@gtnarts.org"],
      ],
    },
    {
      Heading: "Anti-Ragging Committee 2023 - 2024",
      Table_heading: ["S. No.", "Details of faculty members / students", "Role"],
      Table_data: [
        ["1", "Dr. G.M.Tamilselvan, Principal", "Chairman"],
        ["2", "Dr. J. Amudha, HoD/ECE", "Member"],
        ["3", "Dr. K. Meenambika, HoD / S&H", "Member"],
        ["4", "Mr. K. Mohan, AP / Agri", "Member"],
        ["5", "Mr. Lingeswaran, AP/BME", "Member"],
        ["6", "Mrs. R. Devi, Inspector, Dindigul", "Member"],
        ["7", "Mr. K. Arivudainambi, Thasildar, Dindigul", "Member"],
        ["8", "Rtn. PHF K. Senthilkumar, President, Rotary Club of Dindigul", "Member"],
        ["9", "Mrs. R.Sumathi, Parent representative (M/o of R. Dharshini, IV BME)", "Member"],
        ["10", "Mr. D. Sathyakumar, Representative of Non-Teaching Staff", "Member"],
      ],
    },
    {
      Heading: "Anti-Ragging Committee 2022 - 2023",
      Table_heading: ["Sl No", "Name", "Position", "Category", "Present Designation", "Mobile Number", "Email ID"],
      Table_data: [
        ["1", "Dr. S. Muruganandam", "Chairman", "Principal", "Principal", "7373696999", "principal@gtnarts.org"],
        ["2", "Mrs. P. Chandralekha", "Member", "Police Department", "Inspector of Police", "9486316399", "chandralekhabmi@gmail.com"],
        ["3", "Mrs. S. Banumathi", "Member", "Revenue Officer", "Thasildar", "9445000554", "tahsildardindigul@gmail.com"],
        ["4", "Rtn. S. Persia", "Member", "Official of NGO", "Rotarian President", "9942911363", "persiacandy@gmail.com"],
        ["5", "Mr. S. Vadivelu", "Member", "Representatives of Students", "Parent", "9942971347", "gayathri15012003@gmail.com"],
        ["6", "Ms. A. Shalini", "Member", "Representatives of Students", "Girl Student", "9384228357", "sathyashalinicse@gmail.com"],
        ["7", "Mr. Abijeetraj", "Member", "Representatives of Students", "Boy Student", "7759835888", "lalanprasad@gmail.com"],
        ["8", "Dr. K. G. Senthilvasan", "Member", "Others", "Director (Admin)", "7339245999", "senthilvasan@gtnarts.org"],
        ["9", "Mr. Uthayakumar B", "Member", "Others", "Administrative Officer", "9443244300", "uthayakumar@gtnarts.org"],
      ],
    },
    {
      Heading: "Anti-Ragging Committee 2021 - 2022",
      Table_heading: ["Name", "Position", "Category", "Designation", "Telephone Numbers", "Mobile Numbers", "E-mail id"],
      Table_data: [
        ["Dr. S Muruganandam", "Chairman", "Principal", "Principal", "04283-262901", "7373696999", "principal@gtnarts.org"],
        ["Dr. A Suphalakshmi", "Member", "HOD1", "HoD CSE", "-", "9443586582", "hod.cse@gtnarts.org"],
        ["Dr. T Aasaithambi", "Member", "HOD2", "Professor and Head", "-", "9443736459", "aasaithambi@gtnarts.org"],
        ["Dr. K Meenambika", "Member", "Faculty Member", "Assistant Professor", "-", "9715839999", "kmeenambika@gtnarts.org"],
        ["Dr. K Kumar", "Member", "Member", "Associate Professor", "-", "8344185554", "kumara@gtnarts.org"],
        ["Dr. K.G Senthilvasan", "Member", "Director (Admin)", "Director (Admin)", "-", "7339245999", "senthilvasan@gtnarts.org"],
      ],
    },
  ],
  onlineComplaintUrl: "https://docs.google.com/forms/d/e/1FAIpQLSf3X4yZ9zEy1kTn3AN_v-DVH62IDH1bA-n6wY5SvaJpASzVCeA/viewform", // Example URL
};

export default function AntiRaggingPage() {
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

  // Transform table data into DataTable-compatible format
  const transformedTables = antiRaggingData.tables.map((tableItem) => {
    const columns = tableItem.Table_heading.map((header) => ({
      header,
      accessorKey: createAccessorKey(header),
    }));

    const data = tableItem.Table_data.map((row) => {
      const rowData: { [key: string]: any } = {};
      tableItem.Table_heading.forEach((header, index) => {
        rowData[createAccessorKey(header)] = row[index];
      });
      return rowData;
    });

    return {
      title: tableItem.Heading,
      columns,
      data,
    };
  });

  return (
    <>
      {/* Hero Section */}
      <Hero
        title="Anti-Ragging Committee"
        desc={antiRaggingData.desc}
        image="/assets/images/Pharmacy_courses/footer/antiragging.jpeg"
      />

      {/* Committee Tables Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-8 text-center">
              Anti-Ragging Committee and Squad Members
            </h2>
            <p className="text-lg text-neutral-600 mb-8 text-center">
              List of members in the Anti-Ragging Committee and Squads across different years.
            </p>
            {transformedTables.map((table, index) => (
              <div key={index} style={{ marginBottom: '2rem' }}>
                <DataTable
                  title={table.title}
                  columns={table.columns}
                  data={table.data}
                />
              </div>
            ))}
          </div>
        </div>
      </section>



    </>
  );
}