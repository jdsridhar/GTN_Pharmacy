// src/components/Academics.tsx

import CourseCard from "./CourseCard";

// Define the shape of the course data again for props
interface Course {
  id: number;
  img: string;
  duration: string;
  level: string;
  title: string;
  no_of_seats: string;
  url: string;
}

const Academics = ({ courses }: { courses: Course[] }) => {
  return (
    <section className="bg-neutral-50 py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-800">
            Our Academic Programs
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
            Explore our diverse range of undergraduate and postgraduate courses.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Academics;