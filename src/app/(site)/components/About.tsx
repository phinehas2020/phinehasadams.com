import styles from "./About.module.css";

const li = (i: number) => ({ "--li": i } as React.CSSProperties);

export default function About() {
  return (
    <section className={styles.section}>
      <span className={styles.index} data-reveal>
        <span className={styles.indexNum}>02</span>
        Approach
      </span>

      <p className={styles.statement} data-lines>
        <span data-line-mask>
          <span data-line style={li(0)}>
            I build the <span className={styles.accent}>whole machine</span> —
          </span>
        </span>
        <span data-line-mask>
          <span data-line style={li(1)}>
            the store out front,
          </span>
        </span>
        <span data-line-mask>
          <span data-line style={li(2)}>
            the systems in back,
          </span>
        </span>
        <span data-line-mask>
          <span data-line style={li(3)}>
            and the wiring in between.
          </span>
        </span>
      </p>
    </section>
  );
}
