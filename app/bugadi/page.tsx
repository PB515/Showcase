/* ─────────────────────────────────────────────────────────────
   THE BUGADI SHOWPAGE — all three craft tiers on one page, gated by ?tier=.
   This is the Stage-7 deliverable: the same brand and content rendered at
   Essential / Signature / Flagship so a client can SEE the trade-off and
   self-select. The tier switcher (bottom) is the closing tool.

     ?tier=essential  → Stages 0–1: entrance + smooth-scroll + reveals (calm, fast)
     ?tier=signature  → + Stages 2–3: pinned heritage story + micro-interactions
     ?tier=flagship   → + Stages 4–6: 3D piece + animated shader   (default)
   ───────────────────────────────────────────────────────────── */

import { Hero } from "@/components/bugadi/Hero";
import { Reveal } from "@/components/bugadi/Reveal";
import { HeritageStory } from "@/components/bugadi/HeritageStory";
import { StaticHeritage } from "@/components/bugadi/StaticHeritage";
import { Hero3D } from "@/components/bugadi/Hero3D";
import { ShaderBand } from "@/components/bugadi/ShaderBand";
import { MagneticButton } from "@/components/bugadi/MagneticButton";
import { INSTAGRAM_HANDLE } from "@/lib/bugadi/site";

const PIECES = [
  { name: "Paisley climber", type: "Ear Cuff", meta: "Paisley motif · Maharashtra · Festive" },
  { name: "Temple collar", type: "Hasli", meta: "Temple motif · Tamil Nadu · Bridal" },
  { name: "Moon locket", type: "Pendant", meta: "Crescent motif · Rajasthan · Everyday" },
];

const COLLECTIONS = [
  { name: "Ear Cuffs", count: "12 pieces" },
  { name: "Earrings", count: "28 pieces" },
  { name: "Bracelets", count: "9 pieces" },
  { name: "Hasli", count: "6 pieces" },
  { name: "Pendants", count: "15 pieces" },
];

const TIERS = ["essential", "signature", "flagship"] as const;
type Tier = (typeof TIERS)[number];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tier?: string }>;
}) {
  const { tier: raw } = await searchParams;
  const tier: Tier = (TIERS as readonly string[]).includes(raw ?? "")
    ? (raw as Tier)
    : "flagship";
  const signature = tier !== "essential"; // signature or flagship
  const flagship = tier === "flagship";

  return (
    <>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-border/60 bg-bg/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-10">
          <a href="#top" className="font-heading text-xl tracking-tight text-ink">
            Bugadi
          </a>
          <nav className="flex items-center gap-6 text-sm text-ink-muted">
            <a href="#heritage" className="hidden hover:text-ink sm:inline">Heritage</a>
            <a href="#pieces" className="hidden hover:text-ink sm:inline">Pieces</a>
            <a href="#collections" className="hidden hover:text-ink sm:inline">Collections</a>
            <a href="#contact" className="rounded-md border border-border px-4 py-1.5 text-ink hover:bg-surface">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero — Stage 0 entrance (all tiers) */}
        <Hero />

        {/* Statement (all tiers) */}
        <section id="heritage" className="mx-auto max-w-5xl px-6 py-32 md:px-10 md:py-40">
          <Reveal>
            <p className="mb-6 text-xs uppercase tracking-[0.28em] text-ink-muted">Our roots</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-heading text-4xl leading-[1.1] text-ink md:text-6xl">
              Oxidised. Antique-finish.
              <br />
              <span className="text-primary">Made to be worn, not stored.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
              A bugadi is itself a traditional ear ornament. We make pieces in that
              lineage — silver-finish, deliberately aged, designed to sit in a
              modern wardrobe without losing the story they carry.
            </p>
          </Reveal>
        </section>

        {/* Selected pieces — hover micro-interactions only at Signature+ */}
        <section id="pieces" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <div className="mb-14 flex items-end justify-between">
              <h2 className="font-heading text-3xl text-ink md:text-5xl">Selected pieces</h2>
              <span className="text-sm text-ink-muted">A look, not a checkout</span>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PIECES.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.08}>
                <article
                  className={
                    signature
                      ? "group cursor-pointer transition-transform duration-500 ease-out will-change-transform hover:-translate-y-1.5"
                      : "group"
                  }
                >
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-border bg-surface">
                    <div
                      className={`absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,var(--color-surface-2),transparent_60%)] ${
                        signature ? "transition-transform duration-700 ease-out group-hover:scale-105" : ""
                      }`}
                    />
                    <span className="absolute left-5 top-5 text-xs uppercase tracking-[0.22em] text-ink-muted">
                      {p.type}
                    </span>
                    {signature && (
                      <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100" />
                    )}
                  </div>
                  <h3
                    className={`mt-4 font-heading text-2xl text-ink ${
                      signature ? "transition-colors duration-300 group-hover:text-primary" : ""
                    }`}
                  >
                    {p.name}
                  </h3>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-ink-muted">{p.meta}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Wearable Heritage — Signature: pinned story; Essential: static columns */}
        <div className="border-y border-border bg-surface/40">
          {signature ? <HeritageStory /> : <StaticHeritage />}
        </div>

        {/* The piece in 3D — Flagship only */}
        {flagship && (
          <section id="flagship" className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
            <Reveal>
              <div className="mb-12 flex items-end justify-between">
                <h2 className="font-heading text-3xl text-ink md:text-5xl">The piece, in the round.</h2>
                <span className="hidden text-sm text-ink-muted sm:inline">Drag to turn it over</span>
              </div>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-surface md:aspect-[2/1]">
                <Hero3D />
              </div>
            </Reveal>
          </section>
        )}

        {/* Collections (all tiers) */}
        <section id="collections" className="mx-auto max-w-5xl px-6 py-24 md:px-10 md:py-32">
          <Reveal>
            <p className="mb-10 text-xs uppercase tracking-[0.28em] text-ink-muted">Collections</p>
          </Reveal>
          <ul>
            {COLLECTIONS.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.05}>
                <li className="flex items-baseline justify-between border-b border-border py-6 transition-colors hover:text-ink">
                  <span className="font-heading text-3xl text-ink md:text-5xl">{c.name}</span>
                  <span className="text-sm text-ink-muted">{c.count}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>

        {/* The material — Flagship: animated shader; else: static band */}
        {flagship ? (
          <ShaderBand>
            <div className="mx-auto max-w-5xl px-6 py-32 text-center md:px-10 md:py-44">
              <Reveal>
                <p className="mb-6 text-xs uppercase tracking-[0.28em] text-ink-muted">The material</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-heading text-4xl leading-tight text-ink md:text-6xl">
                  Oxidised silver, alive.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-muted">
                  Not a flat swatch — a surface that catches light and shifts, the way
                  the real metal does in the hand.
                </p>
              </Reveal>
            </div>
          </ShaderBand>
        ) : (
          <section className="border-y border-border bg-surface/40">
            <div className="mx-auto max-w-5xl px-6 py-32 text-center md:px-10 md:py-44">
              <Reveal>
                <p className="mb-6 text-xs uppercase tracking-[0.28em] text-ink-muted">The material</p>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="font-heading text-4xl leading-tight text-ink md:text-6xl">
                  Oxidised silver.
                </h2>
              </Reveal>
            </div>
          </section>
        )}

        {/* Closing CTA — magnetic at Signature+, plain at Essential */}
        <section id="contact" className="mx-auto max-w-5xl px-6 py-32 text-center md:px-10 md:py-44">
          <Reveal>
            <h2 className="font-heading text-4xl leading-tight text-ink md:text-6xl">
              Find the piece that&apos;s yours.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            {signature ? (
              <MagneticButton
                href={`https://www.instagram.com/${INSTAGRAM_HANDLE.replace("@", "")}`}
                className="rounded-md bg-primary px-7 py-3 text-sm font-medium text-primary-ink"
              >
                See more on Instagram
              </MagneticButton>
            ) : (
              <a
                href={`https://www.instagram.com/${INSTAGRAM_HANDLE.replace("@", "")}`}
                className="inline-block rounded-md bg-primary px-7 py-3 text-sm font-medium text-primary-ink transition-opacity hover:opacity-90"
              >
                See more on Instagram
              </a>
            )}
          </Reveal>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 text-sm text-ink-muted md:flex-row md:px-10">
          <span className="font-heading text-lg text-ink">Bugadi.co</span>
          <span>Traditional ornament, styled to wear today.</span>
          <span>{INSTAGRAM_HANDLE}</span>
        </div>
      </footer>

      {/* TIER SWITCHER — the closing tool: see the same brand at each craft tier */}
      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <div className="pointer-events-auto flex items-center gap-1 rounded-full border border-border bg-surface/90 p-1 backdrop-blur">
          <span className="px-3 text-xs uppercase tracking-[0.18em] text-ink-muted">Tier</span>
          {TIERS.map((t) => (
            <a
              key={t}
              href={`/bugadi?tier=${t}`}
              className={`rounded-full px-4 py-1.5 text-sm capitalize transition-colors ${
                t === tier ? "bg-primary text-primary-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              {t}
            </a>
          ))}
          <a
            href="/bugadi/tiers"
            className="ml-1 rounded-full px-3 py-1.5 text-sm text-ink-muted hover:text-ink"
            title="What each tier includes"
          >
            ?
          </a>
        </div>
      </div>
    </>
  );
}
