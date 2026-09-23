import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ServiceDetails } from "@/components/ServiceDetails";
import { Faq } from "@/components/Faq";
import { QuoteButton, CallButton } from "@/components/Buttons";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Deep cleaning, recurring house cleaning, move in/out, office and commercial, post-construction and heavy-duty cleanups across Franklin and Chittenden counties, Vermont.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Six ways we"
        accent="clean."
        lede="From a weekly tidy to the house nobody else would take. Every job starts with a free quote."
      >
        <QuoteButton size="lg" />
        <CallButton size="lg" />
      </PageHeader>
      <ServiceDetails />
      <Faq />
    </>
  );
}
