import { Analytics } from "@vercel/analytics/next";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

export default function SiteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Nav />
      <div id="main-content" tabIndex={-1}>{children}</div>
      <Footer />
      {process.env.VERCEL === "1" && <Analytics />}
    </>
  );
}
