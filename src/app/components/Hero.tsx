'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
    const [time, setTime] = useState('');
    const [taglineText, setTaglineText] = useState('');
    const [activeLine, setActiveLine] = useState<'name' | 'tagline'>('name');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toISOString().split('T')[1].split('.')[0] + ' UTC');
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Sequence:
        // 1. Wait for Name fade in (approx 1s)
        // 2. Move cursor to tagline
        // 3. Type tagline

        const fullTagline = "Design. Systems. Production.";

        const startTyping = async () => {
            // Wait for initial name animation
            await new Promise(r => setTimeout(r, 1500));

            // Switch cursor
            setActiveLine('tagline');

            // Small pause before typing starts
            await new Promise(r => setTimeout(r, 500));

            // Type out characters
            for (let i = 0; i <= fullTagline.length; i++) {
                setTaglineText(fullTagline.slice(0, i));
                // Randomize typing speed slightly for realism
                await new Promise(r => setTimeout(r, 30 + Math.random() * 50));
            }
        };

        startTyping();
    }, []);

    return (
        <section className={styles.hero}>
            <div className={styles.noise}></div>

            {/* HUD Elements */}
            <div className={styles.hudTopLeft}>
                <span>FLIGHT_DATA // V.2.0.4</span>
                <span className={styles.statusNominal}>SYS_CHECK: NOMINAL</span>
            </div>
            <div className={styles.hudTopRight}>
                <span>T+ {time}</span>
                <span className={styles.statusLive}>● LIVE</span>
            </div>

            {/* Rocket Nod: Arcing Trajectory */}
            <svg className={styles.trajectoryArc} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="fadeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(77, 150, 255, 0)" />
                        <stop offset="20%" stopColor="rgba(77, 150, 255, 0.4)" />
                        <stop offset="80%" stopColor="rgba(77, 150, 255, 0.4)" />
                        <stop offset="100%" stopColor="rgba(77, 150, 255, 0)" />
                    </linearGradient>
                    <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="2" in="SourceGraphic" result="blur1" />
                        <feGaussianBlur stdDeviation="6" in="SourceGraphic" result="blur2" />
                        <feMerge>
                            <feMergeNode in="blur2" />
                            <feMergeNode in="blur2" />
                            <feMergeNode in="blur1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* The Path */}
                <path
                    d="M-200,1000 Q600,100 1600,0"
                    stroke="url(#fadeGrad)"
                    strokeWidth="2"
                    fill="none"
                />
                {/* The Glowing Thingy - Tear Drop / Flame Shape */}
                <path
                    d="M 4,0 Q 4,3 -12,0 Q 4,-3 4,0"
                    fill="#4D96FF"
                    filter="url(#glow)"
                >
                    <animateMotion
                        dur="6s"
                        repeatCount="indefinite"
                        path="M-200,1000 Q600,100 1600,0"
                        rotate="auto"
                        calcMode="spline"
                        keySplines="0.4 0 0.2 1"
                        keyTimes="0;1"
                    />
                </path>
            </svg>

            <div className={styles.cornerTopLeft}></div>
            <div className={styles.cornerTopRight}></div>
            <div className={styles.cornerBottomLeft}></div>
            <div className={styles.cornerBottomRight}></div>

            <motion.h1
                className={styles.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                Phinehas<br />Adams
                {/* Conditionally render cursor on name */}
                <span className={`${styles.cursor} ${activeLine === 'name' ? styles.cursorActive : styles.cursorHidden}`}></span>
            </motion.h1>

            <div className={styles.tagline}>
                {taglineText}
                {/* Conditionally render cursor on tagline */}
                <span className={`${styles.cursor} ${activeLine === 'tagline' ? styles.cursorActive : styles.cursorHidden}`}></span>
            </div>

            <motion.div
                className={styles.subtext}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5, duration: 0.8 }}
            >
                <div className={styles.dataRow}>
                    <span>AVAIL: 08:00–18:00 CST</span>
                    <span>RESPONSE: &lt; 1 HR</span>
                </div>
            </motion.div>
        </section>
    );
}
