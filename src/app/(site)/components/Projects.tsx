import styles from "./Projects.module.css";
import cardStyles from "./ProjectCard.module.css";
import { sanityFetch } from "@/sanity/lib/live";
import { WEBSITES_QUERY, type SanityWebsite } from "@/sanity/lib/queries";
import Link from "next/link";
import { WebsitePreviewCard } from "./WebsitePreviewCard";

export default async function Projects() {
  const { data: websites } = await sanityFetch<SanityWebsite[]>({
    query: WEBSITES_QUERY,
  });
  const displayWebsites = (websites ?? []).slice(0, 3);

  return (
    <section id="work" className={styles.section}>
      <header className={styles.head}>
        <span className={styles.index} data-reveal>
          <span className={styles.indexNum}>01</span>
          Work — Websites
        </span>
        <h2 className={styles.headline} data-reveal>
          Live on your domain in{" "}
          <span className={styles.figure}>3 days</span>. On the first page of
          Google in <span className={styles.figure}>10</span>.
        </h2>
      </header>

      <div className={styles.grid}>
        {displayWebsites.map((site, i) => (
          <a
            key={site._id}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cardStyles.card} ${site.sold ? cardStyles.sold : ""}`}
            data-reveal
            style={{ "--reveal-delay": `${i * 0.08}s` } as React.CSSProperties}
          >
            <div className={cardStyles.frame}>
              <WebsitePreviewCard
                url={site.url}
                title={site.title}
                sold={site.sold}
              />
              <span className={cardStyles.frameIndex}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <div className={cardStyles.meta}>
              <h3 className={cardStyles.title}>
                {site.title}
                {site.sold && <span className={cardStyles.soldTag}>Sold</span>}
                <span className={cardStyles.arrow} aria-hidden="true">
                  ↗
                </span>
              </h3>
              {site.description && (
                <p className={cardStyles.desc}>{site.description}</p>
              )}
            </div>
          </a>
        ))}
      </div>

      <div className={styles.more} data-reveal>
        <Link href="/websites-for-sale" className={styles.moreLink}>
          <span>See the full inventory</span>
          <span className={styles.moreIcon} aria-hidden="true">
            ↗
          </span>
        </Link>
      </div>
    </section>
  );
}
