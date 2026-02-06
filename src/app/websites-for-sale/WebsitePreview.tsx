'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.css';

interface WebsitePreviewProps {
    url: string;
    title: string;
}

export function WebsitePreview({ url, title }: WebsitePreviewProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(0.28);

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
        <div ref={containerRef} className={styles.previewContainer}>
            <iframe
                src={url}
                className={styles.iframe}
                style={{ transform: `scale(${scale})` }}
                title={`Preview of ${title}`}
                tabIndex={-1}
                loading="lazy"
            />
        </div>
    );
}
