import type { Metadata } from "next";
import { Anton, Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phinehas Adams — Systems & Design",
  description:
    "I engineer systems — bridging automation, infrastructure, and design. Built end to end and shipped to production.",
  metadataBase: new URL("https://phinehasadams.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://phinehasadams.com",
    title: "Phinehas Adams — Systems & Design",
    description: "Automation, infrastructure, and design — built end to end.",
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
    <html
      lang="en"
      className={`${anton.variable} ${archivo.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body>{children}</body>
    </html>
  );
}
