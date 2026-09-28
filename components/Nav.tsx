"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { List, X, Phone } from "@phosphor-icons/react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { site } from "@/lib/site";
import { QuoteButton } from "./Buttons";

const links = [
  { href: "/services", label: "Services" },
  { href: "/our-work", label: "Our work" },
  { href: "/about", label: "Meet Joe" },
  { href: "/reviews", label: "Reviews" },
  { href: "/service-area", label: "Service area" },
];

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Joe The Cleaner home">
      <Image
        src="/images/joe-logo.webp"
        alt=""
        width={444}
        height={320}
        priority
        className="h-11 w-auto transition-transform duration-500 group-hover:rotate-[-4deg] md:h-12"
      />
      <span className="font-display text-[1.15rem] font-bold whitespace-nowrap leading-none tracking-tight">
        Joe The Cleaner
      </span>
    </Link>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    const next = v > 40;
    if (next !== scrolled) setScrolled(next);
  });
  // Transparent at the top so the hero sky runs behind it; frosted once you scroll.
  const clear = !scrolled && !open;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-500 ${
        clear ? "border-transparent bg-transparent" : "border-line/70 bg-bg/85 backdrop-blur-md"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-[4.5rem] md:px-8">
        <Wordmark />
        <ul className="hidden items-center gap-8 text-sm font-medium text-muted lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="transition-colors hover:text-ink aria-[current=page]:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors hover:bg-ink/5 md:inline-flex"
          >
            <Phone weight="bold" className="size-4 text-forest" />
            {site.phone}
          </a>
          <div className="hidden sm:block">
            <QuoteButton />
          </div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid size-11 place-items-center rounded-full border border-ink/15 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="size-5" weight="bold" /> : <List className="size-5" weight="bold" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 flex flex-col gap-2 bg-bg px-4 pt-6 pb-10 lg:hidden"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-line py-4 font-display text-3xl font-semibold tracking-tight"
              >
                {l.label}
              </Link>
            ))}
            <div className="mt-auto grid gap-3">
              <a
                href={site.phoneHref}
                className="flex h-14 items-center justify-center gap-2 rounded-full border border-ink/15 font-semibold"
              >
                <Phone weight="bold" className="size-4" /> Call Joe {site.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex h-14 items-center justify-center rounded-full bg-sun font-semibold text-on-sun"
              >
                Get a free quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
