export type Demo = {
  id: string;
  name: string;
  tag: string;
  blurb: string;
  tech: string[];
  href: string;
  cover: {
    bg: string;
    word: string;
    sub: string;
    font: string;
    fg: string;
    accent: string;
    grid?: boolean;
    halftone?: boolean;
  };
};

/* hrefs point at the local dev ports for now — swap for deployed URLs later. */
export const DEMOS: Demo[] = [
  {
    id: "bugadi",
    name: "Bugadi",
    tag: "Luxury · Heritage",
    blurb: "An antique-silver editorial lookbook with a 3-tier craft system (Essential → Signature → Flagship) you can toggle live.",
    tech: ["Tiered method", "Lenis", "GSAP pin", "R3F", "Shader"],
    href: "/bugadi",
    cover: { bg: "#0d0e10", word: "Bugadi", sub: "WEARABLE HERITAGE", font: "var(--font-serif)", fg: "#c8cbd0", accent: "#b23a52" },
  },
  {
    id: "command",
    name: "Command Center OS",
    tag: "Sci-fi · Product UI",
    blurb: "A cinematic console for an imaginary AI-ops system — a 3D neural core, scroll story, and an interactive dashboard.",
    tech: ["R3F core", "Scroll story", "Count-ups", "Interactive mesh"],
    href: "/command-center",
    cover: { bg: "#05070d", word: "COMMAND", sub: "AUTONOMOUS OPS", font: "var(--font-mono)", fg: "#22d3ee", accent: "#a78bfa", grid: true },
  },
  {
    id: "desi-poster",
    name: "रंग · Rang",
    tag: "Desi maximalism · Poster",
    blurb: "Vintage matchbox-poster energy — kinetic Devanagari, a custom cursor, layered parallax, and a temple-door gateway intro.",
    tech: ["Kinetic type", "Custom cursor", "Parallax", "Gateway intro"],
    href: "/desi",
    cover: { bg: "#F4A300", word: "रंग", sub: "A FESTIVAL OF CRAFT", font: "var(--font-rozha)", fg: "#E2402B", accent: "#26235c", halftone: true },
  },
  {
    id: "desi-folk",
    name: "लोक · Folk",
    tag: "Desi maximalism · Folk-art",
    blurb: "A horizontal festival procession + a scroll-scrubbed rangoli climax, with hover-rippling Pichwai paintings.",
    tech: ["Horizontal scroll", "Scrub climax", "Hover distortion", "WebP"],
    href: "/desi/folk",
    cover: { bg: "#26235c", word: "लोक", sub: "THE PAINTED INDIA", font: "var(--font-rozha)", fg: "#f4ecda", accent: "#bc1e63" },
  },
  {
    id: "marlow",
    name: "MARLOW",
    tag: "Brutalist · Photographer",
    blurb: "An austere editorial frame where a work-grid cover morphs into the detail page, with brutalist page-transition wipes.",
    tech: ["Route transitions", "Shared-element morph", "Brutalist grid"],
    href: "/marlow",
    cover: { bg: "#f2f0ea", word: "MARLOW", sub: "PHOTOGRAPHER", font: "var(--font-anton)", fg: "#0e0e0e", accent: "#ff2e12" },
  },
  {
    id: "aura",
    name: "AURA",
    tag: "Organic · Liquid",
    blurb: "A frosted-glass perfume bottle in liquid light — refraction, bloom, drifting particles, and drag-to-rotate 3D.",
    tech: ["Liquid shader", "Glass refraction", "Bloom", "Draggable 3D"],
    href: "/aura",
    cover: { bg: "linear-gradient(140deg,#cdb8e8,#f7c9c0 55%,#faf6f1)", word: "AURA", sub: "A SCENT YOU CAN SEE", font: "var(--font-marcellus)", fg: "#2a2230", accent: "#caa86a" },
  },
];
