# 09 — Rapport de tests

Environnement : Windows 11, Node 24.12, npm 11.6, serveur local `next start` (HTTP/1.1, pas de CDN), Chrome piloté par chrome-devtools-mcp. Aucun appareil physique.

## Commandes

| Commande | Résultat |
|---|---|
| `npm run lint` | [TESTED] 0 erreur, 0 avertissement |
| `npm run typecheck` (`next typegen && tsc --noEmit`) | [TESTED] 0 erreur |
| `npm test` | [TESTED] 37/37 réussis (`geo-locale`, `lead`, `vcard-attribution`, `build-output`) |
| `npm run build` | [TESTED] 54 pages statiques, 0 erreur |
| `npm audit` | [TESTED] 0 vulnérabilité |

Les tests `build-output` lisent `.next/server/app` : lancer `npm run build` avant `npm test` (ou `npm run verify`).

## Couverture fonctionnelle

| Point | Statut |
|---|---|
| Matrice GeoIP MA/FR/PT/US/ES/DE/GB/BR/CA/inconnu | [TESTED] unitaire (code de l'Edge Function) |
| Préférence manuelle, retour automatique, cookie invalide | [TESTED] unitaire + navigateur |
| UTM conservés, pas de boucle, `no-store` | [TESTED] unitaire ; repli Next vérifié par `curl` (307 avec query) |
| `/fr`, `/pt`, `/en`, `/ar` directs restent dans leur langue | [TESTED] `lang`/`dir` dans le HTML généré |
| Anciennes URLs `/realisations/<slug>` | [TESTED] `curl` : 308 → `/en/realisations/<slug>` |
| Langue inconnue `/de/...`, URL inconnue | [TESTED] 404 |
| Liens internes cassés | [TESTED] aucun (toutes pages générées) |
| vCard (structure, CRLF, échappement, pliage UTF-8, `text/vcard`) | [TESTED] ; [NOT VERIFIED] import sur iPhone/Android réels |
| Formulaire : validation, focus, échec réseau, succès simulé | [TESTED] navigateur, sans envoi réel |
| Message WhatsApp « carte de visite » | [TESTED] navigateur (`?utm_source=business_card`) |
| Partage natif / copie | [NOT VERIFIED] le bouton est présent ; dialogue natif non testé sur mobile réel |
| Console | [TESTED] aucune erreur après correction (Lighthouse « errors-in-console » réussi) |

## Lighthouse (mobile, local, après corrections des cibles tactiles)

| Page | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|
| `/fr` | 100 | 100 | 100 |
| `/ar` | 100 | 100 | 100 |
| `/pt/devis` | 100 | 100 | 100 |
| `/en/realisations/gold-fitness` | 100 | 100 | 100 |

Note honnête : un premier audit (93/88) avait été faussé par un ancien serveur resté actif servant un CSS supprimé ; il a été refait sur un serveur propre.

## Performance (traces Chrome, Slow 4G + CPU ×4, cache vidé)

| Étape | Profil | LCP | CLS |
|---|---|---|---|
| V2 initiale | 390×844, DPR 3 | 4 109 ms | 0,00 |
| + Fraunces allégée (270 Ko → 18 Ko) + CSS inliné | 412×823, DPR 1,75 (profil Lighthouse) | 3 847 ms (TTFB 579, chargement image 1 520, rendu 1 443) | 0,01 |
| + portrait recadré mobile, `fetchPriority=high` | idem | **non mesuré** : le serveur local a été arrêté (mémoire insuffisante) | — |

- [NOT VERIFIED] Objectif LCP < 2,5 s : **non atteint dans la dernière mesure locale**, dernière optimisation non mesurée. Le serveur local (HTTP/1.1, sans CDN) est pessimiste par rapport à Netlify (HTTP/2-3, Image CDN), mais cela ne remplace pas une mesure.
- [NOT VERIFIED] Comparaison avant/après avec la même méthode : la V1 n'a pas été mesurée avec ce protocole. À faire sur PageSpeed Insights pour la production V1 actuelle puis la prévisualisation V2.
- HTML `/fr` : 41 Ko gzip (V1 : 32 Ko) — CSS désormais inliné ; JS ≈ 190 Ko gzip (socle React/Next).
