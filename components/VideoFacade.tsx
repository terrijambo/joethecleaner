"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "@phosphor-icons/react";

// Click-to-load YouTube so the page doesn't pay for the player up front.
export function VideoFacade({ id, poster, title }: { id: string; poster: string; title: string }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-card)] bg-forest-deep shadow-soft">
      {playing ? (
        <iframe
          className="absolute inset-0 size-full"
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 size-full text-left"
          aria-label={`Play video: ${title}`}
        >
          <Image src={poster} alt="" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07120b]/80 via-transparent to-transparent" />
          <span className="absolute bottom-6 left-6 flex items-center gap-3 text-white">
            <span className="grid size-16 place-items-center rounded-full bg-sun text-on-sun transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
              <Play weight="fill" className="size-6 translate-x-0.5" />
            </span>
            <span className="text-sm font-semibold">Watch the 40 second intro</span>
          </span>
        </button>
      )}
    </div>
  );
}
