import styles from "./page.module.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SmoothScroll from "./components/SmoothScroll";
import Vulnerability from "./components/Vulnerability";

export default function Home() {
  return (
    <SmoothScroll>
      <main>
        <Hero />
        <About />
        <Projects />
        <Vulnerability />
        <Capabilities />
        <Contact />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
