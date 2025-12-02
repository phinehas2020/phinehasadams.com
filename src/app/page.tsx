import styles from "./page.module.css";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import Photography from "./components/Photography";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className={styles.main}>
      <Hero />
      <About />
      <Projects />
      <Capabilities />
      <Photography />
      <Contact />
      <Footer />
    </main>
  );
}
