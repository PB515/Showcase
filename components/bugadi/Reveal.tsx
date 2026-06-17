"use client";

/* Reveal-on-scroll — Stage 1.
   A section fades + rises once as it enters the viewport. IntersectionObserver
   under the hood (via Motion's whileInView). Reduced-motion → render static,
   no offset, no observer work. opacity+transform only → no layout shift. */

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const EXPO = [0.16, 1, 0.3, 1] as const; // house default easing

export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.7, ease: EXPO, delay }}
    >
      {children}
    </motion.div>
  );
}
