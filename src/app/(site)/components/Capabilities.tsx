'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, onScroll, createScope } from 'animejs';
import styles from './Capabilities.module.css';

const capabilities = [
    "Shopify Buildout & Customization",
    "Odoo Inventory & Manufacturing",
    "Python Automations & API Integrations",
    "Nginx, Vercel, Server Config",
    "Packaging & Label Production",
    "CNC & 3D-Printing Workflow",
    "Photography & Video Production",
    "Brand & Design Direction",
    "Google & Meta Ads",
    "Network Setup (Ubiquiti, Tailscale)",
    "AI Tools & System-Building"
];

export default function Capabilities() {
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
            const items = section.querySelectorAll(`.${styles.item}`);

            animate(Array.from(items), {
                x: [-30, 0],
                opacity: [0, 1],
                duration: 700,
                delay: stagger(50),
                ease: 'outQuint',
                autoplay: onScroll({
                    target: section,
                    enter: 'bottom-=60',
                }),
            });
        });

        return () => {
            scope.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <span className={styles.label}>
                {"//"} CAPABILITIES
            </span>
            <ul className={styles.list}>
                {capabilities.map((c, i) => (
                    <li
                        key={i}
                        className={styles.item}
                        style={{ opacity: 0 }}
                    >
                        {c}
                    </li>
                ))}
            </ul>
        </section>
    );
}
