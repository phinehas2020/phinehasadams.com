"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Nav.module.css";

const links = [
  { href: "/websites", label: "Websites" },
  { href: "/automation", label: "Automation" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.name}>Phinehas Adams</Link>
        <nav className={styles.links} aria-label="Primary">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} aria-current={pathname === href || (href === "/websites" && pathname === "/websites-for-sale") ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
