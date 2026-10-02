import Image from "next/image";

export function ProfileSpotlight({ name, role, quote, image }: { name: string; role: string; quote: string; image: string; }){
  return (
    <article className="card overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-64 md:h-auto md:w-1/3">
          <Image src={image} alt="" fill className="object-cover"/>
        </div>
        <div className="p-6">
          <p className="text-lg font-semibold">{name}</p>
          <p className="text-sm text-neutral-600">{role}</p>
          <blockquote className="mt-3 text-neutral-800">“{quote}”</blockquote>
        </div>
      </div>
    </article>
  );
}