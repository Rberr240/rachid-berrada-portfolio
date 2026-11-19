# 11 — Procédure de déploiement

Rien n'a été poussé ni déployé. Chaque étape ci-dessous demande l'accord de Rachid.

## 1. Vérification locale

```bash
git checkout feat/portfolio-v2
npm ci
npm run verify        # lint + typecheck + tests + build
npm test              # relancer après le build pour inclure les tests de sortie
```

## 2. Prévisualisation Netlify (sans toucher à la production)

```bash
git push -u origin feat/portfolio-v2
```

Ouvrir une Pull Request vers `main` : Netlify crée une **Deploy Preview** (si les aperçus de branche/PR sont activés sur le site — à vérifier dans Netlify, sans modifier la configuration de production).

Sur l'URL de prévisualisation :

1. `curl -sI https://<preview>/` → `302`, `location: /en` (ou `/fr` selon le pays), `cache-control: private, no-store`.
2. `curl -sI "https://<preview>/?utm_source=business_card&utm_medium=qr"` → la query est conservée dans `location`.
3. `curl -sI https://<preview>/fr` → en-têtes `content-security-policy`, `x-frame-options`, etc. Ouvrir la console : aucune violation CSP.
4. Depuis un téléphone : scanner un QR **de test** pointant vers l'URL de prévisualisation ; vérifier carte, WhatsApp, appel, vCard (iPhone + Android), partage.
5. Test de lead **contrôlé** : nom `[TEST] Validation V2`, e-mail de Rachid, aucune donnée client. Vérifier : Netlify → Forms → `contact` ; logs de la fonction `lead-automation` (`validation`, `automation=success`) ; ligne dans Google Sheets (champ `isTest = true`) ; notification Gmail. Si le webhook de production ne doit pas recevoir de test, définir temporairement `LEADS_AUTOMATION_WEBHOOK_URL` vers un scénario Make de test **dans le contexte « Deploy previews » uniquement**.
6. PageSpeed Insights (mobile) sur `/fr` de la prévisualisation ET sur `https://rachidberrada.com/fr` (V1) : noter LCP/CLS/INP.

## 3. Mise en production (après accord explicite)

1. Ajouter dans Make/Sheets les colonnes des nouveaux champs (07).
2. Fusionner la PR dans `main` (merge, pas de force-push). Netlify déploie automatiquement.
3. Contrôles immédiats : `/` depuis le Maroc ou la France → `/fr` ; QR imprimé réel ; `/sitemap.xml` ; une ancienne URL `/realisations/gold-fitness`.
4. Google Search Console : soumettre `https://rachidberrada.com/sitemap.xml`.

## Retour arrière

- Immédiat : Netlify → Deploys → sélectionner le dernier déploiement V1 → **Publish deploy** (aucun rebuild, effet instantané).
- Code : `git revert -m 1 <commit de fusion>` sur `main`, puis push normal. Le tag `v1.0.0` reste la référence V1.
- Aucune migration de données : rien à restaurer côté stockage. Les colonnes Sheets ajoutées peuvent rester.

## DNS

Aucun changement requis. Recommandation facultative (non appliquée) : faire résoudre `www.rachidberrada.com` vers Netlify (CNAME `www` → `<site>.netlify.app`, puis domaine alias dans Netlify) pour que les visiteurs qui tapent `www.` arrivent sur le site.
