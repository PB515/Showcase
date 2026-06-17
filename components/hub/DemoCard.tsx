import type { Demo } from "@/lib/hub/demos";

/* A demo card: a stylized "mini-poster" cover rendered in that demo's own
   aesthetic (zero external assets), then its name / tag / blurb / techniques
   and a live link. */

export function DemoCard({ d }: { d: Demo }) {
  const c = d.cover;
  return (
    <a href={d.href} target="_blank" rel="noopener noreferrer" className="group block">
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-line" style={{ background: c.bg }}>
        {c.grid && (
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "linear-gradient(#22d3ee33 1px,transparent 1px),linear-gradient(90deg,#22d3ee33 1px,transparent 1px)", backgroundSize: "28px 28px" }}
          />
        )}
        {c.halftone && (
          <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(#000 1.2px, transparent 1.3px)", backgroundSize: "9px 9px" }} />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-transform duration-500 ease-out group-hover:scale-[1.05]">
          <span style={{ fontFamily: c.font, color: c.fg }} className="text-5xl leading-none md:text-6xl">{c.word}</span>
          <span className="mt-3 text-[10px] uppercase tracking-[0.25em]" style={{ color: c.fg, opacity: 0.72 }}>{c.sub}</span>
        </div>
        <span className="absolute right-4 top-4 h-2 w-2 rounded-full" style={{ background: c.accent }} />
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3">
          <h3 className="font-serif text-2xl text-ink">{d.name}</h3>
          <span className="text-[11px] uppercase tracking-[0.16em] text-muted">{d.tag}</span>
        </div>
        <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted">{d.blurb}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {d.tech.map((t) => (
            <span key={t} className="rounded-full border border-line px-3 py-1 text-[11px] text-muted">{t}</span>
          ))}
        </div>
        <span className="mt-4 inline-block text-sm text-ink underline-offset-4 group-hover:underline">View live →</span>
      </div>
    </a>
  );
}
