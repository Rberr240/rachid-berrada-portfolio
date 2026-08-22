# Plan de nettoyage de l'historique Git

**Aucune réécriture d'historique n'a été exécutée. Aucun force-push n'a été
effectué.** Ce document prépare la procédure exacte pour le jour où vous
l'autoriserez.

## Pourquoi un simple commit correctif ne suffit pas

Le commit local `9cb6dfd` (`gestion-attestations`) supprime les secrets du
**HEAD**, mais tant qu'il n'est pas poussé, les secrets restent visibles dans
le commit `3077cfd` sur GitHub. Et **même après avoir poussé ce correctif**,
`3077cfd` resterait consultable dans l'historique du dépôt (`git log`,
`git show 3077cfd`, ou directement via l'URL GitHub du commit) — un secret une
fois poussé sur un dépôt public doit être considéré comme compromis
définitivement au niveau du code, quoi qu'il arrive ensuite. La rotation
(`SECRET_ROTATION_PLAN.md`) est la seule protection réelle ; le nettoyage
d'historique n'est qu'une mesure d'hygiène complémentaire (éviter qu'un secret
déjà tourné reste visible et prête à confusion).

## Portée

| Repository | Commit(s) contenant le secret | Nettoyage nécessaire |
|---|---|---|
| `gestion-attestations` | `3077cfd` (APP_KEY + DB_PASSWORD) | Oui, si vous voulez purger l'historique après avoir poussé le correctif |
| `gestion-attestations-stage` | `3f0bfc3` (DB_PASSWORD dans `create_db.php`) | Oui — aucun correctif HEAD n'existe encore pour ce dépôt (hors périmètre des phases précédentes) ; le nettoyage d'historique devra être précédé d'un correctif HEAD (retirer le mot de passe de `create_db.php`, le faire lire depuis l'environnement) |
| `portail-des-savoirs` | `0d51dc5` (DB_PASSWORD) | Oui — même remarque : correctif HEAD d'abord (aucun préparé) |

## Fichiers concernés (pour la commande de purge)

- `gestion-attestations` : `docker-compose.yml` uniquement (le secret n'existe
  que dans ce fichier, à ce commit précis)
- `gestion-attestations-stage` : `backend-laravel/create_db.php`
- `portail-des-savoirs` : `docker-compose.yml`

Chaque dépôt n'ayant qu'un seul commit d'historique avant tout correctif
(import initial en bloc), la purge revient concrètement à **réécrire ce commit
unique** pour qu'il ne contienne jamais le secret — pas une longue chaîne de
commits à traiter.

## Outil recommandé

`git filter-repo` (successeur officiel recommandé de `git filter-branch` et de
BFG Repo-Cleaner — plus rapide, plus sûr, maintenu par la communauté Git).

**Non installé sur cette machine actuellement** (`git filter-repo: command not
found`). Installation nécessaire avant exécution :

```bash
pip install git-filter-repo
# ou, sans pip : télécharger le script depuis
# https://github.com/newren/git-filter-repo et le placer dans le PATH
```

## Procédure proposée (exemple détaillé : `gestion-attestations`)

**Ne pas exécuter avant autorisation explicite.**

### 1. Sauvegarde avant toute réécriture

```bash
cd C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-GITHUB-PREP
cp -r gestion-attestations gestion-attestations-BACKUP-$(date +%Y%m%d)
```

Une copie complète du clone (avec `.git/`) avant toute opération destructive —
permet un rollback total en cas de problème.

### 2. Réécrire l'historique pour ce fichier précis

Option A — supprimer complètement `docker-compose.yml` de tout l'historique
(le fichier n'existerait alors plus du tout dans les anciens commits) :

```bash
git filter-repo --path docker-compose.yml --invert-paths --force
```

Option B — préférable ici : remplacer le contenu du fichier dans l'historique
plutôt que le supprimer, pour ne pas fausser l'historique du reste du projet.
`git filter-repo` supporte un remplacement via expressions régulières
(`--replace-text`) :

```bash
# fichier replacements.txt :
# regex:APP_KEY:\s*base64:[A-Za-z0-9+/=]+==>APP_KEY: [REDACTED]
# regex:DB_PASSWORD:\s*\S+==>DB_PASSWORD: [REDACTED]
# regex:MYSQL_ROOT_PASSWORD:\s*\S+==>MYSQL_ROOT_PASSWORD: [REDACTED]

git filter-repo --replace-text replacements.txt --force
```

L'option B est recommandée : elle neutralise le secret sans supprimer le
fichier de l'historique (préserve la lisibilité de l'historique de
développement), et couvre aussi bien `docker-compose.yml` que tout autre
fichier qui contiendrait la même chaîne.

### 3. Conséquences de cette opération

- **Réécrit le hash de tous les commits** du dépôt (même un seul commit ici,
  mais son SHA change) — `3077cfd` n'existera plus, remplacé par un nouveau
  commit avec un contenu assaini
- `git filter-repo` supprime par défaut le remote `origin` de la copie locale
  après réécriture (mesure de sécurité intégrée à l'outil, pour éviter un push
  accidentel) — il faudra le rajouter explicitement avant de pousser
- Nécessite un **force-push** (`git push --force`) pour remplacer l'historique
  sur GitHub, puisque les hashs ne correspondent plus à ceux distants

### 4. Nécessité du force-push

Oui, obligatoire pour que GitHub reflète le nouvel historique. **Un
force-push sur un dépôt avec un seul commit est le cas le moins risqué possible**
(pas de risque d'écraser le travail d'un collaborateur sur des commits
intermédiaires, puisqu'il n'y en a pas) — mais reste une opération destructive
et irréversible côté serveur une fois faite.

### 5. Impact sur les clones / forks existants

- Tout clone local existant de ce dépôt (y compris potentiellement le vôtre
  sur une autre machine) devra être re-cloné ou synchronisé avec
  `git fetch --all && git reset --hard origin/main` — un `git pull` normal
  échouera ou créera un historique divergent confus
- **Forks GitHub** : si quelqu'un a forké `gestion-attestations`, son fork
  conserve l'ancien historique (avec le secret) indépendamment de votre
  réécriture — GitHub ne propage pas les réécritures d'historique aux forks.
  Vérifier sur la page GitHub du dépôt (onglet "Forks") s'il en existe avant de
  considérer le nettoyage comme suffisant en soi (raison supplémentaire pour
  laquelle la **rotation reste indispensable**, indépendamment du nettoyage)
- GitHub peut conserver les anciens commits en cache (via son cache interne
  ou des liens directs déjà indexés/partagés) pendant une durée variable après
  un force-push — contacter le support GitHub pour une purge de cache si le
  secret a été massivement indexé (peu probable pour un dépôt personnel peu
  visité, mais à mentionner par exhaustivité)

### 6. Procédure de vérification après nettoyage

```bash
# Dans le dépôt réécrit :
git log --all --oneline                     # confirmer les nouveaux hashs
git log --all -p | grep -i "APP_KEY\|[REDACTED-DB-PASSWORD]"   # doit ne rien retourner
git show <nouveau-hash>:docker-compose.yml   # confirmer le contenu assaini

# Après push :
# Re-cloner le dépôt dans un dossier totalement neuf et refaire la même
# vérification, pour confirmer que GitHub sert bien le nouvel historique
```

## Même procédure pour `gestion-attestations-stage` et `portail-des-savoirs`

Identique dans la forme, mais nécessite d'abord un correctif du HEAD (retirer
le mot de passe en clair du code actuel — non préparé dans cette mission,
voir `SECURITY_INCIDENT_REPORT.md`) avant que le nettoyage d'historique ait un
sens : nettoyer l'historique tout en laissant le secret dans le fichier actuel
ne résout rien.

## Rappel

Aucune de ces commandes n'a été exécutée. L'installation de `git filter-repo`
n'a pas été faite. Aucune sauvegarde n'a été créée à ce stade — cette étape
elle-même ne sera faite qu'au moment de l'exécution autorisée.
