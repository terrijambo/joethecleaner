import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { VideoFacade } from "./VideoFacade";

// Process pulled straight from what reviewers describe, not a template.
const steps = [
  {
    verb: "Walk it",
    body: "Joe comes out, walks the place with you and sees exactly what you see. No pressure.",
  },
  {
    verb: "Quote it",
    body: "You get a price for what you actually need. Not a range, not a surprise on the invoice.",
  },
  {
    verb: "Clean it",
    body: "The crew shows up on time with their own supplies and equipment, and works until it's done.",
  },
  {
    verb: "Show you",
    body: "Before and after photos land in your phone. Out of state? You'll still see every room.",
  },
];

export function MeetJoe() {
  return (
    <section className="bg-surface">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[0.8fr_1fr] lg:gap-20">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <VideoFacade id={site.youtubeId} poster="/images/joe-ad.jpg" title="Joe The Cleaner intro" />
        </Reveal>

        <div>
          <Reveal>
            <p className="text-sm font-semibold tracking-[0.14em] text-forest uppercase dark:text-sun">Meet Joe</p>
            <h2 className="mt-4 font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance md:text-6xl">
              The owner shows up before the mop does.
            </h2>
            <p className="mt-6 max-w-[55ch] text-lg leading-relaxed text-muted">
              Joe runs JC Crew out of St. Albans and still walks every quote himself. Half his reviews mention him by name.
              The other half mention his crew.
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.verb} delay={i * 0.06} className="bg-bg">
                <li className="flex h-full flex-col gap-3 p-6 md:p-7">
                  <span className="font-display text-2xl font-bold tracking-tight">{s.verb}</span>
                  <span className="leading-relaxed text-muted">{s.body}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
