# Rapport de dry-run — réécriture d'historique Git

**Exécuté uniquement sur des copies de test, jamais sur les clones principaux
ni sur les dépôts distants.** Aucun push, aucun force-push. Les copies de test
restent disponibles pour votre propre inspection à :

```
C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-GIT-BACKUPS\DRY-RUN-TEST-COPIES\
  gestion-attestations-TEST\
  gestion-attestations-stage-TEST\
  portail-des-savoirs-TEST\
```

## 1. Règle APP_KEY respectée

`portail-des-savoirs` n'a **pas** été concerné par une rotation ou un
remplacement d'APP_KEY — seul son mot de passe MySQL a été traité. Aucune
APP_KEY n'a été touchée dans ce dépôt, conformément à l'instruction (elle
n'a jamais été exposée, et ce dépôt utilise `decrypt()` pour les secrets 2FA
Jetstream — une rotation non nécessaire aurait pu les rendre illisibles).

## 2. Anciennes valeurs traitées comme définitivement compromises

L'ancien mot de passe MySQL et l'ancienne APP_KEY de `gestion-attestations`
sont traités comme compromis dans tous les documents de cette mission —
jamais réaffichés en clair, toujours `[REDACTED]` ou équivalent masqué dans
les rapports et fichiers de remplacement (ces derniers ont été supprimés après
utilisation, comme demandé).

## 3. Vérification d'infrastructure distante — verdict par credential

Recherche effectuée sur les fichiers/configurations des 3 dépôts (fichiers de
déploiement, workflows GitHub Actions, hostnames non locaux, mots-clés de
fournisseurs cloud) — **aucune connexion externe effectuée**.

| Credential | Repositories | Résultat de la recherche | Verdict |
|---|---|---|---|
| Mot de passe MySQL | portail-des-savoirs, gestion-attestations, gestion-attestations-stage | Aucun fichier de déploiement (`vercel.json`, `Procfile`, `render.yaml`, `fly.toml`…) ; aucun hostname distant ; `DB_HOST`/`APP_URL` pointent uniquement vers `db`, `mysql`, `127.0.0.1`, `localhost` | **LOCAL_DEV_ONLY** (d'après le code — voir réserve ci-dessous) |
| APP_KEY Laravel | gestion-attestations | `APP_URL: http://localhost:3000`, `APP_ENV: local` ; aucun fichier de déploiement ; workflow CI (`ci-cd.yml`) ne référence aucun `secrets.*` | **LOCAL_DEV_ONLY** (d'après le code) |

**Réserve importante, conforme à la consigne** : ce verdict reflète uniquement
ce que le code indique. Il ne prouve pas l'absence d'un usage réel ailleurs
(compte personnel, autre machine, service non référencé dans ce code). **Aucune
infrastructure distante n'a été trouvée** — mais l'ancienne valeur reste
définitivement compromise et ne doit jamais être réutilisée, indépendamment de
ce verdict.

## 4. Confirmation finale — absence de `Crypt::` dans gestion-attestations

Recherche relancée (`Crypt::`, `encrypt(`, `decrypt(`, cast `encrypted`) :
seule occurrence trouvée = l'enregistrement standard de la façade `Crypt` dans
`config/app.php` (présent par défaut dans toute installation Laravel). Aucun
appel réel dans le code applicatif. **Classement confirmé : A — aucune donnée
persistante chiffrée détectée.**

Une nouvelle APP_KEY pour les futures installations **n'a pas été écrite dans
Git** — elle doit être générée à l'installation via `php artisan key:generate`
(déjà documenté dans le README du dépôt et dans `.env.example`, qui ne contient
qu'un champ vide `APP_KEY=`).

## 5. Mot de passe MySQL — placeholders confirmés sûrs

Vérifié dans les 3 dépôts : chaque `.env.example` / `docker-compose.yml`
utilise un placeholder non-secret (`changez-moi-avant-de-lancer-docker-compose`
ou variable requise sans valeur par défaut). Aucune nouvelle valeur réelle
n'a été versionnée nulle part.

## 6. Sauvegardes — exécutées

| Repository | Mirror backup | Bundle | `git fsck --full` |
|---|---|---|---|
| gestion-attestations | ✅ `gestion-attestations-MIRROR-BACKUP/` | ✅ `gestion-attestations-20260822-163410.bundle` | ✅ propre |
| gestion-attestations-stage | ✅ `gestion-attestations-stage-MIRROR-BACKUP/` | ✅ `gestion-attestations-stage-20260822-163411.bundle` | ✅ propre |
| portail-des-savoirs | ✅ `portail-des-savoirs-MIRROR-BACKUP/` | ✅ `portail-des-savoirs-20260822-163411.bundle` | ✅ propre |

Emplacement : `C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-GIT-BACKUPS\`
(HEAD, branches, tags, remote, horodatage détaillés dans
`BACKUP_MANIFEST.md` à cet emplacement).

## 7. Installation de git-filter-repo

Installée via `pip3 install git-filter-repo` (installation standard,
réversible — `pip3 uninstall git-filter-repo` pour revenir en arrière — ne
modifie aucun dépôt). Version confirmée fonctionnelle
(`git-filter-repo.exe` présent et exécutable).

## 8. Fichiers de remplacement

Préparés dans un répertoire temporaire hors Git (répertoire de session,
jamais dans `RACHID-pro` ni dans les clones), un fichier par dépôt concerné,
utilisant le format `--replace-text` de `git filter-repo`. **Supprimés
immédiatement après le dry-run** (plus aucune trace de ces fichiers sur le
disque). Aucune valeur réelle n'a été committée nulle part pendant leur
préparation.

Portée couverte :
- Remplacement de l'ancien mot de passe DB dans les 3 dépôts
- Remplacement de l'ancienne APP_KEY dans `gestion-attestations` uniquement
- Suppression complète de `docker/ssl/nginx.key` et `nginx.crt` de tout
  l'historique de `gestion-attestations` (fichiers entiers retirés, et non un
  simple masquage — il s'agit de clés binaires, pas de code utile à
  préserver)

Aucun fichier métier n'a été supprimé en entier ailleurs — seules les valeurs
secrètes ont été remplacées en place dans `docker-compose.yml` et
`create_db.php`, qui conservent tout leur code utile.

## 9. Dry-run — résultats détaillés

Exécuté sur des copies fraîches clonées depuis les mirror backups (jamais
depuis les clones principaux).

| Repository | `git log --all` | Branches | Tags | `fsck --full` | Scan secret (tous blobs, toutes refs) | Contenu vérifié |
|---|---|---|---|---|---|---|
| gestion-attestations-TEST | 2 commits préservés (hashs changés) | `main` préservée | Aucun (identique à l'original) | ✅ propre | ✅ 0 résultat | ✅ `APP_KEY`/`DB_PASSWORD`/`MYSQL_ROOT_PASSWORD` correctement masqués ; `nginx.key`/`nginx.crt` absents de l'arbre de l'ancien commit |
| gestion-attestations-stage-TEST | 2 commits préservés | `main` préservée | Aucun | ✅ propre | ✅ 0 résultat | ✅ `create_db.php` reste un PHP valide, mot de passe masqué |
| portail-des-savoirs-TEST | 2 commits préservés | `main` préservée | Aucun | ✅ propre | ✅ 0 résultat | ✅ `MYSQL_ROOT_PASSWORD` correctement masqué |

Le scan de secrets a été exécuté sur **chaque blob de chaque référence** (pas
seulement HEAD) via `git rev-list --all --objects` + inspection de contenu —
recherche de l'ancien mot de passe, de l'ancienne APP_KEY, de motifs
`PRIVATE KEY`, et des motifs de tokens connus. Zéro résultat dans les 3 dépôts
de test.

## 10. Aucun force-push

Confirmé : aucune commande de push n'a été exécutée à aucun moment. Les copies
de test n'ont d'ailleurs plus de remote `origin` configuré (retiré
automatiquement par `git filter-repo` par mesure de sécurité intégrée à
l'outil).

---

## Tableau final

| Repository | Backup créé ? | Credential live/local/unknown ? | HEAD propre ? | Historique original contaminé ? | Dry-run effectué ? | Secret scan après rewrite ? | `git fsck` ? | Branches préservées ? | Tags préservés ? | Prêt pour force-push ? |
|---|---|---|---|---|---|---|---|---|---|---|
| gestion-attestations | ✅ | LOCAL_DEV_ONLY (les deux credentials) | ✅ (`9cb6dfd`) | Oui (`3077cfd`) | ✅ | ✅ propre | ✅ propre | ✅ | ✅ (aucun) | Techniquement oui — **en attente de votre autorisation** |
| gestion-attestations-stage | ✅ | LOCAL_DEV_ONLY | ✅ (`d56a9fa`) | Oui (`3f0bfc3`) | ✅ | ✅ propre | ✅ propre | ✅ | ✅ (aucun) | Techniquement oui — **en attente de votre autorisation** |
| portail-des-savoirs | ✅ | LOCAL_DEV_ONLY | ✅ (`d83bc19`) | Oui (`0d51dc5`) | ✅ | ✅ propre | ✅ propre | ✅ | ✅ (aucun) | Techniquement oui — **en attente de votre autorisation** |

---

# READY FOR HISTORY REWRITE AUTHORIZATION

Le dry-run est complet et vérifié avec succès sur les 3 dépôts, sur des copies
de test isolées, à partir de sauvegardes intègres. Rien n'a été appliqué aux
clones principaux ni aux dépôts distants. La réécriture réelle (sur les clones
principaux, suivie d'un force-push) reste entièrement soumise à votre
autorisation explicite — y compris le choix de l'ordre par rapport à la
rotation des credentials (voir `SECRET_ROTATION_PLAN.md`, qui recommande la
rotation **avant** la réécriture d'historique, jamais l'inverse).
