
"use client";

import { useEffect, useState } from "react";
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
    { name: 'Facilities', href: '/features/facilities' },
  ],
};
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setIsScrolled(window.scrollY > window.innerHeight * 0.75);

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
<header className="fixed top-0 left-0 w-full z-50">
  {/* Gradient overlay */}
  <div
    className="absolute top-0 left-0 w-full h-full pointer-events-none transition-all duration-500"
    style={{
      background: isScrolled
        ? "#1e2f5c" 
        : "linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0))", // transparent gradient
    }}
  ></div>

  {/* Top info bar */}
  <div
    className={`relative container mx-auto px-6  py-2 flex items-center justify-between transition-colors duration-500`}
  >
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

    <div className="flex items-center gap-4">
      <div
        className={`hidden lg:flex items-center gap-5 transition-colors duration-500 ${
          isScrolled ? "text-white" : "text-white/90"
        }`}
      >
        <span className="font-extrabold">Information for:</span>
        <Link
          href="/assets/data/sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline whitespace-nowrap"
        >
          PCI Approval & SIF
        </Link>
        <Link
          href="/assets/data/sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline whitespace-nowrap"
        >
          TN Dr. M.G.R. Univ. Affiliation
        </Link>
        <Link
          href="/assets/data/sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline whitespace-nowrap"
        >
          Anti-Ragging Cell
        </Link>
        <Link
          href="/assets/data/sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline whitespace-nowrap"
        >
          POSH / ICC Cell
        </Link>
        <Link
          href="/assets/data/sample.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline whitespace-nowrap"
        >
          Feedback
        </Link>
      </div>

      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 bg-[#fbd304] text-[#1e2f5c] hover:bg-yellow-400 font-extrabold px-4 py-1.5 rounded-full text-xs sm:text-sm shadow-md transition duration-200"
      >
        <LogIn size={15} />
        <span>Portal Login</span>
      </Link>
    </div>
  </div>

  {/* Main nav */}
  <nav
    className={`relative transition-colors duration-500 ${
      isScrolled ? "bg-white" : "bg-transparent"
    }`}
  >
    <div className="container mx-auto px-6 py-3">
      <ul className="hidden md:flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
        <NavItem href="/" label="Home" isScrolled={isScrolled} />
        <NavItem href="/admission" label="Admission" isScrolled={isScrolled} />
        <Dropdown label="About" links={navLinks.about} isScrolled={isScrolled} />
        <Dropdown label="Courses" links={navLinks.courses} isScrolled={isScrolled} />
        <Dropdown label="Features" links={navLinks.features} isScrolled={isScrolled} />
        <NavItem label="Contact" href="/contact" isScrolled={isScrolled} />
      </ul>
    </div>
  </nav>
</header>


  );
}

/* ---------- sub components ---------- */
/* ---------- NavItem with scroll + hover + underline ---------- */
function NavItem({
  href,
  label,
  isScrolled,
}: {
  href: string;
  label: string;
  isScrolled: boolean;
}) {
  return (
    <li className="relative group">
      <Link
        href={href}
        className={`
          relative text-lg md:text-2xl font-semibold
          transition-colors duration-300 ease-in-out
          ${
            isScrolled
              ? "text-black hover:text-primary"
              : "text-white hover:text-white"
          }
        `}
      >
        {label}
        {/* Underline */}
        <span
          className={`
            absolute left-1/2 bottom-0 h-[2px] w-0
            ${isScrolled ? "bg-primary" : "bg-white"}
            -translate-x-1/2
            transition-all duration-300 ease-in-out
            group-hover:w-full
          `}
        />

      </Link>
    </li>
  );
}

/* ---------- Dropdown with same transition ---------- */

function Dropdown({
  label,
  links,
  wide,
  isScrolled, // 👈 passed from parent (true when scrolled)
}: {
  label: string;
  links: { name: string; href: string }[];
  wide?: boolean;
  isScrolled?: boolean;
}) {
  return (
    <li className="relative group">
      <button
        className={`flex items-center gap-1 font-semibold tracking-tight transition text-lg md:text-2xl relative
          ${
            isScrolled
              ? "text-black hover:text-primary" // after scroll
              : "text-white hover:text-white" // static (top)
          }`}
      >
        {label}

        {/* ✅ Dynamic underline animation */}
        <span
          className={`absolute left-1/2 bottom-0 h-[2px] w-full 
            ${isScrolled ? "bg-primary" : "bg-white"} 
            scale-x-0 group-hover:scale-x-100 
            transition-transform duration-300 ease-in-out origin-center -translate-x-1/2`}
        />

        <ChevronDown size={18} />
      </button>

      {/* Dropdown list */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-300 bg-white shadow-xl rounded-md mt-3 py-2 ml-12 z-50 ${
          wide ? "w-72" : "w-60"
        }`}
      >
        {links?.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="block px-4 py-2 text-left text-sm text-gray-800 hover:bg-[#1e2f5c] hover:text-white transition-colors duration-200 rounded-md"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </li>
  );
}

