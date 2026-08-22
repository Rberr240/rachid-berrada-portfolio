# Site professionnel — Rachid Berrada

Site vitrine / landing page commerciale pour **Rachid Berrada — Ingénieur en solutions digitales**
(Web • Applications • IA • Automatisation), conçu pour être partagé via QR code (carte de visite)
et convertir les visiteurs en prospects (WhatsApp / formulaire).

Stack : **Next.js 16 (App Router) + TypeScript (strict) + Tailwind CSS v4**, sans dépendance lourde
(seule dépendance ajoutée : `lucide-react` pour les icônes, très légère et tree-shakée).

---

## 1. Lancer le projet en local

Prérequis : Node.js 20+.

```bash
npm install
npm run dev
```

Le site est disponible sur [http://localhost:3000](http://localhost:3000).

Autres commandes utiles :

```bash
npm run build   # build de production
npm run start   # sert le build de production
npm run lint    # ESLint
npx tsc --noEmit  # vérification TypeScript stricte
```

---

## 2. Configurer vos coordonnées (obligatoire avant publication)

**Toutes les informations du site sont centralisées dans un seul fichier :**
[`src/data/profile.ts`](src/data/profile.ts).

Déjà renseignées avec vos vraies informations :

| Champ | Valeur actuelle |
|---|---|
| `email` | `rachid.berrada20@gmail.com` |
| `phoneDisplay` | `+212 6 48 55 22 22` |
| `whatsappNumber` | `212648552222` (utilisé pour tous les liens `wa.me`) |
| `socialLinks` → GitHub | `https://github.com/Rberr240` (affiché, actif) |
| `socialLinks` → LinkedIn | non renseigné volontairement (`enabled: false`) — à ajouter plus tard |

Encore en attente (masqués proprement dans l'interface tant qu'ils sont vides — aucune
valeur inventée) :

| Champ | Description |
|---|---|
| `location` | Vide pour le moment. La ligne "Localisation" (footer + contact) reste masquée tant que ce champ est vide. |
| `website` / `hasConfirmedDomain` | Aucun domaine confirmé. La ligne "Site" de la section contact reste masquée tant que `NEXT_PUBLIC_SITE_URL` n'est pas défini. |

Les autres textes (accroche, services, méthode, FAQ, "à propos") sont déjà rédigés et prêts
à l'emploi — vous pouvez bien sûr les ajuster à votre ton.

### Variables d'environnement

Copiez `.env.example` vers `.env.local` :

```bash
cp .env.example .env.local
```

Puis renseignez :

- `NEXT_PUBLIC_SITE_URL` — à laisser **vide** tant que le domaine définitif n'est pas connu
  (utilisé pour le SEO, les balises Open Graph, le sitemap et l'URL canonique ; en son
  absence le build utilise `http://localhost:3000` en interne, sans jamais l'afficher
  publiquement dans l'interface).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — déjà `212648552222` par défaut dans le code même sans ce
  fichier ; ne redéfinir que si vous voulez tester avec un autre numéro.
- `NEXT_PUBLIC_FORM_ENDPOINT` — voir section formulaire ci-dessous.

`.env.local` n'est **jamais commité** (déjà exclu via `.gitignore`, règle `.env*`).

---

## 3. Connecter le formulaire de contact

Le formulaire (`src/components/forms/ProjectForm.tsx`) est entièrement fonctionnel côté validation,
mais **n'envoie rien tant qu'aucun service n'est connecté** — par choix, pour ne jamais simuler un
envoi réussi qui n'aurait pas réellement lieu. Tant que `NEXT_PUBLIC_FORM_ENDPOINT` est vide, un
message clair invite le visiteur à vous contacter via WhatsApp ou email.

### Recommandation : Formspree pour démarrer

Comparatif rapide (coût, sécurité, facilité avec l'architecture actuelle,
anti-spam, maintenance) :

| Solution | Coût | Intégration | Anti-spam | Maintenance |
|---|---|---|---|---|
| **Formspree** | Gratuit jusqu'à 50 envois/mois | Aucun code à ajouter — colle directement dans `NEXT_PUBLIC_FORM_ENDPOINT` tel que le formulaire est déjà construit | Honeypot + reCAPTCHA intégrés | Aucune (service géré) |
| Resend | Gratuit jusqu'à 3000 emails/mois | Nécessite d'ajouter une route API Next.js (clé API à garder côté serveur) | À implémenter soi-même | Faible, mais plus de code |
| Web3Forms | Gratuit, illimité | Similaire à Formspree (POST direct) | Basique | Aucune |

**Formspree** est recommandé pour démarrer : 50 envois/mois est largement
suffisant pour un formulaire de contact de portfolio personnel, aucune ligne de
code à ajouter (l'architecture du formulaire — validation, état "non connecté",
POST JSON — a été construite précisément pour brancher un endpoint de ce type),
et la protection anti-spam est gérée par le service. Si le volume dépasse un
jour ce quota, ou si un contrôle plus fin de l'email (domaine personnalisé,
templates) devient utile, migrer vers Resend via une petite route API Next.js
est l'évolution naturelle — sans rien changer côté formulaire.

### Activer Formspree

1. Créer un compte sur [formspree.io](https://formspree.io) (gratuit)
2. Créer un formulaire, récupérer l'URL `https://formspree.io/f/xxxxxxx`
3. La renseigner dans `.env.local` → `NEXT_PUBLIC_FORM_ENDPOINT`
4. Redéployer (ou relancer `npm run dev` en local)

Aucune clé secrète n'est nécessaire côté frontend pour Formspree. Si vous migrez
plus tard vers une API personnalisée (Resend, Supabase…) nécessitant une clé,
celle-ci doit rester **côté serveur uniquement** (route API Next.js ou service
externe), jamais dans une variable `NEXT_PUBLIC_*`.

Aucun compte n'a été créé et aucune clé n'a été ajoutée au code dans le cadre de
cette préparation — ce choix reste à votre initiative.

---

## 4. Réalisations & pages case study

Le portfolio est piloté par un seul fichier : [`src/data/profile.ts`](src/data/profile.ts),
tableau `projects`. Il contient actuellement 4 réalisations réelles, auditées à partir de
vos dépôts GitHub (voir [`PORTFOLIO_GITHUB_AUDIT.md`](PORTFOLIO_GITHUB_AUDIT.md) pour le
détail complet de cet audit — méthodologie, sécurité, recommandations).

Chaque projet avec un champ `caseStudy` obtient automatiquement une page dédiée à
`/realisations/[id]` (générée statiquement, avec son propre SEO). Structure d'une entrée :

```ts
{
  id: "identifiant-unique",       // devient l'URL : /realisations/identifiant-unique
  title: "Nom du projet",
  category: "Catégorie affichée",
  statusLabel: "Badge de statut",  // ex : "Réalisation en ligne", "Projet personnel"
  summary: "Description courte pour la carte homepage.",
  result: "Résultat factuel, sans statistique inventée.",
  tags: ["Web", "..."],             // chips courts sur la carte
  technologies: ["Next.js", "..."],
  image: {                          // optionnel — sinon un visuel de secours s'affiche
    desktop: "/portfolio/mon-projet/desktop.webp",
    mobile: "/portfolio/mon-projet/mobile.webp",
    alt: "Description de l'image",
  },
  links: [{ label: "Voir le site", href: "https://..." }], // [] si aucun lien public
  placeholder: false,
  caseStudy: {                      // omettre ce champ = pas de page dédiée
    heroSubtitle: "...",
    need: ["Paragraphe(s) — Le besoin"],
    solution: ["Paragraphe(s) — La solution"],
    experience: ["Étape 1 → Étape 2 → Étape 3"],  // optionnel
    features: ["Fonctionnalité vérifiée", "..."],
    technologies: [{ name: "React", note: "Vite + Chakra UI" }],
    gallery: [{ src: "/portfolio/...", alt: "..." }], // optionnel
    metaDescription: "Description SEO de la case study.",
  },
}
```

**Règle appliquée dans tout le projet** : rien n'est mis en avant sans preuve vérifiée
(README lu, code inspecté, site testé). Un projet sans démo publique ni repository sûr à
partager garde simplement `links: []` — la page affiche alors une note explicative plutôt
qu'un lien inventé.

### Ajouter des images à une réalisation

Déposez vos images optimisées (WebP recommandé) dans
`public/portfolio/<id-du-projet>/`, puis référencez-les dans `image` et/ou
`caseStudy.gallery`. Pour Gold Fitness, l'emplacement `public/portfolio/gold-fitness/card-real.jpg`
est déjà prévu pour la photo de la carte physique (QR code) — dès que ce fichier existe,
il apparaît automatiquement dans la galerie de la case study, sans modification de code.
Pensez à cadrer/flouter toute coordonnée personnelle visible sur cette photo avant de
l'ajouter.

---

## 5. Témoignages

La section témoignages est **masquée automatiquement** tant que le tableau `testimonials`
(dans `src/data/profile.ts`) est vide — aucun témoignage fictif n'a été inventé. Ajoutez-y vos
témoignages réels (`name`, `role`, `company`, `quote`) pour que la section apparaisse.

---

## 6. Déploiement gratuit Vercel

Le projet a été vérifié prêt pour un déploiement Vercel (plan gratuit / Hobby) :
build Next.js standard sans configuration spéciale (`next.config.ts` par défaut,
aucun mode `output` particulier requis), routes statiques + 4 pages case study
générées (`generateStaticParams`), favicon/OG générés dynamiquement, sitemap et
robots.txt fonctionnels, aucune variable d'environnement obligatoire au build
(des valeurs de repli sûres existent tant qu'elles ne sont pas définies).

Étapes exactes :

1. Poussez le projet sur un dépôt Git (GitHub/GitLab) — **non fait
   automatiquement**, voir section Git de ce projet pour l'état actuel.
2. Sur [vercel.com](https://vercel.com), **Add New → Project**, importez le dépôt.
3. Vercel détecte Next.js automatiquement — aucune configuration de build à
   changer.
4. Variables d'environnement (Settings → Environment Variables), optionnelles au
   premier déploiement, à ajouter quand disponibles :
   - `NEXT_PUBLIC_SITE_URL` — laisser vide tant qu'aucun domaine n'est connecté ;
     Vercel fournit une URL `https://<projet>.vercel.app` fonctionnelle en
     attendant (ne pas la coder en dur dans le projet — elle est lue dynamiquement
     via cette variable au build)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` — déjà correcte par défaut dans le code
   - `NEXT_PUBLIC_FORM_ENDPOINT` — voir section 3 (recommandation Formspree)
5. **Deploy**. Le site est en ligne sur une URL `.vercel.app` gratuite.
6. Domaine personnalisé : voir `DOMAIN_SETUP_GUIDE.md` (à faire plus tard, une
   fois `rachidberrada.com` acheté).

Pour un hébergement Node.js classique (alternative à Vercel) : `npm run build`
puis `npm run start` (nécessite Node 20+).

### QR code de la carte de visite

Voir `BUSINESS_CARD_QR_PLAN.md` pour la stratégie complète (spécifications
d'impression, tests requis, texte recommandé). Le QR définitif n'est généré
qu'une fois l'URL publique validée — jamais vers `localhost`.

---

## 7. Structure du projet

```
src/
  app/
    page.tsx                 Page d'accueil
    realisations/[slug]/     Pages case study générées depuis `projects` (caseStudy)
    layout.tsx, sitemap.ts, robots.ts, icon.tsx, opengraph-image.tsx  SEO / métadonnées
  components/
    layout/                  Header, Footer, navigation mobile, bouton WhatsApp flottant
    sections/                Hero, Services, Problèmes, Solutions par métier, Méthode,
                              À propos, Réalisations, Témoignages, FAQ, Contact
    forms/                   Formulaire de contact (ProjectForm)
    ui/                      Composants réutilisables (boutons, titres de section, badges…)
  data/
    profile.ts               ⭐ Toutes vos informations, y compris le portfolio (à modifier)
    types.ts                 Types TypeScript des données
  lib/
    whatsapp.ts               Construction du lien wa.me
    portfolio.ts               Helpers réalisations (lookup, détection d'assets)

public/
  portfolio/<id-du-projet>/  Images des réalisations (captures, photo carte physique…)

PORTFOLIO_GITHUB_AUDIT.md    Audit interne des dépôts GitHub ayant servi à construire
                              le portfolio (méthodologie, sécurité, recommandations)
```

---

## 8. Audit qualité effectué

- ✅ Le projet compile (`npm run build`) sans erreur — 12 routes générées statiquement,
  dont les 4 pages case study (`/realisations/[slug]`).
- ✅ TypeScript strict sans erreur (`npx tsc --noEmit`).
- ✅ ESLint sans erreur.
- ✅ Navigation, ancres de section, CTA et navigation inter-pages (case study ↔ accueil)
  vérifiés en navigateur réel (Playwright).
- ✅ Lien WhatsApp généré et encodé correctement (`src/lib/whatsapp.ts`).
- ✅ Formulaire : validation des champs, aucun envoi simulé sans backend connecté.
- ✅ Responsive mobile (390×844) / desktop (1440×900), vérifié en navigateur réel.
- ✅ SEO : title, meta description, Open Graph, Twitter card, canonical, robots.txt,
  sitemap.xml (incluant les pages réalisations), favicon, icône Apple, image Open Graph
  générée, données structurées Schema.org (Person, avec GitHub dans `sameAs`).
- ✅ Accessibilité : audit Lighthouse réel — **100/100** sur toutes les pages testées
  (voir détail dans le message de livraison). Corrections appliquées : contraste de
  couleur, structure de liste, correspondance label/nom accessible.
- ✅ Performance : audit Lighthouse réel — desktop 94-99/100, mobile 62-72/100 (voir note
  sur l'environnement de mesure dans le message de livraison). Poids total de la page
  d'accueil : 248 Ko.
- ✅ Sécurité : aucun secret dans le code, `.env.local` ignoré par Git, `.env.example`
  fourni. Audit de sécurité réalisé sur les dépôts GitHub référencés avant toute mise en
  lien publique (voir `PORTFOLIO_GITHUB_AUDIT.md`).
- ✅ Aucune fausse information : aucun faux client, diplôme, certification, témoignage,
  statistique ou tarif fixe n'a été inventé. Chaque réalisation du portfolio a été vérifiée
  (code source et/ou site en ligne) avant rédaction.

## 9. Ce qu'il reste à fournir avant mise en ligne

- [x] Email professionnel (`rachid.berrada20@gmail.com`)
- [x] Numéro de téléphone / WhatsApp (`+212 6 48 55 22 22` / `212648552222`)
- [x] Lien GitHub (`https://github.com/Rberr240`) — visible dans "À propos" et le footer
- [x] Portfolio réel (4 réalisations avec pages case study détaillées)
- [ ] Ville affichée (`src/data/profile.ts` → `location`) — masquée tant que non fournie
- [ ] Nom de domaine définitif (`.env.local` → `NEXT_PUBLIC_SITE_URL`) — masqué tant que non fourni
- [ ] Lien LinkedIn (`src/data/profile.ts` → `socialLinks`) — volontairement absent pour l'instant
- [ ] Vos vrais témoignages clients, si disponibles (`src/data/profile.ts` → `testimonials`)
- [ ] Un service d'envoi pour le formulaire de contact (`NEXT_PUBLIC_FORM_ENDPOINT`)
- [ ] Photo de la carte physique Gold Fitness (QR code) — emplacement prêt, voir section 4
- [ ] Décisions à prendre sur `PORTFOLIO_GITHUB_AUDIT.md` : README à améliorer sur
      certains dépôts, dépôt `gestion-attestations-stage` à archiver, `nginx.key` à retirer
      du suivi Git dans `gestion-attestations` (voir rapport pour le détail)
