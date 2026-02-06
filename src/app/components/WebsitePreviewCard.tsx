'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ProjectCard.module.css';

interface WebsitePreviewProps {
    url: string;
    title: string;
    sold?: boolean;
}

export function WebsitePreviewCard({ url, title, sold }: WebsitePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.25);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                // iframe is 1440px wide, calculate scale to fit container
                const newScale = containerWidth / 1440;
                setScale(newScale);
            }
        };

        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    return (
        <div ref={containerRef} className={styles.iframeContainer}>
            <iframe
                src={url}
                className={styles.iframe}
                style={{ transform: `scale(${scale})` }}
                title={`Preview of ${title}`}
                tabIndex={-1}
                loading="lazy"
            />
            {sold && (
                <div className={styles.soldOverlay}>
                    <span className={styles.soldBadge}>SOLD</span>
                </div>
            )}
        </div>
    );
}
