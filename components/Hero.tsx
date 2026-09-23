"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Star } from "@phosphor-icons/react";
import { site } from "@/lib/site";
import { QuoteButton, CallButton } from "./Buttons";
import { Mountains } from "./Mountains";
import { Plate } from "./Plate";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // The lake-view window opens up to full bleed as it scrolls into view.
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "start 0.15"] });
  const inset = useTransform(scrollYProgress, [0, 1], [7, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [28, 0]);
  const clipPath = useTransform([inset, radius], ([i, r]) => `inset(0% ${i}% 0% ${i}% round ${r}px)`);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);

  const enter = (delay: number, y = 24) =>
    reduce ? {} : { initial: { opacity: 0, y }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay, ease } };

  return (
    <section className="relative isolate -mt-16 overflow-hidden md:-mt-[4.5rem]">
      {/* Morning sky with the sun coming up behind the headline. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[52rem] bg-[linear-gradient(to_bottom,var(--sky-top),var(--sky-mid)_55%,var(--bg))] md:h-[58rem]"
      />
      <div
        aria-hidden
        className="absolute top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(243_194_51/0.38),rgb(243_194_51/0.12)_45%,transparent_70%)] blur-2xl md:size-[48rem]"
      />

      <Plate name="maple" eager layer="z-0" desktopOnly sway drift={false} opacity={0.55} rotate={148} className="-top-24 -left-28 w-80 lg:w-96" />
      <Plate name="pine" eager layer="z-0" desktopOnly sway drift={false} opacity={0.5} rotate={-150} className="-top-28 -right-24 w-72 lg:w-[22rem]" />

      <div className="relative mx-auto max-w-7xl px-4 pt-28 text-center md:px-8 md:pt-36 lg:pt-40">
        {/* Flanking job photos keep the composition symmetrical on wide screens. */}
        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, x: -40, rotate: -2 }, animate: { opacity: 1, x: 0, rotate: -6 }, transition: { duration: 1.2, delay: 0.3, ease } })}
          className="absolute top-[18rem] left-0 hidden aspect-[3/4] w-40 -rotate-6 overflow-hidden rounded-[var(--radius-card)] border-4 border-surface shadow-soft xl:block 2xl:w-48"
        >
          <Image src="/images/fb-1010.jpg" alt="Two crew members mopping a checkerboard kitchen" fill sizes="13rem" className="object-cover" />
        </motion.div>
        <motion.div
          {...(reduce ? {} : { initial: { opacity: 0, x: 40, rotate: 2 }, animate: { opacity: 1, x: 0, rotate: 6 }, transition: { duration: 1.2, delay: 0.3, ease } })}
          className="absolute top-[18rem] right-0 hidden aspect-[3/4] w-40 rotate-6 overflow-hidden rounded-[var(--radius-card)] border-4 border-surface shadow-soft xl:block 2xl:w-48"
        >
          <Image src="/images/fb-469.jpg" alt="Wood floor polished to a mirror shine" fill sizes="13rem" className="object-cover" />
        </motion.div>

        <motion.a
          {...enter(0.05, 12)}
          href="/reviews"
          className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/60 px-4 py-2 text-sm font-medium text-muted backdrop-blur-sm transition-colors hover:text-ink"
        >
          <span className="flex text-sun" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} weight="fill" className="size-3.5" />
            ))}
          </span>
          {site.rating} on Google. Cleaning Vermont since {site.since}.
        </motion.a>

        <motion.h1
          {...enter(0.15)}
          className="display-xl mx-auto mt-7 max-w-[14ch] text-[clamp(1.9rem,10.5vw,2.9rem)] leading-[0.9] sm:text-7xl lg:text-[5.6rem]"
        >
          Not your average <span className="text-forest">Joe.</span>
        </motion.h1>

        <motion.p {...enter(0.28)} className="mx-auto mt-7 max-w-[40ch] text-lg leading-relaxed text-ink/75 md:text-xl">
          Northern Vermont&apos;s crew for deep cleans, move-outs and the jobs other cleaners turn down.
        </motion.p>

        <motion.div {...enter(0.38)} className="relative z-10 mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <QuoteButton size="lg" />
          <CallButton size="lg" className="bg-white/60 backdrop-blur-sm" />
        </motion.div>
      </div>

      <Mountains className="-mt-2 h-64 sm:h-72 md:-mt-16 md:h-[24rem]" />

      <div ref={stage} className="relative -mt-6 md:-mt-16">
        <motion.div
          style={reduce ? undefined : { clipPath }}
          className="relative mx-auto aspect-[4/5] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[21/9]"
        >
          <motion.div className="absolute inset-0" style={reduce ? undefined : { scale: imgScale }}>
            <Image
              src="/images/hero-lake.jpg"
              alt="A living room JC Crew cleaned, big windows looking out over Lake Champlain"
              fill
              preload
              sizes="100vw"
              className="object-cover object-[50%_30%] lg:object-[50%_32%]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
