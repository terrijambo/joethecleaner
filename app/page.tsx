import { Hero } from "@/components/Hero";
import { Credentials } from "@/components/Credentials";
import { Services } from "@/components/Services";
import { Proof } from "@/components/Proof";
import { VermontPlaces } from "@/components/VermontPlaces";
import { Reviews } from "@/components/Reviews";
import { MeetJoeTeaser } from "@/components/MeetJoeTeaser";
import { VermontMap } from "@/components/VermontMap";

export default function Home() {
  return (
    <>
      <Hero />
      <Credentials />
      <Services />
      <Proof />
      <VermontPlaces />
      <VermontMap />
      <MeetJoeTeaser />
      <Reviews />
    </>
  );
}
