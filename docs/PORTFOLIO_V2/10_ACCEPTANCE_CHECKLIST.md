# 10 — Liste d'acceptation

Légende : ✅ fait et vérifié · 🟡 fait, à vérifier en prévisualisation/production · ⛔ bloqué (action de Rachid)

## Identité
- ✅ Site entièrement consacré à Rachid Berrada
- ✅ Aucun titre non vérifié (« ingénieur » retiré), aucun témoignage, aucune statistique inventée
- ✅ Positionnement clair (05)

## Domaine et QR
- ✅ `rachidberrada.com` reste le domaine ; aucun changement DNS
- ✅ `/` reste le point d'entrée, query string conservée (unitaire + repli local)
- ✅ Anciennes URLs `/fr`, `/ar`, `/fr/realisations/*`, `/realisations/*` fonctionnelles
- 🟡 Redirection par pays sur Netlify réel
- ⛔ Contenu exact du QR imprimé (pour savoir si les scans sont attribuables)

## Géolocalisation
- ✅ MA/FR → fr, PT → pt, US → en, autres → en (tests)
- ✅ Choix manuel + retour automatique ; pas de boucle
- 🟡 GeoIP Netlify réelle

## Langues
- ✅ Français, anglais, portugais européen, arabe (RTL) complets ; aucune chaîne d'une autre langue détectée
- 🟡 Relecture native PT et AR recommandée

## Design
- ✅ Premier écran = carte de visite, actions de contact visibles à 360×640
- ✅ Visuels réels uniquement (portraits fournis, captures de sites en ligne)
- 🟡 Tablette et 430×932 à contrôler visuellement

## Portfolio
- ✅ Statut honnête pour chaque projet, limites affichées, visuels IA supprimés
- ✅ Permission Gold Fitness confirmée (18/11/2026)
- ⛔ Correction de la démo Mirador ; contexte de « Gestion des attestations »

## Contact
- ✅ Liens WhatsApp, téléphone, e-mail ; vCard valide ; partage avec repli copie
- ✅ Validation du formulaire ; aucun faux succès
- 🟡 Réception réelle Netlify Forms → Make → Sheets/Gmail ; import vCard sur téléphones réels

## Qualité
- ✅ Lint, TypeScript, build, 40 tests ; `npm audit --omit=dev` = 0 (alertes `picomatch` de l’outillage ESLint documentées en 08)
- ✅ Lighthouse mobile : accessibilité, bonnes pratiques, SEO = 100 (4 pages)
- 🟡 LCP < 2,5 s non démontré (09)

## Documentation
- ✅ 14 documents + README à jour ; actions manuelles listées (12) ; déploiement et retour arrière (11)
