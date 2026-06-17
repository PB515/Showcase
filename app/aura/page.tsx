/* AURA — organic/liquid fragrance landing.
   Full-bleed WebGL hero (liquid gradient + refracting glass bottle + bloom +
   particles), elegant airy type, soft reveals. The bottle reacts to pointer +
   scroll. Procedural — no assets. */

import { AuraStage } from "@/components/aura/AuraStage";
import { Reveal } from "@/components/aura/Reveal";

const NOTES = [
  { k: "Top", n: "01", notes: "Bergamot · Pink Pepper · Dew", t: "The first breath — bright, cool, fleeting." },
  { k: "Heart", n: "02", notes: "Jasmine · Iris · White Tea", t: "The bloom — soft, floral, luminous." },
  { k: "Base", n: "03", notes: "Sandalwood · Amber · Musk", t: "The trace it leaves — warm, quiet, lasting." },
];

export default function Home() {
  return (
    <>
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 md:px-10">
        <a href="#top" className="font-display text-2xl tracking-[0.2em]">AURA</a>
        <nav className="flex items-center gap-7 font-body text-xs uppercase tracking-[0.25em] text-ink-soft">
          <a href="#notes" className="hover:text-ink">Notes</a>
          <a href="#maison" className="hidden hover:text-ink sm:inline">Maison</a>
          <a href="#shop" className="hover:text-ink">Acquire</a>
        </nav>
      </header>

      <main id="top">
        {/* HERO — full-bleed 3D */}
        <section className="relative h-svh w-full overflow-hidden">
          <div className="absolute inset-0">
            <AuraStage />
          </div>

          <div className="pointer-events-none absolute inset-x-0 top-28 text-center">
            <p className="font-body text-[11px] uppercase tracking-airy text-ink-soft">
              Maison Aura — Eau de Parfum
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-16 px-6 text-center">
            <Reveal>
              <h1 className="font-display text-5xl leading-tight text-ink md:text-7xl">
                A scent you can see.
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <a href="#notes" className="mt-7 inline-block border-b border-ink/30 pb-1 font-body text-xs uppercase tracking-[0.3em] text-ink-soft transition-colors hover:text-ink">
                Discover ↓
              </a>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="mt-6 font-body text-[10px] uppercase tracking-[0.3em] text-ink-soft/70">
                ✦ drag the bottle to turn it
              </p>
            </Reveal>
          </div>
        </section>

        {/* NOTES */}
        <section id="notes" className="mx-auto max-w-5xl px-6 py-32 md:py-44">
          <Reveal>
            <p className="text-center font-body text-[11px] uppercase tracking-airy text-gold">The composition</p>
            <h2 className="mx-auto mt-5 max-w-2xl text-center font-display text-4xl leading-snug md:text-6xl">
              Three movements, one trace.
            </h2>
          </Reveal>

          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
            {NOTES.map((m, i) => (
              <Reveal key={m.k} delay={i * 0.12}>
                <div className="rounded-2xl border border-ink/10 bg-cream-2/50 p-8 text-center backdrop-blur-sm">
                  <span className="font-body text-xs tracking-[0.3em] text-gold">{m.n}</span>
                  <h3 className="mt-3 font-display text-3xl">{m.k}</h3>
                  <p className="mt-4 font-body text-sm uppercase tracking-[0.18em] text-ink-soft">{m.notes}</p>
                  <p className="mt-5 font-body text-sm leading-relaxed text-ink/70">{m.t}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* MAISON — soft atmosphere statement */}
        <section id="maison" className="relative overflow-hidden py-40 md:py-56">
          <div className="absolute inset-0" style={{ background: "radial-gradient(70% 60% at 50% 50%, #f7c9c0 0%, #cdb8e8 45%, #faf6f1 90%)", opacity: 0.5 }} aria-hidden />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <Reveal>
              <h2 className="font-display text-4xl leading-tight md:text-6xl">
                Light, made wearable.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mx-auto mt-8 max-w-xl font-body leading-relaxed text-ink/70">
                AURA is composed in the space between colour and scent — a fragrance
                that behaves like light through glass. Bottled in frosted crystal,
                made in small batches, meant to be lingered in.
              </p>
            </Reveal>
          </div>
        </section>

        {/* SHOP */}
        <section id="shop" className="mx-auto max-w-3xl px-6 py-32 text-center md:py-44">
          <Reveal>
            <h2 className="font-display text-5xl leading-none md:text-7xl">AURA</h2>
            <p className="mt-4 font-body text-sm uppercase tracking-[0.25em] text-ink-soft">Eau de Parfum · 50ml</p>
            <p className="mt-6 font-display text-3xl text-ink">₹ 8,400</p>
            <a href="#top" className="mt-9 inline-block rounded-full bg-ink px-9 py-3.5 font-body text-xs uppercase tracking-[0.25em] text-cream transition-opacity hover:opacity-90">
              Acquire
            </a>
          </Reveal>
        </section>
      </main>

      <footer className="border-t border-ink/10 px-6 py-10 text-center font-body text-[11px] uppercase tracking-[0.22em] text-ink-soft md:px-10">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <span className="font-display text-lg tracking-[0.2em] text-ink">AURA</span>
          <span>A scent you can see</span>
          <span>A craft-lab range piece · 2026</span>
        </div>
      </footer>
    </>
  );
}
