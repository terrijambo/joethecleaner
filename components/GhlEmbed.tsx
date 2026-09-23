"use client";

import Script from "next/script";
import { useState } from "react";
import { site } from "@/lib/site";

// GoHighLevel survey/calendar iframe. form_embed.js auto-sizes it by matching the iframe id.
export function GhlEmbed({ src, id, title, minHeight = 640 }: { src: string; id: string; title: string; minHeight?: number }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative" style={{ minHeight }}>
      {!loaded && (
        <div className="absolute inset-0 grid gap-4 p-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid gap-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-ink/10" />
              <div className="h-12 animate-pulse rounded-xl bg-ink/[0.07]" />
            </div>
          ))}
        </div>
      )}
      <iframe
        src={src}
        id={id}
        title={title}
        onLoad={() => setLoaded(true)}
        scrolling="no"
        className={`w-full border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        style={{ minHeight }}
      />
      <Script src={site.ghl.formEmbedScript} strategy="lazyOnload" />
    </div>
  );
}
