// Projects Vermont geography to SVG paths once, so the site ships static markup (no map lib at runtime).
// Sources: US Census county boundaries (via plotly/datasets), Natural Earth 10m lakes, OSM Nominatim town points.
import { readFileSync, writeFileSync } from "node:fs";
import { geoConicConformal, geoPath } from "d3-geo";

const dir = "data/geo/";
const counties = JSON.parse(readFileSync(dir + "vt-counties.json", "utf8"));
const lake = JSON.parse(readFileSync(dir + "champlain.json", "utf8"));
const towns = JSON.parse(readFileSync(dir + "towns.json", "utf8"));

const W = 600, H = 860;
const projection = geoConicConformal().parallels([43, 45]).rotate([72.6, 0]).fitExtent([[24, 24], [W - 24, H - 24]], counties);
const path = geoPath(projection).digits(1);
const pt = (lonlat) => projection(lonlat).map((n) => Math.round(n * 10) / 10);

const peaks = [
  { name: "Jay Peak", lonlat: [-72.5256, 44.9245] },
  { name: "Mt. Mansfield", lonlat: [-72.8143, 44.5437] },
  { name: "Camel's Hump", lonlat: [-72.8862, 44.3195] },
  { name: "Killington", lonlat: [-72.8201, 43.6045] },
  { name: "Stratton", lonlat: [-72.9087, 43.0845] },
];

const out = {
  viewBox: `0 0 ${W} ${H}`,
  counties: counties.features.map((f) => ({ id: f.id, name: f.properties.NAME, d: path(f) })),
  lake: path(lake),
  core: Object.entries(towns.core).map(([name, ll]) => ({ name, xy: pt(ll) })),
  beyond: Object.entries(towns.beyond).map(([name, ll]) => ({ name, xy: pt(ll) })),
  peaks: peaks.map((p) => ({ name: p.name, xy: pt(p.lonlat) })),
};
writeFileSync("lib/vt-map.json", JSON.stringify(out));
console.log("counties", out.counties.length, "bytes", JSON.stringify(out).length);
