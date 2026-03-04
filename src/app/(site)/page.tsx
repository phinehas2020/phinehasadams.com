import HeroAsciiOne from "@/components/ui/hero-ascii-one";
import About from "./components/About";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Photography from "./components/Photography";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Vulnerability from "./components/Vulnerability";
import { getImages } from "./utils/getImages";

export default function Home() {
  const photos = getImages();

  return (
    <main>
      <HeroAsciiOne />
      <Projects />
      <About />
      <Process />
      <Photography photos={photos} />
      <Vulnerability />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}
