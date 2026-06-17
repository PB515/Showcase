/* DESI MAXIMALISM — page #2: vintage poster / matchbox retro.
   Built vector/CSS (no sourced images): bold flat poster blocks, ornate vector
   borders, halftone texture, kinetic Devanagari/Latin display, custom cursor
   (global), layered mouse + scroll parallax, velocity-skew marquee.
   Brand: "Rang" (रंग) — a fictional festival of Indian craft. */

import { SplitText } from "@/components/desi/SplitText";
import { Reveal } from "@/components/desi/Reveal";
import { Marquee } from "@/components/desi/Marquee";
import { MouseLayer, ScrollLayer } from "@/components/desi/Parallax";
import { SunBurst, ScallopDivider, Paisley, CornerFloret, Mandala } from "@/components/desi/Ornaments";
import { GatewayIntro } from "@/components/desi/GatewayIntro";

const POSTERS = [
  { dev: "नींबू पानी", lat: "Nimboo Pani", sub: "Fresh · pressed · daily", bg: "bg-peacock", ink: "text-paper", motif: "sun" },
  { dev: "हुस्न", lat: "Husn Safety Matches", sub: "Est. 1947 · strike anywhere", bg: "bg-vermilion", ink: "text-paper", motif: "floret" },
  { dev: "स्वदेशी", lat: "Swadesi Night", sub: "Diwali edition · invite only", bg: "bg-indigo", ink: "text-paper", motif: "mandala" },
];

export default function Home() {
  return (
    <>
      <GatewayIntro />

      {/* Nav */}
      <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between border-b border-ink/10 bg-paper/80 px-6 py-4 backdrop-blur md:px-10">
        <a href="#top" className="font-display text-2xl text-ink">
          रंग <span className="text-base text-gold-deep">Rang</span>
        </a>
        <nav className="flex items-center gap-6 font-body text-sm text-ink-soft">
          <a href="#posters" className="hidden hover:text-rani md:inline">Posters</a>
          <a href="/desi/folk" className="hidden hover:text-rani md:inline">Folk gallery</a>
          <a
            href="/desi/folk"
            data-cursor
            className="rounded-md border border-ink/20 px-4 py-1.5 text-ink hover:bg-marigold hover:text-ink"
          >
            Folk gallery →
          </a>
        </nav>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative flex min-h-svh items-center overflow-hidden">
          <div className="halftone absolute inset-0 opacity-[0.12]" style={{ color: "var(--color-ink)" }} aria-hidden />

          <MouseLayer depth={28} className="pointer-events-none absolute inset-0 grid place-items-center">
            <SunBurst className="h-[120vmin] w-[120vmin] text-marigold opacity-25" spin />
          </MouseLayer>
          <MouseLayer depth={48} className="pointer-events-none absolute inset-0">
            <Paisley className="absolute left-[8%] top-[22%] h-24 w-24 text-rani opacity-70" />
            <Paisley className="absolute right-[12%] top-[30%] h-16 w-16 -scale-x-100 text-peacock opacity-70" />
            <CornerFloret className="absolute bottom-[18%] left-[16%] h-16 w-16 text-vermilion opacity-70" />
          </MouseLayer>

          <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
            <div className="relative border-2 border-gold bg-paper/70 px-6 py-12 backdrop-blur-sm md:px-16 md:py-16">
              <CornerFloret className="absolute -left-5 -top-5 h-10 w-10 text-gold" />
              <CornerFloret className="absolute -right-5 -top-5 h-10 w-10 text-gold" />
              <CornerFloret className="absolute -bottom-5 -left-5 h-10 w-10 text-gold" />
              <CornerFloret className="absolute -bottom-5 -right-5 h-10 w-10 text-gold" />

              <p className="mb-4 font-body text-xs uppercase tracking-[0.32em] text-gold-deep">
                A festival of Indian craft
              </p>
              <h1 className="font-poster text-7xl leading-[0.9] text-vermilion md:text-9xl">
                <SplitText text="रंग" />
              </h1>
              <p className="mt-4 font-display text-3xl text-ink md:text-5xl">
                <SplitText text="Colour, out loud." by="word" stagger={0.08} />
              </p>
              <p className="mx-auto mt-6 max-w-md font-body text-base leading-relaxed text-ink-soft">
                Folk painting, block print, and matchbox poster art — the loud,
                layered, unapologetic India. Brought to the web with real craft.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a data-cursor href="#posters" className="bg-vermilion px-7 py-3 font-body font-semibold text-paper transition-transform hover:-translate-y-0.5">
                  See the posters
                </a>
                <a data-cursor href="#craft" className="border border-ink/30 px-7 py-3 font-body text-ink transition-colors hover:bg-marigold">
                  The craft
                </a>
              </div>
            </div>
          </div>

          <ScallopDivider className="absolute inset-x-0 bottom-0 h-5 w-full text-rani" />
        </section>

        {/* VELOCITY MARQUEE */}
        <div className="bg-rani py-5">
          <Marquee items={["उत्सव", "festival", "रंग", "block print", "हस्तकला", "matchbox art", "मेला"]} />
        </div>

        {/* POSTER GALLERY */}
        <section id="posters" className="grain mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="mb-14 text-center">
              <p className="font-body text-xs uppercase tracking-[0.3em] text-gold-deep">The poster wall</p>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-6xl">Vintage labels, reimagined.</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {POSTERS.map((p, i) => (
              <Reveal key={p.lat} delay={i * 0.1}>
                <article data-cursor className={`group relative aspect-[3/4] cursor-pointer overflow-hidden border-2 border-gold ${p.bg} ${p.ink}`}>
                  <div className="halftone absolute inset-0 opacity-20" style={{ color: "#000" }} aria-hidden />
                  <div className="absolute inset-3 border border-paper/40" aria-hidden />
                  <div className="relative flex h-full flex-col items-center justify-center p-6 text-center transition-transform duration-500 group-hover:scale-[1.04]">
                    <div className="relative mb-5 grid h-24 w-24 place-items-center">
                      <span className="absolute inset-0 rounded-full bg-paper/15 blur-xl motion-safe:animate-[breathe_6s_ease-in-out_infinite]" aria-hidden />
                      {p.motif === "sun" && <SunBurst className="relative h-20 w-20 text-paper" spin />}
                      {p.motif === "floret" && <CornerFloret className="relative h-20 w-20 text-paper motion-safe:animate-[spinSlow_26s_linear_infinite_reverse]" />}
                      {p.motif === "mandala" && <Mandala className="relative h-20 w-20 text-paper" spin />}
                    </div>
                    <h3 className="font-poster text-5xl leading-none">{p.dev}</h3>
                    <p className="mt-3 font-poster text-lg uppercase tracking-wide">{p.lat}</p>
                    <p className="mt-3 font-body text-xs uppercase tracking-[0.22em] opacity-80">{p.sub}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* STATEMENT — split-text + scroll-parallax ornaments */}
        <section id="craft" className="relative overflow-hidden border-y-2 border-gold bg-ink py-32 text-paper md:py-44">
          <ScrollLayer speed={-0.4} className="pointer-events-none absolute -right-10 top-0">
            <SunBurst className="h-72 w-72 text-marigold opacity-30" spin />
          </ScrollLayer>
          <ScrollLayer speed={0.5} className="pointer-events-none absolute -left-6 bottom-0">
            <Paisley className="h-48 w-48 text-rani opacity-40 motion-safe:animate-[sway_6s_ease-in-out_infinite]" />
          </ScrollLayer>
          {/* ambient floating motifs — keep the dark band alive without scrolling */}
          <Mandala className="pointer-events-none absolute left-[6%] top-[16%] h-20 w-20 text-gold opacity-20" spin />
          <CornerFloret className="pointer-events-none absolute right-[12%] bottom-[20%] h-16 w-16 text-marigold opacity-25 motion-safe:animate-[floatY_7s_ease-in-out_infinite]" />
          <Paisley className="pointer-events-none absolute left-[20%] top-[58%] h-12 w-12 text-peacock opacity-30 motion-safe:animate-[floatY_9s_ease-in-out_infinite]" />

          <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
            <h2 className="font-display text-4xl leading-tight md:text-6xl">
              <SplitText text="Not minimal. Never quiet." by="word" stagger={0.06} />
            </h2>
            <p className="mx-auto mt-8 max-w-xl font-body text-lg leading-relaxed text-paper/80">
              Most of the web is afraid of colour. We make the opposite — curated
              abundance, layered ornament, type that sings. A festival with an
              art director.
            </p>
            <div className="mt-10">
              <a data-cursor href="#top" className="bg-marigold px-8 py-3 font-body font-semibold text-ink transition-transform hover:-translate-y-0.5">
                Back to the top ↑
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-paper py-12 text-center">
        <SunBurst className="mx-auto mb-4 h-12 w-12 text-gold-deep" />
        <p className="font-display text-2xl text-ink">रंग Rang</p>
        <p className="mt-1 font-body text-sm text-ink-soft">Desi maximalism — a craft-lab range piece.</p>
      </footer>
    </>
  );
}
