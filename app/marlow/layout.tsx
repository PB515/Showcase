import { SiteNav } from "@/components/marlow/SiteNav";

/* Marlow scope — brutalist palette/fonts via .t-marlow + the persistent nav. */
export default function MarlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="t-marlow min-h-screen bg-paper text-ink">
      <SiteNav />
      {children}
    </div>
  );
}
