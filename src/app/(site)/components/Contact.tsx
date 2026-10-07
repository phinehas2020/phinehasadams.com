import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import styles from "./Contact.module.css";

export default function Contact() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.copy}>
        <h2 id="contact-title">What do you want to build?</h2>
        <p>A website, a better workflow, or the connection between them.</p>
      </div>
      <Link href="/contact" className={styles.link}>
        Talk about a project <ArrowRightIcon size={30} weight="light" aria-hidden="true" />
      </Link>
    </section>
  );
}
