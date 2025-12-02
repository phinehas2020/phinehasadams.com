'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './ConstellationName.module.css';

interface Point {
    x: number;
    y: number;
    originX: number;
    originY: number;
    alpha: number;
    pulseSpeed: number;
}

export default function ConstellationName() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const parent = canvasRef.current.parentElement;
                if (parent) {
                    setDimensions({
                        width: parent.clientWidth,
                        height: parent.clientHeight
                    });
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || dimensions.width === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas size
        canvas.width = dimensions.width;
        canvas.height = 400; // Fixed height for the name area

        // Configuration
        const text = "PHINEHAS ADAMS";
        const fontSize = Math.min(dimensions.width / 8, 120); // Responsive font size
        const font = `800 ${fontSize}px Inter, sans-serif`;
        const particleGap = 6; // Gap between scan points
        const connectionDist = 25; // Max distance to draw line

        // 1. Generate Points from Text
        const points: Point[] = [];

        // Offscreen canvas for text analysis
        const offCanvas = document.createElement('canvas');
        offCanvas.width = canvas.width;
        offCanvas.height = canvas.height;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) return;

        offCtx.font = font;
        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillStyle = 'white';
        offCtx.fillText(text, canvas.width / 2, canvas.height / 2);

        const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let y = 0; y < canvas.height; y += particleGap) {
            for (let x = 0; x < canvas.width; x += particleGap) {
                const index = (y * canvas.width + x) * 4;
                if (data[index + 3] > 128) { // If pixel is visible
                    points.push({
                        x: x,
                        y: y,
                        originX: x,
                        originY: y,
                        alpha: 0.5 + Math.random() * 0.5,
                        pulseSpeed: 0.02 + Math.random() * 0.03
                    });
                }
            }
        }

        // 2. Animation Loop
        let animationFrameId: number;
        let rotation = 0;
        const rotationSpeed = 0.0005; // Very slow rotation

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update rotation
            rotation += rotationSpeed;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            // Draw connections first (behind stars)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.beginPath();

            // Optimization: Only check neighbors for connections
            // For a simple effect, we can just connect close points in the array
            // But for a true mesh, we need spatial awareness. 
            // Given the density, a full N*N check is too slow.
            // We'll skip connections for now or implement a simplified version if needed.
            // Let's try connecting each point to a few random neighbors in the array for the "constellation" look
            // without O(N^2) cost.

            // Actually, let's just draw the points for now to ensure performance, 
            // and maybe connect immediate neighbors in the list (which are spatially close due to scan order)

            for (let i = 0; i < points.length; i++) {
                const p = points[i];

                // Pulse opacity
                p.alpha += p.pulseSpeed;
                if (p.alpha > 1 || p.alpha < 0.3) p.pulseSpeed *= -1;

                // Rotate point
                const dx = p.originX - centerX;
                const dy = p.originY - centerY;
                const rotatedX = centerX + dx * Math.cos(rotation) - dy * Math.sin(rotation);
                const rotatedY = centerY + dx * Math.sin(rotation) + dy * Math.cos(rotation);

                // Draw Star
                ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(rotatedX, rotatedY, 1.5, 0, Math.PI * 2);
                ctx.fill();

                // Simple connections to next few points (horizontal neighbors)
                // and points 'width/gap' away (vertical neighbors)
                // This is a cheap way to get the grid/mesh look

                // Connect to right neighbor
                if (i + 1 < points.length && Math.abs(points[i + 1].originX - p.originX) <= particleGap * 1.5 && Math.abs(points[i + 1].originY - p.originY) <= particleGap) {
                    const p2 = points[i + 1];
                    const dx2 = p2.originX - centerX;
                    const dy2 = p2.originY - centerY;
                    const rx2 = centerX + dx2 * Math.cos(rotation) - dy2 * Math.sin(rotation);
                    const ry2 = centerY + dx2 * Math.sin(rotation) + dy2 * Math.cos(rotation);

                    ctx.moveTo(rotatedX, rotatedY);
                    ctx.lineTo(rx2, ry2);
                }

                // Connect to bottom neighbor (approximate index offset)
                // This is tricky with variable text width, so we'll skip vertical lines for safety
                // or just rely on the density to create the shape.
            }
            ctx.stroke();

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(animationFrameId);
    }, [dimensions]);

    return (
        <div className={styles.container}>
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
}
