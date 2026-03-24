import Link from "next/link";
import type { SanityWebsite } from "@/sanity/lib/queries";
import {
  getWebsiteDomain,
  getWebsitePreview,
  normalizeWebsiteUrl,
} from "../../utils/websites";
import styles from "./HomePage.module.css";

interface HomePageProps {
  websites?: SanityWebsite[];
}

const operatingLanes = [
  "Websites",
  "Systems",
  "Marketing",
  "IT",
  "R&D",
  "Operations",
];

const approach = [
  {
    title: "Find the angle",
    body: "Define what the site or system actually needs to do so the work stops drifting.",
  },
  {
    title: "Build the structure",
    body: "Turn the plan into something clear, well-organized, and usable under normal pressure.",
  },
  {
    title: "Ship cleanly",
    body: "Get it live, tighten the rough edges, and leave behind something that can keep working.",
  },
];

export function HomePage({ websites = [] }: HomePageProps) {
  const featuredSites = websites.slice(0, 4);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.shell}>
          <p className={styles.heroTag}>Phinehas Adams / Marketing, IT, R&amp;D</p>

          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.sectionNumber}>01</p>
              <h1 id="hero-title" className={styles.title}>
                Websites, systems, and operating clarity.
              </h1>
              <p className={styles.lead}>
                I help turn sprawling work into something legible, useful, and live.
              </p>
              <p className={styles.support}>
                The public-facing part should look sharp. The structure underneath it
                should hold. That usually means better decisions, cleaner delivery, and
                less noise.
              </p>

              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#contact">
                  Start a conversation
                </a>
                <Link className={styles.secondaryAction} href="/websites-for-sale">
                  Browse ready-made sites
                </Link>
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="Current focus">
              <div className={styles.panelHeader}>
                <span className={styles.panelEyebrow}>Current focus</span>
                <span className={styles.panelStatus}>Available</span>
              </div>

              <div className={styles.panelRows}>
                <div className={styles.panelRow}>
                  <span>Public-facing work</span>
                  <strong>Websites that feel considered</strong>
                </div>
                <div className={styles.panelRow}>
                  <span>Internal structure</span>
                  <strong>Systems people can actually use</strong>
                </div>
                <div className={styles.panelRow}>
                  <span>Delivery</span>
                  <strong>Less sprawl, more follow-through</strong>
                </div>
              </div>

              <p className={styles.panelNote}>
                Quiet work. High standards. Good judgment under normal business pressure.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <main className={styles.main}>
        <section className={styles.ticker} aria-label="Operating lanes">
          <div className={styles.tickerTrack}>
            {[...operatingLanes, ...operatingLanes].map((lane, index) => (
              <span key={`${lane}-${index}`} className={styles.tickerItem}>
                {lane}
              </span>
            ))}
          </div>
        </section>

        <section className={styles.overview} id="about" aria-labelledby="overview-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionNumber}>02</p>
              <h2 id="overview-title" className={styles.sectionLabel}>
                What this is
              </h2>
            </div>

            <div className={styles.overviewGrid}>
              <p className={styles.statement}>
                Across marketing, IT, and R&amp;D, I help businesses bring shape to work that
                has started to sprawl.
              </p>

              <div className={styles.asideCard}>
                <p className={styles.asideText}>
                  Sometimes that means a new site. Sometimes it means a cleaner process,
                  better handoff, or less friction between the idea and the thing that
                  actually ships.
                </p>
                <Link className={styles.inlineLink} href="/websites-for-sale">
                  Need something faster? Start with a ready-made site.
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.work} id="work" aria-labelledby="work-title">
          <div className={styles.shell}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionNumber}>03</p>
              <div className={styles.sectionLead}>
                <h2 id="work-title" className={styles.sectionLabel}>
                  Selected websites
                </h2>
                <p className={styles.sectionCopy}>
                  A few live builds from the inventory already tied into this site.
                </p>
              </div>
            </div>

            <div className={styles.workGrid}>
              {featuredSites.length > 0 ? (
                featuredSites.map((site) => {
                  const url = normalizeWebsiteUrl(site.url);
                  const previewImage = getWebsitePreview(site);

                  return (
                    <article key={site._id} className={styles.workCard}>
                      <a
                        className={styles.workLink}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <div className={styles.workMedia}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={previewImage}
                            alt={`${site.title} preview`}
                            className={styles.workImage}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                          {site.sold ? <span className={styles.soldBadge}>Sold</span> : null}
                        </div>

                        <div className={styles.workBody}>
                          <div className={styles.workMeta}>
                            <span>{getWebsiteDomain(url)}</span>
                            <span>{site.sold ? "Archived" : "Available"}</span>
                          </div>
                          <h3 className={styles.workTitle}>{site.title}</h3>
                          <p className={styles.workDescription}>
                            {site.description ||
                              "Live website preview pulled from the current catalog."}
                          </p>
                        </div>
                      </a>
                    </article>
                  );
                })
              ) : (
                <article className={styles.workCard}>
                  <div className={styles.workBody}>
                    <div className={styles.workMeta}>
                      <span>Inventory</span>
                      <span>Empty</span>
                    </div>
                    <h3 className={styles.workTitle}>No websites loaded yet.</h3>
                    <p className={styles.workDescription}>
                      The page is wired for live website entries from Sanity. Once those are
                      present, they will appear here automatically.
                    </p>
                    <Link className={styles.inlineLink} href="/websites-for-sale">
                      Go to the websites page
                    </Link>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <section
          className={styles.approachSection}
          id="approach"
          aria-labelledby="approach-title"
        >
          <div className={styles.shell}>
            <div className={styles.sectionHeader}>
              <p className={styles.sectionNumber}>04</p>
              <div className={styles.sectionLead}>
                <h2 id="approach-title" className={styles.sectionLabel}>
                  Approach
                </h2>
                <p className={styles.sectionCopy}>
                  A tighter version of strategy, systems, and build.
                </p>
              </div>
            </div>

            <div className={styles.approachGrid}>
              {approach.map((item, index) => (
                <article key={item.title} className={styles.approachCard}>
                  <span className={styles.approachIndex}>0{index + 1}</span>
                  <h3 className={styles.approachTitle}>{item.title}</h3>
                  <p className={styles.approachBody}>{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.contact} id="contact" aria-labelledby="contact-title">
          <div className={styles.shell}>
            <div className={styles.contactCard}>
              <div className={styles.contactIntro}>
                <p className={styles.sectionNumber}>05</p>
                <h2 id="contact-title" className={styles.contactTitle}>
                  If you need the site, the structure, or both.
                </h2>
              </div>

              <div className={styles.contactActions}>
                <a className={styles.contactLink} href="mailto:contact@phinehasadams.com">
                  contact@phinehasadams.com
                </a>
                <Link className={styles.contactSecondary} href="/websites-for-sale">
                  See websites for sale
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
