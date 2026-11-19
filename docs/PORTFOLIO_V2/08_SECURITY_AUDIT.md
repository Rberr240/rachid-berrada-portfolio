# 08 — Sécurité

## Dépendances

- [OBSERVED] Avant (17/11/2026) : `npm audit` = 13 vulnérabilités (1 critique, 5 élevées, 7 modérées). Next.js 16.3.2 concerné par GHSA-2464-fhr4-w9xw (RCE optimisation d'images avec SVG), GHSA-673q-mjm6-r5xr, GHSA-mcj8-r9mp-w47p, GHSA-cjq9-62q9-8jv4, etc. ; sharp ≤ 0.35.5-rc.1, zod < 4.6.6, source-map-js ≤ 1.2.1.
- [IMPLEMENTED] `next` et `eslint-config-next` → **16.4.6** (dernière stable, publiée le 09/11/2026), `npm audit fix` sans `--force`.
- [TESTED] 17/11/2026 : `found 0 vulnerabilities`. React 19.2.8 conservé (compatible).
- [TESTED] 18/11/2026 : `npm audit --omit=dev` (dépendances livrées en production) = **0 vulnérabilité**.
- [OBSERVED] 18/11/2026 : `npm audit` complet = 14 alertes « high », toutes issues de `picomatch` (GHSA-fc5q-39xc-vjpf, ReDoS, **toutes versions touchées, aucun correctif publié**), via la chaîne d'outillage ESLint (`eslint-config-next`, `typescript-eslint`, `fast-glob`). Code de développement uniquement, jamais livré au navigateur ni exécuté sur Netlify à l'exécution. `npm audit fix --force` proposerait de rétrograder `eslint-config-next` en 16.3.8 (incohérent avec Next 16.4.6) sans corriger `picomatch` : non appliqué. [RECOMMENDATION] Relancer `npm audit` dès qu'une version corrigée de `picomatch` est publiée.
- [IMPLEMENTED] Node : Netlify `NODE_VERSION = "24"`, `engines.node >= 24`, `@types/node ^24`. [NOT VERIFIED] Version Node effectivement utilisée par les Functions Netlify : vérifier dans les logs de déploiement.

## En-têtes (`netlify.toml`)

[IMPLEMENTED] `Content-Security-Policy` (`default-src 'self'`, pas de tiers, `frame-ancestors 'none'`, `form-action 'self'`, `object-src 'none'`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (caméra, micro, géolocalisation, paiement, USB désactivés), `Cross-Origin-Opener-Policy: same-origin`. HSTS : déjà ajouté par Netlify.

Limites : `script-src 'unsafe-inline'` requis par les scripts inline de Next.js en rendu statique (les nonces imposent un rendu dynamique). Activer Plausible impose d'ajouter `https://plausible.io` à `script-src` et `connect-src`.

[NOT VERIFIED] En-têtes effectivement servis et absence de blocage CSP : à contrôler sur la prévisualisation (console navigateur + `curl -I`).

## Formulaires et fonctions

- [IMPLEMENTED] Validation serveur identique au client ; longueurs bornées ; neutralisation tableur ; webhook appelé uniquement côté serveur, délai 9 s, jamais bloquant.
- [IMPLEMENTED] Edge Function : seule la valeur du cookie est lue, validée contre une liste fermée ; aucune donnée persistée.
- [IMPLEMENTED] Le numéro de téléphone/WhatsApp n'est plus surchargeable par variable d'environnement (`NEXT_PUBLIC_WHATSAPP_NUMBER` supprimée) : une ancienne valeur restée sur Netlify ne peut pas réintroduire un mauvais numéro.

## Secrets

- [TESTED] Recherche de motifs de secrets (`sk-`, `AIza`, `ghp_`, webhooks Make, `xox`) dans `src`, `netlify`, `public`, `netlify.toml`, `package.json` : aucun résultat. `.env*` ignorés (sauf `.env.example`, sans valeur réelle).
- [IMPLEMENTED] Aucune valeur de secret reproduite dans cette documentation.
- [BLOCKED] La liste nominative des identifiants dont la rotation doit être confirmée par Rachid est volontairement tenue **hors du dépôt public**, dans les documents locaux non versionnés `SECRET_ROTATION_PLAN.md` et `SECURITY_INCIDENT_REPORT.md` (exclus par `.gitignore`). Aucune rotation n'est supposée faite tant que Rachid ne l'a pas confirmée.
