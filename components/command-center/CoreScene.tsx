"use client";

/* The "neural core" — a glowing wireframe icosahedron inside two orbital rings,
   particle halo around it. Optional pointerCam: the whole rig parallaxes toward
   the mouse (used in the 3D Feature section). Default export → lazy ssr:false. */

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

function Particles({ count = 140 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // deterministic-ish spherical shell (no Math.random reliance for SSR-safety)
      const a = i * 2.399963; // golden angle
      const r = 2.6 + (i % 7) * 0.12;
      const y = 1 - (i / count) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      arr[i * 3] = Math.cos(a) * rad * r;
      arr[i * 3 + 1] = y * r;
      arr[i * 3 + 2] = Math.sin(a) * rad * r;
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#38bdf8" size={0.035} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

function Core({ pointerCam }: { pointerCam: boolean }) {
  const rig = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const reduce = useReducedMotion();
  const { pointer } = useThree();

  useFrame((_, dt) => {
    if (!reduce) {
      if (core.current) {
        core.current.rotation.y += dt * 0.3;
        core.current.rotation.x += dt * 0.12;
      }
      if (ringA.current) ringA.current.rotation.z += dt * 0.5;
      if (ringB.current) ringB.current.rotation.x += dt * 0.4;
    }
    if (rig.current) {
      const tx = pointerCam ? pointer.x * 0.5 : 0;
      const ty = pointerCam ? pointer.y * 0.4 : 0;
      rig.current.rotation.y += (tx - rig.current.rotation.y) * 0.05;
      rig.current.rotation.x += (-ty - rig.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={rig}>
      <mesh ref={core}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.7}
          wireframe
          metalness={0.2}
          roughness={0.4}
        />
      </mesh>
      {/* inner translucent glow core */}
      <mesh scale={0.62}>
        <icosahedronGeometry args={[1.4, 0]} />
        <meshBasicMaterial color="#0891b2" transparent opacity={0.28} />
      </mesh>
      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[2.4, 0.012, 16, 140]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 3, Math.PI / 2.2]}>
        <torusGeometry args={[2.9, 0.01, 16, 140]} />
        <meshBasicMaterial color="#a78bfa" />
      </mesh>
      <Particles />
    </group>
  );
}

export default function CoreScene({ pointerCam = false }: { pointerCam?: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 4, 5]} intensity={1.5} color="#22d3ee" />
      <directionalLight position={[-5, -3, 2]} intensity={1.0} color="#a78bfa" />
      <Core pointerCam={pointerCam} />
    </Canvas>
  );
}
