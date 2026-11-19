# 02 — Architecture V2

## Vue d'ensemble

```
Visiteur ──► rachidberrada.com/  ──► Edge Function Netlify (locale-redirect.ts)
                                       │  pays (context.geo) + cookie rb_locale
                                       ▼  302 + query string conservée
                                 /fr | /pt | /en | /ar   (pages statiques Next.js)
```

- [IMPLEMENTED] Next.js 16.4.6 App Router, 100 % statique (54 pages), un seul segment de langue `app/[lang]`.
- [IMPLEMENTED] Aucun middleware/proxy Next.js : l'adapter Netlify ne génère donc aucune edge function concurrente.

## Arborescence utile

| Chemin | Rôle |
|---|---|
| `src/lib/i18n.ts` | Langues, métadonnées (`pt-PT`, RTL), mapping pays → langue, cookie. Sans import : partagé par Next, l'Edge Function et les tests. |
| `src/content/facts.ts` | **Faits partagés** : coordonnées, portraits, projets (statut, liens, technologies, captures). Un seul endroit à modifier. |
| `src/content/{fr,en,pt,ar}.ts` | Textes uniquement, typés par `Dictionary` (`src/content/types.ts`) : une clé manquante casse le build. |
| `src/lib/paths.ts` | Toutes les URLs internes localisées. |
| `src/lib/lead.ts` | Contrat du formulaire (champs, limites, validation) partagé navigateur / fonction Netlify / tests. |
| `src/lib/vcard.ts`, `src/lib/attribution.ts`, `src/lib/seo.ts` | vCard 3.0, classement de la visite, canonical + hreflang. |
| `netlify/edge-functions/locale-redirect.ts` | Redirection de `/` par pays. |
| `netlify/functions/lead-automation.mts` | Relais validé des demandes vers Make. |
| `tests/*.test.ts` | Tests Node (`node --test`, TypeScript natif de Node 24). |

## Routes

| Route | Type |
|---|---|
| `/` | Edge Function (prod) ; repli Next `307 → /en` (local, ou si la fonction échoue) |
| `/[lang]` | Accueil = carte de visite + services, situations, réalisations, méthode, à propos, contact |
| `/[lang]/c` | Carte compacte (noindex), route **additionnelle** |
| `/[lang]/devis` | Demande de devis + FAQ |
| `/[lang]/realisations/[slug]` | Études de cas (5 × 4 langues) |
| `/[lang]/mentions-legales`, `/[lang]/confidentialite` | Pages légales |
| `/[lang]/rachid-berrada.vcf` | vCard générée au build |
| `/[lang]/opengraph-image` | Image de partage avec portrait |
| `/realisations/:slug` | `308 → /en/realisations/:slug` (liens V1) |

## JavaScript client

Composants client limités à : en-tête (menu, langue), bouton de partage, bouton WhatsApp flottant, attribution/mesure, formulaire de devis. Le reste est rendu côté serveur au build.
