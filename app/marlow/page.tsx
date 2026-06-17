/* MARLOW — brutalist photographer portfolio (home).
   Austere paper/ink + one electric-red accent, oversized Anton display, mono
   meta, raw grid, thick rules. Photos auto-swap from labelled placeholders to
   /public/photos/*.webp on drop. Work tiles link to /marlow/work/[slug] (detail route
   + shared-element morph + page transitions come next). */

import { PhotoFrame } from "@/components/marlow/PhotoFrame";
import { WorkGallery } from "@/components/marlow/WorkGallery";

export default function Home() {
  return (
    <>
      <main id="top" className="pt-12">
        {/* HERO */}
        <section className="px-5 pt-16 md:px-8 md:pt-24">
          <div className="flex flex-wrap items-end justify-between gap-2 border-b-2 border-line pb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span>Photographer</span>
            <span>Mumbai / London</span>
            <span>Est. 2014</span>
            <span className="text-accent">Available 2026</span>
          </div>

          <h1 className="mt-6 font-display text-[20vw] leading-[0.82] tracking-tight md:text-[15vw]">
            MARLOW
          </h1>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <p className="max-w-md font-body text-base leading-snug text-ink/80">
              Editorial, fashion and portrait photography. Light, restraint, and
              the moment just before.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">(Scroll)</p>
          </div>

          <div className="mt-10">
            <PhotoFrame src="/photos/hero.webp" label="hero — 3:2" className="aspect-[3/2] w-full" />
          </div>
        </section>

        {/* WORK GRID */}
        <section id="work" className="mt-24 px-5 md:px-8">
          <div className="flex items-end justify-between border-b-2 border-line pb-3">
            <h2 className="font-display text-4xl md:text-6xl">Selected work</h2>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">(06)</span>
          </div>

          <WorkGallery />
        </section>

        {/* STUDIO */}
        <section id="studio" className="mt-28 grid grid-cols-1 gap-8 px-5 md:grid-cols-[1fr_0.8fr] md:px-8">
          <div>
            <h2 className="font-display text-5xl md:text-7xl">The studio</h2>
            <p className="mt-6 max-w-md font-body leading-relaxed text-ink/80">
              Marlow is a photographer working across editorial, fashion and
              portraiture. The work is quiet and deliberate — natural light, film,
              and a refusal to over-direct. Based between Mumbai and London,
              shooting worldwide.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 font-mono text-xs uppercase tracking-[0.16em] text-muted">
              <div className="border-t border-line pt-2">Clients<br /><span className="text-ink">Vogue · Kinfolk · Aesop</span></div>
              <div className="border-t border-line pt-2">Awards<br /><span className="text-ink">D&amp;AD · ADC</span></div>
            </div>
          </div>
          <PhotoFrame src="/photos/about.webp" label="about — 4:5" className="aspect-[4/5] w-full" />
        </section>

        {/* CONTACT */}
        <section id="contact" className="mt-28 border-t-2 border-line px-5 py-20 md:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Commissions &amp; prints</p>
          <a href="mailto:studio@marlow.photo" className="mt-4 block font-display text-[12vw] leading-none hover:text-accent md:text-[8vw]">
            STUDIO@MARLOW.PHOTO
          </a>
        </section>
      </main>

      <footer className="border-t-2 border-line px-5 py-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted md:px-8">
        <div className="flex flex-wrap justify-between gap-2">
          <span>MARLOW — Photographer</span>
          <span>© 2026 — All rights reserved</span>
          <span>A craft-lab range piece</span>
        </div>
      </footer>
    </>
  );
}
