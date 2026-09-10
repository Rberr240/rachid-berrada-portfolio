/**
 * URL de production réelle, déjà en ligne — pas un domaine inventé (voir
 * MASTER_BLUEPRINT.md §0). Sert de repli sûr pour metadataBase/OG/sitemap
 * tant qu'un domaine personnalisé n'est pas confirmé via
 * NEXT_PUBLIC_SITE_URL. hasConfirmedDomain (voir profile.en.ts/profile.fr.ts)
 * reste séparé : il ne devient vrai que lorsqu'un futur domaine personnalisé
 * est explicitement configuré, pas simplement parce que cette URL Netlify
 * est utilisée en interne.
 */
export const PRODUCTION_SITE_URL = "https://rachid-berrada-portfolio.netlify.app";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || PRODUCTION_SITE_URL;
}
