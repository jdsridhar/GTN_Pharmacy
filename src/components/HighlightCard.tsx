import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HighlightCardProps = {
  title: string;
  desc: string;
  href: string;
  imgSrc: string;
  imgAlt: string;
  linkText: string;
  badge?: string;
};

export function HighlightCard({ title, desc, href, imgSrc, imgAlt, linkText, badge }: HighlightCardProps) {
  const isExternal = href.startsWith("http");

  return (
    <article className="flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 group h-full">
      <div className="relative w-full h-44 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center p-4 overflow-hidden">
        {badge && (
          <span className="absolute top-3 right-3 text-[11px] font-bold uppercase tracking-wider bg-[#1e2f5c]/10 text-[#1e2f5c] border border-[#1e2f5c]/20 px-2.5 py-0.5 rounded-full z-10">
            {badge}
          </span>
        )}
        <Link
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="relative w-full h-full flex items-center justify-center"
        >
          <Image
            src={imgSrc}
            alt={imgAlt}
            width={240}
            height={160}
            className="object-contain max-h-32 max-w-[80%] transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="mt-5 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
        <p className="mt-2.5 text-sm text-neutral-600 leading-relaxed flex-1">
          {desc}
        </p>
        <div className="mt-4 pt-4 border-t border-slate-100">
          <Link
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover group-hover:underline"
          >
            Visit {linkText} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}