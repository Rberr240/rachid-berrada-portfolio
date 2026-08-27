import type { Locale, Profile } from "./types";
import { profileEn } from "./profile.en";
import { profileFr } from "./profile.fr";

/**
 * Point d'entrée unique du contenu localisé. English = expérience
 * principale (/), French = expérience préservée (/fr). Pas de framework
 * i18n : juste une sélection de contenu par locale, branchée sur le
 * segment dynamique app/[lang].
 */
const profiles: Record<Locale, Profile> = {
  en: profileEn,
  fr: profileFr,
};

export const defaultLocale: Locale = "en";
export const locales: Locale[] = ["en", "fr"];

export function getProfile(locale: Locale): Profile {
  return profiles[locale] ?? profiles[defaultLocale];
}

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "fr";
}
