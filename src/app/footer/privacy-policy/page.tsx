"use client"; // This must be the very first line

import Hero from "@/components/Hero";
import { useState, ReactNode } from "react";
import { ArrowLeft, BookOpen, UserCheck, Star, X, FileText, ChevronDown } from "lucide-react";

// Dynamically import any client-side components if needed (e.g., for PDF viewer, but not required here)
import dynamic from 'next/dynamic';

// Extracted data from content-area.jsx for Privacy Policy
const privacyData = {
  sections: [
    {
      Heading: "Privacy Policy – GTN Educational Institutions",
      Desc: [
        "Thank you for visiting the GTN Educational Institutions website and reviewing our privacy policy. The policy is simple: We collect no personal information about you unless you choose to provide that information to us. We strictly do not share, give, transfer, or sell any of your personal information to any third party.",
        "In case you want to know how we record non-personal information when you visit our site or how we use the information that you voluntarily submit, read further:",
      ],
    },
    {
      Heading: "Non-Personal Information that we Record",
      Desc: [
        "On visiting our website, if you just browse, read, or download information, our site’s operating system will automatically record some general information about your visit.",
        "During your visit, the web operating system will record:",
        "The Internet domain for your internet service, such as “xyz.net” or “xyz.com” if you are using a private internet access account or if you connect from a college or university domain.",
        "The type of browser (such as “Internet Explorer version x” or “Chrome version x”) that you are using.",
        "The operating system that you are currently using (such as Windows, Unix, or Macintosh).",
        "The time and date that you visit our site, and the web pages that you visit on our site.",
        "The address of the previous website you were visiting, in case you linked to us from another website.",
        "The purpose of recording this information is strictly for statistical analysis, to help make our site more useful to visitors. Individual information is not recorded by this tracking system.",
      ],
    },
    {
      Heading: "Cookies",
      Desc: [
        "We use cookies on certain GTN Educational Institutions web pages to help you use our website interactively.",
        "If you’re wondering what a cookie is—it is a small file that a website transfers to your computer’s hard disk, usually to keep track of you while you are connected to that site.",
        "Cookies of GTN Educational Institutions web pages do not collect information about you, but just the browser session.",
        "The dynamic features of the webpages become easier to use because of the cookie. It prevents the cycle of having to provide the same information again as you browse from one page to another.",
        "Remember: To protect your privacy, be sure to close your browser entirely after you have finished conducting your business with a website that uses cookies.",
        "In case you are concerned about the potential misuse of information gathered by cookies placed in your system, set your browser to prompt you before it accepts a cookie. Almost all internet browsers have settings that help you identify cookies.",
      ],
    },
    {
      Heading: "When You Send Us Email:",
      Desc: [
        "When you send us an email, the message usually contains your return email address. Email is not necessarily secure against interception.",
        "If you include personally identifying information in your email because you want to address issues specific to your situation, we may use that information in responding to your request.",
        "It is important you send only information necessary to help us process your request.",
      ],
    },
    {
      Heading: "Information Collected from Interactive Forms",
      Desc: [
        "Some of our web pages have interactive forms that allow you to voluntarily submit personal information (such as your name, e-mail address, or organization.",
        "This happens when you are registering for online counseling, seminars, various tests, quizzes, workshops, or training sessions offered by GTN Educational Institutions, or downloading admission forms.",
        "In those cases, all submitted information is used only for the purposes for which it is intended and is not made available to any third party.",
        "When you voluntarily send us electronic mail, we will keep a record of this information so that we can respond to you.",
        "We only collect information from you when you register on our site or fill out a form.",
        "Also, when filling out a form on our site, you may be asked to enter your: name, e-mail address, or phone number. You may, however, visit our site anonymously.",
        "In case you have submitted your personal information and contact details, we reserve the rights to Call, SMS, Email, or WhatsApp about our products and offers, even if your number has DND activated on it."
      ],
    },
    {
      Heading: "Links to Other Sites",
      Desc: [
        "Our policy mentioned above discloses the privacy practices for the GTN Educational Institutions website.",
        "However, we may provide links to other websites. When you leave our website, you will be going to sites that are beyond our control.",
        "These websites may send their own cookies to users, collect data, or solicit personal information.",
        "The privacy policies and procedures described here do not apply to any external links.",
        "It is advisable to read the privacy policies of any site you link from ours—especially where you share any personal information.",
        "Be informed. The best person qualified for your privacy is you."
      ],
    },
  ],
  // Removed committee as it's grievance-specific
  // Removed onlineGrievanceUrl as it's grievance-specific
};

// Dynamic data for Info section (adapted minimally if needed; no PDFs here, but can extend)
const infoData = {
  // Add any additional nav items if needed, similar to CoE page
  // For now, keeping it simple as privacy content doesn't have sub-resources like regulations/results
};

export default function PrivacyPolicyPage() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);

  const handleItemClick = (key: string, item: any) => {
    if (item.contentType === 'folder') {
      setExpandedKey(prevKey => (prevKey === key ? null : key));
    } else {
      setActiveTab(key);
    }
  };

  const findItemByKey = (key: string) => {
    // Implement if adding more infoData; for now, not used extensively
    return null;
  };

  const activeContent = activeTab ? findItemByKey(activeTab) : null;

  const renderNavItems = (items: object, isSublevel = false): ReactNode => {
    // Implement if adding more nav items; for now, minimal
    return null;
  };

  return (
    <>
      {/* Hero Section - Adapted for Privacy Policy */}
      <Hero
        title="Privacy Policy"
        desc="This explains how we collect, use, and protect your information."
        image="/assets/images/Pharmacy_courses/footer/privacy.jpg"
      />

      {/* About Section - Similar to CoE About */}
      <section className="bg-brand-sand py-16 md:py-24 relative overflow-hidden">
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-8">About </h2>
            <p className="text-lg text-neutral-600 mb-12 text-left">This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </div>
        </div>
      </section>

      {/* Sections - Privacy Policy Content */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-8">
            {privacyData.sections.map((section, index) => (
              <div key={index} className="break-words w-full">
                <h3 className="text-2xl font-bold text-neutral-800 mb-4">{section.Heading}</h3>
                <ul className="list-disc pl-6 text-lg text-neutral-600 space-y-4 w-full max-w-none">
                  {section.Desc.map((item, subIndex) => (
                    <li key={subIndex} className="break-words w-full">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}