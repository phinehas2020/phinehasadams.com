import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <p className={styles.code}>404</p>
      <h1 className={styles.line}>Nothing grows here.</h1>
      <p className={styles.sub}>
        The page you&rsquo;re after was moved, sold, or never planted.
      </p>
      <Link href="/" className={styles.home}>
        Back to the homestead
        <span aria-hidden="true"> ↗</span>
      </Link>
    </main>
  );
}
