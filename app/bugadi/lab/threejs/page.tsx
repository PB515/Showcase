/* STAGE 4 ARTIFACT — vanilla Three.js sandbox.
   A rotating oxidised-silver torus knot. The point isn't the shape — it's the
   hand-written lifecycle (renderer/scene/camera/geometry/material/light/loop/
   resize/dispose) you have to understand before R3F hides it in Stage 5. */

import { ThreeSandbox } from "@/components/bugadi/ThreeSandbox";

export default function ThreeLab() {
  return (
    <main className="relative h-svh w-full overflow-hidden">
      {/* the canvas fills the viewport */}
      <div className="absolute inset-0">
        <ThreeSandbox />
      </div>

      {/* overlay caption */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.28em] text-ink-muted">
            Stage 4 · Three.js fundamentals (vanilla)
          </p>
          <h1 className="mt-3 max-w-xl font-heading text-3xl leading-tight text-ink md:text-5xl">
            The primitives, by hand — before R3F hides them.
          </h1>
          <p className="mt-3 max-w-md text-sm text-ink-muted">
            DPR capped · loop pauses when the tab is hidden · full dispose on
            teardown. <a href="/bugadi" className="pointer-events-auto underline underline-offset-4 hover:text-ink">Back to the lookbook</a>
          </p>
        </div>
      </div>
    </main>
  );
}
