import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { GhlEmbed } from "@/components/GhlEmbed";
import { site } from "@/lib/site";

// Same slug as the old site so existing links and bookmarks keep working.
export const metadata: Metadata = {
  title: "Book a Walkthrough",
  description: "Pick a time for Joe to walk through your home or office and give you an exact cleaning quote.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <PageHeader
        art={["clover", "maple"]}
        title="Book a"
        accent="walkthrough."
        lede="Pick a day and time. Joe comes out, sees the space and gives you an exact price."
      />
      <div className="mx-auto max-w-4xl px-4 py-14 md:px-8 md:py-20">
        <div className="rounded-[var(--radius-card)] border border-line bg-white p-3 shadow-soft md:p-6">
          <GhlEmbed src={site.ghl.bookingWidget} id="QOEsaeJXNmlnxp4JY5lg_booking" title="Walkthrough booking calendar" minHeight={760} />
        </div>
      </div>
    </>
  );
}
