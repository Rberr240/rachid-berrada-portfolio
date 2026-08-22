# Rapport d'incident de sécurité — secrets exposés publiquement

Audit en lecture seule effectué sur des clones locaux séparés
(`C:\Users\majdl\OneDrive\Desktop\RACHID-PRO-GITHUB-PREP\`), aucune modification
distante. **Aucune valeur secrète complète n'est reproduite dans ce document** —
toutes les valeurs sont indiquées `[REDACTED]`.

## Résumé exécutif

Deux familles de secrets réels ont été trouvées, toutes deux dans des
repositories **publics** sur GitHub :

1. Un mot de passe MySQL en clair, **réutilisé dans 3 repositories publics**.
2. Une clé de chiffrement Laravel (`APP_KEY`) en clair, présente dans **1 seul**
   des repositories publics.

Aucune clé API de service tiers (OpenAI, AWS, Stripe, etc.), aucun token
d'accès, aucun certificat de production n'a été trouvé. Le certificat TLS
`nginx.key` déjà traité dans une phase précédente est un cas distinct, à risque
réel très faible (voir `PORTFOLIO_GITHUB_AUDIT.md` / `PROFESSIONALIZATION_REPORT.md`
pour son détail — non repris ici).

## Secret A — Mot de passe MySQL (`DB_PASSWORD` / `MYSQL_ROOT_PASSWORD`)

**Valeur** : `[REDACTED]` (chaîne de caractères, motif personnel — nom +
chiffres + symbole)

| Champ | Détail |
|---|---|
| Repositories concernés | `portail-des-savoirs`, `gestion-attestations`, `gestion-attestations-stage` |
| Fichiers | `portail-des-savoirs/docker-compose.yml` ; `gestion-attestations/docker-compose.yml` (avant correctif local) ; `gestion-attestations-stage/backend-laravel/create_db.php` |
| Branches | `main` dans les 3 cas (seule branche existante dans chaque dépôt) |
| Présence dans HEAD actuel (dépôt distant réel) | **Oui, dans les 3 dépôts** — le correctif de `gestion-attestations` n'existe que localement (commit `9cb6dfd`, non poussé) |
| Présence dans HEAD du clone corrigé | Retiré uniquement dans le clone local de `gestion-attestations` |
| Premier commit connu | `portail-des-savoirs` : `0d51dc5` ("Initial commit") ; `gestion-attestations` : `3077cfd` ; `gestion-attestations-stage` : `3f0bfc3` — **chaque dépôt n'a qu'un seul commit d'origine** (import initial en bloc, pas d'historique incrémental), donc impossible de dater précisément lequel des trois a été écrit en premier ; l'indice le plus fort (nom `APP_NAME: "Portail des Savoirs"` retrouvé tel quel dans le `docker-compose.yml` de `gestion-attestations`) indique que **`portail-des-savoirs` est très probablement la source**, copiée ensuite vers les deux autres projets |
| Réutilisation confirmée | Oui — valeur identique caractère pour caractère dans les 3 dépôts |
| Niveau de risque | **Élevé** si ce mot de passe est également utilisé sur une base de données réelle (hors dev local) ou réutilisé pour d'autres comptes personnels ; **modéré à faible** s'il n'a jamais servi qu'à des conteneurs MySQL locaux jetables — statut à confirmer par vous (voir `SECRET_ROTATION_PLAN.md`) |
| Action recommandée | Rotation immédiate partout où ce mot de passe (ou une variante proche) pourrait être réellement utilisé, même hors de ces 3 dépôts ; ne plus jamais le committer ; voir plan de rotation |

## Secret B — Clé d'application Laravel (`APP_KEY`)

**Valeur** : `[REDACTED]` (chaîne `base64:...`, 32 octets — format `APP_KEY`
Laravel standard)

| Champ | Détail |
|---|---|
| Repository concerné | **`gestion-attestations` uniquement** — recherchée et **non trouvée** dans `portail-des-savoirs` ni `gestion-attestations-stage` (vérifié explicitement : ni dans leur `docker-compose.yml`, ni dans un `.env` tracké, ni ailleurs) |
| Fichier | `docker-compose.yml`, service `laravel`, variable d'environnement `APP_KEY` |
| Branche | `main` (seule branche du dépôt) |
| Présence dans HEAD actuel (dépôt distant réel) | **Oui** — le correctif n'existe que localement (commit `9cb6dfd`, non poussé) |
| Présence dans HEAD du clone corrigé | Retiré (variable désormais requise via `.env` local, non versionné) |
| Premier commit connu | `3077cfd` ("Initial commit - projet React + Laravel + Docker + CI/CD") — commit unique d'import initial, pas d'historique antérieur dans ce dépôt |
| Réutilisation ailleurs | Aucune trouvée dans les 2 autres dépôts audités. Non vérifiable au-delà de ces 3 dépôts (hors périmètre d'audit) |
| Niveau de risque | **Élevé si l'application a réellement tourné avec cette clé sur des données autres que des données de test jetables** — voir l'explication détaillée de l'impact dans `SECRET_ROTATION_PLAN.md` (chiffrement, sessions, cookies) |
| Action recommandée | Rotation avant toute réutilisation de ce projet avec des données réelles ; voir plan de rotation |

## Ce qui n'a PAS été trouvé (pour clarté)

- Aucune clé API tierce (OpenAI, Anthropic, Google, AWS, Stripe, Twilio…) en
  clair dans les 3 dépôts audités dans cette phase
- Aucun token OAuth, JWT secret applicatif (au-delà d'`APP_KEY` qui sert aussi
  de base à la signature de session Laravel), ou clé SSH
- Aucun fichier `.env` réel (non-`.example`) tracké dans `portail-des-savoirs`
  ou `gestion-attestations-stage`
- Le mot de passe MySQL n'apparaît dans aucun autre type de fichier que ceux
  listés ci-dessus (pas dans de la documentation, des captures, des logs
  committés, etc.)

## Repositories non audités dans cette phase

`JARVIS-V3`, `JARVIS-MASTER-EXECUTION-PLAN`, `JARVIS-V3.gitt`,
`JARVIS-CLAUDE-BERR` (privés, non touchés conformément à la consigne),
`bibliotheque-electronique` (non mentionné comme suspect, hors périmètre de
cette mission). Si `bibliotheque-electronique` provient de la même base que
`portail-des-savoirs` (nom évocateur similaire), il mérite la même vérification
— non faite ici.

## Classement de sécurité

**`portail-des-savoirs` : SECURITY BLOCKER** — contient un secret réel non
corrigé sur son HEAD distant réel (aucun correctif local préparé pour ce dépôt
dans cette mission, à la différence de `gestion-attestations`).

**`gestion-attestations` (dépôt distant réel) : SECURITY BLOCKER** — secrets
encore présents sur GitHub tant que le correctif local n'est pas poussé.

**`gestion-attestations-stage` (dépôt distant réel) : SECURITY BLOCKER** —
mot de passe réutilisé toujours présent, aucun correctif préparé (hors
périmètre des phases précédentes, qui ne demandaient qu'une recommandation
KEEP/ARCHIVE pour ce dépôt).

Voir `SECRET_ROTATION_PLAN.md` pour la marche à suivre et
`GIT_HISTORY_CLEANUP_PLAN.md` pour la procédure de nettoyage d'historique.
