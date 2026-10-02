import Link from "next/link";

export function CTA({ title, desc, cta }:{ title:string; desc:string; cta:{ label:string; href:string } }){
  return (
    <section className="card-muted p-8 text-center">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <p className="mt-2 text-neutral-700">{desc}</p>
      <Link href={cta.href} className="btn btn-primary mt-4">{cta.label}</Link>
    </section>
  );
}

export function Marquee({ logos }:{ logos:{ src:string; alt:string }[] }){
  return (
    <div className="relative overflow-hidden rounded-2xl border">
      <div className="flex animate-scroll gap-12 p-6">
        {logos.concat(logos).map((l, i)=> (
          <img key={i} src={l.src} alt={l.alt} className="h-10"/>
        ))}
      </div>
    </div>
  );
}