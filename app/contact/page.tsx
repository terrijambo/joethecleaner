import type { Metadata } from "next";
import { Quote } from "@/components/Quote";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Get a Free Quote",
  description: "Get a free cleaning quote from Joe The Cleaner, or call (802) 441-6618. Serving St. Albans, Burlington and northern Vermont.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Quote />
      <Faq />
    </>
  );
}
