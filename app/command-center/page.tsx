/* COMMAND CENTER OS — a Flagship-tier sci-fi dashboard demo.
   Built by pulling the craft-lab Flagship recipe stack onto a new brief:
   entrance choreography · Lenis+GSAP scroll · pinned scroll-story · R3F 3D
   (mouse camera) · micro-interactions · count-up/animated UI. Pure frontend. */

import { Hero } from "@/components/command-center/Hero";
import { MissionControl } from "@/components/command-center/MissionControl";
import { WorkflowTimeline } from "@/components/command-center/WorkflowTimeline";
import { FeatureSection } from "@/components/command-center/FeatureSection";
import { DashboardPreview } from "@/components/command-center/DashboardPreview";
import { FinalCTA } from "@/components/command-center/FinalCTA";

export default function Home() {
  return (
    <main>
      <Hero />
      <MissionControl />
      <WorkflowTimeline />
      <FeatureSection />
      <DashboardPreview />
      <FinalCTA />
    </main>
  );
}
