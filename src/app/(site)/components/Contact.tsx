import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.copy}>
        <h2 id="contact-title">Have a task in mind?</h2>
        <p>Tell me what you keep doing by hand.</p>
      </div>
      <a href="mailto:contact@phinehasadams.com?subject=Let%E2%80%99s%20talk%20about%20a%20project" className={styles.link}>
        Talk about a project <ArrowRightIcon size={30} weight="light" aria-hidden="true" />
        <span className="sr-only"> — email contact@phinehasadams.com</span>
      </a>
    </section>
  );
}
