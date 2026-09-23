import { Plus } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Plate } from "./Plate";

const faqs = [
  {
    q: "How does pricing work?",
    a: "Start with the free quote form, or book an in-person walkthrough. Either way Joe gives you one price for exactly what you need. No hourly surprises.",
  },
  {
    q: "Do I need to be home?",
    a: "Nope. Plenty of clients are at work or out of state. Joe sends before and after photos so you see every room, and billing comes by email.",
  },
  {
    q: "Do you bring your own supplies?",
    a: "Yes. The crew shows up with every supply and piece of equipment the job needs, including for carpet shampooing.",
  },
  {
    q: "Are you insured?",
    a: "Yes. JC Crew is a local, bonded and insured Vermont business.",
  },
  {
    q: "We have pets. Is that a problem?",
    a: "Pet hair is half our reviews. Two dogs, three dogs, a very fluffy cat. We've got it.",
  },
  {
    q: "What if I need to reschedule?",
    a: `Call or text Joe at ${site.phone}. Life happens and he's flexible about it.`,
  },
  {
    q: "Do you clean offices and businesses?",
    a: "Yes. Offices, retail floors, locker rooms, break rooms and post-construction cleanups, on a schedule that works around your hours.",
  },
];

export function Faq() {
  return (
    <section className="relative isolate overflow-hidden bg-surface">
      <Plate name="maple" desktopOnly opacity={0.18} rotate={20} className="-bottom-28 -left-28 w-96" />
      <Plate name="thrush" opacity={0.7} sway drift={false} className="bottom-10 left-[6%] hidden w-48 lg:block" />
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-[0.7fr_1fr] lg:gap-16">
        <Reveal>
          <h2 className="font-display text-4xl leading-[1.02] font-bold tracking-tight md:text-6xl">Good questions.</h2>
          <p className="mt-5 max-w-[36ch] text-lg leading-relaxed text-muted">
            Anything else, just call Joe. He picks up.
          </p>
        </Reveal>
        <div className="grid gap-3">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.04}>
              <details className="group rounded-[var(--radius-card)] border border-line bg-bg px-6 open:pb-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus
                    weight="bold"
                    className="size-5 shrink-0 text-forest transition-transform duration-300 group-open:rotate-45 dark:text-sun"
                  />
                </summary>
                <p className="max-w-[60ch] leading-relaxed text-muted">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
