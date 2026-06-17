export type Work = {
  slug: string;
  n: string;
  title: string;
  cat: string;
  year: string;
  src: string;
  blurb: string;
};

export const WORK: Work[] = [
  { slug: "seachange", n: "01", title: "Seachange", cat: "Editorial", year: "2025", src: "/photos/work-01.webp", blurb: "A close, quiet study in side light — shot over a single afternoon." },
  { slug: "concrete", n: "02", title: "Concrete", cat: "Fashion", year: "2025", src: "/photos/work-02.webp", blurb: "Form against a bare wall. Clothing as architecture." },
  { slug: "after-hours", n: "03", title: "After Hours", cat: "Street", year: "2024", src: "/photos/work-03.webp", blurb: "One figure, an empty plaza, the last of the gold hour." },
  { slug: "touch", n: "04", title: "Touch", cat: "Detail", year: "2024", src: "/photos/work-04.webp", blurb: "Hands and cloth, held in the shallowest focus." },
  { slug: "interiors", n: "05", title: "Interiors", cat: "Architecture", year: "2023", src: "/photos/work-05.webp", blurb: "Hard light down a concrete stair. No people, only lines." },
  { slug: "window-light", n: "06", title: "Window Light", cat: "Portrait", year: "2023", src: "/photos/work-06.webp", blurb: "Half in shadow, by a large window, in the soft of the day." },
];

export const getWork = (slug: string) => WORK.find((w) => w.slug === slug);
