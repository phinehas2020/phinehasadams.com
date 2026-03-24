"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./SiteChrome.module.css";

const publicRoutes = new Set([
  "/",
  "/privacy-policy",
  "/terms-and-conditions",
  "/websites-for-sale",
]);

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Work" },
  { href: "/websites-for-sale", label: "Sites for sale" },
  { href: "/#contact", label: "Contact" },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/websites-for-sale", label: "Ready-made websites" },
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms-and-conditions", label: "Terms & conditions" },
];

function isPublicMarketingRoute(pathname: string | null) {
  if (!pathname) {
    return false;
  }

  return publicRoutes.has(pathname);
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (!isPublicMarketingRoute(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.shell}>
          <div className={styles.topBarInner}>
            <Link href="/" className={styles.brandmark}>
              Phinehas Adams
            </Link>

            <nav className={styles.nav} aria-label="Primary">
              {primaryLinks.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === "/websites-for-sale" && link.href === "/websites-for-sale";

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={styles.navLink}
                    data-active={active ? "true" : "false"}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            <a className={styles.headerCta} href="mailto:contact@phinehasadams.com">
              Start a project
            </a>
          </div>
        </div>
      </header>

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerGrid}>
            <div className={styles.footerIntro}>
              <p className={styles.footerEyebrow}>Phinehas Adams</p>
              <h2 className={styles.footerTitle}>Websites, systems, and operating clarity.</h2>
              <p className={styles.footerCopy}>
                Built for businesses that need sharper public-facing work, cleaner
                structure underneath it, and less delivery drift.
              </p>
            </div>

            <div className={styles.footerMeta}>
              <div className={styles.footerLinks}>
                {footerLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={styles.footerLink}>
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className={styles.footerActions}>
                <a className={styles.footerEmail} href="mailto:contact@phinehasadams.com">
                  contact@phinehasadams.com
                </a>
                <p className={styles.footerNote}>
                  Custom work available. Ready-made websites can be customized and shipped
                  to your domain.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
