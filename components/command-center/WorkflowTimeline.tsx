"use client";

/* WORKFLOW TIMELINE — GSAP-pinned process.
   The stage pins; as you scroll, a vertical progress line draws downward,
   node dots ignite in sequence, and each step slides in one-by-one — all
   scrubbed to scroll. Reduced-motion: static, fully-readable list (no pin). */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { MonoLabel } from "./hud";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  { k: "Ingest", v: "Signals stream in from every agent, sensor, and queue — normalized in flight." },
  { k: "Analyze", v: "The neural core scores anomalies and intent in real time, continuously." },
  { k: "Decide", v: "Policies route each event to the right action, or escalate it to a human." },
  { k: "Execute", v: "Agents act autonomously; operators intervene only on flagged exceptions." },
  { k: "Learn", v: "Every outcome feeds back — the system tunes its own thresholds over time." },
];

export function WorkflowTimeline() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      const steps = gsap.utils.toArray<HTMLElement>(".wf-step");
      const dots = gsap.utils.toArray<HTMLElement>(".wf-dot");

      gsap.set(steps, { autoAlpha: 0.25, x: 26 });
      gsap.set(dots, { scale: 0.6, backgroundColor: "#1b2536", boxShadow: "0 0 0 rgba(0,0,0,0)" });
      gsap.set(".wf-progress", { scaleY: 0, transformOrigin: "top" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=" + STEPS.length * 360,
          scrub: 1,
          pin: ".wf-stage",
          anticipatePin: 1,
        },
      });

      tl.to(".wf-progress", { scaleY: 1, ease: "none", duration: STEPS.length }, 0);
      steps.forEach((s, i) => {
        tl.to(
          dots[i],
          { scale: 1, backgroundColor: "#22d3ee", boxShadow: "0 0 16px rgba(34,211,238,0.7)", duration: 0.3 },
          i + 0.1
        ).to(s, { autoAlpha: 1, x: 0, duration: 0.4 }, i + 0.1);
      });
    },
    { scope: root, dependencies: [reduce] }
  );

  return (
    <section ref={root} id="workflow" className="relative border-t border-border">
      <div className="wf-stage flex min-h-svh items-center overflow-hidden py-20">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-[0.8fr_1.2fr] md:px-10">
          {/* left: heading */}
          <div className="md:sticky md:top-24 md:self-start">
            <MonoLabel>// 03 — workflow</MonoLabel>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink md:text-5xl">
              How an event
              <br />
              moves through the OS.
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
              Five stages, fully autonomous end to end. Scroll to trace a single
              signal from ingestion to learning.
            </p>
          </div>

          {/* right: the drawn timeline */}
          <div className="relative pl-10">
            {/* track + drawing progress line */}
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-border" />
            <div className="wf-progress absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-cyan via-cyan to-violet" />

            <ol className="space-y-10">
              {STEPS.map((s, i) => (
                <li key={s.k} className="wf-step relative">
                  <span className="wf-dot absolute -left-[37px] top-1.5 h-[15px] w-[15px] rounded-full ring-4 ring-bg" />
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-cyan">0{i + 1}</span>
                    <h3 className="font-display text-2xl font-semibold text-ink">{s.k}</h3>
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-muted">{s.v}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
