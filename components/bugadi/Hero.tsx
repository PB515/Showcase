"use client";

/* Hero entrance — the Stage 0 choreography, house default easing (Expo-out),
   no dev controls. One orchestrated reveal on load. Reduced-motion → instant. */

import { motion, useReducedMotion, type Variants } from "motion/react";

const EXPO = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const group: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.12,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: EXPO },
    },
  };

  return (
    <motion.section
      id="top"
      variants={group}
      initial="hidden"
      animate="show"
      className="mx-auto grid min-h-svh max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-32 md:grid-cols-[1.1fr_0.9fr] md:px-10"
    >
      <div className="max-w-xl">
        <motion.p
          variants={item}
          className="mb-6 text-xs uppercase tracking-[0.28em] text-ink-muted"
        >
          Wearable Heritage
        </motion.p>

        <h1 className="font-heading text-5xl leading-[1.05] tracking-tight text-ink md:text-7xl">
          <motion.span variants={item} className="block">
            Traditional ornament,
          </motion.span>
          <motion.span variants={item} className="block text-primary">
            styled to wear today.
          </motion.span>
        </h1>

        <motion.p
          variants={item}
          className="mt-7 max-w-md text-base leading-relaxed text-ink-muted md:text-lg"
        >
          Oxidised, antique-finish pieces — ear cuffs, hasli, pendants. Every
          piece carries its motif, its region, its occasion.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#pieces"
            className="rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-ink transition-opacity hover:opacity-90"
          >
            Explore the collection
          </a>
          <a
            href="#heritage"
            className="text-sm text-ink-muted underline-offset-4 hover:underline"
          >
            Our roots
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={item}
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
  );
}
