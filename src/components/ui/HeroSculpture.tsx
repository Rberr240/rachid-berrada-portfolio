/**
 * Centre visuel du Hero : masse sculpturale graphite/bleu électrique,
 * entièrement vectorielle (aucun asset raster). Trois anneaux concentriques
 * superposés et pivotés simulent un ruban/tore 3D — chaque anneau est rendu
 * par 3 traits concentriques dégressifs (ombre large floutée → corps
 * graphite → reflet clair) pour un effet de tube, plus un arc bleu fin en
 * "rim light" partiel (stroke-dasharray) qui ne couvre qu'une portion de la
 * circonférence, comme une lumière qui accroche un bord.
 */

type RingSpec = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotate: number;
  rimRotate: number;
  rimLength: number;
};

const rings: RingSpec[] = [
  { cx: 400, cy: 410, rx: 250, ry: 150, rotate: 32, rimRotate: 200, rimLength: 130 },
  { cx: 420, cy: 380, rx: 195, ry: 270, rotate: -22, rimRotate: 40, rimLength: 150 },
  { cx: 385, cy: 430, rx: 150, ry: 150, rotate: 68, rimRotate: 300, rimLength: 100 },
];

export function HeroSculpture({
  className = "",
  animated = true,
}: {
  className?: string;
  animated?: boolean;
}) {
  return (
    <div className={`pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 800 800"
        className={`h-full w-full ${animated ? "motion-safe:animate-float-slower" : ""}`}
        fill="none"
      >
        <defs>
          <radialGradient id="hs-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#3974FF" stopOpacity="0.45" />
            <stop offset="55%" stopColor="#2563FF" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2563FF" stopOpacity="0" />
          </radialGradient>
          <filter id="hs-blur-lg" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="26" />
          </filter>
          <filter id="hs-blur-sm" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Halo de fond — profondeur / bloom */}
        <circle cx="400" cy="400" r="340" fill="url(#hs-glow)" />

        {/* Anneaux sculpturaux */}
        {rings.map((r, i) => {
          const circumference = 2 * Math.PI * ((r.rx + r.ry) / 2);
          return (
            <g key={i} transform={`rotate(${r.rotate} ${r.cx} ${r.cy})`}>
              {/* ombre portée large, floutée : profondeur */}
              <ellipse
                cx={r.cx}
                cy={r.cy}
                rx={r.rx}
                ry={r.ry}
                stroke="#03050A"
                strokeWidth={78}
                opacity={0.55}
                filter="url(#hs-blur-lg)"
              />
              {/* corps graphite */}
              <ellipse
                cx={r.cx}
                cy={r.cy}
                rx={r.rx}
                ry={r.ry}
                stroke="#242F42"
                strokeWidth={46}
              />
              {/* reflet interne clair */}
              <ellipse
                cx={r.cx}
                cy={r.cy}
                rx={r.rx}
                ry={r.ry}
                stroke="#37455E"
                strokeWidth={17}
                opacity={0.9}
              />
              {/* rim light bleu — arc partiel uniquement */}
              <g transform={`rotate(${r.rimRotate} ${r.cx} ${r.cy})`}>
                <ellipse
                  cx={r.cx}
                  cy={r.cy}
                  rx={r.rx}
                  ry={r.ry}
                  stroke="#5B93FF"
                  strokeWidth={11}
                  strokeLinecap="round"
                  strokeDasharray={`${r.rimLength} ${Math.max(circumference - r.rimLength, 10)}`}
                  filter="url(#hs-blur-sm)"
                  opacity={0.9}
                />
                {/* cœur net et lumineux, par-dessus le flou */}
                <ellipse
                  cx={r.cx}
                  cy={r.cy}
                  rx={r.rx}
                  ry={r.ry}
                  stroke="#BFD2FF"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeDasharray={`${r.rimLength * 0.7} ${Math.max(circumference - r.rimLength * 0.7, 10)}`}
                />
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
