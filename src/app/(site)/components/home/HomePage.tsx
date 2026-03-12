import styles from "./HomePage.module.css";
import Link from "next/link";

interface HomePageProps {
  websites?: unknown[];
}

const focusAreas = [
  {
    title: "Strategy",
    body: "Framing decisions with clarity so teams can move with fewer assumptions.",
  },
  {
    title: "Systems",
    body: "Connecting marketing, IT, and R&D into one operating logic and one rhythm.",
  },
  {
    title: "Build",
    body: "Shipping outcomes that are robust, practical, and easy to keep improving.",
  },
];

const positioningCopy =
  "Built with taste. Driven by thinking.";

export function HomePage({ websites = [] }: HomePageProps) {
  void websites;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <div className={styles.headerInner}>
            <Link href="/" className={styles.wordmark}>
              <span className={styles.wordmarkName}>Phinehas Adams</span>
              <span className={styles.wordmarkMeta}>Marketing. IT. R&amp;D.</span>
            </Link>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.shell} ${styles.heroShell}`}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.heroKicker}>Marketing. IT. R&amp;D.</p>
                <h1 id="hero-title" className={styles.heroTitle}>
                  Phinehas Adams
                </h1>
                <p className={styles.heroPosition}>Clarity, systems, and execution.</p>
                <p className={styles.heroSupport}>{positioningCopy}</p>
              </div>

              <div className={styles.schematicWrap} aria-hidden="true">
                <svg
                  className={styles.schematic}
                  viewBox="0 0 640 360"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse">
                      <path d="M26 0H0V26" />
                    </pattern>
                  </defs>
                  <rect className={styles.schematicGrid} width="640" height="360" fill="url(#grid)" />
                  <g className={styles.schematicLines}>
                    <line x1="44" y1="300" x2="176" y2="136" />
                    <line x1="176" y1="136" x2="304" y2="204" />
                    <line x1="304" y1="204" x2="456" y2="92" />
                    <line x1="456" y1="92" x2="596" y2="132" />
                    <line x1="44" y1="300" x2="44" y2="340" />
                    <line x1="304" y1="204" x2="304" y2="330" />
                    <line x1="596" y1="132" x2="596" y2="330" />
                    <circle cx="44" cy="300" r="6" />
                    <circle cx="176" cy="136" r="6" />
                    <circle cx="304" cy="204" r="6" />
                    <circle cx="456" cy="92" r="6" />
                    <circle cx="596" cy="132" r="6" />
                  </g>
                  <text className={styles.schematicLabel} x="22" y="36">
                    signal
                  </text>
                  <text className={styles.schematicLabel} x="244" y="344">
                    structure
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.shell}>
            <p className={styles.sectionEyebrow}>Positioning</p>
            <h2 className={styles.sectionTitle}>Built for hard, interdisciplinary problems.</h2>
            <p className={styles.sectionCopy}>
              I move between narrative, architecture, and experiment design so teams can ship with less
              drag and more confidence.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.shell}>
            <p className={styles.sectionEyebrow}>Areas of work</p>
            <div className={styles.areasGrid}>
              {focusAreas.map((area) => (
                <article key={area.title} className={styles.areaCard}>
                  <h3 className={styles.areaTitle}>{area.title}</h3>
                  <p>{area.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className={styles.contactSection}>
          <div className={styles.shell}>
            <p className={styles.contactIntro}>
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
          <div className={styles.footerInner}>
            <span>Phinehas Adams</span>
            <span>Waco, Texas</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
