import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import { site, towns } from "@/lib/site";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import "./globals.css";

// Archivo's width axis gives us the expanded, sign-painted display cut.
const display = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["wdth"],
});

const body = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Joe The Cleaner | House & Office Cleaning in St. Albans & Northern Vermont",
    template: "%s | Joe The Cleaner",
  },
  description:
    "Deep cleaning, move in/out, recurring and commercial cleaning across Franklin and Chittenden counties. Rated 4.8 on Google. Free quotes from Joe himself.",
  openGraph: {
    title: "Joe The Cleaner | Not your average Joe",
    description:
      "Deep cleaning, move in/out, recurring and commercial cleaning across northern Vermont, from St. Albans to Burlington.",
    url: site.url,
    siteName: site.name,
    images: [{ url: "/images/fb-1084.jpg", width: 1200, height: 1600 }],
    locale: "en_US",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#f2f4ee",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HouseCleaningService",
  name: site.name,
  alternateName: site.dba,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/images/fb-1084.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.city,
    addressRegion: site.region,
    addressCountry: "US",
  },
  areaServed: towns.map((t) => ({ "@type": "City", name: `${t}, VT` })),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.rating,
    reviewCount: site.reviewCount,
  },
  sameAs: [site.facebook, `https://www.youtube.com/watch?v=${site.youtubeId}`],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <Nav />
        <main className="overflow-x-clip">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id={site.ghl.chatWidgetId}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
