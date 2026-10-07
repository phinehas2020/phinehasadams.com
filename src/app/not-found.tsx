import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.line}>Page not found.</h1>
      <p className={styles.sub}>
        This address doesn&rsquo;t lead to a page. You can head back to the home page.
      </p>
      <Link href="/" className={styles.home}>
        Back to home
      </Link>
    </main>
  );
}
