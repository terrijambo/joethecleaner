import Image from "next/image";
import { Check } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "./Reveal";
import { QuoteButton } from "./Buttons";
import { Plate } from "./Plate";

// Checklists merge the old site's scope with what reviewers say the crew actually did.
export const services = [
  {
    slug: "deep-cleaning",
    title: "Deep cleaning",
    lede: "The top-to-bottom reset. For spring, for a new baby, for a parent coming home, or because it's just been a while.",
    img: "/images/fb-481.jpg",
    alt: "Glass cooktop wiped spotless",
    items: ["Baseboards, blinds and door frames", "Inside the oven, fridge and microwave", "Scrubbed tile, grout and fixtures", "Carpet shampooing", "High dusting: fans, lights, corners", "The spots behind and under things"],
  },
  {
    slug: "recurring",
    title: "Recurring cleaning",
    lede: "Weekly, biweekly or monthly. Same crew, same checklist, so you stop thinking about it.",
    img: "/images/fb-975.jpg",
    alt: "Tidy living room with a blue sectional",
    items: ["Dusting and wiping every surface", "Vacuuming and mopping throughout", "Bathrooms sanitized", "Kitchen counters, sink and appliance fronts", "Beds made, trash out", "Flexible if you need to skip or swap"],
  },
  {
    slug: "move-in-out",
    title: "Move in and move out",
    lede: "Hand the keys over clean, or walk into a place that's actually ready. Landlords and property managers welcome.",
    img: "/images/fb-260.jpg",
    alt: "Empty room with gleaming floors after a move-out clean",
    items: ["Inside every cabinet and drawer", "Closets and shelving", "Appliances inside and out", "Windowsills and tracks", "Detailed spot cleaning on walls", "Rental and Airbnb turnovers"],
  },
  {
    slug: "commercial",
    title: "Offices and commercial",
    lede: "Offices, retail floors, locker rooms and break rooms, cleaned around your hours so nobody trips over a mop.",
    img: "/images/fb-12.jpg",
    alt: "Freshly cleaned office break room",
    items: ["Workspaces and conference rooms", "Restrooms and locker rooms", "Hard floor scrubbing and care", "Break rooms and kitchens", "Trash and recycling", "After-hours scheduling"],
  },
  {
    slug: "post-construction",
    title: "Post-construction",
    lede: "Renovation's done. The dust isn't. We get it off every surface before you move furniture back in.",
    img: "/images/fb-1043.jpg",
    alt: "Two crew members sweeping up after a renovation",
    items: ["Fine drywall dust, top to bottom", "Paint and adhesive spots", "Debris hauled to the curb", "Window and track detailing", "Floors vacuumed and washed", "Fixtures and vents wiped out"],
  },
  {
    slug: "heavy-duty",
    title: "Heavy-duty and sensitive jobs",
    lede: "Hoarding situations, a loved one's home after a hospital stay, estate cleanouts. Handled quietly and with respect.",
    img: "/images/fb-683.jpg",
    alt: "Crew member scrubbing kitchen cabinets",
    items: ["Clutter sorted with you, not for you", "Heavy grime and pet mess", "Sanitizing for health and safety", "Photo updates if you can't be there", "Fast turnaround when it matters", "No judgment, ever"],
  },
];

export function ServiceDetails() {
  return (
    <div className="relative isolate mx-auto grid max-w-7xl gap-6 px-4 py-20 md:px-8 md:py-28">
      <Plate name="pine" desktopOnly opacity={0.22} rotate={-20} className="top-[20%] -left-44 w-80" />
      <Plate name="birch" desktopOnly opacity={0.22} rotate={25} className="top-[55%] -right-44 w-80" />
      {services.map((s, i) => (
        <Reveal key={s.slug}>
          <article
            id={s.slug}
            className="grid scroll-mt-24 overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface md:grid-cols-2"
          >
            <div className={`relative aspect-[4/3] md:aspect-auto md:min-h-[28rem] ${i % 2 ? "md:order-2" : ""}`}>
              <Image src={s.img} alt={s.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-center p-7 md:p-12">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">{s.title}</h2>
              <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted">{s.lede}</p>
              <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-start gap-2.5 text-sm leading-snug">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-forest text-sun">
                      <Check weight="bold" className="size-3" />
                    </span>
                    {it}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <QuoteButton />
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}
