"use client";

/* ─────────────────────────────────────────────────────────────
   STAGE 5 — R3F + Drei. The SAME silver piece as the vanilla sandbox,
   now declarative. <Canvas> owns the renderer/loop/resize/dispose that we
   hand-wrote in Stage 4 — note how much it hides (and why Stage 4 mattered
   when this leaks). Default export so it can be dynamically imported ssr:false.
   Perf: dpr={[1,2]} caps DPR; mounted only when in view (see Hero3D wrapper).
   ───────────────────────────────────────────────────────────── */

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls } from "@react-three/drei";
import { useReducedMotion } from "motion/react";

function Piece() {
  return (
    <mesh>
      <torusKnotGeometry args={[1, 0.32, 180, 32]} />
      <meshStandardMaterial color="#c8cbd0" metalness={0.9} roughness={0.35} />
    </mesh>
  );
}

export default function Hero3DScene() {
  const reduce = useReducedMotion();

  return (
    <Canvas
      dpr={[1, 2]} // DPR capped at 2 — the biggest 3D perf lever
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.8} color="#404552" />
      <directionalLight position={[3, 4, 5]} intensity={2.2} />
      {/* rose rim — the brand accent, in 3D */}
      <directionalLight position={[-4, -2, -3]} intensity={1.4} color="#b23a52" />

      <Float
        speed={reduce ? 0 : 1.2}
        rotationIntensity={reduce ? 0 : 0.6}
        floatIntensity={reduce ? 0 : 0.8}
      >
        <Piece />
      </Float>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!reduce}
        autoRotateSpeed={0.8}
      />
    </Canvas>
  );
}
