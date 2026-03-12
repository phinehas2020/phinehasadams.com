import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Phinehas Adams",
  description:
    "Phinehas Adams works across marketing, IT, and R&D to turn strategy, systems, and experimentation into operating leverage.",
  metadataBase: new URL("https://phinehasadams.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://phinehasadams.com",
    title: "Phinehas Adams",
    description:
      "Strategy, systems, and experimentation built into a sharper operating reality.",
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
    description:
      "Strategy, systems, and experimentation built into a sharper operating reality.",
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
      <body>{children}</body>
    </html>
  );
}
