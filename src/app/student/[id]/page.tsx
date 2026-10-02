import { studentsDatabase } from "@/data/portalData";
import StudentProfileClient from "./StudentProfileClient";

// Re-evaluated for Inaugural 1st Batch Students
export function generateStaticParams() {
  return studentsDatabase.map((student) => ({
    id: student.id,
  }));
}

export default function StudentPage({ params }: { params: { id: string } }) {
  return <StudentProfileClient studentId={params.id} />;
}

