/* Persistent nav — in the root layout, so EVERY page (home + /marlow/work/[slug])
   has a way home. Links use "/marlow#section" so they work from any route. */

export function SiteNav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-line bg-paper/90 backdrop-blur">
      <div className="flex items-center justify-between px-5 py-3 md:px-8">
        <a href="/marlow" className="font-display text-2xl tracking-tight hover:text-accent">MARLOW</a>
        <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.18em]">
          <a href="/marlow#work" className="hover:text-accent">Work</a>
          <a href="/marlow#studio" className="hidden hover:text-accent sm:inline">Studio</a>
          <a href="/marlow#contact" className="hover:text-accent">Contact</a>
        </nav>
      </div>
    </header>
  );
}
