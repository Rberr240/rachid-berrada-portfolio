import type { Locale } from "@/data/types";

/**
 * L'anglais est servi à la racine "/" via une réécriture (next.config.ts) ;
 * les autres locales vivent sur leur propre segment réel ("/fr", "/ar").
 * Centralise cette règle pour ne pas la retaper à chaque route localisée.
 */
export function localePrefix(locale: Locale): string {
  return locale === "en" ? "" : `/${locale}`;
}

export function localeHomeHref(locale: Locale): string {
  return locale === "en" ? "/" : `/${locale}`;
}

export function caseStudyBasePath(locale: Locale): string {
  return `${localePrefix(locale)}/realisations`;
}
