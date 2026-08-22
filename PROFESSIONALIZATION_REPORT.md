# Rapport de suivi — Professionnalisation du portfolio et de l'écosystème GitHub

Journal des actions et décisions de cette mission. Pour la synthèse finale
structurée, voir `FINAL_PROFESSIONALIZATION_REPORT.md`. Pour le détail de
l'audit GitHub initial (phase antérieure), voir `PORTFOLIO_GITHUB_AUDIT.md`.

Point de départ vérifié : branche `main`, commit `f424287a301d372bb1ddee626f9604ef43d20021`,
working tree clean, aucun remote — conforme à l'état attendu, aucune divergence.

## 1. Contrôle initial

`npm run lint`, `npx tsc --noEmit`, `npm run build` : ✅ tous propres avant toute
intervention. 12 routes générées (accueil + 4 case studies + SEO/OG/sitemap/robots).

## 2. Sécurité — `gestion-attestations` (clone séparé, aucun push)

Découverte **plus grave que prévu** en creusant `docker/ssl/nginx.key` : le
fichier `docker-compose.yml` contenait un vrai `APP_KEY` Laravel et un mot de
passe MySQL (`[REDACTED-DB-PASSWORD]`) **en clair**, committés publiquement. Le même mot
de passe est réutilisé dans `gestion-attestations-stage`
(`backend-laravel/create_db.php`). L'indice `APP_NAME: "Portail des Savoirs"`
dans ce même fichier suggère fortement que ce `docker-compose.yml` a été copié
depuis le dépôt `portail-des-savoirs` (non audité dans cette mission —
recommandation de vérification transmise dans `GITHUB_PROFILE_STRATEGY.md`).

Le certificat TLS (`nginx.key`/`nginx.crt`) a été confirmé : auto-signé,
CN=localhost, expire dans ~1 mois, **jamais chargé par la configuration Nginx
actuelle** (aucune directive `ssl_*` dans `docker/nginx.conf`) — fichier mort,
risque réel très faible, mais retiré par bonne pratique.

Corrections appliquées dans le clone (`RACHID-PRO-GITHUB-PREP/gestion-attestations`,
commit local `9cb6dfd`, non poussé) :
- Retrait de `nginx.key`/`nginx.crt` du suivi Git + script de régénération locale
  reproductible (`docker/ssl/generate-dev-cert.sh`)
- `docker-compose.yml` réécrit pour lire `APP_KEY`/`DB_PASSWORD` depuis un `.env`
  local non versionné, avec échec explicite au démarrage si absents
- `.env.example` et `.gitignore` mis à jour en conséquence
- README professionnel complet écrit (était absent)

⚠️ **Non fait, nécessite votre action directe** : purge de l'historique Git
(les anciens secrets restent visibles dans les commits précédents tant qu'un
`git filter-repo`/BFG + force-push n'est pas effectué — décision et exécution
explicitement hors périmètre de cette mission) et rotation de l'`APP_KEY`/mot de
passe partout où ils auraient pu être réellement réutilisés.

## 3. README premium — repositories audités

Tous préparés en clones séparés (`RACHID-PRO-GITHUB-PREP/`), commits locaux
uniquement, aucun push :

| Repo | Commit local | Contenu |
|---|---|---|
| gestion-attestations | `9cb6dfd` | README complet + correctifs sécurité ci-dessus |
| JARVIS-V2 | `d1fbb80` | README honnête (voir section 4) + `.env.example` |
| gold-fitness | `47ae3d9` | README complet + captures réelles intégrées |
| gold-fitness-qr | `936bd1e` | README court expliquant le rôle de redirecteur |
| menu-chez-bassou | `291e7f2` | README avec statut honnête (voir section 5) |
| lentrocote-menu | `e14c431` | Correctif images cassées + README diagnostic |

## 4. Découverte majeure — JARVIS-V2 : modules vides vs implémentés

En auditant JARVIS-V2 en détail (tailles de fichiers, pas seulement leur
présence), découverte que de nombreux fichiers listés dans l'audit précédent
comme "modules" sont en réalité **vides (0 octet)** : tous les fichiers de
`core/agents/` (coding, devops, media, memory, planner, research, vision, voice),
tout `core/autonomy/` (goalManager, reflectionEngine, selfImprover, taskExecutor,
taskPlanner), `core/integrations/` (email, whatsapp), la majorité de
`core/tools/` et `core/media/`, et 17 des 20 documents `docs/architecture/`.

Ce qui est réellement implémenté et vérifié (fichiers non vides, logique
présente) : l'orchestrateur LangGraph (`mainGraph.js`, `router.js`,
`taskDispatcher.js`), un système de mémoire complet (SQLite + Qdrant + RAG), un
pipeline voix fonctionnel (wake word, Whisper, TTS), un pipeline vision (OCR,
capture d'écran, Gemini Vision), un portail de sécurité (gate/permissions), et
un gestionnaire d'outils générique.

**Conséquence directe sur le portfolio canonique** (`RACHID-pro`) : la case
study JARVIS affirmait « Agents spécialisés : recherche, code, vision, voix,
DevOps, média » et « Modules d'autonomie : planification, réflexion,
auto-amélioration » comme s'ils étaient implémentés — ce qui était inexact.
**Corrigé** dans `src/data/profile.ts` : le texte décrit désormais uniquement
l'orchestrateur multi-modèles, la mémoire vectorielle/RAG, et les pipelines
voix/vision réellement présents. Voir le diff dans le second commit du
portfolio (section 8).

## 5. Autres audits

- **menu-chez-bassou** : recommandation **B — bon mais à améliorer**.
  Fonctionnel et présentable, mais numéro de téléphone placeholder
  (`+212 6 00 00 00 00`) et icônes réseaux sociaux non fonctionnelles (`href="#"`)
  à corriger avant tout usage portfolio. Non ajouté à la homepage (choix
  éditorial, portfolio volontairement resserré à 4 projets diversifiés).
- **lentrocote-menu** : diagnostic précis des images cassées — 2 balises
  `<img>` utilisaient un antislash (`image\sandwitch.jpg`) au lieu d'un slash,
  invalide sur le web. Corrigé dans le clone. Aucune coordonnée de contact sur
  la page — reste le point bloquant avant tout usage portfolio.
- **gestion-attestations-stage** : mêmes fonctionnalités que
  `gestion-attestations` (mêmes contrôleurs), version antérieure/scolaire sans
  Docker ni CI/CD. Recommandation : **KEEP** pour l'instant (voir justification
  dans `FINAL_PROFESSIONALIZATION_REPORT.md`).
- **Repositories privés** (JARVIS-V3, JARVIS-MASTER-EXECUTION-PLAN,
  JARVIS-V3.gitt, JARVIS-CLAUDE-BERR) : **non audités en détail** dans cette
  mission, conformément à la consigne. Recommandations de gouvernance
  basées uniquement sur les noms, dans `GITHUB_PROFILE_STRATEGY.md`.

## 6. Portfolio — audit visuel (Phase 13)

Revue Hero / Réalisations / CTA / mobile / cohérence inter-pages : aucun
problème réel supplémentaire observé au-delà de la correction JARVIS
(section 4). Le Hero communique en moins de 10 secondes qui est Rachid, son
titre, son positionnement (Web/Apps/IA/Automatisation) et le moyen de contact.
Les 4 réalisations sont clairement différenciées (catégories, badges de statut,
visuels distincts). CTA WhatsApp visible mais non intrusif. Mobile vérifié en
priorité (390×844).

## 7. Formulaire, Vercel, domaine, QR — documentation

- **Formulaire** : recommandation Formspree (comparatif dans `README.md`
  section 3) — gratuit jusqu'à 50 envois/mois, zéro code à ajouter à
  l'architecture existante. Aucun compte créé, aucune clé ajoutée.
- **Vercel** : checklist de préparation vérifiée et documentée (`README.md`
  section 6) — aucun déploiement réel effectué.
- **Domaine** : `DOMAIN_SETUP_GUIDE.md` créé (10 étapes, `rachidberrada.com` non
  acheté, aucun DNS configuré).
- **QR carte de visite** : `BUSINESS_CARD_QR_PLAN.md` créé (stratégie,
  spécifications d'impression, tests requis) — aucun QR généré.
- **Profil GitHub** : `GITHUB_PROFILE_STRATEGY.md` et
  `GITHUB_PROFILE_README_DRAFT.md` créés — aucune modification appliquée sur
  GitHub, aucun repository créé.

## 8. Tests finaux (portfolio canonique, après toutes les corrections)

- `npm run lint`, `npx tsc --noEmit`, `npm run build` : ✅ propres
- Lighthouse (serveur de production local) : Accessibilité/Bonnes
  pratiques/SEO **100/100** sur toutes les pages testées (accueil, Gold Fitness,
  JARVIS) ; Performance desktop 98/100, mobile 57-75/100 (throttling CPU simulé
  sur cette VM locale — poids de page inchangé à 248 Ko, aucune régression
  détectée par rapport à l'audit précédent)
- Playwright (mobile 390×844 + desktop 1440×900) : 0 erreur console, 0 erreur
  page, 0 requête échouée, 0 image cassée sur les 8 pages testées (accueil + 4
  case studies × 2 formats) ; navigation retour, menu mobile, liens
  WhatsApp/email/GitHub tous vérifiés ; site Gold Fitness en ligne confirmé
  accessible (200)
- Sécurité : `git ls-files` audité intégralement, aucun secret détecté,
  `.env.example` confirmé sans valeur sensible, aucun `.env`/`.env.local` réel
  sur le disque

## 9. Second checkpoint Git

Voir `git log` — commit créé uniquement après validation de tous les tests
ci-dessus, sur la branche `main` existante, sans modifier ni amender le commit
`f424287`. Détail dans `FINAL_PROFESSIONALIZATION_REPORT.md`, section B.
