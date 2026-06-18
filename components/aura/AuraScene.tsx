"use client";

/* PAGE #4 — the WebGL ceiling, "go all out" edition.
   A frosted-glass perfume bottle refracts a flowing liquid GLSL gradient,
   reflects a procedural studio-light environment, carries a printed "AURA"
   label, and is DRAGGABLE (PresentationControls — grab it to rotate, springs
   back). Bloom + drifting particles. Procedural, no assets. Canvas pauses
   when off-screen (frameloop). */

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  RoundedBox,
  MeshTransmissionMaterial,
  PresentationControls,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

const vert = /* glsl */ `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`;
const frag = /* glsl */ `
  varying vec2 vUv; uniform float uTime;
  uniform vec3 uCream; uniform vec3 uBlush; uniform vec3 uPeach; uniform vec3 uLilac; uniform vec3 uTeal;
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
  float snoise(vec2 v){const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
    vec2 i=floor(v+dot(v,C.yy));vec2 x0=v-i+dot(i,C.xx);vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
    vec4 x12=x0.xyxy+C.xxzz;x12.xy-=i1;i=mod289(i);
    vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
    vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);m=m*m;m=m*m;
    vec3 x=2.0*fract(p*C.www)-1.0;vec3 h=abs(x)-0.5;vec3 ox=floor(x+0.5);vec3 a0=x-ox;
    m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
    vec3 g;g.x=a0.x*x0.x+h.x*x0.y;g.yz=a0.yz*x12.xz+h.yz*x12.yw;return 130.0*dot(m,g);}
  float fbm(vec2 p){float v=0.0,a=0.5;for(int i=0;i<3;i++){v+=a*snoise(p);p*=2.0;a*=0.5;}return v;}
  void main(){
    vec2 p=vUv*1.8; float t=uTime*0.05;
    vec2 q=vec2(fbm(p+vec2(0.0,t)),fbm(p+vec2(4.0,t)));
    float n1=fbm(p+1.4*q)*0.5+0.5; float n2=fbm(p+vec2(2.0)-q)*0.5+0.5;
    vec3 col=mix(uCream,uBlush,smoothstep(0.2,0.8,n1));
    col=mix(col,uPeach,smoothstep(0.3,0.9,n2)*0.6);
    col=mix(col,uLilac,smoothstep(0.55,0.95,n1*n2)*0.7);
    col=mix(col,uTeal,smoothstep(0.7,1.0,n2)*0.35);
    // soft vignette frames the bottle and adds depth instead of a flat wash
    float vig = smoothstep(1.18, 0.22, length(vUv-0.5));
    col *= mix(0.78, 1.05, vig);
    gl_FragColor=vec4(col,1.0);
  }`;

function GradientPlane() {
  const ref = useRef<THREE.ShaderMaterial>(null);
  const reduce = useReducedMotion();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uCream: { value: new THREE.Color("#faf6f1") }, uBlush: { value: new THREE.Color("#f7c9c0") },
    uPeach: { value: new THREE.Color("#f6d6a8") }, uLilac: { value: new THREE.Color("#cdb8e8") },
    uTeal: { value: new THREE.Color("#a8d8d0") },
  }), []);
  useFrame((s) => { if (ref.current && !reduce) ref.current.uniforms.uTime.value = s.clock.elapsedTime; });
  return (
    <mesh position={[0, 0, -2.5]} scale={[18, 11, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial ref={ref} vertexShader={vert} fragmentShader={frag} uniforms={uniforms} />
    </mesh>
  );
}

function useLabelTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = 512; c.height = 384;
    const ctx = c.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, 512, 384);
      ctx.textAlign = "center";
      ctx.fillStyle = "#2a2230";
      ctx.font = "600 168px Georgia, 'Times New Roman', serif";
      ctx.fillText("AURA", 256, 205);
      ctx.fillStyle = "#6a5f6e";
      ctx.font = "42px Georgia, serif";
      try { (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = "10px"; } catch {}
      ctx.fillText("EAU DE PARFUM", 256, 280);
    }
    const t = new THREE.CanvasTexture(c);
    t.anisotropy = 4;
    return t;
  }, []);
}

function Bottle({ reduce }: { reduce: boolean }) {
  const label = useLabelTexture();
  return (
    <Float speed={reduce ? 0 : 1} rotationIntensity={reduce ? 0 : 0.15} floatIntensity={reduce ? 0 : 0.5}>
      <group>
        {/* liquid — fills the LOWER bottle so its surface sits below the label */}
        <RoundedBox args={[1.0, 0.92, 0.45]} radius={0.1} smoothness={4} position={[0, -0.52, 0]}>
          <meshStandardMaterial color="#e0729a" roughness={0.22} transparent opacity={0.96} />
        </RoundedBox>
        <RoundedBox args={[1.25, 1.95, 0.62]} radius={0.16} smoothness={5}>
          <MeshTransmissionMaterial
            samples={4} resolution={128} transmission={1} thickness={0.5} roughness={0.16}
            ior={1.34} chromaticAberration={0.045} distortion={0} temporalDistortion={0}
            color="#ffffff" attenuationColor="#f7c9c0" attenuationDistance={2.4}
          />
        </RoundedBox>
        {/* printed label — sits ON the glass front (z just outside it) so the
            transmission doesn't refract the text into mush */}
        <mesh position={[0, 0.16, 0.345]}>
          <planeGeometry args={[1.0, 0.56]} />
          <meshBasicMaterial map={label} transparent depthWrite={false} />
        </mesh>
        {/* neck + gold cap */}
        <mesh position={[0, 1.12, 0]}>
          <cylinderGeometry args={[0.22, 0.3, 0.28, 32]} />
          <meshStandardMaterial color="#f3ece2" roughness={0.3} />
        </mesh>
        <mesh position={[0, 1.42, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.42, 32]} />
          <meshStandardMaterial color="#caa86a" metalness={0.95} roughness={0.22} />
        </mesh>
      </group>
    </Float>
  );
}

function Particles({ count = 140 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const reduce = useReducedMotion();
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const ang = i * 2.399963; const r = 2 + (i % 11) * 0.32;
      a[i * 3] = Math.cos(ang) * r; a[i * 3 + 1] = ((i / count) * 2 - 1) * 4.5; a[i * 3 + 2] = Math.sin(ang) * r - 0.5;
    }
    return a;
  }, [count]);
  useFrame((s) => { if (ref.current && !reduce) ref.current.rotation.y = s.clock.elapsedTime * 0.04; });
  return (
    <points ref={ref}>
      <bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <pointsMaterial color="#fff7ec" size={0.05} sizeAttenuation transparent opacity={0.75} />
    </points>
  );
}

export default function AuraScene({ active = true }: { active?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6], fov: 42 }}
      gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={1.7} color="#ffffff" />
      {/* cool rim from behind — lights the glass edges so it reads 3D, not flat */}
      <directionalLight position={[-4, 3, -5]} intensity={1.3} color="#cdb8e8" />
      <Environment resolution={256}>
        <Lightformer position={[0, 3, 3]} scale={[8, 8, 1]} intensity={1.5} color="#ffffff" />
        <Lightformer position={[-5, 1, 2]} scale={[3, 8, 1]} intensity={1.1} color="#cdb8e8" />
        <Lightformer position={[5, -1, 2]} scale={[3, 8, 1]} intensity={1.1} color="#f7c9c0" />
        {/* bright bar behind the bottle → crisp edge highlight on the glass */}
        <Lightformer position={[0, 0, -4]} scale={[4, 7, 1]} intensity={0.9} color="#ffffff" />
      </Environment>
      <GradientPlane />
      <PresentationControls
        global
        cursor
        snap
        speed={1.6}
        polar={[-0.5, 0.5]}
        azimuth={[-1.2, 1.2]}
      >
        <Bottle reduce={!!reduce} />
      </PresentationControls>
      <Particles />
      <EffectComposer>
        <Bloom intensity={0.45} luminanceThreshold={0.6} luminanceSmoothing={0.3} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
