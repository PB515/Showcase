"use client";

/* Lets you compare the two climax treatments live: the scroll-scrubbed VIDEO
   (your generated clip at /video/climax.mp4) vs the in-code 2D RANGOLI.
   Each is a pinned ScrollTrigger section; switching unmounts the other (useGSAP
   reverts its triggers). A fixed pill toggles between them. */

import { useState } from "react";
import { VideoScrub } from "./VideoScrub";
import { RangoliScrub } from "./RangoliScrub";

export function ClimaxToggle() {
  const [mode, setMode] = useState<"video" | "rangoli">("video");

  return (
    <div className="relative">
      {mode === "video" ? <VideoScrub /> : <RangoliScrub />}

      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-gold/50 bg-ink/80 p-1 backdrop-blur">
          <span className="px-3 font-body text-[11px] uppercase tracking-[0.18em] text-paper/60">Climax</span>
          <button
            data-cursor
            onClick={() => setMode("video")}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${mode === "video" ? "bg-marigold text-ink" : "text-paper/70 hover:text-paper"}`}
          >
            Video
          </button>
          <button
            data-cursor
            onClick={() => setMode("rangoli")}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors ${mode === "rangoli" ? "bg-marigold text-ink" : "text-paper/70 hover:text-paper"}`}
          >
            2D rangoli
          </button>
        </div>
      </div>
    </div>
  );
}
