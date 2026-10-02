"use client"; // This must be the very first line

import Hero from "@/components/Hero";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

// Dummy FAQ data
const faqData = [
  {
    question: "What programs does GTN College of Pharmacy (GTN) offer?",
    answer: "GTN College of Pharmacy offers undergraduate degree in Bachelor of Pharmacy (B.Pharmacy) and diploma in Pharmacy (D.Pharmacy)."
  },
  {
    question: "How can I apply for admission to GTN?",
    answer: "Admissions can be made through the online application portal or by contacting the trust/admissions office. You can apply for programs like B.Pharmacy and D.Pharmacy via merit-based selection and counseling. Detailed admission procedures are available on the admissions page."
  },
  {
    question: "What are the eligibility criteria for B.Pharmacy programs?",
    answer: "For B.Pharmacy programs, candidates must have passed 10+2 with Physics, Chemistry, and Biology/Mathematics as core subjects as per PCI norms. Admission is based on counseling scores and merit."
  },
  {
    question: "Does GTN provide hostel facilities?",
    answer: "Yes, GTN provides separate hostel facilities for boys and girls with modern amenities, including Wi-Fi, mess, and recreational areas. Hostels are located within the campus for easy access to academic buildings."
  },
  {
    question: "What extracurricular activities are available at GTN?",
    answer: "GTN offers a variety of extracurricular activities including sports, cultural events, academic clubs, NSS, and health awareness camps. Students can participate in community outreach and professional pharmacy events."
  },
  {
    question: "Are there scholarships available for students?",
    answer: "Yes, GTN offers merit-based scholarships, need-based financial aid, and government scholarships for eligible candidates. Details are available on the admissions and financial aid sections."
  },
  {
    question: "What is the campus placement record at GTN?",
    answer: "GTN has a strong placement track record with leading pharmaceutical companies and healthcare hospitals visiting the campus annually."
  },
  {
    question: "How can I contact the admissions office?",
    answer: "You can contact the admissions office via email at gtntrustofficial@gmail.com or by phone at +91 78716 33313. More contact details are available on the contact page."
  },
  {
    question: "Does GTN have collaborations with other institutions?",
    answer: "Yes, GTN has collaborations with hospitals, research laboratories, and pharmaceutical industries for internships, research, and clinical training."
  },
  {
    question: "What facilities are available for research at GTN?",
    answer: "GTN provides state-of-the-art laboratories, libraries, computing resources, and support for pharmaceutical research projects."
  }
];

export default function FAQPage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <>
      <Hero
        title="Frequently Asked Questions"
        desc="Find answers to common questions about admissions, programs, facilities, and more at GTN College of Pharmacy (GTN)."
        image="/assets/images/Pharmacy_courses/contact/faq.jpg" // Using a placeholder image; update if needed
      />

      <section className="bg-neutral-50 py-12 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="inline-block text-3xl font-bold tracking-tight border-b-4 border-primary pb-2">FAQs</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex justify-between items-center transition-colors rounded-lg group"
                  >
                    <h3 className="relative text-lg font-semibold">
                      <span className={`relative z-10 ${expandedIndex === index ? 'text-primary' : 'text-neutral-800 group-hover:text-primary'} transition-colors duration-300`}>{faq.question}</span>
                      <span className={`absolute bottom-0 left-1/2 h-0.5 bg-primary transform -translate-x-1/2 transition-all duration-300 w-0 group-hover:w-full`}></span>
                    </h3>
                    <ChevronDown
                      className="transition-transform duration-300" 
                      size={20}
                    />
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${expandedIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-6 pb-6">
                      <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
