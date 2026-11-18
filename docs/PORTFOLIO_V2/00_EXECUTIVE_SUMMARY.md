# 00 — Synthèse exécutive (V2)

Branche : `feat/portfolio-v2` (partie de `main` = `4b87cd8`, tag `v1.0.0`). Rien n'a été poussé ni déployé.

## Ce qui a changé

- [IMPLEMENTED] Le premier écran devient une **carte de visite numérique** : portrait authentique, nom, titre, proposition de valeur, et 4 actions (WhatsApp, enregistrer le contact en vCard, appeler, e-mail) visibles sans défiler sur mobile.
- [IMPLEMENTED] **Choix de la langue par pays** sur `https://rachidberrada.com/` (Edge Function Netlify, GeoIP natif) : MA/FR → `/fr`, PT → `/pt`, US et tous les autres → `/en`. Préférence manuelle mémorisée, option « Automatique » pour revenir à la détection.
- [IMPLEMENTED] **Portugais européen** (`/pt`, `pt-PT`) complet ; français, anglais et arabe (RTL) conservés et réécrits.
- [IMPLEMENTED] **Réalisations honnêtes** : statut visible (client, démo, prototype, R&D), limites connues, plus aucun visuel généré par IA.
- [IMPLEMENTED] **Page de devis** `/[langue]/devis` avec validation partagée navigateur/serveur et attribution (carte de visite / organique / direct).
- [IMPLEMENTED] Pages **mentions légales** et **confidentialité** dans les 4 langues ; sitemap + hreflang ; image de partage avec le vrai portrait.
- [IMPLEMENTED] **Sécurité** : Next.js 16.3.2 → 16.4.6, `npm audit` 13 vulnérabilités (dont 1 critique) → 0 en production (14 alertes résiduelles dans l’outillage ESLint uniquement, sans correctif publié — voir 08), Node 24 partout, en-têtes CSP/HSTS-compatibles.

## Ce qui est vérifié

- [TESTED] 40 tests automatisés (`npm test`) : matrice GeoIP, préférence, UTM, absence de boucle, vCard, validation des demandes, attribution, sortie du build (langues, hreflang, liens internes), absence de l’ancien numéro.
- [TESTED] `npm run lint`, `npm run typecheck`, `npm run build` (54 pages statiques) : OK.
- [TESTED] Lighthouse mobile (local) : Accessibilité 100, Bonnes pratiques 100, SEO 100 sur `/fr`, `/ar`, `/pt/devis`, `/en/realisations/gold-fitness`.

## Ce qui ne l'est pas encore

- [NOT VERIFIED] LCP mobile < 2,5 s : dernière mesure locale 3,85 s (profil Lighthouse mobile), avant la dernière optimisation du portrait. À mesurer sur le déploiement Netlify (voir 09).
- [NOT VERIFIED] Comportement GeoIP réel sur Netlify, réception réelle d'une demande, scénario Make : nécessitent un déploiement de prévisualisation.
- [BLOCKED] Contenu exact du QR imprimé et informations légales : à fournir par Rachid (voir 12). Permission Gold Fitness et numéro professionnel : confirmés le 18/11/2026.

## Décision attendue

Valider la prévisualisation Netlify de la branche, puis autoriser la fusion et la mise en production (procédure : 11).
