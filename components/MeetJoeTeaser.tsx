import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { VideoFacade } from "./VideoFacade";
import { Plate } from "./Plate";

export function MeetJoeTeaser() {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <Plate name="maple" opacity={0.22} rotate={-28} className="-top-20 -right-24 w-72 md:w-96" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:gap-20">
        <Reveal className="mx-auto w-full max-w-md">
          <VideoFacade id={site.youtubeId} poster="/images/joe-ad.jpg" title="Joe The Cleaner intro" />
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance md:text-6xl">
            The owner shows up before the mop does.
          </h2>
          <p className="mt-6 max-w-[48ch] text-lg leading-relaxed text-muted">
            Joe walks every job himself, prices exactly what you need, and sends the photos when his crew is done. Half his reviews mention him by name.
          </p>
          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 font-semibold text-forest dark:text-sun"
          >
            How Joe works
            <ArrowRight weight="bold" className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
