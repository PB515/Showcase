"use client";

/* 3D FEATURE — the neural core, full-bleed, camera angle follows the mouse
   (pointerCam). Specs reveal on scroll alongside. Lazy-mounted + DPR-capped
   via Core3D; static halo fallback on weak devices / reduced-motion. */

import { Core3D } from "./Core3D";
import { Reveal } from "./Reveal";
import { MonoLabel, Bracketed } from "./hud";

const SPECS = [
  { k: "Throughput", v: "2.4M events / sec" },
  { k: "Model", v: "CC-Core v4 · 32B" },
  { k: "Regions", v: "14 edge zones" },
  { k: "Failover", v: "< 120 ms" },
];

export function FeatureSection() {
  return (
    <section id="core" className="relative overflow-hidden border-t border-border">
      {/* the core canvas as the backdrop */}
      <div className="absolute inset-0">
        <Core3D pointerCam />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_50%,transparent_30%,var(--color-bg)_85%)]" />

      <div className="relative z-10 mx-auto grid min-h-svh max-w-7xl grid-cols-1 content-center gap-10 px-6 py-28 md:grid-cols-2 md:px-10">
        <div className="self-center">
          <Reveal>
            <MonoLabel>// 04 — the core</MonoLabel>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 font-display text-4xl font-bold leading-[1.05] text-ink md:text-6xl">
              One neural core,
              <br />
              <span className="text-cyan glow-cyan">total awareness.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-muted">
              Every signal in your operation converges here. Move your cursor —
              the core responds. This is the engine behind every decision the OS
              makes.
            </p>
          </Reveal>
        </div>

        {/* specs float on the right */}
        <div className="grid grid-cols-2 gap-4 self-center md:mt-0">
          {SPECS.map((s, i) => (
            <Reveal key={s.k} delay={0.15 + i * 0.08}>
              <Bracketed className="rounded-md border border-border bg-surface/50 p-5 backdrop-blur">
                <MonoLabel>{s.k}</MonoLabel>
                <p className="mt-2 font-display text-xl font-semibold text-ink">{s.v}</p>
              </Bracketed>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
