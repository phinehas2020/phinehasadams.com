import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phinehas Adams",
  description: "NASA-vibe systems design, engineering, automation, and production.",
  metadataBase: new URL("https://phinehasadams.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://phinehasadams.com",
    title: "Phinehas Adams",
    description: "Systems. Execution. Engineering.",
    siteName: "Phinehas Adams",
    images: [
      {
        url: "/images/PM_A0843.jpg",
        width: 1200,
        height: 630,
        alt: "Phinehas Adams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phinehas Adams",
    description: "Systems. Execution. Engineering.",
    images: ["/images/PM_A0843.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
