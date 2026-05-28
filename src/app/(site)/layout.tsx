import { Analytics } from "@vercel/analytics/next";
import ScrollMotion from "./components/ScrollMotion";
import Nav from "./components/Nav";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ScrollMotion />
      <div className="grain" aria-hidden="true" />
      <Nav />
      {children}
      <Analytics />
    </>
  );
}
