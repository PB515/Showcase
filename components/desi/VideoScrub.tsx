"use client";

/* CONCEPT A — scroll-scrubbed video climax.
   Section pins; scroll progress drives video.currentTime (you scrub the clip
   with the wheel). If the real clip isn't present yet, it gracefully falls
   back to a scroll-driven "rangoli bloom" (a Mandala that grows + rotates with
   progress) so the mechanic is live today. Drop /video/climax.mp4 to swap.
   Reduced-motion → no pin; shows poster / static bloom. */

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "motion/react";
import { Mandala } from "./Ornaments";

gsap.registerPlugin(ScrollTrigger);

export function VideoScrub() {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const bloomRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [hasVideo, setHasVideo] = useState(true);

  useGSAP(
    () => {
      if (reduce) return;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: "+=1600",
        scrub: 1,
        pin: ".vid-stage",
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const v = videoRef.current;
          if (hasVideo && v && (v.duration || 0) > 0) {
            v.currentTime = Math.min(v.duration - 0.05, p * v.duration);
          }
          if (!hasVideo && bloomRef.current) {
            bloomRef.current.style.transform = `translate(-50%,-50%) scale(${(0.35 + p * 0.95).toFixed(3)}) rotate(${(p * 140).toFixed(1)}deg)`;
            bloomRef.current.style.opacity = (0.25 + p * 0.75).toFixed(3);
          }
        },
      });
      return () => st.kill();
    },
    { scope: root, dependencies: [reduce, hasVideo] }
  );

  return (
    <section ref={root} className="relative border-y-2 border-gold">
      <div className="vid-stage relative flex h-svh items-center justify-center overflow-hidden bg-ink">
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover ${hasVideo ? "" : "hidden"}`}
          muted
          playsInline
          preload="auto"
          poster="/video/climax-poster.jpg"
          onError={() => setHasVideo(false)}
        >
          {/* all-keyframe re-encode first (smooth scrubbing), original as fallback */}
          <source src="/video/climax-scrub.mp4" type="video/mp4" />
          <source src="/video/climax.mp4" type="video/mp4" />
        </video>

        {!hasVideo && (
          <div
            ref={bloomRef}
            className="absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin]"
            style={{ transform: "translate(-50%,-50%) scale(0.6) rotate(0deg)", opacity: 0.5 }}
          >
            <Mandala className="h-full w-full text-marigold" />
            <Mandala className="absolute inset-0 h-full w-full scale-[0.66] text-rani" />
            <Mandala className="absolute inset-0 h-full w-full scale-[0.4] text-peacock" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-ink/25" aria-hidden />
        <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 text-center">
          <p className="mx-auto max-w-xl px-6 font-display text-3xl text-paper md:text-5xl">
            {hasVideo ? "Watch it bloom." : "The rangoli takes shape."}
          </p>
          <p className="mt-3 font-body text-sm uppercase tracking-[0.25em] text-paper/70">
            Scroll to control time
          </p>
        </div>
      </div>
    </section>
  );
}
