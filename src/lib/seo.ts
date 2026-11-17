import type { Metadata } from "next";
import { LOCALES, LOCALE_META, type Locale } from "./i18n";

/**
 * Canonical + hreflang réciproques pour une page présente dans les 4 langues.
 * x-default : la racine "/" (sélection automatique) pour l'accueil, la
 * version anglaise pour les autres pages.
 */
export function alternatesFor(lang: Locale, suffix = ""): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const code of LOCALES) languages[LOCALE_META[code].htmlLang] = `/${code}${suffix}`;
  languages["x-default"] = suffix ? `/en${suffix}` : "/";
  return { canonical: `/${lang}${suffix}`, languages };
}

export function openGraphFor(lang: Locale, path: string, title: string, description: string): Metadata["openGraph"] {
  return {
    type: "website",
    url: path,
    title,
    description,
    siteName: "Rachid Berrada",
    locale: LOCALE_META[lang].ogLocale,
    alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => LOCALE_META[l].ogLocale),
  };
}
