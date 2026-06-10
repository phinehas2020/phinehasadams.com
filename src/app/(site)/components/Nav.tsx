"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      // Step out of the way going down, return on the way back up
      if (y > 200 && y > lastY + 6) setHidden(true);
      else if (y < lastY - 6 || y <= 200) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${
        hidden ? styles.hidden : ""
      }`}
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.mark}>
          <span className={styles.markName}>Phinehas Adams</span>
          <span className={styles.markRole}>Systems &amp; Design</span>
        </Link>

        <nav className={styles.links} aria-label="Primary">
          <Link href="/#work" className={styles.link}>
            <span className={styles.linkIndex}>01</span>Work
          </Link>
          <Link href="/#photography" className={styles.link}>
            <span className={styles.linkIndex}>02</span>Field
          </Link>
          <Link href="/#contact" className={styles.link}>
            <span className={styles.linkIndex}>03</span>Contact
          </Link>
          <Link href="/websites-for-sale" className={styles.cta}>
            Buy a website
            <span className={styles.ctaDot} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
