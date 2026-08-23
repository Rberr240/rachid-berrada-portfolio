"use client";

import { useEffect, useState } from "react";

const HERO_ID = "accueil";
// Le Hero atteint son état "compact" à ce pourcentage de sa propre hauteur —
// laisse de la marge pour que la section Services prenne le relais juste après.
const COMPLETE_FRACTION = 0.62;
// Utilisé quand aucun Hero n'est présent sur la page (ex: /realisations/[slug]) :
// la navbar doit tout de même se compacter rapidement au scroll.
const FALLBACK_DISTANCE = 120;

/**
 * Progression de scroll (0 → 1) relative à la hauteur du Hero, partagée par
 * le Hero (rétrécissement du portrait/texte) et le Header (navbar qui se
 * compacte) pour qu'ils restent visuellement synchronisés.
 */
export function useHeroScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let ticking = false;
    const compute = () => {
      if (prefersReducedMotion) {
        setProgress(window.scrollY > FALLBACK_DISTANCE ? 1 : 0);
        ticking = false;
        return;
      }

      const heroEl = document.getElementById(HERO_ID);
      const distance = heroEl ? heroEl.offsetHeight * COMPLETE_FRACTION : FALLBACK_DISTANCE;
      const p = distance > 0 ? window.scrollY / distance : 0;
      setProgress(Math.min(1, Math.max(0, p)));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return progress;
}

export function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}
