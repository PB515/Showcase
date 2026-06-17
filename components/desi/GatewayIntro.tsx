"use client";

/* CONCEPT C — cinematic gateway intro (preloader).
   Two ornate vector "palace doors" cover the screen with a loading counter;
   at 100% they swing/slide apart to reveal the site. Sets a "you've entered
   somewhere" tone. Built in vector (Mandala + florets + gold borders), no assets.
   Reduced-motion → skipped entirely (no doors, instant site). */

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Mandala, CornerFloret } from "./Ornaments";

export function GatewayIntro() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setGone(true);
      return;
    }
    let n = 0;
    const id = setInterval(() => {
      n = Math.min(100, n + 2);
      setCount(n);
      if (n >= 100) {
        clearInterval(id);
        setTimeout(() => setOpen(true), 350);
      }
    }, 38);
    return () => clearInterval(id);
  }, [reduce]);

  if (gone) return null;

  const EASE = [0.76, 0, 0.24, 1] as const;

  const Door = ({ side }: { side: "left" | "right" }) => (
    <motion.div
      className="relative h-full w-1/2 overflow-hidden bg-[linear-gradient(180deg,#26235c,#1c1510)]"
      initial={{ x: 0 }}
      animate={{ x: open ? (side === "left" ? "-100%" : "100%") : 0 }}
      transition={{ duration: 1.15, ease: EASE }}
      onAnimationComplete={() => side === "right" && open && setGone(true)}
    >
      <div className="grain absolute inset-0 opacity-30" aria-hidden />
      {/* gold frame */}
      <div className={`absolute inset-5 border-2 border-gold/70 ${side === "left" ? "border-r-gold" : "border-l-gold"}`} />
      {/* big faint mandala */}
      <Mandala
        className={`absolute top-1/2 h-[80vmin] w-[80vmin] -translate-y-1/2 text-gold/25 ${side === "left" ? "right-0 translate-x-1/3" : "left-0 -translate-x-1/3"}`}
        spin
      />
      {/* corner florets */}
      <CornerFloret className="absolute left-8 top-8 h-12 w-12 text-gold/70" />
      <CornerFloret className="absolute bottom-8 right-8 h-12 w-12 text-gold/70" />
      {/* inner-edge seam glow */}
      <div className={`absolute inset-y-0 w-px bg-gold ${side === "left" ? "right-0" : "left-0"}`} />
    </motion.div>
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] flex">
      <Door side="left" />
      <Door side="right" />

      {/* center counter — fades as the doors part */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        animate={{ opacity: open ? 0 : 1 }}
        transition={{ duration: 0.4 }}
      >
        <p className="mb-3 font-body text-xs uppercase tracking-[0.4em] text-gold">A festival of craft</p>
        <p className="font-display text-7xl leading-none text-paper md:text-8xl">रंग</p>
        <p className="mt-6 font-mono text-2xl tabular-nums text-marigold">{count}%</p>
        <p className="mt-3 font-body text-sm tracking-[0.2em] text-paper/60">Entering the mela…</p>
      </motion.div>
    </div>
  );
}
