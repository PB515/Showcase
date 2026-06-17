/* Bugadi route scope — applies its palette/fonts (via .t-bugadi) + base bg. */
export default function BugadiLayout({ children }: { children: React.ReactNode }) {
  return <div className="t-bugadi min-h-screen bg-bg text-ink">{children}</div>;
}
