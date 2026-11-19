# 13 — Backlog

## Priorité haute

- [RECOMMENDATION] Mesurer le LCP mobile en prévisualisation ; si > 2,5 s : réduire la qualité/taille du portrait mobile (`images.qualities`), envisager `preload` explicite via `ReactDOM.preload` avec `media`, et alléger le JS client (menu de langue en `<details>` natif).
- [RECOMMENDATION] Test de bout en bout du lead en prévisualisation (11, étape 5).
- [RECOMMENDATION] Captures réelles pour l'Espace propriétaires (après correction de l'encodage) et pour Gestion des attestations (environnement local de démo).

## Priorité moyenne

- [RECOMMENDATION] Activer Plausible (sans cookie) une fois le compte créé : les événements sont déjà émis (`qr_entry`, `whatsapp_click`, `phone_click`, `email_click`, `vcard_download`, `share_click`, `quote_start`, `quote_submit_success`).
- [RECOMMENDATION] Supprimer du dépôt les originaux lourds non utilisés (`public/images/rachid/hero-rachid.jpg` 12 Mpx, `*-cutout.png`, `secondary-rachid.jpg`) après archivage personnel — ils restent publics tant qu'ils sont dans `public/`.
- [RECOMMENDATION] Retirer ou archiver les anciens documents racine obsolètes (DOMAIN_SETUP_GUIDE, BUSINESS_CARD_QR_PLAN… indiquent encore « pas de domaine ») et `docs/international/*` qui décrivent la V1.
- [RECOMMENDATION] Captures d'écran de 430×932 et tablette ; tests sur appareils réels.

## Priorité basse

- [RECOMMENDATION] Tests end-to-end automatisés (Playwright) si le site évolue souvent — non ajoutés pour ne pas alourdir les dépendances.
- [RECOMMENDATION] Image OG en arabe (nécessite une police arabe embarquée dans le rendu Satori).
- [RECOMMENDATION] Témoignages clients réels, avec accord écrit, quand ils existeront.
