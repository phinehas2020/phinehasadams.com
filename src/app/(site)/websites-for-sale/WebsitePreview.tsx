import type { CSSProperties } from 'react';
import styles from './page.module.css';

interface WebsitePreviewProps {
    url: string;
    title: string;
}

export function WebsitePreview({ url, title }: WebsitePreviewProps) {
    const domain = getDomain(url);
    const seed = getSeed(`${domain}-${title}`);
    const hue = 162 + (seed % 52);
    const serpScore = 88 + (seed % 11);
    const conversionScore = 74 + ((seed >> 2) % 18);
    const signalWidths = Array.from({ length: 5 }, (_, index) => {
        return 44 + ((seed + index * 13) % 52);
    });

    return (
        <div
            className={styles.previewContainer}
            style={
                {
                    '--preview-hue': `${hue}`,
                    '--preview-hue-soft': `${Math.max(130, hue - 22)}`,
                } as CSSProperties
            }
        >
            <div className={styles.previewAura} aria-hidden />
            <div className={styles.previewGrid} aria-hidden />
            <div className={styles.previewPanel}>
                <div className={styles.previewTopRow}>
                    <span className={styles.previewTag}>Growth Ready</span>
                    <span className={styles.previewDomain}>{domain}</span>
                </div>

                <div className={styles.previewStats}>
                    <div className={styles.previewStat}>
                        <span>SERP Score</span>
                        <strong>{serpScore}%</strong>
                    </div>
                    <div className={styles.previewStat}>
                        <span>Conversion Flow</span>
                        <strong>{conversionScore}%</strong>
                    </div>
                </div>

                <div className={styles.previewBarRail}>
                    {signalWidths.map((width, index) => (
                        <span
                            key={`${domain}-${index}`}
                            className={styles.previewBar}
                            style={
                                {
                                    '--bar-width': `${width}%`,
                                    '--bar-delay': `${index * 140}ms`,
                                } as CSSProperties
                            }
                        />
                    ))}
                </div>
            </div>
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
        return (total + char.charCodeAt(0) * (index + 7)) % 9973;
    }, 0);
}
