'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { svg, createTimeline, createScope } from 'animejs';
import styles from './Hero.module.css';
import { soundSystem } from '../utils/sound';

const TRAJECTORY = 'M-200,1000 Q600,100 1600,0';

export default function Hero() {
    const [time, setTime] = useState('');
    const [taglineText, setTaglineText] = useState('');
    const [activeLine, setActiveLine] = useState<'name' | 'tagline'>('name');
    const trajectoryRef = useRef<SVGSVGElement>(null);
    const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);

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
        const fullTagline = "Design. Systems. Production.";

        const startTyping = async () => {
            try { soundSystem.playBootSequence(); } catch { }

            await new Promise(r => setTimeout(r, 1500));

            setActiveLine('tagline');
            soundSystem.playCursorDrop();

            await new Promise(r => setTimeout(r, 500));

            for (let i = 0; i <= fullTagline.length; i++) {
                setTaglineText(fullTagline.slice(0, i));
                soundSystem.playTypingSound();
                await new Promise(r => setTimeout(r, 30 + Math.random() * 50));
            }
        };

        startTyping();
    }, []);

    useEffect(() => {
        const handleInteraction = () => {
            soundSystem.resume();
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };

        window.addEventListener('click', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        return () => {
            window.removeEventListener('click', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    // Rocket trajectory — anime.js powered with createScope
    useEffect(() => {
        const svgEl = trajectoryRef.current;
        if (!svgEl) return;

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;
        if (prefersReducedMotion) return;

        const guidePath = svgEl.querySelector('#guide-path') as SVGPathElement;
        const cometTrail = svgEl.querySelector('#comet-trail') as SVGPathElement;
        const rocketBody = svgEl.querySelector('#rocket-body') as SVGGElement;
        if (!guidePath || !cometTrail || !rocketBody) return;

        const scope = createScope({ root: svgEl });
        scopeRef.current = scope;

        scope.add(() => {
            const FLIGHT = 5000;
            const TRAIL_FADE = 1200;

            const tl = createTimeline({
                loop: true,
                loopDelay: 3000,
                defaults: { ease: 'linear' },
            });

            // Comet trail — glowing segment slides along arc
            tl.add(svg.createDrawable(cometTrail), {
                draw: [
                    '0 0',
                    '0 0.15',
                    '0.05 0.4',
                    '0.2 0.65',
                    '0.45 0.85',
                    '0.7 1',
                    '1 1',
                ],
                duration: FLIGHT + TRAIL_FADE,
                ease: 'linear',
            });

            // Rocket follows the trajectory
            tl.add(rocketBody, {
                ...svg.createMotionPath(guidePath),
                opacity: [0, 1, 1, 1, 0],
                duration: FLIGHT,
                ease: 'inOutSine',
            }, 0);
        });

        return () => {
            scope.revert();
        };
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

            {/* Rocket Trajectory — anime.js driven */}
            <svg
                ref={trajectoryRef}
                className={styles.trajectoryArc}
                viewBox="0 0 1440 900"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <linearGradient id="guideGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(77, 150, 255, 0)" />
                        <stop offset="20%" stopColor="rgba(77, 150, 255, 0.2)" />
                        <stop offset="80%" stopColor="rgba(77, 150, 255, 0.2)" />
                        <stop offset="100%" stopColor="rgba(77, 150, 255, 0)" />
                    </linearGradient>
                    <linearGradient id="trailGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgba(77, 150, 255, 0)" />
                        <stop offset="15%" stopColor="rgba(77, 150, 255, 0.6)" />
                        <stop offset="85%" stopColor="rgba(77, 150, 255, 0.6)" />
                        <stop offset="100%" stopColor="rgba(77, 150, 255, 0)" />
                    </linearGradient>
                    {/* Simplified glow -- single blur pass instead of stacked */}
                    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3" in="SourceGraphic" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="trailGlow" x="-25%" y="-25%" width="150%" height="150%">
                        <feGaussianBlur stdDeviation="3" in="SourceGraphic" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Dim guide path */}
                <path
                    id="guide-path"
                    d={TRAJECTORY}
                    stroke="url(#guideGrad)"
                    strokeWidth="1"
                    fill="none"
                    opacity="0.25"
                />

                {/* Bright comet trail */}
                <path
                    id="comet-trail"
                    d={TRAJECTORY}
                    stroke="url(#trailGrad)"
                    strokeWidth="2"
                    fill="none"
                    filter="url(#trailGlow)"
                />

                {/* Rocket body — teardrop flame */}
                <g id="rocket-body" opacity="0">
                    <path
                        d="M 4,0 Q 4,3 -12,0 Q 4,-3 4,0"
                        fill="#4D96FF"
                        filter="url(#glow)"
                    />
                </g>
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
                <span className={`${styles.cursor} ${activeLine === 'name' ? styles.cursorActive : styles.cursorHidden}`}></span>
            </motion.h1>

            <motion.a
                href="/websites-for-sale"
                className={styles.websitesLink}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                style={{ marginBottom: '1rem' }}
            >
                [ ACQUIRE_WEBSITES ]
            </motion.a>

            <div className={styles.tagline}>
                {taglineText}
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
