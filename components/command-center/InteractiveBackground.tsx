"use client";

/* INTERACTIVE BACKGROUND — a live "agent mesh".
   Drifting nodes on a 2D canvas; near neighbours link with faint lines; the
   cursor reaches lines toward nearby nodes and gently pushes them away.
   Perf: capped node count, DPR cap, single rAF, paused when tab hidden.
   Reduced-motion: one static frame, no loop, no cursor reactivity. */

import { useEffect, useRef } from "react";

type Pt = { x: number; y: number; vx: number; vy: number };

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let pts: Pt[] = [];
    const mouse = { x: -9999, y: -9999 };
    const LINK = 130; // node-to-node link distance
    const REACH = 190; // cursor reach distance

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const init = () => {
      const count = Math.max(28, Math.min(90, Math.floor((w * h) / 17000)));
      pts = Array.from({ length: count }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.25, 0.25),
        vy: rand(-0.25, 0.25),
      }));
    };

    const resize = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += w;
          else if (p.x > w) p.x -= w;
          if (p.y < 0) p.y += h;
          else if (p.y > h) p.y -= h;

          // gentle push away from the cursor
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REACH * REACH && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const f = (1 - d / REACH) * 0.6;
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(56,189,248,0.85)";
        ctx.fill();
      }

      // links between near nodes
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK * LINK) {
            const a = (1 - Math.sqrt(d2) / LINK) * 0.18;
            ctx.strokeStyle = `rgba(56,189,248,${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      // brighter links from the cursor to nearby nodes
      if (!reduce) {
        for (const p of pts) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < REACH * REACH) {
            const a = (1 - Math.sqrt(d2) / REACH) * 0.5;
            ctx.strokeStyle = `rgba(34,211,238,${a})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }
    };

    let raf = 0;
    let running = false;
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running) return;
      running = true;
      if (reduce) draw();
      else raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    resize();
    start();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerout", onLeave);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden
    />
  );
}
