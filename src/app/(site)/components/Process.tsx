'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, onScroll, createScope } from 'animejs';
import styles from './Process.module.css';

export default function Process() {
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
            const cards = section.querySelectorAll(`.${styles.card}`);

            animate(Array.from(cards), {
                y: [40, 0],
                opacity: [0, 1],
                scale: [0.95, 1],
                duration: 900,
                delay: stagger(120),
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
            <span className={styles.label}>{"// "}PROCESS</span>
            <div className={styles.bento}>

                {/* ITERATE — dual orbit animation */}
                <div className={`${styles.card} ${styles.iterate}`} style={{ opacity: 0 }}>
                    <div className={styles.visual}>
                        <div className={styles.orbitOuter}>
                            <div className={styles.orbitInner} />
                            <div className={styles.orbitPulse} />
                        </div>
                    </div>
                    <div className={styles.cardInfo}>
                        <span className={styles.tag}>ITERATE</span>
                        <p className={styles.desc}>Debug. Refactor. Ship. Repeat.</p>
                    </div>
                </div>

                {/* INTEGRATE — connected nodes with signal pulses */}
                <div className={`${styles.card} ${styles.integrate}`} style={{ opacity: 0 }}>
                    <div className={styles.visual}>
                        <div className={styles.network}>
                            <span className={styles.dot} />
                            <span className={styles.wire}>
                                <span className={styles.signal} />
                            </span>
                            <span className={styles.dot} />
                            <span className={styles.wire}>
                                <span className={styles.signal} style={{ animationDelay: '0.7s' }} />
                            </span>
                            <span className={styles.dot} />
                        </div>
                    </div>
                    <div className={styles.cardInfo}>
                        <span className={styles.tag}>INTEGRATE</span>
                        <p className={styles.desc}>Systems wired into one pipeline.</p>
                    </div>
                </div>

                {/* DEPLOY — ascending pipeline bars */}
                <div className={`${styles.card} ${styles.deploy}`} style={{ opacity: 0 }}>
                    <div className={styles.visual}>
                        <div className={styles.pipeline}>
                            <div className={`${styles.bar} ${styles.bar1}`} />
                            <div className={`${styles.bar} ${styles.bar2}`} />
                            <div className={`${styles.bar} ${styles.bar3}`} />
                            <div className={`${styles.bar} ${styles.bar4}`} />
                        </div>
                    </div>
                    <div className={styles.cardInfo}>
                        <span className={styles.tag}>DEPLOY</span>
                        <p className={styles.desc}>Local to production. Full pipeline.</p>
                    </div>
                </div>

                {/* BUILD — stacking layers */}
                <div className={`${styles.card} ${styles.build}`} style={{ opacity: 0 }}>
                    <div className={styles.visual}>
                        <div className={styles.layers}>
                            <div className={`${styles.layerBar} ${styles.l1}`} />
                            <div className={`${styles.layerBar} ${styles.l2}`} />
                            <div className={`${styles.layerBar} ${styles.l3}`} />
                            <div className={`${styles.layerBar} ${styles.l4}`} />
                            <div className={`${styles.layerBar} ${styles.l5}`} />
                        </div>
                    </div>
                    <div className={styles.cardInfo}>
                        <span className={styles.tag}>BUILD</span>
                        <p className={styles.desc}>Software. Hardware. Whatever it takes.</p>
                    </div>
                </div>

            </div>
        </section>
    );
}
