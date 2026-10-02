export interface StudentBioData {
  rollNo: string;
  regNo: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  parentMobile: string;
  email: string;
  address: string;
  quota: "Government (DME Counseling)" | "Management Quota";
  admissionDate: string;
  category: string;
}

export interface FeeReceipt {
  id: string;
  receiptNo: string;
  date: string;
  amount: number;
  mode: "Online / NetBanking" | "UPI" | "Demand Draft (DD)" | "Challan / Cash";
  description: string;
  status: "Completed";
}

export interface StudentFeesData {
  annualTuitionFee: number;
  specialLabFee: number;
  hostelTransportFee: number;
  scholarshipConcession: number;
  totalPayable: number;
  paidAmount: number;
  pendingAmount: number;
  status: "Paid" | "Partial" | "Pending";
  history: FeeReceipt[];
}

export interface DailyAttendanceRecord {
  id: string;
  date: string; // YYYY-MM-DD
  formattedDate: string; // e.g. "01 Oct 2026"
  day: string; // "Monday", "Tuesday", etc.
  status: "PRESENT" | "ABSENT" | "ON_LEAVE";
  session: "Full Day" | "Forenoon (FN)" | "Afternoon (AN)";
  markedBy: string; // "PA Secretariat Desk"
  remarks: string;
}

export interface StudentAttendanceData {
  totalWorkingDays: number;
  presentDays: number;
  absentDays: number;
  leaveDays: number;
  percentage: number;
  pciEligible: boolean; // >= 75%
  dailyLogs: DailyAttendanceRecord[]; // Day-wise attendance records entered by PA
  monthlyBreakdown: { month: string; percentage: number; present: number; total: number }[];
}

export interface SessionalSubjectMark {
  code: string;
  subject: string;
  semester: string; // "Semester I" or "Part I (Annual Pattern)"
  sessional1Theory: number; // max 30
  sessional1Practical: number; // max 15
  sessional2Theory: number; // max 30
  sessional2Practical: number; // max 15
  assignmentScore: number; // max 10
  finalInternal: number; // max 25 (PCI weightage)
  status: "Pass" | "Distinction" | "Needs Improvement";
  remarks: string;
}

export interface SemesterSubjectResult {
  code: string;
  subject: string;
  credits: number;
  internal: number; // max 25
  external: number; // max 75
  total: number; // max 100
  grade: "O" | "A+" | "A" | "B+" | "B" | "RA";
  gradePoint: number;
}

export interface SemesterResult {
  semester: string;
  academicYear: string;
  sgpa: number;
  result: "PASS" | "FAIL";
  subjects: SemesterSubjectResult[];
}

export interface StudentOtherData {
  hospitalPostings: {
    hospital: string;
    department: string;
    completedHours: number;
    requiredHours: number;
    status: "Completed" | "In Progress" | "Scheduled";
    instructorRemarks: string;
  };
  industrialTraining: {
    company: string;
    duration: string;
    projectTitle: string;
    status: "Completed" | "Under Review" | "Not Started";
  };
  library: {
    booksIssued: number;
    maxLimit: number;
    pendingDues: number;
    status: "Clearance Granted" | "Books Pending";
  };
  extracurricular: string[];
  conduct: "Exemplary" | "Good" | "Satisfactory";
}

export interface DepartmentClearance {
  id: string;
  department: string;
  inCharge: string;
  status: "CLEARED" | "PENDING";
  dueAmount: number;
  clearedDate?: string;
  remarks: string;
}

export interface StudentNoDueData {
  certificateNo: string;
  applicationDate: string;
  purpose: "Semester Examination Hall Ticket" | "Course Completion & TC" | "Provisional Degree";
  overallStatus: "CLEARED" | "PENDING";
  clearances: DepartmentClearance[];
  principalApproval: {
    approved: boolean;
    approvalDate?: string;
    authorityName: string;
    digitalSignature: string;
    remarks: string;
  };
}

export interface Announcement {
  id: string;
  title: string;
  category: "Academic" | "Examinations" | "PCI Compliance" | "Fees & Accounts" | "Hospital Postings" | "Campus Events" | "Urgent";
  audience: "All Students & Faculty" | "B.Pharm Students" | "D.Pharm Students" | "Final Year Students";
  priority: "High / Urgent" | "Important" | "Normal";
  date: string;
  postedBy: string;
  content: string;
  pinned?: boolean;
}

export function createStudentNoDue(
  studentId: string,
  feePending: number,
  libraryPending: number,
  attendancePct: number,
  hospitalCompleted: boolean = true,
  customCertificateNo?: string
): StudentNoDueData {
  const isAccountsCleared = feePending === 0;
  const isLibraryCleared = libraryPending === 0;
  const isAttendanceCleared = attendancePct >= 75;
  const isHospitalCleared = hospitalCompleted;

  const clearances: DepartmentClearance[] = [
    {
      id: "dept-accounts",
      department: "College Accounts & Fee Desk",
      inCharge: "Mr. R. Karthik (Accounts Officer)",
      status: isAccountsCleared ? "CLEARED" : "PENDING",
      dueAmount: feePending,
      clearedDate: isAccountsCleared ? "25 Sep 2026" : undefined,
      remarks: isAccountsCleared
        ? "All 1st Batch tuition, special lab, and campus amenities fees cleared."
        : `Outstanding 1st Year fee balance of ₹${feePending.toLocaleString()} pending clearance.`,
    },
    {
      id: "dept-library",
      department: "Central Library & Information Centre",
      inCharge: "Mrs. M. Banumathi (Chief Librarian)",
      status: isLibraryCleared ? "CLEARED" : "PENDING",
      dueAmount: libraryPending,
      clearedDate: isLibraryCleared ? "24 Sep 2026" : undefined,
      remarks: isLibraryCleared
        ? "All borrowed 1st Year reference textbooks returned in pristine condition. Zero dues."
        : `Overdue book fine of ₹${libraryPending} pending clearance.`,
    },
    {
      id: "dept-ceutics",
      department: "Pharmaceutics & Machine Room Lab",
      inCharge: "Dr. K. Balaji, M.Pharm., Ph.D.",
      status: "CLEARED",
      dueAmount: 0,
      clearedDate: "22 Sep 2026",
      remarks: "1st Year Pharmaceutics I lab equipment and glassware verified intact.",
    },
    {
      id: "dept-chem",
      department: "Pharmaceutical Chemistry & QC Lab",
      inCharge: "Dr. M. Sangeetha, M.Pharm., Ph.D.",
      status: "CLEARED",
      dueAmount: 0,
      clearedDate: "23 Sep 2026",
      remarks: "Analytical balances and synthesis station returned without breakage.",
    },
    {
      id: "dept-cognosy",
      department: "Pharmacognosy & Phytomedicine Lab",
      inCharge: "Dr. V. Rajesh, M.Pharm., Ph.D.",
      status: "CLEARED",
      dueAmount: 0,
      clearedDate: "22 Sep 2026",
      remarks: "Microscope lens and slide clearance verified for 1st Year batch.",
    },
    {
      id: "dept-cology",
      department: "Human Anatomy & Physiology Lab",
      inCharge: "Dr. S. K. Rathinam, Principal",
      status: "CLEARED",
      dueAmount: 0,
      clearedDate: "24 Sep 2026",
      remarks: "Anatomical models and experimental records submitted.",
    },
    {
      id: "dept-hospital",
      department: "GTN Hospital Clinical Postings Desk",
      inCharge: "Dr. A. Sundaram, MD (Medical Supdt.)",
      status: isHospitalCleared ? "CLEARED" : "PENDING",
      dueAmount: 0,
      clearedDate: isHospitalCleared ? "26 Sep 2026" : undefined,
      remarks: isHospitalCleared
        ? "1st Year hospital orientation and dispensary observation logbook verified."
        : "Hospital orientation logbook awaiting final clinical supervisor signoff.",
    },
    {
      id: "dept-hostel",
      department: "Hostel, Mess & Transport Section",
      inCharge: "Mr. P. Murugan (Hostel Warden)",
      status: "CLEARED",
      dueAmount: 0,
      clearedDate: "21 Sep 2026",
      remarks: "Hostel amenities verified and college bus pass stamped.",
    },
    {
      id: "dept-mentor",
      department: "Class In-Charge & Academic Mentorship",
      inCharge: "Mrs. N. Lakshmi, M.Pharm.",
      status: isAttendanceCleared ? "CLEARED" : "PENDING",
      dueAmount: 0,
      clearedDate: isAttendanceCleared ? "26 Sep 2026" : undefined,
      remarks: isAttendanceCleared
        ? `Day-wise attendance (${attendancePct}%) complies with PCI 75% rule. Sessional continuous evaluation submitted.`
        : `Attendance shortage (${attendancePct}% < 75%). Requires Principal condonation sanction before university hall ticket issuance.`,
    },
  ];

  const allCleared = clearances.every((c) => c.status === "CLEARED");

  return {
    certificateNo: customCertificateNo || `NODUE/GTN/2026/${studentId.slice(-3)}`,
    applicationDate: "20 Sep 2026",
    purpose: "Semester Examination Hall Ticket",
    overallStatus: allCleared ? "CLEARED" : "PENDING",
    clearances,
    principalApproval: {
      approved: allCleared,
      approvalDate: allCleared ? "27 Sep 2026" : undefined,
      authorityName: "Dr. S. K. Rathinam, M.Pharm., Ph.D.",
      digitalSignature: allCleared
        ? "Dr. S. K. Rathinam, Principal (Digitally Signed)"
        : "Pending Department Clearance",
      remarks: allCleared
        ? "Official clearance sanctioned for The Tamil Nadu Dr. M.G.R. Medical University Odd Semester Examinations 2026."
        : "Clearance withheld pending completion of flagged departmental dues.",
    },
  };
}

export interface StudentRecord {
  id: string; // e.g. "GTN24BP001"
  name: string;
  avatar: string;
  course: "Bachelor of Pharmacy (B.Pharm)" | "Diploma in Pharmacy (D.Pharm)";
  courseShort: "B.Pharm" | "D.Pharm";
  year: "1st Year";
  semester: string; // "Semester I" or "Part I (Annual Pattern)"
  batch: string; // "2024 - 2028 (1st Batch)" or "2024 - 2026 (1st Batch)"
  cgpa: number;
  bioData: StudentBioData;
  feesData: StudentFeesData;
  attendanceData: StudentAttendanceData;
  sessionalMarks: SessionalSubjectMark[];
  semesterMarks: SemesterResult[];
  otherData: StudentOtherData;
  noDueData: StudentNoDueData;
}

// 46 Standard Working Dates for current term (August 2026 to October 2026)
const STANDARD_WORKING_DATES = [
  { date: "2026-08-03", formattedDate: "03 Aug 2026", day: "Monday" },
  { date: "2026-08-04", formattedDate: "04 Aug 2026", day: "Tuesday" },
  { date: "2026-08-05", formattedDate: "05 Aug 2026", day: "Wednesday" },
  { date: "2026-08-06", formattedDate: "06 Aug 2026", day: "Thursday" },
  { date: "2026-08-07", formattedDate: "07 Aug 2026", day: "Friday" },
  { date: "2026-08-08", formattedDate: "08 Aug 2026", day: "Saturday" },
  { date: "2026-08-10", formattedDate: "10 Aug 2026", day: "Monday" },
  { date: "2026-08-11", formattedDate: "11 Aug 2026", day: "Tuesday" },
  { date: "2026-08-12", formattedDate: "12 Aug 2026", day: "Wednesday" },
  { date: "2026-08-13", formattedDate: "13 Aug 2026", day: "Thursday" },
  { date: "2026-08-14", formattedDate: "14 Aug 2026", day: "Friday" },
  { date: "2026-08-17", formattedDate: "17 Aug 2026", day: "Monday" },
  { date: "2026-08-18", formattedDate: "18 Aug 2026", day: "Tuesday" },
  { date: "2026-08-19", formattedDate: "19 Aug 2026", day: "Wednesday" },
  { date: "2026-08-20", formattedDate: "20 Aug 2026", day: "Thursday" },
  { date: "2026-08-21", formattedDate: "21 Aug 2026", day: "Friday" },
  { date: "2026-08-22", formattedDate: "22 Aug 2026", day: "Saturday" },
  { date: "2026-08-24", formattedDate: "24 Aug 2026", day: "Monday" },
  { date: "2026-08-25", formattedDate: "25 Aug 2026", day: "Tuesday" },
  { date: "2026-08-26", formattedDate: "26 Aug 2026", day: "Wednesday" },
  { date: "2026-08-27", formattedDate: "27 Aug 2026", day: "Thursday" },
  { date: "2026-08-28", formattedDate: "28 Aug 2026", day: "Friday" },
  { date: "2026-08-31", formattedDate: "31 Aug 2026", day: "Monday" },
  { date: "2026-09-01", formattedDate: "01 Sep 2026", day: "Tuesday" },
  { date: "2026-09-02", formattedDate: "02 Sep 2026", day: "Wednesday" },
  { date: "2026-09-03", formattedDate: "03 Sep 2026", day: "Thursday" },
  { date: "2026-09-04", formattedDate: "04 Sep 2026", day: "Friday" },
  { date: "2026-09-07", formattedDate: "07 Sep 2026", day: "Monday" },
  { date: "2026-09-08", formattedDate: "08 Sep 2026", day: "Tuesday" },
  { date: "2026-09-09", formattedDate: "09 Sep 2026", day: "Wednesday" },
  { date: "2026-09-10", formattedDate: "10 Sep 2026", day: "Thursday" },
  { date: "2026-09-11", formattedDate: "11 Sep 2026", day: "Friday" },
  { date: "2026-09-14", formattedDate: "14 Sep 2026", day: "Monday" },
  { date: "2026-09-15", formattedDate: "15 Sep 2026", day: "Tuesday" },
  { date: "2026-09-16", formattedDate: "16 Sep 2026", day: "Wednesday" },
  { date: "2026-09-17", formattedDate: "17 Sep 2026", day: "Thursday" },
  { date: "2026-09-18", formattedDate: "18 Sep 2026", day: "Friday" },
  { date: "2026-09-21", formattedDate: "21 Sep 2026", day: "Monday" },
  { date: "2026-09-22", formattedDate: "22 Sep 2026", day: "Tuesday" },
  { date: "2026-09-23", formattedDate: "23 Sep 2026", day: "Wednesday" },
  { date: "2026-09-24", formattedDate: "24 Sep 2026", day: "Thursday" },
  { date: "2026-09-25", formattedDate: "25 Sep 2026", day: "Friday" },
  { date: "2026-09-28", formattedDate: "28 Sep 2026", day: "Monday" },
  { date: "2026-09-29", formattedDate: "29 Sep 2026", day: "Tuesday" },
  { date: "2026-09-30", formattedDate: "30 Sep 2026", day: "Wednesday" },
  { date: "2026-10-01", formattedDate: "01 Oct 2026", day: "Thursday" },
];

function generateDailyLogs(
  absentIndexes: number[] = [],
  leaveIndexes: number[] = [],
  absentReasons: Record<number, string> = {}
): StudentAttendanceData {
  const totalWorkingDays = STANDARD_WORKING_DATES.length;
  let presentDays = 0;
  let absentDays = 0;
  let leaveDays = 0;

  const dailyLogs: DailyAttendanceRecord[] = STANDARD_WORKING_DATES.map((item, index) => {
    let status: "PRESENT" | "ABSENT" | "ON_LEAVE" = "PRESENT";
    let remarks = "Biometric entry verified by PA Desk";

    if (absentIndexes.includes(index)) {
      status = "ABSENT";
      absentDays++;
      remarks = absentReasons[index] || "Unexcused absence recorded by PA";
    } else if (leaveIndexes.includes(index)) {
      status = "ON_LEAVE";
      leaveDays++;
      remarks = absentReasons[index] || "Approved medical/od leave granted";
    } else {
      presentDays++;
    }

    return {
      id: `ATT-${item.date}`,
      date: item.date,
      formattedDate: item.formattedDate,
      day: item.day,
      status,
      session: "Full Day",
      markedBy: "PA Secretariat Desk",
      remarks,
    };
  });

  const percentage = Number(((presentDays / totalWorkingDays) * 100).toFixed(1));
  const pciEligible = percentage >= 75;

  return {
    totalWorkingDays,
    presentDays,
    absentDays,
    leaveDays,
    percentage,
    pciEligible,
    dailyLogs,
    monthlyBreakdown: [
      { month: "Aug", percentage: Number(((21 / 23) * 100).toFixed(1)), present: 21, total: 23 },
      { month: "Sep", percentage: Number(((20 / 22) * 100).toFixed(1)), present: 20, total: 22 },
      { month: "Oct", percentage: 100.0, present: 1, total: 1 },
    ],
  };
}

// 6 Inaugural Batch (1st Batch 2024) Student Records
export const studentsDatabase: StudentRecord[] = [
  {
    id: "GTN24BP001",
    name: "K. Anitha",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=faces",
    course: "Bachelor of Pharmacy (B.Pharm)",
    courseShort: "B.Pharm",
    year: "1st Year",
    semester: "Semester I",
    batch: "2024 - 2028 (1st Batch)",
    cgpa: 8.92,
    bioData: {
      rollNo: "GTN24BP001",
      regNo: "562415001",
      dob: "14 May 2006",
      gender: "Female",
      bloodGroup: "O +ve",
      fatherName: "M. Kumarasamy",
      motherName: "K. Revathi",
      mobile: "+91 98421 77312",
      parentMobile: "+91 94432 11980",
      email: "anitha.k@student.gtnpharmacy.ac.in",
      address: "14/2, GTN Nagar East, Old Karur Road, Dindigul - 624005, Tamil Nadu",
      quota: "Government (DME Counseling)",
      admissionDate: "18 August 2024",
      category: "BC",
    },
    feesData: {
      annualTuitionFee: 95000,
      specialLabFee: 15000,
      hostelTransportFee: 25000,
      scholarshipConcession: 10000,
      totalPayable: 125000,
      paidAmount: 125000,
      pendingAmount: 0,
      status: "Paid",
      history: [
        {
          id: "RCP-2024-001",
          receiptNo: "GTN/FEE/24/001",
          date: "18 Aug 2024",
          amount: 65000,
          mode: "Online / NetBanking",
          description: "1st Batch Term I Tuition & Special Laboratory Fees",
          status: "Completed",
        },
        {
          id: "RCP-2024-002",
          receiptNo: "GTN/FEE/24/082",
          date: "15 Sep 2024",
          amount: 60000,
          mode: "UPI",
          description: "Term II Campus Amenities & Pharmacy Lab Clearance",
          status: "Completed",
        },
      ],
    },
    attendanceData: generateDailyLogs([5, 14], [22], {
      5: "Informed Leave - Family function",
      14: "Fever - Medical prescription submitted to PA Desk",
      22: "Inter-Collegiate Pharmacy Symposium attendance (On Duty)",
    }),
    sessionalMarks: [
      {
        code: "BP101T",
        subject: "Human Anatomy and Physiology I",
        semester: "Semester I",
        sessional1Theory: 28,
        sessional1Practical: 14,
        sessional2Theory: 29,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Outstanding anatomical dissection & viva responses",
      },
      {
        code: "BP102T",
        subject: "Pharmaceutical Analysis I",
        semester: "Semester I",
        sessional1Theory: 27,
        sessional1Practical: 14,
        sessional2Theory: 28,
        sessional2Practical: 14,
        assignmentScore: 9,
        finalInternal: 24,
        status: "Distinction",
        remarks: "Titration accuracy exemplary",
      },
      {
        code: "BP103T",
        subject: "Pharmaceutics I",
        semester: "Semester I",
        sessional1Theory: 29,
        sessional1Practical: 15,
        sessional2Theory: 29,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Excellent syrup and suspension preparation skills",
      },
      {
        code: "BP104T",
        subject: "Pharmaceutical Inorganic Chemistry",
        semester: "Semester I",
        sessional1Theory: 26,
        sessional1Practical: 13,
        sessional2Theory: 27,
        sessional2Practical: 14,
        assignmentScore: 9,
        finalInternal: 23,
        status: "Pass",
        remarks: "Limit test calculations accurate",
      },
      {
        code: "BP105T",
        subject: "Communication Skills",
        semester: "Semester I",
        sessional1Theory: 29,
        sessional1Practical: 15,
        sessional2Theory: 30,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Exceptional verbal and clinical presentation",
      },
    ],
    semesterMarks: [
      {
        semester: "Semester I (Dr. M.G.R. Medical University Evaluation)",
        academicYear: "2024 - 2025 (Inaugural Year)",
        sgpa: 8.92,
        result: "PASS",
        subjects: [
          { code: "BP101T", subject: "Human Anatomy and Physiology I", credits: 4, internal: 25, external: 68, total: 93, grade: "O", gradePoint: 10 },
          { code: "BP102T", subject: "Pharmaceutical Analysis I", credits: 4, internal: 24, external: 65, total: 89, grade: "A+", gradePoint: 9 },
          { code: "BP103T", subject: "Pharmaceutics I", credits: 4, internal: 25, external: 67, total: 92, grade: "O", gradePoint: 10 },
          { code: "BP104T", subject: "Inorganic Chemistry", credits: 4, internal: 23, external: 62, total: 85, grade: "A+", gradePoint: 9 },
          { code: "BP105T", subject: "Communication Skills", credits: 2, internal: 25, external: 46, total: 71, grade: "A+", gradePoint: 9 },
        ],
      },
    ],
    otherData: {
      hospitalPostings: {
        hospital: "GTN Hospital Multi-Specialty Centre, Dindigul",
        department: "Outpatient Pharmacy & Dispensary Observation",
        completedHours: 35,
        requiredHours: 50,
        status: "In Progress",
        instructorRemarks: "Active participant in prescription reading sessions.",
      },
      industrialTraining: {
        company: "GTN Hospital Compounding Facility",
        duration: "1 Week",
        projectTitle: "Sterile preparation and aseptic handling protocols",
        status: "Completed",
      },
      library: {
        booksIssued: 2,
        maxLimit: 5,
        pendingDues: 0,
        status: "Clearance Granted",
      },
      extracurricular: [
        "First Prize in World Pharmacists Day 2024 Quiz Competition",
        "Elected 1st Batch Class Representative (B.Pharm)",
      ],
      conduct: "Exemplary",
    },
    noDueData: createStudentNoDue("GTN24BP001", 0, 0, 93.5, true, "NODUE/GTN/2026/001"),
  },

  {
    id: "GTN24BP014",
    name: "S. Vignesh",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=faces",
    course: "Bachelor of Pharmacy (B.Pharm)",
    courseShort: "B.Pharm",
    year: "1st Year",
    semester: "Semester I",
    batch: "2024 - 2028 (1st Batch)",
    cgpa: 8.45,
    bioData: {
      rollNo: "GTN24BP014",
      regNo: "562415014",
      dob: "27 September 2006",
      gender: "Male",
      bloodGroup: "A +ve",
      fatherName: "K. Subramanian",
      motherName: "S. Dhanalakshmi",
      mobile: "+91 97892 44310",
      parentMobile: "+91 94421 88540",
      email: "vignesh.s@student.gtnpharmacy.ac.in",
      address: "88, Soundararaja Mills Road, Palani Road, Dindigul - 624001, Tamil Nadu",
      quota: "Government (DME Counseling)",
      admissionDate: "20 August 2024",
      category: "BC",
    },
    feesData: {
      annualTuitionFee: 95000,
      specialLabFee: 15000,
      hostelTransportFee: 15000,
      scholarshipConcession: 0,
      totalPayable: 125000,
      paidAmount: 125000,
      pendingAmount: 0,
      status: "Paid",
      history: [
        {
          id: "RCP-2024-041",
          receiptNo: "GTN/FEE/24/014",
          date: "20 Aug 2024",
          amount: 80000,
          mode: "Online / NetBanking",
          description: "1st Batch Term I Fee Payment",
          status: "Completed",
        },
        {
          id: "RCP-2024-099",
          receiptNo: "GTN/FEE/24/099",
          date: "22 Sep 2024",
          amount: 45000,
          mode: "Demand Draft (DD)",
          description: "Term II Balance & Laboratory Consumables",
          status: "Completed",
        },
      ],
    },
    attendanceData: generateDailyLogs([8, 19, 29], [35], {
      8: "Unexcused absence recorded by PA Desk",
      19: "Medical leave approved by PA Office",
      29: "Late reporting - Marked Absent by PA",
      35: "NSS orientation attendance (On Duty)",
    }),
    sessionalMarks: [
      {
        code: "BP101T",
        subject: "Human Anatomy and Physiology I",
        semester: "Semester I",
        sessional1Theory: 25,
        sessional1Practical: 13,
        sessional2Theory: 26,
        sessional2Practical: 13,
        assignmentScore: 8,
        finalInternal: 22,
        status: "Pass",
        remarks: "Good lab records",
      },
      {
        code: "BP102T",
        subject: "Pharmaceutical Analysis I",
        semester: "Semester I",
        sessional1Theory: 24,
        sessional1Practical: 12,
        sessional2Theory: 25,
        sessional2Practical: 13,
        assignmentScore: 8,
        finalInternal: 21,
        status: "Pass",
        remarks: "Good titration consistency",
      },
      {
        code: "BP103T",
        subject: "Pharmaceutics I",
        semester: "Semester I",
        sessional1Theory: 27,
        sessional1Practical: 14,
        sessional2Theory: 27,
        sessional2Practical: 14,
        assignmentScore: 9,
        finalInternal: 23,
        status: "Distinction",
        remarks: "Neat dosage form preparations",
      },
      {
        code: "BP104T",
        subject: "Pharmaceutical Inorganic Chemistry",
        semester: "Semester I",
        sessional1Theory: 24,
        sessional1Practical: 12,
        sessional2Theory: 25,
        sessional2Practical: 13,
        assignmentScore: 8,
        finalInternal: 21,
        status: "Pass",
        remarks: "Regular in assignment submissions",
      },
    ],
    semesterMarks: [
      {
        semester: "Semester I (Dr. M.G.R. Medical University Evaluation)",
        academicYear: "2024 - 2025 (Inaugural Year)",
        sgpa: 8.45,
        result: "PASS",
        subjects: [
          { code: "BP101T", subject: "Human Anatomy & Physiology I", credits: 4, internal: 22, external: 60, total: 82, grade: "A+", gradePoint: 9 },
          { code: "BP102T", subject: "Pharmaceutical Analysis I", credits: 4, internal: 21, external: 58, total: 79, grade: "A", gradePoint: 8 },
          { code: "BP103T", subject: "Pharmaceutics I", credits: 4, internal: 23, external: 62, total: 85, grade: "A+", gradePoint: 9 },
          { code: "BP104T", subject: "Inorganic Chemistry", credits: 4, internal: 21, external: 59, total: 80, grade: "A+", gradePoint: 9 },
        ],
      },
    ],
    otherData: {
      hospitalPostings: {
        hospital: "GTN Hospital, Dindigul",
        department: "Hospital Inpatient Pharmacy Observation",
        completedHours: 30,
        requiredHours: 50,
        status: "In Progress",
        instructorRemarks: "Shows active enthusiasm in hospital rounds.",
      },
      industrialTraining: {
        company: "Industrial Visit to Sterile Formulation Facility",
        duration: "1 Day",
        projectTitle: "Good Manufacturing Practices (GMP) Familiarization",
        status: "Completed",
      },
      library: {
        booksIssued: 1,
        maxLimit: 5,
        pendingDues: 0,
        status: "Clearance Granted",
      },
      extracurricular: [
        "Member of GTN Pharmacy NSS Volunteer Corps",
        "Active Volunteer in World Pharmacists Day 2024 Health Rally",
      ],
      conduct: "Good",
    },
    noDueData: createStudentNoDue("GTN24BP014", 0, 0, 91.3, true, "NODUE/GTN/2026/014"),
  },

  {
    id: "GTN24BP025",
    name: "R. Priyadharshini",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=faces",
    course: "Bachelor of Pharmacy (B.Pharm)",
    courseShort: "B.Pharm",
    year: "1st Year",
    semester: "Semester I",
    batch: "2024 - 2028 (1st Batch)",
    cgpa: 9.15,
    bioData: {
      rollNo: "GTN24BP025",
      regNo: "562415025",
      dob: "03 February 2006",
      gender: "Female",
      bloodGroup: "B +ve",
      fatherName: "T. Rajendran",
      motherName: "R. Jayanthi",
      mobile: "+91 94433 12908",
      parentMobile: "+91 98422 66710",
      email: "priya.r@student.gtnpharmacy.ac.in",
      address: "21, Collectorate Road, Dindigul - 624004, Tamil Nadu",
      quota: "Government (DME Counseling)",
      admissionDate: "19 August 2024",
      category: "BC",
    },
    feesData: {
      annualTuitionFee: 95000,
      specialLabFee: 15000,
      hostelTransportFee: 10000,
      scholarshipConcession: 15000,
      totalPayable: 105000,
      paidAmount: 105000,
      pendingAmount: 0,
      status: "Paid",
      history: [
        {
          id: "RCP-2024-025",
          receiptNo: "GTN/FEE/24/025",
          date: "19 Aug 2024",
          amount: 60000,
          mode: "Online / NetBanking",
          description: "1st Batch Term I Fee Payment",
          status: "Completed",
        },
        {
          id: "RCP-2024-075",
          receiptNo: "GTN/FEE/24/075",
          date: "10 Sep 2024",
          amount: 45000,
          mode: "UPI",
          description: "Term II Fee Clearance",
          status: "Completed",
        },
      ],
    },
    attendanceData: generateDailyLogs([12], [28], {
      12: "Dental appointment (leave letter on file with PA)",
      28: "Medical leave approved by PA Office",
    }),
    sessionalMarks: [
      {
        code: "BP101T",
        subject: "Human Anatomy and Physiology I",
        semester: "Semester I",
        sessional1Theory: 30,
        sessional1Practical: 15,
        sessional2Theory: 30,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Batch Topper in Physiology Sessional",
      },
      {
        code: "BP102T",
        subject: "Pharmaceutical Analysis I",
        semester: "Semester I",
        sessional1Theory: 29,
        sessional1Practical: 15,
        sessional2Theory: 29,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Highest score in redox titrations",
      },
      {
        code: "BP103T",
        subject: "Pharmaceutics I",
        semester: "Semester I",
        sessional1Theory: 30,
        sessional1Practical: 15,
        sessional2Theory: 29,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Perfect preparation of emulsion & linctus",
      },
      {
        code: "BP104T",
        subject: "Pharmaceutical Inorganic Chemistry",
        semester: "Semester I",
        sessional1Theory: 28,
        sessional1Practical: 14,
        sessional2Theory: 29,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Thorough understanding of pharmacopoeial assays",
      },
    ],
    semesterMarks: [
      {
        semester: "Semester I (Dr. M.G.R. Medical University Evaluation)",
        academicYear: "2024 - 2025 (Inaugural Year)",
        sgpa: 9.15,
        result: "PASS",
        subjects: [
          { code: "BP101T", subject: "Human Anatomy & Physiology I", credits: 4, internal: 25, external: 72, total: 97, grade: "O", gradePoint: 10 },
          { code: "BP102T", subject: "Pharmaceutical Analysis I", credits: 4, internal: 25, external: 69, total: 94, grade: "O", gradePoint: 10 },
          { code: "BP103T", subject: "Pharmaceutics I", credits: 4, internal: 25, external: 70, total: 95, grade: "O", gradePoint: 10 },
          { code: "BP104T", subject: "Inorganic Chemistry", credits: 4, internal: 25, external: 68, total: 93, grade: "O", gradePoint: 10 },
        ],
      },
    ],
    otherData: {
      hospitalPostings: {
        hospital: "GTN Hospital, Dindigul",
        department: "Dispensary & Drug Storage",
        completedHours: 42,
        requiredHours: 50,
        status: "In Progress",
        instructorRemarks: "Exceptional diligence in prescription auditing.",
      },
      industrialTraining: {
        company: "Industrial Orientation at Sterile Formulation Unit",
        duration: "1 Day",
        projectTitle: "Study of sterile filtration and cleanroom grading",
        status: "Completed",
      },
      library: {
        booksIssued: 2,
        maxLimit: 5,
        pendingDues: 0,
        status: "Clearance Granted",
      },
      extracurricular: [
        "Gold Medalist in State-level Pharma Essay Competition",
        "Student Secretary - GTN Pharmacy Science Club",
      ],
      conduct: "Exemplary",
    },
    noDueData: createStudentNoDue("GTN24BP025", 0, 0, 95.6, true, "NODUE/GTN/2026/025"),
  },

  {
    id: "GTN24DP001",
    name: "M. Mohammed Arif",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=faces",
    course: "Diploma in Pharmacy (D.Pharm)",
    courseShort: "D.Pharm",
    year: "1st Year",
    semester: "Part I (Annual Pattern)",
    batch: "2024 - 2026 (1st Batch)",
    cgpa: 8.65,
    bioData: {
      rollNo: "GTN24DP001",
      regNo: "682415001",
      dob: "19 October 2006",
      gender: "Male",
      bloodGroup: "O -ve",
      fatherName: "A. Mansoor Ali",
      motherName: "M. Fathima",
      mobile: "+91 96291 00812",
      parentMobile: "+91 94862 33118",
      email: "arif.m@student.gtnpharmacy.ac.in",
      address: "54, Round Road, Nehruji Nagar, Dindigul - 624001, Tamil Nadu",
      quota: "Government (DME Counseling)",
      admissionDate: "25 August 2024",
      category: "BCM",
    },
    feesData: {
      annualTuitionFee: 65000,
      specialLabFee: 10000,
      hostelTransportFee: 15000,
      scholarshipConcession: 0,
      totalPayable: 90000,
      paidAmount: 90000,
      pendingAmount: 0,
      status: "Paid",
      history: [
        {
          id: "RCP-2024-DP01",
          receiptNo: "GTN/FEE/24/DP01",
          date: "25 Aug 2024",
          amount: 55000,
          mode: "Online / NetBanking",
          description: "1st Batch D.Pharm Term I Fees",
          status: "Completed",
        },
        {
          id: "RCP-2024-DP02",
          receiptNo: "GTN/FEE/24/DP02",
          date: "20 Sep 2024",
          amount: 35000,
          mode: "UPI",
          description: "Term II Fee Clearance",
          status: "Completed",
        },
      ],
    },
    attendanceData: generateDailyLogs([6, 17, 31], [25], {
      6: "Unexcused absence recorded by PA",
      17: "Approved medical leave recorded by PA",
      31: "Travel delay - Marked absent",
      25: "College Red Cross volunteer camp (On Duty)",
    }),
    sessionalMarks: [
      {
        code: "ER20-11T",
        subject: "Pharmaceutics (Theory & Practical)",
        semester: "Part I (Annual Pattern)",
        sessional1Theory: 26,
        sessional1Practical: 14,
        sessional2Theory: 27,
        sessional2Practical: 14,
        assignmentScore: 9,
        finalInternal: 23,
        status: "Distinction",
        remarks: "Good compounding of pharmaceutical mixtures",
      },
      {
        code: "ER20-12T",
        subject: "Pharmaceutical Chemistry",
        semester: "Part I (Annual Pattern)",
        sessional1Theory: 25,
        sessional1Practical: 13,
        sessional2Theory: 26,
        sessional2Practical: 13,
        assignmentScore: 8,
        finalInternal: 22,
        status: "Pass",
        remarks: "Good identification tests of cations and anions",
      },
      {
        code: "ER20-13T",
        subject: "Pharmacognosy",
        semester: "Part I (Annual Pattern)",
        sessional1Theory: 27,
        sessional1Practical: 14,
        sessional2Theory: 28,
        sessional2Practical: 14,
        assignmentScore: 9,
        finalInternal: 24,
        status: "Distinction",
        remarks: "Clean histological cross-section staining",
      },
      {
        code: "ER20-14T",
        subject: "Human Anatomy and Physiology",
        semester: "Part I (Annual Pattern)",
        sessional1Theory: 26,
        sessional1Practical: 13,
        sessional2Theory: 27,
        sessional2Practical: 14,
        assignmentScore: 9,
        finalInternal: 23,
        status: "Pass",
        remarks: "Good understanding of organ systems",
      },
      {
        code: "ER20-15T",
        subject: "Social Pharmacy",
        semester: "Part I (Annual Pattern)",
        sessional1Theory: 28,
        sessional1Practical: 14,
        sessional2Theory: 29,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Excellent public health project submission",
      },
    ],
    semesterMarks: [
      {
        semester: "Part I Annual Board Examination (PCI ER-2020 Scheme)",
        academicYear: "2024 - 2025 (Inaugural Year)",
        sgpa: 8.65,
        result: "PASS",
        subjects: [
          { code: "ER20-11T", subject: "Pharmaceutics", credits: 4, internal: 23, external: 62, total: 85, grade: "A+", gradePoint: 9 },
          { code: "ER20-12T", subject: "Pharmaceutical Chemistry", credits: 4, internal: 22, external: 60, total: 82, grade: "A+", gradePoint: 9 },
          { code: "ER20-13T", subject: "Pharmacognosy", credits: 4, internal: 24, external: 64, total: 88, grade: "A+", gradePoint: 9 },
          { code: "ER20-14T", subject: "Human Anatomy & Physiology", credits: 4, internal: 23, external: 61, total: 84, grade: "A+", gradePoint: 9 },
          { code: "ER20-15T", subject: "Social Pharmacy", credits: 3, internal: 25, external: 65, total: 90, grade: "O", gradePoint: 10 },
        ],
      },
    ],
    otherData: {
      hospitalPostings: {
        hospital: "GTN Hospital Dispensary Unit",
        department: "Outpatient Drug Dispensing & Patient Counselling",
        completedHours: 35,
        requiredHours: 50,
        status: "In Progress",
        instructorRemarks: "Polite demeanor and disciplined dispensing attitude.",
      },
      industrialTraining: {
        company: "GTN Trust Pharmacy Center",
        duration: "2 Weeks",
        projectTitle: "Retail Pharmacy inventory control and cold chain maintenance",
        status: "Completed",
      },
      library: {
        booksIssued: 1,
        maxLimit: 3,
        pendingDues: 0,
        status: "Clearance Granted",
      },
      extracurricular: [
        "First Aid & Emergency Response Training Certified",
        "Member of GTN Pharmacy Red Cross Wing",
      ],
      conduct: "Good",
    },
    noDueData: createStudentNoDue("GTN24DP001", 0, 0, 91.3, true, "NODUE/GTN/2026/101"),
  },

  {
    id: "GTN24BP042",
    name: "T. Deepika",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=300&fit=crop&crop=faces",
    course: "Bachelor of Pharmacy (B.Pharm)",
    courseShort: "B.Pharm",
    year: "1st Year",
    semester: "Semester I",
    batch: "2024 - 2028 (1st Batch)",
    cgpa: 8.78,
    bioData: {
      rollNo: "GTN24BP042",
      regNo: "562415042",
      dob: "11 June 2006",
      gender: "Female",
      bloodGroup: "B +ve",
      fatherName: "V. Thangavel",
      motherName: "T. Vasanthi",
      mobile: "+91 94441 55621",
      parentMobile: "+91 94433 77810",
      email: "deepika.t@student.gtnpharmacy.ac.in",
      address: "102, Trichy Main Road, Vedasandur, Dindigul - 624710, Tamil Nadu",
      quota: "Government (DME Counseling)",
      admissionDate: "22 September 2024",
      category: "BC",
    },
    feesData: {
      annualTuitionFee: 95000,
      specialLabFee: 15000,
      hostelTransportFee: 20000,
      scholarshipConcession: 5000,
      totalPayable: 125000,
      paidAmount: 90000,
      pendingAmount: 35000,
      status: "Partial",
      history: [
        {
          id: "RCP-2024-401",
          receiptNo: "GTN/FEE/24/0401",
          date: "22 Sep 2024",
          amount: 55000,
          mode: "Online / NetBanking",
          description: "1st Batch Term I Admission & Special Lab Advance",
          status: "Completed",
        },
        {
          id: "RCP-2024-402",
          receiptNo: "GTN/FEE/24/0488",
          date: "12 Oct 2024",
          amount: 35000,
          mode: "Challan / Cash",
          description: "Part II Fee Payment (Balance: ₹35,000 pending)",
          status: "Completed",
        },
      ],
    },
    attendanceData: generateDailyLogs([4, 15, 27, 40], [33], {
      4: "Medical leave approved by PA Desk",
      15: "Hostel unwell slip verified by Warden",
      27: "Unexcused absence recorded by PA",
      40: "Personal leave application with parent signature",
      33: "College Sports Day team volunteer (On Duty)",
    }),
    sessionalMarks: [
      {
        code: "BP101T",
        subject: "Human Anatomy and Physiology I",
        semester: "Semester I",
        sessional1Theory: 27,
        sessional1Practical: 14,
        sessional2Theory: 28,
        sessional2Practical: 14,
        assignmentScore: 9,
        finalInternal: 24,
        status: "Distinction",
        remarks: "Very neat cardiovascular diagram work",
      },
      {
        code: "BP102T",
        subject: "Pharmaceutical Analysis I",
        semester: "Semester I",
        sessional1Theory: 26,
        sessional1Practical: 13,
        sessional2Theory: 27,
        sessional2Practical: 14,
        assignmentScore: 9,
        finalInternal: 23,
        status: "Pass",
        remarks: "Good comprehension of gravimetric assays",
      },
      {
        code: "BP103T",
        subject: "Pharmaceutics I",
        semester: "Semester I",
        sessional1Theory: 28,
        sessional1Practical: 14,
        sessional2Theory: 29,
        sessional2Practical: 15,
        assignmentScore: 10,
        finalInternal: 25,
        status: "Distinction",
        remarks: "Precise powder blending and formulation",
      },
      {
        code: "BP104T",
        subject: "Pharmaceutical Inorganic Chemistry",
        semester: "Semester I",
        sessional1Theory: 26,
        sessional1Practical: 13,
        sessional2Theory: 27,
        sessional2Practical: 13,
        assignmentScore: 9,
        finalInternal: 23,
        status: "Pass",
        remarks: "Limit tests performed accurately",
      },
    ],
    semesterMarks: [
      {
        semester: "Semester I (Dr. M.G.R. Medical University Evaluation)",
        academicYear: "2024 - 2025 (Inaugural Year)",
        sgpa: 8.78,
        result: "PASS",
        subjects: [
          { code: "BP101T", subject: "Human Anatomy & Physiology I", credits: 4, internal: 24, external: 64, total: 88, grade: "A+", gradePoint: 9 },
          { code: "BP102T", subject: "Pharmaceutical Analysis I", credits: 4, internal: 23, external: 62, total: 85, grade: "A+", gradePoint: 9 },
          { code: "BP103T", subject: "Pharmaceutics I", credits: 4, internal: 25, external: 66, total: 91, grade: "O", gradePoint: 10 },
          { code: "BP104T", subject: "Inorganic Chemistry", credits: 4, internal: 23, external: 61, total: 84, grade: "A+", gradePoint: 9 },
        ],
      },
    ],
    otherData: {
      hospitalPostings: {
        hospital: "GTN Hospital, Dindigul",
        department: "Sterile Dispensary & IV Admixtures Observation",
        completedHours: 32,
        requiredHours: 50,
        status: "In Progress",
        instructorRemarks: "Careful observance of sterile hygiene standards.",
      },
      industrialTraining: {
        company: "GTN Research Lab Orientation",
        duration: "1 Day",
        projectTitle: "Analytical equipment demonstration (UV-Vis & FTIR)",
        status: "Completed",
      },
      library: {
        booksIssued: 1,
        maxLimit: 5,
        pendingDues: 0,
        status: "Clearance Granted",
      },
      extracurricular: [
        "Participant in Inter-College Pharmacy Debate 2024",
        "Member of GTN Fine Arts Cultural Committee",
      ],
      conduct: "Good",
    },
    noDueData: createStudentNoDue("GTN24BP042", 35000, 0, 89.1, true, "NODUE/GTN/2026/042"),
  },

  {
    id: "GTN24BP058",
    name: "N. Gokul",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=faces",
    course: "Bachelor of Pharmacy (B.Pharm)",
    courseShort: "B.Pharm",
    year: "1st Year",
    semester: "Semester I",
    batch: "2024 - 2028 (1st Batch)",
    cgpa: 7.55,
    bioData: {
      rollNo: "GTN24BP058",
      regNo: "562415058",
      dob: "05 August 2006",
      gender: "Male",
      bloodGroup: "AB +ve",
      fatherName: "K. Nagarajan",
      motherName: "N. Selvi",
      mobile: "+91 97861 22910",
      parentMobile: "+91 98420 33819",
      email: "gokul.n@student.gtnpharmacy.ac.in",
      address: "17, Siluvathur Road, Nagal Nagar, Dindigul - 624003, Tamil Nadu",
      quota: "Management Quota",
      admissionDate: "28 August 2024",
      category: "BC",
    },
    feesData: {
      annualTuitionFee: 95000,
      specialLabFee: 15000,
      hostelTransportFee: 15000,
      scholarshipConcession: 0,
      totalPayable: 125000,
      paidAmount: 85000,
      pendingAmount: 40000,
      status: "Partial",
      history: [
        {
          id: "RCP-2024-601",
          receiptNo: "GTN/FEE/24/0290",
          date: "28 Aug 2024",
          amount: 55000,
          mode: "Demand Draft (DD)",
          description: "1st Batch Term I Management Fee Advance",
          status: "Completed",
        },
        {
          id: "RCP-2024-602",
          receiptNo: "GTN/FEE/24/0350",
          date: "15 Sep 2024",
          amount: 30000,
          mode: "UPI",
          description: "Term II Fee Installment (Balance: ₹40,000 pending)",
          status: "Completed",
        },
      ],
    },
    attendanceData: generateDailyLogs(
      [2, 9, 13, 18, 23, 26, 30, 36, 38, 41, 44, 45], // 12 unexcused absences
      [7],
      {
        2: "Unexcused absence recorded by PA",
        9: "Absent - Parent notified by PA Office",
        13: "Unexcused absence recorded by PA",
        18: "Absent without prior leave slip",
        23: "Absent - Warning letter issued by PA Desk",
        26: "Unexcused absence recorded by PA",
        30: "Absent - Remedial class assigned",
        36: "Unexcused absence recorded by PA",
        38: "Absent without sanction",
        41: "Absent - Parent meeting called by Principal",
        44: "Unexcused absence recorded by PA",
        45: "Absent - Medical certificate pending verification",
        7: "Medical leave approved by PA Office",
      }
    ),
    sessionalMarks: [
      {
        code: "BP101T",
        subject: "Human Anatomy and Physiology I",
        semester: "Semester I",
        sessional1Theory: 20,
        sessional1Practical: 11,
        sessional2Theory: 21,
        sessional2Practical: 11,
        assignmentScore: 7,
        finalInternal: 17,
        status: "Needs Improvement",
        remarks: "Needs to improve theory conceptual clarity",
      },
      {
        code: "BP102T",
        subject: "Pharmaceutical Analysis I",
        semester: "Semester I",
        sessional1Theory: 21,
        sessional1Practical: 11,
        sessional2Theory: 22,
        sessional2Practical: 12,
        assignmentScore: 7,
        finalInternal: 18,
        status: "Pass",
        remarks: "Practical work acceptable",
      },
      {
        code: "BP103T",
        subject: "Pharmaceutics I",
        semester: "Semester I",
        sessional1Theory: 22,
        sessional1Practical: 11,
        sessional2Theory: 23,
        sessional2Practical: 12,
        assignmentScore: 8,
        finalInternal: 19,
        status: "Pass",
        remarks: "Regular attendance in lab required",
      },
      {
        code: "BP104T",
        subject: "Pharmaceutical Inorganic Chemistry",
        semester: "Semester I",
        sessional1Theory: 20,
        sessional1Practical: 10,
        sessional2Theory: 21,
        sessional2Practical: 11,
        assignmentScore: 7,
        finalInternal: 17,
        status: "Needs Improvement",
        remarks: "Needs extra practice on chemical equations",
      },
    ],
    semesterMarks: [
      {
        semester: "Semester I (Dr. M.G.R. Medical University Evaluation)",
        academicYear: "2024 - 2025 (Inaugural Year)",
        sgpa: 7.55,
        result: "PASS",
        subjects: [
          { code: "BP101T", subject: "Human Anatomy & Physiology I", credits: 4, internal: 17, external: 55, total: 72, grade: "B+", gradePoint: 7 },
          { code: "BP102T", subject: "Pharmaceutical Analysis I", credits: 4, internal: 18, external: 58, total: 76, grade: "A", gradePoint: 8 },
          { code: "BP103T", subject: "Pharmaceutics I", credits: 4, internal: 19, external: 57, total: 76, grade: "A", gradePoint: 8 },
          { code: "BP104T", subject: "Inorganic Chemistry", credits: 4, internal: 17, external: 56, total: 73, grade: "B+", gradePoint: 7 },
        ],
      },
    ],
    otherData: {
      hospitalPostings: {
        hospital: "GTN Hospital, Dindigul",
        department: "General Dispensary Observation",
        completedHours: 20,
        requiredHours: 50,
        status: "In Progress",
        instructorRemarks: "Must complete remaining 30 hours of hospital observation.",
      },
      industrialTraining: {
        company: "Industrial Visit to Sterile Formulation Facility",
        duration: "1 Day",
        projectTitle: "Observation of manufacturing cleanrooms",
        status: "Completed",
      },
      library: {
        booksIssued: 1,
        maxLimit: 5,
        pendingDues: 50,
        status: "Books Pending",
      },
      extracurricular: [
        "Participant in GTN Sports Cricket Tournament",
      ],
      conduct: "Satisfactory",
    },
    noDueData: createStudentNoDue("GTN24BP058", 40000, 50, 71.7, false, "NODUE/GTN/2026/058"),
  },
];

export const portalSummaryMetrics = {
  totalStudents: 160, // 100 B.Pharm 1st Batch + 60 D.Pharm 1st Batch
  bPharmStudents: 100, // 1st Batch 2024 - 2028
  dPharmStudents: 60, // 1st Batch 2024 - 2026
  totalFaculty: 18, // Mandated PCI faculty ratio for Inaugural Year
  feeCollectionRate: "92.4%",
  totalCollected: "₹ 1,48,50,000",
  totalPending: "₹ 11,50,000",
  avgAttendance: "89.4%",
  shortageCount: 1,
  universityPassRate: "PCI Approved (Inaugural 2024-2025 Batch)",
  pciStatus: "PCI Approved • Inaugural 1st Batch 2024",
};

export const initialAnnouncements: Announcement[] = [
  {
    id: "ANN-2026-001",
    title: "1st Batch Odd Semester Hall Ticket & Mandatory No Due Clearance Drive",
    category: "Examinations",
    audience: "All Students & Faculty",
    priority: "High / Urgent",
    date: "01 Oct 2026",
    postedBy: "Dr. S. K. Rathinam (Principal)",
    content: "All 1st Batch B.Pharm and D.Pharm students appearing for The Tamil Nadu Dr. M.G.R. Medical University odd semester examinations are instructed to complete their digital No Due Form across all departments (Accounts, Library, Laboratories, Hospital Observation, and Hostel) before 15th October 2026. Hall tickets will be dispatched strictly to students with completed clearance.",
    pinned: true,
  },
  {
    id: "ANN-2026-002",
    title: "PCI Section 14 Regulatory Attendance Review (< 75% Shortage Condonation)",
    category: "PCI Compliance",
    audience: "All Students & Faculty",
    priority: "High / Urgent",
    date: "29 Sep 2026",
    postedBy: "Dr. S. K. Rathinam (Principal)",
    content: "1st Batch students with attendance shortage between 65% and 74.9% must submit genuine medical leave certificates or hospital documentation verified by parent/guardian to the Principal Assistant (PA) Desk on or before 8th October 2026 for institutional scrutiny.",
    pinned: true,
  },
  {
    id: "ANN-2026-003",
    title: "GTN Hospital Clinical Postings - Rotational Shift Schedule for 1st Batch",
    category: "Hospital Postings",
    audience: "B.Pharm Students",
    priority: "Important",
    date: "26 Sep 2026",
    postedBy: "PA Secretariat Office",
    content: "1st Batch B.Pharm students will rotate through Inpatient Clinical Pharmacy, Sterile Compounding, and Drug Information Units at GTN Hospital, Dindigul starting from Monday, 8:00 AM. Daily preceptor logbooks are mandatory.",
    pinned: false,
  },
  {
    id: "ANN-2026-004",
    title: "Annual Tuition Fee & Lab Equipment Balance Clearance Notice",
    category: "Fees & Accounts",
    audience: "All Students & Faculty",
    priority: "Important",
    date: "24 Sep 2026",
    postedBy: "PA Secretariat Office",
    content: "1st Batch students with outstanding tuition or special lab charges are requested to settle their balances online via the Student Portal or at the PA Accounts Desk to avoid delay in semester examination registration.",
    pinned: false,
  },
  {
    id: "ANN-2026-005",
    title: "Celebration of Inaugural College Foundation & World Pharmacists Day",
    category: "Campus Events",
    audience: "All Students & Faculty",
    priority: "Normal",
    date: "20 Sep 2026",
    postedBy: "Dr. S. K. Rathinam (Principal)",
    content: "Special orientation and symposium celebrating our newly inaugurated pharmacy college with trust dignitaries and leading pharmaceutical scientists will be held in the GTN College of Pharmacy Auditorium.",
    pinned: false,
  },
];

export function getStudentById(id: string): StudentRecord | undefined {
  return studentsDatabase.find(
    (s) => s.id.toLowerCase() === decodeURIComponent(id).toLowerCase()
  );
}

export function getAllStudents(): StudentRecord[] {
  return studentsDatabase;
}

export function getAllAnnouncements(): Announcement[] {
  return initialAnnouncements;
}

export function getStudentNoDueData(id: string): StudentNoDueData | undefined {
  const std = getStudentById(id);
  return std?.noDueData;
}
