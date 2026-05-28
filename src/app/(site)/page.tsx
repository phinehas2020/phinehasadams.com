import Hero from "./components/Hero";
import About from "./components/About";
import Story from "./components/Story";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Interlude from "./components/Interlude";
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
      <Projects />
      <About />
      <Story />
      <Process />
      <Interlude />
      <Photography photos={photos} />
      <Vulnerability />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}
