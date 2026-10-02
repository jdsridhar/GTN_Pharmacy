import Link from "next/link";

export function NewsCard({ title, href, date, intro }: { title:string; href:string; date:string; intro:string; }){
  return (
    <article className="card p-5">
      <p className="text-xs uppercase tracking-wide text-neutral-600">{date}</p>
      <h3 className="mt-2 text-lg font-semibold"><Link href={href}>{title}</Link></h3>
      <p className="mt-2 text-sm text-neutral-700 line-clamp-3">{intro}</p>
    </article>
  );
}

export function EventCard({ title, when, where, href }:{ title:string; when:string; where:string; href:string; }){
  return (
    <article className="card p-5">
      <p className="text-xs uppercase tracking-wide text-neutral-600">{when}</p>
      <h3 className="mt-2 text-lg font-semibold"><Link href={href}>{title}</Link></h3>
      <p className="mt-2 text-sm text-neutral-700">{where}</p>
    </article>
  );
}