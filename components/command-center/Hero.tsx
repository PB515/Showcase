"use client";

/* HERO — dark futuristic console boot.
   A typewriter boot sequence ends in "SYSTEM ONLINE", which triggers the
   choreographed entrance of the headline/subhead/CTAs. Glowing perspective
   grid behind; the neural core 3D on the right. Reduced-motion → instant. */

import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { GridFloor } from "./GridFloor";
import { InteractiveBackground } from "./InteractiveBackground";
import { Core3D } from "./Core3D";
import { StatusDot, MonoLabel, Bracketed } from "./hud";

const BOOT = [
  "> initializing kernel ........ ok",
  "> linking 1,248 agents ....... ok",
  "> calibrating telemetry ...... ok",
  "> SYSTEM ONLINE",
];

function BootLines({ onDone, reduce }: { onDone: () => void; reduce: boolean }) {
  const [done, setDone] = useState<string[]>([]);
  const [cur, setCur] = useState("");
  const [li, setLi] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDone(BOOT);
      onDone();
      return;
    }
    if (li >= BOOT.length) {
      onDone();
      return;
    }
    const full = BOOT[li];
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
    }, 18);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [li, reduce]);

  return (
    <div className="font-mono text-xs leading-relaxed">
      {done.map((l, i) => (
        <div
          key={i}
          className={l.includes("ONLINE") ? "text-green" : "text-ink-muted"}
        >
          {l.includes("ONLINE") ? (
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
          <span className="ml-0.5 inline-block h-3 w-1.5 -translate-y-px bg-cyan align-middle motion-safe:animate-[caret_1s_step-end_infinite]" />
        </div>
      )}
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [booted, setBooted] = useState(false);

  const group: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="top" className="relative min-h-svh overflow-hidden">
      <GridFloor />
      <InteractiveBackground />

      {/* top HUD bar */}
      <div className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-2">
          <StatusDot color="cyan" />
          <MonoLabel>COMMAND&nbsp;CENTER&nbsp;OS</MonoLabel>
        </div>
        <div className="hidden items-center gap-6 sm:flex">
          <MonoLabel>v2.4.0</MonoLabel>
          <span className="flex items-center gap-2">
            <StatusDot />
            <MonoLabel>All systems nominal</MonoLabel>
          </span>
        </div>
      </div>

      {/* hero content */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 pb-24 pt-6 md:grid-cols-[1.05fr_0.95fr] md:px-10">
        <div>
          <Bracketed className="mb-8 max-w-md rounded-md border border-border bg-surface/70 p-4 backdrop-blur">
            <BootLines onDone={() => setBooted(true)} reduce={!!reduce} />
          </Bracketed>

          <motion.div variants={group} initial="hidden" animate={booted ? "show" : "hidden"}>
            <motion.p
              variants={item}
              className="mb-5 font-mono text-[11px] uppercase tracking-[0.28em] text-cyan"
            >
              Autonomous Operations Platform
            </motion.p>
            <motion.h1
              variants={item}
              className="font-display text-5xl font-bold leading-[1.02] tracking-tight text-ink md:text-7xl"
            >
              Command every agent
              <br />
              from <span className="text-cyan glow-cyan">one console.</span>
            </motion.h1>
            <motion.p
              variants={item}
              className="mt-6 max-w-md text-base leading-relaxed text-ink-muted md:text-lg"
            >
              The control plane for autonomous AI operations. Monitor, orchestrate,
              and intervene across your entire fleet — in real time.
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <a
                href="#mission"
                className="glow-soft rounded-md bg-cyan px-6 py-3 text-sm font-semibold text-bg transition-opacity hover:opacity-90"
              >
                Launch console
              </a>
              <a
                href="#workflow"
                className="rounded-md border border-border px-6 py-3 text-sm text-ink-muted transition-colors hover:border-cyan/50 hover:text-ink"
              >
                View the workflow
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* the neural core */}
        <div className="relative h-[340px] md:h-[520px]">
          <Core3D />
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <MonoLabel>scroll to engage ↓</MonoLabel>
      </div>
    </section>
  );
}
