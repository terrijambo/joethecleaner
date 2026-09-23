"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { site, towns } from "@/lib/site";

// Every number here is verifiable: Google profile, review dates, FB photo count.
const stats = [
  { value: site.rating, decimals: 1, suffix: "", label: `Google rating across ${site.reviewCount} reviews` },
  { value: 5, decimals: 0, suffix: "+", label: "years of Vermont reviews and counting" },
  { value: 1200, decimals: 0, suffix: "+", label: "job photos posted, before and after" },
  { value: towns.length, decimals: 0, suffix: "", label: "towns on regular routes, plus camps statewide" },
];

function Counter({ value, decimals, suffix }: { value: number; decimals: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    const fmt = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    if (reduce) {
      el.textContent = fmt(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (n) => (el.textContent = fmt(n)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, decimals, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value.toLocaleString("en-US", { minimumFractionDigits: decimals }) + suffix}
    </span>
  );
}

export function Proof() {
  return (
    <section aria-label="JC Crew by the numbers" className="bg-forest-deep text-on-forest">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-10 px-4 py-14 md:px-8 md:py-16 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-l border-on-forest/15 pl-5">
            <p className="font-display text-5xl font-bold tracking-tight text-sun md:text-6xl">
              <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-2 max-w-[22ch] text-sm leading-snug text-on-forest/75">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
