import type { SanityWebsite } from "@/sanity/lib/queries";
import { getWebsiteDomain, getWebsitePreview, normalizeWebsiteUrl } from "../utils/websites";
import styles from "./page.module.css";

interface WebsitePreviewProps {
  site: SanityWebsite;
}

export function WebsitePreview({ site }: WebsitePreviewProps) {
  const normalizedUrl = normalizeWebsiteUrl(site.url);
  const domain = getWebsiteDomain(normalizedUrl);
  const previewImageUrl = getWebsitePreview(site, 1440, 980);

  return (
    <div className={styles.previewContainer}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={previewImageUrl}
        alt={`${site.title} website preview`}
        className={styles.previewImage}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div className={styles.previewMeta}>
        <span className={styles.previewDomain}>{domain}</span>
        <span className={styles.previewHint}>Live preview</span>
      </div>
    </div>
  );
}
