import type { Locale, Profile } from "./types";
import { profileEn } from "./profile.en";
import { profileFr } from "./profile.fr";
import { profileAr } from "./profile.ar";

/**
 * Point d'entrée unique du contenu localisé. English = expérience
 * principale (/), French et Arabic = expériences préservées (/fr, /ar).
 * Pas de framework i18n : juste une sélection de contenu par locale,
 * branchée sur le segment dynamique app/[lang].
 */
const profiles: Record<Locale, Profile> = {
  en: profileEn,
  fr: profileFr,
  ar: profileAr,
};

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "fr", "ar"];

export function getProfile(locale: Locale): Profile {
  return profiles[locale] ?? profiles[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr" || value === "ar";
}
