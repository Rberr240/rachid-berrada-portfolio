# Plan de rotation des secrets

**Aucune credential n'a été modifiée à distance. Rien ci-dessous n'a été
exécuté.** Ce document prépare la marche à suivre — l'exécution reste
entièrement à votre initiative.

## Avant toute rotation : questions auxquelles seul vous pouvez répondre

1. **Cette credential est-elle utilisée ailleurs qu'en local/dev jetable ?**
2. **L'application concernée tourne-t-elle encore quelque part avec des
   données réelles ?** (pas seulement des données de test/seed)
3. **Ce mot de passe (ou une variante proche) est-il réutilisé sur un compte
   personnel** (email, autre base de données, panel d'hébergement) ? C'est le
   risque le plus important en pratique — bien plus que l'exposition du code
   lui-même.

## Tableau d'usage apparent (d'après le code — jamais une preuve d'usage réel)

Aucune connexion à un système externe n'a été effectuée. Ce tableau reflète
uniquement ce que le code indique : valeurs par défaut, présence/absence de
fichiers de déploiement (`vercel.json`, `Procfile`, `render.yaml`…), hôtes
référencés. Quand le code ne permet pas de trancher, la case est marquée
**UNKNOWN** — jamais supposée inactive par défaut.

| Credential | Repositories | Usage apparent (d'après le code) | Local / distant / inconnu | Rotation nécessaire | Priorité |
|---|---|---|---|---|---|
| Mot de passe MySQL | portail-des-savoirs, gestion-attestations, gestion-attestations-stage | `docker-compose.yml`/`create_db.php` pointent vers `mysql`/`127.0.0.1` (hôtes locaux Docker) ; aucun fichier de déploiement (`vercel.json`, `Procfile`, `render.yaml`, `fly.toml`) trouvé dans aucun des 3 dépôts ; aucun hôte externe référencé | **Local d'après le code observé** — mais réutilisation du même mot de passe sur un compte/service personnel réel = **UNKNOWN**, ne peut pas être exclue par un audit de code | Oui, dans tous les cas (voir section A) | **Haute** — 3 dépôts publics concernés |
| APP_KEY Laravel | gestion-attestations uniquement | `docker-compose.yml` : `APP_ENV: local`, `APP_URL: http://localhost:3000` ; aucun fichier de déploiement trouvé | **Local d'après le code observé** — UNKNOWN si réutilisée pour un déploiement réel ailleurs | Oui (voir section B) | **Haute** — clé de chiffrement applicative |
| Signal secondaire : `APP_ENV` par défaut = `production` dans `portail-des-savoirs/biblio-laravel/config/app.php` (au lieu de `local`, contrairement aux 2 autres dépôts) | portail-des-savoirs | Ce fichier de config a été modifié pour défaulter en mode production si `APP_ENV` n'est pas défini — inhabituel pour un projet dont le `.env.example` indique `local`. Ne prouve pas un déploiement réel, mais c'est un indice à ne pas ignorer | **UNKNOWN** — signal à vérifier par vous, pas une conclusion | Sans objet directement, mais renforce la priorité de vérifier ce dépôt en A | Moyenne |

---

## A. Mot de passe MySQL (`DB_PASSWORD` / `MYSQL_ROOT_PASSWORD`)

**Comment vérifier si elle est encore utilisée** :
- Si ces projets ne tournent que via `docker compose up` en local, la base
  MySQL correspondante n'existe que dans un volume Docker local — la
  supprimer (`docker compose down -v`) élimine déjà la base concernée,
  indépendamment de toute rotation.
- Si ce mot de passe (ou une variante) est utilisé pour un compte réel (panel
  d'hébergeur, autre service, email), il doit être changé **indépendamment de
  ce code**, directement là où il est utilisé — c'est le point que vous seul
  pouvez vérifier.

**Comment la faire tourner** :
1. Choisir un nouveau mot de passe fort et **unique à chaque projet** (jamais
   réutilisé — c'est la cause racine de l'exposition à 3 reprises)
2. Le placer dans un `.env` local non versionné (déjà préparé dans les 3
   dépôts : `gestion-attestations` commit `9cb6dfd`, `portail-des-savoirs`
   commit `d83bc19`, `gestion-attestations-stage` commit `d56a9fa` — les trois
   `docker-compose.yml`/scripts refusent désormais de démarrer sans elle)
3. Si un volume MySQL existant a été initialisé avec l'ancien mot de passe, le
   changer n'a d'effet qu'après recréation du volume
   (`docker compose down -v && docker compose up`) ou changement direct dans
   MySQL (`ALTER USER 'root'@'%' IDENTIFIED BY '...';`)

**Conséquences** : aucune pour un usage local/dev — les 3 projets recréent
leur base via `migrate:fresh --seed` au démarrage.

---

## B. Clé d'application Laravel (`APP_KEY`) — `gestion-attestations` uniquement

### Recherche `Crypt::` / `encrypt(` / `decrypt(` — résultat précis

Effectuée sur les 3 dépôts sensibles (code applicatif uniquement, hors
`vendor/`) :

- **`gestion-attestations`** (le seul dépôt où l'`APP_KEY` exposée existe) :
  **aucun appel `Crypt::`, `encrypt(` ou `decrypt(` détecté** dans le code
  applicatif — la seule occurrence est l'enregistrement standard de la façade
  `Crypt` dans `config/app.php` (présent par défaut dans toute installation
  Laravel, que la façade soit utilisée ou non ailleurs).
  → **Classement A : aucune donnée persistante chiffrée détectée.**
- `gestion-attestations-stage` : même constat (façade enregistrée, jamais
  appelée) — sans objet ici puisque ce dépôt n'a de toute façon pas d'APP_KEY
  exposée.
- `portail-des-savoirs` : **usage réel trouvé** —
  `resources/views/profile/two-factor-authentication-form.blade.php` appelle
  `decrypt()` sur `two_factor_secret` et `two_factor_recovery_codes`
  (fonctionnalité 2FA standard de Laravel Jetstream). **Sans objet pour la
  rotation de l'APP_KEY exposée** puisque, vérifié explicitement, ce dépôt ne
  contient aucune valeur `APP_KEY` en clair (recherche `base64:` et
  `APP_KEY=<valeur>` sur l'intégralité du dépôt : aucun résultat). Mentionné
  ici par transparence : **si l'APP_KEY réellement utilisée en dehors de ce
  dépôt pour faire tourner cette application venait elle aussi à être
  exposée ou changée sans procédure de migration**, les secrets 2FA de tout
  compte utilisateur ayant activé la double authentification deviendraient
  illisibles (l'utilisateur perdrait l'accès à son 2FA et devrait le
  reconfigurer).
  → **Classement B : données persistantes potentiellement chiffrées**, mais
  concernant une clé non exposée dans ce dépôt — action : si vous rotate un
  jour l'APP_KEY réelle de `portail-des-savoirs`, prévenir les utilisateurs
  2FA au préalable plutôt que de le faire à froid.

### Impact détaillé d'une rotation de l'APP_KEY de `gestion-attestations`

- **Cookies chiffrés / sessions** : `SESSION_DRIVER=cookie` et
  `SESSION_ENCRYPT=false` (voir `.env.example`) — la session elle-même est
  signée (pas chiffrée) par l'APP_KEY. Une rotation invalide la signature de
  toute session active : déconnexion de tous les utilisateurs connectés au
  moment de la rotation. Pour ce projet (démonstration personnelle, pas
  d'utilisateurs réels connus), impact négligeable.
- **`Crypt::`** : classement A ci-dessus — aucune donnée à migrer.
- **Remember tokens** : stockés en base indépendamment de l'APP_KEY, non
  affectés.
- **Signed URLs** (`URL::signedRoute`) : non utilisées dans le code audité.

**Comment la faire tourner** :
1. `cd backend-laravel && php artisan key:generate --show`
2. Placer la nouvelle clé dans le `.env` local (racine, lu par
   `docker-compose.yml`)
3. Aucune migration de données nécessaire (classement A)

---

## C. Autres credentials

Aucune autre credential réelle trouvée dans les 3 dépôts audités (clé API
tierce, token, certificat de production). Voir `SECURITY_INCIDENT_REPORT.md`.

---

## Ordre exact de remédiation

1. **Backup** — avant toute opération destructive, exécuter la checklist
   `PRE_REWRITE_BACKUP_CHECKLIST.md` pour les 3 dépôts concernés (même si la
   réécriture d'historique n'est pas encore décidée, le backup ne coûte rien
   et doit précéder toute manipulation)
2. **Identifier l'environnement actif** — répondre aux 3 questions en tête de
   ce document, pour chacun des 3 dépôts, avant de rotate quoi que ce soit
3. **Rotation du mot de passe DB** (section A) — impact quasi nul, à faire dès
   que la réponse à la question 3 (réutilisation personnelle) est connue
4. **Mise à jour de la configuration runtime** — appliquer le nouveau mot de
   passe partout où la credential était réellement utilisée (au-delà de ces 3
   dépôts, si la question 1/3 y répond positivement)
5. **Vérification de l'application** — si un environnement local/Docker est
   relancé avec les nouvelles valeurs, confirmer qu'il démarre normalement
   (`docker compose up`, vérifier les logs)
6. **Rotation de l'APP_KEY** (section B) — après confirmation du classement A
   (aucune donnée à migrer, déjà établi pour `gestion-attestations`)
7. **Déconnexions attendues** — informer les utilisateurs concernés le cas
   échéant (session invalidée) ; sans objet si aucun utilisateur réel actif
8. **Validation** — confirmer que les 3 applications fonctionnent avec les
   nouvelles credentials, qu'aucune donnée n'a été perdue de façon inattendue
9. **Seulement ensuite** : nettoyage de l'historique Git (voir
   `GIT_HISTORY_CLEANUP_PLAN.md`) — la rotation doit précéder le nettoyage
   d'historique, jamais l'inverse (nettoyer l'historique sans avoir rotate la
   credential ne protège rien : la valeur reste valide et exploitable même
   sans être visible)

**Rien de ce qui précède n'a été exécuté.**
