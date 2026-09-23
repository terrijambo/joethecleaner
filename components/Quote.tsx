import Link from "next/link";
import { CalendarCheck, Phone, EnvelopeSimple, Clock } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { GhlEmbed } from "./GhlEmbed";
import { Plate } from "./Plate";

export function Quote() {
  return (
    <section id="quote" className="relative isolate mx-auto max-w-7xl scroll-mt-24 px-4 pt-14 pb-20 md:px-8 md:pt-20 md:pb-28">
      <Plate name="clover" desktopOnly opacity={0.55} rotate={-10} sway className="bottom-10 left-[30%] w-24" />
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
        <Reveal>
          <h1 className="display-xl text-[2.6rem] leading-[0.92] md:text-6xl">
            Get a free <span className="text-forest dark:text-sun">quote.</span>
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-muted">
            Answer a few quick questions and Joe gets back to you fast. Want him to see it first? Book a walkthrough.
          </p>

          <ul className="mt-10 grid gap-5">
            <li>
              <a href={site.phoneHref} className="group flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-forest text-sun">
                  <Phone weight="fill" className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Call or text</span>
                  <span className="font-display text-xl font-bold group-hover:underline">{site.phone}</span>
                </span>
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="group flex items-center gap-4">
                <span className="grid size-12 place-items-center rounded-full bg-forest text-sun">
                  <EnvelopeSimple weight="fill" className="size-5" />
                </span>
                <span>
                  <span className="block text-sm text-muted">Email</span>
                  <span className="font-semibold group-hover:underline">{site.email}</span>
                </span>
              </a>
            </li>
            <li className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-full bg-forest text-sun">
                <Clock weight="fill" className="size-5" />
              </span>
              <span>
                <span className="block text-sm text-muted">Hours</span>
                <span className="font-semibold">{site.hours}</span>
              </span>
            </li>
          </ul>

          <Link
            href="/book"
            className="mt-10 inline-flex items-center gap-3 rounded-[var(--radius-card)] border border-line bg-surface p-5 transition-colors hover:border-forest"
          >
            <CalendarCheck weight="duotone" className="size-8 text-forest dark:text-sun" />
            <span>
              <span className="block font-semibold">Book a walkthrough</span>
              <span className="text-sm text-muted">Pick a time and Joe comes to you.</span>
            </span>
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[var(--radius-card)] border border-line bg-white p-3 shadow-soft md:p-5">
            <GhlEmbed src={site.ghl.quoteSurvey} id="7SPePpoJUaaNw5uMSTiW" title="Cleaning quote form" minHeight={620} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
