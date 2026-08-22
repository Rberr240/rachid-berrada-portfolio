# Audit GitHub — Portfolio Rachid Berrada

Document interne. Ne fait pas partie du site public. Généré à partir d'un audit en
lecture seule (clonage local temporaire en shallow-clone, aucune modification poussée
sur aucun dépôt) réalisé le 2026-08-22.

## Méthodologie

- Clonage `git clone --depth 1` de chaque dépôt public, en local, dans un dossier
  temporaire hors du projet (supprimé après l'audit).
- `JARVIS-V3` (privé) était accessible via les identifiants Git déjà configurés sur
  cette machine — audité au niveau architecture uniquement, sans ouvrir les documents
  de gouvernance/audit internes détaillés, conformément à la consigne de confidentialité.
- Recherche de secrets : fichiers `.env*` suivis par Git, clés privées, motifs de clés
  API connus (`sk-…`, `AKIA…`, `AIza…`, blocs `PRIVATE KEY`).
- Lecture des README, `package.json` / `composer.json`, workflows CI, structure des
  dossiers.
- Site Gold Fitness audité en ligne (contenu réel + captures d'écran Playwright).

## Tableau récapitulatif

| Projet | URL | Visibilité | Catégorie | Stack | Démo | Score /10 | Portfolio | GitHub |
|---|---|---|---|---|---|---|---|---|
| Gold Fitness | Rberr240 org Gold-Fitness/gold-fitness | Public | Digitalisation / QR | HTML/CSS/JS, GH Pages | ✅ en ligne | 8/10 | **A** | Lier |
| gold-fitness-qr | Gold-Fitness/gold-fitness-qr | Public | Redirection technique | HTML | ✅ (redirection) | — | Fusionné avec Gold Fitness | Ne pas présenter seul |
| Résidence (Mirador Golf) | Rberr240/residence-proprietaires | Public | Application web / Digitalisation | JS, Supabase (PG + Edge Functions) | ❌ non déployée publiquement | 7.5/10 | **A** (sans lien code) | Ne pas lier |
| Gestion des attestations | Rberr240/gestion-attestations | Public | App full-stack | React, Laravel 12, Docker, CI/CD | ❌ (app locale) | 7/10 | **A** | Lier |
| gestion-attestations-stage | Rberr240/gestion-attestations-stage | Public | Doublon du précédent | React, Laravel | ❌ | 4/10 | **E** (doublon) | Ne pas lier, envisager archivage |
| JARVIS-V2 | Rberr240/JARVIS-V2 | Public | R&D IA | Node.js, LangGraph | ❌ (CLI) | 7/10 | **A** | Lier |
| JARVIS-V3 | Rberr240/JARVIS-V3 (privé) | **Privé** | R&D IA | Python | — | — | Non présenté | Rester privé |
| menu-chez-bassou | Gold-Fitness/menu-chez-bassou | Public | Digitalisation restauration | HTML/CSS/JS, GH Pages | ✅ en ligne | 6.5/10 | **B** | Lier (si ajouté) |
| lentrocote-menu | Gold-Fitness/lentrocote-menu | Public | Digitalisation restauration | HTML/CSS/JS, GH Pages | ✅ en ligne, défauts visibles | 4.5/10 | **C** | À corriger avant de lier |

## Détail par projet

### Gold Fitness — A

- **Contenu vérifié** : page mobile-first unique (HTML/CSS/JS), hébergée sur GitHub
  Pages, avec boutons d'appel direct, WhatsApp, lien Instagram (le lien Facebook pointe
  vers `#`, non fonctionnel), localisation Google Maps, et une galerie de 4 vidéos
  (fichiers `.mov`, 1.9 à 5.6 Mo, réellement présents dans le dépôt).
- **README** : une seule ligne (`# gold-fitness`) — à enrichir.
- **Sécurité** : aucun secret, rien à signaler.
- **`gold-fitness-qr`** : ne contient qu'un `index.html` de redirection HTTP
  (`meta refresh` vers `gold-fitness.github.io/gold-fitness/`). Ce n'est pas un projet
  autonome — vérifié et fusionné avec Gold Fitness dans le portfolio, comme demandé.
- **Recommandation portfolio** : case study complète, captures d'écran réelles prises
  du site en ligne (voir `public/portfolio/gold-fitness/`).
- **Recommandation GitHub** : épingler `gold-fitness` sur le profil, écrire un vrai
  README, corriger le lien Facebook ou le retirer.

### Résidence — Plateforme de gestion (Mirador Golf) — A, sans lien code

- **Contenu vérifié** : parcours d'inscription propriétaires réel et substantiel
  (`index.html`, `inscription.html`, `collecte.html` — 38 Ko, `confirmation.html`),
  backend Supabase avec 2 Edge Functions Deno (`submit-registration`,
  `validate-access-code`) et 6 migrations SQL (tables `owners`, `apartments`,
  `buildings`, `access_codes`, `meetings`, `meeting_responses`, `registration_sessions`,
  `owner_submissions`).
- **Sécurité observée (bon niveau)** : signature HMAC-SHA256 des codes d'accès (pas de
  comparaison en clair), fonctions appelées avec la clé "publishable" (jamais la clé
  service_role), Row Level Security présente dans 4 des 6 fichiers de migration. Aucun
  secret réel commité — les seules occurrences de "secret_key" dans `supabase/config.toml`
  sont des références `env(...)` standard générées par la CLI Supabase, pas des valeurs.
- **Écart important** : le README annonce un « espace administrateur » (gestion des
  appartements, propriétaires, codes d'accès, réunions) — **or `admin/login.html` et
  `admin/dashboard.html` sont des fichiers vides (0 octet)**. Cette fonctionnalité
  n'existe pas encore. `docs/architecture.md`, `docs/security.md` et
  `confidentialite.html` sont également vides. Le case study du portfolio ne mentionne
  donc que le parcours d'inscription réellement fonctionnel, pas l'admin.
- **Nom "Mirador Golf"** : déjà public — présent en clair dans la balise `<title>` des
  pages (`Mirador Golf | Espace Propriétaires`). Son usage dans le portfolio n'est donc
  pas une divulgation nouvelle, mais reste présenté avec prudence (pas de statut
  "client" affirmé sans confirmation explicite).
- **Décision sécurité** : **pas de lien GitHub public** depuis le portfolio. Même sans
  secret technique, le dépôt expose la structure exacte (tables, logique de validation)
  d'un système qui traite potentiellement des données réelles de personnes (propriétaires
  d'une résidence). Pas de démo publique confirmée (pas de `CNAME`, pas de workflow de
  déploiement GitHub Pages trouvé).
- **Recommandation GitHub** : envisager de rendre ce dépôt privé, ou a minima compléter
  `docs/security.md` avant de le garder public. Ne pas laisser le README annoncer une
  fonctionnalité admin inexistante.

### Gestion des attestations — A

- **Contenu vérifié** : backend Laravel 12 (PHP 8.2, Sanctum + JWT, `barryvdh/laravel-dompdf`
  pour la génération PDF) avec contrôleurs `Attestation`, `Auth`, `Enseignant`,
  `Etudiant`, `Stagiaire` ; frontend React 18 (Vite, Chakra UI, React Router, Axios) avec
  pages de connexion, dashboard, listes et fiches détail par profil ; `docker-compose.yml`
  + Dockerfiles ; pipeline `.github/workflows/ci-cd.yml` (tests Laravel + build image
  Docker à chaque push sur `main`).
- **Sécurité** : `.env` correctement ignorés (frontend et backend). Un point mineur :
  `docker/ssl/nginx.key` (clé privée) est commité — il s'agit d'un certificat
  auto-signé de développement local pour Nginx (accompagné de `nginx.crt`), pas d'un
  secret de service ou de compte. À déplacer hors du dépôt par bonne pratique, mais sans
  risque réel.
- **README** : absent à la racine (seuls les README par défaut Laravel/Vite sont présents,
  non personnalisés) — à écrire avant de mettre ce dépôt en avant plus largement.
- **Recommandation portfolio** : case study technique (full-stack + Docker + CI/CD),
  pas de démo live (application interne), lien vers le repository conservé.

### gestion-attestations-stage — E (doublon)

- **Constat** : mêmes contrôleurs/fonctionnalités que `gestion-attestations`
  (Attestation, Auth, Enseignant, Etudiant, Stagiaire) — il s'agit de la même
  application, à un stade antérieur / version « stage » (école), sans Docker ni CI/CD.
  Contient un README (que la version principale n'a pas) et un fichier `.env` suivi —
  sans risque réel (contenu : `VITE_API_BASE_URL=http://127.0.0.1:8000/api`, une URL
  locale, pas un secret), mais mauvaise pratique à corriger.
- **Décision** : ne pas présenter comme un second projet, conformément à la consigne.
  Non retenu dans le portfolio.
- **Recommandation GitHub** : archiver ce dépôt une fois confirmé qu'il est bien
  superseded par `gestion-attestations`, ou au minimum le documenter comme tel dans son
  README.

### JARVIS-V2 — A (preuve publique) / JARVIS-V3 — non présenté (privé)

- **JARVIS-V2** : orchestrateur central basé sur LangGraph (`core/orchestrator/`),
  agents spécialisés réels (coding, devops, media, memory, planner, research, vision,
  voice), modules d'autonomie (`goalManager`, `reflectionEngine`, `selfImprover`,
  `taskExecutor`, `taskPlanner`), module mémoire dédié, module sécurité
  (`gate.js`, `permissions.js`). 20 documents d'architecture dans `docs/architecture/`.
  Dépendances confirmant l'intégration multi-fournisseurs LLM (OpenAI, Anthropic,
  Google Gemini, Groq) via LangChain. Dernier commit : « Freeze JARVIS-V2 before
  JARVIS-V3 » — confirme que ce dépôt est le socle stable, gelé volontairement.
  **README vide** — à écrire, c'est le principal point faible de ce dépôt en l'état.
- **JARVIS-V3** (privé, accès local uniquement) : évolution active (dernier commit la
  veille de cet audit), inclut un sous-projet `JARVIS-IDE` bien plus vaste (agents,
  builder, reasoning, router, indexer, knowledge, memory…), en Python. Aucun secret
  détecté (seul `bootstrap/templates/.env.template` matché, un template légitime).
  README vide également. Reste privé — non présenté publiquement, conformément à la
  consigne. Sa seule utilité pour le portfolio est de confirmer, en interne, que la
  description « architecture d'assistant intelligent combinant orchestration, mémoire,
  automatisation et modèles d'IA » est fondée et cohérente avec le projet réel.
- **Recommandation portfolio** : case study basée uniquement sur JARVIS-V2, présentée
  comme projet personnel de R&D — pas de capacité listée qui ne soit pas un module
  effectivement présent dans le code.

### menu-chez-bassou — B

- Menu digital réel et déployé (GitHub Pages, 200 OK), 8 catégories avec prix en DH,
  photos des plats, lien WhatsApp de commande fonctionnel. Défauts mineurs : numéro de
  téléphone affiché au format placeholder (`+212 6 00 00 00 00`) et liens réseaux
  sociaux en `#` non fonctionnels.
- **Non retenu** comme 5ᵉ carte homepage pour garder un portfolio resserré à 4 projets
  diversifiés (un par pilier : Web, Applications, IA, Automatisation/Digitalisation).
  Peut être ajouté facilement plus tard (voir README du projet, section réalisations) —
  c'est un choix éditorial, pas une exclusion pour manque de qualité.

### lentrocote-menu — C

- En ligne (200 OK) mais chemins d'images cassés (utilisation de `\` au lieu de `/`,
  incompatible web), aucune coordonnée de contact, pas de réservation. Nécessite une
  correction avant de pouvoir être montré sereinement à un prospect. Non retenu.

## Sélection finale retenue pour le portfolio public (4 projets)

1. **Gold Fitness** — Digitalisation / Web / QR (pilier Web)
2. **Plateforme digitale de gestion de résidence** — Application web (pilier Applications)
3. **Gestion des attestations** — Application full-stack (pilier Applications, complète
   la diversité technique avec Docker/CI-CD)
4. **JARVIS** — R&D Intelligence Artificielle (pilier IA)

Ce classement suit la proposition initiale de Rachid ; l'audit ne l'a pas contredite —
les 4 projets proposés sont bien les plus solides et les plus diversifiés disponibles.
`menu-chez-bassou` est le meilleur candidat pour une 5ᵉ carte si un jour souhaité.

## Sécurité — synthèse

**Sûrs à lier publiquement** : `gold-fitness`, `gestion-attestations`, `JARVIS-V2`.
Aucun secret réel détecté dans ces trois dépôts.

**À ne pas lier** : `residence-proprietaires` (pas de secret technique, mais expose la
structure d'un système traitant des données réelles de personnes — prudence), `JARVIS-V3`
(privé), `gestion-attestations-stage` (doublon, pas de valeur ajoutée à exposer deux fois).

**Point mineur à corriger** (sans urgence, sans risque réel) : `docker/ssl/nginx.key`
dans `gestion-attestations` — certificat de dev local, à retirer du suivi Git par bonne
pratique.

## Recommandations GitHub (aucune modification effectuée — recommandations uniquement)

- **À épingler sur Rberr240** : `gestion-attestations`, `JARVIS-V2`,
  `residence-proprietaires` (même sans lien depuis le portfolio, le dépôt reste une
  bonne vitrine technique pour un visiteur GitHub direct) — et `gold-fitness` si
  l'épinglage inter-organisation est possible depuis le profil personnel.
- **README à réécrire en priorité** : `JARVIS-V2` (vide, alors que le projet est le plus
  impressionnant techniquement), `gold-fitness` (une ligne), `gestion-attestations`
  (absent à la racine).
- **Doublon probable** : `gestion-attestations-stage` vs `gestion-attestations` —
  recommandation d'archiver `-stage` une fois confirmé.
- **Devrait rester/passer privé** : `JARVIS-V3` (déjà privé, correct), envisager
  `residence-proprietaires` selon le niveau de confort de Rachid vis-à-vis de l'exposition
  du schéma de données.
- **Pourrait être archivé plus tard** : `gestion-attestations-stage`. `gold-fitness-qr`
  ne doit **pas** être archivé : c'est un redirecteur activement utilisé par le QR code
  physique.
