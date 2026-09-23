import Image from "next/image";
import type { CSSProperties } from "react";

// Public-domain natural history plates (Michaux's North American Sylva, Audubon, Lindman),
// cut out and scattered behind sections. Drop it inside a `relative isolate` parent.
const art = {
  maple: { src: "/art/maple.webp", w: 900, h: 1281 },
  pine: { src: "/art/pine.webp", w: 900, h: 1247 },
  birch: { src: "/art/birch.webp", w: 900, h: 1334 },
  thrush: { src: "/art/thrush.webp", w: 800, h: 703 },
  clover: { src: "/art/clover.webp", w: 388, h: 596 },
} as const;

export type PlateName = keyof typeof art;

export function Plate({
  name,
  className = "",
  style,
  opacity = 0.35,
  rotate = 0,
  sway = false,
  drift = true,
  desktopOnly = false,
  layer = "-z-10",
  eager = false,
}: {
  name: PlateName;
  className?: string;
  style?: CSSProperties;
  opacity?: number;
  rotate?: number;
  sway?: boolean;
  drift?: boolean;
  desktopOnly?: boolean;
  layer?: string;
  eager?: boolean;
}) {
  const a = art[name];
  return (
    <div
      aria-hidden
      className={`plate pointer-events-none absolute ${layer} select-none ${drift ? "plate--drift" : ""} ${desktopOnly ? "hidden md:block" : ""} ${className}`}
      style={{ opacity, rotate: `${rotate}deg`, ...style }}
    >
      <Image
        src={a.src}
        alt=""
        width={a.w}
        height={a.h}
        sizes="(min-width:768px) 30vw, 50vw"
        loading={eager ? "eager" : "lazy"}
        className={`h-auto w-full ${sway ? "plate--sway" : ""}`}
      />
    </div>
  );
}
