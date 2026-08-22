# Checklist de sauvegarde avant réécriture d'historique Git

À exécuter intégralement, pour chacun des 3 dépôts concernés, **avant** toute
commande `git filter-repo`. Rien de ce qui suit n'a été exécuté — les valeurs
ci-dessous (HEAD, branches, tags) sont l'état réel constaté au moment de la
rédaction de ce document, à titre de référence de restauration.

## État de référence actuel (avant toute réécriture)

| Repository | HEAD local actuel | Branches | Tags | Remote origin |
|---|---|---|---|---|
| gestion-attestations | `9cb6dfda24dde2f2fa04148da241ce322718e78c` | `main` uniquement | Aucun | `https://github.com/Rberr240/gestion-attestations.git` |
| gestion-attestations-stage | `d56a9faa718f0a4028b9808587be833ec1251939` | `main` uniquement | Aucun | `https://github.com/Rberr240/gestion-attestations-stage.git` |
| portail-des-savoirs | `d83bc193477c9c1bcb4602f8ad2c11cdb999d4dd` | `main` uniquement | Aucun | `https://github.com/Rberr240/portail-des-savoirs.git` |

Un seul branche (`main`) et aucun tag dans les 3 dépôts — simplifie
considérablement la sauvegarde et la réécriture (pas de références multiples à
traiter).

## Étape 1 — Sauvegarde locale complète (mirror clone)

Pour chaque dépôt, créer un clone miroir séparé — capture toutes les
références (branches, tags, HEAD) telles qu'elles sont actuellement, y compris
les commits locaux non poussés (`9cb6dfd`, `d56a9fa`, `d83bc19`) :

```bash
cd C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-GITHUB-PREP

git clone --mirror gestion-attestations gestion-attestations-MIRROR-BACKUP
git clone --mirror gestion-attestations-stage gestion-attestations-stage-MIRROR-BACKUP
git clone --mirror portail-des-savoirs portail-des-savoirs-MIRROR-BACKUP
```

## Étape 2 — Sauvegarde alternative en bundle (fichier unique portable)

Un bundle est un seul fichier contenant tout l'historique — plus simple à
archiver/déplacer qu'un dossier `.git` complet :

```bash
cd C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-GITHUB-PREP

git -C gestion-attestations bundle create ../backups/gestion-attestations-$(date +%Y%m%d).bundle --all
git -C gestion-attestations-stage bundle create ../backups/gestion-attestations-stage-$(date +%Y%m%d).bundle --all
git -C portail-des-savoirs bundle create ../backups/portail-des-savoirs-$(date +%Y%m%d).bundle --all
```

Restauration depuis un bundle, si nécessaire :
```bash
git clone chemin/vers/le-fichier.bundle nom-du-dossier-restaure
```

## Étape 3 — Enregistrer les hash de référence (déjà fait ci-dessus)

Les hash HEAD actuels sont documentés dans le tableau en haut de ce document.
Après toute réécriture, ils serviront à confirmer que la sauvegarde mirror/
bundle correspond bien à l'état pré-réécriture attendu :

```bash
git -C gestion-attestations-MIRROR-BACKUP rev-parse HEAD
# doit afficher 9cb6dfda24dde2f2fa04148da241ce322718e78c
```

## Étape 4 — Vérifier l'intégrité de la sauvegarde

```bash
git -C gestion-attestations-MIRROR-BACKUP fsck --full
git -C gestion-attestations-stage-MIRROR-BACKUP fsck --full
git -C portail-des-savoirs-MIRROR-BACKUP fsck --full
```

Doit retourner sans erreur avant de considérer la sauvegarde fiable.

## Checklist finale avant d'autoriser `git filter-repo`

- [ ] Mirror clone créé pour les 3 dépôts (Étape 1)
- [ ] Bundle créé pour les 3 dépôts, stocké dans un emplacement distinct du
      dossier de travail (Étape 2)
- [ ] `git fsck --full` sans erreur sur les 3 mirrors (Étape 4)
- [ ] Hash HEAD des mirrors vérifiés conformes au tableau ci-dessus
- [ ] Décision prise sur la rotation des credentials (voir
      `SECRET_ROTATION_PLAN.md`) — **la rotation doit précéder la réécriture
      d'historique**, jamais l'inverse
- [ ] Vérification qu'aucun fork public connu n'existe pour ces 3 dépôts
      (page GitHub, onglet "Forks") — si des forks existent, la réécriture
      d'historique seule ne suffira pas à protéger le secret qui y resterait
      visible

Seulement une fois ces cases cochées : passer à `GIT_HISTORY_CLEANUP_PLAN.md`
pour la procédure de réécriture elle-même.
