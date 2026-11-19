# 04 — Système visuel

## Direction

« Carte de visite numérique » : le visiteur vient de tenir la carte imprimée ; le premier écran en est le prolongement. Un seul moment fort (le portrait authentique et le nom en grand), tout le reste discret.

## Jetons (`src/app/globals.css`)

| Jeton | Valeur | Usage |
|---|---|---|
| `ink` | `#0f1115` | fond graphite |
| `surface` / `surface-2` | `#161920` / `#1d212a` | panneaux, cadre téléphone |
| `line` / `line-strong` | blanc 9 % / 17 % | filets |
| `fg` / `fg-muted` / `fg-subtle` | `#eef0f4` / `#a9b0bc` / `#8a919e` | texte (contrastes ≥ 5,5:1 sur graphite) |
| `accent` | `#3d63ff` | action principale (WhatsApp, devis) — texte blanc 5,1:1 |
| `accent-text` | `#93a8ff` | liens sur fond sombre |
| `gold` | `#c9a96a` | signature uniquement : monogramme, filet de portrait, statut « client », numéros de méthode |

## Typographie

- Fraunces 400 (statique, 18 Ko) : nom, titres de section (`.display`), citations.
- Geist : texte et interface. Cairo : arabe (`html[lang="ar"]` redirige les variables next/font).
- Pas d'eyebrows en capitales, pas de labels monospace, pas de mot isolé mis en couleur. Numérotation uniquement pour la méthode (vraie séquence).

## Composants

- `ContactActions` : WhatsApp (pleine largeur sur mobile) + 3 tuiles (vCard, appel, e-mail), cibles ≥ 64 px.
- `StatusBadge` : forme différente par niveau de preuve (or plein = client, bleu = démo, neutre = prototype, pointillé = R&D) — lisible sans la couleur.
- `PhoneShot` : capture mobile réelle dans un cadre sobre ; aucune maquette inventée.
- `.card-edge` : filet or décalé derrière les portraits (un seul motif décoratif).

## Pages

Accueil : Carte (héros) → Ce que je fais (4 familles) → Situations que je résous → Réalisations (avec captures en grand, puis prototypes/R&D en liste) → Méthode (4 étapes) → À propos → Contact.

## Responsive et accessibilité

- [TESTED] Captures vérifiées : 360×640, 390×844, 412×823, 1440×900 ; arabe RTL à 360×640. À 360×640, les 4 actions de contact tiennent au-dessus de la ligne de flottaison.
- [TESTED] Lighthouse accessibilité 100 (4 pages, mobile).
- [IMPLEMENTED] `prefers-reduced-motion` respecté ; focus visible ; lien d'évitement ; champs de formulaire liés à leurs erreurs (`aria-describedby`).
- [NOT VERIFIED] 430×932 et tablette 768/1024 non capturés ; aucun test sur appareil physique.
