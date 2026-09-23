import Image from "next/image";
import { Reveal } from "./Reveal";
import { Plate } from "./Plate";

// Not staged pairs. Top row is what the crew finds, bottom row is how they leave it.
const mess = [
  { img: "/images/fb-966.jpg", alt: "A pile of pet hair pulled from a single room" },
  { img: "/images/fb-944.jpg", alt: "A cleaning rag after one pass" },
  { img: "/images/fb-471.jpg", alt: "Dust and debris along a floor edge" },
  { img: "/images/fb-487.jpg", alt: "Another pile of pet hair" },
];
const finish = [
  { img: "/images/fb-954.jpg", alt: "Wood floor with a fresh shine" },
  { img: "/images/fb-481.jpg", alt: "Glass cooktop wiped spotless" },
  { img: "/images/fb-688.jpg", alt: "Entryway with gleaming hardwood" },
  { img: "/images/fb-271.jpg", alt: "Empty room with polished floors" },
];

function Row({ items, label, dim }: { items: typeof mess; label: string; dim?: boolean }) {
  return (
    <div>
      <p className="mb-3 font-display text-lg font-semibold">{label}</p>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((m, i) => (
          <Reveal key={m.img} delay={i * 0.05}>
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src={m.img}
                alt={m.alt}
                fill
                sizes="(min-width:768px) 22vw, 45vw"
                className={`object-cover transition-[filter] duration-700 hover:saturate-100 ${dim ? "saturate-[0.55]" : ""}`}
              />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Grit() {
  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <Plate name="pine" desktopOnly opacity={0.25} rotate={-30} className="top-0 -right-32 w-72" />
      <Reveal>
        <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight md:text-6xl">
          We&apos;ve seen worse. Probably.
        </h2>
        <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
          Two dogs&apos; worth of hair, post-reno dust, the grime under the stove. Unfiltered photos from real jobs.
        </p>
      </Reveal>
      <div className="mt-12 grid gap-10">
        <Row items={mess} label="What the crew finds" dim />
        <Row items={finish} label="How they leave it" />
      </div>
    </section>
  );
}
