import { CustomCursor } from "@/components/desi/CustomCursor";

/* Desi scope — palette/fonts via .t-desi + its custom cursor (scoped to /desi). */
export default function DesiLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="t-desi min-h-screen bg-paper text-ink">
      <CustomCursor />
      {children}
    </div>
  );
}
