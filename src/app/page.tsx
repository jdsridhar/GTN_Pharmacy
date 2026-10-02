"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

// You already use this for Institutions cards
import { HighlightCard } from "@/components/HighlightCard";
import * as data from "@/data/home"; // keep using data.campusLife for Our Institutions

/* =========================
   Types
========================= */
type NewsItem = {
  id: number;
  category: string;
  title: string;
  image: string;
  href: string;
  variant: "spotlight" | "standard" | "wide";
};

type CourseItem = {
  id: number;
  img: string;
  duration: string;
  level: string;
  title: string;
  no_of_seats: string;
  url: string;
};

type ResearchStat = { value: string; label: string };

/* =========================
   Shared Section Helper
========================= */
const Section = ({
  title,
  description,
  children,
  className = "",
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className="container mx-auto px-6">
      {(title || description) && (
        <header className="text-center max-w-4xl mx-auto">
          {title && (
            <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-4 text-lg md:text-xl text-neutral-700 font-medium">
              {description}
            </p>
          )}
        </header>
      )}
      <div className={title || description ? "mt-12" : ""}>{children}</div>
    </div>
  </section>
);

/* =========================
   Campus News Card
========================= */
function NewsCard({ item, className = "" }: { item: NewsItem; className?: string }) {
  if (item.variant === "standard") {
    // White card variant
    return (
      <article
        className={`bg-white rounded-sm shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      >
        <Link href={item.href} className="block group">
          <div className="relative aspect-[16/10] overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="p-4">
            <p className="text-[12px] font-extrabold uppercase tracking-wide text-[#1e2f5c]">
              {item.category}
            </p>
            <h3 className="mt-2 text-[18px] font-bold leading-snug group-hover:underline text-black">
              {item.title}
            </h3>
          </div>
        </Link>
      </article>
    );
  }

  // Spotlight / Wide overlay variant
  return (
    <article className={`relative overflow-hidden rounded-sm ${className}`}>
      <Link href={item.href} className="block group h-full">
        <div className="relative h-full min-h-[260px]">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            priority={item.variant === "spotlight"}
          />
          <div className="absolute inset-0 bg-black/45 transition duration-300 group-hover:bg-black/60" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end">
            <p className="text-[12px] font-semibold uppercase tracking-wide text-white/80">
              {item.category}
            </p>
            <h3 className="mt-1 text-white text-[22px] md:text-[24px] font-extrabold leading-snug max-w-[46ch]">
              {item.title}
            </h3>
          </div>
        </div>
      </Link>
    </article>
  );
}

/* =========================
   Page
========================= */
export default function HomePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [researchStats, setResearchStats] = useState<ResearchStat[]>([]);
const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    // Dynamic content from /public/assets/data
    fetch("/assets/data/campusNews.json")
      .then((r) => r.json())
      .then(setNews)
      .catch((e) => console.error("campusNews.json load failed", e));

    fetch("/assets/data/academics.json")
      .then((r) => r.json())
      .then(setCourses)
      .catch((e) => console.error("academics.json load failed", e));

    fetch("/assets/data/researchStats.json")
      .then((r) => r.json())
      .then(setResearchStats)
      .catch((e) => console.error("researchStats.json load failed", e));
fetch("/assets/data/upcomingEvents.json")
    .then((r) => r.json())
    .then(setEvents)
    .catch((e) => console.error("upcomingEvents.json load failed", e));
}, []);


////
const heroImages = [
  "/images/gtn/mainBuilding.png",
  "/images/gtn/hero.jpg",
];
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);



  return (
    <main>
     {/* 1) Hero + Parallax stacking wrapper */}
<div className="relative isolate">
  {/* Hero Section with sticky effect */}
  {/* <section className="sticky top-0 h-screen flex items-center justify-center text-white z-0">
    <Image
      src="/images/home/gtn.png"
      alt="Aerial view of GTN campus"
      fill
      className="object-cover -z-10"
      priority
    />
    <div className="absolute inset-0 bg-black/30 -z-10" />
    <div className="text-center">
      <h1 className="text-7xl md:text-8xl font-semibold font-serif" style={{color:'white'}}>GTN</h1>
      <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto">
        College of Pharmacy 
      </p>
    </div>
    <div className="absolute bottom-0 w-full bg-[#1e2f5c] py-3 text-center text-lg">
      <a href="#mission" className="hover:underline">
        Explore GTN ↓
      </a>
    </div>
  </section> */}
  {/* 1) Hero Carousel */}


<section className="sticky top-0 h-screen relative overflow-hidden text-white z-0">
  {/* Auto-Sliding Background */}
  <div className="absolute inset-0 -z-10">
    {heroImages.map((src, index) => (
      <Image
        key={index}
        src={src}
        alt="Hero Slide"
        fill
        priority={index === 0}
        className={`
          object-cover transition-opacity duration-[1200ms]
          ${index === currentSlide ? "opacity-100" : "opacity-0"}
        `}
      />
    ))}
  </div>

  {/* Dark overlay */}
  <div className="absolute inset-0 bg-black/40 -z-10" />

  {/* Hero Content */}
  <div className="h-full flex flex-col items-center justify-center text-center px-4">
    <h1 className="text-7xl md:text-8xl font-semibold font-serif">
      GTN
    </h1>
    <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto">
      College of Pharmacy
    </p>
  </div>

  {/* Bottom Explore button */}
  <div className="absolute bottom-0 w-full bg-[#1e2f5c] py-3 text-center text-lg">
    <a href="#mission" className="hover:underline">
      Explore GTN ↓
    </a>
  </div>
</section>


  {/* Mission section that scrolls OVER the hero */}
  <section
    id="mission"
    className="relative z-10 py-20 md:py-28 bg-white shadow-[0_-60px_80px_-40px_rgba(0,0,0,0.2)]"
  >
    <div className="container mx-auto px-6 text-center max-w-6xl">
      <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
        A Mission Defined by Possibility
      </h2>

      <p className="mt-10 text-2xl md:text-3xl text-neutral-800 leading-relaxed md:leading-[1.6]">

      
        At GTN, our mission of discovery and learning is energized by a spirit
        of optimism and possibility that dates to our founding under the G.T.
        Narayanaswamy Naidu Charities Trust in 1963. Here you’ll find a place
        of intellectual expansiveness, wide-ranging perspectives, and freedom to explore
        new lines of thinking. Buzzing with ideas and innovation, approaching questions
        with openness and curiosity, pursuing excellence in all we do – this is GTN
        Group of Institutions.
      </p>

      <div className="mt-12">
        <Link
          href="/about"
          className="inline-flex items-center justify-center rounded-md bg-primary px-8 md:px-10 py-4 text-lg md:text-xl font-semibold text-white hover:opacity-90 transition"
        >
          More about GTN
        </Link>
      </div>
    </div>
  </section>
</div>

      {/* 3) Campus News (JSON + heavier typography, layout matches reference) */}
      {news.length > 0 && (
        <section className="py-16 md:py-24 bg-[#f6f6f6]">
          <div className="container mx-auto px-6">
            <header className="text-center max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black">
                Campus News
              </h2>
              <p className="mt-4 text-lg md:text-xl text-neutral-700 font-medium">
                Stories about people, research, and innovation across the campus
              </p>
            </header>

            <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Row 1 */}
              <NewsCard item={news[0]} className="md:col-span-6 min-h-[280px]" />
              <NewsCard item={news[1]} className="md:col-span-3" />
              <NewsCard item={news[2]} className="md:col-span-3" />
              {/* Row 2 */}
              <NewsCard item={news[3]} className="md:col-span-3" />
              <NewsCard item={news[4]} className="md:col-span-3" />
              <NewsCard item={news[5]} className="md:col-span-6 min-h-[280px]" />
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/news"
                className="inline-flex items-center justify-center rounded-md bg-[#1e2f5c] px-8 py-3 text-lg font-semibold text-white hover:bg-primary-hover transition"
              >
                More campus news
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 4) Academics (three-up cards, stronger hierarchy; JSON) */}
      {courses.length > 0 && (
        <section id="academics"
        className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-6">
            <header className="text-center max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black">
                Academics
              </h2>
              <p className="mt-4 text-lg md:text-xl text-neutral-700 font-medium">
                Preparing students to make meaningful contributions to society
                <br className="hidden md:block" />
                as engaged citizens and leaders in a complex world
              </p>
            </header>

            <div className="mt-12 grid gap-12 md:grid-cols-2 max-w-5xl mx-auto">
              {courses.slice(0, 9).map((course) => (
                <article key={course.id} className="group">
                  <Link href={`/departments/${course.url}`} className="block">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm">
                      <Image
                        src={course.img}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(min-width:1024px) 33vw, 100vw"
                        priority={course.id === 1}
                      />
                    </div>
                  </Link>

                  <h3 className="mt-6 text-[22px] md:text-[24px] font-extrabold leading-snug text-black">
                    {course.title}
                  </h3>

                  <p className="mt-3 text-[15px] md:text-base text-neutral-700 font-medium leading-relaxed">
                    {course.level}. {course.duration}. Seats: {course.no_of_seats}
                  </p>

                  <Link
                    href={`/departments/${course.url}`}
                    className="mt-3 inline-flex items-center font-semibold text-sky-700 hover:underline"
                  >
                    Learn more
                    <svg
                      className="ml-1 h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5) Research (stats grid with dividers, heavier numbers; JSON) */}
      {researchStats.length > 0 && (
        <section id="research" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-8  max-w-8xl">
            <header className="text-center max-w-5xl mx-auto">
              <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black">
                Research
              </h2>
              <p className="mt-4 text-md md:text-3xl  text-neutral-800 font-medium">
                Driving discoveries vital to our world, our health, and our intellectual life
              </p>
            </header>

            <hr className="mt-12 border-neutral-300" />

            <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-10 text-center">
              {researchStats.map((s, i) => (
                <div key={i}>
                  <p className="text-5xl md:text-4xl font-extrabold tracking-tight text-black">
                    {s.value}
                  </p>
                  <p className="mt-2 text-2xl text-neutral-800 font-low">{s.label}</p>
                </div>
              ))}
            </div>

            <hr className="border-neutral-300" />

            <div className="mt-8 text-center">
              <Link
                href="/research"
                className="inline-flex items-center justify-center rounded-md bg-[#1e2f5c] px-8 py-3 text-lg font-semibold text-white hover:bg-[#8c0000] transition"
              >
                More about research
              </Link>
            </div>
          </div>
        </section>
      )}

{/* 5.5) Upcoming Events Section */}
{events.length > 0 && (
  <section className="py-16 md:py-24 bg-[#f9f9f9]">
    <div className="container mx-auto px-6">
      <header className="text-center max-w-3xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-black">
           Events
        </h2>
      </header>

      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {events.map((ev) => (
          <article
  key={ev.id}
  className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
>
  {/* Image wrapper (allows the badge to overflow) */}
  <div className="relative">
    {/* Cropped image container */}
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-t-md">
      <Image
        src={ev.image}
        alt={ev.title}
        fill
        className="object-cover transition-transform duration-300 hover:scale-[1.03]"
      />
    </div>

    {/* Date badge: overlaps image bottom edge */}
    <div className="absolute left-6 bottom-0 translate-y-1/2 bg-[#2d201f] text-white px-3 py-2 text-center rounded-sm shadow-lg ring-1 ring-black/10">
      <p className="text-[10px] font-semibold leading-tight">
        {ev.date.split(" ")[0]}
      </p>
      <p className="text-[16px] font-extrabold leading-tight">
        {ev.date.split(" ")[1]}
      </p>
    </div>
  </div>

  {/* Content (extra top padding so it doesn't collide with the badge) */}
  <div className="p-5 pt-8">
    <p className="text-[#1e2f5c] text-[13px] font-extrabold uppercase tracking-wide mb-2">
      {ev.category}
    </p>
    <h3 className="text-[18px] font-bold text-black leading-snug mb-2">
      {ev.title}
    </h3>
    {ev.time && (
      <p className="text-[14px] font-medium text-neutral-600">{ev.time}</p>
    )}
  </div>
</article>

        ))}
      </div>
    </div>
  </section>
)}

      {/* 6) Our Institutions (GTN Group of Institutions) */}
      <Section
        title="Our Institutions"
        description="G.T. Narayanaswamy Naidu Charities Trust – Premier Educational Institutions in Dindigul."
        className="bg-white"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.campusLife.map((item: any) => (
            <HighlightCard key={item.title} {...item} />
          ))}
        </div>
      </Section>
    </main>
  );
}
