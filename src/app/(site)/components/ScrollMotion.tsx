"use client";

import { useEffect } from "react";

/**
 * Drives all scroll motion from one place so server components stay
 * server components and just declare intent via data-attributes:
 *   data-reveal           → fade/translate-up when scrolled into view
 *   data-reveal="blur"    → same, plus a blur-in
 *   data-lines            → masked [data-line] children rise, staggered
 *   data-parallax="0.15"  → translated against scroll (number = strength)
 *   data-scrub            → exposes --scrub (0→1) as element crosses viewport
 *   data-scrub="pin"      → --scrub maps to progress through a taller-than-
 *                           viewport section (for sticky letterbox scenes)
 *   data-hero             → sets --hero-progress (0→1) as it scrolls away
 *
 * The .js-motion class is added pre-paint by an inline script in the root
 * layout; re-adding it here is a harmless no-op that also covers HMR.
 */
export default function ScrollMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    root.classList.add("js-motion");

    if (reduce) return;

    const revealEls = document.querySelectorAll<HTMLElement>(
      "[data-reveal], [data-lines]"
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    // ---- Parallax + scrub + hero scrub (rAF-throttled, transform-only) ----
    const parallaxEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]")
    );
    const scrubEls = Array.from(
      document.querySelectorAll<HTMLElement>("[data-scrub]")
    );
    const heroEl = document.querySelector<HTMLElement>("[data-hero]");
    let ticking = false;

    const apply = () => {
      const vh = window.innerHeight;
      for (const el of parallaxEls) {
        const strength = parseFloat(el.dataset.parallax || "0.12");
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (center - vh / 2) / vh; // -1..1 through viewport
        el.style.transform = `translate3d(0, ${(-offset * strength * 100).toFixed(2)}px, 0)`;
      }
      for (const el of scrubEls) {
        const rect = el.getBoundingClientRect();
        const raw =
          el.dataset.scrub === "pin"
            ? -rect.top / Math.max(rect.height - vh, 1)
            : (vh - rect.top) / (vh + rect.height);
        const p = Math.min(Math.max(raw, 0), 1);
        el.style.setProperty("--scrub", p.toFixed(4));
      }
      if (heroEl) {
        const h = heroEl.offsetHeight || vh;
        const progress = Math.min(Math.max(window.scrollY / h, 0), 1);
        heroEl.style.setProperty("--hero-progress", progress.toFixed(4));
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(apply);
      }
    };

    if (parallaxEls.length || scrubEls.length || heroEl) {
      apply();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll, { passive: true });
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
