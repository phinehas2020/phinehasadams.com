import { GeistPixelSquare } from "geist/font/pixel";
import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "./components/SmoothScroll";
import SignalGrid from "./components/SignalGrid";

const geistPixel = GeistPixelSquare;

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${geistPixel.variable} ${jetbrainsMono.variable}`}>
      <SignalGrid />
      <SmoothScroll>
        {children}
      </SmoothScroll>
      <Analytics />
    </div>
  );
}
