import styles from "./HomePage.module.css";

interface HomePageProps {
  websites?: unknown[];
}

const areas = [
  {
    title: "Strategy",
    body: "Get clear on the problem, the order, and what matters most.",
  },
  {
    title: "Systems",
    body: "Set up the structure so the work stays legible when real life hits it.",
  },
  {
    title: "Build",
    body: "Make things that feel considered, work well, and last.",
  },
];

const positioning =
  "Across marketing, IT, and R&D, I bring structure to work that starts to sprawl.";

export function HomePage({ websites = [] }: HomePageProps) {
  void websites;

  return (
    <div className={styles.page}>
      <header className={styles.topBar}>
        <div className={`${styles.shell} ${styles.topBarInner}`}>
          <p className={styles.brandmark}>PhinehasAdams.com</p>
          <a className={styles.topLink} href="#contact">
            Contact
          </a>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.shell}>
            <div className={styles.sectionShell}>
              <p className={styles.sectionNumber}>01</p>
              <div className={styles.heroGrid}>
                <div className={styles.heroText}>
                  <h1 id="hero-title" className={styles.title}>
                    Phinehas Adams
                  </h1>
                  <p className={styles.lead}>
                    Clear thinking, systems that hold, and work that ships.
                  </p>
                  <div className={styles.metaRow} aria-label="disciplines">
                    <span>Marketing</span>
                    <span>IT</span>
                    <span>R&amp;D</span>
                  </div>
                </div>

                <div className={styles.instrument} aria-hidden="true">
                  <span className={styles.instrumentLabel}>Signal / Structure</span>
                  <div className={styles.instrumentDiagram}>
                    <span
                      className={`${styles.instrumentAxis} ${styles.instrumentAxisHorizontal}`}
                    />
                    <span
                      className={`${styles.instrumentAxis} ${styles.instrumentAxisVertical}`}
                    />
                    <span
                      className={`${styles.instrumentRing} ${styles.instrumentRingOuter}`}
                    />
                    <span
                      className={`${styles.instrumentRing} ${styles.instrumentRingInner}`}
                    />
                    <span
                      className={`${styles.instrumentPoint} ${styles.instrumentPointA}`}
                    />
                    <span
                      className={`${styles.instrumentPoint} ${styles.instrumentPointB}`}
                    />
                    <span
                      className={`${styles.instrumentPoint} ${styles.instrumentPointC}`}
                    />
                  </div>
                  <p className={styles.instrumentCaption}>Quiet work. High standards.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.statement} aria-label="positioning">
          <div className={styles.shell}>
            <div className={styles.sectionShell}>
              <p className={styles.sectionNumber}>02</p>
              <p className={styles.statementText}>{positioning}</p>
            </div>
          </div>
        </section>

        <section className={styles.areas} aria-labelledby="areas-title">
          <div className={styles.shell}>
            <div className={styles.sectionShell}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionNumber}>03</p>
                <h2 id="areas-title" className={styles.sectionLabel}>
                  Areas of work
                </h2>
              </div>

              <div className={styles.areasGrid}>
                {areas.map((area, index) => (
                  <article key={area.title} className={styles.areaCard}>
                    <span className={styles.areaIndex}>0{index + 1}</span>
                    <h3 className={styles.areaTitle}>{area.title}</h3>
                    <p className={styles.areaBody}>{area.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div className={styles.shell}>
            <div className={styles.sectionShell}>
              <div className={styles.sectionIntro}>
                <p className={styles.sectionNumber}>04</p>
                <h2 id="contact-title" className={styles.sectionLabel}>
                  Contact
                </h2>
              </div>

              <div className={styles.contactContent}>
                <p className={styles.contactCopy}>
                  For selected work and thoughtful conversations.
                </p>
                <a className={styles.contactLink} href="mailto:contact@phinehasadams.com">
                  contact@phinehasadams.com
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
