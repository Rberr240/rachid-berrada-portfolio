import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Repli uniquement : en production, "/" est intercepté AVANT Next.js par
      // l'Edge Function netlify/edge-functions/locale-redirect.ts (pays +
      // préférence). Si elle est absente (next dev / next start) ou échoue
      // (onError: "bypass"), "/" mène à l'anglais, comme demandé. La query
      // string (UTM du QR code) est conservée automatiquement par Next.
      { source: "/", destination: "/en", permanent: false },
      // Anciennes URLs anglaises V1 (servies sans préfixe) : liens partagés préservés.
      { source: "/realisations/:slug", destination: "/en/realisations/:slug", permanent: true },
      { source: "/realisations", destination: "/en#realisations", permanent: true },
    ];
  },
  experimental: {
    // Les visiteurs du QR code arrivent pour la première fois, sur mobile :
    // le CSS Tailwind (~8 Ko gzip) est inliné pour supprimer la requête
    // bloquante avant le premier rendu.
    inlineCss: true,
    // Layout racine sous un segment dynamique ([lang]) : nécessaire pour
    // servir app/global-not-found.tsx sur les URL inconnues.
    globalNotFound: true,
  },
};

export default nextConfig;
