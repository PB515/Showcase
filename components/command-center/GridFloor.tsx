/* The glowing perspective grid floor — pure CSS (synthwave horizon).
   Two layers: a far horizon glow + a perspective-tilted moving grid, masked
   so it fades into the dark. Decorative; server component, no JS. */

export function GridFloor() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* horizon glow */}
      <div className="absolute inset-x-0 top-1/2 h-px bg-cyan/40 blur-[1px]" />
      <div className="absolute left-1/2 top-1/2 h-40 w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-[100%] bg-cyan/20 blur-3xl" />

      {/* perspective grid, drifting */}
      <div className="absolute inset-x-0 bottom-0 top-1/2 [perspective:420px]">
        <div
          className="grid-floor absolute inset-0 origin-top [transform:rotateX(62deg)] opacity-50 motion-safe:animate-[gridmove_6s_linear_infinite]"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, #000 30%, #000 70%, transparent)",
          }}
        />
      </div>

      {/* top vignette so the grid never fights the content */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,transparent,var(--color-bg)_75%)]" />
    </div>
  );
}
