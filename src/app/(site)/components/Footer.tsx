import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>© {new Date().getFullYear()} Phinehas Adams</p>
        <nav className={styles.links} aria-label="Footer">
          <Link href="/websites-for-sale">Websites</Link>
          <a href="mailto:contact@phinehasadams.com">Email</a>
          <Link href="/sms-consent">SMS</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-and-conditions">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
