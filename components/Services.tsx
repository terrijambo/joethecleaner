import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { Plate } from "./Plate";

type Tile = {
  title: string;
  body: string;
  img?: string;
  alt?: string;
  className: string;
  big?: boolean;
  slug: string;
};

const tiles: Tile[] = [
  {
    title: "Deep cleaning",
    slug: "deep-cleaning",
    body: "Top to bottom. Baseboards, blinds, inside the oven, carpets shampooed, the corner behind the fridge.",
    img: "/images/fb-469.jpg",
    alt: "Hardwood floor polished to a mirror shine",
    className: "md:col-span-2 lg:col-span-4 lg:row-span-2 min-h-[26rem] lg:min-h-0",
    big: true,
  },
  {
    title: "Recurring cleaning",
    slug: "recurring",
    body: "Weekly, biweekly or monthly. Same crew, same standard.",
    img: "/images/fb-975.jpg",
    alt: "Tidy living room with a blue sectional",
    className: "lg:col-span-2 min-h-[18rem]",
  },
  {
    title: "Move in and move out",
    slug: "move-in-out",
    body: "Empty cabinets, inside closets, appliances. Get the deposit back.",
    img: "/images/fb-260.jpg",
    alt: "Empty room with gleaming floors after a move-out clean",
    className: "lg:col-span-2 min-h-[18rem]",
  },
  {
    title: "Offices and commercial",
    slug: "commercial",
    body: "Offices, retail floors, locker rooms, break rooms.",
    img: "/images/fb-751.jpg",
    alt: "Freshly mopped commercial break room",
    className: "lg:col-span-2 min-h-[18rem]",
  },
  {
    title: "Post-construction",
    slug: "post-construction",
    body: "Drywall dust, paint drips and debris, gone before move-in day.",
    img: "/images/fb-1043.jpg",
    alt: "Two crew members sweeping up after a renovation",
    className: "lg:col-span-2 min-h-[18rem]",
  },
  {
    title: "The hard ones",
    slug: "heavy-duty",
    body: "Hoarding, a parent's home before they come back from the hospital, the job you're embarrassed to call about. No judgment. Just call.",
    className: "md:col-span-2 lg:col-span-2 min-h-[18rem]",
  },
];

export function Services() {
  return (
    <section className="relative isolate mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
      <Plate name="birch" desktopOnly opacity={0.3} rotate={-18} className="top-6 -right-40 w-80" />
      <Reveal>
        <h2 className="max-w-3xl font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance md:text-6xl">
          From a quick refresh to the house nobody else would take.
        </h2>
      </Reveal>

      <div className="mt-12 grid auto-rows-[minmax(18rem,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
        {tiles.map((t, i) => (
          <Reveal key={t.title} delay={i * 0.05} className={t.className}>
            {t.img ? (
              <Link
                href={`/services#${t.slug}`}
                className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-card)] p-6 text-white md:p-7"
              >
                <Image
                  src={t.img}
                  alt={t.alt ?? ""}
                  fill
                  sizes={t.big ? "(min-width:1024px) 60vw, 100vw" : "(min-width:1024px) 30vw, (min-width:768px) 50vw, 100vw"}
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07120b]/90 via-[#07120b]/35 to-transparent" />
                <div className="relative">
                  <h3 className={`font-display font-bold tracking-tight ${t.big ? "text-4xl md:text-5xl" : "text-2xl"}`}>
                    {t.title}
                  </h3>
                  <p className={`mt-2 max-w-[42ch] leading-relaxed text-white/85 ${t.big ? "text-base md:text-lg" : "text-sm"}`}>
                    {t.body}
                  </p>
                </div>
                <ArrowUpRight
                  weight="bold"
                  className="absolute top-6 right-6 size-5 text-white/0 transition-all duration-500 group-hover:text-white"
                />
              </Link>
            ) : (
              <Link
                href={`/services#${t.slug}`}
                className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-sun p-6 text-on-sun transition-transform duration-500 hover:-translate-y-1 md:p-7"
              >
                <h3 className="font-display text-3xl font-bold tracking-tight">{t.title}</h3>
                <p className="mt-6 text-base leading-relaxed">{t.body}</p>
              </Link>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
