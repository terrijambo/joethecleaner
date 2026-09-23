import Image from "next/image";
import { FacebookLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";

const shots = [
  { img: "/images/fb-41.jpg", alt: "Crew scrubbing a retail floor with a floor machine" },
  { img: "/images/fb-722.jpg", alt: "Crew member dusting high corners with an extension pole" },
  { img: "/images/fb-1010.jpg", alt: "Two crew members mopping a checkerboard kitchen floor" },
  { img: "/images/fb-362.jpg", alt: "Crew member wiping down a kitchen island" },
  { img: "/images/fb-577.jpg", alt: "Crew member on a ladder cleaning a ceiling fan" },
  { img: "/images/fb-414.jpg", alt: "Gloved hands scrubbing stovetop parts" },
  { img: "/images/fb-746.jpg", alt: "Crew member cleaning out a refrigerator" },
  { img: "/images/fb-372.jpg", alt: "Crew member vacuuming an outdoor mat" },
  { img: "/images/fb-683.jpg", alt: "Crew member scrubbing kitchen cabinets" },
  { img: "/images/fb-364.jpg", alt: "Crew member wiping a ceiling light fixture" },
  { img: "/images/fb-542.jpg", alt: "Crew member cleaning a fridge in a modern kitchen" },
  { img: "/images/fb-701.jpg", alt: "Crew member vacuuming a bedroom" },
];

export function CrewGallery() {
  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance md:text-6xl">
            Real crew. Real jobs. No stock photos.
          </h2>
        </Reveal>

        <div className="mt-12 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
          {shots.map((s, i) => (
            <Reveal key={s.img} delay={(i % 4) * 0.05} className="mb-3 break-inside-avoid md:mb-4">
              <div
                className={`relative overflow-hidden rounded-[var(--radius-card)] ${
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-[4/5]" : "aspect-square"
                }`}
              >
                <Image
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(min-width:1024px) 23vw, (min-width:768px) 31vw, 48vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.05]"
                />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <a
            href={site.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex items-center gap-2 font-semibold text-forest underline-offset-4 hover:underline dark:text-sun"
          >
            <FacebookLogo weight="fill" className="size-5" />
            See all 1,200+ job photos on Facebook
          </a>
        </Reveal>
      </div>
    </section>
  );
}
