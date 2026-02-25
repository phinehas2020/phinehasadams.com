import type { CSSProperties } from 'react';
import styles from './ProjectCard.module.css';

interface WebsitePreviewProps {
    url: string;
    title: string;
    sold?: boolean;
}

export function WebsitePreviewCard({ url, title, sold }: WebsitePreviewProps) {
    const domain = getDomain(url);
    const seed = getSeed(`${domain}-${title}`);
    const hue = 158 + (seed % 58);
    const readiness = 90 + (seed % 9);
    const momentum = 80 + ((seed >> 3) % 15);
    const signalWidths = Array.from({ length: 5 }, (_, index) => {
        return 46 + ((seed + index * 17) % 50);
    });

    return (
        <div
            className={styles.iframeContainer}
            style={
                {
                    '--preview-hue': `${hue}`,
                    '--preview-hue-soft': `${Math.max(130, hue - 24)}`,
                } as CSSProperties
            }
        >
            <div className={styles.previewBackdrop} aria-hidden />
            <div className={styles.previewGrid} aria-hidden />
            <div className={styles.previewHud}>
                <div className={styles.previewTopRow}>
                    <span className={styles.previewPill}>Launch in 72h</span>
                    <span className={styles.previewDomain}>{domain}</span>
                </div>

                <div className={styles.previewStats}>
                    <div className={styles.previewStat}>
                        <span>SEO Readiness</span>
                        <strong>{readiness}%</strong>
                    </div>
                    <div className={styles.previewStat}>
                        <span>Growth Momentum</span>
                        <strong>{momentum}%</strong>
                    </div>
                </div>

                <div className={styles.previewLines}>
                    {signalWidths.map((width, index) => (
                        <span
                            key={`${domain}-${index}`}
                            className={styles.previewLine}
                            style={
                                {
                                    '--line-width': `${width}%`,
                                    '--line-delay': `${index * 140}ms`,
                                } as CSSProperties
                            }
                        />
                    ))}
                </div>
            </div>
            {sold && (
                <div className={styles.soldOverlay}>
                    <span className={styles.soldBadge}>SOLD</span>
                </div>
            )}
        </div>
    );
}

function getDomain(url: string): string {
    try {
        return new URL(url).hostname.replace(/^www\./, '');
    } catch {
        return url.replace(/^https?:\/\//, '').split('/')[0] || 'website';
    }
}

function getSeed(input: string): number {
    return input.split('').reduce((total, char, index) => {
        return (total + char.charCodeAt(0) * (index + 11)) % 9973;
    }, 0);
}
