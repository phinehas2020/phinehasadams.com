'use client';

import { useEffect, useRef } from 'react';

export default function CanvasBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000, active: false });

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

        // Handle Mouse
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
            mouseRef.current.active = true;
        };
        const handleMouseLeave = () => {
            mouseRef.current.active = false;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Simple 3D Value Noise for continents
        const noise3D = (x: number, y: number, z: number) => {
            const hash = (nx: number, ny: number, nz: number) => {
                let n = Math.sin(nx * 12.9898 + ny * 78.233 + nz * 37.719) * 43758.5453;
                return n - Math.floor(n);
            };

            const ix = Math.floor(x);
            const iy = Math.floor(y);
            const iz = Math.floor(z);

            const fx = x - ix;
            const fy = y - iy;
            const fz = z - iz;

            const ux = fx * fx * (3 - 2 * fx);
            const uy = fy * fy * (3 - 2 * fy);
            const uz = fz * fz * (3 - 2 * fz);

            const n000 = hash(ix, iy, iz);
            const n100 = hash(ix + 1, iy, iz);
            const n010 = hash(ix, iy + 1, iz);
            const n110 = hash(ix + 1, iy + 1, iz);
            const n001 = hash(ix, iy, iz + 1);
            const n101 = hash(ix + 1, iy, iz + 1);
            const n011 = hash(ix, iy + 1, iz + 1);
            const n111 = hash(ix + 1, iy + 1, iz + 1);

            const ix0 = n000 * (1 - ux) + n100 * ux;
            const ix1 = n010 * (1 - ux) + n110 * ux;
            const ix2 = n001 * (1 - ux) + n101 * ux;
            const ix3 = n011 * (1 - ux) + n111 * ux;

            const iy0 = ix0 * (1 - uy) + ix1 * uy;
            const iy1 = ix2 * (1 - uy) + ix3 * uy;

            return iy0 * (1 - uz) + iy1 * uz;
        };

        const fbm = (x: number, y: number, z: number) => {
            let value = 0;
            let amp = 0.5;
            for (let i = 0; i < 4; i++) {
                value += noise3D(x, y, z) * amp;
                x *= 2; y *= 2; z *= 2;
                amp *= 0.5;
            }
            return value;
        };

        // Create particles (Earth Globe)
        const particles: any[] = [];
        const totalParticles = 7000;

        for (let i = 0; i < totalParticles; i++) {
            const phi = Math.acos(1 - 2 * (i + 0.5) / totalParticles);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            let x = Math.cos(theta) * Math.sin(phi);
            let y = Math.sin(theta) * Math.sin(phi);
            let z = Math.cos(phi);

            // Shape the continents using continuous noise to carve out oceans
            let n = fbm(x * 1.5, y * 1.5, z * 1.5);

            // Only add particle if it's "landmass" to make it look like an earth globe
            if (n > 0.45) {
                particles.push({
                    x, y, z,
                    baseAlpha: Math.random() * 0.5 + 0.5, // Brighter particles (base 0.5 - 1.0)
                    size: Math.random() * 1.8 + 0.7,      // Slightly larger dots
                });
            } else if (Math.random() < 0.08) {
                // Add sparse dots in "oceans" to keep the sphere shape visible
                particles.push({
                    x, y, z,
                    baseAlpha: Math.random() * 0.2 + 0.1,
                    size: Math.random() * 0.8 + 0.2,
                });
            }
        }

        let time = 0;

        const render = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            time += 0.0015;

            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;
            const mouseActive = mouseRef.current.active;

            // Base radius scales with screen size
            const BASE_RADIUS = Math.min(width, height) * 0.4;
            const PERSPECTIVE = 600;

            // Rotation matrices (Rotate Y axis, then slight X tilt)
            const angleY = time;
            const angleX = 0.25;
            const cosY = Math.cos(angleY), sinY = Math.sin(angleY);
            const cosX = Math.cos(angleX), sinX = Math.sin(angleX);

            ctx.fillStyle = '#ffffff';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                // Rotate Y
                let rz = p.z * cosY - p.x * sinY;
                let rx = p.z * sinY + p.x * cosY;
                let ry = p.y;

                // Rotate X
                let ry2 = ry * cosX - rz * sinX;
                let rz2 = ry * sinX + rz * cosX;

                // 2D Projection
                const scale = PERSPECTIVE / (PERSPECTIVE + rz2 * BASE_RADIUS);
                const x2D = width / 2 + rx * BASE_RADIUS * scale;
                const y2D = height / 2 + ry2 * BASE_RADIUS * scale;

                // Mouse interaction / brightness
                let distanceToMouse = 9999;
                if (mouseActive) {
                    const dx = mx - x2D;
                    const dy = my - y2D;
                    distanceToMouse = Math.sqrt(dx * dx + dy * dy);
                }

                // Brightness near mouse
                let hoverIntensity = 0;
                if (distanceToMouse < 250) {
                    hoverIntensity = 1 - (distanceToMouse / 250);
                }

                // Depth fading (back of the globe should be darker or invisible)
                let depthAlpha = (1 - rz2) * 0.5;
                // Don't render points too far back if they aren't interacting with mouse
                if (depthAlpha < 0.1 && hoverIntensity < 0.1) continue;

                let finalAlpha = p.baseAlpha * depthAlpha + hoverIntensity * 0.9;
                if (finalAlpha > 1) finalAlpha = 1;

                let finalSize = p.size * scale * (1 + hoverIntensity * 1.5);

                ctx.globalAlpha = finalAlpha;
                ctx.fillRect(x2D, y2D, finalSize, finalSize);
            }

            // --- Flashlight on borders ---
            if (mouseActive) {
                const glowDist = 350;

                // Helper to draw border light
                const drawGlowLine = (x1: number, y1: number, x2: number, y2: number, distance: number) => {
                    let alpha = Math.max(0, 1 - (distance / glowDist));
                    if (alpha <= 0) return;

                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);

                    // Create glow using shadow
                    ctx.shadowColor = 'rgba(77, 150, 255, 0.8)';
                    ctx.shadowBlur = 30;
                    ctx.lineWidth = 1 + alpha * 2;
                    ctx.strokeStyle = `rgba(200, 220, 255, ${alpha * 0.7})`;

                    ctx.stroke();
                    ctx.restore();
                };

                // Top border
                drawGlowLine(0, 0, width, 0, my);
                // Bottom border
                drawGlowLine(0, height, width, height, height - my);
                // Left border
                drawGlowLine(0, 0, 0, height, mx);
                // Right border
                drawGlowLine(width, 0, width, height, width - mx);

                // Add an ambient flashlight at the mouse cursor itself spanning wide over the globe
                const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 500);
                grad.addColorStop(0, 'rgba(77, 150, 255, 0.05)');
                grad.addColorStop(1, 'rgba(77, 150, 255, 0)');
                ctx.globalAlpha = 1;
                ctx.fillStyle = grad;
                ctx.fillRect(0, 0, width, height);
            }

            ctx.globalAlpha = 1;

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', setSize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
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
                opacity: 0.95
            }}
        />
    );
}
