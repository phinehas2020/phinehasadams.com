import styles from "./HomePage.module.css";
import Link from "next/link";

interface HomePageProps {
  websites?: unknown[];
}

const areas = [
  {
    title: "Strategy",
    body:
      "Define the right problem, sequence, and measurement before moving from talk to delivery.",
  },
  {
    title: "Systems",
    body: "Create operational architecture so disciplines and teams share one clear operating logic.",
  },
  {
    title: "Build",
    body: "Ship outcomes that are clean in design, resilient in use, and easy to extend.",
  },
];

const positioning =
  "I work at the intersection where ambitious ideas, operational reality, and technical rigor must agree.";

export function HomePage({ websites = [] }: HomePageProps) {
  void websites;

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={styles.shell}>
          <p className={styles.brandmark}>Phinehas Adams</p>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.shell}>
            <div className={styles.heroGrid}>
              <div className={styles.heroText}>
                <p className={styles.eyebrow}>Marketing · IT · R&amp;D</p>
                <h1 id="hero-title" className={styles.title}>
                  Phinehas Adams
                </h1>
                <p className={styles.lead}>Clarity, systems, and execution.</p>
                <p className={styles.support}>
                  Built with taste. Driven by thinking.
                </p>
              </div>
              <div className={styles.visual} aria-hidden="true">
                <span className={`${styles.gridNode} ${styles.gridNodeA}`} />
                <span className={`${styles.gridNode} ${styles.gridNodeB}`} />
                <span className={`${styles.gridNode} ${styles.gridNodeC}`} />
                <span className={`${styles.gridLine} ${styles.gridLineA}`} />
                <span className={`${styles.gridLine} ${styles.gridLineB}`} />
                <span className={`${styles.gridLine} ${styles.gridLineC}`} />
                <span className={styles.archWord}>logic</span>
                <span className={styles.archWordTwo}>signal</span>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.statement} aria-label="positioning">
          <div className={styles.shell}>
            <p className={styles.statementText}>{positioning}</p>
          </div>
        </section>

        <section className={styles.areas} aria-label="areas of work">
          <div className={styles.shell}>
            <p className={styles.sectionLabel}>Areas of work</p>
            <div className={styles.areasGrid}>
              {areas.map((area) => (
                <article key={area.title} className={styles.areaCard}>
                  <h2 className={styles.areaTitle}>{area.title}</h2>
                  <p className={styles.areaBody}>{area.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.buySection} aria-label="sites for sale">
          <div className={styles.shell}>
            <p className={styles.sectionLabel}>Buy-ready websites</p>
            <p className={styles.buyCopy}>
              If you need a polished site fast, we have a curated selection ready to
              customize and launch.
            </p>
            <Link href="/websites-for-sale" className={styles.buyLink}>
              Explore available websites
            </Link>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-label="contact">
          <div className={styles.shell}>
            <p className={styles.contactCopy}>
              For selected projects, consulting, and sharp conversations.
            </p>
            <a className={styles.contactLink} href="mailto:contact@phinehasadams.com">
              contact@phinehasadams.com
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.shell}>
          <span className={styles.footerText}>Phinehas Adams</span>
          <span className={styles.footerText}>Portfolio focused. Operating quietly.</span>
        </div>
      </footer>
    </div>
  );
}
