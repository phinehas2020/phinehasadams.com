import { Archivo, Instrument_Serif, JetBrains_Mono, Sora } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteChrome } from "./components/site/SiteChrome";

// Brutalist display font (heavy neo-grotesk for structural uppercase titles per DESIGN.md)
// Using Archivo Black (900) — reliable heavy grotesque with static 900 weight.
const archivoBlack = Archivo({
  subsets: ["latin"],
  variable: "--font-display-brutal",
  weight: ["900"],
  style: ["normal"],
  display: "swap",
});

// Legacy fonts (kept only for transition period in M01)
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${archivoBlack.variable} ${instrumentSerif.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <SiteChrome>{children}</SiteChrome>
      <Analytics />
    </div>
  );
}
