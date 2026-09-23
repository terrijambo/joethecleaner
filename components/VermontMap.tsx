"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Phone } from "@phosphor-icons/react";
import map from "@/lib/vt-map.json";
import { site } from "@/lib/site";
import { Plate } from "./Plate";

// Geometry is pre-projected by scripts/build-vt-map.mjs (Census counties, Natural Earth lake, OSM towns).
// The frame covers northern Vermont up to the Canadian border; the rest of the state keeps going off the edges on purpose.

const VIEW_WIDE = { x: 44, y: 4, w: 350, h: 396 };
// Phones get a tighter frame on the home counties so labels stay readable.
const VIEW_NARROW = { x: 66, y: 22, w: 214, h: 292 };
const HQ = map.core.find((t) => t.name === "St. Albans")!;
const HOME_COUNTIES = ["Franklin", "Chittenden"];
// Service glow sits between St. Albans and Burlington so both counties read as home turf.
const GLOW = { x: 136, y: 158, r: 175 };
// Arcs only for genuine road trips; nearby towns would just clutter the home counties.
const ROAD_TRIPS = ["Richford", "Enosburg Falls", "Newport", "Morrisville", "Stowe", "Montpelier", "Middlebury"];

// Where each label sits relative to its pin. Towns in the Burlington cluster only label on hover.
const labelPos: Record<string, "l" | "r" | "t" | "b" | null> = {
  "St. Albans": null,
  Swanton: "l",
  Highgate: "r",
  Georgia: "l",
  Fairfax: "r",
  Milton: "r",
  Colchester: "l",
  "Essex Junction": null,
  Essex: null,
  Winooski: null,
  Burlington: "l",
  "South Burlington": null,
  Williston: "b",
  Shelburne: "l",
  Jericho: "r",
  Alburgh: "r",
  Richford: "r",
  "Enosburg Falls": "r",
  "South Hero": "l",
  "Grand Isle": "l",
  Newport: "l",
  Morrisville: "r",
  Stowe: "r",
  Waterbury: "r",
  Montpelier: "r",
  Richmond: "r",
  Hinesburg: "r",
  Vergennes: "l",
  Middlebury: "r",
};

function arc([x1, y1]: number[], [x2, y2]: number[]) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const k = 0.18;
  return `M${x1} ${y1} Q${mx - dy * k} ${my + dx * k} ${x2} ${y2}`;
}

function Label({ name, xy, pos, muted, show }: { name: string; xy: number[]; pos: "l" | "r" | "t" | "b"; muted?: boolean; show: boolean }) {
  const [x, y] = xy;
  const off = 5.5;
  const p = {
    l: { x: x - off, y: y + 1.6, anchor: "end" as const },
    r: { x: x + off, y: y + 1.6, anchor: "start" as const },
    t: { x, y: y - off, anchor: "middle" as const },
    b: { x, y: y + off + 3, anchor: "middle" as const },
  }[pos];
  return (
    <text
      x={p.x}
      y={p.y}
      textAnchor={p.anchor}
      className={`pointer-events-none transition-opacity duration-300 ${show ? "opacity-100" : "opacity-0"} ${
        muted ? "fill-muted text-[6.4px] italic sm:text-[4.6px]" : "fill-ink text-[7px] font-semibold sm:text-[5.2px]"
      }`}
      style={{ paintOrder: "stroke", stroke: "var(--bg)", strokeWidth: 1.6, strokeLinejoin: "round" }}
    >
      {name}
    </text>
  );
}

export function VermontMap() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setNarrow(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const VIEW = narrow ? VIEW_NARROW : VIEW_WIDE;
  const k = narrow ? 1.35 : 1; // pin scale
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] as const },
        };
  const pop = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { scale: 0, opacity: 0 },
          whileInView: { scale: 1, opacity: 1 },
          viewport: { once: true, amount: 0.3 },
          transition: { type: "spring" as const, stiffness: 260, damping: 18, delay },
        };

  const all = [...map.core, ...map.beyond];

  return (
    <section className="relative isolate overflow-hidden">
      <Plate name="pine" desktopOnly opacity={0.28} rotate={24} className="-bottom-24 -left-24 w-80" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[0.8fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-16 lg:gap-y-0">
        <div className="lg:self-end">
          <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance md:text-6xl">
            Based in St. Albans. Road trips welcome.
          </h2>
          <p className="mt-6 max-w-[46ch] text-lg leading-relaxed text-muted">
            Most weeks the crew is working somewhere between Swanton and Shelburne. Camps, rentals and family homes farther out? Joe has driven to plenty of them.
          </p>
        </div>

        <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-[linear-gradient(160deg,var(--sky-top),var(--sky-mid)_45%,var(--bg))] shadow-soft">
            <svg
              viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
              className="block h-auto w-full [mask-image:radial-gradient(120%_110%_at_35%_42%,black_62%,transparent_100%)]"
              role="img"
              aria-label="Map of northern Vermont. JC Crew is based in St. Albans, works regularly across Franklin and Chittenden counties, and travels to towns across the state."
            >
              <defs>
                <radialGradient id="glow" cx={GLOW.x} cy={GLOW.y} r={GLOW.r} gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="var(--sun)" stopOpacity="0.55" />
                  <stop offset="0.45" stopColor="var(--sun)" stopOpacity="0.18" />
                  <stop offset="1" stopColor="var(--sun)" stopOpacity="0" />
                </radialGradient>
                <pattern id="waves" width="10" height="6" patternUnits="userSpaceOnUse">
                  <path d="M0 3 Q2.5 1.5 5 3 T10 3" fill="none" stroke="#ffffff" strokeOpacity="0.55" strokeWidth="0.5" />
                </pattern>
              </defs>

              {/* Neighbors past the edges, so the map reads as open, not fenced in. */}
              <text x={250} y={16} textAnchor="middle" className="fill-muted text-[5px] font-semibold" style={{ letterSpacing: "0.4em" }} opacity={0.6}>
                QUÉBEC
              </text>
              <text x={58} y={250} className="fill-muted text-[5px] font-semibold" transform="rotate(-90 58 250)" style={{ letterSpacing: "0.4em" }} opacity={0.6}>
                NEW YORK
              </text>

              {/* State, county by county. Nothing outside the home counties is dimmed out. */}
              {map.counties.map((c) => (
                <path
                  key={c.id}
                  d={c.d}
                  fill={HOME_COUNTIES.includes(c.name) ? "#c9ddc6" : "#e1e9de"}
                  stroke="#ffffff"
                  strokeWidth={0.9}
                />
              ))}

              <circle cx={GLOW.x} cy={GLOW.y} r={GLOW.r} fill="url(#glow)" />

              <path d={map.lake} fill="#a9cbdb" />
              <path d={map.lake} fill="url(#waves)" />
              <text x={72} y={300} className="fill-white text-[6px] font-semibold italic" transform="rotate(-80 72 300)" style={{ letterSpacing: "0.3em" }}>
                LAKE CHAMPLAIN
              </text>

              {/* Green Mountain peaks */}
              {map.peaks.map((p) => (
                <g key={p.name}>
                  <path
                    d={`M${p.xy[0] - 7} ${p.xy[1] + 5} L${p.xy[0] - 1.5} ${p.xy[1] - 6} L${p.xy[0] + 1} ${p.xy[1] - 3} L${p.xy[0] + 3} ${p.xy[1] - 5} L${p.xy[0] + 8} ${p.xy[1] + 5} Z`}
                    fill="var(--ridge-mid)"
                  />
                  <path d={`M${p.xy[0] - 3.2} ${p.xy[1] - 2} L${p.xy[0] - 1.5} ${p.xy[1] - 6} L${p.xy[0]} ${p.xy[1] - 3.5}`} fill="#ffffff" opacity="0.9" />
                  <text x={p.xy[0]} y={p.xy[1] + 10} textAnchor="middle" className="fill-muted text-[5.5px] font-semibold uppercase sm:text-[4px]" style={{ letterSpacing: "0.12em" }}>
                    {p.name}
                  </text>
                </g>
              ))}

              {/* Road-trip arcs out to the farther towns */}
              {map.beyond.filter((t) => ROAD_TRIPS.includes(t.name)).map((t, i) => (
                <motion.path
                  key={t.name}
                  d={arc(HQ.xy, t.xy)}
                  fill="none"
                  stroke="var(--forest)"
                  strokeWidth={active === t.name ? 1.2 : 0.7}
                  strokeDasharray="2 2"
                  strokeLinecap="round"
                  opacity={active && active !== t.name ? 0.25 : 0.7}
                  {...draw(0.6 + i * 0.08)}
                />
              ))}

              {map.beyond.map((t, i) => (
                <motion.g key={t.name} style={{ transformOrigin: `${t.xy[0]}px ${t.xy[1]}px` }} {...pop(1.2 + i * 0.06)}>
                  <circle
                    cx={t.xy[0]}
                    cy={t.xy[1]}
                    r={(active === t.name ? 3.4 : 2.4) * k}
                    fill="var(--bg)"
                    stroke="var(--forest)"
                    strokeWidth={1.2}
                    onMouseEnter={() => setActive(t.name)}
                    onMouseLeave={() => setActive(null)}
                    className="cursor-default transition-all"
                  />
                </motion.g>
              ))}

              {map.core.map((t, i) => (
                <motion.g key={t.name} style={{ transformOrigin: `${t.xy[0]}px ${t.xy[1]}px` }} {...pop(0.2 + i * 0.04)}>
                  <circle
                    cx={t.xy[0]}
                    cy={t.xy[1]}
                    r={(active === t.name ? 3.6 : 2.6) * k}
                    fill="var(--sun)"
                    stroke="var(--forest)"
                    strokeWidth={1.1}
                    onMouseEnter={() => setActive(t.name)}
                    onMouseLeave={() => setActive(null)}
                    className="cursor-default transition-all"
                  />
                </motion.g>
              ))}

              {/* HQ pin */}
              <g>
                {!reduce && (
                  <circle cx={HQ.xy[0]} cy={HQ.xy[1]} r="5" fill="none" stroke="var(--forest)" strokeWidth="1">
                    <animate attributeName="r" values="5;14" dur="2.4s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0" dur="2.4s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle cx={HQ.xy[0]} cy={HQ.xy[1]} r={4.6 * k} fill="var(--forest)" stroke="#ffffff" strokeWidth="1.4" />
                <text
                  x={HQ.xy[0] + 8}
                  y={HQ.xy[1] - 9}
                  className="fill-forest text-[8px] font-bold sm:text-[6px]"
                  style={{ paintOrder: "stroke", stroke: "var(--bg)", strokeWidth: 2, strokeLinejoin: "round" }}
                >
                  Joe&apos;s HQ, St. Albans
                </text>
              </g>

              {all.map((t) => {
                const pos = labelPos[t.name];
                const muted = !map.core.includes(t);
                if (pos) return <Label key={t.name} name={t.name} xy={t.xy} pos={pos} muted={muted} show={!active || active === t.name} />;
                return <Label key={t.name} name={t.name} xy={t.xy} pos="t" muted={muted} show={active === t.name} />;
              })}

              <text x={VIEW.x + VIEW.w - 22} y={VIEW.y + VIEW.h - 26} className="fill-muted text-[5px] italic" textAnchor="end">
                and the rest of Vermont
              </text>
              <path
                d={`M${VIEW.x + VIEW.w - 20} ${VIEW.y + VIEW.h - 27.5} l8 8 m0 0 l-4 0 m4 0 l0 -4`}
                stroke="var(--muted)"
                strokeWidth="0.8"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {/* Whole-state inset so you can see where you are */}
            <div className="absolute bottom-4 left-4 hidden w-14 rounded-xl sm:block border border-white/70 bg-white/70 p-1.5 backdrop-blur-sm md:w-20">
              <svg viewBox={map.viewBox} className="block h-auto w-full" aria-hidden>
                {map.counties.map((c) => (
                  <path key={c.id} d={c.d} fill={HOME_COUNTIES.includes(c.name) ? "var(--forest)" : "#c9d6c6"} stroke="#ffffff" strokeWidth={6} />
                ))}
                <rect x={VIEW.x} y={VIEW.y} width={VIEW.w} height={VIEW.h} fill="none" stroke="var(--ink)" strokeWidth={10} rx={12} />
              </svg>
            </div>
          </div>
          <p className="mt-3 text-right text-xs text-muted">Boundaries: US Census. Lake: Natural Earth. Towns: OpenStreetMap.</p>
        </div>
        <div className="lg:col-start-1 lg:row-start-2">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm lg:mt-8">
            <span className="inline-flex items-center gap-2">
              <span className="size-3 rounded-full bg-sun ring-2 ring-forest" /> Regular routes
            </span>
            <span className="inline-flex items-center gap-2 text-muted">
              <span className="size-3 rounded-full border-2 border-forest bg-bg" /> We travel here too
            </span>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2" onMouseLeave={() => setActive(null)}>
            {all.map((t) => {
              const core = map.core.includes(t);
              return (
                <li key={t.name}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(t.name)}
                    onFocus={() => setActive(t.name)}
                    onBlur={() => setActive(null)}
                    className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                      active === t.name
                        ? "border-forest bg-forest text-on-forest"
                        : core
                          ? "border-line bg-surface hover:border-forest"
                          : "border-dashed border-ink/20 text-muted hover:border-forest"
                    }`}
                  >
                    {t.name}
                  </button>
                </li>
              );
            })}
          </ul>

          <a href={site.phoneHref} className="mt-8 inline-flex items-center gap-2 font-semibold text-forest underline-offset-4 hover:underline">
            <Phone weight="fill" className="size-4" />
            Not on the map? Call anyway.
          </a>
        </div>

      </div>
    </section>
  );
}
