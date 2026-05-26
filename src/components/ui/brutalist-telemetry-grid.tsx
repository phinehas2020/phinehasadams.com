"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BrutalistTelemetryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Grid density. Lower = chunky, Higher = smooth.
   * Default: 24 (matches previous hero usage)
   */
  resolution?: number;
  /**
   * Cooling rate (0 to 1). Higher = trails fade faster.
   * Default: 0.96 (matches previous hero usage)
   */
  coolingFactor?: number;
}

/**
 * Brutalist Telemetry / Signal Map
 *
 * Ground-up redesign 2026-04 — Industrial Brutalist (Tactical Telemetry)
 *
 * Physics & interaction are 100% identical to the previous ThermodynamicGrid
 * (mouse/pointer signal injection + diffusion + cooling). Only the visual
 * language has changed to match the brutalist system (see DESIGN.md).
 *
 * - Dark CRT substrate
 * - Phosphor / blueprint / hazard palette (single accent)
 * - Canvas-drawn registration marks, crosshairs, scale rulers, live HUD
 * - "Signal" metaphor instead of heat (no thermal/magma residue)
 *
 * This component is the non-negotiable signature element carried forward
 * from the prior site. It must feel native to the new tactical language.
 */
const BrutalistTelemetryGrid = ({
  className,
  resolution = 24,
  coolingFactor = 0.96,
  style,
  ...props
}: BrutalistTelemetryGridProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    // Simulation State
    let grid: Float32Array;
    let cols = 0;
    let rows = 0;
    let width = 0;
    let height = 0;

    // Mouse / Pointer State
    const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, active: false };

    // --- BRUTALIST TELEMETRY PALETTE (per DESIGN.md) ---
    // t = 0.0 (cold/structure) → faint phosphor / grid
    // t mid → blueprint lines
    // t high (active signal) → hazard red + core
    const getSignalColor = (t: number) => {
      // Base dark CRT
      const baseR = 10;
      const baseG = 10;
      const baseB = 10;

      if (t < 0.08) {
        // Very cold — subtle grid structure (phosphor tint)
        const v = Math.floor(30 + t * 80);
        return `rgb(${v}, ${v + 4}, ${v + 6})`;
      }

      if (t < 0.35) {
        // Blueprint / low signal
        const b = Math.floor(60 + (t - 0.08) * 140);
        return `rgb(20, 35, ${Math.min(160, b)})`;
      }

      // Active / hazard signal (the only time hazard red appears)
      const intensity = (t - 0.35) / 0.65;
      const r = Math.floor(180 + intensity * 75); // hazard ramp
      const g = Math.floor(20 + intensity * 30);
      const b = Math.floor(20 + intensity * 25);

      return `rgb(${Math.min(255, r + baseR)}, ${Math.min(255, g + baseG)}, ${Math.min(255, b + baseB)})`;
    };

    const resize = () => {
      width = container.offsetWidth;
      height = container.offsetHeight;
      canvas.width = width;
      canvas.height = height;

      cols = Math.ceil(width / resolution);
      rows = Math.ceil(height / resolution);
      grid = new Float32Array(cols * rows).fill(0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    // --- PHYSICS LOOP (IDENTICAL TO PREVIOUS — DO NOT MODIFY) ---
    const update = () => {
      // 1. INJECT SIGNAL (Brush) — physics unchanged
      if (mouse.active) {
        const dx = mouse.x - mouse.prevX;
        const dy = mouse.y - mouse.prevY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const steps = Math.ceil(dist / (resolution / 2));

        for (let s = 0; s <= steps; s++) {
          const t = steps > 0 ? s / steps : 0;
          const x = mouse.prevX + dx * t;
          const y = mouse.prevY + dy * t;

          const col = Math.floor(x / resolution);
          const row = Math.floor(y / resolution);

          const radius = 2;
          for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
              const c = col + i;
              const r = row + j;
              if (c >= 0 && c < cols && r >= 0 && r < rows) {
                const idx = c + r * cols;
                const d = Math.sqrt(i * i + j * j);
                if (d <= radius) {
                  grid[idx] = Math.min(1.0, grid[idx] + 0.3 * (1 - d / radius));
                }
              }
            }
          }
        }
      }

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      // 2. RENDER & DIFFUSE — visual language only changed
      ctx.fillStyle = "#0A0A0A"; // CRT dark per DESIGN.md
      ctx.fillRect(0, 0, width, height);

      let activeCount = 0;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = c + r * cols;
          const signal = grid[idx];

          // Cooling (unchanged)
          grid[idx] *= coolingFactor;

          // Diffusion (unchanged physics)
          if (signal > 0.01) {
            const right = c < cols - 1 ? grid[idx + 1] : 0;
            const bottom = r < rows - 1 ? grid[idx + cols] : 0;
            grid[idx] = (grid[idx] * 0.9) + (right * 0.05) + (bottom * 0.05);
          }

          if (signal > 0.05) {
            activeCount++;

            const x = c * resolution;
            const y = r * resolution;

            const warp = signal * (resolution * 0.5);
            ctx.fillStyle = getSignalColor(signal);

            const size = resolution * (0.8 + signal * 0.5) + warp * 0.02;
            const offset = (resolution - size) / 2;

            ctx.beginPath();
            ctx.rect(x + offset, y + offset, size, size);
            ctx.fill();
          } else {
            // Subtle structural grid (brutalist, not decorative)
            if (c % 2 === 0 && r % 2 === 0) {
              const x = c * resolution;
              const y = r * resolution;
              ctx.fillStyle = "#1A1A1A";
              ctx.fillRect(x + resolution / 2 - 1, y + resolution / 2 - 1, 2, 2);
            }
          }
        }
      }

      // --- BRUTALIST OVERLAYS (registration, HUD, scale) ---
      ctx.strokeStyle = "#E61919"; // hazard
      ctx.fillStyle = "#E61919";
      ctx.lineWidth = 1;

      // Corner registration marks (simple targets)
      const markSize = 18;
      const margin = 14;

      // Top-left
      ctx.beginPath();
      ctx.moveTo(margin, margin);
      ctx.lineTo(margin + markSize, margin);
      ctx.moveTo(margin, margin);
      ctx.lineTo(margin, margin + markSize);
      ctx.stroke();

      // Top-right
      ctx.beginPath();
      ctx.moveTo(width - margin - markSize, margin);
      ctx.lineTo(width - margin, margin);
      ctx.moveTo(width - margin, margin);
      ctx.lineTo(width - margin, margin + markSize);
      ctx.stroke();

      // Bottom-left
      ctx.beginPath();
      ctx.moveTo(margin, height - margin);
      ctx.lineTo(margin + markSize, height - margin);
      ctx.moveTo(margin, height - margin);
      ctx.lineTo(margin, height - margin - markSize);
      ctx.stroke();

      // Bottom-right
      ctx.beginPath();
      ctx.moveTo(width - margin - markSize, height - margin);
      ctx.lineTo(width - margin, height - margin);
      ctx.moveTo(width - margin, height - margin);
      ctx.lineTo(width - margin, height - margin - markSize);
      ctx.stroke();

      // Live HUD readout (mono-style, low opacity)
      ctx.fillStyle = "rgba(234, 234, 234, 0.65)";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textBaseline = "top";
      ctx.fillText(`SIGNAL NODES: ${activeCount}`, 14, 14);

      // Subtle edge scale indicators (right side)
      ctx.fillStyle = "rgba(230, 25, 25, 0.35)";
      ctx.fillRect(width - 3, 40, 1, height - 80);
      ctx.fillStyle = "rgba(234, 234, 234, 0.4)";
      ctx.fillText("0", width - 14, 38);
      ctx.fillText("1", width - 14, height - 46);

      requestAnimationFrame(update);
    };

    window.addEventListener("resize", resize);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    resize();
    update();

    return () => {
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [resolution, coolingFactor]);

  return (
    <div
      ref={containerRef}
      className={cn("absolute inset-0 z-0 overflow-hidden bg-[#0A0A0A]", className)}
      style={style}
      {...props}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default BrutalistTelemetryGrid;
