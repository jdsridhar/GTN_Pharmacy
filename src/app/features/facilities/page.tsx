"use client"; // This must be the very first line

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useState, ReactNode, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  BookOpen,
  UserCheck,
  Star,
  X,
  FileText,
  FlaskConical,
  ChevronDown,
   Target,
  Info,
  Bus,
  Droplet,
  GraduationCap,
  Monitor
} from "lucide-react";
import DataTable from "@/components/Datatable";
import ReactMarkdown from "react-markdown";

// Dynamically import the viewer with SSR turned off
const CustomPdfViewer = dynamic(() => import("@/components/CustomPdfViewer"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-neutral-500 pt-10">Loading Viewer...</p>
  ),
});

// Helper component for stat cards
const Stat = ({
  value,
  label,
  Icon,
}: {
  value: string;
  label: string;
  Icon?: React.ElementType;
}) => (
  <div className="text-center flex flex-col items-center">
    {Icon && <Icon className="w-8 h-8 mb-2 text-primary" />}
    <p className="text-xl font-bold text-neutral-800">{value}</p>
    <p className="mt-1 text-sm text-neutral-600 font-semibold">{label}</p>
  </div>
);

// Default data in case the import fails
const defaultFacilitiesData = [
  {
    id: "laboratories",
    title: "Laboratories",
    contentType: "folder",
    subItems: [
      {
        id: "computer-labs",
        title: "Computer Laboratories",
        contentType: "content",
        description: [
          "Our computer laboratories are equipped with state-of-the-art systems and software.",
        ],
      },
    ],
  },
  {
    id: "library",
    title: "Library Resources",
    contentType: "content",
    description: [
      "Our central library offers comprehensive resources for academic and research purposes.",
    ],
  },
];

export default function FacilitiesPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [facilitiesData, setFacilitiesData] = useState<any[]>(
    defaultFacilitiesData,
  );
  const [loading, setLoading] = useState(true);

  const detailsRef = useRef<HTMLDivElement | null>(null);
  const userInteracted = useRef(false);

  useEffect(() => {
    if (!userInteracted.current) return;

    if (activeTab && detailsRef.current) {
      detailsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [activeTab]);

 useEffect(() => {
  if (loading) return; // wait for real data

  if (!activeTab && facilitiesData.length > 0) {
    const first = facilitiesData[0];

    if (first.subItems?.length > 0) {
      setExpandedKey(first.id);
      setActiveTab(first.subItems[0].id);
    } else {
      setActiveTab(first.id);
    }
  }
}, [facilitiesData, activeTab, loading]);


  // Load data with error handling
  useEffect(() => {
    const loadData = async () => {
      try {
        // Dynamically import the data file
        const module = await import("./facilities-data.js");
        setFacilitiesData(module.default || defaultFacilitiesData);
      } catch (error) {
        console.error("Failed to load facilities data:", error);
        setFacilitiesData(defaultFacilitiesData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Helper function to find a content item by its key
const findItemByKey = (key: string, items = facilitiesData): any => {
  for (const item of items) {
    if (item.id === key) return item;
    if (item.subItems) {
      const found = findItemByKey(key, item.subItems);
      if (found) return found;
    }
  }
  return null;
};


  const handleItemClick = (key: string, item: any) => {
    userInteracted.current = true;

    if (item.contentType === "folder") {
      setExpandedKey((prevKey) => (prevKey === key ? null : key));
    } else {
      setActiveTab(key);
      setPdfUrl(null);
    }
  };

  const activeContent = activeTab ? findItemByKey(activeTab) : null;
const navIcons: Record<string, any> = {
  faculty: Info,                 
  "smart-classrooms": Monitor,   
  "computer-center": BookOpen,   
  laboratories: FlaskConical,    
  hostel: GraduationCap,         
  library: BookOpen,            
  transport: Bus,                
  water: Droplet                 
};

const renderNavItems = (items: any[], isSublevel = false): ReactNode => {
  if (loading) {
    return <div className="text-center py-4 text-white">Loading...</div>;
  }

  return (
    <div className={`flex flex-col ${isSublevel ? "gap-1" : "gap-2"}`}>
      {items.map((item: any) => {
        const isExpanded = expandedKey === item.id;
        const isActive = activeTab === item.id;

        const Icon =
          navIcons[item.id] || BookOpen; // default icon (no folders in your JSON)

        return (
          <div
            key={item.id}
            className={isSublevel ? "ml-4 border-l border-white/20 pl-2" : ""}
          >
            <button
              onClick={() => handleItemClick(item.id, item)}
              className={`group w-full flex items-center justify-between gap-2 px-3 py-2 rounded mb-1
              ${
                isActive
                  ? "bg-white text-[#1E2F5C] font-semibold"
                  : "text-white hover:bg-white hover:text-[#1E2F5C]"
              }`}
            >
              <div className="flex items-center gap-2">
                {Icon && (
                  <Icon
                    className={`
                      w-4 h-4 transition-colors duration-200
                      ${isActive ? "text-[#fbd304]" : "text-white"}
                      group-hover:text-[#fbd304]
                    `}
                  />
                )}

                <span className="text-sm">{item.title}</span>
              </div>

              {/* Only show expand arrow if subItems actually exist */}
              {item.subItems?.length > 0 && (
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    isExpanded ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {/* Render sub-items only if present */}
            {item.subItems?.length > 0 && (
              <div
                className={`
                  transition-[max-height] duration-300 ease-in-out overflow-hidden
                  ${isExpanded ? "max-h-96" : "max-h-0"}
                `}
              >
                {renderNavItems(item.subItems, true)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

  return (
    <>
      <Hero
        title="Facilities"
        // desc="Explore our state-of-the-art facilities, laboratories, and resources that support cutting-edge research and learning."
        image="/images/about/facilities.jpeg"
      />

      {/* <section className="bg-neutral-50 py-12">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Stat
              Icon={Star}
              value="50+ Labs"
              label="Specialized Laboratories"
            />
            <Stat
              Icon={BookOpen}
              value="24/7 Access"
              label="Learning Resources"
            />
            <Stat
              Icon={UserCheck}
              value="Advanced"
              label="Research Facilities"
            />
          </div>
        </div>
      </section> */}

      {/* <section className="bg-white py-12 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="inline-block text-3xl font-bold tracking-tight border-b-4 border-primary pb-2">
              Our Facilities
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-center mb-10">
                World-Class Infrastructure
              </h2>
              <div className="prose max-w-none prose-p:font-semibold prose-p:text-justify text-xl">
                <p>
                  Our institution boasts state-of-the-art facilities designed to
                  support innovative research and provide students with hands-on
                  learning experiences across all disciplines.
                </p>
                <p className="mt-6">
                  From advanced laboratories and research centers to modern
                  classrooms and collaborative spaces, our infrastructure is
                  tailored to foster academic excellence and breakthrough
                  discoveries.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="/assets/images/Pharmacy_courses/feature/Our Facilities.jpeg"
                alt="Modern laboratory facilities"
                width={800}
                height={450}
                className="rounded-lg object-cover shadow-md w-full h-[450px]"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="bg-neutral-50 py-12 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="inline-block text-3xl font-bold tracking-tight border-b-4 border-primary pb-2">
              Facility Features
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center md:grid-flow-row-dense">
            <div className="md:col-start-2">
              <div className="prose max-w-none prose-p:font-semibold prose-p:text-justify prose-li:font-semibold prose-li:text-justify prose-h3:font-bold">
                <h3 className="mt-6 text-2xl font-bold">Key Features</h3>
                <ul className="mt-6 text-xl list-disc list-inside">
                  <li>
                    Advanced research laboratories with cutting-edge equipment
                  </li>
                  <li>Modern computer centers with high-speed connectivity</li>
                  <li>Specialized workshops and fabrication facilities</li>
                  <li>Comprehensive library with digital resources</li>
                  <li>Collaborative learning spaces and innovation hubs</li>
                  <li>
                    Sports and recreational facilities for holistic development
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:col-start-1">
              <Image
                src="/assets/images/Pharmacy_courses/feature/Facility Features.jpeg"
                alt="Students utilizing campus facilities"
                width={800}
                height={450}
                className="rounded-lg object-cover shadow-md w-full h-[450px]"
              />
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="bg-neutral-50 py-12 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="md:flex md:gap-12 min-h-[700px]">
              <div className={`transition-all duration-500 ease-in-out ${!activeTab ? 'w-full flex-shrink-0' : 'md:w-1/3 lg:w-1/4 flex-shrink-0'}`}>
                 <div className={`w-full not-prose transition-all duration-500 ease-in-out ${!activeTab ? 'max-w-md mx-auto' : 'max-w-none'}`}>
                   {renderNavItems(facilitiesData)}
                </div>
              </div>

              {activeTab && activeContent && (
                <div ref={detailsRef} className="w-full md:w-2/3 lg:w-3/4 animate-fade-in mt-8 md:mt-0">
                  {pdfUrl ? (
                    <div className="h-full flex flex-col">
                      <div className="flex-shrink-0 mb-4">
                        <button onClick={() => setPdfUrl(null)} className="flex items-center gap-2 text-primary font-semibold hover:underline">
                          <ArrowLeft size={16} /> Back to Details
                        </button>
                      </div>
                      <div className="flex-grow rounded-lg overflow-hidden border border-neutral-200">
                         <CustomPdfViewer file={pdfUrl} />
                      </div>
                    </div>
                  ) : (
                    <div className="bg-neutral-50 p-6 sm:p-8 rounded-lg h-full">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-neutral-800">{activeContent.title}</h3>
                        <button onClick={() => { setActiveTab(null); setExpandedKey(null); }} className="p-2 rounded-full hover:bg-neutral-200 transition-colors">
                          <X size={20} className="text-neutral-600"/>
                        </button>
                      </div>
                      
                      {Array.isArray(activeContent.description) ? (
                        activeContent.description.map((paragraph: string, index: number) => (
                          <div key={index} className="text-neutral-600 mb-6 text-base leading-relaxed text-justify">
                            <ReactMarkdown>{paragraph}</ReactMarkdown>
                          </div>
                        ))
                      ) : (
                        <div className="text-neutral-600 mb-6 text-base leading-relaxed text-justify">
                          <ReactMarkdown>{activeContent.description}</ReactMarkdown>
                        </div>
                      )}
                      
                      {activeContent.contentType === 'table' && activeContent.tables && (
                        <div className="space-y-8">
                          {activeContent.tables.map((table: any, index: number) => (
                            <DataTable 
                              key={index}
                              title={table.title}
                              columns={table.columns}
                              data={table.data}
                            />
                          ))}
                        </div>
                      )}
                      
                      {activeContent.links && (
                         <div className="flex flex-col gap-3 mt-6">
                            <h4 className="font-semibold text-neutral-700">Downloads</h4>
                            {activeContent.links.map((link: any) => (
                              <button key={link.text} onClick={() => setPdfUrl(link.href)} className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                                 <FileText size={16}/>
                                 {link.text}
                              </button>
                            ))}
                          </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
        </div>
      </section> */}
      <section className="bg-neutral-50 py-6 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-center mb-4">
            Facilities
          </h2>

        <p className="text-center text-lg text-neutral-600 mb-6 max-w-4xl mx-auto">
  Our campus offers a wide range of modern facilities designed to support
  academic excellence, innovation, and overall student well-being.
</p>

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-4">
            {/* ================= LEFT BLUE SIDEBAR ================= */}
            <div className="w-full md:w-[280px] flex-shrink-0">
              <div className="w-full not-prose bg-[#1E2F5C] text-white rounded-lg shadow-lg overflow-hidden p-2">
                {renderNavItems(facilitiesData)}
              </div>
            </div>

            {/* ================= RIGHT CONTENT ================= */}
            {activeTab && activeContent && (
              <div
                ref={detailsRef}
                className="w-full animate-fade-in mt-8 md:mt-0"
              >
                {pdfUrl ? (
                  <div className="h-full flex flex-col">
                    <div className="flex-shrink-0 mb-4">
                      <button
                        onClick={() => setPdfUrl(null)}
                        className="flex items-center gap-2 text-primary font-semibold hover:underline"
                      >
                        <ArrowLeft size={16} /> Back to Details
                      </button>
                    </div>

                    <div className="flex-grow rounded-lg overflow-hidden border border-neutral-200">
                      <CustomPdfViewer file={pdfUrl} />
                    </div>
                  </div>
                ) : (
                  <div className="bg-neutral-50 p-6 sm:p-8 rounded-lg h-full">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-2xl font-bold text-neutral-800">
                        {activeContent.title}
                      </h3>

                      <button
                        onClick={() => {
                          setActiveTab(null);
                          setExpandedKey(null);
                        }}
                        className="p-2 rounded-full hover:bg-neutral-200 transition-colors"
                      >
                        <X size={20} className="text-neutral-600" />
                      </button>
                    </div>

                    {/* ===== DESCRIPTION ===== */}
                    {Array.isArray(activeContent.description) ? (
                      activeContent.description.map(
                        (paragraph: string, index: number) => (
                          <div
                            key={index}
                            className="text-neutral-600 mb-6 text-base leading-relaxed text-justify"
                          >
                            <ReactMarkdown>{paragraph}</ReactMarkdown>
                          </div>
                        ),
                      )
                    ) : (
                      <div className="text-neutral-600 mb-6 text-base leading-relaxed text-justify">
                        <ReactMarkdown>
                          {activeContent.description}
                        </ReactMarkdown>
                      </div>
                    )}

                    {/* ===== TABLES ===== */}
                    {activeContent.contentType === "table" &&
                      activeContent.tables?.length > 0 && (
                        <div className="space-y-8">
                          {activeContent.tables.map(
                            (table: any, index: number) => (
                              <DataTable
                                key={index}
                                title={table.title}
                                columns={table.columns}
                                data={table.data}
                              />
                            ),
                          )}
                        </div>
                      )}

                    {/* ===== DOWNLOADS ===== */}
                    {activeContent.links?.length > 0 && (
                      <div className="flex flex-col gap-3 mt-6">
                        <h4 className="font-semibold text-neutral-700">
                          Downloads
                        </h4>

                        {activeContent.links.map((link: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => setPdfUrl(link.href)}
                            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                          >
                            <FileText size={16} />
                            {link.text}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* ===== EXTRA CONTENT ===== */}
                    {activeContent.extraContent && (
                      <div>{activeContent.extraContent}</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* <section className="bg-brand-sand py-16 text-center">
        <div className="container">
          <h3 className="text-sm uppercase tracking-wider text-neutral-600 font-semibold">
            Facility Management
          </h3>
          <p className="text-2xl md:text-3xl font-bold mt-2 max-w-3xl mx-auto text-neutral-800">
            State-of-the-Art Infrastructure
          </p>
          <p className="text-xl font-semibold mt-4">
            Committed to Excellence in Learning Environments
          </p>
          <a
            href="mailto:gtntrustofficial@gmail.com"
            className="btn btn-primary mt-6"
          >
            Contact Facilities Office
          </a>
        </div>
      </section> */}
    </>
  );
}
