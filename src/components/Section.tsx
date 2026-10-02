import Hero from "@/components/Hero";

export default function Section({ title, desc }:{ title:string; desc?:string }){
  return (
    <>
      <Hero title={title} desc={desc} image="/images/section.jpg" />
      <section className="container py-10">
        <div className="grid-wrap">
          {/* Replace with cards/lists specific to the section */}
          <div className="card p-6"><p className="font-semibold">Placeholder</p><p className="text-sm text-neutral-700">Swap with real content or JSON feed.</p></div>
          <div className="card p-6"><p className="font-semibold">Placeholder</p><p className="text-sm text-neutral-700">Programs, schools, labs, centers…</p></div>
          <div className="card p-6"><p className="font-semibold">Placeholder</p><p className="text-sm text-neutral-700">News, events, initiatives…</p></div>
        </div>
      </section>
    </>
  );
}