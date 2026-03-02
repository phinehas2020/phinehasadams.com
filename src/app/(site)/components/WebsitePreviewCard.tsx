import styles from './ProjectCard.module.css';

interface WebsitePreviewProps {
    url: string;
    title: string;
    sold?: boolean;
}

export function WebsitePreviewCard({ url, title, sold }: WebsitePreviewProps) {
    const normalizedUrl = normalizeUrl(url);
    const domain = getDomain(normalizedUrl);
    const previewImageUrl = getPreviewImageUrl(normalizedUrl);

    return (
        <div className={styles.iframeContainer}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={previewImageUrl}
                alt={`${title} website preview`}
                className={styles.previewImage}
                loading="lazy"
                referrerPolicy="no-referrer"
            />
            <div className={styles.previewMeta}>
                <span className={styles.previewDomain}>{domain}</span>
                <span className={styles.previewHint}>Live Snapshot</span>
            </div>
            {sold && (
                <div className={styles.soldOverlay}>
                    <span className={styles.soldBadge}>SOLD</span>
                </div>
            )}
        </div>
    );
}

function normalizeUrl(url: string): string {
    if (/^https?:\/\//i.test(url)) {
        return url;
    }

    return `https://${url}`;
}

function getPreviewImageUrl(url: string): string {
    return `https://image.thum.io/get/width/1440/noanimate/${url}`;
}

function getDomain(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url.replace(/^https?:\/\//, '').split('/')[0] || 'website';
    }
}
