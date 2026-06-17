"use client";

/* ─────────────────────────────────────────────────────────────
   STAGE 2 — Scroll storytelling (GSAP ScrollTrigger), Signature tier.
   A PINNED stage: as you scroll, one piece's story scrubs through three
   chapters — Motif → Region → Occasion. The piece scales gently across the
   whole sequence; each chapter fades in, then out, tied to scroll progress.
   Perf gate: transforms/opacity (autoAlpha) only; useGSAP reverts the context
   on unmount so the pin + all ScrollTriggers are killed (no route-change leak).
   Reduced-motion / no-JS: no pin, no scrub — chapters render as a static,
   readable stacked list (overlap is applied ONLY when motion is on).
   ───────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  {
    k: "Motif",
    v: "Paisley — the mango curl. A pattern carried across centuries of looms and now pressed into oxidised silver.",
  },
  {
    k: "Region",
    v: "Maharashtra. The same ear ornament reads differently in every hand it has passed through.",
  },
  {
    k: "Occasion",
    v: "Festive. Heritage is not a museum — it is what you reach for on a given morning.",
  },
];

export function HeritageStory() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // Overlap the chapters ONLY after the client confirms motion is on — GSAP
  // will sequence them. SSR / no-JS / reduced-motion keep the readable stacked
  // flow (the no-JS content-visibility gate).
  const motionOn = mounted && !reduce;

  useGSAP(
    () => {
      if (reduce) return; // leave chapters in their static, readable state

      const chapters = gsap.utils.toArray<HTMLElement>(".chapter");
      gsap.set(chapters, { autoAlpha: 0, y: 40 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=" + chapters.length * 700,
          scrub: 1,
          pin: ".stage",
          anticipatePin: 1,
        },
      });

      // the piece breathes across the whole story
      tl.fromTo(".piece", { scale: 0.9 }, { scale: 1.06, ease: "none" }, 0);

      // sequence the chapters: in → hold → out (last one stays)
      chapters.forEach((c, i) => {
        const last = i === chapters.length - 1;
        tl.to(c, { autoAlpha: 1, y: 0, duration: 0.4 }, i * 1);
        if (!last) tl.to(c, { autoAlpha: 0, y: -40, duration: 0.4 }, i * 1 + 0.6);
      });
    },
    { scope: root, dependencies: [reduce] }
  );

  return (
    <section ref={root} className="relative">
      <div className="stage relative flex min-h-svh items-center overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2 md:px-10">
          {/* the piece */}
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm">
            <div className="piece relative h-full w-full overflow-hidden rounded-lg border border-border bg-surface will-change-transform">
              <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--color-surface-2),transparent_60%)]" />
              <span className="absolute left-5 top-5 text-xs uppercase tracking-[0.22em] text-ink-muted">
                Ear Cuff
              </span>
              <span className="absolute right-5 top-5 h-2 w-2 rounded-full bg-accent" />
              <p className="absolute inset-x-0 bottom-0 p-6 font-heading text-2xl text-ink">
                Paisley climber
              </p>
            </div>
          </div>

          {/* the chapters */}
          <div className="relative">
            <p className="mb-8 text-xs uppercase tracking-[0.28em] text-ink-muted">
              Wearable Heritage
            </p>
            <div className={`relative ${motionOn ? "min-h-[18rem]" : ""}`}>
              {CHAPTERS.map((c) => (
                <div
                  key={c.k}
                  className={`chapter ${motionOn ? "absolute inset-0" : "mb-10 last:mb-0"}`}
                >
                  <div className="mb-4 h-px w-10 bg-accent" />
                  <h3 className="font-heading text-4xl text-primary md:text-5xl">
                    {c.k}
                  </h3>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted md:text-lg">
                    {c.v}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
