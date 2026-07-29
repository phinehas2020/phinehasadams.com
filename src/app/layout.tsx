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
    "I build business systems end to end — storefronts, automation, infrastructure, and the wiring in between. No hand-offs.",
  metadataBase: new URL("https://phinehasadams.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://phinehasadams.com",
    title: "Phinehas Adams — Systems & Design",
    description:
      "Business systems built end to end — storefront, automation, infrastructure. No hand-offs.",
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
    description: "Business systems built end to end — no hand-offs.",
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
      <body>
        {/* Pre-paint so entrance choreography starts on first frame; without
            JS this never runs and the page renders fully visible. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js-motion')",
          }}
        />
        {children}
      </body>
    </html>
  );
}
