import { useId } from "react";

/**
 * Composition graphite/bleu électrique purement décorative (rings, halo,
 * masse organique) recréée en SVG + CSS — jamais un asset image téléchargé.
 * Réutilisée derrière le portrait du Hero et comme pièce centrale de la
 * section IA / Automatisation. useId() évite les id de <defs> dupliqués
 * lorsque le composant est monté plusieurs fois sur la même page.
 */
export function AbstractFigure({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  const uid = useId();
  const rim = `af-rim-${uid}`;
  const ring = `af-ring-${uid}`;
  const ring2 = `af-ring-2-${uid}`;

  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <div
        className={`blob-graphite absolute inset-[8%] opacity-90 blur-2xl ${
          animated ? "motion-safe:animate-float-slower" : ""
        }`}
      />
      <svg
        viewBox="0 0 600 600"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <radialGradient id={rim} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6f8dff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#6f8dff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={ring} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6f8dff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#6f8dff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={ring2} x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5f7fb" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#f5f7fb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <circle cx="300" cy="300" r="218" stroke={`url(#${ring})`} strokeWidth="1" />
        <circle
          cx="292"
          cy="308"
          r="258"
          stroke={`url(#${ring2})`}
          strokeWidth="1"
          strokeDasharray="1 9"
        />
        <path
          d="M 330 90 A 210 210 0 0 1 470 340"
          stroke={`url(#${rim})`}
          strokeWidth="22"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}
