"use client";

/* An <img> that auto-swaps to a placeholder if the real asset is missing.
   The moment you drop the real file at `src`, it loads it; until then the
   onError falls back to the bundled placeholder. Lazy + async-decode. */

import { useState } from "react";

export function ProcImg({
  src,
  fallback,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
  /* The procession measures these images' widths to size its horizontal
     scroll, so they must load up-front — lazy would leave them zero-width
     (off-screen in the track) and the pin never sets up. */
  eager?: boolean;
}) {
  const [cur, setCur] = useState(src);
  return (
    <img
      src={cur}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable={false}
      onError={() => {
        if (cur !== fallback) setCur(fallback);
      }}
      className={className}
    />
  );
}
