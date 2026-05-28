import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.section}>
      <span className={styles.index} data-reveal>
        <span className={styles.indexNum}>02</span>
        Approach
      </span>

      <p className={styles.statement} data-reveal>
        I engineer <span className={styles.accent}>systems</span> — bridging the
        space between <span className={styles.accent}>automation</span>,{" "}
        <span className={styles.accent}>infrastructure</span>, and{" "}
        <span className={styles.accent}>design</span>. From the server to the
        screen, built as one coherent thing.
      </p>

      <span className={styles.note} data-reveal>
        Software · Hardware · Whatever it takes
      </span>
    </section>
  );
}
