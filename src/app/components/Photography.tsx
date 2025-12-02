'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import styles from './Photography.module.css';

const photos = [
    { src: '/images/bw_architecture.png', alt: 'Minimal Architecture' },
    { src: '/images/bw_abstract.png', alt: 'Abstract Light' },
    { src: '/images/bw_urban.png', alt: 'Urban Texture' },
    { src: '/images/bw_architecture.png', alt: 'Structure' },
    { src: '/images/bw_urban.png', alt: 'City Flow' },
    { src: '/images/bw_abstract.png', alt: 'Light Form' },
    { src: '/images/bw_urban.png', alt: 'Movement' },
    { src: '/images/bw_architecture.png', alt: 'Concrete' },
    { src: '/images/bw_abstract.png', alt: 'Shadows' },
];

export default function Photography() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start']
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

    const col1 = photos.slice(0, 3);
    const col2 = photos.slice(3, 6);
    const col3 = photos.slice(6, 9);

    return (
        <section ref={containerRef} className={styles.section}>
            <div className={styles.header}>
                <motion.div
                    style={{ x: y1 }}
                    className={styles.headerContent}
                >
                    <span className={styles.label}>// PHOTOGRAPHY</span>
                    <h2 className={styles.title}>VISUAL<br />RECORDS</h2>
                </motion.div>
            </div>

            <div className={styles.gallery}>
                <motion.div style={{ y: y1 }} className={styles.column}>
                    {col1.map((photo, i) => <PhotoCard key={i} photo={photo} />)}
                </motion.div>
                <motion.div style={{ y: y2 }} className={styles.column}>
                    {col2.map((photo, i) => <PhotoCard key={i} photo={photo} />)}
                </motion.div>
                <motion.div style={{ y: y3 }} className={styles.column}>
                    {col3.map((photo, i) => <PhotoCard key={i} photo={photo} />)}
                </motion.div>
            </div>
        </section>
    );
}

function PhotoCard({ photo }: { photo: { src: string, alt: string } }) {
    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>
        </div>
    );
}
