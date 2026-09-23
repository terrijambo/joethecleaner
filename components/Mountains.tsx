"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

// Layered Green Mountains skyline. Far ridge carries a Camel's Hump-style knob.
// Each layer drifts at its own speed on scroll for depth.

// Deterministic pine positions so server and client render the same tree line.
const pines = Array.from({ length: 64 }, (_, i) => {
  const x = i * 23 + ((i * 37) % 11);
  const h = 26 + ((i * 53) % 22);
  const baseY = 336 - Math.sin(i / 4.2) * 9 - ((i * 17) % 7);
  return { x, h, baseY };
});

function Pine({ x, h, baseY }: { x: number; h: number; baseY: number }) {
  const w = h * 0.42;
  return (
    <path
      d={`M${x} ${baseY - h} L${x + w * 0.55} ${baseY - h * 0.55} L${x + w * 0.32} ${baseY - h * 0.55} L${x + w * 0.75} ${baseY - h * 0.2} L${x + w * 0.45} ${baseY - h * 0.2} L${x + w} ${baseY} L${x - w} ${baseY} L${x - w * 0.45} ${baseY - h * 0.2} L${x - w * 0.75} ${baseY - h * 0.2} L${x - w * 0.32} ${baseY - h * 0.55} L${x - w * 0.55} ${baseY - h * 0.55} Z`}
    />
  );
}

export function Mountains({ className = "", trees = true }: { className?: string; trees?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const far = useTransform(scrollYProgress, [0, 1], [30, -10]);
  const mid = useTransform(scrollYProgress, [0, 1], [18, -6]);
  const near = useTransform(scrollYProgress, [0, 1], [8, -2]);

  const layer = (y: typeof far) => (reduce ? undefined : { y });

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none relative w-full overflow-hidden ${className}`}>
      <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax slice" className="absolute inset-0 size-full">
        <motion.path
          style={layer(far)}
          fill="var(--ridge-far)"
          d="M0 250 C120 232 210 244 300 226 C380 210 450 222 530 200 C610 180 670 196 730 186 C790 176 830 146 868 116 C884 102 898 90 914 90 C932 90 944 110 952 128 C964 148 996 160 1046 174 C1126 194 1206 188 1286 204 C1366 220 1404 214 1440 222 L1440 400 L0 400 Z"
        />
        <motion.path
          style={layer(mid)}
          fill="var(--ridge-mid)"
          d="M0 296 C90 278 170 246 270 258 C350 268 420 236 520 246 C620 258 690 226 790 236 C890 246 960 272 1060 260 C1160 248 1240 226 1340 246 C1400 258 1424 264 1440 262 L1440 400 L0 400 Z"
        />
        <motion.g style={layer(near)} fill="var(--ridge-near)">
          <path d="M0 338 C200 318 400 348 620 330 C820 314 1040 344 1240 326 C1340 318 1400 328 1440 324 L1440 400 L0 400 Z" />
          {trees && pines.map((p, i) => <Pine key={i} {...p} />)}
        </motion.g>
        <path fill="var(--bg)" d="M0 372 C260 356 520 380 760 366 C1000 352 1220 376 1440 362 L1440 400 L0 400 Z" />
      </svg>
    </div>
  );
}
