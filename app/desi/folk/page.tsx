/* DESI MAXIMALISM — page #1: folk-painting maximalism.
   Heavy-media pipeline (lazy + async-decode + fixed aspect = no CLS), hover
   image-distortion (RippleImage), scroll-scrubbed zoom (FolkZoom), depth
   parallax. Images in /public/art are on-brand PLACEHOLDERS — drop real
   public-domain paintings (same filenames) to swap. Same brand as "/" (Rang),
   opposite execution: painterly, not poster-flat. */

import { SplitText } from "@/components/desi/SplitText";
import { Reveal } from "@/components/desi/Reveal";
import { MouseLayer, ScrollLayer } from "@/components/desi/Parallax";
import { RippleImage } from "@/components/desi/RippleImage";
import { Procession } from "@/components/desi/Procession";
import { ClimaxToggle } from "@/components/desi/ClimaxToggle";
import { SunBurst, Paisley, CornerFloret, ScallopDivider } from "@/components/desi/Ornaments";

const GALLERY = [
  { src: "/art/peacock.webp", fb: "/art/peacock.svg", dev: "मोर", lat: "Peacock", note: "Pichwai · Nathdwara" },
  { src: "/art/lotus.webp", fb: "/art/lotus.svg", dev: "कमल", lat: "Lotus", note: "Miniature · Rajasthan" },
  { src: "/art/sun.webp", fb: "/art/sun.svg", dev: "सूर्य", lat: "Surya", note: "Konark · Odisha" },
];

export default function Folk() {
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-ink/10 bg-paper/80 px-6 py-4 backdrop-blur md:px-10">
        <a href="/desi" className="font-display text-2xl text-ink">
          रंग <span className="text-base text-gold-deep">Rang</span>
        </a>
        <nav className="flex items-center gap-6 font-body text-sm text-ink-soft">
          <a href="/desi" className="hidden hover:text-rani md:inline">Posters</a>
          <a href="#gallery" className="hidden hover:text-rani md:inline">Gallery</a>
          <a data-cursor href="#zoom" className="rounded-md border border-ink/20 px-4 py-1.5 text-ink hover:bg-marigold">
            Look closer
          </a>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="relative flex min-h-svh items-center overflow-hidden pt-24">
          <div className="grain absolute inset-0 opacity-60" aria-hidden />
          <MouseLayer depth={20} className="pointer-events-none absolute inset-0">
            <SunBurst className="absolute -right-24 -top-24 h-96 w-96 text-marigold opacity-25" spin />
            <Paisley className="absolute bottom-12 left-[6%] h-24 w-24 text-rani opacity-50 motion-safe:animate-[sway_7s_ease-in-out_infinite]" />
          </MouseLayer>

          <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2 md:px-10">
            <div>
              <p className="mb-4 font-body text-xs uppercase tracking-[0.3em] text-gold-deep">
                The painted India
              </p>
              <h1 className="font-display text-6xl leading-[0.95] text-ink md:text-8xl">
                <SplitText text="लोक" /> <span className="text-rani"><SplitText text="कला" delay={0.2} /></span>
              </h1>
              <p className="mt-4 font-display text-2xl text-ink md:text-4xl">
                <SplitText text="Folk art, up close." by="word" stagger={0.07} />
              </p>
              <p className="mt-6 max-w-md font-body text-base leading-relaxed text-ink-soft">
                Pichwai, miniature, Pattachitra — centuries of hand-painted
                detail. Hover a piece to feel it ripple; scroll to look closer.
              </p>
              <div className="mt-8">
                <a data-cursor href="#gallery" className="bg-rani px-7 py-3 font-body font-semibold text-paper transition-transform hover:-translate-y-0.5">
                  Enter the gallery
                </a>
              </div>
            </div>

            <MouseLayer depth={-16}>
              <div className="relative mx-auto max-w-sm">
                <CornerFloret className="absolute -left-5 -top-5 z-10 h-12 w-12 text-gold" />
                <CornerFloret className="absolute -bottom-5 -right-5 z-10 h-12 w-12 text-gold" />
                <RippleImage src="/art/peacock.webp" fallback="/art/peacock.svg" alt="Peacock, Pichwai style" className="aspect-[3/4] w-full border-4 border-gold" />
              </div>
            </MouseLayer>
          </div>

          <ScallopDivider className="absolute inset-x-0 bottom-0 h-5 w-full text-rani" />
        </section>

        {/* PROCESSION — horizontal scroll-painting (concept B) */}
        <Procession />

        {/* GALLERY — heavy-media + hover ripple */}
        <section id="gallery" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-deep">The gallery</p>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-6xl">Hover to feel the paint move.</h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.lat} delay={i * 0.1}>
                <figure data-cursor className="group">
                  <RippleImage src={g.src} fallback={g.fb} alt={`${g.lat} — ${g.note}`} className="aspect-[3/4] w-full rounded-sm border-2 border-gold" />
                  <figcaption className="mt-4 flex items-baseline justify-between">
                    <span className="font-display text-2xl text-ink">{g.dev} <span className="text-gold-deep">· {g.lat}</span></span>
                    <span className="font-body text-xs uppercase tracking-[0.18em] text-ink-soft">{g.note}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>

        {/* CLIMAX (concept A) — toggle: your scrubbed video vs in-code 2D rangoli */}
        <div id="zoom">
          <ClimaxToggle />
        </div>

        {/* CLOSING — parallax ornaments */}
        <section className="relative overflow-hidden bg-ink py-32 text-center text-paper md:py-44">
          <ScrollLayer speed={-0.3} className="pointer-events-none absolute -left-10 top-4">
            <SunBurst className="h-64 w-64 text-marigold opacity-25" spin />
          </ScrollLayer>
          <ScrollLayer speed={0.4} className="pointer-events-none absolute -right-8 bottom-0">
            <Paisley className="h-44 w-44 text-rani opacity-40 motion-safe:animate-[sway_8s_ease-in-out_infinite]" />
          </ScrollLayer>
          <div className="relative z-10 mx-auto max-w-3xl px-6">
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              <SplitText text="Heritage, in high definition." by="word" stagger={0.06} />
            </h2>
            <p className="mx-auto mt-8 max-w-xl font-body text-lg leading-relaxed text-paper/80">
              The same craft as the poster wall — different soul. Loud where it
              should be loud; patient where the detail deserves it.
            </p>
            <div className="mt-10">
              <a data-cursor href="/desi" className="bg-marigold px-8 py-3 font-body font-semibold text-ink transition-transform hover:-translate-y-0.5">
                ← Back to the posters
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-paper py-12 text-center">
        <SunBurst className="mx-auto mb-4 h-12 w-12 text-gold-deep" />
        <p className="font-display text-2xl text-ink">रंग Rang</p>
        <p className="mt-1 font-body text-sm text-ink-soft">Folk-painting maximalism — placeholder art, swap real PD paintings in /public/art.</p>
      </footer>
    </>
  );
}
