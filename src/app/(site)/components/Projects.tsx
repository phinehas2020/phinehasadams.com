import styles from './Projects.module.css';
import cardStyles from './ProjectCard.module.css';
import { sanityFetch } from '@/sanity/lib/live';
import { WEBSITES_QUERY, type SanityWebsite } from '@/sanity/lib/queries';
import Link from 'next/link';
import { WebsitePreviewCard } from './WebsitePreviewCard';

export default async function Projects() {
    const { data: websites } = await sanityFetch<SanityWebsite[]>({ query: WEBSITES_QUERY });

    // Only show first 3 websites on homepage
    const displayWebsites = (websites ?? []).slice(0, 3);

    return (
        <section className={styles.section}>
            <span className={styles.label}>
                {"//"} BUY A WEBSITE
            </span>
            <div className={styles.pitch}>
                <h2 className={styles.headline}>
                    Customized &amp; shipped on <span className={styles.accent}>your domain</span> in{' '}
                    <span className={styles.metric}><span className={styles.number}>3</span> days</span>.
                    {' '}Ranking on the <span className={styles.accent}>first page of Google</span> in{' '}
                    <span className={styles.metric}><span className={styles.number}>10</span> days</span>.
                </h2>
            </div>
            <div className={styles.grid}>
                {displayWebsites.map((site) => (
                    <a
                        key={site._id}
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
            {(websites ?? []).length > 3 && (
                <div className={styles.viewMore}>
                    <Link href="/websites-for-sale" className={styles.viewMoreLink}>
                        View All Websites →
                    </Link>
                </div>
            )}
        </section>
    );
}
