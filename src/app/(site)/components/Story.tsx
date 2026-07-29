import Image from "next/image";
import styles from "./Story.module.css";

const li = (i: number) => ({ "--li": i } as React.CSSProperties);

export default function Story() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div className={styles.text}>
          <span className={styles.index} data-reveal>
            <span className={styles.indexNum}>03</span>
            Roots
          </span>
          <h2 className={styles.headline} data-lines>
            <span data-line-mask>
              <span data-line style={li(0)}>
                I learned to build
              </span>
            </span>
            <span data-line-mask>
              <span data-line style={li(1)}>
                before I learned to code.
              </span>
            </span>
          </h2>
          <p className={styles.body} data-reveal>
            Fences, engines, irrigation, livestock — a homestead runs on
            systems long before anyone calls them that. I grew up keeping them
            alive.
          </p>
          <p className={styles.body} data-reveal>
            Now I build the digital kind —{" "}
            <span className={styles.accent}>automation</span> and infrastructure
            that keep a business fed and watered while everyone sleeps.
          </p>
        </div>

        <figure className={styles.figure}>
          <div className={styles.frame} data-reveal="clip">
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
          <figcaption
            className={styles.cap}
            data-reveal
            style={{ "--reveal-delay": "0.35s" } as React.CSSProperties}
          >
            <span className={styles.capId}>FR 2968</span>
            Tennessee
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
