"use client";

/* FINAL CTA — cinematic terminal ending.
   A glowing terminal types a deploy sequence when scrolled into view, ending in
   READY; the headline + CTA rise in. Top glow + grid give the cinematic close. */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { StatusDot, MonoLabel } from "./hud";

const LINES = [
  "$ command-center deploy --fleet=all",
  "> provisioning 1,248 agents ...... ok",
  "> establishing secure mesh ....... ok",
  "> syncing neural core ............ ok",
  "> READY",
];

function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const reduce = useReducedMotion();
  const [done, setDone] = useState<string[]>([]);
  const [cur, setCur] = useState("");
  const [li, setLi] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView) setStarted(true);
  }, [inView]);

  useEffect(() => {
    if (!started) return;
    if (reduce) {
      setDone(LINES);
      return;
    }
    if (li >= LINES.length) return;
    const full = LINES[li];
    let i = 0;
    const id = setInterval(() => {
      i++;
      setCur(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setDone((d) => [...d, full]);
        setCur("");
        setLi((l) => l + 1);
      }
    }, 16);
    return () => clearInterval(id);
  }, [started, li, reduce]);

  return (
    <div
      ref={ref}
      className="glow-soft mx-auto max-w-xl rounded-lg border border-cyan/30 bg-black/60 p-5 text-left font-mono text-sm backdrop-blur"
    >
      <div className="mb-3 flex items-center gap-2 border-b border-border pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-danger/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green/70" />
        <span className="ml-2 text-xs text-ink-muted">deploy.sh</span>
      </div>
      {done.map((l, i) => (
        <div key={i} className={l.includes("READY") ? "text-green" : "text-ink-muted"}>
          {l.includes("READY") ? (
            <span className="inline-flex items-center gap-2">
              <StatusDot /> {l}
            </span>
          ) : (
            l
          )}
        </div>
      ))}
      {cur && (
        <div className="text-ink-muted">
          {cur}
          <span className="ml-0.5 inline-block h-3.5 w-1.5 -translate-y-px bg-cyan align-middle motion-safe:animate-[caret_1s_step-end_infinite]" />
        </div>
      )}
    </div>
  );
}

export function FinalCTA() {
  const reduce = useReducedMotion();
  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="deploy" className="relative overflow-hidden border-t border-border py-32 md:py-44">
      {/* cinematic top glow + grid */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-64 w-[80%] -translate-x-1/2 rounded-[100%] bg-cyan/15 blur-3xl" />
        <div className="grid-floor absolute inset-0 opacity-[0.12]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center md:px-10">
        <motion.div
          variants={group}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-15%" }}
        >
          <motion.p variants={item} className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan">
            // 06 — engage
          </motion.p>
          <motion.h2
            variants={item}
            className="mt-4 font-display text-5xl font-bold leading-[1.02] text-ink md:text-7xl"
          >
            Take <span className="text-cyan glow-cyan">command.</span>
          </motion.h2>
          <motion.p variants={item} className="mx-auto mt-6 max-w-md text-base text-ink-muted">
            Deploy Command Center OS across your fleet in minutes. One console.
            Total awareness. Zero blind spots.
          </motion.p>
          <motion.div variants={item} className="mt-10">
            <Terminal />
          </motion.div>
          <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#top"
              className="glow-soft rounded-md bg-cyan px-7 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
            >
              Request access
            </a>
            <a
              href="#top"
              className="rounded-md border border-border px-7 py-3 text-sm text-ink-muted transition-colors hover:border-cyan/50 hover:text-ink"
            >
              Back to top ↑
            </a>
          </motion.div>
        </motion.div>
      </div>

      <footer className="relative z-10 mx-auto mt-24 max-w-7xl border-t border-border px-6 pt-8 md:px-10">
        <div className="flex flex-col items-center justify-between gap-3 text-sm text-ink-muted md:flex-row">
          <span className="font-display font-semibold text-ink">Command Center OS</span>
          <MonoLabel>an imaginary product · a real frontend demo</MonoLabel>
          <MonoLabel>© 2026</MonoLabel>
        </div>
      </footer>
    </section>
  );
}
