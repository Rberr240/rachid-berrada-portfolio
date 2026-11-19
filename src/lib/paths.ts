import type { Locale } from "./i18n";

/** Toutes les URLs internes localisées, au même endroit. */
export const paths = {
  home: (l: Locale) => `/${l}`,
  section: (l: Locale, id: string) => `/${l}#${id}`,
  quote: (l: Locale) => `/${l}/devis`,
  card: (l: Locale) => `/${l}/c`,
  project: (l: Locale, id: string) => `/${l}/realisations/${id}`,
  privacy: (l: Locale) => `/${l}/confidentialite`,
  legal: (l: Locale) => `/${l}/mentions-legales`,
  vcard: (l: Locale) => `/${l}/rachid-berrada.vcf`,
};

/** Remplace le segment de langue d'un chemin (/fr/devis -> /pt/devis). */
export function switchLocalePath(pathname: string, to: Locale): string {
  const rest = pathname.replace(/^\/(fr|en|pt|ar)(?=\/|$)/, "");
  return `/${to}${rest === "/" ? "" : rest}`;
}
