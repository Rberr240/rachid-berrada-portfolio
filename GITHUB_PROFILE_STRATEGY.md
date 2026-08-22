# Stratégie de profil GitHub — Rberr240

Recommandations pour rendre https://github.com/Rberr240 plus professionnel.
Aucune modification n'a été appliquée sur GitHub — ce document liste des
recommandations à exécuter manuellement (ou à valider avant automatisation).

## Bio suggérée

**« Ingénieur en solutions digitales | Web, Applications, IA & Automatisation »**

Alternative plus courte (limite d'affichage GitHub) :
**« Ingénieur solutions digitales — Web • Apps • IA • Automatisation »**

Compléter le profil avec :
- Lien du portfolio (une fois en ligne)
- Localisation : à votre discrétion — non recommandée ici tant qu'elle n'est pas
  explicitement validée pour affichage public (cohérent avec la règle appliquée
  sur le portfolio lui-même)
- Pas de lien WhatsApp/téléphone directement sur GitHub (canal moins adapté) —
  le portfolio suffit comme point de contact central

## Repositories à épingler (max. 6)

D'après l'audit (`PORTFOLIO_GITHUB_AUDIT.md`), les 4 mieux notés et déjà
présentés dans le portfolio :

1. **gold-fitness** (org Gold-Fitness) — réalisation live, la plus démontrable
2. **residence-proprietaires** — architecture Supabase la plus aboutie
   techniquement (RLS, Edge Functions, HMAC)
3. **gestion-attestations** — meilleure démonstration full-stack (React +
   Laravel + Docker + CI/CD)
4. **JARVIS-V2** — seule preuve publique du travail IA/R&D

Il reste 2 emplacements libres. Candidats possibles, **mais non recommandés tant
qu'ils n'ont pas été audités** dans le cadre de cette mission :
`portail-des-savoirs`, `bibliotheque-electronique`, ou `menu-chez-bassou`
(audité, correct mais nécessite d'abord la correction des coordonnées
placeholder — voir l'audit).

⚠️ Note de sécurité à traiter avant tout épinglage supplémentaire :
`gestion-attestations` référence en interne (avant correctif) le nom
« Portail des Savoirs » dans son `docker-compose.yml`, ce qui suggère que ce
fichier a été dupliqué depuis le dépôt `portail-des-savoirs`. Il est recommandé
de vérifier `portail-des-savoirs` pour le même type de secrets en clair
(`APP_KEY`, mot de passe DB) avant de l'épingler ou de le présenter publiquement
— cette vérification n'a pas été faite dans le cadre de cette mission (dépôt non
autorisé pour audit dans les phases définies).

## Organisation des repositories

Suggestion de convention (via topics GitHub ou simplement la description de
chaque repo, GitHub ne permettant pas de dossiers) :

- **Projets professionnels / portfolio** : gold-fitness, residence-proprietaires,
  gestion-attestations
- **R&D personnelle** : JARVIS-V2 (public), JARVIS-V3 et dérivés (privés)
- **Anciens projets / doublons** : gestion-attestations-stage (à annoter comme
  version antérieure, voir audit — recommandation KEEP pour l'instant)
- **Privés** : JARVIS-V3, JARVIS-MASTER-EXECUTION-PLAN, JARVIS-V3.gitt,
  JARVIS-CLAUDE-BERR — non audités en détail dans cette mission (voir section
  Gouvernance de `FINAL_PROFESSIONALIZATION_REPORT.md`)

## Topics GitHub recommandés (par repo)

Ajouter des topics cohérents facilite la lecture rapide du profil :

- `gold-fitness` → `nextjs`... non, c'est du HTML/CSS/JS vanilla → `html`, `css`,
  `javascript`, `github-pages`, `qr-code`
- `residence-proprietaires` → `supabase`, `postgresql`, `edge-functions`,
  `deno`, `security`
- `gestion-attestations` → `react`, `laravel`, `docker`, `ci-cd`,
  `github-actions`
- `JARVIS-V2` → `ai`, `langgraph`, `langchain`, `rag`, `nodejs`

## Profile README (Rberr240/Rberr240)

Un dépôt spécial nommé exactement comme le compte (`Rberr240/Rberr240`) affiche
son `README.md` en haut du profil GitHub. **Ce dépôt n'existe pas encore et
n'a pas été créé automatiquement** (hors périmètre autorisé de cette mission).
Le contenu recommandé est prêt dans `GITHUB_PROFILE_README_DRAFT.md` — à créer
manuellement quand vous le souhaitez :

1. Créer un nouveau repository public nommé `Rberr240` (exactement le nom du
   compte)
2. Y ajouter un `README.md` avec le contenu de `GITHUB_PROFILE_README_DRAFT.md`
3. GitHub l'affiche automatiquement en haut du profil

## Actions nécessitant votre autorisation

- Modifier la bio / les informations du profil GitHub
- Épingler les repositories
- Ajouter des topics
- Créer le repository `Rberr240/Rberr240`
- Auditer `portail-des-savoirs` pour le même risque de secrets en clair
