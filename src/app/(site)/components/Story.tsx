import Image from "next/image";
import styles from "./Story.module.css";

export default function Story() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.text}>
          <span className={styles.index} data-reveal>
            <span className={styles.indexNum}>03</span>
            Roots
          </span>
          <h2 className={styles.headline} data-reveal>
            I learned to build before I learned to code.
          </h2>
          <p className={styles.body} data-reveal>
            Fences, engines, irrigation, livestock — a homestead runs on systems
            long before anyone calls them that. I grew up keeping them alive.
          </p>
          <p className={styles.body} data-reveal>
            Now I build the digital ones: the{" "}
            <span className={styles.accent}>automations</span>, the{" "}
            <span className={styles.accent}>infrastructure</span>, and the
            pipelines that keep a business running while no one&rsquo;s watching.
          </p>
        </div>

        <figure className={styles.figure} data-reveal="blur">
          <div className={styles.frame}>
            <div className={styles.media} data-parallax="0.12">
              <Image
                src="/images/MAT_2968.jpg"
                alt="A young man in a cowboy hat"
                fill
                sizes="(max-width: 860px) 92vw, 40vw"
                className={styles.image}
              />
            </div>
          </div>
          <figcaption className={styles.cap}>
            <span className={styles.capId}>IMG — 014</span>
            Tennessee
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
