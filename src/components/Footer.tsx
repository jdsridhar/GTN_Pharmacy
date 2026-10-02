import Link from 'next/link';
import Image from "next/image";
import {  Instagram, Linkedin, Youtube, Apple } from 'lucide-react'; // Assuming you have lucide-react for icons

export default function Footer() {
  return (
    <footer className="bg-white">
      {/* Social Media Icons */}
      <div className="bg-neutral-50 border-t border-b border-neutral-200 py-3 flex justify-end px-6">
        <div className="flex space-x-4 text-neutral-600">
          {/* <Link href="#" aria-label="Facebook">
            <Facebook size={20} className="hover:text-neutral-900 transition-colors" />
          </Link> */}
          {/* <Link href="#" aria-label="Twitter">
            <Twitter size={20} className="hover:text-neutral-900 transition-colors" />
          </Link> */}
          <Link href="https://gtnarayanaswamynaiducharitiestrust.org/" target='_blank' aria-label="GTN Trust">
            <Instagram size={20} className="hover:text-neutral-900 text-primary transition-colors" />
          </Link>
          <Link href="https://www.linkedin.com/school/gtn-arts-college/" target='_blank' aria-label="LinkedIn">
            <Linkedin size={20} className="hover:text-neutral-900 text-primary transition-colors" />
          </Link>
          <Link href="https://gtnarayanaswamynaiducharitiestrust.org/" target='_blank' aria-label="YouTube">
            <Youtube size={20} className="hover:text-neutral-900 text-primary transition-colors" />
          </Link>
          {/* <Link href="#" aria-label="Apple">
            <Apple size={20} className="hover:text-neutral-900 transition-colors" />
          </Link> */}
        </div>
      </div>

      {/* Main Footer Links */}
      {/* <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-6 gap-8 text-sm text-neutral-700">
        <div>
          
          <h3 className="font-bold text-[#8C1515] mb-3 uppercase">Schools</h3>
          <ul>
            <li className="mb-2"><Link href="https://www.aicte.gov.in/" className="hover:underline">AICTE</Link></li>
            <li className="mb-2"><Link href="https://www.annauniv.edu/" className="hover:underline">Anna University</Link></li>
            <li className="mb-2"><Link href="https://dst.gov.in/" className="hover:underline">DST</Link></li>
            <li className="mb-2"><Link href="http://naac.gov.in/index.php/en/" className="hover:underline">NAAC</Link></li>
            <li className="mb-2"><Link href="https://www.nbaind.org/" className="hover:underline">NBA</Link></li>
            <li className="mb-2"><Link href="https://www.ugc.gov.in/" className="hover:underline">UGC</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[#8C1515] mb-3 uppercase">Academics</h3>
          <ul>
            <li className="mb-2"><Link href="#" className="hover:underline">Undergraduate Majors</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">Graduate Programs</Link></li>
          </ul>
          <h3 className="font-bold text-[#8C1515] mt-6 mb-3 uppercase">Research</h3>
          <ul>
            <li className="mb-2"><Link href="#" className="hover:underline">Research Centers A - Z</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">Libraries</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[#8C1515] mb-3 uppercase">Health Care</h3>
          <ul>
            <li className="mb-2"><Link href="#" className="hover:underline">GTN Health Care</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">GTN Children's Health</Link></li>
          </ul>
          <h3 className="font-bold text-[#8C1515] mt-6 mb-3 uppercase">Online Learning</h3>
          <ul>
            <li className="mb-2"><Link href="#" className="hover:underline">GTN Online</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[#8C1515] mb-3 uppercase">About GTN</h3>
          <ul>
            <li className="mb-2"><Link href="#" className="hover:underline">Facts</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">History</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">Accreditation</Link></li>
          </ul>
          <h3 className="font-bold text-[#8C1515] mt-6 mb-3 uppercase">Admission</h3>
          <ul>
            <li className="mb-2"><Link href="#" className="hover:underline">Undergraduate</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">Graduate</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">Financial Aid</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-[#8C1515] mb-3 uppercase">Resources</h3>
          <ul>
            <li className="mb-2"><Link href="#" className="hover:underline">Campus Map</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">Community Engagement</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">Directory</Link></li>
            <li className="mb-2"><Link href="#" className="hover:underline">GTN Profiles</Link></li>
          </ul>
        </div>

        <div className="flex flex-col space-y-3">
          <button className="btn border border-neutral-300 hover:border-neutral-400 text-neutral-700">
            Applying
          </button>
          <button className="btn border border-neutral-300 hover:border-neutral-400 text-neutral-700">
            Visiting
          </button>
          <button className="btn border border-neutral-300 hover:border-neutral-400 text-neutral-700">
            Giving
          </button>
          <button className="btn border border-neutral-300 hover:border-neutral-400 text-neutral-700">
            Careers
          </button>
          <button className="btn border border-neutral-300 hover:border-neutral-400 text-neutral-700">
            Faculty Positions
          </button>
          <button className="btn border border-neutral-300 hover:border-neutral-400 text-neutral-700">
            Contact
          </button>
        </div>
      </div> */}

      {/* Bottom Bar */}
      {/* <div className="bg-brand-red text-white py-4 px-6 text-sm"> */}
      <div className="bg-primary-darker text-white py-4 px-6 text-sm">
        <div className="container mx-auto flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            {/* GTN Pharmacy College Logo */}
            {/* <span className="font-bold text-lg mr-4">GTN College of Pharmacy </span> */}
            <Link href="/" aria-label="GTN">
              <Image
                src="/GTN_Pharmacy_Logo.jpeg"
                alt="GTN Pharmacy College Logo"
                width={55}
                height={55}
                className="object-contain rounded-full shadow-sm bg-white p-0.5"
                priority
              />
            </Link>
          </div>
           <nav className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">PCI Approval & SIF</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">TN Dr. M.G.R. Univ. Affiliation</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">Anti-Ragging Cell</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">POSH / ICC Cell</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">Grievances & Feedback</Link>
            <Link href="/assets/data/sample.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline whitespace-nowrap">Privacy Policy</Link>
          </nav>
          {/* <nav className="flex flex-wrap justify-center md:justify-start space-x-4 md:space-x-6">
            <Link href="/footer/antiragging" className="hover:underline whitespace-nowrap">Anti Ragging</Link>
            <Link href="/footer/poshcell" className="hover:underline whitespace-nowrap">Posh Cell</Link>
            <Link href="/footer/feedback" className="hover:underline whitespace-nowrap">Feedback</Link>
            <Link href="/footer/aicte" className="hover:underline whitespace-nowrap">AICTE Approval Copies</Link>
            <Link href="/footer/privacy-policy" className="hover:underline whitespace-nowrap">Privacy Policy</Link>
            <Link href="/footer/grievance" className="hover:underline whitespace-nowrap">Grievances</Link>
            <Link href="/assets/docs/aicte/MANDATORY_DISCLOSURE_2025_26.pdf" className="hover:underline whitespace-nowrap">AICTE Mandatory Disclosure</Link>
          </nav> */}
        </div>
        <p className="container mx-auto mt-4 text-center md:text-left">
          © {new Date().getFullYear()} GTN College of Pharmacy, G.T.N. Nagar, Old Karur Road, Dindigul - 624005, Tamil Nadu, India.
        </p>
      </div>
    </footer>
  );
}