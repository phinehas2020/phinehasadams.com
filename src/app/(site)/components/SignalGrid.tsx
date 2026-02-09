'use client';

import { useEffect, useRef } from 'react';
import { animate, stagger, createAnimatable, createScope } from 'animejs';
import styles from './SignalGrid.module.css';

const GRID_SIZE = 60;
const DOT_BASE_OPACITY = 0.12;
const PROXIMITY_RADIUS = 3;

export default function SignalGrid() {
  const dotContainerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const scopeRef = useRef<ReturnType<typeof createScope> | null>(null);

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

    // Create scope for proper cleanup
    const scope = createScope({ root: container });
    scopeRef.current = scope;

    scope.add(() => {
      // -- Boot sequence --
      if (!prefersReducedMotion) {
        animate(dots, {
          scale: [0, 1],
          opacity: [0, DOT_BASE_OPACITY],
          duration: 1800,
          delay: stagger(3, { grid: [cols, rows], from: 'center' }),
          ease: 'outExpo',
        });
      } else {
        dots.forEach((d) => {
          d.style.opacity = String(DOT_BASE_OPACITY);
        });
      }
    });

    // -- Spotlight follows cursor (createAnimatable for smooth tracking) --
    const spotlight = createAnimatable(spotlightEl, {
      x: { duration: 500, ease: 'out(4)' },
      y: { duration: 500, ease: 'out(4)' },
    });

    let spotlightShown = false;
    const activeDots = new Map<number, number>(); // idx -> raf handle or 0
    let lastProximityTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightShown) {
        spotlightEl.style.opacity = '1';
        spotlightShown = true;
      }
      spotlight.x(e.clientX);
      spotlight.y(e.clientY);

      // Throttle proximity to 60ms
      const now = performance.now();
      if (now - lastProximityTime < 60 || prefersReducedMotion) return;
      lastProximityTime = now;

      const nearCol = Math.round(e.clientX / GRID_SIZE);
      const nearRow = Math.round(e.clientY / GRID_SIZE);

      const newActive = new Set<number>();
      for (let dr = -PROXIMITY_RADIUS; dr <= PROXIMITY_RADIUS; dr++) {
        for (let dc = -PROXIMITY_RADIUS; dc <= PROXIMITY_RADIUS; dc++) {
          const r = nearRow + dr;
          const c = nearCol + dc;
          if (r >= 0 && r < rows && c >= 0 && c < cols) {
            const dist = Math.sqrt(dc * dc + dr * dr);
            if (dist <= PROXIMITY_RADIUS) {
              newActive.add(r * cols + c);
            }
          }
        }
      }

      // Activate new dots -- direct style for zero-overhead
      newActive.forEach((idx) => {
        if (!activeDots.has(idx)) {
          const r = Math.floor(idx / cols);
          const c = idx % cols;
          const dist = Math.sqrt((c - nearCol) ** 2 + (r - nearRow) ** 2);
          const intensity = Math.max(0, 1 - dist / (PROXIMITY_RADIUS + 0.5));
          const dot = dots[idx];
          dot.style.transform = `scale(${1 + intensity * 1.2})`;
          dot.style.opacity = String(DOT_BASE_OPACITY + intensity * 0.45);
          dot.style.transition = 'transform 0.2s cubic-bezier(0.23,1,0.32,1), opacity 0.2s ease-out';
          activeDots.set(idx, 1);
        }
      });

      // Deactivate old dots
      activeDots.forEach((_, idx) => {
        if (!newActive.has(idx)) {
          const dot = dots[idx];
          dot.style.transform = 'scale(1)';
          dot.style.opacity = String(DOT_BASE_OPACITY);
          dot.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.5s ease-out';
          activeDots.delete(idx);
        }
      });
    };

    const handleMouseLeave = () => {
      if (spotlightShown) {
        spotlightEl.style.opacity = '0';
        spotlightShown = false;
      }
      // Reset all active dots
      activeDots.forEach((_, idx) => {
        const dot = dots[idx];
        dot.style.transform = 'scale(1)';
        dot.style.opacity = String(DOT_BASE_OPACITY);
        dot.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
      });
      activeDots.clear();
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // -- Signal pulses (keep anime.js -- these are infrequent, impactful) --
    let pulseTimeout: ReturnType<typeof setTimeout>;

    const schedulePulse = () => {
      if (prefersReducedMotion) return;
      const delay = 4000 + Math.random() * 5000;
      pulseTimeout = setTimeout(() => {
        firePulse(dots, dotGrid, cols, rows);
        schedulePulse();
      }, delay);
    };

    const pulseStartTimeout = setTimeout(schedulePulse, 3500);

    // -- Ambient flicker (less frequent, more subtle) --
    let flickerInterval: ReturnType<typeof setInterval> | undefined;
    if (!prefersReducedMotion) {
      flickerInterval = setInterval(() => {
        const idx = Math.floor(Math.random() * dots.length);
        const dot = dots[idx];
        dot.style.transition = 'opacity 0.6s ease-in-out';
        dot.style.opacity = String(DOT_BASE_OPACITY * 2.5);
        setTimeout(() => {
          dot.style.opacity = String(DOT_BASE_OPACITY);
        }, 600);
      }, 800);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(pulseTimeout);
      clearTimeout(pulseStartTimeout);
      if (flickerInterval) clearInterval(flickerInterval);
      scope.revert();
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

  for (let c = 0; c < cols; c++) {
    if (dotGrid[oRow]?.[c]) {
      crossDots.push({ dot: dotGrid[oRow][c], dist: Math.abs(c - oCol) });
    }
  }

  for (let r = 0; r < rows; r++) {
    if (r !== oRow && dotGrid[r]?.[oCol]) {
      crossDots.push({ dot: dotGrid[r][oCol], dist: Math.abs(r - oRow) });
    }
  }

  const distances = new Map(crossDots.map((d) => [d.dot, d.dist]));
  const dotElements = crossDots.map((d) => d.dot);

  animate(dotElements, {
    opacity: [DOT_BASE_OPACITY, 0.6, DOT_BASE_OPACITY],
    scale: [1, 2, 1],
    duration: 1200,
    delay: (_el, i) => {
      const d = distances.get(dotElements[i as number]) || 0;
      return d * 20;
    },
    ease: 'outExpo',
  });
}
