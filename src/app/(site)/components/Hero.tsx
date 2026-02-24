'use client';

import { useEffect, useState } from 'react';
import styles from './Hero.module.css';
import CanvasBackground from './CanvasBackground';

export default function Hero() {
    const [time, setTime] = useState('');
    const [headingText, setHeadingText] = useState('');
    const [taglineText, setTaglineText] = useState('');
    const [activeLine, setActiveLine] = useState<'name' | 'tagline'>('name');
    const [showSubtext, setShowSubtext] = useState(false);

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
        const words = ["PHINEHAS ADAMS", "ENGINEER", "DESIGNER", "ARCHITECT"];
        let isWriting = true;
        let wordIndex = 0;
        let charIndex = 0;
        let timer: NodeJS.Timeout;

        const type = () => {
            const currentWord = words[wordIndex];

            if (isWriting) {
                setHeadingText(currentWord.substring(0, charIndex + 1));
                charIndex++;

                if (charIndex === currentWord.length) {
                    isWriting = false;
                    timer = setTimeout(type, 3000); // pause at the end of word
                } else {
                    timer = setTimeout(type, 80 + Math.random() * 50);
                }
            } else {
                setHeadingText(currentWord.substring(0, charIndex - 1));
                charIndex--;

                if (charIndex === 0) {
                    isWriting = true;
                    wordIndex = (wordIndex + 1) % words.length;
                    timer = setTimeout(type, 500); // pause before next word
                } else {
                    timer = setTimeout(type, 30 + Math.random() * 30);
                }
            }
        };

        timer = setTimeout(type, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
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
                await new Promise(r => setTimeout(r, 30 + Math.random() * 50));
            }

            // Show subtext after typing
            await new Promise(r => setTimeout(r, 400));
            setShowSubtext(true);
        };

        startTyping();
    }, []);

    return (
        <section className={styles.hero}>
            <CanvasBackground />
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

            {/* Trajectory Arc — static SVG, no JS animation */}
            <svg className={styles.trajectoryArc} viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="guideGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(77, 150, 255, 0)" />
                        <stop offset="20%" stopColor="rgba(77, 150, 255, 0.2)" />
                        <stop offset="80%" stopColor="rgba(77, 150, 255, 0.2)" />
                        <stop offset="100%" stopColor="rgba(77, 150, 255, 0)" />
                    </linearGradient>
                </defs>
                <path
                    d="M-200,1000 Q600,100 1600,0"
                    stroke="url(#guideGrad)"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.4"
                />
            </svg>

            <div className={styles.containerFrame}>
                <div className={`${styles.miniSquare} ${styles.miniSquareTopLeft}`}></div>
                <div className={`${styles.miniSquare} ${styles.miniSquareTopRight}`}></div>
                <div className={`${styles.miniSquare} ${styles.miniSquareBottomLeft}`}></div>
                <div className={`${styles.miniSquare} ${styles.miniSquareBottomRight}`}></div>
            </div>

            <h1 className={styles.name}>
                {headingText}
                <span className={`${styles.cursor} ${activeLine === 'name' ? styles.cursorActive : styles.cursorHidden}`}></span>
            </h1>

            <a
                href="/websites-for-sale"
                className={styles.websitesLink}
                style={{ marginBottom: '1rem' }}
            >
                [ ACQUIRE_WEBSITES ]
            </a>

            <div className={styles.tagline}>
                {taglineText}
                <span className={`${styles.cursor} ${activeLine === 'tagline' ? styles.cursorActive : styles.cursorHidden}`}></span>
            </div>

            <div className={`${styles.subtext} ${showSubtext ? styles.subtextVisible : ''}`}>
                <div className={styles.dataRow}>
                    <span>AVAIL: 08:00–18:00 CST</span>
                    <span>RESPONSE: &lt; 1 HR</span>
                </div>
            </div>
        </section>
    );
}
