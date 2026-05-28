import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <span className={styles.index} data-reveal>
        <span className={styles.indexNum}>07</span>
        Contact
      </span>

      <h2 className={styles.big} data-reveal>
        Let&rsquo;s build
        <br />
        something.
      </h2>

      <a
        href="mailto:contact@phinehasadams.com"
        className={styles.email}
        data-reveal
      >
        <span className={styles.emailText}>contact@phinehasadams.com</span>
        <span className={styles.emailIcon} aria-hidden="true">
          ↗
        </span>
      </a>

      <div className={styles.avail} data-reveal>
        <span>Available 08:00 — 18:00 CST</span>
        <span className={styles.dot} />
        <span>Replies in under an hour</span>
      </div>
    </section>
  );
}
