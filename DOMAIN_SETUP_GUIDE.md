# Guide de configuration du domaine — rachidberrada.com

Ce guide décrit la procédure à suivre **plus tard**, une fois le domaine
`rachidberrada.com` acheté. Rien n'a été configuré à ce stade : aucun DNS, aucune
URL du site n'a été remplacée par ce domaine comme s'il était déjà actif.

## 1. Acheter le domaine

Choisir un registrar (Namecheap, OVH, Google Domains/Squarespace Domains,
Cloudflare Registrar…). Vérifier la disponibilité de `rachidberrada.com` et, si
souhaité, réserver aussi `rachidberrada.ma` ou d'autres variantes en défense de
marque — non requis pour lancer.

## 2. Connecter le domaine à Netlify

Une fois le projet déployé sur Netlify (voir README, section Déploiement) :

1. Dashboard Netlify → site → **Domain management** (ou **Domain settings**)
2. **Add a domain** → saisir `rachidberrada.com`
3. Netlify affiche les enregistrements DNS à créer chez le registrar

## 3. Configurer le DNS

Deux approches possibles avec Netlify :

- **Registrar externe conservé** : créer chez le registrar un enregistrement
  **A** sur `@` pointant vers l'IP de load balancer Netlify (affichée dans le
  dashboard au moment de l'ajout), et un **CNAME** sur `www` pointant vers
  `<nom-du-site>.netlify.app`
- **Netlify DNS** (alternative plus simple) : déléguer les serveurs de noms du
  domaine à Netlify directement depuis le registrar — Netlify gère alors tous
  les enregistrements automatiquement

Suivre exactement les valeurs affichées dans le dashboard Netlify au moment de
l'ajout (elles peuvent évoluer).

## 4. Activer HTTPS

Automatique sur Netlify : un certificat TLS (Let's Encrypt) est provisionné dès
que le DNS pointe correctement vers Netlify. Aucune action manuelle nécessaire
au-delà de l'étape 3. Prévoir jusqu'à quelques heures de propagation DNS.

## 5. Définir le domaine principal

Dans Netlify → Domain management, choisir lequel de `rachidberrada.com` ou
`www.rachidberrada.com` est le domaine **principal** (recommandation :
`rachidberrada.com` sans `www`, plus court pour une carte de visite).

## 6. Rediriger www

Netlify redirige automatiquement le domaine secondaire (`www` ou apex, selon
le choix fait à l'étape 5) vers le domaine principal — aucune configuration
supplémentaire nécessaire dans le cas standard.

## 7. Mettre à jour `NEXT_PUBLIC_SITE_URL`

Dans Netlify → **Site configuration → Environment variables** :

```
NEXT_PUBLIC_SITE_URL=https://rachidberrada.com
```

Puis redéployer (**Deploys → Trigger deploy**) — un redéploiement est
nécessaire pour que le build régénère les métadonnées avec la nouvelle URL,
cette variable étant lue au build, pas au runtime.

## 8. Vérifier l'URL canonique

Après redéploiement, contrôler le `<head>` de la page d'accueil en production :

```
<link rel="canonical" href="https://rachidberrada.com/" />
```

Générée automatiquement par `alternates.canonical` dans
`src/app/layout.tsx` — aucune modification de code nécessaire, uniquement la
variable d'environnement de l'étape 7.

## 9. Sitemap

Vérifier `https://rachidberrada.com/sitemap.xml` : doit lister la page d'accueil
et les 4 pages `/realisations/...` avec le nouveau domaine (généré depuis
`NEXT_PUBLIC_SITE_URL` par `src/app/sitemap.ts` — automatique).

## 10. Open Graph

Vérifier qu'un partage du lien (WhatsApp, LinkedIn, etc.) affiche bien l'image
Open Graph générée (`/opengraph-image`) avec la bonne URL de base. Outils de
vérification : [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/),
[Twitter Card Validator](https://cards-dev.twitter.com/validator) (ou simplement
partager le lien en message privé sur WhatsApp pour voir l'aperçu).

## Après connexion du domaine

- [ ] Générer le QR code définitif de la carte de visite (voir
      `BUSINESS_CARD_QR_PLAN.md`) — pas avant que ce guide soit entièrement
      complété et vérifié
- [ ] Mettre à jour tout lien `href` pointant vers l'ancienne URL `.netlify.app`
      temporaire dans les documents du projet, si applicable
- [ ] Soumettre le sitemap à Google Search Console (optionnel mais recommandé)
