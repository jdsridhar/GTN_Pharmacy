"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Phone, Mail, ChevronDown, LogIn } from "lucide-react";

const navLinks = {
  about: [
    { name: "Trust", href: "/about#trust" },
    { name: "Chairman", href: "/about#chairman" },
    { name: "Director", href: "/about#director" },
    { name: "Principal", href: "/about#principal" },
    { name: "Vision", href: "/about#vision" },
    { name: "Mission", href: "/about#mission" },
  ],
  courses: [
    { name: "Bachelor of Pharmacy (B.Pharm)", href: "/departments/bpharm" },
    { name: "Diploma in Pharmacy (D.Pharm)", href: "/departments/dpharm" },
  ],
  features: [
    { name: "Facilities", href: "/features/facilities" },
  ],
};

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* ===== Top information bar ===== */}
      <div className="transition-colors duration-500 bg-primary">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between">
          <Link href="/" aria-label="GTN" className="flex items-center gap-3.5 group">
            <Image
              src="/GTN_Pharmacy_Logo.jpeg"
              alt="GTN Pharmacy College Logo"
              width={65}
              height={65}
              className="object-contain rounded-full shadow-sm bg-white p-0.5 shrink-0"
              priority
            />

            <div className="flex items-center gap-2.5">
              <span className="text-3xl sm:text-4xl md:text-[40px] font-black tracking-tight text-white uppercase font-sans leading-none">
                GTN
              </span>
              <div className="flex flex-col justify-center">
                <span className="text-[10px] sm:text-[11px] md:text-[12px] font-semibold text-white/95 uppercase tracking-widest leading-none">
                  College of
                </span>
                <div className="h-[1.5px] bg-[#fbd304] w-full my-1 rounded-full" />
                <span className="text-[10px] sm:text-[11px] md:text-[12px] font-bold text-white uppercase tracking-widest leading-none">
                  Pharmacy
                </span>
              </div>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-5 text-white/90">
            <span className="font-extrabold">Information for:</span>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">PCI Approval & SIF</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">TN Dr. M.G.R. Univ. Affiliation</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">Anti-Ragging Cell</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">POSH / ICC Cell</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">Feedback</Link>

            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 bg-[#fbd304] text-[#1e2f5c] hover:bg-yellow-400 font-bold px-4 py-1.5 rounded-full text-sm shadow transition duration-200 ml-2"
            >
              <LogIn size={15} />
              <span>Portal Login</span>
            </Link>
          </div>
        </div>

        {/* Contact row (mobile only) */}
        <div className="container mx-auto px-6 pb-2 flex items-center justify-between text-sm text-white/95 lg:hidden">
          <div className="flex items-center gap-4">
            <a href="tel:+917871633313" className="flex items-center gap-1">
              <Phone size={14} /> <span>+91 78716 33313</span>
            </a>
            <a href="mailto:gtntrustofficial@gmail.com" className="flex items-center gap-1">
              <Mail size={14} /> <span>gtntrustofficial@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* ===== Main nav ===== */}
      <nav className="transition-all duration-500 bg-white text-black shadow-md">
        <div className="container mx-auto px-6 py-3">
          <ul className="hidden md:flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
            <NavItem href="/" label="Home" />
            <NavItem href="/admission" label="Admission" />
            <Dropdown label="About" links={navLinks.about} />
            <Dropdown label="Courses" links={navLinks.courses} />
            <Dropdown label="Features" links={navLinks.features} />
            <NavItem label="Contact" href="/contact" />
          </ul>
        </div>
      </nav>
    </header>
  );
}

/* ---------- Sub Components ---------- */
function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <li className="group relative inline-block">
      <Link
        href={href}
        className="relative font-semibold tracking-tight text-black transition-colors duration-300 hover:text-primary text-lg md:text-2xl"
      >
        {label}
        <span
          className="absolute left-1/2 bottom-0 h-0.5 w-0 bg-primary
                     -translate-x-1/2 transform transition-all duration-300
                     group-hover:w-full"
        ></span>
      </Link>
    </li>
  );
}

function Dropdown({
  label,
  links,
  wide,
}: {
  label: string;
  links: { name: string; href: string }[];
  wide?: boolean;
}) {
  return (
    <li className="relative group">
      <button
        className="flex items-center gap-1 font-semibold tracking-tight transition text-black hover:text-primary
        text-lg md:text-2xl relative"
      >
        {label}
        <span className="absolute bottom-0 left-1/2 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 w-0 group-hover:w-full"></span>
        <ChevronDown size={18} />
      </button>

      <div
        className={`absolute left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-white shadow-xl rounded-md mt-3 py-2 ml-12 z-50 ${
          wide ? "w-72" : "w-60"
        }`}
      >
        {links?.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block px-4 py-2 text-left text-sm text-gray-800 hover:bg-primary hover:text-white transition-colors duration-200 rounded-md"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </li>
  );
}

