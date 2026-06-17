"use client";

/* PAGE-TRANSITION WIPE — template.tsx re-mounts on every route change, so this
   plays per navigation: a solid ink panel covers the screen then retracts
   upward (brutalist wipe). Reduced-motion → no panel. */

import { motion, useReducedMotion } from "motion/react";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <>
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none fixed inset-0 z-[90] origin-top bg-ink"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          <motion.div
            className="pointer-events-none fixed inset-x-0 top-0 z-[91] h-1 origin-left bg-accent"
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}
      {children}
    </>
  );
}
