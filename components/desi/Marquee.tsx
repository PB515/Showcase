"use client";

/* MARQUEE with scroll-velocity skew (Tier C). A continuous CSS marquee row;
   the wrapper skews proportional to scroll velocity — fast scroll = lean.
   Reduced-motion → static row, no skew, no loop. */

import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";

export function Marquee({ items, className = "" }: { items: string[]; className?: string }) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { stiffness: 300, damping: 50 });
  const skew = useTransform(smooth, [-2500, 0, 2500], [-9, 0, 9], { clamp: true });

  const row = [...items, ...items];

  if (reduce) {
    return (
      <div className={`overflow-hidden ${className}`}>
        <div className="flex gap-10 whitespace-nowrap">
          {items.map((t, i) => (
            <span key={i} className="font-poster text-4xl text-paper">{t}</span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div style={{ skewX: skew }}>
        <div className="flex w-max gap-10 whitespace-nowrap will-change-transform motion-safe:animate-[marquee_24s_linear_infinite]">
          {row.map((t, i) => (
            <span key={i} className="font-poster text-4xl text-paper md:text-6xl">
              {t}
              <span className="px-6 text-marigold">◆</span>
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
