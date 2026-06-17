"use client";

/* Shippable wrapper for the WebGL scene: dynamic ssr:false + IntersectionObserver
   mount + weak-device/reduced fallback to a soft CSS gradient (so the hero still
   glows without WebGL). */

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const AuraScene = dynamic(() => import("./AuraScene"), { ssr: false });

function Fallback() {
  return (
    <div
      className="h-full w-full"
      style={{ background: "radial-gradient(60% 55% at 50% 42%, #cdb8e8 0%, #f7c9c0 42%, #faf6f1 88%)" }}
      aria-hidden
    />
  );
}

export function AuraStage() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false); // load WebGL once it nears view
  const [visible, setVisible] = useState(false);  // pause render loop when off-screen
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const c = navigator.hardwareConcurrency ?? 8;
    const m = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
    if (c <= 4 && m <= 4) setLite(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setVisible(e.isIntersecting);
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="h-full w-full">
      {mounted && !lite ? <AuraScene active={visible} /> : <Fallback />}
    </div>
  );
}
