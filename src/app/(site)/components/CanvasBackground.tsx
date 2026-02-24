'use client';

import { useEffect, useRef } from 'react';

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        let animationFrameId: number;

        const setSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };
        window.addEventListener('resize', setSize);
        setSize();

        // Particles
        const debris: any[] = [];
        const lines: any[] = [];
        const rain: any[] = [];
        const splashes: any[] = [];

        // Initialize Debris
        for (let i = 0; i < 50; i++) {
            debris.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 1.5 + 0.5,
                opacity: Math.random() * 0.3 + 0.1
            });
        }

        // Initialize Lines
        for (let i = 0; i < 20; i++) {
            lines.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                length: Math.random() * 50 + 20,
                angle: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.01,
                opacity: Math.random() * 0.15 + 0.05
            });
        }

        // Rain
        const spawnRain = () => {
            if (rain.length < 100) { // Max rain drops
                rain.push({
                    x: Math.random() * width,
                    y: -50,
                    vy: Math.random() * 10 + 15,
                    length: Math.random() * 20 + 10,
                    opacity: Math.random() * 0.2 + 0.1
                });
            }
        };

        const createSplash = (x: number, y: number) => {
            const numSplashes = Math.floor(Math.random() * 3) + 2;
            for (let i = 0; i < numSplashes; i++) {
                splashes.push({
                    x,
                    y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() * -3) - 1,
                    life: 1,
                    decay: Math.random() * 0.05 + 0.02,
                    radius: Math.random() * 1.5 + 0.5
                });
            }
        };

        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Spawn rain occasionally
            if (Math.random() < 0.4) spawnRain();

            // Draw Debris
            debris.forEach(d => {
                d.x += d.vx;
                d.y += d.vy;
                if (d.x < 0) d.x = width;
                if (d.x > width) d.x = 0;
                if (d.y < 0) d.y = height;
                if (d.y > height) d.y = 0;

                ctx.beginPath();
                ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${d.opacity * 0.5})`;
                ctx.fill();
            });

            // Draw Lines
            lines.forEach(l => {
                l.x += l.vx;
                l.y += l.vy;
                l.angle += l.rotationSpeed;
                if (l.x < -100) l.x = width + 100;
                if (l.x > width + 100) l.x = -100;
                if (l.y < -100) l.y = height + 100;
                if (l.y > height + 100) l.y = -100;

                const x2 = l.x + Math.cos(l.angle) * l.length;
                const y2 = l.y + Math.sin(l.angle) * l.length;

                ctx.beginPath();
                ctx.moveTo(l.x, l.y);
                ctx.lineTo(x2, y2);
                ctx.strokeStyle = `rgba(255, 255, 255, ${l.opacity * 0.5})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            });

            // Draw Rain
            for (let i = rain.length - 1; i >= 0; i--) {
                const r = rain[i];
                r.y += r.vy;

                ctx.beginPath();
                ctx.moveTo(r.x, r.y);
                ctx.lineTo(r.x, r.y - r.length);
                ctx.strokeStyle = `rgba(255, 255, 255, ${r.opacity * 0.7})`;
                ctx.lineWidth = 1;
                ctx.stroke();

                // Check collision with "floor" or abstract layout positions
                // We'll set a few collision thresholds to simulate hitting elements in the layout
                const hitZone = height - (r.x % 200) - 50; // Dynamic hit zones creating a jagged landscape effect
                if (r.y > hitZone) {
                    createSplash(r.x, hitZone);
                    rain.splice(i, 1);
                }
            }

            // Draw Splashes
            for (let i = splashes.length - 1; i >= 0; i--) {
                const s = splashes[i];
                s.x += s.vx;
                s.y += s.vy;
                s.vy += 0.15; // Gravity
                s.life -= s.decay;

                if (s.life <= 0) {
                    splashes.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${s.life * 0.3})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setSize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: 0.8
            }}
        />
    );
}
