import { Star, GoogleLogo } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";
import { Reveal } from "./Reveal";
import { Plate } from "./Plate";

// Verbatim excerpts from public Google, Angi and HomeAdvisor reviews (light trims only).
export const featured = {
  quote:
    "Joe was incredibly accommodating when we needed my Mom's place cleaned after her hospital stay so she could safely come home. He sent pictures of before and after and kept us updated the whole time.",
  name: "Cheri L.",
  context: "Google review",
};

export const reviews = [
  { quote: "Joe and his son did an excellent and thorough deep cleaning of my 90 year old mom's house which needed it badly.", name: "Paul G.", context: "Deep clean" },
  { quote: "I wish I had taken before pictures of the mess we left Joe and his crew, because this place is sparkling top to bottom!", name: "Christopher M.", context: "Two dogs, one very hairy house" },
  { quote: "They left every corner, every nook and cranny, spotless and shining.", name: "Michael F.", context: "3-bedroom condo" },
  { quote: "The crew was amazing and worked a difficult post construction cleaning. They got it done and went above and beyond for us.", name: "Sara C.", context: "Post-construction" },
  { quote: "Joe responds quickly, conducts a thorough walk through with you to price out exactly what you need, and brings his own crew and cleaning supplies.", name: "Nikodimos G.", context: "Home deep clean" },
  { quote: "Great and very kind crew! They even were quiet while our infant napped! He didn't wake up.", name: "Zachariah W.", context: "Angi review" },
  { quote: "Since I was out of state, Joe sent me lots of before and after pictures, and Joe is super honest and fair.", name: "James G.", context: "Cleaned while away" },
  { quote: "Took my call last minute on a clean I needed for a vacation rental turn. Drove way outside of his normal service area.", name: "Rae W.", context: "HomeAdvisor review" },
  { quote: "We needed a deep cleaning of our downstairs because we have three dogs. JC Crew did an outstanding job.", name: "Susan T.", context: "Pet cleanup" },
  { quote: "Not many people enjoy what they do for work, but Joe does. He likes helping people.", name: "Robert C.", context: "Home and commercial" },
  { quote: "We tried the service once with a coupon and absolutely loved it, so now setting up recurring monthly cleaning.", name: "Botur K.", context: "Condo, now monthly" },
  { quote: "Joe and his crew have been cleaning for us for about a year. Great group. Hardworking and excellent communicators.", name: "Cristiana F.", context: "Recurring clean" },
];

export function ReviewCard({ r }: { r: (typeof reviews)[number] }) {
  return (
    <figure className="flex h-full w-[20rem] shrink-0 flex-col justify-between gap-6 rounded-[var(--radius-card)] border border-line bg-surface p-6 md:w-[24rem]">
      <div>
        <div className="flex text-sun" aria-label="5 stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} weight="fill" className="size-4" />
          ))}
        </div>
        <blockquote className="mt-4 line-clamp-4 leading-relaxed">&ldquo;{r.quote}&rdquo;</blockquote>
      </div>
      <figcaption className="text-sm">
        <span className="font-semibold">{r.name}</span>
        <span className="text-muted"> / {r.context}</span>
      </figcaption>
    </figure>
  );
}

export function Reviews() {
  const half = Math.ceil(reviews.length / 2);
  const rows = [reviews.slice(0, half), reviews.slice(half)];

  return (
    <section className="relative isolate overflow-hidden py-20 md:py-28">
      <Plate name="clover" desktopOnly opacity={0.5} rotate={16} sway className="top-16 left-[6%] w-28" />
      <Plate name="birch" desktopOnly opacity={0.2} rotate={200} className="-top-24 right-[-6rem] w-72" />
      <div className="mx-auto max-w-5xl px-4 text-center md:px-8">
        <Reveal>
          <p className="text-sm font-semibold tracking-[0.14em] text-forest uppercase dark:text-sun">
            {site.rating} stars / {site.reviewCount} Google reviews
          </p>
          <blockquote className="mt-6 font-display text-[1.45rem] leading-[1.2] font-semibold tracking-tight text-balance sm:text-3xl md:text-5xl md:leading-[1.15]">
            &ldquo;{featured.quote}&rdquo;
          </blockquote>
          <p className="mt-6 text-muted">
            <span className="font-semibold text-ink">{featured.name}</span> / {featured.context}
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        {rows.map((row, i) => (
          <div key={i} className="flex overflow-hidden">
            <div
              className="marquee-track flex gap-4 pr-4"
              style={i === 1 ? { animationDirection: "reverse", animationDuration: "70s" } : undefined}
            >
              {[...row, ...row].map((r, j) => (
                <div key={`${r.name}-${j}`} aria-hidden={j >= row.length}>
                  <ReviewCard r={r} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <a
          href={site.googleReviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-forest underline-offset-4 hover:underline dark:text-sun"
        >
          <GoogleLogo weight="bold" className="size-5" />
          Read every review on Google
        </a>
      </div>
    </section>
  );
}
