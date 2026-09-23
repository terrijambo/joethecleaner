import Link from "next/link";
import { Phone, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { site } from "@/lib/site";

const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sun";

// One label per intent across the page: "Get a free quote" and "Call Joe".
export function QuoteButton({ size = "md", className = "" }: { size?: "md" | "lg"; className?: string }) {
  const lg = size === "lg";
  return (
    <Link
      href="/contact"
      className={`btn-joe group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-sun font-semibold text-on-sun shadow-[inset_0_-3px_0_rgb(0_0_0/0.12)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[inset_0_-3px_0_rgb(0_0_0/0.12),0_14px_30px_-12px_rgb(243_194_51/0.9)] active:translate-y-0 active:scale-[0.98] ${
        lg ? "h-14 pr-2 pl-7 text-base" : "h-11 pr-1.5 pl-5 text-sm"
      } ${focus} ${className}`}
    >
      Get a free quote
      <span
        className={`bubble grid place-items-center rounded-full bg-forest text-sun ${lg ? "size-10" : "size-8"}`}
        aria-hidden
      >
        <ArrowRight weight="bold" className={lg ? "size-4" : "size-3.5"} />
      </span>
    </Link>
  );
}

export function CallButton({
  size = "md",
  tone = "light",
  className = "",
}: {
  size?: "md" | "lg";
  tone?: "light" | "dark";
  className?: string;
}) {
  const lg = size === "lg";
  const t =
    tone === "dark"
      ? "border-white/35 text-white hover:bg-white/10"
      : "border-ink/15 text-ink hover:border-ink/40 hover:bg-ink/[0.04]";
  return (
    <a
      href={site.phoneHref}
      className={`btn-ring inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border font-semibold transition-colors duration-300 active:scale-[0.98] ${
        lg ? "h-14 px-7 text-base" : "h-11 px-5 text-sm"
      } ${t} ${focus} ${className}`}
    >
      <Phone weight="fill" className="ring-icon size-4 text-forest dark:text-sun" />
      Call Joe {site.phone}
    </a>
  );
}
