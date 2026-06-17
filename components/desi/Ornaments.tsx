/* Vector ornaments — the "craft" layer (frames, motifs), NOT the main art.
   Inherit color via currentColor. Decorative → aria-hidden. */

export function SunBurst({ className = "", spin = false }: { className?: string; spin?: boolean }) {
  const rays = Array.from({ length: 24 });
  return (
    <svg
      viewBox="-50 -50 100 100"
      className={`${className} ${spin ? "motion-safe:animate-[spinSlow_40s_linear_infinite]" : ""}`}
      aria-hidden
    >
      {rays.map((_, i) => (
        <rect
          key={i}
          x="-1.2"
          y="-46"
          width="2.4"
          height={i % 2 ? 10 : 16}
          rx="1"
          fill="currentColor"
          transform={`rotate(${(i * 360) / 24})`}
        />
      ))}
      <circle r="26" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle r="18" fill="currentColor" opacity="0.12" />
      <circle r="6" fill="currentColor" />
    </svg>
  );
}

export function ScallopDivider({ className = "" }: { className?: string }) {
  const cusps = Array.from({ length: 20 });
  return (
    <svg viewBox="0 0 400 16" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        d={
          "M0,16 " +
          cusps.map((_, i) => `Q${i * 20 + 10},0 ${i * 20 + 20},16`).join(" ") +
          " V16 H0 Z"
        }
        fill="currentColor"
      />
    </svg>
  );
}

export function Paisley({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="-40 -42 80 84" className={className} aria-hidden>
      <path
        d="M0,-36 C26,-34 34,-6 20,18 C12,33 -12,37 -24,21 C-35,8 -30,-14 -13,-20 C-2,-24 9,-19 8,-8 C7,0 -2,3 -7,-2"
        fill="currentColor"
      />
      <circle cx="-8" cy="-6" r="3.5" fill="var(--color-paper)" />
    </svg>
  );
}

export function CornerFloret({ className = "" }: { className?: string }) {
  const petals = Array.from({ length: 8 });
  return (
    <svg viewBox="-30 -30 60 60" className={className} aria-hidden>
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="0"
          cy="-18"
          rx="4"
          ry="10"
          fill="currentColor"
          transform={`rotate(${i * 45})`}
        />
      ))}
      <circle r="6" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

export function Mandala({ className = "", spin = false }: { className?: string; spin?: boolean }) {
  const petals = Array.from({ length: 12 });
  const spokes = Array.from({ length: 24 });
  return (
    <svg
      viewBox="-50 -50 100 100"
      className={`${className} ${spin ? "motion-safe:animate-[spinSlow_30s_linear_infinite]" : ""}`}
      aria-hidden
    >
      <circle r="46" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle r="40" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
      {petals.map((_, i) => (
        <ellipse key={`p${i}`} cx="0" cy="-34" rx="5" ry="11" fill="currentColor" transform={`rotate(${i * 30})`} />
      ))}
      {spokes.map((_, i) => (
        <rect key={`s${i}`} x="-0.6" y="-22" width="1.2" height="8" fill="currentColor" opacity="0.7" transform={`rotate(${i * 15})`} />
      ))}
      <circle r="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <circle r="6" fill="currentColor" />
    </svg>
  );
}
