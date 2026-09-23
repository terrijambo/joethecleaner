import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { Credentials } from "@/components/Credentials";
import { ReviewCard, reviews, featured } from "@/components/Reviews";
import { Reveal } from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reviews",
  description: `Rated ${site.rating} on Google, 5.0 on Angi and 4.9 on HomeAdvisor. Read what Vermont homeowners say about Joe The Cleaner.`,
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  const all = [featured, ...reviews];
  return (
    <>
      <PageHeader
        art={["clover", "birch"]}
        title="What the"
        accent="neighbors say."
        lede="Real reviews from Google, Angi and HomeAdvisor. Names shortened, words untouched."
      />
      <div className="mt-12">
        <Credentials />
      </div>
      <div className="mx-auto max-w-7xl columns-1 gap-4 px-4 py-20 sm:columns-2 md:px-8 md:py-28 lg:columns-3">
        {all.map((r, i) => (
          <Reveal key={r.name} delay={(i % 3) * 0.05} className="mb-4 break-inside-avoid [&_figure]:w-full [&_blockquote]:line-clamp-none">
            <ReviewCard r={r} />
          </Reveal>
        ))}
      </div>
    </>
  );
}
