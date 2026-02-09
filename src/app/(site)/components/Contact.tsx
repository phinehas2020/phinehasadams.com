'use client';

import { useEffect, useRef } from 'react';
import { animate, onScroll, createScope } from 'animejs';
import styles from './Contact.module.css';

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        if (prefersReducedMotion) return;

        const scope = createScope({ root: section });
        scopeRef.current = scope;

        scope.add(() => {
            animate(`.${styles.label}`, {
                x: [-20, 0],
                opacity: [0, 1],
                duration: 600,
                ease: 'outQuint',
                autoplay: onScroll({
                    target: section,
                    enter: 'bottom-=80',
                }),
            });

            animate(`.${styles.link}`, {
                y: [30, 0],
                opacity: [0, 1],
                duration: 900,
                delay: 150,
                ease: 'outQuint',
                autoplay: onScroll({
                    target: section,
                    enter: 'bottom-=80',
                }),
            });
        });

        return () => {
            scope.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <span className={styles.label} style={{ opacity: 0 }}>
                {"//"} COMMS
            </span>
            <a href="mailto:contact@phinehasadams.com" className={styles.link} style={{ opacity: 0 }}>
                contact@phinehasadams.com
            </a>
        </section>
    );
}
