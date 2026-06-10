import Image from "next/image";
import styles from "./Interlude.module.css";

/**
 * Scroll-scrubbed letterbox: a tall runway with a sticky full-viewport
 * stage. Two bars slide apart like a film gate as --scrub (set by
 * ScrollMotion) moves 0→1, the image settles, and the line lands.
 * Without JS (or with reduced motion) --scrub falls back to 1: fully open.
 */
export default function Interlude() {
  return (
    <section
      className={styles.interlude}
      aria-label="Interlude"
      data-scrub="pin"
    >
      <div className={styles.stage}>
        <div className={styles.frame}>
          <div className={styles.media}>
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
          <span className={styles.caption}>From the field to the server</span>
          <h2 className={styles.statement}>
            Same hands.
            <br />
            <span className={styles.em}>Different tools.</span>
          </h2>
        </div>

        <div className={`${styles.bar} ${styles.barTop}`} aria-hidden="true" />
        <div className={`${styles.bar} ${styles.barBot}`} aria-hidden="true" />
      </div>
    </section>
  );
}
