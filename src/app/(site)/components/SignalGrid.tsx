'use client';

import { useEffect, useRef } from 'react';
import { createAnimatable } from 'animejs';
import styles from './SignalGrid.module.css';

const GRID_SIZE = 60;
const DOT_RADIUS = 1;
const DOT_BASE_ALPHA = 0.12;
const PROXIMITY_RADIUS = 180; // pixels
const PULSE_SPEED = 300; // pixels per second

interface Pulse {
  originX: number;
  originY: number;
  radius: number;
  startTime: number;
  maxRadius: number;
}

export default function SignalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const spotlightEl = spotlightRef.current;
    if (!canvas || !spotlightEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = canvas.getContext('2d', { alpha: true })!;
    let dpr = window.devicePixelRatio || 1;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Grid points
    const cols = Math.ceil(width / GRID_SIZE) + 1;
    const rows = Math.ceil(height / GRID_SIZE) + 1;

    // Mouse tracking
    let mouseX = -1000;
    let mouseY = -1000;
    let mouseActive = false;

    // Spotlight (anime.js animatable for silky cursor lag)
    const spotlight = createAnimatable(spotlightEl, {
      x: { duration: 400, ease: 'out(4)' },
      y: { duration: 400, ease: 'out(4)' },
    });

    // Boot animation state
    let bootProgress = prefersReducedMotion ? 1 : 0;
    const bootStart = performance.now();
    const BOOT_DURATION = 1600;

    // Pulses
    const pulses: Pulse[] = [];
    let lastPulseTime = performance.now() + 3000; // delay first pulse

    // Flicker state
    let flickerIdx = -1;
    let flickerAlpha = 0;
    let flickerDecay = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!mouseActive) {
        spotlightEl.style.opacity = '1';
        mouseActive = true;
      }
      spotlight.x(mouseX);
      spotlight.y(mouseY);
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
      mouseActive = false;
      spotlightEl.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);

    // -- Render loop --
    let rafId: number;
    const fgColor = [240, 240, 240]; // --fg-primary

    const frame = (now: number) => {
      rafId = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, width, height);

      // Boot progress (0 -> 1)
      if (bootProgress < 1) {
        const elapsed = now - bootStart;
        bootProgress = Math.min(1, elapsed / BOOT_DURATION);
      }

      // Spawn pulse
      if (!prefersReducedMotion && now - lastPulseTime > 4000 + Math.random() * 1000) {
        const pCol = Math.floor(Math.random() * cols);
        const pRow = Math.floor(Math.random() * rows);
        pulses.push({
          originX: pCol * GRID_SIZE,
          originY: pRow * GRID_SIZE,
          radius: 0,
          startTime: now,
          maxRadius: Math.max(width, height) * 0.4,
        });
        if (pulses.length > 3) pulses.shift();
        lastPulseTime = now;
      }

      // Update pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.radius = (now - pulse.startTime) / 1000 * PULSE_SPEED;
        if (pulse.radius > pulse.maxRadius) {
          pulses.splice(p, 1);
        }
      }

      // Flicker
      if (!prefersReducedMotion) {
        if (flickerIdx < 0 && Math.random() < 0.008) {
          flickerIdx = Math.floor(Math.random() * (cols * rows));
          flickerAlpha = DOT_BASE_ALPHA * 3;
          flickerDecay = 0.03;
        }
        if (flickerIdx >= 0) {
          flickerAlpha -= flickerDecay;
          if (flickerAlpha <= DOT_BASE_ALPHA) {
            flickerIdx = -1;
          }
        }
      }

      // Draw dots
      const bootEase = 1 - Math.pow(1 - bootProgress, 3); // easeOutCubic

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * GRID_SIZE;
          const y = row * GRID_SIZE;
          const idx = row * cols + col;

          // Boot: expand from center
          const cx = (cols - 1) * GRID_SIZE * 0.5;
          const cy = (rows - 1) * GRID_SIZE * 0.5;
          const distFromCenter = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
          const maxDist = Math.sqrt(cx * cx + cy * cy);
          const normalizedDist = distFromCenter / maxDist;

          // Stagger: dots closer to center appear first
          const dotBootProgress = Math.max(0, Math.min(1,
            (bootEase - normalizedDist * 0.6) / 0.4
          ));

          if (dotBootProgress <= 0) continue;

          let alpha = DOT_BASE_ALPHA * dotBootProgress;
          let radius = DOT_RADIUS * dotBootProgress;

          // Proximity glow
          if (mouseActive && !prefersReducedMotion) {
            const dx = x - mouseX;
            const dy = y - mouseY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < PROXIMITY_RADIUS) {
              const intensity = 1 - dist / PROXIMITY_RADIUS;
              const ease = intensity * intensity; // quadratic falloff
              alpha += ease * 0.45;
              radius += ease * 1.5;
            }
          }

          // Pulse glow
          for (const pulse of pulses) {
            const dx = x - pulse.originX;
            const dy = y - pulse.originY;
            // Cross pattern: same row or same column as origin
            const sameRow = Math.abs(dy) < GRID_SIZE * 0.5;
            const sameCol = Math.abs(dx) < GRID_SIZE * 0.5;
            if (sameRow || sameCol) {
              const dist = Math.sqrt(dx * dx + dy * dy);
              const ringDist = Math.abs(dist - pulse.radius);
              if (ringDist < GRID_SIZE * 2) {
                const ringIntensity = 1 - ringDist / (GRID_SIZE * 2);
                const fadeOut = Math.max(0, 1 - pulse.radius / pulse.maxRadius);
                alpha += ringIntensity * fadeOut * 0.5;
                radius += ringIntensity * fadeOut * 1.5;
              }
            }
          }

          // Flicker
          if (idx === flickerIdx) {
            alpha = Math.max(alpha, flickerAlpha);
          }

          alpha = Math.min(alpha, 0.9);

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${fgColor[0]},${fgColor[1]},${fgColor[2]},${alpha})`;
          ctx.fill();
        }
      }
    };

    rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={styles.grid} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
      <div ref={spotlightRef} className={styles.spotlight} />
    </div>
  );
}
