import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./PolicyPage.module.css";

interface PolicySection {
  heading: string;
  body: ReactNode;
}

interface PolicyPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: PolicySection[];
  contactEmail: string;
}

export function PolicyPage({
  eyebrow,
  title,
  intro,
  sections,
  contactEmail,
}: PolicyPageProps) {
  return (
    <main className={styles.page}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>{eyebrow}</p>
        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.intro}>{intro}</p>
          </div>

          <aside className={styles.panel}>
            <p className={styles.panelLabel}>Need something else?</p>
            <p className={styles.panelCopy}>
              If your question is about a project, inventory site, or site operations, the
              fastest route is direct email.
            </p>
            <a className={styles.panelLink} href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
            <Link className={styles.panelSecondary} href="/websites-for-sale">
              Browse ready-made sites
            </Link>
          </aside>
        </div>
      </div>

      <div className={styles.body}>
        {sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.sectionHeading}>{section.heading}</h2>
            <p className={styles.sectionBody}>{section.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
