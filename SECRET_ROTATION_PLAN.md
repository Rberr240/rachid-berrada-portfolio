# Plan de rotation des secrets

**Aucune credential n'a été modifiée à distance.** Ce document prépare la
marche à suivre — l'exécution reste entièrement à votre initiative, dans
l'ordre que vous jugerez approprié après avoir répondu aux questions de
vérification ci-dessous.

## Avant toute rotation : questions auxquelles seul vous pouvez répondre

Pour chaque credential, la bonne procédure dépend de réponses que je ne peux
pas connaître depuis un audit de code :

1. **Cette credential est-elle utilisée ailleurs qu'en local/dev jetable ?**
   Vérifiable en cherchant si un serveur, un service Vercel/Railway/Render, un
   VPS, ou un compte cloud personnel utilise ce mot de passe ou cette clé
   aujourd'hui.
2. **L'application concernée tourne-t-elle encore quelque part avec des
   données réelles ?** (pas seulement des données de test/seed)
3. **Ce mot de passe (ou une variante proche) est-il réutilisé sur un compte
   personnel** (email, autre base de données, panel d'hébergement) ? C'est le
   risque le plus important en pratique — bien plus que l'exposition du code
   lui-même.

Sans réponse à ces questions, il est impossible de savoir si la rotation est
juste une bonne pratique préventive ou une urgence réelle.

---

## A. Mot de passe MySQL (`DB_PASSWORD` / `MYSQL_ROOT_PASSWORD`)

**Contexte** : réutilisé dans 3 dépôts publics (`portail-des-savoirs`,
`gestion-attestations`, `gestion-attestations-stage`) — voir
`SECURITY_INCIDENT_REPORT.md`.

**Comment vérifier si elle est encore utilisée** :
- Si ces projets ne tournent que via `docker compose up` en local pour du
  développement, la base MySQL correspondante n'existe que dans un volume
  Docker local (`db_data`) — la supprimer (`docker compose down -v`) élimine
  déjà la base concernée, indépendamment de toute rotation de mot de passe.
- Si ce mot de passe (ou une variante) est utilisé pour un compte réel (panel
  d'hébergeur, autre service, email), il doit être changé **indépendamment de
  ce code**, directement là où il est utilisé.

**Comment la faire tourner (dans le contexte de ces projets)** :
1. Choisir un nouveau mot de passe fort et unique à ce projet (jamais réutilisé
   ailleurs — c'est la cause racine de l'exposition à 3 reprises)
2. Le placer uniquement dans un fichier `.env` local non versionné (déjà
   préparé : `gestion-attestations/.env.example` documente la variable
   attendue, `docker-compose.yml` refuse désormais de démarrer sans elle —
   voir correctif local `9cb6dfd`)
3. Si un volume MySQL existant a été initialisé avec l'ancien mot de passe
   (`docker volume ls`), le mot de passe root MySQL stocké dans ce volume ne
   change pas automatiquement en éditant `.env` — soit recréer le volume
   (`docker compose down -v && docker compose up`, perte des données locales
   de test, sans impact si ce sont des données de seed), soit changer le mot de
   passe *dans* MySQL directement (`ALTER USER 'root'@'%' IDENTIFIED BY
   '...';`) si des données locales doivent être conservées

**Conséquences d'une rotation** : aucune, pour un usage local/dev — la base est
recréée avec `migrate:fresh --seed` à chaque démarrage du conteneur Laravel
dans `gestion-attestations` (voir `docker-compose.yml`, commande du service
`laravel`). Pour `portail-des-savoirs`, vérifier si `migrate:fresh` est
également utilisé (c'est le cas dans `entrypoint.sh`) — même conclusion.

---

## B. Clé d'application Laravel (`APP_KEY`)

**Contexte** : trouvée uniquement dans `gestion-attestations/docker-compose.yml`
(non trouvée dans les 2 autres dépôts audités).

### Impact potentiel d'un changement d'`APP_KEY` — à lire avant de la changer

L'`APP_KEY` Laravel sert de clé maîtresse pour plusieurs mécanismes :

- **Cookies chiffrés** : tous les cookies chiffrés par Laravel (dont, par
  défaut, le cookie de session si `SESSION_ENCRYPT` n'est pas explicitement à
  `false` — ici il l'est, `SESSION_ENCRYPT=false` dans `.env.example`, donc
  impact limité pour ce projet précis) deviennent illisibles après rotation :
  les navigateurs présentant un ancien cookie chiffré avec l'ancienne clé
  provoqueront une erreur de déchiffrement (`DecryptException`), généralement
  traitée par Laravel comme une session invalide (déconnexion silencieuse).
- **Sessions** : avec `SESSION_DRIVER=cookie` (le cas ici, voir
  `docker-compose.yml`), la session elle-même est stockée dans un cookie signé
  avec l'`APP_KEY` — une rotation déconnecte immédiatement tous les
  utilisateurs actifs. Sans conséquence grave pour un projet de démonstration
  personnel sans utilisateurs réels.
- **Données chiffrées via `Crypt::encrypt()`** : si le code applicatif chiffre
  des données stockées en base (mots de passe autres que le hash standard,
  données sensibles via la façade `Crypt`), ces données deviennent
  **définitivement illisibles** après rotation, sauf à les déchiffrer avec
  l'ancienne clé avant de basculer. **Vérification recommandée avant rotation** :
  chercher `Crypt::` ou `encrypted` (cast Eloquent) dans le code de
  `gestion-attestations` — recherche rapide n'ayant rien trouvé de tel dans les
  contrôleurs/modèles audités, mais une vérification complète du code source
  réel (pas seulement l'audit fait ici) est recommandée avant de considérer ce
  risque nul.
- **Remember tokens** ("se souvenir de moi") : signés indépendamment en base
  (colonne `remember_token`), non chiffrés par l'`APP_KEY` — non affectés par
  une rotation.
- **Signed URLs** (`URL::signedRoute`) : si utilisées, deviennent invalides
  après rotation. Non détectées dans le code audité.

**Conclusion pratique pour ce projet précis** : au vu de la configuration
observée (session par cookie non chiffré, pas d'usage détecté de `Crypt::`),
l'impact réel d'une rotation semble **faible** — mais cette conclusion repose
sur un audit de code, pas sur une exécution réelle de l'application ni sur une
revue exhaustive de tout le code source. À confirmer par vous avant rotation
si ce projet a déjà servi à traiter des données au-delà de simples tests.

**Comment la faire tourner** :
1. `cd backend-laravel && php artisan key:generate --show` — génère une
   nouvelle clé sans encore l'appliquer
2. La placer dans le `.env` local (racine du projet, lu par `docker-compose.yml`)
3. Si des données ont été chiffrées avec l'ancienne clé et doivent être
   conservées : les déchiffrer avec l'ancienne clé puis les rechiffrer avec la
   nouvelle **avant** de finaliser le changement (procédure Laravel standard de
   rotation de clé — non nécessaire ici si aucune donnée réelle n'a été
   chiffrée)

---

## C. Autres credentials éventuelles

Aucune autre credential réelle (clé API tierce, token, certificat de
production) n'a été trouvée dans les 3 dépôts audités dans cette phase — voir
`SECURITY_INCIDENT_REPORT.md`, section "Ce qui n'a PAS été trouvé". Si un audit
futur de `bibliotheque-electronique` ou `portail-des-savoirs` (au-delà du mot
de passe déjà trouvé) révèle d'autres secrets, ce document devra être complété
en conséquence avant toute rotation.

---

## Ordre recommandé (résumé — détail complet dans le rapport final)

1. Répondre aux questions de vérification en tête de ce document
2. Rotation du mot de passe MySQL (impact quasi nul, à faire sans attendre)
3. Rotation de l'`APP_KEY` (après vérification de l'absence de données
   chiffrées réelles à préserver)
4. Seulement ensuite : correctifs de code déjà prêts, puis nettoyage
   d'historique si décidé (voir `GIT_HISTORY_CLEANUP_PLAN.md`)

**Rien de ce qui précède n'a été exécuté.**
