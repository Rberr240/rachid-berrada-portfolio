# Rapport de préparation à la publication — GitHub + Netlify

Exécuté avec l'outillage disponible dans cet environnement (aucun accès
navigateur, `gh` CLI et `netlify` CLI non installés/authentifiés au départ).
Deux sous-étapes nécessitant une authentification humaine ont été **arrêtées
proprement**, comme demandé, avec des instructions exactes en section L.

## A. Fork/PR security check

Vérifié via l'API publique GitHub (lecture seule, aucune authentification
nécessaire pour des dépôts publics) :

| Repository | Forks | Pull requests (tous états) | Branches distantes |
|---|---|---|---|
| gestion-attestations | 0 | 0 | `main` uniquement |
| gestion-attestations-stage | 0 | 0 | `main` uniquement |
| portail-des-savoirs | 0 | 0 | `main` uniquement |

**SECURITY FOLLOW-UP CLEAR** pour les 3 dépôts — aucune référence externe
(fork ou PR) susceptible de conserver l'ancien historique compromis.

## B. Backup security status

Emplacement actuel : `C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-GIT-BACKUPS\`
— confirmé **dans un dossier synchronisé OneDrive**. Taille totale : 26 Mo
(3 mirror clones + 3 bundles + copies de dry-run, qui contiennent
intentionnellement l'ancien historique avec les anciens secrets).

**Conséquence** : ces sauvegardes se répliquent actuellement vers le cloud
Microsoft (OneDrive), ce qui étend la surface d'exposition des anciens
secrets au-delà de cette seule machine.

**Recommandation** (non exécutée, en attente d'autorisation) : déplacer ce
dossier vers un emplacement local hors synchronisation cloud, par exemple
`C:\SecureBackups\RACHID-PRO-GIT-BACKUPS\` ou tout dossier explicitement exclu
d'OneDrive. Une fois la rotation des credentials effectuée (voir
`SECRET_ROTATION_PLAN.md`), la valeur de ces sauvegardes en tant que risque
diminue fortement, mais le principe reste valable.

## C. 5 repositories non sensibles — résultat des push

Vérifications préalables effectuées pour chacun (status clean, HEAD local,
`git fetch`, comparaison avec `origin/main`) — **aucune divergence distante**
détectée sur aucun des 5 avant tentative de push.

| Repository | Commit | Résultat |
|---|---|---|
| JARVIS-V2 | `d1fbb80` | **SUCCESS** — `da3e8bc..d1fbb80 main -> main`, vérifié via `git ls-remote` |
| gold-fitness | `47ae3d9` | **FAILED** — `403 Permission denied` |
| gold-fitness-qr | `936bd1e` | **FAILED** — `403 Permission denied` |
| menu-chez-bassou | `291e7f2` | **FAILED** — `403 Permission denied` |
| lentrocote-menu | `e14c431` | **FAILED** — `403 Permission denied` |

**Cause identifiée** : `JARVIS-V2` appartient directement au compte
`Rberr240` (push réussi avec l'identité Git configurée sur cette machine —
Rachid Berrada / `rachid.berrada18@gmail.com`, credential manager Windows).
Les 4 autres appartiennent à l'**organisation GitHub `Gold-Fitness`** — les
identifiants actuellement authentifiés sur cette machine ont un accès en
**lecture seule** à cette organisation (clonage possible, push refusé).

**Action nécessaire de votre part** : vérifier que le compte GitHub
actuellement authentifié sur cette machine (ou celui associé aux identifiants
en cache) dispose bien du rôle *Write* (ou supérieur) sur l'organisation
`Gold-Fitness`, ou pousser ces 4 commits vous-même depuis un accès qui
dispose de ce droit. Les 4 commits locaux restent prêts, inchangés, dans
`RACHID-PRO-GITHUB-PREP\`.

## D. Portfolio GitHub repository

**Non créé.** Vérifié au préalable : le nom `rachid-berrada-portfolio` est
disponible sur le compte `Rberr240` (aucun dépôt existant à ce nom — requête
API publique retournant 404).

**Blocage** : la création d'un repository nécessite l'API GitHub authentifiée
en écriture. Ni `gh` CLI ni un jeton d'API (`GITHUB_TOKEN` ou équivalent) ne
sont disponibles dans cet environnement — vérifié explicitement (variables
d'environnement, CLI installées). Conformément à la consigne, cette
sous-étape est arrêtée ici plutôt que contournée. Voir section L pour la
marche à suivre exacte.

## E. GitHub remote + SHA (RACHID-pro)

Sans objet pour l'instant : aucun remote n'existe encore sur `RACHID-pro`
(dépendant de D). `git remote -v` reste vide.

## F. Netlify deployment

**Non effectué.** `netlify` CLI non installé, aucune authentification Netlify
disponible dans cet environnement (pas de jeton, pas de session CLI).
Conformément à la consigne, aucun mot de passe n'a été demandé en terminal.
Voir section L pour la marche à suivre exacte.

Préparation technique effectuée et vérifiée en revanche :
- `netlify.toml` créé (commande de build, `NODE_VERSION=20`, plugin
  `@netlify/plugin-nextjs` déclaré — géré automatiquement par Netlify au
  build, non ajouté comme dépendance npm pour ne jamais figer une version
  obsolète)
- `npm run build` local confirmé propre avec cette configuration

## G. URL publique

**Aucune URL publique n'existe.** Aucun déploiement n'a eu lieu — conforme à
la consigne de ne jamais prétendre que le site est en ligne sans l'avoir
réellement ouvert et testé.

## H. Formulaire de contact — implémenté et vérifié localement

Le formulaire a été réécrit pour Netlify Forms :

- `src/components/sections/Contact.tsx` (composant serveur) rend un formulaire
  statique caché (`hidden`) avec les mêmes champs, garantissant la détection
  par le robot de build Netlify indépendamment du rendu du composant client
- `src/components/forms/ProjectForm.tsx` (composant client) : formulaire
  interactif réel — validation, soumission `fetch` `POST` vers `/` en
  `application/x-www-form-urlencoded` avec `form-name=contact`, honeypot
  `bot-field` positionné hors écran (`tabIndex={-1}`, `autoComplete="off"`),
  état de succès/erreur réel (aucun succès simulé)
- Champs : nom, entreprise, téléphone (**facultatif**, comme demandé), email,
  type de projet, message
- Aucune clé API, aucune variable d'environnement nécessaire

**Vérifié** : après `npm run build`, les deux formulaires (statique +
interactif) sont bien présents dans le HTML généré (`.next/server/app/index.html`),
avec les mêmes noms de champs — condition nécessaire à la détection Netlify.

**Non vérifiable en conditions réelles** : Netlify Forms n'existe que sur
l'infrastructure Netlify — aucune soumission de test (`TEST PORTFOLIO — À
SUPPRIMER`) n'a donc pu être envoyée, faute de déploiement. À faire une fois
le site en ligne (voir section L).

## I. Tests desktop/mobile en ligne

**Non effectués** — nécessitent une URL publique réelle, qui n'existe pas
encore (section G). Aucun test contre une URL fictive ou supposée n'a été
réalisé.

## J. Lighthouse / PageSpeed

**Non mesurés** — même raison. Aucun score fabriqué. Les précédents scores
mesurés en local (voir `PROFESSIONALIZATION_REPORT.md`) restent la seule
donnée de performance disponible à ce stade ; ils devront être remesurés une
fois le site réellement en ligne sur Netlify.

## K. Erreurs rencontrées

- `403 Permission denied` sur les 4 dépôts de l'organisation `Gold-Fitness`
  (section C) — nécessite une vérification de permissions de votre part
- Aucun outil d'authentification GitHub (`gh`) ni Netlify (`netlify` CLI) 
  disponible dans cet environnement — installation seule ne suffit pas à
  débloquer sans une action d'authentification humaine (navigateur ou jeton)
- Découverte annexe, corrigée pendant cette phase : le mot de passe MySQL
  compromis avait été accidentellement recopié en clair dans deux rapports
  internes précédents (`PROFESSIONALIZATION_REPORT.md`,
  `FINAL_PROFESSIONALIZATION_REPORT.md`) — ces fichiers n'ont jamais été
  poussés nulle part (aucun remote n'existe sur `RACHID-pro`), donc aucune
  exposition externe n'a eu lieu ; corrigé et re-committé localement
  (`[REDACTED]`)

## L. Actions restantes nécessitant votre autorisation ou intervention

1. **Créer le repository GitHub du portfolio** — à faire manuellement :
   - Aller sur https://github.com/new
   - Nom : `rachid-berrada-portfolio`
   - Visibilité : **Public**
   - **Ne pas cocher** "Add a README file", "Add .gitignore", "Choose a license"
     (pour éviter tout conflit avec l'historique local existant)
   - Cliquer **Create repository**
   - Me confirmer une fois fait — j'ajouterai le remote et pousserai `main`
     (sans force-push)
2. **Authentifier Netlify** — une fois le repository GitHub créé :
   - Option simple (recommandée, sans CLI) : sur
     [app.netlify.com](https://app.netlify.com), **Add new site → Import an
     existing project → GitHub**, autoriser l'accès, sélectionner
     `rachid-berrada-portfolio`. Netlify détecte `netlify.toml`
     automatiquement
   - Option CLI (si vous préférez) : `npx netlify-cli login` dans un
     terminal sur votre machine (ouvre une authentification navigateur),
     puis `npx netlify-cli init` — je peux exécuter la suite si une session
     authentifiée devient disponible dans cet environnement
3. **Débloquer les 4 push Gold-Fitness** — vérifier les droits d'écriture sur
   l'organisation, ou pousser vous-même les 4 commits déjà prêts
4. Une fois Netlify connecté et le site déployé : me le signaler pour que
   j'enchaîne sur les tests en ligne, Lighthouse réel, mise à jour de
   `NEXT_PUBLIC_SITE_URL`, et test réel du formulaire (soumission
   `TEST PORTFOLIO — À SUPPRIMER`, à supprimer ensuite du dashboard Netlify
   Forms)
5. Déplacer les sauvegardes hors OneDrive (section B) — recommandé mais non
   exécuté, en attente de votre autorisation

## M. Domaine

Non configuré, comme demandé. `rachidberrada.com` reste non considéré comme
acheté. `DOMAIN_SETUP_GUIDE.md` mis à jour pour référencer Netlify (au lieu
de Vercel) en prévision, sans qu'aucune action DNS n'ait été effectuée.

## N. QR code

Non généré, comme demandé. `BUSINESS_CARD_QR_PLAN.md` mis à jour pour
référencer une éventuelle URL Netlify temporaire plutôt que Vercel.

---

# PUBLICATION BLOCKED

Le code est prêt (build/lint/TypeScript propres, formulaire Netlify Forms
implémenté et vérifié dans le HTML généré, `netlify.toml` prêt, sécurité
GitHub des 3 dépôts remédiés confirmée propre). Mais **aucune URL publique
n'existe** : la création du repository GitHub du portfolio et la connexion à
Netlify nécessitent toutes deux une authentification humaine que cet
environnement ne peut pas réaliser seul. Suivez les 2 premières actions de la
section L pour débloquer la suite — je peux enchaîner immédiatement sur les
tests en ligne, Lighthouse réel et la mise à jour de l'URL dès que le site est
déployé.
