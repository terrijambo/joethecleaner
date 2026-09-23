// Single source of truth for business facts. Anything that feeds GoHighLevel
// (IDs below) was lifted from the previous hirejoethecleaner.com build so leads
// keep routing to the same pipeline.

export const site = {
  name: "Joe The Cleaner",
  dba: "JC Crew",
  tagline: "Not your average Joe.",
  url: "https://hirejoethecleaner.com",
  // NOTE: the old site, FB cover and YouTube ad all use 802-441-6618.
  // Google Business Profile lists (802) 316-8960. Confirm with Joe.
  phone: "(802) 441-6618",
  phoneHref: "tel:+18024416618",
  email: "joe@joescleaningcrew.com",
  // Joe moved the base from Essex Junction to St. Albans (per ArkiTech, Sep 2026).
  city: "St. Albans",
  region: "VT",
  hours: "Mon to Fri 9 to 6, Sat 9 to 4",
  rating: 4.8,
  reviewCount: 32,
  googleReviewsUrl: "https://www.google.com/search?q=Joe+The+Cleaner+Essex+Junction+VT#lrd=reviews",
  facebook: "https://www.facebook.com/joethecleaner/",
  youtubeId: "FN2ktGZ2gIY",
  since: 2021, // earliest dated third-party review (HomeAdvisor, June 2021)
  // Verified by hand on 2026-09-23. No BBB accreditation found, so no BBB badge.
  listings: [
    { name: "Google", logo: "/logos/google.svg", rating: 4.8, count: 32, href: "https://www.google.com/search?q=Joe+The+Cleaner+Essex+Junction+VT" },
    { name: "Angi", logo: "/logos/angi.svg", rating: 5.0, count: 8, href: "https://www.angi.com/companylist/us/vt/essex-junction/jc-crew-reviews-10659269.htm" },
    { name: "HomeAdvisor", logo: "/logos/homeadvisor.svg", rating: 4.9, count: 7, href: "https://www.homeadvisor.com/rated.JoesCrew.113214335.html" },
    { name: "Facebook", logo: "/logos/facebook.svg", rating: null, count: null, href: "https://www.facebook.com/joethecleaner/" },
  ],
  ghl: {
    quoteSurvey: "https://link.joethecleaner.net/widget/survey/7SPePpoJUaaNw5uMSTiW",
    bookingWidget: "https://link.joethecleaner.net/widget/booking/QOEsaeJXNmlnxp4JY5lg",
    formEmbedScript: "https://link.joethecleaner.net/js/form_embed.js",
    chatWidgetId: "69dfd2460c3ae56674a04a7d",
  },
} as const;

// Regular routes across Franklin and Chittenden counties. Keep in sync with data/geo/towns.json (map pins).
export const towns = [
  "St. Albans",
  "Swanton",
  "Highgate",
  "Georgia",
  "Fairfax",
  "Milton",
  "Colchester",
  "Essex Junction",
  "Essex",
  "Winooski",
  "Burlington",
  "South Burlington",
  "Williston",
  "Shelburne",
  "Jericho",
] as const;
