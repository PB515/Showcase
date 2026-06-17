"use client";

/* CONCEPT A (2D, built not filmed) — a rangoli that DRAWS ITSELF to your scroll.
   Pinned section; scroll progress blooms the rangoli ring by ring (scale + fade
   with a back-ease pop) and draws the white outline strokes (stroke-dashoffset),
   while the whole pattern slowly rotates. Flat folk palette on dark ink — locked
   camera, perfect scrub, no asset, no watermark. Reduced-motion → full static
   rangoli, no pin. */

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

const C = {
  marigold: "#F4A300",
  rani: "#BC1E63",
  peacock: "#0E7C7B",
  vermilion: "#E2402B",
  gold: "#C9A24B",
  cream: "#F4ECDA",
};

const radial = (n: number, fn: (i: number, deg: number) => React.ReactNode) =>
  Array.from({ length: n }, (_, i) => fn(i, (360 / n) * i));

export function RangoliScrub() {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useGSAP(
    () => {
      if (reduce) return;
      const rings = gsap.utils.toArray<SVGGElement>(".rg-ring");
      const draws = gsap.utils.toArray<SVGElement>(".rg-draw");
      gsap.set(rings, { transformOrigin: "0px 0px", scale: 0, autoAlpha: 0 });
      gsap.set(draws, { strokeDasharray: 1, strokeDashoffset: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=1800",
          scrub: 1,
          pin: ".rg-stage",
          anticipatePin: 1,
        },
      });
      tl.to(".rg-root", { rotate: 36, transformOrigin: "0px 0px", ease: "none" }, 0);
      rings.forEach((r, i) => {
        tl.to(r, { scale: 1, autoAlpha: 1, duration: 1, ease: "back.out(1.4)" }, i * 0.8);
      });
      draws.forEach((d, i) => {
        tl.to(d, { strokeDashoffset: 0, duration: 1, ease: "none" }, i * 0.8);
      });
    },
    { scope: root, dependencies: [reduce] }
  );

  return (
    <section ref={root} className="relative border-y-2 border-gold">
      <div className="rg-stage relative flex h-svh items-center justify-center overflow-hidden bg-ink">
        <svg viewBox="-210 -210 420 420" className="h-[88vmin] w-[88vmin] max-h-[680px] max-w-[680px]" aria-hidden>
          <g className="rg-root">
            {/* outer dotted ring */}
            <g className="rg-ring">
              {radial(24, (i, d) => (
                <circle key={i} cx="0" cy="-188" r="4" fill={C.marigold} transform={`rotate(${d})`} />
              ))}
            </g>
            {/* outer lotus petals (white outline) */}
            <g className="rg-ring">
              {radial(16, (i, d) => (
                <path
                  key={i}
                  d="M0,-170 C13,-152 13,-128 0,-120 C-13,-128 -13,-152 0,-170 Z"
                  fill={i % 2 ? C.peacock : C.cream}
                  opacity={i % 2 ? 0.9 : 0.18}
                  stroke={C.cream}
                  strokeWidth="1.5"
                  transform={`rotate(${d})`}
                />
              ))}
            </g>
            {/* paisley ring */}
            <g className="rg-ring">
              {radial(12, (i, d) => (
                <g key={i} transform={`rotate(${d}) translate(0,-118)`}>
                  <path
                    d="M0,-16 C12,-14 15,2 6,12 C0,18 -10,16 -12,7 C-13,1 -8,-4 -3,-2"
                    fill={i % 2 ? C.vermilion : C.rani}
                    stroke={C.gold}
                    strokeWidth="0.8"
                  />
                  <circle cx="-4" cy="-3" r="2.4" fill={C.marigold} />
                </g>
              ))}
            </g>
            {/* scalloped white outline circle (draws) */}
            <circle className="rg-draw" cx="0" cy="0" r="96" fill="none" stroke={C.cream} strokeWidth="2.5" pathLength={1} />
            {/* teal pointed petals */}
            <g className="rg-ring">
              {radial(12, (i, d) => (
                <path key={i} d="M0,-86 L11,-62 L0,-54 L-11,-62 Z" fill={C.peacock} transform={`rotate(${d})`} />
              ))}
            </g>
            {/* marigold petals */}
            <g className="rg-ring">
              {radial(12, (i, d) => (
                <ellipse key={i} cx="0" cy="-58" rx="9" ry="22" fill={C.marigold} transform={`rotate(${d})`} />
              ))}
            </g>
            {/* inner draw circle */}
            <circle className="rg-draw" cx="0" cy="0" r="44" fill="none" stroke={C.cream} strokeWidth="2" pathLength={1} />
            {/* center flower */}
            <g className="rg-ring">
              {radial(10, (i, d) => (
                <ellipse key={i} cx="0" cy="-26" rx="7" ry="18" fill={C.rani} transform={`rotate(${d})`} />
              ))}
              <circle cx="0" cy="0" r="11" fill={C.cream} />
              <circle cx="0" cy="0" r="5" fill={C.vermilion} />
            </g>
          </g>
        </svg>

        <div className="pointer-events-none absolute inset-x-0 bottom-14 z-10 text-center">
          <p className="mx-auto max-w-xl px-6 font-display text-3xl text-paper md:text-5xl">
            The rangoli takes shape.
          </p>
          <p className="mt-3 font-body text-sm uppercase tracking-[0.25em] text-paper/70">
            Scroll to draw it
          </p>
        </div>
      </div>
    </section>
  );
}
