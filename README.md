# Joe The Cleaner (JC Crew)

Marketing site for Joe The Cleaner, a cleaning company based in St. Albans, Vermont. Built by ArkiTech Solutions.

Next.js 16 (App Router, all routes static), Tailwind v4, Motion, Phosphor icons. No environment variables and no database.

## Run it

```bash
npm install
npm run dev
```

Deploys to Vercel with the default Next.js preset. Nothing else to configure.

## Where things live

- `lib/site.ts`: phone, email, hours, ratings, review-site listings, service towns and the GoHighLevel IDs. Change business facts here.
- `app/*/page.tsx`: one folder per route (`/services`, `/our-work`, `/about`, `/reviews`, `/service-area`, `/contact`, `/book`).
- `components/`: sections. `VermontMap` is the service-area map, `Mountains` is the ridge-line illustration, `Plate` places the background botanical art.
- `public/images/`: job photos from Joe's Facebook page. `public/art/`: public-domain plates (Michaux's *North American Sylva*, Audubon, Lindman). `public/logos/`: review-site marks.

## Lead capture (GoHighLevel)

The quote form (`/contact`), walkthrough calendar (`/book`) and chat bubble are Joe's existing GoHighLevel widgets, embedded by ID from `lib/site.ts`. Leads keep flowing into his current GHL account. `/book` keeps the old site's URL.

## Service-area map

Geometry is projected to SVG paths ahead of time, so the page ships no map library.

1. Edit town lists in `data/geo/towns.json` (`core` = regular routes, `beyond` = farther trips). Keep `towns` in `lib/site.ts` matching `core`.
2. Run `node scripts/build-vt-map.mjs` to regenerate `lib/vt-map.json`.

Sources: US Census county boundaries, Natural Earth lakes, OpenStreetMap (Nominatim) town points.

## Before launch, confirm with Joe

- Phone: site uses (802) 441-6618 (old site, Facebook, YouTube). Google Business lists (802) 316-8960.
- The GHL walkthrough calendar charges $250. Site copy avoids calling the walkthrough free.
- Hours (Mon to Fri 9 to 6, Sat 9 to 4) came from his older site.
- Which towns count as regular routes.
