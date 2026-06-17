import type { Metadata } from "next";
import {
  Inter, Cormorant_Garamond, Outfit, Space_Grotesk, JetBrains_Mono,
  Rozha_One, Yatra_One, Mukta, Anton, Space_Mono, Marcellus, Jost,
} from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const outfit = Outfit({ variable: "--font-outfit", subsets: ["latin"], weight: ["300", "400", "500", "600"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ variable: "--font-space-grotesk", subsets: ["latin"], weight: ["400", "500", "600", "700"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const rozha = Rozha_One({ variable: "--font-rozha", subsets: ["latin", "devanagari"], weight: ["400"], display: "swap" });
const yatra = Yatra_One({ variable: "--font-yatra", subsets: ["latin", "devanagari"], weight: ["400"], display: "swap" });
const mukta = Mukta({ variable: "--font-mukta", subsets: ["latin", "devanagari"], weight: ["300", "400", "500", "600", "700"], display: "swap" });
const anton = Anton({ variable: "--font-anton", subsets: ["latin"], weight: ["400"], display: "swap" });
const spaceMono = Space_Mono({ variable: "--font-space-mono", subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const marcellus = Marcellus({ variable: "--font-marcellus", subsets: ["latin"], weight: ["400"], display: "swap" });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"], display: "swap" });

const fontVars = [inter, cormorant, outfit, spaceGrotesk, jetbrains, rozha, yatra, mukta, anton, spaceMono, marcellus, jost]
  .map((f) => f.variable)
  .join(" ");

export const metadata: Metadata = {
  title: "The Range — frontend craft showcase",
  description: "Six aesthetics, one craftsperson — luxury, sci-fi, desi maximalism, brutalist, and liquid 3D. All in one place.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fontVars} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
