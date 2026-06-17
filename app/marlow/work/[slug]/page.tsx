/* Work detail — basic brutalist layout. Next: shared-element morph from the
   grid cover + page-transition wipe (Tier-B techniques). */

import Link from "next/link";
import { notFound } from "next/navigation";
import { PhotoFrame } from "@/components/marlow/PhotoFrame";
import { WORK, getWork } from "@/lib/marlow/work";

export function generateStaticParams() {
  return WORK.map((w) => ({ slug: w.slug }));
}

export default async function WorkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const work = getWork(slug);
  if (!work) notFound();

  const idx = WORK.findIndex((w) => w.slug === slug);
  const next = WORK[(idx + 1) % WORK.length];

  return (
    <main className="px-5 pb-24 pt-20 md:px-8">
      <Link href="/marlow#work" className="font-mono text-xs uppercase tracking-[0.2em] text-muted hover:text-accent">
        ← Index
      </Link>

      <div className="mt-6 flex flex-wrap items-end justify-between gap-3 border-b-2 border-line pb-4">
        <h1 className="font-display text-[14vw] leading-[0.85] md:text-[9vw]">{work.title}</h1>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {work.n} / {work.cat} / {work.year}
        </span>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-[1fr_0.5fr]">
        <PhotoFrame src={work.src} label={`${work.title} — 4:5`} className="aspect-[4/5] w-full" />
        <div className="md:pt-4">
          <p className="font-body text-lg leading-relaxed text-ink/80">{work.blurb}</p>
          <div className="mt-8 border-t border-line pt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted">
            <p>Category — <span className="text-ink">{work.cat}</span></p>
            <p className="mt-1">Year — <span className="text-ink">{work.year}</span></p>
          </div>
        </div>
      </div>

      <Link
        href={`/marlow/work/${next.slug}`}
        className="group mt-16 flex items-baseline justify-between border-t-2 border-line pt-4"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Next</span>
        <span className="font-display text-4xl uppercase group-hover:text-accent md:text-6xl">
          {next.title} →
        </span>
      </Link>
    </main>
  );
}
