/**
 * Source unique des langues du site et de la règle pays → langue.
 *
 * Ce fichier est importé à la fois par l'application Next.js, par l'Edge
 * Function Netlify (netlify/edge-functions/locale-redirect.ts) et par les
 * tests Node : il ne doit importer AUCUN autre module.
 */

export const LOCALES = ["fr", "en", "pt", "ar"] as const;
export type Locale = (typeof LOCALES)[number];

/** Repli lorsque le pays est inconnu ou que la GeoIP est indisponible. */
export const DEFAULT_LOCALE: Locale = "en";

/** Cookie first-party mémorisant un choix de langue manuel (valeur = locale). */
export const LOCALE_COOKIE = "rb_locale";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const LOCALE_META: Record<
  Locale,
  { htmlLang: string; ogLocale: string; dir: "ltr" | "rtl"; label: string; short: string }
> = {
  fr: { htmlLang: "fr", ogLocale: "fr_FR", dir: "ltr", label: "Français", short: "FR" },
  en: { htmlLang: "en-US", ogLocale: "en_US", dir: "ltr", label: "English", short: "EN" },
  pt: { htmlLang: "pt-PT", ogLocale: "pt_PT", dir: "ltr", label: "Português", short: "PT" },
  ar: { htmlLang: "ar", ogLocale: "ar_MA", dir: "rtl", label: "العربية", short: "AR" },
};

/**
 * Correspondance exacte demandée (ISO 3166-1 alpha-2). Tout autre pays,
 * ou l'absence de pays, donne DEFAULT_LOCALE.
 */
export const COUNTRY_LOCALE: Readonly<Record<string, Locale>> = {
  MA: "fr",
  FR: "fr",
  PT: "pt",
  US: "en",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export function localeForCountry(countryCode: string | null | undefined): Locale {
  return COUNTRY_LOCALE[(countryCode ?? "").trim().toUpperCase()] ?? DEFAULT_LOCALE;
}

/**
 * Langue de destination pour une visite sur "/" :
 * 1. préférence manuelle valide (cookie) ; 2. pays GeoIP ; 3. anglais.
 * Une URL localisée explicite (/fr, /pt…) n'atteint jamais cette fonction.
 */
export function resolveRootLocale(input: {
  preference?: string | null;
  country?: string | null;
}): Locale {
  return isLocale(input.preference) ? input.preference : localeForCountry(input.country);
}

/** Lit une valeur de cookie dans un en-tête Cookie brut. */
export function readCookie(header: string | null | undefined, name: string): string | null {
  if (!header) return null;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    if (part.slice(0, index).trim() === name) {
      try {
        return decodeURIComponent(part.slice(index + 1).trim());
      } catch {
        return null;
      }
    }
  }
  return null;
}
