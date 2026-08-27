import Script from "next/script";

/**
 * Google Analytics 4, chargé uniquement si NEXT_PUBLIC_GA_MEASUREMENT_ID est
 * défini. Aucun identifiant n'est inventé ici — voir docs/international/
 * ANALYTICS_SETUP.md pour la procédure manuelle de configuration.
 */
export function Analytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (!measurementId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
