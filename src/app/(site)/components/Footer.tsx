import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.mark}>Phinehas Adams</span>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/websites-for-sale" className={styles.link}>
            Websites
          </Link>
          <a href="#photography" className={styles.link}>
            Field
          </a>
          <a href="mailto:contact@phinehasadams.com" className={styles.link}>
            Email
          </a>
          <Link href="/sms-consent" className={styles.link}>
            SMS
          </Link>
          <Link href="/privacy-policy" className={styles.link}>
            Privacy
          </Link>
        </nav>
        <span className={styles.copy}>
          © {new Date().getFullYear()} — Built end to end
        </span>
      </div>
    </footer>
  );
}
