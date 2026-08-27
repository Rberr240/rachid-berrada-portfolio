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
};

export default nextConfig;
