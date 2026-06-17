"use client";

/* ─────────────────────────────────────────────────────────────
   STAGE 4 — Three.js fundamentals (VANILLA, no R3F).
   React only mounts the canvas; everything inside the effect is hand-written
   Three.js so the primitives are visible:
     scene · camera · geometry · material · light · renderer · render loop ·
     resize · DISPOSE (memory).
   Perf gate (all three, on purpose):
     • DPR capped at 2 (retina doesn't 4× the fragment cost)
     • render loop PAUSES when the tab is hidden
     • full DISPOSE on teardown (geometry, material, renderer, listeners, rAF)
   Reduced-motion: no auto-rotation (static frame), still fully rendered.
   ───────────────────────────────────────────────────────────── */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ThreeSandbox() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = mount.clientWidth;
    let height = mount.clientHeight;

    // ── renderer ──────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // DPR cap
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    // ── scene + camera ────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // ── geometry + material (oxidised silver) ─────────────────
    const geometry = new THREE.TorusKnotGeometry(1, 0.32, 180, 32);
    const material = new THREE.MeshStandardMaterial({
      color: 0xc8cbd0, // --color-primary (antique silver)
      metalness: 0.9,
      roughness: 0.35,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // ── lights (metal needs highlights to read) ───────────────
    const key = new THREE.DirectionalLight(0xffffff, 2.2);
    key.position.set(3, 4, 5);
    const rim = new THREE.DirectionalLight(0xb23a52, 1.4); // rose rim — the brand accent
    rim.position.set(-4, -2, -3);
    const ambient = new THREE.AmbientLight(0x404552, 0.8);
    scene.add(key, rim, ambient);

    // ── resize (keep aspect + size correct) ───────────────────
    const onResize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", onResize);

    // ── render loop (pausable) ────────────────────────────────
    let raf = 0;
    let running = false;
    const clock = new THREE.Clock();

    const renderOnce = () => renderer.render(scene, camera);

    const tick = () => {
      const dt = clock.getDelta();
      if (!reduce) {
        mesh.rotation.x += dt * 0.3;
        mesh.rotation.y += dt * 0.45;
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      clock.start();
      if (reduce) renderOnce(); // static: draw one frame, no loop
      else raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    // pause when the tab is hidden — don't burn GPU off-screen
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    start();

    // ── DISPOSE everything on teardown (the Stage-4 lesson) ────
    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount)
        mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full" />;
}
