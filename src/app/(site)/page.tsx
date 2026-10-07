import type { Metadata } from "next";
import { siteSocialImage } from "@/lib/site-metadata";
import Hero from "./components/Hero";
import AutomationExample from "./components/AutomationExample";
import Contact from "./components/Contact";
import { Services, BuildAndBuilder, WebsiteCatalog } from "./components/HomeSections";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "https://phinehasadams.com", images: [siteSocialImage] },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <AutomationExample />
      <WebsiteCatalog />
      <BuildAndBuilder />
      <Contact />
    </main>
  );
}
