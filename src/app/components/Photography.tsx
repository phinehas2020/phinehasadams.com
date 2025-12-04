"use client";

import { useRef } from "react";
import Image from "next/image";
import styles from "./Photography.module.css";

export interface PhotoData {
    id: string;
    src: string;
    alt: string;
    iso: string;
    shutter: string;
    aperture: string;
    focalLength: string;
    date: string;
    location: string;
}

interface PhotographyProps {
    photos: PhotoData[];
}

export default function Photography({ photos = [] }: PhotographyProps) {

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return (
        <section className={styles.section} id="photography">
            {/* Background HUD Elements */}
            <div className={`${styles.hudLine} ${styles.hudLineTop}`}></div>
            <div className={`${styles.hudLine} ${styles.hudLineBottom}`}></div>

            <div className={styles.header}>
                <h2 className={styles.title}>
                    <span className={styles.indicator}></span>
                    Visual Data
                </h2>
                <div className={styles.meta}>
                    <div>System: Optical Array</div>
                    <div>Status: Online</div>
                </div>
            </div>

            <div className={styles.galleryWrapper}>
                <div className={styles.gallery} ref={scrollContainerRef}>
                    {photos.map((photo) => (
                        <div key={photo.id} className={styles.card} tabIndex={0}>
                            <div className={styles.imageContainer}>
                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 85vw, 350px"
                                    priority={photo.id === "IMG_001"}
                                />
                                <div className={styles.crosshair}></div>
                            </div>

                            <div className={styles.overlay}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.idBadge}>{photo.id}</span>
                                    <span className={styles.statusBadge}>LOCKED</span>
                                </div>

                                <div className={styles.dataGrid}>
                                    <div className={styles.dataItem}>
                                        <span className={styles.dataLabel}>ISO</span>
                                        <span className={styles.dataValue}>{photo.iso}</span>
                                    </div>
                                    <div className={styles.dataItem}>
                                        <span className={styles.dataLabel}>SHTR</span>
                                        <span className={styles.dataValue}>{photo.shutter}</span>
                                    </div>
                                    <div className={styles.dataItem}>
                                        <span className={styles.dataLabel}>APER</span>
                                        <span className={styles.dataValue}>{photo.aperture}</span>
                                    </div>
                                    <div className={styles.dataItem}>
                                        <span className={styles.dataLabel}>LEN</span>
                                        <span className={styles.dataValue}>{photo.focalLength}</span>
                                    </div>
                                    <div className={styles.dataItem} style={{ gridColumn: '1 / -1' }}>
                                        <span className={styles.dataLabel}>LOC</span>
                                        <span className={styles.dataValue}>{photo.location}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
