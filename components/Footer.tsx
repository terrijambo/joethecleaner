import { FacebookLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { site, towns } from "@/lib/site";
import { Wordmark } from "./Nav";
import { QuoteButton, CallButton } from "./Buttons";
import { Mountains } from "./Mountains";
import { Plate } from "./Plate";

export function Footer() {
  return (
    <footer>
      <div className="relative isolate overflow-hidden bg-[linear-gradient(to_bottom,var(--bg),var(--sky-top)_40%,var(--sky-mid))]">
      <Plate name="thrush" sway drift={false} opacity={0.85} className="top-16 left-[4%] hidden w-44 xl:block" />
      <Plate name="clover" sway drift={false} opacity={0.7} rotate={12} className="top-24 right-[7%] hidden w-20 xl:block" />
      <div className="relative mx-auto max-w-7xl px-4 pt-20 text-center md:px-8 md:pt-28">
        <p className="display-xl mx-auto max-w-[18ch] text-4xl leading-[0.95] md:text-6xl">
          Ready for a house that feels <span className="text-forest dark:text-sun">brand new?</span>
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <QuoteButton size="lg" />
          <CallButton size="lg" className="bg-white/60 backdrop-blur-sm" />
        </div>
      </div>
      <Mountains className="-mt-2 h-44 md:h-72" />
      </div>

      <div>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
          <div>
            <Wordmark />
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted">
              {site.name}, doing business as {site.dba}. Minority-owned, bonded and insured. {site.city}, Vermont.
            </p>
            <div className="mt-5 flex gap-2">
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-ink/40"
              >
                <FacebookLogo weight="fill" className="size-5" />
              </a>
              <a
                href={`https://www.youtube.com/watch?v=${site.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:border-ink/40"
              >
                <YoutubeLogo weight="fill" className="size-5" />
              </a>
            </div>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Contact</p>
            <ul className="mt-4 grid gap-2 text-muted">
              <li><a className="hover:text-ink" href={site.phoneHref}>{site.phone}</a></li>
              <li><a className="hover:text-ink" href={`mailto:${site.email}`}>{site.email}</a></li>
              <li>{site.hours}</li>
            </ul>
          </div>
          <div className="text-sm">
            <p className="font-semibold">Service area</p>
            <p className="mt-4 leading-relaxed text-muted">{towns.join(", ")} and beyond.</p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 pb-10 text-xs text-muted md:px-8">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="mt-2">
            Art from Michaux&apos;s <i>North American Sylva</i> (1819), Audubon&apos;s <i>Birds of America</i> and Lindman&apos;s <i>Bilder ur Nordens Flora</i>. All public domain.
          </p>
        </div>
      </div>
    </footer>
  );
}
