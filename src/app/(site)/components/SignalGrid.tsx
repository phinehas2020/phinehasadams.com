'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, createAnimatable } from 'animejs';
import styles from './SignalGrid.module.css';

const GRID_SIZE = 50;
const DOT_BASE_OPACITY = 0.15;
const PROXIMITY_RADIUS = 2;

export default function SignalGrid() {
  const dotContainerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = dotContainerRef.current;
    const spotlightEl = spotlightRef.current;
    if (!container || !spotlightEl) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const cols = Math.ceil(window.innerWidth / GRID_SIZE) + 2;
    const rows = Math.ceil(window.innerHeight / GRID_SIZE) + 2;

    // Build dot grid
    const fragment = document.createDocumentFragment();
    const dots: HTMLDivElement[] = [];
    const dotGrid: HTMLDivElement[][] = [];

    for (let row = 0; row < rows; row++) {
      dotGrid[row] = [];
      for (let col = 0; col < cols; col++) {
        const dot = document.createElement('div');
        dot.className = styles.dot;
        dot.style.left = `${col * GRID_SIZE}px`;
        dot.style.top = `${row * GRID_SIZE}px`;
        fragment.appendChild(dot);
        dots.push(dot);
        dotGrid[row][col] = dot;
      }
    }
    container.appendChild(fragment);

    // -- Boot sequence --
    if (!prefersReducedMotion) {
      animate(dots, {
        scale: [0, 1],
        opacity: [0, DOT_BASE_OPACITY],
        duration: 2000,
        delay: stagger(4, { grid: [cols, rows], from: 'center' }),
        ease: 'outExpo',
      });
    } else {
      dots.forEach((d) => {
        d.style.opacity = String(DOT_BASE_OPACITY);
      });
    }

    // -- Spotlight follows cursor --
    const spotlight = createAnimatable(spotlightEl, {
      x: { duration: 400, ease: 'out(3)' },
      y: { duration: 400, ease: 'out(3)' },
    });

    let spotlightShown = false;
    let activeDotIndices = new Set<number>();
    let lastProximityTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Reveal spotlight on first move
      if (!spotlightShown) {
        spotlightEl.style.opacity = '1';
        spotlightShown = true;
      }
      spotlight.x(e.clientX);
      spotlight.y(e.clientY);

      // Throttle dot proximity updates
      const now = performance.now();
      if (now - lastProximityTime < 50 || prefersReducedMotion) return;
      lastProximityTime = now;

      const nearCol = Math.round(e.clientX / GRID_SIZE);
      const nearRow = Math.round(e.clientY / GRID_SIZE);

      const newActive = new Set<number>();
      for (let dr = -PROXIMITY_RADIUS; dr <= PROXIMITY_RADIUS; dr++) {
        for (let dc = -PROXIMITY_RADIUS; dc <= PROXIMITY_RADIUS; dc++) {
          const r = nearRow + dr;
          const c = nearCol + dc;
          if (r >= 0 && r < rows && c >= 0 && c < cols) {
            newActive.add(r * cols + c);
          }
        }
      }

      // Activate new dots
      newActive.forEach((idx) => {
        if (!activeDotIndices.has(idx)) {
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          const dist = Math.sqrt((c - nearCol) ** 2 + (r - nearRow) ** 2);
          const intensity = Math.max(0, 1 - dist / (PROXIMITY_RADIUS + 1));
          animate(dots[idx], {
            scale: 1 + intensity * 1.5,
            opacity: DOT_BASE_OPACITY + intensity * 0.5,
            duration: 200,
            ease: 'outQuad',
          });
        }
      });

      // Deactivate old dots
      activeDotIndices.forEach((idx) => {
        if (!newActive.has(idx)) {
          animate(dots[idx], {
            scale: 1,
            opacity: DOT_BASE_OPACITY,
            duration: 400,
            ease: 'outQuad',
          });
        }
      });

      activeDotIndices = newActive;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // -- Signal pulses --
    let pulseTimeout: ReturnType<typeof setTimeout>;

    const schedulePulse = () => {
      if (prefersReducedMotion) return;
      const delay = 3000 + Math.random() * 4000;
      pulseTimeout = setTimeout(() => {
        firePulse(dots, dotGrid, cols, rows);
        schedulePulse();
      }, delay);
    };

    // Start pulses after boot finishes
    const pulseStartTimeout = setTimeout(schedulePulse, 3000);

    // -- Ambient flicker --
    let flickerInterval: ReturnType<typeof setInterval> | undefined;
    if (!prefersReducedMotion) {
      flickerInterval = setInterval(() => {
        const idx = Math.floor(Math.random() * dots.length);
        animate(dots[idx], {
          opacity: [DOT_BASE_OPACITY, DOT_BASE_OPACITY * 3, DOT_BASE_OPACITY],
          duration: 800,
          ease: 'inOutSine',
        });
      }, 400);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(pulseTimeout);
      clearTimeout(pulseStartTimeout);
      if (flickerInterval) clearInterval(flickerInterval);
      container.innerHTML = '';
    };
  }, []);

  return (
    <div className={styles.grid} aria-hidden="true">
      <div ref={dotContainerRef} className={styles.dotContainer} />
      <div ref={spotlightRef} className={styles.spotlight} />
    </div>
  );
}

function firePulse(
  dots: HTMLDivElement[],
  dotGrid: HTMLDivElement[][],
  cols: number,
  rows: number
) {
  const oCol = Math.floor(Math.random() * cols);
  const oRow = Math.floor(Math.random() * rows);

  const crossDots: { dot: HTMLDivElement; dist: number }[] = [];

  // Same row
  for (let c = 0; c < cols; c++) {
    if (dotGrid[oRow]?.[c]) {
      crossDots.push({ dot: dotGrid[oRow][c], dist: Math.abs(c - oCol) });
    }
  }

  // Same column (skip origin row, already added)
  for (let r = 0; r < rows; r++) {
    if (r !== oRow && dotGrid[r]?.[oCol]) {
      crossDots.push({ dot: dotGrid[r][oCol], dist: Math.abs(r - oRow) });
    }
  }

  const distances = new Map(crossDots.map((d) => [d.dot, d.dist]));
  const dotElements = crossDots.map((d) => d.dot);

  animate(dotElements, {
    opacity: [DOT_BASE_OPACITY, 0.7, DOT_BASE_OPACITY],
    scale: [1, 2.5, 1],
    duration: 1500,
    delay: (_el, i) => {
      const d = distances.get(dotElements[i]) || 0;
      return d * 25;
    },
    ease: 'outExpo',
  });
}
