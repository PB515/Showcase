"use client";

/* PARALLAX layers (Tier A).
   ScrollLayer — translates Y as the section scrolls through the viewport (depth).
   MouseLayer  — translates with the global pointer × depth, spring-smoothed.
   Both no-op under reduced-motion. */

import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";

export function ScrollLayer({
  children,
  speed = 0.2,
  className,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  if (reduce) return <div ref={ref} className={className}>{children}</div>;
  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function MouseLayer({
  children,
  depth = 20,
  className,
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 80, damping: 20 });
  const y = useSpring(my, { stiffness: 80, damping: 20 });

  useEffect(() => {
    if (reduce) return;
    const on = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2 * depth);
      my.set((e.clientY / window.innerHeight - 0.5) * 2 * depth);
    };
    window.addEventListener("pointermove", on);
    return () => window.removeEventListener("pointermove", on);
  }, [depth, reduce, mx, my]);

  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div style={{ x, y }} className={className}>
      {children}
    </motion.div>
  );
}
