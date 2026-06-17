"use client";

/* STAGE 6 wrapper — makes the shader shippable, same rules as the R3F hero:
   ssr:false + lazy import, IntersectionObserver gates the mount, and a static
   CSS-gradient fallback for weak devices (the 3D/shader bundle never downloads
   there). Reduced-motion still renders the shader but frozen (frameloop demand
   in the scene), so the look survives without the animation cost. */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

const ShaderScene = dynamic(() => import("./ShaderScene"), { ssr: false });

export function ShaderBand({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const cores = navigator.hardwareConcurrency ?? 8;
    const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    if (cores <= 4 || mem <= 4) setLite(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const showShader = inView && !lite;

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* shader (or static gradient) fills the band */}
      <div
        className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,var(--color-bg),var(--color-surface-2)_60%,var(--color-bg))]"
        aria-hidden
      >
        {showShader && (
          <div className="h-full w-full">
            <ShaderScene />
          </div>
        )}
      </div>
      {/* legibility veil over the moving surface */}
      <div className="absolute inset-0 -z-10 bg-bg/40" aria-hidden />
      {children}
    </section>
  );
}
