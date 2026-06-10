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

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Story />
      <Process />
      <Interlude />
      <Photography />
      <Vulnerability />
      <Capabilities />
      <Contact />
      <Footer />
    </main>
  );
}
