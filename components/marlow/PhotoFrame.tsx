"use client";

/* A photo slot that shows a labelled placeholder block until the real image
   exists at `src`, then swaps to it (onError → placeholder). Lazy + async. */

import { useState } from "react";

export function PhotoFrame({
  src,
  label,
  className = "",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-paper-2 ${className}`}>
      {!failed && (
        <img
          src={src}
          alt={label}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.03]"
        />
      )}
      {failed && (
        <div className="flex h-full w-full items-center justify-center border border-line/20">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            {label}
          </span>
        </div>
      )}
    </div>
  );
}
