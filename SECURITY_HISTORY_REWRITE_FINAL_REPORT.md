# Rapport final — réécriture réelle des historiques GitHub

Exécutée avec autorisation explicite, sur les 3 repositories sensibles
uniquement, une fois toutes les barrières de sécurité validées. Aucune valeur
secrète complète ne figure dans ce document.

## Barrières préalables — toutes validées avant toute action

1. **Backups** : 3 mirror clones + 3 bundles vérifiés existants et intacts
   (`git fsck --full` propre, `git bundle verify` "okay" sur les 3)
2. **Clones principaux** : `git status` clean et HEAD conforme à l'attendu sur
   les 3 dépôts avant réécriture
3. **Divergence distante** : `git ls-remote` comparé au SHA attendu sur les 3
   dépôts — identique, aucune divergence détectée avant de commencer

## Tableau final — 3 repositories

| Repository | Old remote SHA | New rewritten SHA | Backup verified | Rewrite completed | git fsck | Secret scan all refs | Force-with-lease result | Fresh clone verification | Remote final SHA | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| gestion-attestations | `3077cfd2cd7e19e37371ac925637123225472987` | `bed115545d9baf29b7e7bdaddbc80ade5bca2dff` | ✅ | ✅ (texte + suppression nginx.key/crt) | ✅ propre | ✅ 0 résultat | ✅ accepté (`3077cfd...bed1155 forced update`) | ✅ propre (log, fsck, scan) | `bed115545d9baf29b7e7bdaddbc80ade5bca2dff` | **DONE** |
| gestion-attestations-stage | `3f0bfc35184f32197fe88b2a03ea9d4ab7ee6111` | `234814065b4d83a3066aee2a058e483e67df8b31` | ✅ | ✅ (texte) | ✅ propre | ✅ 0 résultat | ✅ accepté (`3f0bfc3...2348140 forced update`) | ✅ propre | `234814065b4d83a3066aee2a058e483e67df8b31` | **DONE** |
| portail-des-savoirs | `0d51dc5b6e9d778025712bffb96328ef8e56ec71` | `844706960ec75fb8dee2603ba508ce5fe8711d0f` | ✅ | ✅ (texte, DB password uniquement) | ✅ propre | ✅ 0 résultat | ✅ accepté (`0d51dc5...8447069 forced update`) | ✅ propre | `844706960ec75fb8dee2603ba508ce5fe8711d0f` | **DONE** |

Chaque `force-with-lease` a été exécuté avec le SHA distant exact comme
condition (`--force-with-lease=refs/heads/main:<ancien-SHA>`), garantissant que
Git aurait refusé le push si le remote avait changé entre la vérification et
l'exécution — ce ne fut le cas pour aucun des 3 dépôts.

Chaque fresh clone de vérification (`C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-POST-REWRITE-VERIFY\`)
a été cloné directement depuis GitHub (pas depuis un clone local), et
confirme : historique à 2 commits (ancien commit réécrit + commit correctif),
`git fsck --full` sans erreur, scan de secret sur tous les blobs de toutes les
refs sans résultat, fichiers critiques corrects (pas de `nginx.key`/`nginx.crt`
pour `gestion-attestations`, `docker-compose.yml`/`create_db.php` utilisant des
variables d'environnement partout).

## Portail-des-savoirs — règle APP_KEY respectée

Confirmé avant et après réécriture : aucun traitement d'APP_KEY appliqué à ce
dépôt (recherche `base64:` sur l'intégralité du code : aucun résultat). Le
code `decrypt()` des secrets 2FA Jetstream
(`two_factor_secret`, `two_factor_recovery_codes`) reste strictement inchangé.

## Credentials

**Mot de passe MySQL** :
**COMPROMISED / NEVER REUSE** — exposé publiquement dans 3 repositories
pendant une durée indéterminée avant correction. Ne jamais réutiliser cette
valeur, même sous forme de variante, pour quelque compte ou service que ce
soit.

**gestion-attestations APP_KEY** :
**COMPROMISED / NEVER REUSE** — exposée publiquement dans 1 repository. Une
nouvelle clé doit être générée localement (`php artisan key:generate`) au
moment de l'installation, jamais écrite dans Git — déjà documenté dans le
`.env.example` et le README de ce dépôt.

**portail-des-savoirs APP_KEY** :
**NOT EXPOSED / NOT ROTATED** — jamais trouvée en clair dans ce dépôt, à
aucun moment de l'audit ni de la réécriture. Aucune action nécessaire sur
cette clé spécifiquement.

La rotation effective de ces credentials (là où elles seraient réellement
utilisées, le cas échéant) reste une action distincte non exécutée dans cette
mission — voir `SECRET_ROTATION_PLAN.md`.

## GitHub sensitive-data follow-up

**GitHub Support purge recommended : NO** (à ce stade), avec la justification
suivante :

- Les 3 repositories sont des dépôts personnels, à faible visibilité connue
  (pas de "stars"/forks constatés lors de l'audit — voir réserve ci-dessous)
- Aucune preuve d'indexation massive ou de partage externe des anciens commits
  n'a été trouvée
- Le force-push a immédiatement remplacé les références visibles sur GitHub ;
  les objets Git orphelins (anciens commits) deviennent inaccessibles via
  l'interface normale de GitHub et sont soumis à son processus de garbage
  collection interne

**Réserve** : je n'ai pas vérifié moi-même, au moment de la rédaction, l'onglet
"Forks" de chacun des 3 dépôts sur github.com (uniquement des commandes Git en
ligne de commande ont été utilisées, pas de navigation sur l'interface web
GitHub). Si vous constatez qu'un fork existe pour l'un de ces dépôts, cette
recommandation devrait être réévaluée à **YES** pour ce dépôt spécifiquement,
puisqu'un fork conserve l'ancien historique indépendamment du force-push.
Vérification simple à faire de votre côté : consulter chaque page
`github.com/Rberr240/<repo>` → onglet "Forks".

## Nettoyage effectué

- Fichiers de remplacement temporaires (contenant les anciennes valeurs en
  clair) : créés hors Git dans un répertoire de session temporaire, utilisés,
  puis **supprimés** — confirmé absents de `RACHID-pro`, des clones, et des
  sauvegardes
- **Sauvegardes non supprimées**, comme demandé : les 3 mirror clones et les 3
  bundles restent intacts dans `C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-GIT-BACKUPS\`
- Les copies de dry-run (`DRY-RUN-TEST-COPIES\`) restent également en place —
  elles ont elles-mêmes été réécrites pendant le dry-run et ne contiennent donc
  plus les anciennes valeurs

## Repositories non concernés par cette mission

`JARVIS-V2`, `gold-fitness`, `gold-fitness-qr`, `menu-chez-bassou`,
`lentrocote-menu` : non touchés, non poussés. `JARVIS-V3` : non touché.
Portfolio `RACHID-pro` : `src/` non modifié — seul ce rapport a été ajouté.
Aucun déploiement Vercel, aucun QR code, aucune configuration de domaine.

---

# SECURITY HISTORY REMEDIATION COMPLETE

Les 3 repositories sensibles ont été réécrits, vérifiés (sauvegarde intègre,
dry-run concluant, scan de secrets propre avant et après), poussés avec un
force-push conditionnel (`--force-with-lease`) qui aurait échoué en cas de
divergence distante, puis re-vérifiés via un clone frais indépendant depuis
GitHub. Aucun secret résiduel détecté dans HEAD ni dans l'historique complet
d'aucun des 3 dépôts après remédiation.
