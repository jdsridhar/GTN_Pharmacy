// src/components/CourseCard.tsx

import Image from "next/image";
import Link from "next/link";
import { Clock, Bookmark, Users } from "lucide-react";

// Define the shape of the course data
interface Course {
  id: number;
  img: string;
  duration: string;
  level: string;
  title: string;
  no_of_seats: string;
  url: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  return (
    <Link href={`/departments/${course.url}`} className="block group">
      <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden h-full shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full h-48">
          <Image
            src={course.img}
            alt={course.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-5">
          <p className="text-sm text-brand-red font-semibold mb-2">{course.level}</p>
          <h3 className="text-lg font-bold text-neutral-800 group-hover:text-brand-red transition-colors duration-300">
            {course.title}
          </h3>
          <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Duration: {course.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} />
              <span>Intake: {course.no_of_seats} Seats</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;