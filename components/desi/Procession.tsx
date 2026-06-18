"use client";

/* CONCEPT B — horizontal "scroll-painting" procession.
   The section PINS; scrolling down drives the festival sideways. Three layers
   parallax at different speeds (skyline slow, figures 1×, garland fast) for
   diorama depth. Figures auto-swap to real PNGs when dropped in /public/art.
   Reduced-motion → static scene (no pin), still readable via the heading. */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { ProcImg } from "./ProcImg";
import { SplitText } from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

const FIGURES = [
  { src: "/art/elephant.webp", ph: "/art/ph/elephant.svg", alt: "Festival elephant", h: "h-[46vh]" },
  { src: "/art/musicians.webp", ph: "/art/ph/musicians.svg", alt: "Dhol drummers", h: "h-[38vh]" },
  { src: "/art/dancers.webp", ph: "/art/ph/dancers.svg", alt: "Folk dancers", h: "h-[40vh]" },
  { src: "/art/palanquin.webp", ph: "/art/ph/palanquin.svg", alt: "Palanquin", h: "h-[44vh]" },
  { src: "/art/musicians.webp", ph: "/art/ph/musicians.svg", alt: "Dhol drummers", h: "h-[36vh]" },
  { src: "/art/elephant.webp", ph: "/art/ph/elephant.svg", alt: "Festival elephant", h: "h-[42vh]" },
];

export function Procession() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      const track = root.current?.querySelector(".proc-track") as HTMLElement | null;
      if (!track) return;

      /* Distance is a FUNCTION, not a captured constant: the figure images set
         the track width, and on the deployed site they aren't decoded yet when
         this runs. invalidateOnRefresh + function-based end/x mean every
         ScrollTrigger.refresh() recomputes against the real, loaded widths. */
      const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: () => "+=" + dist(),
          scrub: 1,
          pin: ".proc-stage",
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(".proc-track", { x: () => -dist(), ease: "none" }, 0);
      tl.to(".proc-bg", { x: () => -dist() * 0.35, ease: "none" }, 0);
      tl.to(".proc-fg", { x: () => -dist() * 1.25, ease: "none" }, 0);

      /* Re-measure once the eager figure images actually finish loading. */
      const imgs = Array.from(root.current!.querySelectorAll("img"));
      let pending = imgs.filter((im) => !im.complete).length;
      if (pending === 0) {
        ScrollTrigger.refresh();
      } else {
        const done = () => {
          if (--pending <= 0) ScrollTrigger.refresh();
        };
        imgs.forEach((im) => {
          if (im.complete) return;
          im.addEventListener("load", done, { once: true });
          im.addEventListener("error", done, { once: true });
        });
      }
    },
    { scope: root, dependencies: [reduce] }
  );

  return (
    <section ref={root} className="relative">
      <div className="proc-stage relative h-svh overflow-hidden">
        {/* dusk sky */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#f4a300_0%,#f6d98a_38%,#f4ecda_70%)]" />
        {/* skyline (slow) */}
        <div className="proc-bg absolute bottom-[26%] left-0 flex w-max items-end will-change-transform">
          {Array.from({ length: 7 }).map((_, i) => (
            <ProcImg key={i} eager src="/art/bg-skyline.webp" fallback="/art/ph/skyline.svg" alt="" className="h-[34vh] w-auto opacity-90" />
          ))}
        </div>
        {/* ground band */}
        <div className="absolute inset-x-0 bottom-0 h-[24%] bg-[#1c1510]" />
        <div className="absolute inset-x-0 bottom-[24%] h-[3px] bg-gold/60" />
        {/* figures (1×) */}
        <div className="proc-track absolute bottom-[24%] left-0 flex w-max items-end gap-[7vw] pl-[10vw] pr-[10vw] will-change-transform">
          {FIGURES.map((f, i) => (
            <ProcImg key={i} eager src={f.src} fallback={f.ph} alt={f.alt} className={`${f.h} w-auto`} />
          ))}
        </div>
        {/* garland (fast foreground) */}
        <div className="proc-fg absolute bottom-[20%] left-0 flex w-max will-change-transform">
          {Array.from({ length: 26 }).map((_, i) => (
            <ProcImg key={i} eager src="/art/garland.webp" fallback="/art/ph/garland.svg" alt="" className="h-[13vh] w-auto" />
          ))}
        </div>

        {/* heading overlay */}
        <div className="absolute left-6 top-24 z-10 max-w-sm md:left-10">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-ink/70">// the procession</p>
          <h2 className="mt-2 font-display text-4xl leading-tight text-ink md:text-6xl">
            <SplitText text="Scroll into the mela." by="word" stagger={0.06} />
          </h2>
          <p className="mt-3 font-body text-sm text-ink-soft">
            Keep scrolling — the festival moves past you, left to right.
          </p>
        </div>
      </div>
    </section>
  );
}
