"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
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

function Card({ p }: { p: (typeof places)[number] }) {
  return (
    <figure className="relative h-[62dvh] min-h-[26rem] w-[78vw] shrink-0 overflow-hidden rounded-[var(--radius-card)] sm:w-[46vw] lg:w-[30vw]">
      <Image src={p.img} alt={`${p.title}: a space JC Crew cleaned`} fill sizes="(min-width:1024px) 30vw, 78vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#07120b]/85 via-[#07120b]/10 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 p-6 text-white">
        <p className="font-display text-3xl font-bold tracking-tight">{p.title}</p>
        <p className="mt-2 max-w-[34ch] text-sm leading-relaxed text-white/80">{p.body}</p>
      </figcaption>
    </figure>
  );
}

export function VermontPlaces() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Slide the track until the last card sits against the right gutter.
  const x = useTransform(scrollYProgress, (v) => -v * distance);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const measure = () => setDistance(Math.max(0, el.scrollWidth - window.innerWidth + 32));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [reduce]);

  const heading = (

    <div className="max-w-2xl px-4 md:px-8">
      <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance md:text-6xl">
        Built for Vermont houses.
      </h2>
      <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-muted">
        Lake camps, log homes, farmhouse floors and downtown offices. Every photo here is a job Joe&apos;s crew did.
      </p>
    </div>
  );

  if (reduce) {
    return (
      <section className="py-20 md:py-28">
        {heading}
        <div className="mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-4 md:px-8">
          {places.map((p) => (
            <div key={p.title} className="snap-start">
              <Card p={p} />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 isolate flex h-[100dvh] flex-col justify-center gap-10 overflow-hidden pt-16">
        <Plate name="thrush" drift={false} sway opacity={0.9} className="top-[12%] right-[4%] w-40 md:w-64" />
        {heading}
        <motion.div ref={track} style={{ x }} className="flex w-max gap-4 pl-4 md:gap-6 md:pl-8">
          {places.map((p) => (
            <Card key={p.title} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
