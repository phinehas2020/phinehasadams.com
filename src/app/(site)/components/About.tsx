'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, onScroll, createScope } from 'animejs';
import styles from './About.module.css';

export default function About() {
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
            // Label slides in
            animate(`.${styles.label}`, {
                x: [-30, 0],
                opacity: [0, 1],
                duration: 800,
                ease: 'outQuint',
                autoplay: onScroll({
                    target: section,
                    enter: 'bottom-=100',
                }),
            });

            // Split content words manually for animation
            const contentEl = section.querySelector(`.${styles.content} p`) as HTMLElement;
            if (contentEl) {
                const html = contentEl.innerHTML;
                // Wrap each word in a span (preserve existing spans)
                const words: HTMLSpanElement[] = [];
                const wrapper = document.createElement('div');
                wrapper.innerHTML = html;

                const walkAndWrap = (node: Node) => {
                    if (node.nodeType === Node.TEXT_NODE) {
                        const text = node.textContent || '';
                        const wordFrags = text.split(/(\s+)/);
                        const frag = document.createDocumentFragment();
                        wordFrags.forEach(w => {
                            if (/^\s+$/.test(w)) {
                                frag.appendChild(document.createTextNode(w));
                            } else if (w) {
                                const span = document.createElement('span');
                                span.style.display = 'inline-block';
                                span.style.opacity = '0';
                                span.style.transform = 'translateY(20px)';
                                span.textContent = w;
                                frag.appendChild(span);
                                words.push(span);
                            }
                        });
                        node.parentNode?.replaceChild(frag, node);
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        const el = node as HTMLElement;
                        if (el.classList.contains(styles.highlight)) {
                            // Wrap the text inside highlights
                            el.style.display = 'inline-block';
                            el.style.opacity = '0';
                            el.style.transform = 'translateY(20px)';
                            words.push(el);
                        } else {
                            // Walk children in reverse to avoid mutation issues
                            const children = Array.from(node.childNodes);
                            children.forEach(walkAndWrap);
                        }
                    }
                };

                const children = Array.from(contentEl.childNodes);
                children.forEach(walkAndWrap);

                // Animate words in
                animate(words, {
                    y: [20, 0],
                    opacity: [0, 1],
                    duration: 600,
                    delay: stagger(40),
                    ease: 'outQuint',
                    autoplay: onScroll({
                        target: section,
                        enter: 'bottom-=80',
                    }),
                });
            }
        });

        return () => {
            scope.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className={styles.section}>
            <div className={styles.label}>
                {"//"} IDENTITY
            </div>
            <div className={styles.content}>
                <p>
                    I engineer systems. My work bridges the gap between <span className={styles.highlight}>automation</span>, <span className={styles.highlight}>infrastructure</span>, and <span className={styles.highlight}>design</span>.
                </p>
            </div>
        </section>
    );
}
