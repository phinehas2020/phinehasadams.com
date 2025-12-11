import Hero from "./components/Hero";
import About from "./components/About";
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
      <Hero />
      <About />
      <Projects />
      <Photography photos={photos} />
      <Vulnerability />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}
