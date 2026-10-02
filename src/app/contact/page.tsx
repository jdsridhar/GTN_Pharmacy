"use client"; // This must be the very first line

import Link from "next/link";
import  Hero  from "@/components/Hero";
import { useState } from "react";
import { MapPin, Phone, Mail, Instagram, Linkedin, Youtube } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert("Message submitted successfully!");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <>
      <Hero
        title="Contact Us"
        desc="Reach out to GTN College of Pharmacy for admissions, academic inquiries, research collaborations, and general information."
        image="/assets/images/Pharmacy_courses/contact/contact.jpg"
      />

      <section className="bg-white py-12 md:py-20">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="inline-block text-3xl font-bold tracking-tight border-b-4 border-primary pb-2">
              Contact Us
            </h2>
          </div>

          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Contact Details */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-neutral-800 mb-4">
                  GTN College of Pharmacy
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  GTN College of Pharmacy, governed by the G.T. Narayanaswamy Naidu Charities Trust,
                  is committed to excellence in pharmaceutical education, research, and healthcare
                  services. Located at Dindigul, Tamil Nadu, the institution provides a student-centric
                  learning environment with state-of-the-art laboratories and advanced pharmacological
                  testing facilities.
                </p>
              </div>

              <div className="space-y-4">
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <MapPin
                    className="text-primary mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-neutral-800">Address</p>
                    <p className="text-neutral-600">
                      G.T.N. Nagar, Old Karur Road,
                      <br />
                      Dindigul – 624005,
                      <br />
                      Tamil Nadu, India.
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Mail
                    className="text-primary flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-neutral-800">Email</p>
                    <p className="text-neutral-600">
                      gtntrustofficial@gmail.com
                      <br />
                      contact@gtnarts.org
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <Phone
                    className="text-primary mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <p className="font-semibold text-neutral-800">Telephone</p>
                    <p className="text-neutral-600">
                      +91 78716 33313 <br />
                      +91 78712 33313 <br />
                      0451-2432199 <br />
                      0451-2431299
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-4 pt-4">
                <Link
                  href="https://gtnarayanaswamynaiducharitiestrust.org/"
                  target="_blank"
                  aria-label="Website"
                  className="text-primary hover:underline font-semibold text-sm"
                >
                  GTN Trust Portal ↗
                </Link>

                <Link
                  href="https://www.gtnartscollege.ac.in/"
                  target="_blank"
                  aria-label="GTN Arts College"
                  className="text-primary hover:underline font-semibold text-sm"
                >
                  GTN Arts College ↗
                </Link>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="bg-neutral-50 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-neutral-800 mb-6">
                Get in Touch
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#b1040e]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#b1040e]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#b1040e]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#b1040e]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand-red text-white py-3 rounded-md font-medium hover:bg-brand-red/90"
                >
                  Submit Message ➜
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-neutral-50 py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h3 className="text-2xl font-semibold text-neutral-800 mb-6 text-center">
            Find Us on the Map
          </h3>

          <div className="rounded-lg shadow-md overflow-hidden">
            <iframe
              src="https://maps.google.com/maps?q=GTN+Arts+College,+Old+Karur+Road,+Dindigul,+Tamil+Nadu+624005&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="400"
              loading="lazy"
              allowFullScreen
              className="w-full"
              title="GTN College of Pharmacy Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
