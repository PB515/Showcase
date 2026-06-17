"use client";

/* SCROLL-SCRUBBED MEDIA (Tier C) — a pinned painting that scales/pans as you
   scroll through it, revealing detail (the "zoom into the artwork" move; a
   single-image stand-in for a frame sequence). useGSAP kills the pin/trigger
   on unmount. Reduced-motion → static, no pin. */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

export function FolkZoom({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      gsap.fromTo(
        ".fz-img",
        { scale: 1, yPercent: 0 },
        {
          scale: 1.55,
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=1200",
            scrub: 1,
            pin: ".fz-stage",
            anticipatePin: 1,
          },
        }
      );
      gsap.fromTo(
        ".fz-cap",
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          scrollTrigger: { trigger: root.current, start: "top top", end: "+=400", scrub: 1 },
        }
      );
    },
    { scope: root, dependencies: [reduce] }
  );

  return (
    <section ref={root} className="relative">
      <div className="fz-stage relative h-svh overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="fz-img h-full w-full object-cover will-change-transform"
        />
        <div className="pointer-events-none absolute inset-0 bg-ink/30" aria-hidden />
        <div className="fz-cap absolute inset-x-0 bottom-16 px-6 text-center">
          <p className="mx-auto max-w-xl font-display text-3xl text-paper md:text-5xl">{caption}</p>
          <p className="mt-3 font-body text-sm uppercase tracking-[0.25em] text-paper/70">
            Scroll to look closer
          </p>
        </div>
      </div>
    </section>
  );
}
