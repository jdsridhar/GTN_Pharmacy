
"use client"; // This must be the very first line

import Hero from "@/components/Hero";
import { useState, ReactNode, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  ArrowLeft,
  FileText,
  X,
  ChevronDown,
} from "lucide-react";

// Dynamically import the viewer with SSR turned off to prevent server-side errors
const CustomPdfViewer = dynamic(() => import("@/components/CustomPdfViewer"), {
  ssr: false,
  loading: () => (
    <p className="text-center text-neutral-500 pt-10">Loading Viewer...</p>
  ),
});

// Define types for the data structure
type CertificateItem = {
  title: string;
  href: string;
};

type CategoryItem = {
  title: string;
  items: CertificateItem[];
};

// Data for Recognitions and Certificates
const certificatesData: CategoryItem[] = [
  {
    title: "AISHE Certificates",
    items: [
      { title: "AISHE 2022-2023", href: "/assets/docs/2022-2023.pdf" },
      { title: "AISHE 2021-2022", href: "/assets/docs/aishe-2021-2022.pdf" },
      { title: "AISHE 2020-2021", href: "/assets/docs/aishe-2020-2021.pdf" },
      { title: "AISHE 2019-2020", href: "/assets/docs/aishe-2019-2020.pdf" },
      { title: "AISHE 2018-2019", href: "/assets/docs/aishe-2018-2019.pdf" },
    ],
  },
  {
    title: "GTN-ARIIA Certificate",
    items: [
      { title: "GTN-ARIIA Certificate", href: "/assets/docs/GTN-ariia-certificate.pdf" },
    ],
  },
  {
    title: "NISP Certificate",
    items: [
      { title: "NISP Certificate", href: "/assets/docs/nisp-certificate.pdf" },
    ],
  },
  {
    title: "GTN Policy",
    items: [
      { title: "Start-up Policy", href: "/assets/docs/start-up-policy.pdf" },
      { title: "TamilNadu Start-up & Innovation Policy", href: "/assets/docs/tamilnadu-startup-innovation-policy.pdf" },
    ],
  },
  {
    title: "IIC Certificate",
    items: [
      { title: "IIC 3 Star Achievement", href: "/assets/docs/iic-3-star-achievement.pdf" },
      { title: "Event Report on Engineer's Day", href: "/assets/docs/event-report-engineers-day.pdf" },
      { title: "Internship Report", href: "/assets/docs/internship-report.pdf" },
      { title: "IP in Academia Report", href: "/assets/docs/ip-in-academia-report.pdf" },
      { title: "NEP Report", href: "/assets/docs/nep-report.pdf" },
      { title: "Report on Motivational Speech", href: "/assets/docs/report-motivational-speech.pdf" },
    ],
  },
];

// Transform certificates data into achievementsData structure
const achievementsData: any = {};
certificatesData.forEach((category) => {
  const key = category.title.toLowerCase().replace(/\s+/g, '-');
  achievementsData[key] = {
    title: category.title,
    contentType: 'details',
    description: `Explore the ${category.title} and related documents.`,
    links: category.items.map((item) => ({
      text: item.title,
      href: item.href,
    })),
  };
});

// Helper function to find a content item by its key in the nested structure
const findItemByKey = (key: string) => {
  for (const parentKey in achievementsData) {
    const parentItem = achievementsData[parentKey as keyof typeof achievementsData];
    if (parentKey === key && parentItem.contentType !== 'folder') {
      return parentItem;
    }
    if (parentItem.subItems) {
      const subItem = parentItem.subItems[key as keyof typeof parentItem.subItems];
      if (subItem) {
        return subItem;
      }
    }
  }
  return null;
};

export default function RecognitionsCertificatesPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const detailsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activeTab && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeTab]);

  const handleItemClick = (key: string, item: any) => {
    if (item.contentType === 'folder') {
      setExpandedKey((prevKey) => (prevKey === key ? null : key));
    } else {
      setActiveTab(key);
      setPdfUrl(null);
    }
  };

  const activeContent = activeTab ? findItemByKey(activeTab) : null;

  const renderNavItems = (items: any, isSublevel = false): ReactNode => {
    return Object.keys(items).map((key, index, arr) => {
      const item = items[key];
      const isExpanded = expandedKey === key;

      return (
        <div key={key} className={isSublevel ? "pl-4 border-l-2 border-neutral-200" : ""}>
          <button
            onClick={() => handleItemClick(key, item)}
            className={`flex items-center justify-between w-full text-left py-3 font-semibold hover:underline transition-colors ${
              activeTab === key ? "text-neutral-900" : "text-brand-red"
            }`}
          >
            <span>{item.title}</span>
            {item.contentType === "folder" && (
              <ChevronDown
                className={`transition-transform duration-300 ${
                  isExpanded ? "rotate-180" : ""
                }`}
                size={16}
              />
            )}
          </button>
          
          {item.subItems && (
            <div
              className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${
                isExpanded ? "max-h-96" : "max-h-0"
              }`}
            >
              {renderNavItems(item.subItems, true)}
            </div>
          )}

          {!isSublevel && index < arr.length - 1 && <hr className="border-neutral-200" />}
        </div>
      );
    });
  };

  return (
    <>
      <Hero
        title="Recognitions and Certificates"
        desc="Explore our institution's recognitions, certifications, and policy documents."
        image="/images/about/mission.jpg" // Update with appropriate image path
      />

      <section className="bg-neutral-50 py-12 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="inline-block text-3xl font-bold tracking-tight border-b-4 border-brand-red pb-2">
              Certificates and Reports
            </h2>
          </div>
          <p className="text-center text-lg text-neutral-600 mb-12 max-w-4xl mx-auto">
            Explore our institution's recognitions, certifications, and policy documents.
          </p>

          <div className="max-w-6xl mx-auto">
            <div className={`md:flex md:gap-12 min-h-[700px]`}>
              <div
                className={`transition-all duration-500 ease-in-out ${
                  !activeTab ? "w-full flex-shrink-0" : "md:w-1/3 lg:w-1/4 flex-shrink-0"
                }`}
              >
                <div className={`w-full not-prose transition-all duration-500 ease-in-out ${
                  !activeTab ? "max-w-md mx-auto" : "max-w-none"
                }`}>
                  {renderNavItems(achievementsData)}
                </div>
              </div>

              {activeTab && activeContent && (
                <div ref={detailsRef} className="w-full md:w-2/3 lg:w-3/4 animate-fade-in mt-8 md:mt-0">
                  {pdfUrl ? (
                    <div className="h-full flex flex-col">
                      <div className="flex-shrink-0 mb-4">
                        <button
                          onClick={() => setPdfUrl(null)}
                          className="flex items-center gap-2 text-brand-red font-semibold hover:underline"
                        >
                          <ArrowLeft size={16} /> Back to List
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
                      
                      <p className="text-neutral-600 mb-6">{activeContent.description}</p>
                      
                      {/* Renders PDF download links */}
                      {activeContent.links && (
                        <div className="flex flex-col gap-3 mt-6">
                          <h4 className="font-semibold text-neutral-700">Downloads</h4>
                          {activeContent.links.map((link: any, index: number) => (
                            <button
                              key={index}
                              onClick={() => setPdfUrl(link.href)}
                              className="inline-flex items-center gap-2 text-brand-red font-medium hover:underline text-left"
                            >
                              <FileText size={16} />
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
        </div>
      </section>
    </>
  );
}