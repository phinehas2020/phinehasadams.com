import type { Metadata } from "next";
import Hero from "./components/Hero";
import AutomationExample from "./components/AutomationExample";
import Contact from "./components/Contact";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "https://phinehasadams.com" },
};

export default function Home() {
  return <main><Hero /><AutomationExample /><Contact /></main>;
}
