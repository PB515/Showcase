/* Essential-tier heritage block — the calm, static version.
   The Signature tier replaces this with the pinned GSAP scroll-story
   (HeritageStory). Showing both is the whole point of the tier toggle:
   same content, the upgrade is the *delivery*. Server component (no JS). */

import { Reveal } from "@/components/bugadi/Reveal";

const HERITAGE = [
  {
    k: "Motif",
    v: "Paisley, temple, crescent, vine — each pattern is a thread back to where it was first worn.",
  },
  {
    k: "Region",
    v: "Maharashtra to Tamil Nadu. The same ornament reads differently in each hand it passed through.",
  },
  {
    k: "Occasion",
    v: "Festive, bridal, everyday. Heritage is not a museum — it is what you reach for on a given morning.",
  },
];

export function StaticHeritage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:px-10 md:py-32">
      <Reveal>
        <h2 className="mb-16 max-w-2xl font-heading text-3xl leading-tight text-ink md:text-5xl">
          Every piece carries three things.
        </h2>
      </Reveal>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
        {HERITAGE.map((h, i) => (
          <Reveal key={h.k} delay={i * 0.1}>
            <div>
              <div className="mb-4 h-px w-10 bg-accent" />
              <h3 className="font-heading text-2xl text-primary">{h.k}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{h.v}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
