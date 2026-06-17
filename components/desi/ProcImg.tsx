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
}: {
  src: string;
  fallback: string;
  alt: string;
  className?: string;
}) {
  const [cur, setCur] = useState(src);
  return (
    <img
      src={cur}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => {
        if (cur !== fallback) setCur(fallback);
      }}
      className={className}
    />
  );
}
