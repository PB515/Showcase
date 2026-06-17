"use client";

/* ─────────────────────────────────────────────────────────────
   STAGE 0 ARTIFACT — the easing comparator (moved off the homepage).
   Lesson: easing · duration · stagger · choreography · restraint.
   Replay ONE choreographed hero entrance under 4 easings on the same
   reveal, so the difference is something you FEEL, not read.
   Perf gate: reduced-motion drops to instant; no layout shift.
   ───────────────────────────────────────────────────────────── */

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

const EASINGS = [
  {
    id: "linear",
    label: "Linear",
    bezier: [0, 0, 1, 1] as const,
    note: "No easing. Mechanical and cheap — the tell of a templated site.",
  },
  {
    id: "easeout",
    label: "Ease-out",
    bezier: [0.25, 0.1, 0.25, 1] as const,
    note: "The safe default. Decelerates into place. Calm, unremarkable.",
  },
  {
    id: "expo",
    label: "Expo-out",
    bezier: [0.16, 1, 0.3, 1] as const,
    note: "The expensive curve. Fast out, long graceful settle. Premium.",
  },
  {
    id: "back",
    label: "Back-out",
    bezier: [0.34, 1.56, 0.64, 1] as const,
    note: "Overshoots, then settles. Playful — and the easiest to overdo.",
  },
];

const STAGGER = 0.12;
const DURATION = 0.7;

export default function EasingLab() {
  const reduce = useReducedMotion();
  const [easingId, setEasingId] = useState("expo");
  const [runKey, setRunKey] = useState(0);

  const easing = EASINGS.find((e) => e.id === easingId) ?? EASINGS[2];

  const replay = (id?: string) => {
    if (id) setEasingId(id);
    setRunKey((k) => k + 1);
  };

  const group: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : STAGGER,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    show: (bezier: number[]) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : DURATION, ease: bezier as [number, number, number, number] },
    }),
  };

  return (
    <main className="relative min-h-svh">
      <motion.section
        key={runKey}
        variants={group}
        initial="hidden"
        animate="show"
        className="mx-auto grid min-h-svh max-w-6xl grid-cols-1 items-center gap-12 px-6 py-24 md:grid-cols-[1.1fr_0.9fr] md:px-10"
      >
        <div className="max-w-xl">
          <motion.p
            variants={item}
            custom={easing.bezier}
            className="mb-6 text-xs uppercase tracking-[0.28em] text-ink-muted"
          >
            Stage 0 · Easing lab
          </motion.p>

          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
            <motion.span variants={item} custom={easing.bezier} className="block">
              Traditional ornament,
            </motion.span>
            <motion.span
              variants={item}
              custom={easing.bezier}
              className="block text-primary"
            >
              styled to wear today.
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            custom={easing.bezier}
            className="mt-7 max-w-md text-base leading-relaxed text-ink-muted md:text-lg"
          >
            The same reveal, four easings. Click each and feel which one reads as
            premium and which reads as templated.
          </motion.p>

          <motion.div
            variants={item}
            custom={easing.bezier}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <span className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-ink">
              Explore the collection
            </span>
            <a
              href="/bugadi"
              className="text-sm text-ink-muted underline-offset-4 hover:underline"
            >
              ← Back to the lookbook
            </a>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          custom={easing.bezier}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-surface"
        >
          <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--color-surface-2),transparent_60%)]" />
          <div className="absolute inset-x-0 bottom-0 p-6">
            <p className="font-heading text-2xl text-ink">Bugadi · Ear Cuff</p>
            <p className="mt-1 text-xs uppercase tracking-[0.22em] text-ink-muted">
              Paisley motif · Maharashtra · Festive
            </p>
          </div>
          <span className="absolute right-6 top-6 h-2 w-2 rounded-full bg-accent" />
        </motion.div>
      </motion.section>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <div className="pointer-events-auto w-full max-w-2xl rounded-lg border border-border bg-surface/90 p-4 backdrop-blur">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs uppercase tracking-[0.2em] text-ink-muted">
              Easing
            </span>
            {EASINGS.map((e) => (
              <button
                key={e.id}
                onClick={() => replay(e.id)}
                className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                  e.id === easingId
                    ? "bg-primary text-primary-ink"
                    : "border border-border text-ink-muted hover:text-ink"
                }`}
              >
                {e.label}
              </button>
            ))}
            <button
              onClick={() => replay()}
              className="ml-auto rounded-md border border-border px-3 py-1.5 text-sm text-ink hover:bg-surface-2"
            >
              ↻ Replay
            </button>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            <span className="text-ink">{easing.label}</span> · cubic-bezier(
            {easing.bezier.join(", ")}) — {easing.note}
          </p>
          {reduce && (
            <p className="mt-2 text-xs text-accent">
              Reduced-motion is ON — the entrance is instant by design. Toggle it
              off in your OS to feel the easings.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
