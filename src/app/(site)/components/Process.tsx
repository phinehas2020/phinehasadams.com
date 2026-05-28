import styles from "./Process.module.css";

const steps = [
  { tag: "Build", desc: "Software, hardware — whatever the problem actually needs." },
  { tag: "Integrate", desc: "Disparate systems wired into a single, coherent pipeline." },
  { tag: "Iterate", desc: "Debug. Refactor. Ship. Repeat until it's right." },
  { tag: "Deploy", desc: "From local to production. The whole pipeline, owned end to end." },
];

export default function Process() {
  return (
    <section className={styles.section}>
      <span className={styles.index} data-reveal>
        <span className={styles.indexNum}>04</span>
        Process
      </span>

      <ol className={styles.list}>
        {steps.map((step, i) => (
          <li
            key={step.tag}
            className={styles.item}
            data-reveal
            style={{ "--reveal-delay": `${i * 0.07}s` } as React.CSSProperties}
          >
            <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
            <h3 className={styles.tag}>{step.tag}</h3>
            <p className={styles.desc}>{step.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
