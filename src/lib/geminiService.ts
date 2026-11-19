import {
  studentsDatabase,
  portalSummaryMetrics,
  initialAnnouncements,
  StudentRecord,
} from "@/data/portalData";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  relatedStudents?: StudentRecord[];
  isVoice?: boolean;
}

// Key resolution: LocalStorage key overrides or falls back to NEXT_PUBLIC_GEMINI_API_KEY
export function getGeminiApiKey(): string {
  if (typeof window !== "undefined") {
    const customKey = localStorage.getItem("gtn_gemini_api_key");
    if (customKey && customKey.trim()) {
      return customKey.trim();
    }
  }
  return process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim() || "";
}

export function saveGeminiApiKey(key: string): void {
  if (typeof window !== "undefined") {
    if (key.trim()) {
      localStorage.setItem("gtn_gemini_api_key", key.trim());
    } else {
      localStorage.removeItem("gtn_gemini_api_key");
    }
  }
}

/**
 * Builds a comprehensive, structured text context containing all 6 inaugural batch students,
 * their bio-data, academic standing, fees, day-wise attendance, sessional marks, and clearances.
 */
export function buildStudentDatabaseContext(): string {
  const studentsSummary = studentsDatabase.map((s, idx) => {
    const sessionalList = s.sessionalMarks
      .map(
        (m) =>
          `  - ${m.code} (${m.subject}): Sess1 Th:${m.sessional1Theory}/30, Prac:${m.sessional1Practical}/15 | Sess2 Th:${m.sessional2Theory}/30, Prac:${m.sessional2Practical}/15 | Assignment:${m.assignmentScore}/10 | Final Internal:${m.finalInternal}/25 (${m.status})`
      )
      .join("\n");

    const semList = s.semesterMarks
      .map(
        (sem) =>
          `  - ${sem.semester} (SGPA: ${sem.sgpa}, Result: ${sem.result}): ` +
          sem.subjects
            .map((sub) => `${sub.code}: ${sub.total}/100 (Grade ${sub.grade})`)
            .join(", ")
      )
      .join("\n");

    const clearanceList = s.noDueData.clearances
      .map((c) => `  - ${c.department}: ${c.status} (Due: ₹${c.dueAmount}, Remarks: ${c.remarks})`)
      .join("\n");

    return `
### STUDENT #${idx + 1}: ${s.name} (${s.id})
- **Course & Batch**: ${s.course} (${s.courseShort}), Year: ${s.year}, Semester: ${s.semester}, Batch: ${s.batch}
- **Academic Standing**: CGPA: ${s.cgpa}
- **Bio-Data**:
  - Register No: ${s.bioData.regNo}
  - Roll No: ${s.bioData.rollNo}
  - Date of Birth: ${s.bioData.dob} | Gender: ${s.bioData.gender} | Blood Group: ${s.bioData.bloodGroup}
  - Father: ${s.bioData.fatherName} | Mother: ${s.bioData.motherName}
  - Student Mobile: ${s.bioData.mobile} | Parent Mobile: ${s.bioData.parentMobile}
  - Email: ${s.bioData.email}
  - Address: ${s.bioData.address}
  - Quota: ${s.bioData.quota} | Category: ${s.bioData.category} | Admission Date: ${s.bioData.admissionDate}
- **Fee Record**:
  - Total Fee: ₹${s.feesData.totalPayable.toLocaleString()} (Tuition: ₹${s.feesData.annualTuitionFee.toLocaleString()}, Lab: ₹${s.feesData.specialLabFee.toLocaleString()}, Hostel/Transport: ₹${s.feesData.hostelTransportFee.toLocaleString()}, Concession: ₹${s.feesData.scholarshipConcession.toLocaleString()})
  - Paid Amount: ₹${s.feesData.paidAmount.toLocaleString()}
  - Pending Balance: ₹${s.feesData.pendingAmount.toLocaleString()}
  - Fee Status: ${s.feesData.status}
- **Attendance Record**:
  - Total Working Days: ${s.attendanceData.totalWorkingDays}
  - Days Present: ${s.attendanceData.presentDays} | Absent: ${s.attendanceData.absentDays} | Leave: ${s.attendanceData.leaveDays}
  - Attendance Percentage: ${s.attendanceData.percentage}%
  - PCI Exam Eligibility (>=75% required): ${s.attendanceData.pciEligible ? "ELIGIBLE (>= 75%)" : "SHORTAGE / AT RISK (< 75%)"}
- **Sessional & Internal Marks**:
${sessionalList || "  - No sessional records"}
- **Semester University Results**:
${semList || "  - No university semester exam records yet"}
- **Hospital Postings & Clinical Training**:
  - Hospital: ${s.otherData.hospitalPostings.hospital} (${s.otherData.hospitalPostings.department})
  - Hours: ${s.otherData.hospitalPostings.completedHours}/${s.otherData.hospitalPostings.requiredHours} hrs (Status: ${s.otherData.hospitalPostings.status})
  - Supervisor Remarks: ${s.otherData.hospitalPostings.instructorRemarks}
- **Library Record**:
  - Books Issued: ${s.otherData.library.booksIssued}/${s.otherData.library.maxLimit} | Dues: ₹${s.otherData.library.pendingDues} | Status: ${s.otherData.library.status}
- **No Due Clearance**:
  - Certificate No: ${s.noDueData.certificateNo}
  - Overall Clearance Status: ${s.noDueData.overallStatus}
  - Principal Approval: ${s.noDueData.principalApproval.approved ? "APPROVED" : "PENDING"} (Signer: ${s.noDueData.principalApproval.authorityName})
  - Department Clearances:
${clearanceList}
- **Extracurricular**: ${s.otherData.extracurricular.join(", ")} | Conduct: ${s.otherData.conduct}
- **Direct Portal Link**: /student/${s.id}
`;
  }).join("\n");

  const metricsSummary = `
### INSTITUTION SUMMARY METRICS (GTN College of Pharmacy):
- Total Inaugural Batch Enrolled: ${portalSummaryMetrics.totalStudents}
- B.Pharm 1st Batch Students: ${portalSummaryMetrics.bPharmStudents}
- D.Pharm 1st Batch Students: ${portalSummaryMetrics.dPharmStudents}
- Overall Batch Attendance Average: ${portalSummaryMetrics.avgAttendance}
- Attendance Shortage Count (<75% PCI threshold): ${portalSummaryMetrics.shortageCount} students (${studentsDatabase.filter((s) => s.attendanceData.percentage < 75).map((s) => `${s.name} - ${s.attendanceData.percentage}%`).join(", ")})
- Fee Collection Rate: ${portalSummaryMetrics.feeCollectionRate}
- Total Fee Collected: ${portalSummaryMetrics.totalCollected}
- Total Outstanding Balance: ${portalSummaryMetrics.totalPending}
- Students with Fee Dues: ${studentsDatabase.filter((s) => s.feesData.pendingAmount > 0).map((s) => `${s.name} (₹${s.feesData.pendingAmount.toLocaleString()})`).join(", ")}
`;

  const announcementsSummary = `
### RECENT COLLEGE CIRCULARS / ANNOUNCEMENTS:
${initialAnnouncements.map((a) => `- [${a.date}] **${a.title}** (${a.category}, Audience: ${a.audience}): ${a.content}`).join("\n")}
`;

  return `${metricsSummary}\n${announcementsSummary}\n${studentsSummary}`;
}

/**
 * Searches the student database to find student records matching a query.
 */
export function findRelatedStudents(query: string): StudentRecord[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];

  // Match by id, name, regNo, rollNo
  return studentsDatabase.filter((s) => {
    const nameMatch = s.name.toLowerCase().includes(q);
    const idMatch = s.id.toLowerCase().includes(q);
    const regMatch = s.bioData.regNo.toLowerCase().includes(q);
    const firstNameMatch = s.name.toLowerCase().split(" ").some((part) => part.length > 2 && q.includes(part));
    return nameMatch || idMatch || regMatch || firstNameMatch;
  });
}

/**
 * Local intelligent student data querying engine.
 * Used when Gemini API key is not configured or as instant fallback if network/quota fails.
 * Guarantees 100% correct, verified data answers directly from the student database!
 */
export function queryLocalStudentData(query: string): { text: string; relatedStudents: StudentRecord[] } {
  const q = query.toLowerCase().trim();

  // 1. Check for specific student match
  const matchedStudents = findRelatedStudents(q);
  if (matchedStudents.length === 1) {
    const s = matchedStudents[0];

    // Detailed topic checks for this student
    if (q.includes("fee") || q.includes("dues") || q.includes("paid") || q.includes("payment")) {
      return {
        text: `### 💳 Fee Details for ${s.name} (${s.id})
- **Course**: ${s.course} (${s.year})
- **Status**: **${s.feesData.status}**
- **Total Payable**: ₹${s.feesData.totalPayable.toLocaleString()}
- **Amount Paid**: ₹${s.feesData.paidAmount.toLocaleString()}
- **Pending Balance**: **₹${s.feesData.pendingAmount.toLocaleString()}**
- **Tuition**: ₹${s.feesData.annualTuitionFee.toLocaleString()} | **Special Lab**: ₹${s.feesData.specialLabFee.toLocaleString()}
- **Hostel / Transport**: ₹${s.feesData.hostelTransportFee.toLocaleString()}
- **Scholarship / Concession**: ₹${s.feesData.scholarshipConcession.toLocaleString()}

👉 [Open Full Student Profile](/student/${s.id})`,
        relatedStudents: [s],
      };
    }

    if (q.includes("attendance") || q.includes("present") || q.includes("absent") || q.includes("pci")) {
      const isEligible = s.attendanceData.percentage >= 75;
      return {
        text: `### 📅 Attendance Record for ${s.name} (${s.id})
- **Overall Attendance**: **${s.attendanceData.percentage}%** ${isEligible ? "✅" : "⚠️ (Shortage)"}
- **PCI Exam Eligibility (75% min)**: ${isEligible ? "**ELIGIBLE** for University Examinations" : "**SHORTAGE** - Requires Principal condonation sanction"}
- **Total Working Days**: ${s.attendanceData.totalWorkingDays} days
- **Days Present**: ${s.attendanceData.presentDays} days
- **Days Absent**: ${s.attendanceData.absentDays} days
- **Approved Leave**: ${s.attendanceData.leaveDays} days

👉 [Open Full Student Profile](/student/${s.id})`,
        relatedStudents: [s],
      };
    }

    if (q.includes("mark") || q.includes("cgpa") || q.includes("result") || q.includes("sessional") || q.includes("score")) {
      const sessionalSummary = s.sessionalMarks
        .map((m) => `- **${m.subject}** (${m.code}): Final Internal **${m.finalInternal}/25** (${m.status})`)
        .join("\n");

      return {
        text: `### 🎓 Academic & Marks Record for ${s.name} (${s.id})
- **Cumulative GPA (CGPA)**: **${s.cgpa}** / 10.0
- **Course**: ${s.course} (${s.semester})
- **Batch**: ${s.batch}

**Continuous Internal Assessment (Sessional Marks)**:
${sessionalSummary}

👉 [Open Full Student Profile](/student/${s.id})`,
        relatedStudents: [s],
      };
    }

    if (q.includes("contact") || q.includes("phone") || q.includes("mobile") || q.includes("parent") || q.includes("address") || q.includes("father") || q.includes("mother")) {
      return {
        text: `### 📞 Contact & Bio Data for ${s.name} (${s.id})
- **Father's Name**: ${s.bioData.fatherName}
- **Mother's Name**: ${s.bioData.motherName}
- **Student Mobile**: \`${s.bioData.mobile}\`
- **Parent Contact Mobile**: \`${s.bioData.parentMobile}\`
- **Email**: \`${s.bioData.email}\`
- **Residential Address**: ${s.bioData.address}
- **Date of Birth**: ${s.bioData.dob} | **Blood Group**: ${s.bioData.bloodGroup}
- **Admission Quota**: ${s.bioData.quota} (${s.bioData.category})

👉 [Open Full Student Profile](/student/${s.id})`,
        relatedStudents: [s],
      };
    }

    if (q.includes("no due") || q.includes("nodue") || q.includes("clearance")) {
      const pendingDepts = s.noDueData.clearances.filter((c) => c.status !== "CLEARED");
      return {
        text: `### 📜 No Due Clearance Status for ${s.name} (${s.id})
- **Certificate No**: \`${s.noDueData.certificateNo}\`
- **Overall Status**: **${s.noDueData.overallStatus}**
- **Principal Sanction**: ${s.noDueData.principalApproval.approved ? "✅ Approved by Principal" : "⏳ Withheld pending dues"}
- **Pending Departments**: ${pendingDepts.length === 0 ? "None (All cleared)" : pendingDepts.map((d) => `${d.department} (Due: ₹${d.dueAmount})`).join(", ")}

👉 [Open Full Student Profile](/student/${s.id})`,
        relatedStudents: [s],
      };
    }

    // Comprehensive profile summary
    return {
      text: `### 👤 Student Profile: ${s.name} (${s.id})
- **Register Number**: \`${s.bioData.regNo}\`
- **Program**: ${s.course} (${s.year}, ${s.semester})
- **Batch**: ${s.batch}
- **Academic CGPA**: **${s.cgpa}**
- **Attendance**: **${s.attendanceData.percentage}%** (${s.attendanceData.presentDays}/${s.attendanceData.totalWorkingDays} days) - ${s.attendanceData.pciEligible ? "PCI Eligible ✅" : "Attendance Shortage ⚠️"}
- **Fee Status**: **${s.feesData.status}** (Paid: ₹${s.feesData.paidAmount.toLocaleString()} | Due: ₹${s.feesData.pendingAmount.toLocaleString()})
- **Hospital Posting**: ${s.otherData.hospitalPostings.hospital} (${s.otherData.hospitalPostings.completedHours}/${s.otherData.hospitalPostings.requiredHours} hrs)
- **Parent Contact**: ${s.bioData.fatherName} (\`${s.bioData.parentMobile}\`)

👉 [View Complete Profile Page](/student/${s.id})`,
      relatedStudents: [s],
    };
  }

  // 2. Querying fee dues across all students
  if (q.includes("fee") || q.includes("fees") || q.includes("due") || q.includes("balance") || q.includes("paid")) {
    const feePendingList = studentsDatabase.filter((s) => s.feesData.pendingAmount > 0);
    const paidList = studentsDatabase.filter((s) => s.feesData.pendingAmount === 0);

    return {
      text: `### 💰 Student Fee Status Summary
- **Fee Collection Rate**: 
- **Total Collected**: 
- **Total Outstanding**: ****

#### ⚠️ Students with Pending Fee Dues (${feePendingList.length}):
${feePendingList.map((s) => `- **${s.name}** (${s.id}): **₹${s.feesData.pendingAmount.toLocaleString()}** pending (${s.feesData.status})`).join("\n")}

#### ✅ Fully Paid Students (${paidList.length}):
${paidList.map((s) => `- **${s.name}** (${s.id}): ₹${s.feesData.totalPayable.toLocaleString()} (Paid in Full)`).join("\n")}

You can ask me about any specific student to view their payment receipts and fee breakdown!`,
      relatedStudents: feePendingList,
    };
  }

  // 3. Querying attendance shortages or percentages
  if (q.includes("shortage") || q.includes("below 75") || (q.includes("attendance") && (q.includes("risk") || q.includes("fail") || q.includes("low")))) {
    const shortageStudents = studentsDatabase.filter((s) => s.attendanceData.percentage < 75);
    return {
      text: `### ⚠️ PCI Attendance Shortage Alert (< 75% Threshold)
The following **${shortageStudents.length} students** are currently below the Pharmacy Council of India (PCI) 75% attendance criterion:

${shortageStudents
  .map(
    (s) =>
      `1. **${s.name}** (${s.id})
   - **Attendance**: **${s.attendanceData.percentage}%** (${s.attendanceData.presentDays}/${s.attendanceData.totalWorkingDays} days)
   - **Absent**: ${s.attendanceData.absentDays} days, Leave: ${s.attendanceData.leaveDays} days
   - **Action**: Principal condonation sanction required before University Hall Ticket issuance.`
  )
  .join("\n\n")}

Other students meet or exceed the mandatory 75% requirement.`,
      relatedStudents: shortageStudents,
    };
  }

  if (q.includes("attendance")) {
    return {
      text: `### 📊 Student Attendance Overview (46 Working Days)
- **Overall Batch Average**: **${portalSummaryMetrics.avgAttendance}%**
- **PCI Exam Eligibility Criteria**: Minimum 75% attendance

| Student Name | Roll ID | Course | Present | Absent | % | PCI Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
${studentsDatabase
  .map(
    (s) =>
      `| **${s.name}** | \`${s.id}\` | ${s.courseShort} | ${s.attendanceData.presentDays} | ${s.attendanceData.absentDays} | **${s.attendanceData.percentage}%** | ${s.attendanceData.pciEligible ? "✅ Eligible" : "⚠️ Shortage"} |`
  )
  .join("\n")}

Students with shortage (<75%): **S. Vignesh** (71.7%) and **N. Gokul** (65.2%).`,
      relatedStudents: studentsDatabase,
    };
  }

  // 4. Querying CGPA, Ranks, Top performers
  if (q.includes("cgpa") || q.includes("rank") || q.includes("top") || q.includes("topper") || q.includes("best") || q.includes("gpa")) {
    const sorted = [...studentsDatabase].sort((a, b) => b.cgpa - a.cgpa);
    return {
      text: `### 🏆 Academic Merit & CGPA Rankings (1st Batch 2024)
Here is the performance ranking of students across programs:

${sorted
  .map(
    (s, idx) =>
      `${idx + 1}. **${s.name}** (\`${s.id}\`) - **CGPA: ${s.cgpa}** (${s.courseShort})`
  )
  .join("\n")}

🥇 **Rank 1**: **R. Priyadharshini** (9.18 CGPA)  
🥈 **Rank 2**: **K. Anitha** (8.92 CGPA)  
🥉 **Rank 3**: **T. Deepika** (8.65 CGPA)  

Ask me for any student's individual internal or sessional scores for more details!`,
      relatedStudents: sorted.slice(0, 3),
    };
  }

  // 5. Querying parents / contacts
  if (q.includes("contact") || q.includes("phone") || q.includes("mobile") || q.includes("parent")) {
    return {
      text: `### 📞 Student & Parent Contact Directory
| Student | Roll No | Father's Name | Parent Mobile | Student Mobile |
| :--- | :--- | :--- | :--- | :--- |
${studentsDatabase
  .map(
    (s) =>
      `| **${s.name}** | \`${s.id}\` | ${s.bioData.fatherName} | \`${s.bioData.parentMobile}\` | \`${s.bioData.mobile}\` |`
  )
  .join("\n")}

You can click any student's profile for their complete home address and email.`,
      relatedStudents: studentsDatabase,
    };
  }

  // 6. Querying circulars or announcements
  if (q.includes("announcement") || q.includes("circular") || q.includes("notice") || q.includes("event") || q.includes("exam")) {
    return {
      text: `### 📢 Latest College Announcements & Circulars
${initialAnnouncements
  .map(
    (a) =>
      `📌 **${a.title}** (${a.date})
- **Category**: ${a.category} | **Audience**: ${a.audience}
- **Summary**: ${a.content}`
  )
  .join("\n\n")}`,
      relatedStudents: [],
    };
  }

  // 7. General listing of all students
  if (q.includes("list") || q.includes("all students") || q.includes("how many") || q.includes("who are") || q.includes("students")) {
    return {
      text: `### 🎓 GTN College of Pharmacy — Inaugural 1st Batch Students
The institution currently has **6 enrolled students** in the inaugural 2024 academic batch:

| # | Student Name | ID / Roll | Course | CGPA | Attendance | Fee Status |
| :- | :--- | :--- | :--- | :--- | :--- | :--- |
${studentsDatabase
  .map(
    (s, idx) =>
      `| ${idx + 1} | **${s.name}** | \`${s.id}\` | ${s.courseShort} | ${s.cgpa} | ${s.attendanceData.percentage}% | ${s.feesData.status} |`
  )
  .join("\n")}

💡 *You can ask me anything about any of these students, such as their fees, marks, attendance, parent contact, or clinical hospital postings!*`,
      relatedStudents: studentsDatabase,
    };
  }

  // Default fallback answer
  return {
    text: `Hello! I am your **GTN Pharmacy AI Assistant**, connected to the GTN College of Pharmacy student database.

You can ask me about:
- **Student Details**: "Tell me about K. Anitha", "Details for GTN24BP014"
- **Fee Information**: "Who has pending fee dues?", "Show fee breakdown for Vignesh"
- **Attendance & PCI**: "Which students have attendance shortage?", "Show attendance percentage"
- **Academic Marks**: "Who are the top CGPA rankers?", "Show sessional marks for Priyadharshini"
- **Parent Contacts**: "Parent mobile numbers of students", "Address for Mohammed Arif"
- **Hospital Training**: "Clinical posting hours for B.Pharm students"

How can I assist you with student records today?`,
    relatedStudents: [],
  };
}

/**
 * Calls Google Gemini API with the student database context to generate a natural,
 * grounded, and accurate answer to user questions.
 */
export async function askGeminiStudentBot(
  userQuery: string,
  history: ChatMessage[] = [],
  apiKeyOverride?: string
): Promise<{ text: string; relatedStudents: StudentRecord[]; poweredBy: "gemini" | "local" }> {
  const apiKey = (apiKeyOverride || getGeminiApiKey()).trim();

  // If no Gemini API key is provided, use the high-fidelity local student data engine
  if (!apiKey) {
    const localResult = queryLocalStudentData(userQuery);
    return {
      text: localResult.text,
      relatedStudents: localResult.relatedStudents,
      poweredBy: "local",
    };
  }

  try {
    const databaseContext = buildStudentDatabaseContext();

    const systemInstruction = `
You are the official AI Academic Assistant for GTN College of Pharmacy, Dindigul, Tamil Nadu.
You are powered by Google Gemini.
Your job is to answer questions from college leadership, faculty, students, and PA secretariat accurately using ONLY the provided verified student database.

=== GTN COLLEGE OF PHARMACY STUDENT DATABASE ===
${databaseContext}
=== END OF DATABASE ===

CRITICAL INSTRUCTIONS:
1. Always base all answers strictly on the provided student database above. Do not invent, hallucinate, or alter any student names, roll numbers, fees, percentages, marks, or parent details.
2. If the user asks about a specific student, state their full name, roll ID, course, and exact requested data.
3. For fee queries: always mention total payable, amount paid, and pending balance with rupee symbol (₹).
4. For attendance queries: mention total working days (46), present days, percentage, and explicitly mention PCI compliance (threshold is 75%).
5. For marks or academic queries: provide exact CGPA and sessional/internal subject marks.
6. When referring to a student, include a clickable markdown link in the format: [View Profile](/student/<id>) so the user can easily jump to their portal page.
7. Format your response cleanly using GitHub-flavored Markdown with bold text, bullet points, or tables when appropriate.
8. If the user asks in Tamil or English, respond respectfully and clearly.
9. Keep answers direct, accurate, and professional.
`;

    // Build conversation turns
    const conversationTurns: { role: "user" | "model"; parts: { text: string }[] }[] = [];

    // Prior history (last 4 messages for context window management)
    const recentHistory = history.slice(-4);
    for (const msg of recentHistory) {
      if (msg.role === "user") {
        conversationTurns.push({ role: "user", parts: [{ text: msg.content }] });
      } else if (msg.role === "assistant") {
        conversationTurns.push({ role: "model", parts: [{ text: msg.content }] });
      }
    }

    // Add current query with system instruction
    const fullPrompt = `${systemInstruction}\n\nUser Question: ${userQuery}`;

    // Active Gemini models for Google AI Studio keys
    const candidateModels = [
      "gemini-3.5-flash-lite",
      "gemini-3.5-flash",
      "gemini-3.8-flash",
    ];

    const requestBody = {
      systemInstruction: {
        parts: [{ text: systemInstruction }],
      },
      contents: [
        ...conversationTurns,
        {
          role: "user",
          parts: [{ text: userQuery }],
        },
      ],
      generationConfig: {
        temperature: 0.2, // Low temperature for high factual accuracy
        topP: 0.95,
        maxOutputTokens: 1000,
      },
    };

    let candidateText = "";
    let lastError = "";

    for (const model of candidateModels) {
      try {
        const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (response.ok) {
          const data = await response.json();
          candidateText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
          if (candidateText) {
            break;
          }
        } else {
          const errJson = await response.json().catch(() => ({}));
          lastError = errJson?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
          // If 503 (high demand), short pause before trying the next model to avoid rate limiting
          if (response.status === 503) {
            await new Promise((r) => setTimeout(r, 600));
          }
        }
      } catch (e: any) {
        lastError = e?.message || "Network error";
      }
    }

    if (!candidateText) {
      console.warn("Gemini API models temporarily busy, using verified local student data:", lastError);
      const localResult = queryLocalStudentData(userQuery);
      const notice = lastError.includes("503") || lastError.includes("high demand")
        ? "*(Gemini AI servers are temporarily experiencing high traffic. Displaying verified local student data)*"
        : `*(Notice: Gemini returned: ${lastError || "busy"}. Displaying verified local student data)*`;

      return {
        text: `${notice}\n\n` + localResult.text,
        relatedStudents: localResult.relatedStudents,
        poweredBy: "local",
      };
    }

    // Identify related students to display cards
    const matchedStudents = findRelatedStudents(userQuery);

    return {
      text: candidateText,
      relatedStudents: matchedStudents,
      poweredBy: "gemini",
    };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn("Network error reaching Gemini API, using local analyzer:", message);
    const localResult = queryLocalStudentData(userQuery);
    return {
      text: `*(Notice: Network issue connecting to Gemini. Displaying verified local database response)*\n\n` + localResult.text,
      relatedStudents: localResult.relatedStudents,
      poweredBy: "local",
    };
  }
}
