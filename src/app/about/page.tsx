import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | GTN Educational Institutions",
};

/** Reusable 2-col section with configurable image position and optional divider */
function ContentSection({
  id,
  title,
  body,
  imgSrc,
  imgAlt,
  imageLeft = true,
  divider = true,
}: {
  id?: string;
  title: string;
  body: React.ReactNode;
  imgSrc: string;
  imgAlt: string;
  imageLeft?: boolean;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      className="relative scroll-mt-28"
    >
      {divider && (
        <div
          className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-neutral-200"
          aria-hidden
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12 gap-y-8 items-start">
        {/* TEXT */}
        <div className={imageLeft ? "lg:col-span-7 order-2 lg:order-2" : "lg:col-span-7 order-1"}>
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">{title}</h3>
          <div className="text-neutral-700 text-base md:text-lg leading-7 md:leading-8">
            {body}
          </div>
        </div>

        {/* IMAGE */}
        <div className={imageLeft ? "lg:col-span-5 order-1" : "lg:col-span-5 order-2 flex justify-center lg:justify-end"}>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <Image
              src={imgSrc}
              alt={imgAlt}
              width={880}
              height={620}
              className="object-cover w-full h-full"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-16 space-y-20">
      {/* HERO */}
      <section
        className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 bg-no-repeat bg-cover py-16 rounded-2xl shadow-sm border border-blue-100"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
          ABOUT US
        </h1>
        <p className="text-neutral-700 text-lg md:text-xl max-w-4xl mx-auto leading-relaxed font-medium">
          Since the establishment of G.T. Narayanaswamy Naidu Charities Trust in 1963, GTN Educational Institutions have been at the 
          forefront of delivering excellence in higher education across Arts, Science, Pharmacy, Nursing, 
          and Technology in Dindigul. Our commitment extends beyond academic instruction to nurturing future 
          leaders who will drive innovation and positive change in society.
        </p>
      </section>

      {/* GTN CHARITABLE TRUST */}
      <ContentSection
        id="trust"
        divider={false}
        imageLeft={false}
        imgSrc="/images/gtn/mainBuilding.png"
        imgAlt="G.T. Narayanaswamy Naidu Charities Trust"
        title="G.T. Narayanaswamy Naidu Charities Trust"
        body={
          <>
            <p className="font-semibold text-lg text-blue-800">
              "Pioneering educational institutions in Dindigul since 1963"
            </p>
            <p className="mt-4">
              The G.T. Narayanaswamy Naidu Charities Trust, Dindigul was founded in 1963 with the noble vision of providing quality education to the students in and around Dindigul District through community service and academic excellence.
            </p>
            <p className="mt-4">
              Celebrating over 60 years of dedicated service, the Trust successfully runs premier institutions including G.T.N. Arts College (Autonomous), G.T.N. College of Pharmacy, G.T.N. College of Nursing, G.T.N. College of Technology, G.T.N. Law College, and G.T.N. Medical College of Naturopathy and Yogic Science, empowering thousands of students every year.
            </p>
          </>
        }
      />

      {/* CHAIRMAN'S MESSAGE */}
      <ContentSection
        id="chairman"
        divider={false}
        imageLeft
        imgSrc="/images/about/chairman.jpg"
        imgAlt="Ln. Dr. K. Rethinam - Chairman, GTN Educational Institutions"
        title="Chairman's Message"
        body={
          <>
            <p className="font-semibold text-lg text-blue-800">
              "Education is the most powerful weapon which you can use to change the world." - Nelson Mandela
            </p>
            <p className="mt-4">
              It is with immense pride and hope that I welcome you to GTN Educational 
              Institutions. Our journey began with a simple yet powerful vision: to create an 
              educational ecosystem that nurtures talent, fosters innovation, and builds character.
            </p>
            <p className="mt-4">
              In today's rapidly evolving world, we recognize that education must extend beyond 
              textbooks. Our institutions are committed to developing well-rounded individuals 
              equipped with technical expertise, critical thinking abilities, and strong ethical 
              values. We believe in creating leaders who will not only succeed in their careers 
              but also contribute meaningfully to society.
            </p>
            <p className="mt-4">
              Our partnerships with leading industries and healthcare centers ensure 
              that our students receive comprehensive exposure and practical experience. Through 
              continuous innovation in teaching methodologies and infrastructure development, 
              we remain dedicated to providing world-class education that transforms lives 
              and communities.
            </p>
            <p className="mt-4 font-bold text-neutral-800">
              — Ln. Dr. K. Rethinam, MJF<br />
              <span className="text-sm font-normal text-neutral-600">Secretary &amp; Correspondent / Chairman, GTN Educational Institutions</span>
            </p>
          </>
        }
      />

      {/* DIRECTOR'S MESSAGE */}
      <ContentSection
        id="director"
        divider={false}
        imageLeft={false}
        imgSrc="/images/about/director.jpg"
        imgAlt="Dr. R. Durai - Trustee & Director, GTN Educational Institutions"
        title="Director's Message"
        body={
          <>
            <p className="font-semibold text-lg text-blue-800">
              "Empowering students through innovation, modern technology, and value-based professional education."
            </p>
            <p className="mt-4">
              At GTN Educational Institutions, our focus is squarely placed on experiential learning, technological advancement, and academic rigor. We strive to provide modern infrastructure, industry-standard laboratories, and holistic mentorship to guide students toward exceptional professional careers.
            </p>
            <p className="mt-4">
              GTN College of Pharmacy stands as a hallmark of our commitment to healthcare education and pharmaceutical research. We foster an environment where inquiring minds thrive, ethical practice is cultivated, and students are thoroughly equipped to meet the dynamic challenges of the global healthcare sector.
            </p>
            <p className="mt-4 font-bold text-neutral-800">
              — Dr. R. Durai<br />
              <span className="text-sm font-normal text-neutral-600">Trustee &amp; Director, GTN Educational Institutions</span>
            </p>
          </>
        }
      />

      {/* PRINCIPAL'S MESSAGE */}
      <ContentSection
        id="principal"
        divider={false}
        imageLeft
        imgSrc="/images/about/principal.jpeg"
        imgAlt="Principal, GTN College of Pharmacy"
        title="Principal's Message"
        body={
          <>
            <p>
              As the Principal of GTN College of Pharmacy, 
              I take great pride in leading an institution that consistently pushes the 
              boundaries of pharmaceutical education, research, and innovation.
            </p>
            <p className="mt-4">
              Our faculty comprises experienced educators, pharmaceutical researchers, and healthcare professionals who are 
              passionate about mentoring the next generation of pharmacists and technologists. 
              The curriculum is regularly updated to incorporate the latest advancements 
              in drug discovery, clinical pharmacy, and healthcare requirements.
            </p>
            <p className="mt-4">
              We emphasize laboratory-based learning, research initiatives, and hospital/industrial 
              internships that provide students with hands-on clinical and industrial experience. 
              Our campus in Dindigul is a vibrant learning community where 
              students develop both professionally and personally.
            </p>
            <p className="mt-4 font-bold text-neutral-800">
              — Principal<br />
              <span className="text-sm font-normal text-neutral-600">GTN College of Pharmacy, Dindigul</span>
            </p>
          </>
        }
      />

      {/* OUR MISSION */}
      <ContentSection
        id="mission"
        divider={false}
        imageLeft={false}
        imgSrc="/images/about/about_us_1.jpg"
        imgAlt="Students engaged in collaborative learning"
        title="Our Mission"
        body={
          <>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                To provide transformative education that combines academic rigor with practical skills and ethical values
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                To foster innovation, research, and entrepreneurship through state-of-the-art infrastructure and industry partnerships
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                To develop globally competent professionals who can address complex challenges and contribute to sustainable development
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                To create an inclusive learning environment that nurtures diversity, leadership, and social responsibility
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                To serve society through educational outreach, community engagement, and knowledge dissemination
              </li>
            </ul>
          </>
        }
      />

      {/* OUR VISION */}
      <ContentSection
        id="vision" 
        divider={false}
        imageLeft
        imgSrc="/images/about/vision.jpg"
        imgAlt="Future vision of educational excellence"
        title="Our Vision"
        body={
          <>
            <p className="font-semibold text-lg text-blue-800 mb-4">
              To emerge as a center of excellence in education and research, recognized globally 
              for innovation, quality, and social impact.
            </p>
            <p>
              We envision GTN Educational Institutions as a transformative force 
              in higher education, where:
            </p>
            <ul className="space-y-2 mt-3">
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                Learning transcends boundaries and empowers students to become change-makers
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                Research and innovation address pressing global challenges and drive sustainable development
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                Education becomes a catalyst for social mobility and economic growth
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2 mt-1">✓</span>
                Our graduates lead with integrity, competence, and compassion in their chosen fields
              </li>
            </ul>
          </>
        }
      />
    </main>
  );
}