import Script from "next/script";

/**
 * Mesure d'audience respectueuse de la vie privée (Plausible : sans cookie,
 * sans donnée personnelle). DÉSACTIVÉE tant que NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 * n'est pas défini. Avant activation : créer le compte, mettre à jour la
 * politique de confidentialité et ajouter https://plausible.io à script-src
 * et connect-src dans netlify.toml (voir docs/PORTFOLIO_V2/08_SECURITY_AUDIT.md).
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return <Script src="https://plausible.io/js/script.js" data-domain={domain} strategy="afterInteractive" />;
}
