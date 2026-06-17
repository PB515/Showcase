"use client";

/* MISSION CONTROL — live-looking metric cards.
   • CountUp: numbers animate up when scrolled into view (eased, reduced-motion safe).
   • TiltCard: 3D depth tilt toward the cursor + a glow that tracks the pointer.
   • Moving background lines sweeping behind the grid.
   All transform/opacity → GPU-cheap. */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { StatusDot, MonoLabel } from "./hud";

function fmt(n: number, decimals: number) {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function CountUp({
  to,
  decimals = 0,
  suffix = "",
  prefix = "",
}: {
  to: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setVal(to);
      return;
    }
    let raf = 0;
    let start = 0;
    const dur = 1400;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {prefix}
      {fmt(val, decimals)}
      {suffix}
    </span>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg)`;
    ref.current.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
    ref.current.style.setProperty("--my", `${(py + 0.5) * 100}%`);
  };
  const reset = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className="group relative overflow-hidden rounded-lg border border-border bg-surface/60 p-6 transition-transform duration-200 ease-out will-change-transform"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* pointer-tracking glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--mx,50%) var(--my,50%), color-mix(in srgb, var(--color-cyan) 16%, transparent), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}

const METRICS = [
  { label: "Active agents", to: 1248, decimals: 0, delta: "+34", color: "cyan" as const },
  { label: "Tasks / min", to: 8420, decimals: 0, delta: "+1.2k", color: "green" as const },
  { label: "Avg latency", to: 42, decimals: 0, suffix: "ms", delta: "-8ms", color: "green" as const },
  { label: "Uptime", to: 99.98, decimals: 2, suffix: "%", delta: "30d", color: "cyan" as const },
];

function Spark() {
  // a tiny static sparkline (decorative)
  const pts = [12, 9, 14, 8, 16, 11, 18, 13, 20, 15, 22];
  const d = pts
    .map((v, i) => `${(i / (pts.length - 1)) * 100},${28 - (v / 24) * 24}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 28" className="mt-4 h-7 w-full" preserveAspectRatio="none">
      <polyline points={d} fill="none" stroke="var(--color-cyan)" strokeWidth="1.5" opacity="0.8" />
    </svg>
  );
}

export function MissionControl() {
  return (
    <section id="mission" className="relative overflow-hidden border-t border-border py-24 md:py-32">
      {/* moving background lines */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden>
        {[15, 38, 62, 85].map((left, i) => (
          <div
            key={left}
            className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan/30 to-transparent motion-safe:animate-[sweep_7s_ease-in-out_infinite]"
            style={{ left: `${left}%`, animationDelay: `${i * 1.3}s` }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
        <Reveal>
          <div className="mb-12 flex items-end justify-between">
            <div>
              <MonoLabel>// 02 — mission control</MonoLabel>
              <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-5xl">
                The fleet, at a glance.
              </h2>
            </div>
            <span className="hidden items-center gap-2 sm:flex">
              <StatusDot /> <MonoLabel>live</MonoLabel>
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 0.08}>
              <TiltCard>
                <div className="flex items-center justify-between">
                  <MonoLabel>{m.label}</MonoLabel>
                  <span
                    className={`font-mono text-xs ${
                      m.color === "green" ? "text-green" : "text-cyan"
                    }`}
                  >
                    {m.delta}
                  </span>
                </div>
                <div className="mt-3 font-display text-4xl font-bold text-ink md:text-5xl">
                  <CountUp to={m.to} decimals={m.decimals} suffix={m.suffix} />
                </div>
                <Spark />
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
