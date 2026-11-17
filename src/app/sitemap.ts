import type { MetadataRoute } from "next";
import { getSiteUrl, projects } from "@/content/facts";
import { LOCALES, LOCALE_META } from "@/lib/i18n";

/**
 * Toutes les pages indexables, dans les 4 langues, avec leurs alternatives
 * hreflang. "/" (redirection par pays) et /[lang]/c (doublon noindex) sont exclus.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const suffixes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/devis", priority: 0.8 },
    ...projects.map((p) => ({ path: `/realisations/${p.id}`, priority: 0.7 })),
    { path: "/confidentialite", priority: 0.2 },
    { path: "/mentions-legales", priority: 0.2 },
  ];

  return suffixes.flatMap(({ path, priority }) =>
    LOCALES.map((lang) => ({
      url: `${base}/${lang}${path}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [LOCALE_META[l].htmlLang, `${base}/${l}${path}`])),
      },
    })),
  );
}
