import styles from './Projects.module.css';
import cardStyles from './ProjectCard.module.css';
import { getWebsites, Website } from '@/lib/websites';
import Link from 'next/link';
import { WebsitePreviewCard } from './WebsitePreviewCard';

export default async function Projects() {
    let websites: Website[] = [];
    try {
        websites = await getWebsites();
    } catch {
        // DB unavailable (local dev without DATABASE_URL)
    }

    // Only show first 3 websites on homepage
    const displayWebsites = websites.slice(0, 3);

    return (
        <section className={styles.section}>
            <span className={styles.label}>
                {"//"} WEBSITES FOR SALE
            </span>
            <div className={styles.grid}>
                {displayWebsites.map((site: Website) => (
                    <a
                        key={site.id}
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${cardStyles.card} ${site.sold ? cardStyles.soldCard : ''}`}
                    >
                        <div className={cardStyles.browserHeader}>
                            <div className={cardStyles.dot}></div>
                            <div className={cardStyles.dot}></div>
                            <div className={cardStyles.dot}></div>
                        </div>
                        <WebsitePreviewCard url={site.url} title={site.title} sold={site.sold} />
                        <div className={cardStyles.content}>
                            <div className={cardStyles.header}>
                                <h3 className={cardStyles.title}>
                                    {site.title}
                                    {site.sold && <span className={cardStyles.soldTag}>Sold</span>}
                                </h3>
                            </div>
                            {site.description && (
                                <p className={cardStyles.description}>{site.description}</p>
                            )}
                        </div>
                    </a>
                ))}
            </div>
            {websites.length > 3 && (
                <div className={styles.viewMore}>
                    <Link href="/websites-for-sale" className={styles.viewMoreLink}>
                        View All Websites →
                    </Link>
                </div>
            )}
        </section>
    );
}
