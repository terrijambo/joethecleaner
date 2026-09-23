import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { MeetJoe } from "@/components/MeetJoe";
import { Proof } from "@/components/Proof";
import { Credentials } from "@/components/Credentials";

export const metadata: Metadata = {
  title: "Meet Joe",
  description:
    "Joe The Cleaner (JC Crew) is a minority-owned, bonded and insured cleaning company based in St. Albans, Vermont. Joe walks every job himself.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="A local crew with a"
        accent="real name on it."
        lede="Minority-owned and 100% Vermont. When you call, Joe answers. When you book, Joe walks it with you."
        img="/images/fb-1010.jpg"
        alt="Two JC Crew members mopping a checkerboard kitchen floor"
        position="50% 45%"
      />
      <div className="mt-20 md:mt-28">
        <Proof />
      </div>
      <MeetJoe />
      <Credentials />
    </>
  );
}
