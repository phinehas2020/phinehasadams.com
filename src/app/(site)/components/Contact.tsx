import styles from "./Contact.module.css";

const li = (i: number) => ({ "--li": i } as React.CSSProperties);

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <span className={styles.index} data-reveal>
        <span className={styles.indexNum}>07</span>
        Contact
      </span>

      <h2 className={styles.big} data-lines>
        <span data-line-mask>
          <span data-line style={li(0)}>
            Tell me
          </span>
        </span>
        <span data-line-mask>
          <span data-line style={li(1)}>
            what&rsquo;s <span className={styles.broken}>broken.</span>
          </span>
        </span>
      </h2>

      <a
        href="mailto:contact@phinehasadams.com"
        className={styles.email}
        data-reveal
        style={{ "--reveal-delay": "0.3s" } as React.CSSProperties}
      >
        <span className={styles.emailText}>contact@phinehasadams.com</span>
        <span className={styles.emailIcon} aria-hidden="true">
          ↗
        </span>
      </a>

      <div
        className={styles.avail}
        data-reveal
        style={{ "--reveal-delay": "0.42s" } as React.CSSProperties}
      >
        <span>Available 08:00 — 18:00 CST</span>
        <span className={styles.dot} />
        <span>Replies in under an hour</span>
      </div>
    </section>
  );
}
