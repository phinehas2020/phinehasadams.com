import Image from "next/image";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <>
      <section id="about" className={styles.hero} aria-labelledby="hero-name">
        <div className={styles.inner}>
          <h1 id="hero-name" className={styles.name}>
            <span>Phinehas</span><span>Adams.</span>
          </h1>
          <div className={styles.copy}>
            <h2>I build with AI.<br />I automate the<br className={styles.desktopBreak} /> repetitive parts.</h2>
            <p>Websites and tools that help people get useful work done.</p>
            <a className={styles.button} href="#contact">
              Talk about a project <ArrowRightIcon size={30} weight="light" aria-hidden="true" />
            </a>
            <a className={styles.exampleLink} href="#examples">
              See an example <ArrowRightIcon size={26} weight="light" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>
      <figure className={styles.earthrise}>
        <Image
          src="/images/apollo17-earthrise.jpg"
          alt="A blue crescent Earth rising above the grey lunar horizon, photographed during Apollo 17."
          fill sizes="100vw" preload className={styles.photo}
        />
        <figcaption className={styles.caption}>
          <a href="https://images.nasa.gov/details/as17-152-23272" target="_blank" rel="noopener noreferrer">
            Apollo 17 Earthrise / NASA<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>
    </>
  );
}
