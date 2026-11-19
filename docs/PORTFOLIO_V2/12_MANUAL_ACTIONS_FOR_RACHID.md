# 12 — Actions à faire par Rachid

## Avant la mise en production

1. **Scanner une carte imprimée** et noter l'URL exacte encodée (avec ou sans `?utm_source=…`). Si elle contient un paramètre non reconnu, me le transmettre pour l'ajouter à `src/lib/attribution.ts` (sans changer le QR).
2. ✅ **Coordonnées confirmées (18/11/2026)** : e-mail `rachid.berrada20@gmail.com` ; numéro professionnel `0661857517` (`+212661857517` pour tel:, WhatsApp et vCard), source unique `src/content/facts.ts`. L'ancien numéro est supprimé du projet (test `tests/contact-number.test.ts`). Si `NEXT_PUBLIC_WHATSAPP_NUMBER` existe encore dans Netlify, la supprimer : elle n'est plus lue.
3. ✅ **Gold Fitness** : autorisation de présentation comme réalisation client confirmée par Rachid (18/11/2026). Conserver une trace écrite de cet accord.
4. **Démo Mirador** : corriger l'encodage du dépôt `mirador-golf-demo` (fichiers ré-enregistrés en UTF-8), puis réajouter `demoUrl` dans `facts.ts`. Confirmer si le projet est utilisé par la résidence.
5. **Gestion des attestations** : confirmer le contexte (stage, école, projet personnel) pour l'afficher.
6. **Titre professionnel** : confirmer « Développeur web & solutions digitales » ou fournir un titre/diplôme vérifiable.
7. **Mentions légales** : fournir le statut juridique et l'identifiant (ICE/RC au Maroc, SIREN en France, etc.) s'il existe ; faire relire mentions légales et politique de confidentialité par un professionnel du droit (loi 09-08, déclaration CNDP éventuelle, RGPD).
8. **Durée de conservation** des demandes : valider « 3 ans après le dernier échange » ou indiquer une autre durée.
9. **Relecture** du portugais (pt-PT) et de l'arabe par un locuteur natif.
10. **Rotation des secrets** listés dans `SECRET_ROTATION_PLAN.md` (document local, non publié) : confirmer ce qui a été fait.

## Pendant la prévisualisation (11)

11. Activer les Deploy Previews si nécessaire ; tester sur iPhone et Android : vCard, WhatsApp, appel, partage.
12. Envoyer une demande `[TEST]` et vérifier Netlify Forms, logs, Make, Sheets, Gmail.
13. Ajouter les colonnes Sheets des nouveaux champs (07).
14. Mesurer PageSpeed Insights mobile avant/après.

## Facultatif

15. URL LinkedIn (si souhaitée) → `linkedinUrl` dans `facts.ts`.
16. Ville/zone d'activité → `location` (non affichée tant que vide).
17. Mesure d'audience : créer un compte Plausible, définir `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, ajouter `https://plausible.io` à la CSP, mettre à jour la politique de confidentialité.
18. Lien de prise de rendez-vous (Calendly ou autre) si un service réel est utilisé.
19. `www.rachidberrada.com` : voir 11, section DNS.
