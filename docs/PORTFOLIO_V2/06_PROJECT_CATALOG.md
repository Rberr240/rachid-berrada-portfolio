# 06 — Catalogue des réalisations

Faits : `src/content/facts.ts`. Textes : `projects` dans chaque dictionnaire. Chaque étude de cas présente contexte, statut, rôle, problème, solution, fonctionnalités, preuves vérifiables, limites connues, technologies, liens et captures.

| Projet | Statut affiché | Preuves | Visuel | Points à confirmer |
|---|---|---|---|---|
| Gold Fitness | Réalisation client en ligne | Site en ligne (200), dépôt public, commits récents de Rachid (`Rberr240`) | Captures réelles refaites le 18/11/2026 (site multi-salles actuel) | [OBSERVED] Permission confirmée par Rachid le 18/11/2026 ; impact commercial non mesuré, donc non chiffré |
| Menu Chez Bassou | Démonstration en ligne | Démo en ligne (200), dépôt public ; coordonnées d'exemple sur la démo | Captures réelles | [NOT VERIFIED] Livraison client : non revendiquée |
| Espace propriétaires (Mirador) | Prototype technique | Code audité (6 migrations, 2 fonctions) ; admin vide | Aucun | [BLOCKED] Démo publique non liée (accents corrompus) ; usage réel non confirmé |
| Gestion des attestations | Prototype technique | Dépôt public, CI GitHub Actions | Aucun | [NOT VERIFIED] Contexte de stage/école à confirmer pour l'afficher |
| JARVIS | R&D personnelle | Dépôt public V2 (gelé) | Aucun | — |

## Changements

- [IMPLEMENTED] Les trois `dashbord.png` générés par IA (chiffres inventés) sont retirés du site et du dépôt.
- [IMPLEMENTED] Projets sans capture : présentés sans image, avec la mention « Aucun visuel n'a été inventé pour la remplacer ».
- [IMPLEMENTED] Le lien de démo Mirador est retiré jusqu'à correction de l'encodage (`facts.ts`, commentaire en place).
- [IMPLEMENTED] Les captures « desktop » Gold Fitness / Chez Bassou (colonne mobile centrée) ne sont plus utilisées en vignette, seulement en galerie d'étude de cas.

## Pour ajouter une capture ou un projet

1. Déposer la capture réelle dans `public/portfolio/<id>/` (mobile 780×1688 de préférence).
2. Ajouter `screenshots` / `demoUrl` / `repoUrl` dans `facts.ts`.
3. Ajouter les textes `projects["<id>"]` dans les 4 dictionnaires (le typage l'impose).
