import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { CrewGallery } from "@/components/CrewGallery";
import { Grit } from "@/components/Grit";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Real before and after photos from JC Crew cleaning jobs across northern Vermont. No stock photos.",
  alternates: { canonical: "/our-work" },
};

export default function OurWorkPage() {
  return (
    <>
      <PageHeader
        art={["pine", "maple"]}
        title="The proof is in the"
        accent="photos."
        lede="Joe has posted over 1,200 job photos. Here are some favorites, straight off the phone."
        img="/images/fb-350.jpg"
        alt="Lake camp great room with freshly polished wood floors"
        position="50% 60%"
      />
      <Grit />
      <CrewGallery />
    </>
  );
}
