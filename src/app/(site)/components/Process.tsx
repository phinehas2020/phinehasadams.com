import styles from "./Process.module.css";

const steps = [
  {
    tag: "Walk the fence line",
    desc: "Find what's actually broken before touching anything.",
  },
  {
    tag: "Build the fix",
    desc: "Software, hardware, or both — whatever the problem calls for.",
  },
  {
    tag: "Wire it together",
    desc: "One system that talks to itself, not seventeen browser tabs.",
  },
  {
    tag: "Stand watch",
    desc: "Shipped, monitored, maintained. I don't disappear after launch.",
  },
];

export default function Process() {
  return (
    <section className={styles.section}>
      <span className={styles.index} data-reveal>
        <span className={styles.indexNum}>04</span>
        Process
      </span>

      <ol className={styles.flow} data-scrub>
        {steps.map((step, i) => (
          <li
            key={step.tag}
            className={styles.row}
            data-reveal
            style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
          >
            <span className={styles.num} aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className={styles.rowBody}>
              <h3 className={styles.tag}>{step.tag}</h3>
              <p className={styles.desc}>{step.desc}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
