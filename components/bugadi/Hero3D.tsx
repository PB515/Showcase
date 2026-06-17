"use client";

/* ─────────────────────────────────────────────────────────────
   STAGE 5 — the R3F crucible wrapper. This is the part that makes 3D
   SHIPPABLE rather than a demo:
     • dynamic(import, { ssr:false }) — 3D never runs on the server / never
       blocks first paint (LCP stays green).
     • IntersectionObserver — the heavy bundle + canvas mount ONLY when the
       section scrolls near view (rootMargin pre-warms it).
     • lite/static fallback — reduced-motion OR a weak-device heuristic gets a
       styled static panel and never downloads/spins up WebGL at all.
   ───────────────────────────────────────────────────────────── */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Heavy 3D code is split out and only fetched when we render <Scene/>.
const Scene = dynamic(() => import("./Hero3DScene"), { ssr: false });

function StaticPiece() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-border bg-surface">
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--color-surface-2),transparent_60%)]" />
      <span className="absolute left-5 top-5 text-xs uppercase tracking-[0.22em] text-ink-muted">
        Ear Cuff
      </span>
      <span className="absolute right-5 top-5 h-2 w-2 rounded-full bg-accent" />
      <p className="absolute inset-x-0 bottom-0 p-6 font-heading text-2xl text-ink">
        Paisley climber
      </p>
    </div>
  );
}

export function Hero3D() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [inView, setInView] = useState(false);
  const [lite, setLite] = useState(false);

  // Weak-device heuristic → never spin up WebGL, show the static panel.
  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    if (cores <= 4 || mem <= 4) setLite(true);
  }, []);

  // Mount the canvas only when the section nears the viewport.
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
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const interactive = inView && !reduce && !lite;

  return (
    <div ref={ref} className="relative h-full w-full">
      {interactive ? <Scene /> : <StaticPiece />}
      {interactive && (
        <span className="pointer-events-none absolute bottom-4 right-5 text-xs uppercase tracking-[0.2em] text-ink-muted">
          Drag to rotate
        </span>
      )}
    </div>
  );
}
