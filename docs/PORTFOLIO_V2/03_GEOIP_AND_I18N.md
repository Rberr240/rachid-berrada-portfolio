# 03 — GeoIP et internationalisation

## Règle

| Pays (ISO 3166-1 alpha-2) | Langue |
|---|---|
| MA, FR | `/fr` |
| PT | `/pt` (contenu `pt-PT`) |
| US | `/en` (`en-US`) |
| tout autre pays, ou pays inconnu | `/en` |

Priorité : 1) URL localisée explicite (jamais redirigée) ; 2) cookie `rb_locale` (choix manuel) ; 3) pays GeoIP ; 4) anglais. La langue du navigateur n'est volontairement pas utilisée.

## Implémentation

- [IMPLEMENTED] `netlify/edge-functions/locale-redirect.ts`, `config = { path: "/", onError: "bypass" }`.
- [IMPLEMENTED] Pays lu via `context.geo.country.code` (GeoIP natif Netlify, côté serveur). Pas de `navigator.geolocation`, pas de service tiers, aucune IP stockée.
- [IMPLEMENTED] Réponse `302`, `Location: /<langue><query>`, `Cache-Control: private, no-store`, `Vary: Cookie` : jamais mise en cache ni servie à un autre visiteur. Seuls GET/HEAD sont redirigés.
- [IMPLEMENTED] Sélecteur de langue (en-tête et menu mobile) : liens vers la même page dans l'autre langue + cookie `rb_locale` (12 mois, `SameSite=Lax`, `Secure` en HTTPS). « Automatique » supprime le cookie et renvoie vers `/`.
- [IMPLEMENTED] Repli : `next.config.ts` redirige `/` → `/en` (307) si l'Edge Function ne tourne pas.

### Pourquoi une Edge Function plutôt que des redirections `Country` dans `netlify.toml`

Les règles natives savent tester le **pays** mais seulement la **présence** d'un cookie, pas sa valeur : il aurait fallu un cookie par langue. Elles ne sont pas non plus testables unitairement. L'Edge Function utilise la même GeoIP native, tient en 40 lignes et le code exécuté en production est celui que testent `tests/geo-locale.test.ts`. Les deux mécanismes ne coexistent pas.

## Absence de boucle

`/` est la seule URL concernée et redirige toujours vers une URL de langue, qui n'est jamais redirigée. Cookie invalide (`de`, valeur corrompue) ignoré.

## Tests

- [TESTED] `npm test` : MA, FR → fr ; PT → pt ; US, ES, DE, GB, BR, CA, XX → en ; pays absent → en ; préférence prioritaire ; préférence effacée → GeoIP ; cookie invalide ; UTM conservés ; `no-store` ; pas de boucle ; POST non redirigé.
- [TESTED] Navigateur (local) : choix manuel pose `rb_locale=pt`, « Automatique » l'efface ; `/?utm_source=business_card&utm_medium=qr` → `/en?utm_source=business_card&utm_medium=qr` (repli Next).
- [NOT VERIFIED] GeoIP réelle sur Netlify. Pour tester sans usurper de vraie donnée visiteur : `npx netlify-cli dev --geo=mock --country=PT` puis ouvrir `/` ; répéter avec `MA`, `US`, `DE`. Sur un déploiement, le cookie `nf_country` n'a pas d'effet ici (il ne sert qu'aux règles natives) : tester avec un VPN ou un collègue à l'étranger.

## Langues

- [IMPLEMENTED] 4 dictionnaires typés (`src/content`), mêmes clés obligatoires. Portugais européen (AO 1990) : telemóvel, equipa, orçamento, partilhar, base de dados, guardar contacto, registo…
- [IMPLEMENTED] `<html lang>` : `fr`, `en-US`, `pt-PT`, `ar` ; `dir="rtl"` et police Cairo pour l'arabe.
- [IMPLEMENTED] hreflang réciproques + `x-default` (`/` pour l'accueil, `/en/...` ailleurs) sur chaque page indexable ; sitemap avec alternatives.
- [TESTED] `tests/build-output.test.ts` : `lang`/`dir`, canonical, hreflang, aucun libellé d'une autre langue dans les boutons.
- [RECOMMENDATION] Faire relire le portugais et l'arabe par un locuteur natif avant publication.
