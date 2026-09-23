import { Star, ShieldCheck, MapPinLine, Translate, Camera } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { Plate } from "./Plate";

// Claims sourced from Joe's Angi/HomeAdvisor profiles, YouTube description and reviews.
const badges = [
  { icon: ShieldCheck, text: "Bonded and insured" },
  { icon: MapPinLine, text: "Minority-owned, 100% Vermont local" },
  { icon: Camera, text: "Before and after photos on every job" },
  { icon: Translate, text: "Se habla español" },
];

export function Credentials() {
  return (
    <section aria-label="Ratings and credentials" className="relative isolate overflow-hidden border-b border-line">
      <Plate name="clover" desktopOnly opacity={0.55} rotate={-14} sway className="right-[4%] -bottom-10 w-24" />
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-14">
        <ul className="grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 md:grid-cols-4">
          {site.listings.map((l) => (
            <li key={l.name}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-2 text-muted transition-colors hover:text-ink"
                aria-label={l.rating ? `${l.name}: ${l.rating} stars from ${l.count} reviews` : `${l.name} page`}
              >
                <span
                  className={`logo-mask block h-7 ${l.name === "Angi" ? "w-20" : "w-7"}`}
                  style={{ ["--logo" as string]: `url(${l.logo})` }}
                />
                {l.rating ? (
                  <span className="flex items-center gap-1 text-sm font-semibold text-ink">
                    <Star weight="fill" className="size-3.5 text-sun" />
                    {l.rating.toFixed(1)}
                    <span className="font-normal text-muted">({l.count})</span>
                  </span>
                ) : (
                  <span className="text-sm font-semibold text-ink">1,200+ job photos</span>
                )}
              </a>
            </li>
          ))}
        </ul>

        <ul className="mt-10 flex flex-wrap justify-center gap-2.5">
          {badges.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium"
            >
              <Icon weight="duotone" className="size-4.5 text-forest dark:text-sun" />
              {text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
