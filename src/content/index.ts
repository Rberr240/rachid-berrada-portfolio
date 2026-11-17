import type { Locale } from "@/lib/i18n";
import type { Dictionary } from "./types";
import { fr } from "./fr";
import { en } from "./en";
import { pt } from "./pt";
import { ar } from "./ar";

export const dictionaries: Record<Locale, Dictionary> = { fr, en, pt, ar };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
