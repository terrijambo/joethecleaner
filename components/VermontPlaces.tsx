import Image from "next/image";
import { Plate } from "./Plate";

// Real JC Crew jobs, grouped by the kinds of places Vermont actually has.
const places = [
  { img: "/images/fb-350.jpg", title: "Lake camps", body: "Opening day, closing day, or after a summer of wet dogs and sandy feet." },
  { img: "/images/fb-600.jpg", title: "Log homes", body: "Knotty pine, open lofts, big windows. Dusted, wiped and polished." },
  { img: "/images/fb-696.jpg", title: "Old farmhouse floors", body: "Hundred-year-old wood deserves better than a wet mop." },
  { img: "/images/fb-1098.jpg", title: "Homes with character", body: "Libraries, painted ceilings, things you don't want a stranger rushing." },
  { img: "/images/fb-60.jpg", title: "Downtown offices", body: "Conference rooms and desks, cleaned after hours so Monday starts clean." },
  { img: "/images/fb-32.jpg", title: "Shops and storefronts", body: "Retail floors cleaned between close and open." },
];

function Card({ p, hidden }: { p: (typeof places)[number]; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className={`relative h-[26rem] w-[78vw] shrink-0 overflow-hidden rounded-[var(--radius-card)] sm:w-[46vw] md:h-[32rem] lg:w-[30vw] ${
        hidden ? "motion-reduce:hidden" : ""
      }`}
    >
      <Image src={p.img} alt={hidden ? "" : `${p.title}: a space JC Crew cleaned`} fill sizes="(min-width:1024px) 30vw, 78vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07120b]/85 via-[#07120b]/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="font-display text-3xl font-bold tracking-tight">{p.title}</p>
        <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-white/80">{p.body}</p>
      </figcaption>
    </figure>
  );
}

export function VermontPlaces() {
  return (
    <section className="relative isolate py-20 md:py-28">
      <Plate name="thrush" drift={false} sway opacity={0.9} className="top-6 right-[4%] w-40 md:w-64" />
      <div className="max-w-2xl px-4 md:px-8">
        <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance md:text-6xl">
          Built for Vermont houses.
        </h2>
        <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
          Lake camps, log homes, farmhouse floors and downtown offices. Every photo here is a job Joe&apos;s crew did.
        </p>
      </div>
      {/* Drifts left on its own and pauses on hover. The list is doubled so the loop is seamless;
          with reduced motion the copy is dropped and the row scrolls by hand instead. */}
      <div className="mt-10 flex overflow-hidden motion-reduce:overflow-x-auto">
        <div className="marquee-track flex gap-4 pr-4 md:gap-6 md:pr-6" style={{ animationDuration: "55s" }}>
          {[...places, ...places].map((p, i) => (
            <Card key={`${p.title}-${i}`} p={p} hidden={i >= places.length} />
          ))}
        </div>
      </div>
    </section>
  );
}
