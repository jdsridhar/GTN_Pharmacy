import Image from "next/image";
import Link from "next/link";

type Props = {
  kicker?: string;
  title?: string;
  desc?: string;
  cta?: { label: string; href: string };
  image?: string;
};

export default function Hero({ kicker, title, desc, cta, image }: Props) {
  return (
    <section className="relative overflow-hidden  py-12 md:py-18">
      {image && (
        <div className="absolute inset-0 -z-10 py-26">
          <Image src={image} alt="" fill className="object-cover" />
          {/* This overlay helps with text readability on busy images */}
          {/* <div className="absolute inset-0 bg-white/70" /> */}
        </div>
      )}
      {/* --- CHANGES ARE IN THIS DIV --- */}
      <div className="container mx-auto max-w-4xl text-center py-24 md:py-32">
        {kicker && (
          <p className="uppercase tracking-wide text-brand-red font-semibold">
            {kicker}
          </p>
        )}
        
        {/* Added classes for large, bold title */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          {title}
        </h1>
        
        {/* Added classes for larger description text and margin-top */}
        {desc && (
          <p className="mt-4 text-lg md:text-xl text-neutral-600">
            {desc}
          </p>
        )}
        
        {cta && (
          <Link href={cta.href} className="btn btn-primary mt-8">
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}