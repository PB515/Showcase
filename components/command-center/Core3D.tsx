"use client";

/* Shippable wrapper for the neural core (the recipe pattern):
   dynamic ssr:false + IntersectionObserver mount + weak-device static fallback. */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const CoreScene = dynamic(() => import("./CoreScene"), { ssr: false });

function StaticCore() {
  return (
    <div className="relative h-full w-full">
      <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/50 shadow-[0_0_60px_rgba(34,211,238,0.35)]" />
      <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet/30" />
    </div>
  );
}

export function Core3D({ pointerCam = false }: { pointerCam?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    // Only fall back on genuinely weak devices (both signals low) — 4 cores or
    // a conservative deviceMemory report alone shouldn't kill the centerpiece.
    if (cores <= 4 && mem <= 4) setLite(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {inView && !lite ? <CoreScene pointerCam={pointerCam} /> : <StaticCore />}
    </div>
  );
}
