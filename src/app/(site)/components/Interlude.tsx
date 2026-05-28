import Image from "next/image";
import styles from "./Interlude.module.css";

export default function Interlude() {
  return (
    <section className={styles.interlude} aria-label="Interlude">
      <div className={styles.frame}>
        <div className={styles.media} data-parallax="0.22">
          <Image
            src="/images/PM_A9258-2-2.jpg"
            alt="A boy carrying a bundle of harvested grain across a field"
            fill
            sizes="100vw"
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.scrim} />

      <div className={styles.content}>
        <span className={styles.caption} data-reveal>
          The same hands that work the land
        </span>
        <h2 className={styles.statement} data-reveal>
          From the field
          <span className={styles.em}> to the server.</span>
        </h2>
      </div>
    </section>
  );
}
