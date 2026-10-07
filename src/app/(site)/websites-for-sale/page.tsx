import type { Metadata } from "next";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { sanityFetch } from "@/sanity/lib/live";
import { WEBSITES_QUERY, type SanityWebsite } from "@/sanity/lib/queries";
import styles from "./page.module.css";
import Link from "next/link";
import { WebsitePreview } from "./WebsitePreview";

export const metadata: Metadata = {
  title: "Website Starting Points | Phinehas Adams",
  description:
    "Website starting points I can rebuild with your copy, photos, and branding, then help get live on your domain.",
  alternates: {
    canonical: "/websites-for-sale",
  },
};

const steps = [
  {
    n: "01",
    title: "Pick a site",
    desc: "Browse the layouts and find a starting point for your business.",
  },
  {
    n: "02",
    title: "I rebuild it",
    desc: "Your copy, photos, and branding go into the site.",
  },
  {
    n: "03",
    title: "Get it live",
    desc: "We agree on the scope and timing, then get it onto your domain.",
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
        <ArrowLeftIcon size={18} aria-hidden="true" /> Back to home
      </Link>

      {/* ── Hero ── */}
      <header className={styles.hero}>
        <span className={styles.eyebrow} data-reveal>
          <span className={styles.eyebrowMark} />
          Websites
        </span>
        <h1 className={styles.title} data-reveal>
          A starting point
          <br />
          <span className={styles.titleAccent}>for your website.</span>
        </h1>
        <p className={styles.subtitle} data-reveal>
          Browse the sites below. I can rebuild one with your copy, photos,
          and branding, then help get it live on your domain.
        </p>
      </header>

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
        <span className={styles.sectionLabel}>A different starting point</span>
        <h3 className={styles.ctaHeadline}>
          Need something{" "}
          <span className={styles.titleAccent}>built from scratch?</span>
        </h3>
        <p className={styles.ctaText}>
          Tell me what the site needs to do and what you already have.
        </p>
        <a href="mailto:contact@phinehasadams.com" className={styles.ctaButton}>
          <span>Talk about a website</span>
          <ArrowRightIcon size={24} className={styles.ctaIcon} aria-hidden="true" />
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
