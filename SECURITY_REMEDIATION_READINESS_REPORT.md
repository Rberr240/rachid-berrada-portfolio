# Rapport de préparation à la remédiation de sécurité

État constaté après audit complet (containment) et préparation des correctifs
(cette phase). **Aucune action distante n'a été effectuée** : aucun push,
aucun force-push, aucune rotation de credential, aucun déploiement.

## Réponses directes

### 1. Les 3 HEAD sensibles sont-ils maintenant propres ?

**Oui, les trois.** Vérifié par scan de secrets après correctif :

- `gestion-attestations` (`9cb6dfd`) — confirmé propre (re-vérifié dans cette
  phase, aucune régression)
- `gestion-attestations-stage` (`d56a9fa`) — corrigé dans cette phase
  (mot de passe retiré de `create_db.php`, `frontend-react/.env` retiré du
  suivi après vérification de son contenu — non sensible)
- `portail-des-savoirs` (`d83bc19`) — corrigé dans cette phase (mot de passe
  MySQL retiré de `docker-compose.yml`)

### 2. Les secrets existent-ils encore dans l'historique ?

**Oui, dans les trois dépôts, tant qu'aucune réécriture n'est effectuée** —
et même après réécriture, tant qu'aucun push (avec force) n'a remplacé
l'historique distant sur GitHub :

- `gestion-attestations` : commit `3077cfd`
- `gestion-attestations-stage` : commit `3f0bfc3`
- `portail-des-savoirs` : commit `0d51dc5`

Chaque dépôt n'a qu'un seul commit d'historique avant son correctif — la
réécriture, le jour où elle sera autorisée, sera donc simple (un seul commit à
assainir par dépôt).

### 3. Quelle credential doit être rotatée ?

- **Mot de passe MySQL** (`[REDACTED]`) — dans les 3 dépôts. Priorité haute
  (réutilisé 3 fois).
- **APP_KEY Laravel** (`[REDACTED]`) — uniquement dans `gestion-attestations`.
  Classement A confirmé (aucun usage `Crypt::`/`encrypt`/`decrypt` détecté
  dans le code de ce dépôt précis) : rotation sans migration de données
  nécessaire.

Détail complet, questions préalables et ordre exact dans
`SECRET_ROTATION_PLAN.md`.

### 4. Quels repositories doivent subir un rewrite d'historique ?

Les trois : `gestion-attestations`, `gestion-attestations-stage`,
`portail-des-savoirs`. Procédure exacte (commandes `git filter-repo` par
dépôt, limites de l'outil, impact forks/clones) dans
`GIT_HISTORY_CLEANUP_PLAN.md`. Sauvegarde préalable obligatoire :
`PRE_REWRITE_BACKUP_CHECKLIST.md`.

### 5. Quels commits locaux sont prêts ?

Voir tableau complet ci-dessous — **8 commits locaux prêts** sur 8 dépôts
audités, aucun poussé.

### 6. Quelles actions distantes restent nécessaires ?

Voir section "Actions nécessitant votre autorisation" en fin de document.

---

## Tableau complet — 8 repositories

| Repository | HEAD local | Working tree | Secret dans HEAD ? | Secret historique ? | Correctif local ? | Commit | Rotation nécessaire ? | History rewrite nécessaire ? | Verdict |
|---|---|---|---|---|---|---|---|---|---|
| portail-des-savoirs | `d83bc19` | clean | Non (corrigé) | **Oui** (`0d51dc5`) | ✅ | `d83bc19` | Oui (mot de passe DB) | Oui | SAFE HEAD / HISTORY BLOCKED |
| gestion-attestations | `9cb6dfd` | clean | Non (corrigé) | **Oui** (`3077cfd`) | ✅ | `9cb6dfd` | Oui (mot de passe DB + APP_KEY) | Oui | SAFE HEAD / HISTORY BLOCKED |
| gestion-attestations-stage | `d56a9fa` | clean | Non (corrigé) | **Oui** (`3f0bfc3`) | ✅ | `d56a9fa` | Oui (mot de passe DB) | Oui | SAFE HEAD / HISTORY BLOCKED |
| JARVIS-V2 | `d1fbb80` | clean | Non — jamais trouvé | Non | ✅ (README) | `d1fbb80` | Non | Non | SAFE TO PUSH |
| gold-fitness | `47ae3d9` | clean | Non — jamais trouvé | Non | ✅ (README) | `47ae3d9` | Non | Non | SAFE TO PUSH |
| gold-fitness-qr | `936bd1e` | clean | Non — jamais trouvé | Non | ✅ (README) | `936bd1e` | Non | Non | SAFE TO PUSH |
| menu-chez-bassou | `291e7f2` | clean | Non — jamais trouvé | Non | ✅ (README) | `291e7f2` | Non | Non | SAFE TO PUSH |
| lentrocote-menu | `e14c431` | clean | Non — jamais trouvé | Non | ✅ (README + fix images) | `e14c431` | Non | Non | SAFE TO PUSH |

**Nuance importante** : "SAFE HEAD / HISTORY BLOCKED" signifie que le code
actuel (HEAD) peut être poussé sans exposer de nouveau secret — mais que le
dépôt distant réel continuera d'exposer l'ancien secret dans son historique
tant que la réécriture n'est pas faite. Pousser le correctif HEAD est donc une
amélioration réelle (le secret n'apparaît plus dans les nouveaux commits), mais
**ne résout pas l'exposition historique**, qui nécessite la procédure de
`GIT_HISTORY_CLEANUP_PLAN.md`.

## Repositories non sensibles — reconfirmation

`JARVIS-V2`, `gold-fitness`, `gold-fitness-qr`, `menu-chez-bassou`,
`lentrocote-menu` : aucun secret trouvé à aucun moment de l'audit (HEAD ou
historique). **SAFE TO PUSH.** Non poussés dans cette mission, comme demandé.

## Repositories non audités dans cette mission

`JARVIS-V3`, `JARVIS-MASTER-EXECUTION-PLAN`, `JARVIS-V3.gitt`,
`JARVIS-CLAUDE-BERR` (privés, non touchés), `bibliotheque-electronique`
(public, jamais audité — nom évocateur d'une possible origine commune avec
`portail-des-savoirs`, à vérifier si vous le souhaitez).

## Portfolio (RACHID-pro)

`src/` non modifié dans cette phase (vérifié). Seuls des documents de sécurité
ont été ajoutés — commit local séparé, sans toucher aux commits précédents
(voir `git log` pour le détail).

---

## Actions nécessitant votre autorisation

1. **Rotation** du mot de passe MySQL (3 dépôts) et de l'APP_KEY
   (`gestion-attestations`) — voir questions préalables dans
   `SECRET_ROTATION_PLAN.md`
2. **Push** des 3 correctifs HEAD sécurité (`gestion-attestations`,
   `gestion-attestations-stage`, `portail-des-savoirs`) — améliore le HEAD
   distant sans résoudre l'historique
3. **Push** des 5 correctifs non sensibles (`JARVIS-V2`, `gold-fitness`,
   `gold-fitness-qr`, `menu-chez-bassou`, `lentrocote-menu`)
4. **Sauvegarde** avant réécriture (`PRE_REWRITE_BACKUP_CHECKLIST.md`) — sans
   risque en soi, mais à faire seulement si une réécriture est envisagée
5. **Réécriture d'historique** (`git filter-repo`) pour les 3 dépôts sensibles
   — nécessite l'installation préalable de l'outil (non fait)
6. **Force-push** consécutif à la réécriture, pour les 3 dépôts sensibles
7. **Audit complémentaire éventuel** de `bibliotheque-electronique`

---

# READY FOR CREDENTIAL ROTATION

Les 3 dépôts sensibles ont un correctif HEAD prêt, testé (scan de secrets
propre), committé localement. La cartographie de l'exposition (HEAD +
historique), l'analyse d'impact de l'APP_KEY, le plan de rotation détaillé et
la procédure de nettoyage d'historique (avec sauvegarde) sont tous documentés
et prêts. Il ne manque que votre décision sur l'ordre et le calendrier
d'exécution des actions listées ci-dessus — rien n'a été exécuté à distance.
