import { getWebsites } from '@/lib/websites';
import styles from './page.module.css';
import Link from 'next/link';
import { WebsitePreview } from './WebsitePreview';

export const dynamic = 'force-dynamic';

export default async function WebsitesForSale() {
    const websites = await getWebsites();

    return (
        <main className={styles.container}>
            <nav className={styles.breadcrumbs}>
                <Link href="/" className={styles.breadcrumbLink}>← Back to Home</Link>
            </nav>

            <header className={styles.header}>
                <h1 className={styles.title}>Websites for Sale</h1>
                <p className={styles.subtitle}>
                    A curated collection of premium domains and developed websites available for acquisition.
                </p>
            </header>

            <div className={styles.grid}>
                {websites.map((site) => (
                    <div key={site.id} className={`${styles.card} ${site.sold ? styles.soldCard : ''}`}>
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
                                {(site.purchase_price || site.monthly_price) && (
                                    <div className={styles.pricing}>
                                        {site.purchase_price && (
                                            <span className={styles.priceTag}>
                                                ${site.purchase_price.toLocaleString()}
                                            </span>
                                        )}
                                        {site.monthly_price && (
                                            <span className={styles.monthlyTag}>
                                                +${site.monthly_price}/mo
                                            </span>
                                        )}
                                    </div>
                                )}
                                {site.stripe_link && !site.sold && (
                                    <a
                                        href={site.stripe_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={styles.buyButton}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        Buy Now
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {websites.length === 0 && (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', color: '#888', padding: '4rem' }}>
                        No websites listed at the moment.
                    </div>
                )}
            </div>
        </main>
    );
}
