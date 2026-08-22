# Plan QR — carte de visite

Ce document prépare la stratégie du futur QR code de la carte de visite
personnelle de Rachid Berrada. **Aucun QR code définitif n'est généré ici.**

## Stratégie

```
Carte de visite → QR code → Portfolio (accueil) → WhatsApp
```

Le QR code renvoie vers la page d'accueil du portfolio, pensée comme une landing
page commerciale (voir `README.md`) : en quelques secondes, le visiteur comprend
qui est Rachid, ce qu'il fait, et peut ouvrir WhatsApp en un tap.

## URL cible

**Pas encore définie.** Deux cas de figure, selon ce qui est disponible au moment
de l'impression :

1. **Domaine acheté et connecté** (voir `DOMAIN_SETUP_GUIDE.md`) :
   `https://rachidberrada.com` — cible définitive.
2. **Domaine pas encore acheté** : URL Vercel temporaire fournie automatiquement
   au déploiement (forme `https://<nom-projet>.vercel.app`) — utilisable comme
   cible provisoire, à condition de régénérer le QR quand le domaine définitif
   est connecté (une URL Vercel `.vercel.app` continue de fonctionner même après
   l'ajout d'un domaine personnalisé, mais n'est pas la version "propre" à
   afficher sur une carte imprimée à long terme).

**Ne jamais utiliser `localhost` ou une IP locale** — un QR imprimé doit pointer
vers une URL publique et stable, accessible depuis n'importe quel téléphone.

## Paramètre de tracking (optionnel)

Le portfolio ignore déjà proprement tout paramètre de requête inconnu (testé).
Possibilité d'utiliser :

```
https://rachidberrada.com/?source=business-card
```

pour distinguer ce canal dans de futures statistiques, sans configuration
supplémentaire côté site.

## Texte recommandé sous le QR

**« Scannez pour découvrir mes solutions »**

Alternative plus courte si l'espace de la carte est limité : **« Scannez-moi »**
avec le monogramme RB à proximité pour le lien visuel avec le site.

## Spécifications techniques d'impression

| Critère | Recommandation |
|---|---|
| Taille minimale | 2 × 2 cm sur une carte de visite standard (8,5 × 5,5 cm) — en dessous, la lecture devient difficile pour de nombreux smartphones |
| Contraste | QR sombre sur fond clair (ou l'inverse), jamais de dégradé ni de couleurs proches — cohérent avec la palette noir/blanc du site |
| Zone blanche (quiet zone) | Marge vide d'au moins 4 modules (≈ 2 mm à cette taille) tout autour du QR — ne rien imprimer dedans, y compris le logo RB |
| Niveau de correction d'erreur | M ou Q (15–25 %) plutôt que L, pour tolérer une petite salissure/pliure de carte sans casser la lecture |
| Format de sortie | SVG ou PDF vectoriel pour l'impression (jamais un PNG basse résolution) |

## Tests obligatoires avant impression définitive

1. Scanner avec au moins 2 modèles de téléphones différents (iOS + Android)
2. Scanner depuis un écran (pour valider le rendu numérique de la carte avant
   impression) **et** depuis un tirage papier réel — le rendu diffère
3. Tester dans un éclairage correct ET faible (une carte se scanne parfois dans
   un environnement mal éclairé)
4. Vérifier que le lien ouvre bien la page d'accueil (pas une erreur 404, pas de
   redirection cassée)
5. Vérifier le comportement du bouton WhatsApp flottant sur la page atterrie

## Étapes avant génération du QR définitif

- [ ] Domaine connecté (voir `DOMAIN_SETUP_GUIDE.md`) **ou** décision explicite
      d'utiliser l'URL Vercel temporaire en connaissance de cause
- [ ] Site déployé et vérifié en production (pas seulement en local)
- [ ] Validation explicite de Rachid sur l'URL finale à encoder
- [ ] Choix d'un générateur QR fiable (ex. génération vectorielle via une
      librairie ou un outil de confiance) une fois l'URL validée

Le QR définitif sera généré uniquement après ces validations.
