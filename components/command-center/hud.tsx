/* Small sci-fi HUD primitives reused across sections. */

export function StatusDot({ color = "green" }: { color?: "green" | "cyan" | "amber" | "danger" }) {
  const map = {
    green: "bg-green",
    cyan: "bg-cyan",
    amber: "bg-amber",
    danger: "bg-danger",
  } as const;
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${map[color]} motion-safe:animate-[pulseDot_2s_ease-in-out_infinite]`}
    />
  );
}

export function MonoLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
      {children}
    </span>
  );
}

/* a thin corner-bracket frame, very "targeting reticle" */
export function Bracketed({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-cyan/60" />
      <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-cyan/60" />
      <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-cyan/60" />
      <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-cyan/60" />
      {children}
    </div>
  );
}
