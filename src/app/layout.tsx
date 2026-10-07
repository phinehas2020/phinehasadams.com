import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteSocialImage } from "@/lib/site-metadata";
import "./globals.css";

const sans = localFont({
  src: [
    { path: "./fonts/SiteSans-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/SiteSans-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const cover = localFont({
  src: [{ path: "./fonts/CoverSans.woff2", weight: "100 900", style: "normal" }],
  variable: "--font-cover",
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

const description =
  "I’m Phinehas. I build websites, AI tools, and business automations that help people get useful work done.";

export const metadata: Metadata = {
  title: "Phinehas Adams — AI, websites & automation",
  description,
  metadataBase: new URL("https://phinehasadams.com"),
  openGraph: {
    type: "website",
    title: "Phinehas Adams — AI, websites & automation",
    description,
    siteName: "Phinehas Adams",
    images: [siteSocialImage],
  },
  twitter: { card: "summary_large_image", title: "Phinehas Adams", description, images: [siteSocialImage.url] },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${cover.variable}`}><body>{children}</body></html>;
}
