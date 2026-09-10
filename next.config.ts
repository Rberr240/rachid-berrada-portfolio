import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // English (/en) est l'expérience principale mais reste servie à la racine
  // (/) pour rester la home "English-first" attendue : la réécriture est
  // interne, l'URL affichée au visiteur reste "/". Le français vit sur son
  // propre segment réel (/fr), sans réécriture.
  async rewrites() {
    return [
      { source: "/", destination: "/en" },
      { source: "/realisations", destination: "/en/realisations" },
      { source: "/realisations/:slug", destination: "/en/realisations/:slug" },
    ];
  },
  experimental: {
    // Le layout racine vit sous un segment dynamique (app/[lang]/layout.tsx),
    // donc /_not-found (URL non reconnue) n'a pas de layout non-dynamique.
    // Sans ce flag, Next.js sert son 404 par défaut pour cette route, dont
    // l'image OpenGraph résout en dur vers http://localhost:3000 dans le
    // HTML expédié — une vraie fuite de production, pas seulement
    // l'avertissement cosmétique au moment du build. Voir
    // app/global-not-found.tsx.
    globalNotFound: true,
  },
};

export default nextConfig;
