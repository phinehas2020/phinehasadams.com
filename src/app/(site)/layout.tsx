import { JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

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
    <div className={`${jetbrainsMono.variable}`}>
      {children}
      <Analytics />
    </div>
  );
}
