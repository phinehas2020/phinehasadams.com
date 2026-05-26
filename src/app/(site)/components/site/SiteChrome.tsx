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
              [ P / A ]
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
              TRANSMIT
            </a>
          </div>
        </div>
      </header>

      <div className={styles.content}>{children}</div>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <div className={styles.footerGrid}>
            <div className={styles.footerIntro}>
              <p className={styles.footerEyebrow}>PHINEHAS ADAMS — OPERATOR</p>
              <h2 className={styles.footerTitle}>WEBSITES • SYSTEMS • OPERATING CLARITY</h2>
              <hr className={styles.structuralRule} />
              <p className={styles.footerCopy}>
                Precision builds for founder-led teams that need sharper public work and
                internal systems that actually hold under load.
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
                  READY-MADE UNITS AVAILABLE FOR CUSTOMIZATION + SHIP TO YOUR DOMAIN.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
