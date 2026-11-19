# 01 — État initial (avant V2)

Audit réalisé le 17/11/2026 sur `main` (`4b87cd8`, tag `v1.0.0`), arbre de travail propre.

## Dépôt et outillage

- [OBSERVED] Next.js 16.3.2, React 19.2.8, TypeScript 5.9.3, Tailwind CSS 4.3.3, lucide-react 1.33.
- [OBSERVED] Node local 24.12 ; Netlify configuré en `NODE_VERSION = "20"` (fin de vie).
- [OBSERVED] `npm audit` : 13 vulnérabilités (1 critique, 5 élevées, 7 modérées) — Next.js (RCE optimisation d'images, empoisonnement de cache SSG/ISR…), sharp, zod, source-map-js. Sortie conservée dans 08.
- [OBSERVED] `lint`, `tsc`, `build` : OK, 25 pages statiques. Aucun test automatisé.

## Routage et domaine

- [OBSERVED] Production : `https://rachidberrada.com` (Netlify, HSTS déjà présent). `www.rachidberrada.com` ne résout pas. `/pt` → 404.
- [OBSERVED] `/` servait l'anglais par réécriture interne ; `/fr`, `/ar` en segments réels ; `/realisations/<slug>` (anglais sans préfixe).
- [OBSERVED] Le QR imprimé pointe vers le domaine racine. Le paramètre éventuellement encodé (`?utm_source=business_card&utm_medium=qr`, `?source=business-card` ou aucun) n'est **pas connu** : la carte n'a pas pu être scannée.

## Contenu

- [OBSERVED] 3 langues (en, fr, ar), contenus dupliqués en 3 fichiers de ~30 Ko avec e-mail, téléphone, URLs et statuts répétés.
- [OBSERVED] Titre « Ingénieur en solutions digitales » / « AI & Digital Solutions Engineer » sans diplôme d'ingénieur vérifié.
- [OBSERVED] 5 projets ; 3 d'entre eux illustrés par des « dashboards » générés par IA avec des chiffres inventés (`dashbord.png`).
- [OBSERVED] Démo publique Mirador (`rberr240.github.io/mirador-golf-demo`) : accents corrompus (« rÃ©sidence ») — double encodage UTF-8 dans le fichier source.
- [OBSERVED] Contact visible très tard sur mobile ; pas de vCard ; pas de page de contact dédiée ; formulaire sur l'accueil.
- [OBSERVED] Google Analytics 4 prévu (variable non définie en production : aucun script trouvé dans le HTML servi).

## Leads

- [OBSERVED] Netlify Forms (`public/netlify-forms/contact.html`) + fonction `netlify/functions/lead-automation.mts` → webhook Make (si `LEADS_AUTOMATION_WEBHOOK_URL` défini). Réception de bout en bout jamais prouvée.

## Mesures de départ

- [OBSERVED] HTML `/fr` en production : 32 Ko gzip.
- [NOT VERIFIED] LCP mobile V1 ≈ 3,6 s (audit précédent, environnement différent : non comparable directement avec les mesures V2 de 09).
