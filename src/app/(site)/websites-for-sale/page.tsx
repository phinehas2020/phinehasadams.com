import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { WEBSITES_QUERY, type SanityWebsite } from "@/sanity/lib/queries";
import styles from "./page.module.css";
import Link from "next/link";
import { WebsitePreview } from "./WebsitePreview";

export const metadata: Metadata = {
  title: "Buy a Website | Phinehas Adams",
  description:
    "A site customized for your business, shipped on your domain in 3 days, and ranking on the first page of Google in 10.",
  openGraph: {
    title: "Buy a Website — On the First Page of Google",
    description:
      "A site customized for your business, shipped on your domain in 3 days, and ranking on the first page of Google in 10.",
    images: [
      {
        url: "/og-websites.png",
        width: 1400,
        height: 860,
        alt: "Buy a Website — Your business online, on the first page of Google.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buy a Website — On the First Page of Google",
    description:
      "A site customized for your business, shipped on your domain in 3 days, and ranking on the first page of Google in 10.",
    images: ["/og-websites.png"],
  },
};

const steps = [
  {
    n: "01",
    title: "Pick a site",
    desc: "Browse the collection below and choose a design that fits your business.",
  },
  {
    n: "02",
    title: "We customize it",
    desc: "Your brand, your copy, your photos — fully tailored to your business and domain.",
  },
  {
    n: "03",
    title: "Live & ranking",
    desc: "Shipped to your domain, optimized for Google, and ranking locally within days.",
  },
];

export default async function WebsitesForSale() {
  const { data: websites } = await sanityFetch<SanityWebsite[]>({
    query: WEBSITES_QUERY,
  });
  const sites = websites ?? [];

  return (
    <main className={styles.container}>
      <Link href="/" className={styles.back}>
        <span aria-hidden="true">←</span> Back to home
      </Link>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <span className={styles.eyebrow} data-reveal>
          <span className={styles.eyebrowMark} />
          Buy a website
        </span>
        <h1 className={styles.title} data-reveal>
          Your business online.
          <br />
          <span className={styles.titleAccent}>On the first page of Google.</span>
        </h1>
        <p className={styles.subtitle} data-reveal>
          Pick a site below. I customize it for your brand, ship it on your
          domain, and get you ranking on the first page of Google for your local
          area.
        </p>
      </header>

      {/* ── Metrics ── */}
      <div className={styles.metrics}>
        <div className={styles.metric} data-reveal>
          <span className={styles.metricNum}>3</span>
          <span className={styles.metricUnit}>days</span>
          <p className={styles.metricDesc}>Customized &amp; shipped on your domain</p>
        </div>
        <div className={styles.metric} data-reveal>
          <span className={styles.metricNum}>10</span>
          <span className={styles.metricUnit}>days</span>
          <p className={styles.metricDesc}>Ranking on the first page of Google</p>
        </div>
        <div className={styles.metric} data-reveal>
          <span className={styles.metricNum}>Local</span>
          <span className={styles.metricUnit}>SEO</span>
          <p className={styles.metricDesc}>Optimized to rank for your area</p>
        </div>
      </div>

      {/* ── How it works ── */}
      <section className={styles.steps}>
        <span className={styles.sectionLabel} data-reveal>
          How it works
        </span>
        <div className={styles.stepsGrid}>
          {steps.map((step) => (
            <div key={step.n} className={styles.step} data-reveal>
              <span className={styles.stepNum}>{step.n}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Custom CTA ── */}
      <section className={styles.customCta} data-reveal>
        <span className={styles.sectionLabel}>Important</span>
        <h3 className={styles.ctaHeadline}>
          These are starting points —{" "}
          <span className={styles.titleAccent}>not finished products.</span>
        </h3>
        <p className={styles.ctaText}>
          Every site gets fully rebuilt around your business — your brand, your
          content, your domain. Want something completely custom from scratch?
        </p>
        <a href="mailto:contact@phinehasadams.com" className={styles.ctaButton}>
          <span>Get a custom quote</span>
          <span className={styles.ctaIcon} aria-hidden="true">
            ↗
          </span>
        </a>
      </section>

      {/* ── Website grid ── */}
      <section className={styles.gridSection}>
        <span className={styles.sectionLabel} data-reveal>
          Available websites
        </span>
        <div className={styles.grid}>
          {sites.map((site) => (
            <div
              key={site._id}
              className={`${styles.card} ${site.sold ? styles.soldCard : ""}`}
              data-reveal
            >
              <a
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.visitLink}
              >
                <span className="sr-only">Visit {site.title}</span>
              </a>

              <div className={styles.cardFrame}>
                {site.sold && (
                  <div className={styles.soldOverlay}>
                    <span className={styles.soldBadge}>Sold</span>
                  </div>
                )}
                <WebsitePreview url={site.url} title={site.title} />
              </div>

              <div className={styles.info}>
                <div>
                  <h2 className={styles.siteTitle}>{site.title}</h2>
                  {site.description && (
                    <p className={styles.siteDesc}>{site.description}</p>
                  )}
                </div>
                <div className={styles.infoFooter}>
                  {(site.purchasePrice || site.monthlyPrice) && (
                    <div className={styles.pricing}>
                      {site.purchasePrice && (
                        <span className={styles.priceTag}>
                          ${site.purchasePrice.toLocaleString()}
                        </span>
                      )}
                      {site.monthlyPrice && (
                        <span className={styles.monthlyTag}>
                          +${site.monthlyPrice}/mo
                        </span>
                      )}
                    </div>
                  )}
                  {site.stripeLink && !site.sold && (
                    <a
                      href={site.stripeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.buyButton}
                    >
                      Buy now
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}

          {sites.length === 0 && (
            <div className={styles.emptyState}>
              No websites listed at the moment.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
