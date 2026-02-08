'use client';

import { motion } from 'framer-motion';
import styles from './Process.module.css';

export default function Process() {
    return (
        <section className={styles.section}>
            <span className={styles.label}>{"// "}PROCESS</span>
            <div className={styles.bento}>

                {/* ITERATE — dual orbit animation */}
                <motion.div
                    className={`${styles.card} ${styles.iterate}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
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
                </motion.div>

                {/* INTEGRATE — connected nodes with signal pulses */}
                <motion.div
                    className={`${styles.card} ${styles.integrate}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                >
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
                </motion.div>

                {/* DEPLOY — ascending pipeline bars */}
                <motion.div
                    className={`${styles.card} ${styles.deploy}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
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
                </motion.div>

                {/* BUILD — stacking layers */}
                <motion.div
                    className={`${styles.card} ${styles.build}`}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
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
                </motion.div>

            </div>
        </section>
    );
}
