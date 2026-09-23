import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { VermontMap } from "@/components/VermontMap";
import { VermontPlaces } from "@/components/VermontPlaces";
import { towns } from "@/lib/site";

export const metadata: Metadata = {
  title: "Service Area",
  description: `House and office cleaning in ${towns.slice(0, 8).join(", ")} and across Vermont. Based in St. Albans.`,
  alternates: { canonical: "/service-area" },
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHeader
        art={["pine", "birch"]}
        title="Based in St. Albans."
        accent="Cleaning all over Vermont."
        lede="Regular routes run from Swanton down to Shelburne. Lake camp in the Islands or a rental turnover down south? Call and ask."
        img="/images/hero-lake.jpg"
        alt="Lake Champlain and the Adirondacks through the windows of a home JC Crew cleaned"
        position="50% 32%"
      />
      <VermontMap />
      <VermontPlaces />
    </>
  );
}
