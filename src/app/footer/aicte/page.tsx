"use client";


import Hero from "@/components/Hero";
import Image from "next/image";
import { useState, ReactNode, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, FileText, X } from "lucide-react";
import aicte from "./aicte.js";

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
        {Icon && <Icon className="w-8 h-8 mb-2 text-brand-red" />}
        <p className="text-xl font-bold text-neutral-800">{value}</p>
        <p className="mt-1 text-sm text-neutral-600 font-semibold">{label}</p>
    </div>
);

// --- DATA PROCESSING ---
const getTitleFromFilename = (filename: string): string => {
    return filename.replace(/\.(pdf|PDF)$/, "");
};

const documentsData = {
    approvals: {
        title: "AICTE Approval Documents",
        contentType: "details",
        description:
            "Access the AICTE approval copies for various academic years and programs.",
        links: aicte.data.aictePdfFiles.map((filename: string) => ({
            text: getTitleFromFilename(filename),
            href: `/assets/docs/aicte/approvalcopies/${filename}`,

        })),
    },
};

// Helper function to find a content item by its key
const findItemByKey = (key: string) => {
    return documentsData[key as keyof typeof documentsData] || null;
};

export default function AICTEApprovalsPage() {
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const detailsRef = useRef<HTMLDivElement | null>(null);

    const handleItemClick = (key: string, item: any) => {
        if (item.contentType === "details") {
            setActiveTab(key);
            setPdfUrl(null);
        }
    };

    const activeContent = activeTab ? findItemByKey(activeTab) : null;

    const renderNavItems = (items: any): ReactNode => {
        return Object.keys(items).map((key) => {
            const item = items[key];
            return (
                <div key={key}>
                    <button
                        onClick={() => handleItemClick(key, item)}
                        className={`flex items-center justify-between w-full text-left py-3 font-semibold hover:underline transition-colors ${activeTab === key ? "text-neutral-900" : "text-brand-red"
                            }`}
                    >
                        <span>{item.title}</span>
                    </button>
                    <hr className="border-neutral-200" />
                </div>
            );
        });
    };

    useEffect(() => {
        if (activeTab && detailsRef.current) {
            detailsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }, [activeTab]);

    return (
        <>
            {/* ✅ Hero section with background image */}
            <section className="relative h-[60vh] flex items-center justify-center text-center">
                <Image
                    src="/assets/aicte.jpg" // 🖼️ <-- Replace this path with your image file
                    alt="AICTE Approval Background"
                    fill
                    priority
                    className="object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
                <div className="relative z-10 px-6">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        AICTE Approval Documents
                    </h1>
                    <p className="mt-4 text-lg text-neutral-200 max-w-2xl mx-auto">
                        Access all AICTE approval copies and related documents for our
                        institution's programs.
                    </p>
                </div>
            </section>

            <section className="bg-neutral-50 py-12 md:py-20">
                <div className="px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold tracking-tight text-center mb-4">
                        AICTE Documents
                    </h2>
                    <p className="text-center text-lg text-neutral-600 mb-12 max-w-4xl mx-auto">
                        Browse through our collection of AICTE approval documents and
                        related resources.
                    </p>

                    <div className="md:flex md:gap-12 min-h-[700px]">
                        <div
                            className={`transition-all duration-500 ease-in-out ${!activeTab
                                ? "w-full flex-shrink-0"
                                : "md:w-1/3 lg:w-1/4 flex-shrink-0"
                                }`}
                        >
                            <div
                                className={`w-full not-prose transition-all duration-500 ease-in-out ${!activeTab ? "max-w-md mx-auto" : "max-w-none"
                                    }`}
                            >
                                {renderNavItems(documentsData)}
                            </div>
                        </div>

                        {activeTab && activeContent && (
                            <div
                                ref={detailsRef}
                                className="w-full md:w-2/3 lg:w-3/4 animate-fade-in mt-8 md:mt-0"
                            >
                                {pdfUrl ? (
                                    <div className="h-full flex flex-col animate-fade-in">
                                        <div className="flex-shrink-0 mb-4">
                                            <button
                                                onClick={() => setPdfUrl(null)}
                                                className="flex items-center gap-2 text-brand-red font-semibold hover:underline"
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
                                                onClick={() => setActiveTab(null)}
                                                className="p-2 rounded-full hover:bg-neutral-200 transition-colors"
                                            >
                                                <X size={20} className="text-neutral-600" />
                                            </button>
                                        </div>

                                        <p className="text-neutral-600 mb-6">
                                            {activeContent.description}
                                        </p>

                                        {activeContent.links && (
                                            <div className="flex flex-col gap-3 mt-6">
                                                <h4 className="font-semibold text-neutral-700">
                                                    Downloads
                                                </h4>
                                                {activeContent.links.map((link: any) => (
                                                    <button
                                                        key={link.text}
                                                        onClick={() => setPdfUrl(link.href)}
                                                        className="inline-flex items-center gap-2 text-brand-red font-medium hover:underline"
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
            </section>
        </>
    );
}