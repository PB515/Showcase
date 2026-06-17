/* STAGE 7 — the closing tool. The three craft tiers as packages: what each
   includes, the trade-off the client is buying, who it's for, and a live link
   to see the same brand rendered at that tier. This is the sales conversation
   made into a page. Mirrors craft-lab/WHEN-TO-USE.md (the rubric). */

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craft tiers — Bugadi showpage",
  description: "Essential, Signature, Flagship — the same brand at three craft tiers.",
};

const TIERS = [
  {
    id: "essential",
    name: "Essential",
    line: "Clean, calm, and quietly expensive.",
    includes: [
      "Choreographed entrance (staggered, eased)",
      "Smooth scroll (Lenis)",
      "Reveal-on-scroll sections",
      "Static heritage + content",
    ],
    tradeoff: "Premium feel with zero engineering tax. Ships fast, near-zero perf risk.",
    earns: "Conversion sites, content brands, tight budgets and timelines.",
    stages: "Stages 0–1",
  },
  {
    id: "signature",
    name: "Signature",
    line: "A moment people remember.",
    includes: [
      "Everything in Essential",
      "Pinned heritage scroll-story (GSAP)",
      "Magnetic CTA + card hover micro-interactions",
      "Choreographed, scroll-driven narrative",
    ],
    tradeoff: "An authored, cinematic feel. Still fast; modest extra build time.",
    earns: "Brands that want a signature moment — portfolios, studios, considered products.",
    stages: "+ Stages 2–3",
  },
  {
    id: "flagship",
    name: "Flagship",
    line: "The brand becomes the experience.",
    includes: [
      "Everything in Signature",
      "Interactive 3D piece (R3F, drag to rotate)",
      "Animated oxidised-silver shader",
      "Lazy-loaded, capped, with static fallbacks",
    ],
    tradeoff: "A thing competitors can't cheaply reproduce — at a real engineering and perf budget.",
    earns: "Launches, luxury, agencies — where the experience IS the pitch and the budget allows.",
    stages: "+ Stages 4–6",
  },
];

export default function TiersPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <p className="text-xs uppercase tracking-[0.28em] text-ink-muted">The method</p>
      <h1 className="mt-3 max-w-2xl font-heading text-4xl leading-tight text-ink md:text-6xl">
        One brand, three craft tiers.
      </h1>
      <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-muted md:text-lg">
        The same Bugadi content, delivered at three levels of craft. Not every brand
        earns the top tier — the skill is matching the tier to the brief. See each one
        live, then read the rubric.
      </p>

      <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
        {TIERS.map((t) => (
          <article
            key={t.id}
            className="flex flex-col rounded-lg border border-border bg-surface/40 p-7"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-ink-muted">{t.stages}</span>
            <h2 className="mt-2 font-heading text-3xl text-primary">{t.name}</h2>
            <p className="mt-1 text-sm text-ink">{t.line}</p>

            <ul className="mt-6 space-y-2 text-sm text-ink-muted">
              {t.includes.map((it) => (
                <li key={it} className="flex gap-2">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  {it}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-border pt-5 text-sm">
              <p className="text-ink-muted">
                <span className="text-ink">Trade-off:</span> {t.tradeoff}
              </p>
              <p className="mt-3 text-ink-muted">
                <span className="text-ink">Earns it:</span> {t.earns}
              </p>
            </div>

            <a
              href={`/bugadi?tier=${t.id}`}
              className="mt-7 inline-block rounded-md bg-primary px-5 py-2.5 text-center text-sm font-medium text-primary-ink transition-opacity hover:opacity-90"
            >
              View live →
            </a>
          </article>
        ))}
      </div>

      <p className="mt-12 text-sm text-ink-muted">
        <a href="/bugadi" className="underline underline-offset-4 hover:text-ink">← Back to the showpage</a>
      </p>
    </main>
  );
}
