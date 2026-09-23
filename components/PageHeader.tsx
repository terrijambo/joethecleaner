import Image from "next/image";
import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { Plate, type PlateName } from "./Plate";

// Symmetrical inner-page header: centered type on top, framed photo underneath (never behind the words).
export function PageHeader({
  title,
  accent,
  lede,
  img,
  alt,
  position = "50% 50%",
  children,
  art = ["maple", "birch"],
}: {
  title: string;
  accent?: string;
  lede: string;
  img?: string;
  alt?: string;
  position?: string;
  children?: ReactNode;
  art?: [PlateName, PlateName];
}) {
  return (
    <header className="relative isolate mx-auto max-w-7xl px-4 pt-14 text-center md:px-8 md:pt-20">
      <Plate name={art[0]} eager desktopOnly sway drift={false} opacity={0.4} rotate={-18} className="-top-10 -left-24 w-56 lg:w-64" />
      <Plate name={art[1]} eager desktopOnly sway drift={false} opacity={0.35} rotate={20} className="-top-8 -right-24 w-52 lg:w-60" />
      <Reveal>
        <h1 className="display-xl mx-auto max-w-[16ch] text-[clamp(1.9rem,10vw,2.6rem)] leading-[0.92] sm:text-6xl lg:text-[4.75rem]">
          {title} {accent && <span className="text-forest dark:text-sun">{accent}</span>}
        </h1>
        <p className="mx-auto mt-6 max-w-[48ch] text-lg leading-relaxed text-muted md:text-xl">{lede}</p>
        {children && <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">{children}</div>}
      </Reveal>
      {img && (
        <Reveal delay={0.1} y={40}>
          <div className="relative mt-12 aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] shadow-soft sm:aspect-[21/9] md:mt-16">
            <Image src={img} alt={alt ?? ""} fill preload sizes="(min-width:1280px) 1216px, 100vw" className="object-cover" style={{ objectPosition: position }} />
          </div>
        </Reveal>
      )}
    </header>
  );
}
