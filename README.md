# rachidberrada.com — Rachid Berrada

Site personnel et carte de visite numérique de **Rachid Berrada**, développeur web & solutions digitales.
Le QR code imprimé sur ses cartes ouvre `https://rachidberrada.com/`, qui dirige chaque visiteur
vers sa langue selon son pays.

Stack : Next.js 16.4 (App Router, 100 % statique) · React 19 · TypeScript strict · Tailwind CSS 4 ·
Netlify (Edge Function, Forms, Functions). Seule dépendance d'exécution ajoutée : `lucide-react`.

Documentation complète : [`docs/PORTFOLIO_V2/`](docs/PORTFOLIO_V2/00_EXECUTIVE_SUMMARY.md).

## Démarrer

Prérequis : Node.js 24.

```bash
npm install
npm run dev        # http://localhost:3000 ("/" mène à /en en local)
npm run verify     # lint + typecheck + tests + build
npm test           # tests Node (après un build pour inclure les tests de sortie)
```

Tester la redirection par pays en local avec la vraie Edge Function :
`npx netlify-cli dev --geo=mock --country=PT` (remplacer `PT` par `MA`, `US`, `DE`…).

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| E-mail, téléphone, WhatsApp, GitHub, LinkedIn, ville, portraits | `src/content/facts.ts` (`person`) |
| Projets : statut, liens, technologies, captures | `src/content/facts.ts` (`projects`) |
| Textes d'une langue | `src/content/fr.ts`, `en.ts`, `pt.ts`, `ar.ts` (typés : une clé manquante casse le build) |
| Langues, règle pays → langue | `src/lib/i18n.ts` |
| Champs et validation du formulaire de devis | `src/lib/lead.ts` + `public/netlify-forms/contact.html` (vérifiés ensemble par les tests) |
| Redirection de `/` par pays | `netlify/edge-functions/locale-redirect.ts` |
| Relais des demandes vers Make | `netlify/functions/lead-automation.mts` |
| En-têtes de sécurité | `netlify.toml` |

## Routes

`/` (redirection par pays) · `/fr` `/en` `/pt` `/ar` · `/[langue]/devis` · `/[langue]/realisations/[projet]` ·
`/[langue]/c` (carte compacte) · `/[langue]/rachid-berrada.vcf` · `/[langue]/mentions-legales` ·
`/[langue]/confidentialite` · `/sitemap.xml` · `/robots.txt`.

## Variables d'environnement (Netlify)

| Variable | Rôle |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canonique (défaut : `https://rachidberrada.com`) |
| `LEADS_AUTOMATION_WEBHOOK_URL` | Webhook Make, côté serveur uniquement. Absent = automatisation désactivée |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Active la mesure d'audience sans cookie (désactivée par défaut — voir docs 08 et 12) |

## Déploiement

Procédure, prévisualisation, test de lead contrôlé et retour arrière :
[`docs/PORTFOLIO_V2/11_DEPLOYMENT_RUNBOOK.md`](docs/PORTFOLIO_V2/11_DEPLOYMENT_RUNBOOK.md).
Actions à réaliser par Rachid : [`12_MANUAL_ACTIONS_FOR_RACHID.md`](docs/PORTFOLIO_V2/12_MANUAL_ACTIONS_FOR_RACHID.md).
