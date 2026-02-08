import type { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/live';
import { WEBSITES_QUERY, type SanityWebsite } from '@/sanity/lib/queries';
import styles from './page.module.css';
import Link from 'next/link';
import { WebsitePreview } from './WebsitePreview';

export const metadata: Metadata = {
    title: 'Buy a Website | Phinehas Adams',
    description: 'Customized & shipped on your domain in 3 days. Ranking on the first page of Google in 10 days.',
    openGraph: {
        title: 'Buy a Website — On the First Page of Google',
        description: 'Customized & shipped on your domain in 3 days. Ranking on the first page of Google in 10 days.',
        images: [
            {
                url: '/og-websites.png',
                width: 1400,
                height: 860,
                alt: 'Buy a Website — Your business online. On the first page of Google.',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Buy a Website — On the First Page of Google',
        description: 'Customized & shipped on your domain in 3 days. Ranking on the first page of Google in 10 days.',
        images: ['/og-websites.png'],
    },
};

export default async function WebsitesForSale() {
    const { data: websites } = await sanityFetch<SanityWebsite[]>({ query: WEBSITES_QUERY });
    const sites = websites ?? [];

    return (
        <main className={styles.container}>
            <nav className={styles.breadcrumbs}>
                <Link href="/" className={styles.breadcrumbLink}>← Back to Home</Link>
            </nav>

            {/* ── Hero ── */}
            <header className={styles.hero}>
                <span className={styles.tagline}>{"// "}BUY A WEBSITE</span>
                <h1 className={styles.title}>
                    Your business online.<br />
                    <span className={styles.titleAccent}>On the first page of Google.</span>
                </h1>
                <p className={styles.subtitle}>
                    Pick a site below. We customize it for your brand, ship it on your domain,
                    and get you ranking on the first page of Google for your local area.
                </p>
            </header>

            {/* ── Metrics Strip ── */}
            <div className={styles.metrics}>
                <div className={styles.metricCard}>
                    <div className={styles.metricVisual}>
                        <div className={styles.rocketTrail}>
                            <span className={styles.trailDot} />
                            <span className={styles.trailDot} />
                            <span className={styles.trailDot} />
                            <span className={styles.rocketHead} />
                        </div>
                    </div>
                    <span className={styles.metricNumber}>3</span>
                    <span className={styles.metricUnit}>DAYS</span>
                    <p className={styles.metricDesc}>Customized &amp; shipped on your domain</p>
                </div>

                <div className={styles.metricDivider} />

                <div className={styles.metricCard}>
                    <div className={styles.metricVisual}>
                        <div className={styles.barChart}>
                            <div className={`${styles.chartBar} ${styles.cb1}`} />
                            <div className={`${styles.chartBar} ${styles.cb2}`} />
                            <div className={`${styles.chartBar} ${styles.cb3}`} />
                            <div className={`${styles.chartBar} ${styles.cb4}`} />
                            <div className={`${styles.chartBar} ${styles.cb5}`} />
                        </div>
                    </div>
                    <span className={styles.metricNumber}>10</span>
                    <span className={styles.metricUnit}>DAYS</span>
                    <p className={styles.metricDesc}>Ranking on the first page of Google</p>
                </div>

                <div className={styles.metricDivider} />

                <div className={styles.metricCard}>
                    <div className={styles.metricVisual}>
                        <div className={styles.pinPulse}>
                            <span className={styles.pinIcon} />
                            <span className={styles.pingRing} />
                            <span className={styles.pingRing2} />
                        </div>
                    </div>
                    <span className={styles.metricNumber}>SEO</span>
                    <span className={styles.metricUnit}>LOCAL</span>
                    <p className={styles.metricDesc}>Optimized to rank for your business in your area</p>
                </div>
            </div>

            {/* ── How It Works ── */}
            <div className={styles.steps}>
                <span className={styles.stepsLabel}>{"// "}HOW IT WORKS</span>
                <div className={styles.stepsGrid}>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>01</span>
                        <h3 className={styles.stepTitle}>Pick a site</h3>
                        <p className={styles.stepDesc}>Browse the collection below and choose a design that fits your business.</p>
                    </div>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>02</span>
                        <h3 className={styles.stepTitle}>We customize it</h3>
                        <p className={styles.stepDesc}>Your brand, your copy, your photos. Fully tailored to your business and domain.</p>
                    </div>
                    <div className={styles.step}>
                        <span className={styles.stepNum}>03</span>
                        <h3 className={styles.stepTitle}>Live &amp; ranking</h3>
                        <p className={styles.stepDesc}>Shipped to your domain, optimized for Google, and ranking locally within days.</p>
                    </div>
                </div>
            </div>

            {/* ── Custom CTA ── */}
            <div className={styles.customCta}>
                <span className={styles.ctaLabel}>{"// "}IMPORTANT</span>
                <h3 className={styles.ctaHeadline}>
                    These are starting points — <span className={styles.ctaAccent}>not finished products</span>.
                </h3>
                <p className={styles.customText}>
                    Every site gets fully rebuilt around your business — your brand, your content, your domain.
                    Want something completely custom from scratch?
                </p>
                <a href="mailto:me@phinehasadams.com" className={styles.ctaButton}>
                    Get a Custom Quote →
                </a>
            </div>

            {/* ── Website Grid ── */}
            <div className={styles.gridSection}>
                <span className={styles.gridLabel}>{"// "}AVAILABLE WEBSITES</span>
                <div className={styles.grid}>
                    {sites.map((site) => (
                        <div key={site._id} className={`${styles.card} ${site.sold ? styles.soldCard : ''}`}>
                            <a href={site.url} target="_blank" rel="noopener noreferrer" className={styles.visitLink}>
                                <span className="sr-only">Visit {site.title}</span>
                            </a>

                            {site.sold && (
                                <div className={styles.soldOverlay}>
                                    <span className={styles.soldBadge}>SOLD</span>
                                </div>
                            )}

                            <div className={styles.browserWindow}>
                                <div className={styles.browserHeader}>
                                    <div className={`${styles.dot} ${styles.dotRed}`} />
                                    <div className={`${styles.dot} ${styles.dotYellow}`} />
                                    <div className={`${styles.dot} ${styles.dotGreen}`} />
                                    <div className={styles.addressBar} />
                                </div>
                                <WebsitePreview url={site.url} title={site.title} />
                            </div>

                            <div className={styles.info}>
                                <div>
                                    <h2 className={styles.siteTitle}>
                                        {site.title}
                                        {site.sold && <span className={styles.soldTag}>Sold</span>}
                                    </h2>
                                    {site.description && <p className={styles.siteDesc}>{site.description}</p>}
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
                                            Buy Now
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
            </div>
        </main>
    );
}
