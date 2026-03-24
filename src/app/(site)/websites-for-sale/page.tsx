import type { Metadata } from "next";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { WEBSITES_QUERY, type SanityWebsite } from "@/sanity/lib/queries";
import { getWebsiteDomain, normalizeWebsiteUrl } from "../utils/websites";
import { WebsitePreview } from "./WebsitePreview";
import styles from "./page.module.css";

const processSteps = [
  {
    title: "Pick a base",
    body: "Choose a site that already matches the tone, category, or structure you need.",
  },
  {
    title: "Make it yours",
    body: "We swap in your brand, your copy, your offers, your photos, and your domain.",
  },
  {
    title: "Ship cleanly",
    body: "The finished site goes live with the right handoff instead of leaving you with a half-finished template.",
  },
];

const foundationRows = [
  {
    label: "Turnaround",
    value: "About 3 days to customize and ship",
  },
  {
    label: "Starting point",
    value: "Live site systems, not flat mockups",
  },
  {
    label: "Best fit",
    value: "Businesses that need something fast without looking rushed",
  },
];

export const metadata: Metadata = {
  title: "Ready-made Websites | Phinehas Adams",
  description:
    "Browse ready-made websites that can be customized for your business, shipped on your domain, and refined without starting from zero.",
  openGraph: {
    title: "Ready-made Websites | Phinehas Adams",
    description:
      "Ready-made websites customized for your business, shipped on your domain, and built to feel considered from day one.",
    images: [
      {
        url: "/og-websites.png",
        width: 1400,
        height: 860,
        alt: "Ready-made websites by Phinehas Adams",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ready-made Websites | Phinehas Adams",
    description:
      "Browse ready-made websites that can be customized for your business and shipped without starting from scratch.",
    images: ["/og-websites.png"],
  },
};

function getStartingPrice(sites: SanityWebsite[]) {
  const prices = sites
    .filter((site) => !site.sold && typeof site.purchasePrice === "number")
    .map((site) => site.purchasePrice as number);

  if (prices.length === 0) {
    return null;
  }

  return Math.min(...prices);
}

export default async function WebsitesForSale() {
  const { data: websites } = await sanityFetch<SanityWebsite[]>({ query: WEBSITES_QUERY });
  const sites = websites ?? [];
  const soldCount = sites.filter((site) => site.sold).length;
  const availableCount = sites.length - soldCount;
  const startingPrice = getStartingPrice(sites);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.shell}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Ready-made websites</p>
              <h1 className={styles.title}>A faster route to a site that still feels considered.</h1>
              <p className={styles.lead}>
                These are live website foundations that can be adapted to your business
                instead of starting from a blank canvas every time.
              </p>
              <p className={styles.support}>
                Good if you want something sharper than a template, faster than a full
                custom build, and clear about what happens next.
              </p>

              <div className={styles.heroActions}>
                <a className={styles.primaryAction} href="#inventory">
                  Browse inventory
                </a>
                <Link className={styles.secondaryAction} href="/#contact">
                  Start a custom project
                </Link>
              </div>
            </div>

            <aside className={styles.heroPanel} aria-label="Offer summary">
              <div className={styles.panelHeader}>
                <span className={styles.panelEyebrow}>Offer summary</span>
                <span className={styles.panelStatus}>Live inventory</span>
              </div>

              <div className={styles.panelRows}>
                {foundationRows.map((row) => (
                  <div key={row.label} className={styles.panelRow}>
                    <span>{row.label}</span>
                    <strong>{row.value}</strong>
                  </div>
                ))}
              </div>

              <p className={styles.panelNote}>
                If none of the starting points fit, custom work is still available.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.summary}>
        <div className={styles.shell}>
          <div className={styles.summaryGrid}>
            <article className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Available now</span>
              <strong className={styles.summaryValue}>{availableCount}</strong>
              <p className={styles.summaryCopy}>
                Live starting points ready to customize and ship.
              </p>
            </article>
            <article className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Already sold</span>
              <strong className={styles.summaryValue}>{soldCount}</strong>
              <p className={styles.summaryCopy}>
                Proof that the catalog is moving, not a static mood board.
              </p>
            </article>
            <article className={styles.summaryCard}>
              <span className={styles.summaryLabel}>Starting from</span>
              <strong className={styles.summaryValue}>
                {startingPrice ? `$${startingPrice.toLocaleString()}` : "Ask"}
              </strong>
              <p className={styles.summaryCopy}>
                Final price depends on the amount of adaptation and added work.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={styles.process}>
        <div className={styles.shell}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionNumber}>01</p>
            <div className={styles.sectionLead}>
              <h2 className={styles.sectionTitle}>How this works</h2>
              <p className={styles.sectionCopy}>
                A quicker route when the goal is to get live cleanly without pretending every
                project needs to start from zero.
              </p>
            </div>
          </div>

          <div className={styles.processGrid}>
            {processSteps.map((step, index) => (
              <article key={step.title} className={styles.processCard}>
                <span className={styles.processIndex}>0{index + 1}</span>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processBody}>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.inventory} id="inventory">
        <div className={styles.shell}>
          <div className={styles.sectionHeader}>
            <p className={styles.sectionNumber}>02</p>
            <div className={styles.sectionLead}>
              <h2 className={styles.sectionTitle}>Inventory</h2>
              <p className={styles.sectionCopy}>
                Live previews, real pricing, and clear sold vs. available status.
              </p>
            </div>
          </div>

          <div className={styles.inventoryMeta}>
            <p className={styles.inventoryNote}>
              Every available site includes customization for your business, not a raw handoff.
            </p>
            <Link className={styles.inventoryLink} href="/#contact">
              Need a more specific build?
            </Link>
          </div>

          <div className={styles.inventoryGrid}>
            {sites.length > 0 ? (
              sites.map((site) => (
                <article
                  key={site._id}
                  className={styles.siteCard}
                  data-sold={site.sold ? "true" : "false"}
                >
                  <a
                    className={styles.previewLink}
                    href={site.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <WebsitePreview site={site} />
                  </a>

                  <div className={styles.siteBody}>
                    <div className={styles.siteHeader}>
                      <div>
                        <div className={styles.siteStatusRow}>
                          <span className={styles.siteStatus} data-sold={site.sold ? "true" : "false"}>
                            {site.sold ? "Sold" : "Available"}
                          </span>
                          <span className={styles.siteDomain}>
                            {getWebsiteDomain(normalizeWebsiteUrl(site.url))}
                          </span>
                        </div>
                        <h3 className={styles.siteTitle}>{site.title}</h3>
                      </div>
                    </div>

                    <p className={styles.siteDescription}>
                      {site.description ||
                        "Live website foundation available for brand, content, and offer adaptation."}
                    </p>

                    <div className={styles.siteFooter}>
                      <div className={styles.pricing}>
                        {site.purchasePrice ? (
                          <span className={styles.priceTag}>
                            ${site.purchasePrice.toLocaleString()}
                          </span>
                        ) : null}
                        {site.monthlyPrice ? (
                          <span className={styles.monthlyTag}>+${site.monthlyPrice}/mo</span>
                        ) : null}
                      </div>

                      <div className={styles.siteActions}>
                        {site.stripeLink && !site.sold ? (
                          <a
                            href={site.stripeLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.buyButton}
                          >
                            Buy now
                          </a>
                        ) : null}
                        <Link className={styles.secondaryLink} href="/#contact">
                          {site.sold ? "Request something similar" : "Custom fit"}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className={styles.emptyState}>No websites listed at the moment.</div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.custom}>
        <div className={styles.shell}>
          <div className={styles.customCard}>
            <div className={styles.customCopy}>
              <p className={styles.eyebrow}>Custom still available</p>
              <h2 className={styles.customTitle}>
                If the catalog gets you close but not all the way there, start custom.
              </h2>
              <p className={styles.customBody}>
                The ready-made sites are there to shorten the path, not to box you into the
                wrong shape.
              </p>
            </div>

            <div className={styles.customActions}>
              <Link className={styles.primaryAction} href="/#contact">
                Talk through the project
              </Link>
              <a className={styles.secondaryAction} href="mailto:contact@phinehasadams.com">
                contact@phinehasadams.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
