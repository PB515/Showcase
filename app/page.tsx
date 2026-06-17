/* THE RANGE — central hub. A quiet dark frame; the six demo covers carry the
   colour. Hero → demo grid (stylized covers + live links) → the method note. */

import { DEMOS } from "@/lib/hub/demos";
import { DemoCard } from "@/components/hub/DemoCard";
import { Reveal } from "@/components/hub/Reveal";

export default function Home() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-line bg-bg/80 px-6 py-4 backdrop-blur md:px-10">
        <span className="font-serif text-xl text-ink">The Range</span>
        <a href="#work" className="text-xs uppercase tracking-[0.2em] text-muted hover:text-ink">Selected work</a>
      </header>

      <main className="px-6 md:px-10">
        {/* HERO */}
        <section className="mx-auto flex min-h-svh max-w-5xl flex-col justify-center py-32">
          <Reveal>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.3em] text-muted">
              Premium-visual frontend craft
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-6 font-serif text-6xl leading-[1.02] text-ink md:text-8xl">
              One craftsperson.
              <br />
              Six worlds.
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
              Six sites, six aesthetics — luxury, sci-fi, two takes on Indian
              maximalism, brutalist editorial, and liquid 3D. Each built to feel
              like a person with taste made it, not a template. Every one is live.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <p className="mt-12 font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.25em] text-muted">
              ↓ The work
            </p>
          </Reveal>
        </section>

        {/* WORK GRID */}
        <section id="work" className="mx-auto max-w-6xl pb-32">
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-2">
            {DEMOS.map((d, i) => (
              <Reveal key={d.id} delay={(i % 2) * 0.08}>
                <DemoCard d={d} />
              </Reveal>
            ))}
          </div>
        </section>

        {/* THE METHOD */}
        <section className="mx-auto max-w-3xl border-t border-line py-28 text-center">
          <Reveal>
            <p className="font-[family-name:var(--font-mono)] text-xs uppercase tracking-[0.3em] text-muted">The method</p>
            <h2 className="mt-5 font-serif text-3xl leading-snug text-ink md:text-5xl">
              Not effects for their own sake — taste, deployed with restraint.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-muted">
              Each piece is moodboarded before a line of code, right-sized to its
              brief, and held to a real performance + accessibility bar. The craft
              is captured as reusable recipes — so the next build is faster, and
              better.
            </p>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-8 text-center font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.2em] text-muted md:px-10">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <span className="font-serif text-base normal-case tracking-normal text-ink">The Range</span>
          <span>Six aesthetics · one hand</span>
          <span>© 2026</span>
        </div>
      </footer>
    </>
  );
}
